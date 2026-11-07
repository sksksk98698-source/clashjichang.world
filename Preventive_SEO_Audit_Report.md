# `clashjichang.world` 高级预防性 SEO 与 GEO 全站诊断审计报告 (`Preventive_SEO_Audit_Report.md`)

- **审计对象**：`https://clashjichang.world`（编译产物目录 `astroarabia/dist`，共 **58 个静态 HTML 页面** + `robots.txt` + `sitemap-index.xml` / `sitemap-0.xml`）
- **审计视角**：搜索引擎爬虫工程师（Googlebot / Bingbot）、反作弊与站群风控算法（SpamBrain / Helpful Content System / Structured Data Manual Action）、生成式引擎检索管线（Perplexity / SearchGPT / Google AI Overviews）
- **执行准则**：**只审计，不修改代码**；客观中立（无隐患项直接标 `PASS`）；100% 证据驱动（精确到路由、DOM 选择器与源码行号）。

---

## 1. 核心健康评分表 (0 - 100 分)

| 审计维度 | 权重 | 得分 (百分制) | 加权得分 | 核心诊断摘要 |
| :--- | :---: | :---: | :---: | :--- |
| **索引与抓取机制 (Crawl & Index)** | 25% | **92 / 100** | **23.00** | 全站 58 页均为纯静态 SSG 渲染，`robots.txt` 与 `sitemap-0.xml` 状态健康、0 死链；扣分点为 6 个品牌详情页存在 `href="#"` 空锚点，以及首页 Canonical 与 Sitemap 尾部斜杠微差。 |
| **站群风控与合规 (Risk Control)** | 25% | **78 / 100** | **19.50** | 350+ 处商业推广链接已 100% 覆盖 `rel="nofollow sponsored noopener"`，且无硬编码统计 ID 串联；扣分点为 4 个专题页底部转化卡片残留 6 处未与 `brands.json` 同步的占位外链域名，以及 42 个品牌详情页局部模块存在较高模板指纹。 |
| **内容深度与 GEO (Content & GEO)** | 20% | **80 / 100** | **16.00** | 7 大核心专题页（`/guide`、`/clients`、`/speedtest`、`/free`、`/tools`、`/warnings`、`/faq`）均达 10,600–15,700 汉字专著级深度；扣分点为 42 个 `/brands/[slug]` 页面正文字数偏薄（均值 1,041 字）且 3 篇 `/blog/*` 短文与核心专题页存在词库内部竞争。 |
| **E-E-A-T 与信任 (Trust & Citation)** | 15% | **76 / 100** | **11.40** | 17 张 `MAI-TEST-BOT` 原始测速图与参数披露构成了扎实的实证基础；扣分点为 `src/pages/brands/[slug].astro` 将“流媒体与 AI 解锁矩阵”硬编码为 42 家全绿 `✅ 支持`，与部分待核实品牌的数据口径矛盾。 |
| **Schema 与 SERP (Structured Data)** | 15% | **64 / 100** | **9.60** | 全站 58 页 Title/Description 100% 唯一、图片 `alt` 覆盖率 100%；致命扣分点为 42 个品牌页 JSON-LD 存在 `Offer.price` 正则拼接畸形天价（如 `"859147247"`）及正文中不可见的“隐藏评分 (`ratingValue`)”违规风险。 |
| **综合总分** | **100%** | — | **79.50 / 100** | **整体架构具备冲击核心排名的万字专著底座，但必须在上线/提交索引前修复 2 项 P0 级结构化数据与外链隐患。** |

---

## 2. 四大维度逐项审计明细

### 一、 爬虫抓取与索引预算审计 (Crawl & Index)

1. **Robots 与 XML Sitemap**：**`PASS`**
   - **核验结果**：`dist/robots.txt` 配置为 `User-agent: *` + `Allow: /` + `Sitemap: https://clashjichang.world/sitemap-index.xml`，未拦截任何 CSS/JS/图片静态资源。
   - **Sitemap 状态**：`dist/sitemap-0.xml` 共收录 **58 个规范 URL**，与 `dist` 编译出的 58 个静态页面 1:1 完全对应，无 404 死链、无 `noindex` 页面混入。
