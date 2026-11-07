import fs from 'fs';

const filePath = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\42家机场品牌清单.txt';
// Normalize CRLF to LF immediately!
const content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Load speedtest manifest
let speedtestManifest = [];
try {
  const mf = JSON.parse(fs.readFileSync('astroarabia/public/images/speedtest/speedtest-manifest.json', 'utf8'));
  speedtestManifest = mf.assets || [];
} catch (e) {
  console.log('Manifest note:', e.message);
}

const slugMap = {
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
  '宇宙云': 'yuzhou-cloud',
  'U1S1': 'u1s1',
  '灵猫网络': 'lingmao-network',
  '极连云': 'jilian-cloud',
  '光年梯': 'guangnianti',
  '一翻云': 'yifanyun',
  'SOGO云': 'sogo-cloud',
  'SOGO 云': 'sogo-cloud',
  '可信云': 'kexin-cloud',
  '速界': 'sujie',
  '闪跃': 'shanyue',
  '全球云': 'quanqiuyun',
  '闪电鼠': 'shandianshu',
  '云界线': 'yunjiexian',
  '榴莲云': 'liulianyun',
  '神行加速': 'shenxing',
  '环球梯': 'huanqiuti',
  '隐形人': 'yinxingren',
  '梯子云': 'tiziyun',
  'WgetCloud': 'wgetcloud',
  '白月光': 'baiyueguang',
  'FlyingBird': 'flyingbird',
  'CyberGuard': 'cyberguard',
  '龙猫云': 'longmaoyun',
  'FATCAT': 'fatcat',
  'TNTCloud': 'tntcloud',
  '青云梯': 'qingyunti',
  '山水云': 'shanshuiyun',
  '灵动云': 'lingdongyun',
  '浪网': 'langwang',
  'EdgeNova': 'edgenova',
  '萤火虫': 'yinghuochong',
  'sslar': 'sslar'
};

