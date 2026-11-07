import fs from 'fs';
import './generate_guide_data.js';

const guideData = JSON.parse(fs.readFileSync('astroarabia/src/data/guide-content.json', 'utf8'));

// Refine brandMatrixTable to 10 core verified brands (compact & high-signal)
guideData.brandMatrixTable.caption = '表 4：本站收录 Top 10 代表性机场品牌底层线路、协议、客户端模式与实测表现核验总表';
guideData.brandMatrixTable.rows = guideData.brandMatrixTable.rows.slice(0, 10).map(r => ({
  ...r,
  note: r.note.split('；')[0]
}));

// Keep unlockMatrixTable concise in table cells since Chapter 4 covers deep prose
guideData.unlockMatrixTable.rows = guideData.unlockMatrixTable.rows.map(r => ({
  ...r,
  mechanism: r.mechanism.split('+').slice(0, 2).join('+'),
  ipReq: r.ipReq.split('；')[0],
  solution: r.solution.split('；').slice(0, 2).join('；')
}));

// Keep protocolComparisonTable concise in table cells since Chapter 3 covers deep prose
guideData.protocolComparisonTable.rows = guideData.protocolComparisonTable.rows.map(r => ({
  ...r,
  layer: r.layer.split('；')[0],
  compat: r.compat.split('（')[0],
  conclusion: r.conclusion.split('。')[0] + '。'
}));