2. **规范化 (Canonical) 矩阵**：**`微小瑕疵 (🟡 P2)`**
   - **核验结果**：全站 58 个页面的 `<link rel="canonical" href="...">` 100% 使用正式 HTTPS 域名（`https://clashjichang.world/...`）并指向页面自身，不存在指向首页、HTTP 或测试域名的错误（参见 `src/layouts/BaseLayout.astro` 第 27–33 行）。
   - **异常证据**：首页 `dist/index.html` 的 Canonical 为 `https://clashjichang.world/`（带尾部斜杠），而 `dist/sitemap-0.xml` 中首页 `<loc>` 为 `https://clashjichang.world`（无尾部斜杠）。
3. **JS 渲染与 DOM 结构**：**`存在局部隐患 (⚠️ P1)`**
   - **SSR/SSG 核验 (`PASS`)**：全站采用 Astro `output: 'static'` 预渲染，所有万字正文、对比表格、FAQ 均直接输出在初始 HTML DOM 中，不依赖客户端 CSR 渲染，对 Googlebot 与 AI 爬虫极其友好。
   - **空锚点 `<a href="#">` 证据 (`⚠️ P1`)**：在 `src/pages/brands/[slug].astro` 第 472–479 行中，由于 `brands.json` 内有 6 家品牌（`fatcat`、`flyingbird`、`longmaoyun`、`qingyunti`、`sslar`、`tntcloud`）未配置 `affLink`，右侧悬浮转化卡生成了 `<a href="#" class="w-full rounded-xl bg-moss ...">前往 {brand.name} 官网 ↗</a>` 的无效空锚点。
4. **状态码异常 (Soft 404) 与内链死链**：**`PASS`**
   - **核验结果**：全站 58 个页面内部 `<a href="/...">` 链接经自动化脚本遍历验证，**0 死链（0 个 404 内部路径）**，无空白 Soft 404 页面。

---

### 二、 站群风控与架构隔离审计 (Risk Control)

1. **外链连坐防范 (`nofollow` / `sponsored`)**：**`存在高危隐患 (🚨 P0 & 🟡 P2)`**
   - **联盟推广外链属性 (`PASS`)**：全站所有指向机场注册面板的推广外链（共 350+ 处）均严格携带了 `rel="nofollow sponsored noopener"`。
   - **未同步占位外链域名 (`🚨 P0`)**：在 `src/data/freeHubData.ts`、`src/data/toolsHubData.ts`、`src/data/warningsHubData.ts` 与 `src/data/faqHubData.ts` 的底部转化卡片 `externalAction.href` 中，有 6 个外链未从 `brands.json` 读取真实 `affLink`，而是硬编码了占位域名：
     - `https://weifeng.cc/#/?code=772109`（`brands.json` 真实地址应为 `https://edp01.breezenetaff.com/#/?code=772109`）
     - `https://feimao.cc/#/?code=551209`（真实地址应为 `https://guangs.flycataff.com/#/register?code=551209`）
     - `https://ermaoyun.cc/#/?code=f9297942`（真实地址应为 `https://guangs.2maoyunaff.cc/#/register?code=f9297942`）
     - `https://yifanyun.vip/#/?code=448112`（真实地址应为 `https://guangs.1flyunaff.cc/#/register?code=448112`）
     - `https://muguang.cc/#/?code=889102`（真实地址应为 `https://varnexa.twilightaff.com/#/register?code=889102`）
     - `https://xingdaomeng.cc/#/?code=331902`（真实地址应为 `https://guangs.xingdaomeng.com/#/register?code=331902`）
   - **非商业外链未加 `nofollow` (`🟡 P2`)**：
     - 全站页脚 `src/components/SiteFooter.astro` 第 103–135 行包含指向 `chatgpt.com`、`claude.ai`、`www.perplexity.ai` 的 3 条动态 Prompt 链接（全站共 58 × 3 = 174 处），仅设置了 `rel="noopener noreferrer"`，未加 `nofollow`。
     - 3 篇博客内嵌的 `astro-social-share` 组件（`src/pages/blog/[...slug].astro` 第 105 行）生成了指向 `x.com`、`facebook.com`、`http://news.ycombinator.com`（非 HTTPS）等 24 处分享外链，均无 `nofollow`。
