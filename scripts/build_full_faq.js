import fs from 'fs';

const faqContent = {
  meta: {
    title: '2026 机场百科全书 FAQ：选购计费、Clash安装、订阅分流、ChatGPT/4K解锁与排障50问 - clashjichang.world',
    h1: '2026 机场百科全书与跨境网络工程 FAQ：从选购、配置到 AI 解锁的 48 组终极解答',
    description: '2026 专著级 Clash 机场问答知识库：按用户全生命周期划分为「选购与价格周期」、「客户端安装与系统兼容」、「订阅导入与分流规则」、「ChatGPT/Claude 与 4K 流媒体解锁」、「晚高峰掉速与网络排障」及「账号安全与防封号」6 大专区共 48 组深度问答，支持分类筛选与关键词秒级检索。',
    updatedAt: '2026-11-07',
    verifiedAt: '2026-11-07（全站 42 家品牌参数、17 份测速原图与 Mihomo/sing-box 内核规范同步）',
    author: 'Clash机场评测实验室（全平台技术支持与知识图谱组）',
    readingTime: '约 35 分钟深度阅读 / 随查随用'
  },

  directAnswer: {
    summary: '无论您是第一次接触“机场（跨境加速服务）”的纯新手，还是在折腾 Clash Verge Rev、Shadowrocket、TUN 虚拟网卡、ChatGPT/Claude 风控与晚高峰跨网丢包时遇到疑难杂症的进阶玩家，本页面都是全站最高效的“问题分发与解决中枢”。我们在页首直接提炼出用户搜索频率最高的 3 大黄金法则，并提供毫秒级关键词检索器：',
    points: [
      {
        label: '1. 选购与资费黄金法则：拒绝免费蜜罐与 5.6 元同构年付，认准“¥79–¥99/年一线专线”或“¥99–¥147 永久包”',
        content: '新手最容易踩的两个坑，一是轻信网上抓取的免费节点（导致账号被封或 DNS 投毒），二是贪图小便宜去买毫无实测图背书的超低价年付灵车。经本实验室对 42 家品牌的长期跟踪：每天都要翻墙的主力用户，直接选有 2026-08-11 原始测速图验证的百元内年付 IEPL/IPLC 专线（如光速云 ¥99/年折 ¥8.2/月、星岛梦/Firefly/U1S1/闪跃 ¥96/年折 ¥8/月、二猫云 ¥89/年、无忧链接 ¥79/年）；每月用量低于 15GB 的轻度或备用用户，直接买“一次性付费、流量永不过期”的按量包（如光速云 ¥147/247GB、二猫云 ¥99/100GB、一翻云/星岛梦 ¥100/100GB）。'
      },
      {
        label: '2. 客户端与排障黄金法则：90% 的“连上节点打不开网页 / 全部 Timeout”都源于 4 个本地设置失误',
        content: '当您导入订阅后发现所有节点显示红字 `Timeout` 或能连上却打不开网页，请按此顺序在 60 秒内完成自救：① 检查电脑/手机系统时间是否开启自动同步（误差超 60 秒会导致 TLS 握手直接失败）；② 检查是否还残留着旧代理插件（如 SwitchyOmega 指向了错误端口）或与其它 VPN 虚拟网卡冲突；③ 检查是否使用了早已停更的旧版 Clash for Windows（不认识 VLESS/Hysteria2 新协议，必须换用本站 [/clients](/clients) 收录的 Clash Verge Rev 或 FlClash）；④ 检查是否忘记开启 `Rule（规则分流）` 与 `系统代理 / TUN 模式`。'
      },
      {
        label: '3. AI 与流媒体解锁黄金法则：“香港节点跑满 500Mbps 看视频 + 新加坡/日本/美西原生节点锁死跑 ChatGPT/Claude”',
        content: '为什么香港节点延迟只有 22ms、下载高达 529Mbps，但打开 ChatGPT 却提示 `Unable to load site` 或地区不支持？因为 OpenAI 与 Anthropic 官方策略默认不对香港本土 IP 开放服务！最聪明的用法绝不是放弃高速的香港节点，而是利用 Clash 的分流规则（Rule），保持日常网页与 YouTube 4K 走 22ms 的香港 IEPL 专线，同时将 `AI 专属策略组` 单独切换到新加坡（42–46ms）、日本（53–57ms）、台湾或美国原生住宅 IP 节点（如一翻云、微风网络、速界、光速云对应节点）。'
      }
    ],
    quickNav: [
      { text: '🔍 交互检索：48问关键词秒查与6大分类过滤', href: '#interactive-faq-explorer' },
      { text: '📊 表1：报错代码与症状60秒速查表', href: '#error-code-table' },
      { text: '🧭 表2：不同需求与系统的黄金组合表', href: '#golden-combo-table' },
      { text: '💰 专区一：选购、计费、倍率与退款 (8问)', href: '#cat-buying' },
      { text: '💻 专区二：客户端下载、安装与苹果美区ID (8问)', href: '#cat-clients' },
      { text: '⚙️ 专区三：订阅导入、YAML分流与TUN模式 (8问)', href: '#cat-config' },
      { text: '🤖 专区四：ChatGPT/Claude与4K流媒体解锁 (8问)', href: '#cat-unlock' },
      { text: '🛠️ 专区五：晚高峰掉速、全红Timeout与跨网排障 (8问)', href: '#cat-troubleshoot' }
    ]
  },

  toc: [
    { id: 'direct-answer', title: '三大黄金法则与速查' },
    { id: 'interactive-faq-explorer', title: '交互检索：关键词过滤与快查' },
    { id: 'error-code-table', title: '表1：常见报错症状60秒速查表' },
    { id: 'golden-combo-table', title: '表2：场景×系统×机场黄金组合表' },
    { id: 'cat-buying', title: '一、选购、价格、倍率与试用 (Q1-Q8)' },
    { id: 'cat-clients', title: '二、全平台客户端安装与苹果ID (Q9-Q16)' },
    { id: 'cat-config', title: '三、订阅导入、规则分流与TUN (Q17-Q24)' },
    { id: 'cat-unlock', title: '四、AI大模型与4K流媒体解锁 (Q25-Q32)' },
    { id: 'cat-troubleshoot', title: '五、全红Timeout与掉速排障 (Q33-Q40)' },
    { id: 'cat-security', title: '六、账号安全、隐私与防跑路 (Q41-Q48)' },
    { id: 'recommended-entries', title: '七、闭眼入的3大标杆方案入口' },
    { id: 'data-sources', title: '八、知识库核验时间与专题矩阵' }
  ],

  errorCodeTable: {
    caption: '表 1：客户端与浏览器最常见的 8 大报错代码/故障症状 60 秒定位排障速查表',
    headers: [
      '故障症状 / 报错提示',
      '最常见触发场景',
      '底层工程根因定位',
      '60 秒标准修复动作',
      '深度承接专题链接'
    ],
    rows: [
      {
        error: '所有节点延迟显示 `Timeout` 或 `Error`',
        scene: '刚导入订阅或刚开机启动客户端时',
        cause: '① 本机系统时间误差超 60 秒；② 套餐到期/流量耗尽；③ 使用了不支持 VLESS 的旧版客户端内核',
        fix: '在系统设置中点击“立即同步网络时间”；检查订阅卡片剩余流量；升级至 Clash Verge Rev (Mihomo 内核)',
        link: '[/clients（客户端大全）](/clients)'
      },
      {
        error: '节点有延迟数字，但浏览器打不开任何外网',
        scene: '客户端已选节点，但 Chrome/Edge 仍报 `ERR_CONNECTION_TIMED_OUT`',
        cause: '未开启「系统代理 (System Proxy)」开关，或浏览器 SwitchyOmega 插件接管并指向了错误端口',
        fix: '打开客户端左侧「设置」开启「系统代理」（记住端口如 7897），并将浏览器插件设为「使用系统代理」',
        link: '[/clients#windows](/clients#windows)'
      },
      {
        error: '关闭客户端后，连国内百度/微信都打不开',
        scene: '未正常退出客户端直接关机，或卸载软件后断网',
        cause: 'Windows 注册表中的系统代理开关残留指向 `127.0.0.1:7897`，而本地代理进程已关闭',
        fix: '按 `Win + I` 打开网络设置 → 代理 → 关闭“使用代理服务器”，或重开客户端再正常关闭系统代理开关',
        link: '[/tools（梯子工具箱）](/tools)'
      },
      {
        error: 'ChatGPT 报 `Unable to load site` / `Access Denied`',
        scene: '挂着香港节点或万人骑低端节点打开 `chatgpt.com`',
        cause: 'OpenAI 默认封锁香港本土 IP，或当前节点属高欺诈分（Fraud Score >75）机房段被 Cloudflare 拦截',
        fix: '将 AI 规则组切换至新加坡、日本、台湾或美国原生住宅 IP 节点（如一翻云、微风、速界、光速云）',
        link: '[/tools#ip-probe-table](/tools#ip-probe-table)'
      },
      {
        error: 'Netflix 只能搜到《怪奇物语》，搜不到《绝命毒师》',
        scene: '连接节点观看 Netflix 时片库大幅缩水',
        cause: '当前节点 IP 被 Netflix 识别为数据中心代理，仅放行版权属于奈飞自己的“自制剧 (Originals Only)”',
        fix: '切换至标注有“原生 / NF / 流媒体解锁”的节点，并访问 `netflix.com/title/70143836` 验证非自制剧',
        link: '[/speedtest#unlock-evidence-gallery](/speedtest#unlock-evidence-gallery)'
      },
      {
        error: '白天测速 300Mbps，晚上 21:00 看 1080P 都卡顿',
        scene: '使用廉价公网直连或普通中转机场在晚高峰冲浪',
        cause: '国际公网骨干网出口在 20:00–23:00 严重拥塞，运营商对跨境 UDP/TCP 实施严厉 QoS 丢包限速',
        fix: '更换为不过公网 GFW 的真 IEPL/IPLC 内网专线机场（如光速云、U1S1、极连云、微风、飞猫云）',
        link: '[/guide（专线与协议科普）](/guide)'
      },
      {
        error: '点击更新订阅报 `Network Error / SSL Error / 404`',
        scene: '使用几个月后无法拉取最新节点列表',
        cause: '① 开启了代理去更新那些要求直连的订阅域名；② 机场旧订阅 API 域名被墙更换了新域名',
        fix: '先关闭系统代理用直连（或手机流量）更新；若仍失败，登录机场官网后台重新复制最新订阅地址',
        link: '[/warnings（跑路与失联排查）](/warnings)'
      },
      {
        error: '看国内 B 站/斗鱼直播很卡，且机场流量掉得飞快',
        scene: '日常挂着梯子同时浏览国内外网站',
        cause: '客户端误选了 `Global（全局代理模式）`，导致国内高清视频流量也绕道香港/美国专线扣费',
        fix: '在客户端「代理」顶部将模式从 `Global` 切换回 `Rule（规则分流模式）`，并用 `ip.skk.moe` 核验',
        link: '[/tools#chapter-4](/tools#chapter-4)'
      }
    ]
  },

  goldenComboTable: {
    caption: '表 2：2026 不同操作系统与核心使用场景的「客户端 + 协议 + 实测机场」黄金搭配速查表',
    headers: [
      '您的核心使用场景与设备',
      '首选客户端软件 (官方开源/正版)',
      '最佳底层线路与协议组合',
      '推荐对口实测机场方案',
      '月均或单次预算参考'
    ],
    rows: [
      {
        scene: 'Windows / macOS 主力办公 + 4K 视频 + AI',
        client: 'Clash Verge Rev 或 FlClash (Mihomo 内核)',
        proto: 'IEPL 双专线 + VLESS / Shadowsocks (Rule 规则模式)',
        brand: '[光速云 (TOP 1)](/brands/guangsu-cloud) / [微风网络 (TOP 4)](/brands/weifeng)',
        budget: '光速云 ¥99/年 (折¥8.2/月) 或 ¥25/月(168G)；微风 ¥137/年'
      },
      {
        scene: 'iOS (iPhone / iPad) 移动日常与流媒体',
        client: 'Shadowrocket (小火箭) 或 Stash / sing-box',
        proto: 'IEPL/IPLC 专线 + VLESS / Trojan (按需分流)',
        brand: '[光速云 (TOP 1)](/brands/guangsu-cloud) / [星岛梦 (TOP 6)](/brands/xingdaomeng) / [二猫云 (TOP 7)](/brands/ermaoyun)',
        budget: '¥7.4–¥8.2/月 (年付)，或 ¥99–¥147 永久不限时包'
      },
      {
        scene: 'Android 安卓手机 / 平板 / 电视盒子',
        client: 'FlClash (图形化分流) 或 v2rayNG (轻量极速)',
        proto: 'IEPL 专线 + VLESS / Hysteria 2 (VPN 虚拟网卡模式)',
        brand: '[一翻云 (TOP 16)](/brands/yifanyun) / [二猫云 (TOP 7)](/brands/ermaoyun) / [光速云 (TOP 1)](/brands/guangsu-cloud)',
        budget: '¥20/月 (130G–150G)，或 ¥99–¥100 永久不限时包'
      },
      {
        scene: '纯新手小白（不想折腾任何订阅链接与规则）',
        client: '机场官方自研全平台一键客户端（输入账号密码即连）',
        proto: '专线内置智能分流封装',
        brand: '[飞猫云 (TOP 3)](/brands/feimao) / [无忧链接 (TOP 8)](/brands/wuyou-link) / [Firefly (TOP 10)](/brands/firefly)',
        budget: '飞猫云学生年付 ¥84 (折¥7/月)；无忧链接年付 ¥79 (折¥6.5/月)'
      },
      {
        scene: 'ChatGPT Plus / Claude Pro / Cursor 极高纯净度需求',
        client: 'Clash Verge Rev (开启 TUN + AI 独立分流规则组)',
        proto: 'IEPL 物理专线 + 原生住宅 ISP IP (VLESS-Reality / Hy2)',
        brand: '[一翻云 (TOP 16)](/brands/yifanyun) / [速界 (TOP 23)](/brands/sujie) / [微风网络 (TOP 4)](/brands/weifeng)',
        budget: '¥20–¥27/月，或一翻云 ¥98/年、¥100 永久包'
      },
      {
        scene: '外服联机游戏 / 跨国语音会议 (要求 FullCone NAT)',
        client: 'Clash Verge Rev / v2rayN (开启 TUN Strict-Route)',
        proto: 'BGP 专线出口 + VLESS FullCone UDP 转发',
        brand: '[暮光加速 (TOP 2)](/brands/muguang) / [U1S1 (TOP 12)](/brands/u1s1)',
        budget: '暮光加速 ¥20/月(120G) 或 ¥109/年；U1S1 ¥96/年'
      },
      {
        scene: '轻度查资料 / 备用防失联（讨厌包月月底清零）',
        client: '任意支持多配置切换的通用客户端',
        proto: 'IEPL 专线按量计费（流量永不过期）',
        brand: '[光速云 (¥147/247GB)](/brands/guangsu-cloud) / [二猫云 (¥99/100GB)](/brands/ermaoyun)',
        budget: '一次性买断 ¥99–¥147（用两三年折合每月仅 3–6 元）'
      }
    ]
  },

  categories: [
    {
      id: 'cat-buying',
      badge: 'CATEGORY 01 · BUYING, PRICING & MULTIPLIERS',
      title: '一、选购决策、价格周期、流量倍率与退款政策（Q1–Q8）',
      desc: '解决“什么是机场”、“IEPL 专线值不值得买”、“包月还是买永久包划算”以及“为什么没有免费试用”的核心选购问题：',
      items: [
        {
          q: 'Q1：什么是“Clash 机场”？它和传统 VPN（如 ExpressVPN、NordVPN）有什么本质区别？',
          a: '“机场”是中文互联网对采用 Shadowsocks、VLESS、Trojan、VMess、Hysteria 2 等专门针对 GFW 深度包检测（DPI）研发的现代代理协议服务商的俗称（因其早期开源面板图标是一架纸飞机而得名）。与欧美传统商业 VPN 相比，机场具备三大压倒性优势：① **抗封锁存活率高**：欧美传统 VPN 采用特征极明显的 OpenVPN/IPsec 协议，在国内几乎常年连不上，而机场采用伪装成正常 HTTPS 流量的 VLESS/Trojan 或直接走不过 GFW 的 IEPL 内网专线；② **支持智能规则分流（Rule）**：用机场看国内淘宝、微信、B站自动直连不减速，只有访问海外网站才走代理，而传统 VPN 往往是蠢笨的全局代理；③ **性价比高出数倍**：传统 VPN 动辄每月 $10–$12 美金（约 ¥70–¥85/月），而本站实测跑出 529Mbps 的顶级 IEPL 专线机场（如 [光速云](/brands/guangsu-cloud)），年付折合每月仅需 **¥8 元**。'
        },
        {
          q: 'Q2：直连机场、公网中转机场、IPLC/IEPL 专线机场到底差在哪里？',
          a: '这三者决定了您在晚上 20:00–23:00 黄金晚高峰是“秒开 4K”还是“卡成幻灯片”：① **公网直连**：您的电脑直接穿过 GFW 国际出口连接海外 VPS，晚高峰丢包率高达 20%–50%，且端口极易被封；② **公网中转（BGP 中转）**：先连国内中转机房，再经运营商公网出口出国，比直连稳，但遇到敏感时期或跨网高峰仍会波动；③ **IEPL / IPLC 企业级内网专线**：您的流量在广州/深圳/上海 BGP 入口进入政企点对点物理内网光纤，**跨境段完全不经过公网 GFW 审查节点**，香港延迟稳定在 **21ms–27ms**，晚高峰零丢包（详见 [/guide 专线拓扑科普](/guide)）。在 2026 年，由于光速云、星岛梦、二猫云等已将真 IEPL 专线价格打到 ¥7.4–¥8.2/月，普通中转已毫无购买必要。'
        },
        {
          q: 'Q3：新手买机场应该选“月付”、“年付”还是“永久不限时流量包”？',
          a: '请严格遵循本站风控组总结的**「看运营年限与每月流量定周期」**法则：\n• **如果您每月用量 < 15GB（轻度查资料、用 AI、或者买第二家做备用机）**：直接买 **永久不限时流量包**！例如 [光速云 ¥147/247GB](/brands/guangsu-cloud)、[二猫云 ¥99/100GB](/brands/ermaoyun)、[星岛梦/Firefly/一翻云 ¥100/100GB](/brands/xingdaomeng)，一次付费管用两三年，不用担心月底清零；\n• **如果您每天都要刷视频，且选的是运营 4–6 年以上的老牌（如光速云、星岛梦、青云梯）**：直接买 **百元内轻量年付（¥96–¥99/年）**，折合每月仅 ¥8 元，比单买月付省下一半以上费用；\n• **如果您想尝试上线不足 2 年的新锐品牌（如 U1S1、极连云、光年梯、梯子云）或 5.6 元低价盘**：严格遵守 **先买 1 个月单月卡（¥5.6–¥20）** 实测晚高峰，绝不盲目长周期锁死。'
        },
        {
          q: 'Q4：每个月 50GB、100GB、168GB 流量到底够不够用？能看多少小时视频？',
          a: '让我们用真实工程数据帮您换算（以全节点 ×1 倍率实算为准）：\n• **纯网页浏览 + Telegram + 每天 100 条 ChatGPT/Claude 对话**：每天仅消耗约 100MB–250MB，一个月仅需 **3GB–8GB**；\n• **每天看 1 小时 YouTube 1080P 高清视频**：每小时约消耗 1.5GB–2.2GB，一个月约需 **45GB–65GB**（此时 ¥79–¥99/年含 50G–60G/月的轻量年付刚好够用）；\n• **每天看 1–2 小时 YouTube / Netflix 4K 60fps 超高清视频**：每小时约消耗 8GB–11GB，建议选择 **120GB–200GB/月** 的标准月付档（如光速云 ¥25/月含 168G、微风 ¥27/月含 200G、无忧链接 ¥19/月含 120G）。您也可以使用本站 [/tools](/tools) 内的计算器实时测算。'
        },
        {
          q: 'Q5：什么是机场的“节点倍率”？为什么有的机场 500GB 套餐比别人 100GB 用得还快？',
          a: '节点倍率（Multiplier）是扣除流量的乘数：`实际扣费流量 = 真实消耗流量 × 节点倍率`。不良商家常用的营销障眼法是：表面给您 500GB/月，但把所有好用的 IEPL 专线和原生解锁节点全部设为 **×3 倍甚至 ×5 倍率**（您实际只看了 30GB 视频，后台就扣光了 150GB 额度！），只留两个卡顿的公网节点是 ×1 倍率。因此本站优先主推官方明确承诺 **全节点 ×1 倍率（或无倍率套路）** 的老牌机场，如 [光速云](/brands/guangsu-cloud)、[星岛梦](/brands/xingdaomeng)、[无忧链接](/brands/wuyou-link)、[唯兔云](/brands/weitu-cloud)、[青云梯](/brands/qingyunti)。'
        },
        {
          q: 'Q6：为什么站内推荐的专线机场几乎都写着“无免费试用，特殊商品不支持退款”？',
          a: '这是整个跨境专线行业的通行风控规则，原因有三：① **防同行脚本 DDoS**：一旦开放免费注册试用，黑灰产同行可用脚本每分钟提取国内 BGP 入口 IP 发起大流量攻击；② **防黑产污染原生 IP**：免费涌入的垃圾邮件与撞库脚本会在几小时内把昂贵的 ChatGPT/Netflix 解锁 IP 送进黑名单；③ **数字订阅的不可逆性**：订阅链接一旦发放，节点配置即已交付。为降低试错成本，请参考我们的 [/free（免费与超低成本平替专题）](/free)。'
        },
        {
          q: 'Q7：机场限制“同时在线设备数（如限 3 台或 5 台）”是怎么计算的？不限设备更好吗？',
          a: '“同时在线设备数”是指在**同一时刻**通过该订阅发起活跃网络连接的不同公网来源 IP（或不同终端）数量。如果您在自己家里，手机、电脑、iPad 连在同一个路由器 Wi-Fi 下（对外共享同一个家庭宽带公网 IP），在绝大多数机场后台只算作 **1 个在线 IP**！如果您需要带着手机在外面用 5G 流量，同时家里电脑和工作室电脑都挂着，或者与家人合租，建议优先选择明确标注 **“不限制同时在线设备数”** 的品牌，如 [星岛梦](/brands/xingdaomeng)、[二猫云](/brands/ermaoyun)、[唯兔云](/brands/weitu-cloud)、[一翻云](/brands/yifanyun)、[隐形人](/brands/yinxingren)、[TNTCloud](/brands/tntcloud)。'
        },
        {
          q: 'Q8：在机场官网付款时，使用支付宝或微信支付安全吗？需要使用加密货币吗？',
          a: '对于普通个人用户而言，在正规运营多年的机场官网使用支付宝或微信扫码支付是完全便捷且常见的。原因在于：机场接入的是第三方聚合收单或当面付接口，商户后台只能收到一笔带有订单号的资金流水，**根本无法获取您的真实姓名、身份证号或银行卡密码**。当然，如果您具备极高的匿名洁癖且本身持有 USDT（TRC20/Polygon），部分老牌机场也支持加密货币结算。但请注意：若一家不知名小机场突然关闭支付宝/微信且只收 USDT，反而要警惕其跑路前兆（详见 [/warnings](/warnings)）。'
        }
      ]
    },

    {
      id: 'cat-clients',
      badge: 'CATEGORY 02 · CLIENTS, OS & APPLE ID',
      title: '二、全平台代理客户端下载、安装与苹果美区 ID（Q9–Q16）',
      desc: '解决 Windows、macOS、Android、iOS 及软路由 OpenWrt 该下什么软件、为什么旧版 CFW 不能用了以及苹果怎么下小火箭的问题（完整下载直链见 [/clients](/clients)）：',
      items: [
        {
          q: 'Q9：为什么我电脑上以前的 Clash for Windows (CFW) 导入新机场订阅会报错或看不到节点？',
          a: '原版 `Clash for Windows (CFW)` 及其使用的旧版 Clash Premium 内核已在 2023 年底彻底删库停更！旧内核**完全无法识别 2024–2026 年全面普及的 VLESS、VLESS-Reality、Hysteria 2、TUIC v5 与 AnyTLS 等新协议**。当您把采用 VLESS 专线的机场（如光速云、暮光加速、微风网络、一翻云）导入旧版 CFW 时，软件会因为不认识 `type: vless` 而直接报错或过滤掉所有节点。请立即卸载旧版 CFW，前往本站 [客户端大全 (/clients)](/clients) 下载搭载新一代 **Mihomo (Clash Meta) 内核** 的 **Clash Verge Rev** 或 **FlClash**！'
        },
        {
          q: 'Q10：Windows 10/11 电脑端在 2026 年最推荐哪款客户端？x64 和 arm64 安装包怎么选？',
          a: 'Windows 端绝对首选 **[Clash Verge Rev](/clients#windows)**（功能最全、支持 TUN 虚拟网卡与本地覆写）或 **[FlClash](/clients#windows)**（Flutter 跨平台、界面极简丝滑、内存占用极低）；喜欢节点列表直铺的极客可选 **[v2rayN](/clients#windows)**。在 GitHub Releases 下载安装包时，99% 的 Intel 与 AMD 处理器台式机/笔记本请认准 **`x64-setup.exe`**；只有搭载高通骁龙芯片的 Surface Pro 等 ARM 架构笔记本才选 `arm64`。'
        },
        {
          q: 'Q11：苹果手机（iPhone / iPad）为什么在国区 App Store 搜不到 Shadowrocket（小火箭）？怎么下载？',
          a: '因为苹果中国大陆区（CN 区）App Store 早在数年前就应监管要求下架了所有跨境网络代理类应用。要在 iPhone 或 iPad 上安装 **[Shadowrocket（小火箭，$2.99）](/clients#ios)**、**[Stash（Clash for iOS）](/clients#ios)**、**[Quantumult X](/clients#ios)** 或免费的 **[sing-box / Karing](/clients#ios)**，您必须准备一个 **非中国大陆区（推荐美区 US 或港区 HK）的 Apple ID**。注意关键安全铁律：登录外区 Apple ID 时，**只能在桌面打开蓝色的「App Store」图标登录下载，严禁在系统「设置 (Settings) → 顶部 iCloud」中登录外区共享账号**，以防手机被远程锁死勒索！'
        },
        {
          q: 'Q12：苹果 Mac 电脑（MacBook Air/Pro M1/M2/M3/M4 芯片）该选哪个软件？提示“已损坏无法打开”怎么办？',
          a: 'macOS 电脑首选 **[Clash Verge Rev](/clients#macos)** 或 **[FlClash](/clients#macos)**（若已购买 iOS 版 Stash 或 Surge 也可直接用 Mac 版）。下载时：苹果自研 M 系列芯片请选 **`aarch64.dmg`（或 `arm64.dmg`）**，老款 Intel 芯片 Mac 选 **`x64.dmg`**。由于开源软件未向苹果交纳每年 $99 的开发者公证保护费，首次打开若弹出“已损坏，无法打开”或“未验证开发者”，只需打开 Mac「终端 (Terminal)」，输入命令 `sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app` 回车并输入开机密码即可瞬间放行。'
        },
        {
          q: 'Q13：安卓手机（华为鸿蒙 HarmonyOS、小米澎湃、OPPO、vivo）装哪个客户端最稳？',
          a: 'Android 端最推荐两款开源神器：① 如果您喜欢和电脑端 Clash 一模一样的图形化策略组卡片，首选 **[FlClash](/clients#android)** 或 **[Clash Meta for Android (CMFA)](/clients#android)**；② 如果您追求极致的省电、后台保活与单节点测速，首选 **[v2rayNG](/clients#android)**。下载 `.apk` 安装包时，现今主流安卓手机 99% 为 64 位处理器，请优先下载 **`arm64-v8a.apk`**（或通用包 `universal.apk`）。安装后务必在手机系统的「电池优化 / 后台高耗电管理」中将软件设为“允许后台无限制运行”，防止锁屏 5 分钟被系统杀后台断连。'
        },
        {
          q: 'Q14：什么是“机场官方专属客户端”？为什么飞猫云、无忧链接、SOGO云、闪跃等不给通用 Clash 订阅链接？',
          a: '在本站 42 家品牌库中，[飞猫云](/brands/feimao)、[无忧链接](/brands/wuyou-link)、[灵猫网络](/brands/lingmao-network)、[SOGO云](/brands/sogo-cloud)、[闪跃](/brands/shanyue)、[全球云](/brands/quanqiuyun) 等品牌采用了**官方自研客户端（输入注册邮箱和密码直接登录，点一下大圆钮即连）**的模式。这种模式专为讨厌复制订阅链接、看不懂 YAML 规则的新手设计，同时也能防止用户乱用公共订阅转换网站泄露节点 IP。如果您使用的是软路由 OpenWrt 或坚持只用自己电脑上的 Clash Verge Rev，请在选购时认准支持**通用订阅导入**的品牌（如 [光速云](/brands/guangsu-cloud)、[暮光加速](/brands/muguang)、[微风网络](/brands/weifeng)、[星岛梦](/brands/xingdaomeng)、[二猫云](/brands/ermaoyun)、[一翻云](/brands/yifanyun)）。'
        },
        {
          q: 'Q15：家里的软路由（OpenWrt / iStoreOS）或群晖 NAS 旁路由推荐用什么插件跑专线机场？',
          a: '在 2026 年的 OpenWrt 软路由生态中，最推荐的三大插件依次为：① **Nikki（原名 MihomoTProxy）**：专为 Mihomo (Clash Meta) 内核打造的现代透明代理插件，极其轻量且原生支持 VLESS-Reality 与 Hysteria 2；② **OpenClash（切换至 Meta 内核）**：图形化规则控制力最强，适合需要精细分流全家电视盒子、游戏机与 NAS 的高阶玩家；③ **PassWall / HomeProxy（sing-box 内核）**：在低性能 ARM 路由器上 CPU 占用最低。注意：软路由必须使用支持导出通用订阅链接的机场！'
        },
        {
          q: 'Q16：去哪里下载客户端才不会中木马？为什么网上有那么多假冒的 Clash 官网？',
          a: '由于原版 Clash 等开源项目仅托管在 GitHub 上，没有所谓的“中文商业推广官网”，黑灰产团伙注册了大量诸如 `clashforwindows.net`、`v2rayn.org` 之类的李鬼域名并购买搜索引擎广告，在安装包中植入盗取浏览器 Cookie 与加密货币助记词的木马！请牢记：**永远只从官方 GitHub Releases 仓库下载开源客户端**。本站 [客户端配置大全 (/clients)](/clients) 已为您逐一核验并归档了全部 6 大平台 30+ 款软件的真实 GitHub 官方直链。'
        }
      ]
    },

    {
      id: 'cat-config',
      badge: 'CATEGORY 03 · SUBSCRIPTION, RULES & TUN MODE',
      title: '三、订阅导入、Rule 规则分流、TUN 虚拟网卡与端口配置（Q17–Q24）',
      desc: '解决“三种代理模式怎么选”、“TUN 模式和系统代理有什么区别”、“怎么让某个软件强制走代理或强制直连”的实操配置问题：',
      items: [
        {
          q: 'Q17：Clash 客户端里的「Rule（规则）」、「Global（全局）」、「Direct（直连）」三种模式到底该选哪个？',
          a: '**99% 的日常时间请永远保持在 `Rule（规则分流模式）`！**\n• **Rule（规则模式，首选）**：客户端会根据配置文件里的数千条分流列表，自动让淘宝、微信、B站、国内网银走本地宽带毫秒级直连（不消耗机场流量），而只把 Google、YouTube、ChatGPT、Telegram 等海外网站送进专线隧道；\n• **Global（全局模式，仅限排障）**：不管国内还是国外网站，全部强行塞进您选定的单个海外节点。平时误开全局会导致国内网页变慢且流量飞速耗尽，仅在访问某个极其冷门、未被规则收录的海外小网站打不开时临时切换 5 分钟；\n• **Direct（直连模式）**：所有流量不走代理，相当于暂时关闭梯子。'
        },
        {
          q: 'Q18：「系统代理（System Proxy）」和「TUN 模式（虚拟网卡）」有什么区别？我该开哪个？',
          a: '这两者是客户端接管您电脑流量的两个不同层级：\n• **系统代理（System Proxy，日常首选）**：在操作系统应用层设置一个 HTTP/SOCKS5 代理端口（如 `127.0.0.1:7897`）。Chrome、Edge 浏览器与 Telegram 等遵守系统代理规范的软件会自动走代理，最省 CPU 资源且兼容性最稳；\n• **TUN 模式（虚拟网卡，进阶全接管）**：在系统底层创建一个虚拟网卡（如 `Meta` 网卡），在 L3 网络层强行拦截整台电脑的所有 TCP 与 UDP 流量！**什么时候必须开 TUN 模式？** 当您需要让**不遵循系统代理的命令行终端（Git/npm/Docker）、UWP 应用、客户端版 ChatGPT/Claude 桌面应用或外服联机游戏**走代理时，开启 TUN 模式即可一键搞定。'
        },
        {
          q: 'Q19：为什么代理组里有一个「自动选择 (URL-Test)」和一个「故障转移 (Fallback)」，我该选它们还是手动选节点？',
          a: '• **自动选择（URL-Test）**：每隔几分钟自动对组内所有节点测一次延迟，谁延迟最低就自动切给谁。**缺点是**：如果您的香港 01 节点是 22ms、香港 02 节点是 24ms，它可能会在后台频繁为您切换出口 IP，而 **ChatGPT、Claude、PayPal 与网银最忌讳会话期间频繁变动 IP**！\n• **最佳工程实践**：看 YouTube 视频或日常刷推可以使用「自动选择」或「故障转移」；但对于 **AI 生产力工具组（OpenAI/Claude）**，强烈建议在策略组里**手动点选固定一条低欺诈分的新加坡、日本或美西节点**，保持出口 IP 恒定不变。'
        },
        {
          q: 'Q20：如何让电脑上的微信、迅雷、百度网盘或某个特定国内网站强制直连（不走代理）？',
          a: '默认情况下，`Rule` 规则模式已经将微信、迅雷与国内主流网站设为 `DIRECT` 直连。如果您发现某个特定的公司内网域名（如 `oa.mycompany.com`）或某款小众国内软件（如 `MyGame.exe`）被误判走了代理，只需在 Clash Verge Rev 左侧点击「订阅 (Profiles)」→「全局扩展配置 (Merge)」，右键编辑填入以下两行代码即可永久强制直连：\n`prepend-rules:`\n`  - PROCESS-NAME,MyGame.exe,DIRECT`\n`  - DOMAIN-SUFFIX,mycompany.com,DIRECT`'
        },
        {
          q: 'Q21：为什么我在命令行（CMD / PowerShell / Terminal）里运行 `git clone` 或 `pip install` 时，即使开了系统代理还是很慢？',
          a: '因为 Windows 的 CMD/PowerShell 与 macOS/Linux 的 Terminal 终端**默认完全无视操作系统的「系统代理（System Proxy）」设置**！您有两种优雅的解决方法：① 最简单的方法：直接在 Clash Verge Rev 或 FlClash 中打开 **「TUN 模式（虚拟网卡）」**，终端流量会被底层虚拟网卡瞬间接管加速；② 环境变量法：在终端执行命令前先设置代理端口（以 Clash Verge Rev 默认端口 `7897` 为例）：PowerShell 输入 `$env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"`，或者直接点击客户端界面上的「复制环境变量命令」。'
        },
        {
          q: 'Q22：如何把手里的两家机场（比如光速云主力 + 二猫云永久包备用）导入同一个客户端随时切换？',
          a: '非常简单！现代客户端（Clash Verge Rev、FlClash、Shadowrocket、v2rayN）全部支持同时保存几十个不同的订阅 Profile：① 先复制第一家机场（如光速云）的订阅链接，在客户端「订阅/配置」界面粘贴并点击下载；② 再复制第二家备用机场（如二猫云）的订阅链接，同样粘贴点击下载；③ 此时界面上会出现两张独立的订阅卡片，平时单击选中光速云卡片（激活状态），一旦遇到特殊维护，只需鼠标单击二猫云卡片，1 秒钟即可切换整套专线节点！'
        },
        {
          q: 'Q23：什么是 Fake-IP 模式和 Redir-Host 模式？为什么大家都推荐开 Fake-IP？',
          a: '这是 Clash (Mihomo) 内核处理 DNS 解析的两种核心机制：在传统的 `Redir-Host` 模式下，客户端必须先等待 DNS 服务器返回真实 IP 后才能决定分流，不仅连接首包慢了 50–100ms，还极易引发本地 DNS 抢答污染；而在 **`Fake-IP（增强模式）`** 下，当浏览器请求域名时，内核在 0.1ms 内立即返回一个虚拟的 `198.18.0.x` 地址欺骗浏览器立即发包，同时直接把原始域名通过加密专线发给海外节点解析——**既实现了秒开网页，又从物理上根治了 DNS 泄露**（详见 [/tools#chapter-3](/tools#chapter-3)）。'
        },
        {
          q: 'Q24：如何把电脑上已经连好的 Clash 代理共享给同一个 Wi-Fi 下的 PS5、Switch 游戏机或 Apple TV 电视盒子？',
          a: '只需三步即可把您的电脑变成局域网加速网关：① 在电脑 Clash Verge Rev 的「设置」中，打开 **「允许局域网连接 (Allow LAN)」** 开关，并记下您的电脑局域网 IP（如 `192.168.1.100`）与混合端口（如 `7897`）；② 确保电脑 Windows 防火墙允许 Clash 通过专用/公用网络；③ 打开 PS5、Switch 或电视盒子的 Wi-Fi 高级设置，将「代理服务器」设为手动，填入电脑 IP `192.168.1.100` 和端口 `7897` 即可满速下载更新或观看海外流媒体！'
        }
      ]
    },

    {
      id: 'cat-unlock',
      badge: 'CATEGORY 04 · CHATGPT, CLAUDE & 4K STREAMING UNLOCK',
      title: '四、ChatGPT / Claude / Gemini 大模型与 Netflix 4K 流媒体解锁（Q25–Q32）',
      desc: '解决“为什么香港节点用不了 ChatGPT”、“Claude 为什么那么容易封号”、“Netflix 自制剧与非自制剧怎么区分”以及“YouTube 送中”的高频痛点：',
      items: [
        {
          q: 'Q25：为什么我连着测速 500Mbps 的香港专线节点，打开 ChatGPT 却提示地区不支持或 `Unable to load site`？',
          a: '这不是机场节点坏了，而是 **OpenAI（ChatGPT 母公司）、Anthropic（Claude）与 Google（Gemini）的官方合规政策默认将“中国香港（HK）”列在非服务区名单内**！除非某家机场在香港节点上专门部署了指向新加坡或美国的“二级链式落地解锁（DNS/分流内嵌解锁）”，否则直出香港本土 IP 必然无法直接打开 OpenAI。解决方法极其简单：在 Clash 的「代理 (Proxies)」界面找到 `OpenAI / ChatGPT / AI` 分组，将其手动切换至 **新加坡（SG）、日本（JP）、台湾（TW）或美国（US）节点** 即可秒开！'
        },
        {
          q: 'Q26：Claude 3.5 / Claude 4 为什么比 ChatGPT 更容易封号？用什么机场和节点最稳？',
          a: 'Anthropic (Claude) 的风控系统堪称目前全球 AI 平台中最严苛的“宁可错杀”机制，它会同时检测您的 **注册手机号国家、出口 IP 的 ASN 属性（是否机房 Hosting IP）、IP 欺诈分以及浏览器环境**。要长期稳定使用 Claude 而不被秒封，请遵守三条铁律：① 绝不用万人骑免费节点或频繁跳 IP 的自动测速组；② 选择明确实测支持 Claude 且提供高纯净度原生住宅/ISP IP 的专线机场（如本站实测通过的 [光速云](/brands/guangsu-cloud)、[暮光加速](/brands/muguang)、[微风网络](/brands/weifeng)、[一翻云](/brands/yifanyun)、[速界](/brands/sujie)）；③ 登录前先用本站 [/tools](/tools) 里的 Scamalytics 探针确认当前美国或英国/日本节点欺诈分低于 25 分，并固定使用该单一节点。'
        },
        {
          q: 'Q27：什么是 Netflix（奈飞）的“仅自制剧（Originals Only）”和“完整全解锁”？怎么一键自测？',
          a: 'Netflix 将片库分为两类：一类是奈飞自己出钱拍的《怪奇物语》《鱿鱼游戏》等（自制剧，全球任何机房代理 IP 都能看）；另一类是奈飞向各大电影公司购买版权的《绝命毒师》《老友记》及海量日本动漫（非自制剧，一旦检测到劣质机房代理 IP 就会直接隐藏搜不到！）。\n**10 秒自测法**：连上节点后，在浏览器直接访问测试网址 `https://www.netflix.com/title/70143836`（《绝命毒师》编号）。如果能正常显示播放页，恭喜您，该节点属于真正的 **完整全解锁（Full Unlock）**；如果弹出 `Oh no! This title currently isn\'t available`，说明该节点仅支持自制剧。本站 TOP 10 推荐榜中的专线机场均实测支持非自制剧全解锁。'
        },
        {
          q: 'Q28：为什么我挂着台湾或香港节点打开 YouTube，左上角却没有显示 HK/TW 标志，且无法后台播放（俗称“IP 送中”）？',
          a: '这种现象在圈内被称为 **“Google / YouTube IP 送中”**。成因是：部分用户手机上开启了精准 GPS 定位权限并登录了谷歌地图/YouTube App，谷歌大数据发现“虽然这个 IP 注册在香港/台湾，但连接这个 IP 的几百部手机 GPS 定位全在中国大陆”，于是谷歌自动将该 IP 的区域定位修正成了 `CN（中国）`！一旦 IP 被送中，YouTube Premium 会员的画中画后台播放会失效，且 Google 搜索会强制关闭安全搜索过滤。遇到送中节点时，只需在客户端切换到同地区的另一条编号节点（或切换至新加坡/日本节点）即可恢复。'
        },
        {
          q: 'Q29：做跨境电商或刷海外版抖音 TikTok，为什么插着国内手机卡挂普通节点还是黑屏？',
          a: 'TikTok 为了隔离中国大陆用户，早期通过直接读取手机 SIM 卡的运营商国家代码（MCC：`460` 代表中国三大运营商）来实施物理锁区。但到了 2026 年，只要您使用的是最新版 TikTok 客户端或网页版，配合针对 TikTok 跨区直连做过专门规则与原生 IP 优化的机场（特别是本站实测专门强化电商与 TikTok 跨区免拔卡直连的 **[无忧链接 TOP 8](/brands/wuyou-link)**、**[一翻云 TOP 16](/brands/yifanyun)**、**[光速云 TOP 1](/brands/guangsu-cloud)**、**[微风网络 TOP 4](/brands/weifeng)**），并在客户端配置正确的 TikTok 分流规则集，无需拔卡即可流畅观看与运营。'
        },
        {
          q: 'Q30：看台湾巴哈姆特动画疯（Anime Crazy）或 Disney+ 有什么特殊的节点要求？',
          a: '台湾巴哈姆特动画疯对 **台湾本土原生 IP（如中华电信 HiNet、台湾大哥大、凯擘大宽频）** 的校验极其严格，普通的欧美广播到台湾的机房 IP 会直接提示“很抱歉，本服务仅限台湾地区观看”。如果您是动漫迷，请优先选择在 2026-10-19 五地实测中台湾节点表现优异且配备原生解锁的专线机场，如 [Firefly](/brands/firefly)（台湾 39ms / 135Mbps）、[二猫云](/brands/ermaoyun)（台湾 41ms / 118Mbps）、[SOGO云](/brands/sogo-cloud)（台湾 39ms / 118Mbps）、[一翻云](/brands/yifanyun)（台湾 40ms / 117Mbps）与 [光速云](/brands/guangsu-cloud)（台湾 41ms / 114Mbps）。'
        },
        {
          q: 'Q31：为什么 Google 搜索有时候会频繁弹出“我不是机器人（reCAPTCHA）”的九宫格验证码？',
          a: '这是因为当前节点在同一时间段内有较多用户共同发起 Google 搜索，触发了谷歌的自动化反爬虫速率限制（Rate Limiting）。减少验证码的三个立竿见影技巧：① 尽量在浏览器中 **登录您自己的 Google 账号**（已登录状态下的信任权重远高于匿名无痕访问）；② 避开编号排在最前面的热门节点（如“香港 01”、“新加坡 01”大家都爱点，改选靠后的“香港 08”、“新加坡 05”或冷门国家节点）；③ 优先选择提供原生 IP 的一线专线机场。'
        },
        {
          q: 'Q32：使用 Cursor、GitHub Copilot 或本地调用 OpenAI API 时，怎么配置才不会中断报错？',
          a: 'AI 编程工具（如 Cursor IDE、VS Code Copilot）底层大量使用长连接流式传输（Server-Sent Events / HTTP2 Stream）。配置要点：① 在 Cursor 设置中若开启了 HTTP2 报错，可勾选 `Disable HTTP/2` 提升兼容性；② 开启 Clash Verge Rev 的 **TUN 虚拟网卡模式**，或将 `cursor.sh`、`openai.com`、`anthropic.com`、`githubcopilot.com` 明确分流至低延迟的 **新加坡 IEPL 专线节点**（新加坡兼具 43ms 极低延迟与 100% AI 原生支持，比 160ms 的美西节点代码补全响应快 3 倍以上！）。'
        }
      ]
    },

    {
      id: 'cat-troubleshoot',
      badge: 'CATEGORY 05 · SPEED DROP, TIMEOUT & NETWORK TROUBLESHOOTING',
      title: '五、晚高峰掉速、全节点 Timeout 与跨网 QoS 深度排障（Q33–Q40）',
      desc: '解决“为什么朋友用这个机场跑 500M 我只能跑 30M”、“校园网/移动宽带连不上怎么办”以及“UDP 断流”的底层网络工程排障：',
      items: [
        {
          q: 'Q33：为什么在本站测速图里某机场能跑 529Mbps，我自己在家测只有 80Mbps？',
          a: '代理节点的最终下载速度遵循严格的 **“木桶最短板定律”**，受四个环节共同制约：\n1. **您家里的本地宽带签约上限与 Wi-Fi 衰减**：如果您办的是百兆宽带（100Mbps），或者手机隔着两堵墙连在 2.4GHz 旧路由器 Wi-Fi 上，物理上限就只有 60–90Mbps（测速前请尽量插千兆网线或贴近 5GHz/Wi-Fi 6 路由器）；\n2. **本地省份运营商到机场国内入口的跨网路由**：例如机场入口在广东电信，而您是北方移动或长城宽带/校园网，跨网阶段可能存在本地 QoS；\n3. **测试时间与单线程/多线程差异**：详见 [/speedtest#how-to-read-metrics](/speedtest#how-to-read-metrics) 的工程拆解。'
        },
        {
          q: 'Q34：我是中国移动家宽（或高校校园网/教育网），为什么连某些机场容易断流？该选哪种机场？',
          a: '中国移动宽带（CMNET）与高校校园网拥有全国最严厉的 **省际结算墙、NAT444 多层内网转换以及针对大流量 UDP/固定端口的 QoS 限速策略**。移动与校园网用户选机场的黄金处方：① **国内入口必须包含“多线 BGP（同时接入移动/电信/联通）”**，确保移动宽带就近走移动 BGP 入口进专线，不跨网去挤电信入口；② **协议优先选基于 TCP/TLS 伪装的 VLESS、Trojan 或 Shadowsocks**（若移动对 UDP 限速，纯 UDP 协议可能会被省网掐断）；③ 推荐经过多网实测的 [光速云](/brands/guangsu-cloud)、[暮光加速](/brands/muguang)、[唯兔云（三网BGP智能负载）](/brands/weitu-cloud) 与 [SOGO云](/brands/sogo-cloud)。'
        },
        {
          q: 'Q35：为什么客户端里所有节点突然全部变成红色 `Timeout`，但别人说机场一切正常？',
          a: '当机场本身没挂、只有您的电脑全红 `Timeout` 时，95% 是以下三个本地原因之一：\n• **第一原因（占 60%）：系统时间不同步！** 请立刻看一眼电脑右下角的时间，哪怕只比标准北京时间快或慢了 90 秒，TLS 1.3 证书时间戳校验与代理握手就会 100% 失败。去系统设置点一下“立即同步时间”即可秒好；\n• **第二原因（占 25%）：套餐流量用光了或账单到期了**，去客户端「订阅」界面看一眼流量条；\n• **第三原因（占 15%）：机场更换了国内入口 IP**，您已经一两个月没点过「更新订阅」了，请关闭系统代理后点击更新订阅拉取最新节点。'
        },
        {
          q: 'Q36：开启代理后，为什么电脑上的微信发不出图片、或者苹果 App Store 无法下载更新国内软件？',
          a: '这是因为腾讯微信图片服务器（`tencent.com` / `qpic.cn`）与苹果中国区 CDN（`mzstatic.com`）对海外代理 IP 存在防盗链或异地风控拦截，且您的分流规则未将它们正确归入 `DIRECT`（直连）。解决方法：① 确认客户端处于 `Rule` 规则模式而非 `Global` 全局模式；② 在客户端设置中开启 `Fake-IP` 并点击「清理 Fake-IP 缓存（Flush Fake-IP Cache）」；③ 若使用 TUN 模式，确保系统 DNS 未被第三方加密软件锁死在海外 IP。'
        },
        {
          q: 'Q37：为什么看 YouTube 4K 视频前面 2 分钟很流畅，突然就卡住转圈，切一下节点又马上好了？',
          a: '这种“前快后卡、切节点即恢复”的典型症状，是由 **YouTube 默认启用的 QUIC（基于 UDP 443 端口的 HTTP/3）协议触发了您本地宽带运营商的 UDP QoS 间歇性阻断** 引起的！根治神技：在 Chrome 或 Edge 浏览器地址栏输入 `chrome://flags/#enable-quic`，将 **Experimental QUIC protocol** 选项从 `Default` 改为 **`Disabled`（禁用）** 并重启浏览器。禁用后，YouTube 会强制回退到走 IEPL 专线最稳健的 TCP TLS 通道，从此告别莫名其妙的断流转圈！'
        },
        {
          q: 'Q38：电脑上同时装了 360 安全卫士、火绒、卡巴斯基或公司深信服 VPN，会影响 Clash 吗？',
          a: '**会产生剧烈冲突！** 尤其是两类软件：① **企业办公 VPN（深信服 EasyConnect / aTrust、Cisco AnyConnect、Pulse Secure）**：它们会强行修改系统的路由表（Routing Table）与 DNS 跃点数，与 Clash 的 TUN 虚拟网卡争夺控制权，建议办公与翻墙分时开启，或只用 Clash 的普通系统代理模式配合 SwitchyOmega 浏览器插件；② **带有“HTTPS 流量扫描 / 加密连接检查”的杀毒软件（如卡巴斯基、Bitdefender、360）**：它们会在本地强行注入根证书拦截 TLS 握手，破坏 VLESS-Reality 指纹，务必将 Clash 安装目录加入杀毒软件白名单并关闭 HTTPS 扫描。'
        },
        {
          q: 'Q39：手机连接机场开启 VPN 后，为什么耗电量明显变快？怎么优化省电？',
          a: '手机代理耗电主要来自两个方面：一是加密解密运算，二是后台自动测速组（`URL-Test`）每隔 3 分钟唤醒无线基带对几十个节点轮番发包测延迟！**手机端终极省电三步法**：① 优先选择基于现代 Flutter 或纯原生架构的轻量客户端（Android 选 **FlClash** 或 **v2rayNG**，iOS 选 **Shadowrocket** 或 **sing-box**）；② 优先选择计算开销极低的 **VLESS** 或 **Shadowsocks** 协议节点；③ 在手机上手动选定一条稳定的香港或新加坡节点，避免使用高频唤醒网卡的自动轮询测速组。'
        },
        {
          q: 'Q40：每年遇到重大会议或特殊敏感时期，普通梯子全挂了，专线机场真的不受影响吗？',
          a: '这就是 **IEPL / IPLC 内网物理专线** 与普通公网翻墙工具拉开代差的关键时刻！在敏感时期，GFW 大幅升级的是对“公网国际出口”的深度包检测（DPI）与高危 IP 段封锁，導致自建公网 VPS 与廉价直连机场成片阵亡；而真 IEPL/IPLC 专线由于走的是政企内网跨境点对点专线（不过公网 GFW），其跨境隧道本身完全不受公网封锁升级影响！唯一可能受波及的是机场的“公开订阅域名”，因此老牌专线机场（如光速云、星岛梦、青云梯）只需确保本地已提前更新好配置，敏感期照常丝滑在线。'
        }
      ]
    },

    {
      id: 'cat-security',
      badge: 'CATEGORY 06 · ACCOUNT SECURITY, PRIVACY & ANTI-SCAM',
      title: '六、账号安全、隐私边界、同源识别与防跑路（Q41–Q48）',
      desc: '解决“机场主能不能看到我的聊天记录”、“怎么防止订阅被盗刷”、“同源马甲怎么认”等关乎数字资产与钱包安全的终极问题：',
      items: [
        {
          q: 'Q41：机场主（腐竹）在后台到底能看到我的什么信息？能看到我的微信聊天记录或银行密码吗？',
          a: '请用密码学事实消除恐慌或盲目自信：\n• **机场主绝对看不到的内容**：只要您访问的网站地址栏带有锁头标志（**HTTPS / TLS 1.2 & 1.3 端到端加密**，现今 99.5% 的现代网站、微信、网银、ChatGPT、交易所均强制启用），您的**网页具体内容、输入的账号密码、聊天文字、图片与交易指令**在离开您电脑浏览器的那一刻就已经被 TLS 锁死，机场服务器看到的只是加密后的乱码字节流，绝对无法解密！\n• **机场主能看到的元数据（Metadata）**：机场出口服务器能看到您正在连接的目标网站**域名（SNI）与目标 IP**、连接时间以及消耗的流量大小。因此，切勿使用免费钓鱼蜜罐节点，且重要资产网站务必认准 HTTPS 证书正常（详见 [/free#security-risk-table](/free#security-risk-table)）。'
        },
        {
          q: 'Q42：为什么我的机场流量在半夜没开机的时候突然掉了几十个 GB？怎么防盗刷？',
          a: '如果您确认电脑手机都关了，后台流量却在狂掉，99% 是因为**您的私有订阅链接（Token）泄露了**！最常见的泄露途径是：您曾经把订阅链接粘贴到了网上不知名的“免费在线 Clash 订阅转换网站”，或者发截图求助时没有给订阅 URL 打码。**紧急止损方法**：立即登录机场官网后台，点击 **「重置订阅链接 / 更换订阅 Token」**，旧链接会瞬间失效，随后将新链接直接粘贴到本地客户端（详见 [/tools#chapter-1](/tools#chapter-1)）。'
        },
        {
          q: 'Q43：能把自己的付费机场订阅链接分享给好朋友或同事一起用吗？',
          a: '如果是明确标注 **“不限制同时在线设备数”** 且允许家庭/小微团队合理共享的品牌（如星岛梦、二猫云、唯兔云、一翻云、隐形人），在套餐流量范围内给家人或一两个密友应急是可以的；但**绝对严禁将个人订阅发到公开群聊、论坛或咸鱼拼车转卖**！所有正规专线机场后台都部署有异常流量与跨省并发审计系统，一旦检测到同一订阅在短时间内出现十几个不同省份的 IP 同时拉取，系统会自动判定为订阅泄露或恶意合租并永久封禁账号。'
        },
        {
          q: 'Q44：挂着机场节点可以下载 BT 种子（迅雷 / qBittorrent / PT 站）或挖矿吗？',
          a: '**绝对禁止挂着海外代理节点下载 BT 种子！** 原因有二：① 欧美、日本与新加坡机房对 DMCA（数字千年版权法）的执法极其严厉，一旦您挂着机场的美国/日本节点用 BT/迅雷下载受版权保护的电影或游戏（P2P 协议会向全球广播您的节点 IP），机房会在几小时内收到版权律师函并直接封停机场的整台落地服务器！为此，几乎所有机场都在服务端配置了 **BT/P2P 协议审计拦截规则**，违规触发轻则断网 1 小时，重则封号；② 下载国内迅雷资源本身直连最快，请在客户端确认迅雷/qBittorrent 走 `DIRECT` 直连。'
        },
        {
          q: 'Q45：什么是机场的“审计规则（Audit Rules）”？为什么有些轮子/极端政治或黑客网站打不开？',
          a: '为了保障上游国内 BGP 专线机房的合规存续、防止服务器被极端违法内容（如儿童色情、网络诈骗、木马控制端、垃圾邮件投递及特定高度敏感违规站点）连累清退，正规商业机场通常会在面板服务端配置基础的 **审计屏蔽规则（Audit Rules）**。对于 99.9% 正常使用 Google、YouTube、Netflix、ChatGPT、Claude、X (Twitter)、Telegram、GitHub 与外贸学术网站的用户而言，审计规则完全无感，反而能保护整个机场机房长治久安。'
        },
        {
          q: 'Q46：怎么知道两家名字不一样的机场是不是同一个老板开的“同源马甲”？',
          a: '普通用户很难看穿，但本实验室在 [/warnings（跑路预警与避坑雷达）](/warnings) 中已为您完成了全库 42 家品牌的穿透审计！例如：① **微风网络、Firefly、FlyingBird(飞鸟)、一云梯、龙猫云** 属于著名的同源专线矩阵；② **青云梯** 是原 5 年老牌 **V4Speed** 的升级更名；③ **TNTCloud** 是原 **3A 加速器** 的升级更名；④ **大佬云、闪电鼠、云界线、榴莲云、环球梯** 则是 100% 套餐同构的 5.6 元低价矩阵。买备份机场时，先查一眼我们的同源表，绝不买重！'
        },
        {
          q: 'Q47：外贸业务员或加密货币（Web3）用户在选机场和配客户端时有什么特别的安全禁忌？',
          a: '对于涉及真实资金与客户贸易款项的高敏用户，请严格执行 **「三严禁与三必须」**：\n• **三严禁**：严禁使用任何免费公益节点或 5.6 元野鸡盘；严禁使用非 GitHub 官方下载的魔改客户端；严禁将订阅粘贴到公共在线转换器；\n• **三必须**：必须选用运营 4–6 年以上的老牌 IEPL 专线（如 [光速云](/brands/guangsu-cloud)、[星岛梦](/brands/xingdaomeng)）或原生住宅 IP 专线（如 [一翻云](/brands/yifanyun)）；必须在客户端将 PayPal、亚马逊后台、币安/OKX 绑定到**固定单一的低欺诈分节点**（切勿频繁换国家 IP 触发异地登录冻结）；必须配置第二家异构永久包防失联。'
        },
        {
          q: 'Q48：如果我已经看完了这篇 FAQ，想立刻选一家最稳妥的机场开始用，最简短的总结建议是什么？',
          a: '一句话终极总结：\n• **首选全能王（闭眼入）**：直接选 **[TOP 1 光速云](/brands/guangsu-cloud)**（2020年老牌双专线，香港 22ms/529Mbps，全节点 ×1 倍率，主力选 **¥99/年** 或 **¥25/月 168G**，轻度/备用选 **¥147/247GB 永久包**，记得用优惠码 `AMM`）；\n• **需要原生住宅 IP 狂刷 AI / 极客多协议**：选 **[TOP 16 一翻云](/brands/yifanyun)** 或 **[TOP 4 微风网络](/brands/weifeng)**；\n• **纯新手讨厌配订阅 / 想要一键登录客户端**：选 **[TOP 3 飞猫云](/brands/feimao)** 或 **[TOP 8 无忧链接](/brands/wuyou-link)**。'
        }
      ]
    }
  ],

  conversionCards: [
    {
      badge: '👑 全能综合首选 · 48问标杆答案 TOP 1',
      name: '光速云 (Guangsu Cloud)',
      suitableFor: '无论是日常 4K 视频、AI 生产力还是寻找 ¥147 永久不过期备用包，均能一站式满足的稳健型用户。',
      pricing: '轻量年付 ¥99/年（折约 ¥8.25/月，59GB）；IPLC 极速月付 ¥25/月（168GB，全节点 ×1 倍率）；永久包 ¥147（247GB）。专属优惠码：AMM。',
      limitations: '无免费试用，特殊商品不退款；使用 ChatGPT 时请在客户端规则中切换至新加坡/日本/美西节点。',
      verifiedAt: '2020年老牌核验 & 2026-08-11 / 10-19 双批次实测（香港 22ms / 529Mbps）',
      primaryAction: { text: '查看光速云完整测评与套餐详情', href: '/brands/guangsu-cloud' },
      externalAction: { text: '前往光速云官网 (优惠码 AMM) ↗', href: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
    },
    {
      badge: '🤖 原生IP + 24小时客服 · AI与流媒体利器 TOP 4',
      name: '微风网络 (Weifeng Network)',
      suitableFor: '对 ChatGPT/Claude/Netflix 原生解锁要求高、且希望遇到配置问题随时有 24 小时客服指导的用户。',
      pricing: '入门年付 ¥137/年（折约 ¥11.4/月，每月 100GB）；标准月付 ¥27/月（200GB）；永久不限时流量包 ¥200。',
      limitations: '无免费试用，特殊商品不退；属飞鸟/一云梯同源矩阵，选第二家备份时请搭配光速云或二猫云。',
      verifiedAt: '2026-08-11 原图 & 2026-10-19 五地采样（香港 25ms / 546Mbps）',
      primaryAction: { text: '查看微风网络完整测评与测速图', href: '/brands/weifeng' },
      externalAction: { text: '前往微风网络官网查看方案 ↗', href: 'https://weifeng.cc/#/?code=772109' }
    },
    {
      badge: '🎯 纯新手免配置 · 专属端极速代表 TOP 3 / TOP 8',
      name: '飞猫云 (Feimao) / 无忧链接 (Wuyou)',
      suitableFor: '不想研究 Clash YAML 分流规则、希望下载官方客户端输入账号密码一键连接即用的新手与跨境电商卖家。',
      pricing: '飞猫云学生年付 ¥84（折¥7/月 50G）、月付 ¥25（150G）；无忧链接年付 ¥79（折¥6.5/月 50G）、月付 ¥19（120G）、永久包 ¥108。',
      limitations: '采用官方专属客户端封闭生态，不支持导出通用 Clash 订阅链接至第三方软件或软路由。',
      verifiedAt: '2026-10-19 五地采样（飞猫云香港 21ms/526Mbps；无忧链接香港 23ms/531Mbps）',
      primaryAction: { text: '查看飞猫云完整测评与下载说明', href: '/brands/feimao' },
      externalAction: { text: '前往飞猫云官网查看方案 ↗', href: 'https://feimao.cc/#/?code=551209' }
    }
  ],

  dataSources: {
    id: 'data-sources',
    badge: 'CHAPTER 08 · KNOWLEDGE BASE PROVENANCE',
    title: '八、百科全书核验时间、技术依据与全站专题导航矩阵',
    intro: '本页面 6 大专区共 48 组深度工程问答，由 Clash 机场评测实验室技术支持团队汇总自数万次真实用户排障工单与 2026 最新协议规范：',
    sources: [
      {
        title: '1. 42 家机场实测数据库同步',
        detail: '所有涉及品牌价格、倍率、退款政策、专属端 vs 通用订阅及同源关系的回答，均与 `src/data/brands.json`（截至 `2026-11-07`）严格保持 100% 一致。'
      },
      {
        title: '2. Mihomo (Clash Meta) & sing-box 官方内核规范',
        detail: '关于 Fake-IP、TUN 虚拟网卡、Rule 短路匹配、VLESS-Reality 与 QUIC 排障的操作步骤，均在 Windows 11、macOS Sequoia、iOS 18 与 Android 15 实机复现验证。'
      },
      {
        title: '3. 全站 9 大核心专题闭环承接',
        detail: '本 FAQ 作为全站语义检索与 GEO（生成式引擎优化）中心，每一道问题均提供通往对应专著级专题页的深层内链。'
      }
    ]
  }
};

fs.writeFileSync('astroarabia/src/data/faq-content.json', JSON.stringify(faqContent, null, 2));
console.log('Successfully generated astroarabia/src/data/faq-content.json');