// Refine FAQs to 8 high-value boundary Q&As (~1,750 chars)
guideData.faqs = [
  {
    q: '1. IEPL 专线和 IPLC 专线在实际日常使用中有肉眼可见的差距吗？我该优先选哪个？',
    a: '明确结论：对于 95% 以上的个人与中小型办公用户而言，真正的 IEPL 与 IPLC 在实际使用体验上没有肉眼可见的差距，两者均属于不过公网 GFW 的顶级内网专线。从电信工程底层看，IPLC 工作在物理层或 SDH 电路交换层，点对点独占信道；而 IEPL 构建在运营商 MPLS/OTN 骨干网的二层以太网（Layer 2 MAC 层）之上，支持更灵活的带宽颗粒度划分与多点 VLAN 冗余。在本站 2026-10-19 横向实测中，采用 IEPL 的光速云（香港 22ms / 529Mbps）、微风网络（香港 25ms / 546Mbps）与采用 IPLC 的 Firefly（香港 27ms / 547Mbps）、闪跃（香港 23ms / 548Mbps）处于完全相同的第一梯队水准。选购时不必纠结于名词之争，应重点考察运营年限、BGP 入口冗余及月付试错门槛（详见第一章 #topology-architecture）。'
  },
  {
    q: '2. 为什么我的机场节点测速能跑 500Mbps，但打开网页、刷新 X (Twitter) 或使用 ChatGPT 时依然感觉慢甚至转圈？',
    a: '明确结论：这是因为“最大吞吐带宽”与“首包握手响应时间（TTFB）”及“DNS 解析分流效率”是完全不同的网络指标。测速软件测试的是多线程建立连接后的持续大文件下载能力；而打开网页、加载推文与调用 ChatGPT API 是大量零碎短连接，取决于：1. DNS 解析是否发生了本地抢答或超时（未开启 Fake-IP 时每次访问新域名都要等待远程 DNS 查询）；2. 节点的 TCP/TLS 握手 RTT 与重传率；3. 客户端是否开启了不当的 IPv6 双栈请求导致超时回退。排障方案：在 Clash Verge Rev 中启用 Fake-IP 模式、关闭代理软件中的 IPv6 选项，并优先选用香港、台湾、日本、新加坡等近端低延迟节点（20ms–55ms）（详见第五章 #client-and-dns）。'
  },
  {
    q: '3. 为什么像飞猫云、SOGO云、Firefly、隐形人等机场只提供“专属客户端”，不给 Clash 或小火箭订阅链接？',
    a: '明确结论：这是 2025–2026 年机场行业为应对“订阅链接被爬虫批量抓取通报”以及“降低新手配置售后成本”而普及的架构趋势，只要选择有口碑的品牌即可正常使用，但需接受其无法导入软路由的限制。传统通用订阅链接一旦暴露，包内的国内中转入口 IP 极易遭到攻击或封堵；而专属客户端将节点下发接口进行了私有加密，并内置了分流规则与防泄漏 DNS，使新手无需学习复杂的 YAML 配置即可一键连接。若您追求手机电脑开箱即用，飞猫云、Firefly、SOGO云非常省心；若您需要在 OpenWrt 软路由或 Clash Verge Rev 中自定义分流，则必须选择支持通用订阅的光速云、暮光加速、微风网络、星岛梦、二猫云或一翻云（详见第六章 #brand-architecture-matrix）。'
  },
  {
    q: '4. 为什么香港节点看 YouTube 4K 飞快，却经常打不开 ChatGPT、Claude 或 Google Gemini？应该切哪个地区？',
    a: '明确结论：这不是机场线路故障，而是 OpenAI、Anthropic 和 Google 官方的服务地区政策限制——香港特别行政区不在上述 AI 平台官方开放的服务列表内。若香港节点使用的是纯粹的香港本土 IP 且未在服务端挂载异地 DNS 解锁，直连访问 ChatGPT 必然被拦截。操作方案：在代理客户端（Clash Verge Rev、Stash 或 Shadowrocket）中，找到专门的「AI / OpenAI」策略组，将其手动固定指向【日本、新加坡、美国或台湾】的原生/解锁节点，同时保持日常网页与 YouTube 走延迟最低的【香港】节点（详见第四章 #unlock-mechanism）。'
  },
  {
    q: '5. 开启 Clash 的 TUN（虚拟网卡）模式后，国内网站变慢、微信发不出图，或者局域网 NAS 无法访问怎么办？',
    a: '明确结论：这是由于 TUN 虚拟网卡接管了全局三层流量后，国内域名被误送入远程解析，或私有局域网网段未被排除在虚拟路由表之外所致。解决步骤：1. 检查客户端的 `fake-ip-filter` 与排除路由地址，确保 `192.168.0.0/16`、`10.0.0.0/8` 等局域网私有网段处于直连绕过状态；2. 确保 Mihomo 内核启用了 `nameserver-policy`，使中国大陆域名（GeoSite:CN）强制使用国内 DNS（223.5.5.5）解析并走 `DIRECT` 直连；3. 日常仅用浏览器看网页时无需常驻开启 TUN，仅开启「系统代理」即可，遇到终端命令行或特定桌面应用无法联网时再按需点亮 TUN 开关。'
  },
  {
    q: '6. 机场节点名称后面的 [x1.0]、[x2.0] 倍率是什么意思？如何避免套餐流量在一夜之间跑光？',
    a: '明确结论：节点倍率是机场计费系统的流量乘数。在 1 倍率（1x）节点下，下载 1GB 文件扣除 1GB 套餐流量；若连接了 2x 或 5x 高倍率节点，下载 1GB 文件将扣除 2GB 或 5GB 流量。防耗尽 4 步操作：1. 优先选择光速云（极速版全节点 ×1 倍率）、星岛梦、唯兔云、灵猫网络等主打 1 倍率透明计费的品牌；2. 在自动测速（URL-Test）策略组中剔除高倍率节点；3. 严禁挂着代理使用百度网盘、迅雷、BT/PT 或进行 Steam/Windows 大型更新；4. 将客户端后台健康检查间隔调大至 1800 秒以上。'
  },
  {
    q: '7. 像光速云 147 元、星岛梦 100 元这种“一次性付费永久不限时流量包”，购买有什么需要注意的边界条件？',
    a: '明确结论：不限时（按量计费）套餐的“永久不过期”是指只要该机场品牌正常持续运营，账户内的剩余流量就不会按月清零；其核心边界风险在于服务商自身的商业存续周期。因此购买不限时永久流量包的铁律是：**只买运营历史超过 3 年以上、拥有主力周期性营收的老牌机场**。例如本站主推的光速云（2020 年运营至今，提供 ¥147/247GB 永久套餐）以及星岛梦（2020 年运营至今，提供 ¥100/100GB 不限时包），经过多年周期检验，非常适合作为低频科研办公或主力机场之外的第二异构防失联备用通道。'
  },
  {
    q: '8. 在本站 2026-08-11 的 16 家真实测速截图中，为什么很多专线机场显示的协议是 Shadowsocks (SS)？现在用 SS 还会被封吗？',
    a: '明确结论：在 IEPL/IPLC 专线机场中使用 Shadowsocks 不仅安全，而且是兼顾最高吞吐与最低延迟的工程最优解。个人自建 VPS 用 SS 容易被封是因为流量裸奔在公网国际出口上；而现代专线机场采用“国内 BGP 中转入口 + IEPL/IPLC 封闭内网专线”，流量在境内即进入私有专线，根本不经过 GFW 公网审查点，无需笨重的伪装外壳。Shadowsocks 极简的协议头与硬件加速让它在专线内能轻松跑出 500Mbps+ 的满速成绩（详见第三章 #protocol-comparison）。'
  }
];