2. **代码与模板指纹**：**`存在局部隐患 (⚠️ P1)`**
   - 7 大万字专题页各自拥有高度定制化的交互式对比表、诊断树与章节结构（差异度极高，`PASS`）。
   - 但 42 个 `/brands/[slug]` 页面共享同一套 `src/pages/brands/[slug].astro` 骨架，其中第 310–354 行（解锁矩阵）、第 388–419 行（优缺点与适用人群）、第 58–71 行（3 条 FAQ）采用固定句式拼接品牌名与价格，DOM 树与文本骨架具有明显的**程序化模板指纹**。
3. **统计与追踪代码隔离**：**`PASS`**
   - `src/layouts/BaseLayout.astro` 第 25 行通过环境变量 `import.meta.env.PUBLIC_GA_ID` 动态注入统计代码，当前静态产物中无硬编码的共享 GA4 / 百度统计 / 联盟追踪 ID。

---

### 三、 内容质量与语义权威审计 (E-E-A-T & GEO)

1. **内容厚度 (Content Depth)**：**`两极分化 (⚠️ P1)`**
   - **核心枢纽页表现优异 (`PASS`)**：
     - `/guide`：`<main>` 纯汉字 **15,742 字**
     - `/clients`：`<main>` 纯汉字 **15,348 字**
     - `/speedtest`：`<main>` 纯汉字 **14,067 字**
     - `/faq`：`<main>` 纯汉字 **12,342 字**
     - `/free`：`<main>` 纯汉字 **12,073 字**
     - `/warnings`：`<main>` 纯汉字 **10,653 字**
     - `/tools`：`<main>` 纯汉字 **10,601 字**
   - **品牌详情页与旧博客偏薄 (`⚠️ P1`)**：
     - 42 个 `/brands/[slug]` 页面 `<main>` 纯汉字分布在 **840 至 1,270 字之间（均值 1,041 字）**，低于深度评测页 2,000 字的安全水位线，且占全站页面总数的 **72.4%（42/58）**，容易稀释整站 Helpful Content 权重。
     - `/blog` 下的 3 篇文章（`/blog/2026-clash-airport-selection-guide` 963 字、`/blog/clash-verge-rev-setup-tutorial` 767 字、`/blog/guangsu-cloud-in-depth-review` 909 字）篇幅不足千字，且分别与 `/guide`、`/clients`、`/brands/guangsu-cloud` 意图高度重合。
2. **关键词堆砌与内部竞争 (Keyword Cannibalization)**：**`存在隐患 (⚠️ P1)`**
   - 核心专题页关键词密度自然（无机械堆砌，`PASS`）。
   - 但 `/blog/2026-clash-airport-selection-guide` 与 `/guide` + `/ranking`、`/blog/clash-verge-rev-setup-tutorial` 与 `/clients`、`/blog/guangsu-cloud-in-depth-review` 与 `/brands/guangsu-cloud` 构成了典型的**同站同意图词库内耗**。
3. **GEO (生成式引擎优化) 友好度**：**`核心页 PASS / 品牌页需修正 (⚠️ P1)`**
   - 7 大万字专题页在首屏均部署了高信息密度的结论框、Markdown/HTML 原生 `<table>` 对比表以及 `<details>` 折叠式 FAQ，非常契合 Perplexity 与 SearchGPT 的 RAG 切片抓取。
   - **数据可信度冲突 (`⚠️ P1`)**：`src/pages/brands/[slug].astro` 第 310–354 行的“流媒体与 AI 解锁实测矩阵”对全部 42 家机场硬编码输出 `ChatGPT ✅ 支持`、`Claude AI ✅ 支持`、`Netflix ✅ 全解锁`、`Disney+ ✅ 全解锁`。然而 `brands.json` 中如 `可信云 (kexinyun)` 明确记载“未提供统一的流媒体解锁与 AI 可用性实测报告”，硬编码全绿标签会导致同页上下文自相矛盾，削弱 AI 引擎对站点事实核查（Fact-Check）的信任度。
4. **E-E-A-T 信任信号**：**`PASS`**
   - 全站页脚、排行榜、评测指南与风险预警页均显著披露了测试环境（`MAI-TEST-BOT 2.0.0-dev`）、评测周期、联盟推广利益声明（Affiliate Disclosure）及免责条款。

---

### 四、 结构化数据与社交展现审计 (Schema & SERP)