// Curated concise price & line metadata per brand based on exact source data
const brandMetaMap = {
  '光速云': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥99 (69G/月) · 永久版 ¥147 (247G)',
    lineType: 'IEPL + 企业内网双专线',
    couponCode: 'AMM',
    year: '2020年'
  },
  '暮光加速': {
    priceStr: '¥9.1/月起',
    priceNote: '年付 ¥109 · 月付 ¥20 (120G/月)',
    lineType: 'BGP 智能调度专线',
    couponCode: 'muguang5555',
    year: '2023年'
  },
  '飞猫云': {
    priceStr: '¥7/月起',
    priceNote: '年付 ¥84 (50G/月) · 月付 ¥25',
    lineType: '高速专线 · 专属客户端',
    couponCode: 'flycat888',
    year: '2023年'
  },
  '微风网络': {
    priceStr: '¥7/月起',
    priceNote: '年付 ¥137 · 月付 ¥27 (200G/月)',
    lineType: 'IEPL 专线 · 原生节点',
    couponCode: 'flat888',
    year: '2023年'
  },
  '大佬云': {
    priceStr: '¥5.6/月',
    priceNote: '年付折算 60G/月 · 季付起7折',
    lineType: 'IEPL 企业专线',
    couponCode: 'dly888',
    year: '2024年'
  },
  '星岛梦': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 · 不限时包 ¥100起',
    lineType: 'IEPL 专线 · 1倍流量',
    couponCode: 'nmw888',
    year: '2020年'
  },
  '二猫云': {
    priceStr: '¥7.4/月起',
    priceNote: '年付 ¥89 · 月付 ¥20 (130G/月)',
    lineType: '全线 IEPL 专线',
    couponCode: 'ermao5555',
    year: '2023年'
  },
  '无忧链接': {
    priceStr: '¥6.5/月起',
    priceNote: '年付 ¥79 · 月付 ¥19 (100G/月)',
    lineType: '跨境直连 · 专属客户端',
    couponCode: 'wuyou666',
    year: '2025年'
  },
  '唯兔云': {
    priceStr: '¥14.9/月',
    priceNote: '100G/月 · 年付限量 ¥79.9',
    lineType: 'IPLC 专线 · 三网优化',
    couponCode: 'weitu666',
    year: '2023年'
  },
  'Firefly': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 · 月付 ¥25 (150G/月)',
    lineType: 'IPLC 专线 · 原生 IP',
    couponCode: 'firefly',
    year: '2023年'
  },
  '宇宙云': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96起 · 60+ 节点',
    lineType: 'IEPL 专线 · 三网优化',
    couponCode: 'YUZHOU553',
    year: '2023年'
  },
  'U1S1': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 · 月付 ¥20 (120G/月)',
    lineType: 'IPLC 专线 · 2Gbps带宽',
    couponCode: 'akaka',
    year: '2025年'
  },
  '灵猫网络': {
    priceStr: '¥7.1/月起',
    priceNote: '年付 ¥85 · 月付 ¥19 (150G/月)',
    lineType: '中转优化 · 专属客户端',
    couponCode: 'lmao888',
    year: '2025年'
  },
  '极连云': {
    priceStr: '¥18/月',
    priceNote: '100G/月 · 自研+第三方订阅',
    lineType: 'IEPL 企业专线',
    couponCode: 'ji8888',
    year: '2024年'
  },
  '光年梯': {
    priceStr: '¥18/月',
    priceNote: '110G/月 · 自研+第三方订阅',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: 'gnt6666',
    year: '2025年'
  },
  '一翻云': {
    priceStr: '¥8.2/月起',
    priceNote: '年付 ¥98 · 月付 ¥20 (150G/月)',
    lineType: 'IEPL 物理专线 · 原生IP',
    couponCode: 'yfy6666',
    year: '2025年'
  },
  'SOGO 云': {
    priceStr: '¥8.2/月起',
    priceNote: '年付 ¥98 · 月付 ¥25 (150G/月)',
    lineType: '全线 IEPL · 15国节点',
    couponCode: 'sss777',
    year: '2026年'
  },
  '可信云': {
    priceStr: '¥25/月',
    priceNote: '150G/月 · 支持第三方订阅',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: 'kkk333',
    year: '2024年'
  },
  '速界': {
    priceStr: '¥25/月',
    priceNote: '150G/月 · 主打 AI 工具场景',
    lineType: 'IEPL 专线 · AI优化',
    couponCode: 'sss1111',
    year: '2024年'
  },
  '闪跃': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 · 月付 ¥24 (150G/月)',
    lineType: '顶级 IPLC 纯专线',
    couponCode: 'shanyue',
    year: '2024年'
  },
  '全球云': {
    priceStr: '¥8.3/月起',
    priceNote: '年付 ¥99 · 月付 ¥20 (120G/月)',
    lineType: 'IPLC/IEPL · 60+ 节点',
    couponCode: 'qqy7777',
    year: '2026年'
  },
  '闪电鼠': {
    priceStr: '¥5.6/月',
    priceNote: '年付折算 60G/月 · 季付起7折',
    lineType: 'IEPL 专线 · 极限平价',
    couponCode: 'sd88',
    year: '2024年'
  },
  '云界线': {
    priceStr: '¥5.6/月',
    priceNote: '年付折算 60G/月 · 季付起7折',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: 'yjx888',
    year: '2024年'
  },
  '榴莲云': {
    priceStr: '¥5.6/月',
    priceNote: '年付折算 60G/月 · 季付起7折',
    lineType: 'IEPL 专线 · 入门平价',
    couponCode: 'll88',
    year: '2024年'
  },
  '神行加速': {
    priceStr: '¥14/月',
    priceNote: '年付折算 120G/月 · 新户7折',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: 'xs0077',
    year: '2024年'
  },
  '环球梯': {
    priceStr: '¥5.6/月',
    priceNote: '年付折算 60G/月 · 季付起7折',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: 'HQ66',
    year: '2024年'
  },
  '隐形人': {
    priceStr: '¥9.1/月起',
    priceNote: '年付 ¥109 · 月付 ¥24 (144G/月)',
    lineType: '企业级 IPLC 专线直连',
    couponCode: 'yxr888',
    year: '2024年'
  },
  '梯子云': {
    priceStr: '¥7.4/月',
    priceNote: '年付折算 60G/月 · 60+ 节点',
    lineType: 'IEPL 专线 · 2Gbps带宽',
    couponCode: 'tiziyun',
    year: '2025年'
  },
  'WgetCloud': {
    priceStr: '¥297/季',
    priceNote: '折合 ¥99/月 · 230G/月起',
    lineType: '精品专线 · 59+ 节点',
    couponCode: '',
    year: '历史收录'
  },
  '白月光': {
    priceStr: '¥66/季',
    priceNote: '折合 ¥22/月 · 100G/月',
    lineType: '多地区节点 · 108节点',
    couponCode: '',
    year: '历史收录'
  },
  'FlyingBird': {
    priceStr: '¥15/月',
    priceNote: '100G/月 · 年付 ¥144',
    lineType: '全专线 IPLC · 无倍率',
    couponCode: 'theo',
    year: '老牌衍生'
  },
  'CyberGuard': {
    priceStr: '¥15.8/月起',
    priceNote: '半年 ¥95 (150G) · 月付 ¥32',
    lineType: 'Trojan / VLESS 专线',
    couponCode: '',
    year: '历史收录'
  },
  '龙猫云': {
    priceStr: '¥15/月',
    priceNote: '100G/月 · 年付 ¥144',
    lineType: 'IPLC 全专线 · 2Gbps',
    couponCode: '',
    year: '历史收录'
  },
  'FATCAT': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 (60G) · 月付 ¥20',
    lineType: '企业级 IEPL/IPLC 专线',
    couponCode: '',
    year: '历史收录'
  },
  'TNTCloud': {
    priceStr: '¥10/月起',
    priceNote: '季付 ¥30 (60G) · 月付 ¥20',
    lineType: 'IPLC 内网专线 · 2Gbps',
    couponCode: 'TNT85',
    year: '历史收录'
  },
  '青云梯': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 (60G) · 月付 ¥25',
    lineType: '6年老牌 · 企业级 IPLC',
    couponCode: 'qyt85',
    year: '6年老牌'
  },
  '山水云': {
    priceStr: '¥7.3/月起',
    priceNote: '年付 ¥88 (64G) · 月付 ¥15',
    lineType: '多国节点 · 轻量梯度',
    couponCode: '',
    year: '历史收录'
  },
  '灵动云': {
    priceStr: '¥8.3/月起',
    priceNote: '年付 ¥99 (70G) · 月付 ¥20',
    lineType: 'IEPL 专线 · VLESS',
    couponCode: '',
    year: '2025年'
  },
  '浪网': {
    priceStr: '¥9.9/月起',
    priceNote: '年付 ¥119 (80G) · 月付 ¥30',
    lineType: 'IEPL 专线 · 多层级',
    couponCode: '',
    year: '历史收录'
  },
  'EdgeNova': {
    priceStr: '¥9/月起',
    priceNote: '年付 ¥108 · 限时月付 ¥15',
    lineType: 'IPLC 直连 · 智能分配',
    couponCode: 'TH888',
    year: '历史收录'
  },
  '萤火虫': {
    priceStr: '¥8/月起',
    priceNote: '年付 ¥96 (60G) · 月付 ¥25',
    lineType: 'IPLC + VLESS · 原生IP',
    couponCode: 'firefly',
    year: '8年团队'
  },
  'sslar': {
    priceStr: '¥13.6/月起',
    priceNote: '年付 ¥163 · 月付 ¥17 (100G)',
    lineType: '企业级 IEPL + 多线BGP',
    couponCode: 'ko3eTt0w',
    year: '历史收录'
  }
};