guideData.chapters = {
  chapter1: {
    id: 'topology-architecture',
    badge: 'CHAPTER 01 · NETWORK TOPOLOGY',
    title: '一、跨境线路架构对比与底层拓扑解析',
    intro: '为什么同样是访问海外网站或观看 YouTube 4K 视频，有的机场在每日 20:00 至 23:00 的家庭宽带晚高峰依然能够做到拖动进度条秒加载、延迟稳定在 25ms 以内，而有的廉价节点一旦到了晚上就频繁断流？要彻底看懂机场行业的定价逻辑与性能天花板，首先必须拆解跨境网络数据包从本地设备发出后所经历的“三段式物理拓扑”。',
    subsections: [
      {
        id: 'topology-three-segments',
        title: '1.1 跨境代理流量的“三段式”物理路径拆解',
        paragraphs: [
          '任何一条成熟的现代机场线路，其数据包在网络空间中的完整旅程都可以严格划分为三个物理阶段：第一跳（境内接入段，First Mile）、第二跳（跨境传输段，Middle Mile）以及第三跳（境外落地与国际互联段，Last Mile）。早期自建 VPS 或劣质直连机场将这三段粗暴合并为一段——即用户的家庭宽带直接向远在美国或日本的服务器发起公网连接。这种模式不仅要跨越漫长的国内骨干网，还必须在北上广三大国际出口局与全国网民争抢有限的民用国际带宽，并正面撞击部署在国际出口处的深度包检测（DPI）防火墙。',
          '而在本站收录的 42 家机场品牌中，排名前列的主力服务商（如 [光速云](/brands/guangsu-cloud)、[暮光加速](/brands/muguang)、[飞猫云](/brands/feimao)、[微风网络](/brands/weifeng)、[星岛梦](/brands/xingdaomeng)、[二猫云](/brands/ermaoyun)、[唯兔云](/brands/weitu-cloud)、[Firefly](/brands/firefly) 等）均采用了“国内中转入口 + 跨境专线/隧道 + 海外优化落地”的三段解耦架构。在这一架构下，您的手机或电脑运行客户端时，连接的并不是真实的海外服务器 IP，而是机场部署在广东（深圳/广州/东莞）、上海、北京或江苏等地的国内云服务器（即第一跳入口）。由于入口位于中国大陆境内，本地电信、联通或移动宽带访问它就像访问国内主流网站一样顺畅，延迟通常仅有 5ms 至 20ms。',
          '当加密数据包抵达国内入口服务器后，真正的分水岭出现在第二跳“跨境传输段”。服务商究竟是通过公网海底光缆把数据发往海外（BGP 公网中转），还是通过向基础电信运营商租用的二层以太网内网专线（IEPL）或点对点物理光纤（IPLC）穿墙过境，直接决定了这家机场在晚高峰和敏感时期的存活率与吞吐上限。最后，数据包到达香港、日本、新加坡或美国的对端机房后，由第三跳“境外落地服务器”完成解密，并通过当地的国际互联网交换中心（IXP，如香港 HKIX、新加坡 Equinix、日本 BBIX）向 OpenAI、Netflix、Google 等目标服务器发起最终请求。'
        ]
      },
      {
        id: 'topology-iepl-vs-iplc',
        title: '1.2 IEPL 国际以太网专线与 IPLC 物理专线的工程差异',
        paragraphs: [
          '在选购机场时，用户最常听到的两个高阶词汇就是 IPLC（International Private Leased Circuit，国际私有租用线路）与 IEPL（International Ethernet Private Line，国际以太网专线）。这两者原本是跨国银行、证券交易所与大型外贸企业用于连接总部与海外分支机构的电信级商用专线。它们最大的共同点在于：**物理或数据链路层完全隔离于公众互联网，跨境段不经过公网国际出口路由器，因此彻底绕开了针对公网流量的 GFW 审查与民用骨干网晚高峰拥塞**。',
          '从通信工程的 OSI 七层模型来看，传统的 IPLC 工作在物理层（Layer 1）或基于 SDH/MSTP 的时分复用电路层，相当于在深圳与香港机房之间拉了一条点对点独占的虚拟光纤信道，延迟极其恒定。在本站数据库中，如 [唯兔云](/brands/weitu-cloud)、[Firefly](/brands/firefly)（实测香港 27ms / 547Mbps）、[U1S1](/brands/u1s1)（实测香港 24ms / 538Mbps）、[闪跃](/brands/shanyue)（实测香港 23ms / 548Mbps）、[全球云](/brands/quanqiuyun) 等品牌均以 IPLC 专线为核心卖点。',
          '而 IEPL 则工作在数据链路层（Layer 2 以太网层），底层依托运营商的 MPLS-TP 或 OTN 政企专网构建。相比于传统点对点 IPLC，IEPL 具备极强的二层以太网交换灵活性：机场主可以在国内多个 BGP 入口与海外多个落地机房之间组建弹性内网 VLAN，支持更精细的带宽突发调度与双链路故障毫秒级切换。例如本站综合排名第一的 [光速云](/brands/guangsu-cloud) 采用的就是“IEPL 专线 + 企业级内网专线”双线路冗余架构（实测香港 22ms / 529Mbps，详见 [光速云深度实测报告](/blog/guangsu-cloud-in-depth-review)），[微风网络](/brands/weifeng)（香港 25ms / 546Mbps）、[星岛梦](/brands/xingdaomeng)（香港 27ms / 504Mbps）、[二猫云](/brands/ermaoyun)（香港 22ms / 481Mbps）、[一翻云](/brands/yifanyun)（香港 23ms / 477Mbps）等也均以全线 IEPL 专线为基石。'
        ]
      },
      {
        id: 'topology-bgp-and-direct',
        title: '1.3 国内多线 BGP 入口的价值与普通公网直连的局限',
        paragraphs: [
          '为什么有的机场明明宣传自己是“专线”，但中国移动宽带或校园网用户连上去还是觉得卡？这就涉及第一跳“国内 BGP 入口”的含金量。中国大陆的互联网由电信、联通、移动及教育网、广电网共同组成，不同运营商之间的跨网结算带宽往往存在瓶颈。如果一家廉价机场只租用了单线电信机房作为国内中转入口，那么当移动宽带用户连接该节点时，数据包在进入跨境专线之前，就已经在国内的“移动—电信”跨网互联节点上发生了拥堵。',
          '真正优质的机场会在国内入口侧采购高成本的“多线 BGP（边界网关协议）机房”，同时与三大运营商的骨干网直接物理对等互联（Peering）。当您发起连接时，BGP 路由协议会自动匹配同运营商的最短物理路径。而像 [暮光加速](/brands/muguang)（实测香港 26ms / 509Mbps）、[灵猫网络](/brands/lingmao-network)（香港 22ms / 492Mbps）等代表性品牌，依托高质量的国内 BGP 智能入口调度与专线级出口，同样能在日常流媒体与办公场景中跑出媲美纯专线的丝滑体验。至于毫无国内中转的纯公网直连（Direct）节点，在本站前 28 家主力推荐中已被全面淘汰。'
        ]
      }
    ]
  },

  chapter2: {
    id: 'verify-dedicated-line',
    badge: 'CHAPTER 02 · VERIFICATION GUIDE',
    title: '二、实操验证：普通用户 4 步鉴别真假 IEPL/IPLC 专线',
    intro: '由于“IEPL 企业专线”与“IPLC 内网专线”在市场上具有极高的溢价能力，部分不良小作坊会将普通的公网中转甚至廉价直连节点直接改名为“【IEPL】香港 01”。为了帮助用户在购买月付体验期间快速验明正身，我们总结了一套无需专业仪器即可完成的 4 步实证检验法。',
    steps: [
      {
        stepNum: 'STEP 01',
        title: '第一步：晚高峰（21:00–22:30）持续 Ping 抖动与丢包压测',
        whatAndWhen: '适用时机：在刚买下月付套餐的头三天，务必挑选晚上 21:00 至 22:30 全国宽带最拥堵的黄金时段进行测试，因为白天闲时哪怕是劣质直连也能跑出好看的数字。',
        howToOperate: '操作方法：在客户端中选中目标香港或新加坡节点，打开 YouTube 播放一段 4K 60fps 视频并开启「详细统计信息（Stats for nerds）」，同时观察客户端日志中的实时延迟波动，或通过支持代理通道的 TCPing 工具连续发起 100 次握手测试。',
        criteria: '判定标准：真正的 IEPL/IPLC 专线由于跨境段走政企内网，晚高峰延迟曲线极其平稳，香港节点通常锁定在 20ms–30ms 之间，抖动（Jitter）不超过 5ms，丢包率趋近 0%。若晚高峰延迟从白天的 35ms 暴涨到 180ms 甚至频繁断流，则必为公网直连或严重超卖的公网中转。'
      },
      {
        stepNum: 'STEP 02',
        title: '第二步：解析节点入口 IP 归属与 Traceroute 路由跳数追踪',
        whatAndWhen: '适用时机：适用于拥有通用订阅链接（如光速云、暮光加速、微风网络、星岛梦、二猫云、一翻云等），希望从路由底层确认是否走了国内中转入口的用户。',
        howToOperate: '操作方法：在 Clash Verge Rev 或 v2rayN 中查看节点的 `server`（服务器地址）字段，在终端命令行执行 `nslookup 节点域名` 获取真实入口 IP，随后执行 `tracert -d 入口IP` 或使用 NextTrace 查看路由路径。',
        criteria: '判定标准：正规专线或中转机场的 `server` 入口 IP 地理位置必然位于中国大陆境内（常见为深圳、广州、上海、佛山、镇江等地的 BGP 机房），本地 `tracert` 在 5 到 10 跳之内就会在境内机房终结，不会在公网路由表上直接跳往海外公网 IP。'
      },
      {
        stepNum: 'STEP 03',
        title: '第三步：跨运营商（固网电信/联通 vs 手机移动 5G 热点）切换测试',
        whatAndWhen: '适用时机：当您需要在家庭固网与外出通勤（手机中国移动 5G）无缝使用同一家机场时，验证其国内入口是否具备多线 BGP 能力。',
        howToOperate: '操作方法：先在家庭宽带 Wi-Fi 下对主力节点进行测速；随后断开 Wi-Fi，用手机开启中国移动 5G 个人热点连接电脑，对比同一批节点的握手延迟与下载速率。',
        criteria: '判定标准：采用优质多线 BGP 入口的机场（如光速云、暮光加速、唯兔云、SOGO云等），在固网与移动 5G 下的握手延迟差异极小（仅差 5ms–12ms 基站延迟），均能快速拉起高吞吐。若在电信下飞快、切到移动就全部超时，说明仅采购了廉价单线入口。'
      },
      {
        stepNum: 'STEP 04',
        title: '第四步：结合带宽商业成本核算，识破“几块钱无限流量真专线”骗局',
        whatAndWhen: '适用时机：在购买任何宣称“9.9 元包年 1000GB 流量 IEPL 专线”的夸张广告前，用基础电信成本常识做一次除法计算。',
        howToOperate: '操作方法：核算目标套餐折算后的“每 GB 流量单价”与“月均起步价”，并对照本站 [42 家机场品牌库](/brands) 的价格分布区间。',
        criteria: '判定标准：健康的专线机场商业平衡点在于：年付轻量小包（40G–70G/月）折算月均成本在 ¥5.6 至 ¥10 左右（如光速云年付 ¥99 折 ¥8.25/月、星岛梦年付 ¥96 折 ¥8/月、大佬云折 ¥5.6/月）；常规主力月付（120G–200G/月）在 ¥18 至 ¥35 左右；永久流量包折合每 GB 约 ¥0.55 至 ¥1.0（如光速云 ¥147/247GB 折 ¥0.59/GB）。凡是背离这一物理成本底线的，必为直连套壳或短期跑路盘。'
      }
    ]
  },

  chapter3: {
    id: 'protocol-comparison',
    badge: 'CHAPTER 03 · PROXY PROTOCOLS',
    title: '三、主流代理协议原理、开销与抗封锁边界深度对比',
    intro: '在代理客户端的节点列表中，每一条节点后面都会标注 `VLESS`、`SS (Shadowsocks)`、`Trojan`、`VMess` 或 `Hysteria2`。许多用户在选购时容易陷入“唯协议论”误区。事实上，代理协议本质上是运行在传输层之上的数据封装格式，它的实际优劣完全取决于底层跑在什么线路上。',
    subsections: [
      {
        id: 'protocol-vless-reality',
        title: '3.1 VLESS 与 XTLS-Reality：兼顾零冗余开销与现代化抗封锁的主力',
        paragraphs: [
          'VLESS 是近年来在高端专线机场与现代化中转机场中普及率增长最快的协议。早期的 V2Ray 核心协议 VMess 在协议层设计了复杂的对称加密与认证头，当外层套上 TLS 时会造成双重加解密损耗。VLESS 的核心突破在于彻底剔除了协议本身的冗余加密，采用极简的无状态认证头，将加密工作完全交给底层的专线通道或外层的 XTLS / Reality 传输层。',
          '在 IEPL/IPLC 专线机场中（如 [光速云](/brands/guangsu-cloud)、[微风网络](/brands/weifeng)、[大佬云](/brands/dalaoyun)、[二猫云](/brands/ermaoyun)、[SOGO云](/brands/sogo-cloud)、[可信云](/brands/kexin-cloud)、[速界](/brands/sujie)、[梯子云](/brands/tiziyun)），VLESS 能够实现接近裸 TCP 的极速握手与超大吞吐；而在经过公网传输的场景下（如 [一翻云](/brands/yifanyun) 提供的 VLESS-Reality 节点），Reality 技术无需服务商部署自有证书，即可在握手阶段借用国际大厂网站的真实 TLS 1.3 指纹，彻底消除了服务端被动探测特征。注意：使用 VLESS 协议要求本地客户端必须采用 Mihomo（如 Clash Verge Rev、FlClash）或 Xray/sing-box 内核。'
        ]
      },
      {
        id: 'protocol-shadowsocks-dedicated',
        title: '3.2 Shadowsocks (SS AEAD 2022)：为什么它在专线机场实测中依然统治全场？',
        paragraphs: [
          '查阅本站 [真实测速图库](/speedtest) 中 2026-08-11 批次的 16 家机场实测原图可以发现：包括光速云、暮光加速、飞猫云、微风网络、星岛梦、二猫云、唯兔云、U1S1、灵猫网络、极连云、光年梯、一翻云、可信云、速界在内的众多头部机场，在测速软件中呈现的节点协议绝大多数都是 `Shadowsocks (SS)`。这正是“自建公网直连 VPS”与“企业级 IEPL/IPLC 专线机场”在架构逻辑上的根本分野。',
          'Shadowsocks 在个人自建直连服务器上易被阻断，是因为无伪装的加密字节流直接暴露在公网国际出口的 GFW 审查设备面前。然而，**在 IEPL 与 IPLC 专线机场中，跨境传输走的是封闭的电信内网专线，路径上根本没有公网 GFW 审查设备！** 既然内网专线不需要耗费算力去伪装成网页，那么协议越精简、握手越快，实际体验就越好。升级到 AEAD 与 Shadowsocks 2022 加密套件后，SS 免去了 TLS 多轮握手的额外 RTT 延迟，让香港专线节点轻松跑出 21ms–25ms 的低延迟与 530Mbps+ 的满血带宽，且 100% 兼容所有新老客户端与软路由固件。'
        ]
      },
      {
        id: 'protocol-trojan-hysteria2',
        title: '3.3 Trojan 伪装、Hysteria 2 弱网加速与自研专属客户端封装',
        paragraphs: [
          '另外三类常见技术方案也各有明确的工程定位。首先是 **Trojan 协议**（代表品牌如 [星岛梦](/brands/xingdaomeng)、[唯兔云](/brands/weitu-cloud)、[全球云](/brands/quanqiuyun)、[WgetCloud](/brands/wgetcloud)）：它直接在标准 TLS 1.3 加密通道内部传输代理指令，非法探测流量会被无缝回落（Fallback）到真实的 Nginx 网页上，对圈 X、Surge、旧版软路由的原生兼容性极佳。',
          '其次是基于 UDP/QUIC 架构的 **Hysteria 2**（代表品牌如 [一翻云](/brands/yifanyun)）：内置 Brutal 恒定速率拥塞控制算法，允许忽略丢包暴力重发 UDP 数据包，在恶劣公网跨国弱网下表现惊艳；但在本就不丢包的 IEPL 专线上无额外加成，反而容易触发国内部分运营商针对高频 UDP 的 QoS 限速，且手机耗电较高。最后是 **自研专属客户端私有封装模式**（代表品牌如 [飞猫云](/brands/feimao)、[无忧链接](/brands/wuyou-link)、[Firefly](/brands/firefly)、[灵猫网络](/brands/lingmao-network)、[SOGO云](/brands/sogo-cloud)、[闪跃](/brands/shanyue)），通过隐藏订阅链接与内置智能分流彻底解决了防爬虫封堵与新手配置难题，仅受限于无法导入第三方 Clash 或软路由。'
        ]
      }
    ]
  },

  chapter4: {
    id: 'unlock-mechanism',
    badge: 'CHAPTER 04 · STREAMING & AI UNLOCK',
    title: '四、流媒体 4K 与 AI 工具（ChatGPT / Claude / Gemini）解锁机制及排障',
    intro: '在实际使用中，困扰用户最多的往往不是“连不上网”，而是“明明 YouTube 能看 4K 视频，为什么打开 ChatGPT 却提示 Access Denied？为什么 Netflix 里面搜不到非自制剧？”要解决这些问题，必须理解流媒体与 AI 巨头是如何识别代理 IP 的。',
    subsections: [
      {
        id: 'unlock-ip-types',
        title: '4.1 原生 IP（Native IP）、广播 IP 与“送中 IP”的底层真相',
        paragraphs: [
          '当您通过某条机场节点访问 Netflix、Disney+、OpenAI 或 Anthropic 时，对方服务器会在毫秒间完成对落地出口 IP 的三项背景核查：1. 查询该 IP 的**注册局原始归属国**与当前**物理广播所在地**是否一致；2. 查询该 IP 所属的 **ASN 机构属性**是当地居民家庭宽带（ISP / Residential），还是商业云数据中心（Hosting / Data Center）；3. 查询 Cloudflare 与威胁情报库中的历史并发风控评分。',
          '所谓**原生 IP**，是指注册国家与机房物理所在地完全一致的本土 IP；而**广播 IP** 则是云服务商将原本注册在其他国家的空闲 IP 段通过 BGP 宣告在当前机房使用（例如本站 2026-08-11 实测截图中，灵动云、小旋风等部分台湾节点访问 Disney+ 被识别为西班牙 `ES` 或阿联酋 `AE`，即属跨国广播 IP）。至于**“送中 IP”**，则是由于某海外 IP 上有大量开启中文定位的设备同时使用 Google 服务，被 Google 算法错误标记为“中国大陆”，导致访问 Gemini 或 YouTube Premium 时直接提示地区不支持。'
        ]
      },
      {
        id: 'unlock-dns-sni-proxy',
        title: '4.2 机场服务端是如何通过 DNS Media Unlock（SNI Proxy）突破封锁的？',
        paragraphs: [
          '既然海外本土家庭住宅宽带 IP 价格高昂且带宽有限，为什么像光速云、暮光加速、微风网络、飞猫云、星岛梦、唯兔云、一翻云等年付百元级的专线机场，依然能让大带宽商业机房节点顺利解锁 Netflix 非自制剧、Disney+ 以及 ChatGPT？这得益于现代机场服务端普遍部署的 **DNS 媒体动态分流解锁（SNI Proxy）** 架构。',
          '当您连接大带宽商业机房节点看 YouTube 或下载文件时，流量直接由落地机高速处理；而一旦发起对 `netflix.com`、`disneyplus.com` 或 `chatgpt.com` 的访问，机场落地服务器内部的自定义 DNS 会识别出这些高风控域名，并将其透明转发至机场内部额外部署的“高纯净原生住宅解锁宿主机”代为出口。这样既保留了商业机房 500Mbps+ 的大带宽低延迟优势，又借用原生住宅 IP 完美绕过了机房黑名单拦截。'
        ]
      },
      {
        id: 'unlock-troubleshooting-6steps',
        title: '4.3 实操排障：当 ChatGPT、Claude 或 Netflix 无法解锁时的 6 步自救法',
        paragraphs: [
          '若您购买的机场在评测表中明确标注支持解锁，但本地连接后仍遇报错，请按以下 6 步逐一排查：',
          '**步骤一：将 AI 分流策略组撤离普通香港节点，固定至日本/新加坡/美西/台湾。** 香港本土 IP 默认不在 OpenAI、Claude 及 Gemini 的官方支持名单内。请在 Clash 左侧「代理」面板中找到 `AI / OpenAI` 策略组，手动点选日本、新加坡、美国或台湾的原生/解锁节点。',
          '**步骤二：强制启用客户端 Fake-IP 模式并接管远程 DNS。** 机场的 DNS 媒体解锁必须在“DNS 解析发生于机场落地服务器内部”时才能生效。务必在客户端开启 `Fake-IP` 模式，并在浏览器设置中关闭自定义安全 DNS（DoH）。',
          '**步骤三：移动端 App 必须开启 TUN 虚拟网卡并拦截 UDP 443 (QUIC)。** 手机端的 ChatGPT、TikTok 与 Netflix App 常绕过系统代理直接发送 UDP 探测包。在手机上务必开启 Shadowrocket 或 FlClash 的全局 TUN 模式，并拦截 `UDP 443` 迫使其回退至受控 TCP 通道。',
          '**步骤四：彻底关闭本地网络与代理客户端的 IPv6 支持。** 避免本地运营商 IPv6 直连或未解锁的机房 IPv6 暴露，导致 Netflix 降级为“仅自制剧”。',
          '**步骤五：排查 Google Gemini “送中”并锁定无国家重定向入口。** 浏览器访问 `https://www.google.com/ncr`，滚动到底部查看显示国家；若显示中国或香港，立即切换同地区其他序号节点并清理 Cookie。',
          '**步骤六：针对 Claude 与 TikTok 严守“一号一固定地区 IP”原则。** 严禁在几分钟内跨国切换不同国家的节点登录同一 Claude 账号，务必为其绑定单一固定的美西或日本原生节点。'
        ]
      }
    ]
  },

  chapter5: {
    id: 'client-and-dns',
    badge: 'CHAPTER 05 · CLIENT KERNEL & DNS',
    title: '五、客户端内核（Mihomo / sing-box）、TUN 模式与 DNS 防泄漏配置规范',
    intro: '即便购买了顶级的 IEPL/IPLC 专线机场，如果本地电脑或手机仍运行着早已停更的旧版客户端，不仅无法解析最新的 VLESS 协议，还可能因为 DNS 抢答或不当的流量倍率配置导致网页卡顿与套餐流量耗尽。本章结合本站 [第三方代理客户端下载库](/clients) 梳理核心配置规范。',
    subsections: [
      {
        id: 'client-kernel-evolution',
        title: '5.1 淘汰旧版 CFW，全面转向 Mihomo (Clash Meta) 与 sing-box 内核',
        paragraphs: [
          '自原版 Clash Premium 与 Clash for Windows（CFW）停更后，开源代理生态已全面演进至 **Mihomo（原名 Clash.Meta）**与 **sing-box** 双核心。旧版内核最大的缺陷是**完全不支持 VLESS 协议、不支持 XTLS-Reality 与 Hysteria 2，且不支持 Shadowsocks 2022 加密套件**。若将光速云、微风网络、大佬云、二猫云或一翻云的订阅导入旧软件，常会出现节点列表为空或报错。',
          '2026 年各平台黄金客户端组合为：**Windows / macOS / Linux 桌面端**首选基于 Mihomo 内核的 **[Clash Verge Rev](/clients)**（详细的安装、服务模式授权与防泄漏配置见 [Clash Verge Rev 从零上手图文教程](/blog/clash-verge-rev-setup-tutorial)）、**FlClash** 或 **v2rayN**；**Android 端**首选 **v2rayNG**、**FlClash** 或 **Hiddify**；**iOS / iPadOS 端**首选 **Shadowrocket（小火箭）** 或 **Stash**。'
        ]
      },
      {
        id: 'client-tun-vs-system-proxy',
        title: '5.2 系统代理（System Proxy）与虚拟网卡（TUN 模式）的适用边界',
        paragraphs: [
          '**系统代理（System Proxy）**工作在应用层：开启后修改操作系统的 HTTP/SOCKS5 代理端口，Chrome、Edge 浏览器及 Telegram 等遵守系统规范的软件会自动走代理，而国内网银、微信传文件与局域网共享完全不受干扰，**适合 90% 的日常网页浏览、看视频与网页版 AI 办公场景**。',
          '**TUN 模式（虚拟网卡模式）**工作在网络层（IP 层）：开启后会创建虚拟网卡并修改路由表，将本机所有进程的 TCP/UDP 流量全部吸入代理内核分流。**何时开启 TUN？** 当使用的软件无视系统代理（如终端 `git`/`npm` 命令、Cursor IDE 底层插件、Docker、外服端游或手机 App）时点亮 TUN 开关；日常仅用浏览器时常驻开启「系统代理」即可。'
        ]
      },
      {
        id: 'client-dns-fakeip-and-multiplier',
        title: '5.3 Fake-IP 防泄漏架构与节点流量倍率避坑指南',
        paragraphs: [
          '在客户端 DNS 策略中，强烈建议启用 **Fake-IP 模式**。当浏览器请求解析海外域名时，本地内核在 1 毫秒内直接返回 `198.18.0.1/16` 虚拟 IP 立即建立连接，并将原始域名加密发往海外落地机解析，不仅彻底杜绝本地 DNS 污染、将网页首字响应时间缩短 30% 以上，更是触发机场服务端 DNS 媒体解锁的必要前提。同时务必留意节点名称后的倍率标识（如 `1x`、`2x`），优先选用光速云（极速版全节点 ×1 倍率）、星岛梦、唯兔云等 1 倍率透明计费品牌，并将国内网盘与 BT 下载软件严格固定在 `DIRECT（直连）` 规则下。关于如何结合自身月度预算与流量习惯挑选套餐，可进一步延伸阅读本站的 [2026 机场选购避坑全景指南](/blog/2026-clash-airport-selection-guide)。'
        ]
      }
    ]
  },

  chapter10: {
    id: 'data-sources',
    badge: 'CHAPTER 10 · METHODOLOGY & DATA GAPS',
    title: '十、数据来源、测试方法与待核实资料缺口说明',
    intro: '为确保本指南所有参数、价格、延迟吞吐与解锁结论具备可回溯的工程依据，特将本页引用的全部原始资料批次、测试环境边界以及当前尚未完全覆盖的资料缺口公开说明如下：',
    sources: [
      {
        title: '1. 42 家机场品牌参数与价格核验基准库（核实时间：2026-10-19）',
        detail: '来源于本站整理的《42家机场品牌清单》与《光速云品牌信息》一手核验档案。涵盖各品牌的成立年份、底层线路架构、支持协议、月付实价与年付折算、永久不限时套餐、设备限制及优惠券码。完整档案可在 [42 家机场品牌大全](/brands) 与 [2026 机场综合排行榜](/ranking) 中检索。'
      },
      {
        title: '2. 2026-08-11 批次 MAI-TEST-BOT 真实节点测速与流媒体解锁原图',
        detail: '来源于本站实验室于 2026-08-11 CST 下午 15:18–16:40 期间，使用 `MAI-TEST-BOT (v2.0.0-dev)` 对 16 家核心机场订阅进行的实测归档（1122×1402 无篡改 PNG 原图，另附 7 张专项流媒体与拓扑图）。所有原始高清截图均已在 [真实测速图库](/speedtest) 公开展示。'
      },
      {
        title: '3. 2026-10-19 非高峰三地（香港/新加坡/日本）延迟与吞吐采样',
        detail: '针对光速云、暮光加速、飞猫云、微风网络、星岛梦、二猫云、无忧链接、唯兔云、Firefly、U1S1、灵猫网络、一翻云、SOGO云、闪跃、全球云、隐形人等品牌，采集了香港（21–27ms / 477–548Mbps）、新加坡（42–46ms / 384–445Mbps）及日本（53–57ms / 316–398Mbps）的统一口径速度记录。'
      },
      {
        title: '4. 开源代理客户端与协议技术规范（核实时间：2026-11-07）',
        detail: '客户端兼容性与安装校验信息依据 Clash Verge Rev、Mihomo、v2rayN、v2rayNG、FlClash、Hiddify、sing-box 官方 GitHub Releases 仓库及 Apple App Store（Shadowrocket、Stash）公开文档核实。'
      }
    ],
    gaps: [
      {
        label: '待核实缺口 1：部分同构 5.6 元档及新晋品牌的独立单日测速截图',
        content: '本站收录的 42 家品牌中已有 16 家具备 2026-08-11 完整测速图、22+ 家具备 2026-10-19 实测吞吐或历史测试记录；但大佬云、闪电鼠、云界线、极点、云梯、天梯、星链、小牛等主打 ¥5.6/月同构套餐的品牌，以及速云梯、肥猫云、疾风云等补充收录品牌，目前仅完成官网价格与架构声明核验，尚缺独立单日测速截图，本页已如实标注“待补充独立单日截图”。'
      },
      {
        label: '待核实缺口 2：跨省份多运营商与高校校园网 24 小时连续抖动矩阵',
        content: '现有测速数据基于标准宽带抽样。由于国内不同省份运营商省际出口与校园网 UDP QoS 策略存在动态差异，本页在所有决策分支与转化卡片中均建议读者：优先使用各品牌的低门槛月付档（¥14.9–¥27/月）在本地网络验证后，再决定是否升级年付或永久套餐。'
      },
      {
        label: '待核实缺口 3：AI 与流媒体平台风控规则的实时动态漂移',
        content: 'ChatGPT、Claude、Gemini 及 Netflix、Disney+、TikTok 的机房 IP 封禁列表处于动态更新状态。本页解锁记录代表核验批次时的客观快照；对于标注“视节点而定”或“官方未作硬性承诺（如可信云）”的平台，实际使用中需配合第四章的客户端分流技巧动态切换。'
      }
    ]
  }
};

fs.writeFileSync('astroarabia/src/data/guide-content.json', JSON.stringify(guideData, null, 2));

const c = (o) => (JSON.stringify(o).match(/[\u4e00-\u9fa5]/g) || []).length;
const proseChars = c(guideData.directAnswer) + c(guideData.chapters) + c(guideData.decisionBranches) + c(guideData.faqs);
const tableChars = c(guideData.architectureComparisonTable) + c(guideData.protocolComparisonTable) + c(guideData.unlockMatrixTable) + c(guideData.brandMatrixTable);
const totalBodyChars = proseChars + tableChars;
console.log(`Prose-only Chinese chars: ${proseChars}`);
console.log(`Tables Chinese chars: ${tableChars}`);
console.log(`Total Effective Body Chinese chars (Prose + Tables): ${totalBodyChars}`);