1. **JSON-LD 语法与逻辑**：**`发现致命红线 (🚨 P0)`**
   - **致命漏洞 1：`Offer.price` 正则表达式将整句数字拼接为数亿元天价**
     - **证据位置**：`src/pages/brands/[slug].astro` 第 40 行使用了 `price: brand.priceStr.replace(/[^0-9.]/g, '') || '15'`。
     - **编译产物实证**：
       - 在 `/brands/guangsu-cloud`（光速云）中，`priceStr` 为 `"年付折合约 ¥8/月 (59GB) | 永久版 ¥147 (247GB)"`，编译后的 JSON-LD 输出了 `"price": "859147247"`（8.59 亿元人民币）！
       - 在 `/brands/feiniaoyun`（飞鸟云）中，`priceStr` 为 `"15元 100G/月 | 年付 150元 100G/月"`，编译后的 JSON-LD 输出了 `"price": "15100150100"`（151 亿元人民币）！
       - 全站 42 个品牌页中有多个页面因 `priceStr` 含流量或年付数字而生成了完全失真的 `Offer.price`。
   - **致命漏洞 2：JSON-LD 包含正文中不可见的“隐藏评分 (`reviewRating`)”**
     - **证据位置**：`src/pages/brands/[slug].astro` 第 44–55 行向 42 个品牌页注入了 `reviewRating: { ratingValue: brand.rank <= 3 ? '4.9' : brand.rank <= 10 ? '4.7' : '4.4', bestRating: '5' }`。
     - **违规机制**：该 `4.9 / 4.7 / 4.4` 评分数值在页面的可见 HTML DOM 中**完全不存在**。根据 Google Search Central《Review Snippet 结构化数据指南》，在 JSON-LD 中标记用户不可见的评分属于严重的 **Hidden Structured Data Markup（隐藏结构化数据欺诈）**，极易触发 Google 结构化数据人工惩罚（Manual Action）。
2. **标题与描述唯一性**：**`PASS`**
   - 经自动化脚本全量比对 58 个页面的 `<title>` 与 `<meta name="description">`，**重复率为 0%**，长度与核心词布局合理。
3. **图片 SEO (`alt` 属性与懒加载)**：**`PASS`**
   - 全站 58 个页面中的所有 `<img>` 标签 **100% 包含非空且具备业务语义的 `alt` 属性**（缺失率为 0），测速图与解锁图均配置了 `loading="lazy"`。

---

## 3. 漏洞与降权风险清单 (按优先级排序)

### 🚨 P0 (致命红线 - 立即修复)

#### [P0-1] 42 个品牌详情页 JSON-LD `Offer.price` 数字拼接畸形 & 隐藏 `reviewRating` 评分标记
- **具体位置**：`astroarabia/src/pages/brands/[slug].astro` 第 28–56 行（影响全部 42 个 `/brands/*` 页面，如 `/brands/guangsu-cloud`、`/brands/feiniaoyun` 等）。
- **问题代码特征**：
  ```javascript
  offers: {
    '@type': 'Offer',
    priceCurrency: 'CNY',
    price: brand.priceStr.replace(/[^0-9.]/g, '') || '15', // 错误：把 "¥8/月 (59GB) | 永久版 ¥147 (247GB)" 拼成 "859147247"
  },
  review: {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: brand.rank <= 3 ? '4.9' : brand.rank <= 10 ? '4.7' : '4.4', // 页面可见 DOM 中未展示该评分
      bestRating: '5'
    }
  }
  ```
- **对搜索引擎/风控的负面影响**：触发 Google Search Console 的 **Merchant Listings / Product Snippet 无效价格报错** 与 **Spammy Structured Markup（结构化数据作弊人工或算法惩罚）**，导致全站丧失富媒体摘要（Rich Snippets）展示资格。
- **具体修复方案**：
  1. 提取首个金额数字作为 `price`（如使用正则 `brand.priceStr.match(/\d+(\.\d+)?/)?.[0] || '15'`，确保光速云输出 `"8"`、飞鸟云输出 `"15"`）。
  2. 在品牌详情页首屏可见 DOM 中明确渲染对应的综合评分徽章（如 `综合实测评分：4.9 / 5.0`），做到 JSON-LD 与可见正文 100% 一致。

#### [P0-2] 4 大新专题页底部转化卡片存在 6 处未同步 `brands.json` 的占位外链域名
- **具体位置**：
  - `astroarabia/src/data/freeHubData.ts` 第 326–342 行（`weifeng.cc`、`feimao.cc`）
  - `astroarabia/src/data/toolsHubData.ts` 第 334–350 行（`ermaoyun.cc`、`yifanyun.vip`）
  - `astroarabia/src/data/warningsHubData.ts` 第 314–330 行（`muguang.cc`、`xingdaomeng.cc`）
  - `astroarabia/src/data/faqHubData.ts` 第 315 行（`feimao.cc`）