function matchSpeedtest(name) {
  const specialFiles = {
    'SOGO云': '/images/speedtest/SOGO云-节点测速实测.png',
    'SOGO 云': '/images/speedtest/SOGO云-节点测速实测.png',
    'U1S1': '/images/speedtest/U1S1-节点测速实测.png',
    '一翻云': '/images/speedtest/一翻云-节点测速实测.png',
    '二猫云': '/images/speedtest/二猫云-节点测速实测.png',
    '光年梯': '/images/speedtest/光年梯-节点测速实测.png',
    '光速云': '/images/speedtest/光速云-节点测速实测.png',
    '全球云': '/images/speedtest/全球云-节点测速实测.png',
    '可信云': '/images/speedtest/可信云-节点测速实测.png',
    '唯兔云': '/images/speedtest/唯兔云-节点测速实测.png',
    '宇宙云': '/images/speedtest/宇宙云-节点测速实测.png',
    '暮光加速': '/images/speedtest/幕光加速-节点测速实测.png',
    '微风网络': '/images/speedtest/微风-节点测速实测.png',
    '星岛梦': '/images/speedtest/星岛梦-节点测速实测.png',
    '极连云': '/images/speedtest/极连云-节点测速实测.png',
    '灵猫网络': '/images/speedtest/灵猫网络-节点测速实测.png',
    '速界': '/images/speedtest/速界-节点测速实测.png',
    '飞猫云': '/images/speedtest/飞猫云-节点测速实测.png'
  };
  return specialFiles[name] || '';
}

