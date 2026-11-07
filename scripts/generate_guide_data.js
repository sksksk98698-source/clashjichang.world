import fs from 'fs';

const guideData = {
  meta: {
    title: 'IEPL/IPLC专线网络拓扑、代理协议对比与流媒体AI解锁深度指南 (2026实测版) - clashjichang.world',
    h1: 'IEPL/IPLC 专线网络拓扑、代理协议对比与流媒体 AI 解锁全解指南',
    description: '2026 专著级跨境网络技术与选购指南：深度剖析 IEPL/IPLC 专线与 BGP 中转底层拓扑、VLESS/Shadowsocks/Trojan/Hysteria2 协议开销与抗封锁边界、ChatGPT/Claude/Netflix 4K 解锁原理及 Clash 客户端 TUN/DNS 排障实操，结合 42 家机场实测数据辅助科学决策。',
    updatedAt: '2026-11-07',
    verifiedAt: '2026-10-19（品牌库核验） / 2026-08-11（MAI-TEST-BOT 测速批次）',
    author: 'Clash机场评测实验室（网络工程与协议测试组）',
    readingTime: '约 30 分钟深度阅读'
  },

  directAnswer: {
    summary: '针对用户在选购机场节点、配置代理客户端与排查流媒体或 AI 工具连接故障时最核心的三大疑问，基于本站 42 家机场参数数据库、2026-08-11 批次 16 份真实节点测速截图以及 2026-10-19 延迟吞吐采样，直接给出以下工程级结论：',
    points: [
      {
        label: '1. 线路架构结论（决定晚高峰稳不稳、掉不掉线）',
        content: '跨境网络访问的稳定性有 80% 取决于底层物理传输链路，而非表层的客户端软件。普通公网直连（Direct）与低成本公网中转（Public Relay）的数据包必须穿越国际公网主干出口及 GFW 流量审查节点，在每日 20:00 至 23:00 的家庭宽带晚高峰以及特殊网络敏感期，极易出现骨干网拥塞丢包、TCP 重传率飙升甚至端口阻断。相反，IEPL（国际以太网专线）与 IPLC（国际私有租用线路）依托电信运营商的二层以太网或物理点对点内网专线直接跨境（常见为深港、沪日、沪新、京德等物理链路），数据包在境内 BGP 入口机房完成接入后即进入封闭内网通道，完全绕开公网审查点与国际出口拥堵区。在本站实测中，采用 IEPL/IPLC 架构的头部机场（如光速云、飞猫云、微风网络、星岛梦、二猫云、Firefly、闪跃等）在香港节点的握手延迟普遍稳定在 21ms 至 27ms 之间，新加坡节点稳定在 42ms 至 46ms 之间，单节点下行带宽可达 380Mbps 至 548Mbps。若您的核心诉求是远程办公不掉线、语音视频会议低抖动以及 4K 高码率视频秒开，应将 IEPL 或 IPLC 专线作为选购的第一硬性指标。'
      },
      {
        label: '2. 代理协议结论（决定握手延迟、设备耗电与抗封锁边界）',
        content: '代理协议的优劣不能脱离底层线路单独评判。当机场底层已经采用 IEPL 或 IPLC 内网专线时，跨境传输段处于安全的私有通道内，不存在公网 GFW 的主动特征探测与深度包检测（DPI），此时协议的核心任务是降低加解密开销、缩短握手时间并提升吞吐效率，因此无冗余二次加密的 VLESS 协议与经典的 Shadowsocks（采用 AEAD 2022 现代加密套件）表现最为优异，不仅首字响应时间（TTFB）最快，而且对软路由 CPU 和手机电池的消耗最低。这也是为什么在本站 2026-08-11 的 16 家机场实测截图中，绝大多数专线节点在客户端内呈现为 Shadowsocks 或 VLESS 的原因。反之，如果底层线路为公网直连或普通公网中转，抗封锁与隐蔽伪装就成为首要任务，此时必须优先选择能够模拟真实大厂网站 TLS 握手的 VLESS-Reality、将代理流量完全伪装为标准 HTTPS 网页流量的 Trojan，或者利用 QUIC/UDP 暴力发包对抗高丢包弱网的 Hysteria 2 协议。'
      },
      {
        label: '3. 流媒体与 AI 解锁结论（决定能否正常使用 ChatGPT、Claude 与 Netflix）',
        content: '节点的下载测速高低与能否打开 ChatGPT、Claude、Gemini 或观看 Netflix 非自制剧之间没有任何必然联系。一条测速高达 550Mbps 的商业数据中心节点，如果其落地 IP 属于被 OpenAI 或 Netflix 标记的高风险机房段（Data Center ASN），依然会直接弹出 Access Denied、Error 1020 或仅显示自制剧。决定流媒体与 AI 解锁成败的三个核心条件是：第一，落地 IP 的纯净度与注册属性（当地本土 ISP 原生住宅或商业宽带 IP 远优于跨国 BGP 广播 IP）；第二，机场服务端是否针对高风控域名部署了动态 DNS 媒体解锁与分流宿主机（SNI Proxy 内网二次转发）；第三，用户本地客户端是否正确启用了 Mihomo（Clash Meta）或 sing-box 内核的 Fake-IP 模式与远程 DNS 解析，并针对移动端 App 开启了 TUN 虚拟网卡模式以拦截绕过系统代理的 UDP/QUIC 探测包。'
      }
    ],
    quickNav: [
      { text: '四大跨境线路架构全维对比表', href: '#topology-architecture' },
      { text: '4 步实操鉴别真假 IEPL 专线', href: '#verify-dedicated-line' },
      { text: '六大主流代理协议技术选型表', href: '#protocol-comparison' },
      { text: 'ChatGPT 与 4K 流媒体排障 6 步法', href: '#unlock-mechanism' },
      { text: '22 家主力机场架构与实测对照表', href: '#brand-architecture-matrix' },
      { text: '按预算与场景的选购决策路径', href: '#decision-path' }
    ]
  },

  toc: [
    { id: 'direct-answer', title: '核心结论与速查摘要' },
    { id: 'topology-architecture', title: '一、跨境线路架构对比与底层拓扑解析' },
    { id: 'verify-dedicated-line', title: '二、实操验证：4 步鉴别真假 IEPL/IPLC 专线' },
    { id: 'protocol-comparison', title: '三、主流代理协议原理、开销与抗封锁对比' },
    { id: 'unlock-mechanism', title: '四、流媒体 4K 与 AI 工具解锁底层机制及排障' },
    { id: 'client-and-dns', title: '五、客户端内核、TUN 模式与 DNS 防泄漏配置' },
    { id: 'brand-architecture-matrix', title: '六、本站主力机场品牌线路与协议实证对照表' },
    { id: 'decision-path', title: '七、场景化选购与技术配置决策路径' },
    { id: 'recommended-solutions', title: '八、经过核实的代表性方案与工具入口' },
    { id: 'faq', title: '九、常见边界问题与排障深度解答 (FAQ)' },
    { id: 'data-sources', title: '十、数据来源、测试方法与待核实缺口说明' }
  ],

  architectureComparisonTable: {
    caption: '表 1：跨境网络代理四大主流线路架构工程参数、成本与实测表现对比表（核实时间：2026-10-19）',
    headers: [
      '架构类型',
      '数据跨境传输路径',
      '是否经公网 GFW',
      '晚高峰 (20:00-23:00) 表现',
      '亚洲近端典型延迟 (港/新/日)',
      '特殊时期存活率',
      '合理月付成本门槛',
      '适用人群与业务场景',
      '本站核实代表品牌'
    ],
    rows: [
      {
        type: 'IEPL 国际以太网专线（含双链路冗余）',
        path: '用户设备 → 国内多线 BGP 入口 → 运营商二层以太网专线（深港/沪日等） → 境外落地机房 → 目标网站',
        passGfw: '否（纯内网物理/二层隔离过境）',
        peakPerf: '极稳，丢包率趋近 0%，单节点常见 350Mbps–540Mbps+',
        latency: '香港 21–27ms / 新加坡 42–46ms / 日本 53–57ms',
        survival: '极高（99%+，不受公网端口封锁波及）',
        cost: '年付折算 ¥5.6–¥10/月；常规月付 ¥18–¥35/月',
        scenario: '高频 AI 办公、外贸跨境直播、远程代码开发、4K/8K 超高清流媒体、低延迟外服游戏辅助',
        brands: '光速云、微风网络、星岛梦、二猫云、一翻云、SOGO云、极连云、光年梯、梯子云'
      },
      {
        type: 'IPLC 国际私有租用专线',
        path: '用户设备 → 国内专线入口 → 点对点物理租用光纤（SDH/MSTP） → 境外对端机房 → 目标网站',
        passGfw: '否（点对点物理专线直通）',
        peakPerf: '极稳，延迟恒定如局域网，晚高峰无明显速率衰减',
        latency: '香港 23–27ms / 新加坡 42–45ms / 日本 53–57ms',
        survival: '极高（点对点物理隔离，抗封锁能力顶级）',
        cost: '年付折算 ¥8–¥12/月；常规月付 ¥15–¥45/月',
        scenario: '团队跨国协作、金融行情终端、长时间在线 AI 对话、深夜高清追剧、多设备家庭共享',
        brands: '唯兔云、Firefly、U1S1、闪跃、全球云、隐形人、青云梯、FlyingBird、TNTCloud'
      },
      {
        type: '国内 BGP 高速公网隧道中转',
        path: '用户设备 → 国内 BGP 中转机房（流量二次加密封装） → 国际公网优化路由（CN2 GIA/9929/CMIN2） → 境外落地',
        passGfw: '是（经公网出口，但有隧道加密与优质路由调度）',
        peakPerf: '良好，依托国内多线 BGP 入口解决跨网拥塞，高峰期偶有 1%–5% 轻微波动',
        latency: '香港 26–45ms / 新加坡 45–75ms / 日本 55–90ms',
        survival: '高（入口在国内不易被封，出口若受阻可由服务端热切换）',
        cost: '年付折算 ¥6–¥9/月；常规月付 ¥15–¥25/月',
        scenario: '日常网页资料检索、社交媒体浏览、1080P/4K 视频播放、多平台设备日常主力或高性价比备用',
        brands: '暮光加速、灵猫网络、无忧链接'
      },
      {
        type: '普通公网跨境直连（Direct / 无国内中转）',
        path: '用户设备 → 本地家庭宽带国际出口 → 公网海底光缆及 GFW 审查点 → 境外机房服务器',
        passGfw: '是（全程暴露于公网国际出口与 DPI 审查）',
        peakPerf: '差，晚高峰受制于民用国际出口拥堵，下载常跌至数 Mbps，易断流',
        latency: '香港 60–180ms / 日本 100–250ms / 美国 180–400ms+',
        survival: '低至中（IP 与端口极易被特征识别阻断，需频繁更换节点或强伪装协议）',
        cost: '极低（自建 VPS 或廉价直连包年，通常低于 ¥5/月）',
        scenario: '仅供有技术能力的极客自建备用、非实时性文本抓取，不建议作为主力办公工具',
        brands: '本站前 28 家主力推荐中已全面淘汰纯直连方案，仅部分历史收录节点存在直连分流'
      }
    ]
  },

  protocolComparisonTable: {
    caption: '表 2：2026 主流代理协议技术特征、加解密开销、抗封锁能力与客户端兼容性全解表',
    headers: [
      '协议名称',
      '传输层与伪装机制',
      '加密开销与握手延迟',
      '公网抗封锁能力',
      '专线内网契合度',
      '移动端耗电与软路由负载',
      '主流客户端兼容性',
      '核心优缺点与适用场景结论',
      '本站支持该协议的代表品牌'
    ],
    rows: [
      {
        name: 'VLESS (含 Reality / WS-TLS)',
        layer: 'TCP / XTLS / gRPC / WebSocket；Reality 模式可借用真实权威网站证书消除服务端 TLS 指纹',
        overhead: '极低（去除 VMess 冗余二次加密，0-RTT/1-RTT 快速握手）',
        antiBlock: '极强（公网环境下 Reality 几乎无法被主动探测识别）',
        dedicatedFit: '极佳（专线内无额外加密负担，高并发吞吐上限极高）',
        battery: '极低（CPU 占用小，手机与轻量软路由长时间挂载不发热）',
        compat: 'Clash Verge Rev (Mihomo)、v2rayN、Shadowrocket、Stash、FlClash、Hiddify、sing-box 全支持（旧版原版 Clash Premium 不支持）',
        conclusion: '2026 年综合表现第一的全能协议。兼顾专线内的极致吞吐与公网中转的顶级抗封锁，但要求客户端必须升级至 Mihomo (Clash Meta) 或 Xray/sing-box 内核。',
        brands: '光速云、暮光加速、微风网络、大佬云、二猫云、Firefly、宇宙云、一翻云、SOGO云、可信云、速界、梯子云、灵动云'
      },
      {
        name: 'Shadowsocks (SS / AEAD 2022)',
        layer: 'TCP + UDP 转发；采用 AES-128/256-GCM、ChaCha20-Poly1305 或 2022-blake3 系列现代加密',
        overhead: '最低（协议头极度精简，无 TLS 多轮握手延迟）',
        antiBlock: '弱至中（无 TLS 外壳伪装，若在公网直连易被长度与熵值特征识别；但在专线内无此风险）',
        dedicatedFit: '完美（IEPL/IPLC 专线内网的黄金搭档，吞吐效率与响应速度冠绝全场）',
        battery: '最低（算法硬件加速成熟，老旧设备与全平台极其省电）',
        compat: '100% 全平台通吃（所有新老客户端、软路由 OpenWrt 插件、游戏加速器均原生支持）',
        conclusion: '专线机场内网传输的常青树。在 2026-08-11 的 16 家实测中占比最高，配合国内 BGP 入口转发既保证了全客户端零门槛兼容，又发挥了专线最低延迟优势。',
        brands: '光速云、暮光加速、飞猫云、一翻云、全球云、白月光、FlyingBird、龙猫云、青云梯、sslar（及 14 家实测截图显示节点）'
      },
      {
        name: 'Trojan (Trojan-GFW / Trojan-Go)',
        layer: 'TCP + 标准 TLS 1.3；将代理握手完全伪装为标准 HTTPS 网站访问，非法请求直接回落至真实 Nginx 网页',
        overhead: '中等（需完成标准 TLS 握手，首包延迟略高于 SS，后续传输高效）',
        antiBlock: '强（流量特征与正常浏览海外 HTTPS 网站完全一致，极难被被动嗅探封杀）',
        dedicatedFit: '良好（常用于中转机场与部分成熟专线机场，兼顾安全性与穿透力）',
        battery: '低至中（标准 TLS 加解密，现代芯片均有指令集硬件加速）',
        compat: '极高（Clash 全系列、Shadowrocket、Quantumult X、Surge、v2rayN、v2rayNG 均原生支持）',
        conclusion: '稳健成熟的伪装型协议。对各类客户端（尤其是圈 X、Surge 及旧版软路由）兼容性好于 VLESS，适合追求稳妥兼容与 HTTPS 伪装的用户。',
        brands: '星岛梦、唯兔云、全球云、WgetCloud、CyberGuard'
      },
      {
        name: 'Hysteria 2 (歇斯底里 v2)',
        layer: '基于 UDP 的修改版 QUIC 协议（HTTP/3 伪装）；内置 Brutal 恒定速率拥塞控制算法',
        overhead: '握手极快（QUIC 0-RTT/1-RTT），但在高吞吐下 UDP 数据包处理开销较高',
        antiBlock: '强（伪装成标准 HTTP/3 流量，具备端口跳跃 Port Hopping 能力）',
        dedicatedFit: '特定场景（专线本身不丢包，无需 Brutal 暴力发包；更适合公网弱网或跨国远距离补救）',
        battery: '较高（高频 UDP 发包与拥塞控制会导致手机明显发热、软路由 CPU 占用升高）',
        compat: '中等（需 Clash Verge Rev、FlClash、Hiddify、sing-box 或新版 Shadowrocket 支持）',
        conclusion: '恶劣弱网与高丢包跨国线路的救星。在晚高峰公网丢包严重时能强行拉满带宽，但容易触发国内运营商针对 UDP 的 QoS 限速或短暂断流，不建议作为专线日常唯一协议。',
        brands: '一翻云（提供 Hysteria 2 / VLESS / SS 三协议可选）'
      },
      {
        name: 'VMess (V2Ray 经典协议)',
        layer: 'TCP / WebSocket + TLS；早期 V2Ray 核心协议，现已全面升级为 AEAD 认证头',
        overhead: '较高（协议头较重，默认带有对称加密与时间戳校验开销）',
        antiBlock: '中等（配合 WS+TLS+CDN 可救活被封 IP，但纯 TCP 模式已不再推荐）',
        dedicatedFit: '一般（在专线环境下属于性能冗余，正逐步被 VLESS 和 SS 替代）',
        battery: '中等偏高（加解密层级较多，低端设备跑满千兆较吃力）',
        compat: '极高（几乎所有支持 V2Ray 与 Clash 的客户端均支持）',
        conclusion: '历史功勋协议，2026 年处于存量维护阶段。除非老旧设备无法升级客户端内核，否则新购机场优先选择 VLESS、Trojan 或专线 SS。',
        brands: '部分传统多协议机场保留兼容支持'
      },
      {
        name: '机场自研私有封装协议（专属客户端模式）',
        layer: '在 VLESS / Trojan / SS 底层之上封装私有鉴权、动态域名下发与加密隧道配置',
        overhead: '视底层而定（通常底层仍为 VLESS 或 IPLC+SS，连接速度极快）',
        antiBlock: '极强（隐藏了公开的订阅 URL 与节点明文 IP，杜绝爬虫批量抓取举报）',
        dedicatedFit: '极高（常见于主打新手免配置与防同行恶意攻击的专线/中转机场）',
        battery: '低（客户端内置精简核心，一键开关）',
        compat: '仅限官方客户端（支持 Windows/macOS/iOS/Android，不支持导入 Clash 或软路由）',
        conclusion: '省心与封闭并存的商业模式。彻底解决了新手不会配订阅、不会调 DNS 的痛点，但牺牲了自定义分流规则与路由器全局透明代理的自由度。',
        brands: '飞猫云、无忧链接、Firefly、灵猫网络、SOGO云、闪跃、全球云、隐形人'
      }
    ]
  },

  unlockMatrixTable: {
    caption: '表 3：海外流媒体 4K 与主流 AI 大模型风控检测维度、IP 属性要求及客户端排障对照表',
    headers: [
      '目标服务平台',
      '风控严格度',
      '平台核心检测机制',
      '节点 IP 属性与地区要求',
      '典型报错提示或异常现象',
      '客户端分流与排障操作方案'
    ],
    rows: [
      {
        service: 'ChatGPT (OpenAI 网页版 & 移动端 App)',
        level: '★★★★☆ (高)',
        mechanism: 'Cloudflare 威胁情报库 + ASN 机房段黑名单 + 账号高频切换地区风控 + 移动端 Play Integrity / Apple Attest 校验',
        ipReq: '需洁净原生 IP、家庭住宅宽带 IP 或机场部署的 OpenAI 专用 DNS 解锁出口；注意香港本土 IP 默认不在 OpenAI 官方支持列表内（除非机场做了异地 DNS 分流）',
        error: 'Access Denied / Error 1020 / Unable to load site / Something went wrong / App 提示 Request is not allowed',
        solution: '1. 在 Clash 策略组中将 AI 分流固定指向日本、新加坡、美国或台湾节点（避开未做分流的普通香港节点）；2. 开启 Fake-IP 与远程 DNS；3. 手机 App 必须开启 TUN 模式或全局路由以接管 QUIC 流量。'
      },
      {
        service: 'Claude 3.5 / 4 (Anthropic)',
        level: '★★★★★ (极高)',
        mechanism: '极度严格的机房 ASN 封锁 + IP 欺诈分（Scamalytics > 30 即高危） + 浏览器环境指纹与注册手机号归属地交叉验证',
        ipReq: '高纯净度美国、英国、日本或新加坡原生住宅/商宽 IP；对普通数据中心广播 IP 容忍度极低',
        error: 'App unavailable in your region / 登录后秒封账号（Account disabled） / 无法接收验证码',
        solution: '1. 严禁频繁跨国切换节点登录同一 Claude 账号（建议固定单一美西或日本原生节点）；2. 选择明确标注支持 Claude 的专线品牌（如光速云、暮光加速、微风网络、速界等）；3. 浏览器开启防 WebRTC 泄漏。'
      },
      {
        service: 'Google Gemini / Google AI Studio',
        level: '★★★★☆ (高)',
        mechanism: 'Google 内部 IP 地理定位库（Google GeoIP）+ 账号所属地区关联 + 搜索安全验证（reCAPTCHA）',
        ipReq: '要求 IP 在 Google 数据库中归属为美国、日本、新加坡、台湾等支持地区，且不能是“送中 IP”（即被 Google 误判为中国大陆的广播 IP）',
        error: 'Gemini 目前不支持你所在的国家/地区 / 无限弹出人机验证图片 / 自动跳转至 google.com.hk',
        solution: '1. 访问 google.com/ncr 强制禁止国家重定向；2. 检查节点是否“送中”（若搜索页面底部显示中国或香港，立即切换至美国或日本原生节点）；3. 在分流规则中将 googleapis.com 与 gemini.google.com 统一归入同一 AI 节点组。'
      },
      {
        service: 'Netflix (奈飞 4K / 非自制剧全解锁)',
        level: '★★★★☆ (高)',
        mechanism: 'Fast.com / Netflix ASN 数据库排查机房代理 IP + IPv6 隧道封锁 + SNI 域名与出口 IP 一致性校验',
        ipReq: '本土原生 ISP 住宅 IP，或机场在落地侧配置成熟的 DNS Media Unlock（内网 SNI Proxy 转发解锁）',
        error: '只能搜到 Netflix 原创自制剧（如《怪奇物语》），搜不到《绝命毒师》《老友记》等第三方版权剧；或提示 You seem to be using an unblocker or proxy (Error M7111)',
        solution: '1. 选用带“NF 全解锁”或“原生”标识的香港、台湾、新加坡、日本节点；2. 在客户端设置中禁用 IPv6（防止本地 IPv6 直连或机房 IPv6 暴露导致降级为仅自制剧）。'
      },
      {
        service: 'Disney+ / HBO Max',
        level: '★★★★☆ (高)',
        mechanism: '严格校验区号版权库 + IP 注册局归属地与 BGP 广播地一致性 + TLS 握手延迟异常检测',
        ipReq: '香港、台湾、新加坡、日本或美国干净原生 IP（对跨国广播 IP 拦截率极高）',
        error: 'Sorry, Disney+ is not available in your region (Error Code 73 / 83) / 画面黑屏无限转圈',
        solution: '切换至标注支持 Disney+ 的港区、台区或美区专线节点；若遇到灵动云等部分台湾节点被识别为欧洲（如西班牙 ES）的情况，属广播 IP 库偏差，切回香港或新加坡即可正常观看中文字幕。'
      },
      {
        service: 'YouTube 4K / 8K 60fps & Premium',
        level: '★★☆☆☆ (低至中)',
        mechanism: '对 IP 纯净度要求宽松，核心考验节点持续大带宽吞吐能力、TCP 窗口缩放与 QUIC (UDP 443) 传输质量',
        ipReq: '单节点实际可用带宽需稳定大于 35Mbps（4K）至 80Mbps（8K），且晚高峰无剧烈丢包；无“送中”即可开启后台播放与无广告会员',
        error: '画质自动掉到 480P/720P / 手动拉 4K 后缓冲卡顿（Stats for nerds 显示 Connection Speed 低或 Dropped Frames 激增）',
        solution: '1. 优先选择香港、日本、新加坡等近端 IEPL/IPLC 专线（如光速云实测香港 529Mbps、微风 546Mbps）；2. 若运营商对 UDP 限速导致卡顿，在浏览器或客户端中禁用 QUIC（拦截 UDP 443），强制回退至 TCP 专线传输。'
      },
      {
        service: 'TikTok (海外版刷视频 / 跨境电商直播)',
        level: '★★★★★ (极高)',
        mechanism: '手机物理 SIM 卡运营商代码（MCC/MNC，如 460 代表中国大陆）+ 手机系统语言/时区/GPS + 节点 IP 纯净度与独享度',
        ipReq: '普通刷视频需台/日/美/新解锁节点（避开已停服的香港节点）；跨境直播与矩阵养号必须使用独享静态原生住宅 IP 与专线定制通道',
        error: '黑屏无网络连接（No network connection） / 0 播放量限流 / 直播间秒封断流',
        solution: '1. 绝对不能选香港节点（TikTok 已退出香港市场）；2. 手机端拔卡或使用免拔卡重写脚本/海外 eSIM，配合 TUN 全局模式连接台湾、日本、新加坡或美国节点；3. 商业直播需选购光速云定制版（¥680/月独享原生IP）或无忧链接/TNTCloud 等电商专项方案。'
      }
    ]
  },

  brandMatrixTable: {
    caption: '表 4：本站收录 22 家代表性机场品牌底层线路、协议、客户端限制与实测表现核验总表（按综合梯度排序）',
    headers: [
      '排名与品牌',
      '底层线路架构',
      '支持协议',
      '客户端兼容模式',
      '月付实价与年付折算',
      '代表节点实测 (延迟/下载)',
      '流媒体与 AI 解锁实况',
      '核心优势与主要限制说明'
    ],
    rows: [
      {
        brand: 'TOP 1 光速云',
        slug: 'guangsu-cloud',
        line: 'IEPL 专线 + 企业级内网双专线',
        proto: 'VLESS / Shadowsocks',
        clientMode: '自研客户端 + 第三方通用订阅 (Clash/小火箭)',
        price: '年付 ¥99 (折 ¥8.2/月 69G)；月付 ¥25 (168G)；永久包 ¥147 (247G)',
        speed: '香港 22ms / 529Mbps；新加坡 46ms / 387Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'Netflix/Disney+/YouTube 4K 支持；ChatGPT/Gemini 视节点切换',
        note: '2020 年老牌，罕见提供 147 元永久不过期套餐与 680 元独享 IP 定制；限制：AI 需手动切可用节点，特殊商品不退。'
      },
      {
        brand: 'TOP 2 暮光加速',
        slug: 'muguang',
        line: 'BGP 智能调度 + 专线级出口',
        proto: 'VLESS / Shadowsocks',
        clientMode: '支持全平台通用订阅导入 (Win/Mac/iOS/Android/Linux)',
        price: '年付 ¥109 (折 ¥9.1/月 70G)；月付 ¥20 (120G)；不限时 ¥219 (150G)',
        speed: '香港 26ms / 509Mbps；新加坡 43ms / 419Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/HBO Max 支持；Gemini 视节点',
        note: '多设备同时在线友好，120G–1500G 档位跨度全，宣称 7×24 真人客服；限制：公开优惠活动较少。'
      },
      {
        brand: 'TOP 3 飞猫云',
        slug: 'feimao',
        line: '高速专线架构',
        proto: 'Shadowsocks / 私有封装',
        clientMode: '仅限官方专属客户端（下载登录即用，不提供订阅链接）',
        price: '学生年付 ¥84 (折 ¥7/月 50G)；月付 ¥25 (150G)；不限时 ¥680 (1T)',
        speed: '香港 21ms / 526Mbps；新加坡 45ms / 413Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/YouTube 4K 支持',
        note: '新手极度省心，免除找客户端与导订阅烦恼；限制：不支持导入第三方 Clash 或软路由。'
      },
      {
        brand: 'TOP 4 微风网络',
        slug: 'weifeng',
        line: 'IEPL 专线 + 多地原生 IP',
        proto: 'VLESS / Shadowsocks',
        clientMode: '支持通用订阅导入 + 7×24 在线客服',
        price: '年付 ¥137 (100G/月)；月付 ¥27 (200G)；不限时 ¥200 (270G)',
        speed: '香港 25ms / 546Mbps；新加坡 43ms / 384Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+ 原生节点解锁良好',
        note: '入门级 IEPL 性价比标杆，香港实测峰值达 546Mbps；限制：入门档对重度大流量用户需留意额度。'
      },
      {
        brand: 'TOP 5 大佬云',
        slug: 'dalaoyun',
        line: 'IEPL 企业专线',
        proto: 'VLESS',
        clientMode: '自研客户端 + 第三方通用订阅导入',
        price: '年付折算约 ¥5.6/月 (60G/月)；季付及以上享 7 折',
        speed: '同架构基准级表现（待补充独立单日截图）',
        unlock: '常规流媒体与日常网页支持',
        note: '5.6 元档极限平价 IEPL+VLESS 标准方案；限制：与闪电鼠、云界线等同质化较高，建议实测后定夺。'
      },
      {
        brand: 'TOP 6 星岛梦',
        slug: 'xingdaomeng',
        line: 'IEPL 专线 (1倍流量不限设备)',
        proto: 'Trojan / Shadowsocks',
        clientMode: '支持全平台通用订阅导入',
        price: '年付 ¥96 (折 ¥8/月 60G)；月付 ¥25 (150G)；不限时 ¥100 (100G)',
        speed: '香港 27ms / 504Mbps；新加坡 44ms / 411Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/Disney+/TikTok 跨区支持',
        note: '2020 年运营老牌，延伸覆盖韩国与东南亚，1 倍流量不限设备适合家庭共享。'
      },
      {
        brand: 'TOP 7 二猫云',
        slug: 'ermaoyun',
        line: '全线 IEPL 专线',
        proto: 'VLESS / Shadowsocks',
        clientMode: '独家定制客户端 + 通用订阅支持',
        price: '年付 ¥89 (折 ¥7.4/月 60G)；月付 ¥20 (130G)；不限时 ¥99 (100G)',
        speed: '香港 22ms / 481Mbps；新加坡 46ms / 407Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Netflix/Disney+/YouTube 支持；Claude/Gemini 视节点',
        note: '主打长期稳定与不限设备连接数；限制：Claude 与 Gemini 需自行测试具体可用节点。'
      },
      {
        brand: 'TOP 8 无忧链接',
        slug: 'wuyou-link',
        line: '跨境电商优化直连/中转',
        proto: '私有封装协议',
        clientMode: '官方专属客户端（下载登录即用，免转换订阅）',
        price: '年付 ¥79 (折 ¥6.5/月 40G)；月付 ¥19 (100G)；不限时 ¥108 (100G)',
        speed: '香港 23ms / 531Mbps；新加坡 42ms / 418Mbps (2026-10-19 采样)',
        unlock: 'TikTok 跨区直连、ChatGPT、Netflix、Disney+ 支持',
        note: '6.5 元/月极低门槛，突出 TikTok 跨区与电商辅助；限制：40G 小包流量偏少，仅限专属端。'
      },
      {
        brand: 'TOP 9 唯兔云',
        slug: 'weitu-cloud',
        line: 'IPLC 专线 + 三网优化负载均衡',
        proto: 'Trojan / Shadowsocks',
        clientMode: '支持通用订阅导入，不限设备连接',
        price: '年付限量 ¥79.9 (45G/月)；节假日月付 ¥14.9 (100G)；常规月付 ¥19.9 (150G)',
        speed: '香港 27ms / 500Mbps；新加坡 44ms / 414Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Gemini 及主流流媒体全覆盖',
        note: '1 倍流量不限速不限设备，适合多端合用；限制：特价档位受节假日开放限制。'
      },
      {
        brand: 'TOP 10 Firefly',
        slug: 'firefly',
        line: 'IPLC 专线 + 原生 IP 节点',
        proto: 'VLESS (专属客户端封装)',
        clientMode: '仅限官方专属客户端（不提供通用订阅链接）',
        price: '年付 ¥96 (折 ¥8/月 60G)；月付 ¥25 (150G)；不限时 ¥100 (100G)',
        speed: '香港 27ms / 547Mbps；新加坡 42ms / 445Mbps (2026-10-19 采样)',
        unlock: '原生 IP 稳定支持 ChatGPT、Claude、Netflix、Disney+',
        note: 'IPLC 晚高峰表现亮眼，不限设备数量；限制：仅限官方客户端，年付版不适用 8 折券。'
      },
      {
        brand: 'TOP 12 U1S1',
        slug: 'u1s1',
        line: 'IPLC 专线 (宣称 2Gbps 带宽)',
        proto: 'Shadowsocks / 通用协议',
        clientMode: '支持通用客户端订阅导入',
        price: '年付 ¥96 (折 ¥8/月 60G)；月付 ¥20 (120G)',
        speed: '香港 24ms / 538Mbps；新加坡 46ms / 414Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/TikTok 实测表现良好',
        note: '2025 年上线新锐 IPLC，吞吐爆发力强；限制：运营周期尚短，建议从月付或小包开始验证。'
      },
      {
        brand: 'TOP 13 灵猫网络',
        slug: 'lingmao-network',
        line: '中转优化线路 (1倍流量)',
        proto: 'Shadowsocks (专属客户端封装)',
        clientMode: '仅限官方专属客户端（下载登录即用）',
        price: '年付 ¥85 (折 ¥7.1/月 45G)；月付 ¥25 (150G)',
        speed: '香港 22ms / 492Mbps；新加坡 46ms / 409Mbps (2026-08-11 & 10-19 实测)',
        unlock: 'ChatGPT/Claude/Netflix/YouTube/TikTok 支持',
        note: '不限设备数量，适合家庭多终端轻度使用；限制：不提供 Clash 订阅链接。'
      },
      {
        brand: 'TOP 14 极连云',
        slug: 'jilian-cloud',
        line: 'IEPL 企业专线',
        proto: 'Shadowsocks / VLESS',
        clientMode: '自研客户端 + 第三方客户端订阅导入',
        price: '月付 ¥18 (100G/月)，优惠码 ji8888',
        speed: '已完成 2026-08-11 批次 MAI-TEST-BOT 节点实测',
        unlock: '品牌资料明确覆盖常见 AI 工具与日常网页场景',
        note: '18 元档标准 IEPL 专线，兼顾自研端与第三方订阅。'
      },
      {
        brand: 'TOP 15 光年梯',
        slug: 'guangnianti',
        line: 'IEPL 企业专线',
        proto: 'VLESS / Shadowsocks',
        clientMode: '自研客户端 + 第三方客户端订阅导入',
        price: '月付 ¥18 (110G/月)，优惠码 gnt6666',
        speed: '已完成 2026-08-11 批次 MAI-TEST-BOT 节点实测',
        unlock: '支持常见 AI 工具与主流流媒体使用场景',
        note: '同为 18 元档 IEPL，流量比极连云多 10GB（110GB/月）；2025 新品牌需持续观察。'
      },
      {
        brand: 'TOP 16 一翻云',
        slug: 'yifanyun',
        line: '全节点 IEPL 物理专线 + 原生住宅 IP',
        proto: 'Hysteria 2 / VLESS-Reality / Shadowsocks',
        clientMode: '支持多协议通用客户端订阅导入，不限设备',
        price: '年付 ¥98 (折 ¥8.2/月 60G)；月付 ¥20 (150G)；不限时 ¥100 (100G)',
        speed: '香港 23ms / 477Mbps；新加坡 42ms / 390Mbps (2026-08-11 & 10-19 实测)',
        unlock: '原生住宅 IP 加持，ChatGPT/Claude/Netflix/Disney+ 表现优秀',
        note: '罕见同时提供 Hysteria 2、VLESS-Reality 与 SS 三协议的物理专线机场，技术可玩性极高。'
      },
      {
        brand: 'TOP 17 SOGO 云',
        slug: 'sogo-cloud',
        line: '全线 IEPL 专线 + 三网 BGP 优化',
        proto: 'VLESS / Shadowsocks',
        clientMode: '仅限自研客户端（支持 Win/Mac/iOS/Android/软路由，无订阅链接）',
        price: '年付 ¥98 (折 ¥8.2/月 60G)；月付 ¥25 (150G)；不限时 ¥120 (120G)',
        speed: '香港 26ms / 488Mbps；新加坡 43ms / 401Mbps (2026-08-11 & 10-19 实测)',
        unlock: '覆盖 15 个国家地区，支持 ChatGPT/Netflix/Disney+/TikTok',
        note: '收录品牌中国家地区覆盖最广（15 国）；限制：仅限自研客户端，无法导入 Clash。'
      },
      {
        brand: 'TOP 18 可信云',
        slug: 'kexin-cloud',
        line: 'IEPL 企业专线',
        proto: 'VLESS / Shadowsocks',
        clientMode: '支持第三方通用客户端订阅导入',
        price: '月付 ¥25 (150G/月)，优惠码 kkk333',
        speed: '已完成 2026-08-11 批次 MAI-TEST-BOT 节点实测',
        unlock: '官方诚实标注 AI 与流媒体缺乏统一实测，保持中性预期',
        note: '信息披露极度诚实透明，不夸大宣传，适合看重实事求是与标准 IEPL 线路的用户。'
      },
      {
        brand: 'TOP 19 速界',
        slug: 'sujie',
        line: 'IEPL 专线 (AI 场景定向优化)',
        proto: 'VLESS / Shadowsocks',
        clientMode: '自研客户端 + 第三方客户端订阅导入',
        price: '月付 ¥25 (150G/月)，优惠码 sss1111',
        speed: '已完成 2026-08-11 批次 MAI-TEST-BOT 节点实测',
        unlock: '25 元档唯一明确重点针对 ChatGPT/Claude/Gemini 优化的品牌',
        note: '定位清晰，专为高频使用海外 AI 大模型生产力工具的用户打磨。'
      },
      {
        brand: 'TOP 20 闪跃',
        slug: 'shanyue',
        line: '顶级 IPLC 纯专线 + 骨干网接入',
        proto: '私有封装协议',
        clientMode: '仅限官方专属客户端（不提供订阅链接）',
        price: '年付 ¥96 (折 ¥8/月 60G)；月付 ¥24 (150G)',
        speed: '香港 23ms / 548Mbps；台湾 38ms / 110Mbps (2026-10-19 采样)',
        unlock: '原生 IP 全解锁 ChatGPT、Claude、Netflix、Disney+、HBO',
        note: '香港节点测出 548Mbps 高吞吐，主打深夜与晚高峰零掉速；限制：仅限专属客户端。'
      },
      {
        brand: 'TOP 21 全球云',
        slug: 'quanqiuyun',
        line: 'IPLC/IEPL 专线中转 (60+ 节点)',
        proto: 'Trojan / Shadowsocks',
        clientMode: '仅限官方专属客户端（下载登录即用）',
        price: '年付 ¥99 (折 ¥8.3/月 59G)；月付 ¥20 (120G)；不限时 ¥100 (100G)',
        speed: '香港 25ms / 489Mbps；新加坡 45ms / 430Mbps (2026-08-11 & 10-19 实测)',
        unlock: '支持 ChatGPT/Claude/Netflix/Disney+/TikTok',
        note: '60+ 全球节点规模庞大，提供 2Gbps+ 带宽池与 680 元独享专线定制。'
      },
      {
        brand: 'TOP 28 梯子云',
        slug: 'tiziyun',
        line: 'IEPL 专线 (2Gbps+ 带宽 / 500M 冗余)',
        proto: 'VLESS',
        clientMode: '自研全平台一键客户端 + 通用订阅双支持',
        price: '年付折算约 ¥7.4/月 (60G/月)，优惠码 tiziyun',
        speed: '60+ 核心枢纽节点，海外团队常驻维护',
        unlock: '支持 Netflix/Disney+/TikTok 及 ChatGPT/Claude',
        note: '兼具小白一键登录零门槛与老手通用订阅导入双重灵活性。'
      },
      {
        brand: 'TOP 29 WgetCloud',
        slug: 'wgetcloud',
        line: '精品专线架构 (59 节点全非零)',
        proto: 'Trojan',
        clientMode: '支持通用客户端订阅导入',
        price: '季付 ¥297起 (折 ¥99/月 230G/月，历史资料口径)',
        speed: '日本 69.4ms / 462Mbps；美国 170.2ms / 440Mbps；香港 25.9ms / 431Mbps (2026-05 历史统计)',
        unlock: 'ChatGPT/Gemini/Netflix/Disney+ 部分节点可用',
        note: '五个多节点地区平均下载均超 400Mbps，跨洋美西性能极强；限制：无低价单月付，需在官网复核现行价格。'
      }
    ]
  },

  decisionBranches: [
    {
      id: 'branch-ai-work',
      badge: '分支 A · 生产力与重度稳定优先',
      title: '高频使用 ChatGPT / Claude / Cursor 编程 + 外贸办公 + 晚高峰 4K 刚需',
      condition: '预算 ¥18–¥35/月（或年付 ¥96–¥147），无法容忍晚高峰开会掉线、SSH 断连或频繁弹出 AI 地区拦截，且需要在电脑与手机上使用 Clash Verge Rev 或 Shadowrocket 精细分流。',
      techChoice: '底层必选【IEPL 或 IPLC 专线】+ 协议优选【VLESS 或专线 Shadowsocks】+ 客户端开启【Fake-IP 与 AI 独立策略组（固定日本/新加坡/美西原生节点）】。',
      recommendations: [
        { name: '光速云', slug: 'guangsu-cloud', reason: '2020 年老牌双专线（IEPL+企业内网），香港 22ms/529Mbps，支持 Clash/小火箭订阅，极速版 ¥25/月（168G）或 ¥147 永久包（247G）。' },
        { name: '微风网络', slug: 'weifeng', reason: 'IEPL 专线搭配多地原生 IP，香港实测 546Mbps，月付 ¥27（200G）兼顾 AI 解锁与大流量。' },
        { name: '一翻云', slug: 'yifanyun', reason: 'IEPL 物理专线配原生住宅 IP，同时支持 Hysteria 2 / VLESS-Reality / SS，月付 ¥20（150G）。' },
        { name: '速界', slug: 'sujie', reason: '25 元档唯一明确针对 ChatGPT、Claude、Gemini 访问场景重点优化的 IEPL 专线品牌。' }
      ],
      nextAction: { text: '前往 42 家品牌库按 IEPL 筛选', href: '/brands' }
    },
    {
      id: 'branch-beginner',
      badge: '分支 B · 零门槛开箱即用',
      title: '纯新手小白 / 讨厌配置 YAML 规则与订阅链接 / 多设备一键登录即连',
      condition: '不想研究什么是 Clash 配置文件、什么是 Sub-Store 订阅转换或 TUN 权限，希望像使用普通国内 App 一样下载软件、输入账号密码就能直接稳定看视频和查资料。',
      techChoice: '选择配备【自研专属客户端】的专线或优化中转机场（内置私有加密通道与智能分流，免除手动导入订阅与 DNS 调优）。',
      recommendations: [
        { name: '飞猫云', slug: 'feimao', reason: '主打轻快连接与专属客户端登录即用，香港 21ms/526Mbps，学生年付仅 ¥84（折 ¥7/月）。' },
        { name: '梯子云', slug: 'tiziyun', reason: '同时提供“小白一键登录自研客户端”与“通用订阅链接”，后续进阶想换 Clash 也无需换机场，年付折约 ¥7.4/月。' },
        { name: 'Firefly', slug: 'firefly', reason: 'IPLC 专线 + 原生 IP + 官方专属客户端，香港实测 547Mbps，年付 ¥96（折 ¥8/月）且不限设备数。' },
        { name: 'SOGO 云', slug: 'sogo-cloud', reason: '全线 IEPL 专线覆盖 15 个国家地区，自研客户端支持全平台，年付 ¥98（折 ¥8.2/月）。' }
      ],
      nextAction: { text: '查看 Top 10 综合推荐榜', href: '/ranking' }
    },
    {
      id: 'branch-budget',
      badge: '分支 C · 极致性价比与学生党',
      title: '月均预算严格控制在 ¥5.6–¥9 以内 + 日常刷网页/看 YouTube/轻度 AI',
      condition: '每月流量需求在 40GB–70GB 左右，主要用于查阅外文文献、刷推、看 1080P/4K 视频，希望用最低的年付折算成本获得远胜免费节点的专线体验。',
      techChoice: '优先选择头部老牌机场的【年付轻量入门包】（折合 ¥7–¥8/月），或选择 ¥5.6/月档位的标准 IEPL+VLESS 入门方案。切记避开来路不明的公网直连超卖盘。',
      recommendations: [
        { name: '光速云（轻量版）', slug: 'guangsu-cloud', reason: '¥99/年（折合 ¥8.25/月，每月 69GB），享受与高价套餐同源的 12 国节点与老牌运维保障。' },
        { name: '无忧链接（MINI链接）', slug: 'wuyou-link', reason: '¥79/年（折合 ¥6.5/月，每月 40GB），支持 TikTok 跨区直连与流媒体解锁。' },
        { name: '星岛梦（贴心小包）', slug: 'xingdaomeng', reason: '2020 年老牌 IEPL，¥96/年（折合 ¥8/月，每月 60GB），1 倍流量且不限设备。' },
        { name: '大佬云 / 闪电鼠', slug: 'dalaoyun', reason: '¥5.6/月档（60GB/月）的 IEPL + VLESS 标准入门方案，支持季付及以上 7 折。' }
      ],
      nextAction: { text: '查看 10 元以下性价比分榜', href: '/ranking' }
    },
    {
      id: 'branch-onetime',
      badge: '分支 D · 永久不过期备用与低频刚需',
      title: '每月使用天数不固定 / 拒绝包月浪费 / 需要第二个异构防失联备用机场',
      condition: '平时在国内网络环境工作，仅在周末或特定项目期间需要查阅海外资料；或者手里已经有了一个主力包月机场，需要配置第二个不同入口、不同落地的永久流量包防止主力机场偶发维护失联。',
      techChoice: '选购【一次性付费、流量永久不过期（不限时套餐）】的成熟老牌机场。由于不限时套餐考验服务商的长期存续能力，必须优先挑选运营时间 3 年以上的品牌。',
      recommendations: [
        { name: '光速云（致敬斯诺克147永久套餐）', slug: 'guangsu-cloud', reason: '2020 年运营至今，一次性付费 ¥147 获得 247GB 永久不过期流量（折合每 GB 仅 0.59 元），全节点最高 2.5Gbps。' },
        { name: '星岛梦（永久不限时包）', slug: 'xingdaomeng', reason: '2020 年老牌 IEPL，提供 ¥100/100GB、¥300/300GB、¥600/1TB 三档一次性永久流量包。' },
        { name: '二猫云 / 一翻云（不限时包）', slug: 'ermaoyun', reason: '二猫云提供 ¥99/100GB 不限时套餐，一翻云提供 ¥100/100GB 物理专线不限时包，均支持通用订阅。' }
      ],
      nextAction: { text: '了解光速云 147 永久套餐详情', href: '/brands/guangsu-cloud' }
    },
    {
      id: 'branch-enterprise',
      badge: '分支 E · 跨境电商直播与多设备团队',
      title: 'TikTok 海外直播带货 / 亚马逊与社媒多账号防关联 / 团队独享原生 IP 与高并发',
      condition: '普通共享机场节点因几百人共用同一出口 IP，极易触发电商平台关联封店或 TikTok 直播 0 播放。商业团队需要独享带宽、专属静态原生住宅 IP 以及一对一运维保障。',
      techChoice: '采用【全 IPLC/IEPL 专线独立部署 + 独享原生静态 IP】，或在软路由（OpenWrt）中按局域网设备 IP 进行策略路由绑定。',
      recommendations: [
        { name: '光速云（定制套餐）', slug: 'guangsu-cloud', reason: '¥680/月（500GB/月），按需独立部署全 IPLC 专线，分配专属独享原生 IP 与独立带宽，7×24 一对一客服确认地区。' },
        { name: '暮光加速 / 全球云（独享私人定制）', slug: 'muguang', reason: '暮光加速提供 ¥600/月（500GB）独享私人定制节点；全球云提供 ¥680/月独享私人专线节点。' },
        { name: 'TNTCloud / 青云梯', slug: 'tntcloud', reason: '均提供针对跨境电商、TikTok 直播定制或运营 6 年以上的企业级 IPLC 定制支持。' }
      ],
      nextAction: { text: '查看完整测速证据与节点表现', href: '/speedtest' }
    }
  ],

  conversionCards: [
    {
      badge: '首选综合主推 · 2020年运营老牌',
      name: '光速云 (Guangsu Cloud)',
      slug: 'guangsu-cloud',
      suitableFor: '追求 IEPL 双专线晚高峰稳定、需要兼顾日常 4K 流媒体与 AI 办公、或希望购入 ¥147 永久不过期流量包的用户。',
      pricing: '年付轻量版 ¥99/年（折合 ¥8.25/月，69GB/月）；月付极速版 ¥25/月（168GB/月，全节点 ×1 倍率）；致敬斯诺克永久版 ¥147 一次性（247GB 不过期）；定制版 ¥680/月。专属优惠码：AMM。',
      limitations: 'ChatGPT 与 Gemini 并非所有节点均默认支持，实际使用需手动切换至可用节点；特惠与特殊商品不支持退款，建议先购月付或轻量档实测。',
      verifiedAt: '2026-10-19（套餐与测速核验） / 2026-08-11（MAI-TEST-BOT 截图归档）',
      primaryAction: { text: '查看光速云详细评测与套餐表', href: '/brands/guangsu-cloud' },
      externalAction: { text: '前往光速云官网查看套餐 ↗', href: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y' }
    },
    {
      badge: '高性价比 IEPL · 香港实测 546Mbps',
      name: '微风网络 (Breeze Network)',
      slug: 'weifeng',
      suitableFor: '预算适中、看重原生 IP 流媒体与 ChatGPT/Claude 解锁、希望获得 24 小时客服响应的新手与进阶用户。',
      pricing: '清风年付 ¥137/年（100GB/月，折合 ¥11.4/月，使用优惠码 flat888 后更低）；乘风月付 ¥27/月（200GB/月）；信风不限时 ¥200（270GB 一次性）。',
      limitations: '年付入门档每月 100GB 流量对全天候重度 4K 下载用户可能偏紧，重度用户需考虑 200GB–500GB 月付档。',
      verifiedAt: '2026-10-19（套餐核验） / 2026-08-11（节点测速实测）',
      primaryAction: { text: '查看微风网络深度测评', href: '/brands/weifeng' },
      externalAction: { text: '了解微风网络官网详情 ↗', href: 'https://edp01.breezenetaff.com/#/?code=t3huofyI' }
    },
    {
      badge: '多端协同代表 · BGP 智能专线',
      name: '暮光加速 (Twilight)',
      slug: 'muguang',
      suitableFor: '拥有 Windows、macOS、iOS、Android、Linux 多台设备需要同时在线，或需要 120GB–1500GB 丰富流量梯度的个人与远程团队。',
      pricing: '年付轻量版 ¥109/年（折合 ¥9.1/月，70GB/月）；基础版月付 ¥20/月（120GB/月）；标准版 ¥40/月（240GB/月）；不限时包 ¥219 起。优惠码：muguang5555。',
      limitations: 'Gemini 解锁视具体节点而定；公开促销活动较少，大额长期订阅前建议先用 ¥20 月付档验证本地宽带路由。',
      verifiedAt: '2026-10-19（套餐核验） / 2026-08-11（节点测速实测）',
      primaryAction: { text: '查看暮光加速完整评测', href: '/brands/muguang' },
      externalAction: { text: '前往暮光加速官网 ↗', href: 'https://varnexa.twilightaff.com/#/?code=D1LHglg3' }
    },
    {
      badge: '开源工具配套 · 全平台纯净安装',
      name: '2026 第三方代理客户端官方下载库',
      slug: 'clients-hub',
      suitableFor: '已购入支持通用订阅的机场（如光速云、微风、暮光、星岛梦、一翻云等），需要下载正版 Mihomo (Clash Verge Rev)、v2rayNG、FlClash 或 Shadowrocket 的用户。',
      pricing: '开源桌面与安卓客户端（Clash Verge Rev、v2rayN、v2rayNG、FlClash、Hiddify、sing-box）100% 免费开源；iOS 端小火箭（$2.99）与 Stash（$3.99）由美区 App Store 官方收费。',
      limitations: '严禁从非官方百度竞价或第三方打包站下载客户端，以防剪贴板劫持；仅限专属客户端的机场（如飞猫云、SOGO云、隐形人）无法导入第三方客户端。',
      verifiedAt: '2026-11-07（GitHub Releases 与 App Store 状态核查）',
      primaryAction: { text: '进入客户端大全获取官方下载', href: '/clients' },
      externalAction: { text: '阅读 Clash Verge Rev 配置教程', href: '/blog/clash-verge-rev-setup-tutorial' }
    }
  ],

  faqs: [
    {
      q: '1. IEPL 专线和 IPLC 专线在实际日常使用中有肉眼可见的差距吗？我该优先选哪个？',
      a: '明确结论：对于 95% 以上的个人与中小型办公用户而言，真正的 IEPL 与 IPLC 在实际使用体验上没有肉眼可见的差距，两者均属于不过公网 GFW 的顶级内网专线。从电信工程底层来看，IPLC（国际私有租用线路）工作在物理层或 TDM/SDH 电路交换层，点对点独占固定信道；而 IEPL（国际以太网专线）构建在运营商 MPLS/OTN 骨干网的二层以太网（Layer 2 MAC 层）之上，支持更灵活的带宽颗粒度划分与多点 VLAN 互通。在本站 2026-10-19 的横向实测中，采用 IEPL 的光速云（香港 22ms / 529Mbps）、微风网络（香港 25ms / 546Mbps）与采用 IPLC 的 Firefly（香港 27ms / 547Mbps）、闪跃（香港 23ms / 548Mbps）处于完全相同的第一梯队水准。因此选购时不必纠结于 IEPL 还是 IPLC 的名词之争，而应重点考察服务商的运营年限、入口 BGP 带宽冗余以及是否提供合理的月付试错门槛（详见本文第一章 #topology-architecture）。'
    },
    {
      q: '2. 为什么我的机场节点测速能跑 500Mbps，但打开网页、刷新 X (Twitter) 或使用 ChatGPT 时依然感觉慢甚至转圈？',
      a: '明确结论：这是因为“最大吞吐带宽（Bandwidth）”与“首包握手响应时间（TTFB）”及“DNS 解析分流效率”是完全不同的网络指标。测速软件（如 Speedtest 或 MAI-TEST-BOT）测试的是多线程建立连接后的持续大文件下载能力，就像高速公路有多宽；而打开网页、加载推文缩略图与调用 ChatGPT API 是大量零碎的短连接请求，取决于：第一，DNS 解析是否发生了本地抢答或超时（若未开启 Fake-IP，每次访问新域名都要等待数十至数百毫秒的远程 DNS 查询）；第二，节点的 TCP/TLS 握手 RTT 与丢包重传率；第三，客户端是否开启了不当的 IPv6 双栈请求导致 IPv6 超时回退（Happy Eyeballs 延迟）。排障方案：在 Clash Verge Rev 等客户端中启用 Fake-IP 模式、关闭本地网卡或代理软件中的 IPv6 选项，并优先选用香港、台湾、日本、新加坡等亚洲近端低延迟节点（20ms–55ms），即可彻底消除“测速快但网页慢”的割裂感（详见第五章 #client-and-dns）。'
    },
    {
      q: '3. 为什么像飞猫云、SOGO云、Firefly、隐形人等机场只提供“专属客户端”，不给 Clash 或小火箭订阅链接？这安全吗？',
      a: '明确结论：这是 2025–2026 年机场行业为应对“订阅链接被爬虫批量抓取通报”以及“降低新手配置售后成本”而普及的主流架构趋势，只要选择有口碑的品牌即可正常使用，但需接受其无法导入软路由的限制。传统通用订阅链接一旦暴露在公开网络或被恶意同行抓取，包内的所有国内中转入口 IP 与端口会在数小时内遭到DDoS攻击或精准封堵；而专属客户端将节点下发接口进行了私有签名加密，并在客户端内部预置了最优的分流规则与防泄漏 DNS，使新手无需学习复杂的 Clash YAML 配置即可一键连接。如果您是手机和电脑日常使用且讨厌折腾，飞猫云、Firefly、SOGO云等专属端非常省心；但如果您需要在 OpenWrt 软路由、Apple TV 或 Linux 服务器上使用，则必须选择明确支持通用订阅导入的光速云、暮光加速、微风网络、星岛梦、二猫云或一翻云（详见第六章 #brand-architecture-matrix 对照表）。'
    },
    {
      q: '4. 为什么香港节点看 YouTube 4K 飞快，却经常打不开 ChatGPT、Claude 或 Google Gemini？应该切哪个地区？',
      a: '明确结论：这不是机场线路故障，而是 OpenAI、Anthropic 和 Google 官方的服务地区政策限制——香港特别行政区不在上述 AI 平台官方开放的服务国家/地区列表内。如果一家机场的香港节点使用的是纯粹的香港本土原生 IP 且未在服务端配置异地 DNS 劫持分流，直接用香港节点访问 ChatGPT 必然会被拦截。操作方案：在您的代理客户端（如 Clash Verge Rev、Stash 或 Shadowrocket）中，找到专门的「AI / OpenAI / Claude」策略组，将其手动固定指向【日本、新加坡、美国或台湾】的原生/解锁节点，同时保持日常网页与 YouTube 视频走延迟最低的【香港】节点。这样既能享受香港 IEPL 专线 22ms 的极速冲浪，又能让 AI 工具稳定在线（详见第四章 #unlock-mechanism）。'
    },
    {
      q: '5. 开启 Clash 的 TUN（虚拟网卡）模式后，国内网站变慢、微信发不出图，或者局域网 NAS / 打印机无法访问怎么办？',
      a: '明确结论：这是由于 TUN 虚拟网卡接管了系统全局三层网络流量后，国内域名被误送入远程代理解析，或者私有局域网网段未被排除在虚拟路由表之外所致。解决步骤：第一，检查客户端设置中的 `fake-ip-filter`（Fake-IP 过滤列表）与 `inet4-route-exclude-address`（排除路由地址），确保 `192.168.0.0/16`、`10.0.0.0/8`、`172.16.0.0/12` 等局域网私有地址段以及 `*.lan`、`*.local` 处于直连绕过状态；第二，确保 Mihomo 内核启用了 `nameserver-policy`，使中国大陆域名（GeoSite:CN）强制使用国内阿里（223.5.5.5）或腾讯（119.29.29.29）DNS 解析并走 `DIRECT` 直连；第三，若您仅使用浏览器看网页与办公，无需常驻开启 TUN 模式，日常仅开启「系统代理（System Proxy）」即可完美兼顾国内外分流，仅在运行终端命令行、海外桌面客户端或特定游戏时按需点亮 TUN 开关。'
    },
    {
      q: '6. 机场节点名称后面的 [x1.0]、[x2.0]、[0.1x] 倍率是什么意思？如何避免套餐流量在一夜之间跑光？',
      a: '明确结论：节点倍率是机场计费系统的流量乘数。在 1 倍率（1x）节点下，您实际下载 1GB 文件扣除套餐流量 1GB；若连接了标注为 2x 或 5x 的高倍率专线/原生家宽节点，下载 1GB 文件将扣除 2GB 或 5GB 套餐流量。预防流量异常耗尽的 4 个核心操作：1. 优先选择像光速云（极速版全节点 ×1 倍率）、星岛梦（1倍流量）、唯兔云（1倍流量）、灵猫网络这样主打全线 1 倍率透明计费的品牌；2. 在 Clash 的「自动测速（URL-Test）」策略组中，避免将高倍率节点混入自动优选池；3. 严禁在挂着全局代理或未分流的情况下使用百度网盘、迅雷、Bittorrent (PT/BT) 或进行 Steam/Windows 大型系统更新；4. 将客户端自动健康检查（Health Check）的测速间隔从默认的 300 秒调大至 1800 秒以上，避免后台高频测速白白消耗流量。'
    },
    {
      q: '7. 为什么同一家机场，在家里电信宽带速度高达 500Mbps，换到中国移动宽带、广电宽带或大学校园网就变得卡顿？',
      a: '明确结论：问题出在“用户本地运营商到机场国内入口机房”的第一跳跨网互联或省际 QoS 策略上。部分中小型机场为了节省国内服务器成本，仅租用了单一运营商（如单线电信或单线联通）的入口服务器，当移动宽带或教育网用户访问该入口时，数据包需要在国内跨运营商结算网关排队，甚至被移动省网防火墙对高频大流量 UDP/TCP 端口实施省际限速。解决方案：如果您使用的是中国移动、广电或高校校园网，选购时必须认准具备【多线 BGP 智能入口】或【三网优化负载均衡】的品牌（例如光速云、暮光加速、唯兔云、SOGO云、sslar 等），并在客户端中依次测试标有“移动专线”、“CMCC”或“BGP多线”的入口节点，而非盲目只看落地国家。'
    },
    {
      q: '8. 像光速云 147 元、星岛梦 100 元这种“一次性付费永久不限时流量包”，真的永远不会过期吗？购买有什么风险？',
      a: '明确结论：不限时（按量计费）套餐的“永久不过期”是指只要该机场品牌正常持续运营，您账户内的剩余流量就不会按月清零；但其最大潜在风险在于“机场自身的商业存续周期”。如果一家刚成立两个月的小机场推出超低价永久包，很可能是圈钱跑路的前兆。因此，购买不限时永久流量包有一条铁律：**只买运营历史超过 3 年以上、拥有主力周期性营收的老牌机场**。例如本站主推的光速云（2020 年运营至今超 4 年，提供 ¥147/247GB 永久套餐）以及星岛梦（2020 年运营至今，提供 ¥100/100GB 不限时包），它们经过了多年的行业周期检验，将其作为低频办公或主力机场之外的第二备用通道，性价比与安全性极高。'
    },
    {
      q: '9. 在本站 2026-08-11 的 16 家真实测速截图中，为什么很多机场显示的协议是 Shadowsocks (SS)？现在用 SS 还会被封吗？',
      a: '明确结论：在 IEPL/IPLC 专线机场中使用 Shadowsocks 不仅绝对安全，而且是兼顾最高吞吐与最低延迟的工程最优解。许多新手受到几年前“自建直连 SS 容易被封 IP”的旧观念影响，误以为 SS 已经过时。实际上，自建 VPS 被封是因为流量裸奔在公网国际出口上；而现代专线机场采用的是“国内 BGP 中转入口 + IEPL/IPLC 封闭内网专线”，用户的流量在境内即进入私有专线，根本不经过 GFW 公网审查点，因此完全不需要笨重的伪装外壳。相反，Shadowsocks 极简的协议头与成熟的硬件加速让它在专线内能轻松跑出 500Mbps+ 的满速成绩（详见第三章 #protocol-comparison）。'
    },
    {
      q: '10. 普通用户拿到节点后，如何自己动手检测这个节点到底是“真原生 IP”、“广播 IP”还是“DNS 解锁”？',
      a: '明确结论：只需通过以下 3 个免费公开渠道交叉比对即可在 2 分钟内查明真相。第一步，连接目标节点（开启全局模式）后访问 `ipinfo.io` 或 `bgp.he.net`，查看该 IP 的 `ASN` 类型与注册国家：如果 `type` 显示为 `isp`（如 HKT、HiNet、NTT）且注册国家与节点名称一致，即为高价值的真原生 IP；若 `type` 显示为 `hosting`（如 Cogent、Datacamp、Choopa、Akamai/Linode）则为机房 IP。第二步，访问 `whoer.net` 或 `BrowserLeaks` 检查客户端 IP 与 DNS 出口 IP 是否处于同一国家：若节点本身是常见机房 IP，但 DNS 解析出口或特定流媒体请求被透明指向了另一台解锁宿主机，且能正常播放 Netflix 非自制剧，则说明该机场配置了实用的 DNS 媒体分流解锁（详见第四章 #unlock-mechanism）。'
    }
  ]
};

fs.writeFileSync('astroarabia/src/data/guide-content.json', JSON.stringify(guideData, null, 2));
console.log('Saved base guide-content.json');