- **对搜索引擎/风控的负面影响**：虽然带有 `rel="nofollow sponsored noopener"`，但指向未经核实的短域名存在无法访问、跳转到无关停放页（Parked Domain）或恶意站点的高危风险，既造成转化流失，又可能触发 Google Safe Browsing 外链信任降级。
- **具体修复方案**：将上述 4 个数据文件中的 `externalAction.href` 统一替换为 `brands.json` 中的官方推广链接（`https://edp01.breezenetaff.com/#/?code=772109`、`https://guangs.flycataff.com/#/register?code=551209`、`https://guangs.2maoyunaff.cc/#/register?code=f9297942`、`https://guangs.1flyunaff.cc/#/register?code=448112`、`https://varnexa.twilightaff.com/#/register?code=889102`、`https://guangs.xingdaomeng.com/#/register?code=331902`）。

---

### ⚠️ P1 (高危隐患 - 本周修复)

#### [P1-1] 42 个 `/brands/[slug]` 页面存在局部模板指纹、解锁矩阵硬编码失真与字数偏薄（均值 1,041 字）
- **具体位置**：`astroarabia/src/pages/brands/[slug].astro` 第 310–420 行。
- **对搜索引擎/风控的负面影响**：
  1. 占全站 72.4% 页面数量的 `/brands/[slug]` 正文字数约 1,041 字，且“流媒体与 AI 解锁矩阵”在 42 个页面上 100% 静态硬编码为完全相同的 6 张绿/黄卡片，容易被 Google Helpful Content System 识别为程序化批量生成的同质化页面（Programmatic Thin Content）。
  2. 对未完成流媒体核验或低价公网品牌同样展示“Netflix ✅ 全解锁 / Claude AI ✅ 支持”，损害 E-E-A-T 事实严谨性。
- **具体修复方案**：
  1. 将解锁矩阵改为基于 `brand.lineType`、`brand.tier`、`brand.speedtestImg` 与 `brand.priceStr` 的**动态差异化评估逻辑**（例如：有专线与实测图的 T1/T2 品牌显示“✅ 原生/DNS 解锁”；低价/待核实品牌显示“⚠️ 视节点而定 / 待补充实测”）。
  2. 根据每个品牌的排名梯队、线路类型（IEPL/IPLC/BGP中转/直连）、价格区间与节点分布，动态扩展差异化的深度评测段落（如套餐性价比拆解、晚高峰 QoS 表现推演、同梯队横向对比表），将单页有效正文字数提升至 **2,000–2,500 字以上**。

#### [P1-2] 6 个无推广链接的品牌详情页渲染了无效 `<a href="#">` 空锚点按钮
- **具体位置**：`astroarabia/src/pages/brands/[slug].astro` 第 472–479 行，影响 `/brands/fatcat`、`/brands/flyingbird`、`/brands/longmaoyun`、`/brands/qingyunti`、`/brands/sslar`、`/brands/tntcloud` 共 6 个页面。
- **对搜索引擎/风控的负面影响**：爬虫与用户体验信号（Navboost / CWV 交互）会将主 CTA 按钮指向 `href="#"` 判定为残缺页面或诱导点击无效元素。
- **具体修复方案**：当 `brand.affLink` 为空时，不渲染 `href="#"`，改为渲染指向站内 `/ranking` 或 `/brands/guangsu-cloud` 的实测替代推荐入口（或渲染为非链接状态的说明徽章“暂未开放直达通道 · 查看同梯队实测榜”）。

#### [P1-3] `/blog/*` 3 篇短文（767–963 字）与万字核心专题页产生关键词内部竞争 (Cannibalization)
- **具体位置**：
  - `/blog/2026-clash-airport-selection-guide`（963 字，与 15,742 字的 `/guide` 及 `/ranking` 冲突）
  - `/blog/clash-verge-rev-setup-tutorial`（767 字，与 15,348 字的 `/clients` 冲突）
  - `/blog/guangsu-cloud-in-depth-review`（909 字，与 `/brands/guangsu-cloud` 冲突）
