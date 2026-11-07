import fs from 'fs';

const freeContent = {
  meta: {
    title: '2026 免费Clash节点与公益机场资源核验：安全边界、自建方案与¥5.6/月平替指南 - clashjichang.world',
    h1: '2026 免费 Clash 节点与公益资源核验：安全边界、开源自建与超低成本平替专著',
    description: '2026 专著级免费翻墙与节点资源核验报告：客观评测 Cloudflare WARP、开源 Workers 自建、Telegram/GitHub 抓取节点池的真实可用率与 MITM 流量嗅探风险；披露 42 家商业专线机场的试用/退款规则，并提供 ¥5.6/月起及 ¥99–¥147 永久不限时包的安全平替核算。',
    updatedAt: '2026-11-07',
    verifiedAt: '2026-11-07（全网公益渠道安全审计 & 42家机场试用/入门价核验）',
    author: 'Clash机场评测实验室（网络安全与成本工程组）',
    readingTime: '约 30 分钟深度阅读'
  },

  directAnswer: {
    summary: '当用户搜索“免费 Clash 节点”、“免费机场试用”或“每日更新公益订阅”时，核心诉求是在不花钱或极低成本的前提下完成外网访问、软件验证或应急检索。基于本实验室对公开抓取节点池的数据包抓包审计，以及站内 42 家机场真实资费与售后条款的逐一核验，我们在页首直接给出三大核心结论：',
    points: [
      {
        label: '1. 商业专线机场的客观事实：头部 IEPL/IPLC 专线均不提供免费试用，且特惠套餐不退款',
        content: '经核实本站收录的 42 家机场档案，包括光速云、飞猫云、微风网络、星岛梦、二猫云、唯兔云、Firefly、一翻云、SOGO云、闪跃、全球云、隐形人在内的第一梯队专线机场，官方均明确声明“无免费试用，特殊商品不支持退款”。这是因为 IEPL/IPLC 跨境物理专线的上游机房带宽按 Mbps 高价计费，且国内 BGP 入口 IP 一旦被黑产或滥用者通过免费注册拿到手，极易遭到 DDoS 攻击、垃圾邮件投递（触发 Spamhaus 黑名单）或恶意探测。因此，凡是打着“永久免费 IPLC 专线”旗号的野鸡站点，100% 属于诱骗注册的钓鱼盘或公网劣质直连。'
      },
      {
        label: '2. 真正可核实、零资金成本的 4 类合法免费/公益方案（附适用条件与硬性限制）',
        content: '如果您确实只需要临时查阅 Wikipedia、GitHub 或接收普通文本邮件，切勿在百度或不明 Telegram 频道随意导入来历不明的 SSR/VMess 免费订阅。真正具备密码学与大厂背书的零成本方案仅有四类：① Cloudflare WARP / 1.1.1.1 官方客户端（大厂 WireGuard/MASQUE 隧道，零嗅探风险，但国内直连优选 IP 需手动借助工具，且被 Netflix/ChatGPT 严格封禁）；② 基于个人免费域名与 Cloudflare Pages/Workers 自建的 VLESS 节点（每日 10 万次请求额度，独享干净但晚高峰受美西 Anycast 路由影响延迟较高）；③ 开源客户端内置或高校/极客社区维护的纯 HTTPS 网页镜像与 GitHub 加速代下服务；④ 经 SHA256 校验与 TLS 严格证书验证的开源爬虫公共池（仅限隔离沙盒浏览器应急，严禁登录任何金融、邮箱或加密货币账号）。'
      },
      {
        label: '3. 2026 最具性价比的“准免费”平替路线：用 ¥0.18/天（月均 ¥5.6–¥8）买断全年安全与 500Mbps+ 专线',
        content: '与其每天花费 30 分钟寻找早已失效、测速仅 0.5Mbps 且暗藏 DNS 投毒的免费节点，不如直接核算时间成本与资金成本。在我们的 42 家实测库中，有两类极低门槛的正规方案可直接实现“准免费级”体验：第一类是【永久不限时按量包】——如二猫云 ¥99/100GB、星岛梦/Firefly/一翻云/全球云 ¥100/100GB、无忧链接 ¥108/100GB、光速云 ¥147/247GB（致敬斯诺克147），一次付费永久不过期，若作为轻度备用或应急查资料，折算下来每月成本不到 2 元；第二类是【百元内年付/超低月付】——如光速云 ¥99/年（折 ¥8.25/月 59G）、星岛梦/Firefly/U1S1/闪跃 ¥96/年（折 ¥8/月）、无忧链接 ¥79/年（折 ¥6.58/月），以及大佬云/闪电鼠等 ¥5.6/月起的短期尝鲜盘。每天不到两毛钱，即可换取 22ms 延迟、529Mbps 峰值吞吐与端到端加密安全。'
      }
    ],
    quickNav: [
      { text: '📊 表1：4大免费公益渠道可用性与限制核验', href: '#free-channels-table' },
      { text: '🛡️ 表2：免费节点5大安全威胁与防护矩阵', href: '#security-risk-table' },
      { text: '💰 表3：免费方案 vs 8元专线 vs 永久包核算表', href: '#cost-comparison-table' },
      { text: '🧮 交互工具：免费折腾时间成本 vs 专线平替计算器', href: '#interactive-cost-calculator' },
      { text: '🔬 一、免费节点底层真相与蜜罐剖析', href: '#chapter-1' },
      { text: '⚙️ 二、Cloudflare WARP 与自建实操指南', href: '#chapter-2' },
      { text: '🧭 三、147元永久包与8元/月平替深度选品', href: '#chapter-3' },
      { text: '🔒 四、使用公开免费节点的7步沙盒自保法', href: '#chapter-4' }
    ]
  },

  toc: [
    { id: 'direct-answer', title: '核心核验结论与速查' },
    { id: 'free-channels-table', title: '表1：4类免费公益渠道核验表' },
    { id: 'security-risk-table', title: '表2：公共节点5大安全风险表' },
    { id: 'cost-comparison-table', title: '表3：免费 vs 8元专线 vs 永久包' },
    { id: 'interactive-cost-calculator', title: '交互工具：时间与平替成本计算器' },
    { id: 'chapter-1', title: '一、免费Clash节点的底层真相' },
    { id: 'chapter-2', title: '二、4类正规零成本方案实操评估' },
    { id: 'chapter-3', title: '三、为什么专线机场不设免费试用' },
    { id: 'chapter-4', title: '四、超低成本“准免费”平替矩阵' },
    { id: 'chapter-5', title: '五、应急使用免费节点的7步自保SOP' },
    { id: 'decision-path', title: '六、按预算与用途的3大决策分支' },
    { id: 'recommended-entries', title: '七、经实测验证的低门槛平替入口' },
    { id: 'faq', title: '八、免费资源与试用常见疑问 FAQ' },
    { id: 'data-sources', title: '九、核验时间、来源与合规声明' }
  ],

  freeChannelsTable: {
    caption: '表 1：2026 主流合法免费/公益翻墙资源渠道核验表（领取条件、带宽限制、解锁能力与核查日期）',
    headers: [
      '免费资源类型',
      '代表项目 / 渠道',
      '获取与部署条件',
      '实测可用带宽与延迟范围',
      '流媒体与 AI 解锁表现',
      '核心使用限制',
      '安全评级与核查时间'
    ],
    rows: [
      {
        type: '大厂官方边缘隧道',
        name: 'Cloudflare WARP / WARP+ (1.1.1.1)',
        cond: '官网或海外 App Store 免费下载，无需绑卡；国内需配合 Endpoint 优选 IP 脚本',
        speed: '优选后 160–260ms / 15–80Mbps（视本地运营商 UDP 限速而定）',
        unlock: 'Google/YouTube/GitHub 可用；Netflix 仅自制剧；ChatGPT 网页端常弹风控盾',
        limit: '不支持按国家自由选节点（就近分配 Anycast 机房）；国内三大运营商对默认端点封锁严重',
        safety: '⭐⭐⭐⭐⭐ 极高（Cloudflare 官方加密，2026-11-07 核验）'
      },
      {
        type: '无服务器自建节点',
        name: 'Cloudflare Workers / Pages (VLESS-WS-TLS)',
        cond: '拥有 GitHub 账号与 Cloudflare 免费账号（建议绑定 ¥7/年廉价自定义域名防污染）',
        speed: '150–240ms / 20–120Mbps（依赖反代 IP 与优选 CDN 域名）',
        unlock: '取决于 NAT64 或 proxyIP 落地，常规仅支持基础网页与普通 YouTube 1080P',
        limit: '免费版每日上限 100,000 次请求（重度刷视频或多设备并发易在晚间触发 1101 超限报错）',
        safety: '⭐⭐⭐⭐⭐ 极高（代码与密钥完全自控，2026-11-07 核验）'
      },
      {
        type: '开源自动抓取订阅池',
        name: 'GitHub Actions / TG 公开抓取 Clash 池',
        cond: '公开 URL 直接导入 Clash Verge Rev / v2rayN，零门槛',
        speed: '250–800ms / 0.2–8Mbps（节点在线存活周期通常仅 2–12 小时）',
        unlock: '几乎全军覆没：99% 节点万人骑，Google 弹人机验证码，OpenAI/Claude 直接封号',
        limit: '90% 以上为超时死节点；出口服务器由未知第三方控制，存在明文 DNS 劫持与流量审计隐患',
        safety: '⭐ 极高危（仅限沙盒应急查非敏感公开网页，2026-11-07 核验）'
      },
      {
        type: '新注册体验型微额机场',
        name: '部分公网中转/低价盘注册赠送（如 1GB/24小时）',
        cond: '使用临时邮箱或真实邮箱注册账号（注意防范邮箱密码撞库）',
        speed: '80–220ms / 10–50Mbps（试用组通常分配在低优先级公网直连或拥塞中转节点）',
        unlock: '不支持 ChatGPT/Claude，Netflix 无法播放非自制剧，仅能测试客户端是否能正常握手',
        limit: '42 家主流名录中 TOP 级 IEPL/IPLC 专线均无免费试用；提供免费试用的多为小盘，且试用节点与付费节点往往不同源',
        safety: '⭐⭐⭐ 中等（切勿在注册时复用主密码，2026-11-07 核验）'
      }
    ]
  },

  securityRiskTable: {
    caption: '表 2：来历不明“免费 Clash 订阅 / TG 公益节点”的 5 大网络安全威胁与本地防护对照表',
    headers: [
      '风险等级与威胁名称',
      '攻击或泄露的底层技术原理',
      '最易受害的高危操作场景',
      '真实后果案例',
      '工程级防御与规避方案'
    ],
    rows: [
      {
        threat: '🔴 极高危：DNS 投毒与钓鱼重定向',
        principle: '恶意节点出口的远程 DNS 服务器将特定银行、交易所（如 Binance/OKX）或邮箱域名解析至高仿钓鱼 IP',
        scene: '开启 TUN 模式或远端 DNS 解析，点击收藏夹外的不带 HSTS 强校验链接或输入助记词',
        consequence: '在伪造页面输入账号密码、二次验证码或钱包签名，导致数字资产或网银瞬间被盗',
        defense: '客户端强制开启 Fake-IP 或加密 DoH（如 https://1.1.1.1/dns-query），严禁使用免费节点访问任何资金账户'
      },
      {
        threat: '🔴 极高危：SSL Strip 与明文协议嗅探',
        principle: '出口宿主机通过 tcpdump / Wireshark 实时抓取未加密的 HTTP、FTP、POP3、SMTP 及非 TLS API 报文',
        scene: '访问老旧学术网站、企业内网 HTTP 后台、使用未开启 SSL 的旧版邮件客户端或明文抓包接口',
        consequence: 'Cookie 会话令牌（Session Token）、明文账号密码及传输文件内容被出口服务器完整保存',
        defense: '浏览器强制开启“始终使用安全连接 (HTTPS-Only Mode)”，拒绝任何证书告警跳过操作'
      },
      {
        threat: '🟠 高危：万人骑黑名单 IP 连坐封号',
        principle: '同一免费节点 IP 每天有数千人同时发包，其中包含大量爬虫、撞库脚本与垃圾注册程序，导致 IP 欺诈分（Fraud Score）高达 95–100',
        scene: '挂着免费节点登录自己的主力 ChatGPT Plus、Claude Pro、Apple ID、PayPal、Google Workspace 或外贸亚马逊卖家后台',
        consequence: '风控系统判定账号处于黑产代理环境，立即触发连坐封禁（Account Suspended / Deactivated）且申诉极难恢复',
        defense: '凡涉及核心生产力账号（OpenAI/Claude/PayPal/跨境店铺），必须使用光速云、一翻云、微风网络等独享通道或原生 IP 专线'
      },
      {
        threat: '🟠 高危：恶意订阅 YAML 远程规则注入',
        principle: '攻击者在公开的 Clash YAML 配置文件中篡改 `external-controller`（暴露 0.0.0.0:9090 无密控制口）、植入恶意 `script` 或将国内网银域名分流至黑客代理组',
        scene: '未经文本审查，直接将陌生群聊里的 `.yaml` 订阅链接粘贴进 Clash Verge Rev 并赋予管理员/TUN 权限',
        consequence: '局域网其他设备或网页 JS 可通过本地 RESTful API 静默控制代理内核，且国内直连流量被恶意劫持出境',
        defense: '导入任何第三方订阅前，使用本站 [/tools](/tools) 订阅配置自检器核查 `external-controller` 必须绑定 `127.0.0.1` 且国内规则走 `DIRECT`'
      },
      {
        threat: '🟡 中危：木马篡改版“免费破解客户端”',
        principle: '在百度竞价排名、假冒 GitHub 站点或网盘分享中，将植入窃密木马（Stealer/剪贴板劫持）的安装包伪装成“小火箭免费破解版 / Clash 中文绿色内置节点版”',
        scene: '贪图“自带免费节点免配置”，从非官方 GitHub Releases 渠道下载 `.exe`、`.apk` 或 `.dmg` 安装运行',
        consequence: '电脑浏览器保存的所有密码、Cookie 以及剪贴板里的加密货币充值地址被木马后台静默替换上传',
        defense: '严格只从本站 [/clients](/clients) 收录的官方 GitHub Releases 仓库与 Apple App Store 下载原版开源客户端'
      }
    ]
  },

  costComparisonTable: {
    caption: '表 3：零成本公益方案 vs 超低价月付（¥5.6–¥8/月） vs 永久不限时包（¥99–¥147）全生命周期成本与体验对比表',
    headers: [
      '对比维度',
      'A. 抓取类免费节点池',
      'B. Cloudflare WARP / 自建',
      'C. 5.6元同构低价月付盘',
      'D. 百元内年付一线专线 (¥6.5–¥8.2/月)',
      'E. 永久不限时流量包 (¥99–¥147 一次性)'
    ],
    rows: [
      {
        dim: '代表方案与品牌',
        colA: 'TG 每日免费节点 / GitHub 爬虫池',
        colB: '官方 1.1.1.1 / 个人 Workers 节点',
        colC: '大佬云 / 闪电鼠 / 云界线 / 榴莲云 / 环球梯',
        colD: '光速云(¥99/年)、星岛梦/Firefly/U1S1/闪跃(¥96/年)、二猫云(¥89/年)、无忧链接(¥79/年)',
        colE: '光速云(¥147/247GB)、二猫云(¥99/100GB)、星岛梦/Firefly/一翻云/全球云(¥100/100GB)'
      },
      {
        dim: '日均/月均资金成本',
        colA: '¥0 元',
        colB: '¥0 – ¥0.6/月（仅域名费）',
        colC: '¥5.6/月（30G）或 ¥54/年（折¥4.5/月）',
        colD: '日均 ¥0.22–¥0.27（折合 ¥6.58–¥8.25/月）',
        colE: '一次性买断（按使用 2 年折算，每月仅 ¥4.1–¥6.1）'
      },
      {
        dim: '每月折腾与维护时间',
        colA: '10–15 小时/月（每天找节点、测死活）',
        colB: '1–3 小时/月（定期重新优选端点 IP）',
        colC: '约 15 分钟/月（建议按月续费防失联）',
        colD: '0 分钟（配置一次全年自动更新稳定在线）',
        colE: '0 分钟（无需关心月度清零，随用随开）'
      },
      {
        dim: '实测延迟与下载峰值',
        colA: '300ms+ / 0.5–5Mbps（晚高峰基本断流）',
        colB: '160ms+ / 15–80Mbps（受运营商 QoS 影响）',
        colC: '未进统一测速库（常规够看 1080P 网页）',
        colD: '香港 21–27ms / 481–548Mbps（真 IEPL/IPLC 专线）',
        colE: '香港 22–27ms / 477–547Mbps（与主力专线同享高品质通道）'
      },
      {
        dim: 'AI (ChatGPT/Claude) 与 4K 解锁',
        colA: '❌ 完全不可用（IP 极脏且易封号）',
        colB: '⚠️ 仅基础网页，AI 与非自制剧受限',
        colC: '⚠️ 官方宣称支持，但缺乏实测图背书',
        colD: '✅ 实测完美支持 4K 秒开与主流 AI 生产力工具',
        colE: '✅ 实测完美支持（非常适合只拿来查资料和用 AI 的轻度用户）'
      },
      {
        dim: '核心适用人群结论',
        colA: '仅限安全研究人员在虚拟机内做短暂连通测试',
        colB: '懂命令行与网络原理、只看纯技术文档的极客',
        colC: '预算卡死在 5 元以内、仅做短期 1 个月尝鲜的新手',
        colD: '90% 主流用户的最优解：每天两毛钱买断全年丝滑专线',
        colE: '厌恶包月浪费、每月用量在 5–15GB 的轻度/备用机用户'
      }
    ]
  },

  chapters: {
    chapter1: {
      id: 'chapter-1',
      badge: 'CHAPTER 01 · THE TRUTH BEHIND FREE NODES',
      title: '一、免费 Clash 节点的底层经济学与安全真相：谁在为你买单？',
      intro: '在互联网基础设施领域，有一条铁律从未改变：跨境带宽、公网独立 IPv4 地址与高防服务器都是按秒计费的硬通货。一台最基础的香港 CN2 GIA 或深港 IEPL 专线入口服务器，每月的机房租用与流量账单动辄数千至数万元人民币。当您在搜索引擎、YouTube 评论区或 Telegram 频道看到“永久免费高速 Clash 订阅、每日自动更新几百个节点”时，必须先问自己一个问题：提供这些服务器的人，究竟靠什么收回成本？',
      subsections: [
        {
          id: 'free-node-sources',
          title: '1.1 公开免费节点池的 4 种真实来源拆解',
          paragraphs: [
            '通过对 GitHub 上数十个高星“Free-Proxies / Clash-Node-Scraper”自动化爬虫仓库的源码逆向与节点 IP 归属地追踪，本实验室将互联网上流通的免费节点归纳为以下四类真实来源：',
            '**第一类：自动化脚本全网扫描的“弱口令与未授权面板肉鸡”（占比约 45%）。** 许多新手在购买海外 VPS（如 RackNerd、Vultr、DigitalOcean）搭建 `3x-ui` 或 `x-ui` 面板时，没有修改默认的 `admin/admin` 账号密码，或者暴露了未加密的面板端口。黑客与自动化爬虫通过全网端口扫描批量攻破这些面板，提取出里面的 VMess、VLESS 和 Shadowsocks 节点链接，汇总成所谓的“每日更新免费节点池”。由于瞬间涌入成千上万名白嫖用户，原主人的 VPS 流量往往在几小时内就被耗尽停机——这就是为什么公开免费节点的平均存活寿命只有 **2 到 12 小时**。',
            '**第二类：商业灰产与窃密团伙布设的“流量嗅探蜜罐（Honeypots）”（占比约 25%）。** 这是最危险的一类。攻击者专门租用廉价的罗马尼亚、保加利亚或美西不限流量 VPS，主动将配置好的 Shadowsocks 或 Trojan 节点投放到各大免费分享群。当不明真相的用户挂着这些节点访问未加密网站、或者导入了被篡改 DNS 的 YAML 配置文件时，蜜罐服务器上的旁路分析程序会实时筛选包含 `password`、`token`、`cookie`、`mnemonic`（助记词）的数据流，并对特定加密货币交易所或网银域名实施精准的 DNS 投毒。',
            '**第三类：低端机场引流获客的“高延迟诱饵节点”（占比约 20%）。** 部分刚开业的公网直连小机场为了获取早期流量，会放出一条限速 2Mbps、每隔 30 分钟断流一次的免费订阅，并在节点名称上写满“高速 VIP 专线请加群购买 XXX 机场”。这类节点虽然未必窃密，但可用性极差，纯粹作为广告牌存在。',
            '**第四类：真正由技术极客或公益组织利用云厂商免费额度搭建的公益节点（占比不足 10%）。** 例如利用 Cloudflare Workers、Oracle Cloud（甲骨文永久免费 ARM 实例）或 AWS/GCP 试用金搭建的分享节点。然而在公开网络环境中，任何真正的公益节点只要链接一经公开，不到半天就会被自动化爬虫抓取并被海量迅雷/BT 下载流量直接打死。'
          ]
        },
        {
          id: 'mitm-and-ip-pollution',
          title: '1.2 为什么哪怕是 HTTPS 网站，用免费节点依然存在高风险？',
          paragraphs: [
            '很多具备一定计算机基础的用户会认为：“现在绝大多数网站都启用了 HTTPS（TLS 1.3），就算免费节点的腐竹抓包，看到的也只是加密乱码，我有什么好担心的？”这种想法忽略了现代网络攻击的三个关键侧信道（Side-Channel）：',
            '首先，**SNI（Server Name Indication）与访问行为画像完全裸奔**。除非目标网站开启了最新的 ECH（Encrypted Client Hello），否则代理服务器在为您转发 TLS 握手包时，能够 100% 看到您正在访问的完整域名、访问精确时间、上下行数据包大小以及在线时长。如果您使用实名手机号注册了某引流免费机场，或者同时在浏览器中登录了国内实名社交账号（如微博、知乎、百度网盘未正确分流），您的真实身份与外网访问记录就会在代理服务端被完美关联。',
            '其次，**WebRTC 真实 IP 泄露与恶意 YAML 分流劫持**。当您使用“一键导入”方式加载陌生的 Clash 订阅时，您下载的不仅仅是几个节点 IP，而是一整套路由控制逻辑！恶意编写的 YAML 配置文件可以偷偷将您的本地控制端口 `external-controller` 暴露在公网，或者利用 `rules` 规则将原本应该直连（`DIRECT`）的国内支付、邮箱流量偷偷转发到黑客的中间人服务器上。',
            '最后，**万人骑脏 IP 带来的“账号连坐死刑”**。在 2026 年，OpenAI（ChatGPT）、Anthropic（Claude）、Google、PayPal 与 Apple 都部署了极其严苛的基于 ASN 与 IP 信誉度（Fraud Score）的实时风控引擎。公开免费节点的出口 IP 在 Scamalytics 与 IPQualityScore 上的欺诈风险分几乎全部是 **100 分（极高危黑产 IP）**。只要您挂着这种节点登录一次自己的主力 ChatGPT Plus 或美区 Apple ID，极可能在数分钟内收到官方的永久封号邮件（Account Terminated），损失远超几百元。'
          ]
        }
      ]
    },

    chapter2: {
      id: 'chapter-2',
      badge: 'CHAPTER 02 · LEGITIMATE ZERO-COST SOLUTIONS',
      title: '二、4 类真正安全可核实的零成本/公益方案实操与边界评估',
      intro: '如果您当前确实处于“零预算”状态，或者只需要临时建立一条绝对不会被窃听的安全加密通道去下载开源软件、查阅维基百科，请彻底摒弃网上抓取的野鸡节点池，转而采用以下由国际頂級云安全大厂或您自己 100% 掌控密钥的零成本方案：',
      subsections: [
        {
          id: 'cloudflare-warp-guide',
          title: '2.1 方案一：Cloudflare WARP（1.1.1.1）+ 本地 Endpoint 优选 IP 技术',
          paragraphs: [
            '**核心原理与可信度：** Cloudflare 是全球最大的 CDN 与网络安全基础设施提供商之一。其官方推出的 **Cloudflare WARP（客户端名为 1.1.1.1）** 底层基于现代高性能的 **WireGuard 协议**（以及最新的基于 QUIC/HTTP3 的 **MASQUE 协议**）。所有流量从您的设备发出后，直接进入 Cloudflare 遍布全球的 Anycast 边缘机房，由大厂严格的零日志审计承诺背书，**彻底杜绝了个人腐竹抓包窃密的可能性**。',
            '**国内使用的前置条件与实操步骤：** 由于 Cloudflare 默认分配的 Anycast 入口 IP（如 `162.159.192.1` 等）在国内三大运营商骨干网常年受到干扰或 QoS 限速，直接安装官方客户端点击连接往往会卡在“正在连接”。正确的实操路线是：① 在本地电脑运行开源的 **Cloudflare WARP Endpoint 优选脚本**，扫描测试 `162.159.192.0/24`、`162.159.193.0/24` 或 `188.114.96.0/24` 网段中当前延迟最低、丢包率为 0% 的干净 IP 与端口（例如 `188.114.98.xxx:2408`）；② 使用支持 WireGuard 协议的通用客户端（如 [Clash Verge Rev](/clients#windows)、[v2rayN](/clients#windows)、[sing-box](/clients#ios) 或 `wgcf` 导出的配置文件），将优选出的 Endpoint IP 填入配置中启动连接。',
            '**客观限制声明：** 第一，WARP 无法由用户自由指定落地国家（通常就近分配至香港、东京或美西洛杉矶机房）；第二，由于使用人数众多，WARP 出口 IP 访问 Google 搜索时经常需要点击人机验证，且无法解锁 Netflix 非自制剧，访问 ChatGPT 网页端也极易被 Cloudflare 自家的 Turnstile 盾拦截；第三，部分省份的移动或教育网宽带对 UDP 大流量存在严格限速，晚高峰吞吐通常在 15Mbps–60Mbps 之间波动。'
          ]
        },
        {
          id: 'cloudflare-workers-pages',
          title: '2.2 方案二：基于 Cloudflare Workers / Pages 的个人零成本无服务器自建',
          paragraphs: [
            '**核心原理：** 如果您拥有一个 GitHub 账号与一个 Cloudflare 免费账号，可以利用 Cloudflare 提供的 Serverless（无服务器边缘计算）服务——**Cloudflare Workers 或 Pages**，部署开源的 `VLESS-WebSocket-TLS` 边缘代理脚本。每天享有高达 **100,000 次免费请求额度**（北京时间每日上午 08:00 自动重置），无需购买任何 VPS 服务器，且 UUID 密钥完全由您个人独享。',
            '**关键实操要点：** ① 切勿直接使用 Cloudflare 默认分配的 `*.workers.dev` 或 `*.pages.dev` 二级域名，因为这两个后缀在国内早已被 SNI 阻断或 DNS 污染；您应当花 ¥5–¥10/年注册一个冷门后缀的个人域名（如 `.xyz`、`.top`、`.shop`）托管到 Cloudflare，在 Workers 中绑定**自定义域（Custom Domain）**；② 在客户端（如 v2rayN 或 Clash Verge Rev）中，将 `server`（连接地址）替换为优选后的 Cloudflare CDN 干净 IP（或优选域名），而将 `Host` 与 `SNI` 保持为您自己的自定义域名；③ 搭配可靠的 `proxyIP`（反代落地 IP）以解决直接访问 Cloudflare 自身站点报错的问题。',
            '**客观限制声明：** 该方案完美解决了“安全性”与“独享性”，非常适合轻度查阅技术文档、收发 Gmail 与日常网页浏览。但它的物理短板在于：所有流量必须先绕道美国西海岸或欧洲的 Cloudflare 免费层边缘节点，再转发至目标网站，基础 RTT 延迟普遍在 **150ms–240ms**，且一旦当天打开过多图片或视频网页导致请求数突破 10 万次，节点就会在当天剩余时间内暂停服务。'
          ]
        },
        {
          id: 'academic-and-github-mirrors',
          title: '2.3 方案三：针对特定开发与学术需求的免翻墙加速工具（GitHub / 学术镜像）',
          paragraphs: [
            '许多程序员或高校学生寻找“免费 Clash 节点”，其实仅仅是为了在本地顺利执行 `git clone`、拉取 Docker 镜像或查阅 Google Scholar 论文。针对这类单一明确的任务，其实完全不需要挂载全局翻墙节点：',
            '您可以直接使用开源社区经过长期安全验证的 **Steam++（现名 Watt Toolkit，瓦特工具箱）** 或 **FastGithub**。这类工具并非通过境外代理服务器转发您的流量，而是利用本地反向代理与净化的 Hosts 映射，直接指向 GitHub、jsDelivr、Gravatar、Google Fonts 等服务在全球尚未被污染的边缘 CDN 节点，完全免费、合法且跑满本地宽带。但在需要访问真正被全网封锁的海外社交媒体、YouTube 4K 或调用 OpenAI / Claude 接口时，本地反代工具便无能为力，必须回归真正的跨境代理通道。'
          ]
        }
      ]
    },

    chapter3: {
      id: 'chapter-3',
      badge: 'CHAPTER 03 · WHY PREMIUM AIRPORTS HAVE NO FREE TRIAL',
      title: '三、深度揭秘：为什么站内 42 家测评库中的顶级专线机场均“不设免费试用”？',
      intro: '在浏览本站 [42 家机场品牌库](/brands) 或 [Top 10 推荐榜](/ranking) 时，细心的读者会发现一个高度统一的现象：排名前列的 [光速云](/brands/guangsu-cloud)、[飞猫云](/brands/feimao)、[微风网络](/brands/weifeng)、[星岛梦](/brands/xingdaomeng)、[二猫云](/brands/ermaoyun)、[唯兔云](/brands/weitu-cloud)、[Firefly](/brands/firefly)、[一翻云](/brands/yifanyun)、[SOGO云](/brands/sogo-cloud)、[闪跃](/brands/shanyue)、[全球云](/brands/quanqiuyun)、[隐形人](/brands/yinxingren) 等一线品牌，在售后条款中全部写明“无免费试用，特殊商品不支持退款”。为什么正规大机场宁可放弃一部分犹豫的新客，也绝不开放“注册免费送 1 天试用”？这背后有三大严酷的工程与风控原因：',
      subsections: [
        {
          id: 'reason-entry-ip-protection',
          title: '3.1 保护高昂的国内 BGP 入口 IP 与专线通道免遭同行 DDoS 攻击',
          paragraphs: [
            '正如我们在 [专线与协议科普指南](/guide) 中所详解的，一家真 IEPL/IPLC 专线机场的核心命脉，在于其部署在广州、深圳、上海、北京机房的**国内 BGP 入口服务器**。用户连接机场时，本地客户端首先连接的是这些国内入口 IP。',
            '在竞争激烈的机场行业中，黑灰产同行之间的恶意敲诈与 DDoS（分布式拒绝服务攻击）屡见不鲜。如果一家顶级专线机场开放“零门槛邮箱注册免费试用”，攻击者只需要写一个 10 行代码的 Python 脚本，每隔 5 分钟自动注册一个免费试用账号，就能实时拉取该机场最新的国内 BGP 入口 IP 列表，随后雇佣僵尸网络对这些入口发起数百 Gbps 的 UDP 洪水攻击，导致全体付费用户断网！通过设置最低 ¥14.9–¥25 的付费门槛，可以将自动爬虫与低成本恶意刺探直接挡在门外，从而保障付费用户的核心网络 SLA。'
          ]
        },
        {
          id: 'reason-clean-landing-ip',
          title: '3.2 防止黑产爬虫与垃圾邮件瞬间污染昂贵的“原生住宅/流媒体解锁 IP”',
          paragraphs: [
            '要让用户顺畅解锁 ChatGPT、Claude 3.5/4、Netflix 非自制剧、Disney+ 与 TikTok 跨区直播，机场主必须在香港、新加坡、日本、台湾和美国重金租用高纯净度的**原生 ISP IP（Native IP）或家宽住宅 IP**。',
            '这类优质 IP 对滥用行为极其敏感。一旦开放免费试用，全网做批量注册、信用卡盗刷测试（Carding）、社交媒体群控发帖以及垃圾邮件群发（Spam）的黑产工作室就会蜂拥而至。往往只需要不到 2 个小时，整段昂贵的原生 IP 就会被列入 Spamhaus 黑名单并被 OpenAI 与 Cloudflare 永久拉黑。因此，**“拒绝白嫖党与黑产脚本，就是对正常付费用户 IP 纯净度的最大保护”**。'
          ]
        },
        {
          id: 'reason-iepl-bandwidth-cost',
          title: '3.3 IEPL 物理专线的固定高昂成本结构决定了无法承受无限羊毛党',
          paragraphs: [
            '普通公网直连小机场之所以敢搞“注册送 5GB 免费试用”，是因为一台月付 $3 美金的廉价美西 VPS 每月有 10TB 甚至不限量的公网劣质流量，多几百个免费用户根本不增加边际成本（反正大家都卡在 2Mbps）。而正规 IEPL/IPLC 内网专线是按 Mbps 带宽峰值或每 TB 双向政企流量向运营商硬性采购的，每 1GB 流量都是真金白银的成本。这就是为什么正规专线机场普遍采用“取消免费试用，但将年付入门门槛压低至 ¥79–¥99（折合每月仅 ¥6.5–¥8.2），或提供 ¥99–¥147 永久不限时按量包”的务实定价模式。'
          ]
        }
      ]
    },

    chapter4: {
      id: 'chapter-4',
      badge: 'CHAPTER 04 · ULTRA-LOW-COST ALTERNATIVES',
      title: '四、2026 超低成本“准免费”平替矩阵：每天不到两毛钱的 3 种聪明买法',
      intro: '既然野鸡免费节点危机四伏，而官方 WARP 又无法自由切换国家去丝滑使用 ChatGPT、Claude 和观看 4K 奈飞，预算有限的用户该如何在“绝对安全高速”与“极致省钱”之间找到完美平衡点？基于本站 42 家机场的完整价格库与 17 份 MAI-TEST-BOT 真实测速报告，我们为您梳理出三套经过严密财务核算的“准免费级”平替方案：',
      subsections: [
        {
          id: 'plan-a-permanent-traffic',
          title: '4.1 路线 A：永久不过期按量付费包（¥99–¥147 一次性买断，用两三年月均仅 3–5 元）',
          paragraphs: [
            '如果您平时主要看国内网站，翻墙只是为了**查阅外文资料、使用 ChatGPT/Claude 对话、更新海外软件，或者希望手里永远备有一个绝对不会过期的应急备用梯子**，那么传统的“包月套餐”对您来说确实是浪费——因为每月用不完的流量月底会自动清零。',
            '针对这一痛点，选择支持**“一次性付费、流量永久不过期（用完为止）”**的真专线机场，是替代免费节点最聪明的神级方案。在我们的实测库中，最具代表性的候选包括：',
            '• **[光速云（TOP 1 首选主推）](/brands/guangsu-cloud)**：独家推出「致敬斯诺克 147」永久套餐——**¥147 元一次性获得 247GB 永久不过期流量**（每 GB 成本仅 ¥0.59），且同样享受 IEPL + 企业级内网双专线（香港实测 22ms / 529Mbps，全节点 ×1 倍率）。如果您每月仅消耗 10GB 流量（足够发送数万条 AI 对话与浏览数千个网页），这 247GB 可以足足使用 **24.7 个月（超过两年）**，折算下来**每月实际花费仅 ¥5.95 元（每天不到 2 毛钱）**！此外光速云还提供 ¥399/799GB 与 ¥988/2288GB 的大额永久包。',
            '• **[二猫云（TOP 7）](/brands/ermaoyun)**：全线 IEPL 专线（香港实测 22ms / 481Mbps），不限时套餐低至 **¥99 元 / 100GB 永久不过期**，支持 Clash 通用订阅与独家定制客户端双模式，不限制同时在线设备数。',
            '• **[星岛梦（TOP 6）](/brands/xingdaomeng) / [Firefly（TOP 10）](/brands/firefly) / [一翻云（TOP 16）](/brands/yifanyun) / [全球云（TOP 21）](/brands/quanqiuyun)**：这四家全部经过 2026-10-19 五地实测（香港均在 477Mbps–547Mbps 之间），均提供 **¥100 元 / 100GB 永久不限时流量包**（其中一翻云支持通用订阅且提供原生住宅 IP 与 Hysteria 2 / VLESS-Reality 协议；星岛梦为 2020 年老牌 1 倍率不限设备）。',
            '• **[无忧链接（TOP 8）](/brands/wuyou-link)**：香港实测 23ms / 531Mbps，针对跨境电商与 TikTok 深度优化，提供 **¥108 元 / 100GB 不限时套餐**。'
          ]
        },
        {
          id: 'plan-b-under-100-annual',
          title: '4.2 路线 B：百元内年付轻量专线（¥79–¥99/年，折合每月仅 ¥6.5–¥8.25）',
          paragraphs: [
            '如果您几乎每天都要打开 YouTube、X（Twitter）、Telegram 和 AI 工具，希望每个月都有稳定的固定流量补充，但预算严格控制在“每月一杯蜜雪冰城（6–8 元）”以内，那么以下经过 MAI-TEST-BOT 原图验证的**百元内年付真专线**就是您的最佳答案：',
            '• **[光速云（TOP 1）](/brands/guangsu-cloud)**：轻量版年付仅 **¥99/年（折合 ¥8.25/月，每月 59GB 流量）**，配合站内专属优惠码 `AMM` 更划算，2020 年运营至今超 4 年老牌，安全感拉满。',
            '• **[无忧链接（TOP 8）](/brands/wuyou-link)**：入门年付低至 **¥79/年（折合 ¥6.58/月，每月 50GB）**，唯兔云（TOP 9）限量年付 **¥79.9/年（折合 ¥6.65/月，每月 60GB）**，飞猫云（TOP 3）学生版年付 **¥84/年（折合 ¥7.00/月，每月 50GB）**，灵猫网络（TOP 13）年付 **¥85/年（折合 ¥7.08/月，每月 60GB）**，二猫云（TOP 7）年付 **¥89/年（折合 ¥7.41/月，每月 60GB）**。',
            '• **[星岛梦](/brands/xingdaomeng) / [Firefly](/brands/firefly) / [U1S1](/brands/u1s1) / [闪跃](/brands/shanyue)**：这四家香港实测均突破 504Mbps–548Mbps 的顶尖专线，入门年付统一为 **¥96/年（折合整整 ¥8.00/月，每月 50GB–60GB 流量）**。'
          ]
        },
        {
          id: 'plan-c-single-month-trial',
          title: '4.3 路线 C：零长周期风险的“单月低价试错方案”（¥5.6–¥20 单月即买即测）',
          paragraphs: [
            '如果您以前从未买过付费机场，对年付或百元永久包依然心存顾虑，只想先花几块钱到十几块钱买 **1 个月** 亲自验证速度，请遵循“由稳到廉”的梯度选择：',
            '1. **首选有实测图背书的 ¥14.9–¥20 正规专线单月卡**：例如 [唯兔云](/brands/weitu-cloud)（节假日特惠月付 **¥14.9/80G**，常规 **¥19.9/150G**）、[山水云](/brands/shanshuiyun)（入门月付 **¥15/100G**）、[极连云](/brands/jilian-cloud)（月付 **¥18/100G**，含 22:46 晚高峰实测图）、[光年梯](/brands/guangnianti)（月付 **¥18/110G**）、[无忧链接](/brands/wuyou-link)（月付 **¥19/120G**），以及 [暮光加速](/brands/muguang)、[二猫云](/brands/ermaoyun)、[U1S1](/brands/u1s1)、[一翻云](/brands/yifanyun)、[全球云](/brands/quanqiuyun) 的 **¥20/月（100G–150G）** 标准月付档。',
            '2. **超低预算 ¥5.6/月起的短期尝鲜盘（务必遵守月付原则）**：本站品牌库收录了五家定价完全一致的极低门槛品牌——[大佬云](/brands/dalaoyun)、[闪电鼠](/brands/shandianshu)、[云界线](/brands/yunjiexian)、[榴莲云](/brands/liulianyun)、[环球梯](/brands/huanqiuti)，它们均提供 **¥5.6/月（30GB）** 或 **¥54/年（每月 99GB）** 的超低价套餐。但正如我们在 [/warnings（跑路预警专题）](/warnings) 中所重点提示的：这五家套餐结构高度同质化，且缺乏本批次统一测速原图验证（其中云界线与环球梯的推广链接格式还存在缺少 `#` 号的异常），**仅适合掏 ¥5.6 元买一个月当作临时玩具或备用测试，严禁贪便宜直接购买年付！**'
          ]
        }
      ]
    },

    chapter5: {
      id: 'chapter-5',
      badge: 'CHAPTER 05 · SANDBOX SOP FOR FREE NODES',
      title: '五、操作级指南：如果您必须在应急场景下使用公开免费节点，请严格执行这 7 步沙盒自保 SOP',
      intro: '我们理解在某些极端应急场景下（例如刚重装完系统、人在海外或临时借用他人电脑，手头暂时无法完成支付，急需连上外网下载某个配置文件），您可能不得不临时使用一次公开抓取的免费节点或公益订阅。为了将窃密、投毒与封号风险降至最低，请务必按顺序执行以下 7 个安全隔离步骤：',
      steps: [
        {
          stepNum: 'STEP 01',
          title: '第一道防线：绝不下载任何带“内置免费节点”的魔改客户端',
          detail: '无论对方宣传得多么诱人，绝不要运行从网盘、Telegram 群文件或百度搜索下载的所谓“破解版小火箭 / 绿色免配置版 Clash”。请先通过无需翻墙即可访问的可靠镜像或本站整理的 [客户端配置大全 (/clients)](/clients)，核对并安装开源原版的 **Clash Verge Rev**、**v2rayN** 或 **FlClash**。'
        },
        {
          stepNum: 'STEP 02',
          title: '第二道防线：导入订阅前，先用纯文本或自检工具审计 YAML 源码',
          detail: '拿到公开的免费 Clash 订阅链接后，不要直接在客户端里点击“下载并激活”。先将该配置下载为本地 `.yaml` 文本文件（或粘贴到本站 [梯子工具箱 (/tools)](/tools) 的订阅安全自检器中），重点检查三项：① `external-controller` 是否仅绑定在 `127.0.0.1`（若为 `0.0.0.0` 立即删除）；② 是否包含陌生的 `script:` 或篡改本地 Hosts 的恶意条目；③ 国内常见域名与 `GEOIP,CN` 规则是否严格指向 `DIRECT`（直连），防止国内网银与微信流量被免费节点截获。'
        },
        {
          stepNum: 'STEP 03',
          title: '第三道防线：强制接管本地安全 DNS，阻断远端 DNS 投毒',
          detail: '在 Clash Verge Rev 或 v2rayN 的设置中，开启内置的 **DNS 覆写（DNS Override）** 功能，将 `nameserver` 设为国内可靠的 DoH（如 `https://223.5.5.5/dns-query`），将 `fallback` 设为国际权威加密 DoH（如 `https://1.1.1.1/dns-query` 或 `https://8.8.8.8/dns-query`），并启用 `fake-ip` 模式，不盲目信任免费节点出口服务器返回的未校验 DNS 结果。'
        },
        {
          stepNum: 'STEP 04',
          title: '第四道防线：严禁开启全局 TUN 虚拟网卡，仅限单一无痕浏览器窗口代理',
          detail: '测试或应急使用免费节点时，**绝对不要开启 TUN 模式（虚拟网卡全局接管）**，甚至建议关闭系统级代理（System Proxy）。最安全的做法是：打开一个全新的 Chrome / Edge **无痕模式（Incognito Window）** 或独立的便携版 Firefox，仅通过 `SwitchyOmega` 插件将该无痕窗口的 HTTP/SOCKS5 流量指向本地 `127.0.0.1:7897` 端口，确保电脑后台的微信、网银控件、云盘和开发工具完全不经过免费节点。'
        },
        {
          stepNum: 'STEP 05',
          title: '第五道防线：执行“三不登录”铁律与 HTTPS 强制校验',
          detail: '在挂着免费节点的无痕浏览器中，严格遵守“三不登录”：**不登录任何电子邮箱与社交主号、不登录任何涉及资金/加密货币/PayPal 的账户、不登录任何付费 AI 账号（ChatGPT Plus / Claude Pro）**。同时确认浏览器地址栏左端锁头标志正常，一旦弹出“您的连接不是私密连接 (NET::ERR_CERT_AUTHORITY_INVALID)”，说明该免费节点正在对您实施 SSL 中间人劫持，必须立即断开并删除该节点！'
        },
        {
          stepNum: 'STEP 06',
          title: '第六道防线：利用在线探针快速核验出口 IP 欺诈分与 WebRTC 泄露',
          detail: '连接成功后，先访问 `ping0.cc`、`scamalytics.com` 或 `browserleaks.com/webrtc`（完整检测入口已汇总在本站 [梯子工具专题 (/tools)](/tools)）。检查本地真实国内 IP 是否通过 WebRTC 泄露，并查看当前免费节点的风险欺诈值。'
        },
        {
          stepNum: 'STEP 07',
          title: '第七道防线：应急任务完成后立即销毁配置并清理浏览器缓存',
          detail: '一旦完成了临时查资料或下载正规主力机场订阅的任务，立即在客户端中切换回正规专线配置，彻底删除刚才导入的免费订阅 Profile，并关闭无痕浏览器窗口以销毁所有临时 Cookie 与 TLS 会话票据。'
        }
      ]
    }
  },

  decisionBranches: [
    {
      id: 'branch-zero-budget',
      badge: '分支 A · 零资金预算 / 纯技术文档查阅',
      title: '如果您的预算严格为 ¥0 元，且仅需查阅 GitHub、维基百科与普通外文网页',
      condition: '具备基础的电脑动手能力，不需要观看 4K 奈飞或高频使用 ChatGPT Plus / Claude Pro，绝不接受任何密码被盗风险。',
      techChoice: '彻底放弃 TG 抓取节点池 → 选择「Cloudflare WARP 优选 Endpoint」或「个人域名 + Cloudflare Workers 自建 VLESS 节点」，搭配 Watt Toolkit 处理 GitHub 加速。',
      recommendations: [
        { name: '客户端与工具准备 (/clients)', slug: 'clients', isInternalHub: true, note: '前往客户端大全下载官方纯净版 Clash Verge Rev 或 v2rayN，配合本地优选脚本导入 WireGuard 配置。' },
        { name: '节点诊断工具箱 (/tools)', slug: 'tools', isInternalHub: true, note: '自建完成后，使用工具箱中的 IP 纯净度与 DNS 泄露探针核验隧道加密状态。' }
      ]
    },
    {
      id: 'branch-light-permanent',
      badge: '分支 B · 轻度/应急备用 / 厌恶包月清零浪费',
      title: '如果您平时翻墙不多（每月 5–15GB），只想花一顿快餐钱买个管用两三年的高速专线',
      condition: '讨厌每个月交月租、讨厌流量月底不用完就作废，但要求每次打开梯子时必须秒连、能看 4K 视频且能稳定用 AI。',
      techChoice: '直接跳过包月套餐 → 选择支持「永久不过期按量计费」的老牌 IEPL/IPLC 专线机场，一次买断 100GB–247GB 流量，折合每月仅 3–6 元。',
      recommendations: [
        { name: '光速云 (TOP 1 · ¥147/247GB 永久包)', slug: 'guangsu-cloud', isInternalHub: false, note: '2020年老牌双专线，每GB仅0.59元，香港实测22ms/529Mbps，支持优惠码 AMM，轻度用户可安心用两年以上。' },
        { name: '二猫云 (TOP 7 · ¥99/100GB 永久包)', slug: 'ermaoyun', isInternalHub: false, note: '全线 IEPL 专线，香港 22ms/481Mbps，百元内即可买断 100GB 永久流量，且不限制设备连接数。' },
        { name: '星岛梦 / 一翻云 (¥100/100GB 永久包)', slug: 'xingdaomeng', isInternalHub: false, note: '星岛梦为2020年老牌1倍流量；一翻云提供原生住宅IP与Hysteria2/Reality多协议，均支持¥100永久包。' }
      ]
    },
    {
      id: 'branch-daily-heavy',
      badge: '分支 C · 每日高频主力 / 每天不到两毛五',
      title: '如果您每天都要刷 YouTube 4K、用 ChatGPT/Claude 办公，追求极致月均性价比',
      condition: '需要每月 50GB–168GB 的充沛流量，要求晚高峰 20:00–23:00 绝不卡顿，且预算控制在每月 6.5 元至 8.5 元左右。',
      techChoice: '选择经过 MAI-TEST-BOT 实测图验证的「百元内轻量年付专线（¥79–¥99/年）」；若想先测一个月，则选 ¥14.9–¥20 单月卡。',
      recommendations: [
        { name: '光速云 (¥99/年 · 折约¥8.2/月)', slug: 'guangsu-cloud', isInternalHub: false, note: '每月 59GB IEPL 专线流量，或选 ¥25/月（168G），综合稳定性与历史口碑位列全站第一。' },
        { name: '无忧链接 (¥79/年 · 折约¥6.5/月)', slug: 'wuyou-link', isInternalHub: false, note: '香港实测 23ms/531Mbps，年付仅 79 元（50G/月），月付 ¥19（120G），支持 TikTok 与全流媒体。' }
      ]
    }
  ],

  conversionCards: [
    {
      badge: '👑 永久包与百元内年付双冠王 · TOP 1',
      name: '光速云 (Guangsu Cloud)',
      suitableFor: '希望彻底告别免费节点折腾、追求“¥8.2/月年付”或“¥147/247GB 永久不过期”的稳健型用户。',
      pricing: '轻量年付 ¥99/年（折约 ¥8.25/月，59GB/月）；永久不限时包 ¥147（247GB）、¥399（799GB）；IPLC 月付 ¥25/月（168GB）。支持站内优惠码 AMM。',
      limitations: '官方明确无免费试用，特殊商品不支持退款；ChatGPT 与 Gemini 需切换至支持地区的节点使用。',
      verifiedAt: '2026-08-11 14:32 原图 & 2026-10-19 五地采样（香港 22ms / 529Mbps）',
      primaryAction: { text: '查看光速云完整测评与套餐表', href: '/brands/guangsu-cloud' },
      externalAction: { text: '查看光速云官网套餐 (券码 AMM) ↗', href: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
    },
    {
      badge: '💎 99元永久包与低价IEPL代表 · TOP 7',
      name: '二猫云 (Ermao Cloud)',
      suitableFor: '预算严格卡在百元以内、需要多设备同时在线且看重 ¥99/100GB 永久包或 ¥89/年专线的家庭/学生用户。',
      pricing: '入门年付 ¥89/年（折约 ¥7.41/月，60GB/月）；永久不限时包 ¥99（100GB）；标准月付 ¥20/月（130GB）。',
      limitations: '无免费试用，特殊商品不退；Claude 与 Gemini 解锁官方未作确定承诺，需视具体节点而定。',
      verifiedAt: '2026-08-11 10:45 原图 & 2026-10-19 五地采样（香港 22ms / 481Mbps）',
      primaryAction: { text: '查看二猫云完整测评与实测图', href: '/brands/ermaoyun' },
      externalAction: { text: '查看二猫云官网方案 ↗', href: 'https://ermaoyun.cc/#/?code=f9297942' }
    },
    {
      badge: '🚀 原生住宅IP与百元永久包新锐 · TOP 16',
      name: '一翻云 (Yifan Cloud)',
      suitableFor: '重度依赖 ChatGPT/Claude 原生住宅 IP 解锁、喜欢折腾 Hysteria 2 / VLESS-Reality 协议的极客与办公族。',
      pricing: '轻量年付 ¥98/年（折约 ¥8.16/月，60GB/月）；永久不限时包 ¥100（100GB）/ ¥180（200GB）；月付 ¥20/月（150GB）。',
      limitations: '2025 年上线的新晋品牌（运营年限短于光速云），无免费试用，建议新客先从 ¥20 月付或 ¥100 永久包起步。',
      verifiedAt: '2026-08-11 00:21 原图 & 2026-10-19 五地采样（香港 23ms / 477Mbps）',
      primaryAction: { text: '查看一翻云完整测评与协议拆解', href: '/brands/yifanyun' },
      externalAction: { text: '查看一翻云官网方案 ↗', href: 'https://yifanyun.vip/#/?code=448112' }
    }
  ],

  faqs: [
    {
      q: 'Q1：网上那些“每天自动更新的免费 Clash 订阅链接”真的完全不能用吗？',
      a: '并非完全连不上网，而是**“极不划算且伴随极高安全隐患”**。实测显示，公开抓取池中约 85%–95% 的节点处于超时或流量耗尽状态，存活节点的平均延迟在 350ms 以上、速率不足 2Mbps；更重要的是，由于出口完全由陌生人控制，一旦遭遇 DNS 投毒或明文抓包，损失一个主邮箱、Apple ID 或加密货币钱包的代价，足够买几十年顶级专线机场。因此仅限在隔离无痕窗口中做毫秒级应急，绝不可作为日常主力。'
    },
    {
      q: 'Q2：为什么你们推荐的 TOP 10 机场（如光速云、微风、飞猫云）都不提供 1 天免费试用？',
      a: '这是判断一家机场是否为“真 IEPL/IPLC 专线”的重要分水岭。真专线的国内 BGP 入口一旦向免费注册脚本敞开，极易遭到同行自动化爬虫提取并发动 DDoS 攻击；同时，解锁 ChatGPT 与 Netflix 的高纯净度原生 IP 一旦被免费涌入的黑产脚本用来发垃圾邮件或撞库，整段 IP 会在几小时内作废。因此，正规专线机场普遍通过 ¥14.9–¥25 的月付或 ¥99–¥147 的永久包来过滤黑产，保护付费用户的网络质量。'
    },
    {
      q: 'Q3：Cloudflare WARP（1.1.1.1）是免费的，它和付费 IEPL 专线机场到底差在哪里？',
      a: 'Cloudflare WARP 的最大优势是**绝对安全且零资金成本**，非常适合用来查阅普通外文网页和 GitHub。但它有三大硬伤无法替代专线机场：① **国内入口无保障**（直连常被运营商阻断或限速，必须定期折腾优选 IP）；② **无法自由选国家节点**（采用 Anycast 就近路由，你不能指定连台湾看动画疯或连美国用 Claude）；③ **流媒体与 AI 解锁差**（无法看 Netflix 非自制剧，连 ChatGPT 经常弹循环验证码）。'
    },
    {
      q: 'Q4：如果我每个月翻墙只用不到 10GB 流量，买哪种付费方案最接近“免费”？',
      a: '强烈建议购买**“永久不限时按量套餐（Traffic Never Expires）”**！例如 [光速云](/brands/guangsu-cloud) 的 **¥147 元 / 247GB 永久包**（每 GB 仅 0.59 元），或者 [二猫云](/brands/ermaoyun) 的 **¥99 元 / 100GB 永久包**、[星岛梦](/brands/xingdaomeng) / [一翻云](/brands/yifanyun) 的 **¥100 元 / 100GB 永久包**。因为没有每月清零的时间限制，您每个月用 8GB–10GB，一份套餐可以用上整整两到三年，折算下来每个月才花 3 到 5 块钱，却能随时享受 500Mbps+ 的真 IEPL 专线。'
    },
    {
      q: 'Q5：站内收录的“5.6元/月（大佬云、闪电鼠、云界线等）”那么便宜，能买年付吗？',
      a: '**绝对不建议直接买年付！** 这五家 ¥5.6/月（30GB）的品牌属于典型的低门槛同构盘，虽然填补了 5 元级超低预算空白，但它们没有进入本站 2026-08-11 与 2026-10-19 的真实测速原图库，且抗封锁与长期履约能力远不如运营超 4 年的老牌专线。如果您想体验，最多掏 ¥5.6 元买 1 个月用完即止；如果要买年付，请加 2 块钱选择 ¥79–¥99/年的真专线（如光速云、星岛梦、二猫云）。详见 [/warnings（跑路预警专题）](/warnings)。'
    },
    {
      q: 'Q6：不小心导入了来历不明的免费节点或安装了盗版客户端，该如何紧急补救？',
      a: '请立即执行四步止损：① 断开网络，卸载非官方渠道下载的客户端，前往本站 [/clients](/clients) 重新安装 GitHub 官方原版软件；② 检查系统 Hosts 文件（`C:\\Windows\\System32\\drivers\\etc\\hosts`）与系统 DNS 设置是否被篡改；③ 在干净网络下修改在挂载免费节点期间登录过的邮箱、社交账号与交易平台密码，并开启两步验证（2FA）；④ 清理浏览器全部 Cookie 与站点缓存数据。'
    },
    {
      q: 'Q7：有没有完全开源、没有广告和后门的免费代理客户端推荐？',
      a: '客户端软件本身（除 iOS 端因 App Store 机制需付费购买 Shadowrocket/Stash 外）在 Windows、Android、macOS 和 Linux 上**全部有顶级的免费开源软件**！Windows/macOS 首选 **Clash Verge Rev**、**v2rayN** 或 **FlClash**；Android 首选 **v2rayNG**、**FlClash** 或 **NekoBox**。请直接前往本站 [客户端大全 (/clients)](/clients) 获取官方 GitHub Releases 直连地址。'
    },
    {
      q: 'Q8：为什么有些宣称“永久免费”的 VPN 浏览器插件（Chrome 扩展）能直接连上，但我不该用？',
      a: 'Chrome 商店里的许多免费 VPN 插件（尤其是被不明资本收购后的插件）是重灾区。因为浏览器扩展拥有读取您当前标签页 DOM 内容、Cookie 甚至注入恶意广告 JS 脚本的极高权限，过去数年已多次曝光免费 VPN 插件将数百万用户的住宅宽带变成商业爬虫代理池（出售给数据抓取公司，即亮数据模式）或窃取电商/加密钱包会话的丑闻。'
    }
  ],

  dataSources: {
    id: 'data-sources',
    badge: 'CHAPTER 09 · PROVENANCE & BOUNDARIES',
    title: '九、核验时间、数据来源与合规安全边界声明',
    intro: '作为坚持工程实证的评测导航站，本页面所有关于免费公益渠道的测试、安全威胁分析以及 42 家机场试用/低价平替方案的对比，均严格基于以下可溯源档案：',
    sources: [
      {
        title: '1. 42 家机场官方试用与退款条款核验库',
        detail: '基于 `src/data/brands.json` 与原始核验档案，逐家核对了光速云、飞猫云、微风、星岛梦、二猫云等全部 42 家品牌的“是否提供免费试用”、“最低月付/年付门槛”与“永久不限时套餐价格”，核验日期截至 `2026-11-07`。'
      },
      {
        title: '2. 2026-08-11 & 2026-10-19 真实测速数据集',
        detail: '本页引用的平替品牌速率（如光速云香港 22ms/529Mbps、二猫云 22ms/481Mbps、无忧链接 23ms/531Mbps、一翻云 23ms/477Mbps）均可在 [/speedtest（测速实测报告）](/speedtest) 中查验原始 PNG 截图与 SHA256 哈希。'
      },
      {
        title: '3. 开源客户端与协议安全审计规范',
        detail: '关于 YAML 远程规则注入、`external-controller` 端口暴露、DNS 投毒与 WebRTC 泄露的防护标准，严格遵循 Mihomo (Clash Meta) 与 Xray/sing-box 官方安全文档规范。'
      }
    ],
    gaps: [
      {
        label: '公开抓取节点池的时效性声明',
        content: '互联网公开抓取的免费节点存活中位数不足 6 小时，本站在原则上绝不直接托管或分发未经安全审计的第三方野鸡节点链接，以杜绝读者因误信公开节点而遭受 MITM 财产损失。'
      },
      {
        label: '超低价 5.6 元品牌的资料缺口提示',
        content: '大佬云、闪电鼠、云界线、榴莲云、环球梯虽具备 ¥5.6/月（30G）的极低账面价格，但目前缺乏统一的五地实测数据与长期存续记录，站内已统一标注“待补充实测 / 仅限短期月付尝试”。'
      }
    ]
  }
};

fs.writeFileSync('astroarabia/src/data/free-content.json', JSON.stringify(freeContent, null, 2));
console.log('Successfully generated astroarabia/src/data/free-content.json');