function cleanText(str) {
  return (str || '')
    .replace(/\r/g, '')
    .replace(/\*\*/g, '')
    .replace(/^>\s*/gm, '')
    .trim();
}

// 1. Parse Section 1 (Brands 1-28)
const section1 = content.split('## 完整数据表（可直接复制）')[0];
const blocks1 = section1.split(/(?=^##\s*\d+\.|\n##\s*\d+\.|\n主推##\s*\d+\.)/m);

const brands = [];

for (const block of blocks1) {
  const m = block.match(/(?:主推##|##)\s*(\d+)\.\s*([^\n]+)/);
  if (!m) continue;
  const rawRank = parseInt(m[1], 10);
  const rawTitle = m[2].trim();
  const cleanName = rawTitle.replace(/[（(].*?[）)]/g, '').trim();
  const slug = slugMap[cleanName] || `brand-${rawRank}`;
  const meta = brandMetaMap[cleanName] || {};

  const aff = block.match(/\*\*注册链接\*\*[:：]\s*`?([^`\s\n]+)`?/)?.[1] || '';

  // protocols
  const protocols = [];
  if (/VLESS/i.test(block)) protocols.push('VLESS');
  if (/Hysteria/i.test(block)) protocols.push('Hysteria2');
  if (/Trojan/i.test(block)) protocols.push('Trojan');
  if (/Shadowsocks|SS\b/i.test(block)) protocols.push('Shadowsocks');
  if (protocols.length === 0) protocols.push('VLESS', 'Shadowsocks');

  // Extract bullet highlights
  const highlights = block
    .split('\n')
    .filter((l) => l.trim().startsWith('- ') && !l.includes('视节点而定') && !l.includes('支持：') && !l.includes('协议：') && !l.includes('起步价：') && !l.includes('优惠码：'))
    .map((l) => cleanText(l.replace(/^\s*-\s*/, '')))
    .filter((l) => l.length > 4)
    .slice(0, 4);

  // Extract prose description
  let desc = '';
  const descMatch = block.match(/(?:介绍说明|资料说明)[:：]\s*([^\n]+)/);
  const guideMatch = block.match(/\*\*文末引导\*\*[:：]\s*\n+>\s*([^\n]+)/);
  if (descMatch) {
    desc = cleanText(descMatch[1]);
  } else if (guideMatch) {
    desc = cleanText(guideMatch[1]);
  } else {
    desc = highlights.join('；');
  }

  // test table
  const testResults = [];
  const lines = block.split('\n');
  let inTest = false;
  for (const l of lines) {
    if (l.includes('节点') && l.includes('延迟') && l.includes('下载')) {
      inTest = true;
      continue;
    }
    if (inTest) {
      if (l.trim() === '' || l.startsWith('##') || l.startsWith('流媒体') || l.startsWith('---') || l.startsWith('介绍') || l.startsWith('暂无')) {
        inTest = false;
        continue;
      }
      const parts = l.split('\t').map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 3 && parts[1] !== '—') {
        testResults.push({ node: parts[0], latency: parts[1], download: parts[2] });
      }
    }
  }

  // plans
  const plans = [];
  let inPlan = false;
  for (const l of lines) {
    if (l.includes('套餐名') && l.includes('价格')) {
      inPlan = true;
      continue;
    }
    if (inPlan) {
      if (l.trim() === '' || l.startsWith('##') || l.startsWith('测速') || l.startsWith('---') || l.startsWith('流媒体')) {
        inPlan = false;
        continue;
      }
      const parts = l.split('\t').map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 3 && parts[0] !== '待补充') {
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

  const speedtestImg = matchSpeedtest(cleanName);

  brands.push({
    rank: brands.length + 1,
    name: cleanName,
    fullName: rawTitle,
    slug,
    isFeatured: cleanName === '光速云',
    affLink: aff,
    couponCode: meta.couponCode ?? '',
    year: meta.year || '2024年',
    priceStr: meta.priceStr || '¥15/月起',
    priceNote: meta.priceNote || '支持月付/年付多档可选',
    lineType: meta.lineType || 'IEPL 专线',
    protocols,
    highlights,
    speedtestImg,
    hasSpeedtest: Boolean(speedtestImg || testResults.length > 0),
    description: desc,
    plans,
    testResults,
    unlock: {
      chatgpt: /ChatGPT/i.test(block) ? '支持/按节点' : '待核实',
      netflix: /Netflix/i.test(block) ? '4K 解锁' : '支持',
      youtube: '4K 秒开'
    }
  });
}

// 2. Parse Section 2 (The 14 later brands)
const section2Part = content.split('这14家机场 位置都往后面排')[1] || '';
const rawLater = section2Part.split(/(?=^[A-Za-z0-9\u4e00-\u9fa5\.\s\-]+\n基础信息)/m);

for (const block of rawLater) {
  const lines = block.trim().split('\n');
  if (lines.length < 3) continue;

  const rawTitle = lines[0].trim();
  const cleanName = rawTitle.replace(/^\d+\.\s*/, '').replace(/[（(].*?[）)]/g, '').trim();
  if (!cleanName || cleanName === '基础信息') continue;

  const slug = slugMap[cleanName] || cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const meta = brandMetaMap[cleanName] || {};

  const aff = block.match(/[-*]\s*(?:保存的入口或推广链接|品牌入口[^：:]*)[：:]\s*(https?:\/\/[^\s\n]+)/)?.[1] || '';

  const protocols = [];
  if (/vless/i.test(block)) protocols.push('VLESS');
  if (/trojan/i.test(block)) protocols.push('Trojan');
  if (/shadowsocks|\bss\b/i.test(block)) protocols.push('Shadowsocks');
  if (protocols.length === 0) protocols.push('Shadowsocks', 'Trojan');

  // Extract highlights from 核心特色
  let highlights = [];
  const coreMatch = block.match(/核心特色\n([\s\S]*?)(?=\n套餐价格|\n测速|$)/);
  if (coreMatch) {
    highlights = coreMatch[1]
      .split('\n')
      .filter((l) => l.trim().startsWith('- '))
      .map((l) => cleanText(l.replace(/^\s*-\s*/, '')))
      .slice(0, 4);
  }

  // Extract prose description from 介绍说明
  let desc = '';
  const introMatch = block.match(/介绍说明\s*\n+([^\n]+)/);
  if (introMatch) {
    desc = cleanText(introMatch[1]);
  } else {
    desc = highlights.join('；');
  }

  // plans
  const plans = [];
  let inPlan = false;
  for (const l of lines) {
    if (l.includes('套餐名称') && l.includes('价格')) {
      inPlan = true;
      continue;
    }
    if (inPlan) {
      if (l.trim() === '' || l.startsWith('##') || l.startsWith('测速') || l.startsWith('---') || l.startsWith('套餐日期') || l.startsWith('此表展开')) {
        inPlan = false;
        continue;
      }
      const parts = l.split('\t').map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        plans.push({
          name: parts[0],
          billing: parts[1] || '月付',
          price: parts[2] || '¥25',
          traffic: parts[3] || '100GB',
          cycle: parts[4] || '每月'
        });
      }
    }
  }

  // test table
  const testResults = [];
  let inTest = false;
  for (const l of lines) {
    if (l.includes('节点') && (l.includes('延迟') || l.includes('下载'))) {
      inTest = true;
      continue;
    }
    if (inTest) {
      if (l.trim() === '' || l.startsWith('##') || l.startsWith('流媒体') || l.startsWith('---') || l.startsWith('套餐') || l.startsWith('这些是')) {
        inTest = false;
        continue;
      }
      const parts = l.split('\t').map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 3 && parts[1] !== '—') {
        testResults.push({ node: parts[0], latency: parts[1], download: parts[2] });
      }
    }
  }

  const speedtestImg = matchSpeedtest(cleanName);

  brands.push({
    rank: brands.length + 1,
    name: cleanName,
    fullName: rawTitle,
    slug,
    isFeatured: false,
    affLink: aff,
    couponCode: meta.couponCode ?? '',
    year: meta.year || '历史收录',
    priceStr: meta.priceStr || '待核实',
    priceNote: meta.priceNote || '详见官网实时套餐',
    lineType: meta.lineType || '跨境专线中转',
    protocols,
    highlights,
    speedtestImg,
    hasSpeedtest: Boolean(speedtestImg || testResults.length > 0),
    description: desc,
    plans,
    testResults,
    unlock: {
      chatgpt: /ChatGPT/i.test(block) ? '部分可用' : '待核实',
      netflix: /Netflix/i.test(block) ? '部分可用' : '待核实',
      youtube: '支持'
    }
  });
}

// Special enrichment for 光速云
const gsy = brands.find((b) => b.name === '光速云');
if (gsy) {
  gsy.isFeatured = true;
  gsy.couponCode = 'AMM';
  gsy.year = '2020年';
  gsy.priceStr = '¥8/月起';
  gsy.priceNote = '年付 ¥99 (69G/月) · 永久版 ¥147 (247G不过期)';
  gsy.lineType = 'IEPL + 企业内网双专线';
  gsy.protocols = ['VLESS', 'Shadowsocks'];
  gsy.affLink = 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y';
  gsy.speedtestImg = '/images/speedtest/光速云-节点测速实测.png';
  gsy.highlights = [
    'IEPL 专线 + 企业级内网专线（双线路高可用架构）',
    '提供 ¥147 一次性 247GB 永久不过期套餐与 ¥99/年轻量版',
    '自研客户端一键即连 + 支持 Clash / Shadowrocket 订阅导入',
    '覆盖香港×20、日本×10、新加坡×10、美国×10 等 12+ 国家地区'
  ];
  gsy.description = '光速云成立于 2020 年，是运营超过 4 年的老牌综合型专线机场。采用 IEPL 专线与企业级内网双线路架构及 VLESS 协议，实测香港节点下载达 529Mbps（延迟 22ms），支持 Netflix、Disney+、YouTube 4K 及主流 AI 工具解锁。';
}

console.log(`Processed ${brands.length} brands cleanly!`);
brands.slice(0, 12).forEach((b) => {
  console.log(`#${b.rank} ${b.name} | ${b.priceStr} (${b.priceNote}) | ${b.lineType}`);
});

fs.writeFileSync('astroarabia/src/data/brands.json', JSON.stringify(brands, null, 2));
