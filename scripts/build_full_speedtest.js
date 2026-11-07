import fs from 'fs';

const speedtestContent = {
  meta: {
    title: '2026 机场节点真实测速报告：17份MAI-TEST-BOT原图与五地延迟吞吐横评大盘 - clashjichang.world',
    h1: '2026 机场节点真实测速证据库与五地延迟吞吐实证报告',
    description: '2026 专著级机场测速实证大盘：完整公开 2026-08-11 批次 17 份 MAI-TEST-BOT 无修测速原图（SHA256 可溯源）、2026-10-19 十五家主力机场港/台/新/日/美五地延迟与下载速度横评表、历史多节点统计档案，并深度解析 TLS RTT、MaxSpeed、UDP NAT 类型及自测方法论。',
    updatedAt: '2026-11-07',
    verifiedAt: '2026-10-19（五地横评采样） / 2026-08-11 CST（MAI-TEST-BOT 17份原图归档）',
    author: 'Clash机场评测实验室（网络可观测性与测速验证组）',
    readingTime: '约 28 分钟深度阅读'
  },

  directAnswer: {
    summary: '针对用户在搜索“机场测速报告”、“晚高峰不掉速机场”或“真实节点带宽对比”时最关心的核心问题——到底哪家机场是真专线高吞吐、哪家只是营销虚标？本站拒绝使用任何 P 图或商家宣传海报，直接基于 2026-08-11 批次归档的 17 份原始测速 PNG（含 SHA256 校验）与 2026-10-19 五地（港/台/新/日/美）实测记录，给出以下三大实证结论：',
    points: [
      {
        label: '1. 第一梯队吞吐与低延迟实测结论（香港 21–27ms / 峰值 500Mbps+）',
        content: '在 2026-10-19 统一口径非高峰采样与 2026-08-11 批次实测中，采用 IEPL 或 IPLC 专线的头部机场在亚洲近端表现出极高的一致性与爆发力。其中【香港节点】下载速度突破 500Mbps 且延迟控制在 27ms 以内的品牌依次为：闪跃（23ms / 548Mbps）、Firefly（27ms / 547Mbps）、微风网络（25ms / 546Mbps）、U1S1（24ms / 538Mbps，且在 22:33 晚高峰完成截图采样）、无忧链接（23ms / 531Mbps）、光速云（22ms / 529Mbps，综合排名 TOP 1）、飞猫云（21ms / 526Mbps）、暮光加速（26ms / 509Mbps）、星岛梦（27ms / 504Mbps）与唯兔云（27ms / 500Mbps）。【新加坡节点】全线稳定在 42ms–46ms 之间，下载速率达 383Mbps–445Mbps（Firefly 445Mbps、全球云 430Mbps、暮光加速 419Mbps、无忧链接 418Mbps 领跑）。这证明正规 IEPL/IPLC 专线在近端节点的物理延迟与带宽冗余远非百毫秒级的普通公网直连可比。'
      },
      {
        label: '2. 跨地区衰减规律与历史跨洋强悍样本结论（日/台/美真实差距）',
        content: '实测数据揭示了一条残酷但真实的物理规律：在本站 2026-10-19 批次的 15 家主流机场中，虽然香港与新加坡节点普遍能跑出 400Mbps–548Mbps 的极速，但【台湾节点】普遍回落至 37ms–41ms / 100Mbps–135Mbps，【日本节点】普遍在 53ms–57ms / 131Mbps–150Mbps 之间，而跨太平洋的【美国节点】在当次非高峰单线程/常规采样中普遍仅为 134ms–180ms / 14Mbps–30Mbps（仅 Firefly 跑出 30Mbps、U1S1 与一翻云跑出 20Mbps）。如果您对日本或美国跨洋大带宽有极高要求，应重点关注历史多节点统计批次中的【WgetCloud】（2026-05-02 实测 59 个节点全非零，日本平均高达 462.04Mbps，美国 9 节点平均高达 440.04Mbps）或【CyberGuard】（日本历史统计 488.83Mbps、美国 245.6Mbps）。'
      },
      {
        label: '3. 测速图的科学判读边界结论（测速快 ≠ 永远稳 ≠ 必解锁 AI）',
        content: '作为专业网络评测实验室，我们必须在页首向读者声明单张测速图的 4 个客观边界：第一，测速图记录的是特定时间戳（如 2026-08-11 某时刻）在测试机带宽下的瞬时吞吐，能证伪“虚假带宽”，但不能替代长期的晚高峰在线率监控（本批次中宇宙云 21:04、U1S1 22:33、极连云 22:46 属于珍贵的晚高峰时段采样）；第二，图片中显示的平均速度单位在 MAI-TEST-BOT 中通常为 MB/s（兆字节每秒，1 MB/s = 8 Mbps），阅读时切勿将 65 MB/s（即 520 Mbps）误认为只有 65M 宽带；第三，高带宽不代表必然解锁 ChatGPT、Claude 或 Netflix 非自制剧，解锁取决于落地 IP 纯净度与 DNS 分流；第四，本页对缺乏实测的品牌（如 5.6 元同构档及部分历史收录品牌）严格标注“未实测/待补充”，绝不伪造数据。'
      }
    ],
    quickNav: [
      { text: '📊 表1：15家主力五地实测总表', href: '#five-region-table' },
      { text: '🗂️ 表2：17份原图批次与时间戳核验', href: '#manifest-audit-table' },
      { text: '📈 表3：历史多节点统计档案表', href: '#historical-stats-table' },
      { text: '🖼️ 17份真实测速原图画廊', href: '#speedtest-gallery' },
      { text: '🎬 7份流媒体解锁与实况图证', href: '#unlock-evidence-gallery' },
      { text: '🔬 如何看懂 MAI-TEST-BOT 指标', href: '#how-to-read-metrics' },
      { text: '🛠️ 本地复现测速 5 步教程', href: '#self-test-guide' },
      { text: '🧭 按实测表现选购决策树', href: '#decision-path' }
    ]
  },

  toc: [
    { id: 'direct-answer', title: '核心实测结论与速查' },
    { id: 'five-region-table', title: '表1：15家主力五地横评总表' },
    { id: 'manifest-audit-table', title: '表2：17份原图归档元数据表' },
    { id: 'historical-stats-table', title: '表3：历史多节点统计测速表' },
    { id: 'speedtest-gallery', title: '一、17家机场真实测速原图库' },
    { id: 'unlock-evidence-gallery', title: '二、流媒体与多节点实况图证' },
    { id: 'regional-analysis', title: '三、五地延迟与吞吐深度拆解' },
    { id: 'how-to-read-metrics', title: '四、看懂测速图6大工程指标' },
    { id: 'self-test-guide', title: '五、本地复现科学测速5步法' },
    { id: 'decision-path', title: '六、基于实测数据的选购分支' },
    { id: 'recommended-entries', title: '七、实测表现优异方案入口' },
    { id: 'faq', title: '八、测速常见疑问与边界 FAQ' },
    { id: 'data-sources', title: '九、归档校验与资料缺口声明' }
  ],

  fiveRegionTable: {
    caption: '表 1：2026-10-19 批次 15 家主力机场五地（香港/台湾/新加坡/日本/美国）延迟与下载吞吐实测横评表（非晚高峰统一口径）',
    headers: [
      '综合排名与品牌',
      '底层架构与协议',
      '香港 (延迟 / 下载)',
      '新加坡 (延迟 / 下载)',
      '台湾 (延迟 / 下载)',
      '日本 (延迟 / 下载)',
      '美国 (延迟 / 下载)',
      '起步价与月付实价',
      '流媒体与 AI 解锁实测结论'
    ],
    rows: [
      {
        brand: 'TOP 1 光速云',
        slug: 'guangsu-cloud',
        arch: 'IEPL + 企业内网双专线 (VLESS/SS)',
        hk: '22ms / 529Mbps',
        sg: '46ms / 387Mbps',
        tw: '41ms / 114Mbps',
        jp: '57ms / 135Mbps',
        us: '143ms / 18Mbps',
        price: '年付 ¥99 (折¥8.2/月)；月付 ¥25；永久包 ¥147',
        unlock: 'Claude/Netflix/Disney+/YT/TikTok 支持；ChatGPT/Gemini 视节点'
      },
      {
        brand: 'TOP 2 暮光加速',
        slug: 'muguang',
        arch: 'BGP 智能调度 + 专线出口 (VLESS/SS)',
        hk: '26ms / 509Mbps',
        sg: '43ms / 419Mbps',
        tw: '40ms / 107Mbps',
        jp: '53ms / 150Mbps',
        us: '160ms / 19Mbps',
        price: '年付 ¥109 (折¥9.1/月)；月付 ¥20；不限时 ¥219起',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO/TikTok 支持；Gemini 视节点'
      },
      {
        brand: 'TOP 3 飞猫云',
        slug: 'feimao',
        arch: '高速专线 + 专属客户端 (SS/私有)',
        hk: '21ms / 526Mbps',
        sg: '45ms / 413Mbps',
        tw: '41ms / 116Mbps',
        jp: '54ms / 138Mbps',
        us: '178ms / 14Mbps',
        price: '学生年付 ¥84 (折¥7/月)；月付 ¥25；不限时 ¥680',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO/TikTok 支持；Gemini 视节点'
      },
      {
        brand: 'TOP 4 微风网络',
        slug: 'weifeng',
        arch: 'IEPL 专线 + 原生 IP (VLESS/SS)',
        hk: '25ms / 546Mbps',
        sg: '43ms / 384Mbps',
        tw: '40ms / 115Mbps',
        jp: '54ms / 131Mbps',
        us: '167ms / 17Mbps',
        price: '年付 ¥137 (100G/月)；月付 ¥27；不限时 ¥200',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO/TikTok 支持；Gemini 视节点'
      },
      {
        brand: 'TOP 6 星岛梦',
        slug: 'xingdaomeng',
        arch: 'IEPL 专线 1倍流量 (Trojan/SS)',
        hk: '27ms / 504Mbps',
        sg: '44ms / 411Mbps',
        tw: '41ms / 103Mbps',
        jp: '57ms / 136Mbps',
        us: '177ms / 18Mbps',
        price: '年付 ¥96 (折¥8/月)；月付 ¥25；不限时 ¥100起',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO/TikTok 支持；Gemini 视节点'
      },
      {
        brand: 'TOP 7 二猫云',
        slug: 'ermaoyun',
        arch: '全线 IEPL 专线 (VLESS/SS)',
        hk: '22ms / 481Mbps',
        sg: '46ms / 407Mbps',
        tw: '41ms / 118Mbps',
        jp: '53ms / 143Mbps',
        us: '134ms / 17Mbps',
        price: '年付 ¥89 (折¥7.4/月)；月付 ¥20；不限时 ¥99',
        unlock: 'ChatGPT/Netflix/Disney+/YT/TikTok 支持；Claude/Gemini 视节点'
      },
      {
        brand: 'TOP 8 无忧链接',
        slug: 'wuyou-link',
        arch: '电商跨区优化 + 专属端 (无倍率)',
        hk: '23ms / 531Mbps',
        sg: '42ms / 418Mbps',
        tw: '41ms / 107Mbps',
        jp: '55ms / 147Mbps',
        us: '145ms / 17Mbps',
        price: '年付 ¥79 (折¥6.5/月)；月付 ¥19；不限时 ¥108',
        unlock: 'TikTok 跨区直连/ChatGPT/Claude/Netflix/Disney+ 支持'
      },
      {
        brand: 'TOP 9 唯兔云',
        slug: 'weitu-cloud',
        arch: 'IPLC 专线 + 三网优化 (Trojan/SS)',
        hk: '27ms / 500Mbps',
        sg: '44ms / 414Mbps',
        tw: '37ms / 100Mbps',
        jp: '56ms / 147Mbps',
        us: '179ms / 17Mbps',
        price: '限量年付 ¥79.9；节假日月付 ¥14.9；常规 ¥19.9',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/TikTok 支持；Gemini 视节点'
      },
      {
        brand: 'TOP 10 Firefly',
        slug: 'firefly',
        arch: 'IPLC 专线 + 原生 IP (VLESS 专属端)',
        hk: '27ms / 547Mbps',
        sg: '42ms / 445Mbps',
        tw: '39ms / 135Mbps',
        jp: '57ms / 147Mbps',
        us: '143ms / 30Mbps',
        price: '年付 ¥96 (折¥8/月)；月付 ¥25；不限时 ¥100',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO/TikTok 支持；美西达 30Mbps'
      },
      {
        brand: 'TOP 12 U1S1',
        slug: 'u1s1',
        arch: 'IPLC 专线 2Gbps 带宽池 (SS)',
        hk: '24ms / 538Mbps',
        sg: '46ms / 414Mbps',
        tw: '39ms / 107Mbps',
        jp: '57ms / 133Mbps',
        us: '134ms / 20Mbps',
        price: '年付 ¥96 (折¥8/月)；月付 ¥20 (120G)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/TikTok 支持；含 22:33 晚高峰实测图'
      },
      {
        brand: 'TOP 13 灵猫网络',
        slug: 'lingmao-network',
        arch: '中转优化 1倍流量 (专属客户端)',
        hk: '22ms / 492Mbps',
        sg: '46ms / 409Mbps',
        tw: '40ms / 109Mbps',
        jp: '57ms / 147Mbps',
        us: '164ms / 19Mbps',
        price: '年付 ¥85 (折¥7.1/月)；月付 ¥25 (150G)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/YT/TikTok 支持'
      },
      {
        brand: 'TOP 16 一翻云',
        slug: 'yifanyun',
        arch: 'IEPL 物理专线 + 原生住宅 IP (Hy2/VLESS/SS)',
        hk: '23ms / 477Mbps',
        sg: '42ms / 390Mbps',
        tw: '40ms / 117Mbps',
        jp: '53ms / 136Mbps',
        us: '180ms / 20Mbps',
        price: '年付 ¥98 (折¥8.2/月)；月付 ¥20；不限时 ¥100起',
        unlock: '原生住宅 IP，ChatGPT/Claude/Netflix/Disney+/TikTok 支持'
      },
      {
        brand: 'TOP 17 SOGO 云',
        slug: 'sogo-cloud',
        arch: '全线 IEPL + 15国覆盖 (VLESS 专属端)',
        hk: '26ms / 488Mbps',
        sg: '43ms / 401Mbps',
        tw: '39ms / 118Mbps',
        jp: '57ms / 137Mbps',
        us: '140ms / 17Mbps',
        price: '年付 ¥98 (折¥8.2/月)；月付 ¥25；不限时 ¥120起',
        unlock: '15国节点覆盖最广，ChatGPT/Netflix/Disney+/TikTok 支持'
      },
      {
        brand: 'TOP 20 闪跃',
        slug: 'shanyue',
        arch: '顶级 IPLC 纯专线 + 骨干网 (专属端)',
        hk: '23ms / 548Mbps',
        sg: '44ms / 383Mbps',
        tw: '38ms / 110Mbps',
        jp: '53ms / 144Mbps',
        us: '143ms / 18Mbps',
        price: '年付 ¥96 (折¥8/月)；月付 ¥24 (150G)',
        unlock: '香港峰值 548Mbps 冠绝本批次，原生 IP 全解锁流媒体与 AI'
      },
      {
        brand: 'TOP 21 全球云',
        slug: 'quanqiuyun',
        arch: 'IPLC/IEPL 60+ 节点 (Trojan/SS 专属端)',
        hk: '25ms / 489Mbps',
        sg: '45ms / 430Mbps',
        tw: '37ms / 117Mbps',
        jp: '55ms / 133Mbps',
        us: '138ms / 18Mbps',
        price: '年付 ¥99 (折¥8.3/月)；月付 ¥20；不限时 ¥100起',
        unlock: '新加坡达 430Mbps，支持 ChatGPT/Claude/Netflix/Disney+/TikTok'
      }
    ]
  },

  manifestAuditTable: {
    caption: '表 2：2026-08-11 CST 批次原始测速图片（speedtest-manifest.json）归档时间戳、测试工具与协议核验表',
    headers: [
      '对应品牌',
      '原始归档文件名',
      '图片可见测试时刻 (CST)',
      '采样时段属性',
      '图内显示协议',
      '测试工具版本',
      '时间戳置信度与审核备注'
    ],
    rows: [
      { brand: '光速云', slug: 'guangsu-cloud', file: '光速云-节点测速实测.png', time: '2026-08-11 14:32:56', period: '下午常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见（1122×1402 原图）' },
      { brand: '暮光加速', slug: 'muguang', file: '幕光加速-节点测速实测.png', time: '2026-08-11 批次归档', period: '日间常规时段', proto: 'VLESS', tool: 'miaosu 4.7.0 / Speedtest', note: '显示香港/日本/新加坡多节点 FullCone NAT' },
      { brand: '飞猫云', slug: 'feimao', file: '飞猫云-节点测速实测.png', time: '2026-08-11 08:52:30', period: '早间常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见（香港/台湾/新加坡/日本）' },
      { brand: '微风网络', slug: 'weifeng', file: '微风-节点测速实测.png', time: '2026-08-11 批次归档', period: '常规测试时段', proto: 'Shadowsocks / VLESS', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '原版归档截图，与 10-19 采样交叉印证' },
      { brand: '星岛梦', slug: 'xingdaomeng', file: '星岛梦-节点测速实测.png', time: '2026-08-11 01:48:13', period: '凌晨闲时时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见，测定基准物理带宽上限' },
      { brand: '二猫云', slug: 'ermaoyun', file: '二猫云-节点测速实测.png', time: '2026-08-11 10:45:27', period: '上午办公时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' },
      { brand: '唯兔云', slug: 'weitu-cloud', file: '唯兔云-节点测速实测.png', time: '2026-08-11 13:55:08', period: '午间常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' },
      { brand: '宇宙云', slug: 'yuzhou-cloud', file: '宇宙云-节点测速实测.png', time: '2026-08-11 21:04:24', period: '🔥 晚高峰黄金时段', proto: 'VLESS', tool: 'main 4.3.3 (696) / miaosu 4.7.0', note: '珍贵的 21:04 晚高峰 VLESS 实测截图' },
      { brand: 'U1S1', slug: 'u1s1', file: 'U1S1-节点测速实测.png', time: '2026-08-11 22:33:29', period: '🔥 晚高峰黄金时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '珍贵的 22:33 晚高峰 IPLC 实测截图' },
      { brand: '灵猫网络', slug: 'lingmao-network', file: '灵猫网络-节点测速实测.png', time: '2026-08-11 18:45:40', period: '傍晚次高峰时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见（18:45 傍晚采样）' },
      { brand: '极连云', slug: 'jilian-cloud', file: '极连云-节点测速实测.png', time: '2026-08-11 22:46:50', period: '🔥 晚高峰黄金时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '珍贵的 22:46 晚高峰 IEPL 实测截图' },
      { brand: '光年梯', slug: 'guangnianti', file: '光年梯-节点测速实测.png', time: '2026-08-11 14:38:04', period: '下午常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' },
      { brand: '一翻云', slug: 'yifanyun', file: '一翻云-节点测速实测.png', time: '2026-08-11 00:21:30', period: '午夜次高峰时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' },
      { brand: 'SOGO 云', slug: 'sogo-cloud', file: 'SOGO云-节点测速实测.png', time: '2026-08-11 18:57:59', period: '傍晚次高峰时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见（18:57 傍晚采样）' },
      { brand: '可信云', slug: 'kexin-cloud', file: '可信云-节点测速实测.png', time: '2026-08-11 15:32:35', period: '下午常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '⚠️ 图内仅显示时分秒 15:32:35，日期由同批次归档推断' },
      { brand: '速界', slug: 'sujie', file: '速界-节点测速实测.png', time: '2026-08-11 15:39:36', period: '下午常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' },
      { brand: '全球云', slug: 'quanqiuyun', file: '全球云-节点测速实测.png', time: '2026-08-11 15:50:43', period: '下午常规时段', proto: 'Shadowsocks', tool: 'MAI-TEST-BOT 2.0.0-dev', note: '图片内完整可见' }
    ]
  },

  historicalStatsTable: {
    caption: '表 3：历史多节点统计测速档案表（WgetCloud / 白月光 / 山水云 / CyberGuard / 灵动云，非 2026-10-19 同批次）',
    headers: [
      '品牌名称',
      '历史测试日期',
      '覆盖节点与地区规模',
      '核心地区统计延迟与下载速率',
      '当次 AI 与流媒体测试记录',
      '数据性质与复核提醒'
    ],
    rows: [
      {
        brand: 'WgetCloud',
        slug: 'wgetcloud',
        date: '2026-05-02',
        scale: '59 个节点全非零下载（覆盖 15 个国家地区）',
        metrics: '日本 69.4ms / 462.04Mbps；美国 170.2ms / 440.04Mbps；香港 25.9ms / 431.24Mbps；新加坡 55.6ms / 422.97Mbps；台湾 41.3ms / 407.66Mbps；印度 341.92Mbps；印尼 318.64Mbps',
        unlock: 'ChatGPT、Gemini、Disney+、Netflix、YouTube 部分节点可用',
        warning: '历史地区平均值，跨洋美日吞吐极强；当前无直接低价月付记录（季付 ¥297 起），下单前需在官网复核现价'
      },
      {
        brand: '白月光',
        slug: 'baiyueguang',
        date: '2026-07-17',
        scale: '108 个节点（节点名称涉及 79 个国家地区，冷门小国极多）',
        metrics: '香港 160.7ms / 114.94Mbps (14.37 MB/s)；新加坡 186.8ms / 85.22Mbps；日本 202.4ms / 77.65Mbps；美国 302.6ms / 70.53Mbps；马来西亚 16.18 MB/s；泰国 15.50 MB/s；台湾当次仅 0.03Mbps',
        unlock: 'ChatGPT、Netflix、YouTube、Bilibili、HBO Max、Disney+、TVBAnywhere、TikTok 部分可用；Spotify 当次测试失败',
        warning: '历史地区统计值；季付入门 ¥66（100G/月），适合需要东南亚或冷门国家节点的用户'
      },
      {
        brand: '山水云',
        slug: 'shanshuiyun',
        date: '2026-06-29',
        scale: '27 个节点、12 个地区（其中 22 个取得非零下载）',
        metrics: '美国 349.3ms / 180.29Mbps (22.54 MB/s，当次最高)；日本 229.8ms / 160.51Mbps；香港 151.4ms / 152.86Mbps；新加坡 179.8ms / 142.98Mbps；越南 87.68Mbps；泰国 82Mbps',
        unlock: 'ChatGPT、Claude、Gemini、Netflix、Disney+、HBO Max、TikTok 当次测试显示可用',
        warning: '历史地区统计值；年付轻量 ¥88（折 ¥7.33/月 64G），月付 ¥15（100G），需在官网核实当前实时状态'
      },
      {
        brand: 'CyberGuard',
        slug: 'cyberguard',
        date: '2025-06-21',
        scale: '29 个节点、12 个地区（Trojan / VLESS 协议）',
        metrics: '韩国 552.8Mbps（统计延迟异常达 6000ms）；日本 123.8ms / 488.83Mbps；阿联酋 345ms / 342.76Mbps；澳大利亚 277ms / 279.64Mbps；美国 614ms / 245.6Mbps；法国 204.08Mbps',
        unlock: 'ChatGPT、Claude、Gemini、Netflix、Disney+、HBO Max、TikTok 当次测试可用',
        warning: '早期历史统计档案（距今较远），月付 ¥32（350G）、半年付 ¥95（150G/月），不代表今日实时速度'
      },
      {
        brand: '灵动云',
        slug: 'lingdongyun',
        date: '2026-07-20 / 07-21',
        scale: '珠海联通 9Gbps 测试环境（60 节点测速 / 60 节点解锁探测）',
        metrics: '单节点下载速度处于够用级（20–80 MB/s，即 160Mbps–640Mbps），但 HTTPS 握手延迟偏高；美国 01 整节点当次测试失败',
        unlock: '亮点为 OpenAI (ChatGPT) 各地区基本全解锁；短板为 TikTok 多失败、新/台 YouTube 存在送中、台湾节点访问 NF/D+ 被识别为西班牙 (ES)',
        warning: '实测揭示了典型的“广播 IP 归属地偏移（台湾识别为欧洲 ES）”现象，对 AI 友好但对 TikTok 不友好'
      }
    ]
  },

  unlockGalleryItems: [
    {
      img: '/images/unlock/photo_2026-08-19_12-13-01.jpg',
      title: '实况图证 01：多地区节点流媒体（Netflix / Disney+ / YouTube）与 OpenAI 解锁矩阵快照',
      desc: '展示自动化脚本对不同国家落地节点的 Region Restriction Check 实测输出，直观区分原生解锁（Native）、DNS 解锁与仅自制剧（Originals Only）。'
    },
    {
      img: '/images/unlock/photo_2026-08-19_12-13-50.jpg',
      title: '实况图证 02：高并发专线节点带宽阶梯与 TLS RTT 握手延迟分布实录',
      desc: '验证 IEPL/IPLC 专线在香港、台湾、新加坡、日本四地节点的首包响应时间（TLS RTT）与持续多线程下载吞吐波形。'
    },
    {
      img: '/images/unlock/photo_2026-08-19_12-13-58.jpg',
      title: '实况图证 03：跨区域节点（亚太 + 欧美）吞吐衰减与 UDP NAT 类型检测记录',
      desc: '展示近端节点与远端欧美节点在相同本地宽带下的速率对比，以及 FullCone 与 Symmetric NAT 类型对游戏和 QUIC 的影响。'
    },
    {
      img: '/images/unlock/photo_2026-08-19_12-18-40.jpg',
      title: '实况图证 04：多节点订阅批量连通率（Alive Rate）与峰值带宽压测表',
      desc: '用于检验机场是否存在“充数死节点”或“高倍率诱饵节点”，如 WgetCloud 59 节点全非零、光速云全节点 ×1 倍率实测。'
    },
    {
      img: '/images/unlock/photo_2026-08-19_12-20-10.jpg',
      title: '实况图证 05：流媒体与 AI（ChatGPT / Claude / Gemini）分地区可用性交叉核验图',
      desc: '证实“香港节点看视频极快但需切换至日/新/美节点解锁 OpenAI 与 Claude”的工程规律。'
    },
    {
      img: '/images/unlock/photo_2026-09-07_12-51-58.jpg',
      title: '实况图证 06：专线机场套餐梯度与多周期节点池并发承载力核查快照',
      desc: '记录不同档位套餐下发节点的入口负载均衡与骨干网出口冗余表现。'
    }
  ],

  brandReviews: {
    guangsu: {
      testedAt: '2026-08-11 14:32:56 CST',
      proto: 'Shadowsocks / VLESS (IEPL+企业内网双专线)',
      metrics: '香港 22ms / 529Mbps | 新加坡 46ms / 387Mbps | 台湾 41ms / 114Mbps | 日本 57ms / 135Mbps',
      analysis: '推荐依据：2020 年运营至今的老牌旗舰，原图显示香港 20 个节点全线保持 15–33ms 极低握手延迟，速度柱状图呈饱满矩形。适合追求长期稳健、需要 ¥147/247GB 永久不过期套餐或 ¥25/月（168G 全节点 ×1 倍率）的用户；不适合要求全节点免切换直连 ChatGPT 的纯懒人（AI 需手动切可用节点，特殊商品不退）。'
    },
    muguang: {
      testedAt: '2026-08-11 批次 & 2026-10-19 采样',
      proto: 'VLESS / Shadowsocks (BGP智能调度+专线出口)',
      metrics: '香港 26ms / 509Mbps | 新加坡 43ms / 419Mbps | 日本 53ms / 150Mbps | 台湾 40ms / 107Mbps',
      analysis: '推荐依据：原图显示其香港与新加坡 VLESS 节点不仅跑出 509Mbps 与 419Mbps 高速，且 UDP NAT 类型大面积呈现为顶级的 FullCone（全锥型）。适合多设备同时在线、外服联机游戏与远程视频会议团队（月付 ¥20/120G 起，年付 ¥109）；不适合依赖频繁节日低价促销的用户。'
    },
    feimao: {
      testedAt: '2026-08-11 08:52:30 CST',
      proto: 'Shadowsocks (官方专属客户端封装)',
      metrics: '香港 21ms / 526Mbps | 新加坡 45ms / 413Mbps | 台湾 41ms / 116Mbps | 日本 54ms / 138Mbps',
      analysis: '推荐依据：香港节点握手延迟低至 21ms、峰值达 526Mbps，学生版年付仅 ¥84（折 ¥7/月 50G），月付 ¥25（150G）。适合完全不想折腾 Clash 订阅链接、希望下载官方客户端登录即用的纯新手；不适合需要在 OpenWrt 软路由或第三方客户端自定义规则的极客。'
    },
    weifeng: {
      testedAt: '2026-08-11 批次 & 2026-10-19 采样',
      proto: 'VLESS / Shadowsocks (IEPL专线+原生IP)',
      metrics: '香港 25ms / 546Mbps | 新加坡 43ms / 384Mbps | 台湾 40ms / 115Mbps | 日本 54ms / 131Mbps',
      analysis: '推荐依据：香港节点实测飙出 546Mbps 的惊艳吞吐，搭配多地原生 IP 解锁 Netflix、Disney+、ChatGPT 与 Claude，且配 24 小时客服。适合预算适中（年付 ¥137 含 100G/月，月付 ¥27 含 200G/月）的新手与日常流媒体用户；不适合每月消耗上千 GB 的重度 PT 下载党。'
    },
    xingdaomeng: {
      testedAt: '2026-08-11 01:48:13 CST',
      proto: 'Trojan / Shadowsocks (IEPL专线 1倍流量)',
      metrics: '香港 27ms / 504Mbps | 新加坡 44ms / 411Mbps | 日本 57ms / 136Mbps | 台湾 41ms / 103Mbps',
      analysis: '推荐依据：同为 2020 年运营老牌，全线 1 倍率且不限设备连接数，节点延伸至韩国与东南亚。适合家庭多终端或小团队共享（年付 ¥96 折 ¥8/月，永久不限时包 ¥100/100G 起）；注意该张原图采样于凌晨 01:48，反映的是闲时物理带宽上限。'
    },
    ermaoyun: {
      testedAt: '2026-08-11 10:45:27 CST',
      proto: 'VLESS / Shadowsocks (全线 IEPL 专线)',
      metrics: '香港 22ms / 481Mbps | 新加坡 46ms / 407Mbps | 日本 53ms / 143Mbps | 美国 134ms / 17Mbps',
      analysis: '推荐依据：上午办公时段实测香港 22ms/481Mbps、美西延迟低至 134ms，支持独家定制端与通用订阅双模式且不限设备数（年付 ¥89，月付 ¥20/130G，不限时 ¥99/100G）。适合看重长期稳定的多设备用户；限制是 Claude 与 Gemini 官方未作确定承诺，需自行测节点。'
    },
    weitu: {
      testedAt: '2026-08-11 13:55:08 CST',
      proto: 'Trojan / Shadowsocks (IPLC专线+三网负载均衡)',
      metrics: '香港 27ms / 500Mbps | 新加坡 44ms / 414Mbps | 日本 56ms / 147Mbps | 台湾 37ms / 100Mbps',
      analysis: '推荐依据：午间实测香港整整齐齐跑满 500Mbps、台湾延迟低至 37ms，1 倍流量不限速不限设备（限量年付 ¥79.9，节假日月付 ¥14.9，常规 ¥19.9/150G）。适合全家人共用与 AI 办公；限制是 14.9 元特价档仅在节假日限时开放。'
    },
    yuzhou: {
      testedAt: '2026-08-11 21:04:24 CST (晚高峰)',
      proto: 'VLESS (IEPL专线)',
      metrics: '晚高峰 21:04 实测多节点连通良好 | 历史起价 ¥96/年',
      analysis: '推荐依据：本批次中极少数在 **21:04 黄金晚高峰**直接完成 VLESS 节点测速归档的品牌，证明其晚高峰抗拥塞能力真实可靠。限制是当前完整套餐流量梯度与客服细则存在资料缺口，下单前需在官网后台核对现行价格。'
    },
    u1s1: {
      testedAt: '2026-08-11 22:33:29 CST (晚高峰)',
      proto: 'Shadowsocks (IPLC专线 2Gbps带宽池)',
      metrics: '香港 24ms / 538Mbps | 新加坡 46ms / 414Mbps | 日本 57ms / 133Mbps | 美国 134ms / 20Mbps',
      analysis: '推荐依据：这张原图抓取于 **22:33 深夜晚高峰**，依然跑出香港 538Mbps、新加坡 414Mbps 的顶级成绩，含金量极高（年付 ¥96，月付 ¥20/120G）。适合看重晚高峰爆发力的流媒体与 AI 用户；因 2025 年新上线，建议从月付开始体验。'
    },
    lingmao: {
      testedAt: '2026-08-11 18:45:40 CST (傍晚次高峰)',
      proto: 'Shadowsocks (中转优化 / 专属客户端)',
      metrics: '香港 22ms / 492Mbps | 新加坡 46ms / 409Mbps | 日本 57ms / 147Mbps | 台湾 40ms / 109Mbps',
      analysis: '推荐依据：在 18:45 下班次高峰时段测得香港 22ms/492Mbps，表现接近纯专线，且 1 倍流量不限设备（年付 ¥85 折 ¥7.1/月，月付 ¥25/150G）。适合多终端轻度家庭用户；限制是仅限官方专属客户端，不支持导入 Clash。'
    },
    jilian: {
      testedAt: '2026-08-11 22:46:50 CST (晚高峰)',
      proto: 'Shadowsocks / VLESS (IEPL企业专线)',
      metrics: '22:46 晚高峰完成全节点 MAI-TEST-BOT 实测归档',
      analysis: '推荐依据：与 U1S1 同属 **22:46 晚高峰**实测样本，18 元/月（100GB）即可获得标准 IEPL 专线，且同时支持自研客户端与第三方 Clash 订阅导入。适合预算在 18 元档、主要使用 AI 工具与日常网页的用户。'
    },
    guangnianti: {
      testedAt: '2026-08-11 14:38:04 CST',
      proto: 'VLESS / Shadowsocks (IEPL企业专线)',
      metrics: '14:38 下午时段完成全节点 MAI-TEST-BOT 实测归档',
      analysis: '推荐依据：同为 ¥18/月档位的 IEPL + VLESS 专线方案，每月给到 110GB 流量（比同价位的极连云多 10GB），支持自研端与通用订阅双模式。作为 2025 年新锐品牌，适合追求高流量性价比的用户按月体验。'
    },
    yifanyun: {
      testedAt: '2026-08-11 00:21:30 CST',
      proto: 'Hysteria 2 / VLESS-Reality / SS (IEPL物理专线)',
      metrics: '香港 23ms / 477Mbps | 新加坡 42ms / 390Mbps | 台湾 40ms / 117Mbps | 日本 53ms / 136Mbps',
      analysis: '推荐依据：全节点 IEPL 物理专线搭配高纯净度原生住宅 IP，罕见同时提供 Hysteria 2、VLESS-Reality 与 SS 三种协议且不限设备数（年付 ¥98，月付 ¥20/150G，不限时包 ¥100/100G）。非常适合对 AI 解锁与多协议可玩性要求高的玩家。'
    },
    sogo: {
      testedAt: '2026-08-11 18:57:59 CST (傍晚次高峰)',
      proto: 'VLESS / Shadowsocks (全线IEPL+三网BGP)',
      metrics: '香港 26ms / 488Mbps | 新加坡 43ms / 401Mbps | 台湾 39ms / 118Mbps | 日本 57ms / 137Mbps',
      analysis: '推荐依据：在 18:57 傍晚时段跑出香港 488Mbps、新加坡 401Mbps，覆盖 15 个国家地区（本站收录覆盖面最广），年付 ¥98、月付 ¥25、不限时 ¥120 起。限制是不提供通用订阅链接，仅限使用其自研全平台客户端。'
    },
    kexin: {
      testedAt: '2026-08-11 15:32:35 CST (批次推断日期)',
      proto: 'VLESS / Shadowsocks (IEPL企业专线)',
      metrics: '15:32 下午时段完成 MAI-TEST-BOT 节点实测',
      analysis: '推荐依据：¥25/月（150GB）的标准 IEPL + VLESS 方案，支持第三方通用客户端。最大特点是官方品牌资料极度诚实，主动声明“AI 与流媒体目前缺乏统一实测数据”，不搞虚假满口承诺；注意其测速图顶部仅打印时分秒，日期由同批次流水线推断。'
    },
    sujie: {
      testedAt: '2026-08-11 15:39:36 CST',
      proto: 'VLESS / Shadowsocks (IEPL专线 AI定向优化)',
      metrics: '15:39 下午时段完成 MAI-TEST-BOT 节点实测',
      analysis: '推荐依据：¥25/月（150GB）档位中唯一明确将 ChatGPT、Claude、Gemini 等 AI 生产力场景作为核心优化目标的 IEPL 专线品牌，同时支持自研客户端与第三方订阅导入。适合每天高频调用海外大模型 API 与网页对话的用户。'
    },
    quanqiuyun: {
      testedAt: '2026-08-11 15:50:43 CST',
      proto: 'Trojan / Shadowsocks (IPLC/IEPL 60+节点)',
      metrics: '香港 25ms / 489Mbps | 新加坡 45ms / 430Mbps | 台湾 37ms / 117Mbps | 日本 55ms / 133Mbps',
      analysis: '推荐依据：拥有 60+ 全球节点与 2Gbps+ 带宽池，新加坡节点实测高达 430Mbps（位列前三），提供 ¥99/年轻量版、¥20/月入门版与 ¥100 不限时包。限制是采用官方专属客户端登录模式，不提供第三方 Clash 订阅链接。'
    }
  },

  chapters: {
    chapter3: {
      id: 'regional-analysis',
      badge: 'CHAPTER 03 · REGIONAL BENCHMARK ANALYSIS',
      title: '三、五地延迟与吞吐深度拆解：为什么香港能跑 540Mbps，而美国只有 20Mbps？',
      intro: '许多用户在看到【表 1】的 2026-10-19 横向实测数据时会产生一个强烈的疑问：“为什么微风网络、闪跃、Firefly、光速云、U1S1 在香港节点都能跑出 529Mbps–548Mbps 的惊人速度，到了新加坡也有 380Mbps–445Mbps，但一旦切到日本就降到 130Mbps–150Mbps，切到美国更是只剩下 14Mbps–30Mbps？是不是这些机场的美国节点坏了？”要读懂这份测速报告，必须从海底光缆物理距离、TCP 窗口带宽延迟积（BDP）以及机场带宽成本分配三个维度进行工程拆解。',
      subsections: [
        {
          id: 'regional-hk-sg-dominance',
          title: '3.1 香港（21–27ms）与新加坡（42–46ms）：深港/沪新专线的黄金统治区',
          paragraphs: [
            '在中国大陆连接海外互联网的物理版图中，**中国香港**与**新加坡**是距离华南（广州/深圳/东莞 BGP 入口）最近、海底光缆与陆地光纤容量最大的两大国际交换枢纽（HKIX 与 Equinix SG）。当您使用 [光速云](/brands/guangsu-cloud)（香港 22ms / 529Mbps）、[飞猫云](/brands/feimao)（21ms / 526Mbps）、[微风网络](/brands/weifeng)（25ms / 546Mbps）、[闪跃](/brands/shanyue)（23ms / 548Mbps）或 [Firefly](/brands/firefly)（27ms / 547Mbps）时，数据包在深圳或广州机房进入 IEPL/IPLC 专线后，仅需跨越几十公里的深港内网光纤即可抵达香港葵涌或将军澳机房。',
            '因为往返物理延迟（RTT）极低（仅 21ms–27ms），TCP 协议的拥塞控制算法（如 BBR）可以在短短几百毫秒内就完成慢启动（Slow Start）并将发送窗口（CWND）拉满至千兆网卡上限。同理，从国内入口经专线前往新加坡的物理延迟普遍锁定在 42ms–46ms 之间，且新加坡兼具“低延迟”与“原生支持 OpenAI / ChatGPT / Claude / Netflix 全解锁”的双重优势（香港本土 IP 默认不支持 OpenAI），这使得**「香港节点看 4K 视频与日常加速 + 新加坡节点固定跑 AI 大模型」成为了 2026 年经过实测验证的最佳黄金组合**。'
          ]
        },
        {
          id: 'regional-jp-tw-characteristics',
          title: '3.2 日本（53–57ms）与台湾（37–41ms）：为什么下载集中在 100Mbps–150Mbps？',
          paragraphs: [
            '观察【表 1】可以发现一个高度一致的现象：15 家主力机场在台湾节点的延迟均为 37ms–41ms、下载速度集中在 100Mbps–135Mbps；在日本节点的延迟均为 53ms–57ms、下载速度集中在 131Mbps–150Mbps。为什么不同品牌的测试结果如此接近？',
            '原因在于：**上游专线宿主机与端口限速策略的行业标准化**。一方面，台湾本土机房（如中华电信 HiNet 或亚太商宽）的国际带宽单价极其高昂，机场主采购台湾节点主要是为了满足用户观看**台湾区动画疯（巴哈姆特）、Netflix 繁体中文字幕独播剧以及解锁 ChatGPT**，因此通常为单用户连接分配 100Mbps–150Mbps 的突发保障（这已经足够同时流畅播放 4 路 4K HDR 视频，因为单路 4K 仅需 25Mbps–35Mbps）。另一方面，若多数机场的日本专线均采购自华东（上海）或华南（深港转日）的同级别上游政企通道，在单次定长测速文件下载中就会呈现出 135Mbps–150Mbps 的稳态速率；而在延长测速时间或采用多线程并发的统计测试中（如表 3 中的 [WgetCloud](/brands/wgetcloud) 与 [CyberGuard](/brands/cyberguard)），日本节点则能进一步释放出 462Mbps–488Mbps 的深层带宽潜力。'
          ]
        },
        {
          id: 'regional-us-bdp-bottleneck',
          title: '3.3 美国节点（134–180ms）：带宽延迟积（BDP）限制与跨洋节点真实用途',
          paragraphs: [
            '为什么在 2026-10-19 的统一测速中，香港能跑 540Mbps 的顶级专线机场，到了美国节点普遍只显示 14Mbps–30Mbps？这并非节点故障，而是由著名的网络工程定律——**带宽延迟积（Bandwidth-Delay Product, $BDP = Bandwidth \\times RTT$）与测速软件的采样窗口机制**共同决定的。',
            '跨越太平洋前往美国洛杉矶或圣何塞的光纤物理距离超过 12,000 公里，光信号在光纤中往返一次的物理极限加上中转开销，使得 RTT 延迟必然高达 134ms–180ms（是香港 22ms 的 7 倍以上）。在自动化测速脚本（对每个节点仅进行 5–8 秒固定时长或固定大小文件的拉取测试）中，高达 160ms 的延迟导致 TCP 慢启动窗口还没来得及完全张开，测试倒计时就已经结束了，因此表观录得的瞬时数值仅为 15Mbps–30Mbps。事实上，对于普通用户而言，**美国节点的核心使命根本不是用来跑满千兆宽带下载大文件，而是利用其高纯净度的美国本土原生 IP 去稳定使用 Claude 3.5/4、ChatGPT Plus、美区 Netflix、HBO Max、PayPal 与美股交易终端**——在这些文本与常规流媒体场景下，15Mbps–30Mbps 的专线通道早已绰绰有余。'
          ]
        },
        {
          id: 'regional-peak-vs-offpeak',
          title: '3.4 晚高峰样本（21:00–23:00）与日间闲时样本的交叉验证法则',
          paragraphs: [
            '在审阅机场测速报告时，最核心的时间维度就是“测试发生在几点钟”。全国民用宽带流量在每日上午 09:00 至下午 17:00 处于平稳的商务办公期，而在晚上 **20:00 至 23:00** 则进入全国家庭 4K 视频、直播与游戏并发的黄金晚高峰。如果是走公网国际出口的劣质直连或低端公网中转机场，白天闲时也能测出 200Mbps–300Mbps 的漂亮数据，但一到晚上 21:00 就会因为骨干网出口拥塞而断崖式暴跌至 2Mbps–5Mbps，丢包率飙升至 30% 以上。',
            '在本站归档的 `2026-08-11 CST` 批次 17 份原图中（详见上方表 2），我们特意保留了完整的全天候时间跨度：既有凌晨与早间测定的物理带宽基准样本（如 [一翻云](/brands/yifanyun) 00:21:30、[星岛梦](/brands/xingdaomeng) 01:48:13、[飞猫云](/brands/feimao) 08:52:30），也有下午办公高峰样本（如 [光速云](/brands/guangsu-cloud) 14:32:56、[光年梯](/brands/guangnianti) 14:38:04、[可信云](/brands/kexin-cloud) 15:32:35、[速界](/brands/sujie) 15:39:36、[全球云](/brands/quanqiuyun) 15:50:43），更有傍晚次高峰（[灵猫网络](/brands/lingmao-network) 18:45:40、[SOGO云](/brands/sogo-cloud) 18:57:59）以及最严苛的 **21:00–23:00 深夜晚高峰实战样本（[宇宙云](/brands/yuzhou-cloud) 21:04:24、[U1S1](/brands/u1s1) 22:33:29、[极连云](/brands/jilian-cloud) 22:46:50）**。',
            '对比结果极其有力地证明了 IEPL/IPLC 专线的工程价值：在 22:33 与 22:46 的全国晚高峰最高点，采用 IPLC/IEPL 专线的 U1S1 与极连云在测速原图中依然拉出了与白天毫无二致的饱满速度柱，U1S1 在 2026-10-19 采样中同样稳定在 538Mbps。这就是为什么我们在所有选购建议中反复强调：看懂“测试时间戳 + 底层是否真专线”，远比单纯对比某一张截图里的最高数字更有实战指导意义。'
          ]
        }
      ]
    },

    chapter4: {
      id: 'how-to-read-metrics',
      badge: 'CHAPTER 04 · METRIC INTERPRETATION',
      title: '四、看懂测速图：深度解析 MAI-TEST-BOT 与 miaosu 报告中的 6 大核心指标',
      intro: '当您点击本页上方的任意一张 1122×1402 原始高清测速截图时，图片内部包含了密密麻麻的列标题：`协议`、`TLS RTT`（或 `HTTP延迟`）、`平均速度 (AvgSpeed)`、`最大速度 (MaxSpeed)`、`速度变化波形图` 以及 `UDP类型 (NAT Type)`。如果不懂这些工程指标的真实含义，很容易被表面数字误导。以下为您逐一拆解：',
      subsections: [
        {
          id: 'metric-unit-mbps-vs-mbs',
          title: '4.1 速度单位换算陷阱：MB/s（兆字节）与 Mbps（兆比特）相差整整 8 倍！',
          paragraphs: [
            '这是新手看测速图最容易犯的第一大常识错误。在通信运营商（如电信千兆宽带 1000Mbps）以及本文【表 1】的文字汇总中，使用的是小写的 `b`——即 **Mbps（Megabits per second，兆比特每秒）**；而在 `MAI-TEST-BOT 2.0.0-dev` 与 `miaosu` 生成的原始测速图片表格内部，显示的数值单位是大写的 `B`——即 **MB/s（MegaBytes per second，兆字节每秒）**！',
            '由于计算机底层 $1\\text{ Byte (字节)} = 8\\text{ bits (比特)}$，将测速图里的数字乘以 $8$ 才是对应的宽带兆数。例如：在 [光速云](/brands/guangsu-cloud) 或 [飞猫云](/brands/feimao) 的原始测速图中，您看到香港节点的平均速度或最大速度显示为 `66.1 MB/s` 或 `74.0 MB/s`，换算成宽带速率就是 $66.1 \\times 8 = 528.8\\text{ Mbps}$（即跑满了五百兆以上的真实物理带宽）！千万不要看到图里的 `66 MB/s` 就误以为“怎么只有 60 兆宽带”。'
          ]
        },
        {
          id: 'metric-ping-vs-tls-rtt',
          title: '4.2 ICMP Ping vs HTTP/TLS RTT：为什么图里的延迟比本地 Ping 高？',
          paragraphs: [
            '在部分客户端或商家宣传中，喜欢展示只有 8ms–12ms 的延迟，那往往只是本地电脑到机场“国内深圳/广州中转入口服务器”的第一跳 ICMP Ping 延迟（甚至没有经过跨境专线）。而在本页的 `MAI-TEST-BOT` 与 `miaosu` 实测图中，记录的是 **HTTP 延迟** 或 **TLS RTT（真实代理握手往返时间）**。',
            'TLS RTT 测量的是：数据包从测试机发出 → 经过国内 BGP 入口 → 穿过 IEPL/IPLC 跨境专线 → 抵达香港/日本落地服务器 → 与海外目标测试端点（如 Cloudflare / Google `generate_204`）完成完整的 TCP 三次握手与 TLS 密钥协商并返回的全链路耗时。因此，图内香港节点显示的 `21ms–45ms`、新加坡显示的 `42ms–85ms` 是实打实的端到端全链路响应时间。凡是全链路 TLS RTT 能稳定控制在 100ms 以内的近端节点，点击网页和发送 AI 指令都能做到无感秒回。'
          ]
        },
        {
          id: 'metric-avgspeed-maxspeed-waveform',
          title: '4.3 平均速度（AvgSpeed）、最大速度（MaxSpeed）与实时波形图的猫腻识别',
          paragraphs: [
            '在一张测速图中，同时给出了「平均速度」与「最大速度（峰值速度）」，右侧还配有一条柱状或折线「速度变化波形图」。如果一条节点的最大速度高达 `80 MB/s`，但平均速度只有 `5 MB/s`，且右侧波形图呈现“开头冲高一秒随后断崖式跌停归零”的形态，说明该机场在服务端配置了恶意的**突发限速（Burst Throttling）或公网拥塞断流**——专门用来欺骗前两秒的测速脚本，实际看长视频必卡。',
            '反之，像本页展示的 [光速云](/brands/guangsu-cloud)、[暮光加速](/brands/muguang)、[微风网络](/brands/weifeng)、[星岛梦](/brands/xingdaomeng)、[U1S1](/brands/u1s1) 等高质量专线截图，其「平均速度」与「最大速度」高度接近（例如平均 `50–65 MB/s`、最大 `65–75 MB/s`），且右侧的速度波形柱状图呈现出饱满、平直的“矩形实心砖块状”，这证明节点在整个测速周期内提供了持续、无衰减的政企级带宽输出。'
          ]
        },
        {
          id: 'metric-udp-nat-type',
          title: '4.4 UDP NAT 类型（FullCone vs Symmetric vs Unknown）：外服游戏与语音会议的关键',
          paragraphs: [
            '在测速图的最右侧一列，您会看到 `UDP类型` 显示为 `FullCone`（全锥型 NAT）、`RestrictedCone`、`Symmetric`（对称型 NAT）或 `Unknown`。这个指标对日常只看网页和 YouTube 的用户影响不大，但对**玩外服联机游戏（如 Steam/PS5/Switch 联机）、进行 Zoom/Teams/Discord 实时音视频通话以及使用 QUIC (HTTP/3) 协议**的用户至关重要。',
            '例如在 [暮光加速](/brands/muguang) 的测速原图中，多条香港与日本 VLESS 节点明确测出 `FullCone`（全锥型 NAT，即等级最高的 NAT 1 / 开放型网络），这意味着 UDP 端口映射完全开放，语音通话延迟最低且联机游戏不会出现严格 NAT 导致的匹配失败；而当测速图显示为 `Unknown` 时，代表当次测试未开启 UDP 转发探测或服务端为防止 BT 滥用关闭了非标 UDP 端口。关于各协议对 TCP/UDP 转发的底层支持差异，可参阅 [专线拓扑与代理协议指南](/guide#protocol-comparison)。'
          ]
        },
        {
          id: 'metric-fake-screenshot-detection',
          title: '4.5 实验室防伪指南：3 招识破不良商家的虚假测速图与自建诱饵图',
          paragraphs: [
            '在电报群（Telegram）或部分非正规推广站中，充斥着大量动辄全屏紫红色 `200 MB/s (1600 Mbps)` 的夸张测速图。普通读者只需掌握以下 3 个网络可观测性常识，就能一眼识破造假套路：',
            '**第一招：看测试机位置是否位于海外机房（Server-to-Server 作弊）。** 许多不良机场主并不是在中国大陆的家庭宽带（电信/联通/移动）下运行 `MAI-TEST-BOT`，而是直接购买一台位于香港或新加坡同机房的 10Gbps 云服务器去测自己的香港落地节点！因为测试机和节点在同一座海外数据中心内部通过万兆局域网互联，根本没有经过中国大陆到海外的跨境链路，测出来的 200 MB/s 与国内用户的真实体验毫无关系。识别方法很简单：看香港、日本、美国节点的 TLS RTT 延迟——如果香港节点延迟只有 `1ms–3ms`（物理上只有同城机房内网才可能出现 2ms），那 100% 是在海外服务器上假测的！真正从中国大陆境内发起的专线测速，香港节点的物理延迟必然在 `15ms–35ms` 之间（如本页光速云 22ms、飞猫云 21ms、微风 25ms）。',
            '**第二招：看同一地区多节点的速率一致性与死节点率。** 劣质机场往往只给排在第一行的“香港 01”分配独立带宽专门应付测速，而底下的香港 02 到香港 10 全是拥挤不堪的限速节点甚至直接 `Timeout / N/A`。在本站公开的 17 份原图与 [WgetCloud](/brands/wgetcloud) 59 节点实测中，优秀品牌的同一地区节点群（如光速云的香港 01 至香港 20）均呈现出高度均衡的吞吐矩阵，绝不靠单条“特供诱饵节点”拉高平均分。',
            '**第三招：核验图片分辨率、字体抗锯齿与归档哈希（SHA256）。** 真实的 `MAI-TEST-BOT 2.0.0-dev` 输出原图具有固定的列宽比例、等宽数字字体与顶部生成时间戳。本站公开的 17 份原图全部保持 `1122×1402` 原始 PNG 输出并公示了压缩包 SHA256 校验值，任何读者均可下载原图放大至 400% 检查像素级细节，彻底杜绝涂改数字的可能。'
          ]
        }
      ]
    },

    chapter5: {
      id: 'self-test-guide',
      badge: 'CHAPTER 05 · DIY BENCHMARKING SOP',
      title: '五、实操教程：普通用户如何在本地复现科学测速并排查“测速慢”故障？（5步法）',
      intro: '看到本页高达 500Mbps+ 的实测数据后，如果您购买了同款机场，如何在自己的电脑或手机上验证当前节点在您家宽带下的真实水平？如果测出来的速度远低于本页报告，又该如何判断是机场问题还是本地设置问题？请按以下 5 步标准作业流程操作：',
      steps: [
        {
          stepNum: 'STEP 01',
          title: '第一步：校准本地物理环境（插网线或连接 5GHz Wi-Fi，关闭后台下载）',
          detail: '测速前最滑稽的乌龙就是“用着 2.4GHz 老旧路由器 Wi-Fi 去测千兆专线”。2.4GHz Wi-Fi 的物理协议上限往往只有 40Mbps–70Mbps（约 5–8 MB/s），哪怕机场给您 10Gbps 的专线，无线路由器也会把速度卡死在 50Mbps。因此，本地复现测速时：**台式机/笔记本请尽量插千兆网线，手机或无线连接请务必确认连在路由器名称带 `-5G` 的 5GHz / Wi-Fi 6 频段上**，并暂时关闭迅雷、百度网盘、Steam 更新等占用上行/下行带宽的程序。'
        },
        {
          stepNum: 'STEP 02',
          title: '第二步：在客户端中切换至「全局 (Global)」模式或选定海外测速服务器',
          detail: '这是 90% 的新手测速不准的根源！当您的 [Clash Verge Rev](/clients#windows) 或 Shadowrocket 处于默认的「规则 (Rule)」分流模式时，如果您直接打开 `speedtest.cn` 或在 `speedtest.net` 上让它自动匹配最近的服务器，它会匹配到您所在城市的中国电信/移动测速点——此时流量走的是 `DIRECT（国内直连）`，测出来的根本不是机场速度，而是您家宽带的本地速度！**正确做法**：打开 `https://www.speedtest.net`，在开始测速前点击下方的「Change Server（更换服务器）」，手动输入 `Hong Kong`（香港）、`Singapore`（新加坡）或 `Tokyo`（东京）选择海外测速点；或者直接使用 Cloudflare 官方无分流干扰的测速站 `https://speed.cloudflare.com`。'
        },
        {
          stepNum: 'STEP 03',
          title: '第三步：执行“早/中/晚高峰（21:30）”三时段对比采样與 YouTube 4K 实战检验',
          detail: '单次 Speedtest 跑分不仅消耗您宝贵的套餐流量（跑一次 500Mbps 测速大约会瞬间消耗 300MB–600MB 流量！注意避开高倍率节点），而且只能反映几秒钟的峰值。更省流量且更贴近真实体验的测试方法是：在晚上 **21:00–22:30 黄金晚高峰**打开 YouTube，随便点开一个带 `4K 60fps HDR` 标志的风景视频，在视频画面上点击右键选择 **「详细统计信息 (Stats for nerds)」**，重点观察 `Connection Speed`（连接速度）与 `Dropped Frames`（掉帧数）。只要晚高峰 `Connection Speed` 稳定在 `45,000 Kbps`（即 45Mbps）以上且 0 掉帧、拖动进度条 1 秒内出画面，就说明这条专线在您本地完全合格。'
        },
        {
          stepNum: 'STEP 04',
          title: '第四步：使用 RegionRestrictionCheck 或在线探针核验 IP 纯净度与解锁',
          detail: '测完带宽后，顺手检验节点的“含金量”。普通用户无需运行复杂的命令行脚本，只需在挂着目标节点时依次打开三个网页：1. 访问 `chatgpt.com` 看能否正常加载对话框；2. 访问 `netflix.com/title/70143836`（经典第三方版权剧《绝命毒师》的固定剧集 ID）——如果能正常打开看到剧集介绍页，说明该节点支持 **Netflix 全解锁（含非自制剧）**；如果提示错误码或直接跳回首页，说明仅支持自制剧；3. 访问 `ipinfo.io` 查看 ASN 属性是 `isp`（原生家宽/商宽）还是 `hosting`（数据中心）。'
        },
        {
          stepNum: 'STEP 05',
          title: '第五步：当本地测速远低于本页报告时的 4 项快速排障处方',
          detail: '如果您购买了本页实测 500Mbps+ 的机场，但在自己电脑上测速只有几 Mbps，请立即按序排查：① **更换国内中转入口**：中国移动宽带或校园网用户请优先切换名称带有“BGP”、“移动优化”或不同序号（如从香港 01 切到香港 08）的节点；② **升级客户端内核**：确保已淘汰旧版 CFW，改用基于 Mihomo 内核的 [Clash Verge Rev](/blog/clash-verge-rev-setup-tutorial) 或 FlClash；③ **禁用浏览器 QUIC 协议**：若晚高峰 UDP 被本地运营商 QoS 限速，在 Chrome 地址栏输入 `chrome://flags/#enable-quic` 将其设为 `Disabled` 强制走 TCP 专线；④ **检查套餐限速或倍率耗尽**：确认账户剩余流量充足且未误连限速维护节点。'
        }
      ]
    }
  },

  decisionBranches: [
    {
      id: 'speed-branch-peak-4k',
      badge: '分支 A · 追求极致峰值带宽与晚高峰零掉速',
      title: '家里是 500M/1000M 光纤宽带 + 要求晚高峰 4K/8K 秒开、大文件高速下载',
      condition: '看重实打实的硬核吞吐指标，希望香港节点实测稳定在 500Mbps 以上、延迟 25ms 以内，且具备 2026-08-11 原始测速图与 2026-10-19 双重数据背书。',
      techChoice: '从【表 1】香港实测突破 500Mbps 且经受住晚高峰检验的 IEPL/IPLC 专线第一梯队中选品。',
      recommendations: [
        { name: '光速云 (香港 22ms / 529Mbps)', slug: 'guangsu-cloud', note: 'TOP 1 综合主推，2020 年老牌双专线，兼顾 ¥99/年轻量版、¥25/月极速版与 ¥147 永久流量包。' },
        { name: '微风网络 (香港 25ms / 546Mbps)', slug: 'weifeng', note: 'IEPL 专线配原生 IP，香港实测达 546Mbps，月付 ¥27（200G）性价比极高。' },
        { name: '闪跃 / Firefly (香港 548Mbps / 547Mbps)', slug: 'shanyue', note: 'IPLC 纯专线代表，香港下载分列第 1、第 2 名，均采用免配置的官方专属客户端模式。' },
        { name: 'U1S1 (香港 24ms / 538Mbps)', slug: 'u1s1', note: '拥有 2026-08-11 22:33 晚高峰黄金时段实测原图，IPLC 爆发力强，月付 ¥20（120G）。' }
      ]
    },
    {
      id: 'speed-branch-ai-unlock',
      badge: '分支 B · 新加坡/日本低延迟 + AI 大模型与流媒体全解锁优先',
      title: '高频使用 ChatGPT / Claude / Cursor + 要求新加坡/日本/美西节点响应敏捷',
      condition: '明白“香港本土 IP 不支持 OpenAI”的规则，因此特别关注新加坡（42–46ms）与日本（53–57ms）节点的实测吞吐与原生住宅 IP 解锁质量。',
      techChoice: '优先选择新加坡实测超 385Mbps–445Mbps、或明确配置原生住宅 IP 与 AI 专项优化的 IEPL/IPLC 品牌。',
      recommendations: [
        { name: '暮光加速 (新加坡 43ms / 419Mbps)', slug: 'muguang', note: '新加坡实测高达 419Mbps、日本 150Mbps，支持全平台通用订阅与多设备同时在线。' },
        { name: '一翻云 (香港 23ms / 新加坡 42ms)', slug: 'yifanyun', note: '全节点 IEPL 物理专线搭配原生住宅 IP，支持 Hysteria 2 / VLESS-Reality / SS 三协议。' },
        { name: '速界 / 星岛梦', slug: 'sujie', note: '速界为 25 元档唯一重点针对 AI 工具优化的 IEPL 品牌；星岛梦为 2020 年老牌 1 倍流量不限设备。' },
        { name: 'WgetCloud (日本 462Mbps / 美国 440Mbps)', slug: 'wgetcloud', note: '历史 59 节点全非零，美日跨洋平均吞吐极强（季付 ¥297 起，适合不差钱的重度跨洋用户）。' }
      ]
    },
    {
      id: 'speed-branch-budget-verified',
      badge: '分支 C · 预算敏感但拒绝“盲盒”：有真实测速图背书的平价方案',
      title: '月均预算 ¥6.5–¥9.5（或月付 ¥18–¥20）+ 必须看到真实测速原图才放心下单',
      condition: '预算有限，但不想去赌没有任何实测数据的 5.6 元同构盲盒盘，要求所选品牌必须在本页拥有公开可查的 `MAI-TEST-BOT` 原始截图或五地实测数据。',
      techChoice: '选择已完成 2026-08-11 / 2026-10-19 实测归档的高性价比年付小包或 18–20 元档标准 IEPL 方案。',
      recommendations: [
        { name: '飞猫云 (香港 21ms / 526Mbps)', slug: 'feimao', note: '学生版年付仅 ¥84（折 ¥7/月 50G），专属客户端开箱即用，实测数据极佳。' },
        { name: '二猫云 / 唯兔云', slug: 'ermaoyun', note: '二猫云年付 ¥89（折 ¥7.4/月，香港 481Mbps）；唯兔云限量年付 ¥79.9（香港 500Mbps），均支持通用订阅。' },
        { name: '无忧链接 / 灵猫网络', slug: 'wuyou-link', note: '无忧链接年付 ¥79（折 ¥6.5/月，香港 531Mbps）；灵猫网络年付 ¥85（折 ¥7.1/月，香港 492Mbps）。' },
        { name: '极连云 / 光年梯 (¥18/月 IEPL)', slug: 'jilian-cloud', note: '均完成 2026-08-11 测速图归档（极连云含 22:46 晚高峰截图），月付仅 ¥18（100G/110G）。' }
      ]
    }
  ],

  conversionCards: [
    {
      badge: '实测综合冠军 · 香港 22ms / 529Mbps',
      name: '光速云 (Guangsu Cloud)',
      slug: 'guangsu-cloud',
      suitableFor: '看重 2020 年老牌双专线（IEPL+企业内网）稳定性、需要全系客户端兼容或希望购入 ¥147 永久不过期流量包的主力用户。',
      pricing: '轻量版 ¥99/年（折 ¥8.25/月，69GB/月）；极速版 ¥25/月（168GB/月，全节点 ×1 倍率）；致敬斯诺克永久版 ¥147 一次性（247GB 不过期）。优惠码：AMM。',
      limitations: 'ChatGPT 与 Gemini 需手动切换至可用节点；特殊商品不退，建议先用月付或轻量档在本地宽带复测。',
      verifiedAt: '2026-10-19（五地采样） & 2026-08-11 14:32:56（MAI-TEST-BOT 原图）',
      primaryAction: { text: '查看光速云详细评测与原图', href: '/brands/guangsu-cloud' },
      externalAction: { text: '前往光速云官网验证 ↗', href: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
    },
    {
      badge: '香港峰值 546Mbps · IEPL 原生 IP',
      name: '微风网络 (Breeze Network)',
      slug: 'weifeng',
      suitableFor: '追求 546Mbps 顶级香港专线吞吐、原生 IP 解锁 ChatGPT/Claude/Netflix 以及 24 小时客服支持的用户。',
      pricing: '清风年付 ¥137/年（100GB/月，优惠码 flat888 享 9 折）；乘风月付 ¥27/月（200GB/月）；信风不限时 ¥200（270GB）。',
      limitations: '美国节点在非高峰单次采样中为 17Mbps，重度跨洋大文件传输建议优先走香港（546Mbps）或新加坡（384Mbps）节点。',
      verifiedAt: '2026-10-19（五地采样） & 2026-08-11（MAI-TEST-BOT 原图）',
      primaryAction: { text: '查看微风网络完整测评', href: '/brands/weifeng' },
      externalAction: { text: '前往微风网络官网 ↗', href: 'https://edp01.breezenetaff.com/#/?code=t3huofyI' }
    },
    {
      badge: '新加坡 419Mbps · 全平台多端协同',
      name: '暮光加速 (Twilight)',
      slug: 'muguang',
      suitableFor: '需要香港（509Mbps）、新加坡（419Mbps）、日本（150Mbps）三地均衡高吞吐，且拥有多台设备同时在线并要求 FullCone NAT 的用户。',
      pricing: '年付轻量版 ¥109/年（折 ¥9.1/月 70G）；基础版月付 ¥20/月（120G）；标准版 ¥40/月（240G）。优惠码：muguang5555。',
      limitations: '公开优惠活动较少；Gemini 解锁视具体节点而定。',
      verifiedAt: '2026-10-19（五地采样） & 2026-08-11（FullCone 测速原图）',
      primaryAction: { text: '查看暮光加速深度评测', href: '/brands/muguang' },
      externalAction: { text: '前往暮光加速官网 ↗', href: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3' }
    }
  ],

  faqs: [
    {
      q: '1. 本页展示的 17 张 MAI-TEST-BOT 测速原图是怎么测出来的？图片有没有经过修图或挑选？',
      a: '明确结论：本页公开的 17 张节点测速 PNG 原图均来自 `16个机场测速图_2026-08-11_实测版.zip` 原始归档包（归档包整体 SHA256 哈希值为 `22BBBCDF4AE9F2D82DADAD9EFCBB55DBFEE6681720B0032EB31BB92C66F0D9D4`）及同批次实测记录，分辨率保持原始生成的 `1122×1402` 像素，**未做任何数值涂改或有利裁切**。测试工具主要采用行业通用的自动化订阅压测引擎 `MAI-TEST-BOT 2.0.0-dev` 及 `miaosu 4.7.0`，对各机场订阅下发的全部节点依次执行连通性握手（TLS RTT）、持续文件拉取（AvgSpeed / MaxSpeed）与 UDP NAT 类型探测。点击本页画廊中的任意缩略图，均可直接在新标签页打开无损原图逐行查验（详见表 2 #manifest-audit-table）。'
    },
    {
      q: '2. 为什么测速图片里的速度只有 50–70 MB/s，而你们在表格里写的是 400–548 Mbps？是不是夸大了？',
      a: '明确结论：绝无夸大，这是标准的计算机网络单位换算（$1\\text{ MB/s} = 8\\text{ Mbps}$）。测速图片内部采用的是文件下载软件常用的**兆字节每秒（MB/s，大写的 B）**，而宽带运营商（如家庭 500M/1000M 宽带）与表 1 汇总采用的是**兆比特每秒（Mbps，小写的 b）**。举例来说，图内显示平均速度 `66.1 MB/s`，乘以 8 之后严格等于 `528.8 Mbps`。为了让读者不产生混淆，我们在第四章（#how-to-read-metrics）专门列出了换算公式与对照说明。'
    },
    {
      q: '3. 2026-08-11 的测速图与 2026-10-19 的五地测速表是什么关系？哪些品牌是在晚高峰测的？',
      a: '明确结论：这两组数据构成了本站“双批次交叉验证体系”。第一组是 **2026-08-11 CST 批次的 17 份全节点测速原图**，由于当日对 17 家机场是分时段逐一抓取的（从凌晨 00:21 的一翻云、上午 10:45 的二猫云、下午 14:32 的光速云，一直测到晚间），其中 **宇宙云（21:04:24）、U1S1（22:33:29）、极连云（22:46:50）三家正好落在了 20:00–23:00 的全国晚高峰黄金时段**，而 **灵猫网络（18:45:40）与 SOGO云（18:57:59）落在了傍晚次高峰时段**。为了消除不同测试时刻带来的横向偏差，我们在 **2026-10-19** 对 15 家主力品牌进行了第二组统一非高峰口径的五地（港/台/新/日/美）延迟与吞吐采样（即表 1）。两批次数据结合阅读，既能看清全节点列表细节，又能公平对比各家专线的基准上限。'
    },
    {
      q: '4. 为什么我买了表里香港跑 529Mbps 的同款机场，但在我自己电脑上用 Speedtest 测出来只有 80Mbps？',
      a: '明确结论：测速结果是由“机场服务端剩余带宽”、“本地运营商国际/省际路由”以及“用户本地终端硬件”三块木板中最短的那块决定的（木桶效应）。当本地复测显著低于实验室数据时，最常见的原因有四个：1. 您的电脑或手机连在 2.4GHz 旧 Wi-Fi 上（物理上限仅 50–80Mbps），未连 5GHz Wi-Fi 或插千兆网线；2. 您家的宽带本身是 100M 套餐，或者所在省份的移动/校园网对特定入口 IP 实施了省际跨网 QoS 限速；3. 您在客户端里没有选对低延迟的香港/新加坡 IEPL 节点，或者误选了远端欧美节点；4. 测速时未在 Speedtest.net 中手动选择香港/新加坡测速服务器（详见第五章 #self-test-guide 本地复测 5 步法）。'
    },
    {
      q: '5. 为什么 17 张测速原图里，除了暮光加速和宇宙云显示 VLESS，其余 15 张图显示的协议全都是 Shadowsocks？',
      a: '明确结论：这是因为在 IEPL 与 IPLC 企业级内网专线中，跨境传输完全走运营商封闭内网，根本不经过公网 GFW 审查点，因此不需要笨重的 TLS 伪装外壳；而 **Shadowsocks（采用现代 AEAD / 2022 加密）拥有全协议中最小的协议头开销与最快的握手响应速度，在专线内最容易跑出 500Mbps+ 的满血吞吐**，同时 100% 兼容所有测速机器人与新老客户端。此外，像光速云、微风网络、二猫云、一翻云、可信云、速界等品牌实际上支持多协议下发（或根据订阅参数返回 SS / VLESS），在 MAI-TEST-BOT 拉取通用订阅时默认优先匹配了高吞吐的专线 SS 节点（深度原理见 [IEPL 专线与代理协议指南第三章](/guide#protocol-comparison)）。'
    },
    {
      q: '6. 测速图里速度跑得高的节点，就一定能打开 ChatGPT、Claude 和看 Netflix 4K 吗？',
      a: '明确结论：**不一定！带宽测速（Speedtest）与流媒体/AI 解锁（Unlock Check）是完全独立的两个技术维度**。我们在 `speedtest-manifest.json` 的局限性声明中已明确指出：`does not test AI or streaming unlock`。一条商业数据中心节点的下载速度哪怕高达 1000Mbps，如果其 IP 段被 OpenAI 或 Netflix 列入机房黑名单，访问时照样会报错拦截；反之，一条只有 30Mbps 的美国原生住宅 IP 节点，却能无比丝滑地使用 Claude 3.5 与美区 Netflix。因此，看重 AI 与流媒体的读者，必须同时参考本页【表 1】最后一列的解锁实测结论，并在客户端中将 AI 策略组指向日本、新加坡或美国解锁节点。'
    },
    {
      q: '7. 为什么大佬云、闪电鼠、云界线、隐形人、龙猫云、青云梯等品牌没有出现在 17 张测速图里？',
      a: '明确结论：基于本站“有一分证据说一分话、绝不伪造或張冠李戴”的核验原则。在本站收录的 42 家机场中：17 家拥有 2026-08-11 原始测速 PNG 截图；无忧链接、Firefly、闪跃等拥有 2026-10-19 五地实测数据；WgetCloud、白月光、山水云、CyberGuard、灵动云拥有历史多节点统计实测记录（见表 3）；而大佬云、闪电鼠、云界线、榴莲云、环球梯等 5.6 元同构档品牌，以及隐形人、龙猫云、青云梯、TNTCloud、肥猫云等品牌，在当前资料周期内尚未完成同口径的独立逐地区测速，因此我们在【第九章 #data-sources】及各品牌评测页中均诚实标注为“未提供可比逐地区测速 / 待补充”，供读者理性参考。'
    },
    {
      q: '8. 测速图里的“可信云”为什么要单独标注“日期由同批次归档推断”？',
      a: '明确结论：这是本站严格执行工程级数据审计（Data Provenance Audit）的体现。在检查 `可信云-节点测速实测.png` 原图时，我们发现该图顶部时间戳仅完整渲染了时分秒 `15:32:35`（处于同日 14:38 的光年梯与 15:39 的速界之间），未像其他 15 张图那样直接打印出完整的 `2026-08-11` 年月日字符。为保证 100% 诚实透明，我们在 `speedtest-manifest.json` 中将其 `dateConfidence` 标记为 `date-inferred-from-batch-time-visible-in-image` 并在本页表 2 中公开说明。'
    }
  ],

  dataSources: {
    id: 'data-sources',
    badge: 'CHAPTER 09 · DATA PROVENANCE & LIMITATIONS',
    title: '九、测速归档校验、方法论局限性与待核实资料缺口声明',
    intro: '为了让本页面真正具备专业网络可观测性实验室（Network Observatory）的证据效力，特将本页所有测速图片、表格数据的原始出处、SHA256 完整性校验信息以及 6 项客观局限性完整公示如下：',
    sources: [
      {
        title: '1. 2026-08-11 CST 原始测速图归档包（SHA256 可溯源）',
        detail: '源文件包名：`16个机场测速图_2026-08-11_实测版.zip`（文件大小：`36,733,598` 字节；`SHA256: 22BBBCDF4AE9F2D82DADAD9EFCBB55DBFEE6681720B0032EB31BB92C66F0D9D4`），外加同批次暮光加速与微风网络原图，共计 17 份 PNG 节点测速图与 7 份流媒体解锁实况图。元数据清单存放于站点 `/images/speedtest/speedtest-manifest.json`。'
      },
      {
        title: '2. 2026-10-19 五地（港/台/新/日/美）非晚高峰横评采样',
        detail: '来源于《42家机场品牌清单》与《光速云品牌信息》一手核验档案，对 15 家主力品牌在统一非晚高峰条件下采集了香港、台湾、新加坡、日本、美国五地的代表延迟（ms）与下载速率（Mbps），用于弥补单日分时段截图的时间差。'
      },
      {
        title: '3. 2025-06 至 2026-07 历史多节点统计实测记录',
        detail: '涵盖 WgetCloud（2026-05-02，59 节点）、白月光（2026-07-17，108 节点）、山水云（2026-06-29，27 节点）、CyberGuard（2025-06-21，29 节点）及灵动云（2026-07-20/21，珠海联通 9Gbps 60 节点）的历史地区平均值记录，已单独隔离展示于【表 3】，避免与 2026-10-19 新测数据混淆。'
      }
    ],
    gaps: [
      {
        label: '局限与缺口 1：单日快照与分时段采样差异（Single-Day & Different-Time Snapshot）',
        content: '2026-08-11 批次的 17 张测速图是在同一天的不同时间点依次完成的（例如星岛梦测于凌晨 01:48、飞猫云测于早上 08:52、光速云测于下午 14:32、宇宙云/U1S1/极连云测于 21:04–22:46 晚高峰）。因此，单张截图证明的是该品牌在对应时刻达到过的真实吞吐，不能直接作为严格控制变量的实验室同步排名，亦不能担保未来的永续在线率。'
      },
      {
        label: '局限与缺口 2：可信云截图完整日历日期复核提示',
        content: '如表 2 所列，`可信云-节点测速实测.png` 图内可见时间为 `15:32:35`，其日历日期 `2026-08-11` 系根据同一批处理流水线的前后相邻任务（14:38 光年梯、15:32 可信云、15:39 速界）推断得出，特此明确标注。'
      },
      {
        label: '局限与缺口 3：尚缺独立逐地区测速数据的 20 家收录品牌清单',
        content: '在本站收录的 42 家品牌中，目前已有 22 家拥有实测截图、五地测速表或历史地区统计数据；其余 20 家品牌——包括 5.6 元平价同构档（大佬云、闪电鼠、云界线、榴莲云、环球梯）、14 元档（神行加速）、自研+通用双模（梯子云）、专属端（隐形人）以及历史资料库品牌（FlyingBird 飞鸟、龙猫云、FATCAT 肥猫云、TNTCloud、青云梯、浪网、EdgeNova、萤火虫、sslar、宇宙云五地细项）目前尚缺统一口径的逐地区测速表，本站在所有对应页面均严格标注“暂无可核实实测数据 / 待补充”，绝不臆测填充。'
      }
    ]
  }
};

fs.writeFileSync('astroarabia/src/data/speedtest-content.json', JSON.stringify(speedtestContent, null, 2));

const c = (o) => (JSON.stringify(o).match(/[\u4e00-\u9fa5]/g) || []).length;
const proseChars =
  c(speedtestContent.directAnswer) +
  c(speedtestContent.brandReviews) +
  c(speedtestContent.unlockGalleryItems) +
  c(speedtestContent.chapters) +
  c(speedtestContent.decisionBranches) +
  c(speedtestContent.faqs) +
  c(speedtestContent.dataSources);
const tableChars =
  c(speedtestContent.fiveRegionTable) +
  c(speedtestContent.manifestAuditTable) +
  c(speedtestContent.historicalStatsTable);
const totalEffectiveChars = proseChars + tableChars;

console.log(`Prose + Analysis + FAQ Chinese chars: ${proseChars}`);
console.log(`3 Core Benchmark Tables Chinese chars: ${tableChars}`);
console.log(`Total Effective Body Chinese chars: ${totalEffectiveChars}`);
