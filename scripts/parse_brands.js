import fs from 'fs';
import path from 'path';

const filePath = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\42家机场品牌清单.txt';
const content = fs.readFileSync(filePath, 'utf8');

// Also load speedtest manifest if exists
let speedtestManifest = [];
try {
  const mf = JSON.parse(fs.readFileSync('astroarabia/public/images/speedtest/speedtest-manifest.json', 'utf8'));
  speedtestManifest = mf.assets || [];
} catch (e) {
  console.log('Manifest load note:', e.message);
}

// Split by sections starting with '## [0-9]+.' or '主推## 1.'
const brandBlocks = content.split(/(?=^##\s*\d+\.|\n##\s*\d+\.|\n主推##\s*\d+\.)/m);

console.log('Total blocks found:', brandBlocks.length);

const brands = [];

const pinyinMap = {
  '光速云': 'guangsu-cloud',
  '暮光加速': 'muguang',
  '飞猫云': 'feimao',
  '微风网络': 'weifeng',
  '大佬云': 'dalaoyun',
  '星岛梦': 'xingdaomeng',
  '二猫云': 'ermaoyun',
  '无忧链接': 'wuyou-link',
  '唯兔云': 'weitu-cloud',
  'Firefly': 'firefly',
  '极连云': 'jilian-cloud',
  '光年梯': 'guangnianti',
  '宇宙云': 'yuzhou-cloud',
  '可信云': 'kexin-cloud',
  '一翻云': 'yifanyun',
  'SOGO云': 'sogo-cloud',
  '灵猫网络': 'lingmao-network',
  '速界': 'sujie',
  '全球云': 'quanqiuyun',
  'U1S1': 'u1s1',
  '快狸': 'kuaili'
};

function getSlug(name, rank) {
  const clean = name.replace(/（.*?）|\(.*?\)/g, '').trim();
  if (pinyinMap[clean]) return pinyinMap[clean];
  // Convert any English or generic slug
  const ascii = clean.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (ascii.length > 2) return ascii;
  return `brand-${rank}`;
}

for (let i = 0; i < brandBlocks.length; i++) {
  const block = brandBlocks[i].trim();
  if (!block.includes('##') && !block.includes('注册链接')) continue;

  const titleMatch = block.match(/(?:主推##|##)\s*(\d+)\.\s*([^\n\r]+)/);
  if (!titleMatch) continue;

  const rank = parseInt(titleMatch[1], 10);
  let rawName = titleMatch[2].trim();
  // Clean rawName if it has (muguang) or similar
  let slugMatch = rawName.match(/[（(]([a-zA-Z0-9_\-]+)[）)]/);
  let slug = slugMatch ? slugMatch[1].toLowerCase() : '';
  let cleanName = rawName.replace(/[（(].*?[）)]/g, '').trim();

  if (!slug) {
    slug = getSlug(cleanName, rank);
  }

  // Extract affiliate link
  const affMatch = block.match(/\*\*注册链接\*\*[:：]\s*`?([^`\s\n]+)`?/);
  const affLink = affMatch ? affMatch[1].trim() : '';

  // Extract coupon code
  const couponMatch = block.match(/优惠码\s*`?([a-zA-Z0-9]+)`?/);
  const couponCode = couponMatch ? couponMatch[1].trim() : '';

  // Extract basic data (e.g. 2020年运营、价格)
  const basicMatch = block.match(/\*\*基础数据\*\*[:：]\s*([^\n\r]+)/);
  const basicData = basicMatch ? basicMatch[1].trim() : '';

  // Starting price
  let priceStr = '待核实';
  const priceMatch = block.match(/(?:最低入门价格约|年付约|月付|低至|年付折合约)\s*([0-9\.]+\s*元(?:\/月|\/年)?)/);
  if (priceMatch) {
    priceStr = priceMatch[1];
  } else {
    const p2 = block.match(/¥([0-9\.]+)/);
    if (p2) priceStr = `¥${p2[1]}/月起`;
  }

  // Operating year
  let year = 2023;
  const yearMatch = block.match(/20(1\d|2\d)年/);
  if (yearMatch) year = parseInt(`20${yearMatch[1]}`, 10);

  // Protocols
  const protocols = [];
  if (/VLESS/i.test(block)) protocols.push('VLESS');
  if (/Shadowsocks|SS\b/i.test(block)) protocols.push('Shadowsocks');
  if (/Trojan/i.test(block)) protocols.push('Trojan');
  if (/Hysteria/i.test(block)) protocols.push('Hysteria');
  if (/VMess/i.test(block)) protocols.push('VMess');
  if (protocols.length === 0) protocols.push('Shadowsocks', 'VLESS');

  // Lines
  let lineType = 'BGP智能调度隧道';
  if (/IEPL/i.test(block) && /IPLC/i.test(block)) lineType = 'IEPL + IPLC 双专线架构';
  else if (/IEPL/i.test(block)) lineType = 'IEPL 企业内网专线';
  else if (/IPLC/i.test(block)) lineType = 'IPLC 纯专线直连';
  else if (/BGP/i.test(block)) lineType = 'BGP 高速隧道中转';
  else if (/专线/i.test(block)) lineType = '专线级高速出口';

  // Check speedtest image matching
  let speedtestImg = '';
  for (const asset of speedtestManifest) {
    const bName = asset.brand.replace(/云|梯|网络|加速/g, '');
    if (cleanName.includes(bName) || (asset.brand && cleanName.includes(asset.brand)) || asset.brand === cleanName) {
      speedtestImg = `/images/speedtest/${asset.file}`;
      break;
    }
  }

  // Extract description
  let desc = '';
  const descMatch = block.match(/介绍说明[:：]\s*([^\n\r]+(?:\n[^\n\r]+)*?)(?=\n\n|\n##|$)/);
  if (descMatch) {
    desc = descMatch[1].trim();
  } else {
    // fallback to first few bullet points
    const lines = block.split('\n').filter(l => l.startsWith('- '));
    desc = lines.slice(0, 3).map(l => l.replace(/^- /, '')).join('；');
  }

  // Pricing plans extraction
  const plans = [];
  const planLines = block.split('\n');
  let inPlan = false;
  for (const pl of planLines) {
    if (pl.includes('套餐名称') && pl.includes('价格')) {
      inPlan = true;
      continue;
    }
    if (inPlan) {
      if (pl.trim() === '' || pl.startsWith('##') || pl.startsWith('测速') || pl.startsWith('---')) {
        inPlan = false;
        continue;
      }
      const parts = pl.split('\t').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        plans.push({
          name: parts[0],
          billing: parts[1] || '月付',
          price: parts[2] || '¥20',
          traffic: parts[3] || '100GB',
          cycle: parts[4] || '每月'
        });
      }
    }
  }

  // Speed test nodes table
  const testResults = [];
  let inTest = false;
  for (const pl of planLines) {
    if (pl.includes('节点\t延迟\t下载') || (pl.includes('节点') && pl.includes('延迟'))) {
      inTest = true;
      continue;
    }
    if (inTest) {
      if (pl.trim() === '' || pl.startsWith('##') || pl.startsWith('流媒体') || pl.startsWith('---')) {
        inTest = false;
        continue;
      }
      const parts = pl.split('\t').map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        testResults.push({
          node: parts[0],
          latency: parts[1],
          download: parts[2]
        });
      }
    }
  }

  brands.push({
    rank,
    name: cleanName,
    fullName: rawName,
    slug,
    isFeatured: rank === 1,
    affLink,
    couponCode,
    basicData,
    priceStr,
    year,
    protocols,
    lineType,
    speedtestImg,
    hasSpeedtest: Boolean(speedtestImg || testResults.length > 0),
    description: desc,
    plans,
    testResults
  });
}

// Sort by rank ascending
brands.sort((a, b) => a.rank - b.rank);

console.log(`Successfully parsed ${brands.length} brands!`);
console.log('Top 10 brands:', brands.slice(0, 10).map(b => `${b.rank}. ${b.name} (${b.slug})`));

fs.writeFileSync('astroarabia/src/data/brands.json', JSON.stringify(brands, null, 2));
console.log('Saved to astroarabia/src/data/brands.json');