- **对搜索引擎/风控的负面影响**：短篇博客分散了万字核心专题页的内部锚文本权重，且在目标关键词下可能出现低字数博客抢占高转化专题页排名的内耗现象。
- **具体修复方案**：重构这 3 篇博客的长尾切入角度（避免与核心专题页正面对撞主词），或在博客正文首屏增加强引导内链指向对应的万字专题页（`/guide`、`/clients`、`/brands/guangsu-cloud`），并扩充博客自身的差异化实操内容。

---

### 🟡 P2 (优化机会 - 规划修复)

#### [P2-1] 页脚 AI 检索外链与博客社交分享外链未添加 `rel="nofollow"`（含 1 处 `http://` 链接）
- **具体位置**：
  - `astroarabia/src/components/SiteFooter.astro` 第 103–135 行（`chatgpt.com`、`claude.ai`、`www.perplexity.ai`）
  - `astroarabia/src/pages/blog/[...slug].astro` 第 105 行（`SocialShare` 组件生成的社交外链，其中 HackerNews 为 `http://news.ycombinator.com`）
- **对搜索引擎/风控的负面影响**：全站页脚重复 58 次向第三方带参数 URL 传递权重会造成不必要的 PageRank 稀释；`http://` 外链在全 HTTPS 站点中不够规范。
- **具体修复方案**：为页脚 3 个 AI 检索链接补充 `rel="nofollow noopener noreferrer"`；将博客底部的第三方 `SocialShare` 组件替换为轻量级原生分享或复制链接组件（或统一加 `nofollow` 并修正为 `https://`）。

#### [P2-2] 首页 Canonical 与 Sitemap 根路径尾部斜杠格式微差
- **具体位置**：`astroarabia/astro.config.mjs` 与 `astroarabia/src/layouts/BaseLayout.astro` 第 27–33 行。
- **具体修复方案**：统一全站 URL 规范化函数，确保首页与子页面的 Canonical、OpenGraph `og:url`、JSON-LD `url` 与 `sitemap-0.xml` 的尾部斜杠策略 100% 对齐。

---

## 4. 终极改造行动 SOP (Top 5 - 按投入产出比 ROI 排序)

1. **【ROI #1 · 10分钟见效】修复 `src/pages/brands/[slug].astro` 的 JSON-LD 价格拼接 Bug 与隐藏评分（消除 P0-1 人工惩罚风险）**
   - 将 `brand.priceStr.replace(/[^0-9.]/g, '')` 改为精准提取起步单价数值，并在品牌页首屏可见区域同步渲染综合评分徽章，彻底消除 Google 结构化数据违规红线。
2. **【ROI #2 · 10分钟见效】同步 4 大万字专题页转化卡片的 6 条真实联盟推广链接（消除 P0-2 外链异常与转化流失）**
   - 对齐 `freeHubData.ts`、`toolsHubData.ts`、`warningsHubData.ts`、`faqHubData.ts` 中的 6 个占位域名与 `brands.json` 真实 `affLink`，立即挽回高意向专题页的商业转化率。
3. **【ROI #3 · 15分钟见效】消除 6 个无推广链接品牌页的 `href="#"` 空锚点（消除 P1-2 抓取与交互瑕疵）**
   - 在 `src/pages/brands/[slug].astro` 第 472–479 行中增加条件判断：无 `affLink` 的品牌自动引导至 `/ranking` 实测榜或主力推荐品牌，实现全站 0 空锚点。
4. **【ROI #4 · 核心权重跃升】重构 `src/pages/brands/[slug].astro` 的动态解锁矩阵与差异化深度内容（解决 P1-1 薄内容与模板指纹）**
   - 废除 42 页千篇一律的全绿解锁硬编码，改为按品牌实测数据、线路架构（专线 vs 公网中转）和梯队动态生成解锁状态、同梯队横向对比表与深度避坑评估，将 42 个品牌页全部升级至高差异度、高信息增量的深度评测页。
5. **【ROI #5 · 权重收拢与防泄漏】为页脚 AI 外链补充 `nofollow`、移除博客非 HTTPS 分享组件并强化博客向万字专题页的权重输送（解决 P1-3 & P2-1）**
   - 收紧全站页脚与博客的出站链接权重泄漏，将 `/blog/*` 打造为向 `/guide`、`/clients`、`/speedtest` 输送精准内链权重的长尾护城河。
