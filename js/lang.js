// lang.js — 中英文切换 (Bilingual switcher)
// 默认英文 (en)，点击按钮切换为中文 (zh)，用 localStorage 记忆选择。

(function () {
  "use strict";

  // 英文原文 -> 中文译文 字典
  const EN_TO_ZH = {
  "Click to expand and flip cards for methodologies & key findings.": "点击卡片展开并翻面，查看研究方法与关键发现。",
  "Python (XGBoost)": "Python（XGBoost）",
  "Forecasted sector-level demand on 5k+ records to capture nonlinear market dynamics.": "在 5000+ 条记录上预测行业层面的需求，捕捉非线性的市场动态。",
  "Mitigated model overfitting using Ridge/Lasso regularization, optimizing pipelines for robust forecasting.": "用 Ridge/Lasso 正则化缓解模型过拟合，优化流程以实现稳健的预测。",
  "R / OLS": "R / OLS",
  "Analyzed digital purchasing behaviors using R, applying OLS models and bootstrap simulations (1k+ iterations).": "用 R 分析数字消费行为，运用 OLS 模型和自助法模拟（1000+ 次迭代）。",
  "Translated raw survey data into actionable insights, identifying key metrics driving user engagement.": "把原始问卷数据转化为可落地的洞察，找出驱动用户参与的关键指标。",
  "AI/VR Product Ecosystems": "AI/VR 产品生态",
  "Designed B2B governance for a VR/AI ecosystem, mapping scalable enterprise revenue models and privacy policies.": "为 VR/AI 生态设计 B2B 治理方案，梳理可扩展的企业营收模式与隐私政策。",
  "Guten Tag · Olá · Привет · Namaste · Shalom · Welcome · Guten Tag · Olá · Привет · Namaste · Shalom · Welcome": "你好 · Olá · Привет · Namaste · Shalom · 欢迎 · 你好 · Olá · Привет · Namaste · Shalom · 欢迎",
  "Experience · Journeys · Poetry · CV · Projects · Designs · Experience · Journeys · Poetry · CV · Projects · Designs": "工作经历 · 旅行 · 诗歌 · 简历 · 项目 · 设计 · 工作经历 · 旅行 · 诗歌 · 简历 · 项目 · 设计",
  "Applied Economics and Management @ Cornell": "康奈尔大学 应用经济与管理",
  "Focusing on market analysis and financial modeling within the Investment Banking Division.": "专注于投行部门的市场分析与金融建模。",
  "Explore the evolution of my work. Discover new features, update logs, and download the latest versions of my apps.": "看看我的作品是怎么一步步成长的。这里有新功能、更新日志，也能下载我应用的最新版本。",
  "Click to expand cards for detailed coursework and academic focus.": "点击卡片，展开查看详细课程与研究方向。",
  "Python for Business Analytics • R Programming & Data Viz • Data Mining & Machine Learning • Design & Bldg. AI Solutions • Business Data Analysis w/ SQL • Risk Simulation & Monte Carlo": "商业分析 Python • R 语言与数据可视化 • 数据挖掘与机器学习 • AI 方案设计与搭建 • SQL 商业数据分析 • 风险模拟与蒙特卡洛",
  "Predictive Analytics for Strategy • Digital Business Strategy • Project Management • MPS Research Seminar • Management Communications • Global Citizenship": "战略预测分析 • 数字商业战略 • 项目管理 • MPS 研究研讨课 • 管理沟通 • 全球公民素养",
  "Economics & Business w/ East European Studies": "经济与商业（东欧研究方向）",
  "Conducted strategic ecosystem analysis to align technical features with institutional needs.": "做了战略生态分析，让技术功能更贴合机构的实际需求。",
  "Built multivariable pricing models via OLS regression, evaluating product attributes for price elasticity.": "用 OLS 回归搭建多变量定价模型，评估产品属性对价格弹性的影响。",
  "Diagnosed and resolved data irregularities (heteroskedasticity/multicollinearity) using AIC/BIC criteria.": "借助 AIC/BIC 准则诊断并解决了数据异常（异方差/多重共线性）。",
  "Quantified risk calculating Macaulay duration/convexity effects, evaluating NPV/IRR viability.": "通过计算麦考利久期与凸性效应量化风险，评估 NPV/IRR 的可行性。",
  "Modeled interest rate sensitivities to assess asset valuation stability and manage quantitative risk.": "对利率敏感性建模，评估资产估值的稳定性并管理量化风险。",
  "VAR Model": "VAR 模型",
  "Modeled dynamic market responses to policy shocks using a Vector Autoregression (VAR) framework.": "用向量自回归（VAR）框架，对市场面对政策冲击的动态反应进行建模。",
  "Processed macroeconomic time-series data to evaluate the quantitative impact of structural tools on industrial output.": "处理宏观经济时间序列数据，量化评估结构性工具对工业产出的影响。",
  "Evaluated AI agent efficiency vs search engines via interviews, applying thematic coding to user data.": "通过访谈对比 AI 智能体与搜索引擎的效率，并对用户数据做主题编码分析。",
  "Synthesized qualitative feedback to identify problem-solving bottlenecks, delivering actionable UX metrics.": "汇总定性反馈，找出解决问题的瓶颈，并给出可落地的用户体验指标。",
  "Solow Model": "索洛模型",
  "Analyzed cross-country capital accumulation using datasets and the Solow growth model.": "结合数据集与索洛增长模型，分析了不同国家的资本积累。",
  "Evaluated the impact of historical economic shocks on long-term GDP trajectories and market resilience.": "评估了历史经济冲击对长期 GDP 走势和市场韧性的影响。",
  "R (Tidyverse)": "R（Tidyverse）",
  "Analyzed market shock impacts on corporate valuations using R and USD-adjusted financial datasets.": "用 R 和经美元调整的金融数据集，分析了市场冲击对企业估值的影响。",
  "Developed executive-level data visualizations via ggplot2 to translate complex ESG metrics into strategic insights.": "用 ggplot2 制作面向高管的数据可视化，把复杂的 ESG 指标转化为战略洞察。",
  "JOURNEY": "旅行",
  "POETRY": "诗歌",
  "Micro/Macroeconomics • Applied Econometrics • Financial Management • International Trade • Economics of Innovation • Labour Economics": "微观/宏观经济学 • 应用计量经济学 • 财务管理 • 国际贸易 • 创新经济学 • 劳动经济学",
  "Advanced Calculus and Linear Algebra • Statistical Methods • Engineering Mathematics in Finance • Applied Game Theory for Economics and Business": "高等微积分与线性代数 • 统计方法 • 金融工程数学 • 经济与商业应用博弈论",
  "I don’t believe much in": "我不太相信所谓的",
  "Every decision we make is the most honest choice we could offer at that moment — shaped by who we were, what we knew, and what we were capable of then.": "我们做的每一个决定，都是当下能给出的最真诚的选择——它由那时的我们、我们所知道的、以及我们当时所能做到的一切共同塑造。",
  "If given the same moment again, I believe I would still choose the same path. And if that is true, what is there to regret?": "如果再回到同样的时刻，我相信自己依然会走同样的路。既然如此，又有什么好后悔的呢？",
  "For many years, I lived with": "有很多年，我一直与",
  "— the kind that makes breathing feel difficult, as if air itself must be earned.": "——那种让呼吸都变得艰难的感觉，仿佛连空气都要靠自己去争取。",
  "It took nearly ten years to understand it, live with it, and eventually overcome it.": "我花了将近十年，去理解它、与它共处，并最终战胜它。",
  "I don’t see that time as something lost. It taught me patience, attention, and respect for quiet moments.": "我不觉得那段时光是白白浪费的。它教会了我耐心、专注，以及对安静时刻的珍惜。",
  "Today, I move forward without urgency, only with a clearer sense of presence, and gratitude for being able to breathe again.": "如今我不再急于赶路，只是带着更清晰的当下感，以及能重新自在呼吸的感恩，继续向前。",
  "🇺🇸United States": "🇺🇸美国",
  "🇬🇧United Kingdom": "🇬🇧英国",
  "🇫🇷France": "🇫🇷法国",
  "🇩🇪Germany": "🇩🇪德国",
  "🇮🇹Italy": "🇮🇹意大利",
  "🇨🇭Switzerland": "🇨🇭瑞士",
  "🇳🇴Norway": "🇳🇴挪威",
  "🇹🇷Turkey": "🇹🇷土耳其",
  "🇦🇪UAE": "🇦🇪阿联酋",
  "🇨🇳China": "🇨🇳中国",
  "🇹🇭Thailand": "🇹🇭泰国",
  "🇲🇾Malaysia": "🇲🇾马来西亚",
  "🇸🇬Singapore": "🇸🇬新加坡",
  "🇮🇩Indonesia": "🇮🇩印度尼西亚",
  "🇲🇻Maldives": "🇲🇻马尔代夫",
  "🇦🇺Australia": "🇦🇺澳大利亚",
  "An intelligent browser assistant powered by any API or local LLM that seamlessly translates your text instructions into automated web actions.": "一款智能浏览器助手，可由任意 API 或本地大模型驱动，能把你的文字指令丝滑地转化为自动化的网页操作。",
  "🌍 Global / Credit Card": "🌍 全球 / 信用卡",
  "About": "关于我",
  "Experience": "工作经历",
  "Releases": "软件发布",
  "Education": "教育背景",
  "Projects": "项目",
  "Skills": "技能",
  "Journey & Poetry": "旅行与诗",
  "GitHub": "GitHub",
  "Sponsor": "赞助支持",
  "Home": "首页",
  "Back to Home": "返回首页",
  "← Back to Home": "← 返回首页",
  "← Home": "← 首页",
  "Close": "关闭",
  "Exit": "退出",
  "Light": "浅色",
  "Dark": "深色",
  "Auto": "自动",
  "Learn more →": "了解更多 →",
  "Copyright": "版权所有",
  ". All rights reserved.": "。保留所有权利。",
  "HANG LIN": "林航",
  "Hang Lin": "林航",
  "Say Hello 👋": "打个招呼 👋",
  "Say Hello": "打个招呼",
  "A little about me": "认识一下我",
  "How I Think": "我的思考方式",
  "My approach to analysis and decision-making.": "我做分析与决策的方式。",
  "Professional Experience": "职业经历",
  "Insights from my career journey and industry impact.": "我的职业历程与行业洞察。",
  "Latest Milestone": "最新动态",
  "Investment Banking Intern at": "投行实习生 @",
  "CITIC Securities": "中信证券",
  "Software & Apps": "软件与应用",
  "Innovation, Delivered.": "把创意，做成产品。",
  "View releases →": "查看发布 →",
  "Master of Professional Studies": "专业研究硕士",
  "Cornell University": "康奈尔大学",
  "Applied Economics and Management": "应用经济与管理",
  "Ithaca, NY": "纽约州伊萨卡",
  "Core Coursework": "核心课程",
  "Data Science & AI:": "数据科学与AI：",
  "Strategy & Management:": "战略与管理：",
  "Bachelor of Arts": "文学学士",
  "University College London": "伦敦大学学院",
  "London, UK": "英国伦敦",
  "Economics & Finance:": "经济与金融：",
  "Quantitative Methods:": "量化方法：",
  "Research & Projects": "研究与项目",
  "Data Mining": "数据挖掘",
  "Demand Forecasting": "需求预测",
  "Key Findings": "核心发现",
  "Model:": "模型：",
  "Optimization:": "优化：",
  "Applied Analytics": "应用分析",
  "Digital Behavior Insights": "数字行为洞察",
  "Analysis:": "分析：",
  "Impact:": "成效：",
  "Digital Strategy": "数字战略",
  "Strategy": "战略",
  "Design:": "设计：",
  "Execution:": "执行：",
  "Econometrics": "计量经济学",
  "Pricing Determinants": "定价影响因素",
  "Diagnostics": "诊断分析",
  "Cleaning:": "数据清洗：",
  "Corporate Finance": "公司金融",
  "Financial Risk Valuation": "金融风险估值",
  "Modeling": "建模",
  "Metrics:": "指标：",
  "Sensitivity:": "敏感性：",
  "Macroeconomics": "宏观经济学",
  "Policy Response Analysis": "政策反应分析",
  "Framework:": "框架：",
  "Qualitative Research": "定性研究",
  "UX & AI Efficiency Analysis": "用户体验与AI效率分析",
  "Interviews": "访谈",
  "Synthesis:": "归纳：",
  "Economic Modeling": "经济建模",
  "Cross-Country Capital": "跨国资本流动",
  "Tracking:": "追踪：",
  "Evaluation:": "评估：",
  "Business Analytics": "商业分析",
  "ESG & Corporate Analytics": "ESG与企业分析",
  "Reporting:": "报告：",
  "Professional Toolkit": "专业工具箱",
  "Notes from Living": "生活随笔",
  "Footprints &": "足迹与",
  "Reflections": "思考",
  "Toward the Horizon.": "向着远方。",
  "Explore My Travels →": "探索我的旅程 →",
  "Stars &": "繁星与",
  "The Sea": "大海",
  "The world reveals itself slowly. So do we.": "世界慢慢展开，我们也是。",
  "Read My Work →": "阅读作品 →",
  "MESSAGE ME": "给我留言",
  "Unlock a Message": "解锁一条消息",
  "Enter Secret Code →": "输入暗号 →",
  "Connect with me": "与我联系",
  "LinkedIn": "领英",
  "Professional Profile": "职业主页",
  "Projects & Code": "项目与代码",
  "Instagram": "Instagram",
  "Life & Moments": "生活点滴",
  "Email": "邮箱",
  "regret": "后悔",
  "From Struggle to": "从挣扎到",
  "Strength": "坚强",
  "anxiety": "焦虑",
  "Breathe": "自在",
  "Freely": "呼吸",
  "Secret Box": "秘密信箱",
  "请输入你的名字以开始": "请输入你的名字以开始",
  "Next": "下一步",
  "Hello,": "你好，",
  "Unlock Message": "解锁消息",
  "Unlocked": "已解锁",
  "Leave a reply back to me:": "给我回个话：",
  "Send Reply": "发送回复",
  "Global Journey": "环球旅程",
  "Explore my footprints.": "探索我的足迹。",
  "Orange": "橙色",
  "indicates visited regions.": "标记我去过的地方。",
  "Quick Access": "快速跳转",
  "Explore the evolution of my work. Every release brings new features, refined performance, and a better experience.": "见证我作品的成长。每次更新都带来新功能、更顺畅的性能和更好的体验。",
  "Latest Release": "最新版本",
  "Previous Release": "往期版本",
  "FestiScout: Travel the World, One Festival at a Time": "节伴行 FestiScout：跟着全世界的节日去旅行",
  "A world festival calendar for iPhone. Spin a globe that zooms seamlessly down to street level, discover festivals across six continents, plan day-by-day routes, and book in one tap. Designed, built, and maintained independently.": "一本装进 iPhone 的世界节日旅行日历。转动地球、无缝放大到街道，发现六大洲正在发生的节日，逐日规划路线，一键跳转预订。由个人独立设计、开发与维护。",
  "Download on the App Store": "在 App Store 下载",
  "Version 1.0: The Beginning": "1.0 版本：一切的开始",
  "Windows Download v1.0": "Windows 下载 v1.0",
  "Mac Download v1.0": "Mac 下载 v1.0",
  "Buy me a coffee ☕️": "请我喝杯咖啡 ☕️",
  "If you enjoy my work, consider supporting me. Your tip fuels my late-night coding and next journey!": "如果你喜欢我的作品，欢迎支持我。你的心意，是我深夜敲代码和下一段旅程的动力！",
  "WeChat Pay": "微信支付",
  "Alipay": "支付宝",
  "Scan with WeChat to support": "用微信扫码支持",

  /* ========== pro_exp.html 职业经历页 ========== */

  /* — 分类标题 — */
  "Equity Capital Markets & Investment Banking": "股权资本市场与投资银行",
  "Investment Research & Consulting": "投资研究与咨询",
  "Strategy, Audit & Business Analytics": "战略、审计与商业分析",
  "Client Relations & Wealth Management": "客户关系与财富管理",

  /* — 职位标题 — */
  "Investment Banking Analyst Intern — Huatai Securities (ECM, Hong Kong Team)": "投资银行分析师实习生 — 华泰证券（股权资本市场部 · 香港团队）",
  "Investment Banking Intern — CITIC Securities (ECM)": "投资银行实习生 — 中信证券（股权资本市场部）",
  "Investment Banking Intern — CSC Financial (China Securities)": "投资银行实习生 — 中信建投证券",
  "Investment Consulting Intern — China Merchants Futures": "投资咨询实习生 — 招商期货",
  "Industry Research Intern — China Merchants Futures": "行业研究实习生 — 招商期货",
  "Strategy Intern — PwC (PricewaterhouseCoopers)": "战略咨询实习生 — 普华永道",
  "Audit Intern — BDO China (Lixin CPAs)": "审计实习生 — 立信会计师事务所（BDO 中国）",
  "Business Operations Intern — OnePlus Management": "商业运营实习生 — OnePlus Management",
  "Client Relations Intern — Industrial Securities Co., Ltd.": "客户关系实习生 — 兴业证券股份有限公司",

  /* — 地点 / 办公方式 — */
  "Hong Kong SAR & Shanghai, China · On-site ·": "中国香港 & 中国上海 · 现场办公 ·",
  "Shanghai, China · On-site ·": "中国上海 · 现场办公 ·",
  "Hong Kong SAR · Hybrid ·": "中国香港 · 混合办公 ·",
  "Shenzhen, China · On-site ·": "中国深圳 · 现场办公 ·",
  "Shanghai, China · Remote ·": "中国上海 · 远程办公 ·",
  "Beijing, China · On-site ·": "中国北京 · 现场办公 ·",
  "Guangzhou, China · On-site ·": "中国广州 · 现场办公 ·",

  /* — 时间 — */
  "Jul 2026 – Sep 2026": "2026年7月 – 2026年9月",
  "Dec 2025 – Jan 2026": "2025年12月 – 2026年1月",
  "Oct 2025 – Dec 2025": "2025年10月 – 2025年12月",
  "Oct 2024 – Dec 2024": "2024年10月 – 2024年12月",
  "Jul 2024 – Sep 2024": "2024年7月 – 2024年9月",
  "Jun 2023 – Aug 2023": "2023年6月 – 2023年8月",
  "Feb 2025 – Mar 2025": "2025年2月 – 2025年3月",
  "Jul 2022 – Sep 2022": "2022年7月 – 2022年9月",
  "May 2025 – Jun 2025": "2025年5月 – 2025年6月",

  /* — 通用 — */
  "Tools:": "工具：",
  ".": "。",

  /* — 华泰证券 — */
  "Live Deal Execution:": "在执行项目：",
  "Supporting a live": "持续支持一线",
  "HK IPO deal team": "港股 IPO 项目组",
  "on roadshow logistics, investor meetings, and syndicate coverage across active transactions.": "的路演统筹、投资者会议与承销团覆盖工作，服务多个在执行项目。",
  "Market Survey:": "市场调研：",
  "Conducted a market survey on": "针对",
  "YTD HK IPOs": "年初至今的港股 IPO 项目",
  ", aggregating market cap, allocation, convertible bond, and shareholder-reduction data across servicing brokers.": "做了市场调研，汇总各家服务券商的市值、配售、可转债与股东减持数据。",
  "Diligence & Compliance:": "尽调与合规：",
  "Performed independence checks on prospective mandates; diligenced": "对潜在项目开展独立性核查；并尽调",
  "cornerstone investors'": "基石投资者",
  "historical investment track records across sectors.": "在各行业的历史投资记录。",
  "Investor Intelligence:": "投资者情报：",
  "Built investor intelligence profiles supporting": "搭建投资者情报画像，支持项目组在港股 IPO 中的",
  "book-building strategy": "簿记建档策略",
  "and cornerstone selection for the deal team on HK IPO transactions.": "与基石投资者遴选。",

  /* — 中信证券 — */
  "Issuer-Investor Database Construction:": "发行人—投资者数据库搭建：",
  "Engineered a proprietary database tracking": "搭建自有数据库，追踪",
  "120+ issuers and 560+ institutional investors": "120+ 家发行人与 560+ 家机构投资者，",
  "using": "技术栈为",
  "SQL and Python": "SQL 与 Python",
  "Process Automation:": "流程自动化：",
  "Developed automated matching algorithms to tag investor preferences, reducing manual research time by": "开发自动匹配算法，为投资者偏好打标签，把人工研究时间减少了",
  "Private Placement Execution:": "定增项目执行：",
  "Supported the execution of A-share private placements (PIPEs) by drafting roadshow materials and analyzing investor subscription sentiment.": "参与 A 股定向增发（PIPE）项目执行，撰写路演材料并分析投资者认购意愿。",
  "Python (Pandas) · SQL · Wind Terminal · Excel (VBA)": "Python（Pandas）· SQL · Wind 金融终端 · Excel（VBA）",

  /* — 中信建投 — */
  "Liquidity & Valuation Modeling:": "流动性与估值建模：",
  "Applied": "运用",
  "Python and R": "Python 与 R",
  "to build VAR (Vector Autoregression) models on": "构建 VAR（向量自回归）模型，样本为",
  "90+ historical PIPE deals": "90+ 个历史 PIPE 交易",
  "Pricing Strategy:": "定价策略：",
  "Identified a statistically significant": "发现了具有统计显著性的",
  "2.1x valuation premium": "2.1 倍估值溢价",
  "for private firms post-issuance, directly informing pricing strategies for new clients.": "（民营企业发行后），并据此直接指导了新客户的定价策略。",
  "IPO Advisement:": "IPO 顾问：",
  "Utilized": "使用",
  "to screen 30+ equities for potential MSCI index inclusion, providing data-driven advice on liquidity discounts for": "筛选 30+ 只个股纳入 MSCI 指数的可能性，并就流动性折价给出数据驱动的建议，覆盖",
  "25+ Hong Kong IPOs": "25+ 个香港 IPO 项目",
  "R (Tidyverse) · Python (Scikit-learn) · Bloomberg · Capital IQ": "R（Tidyverse）· Python（Scikit-learn）· 彭博 · Capital IQ",

  /* — 招商期货 · 投资咨询 — */
  "Quantitative Backtesting:": "量化回测：",
  "Executed advanced time-series modeling via": "用",
  "to backtest technical trading signals.": "做高级时间序列建模，回测技术交易信号。",
  "Strategy Optimization:": "策略优化：",
  "Successfully optimized strategy parameters to achieve a": "优化策略参数，实现",
  "58% win rate": "58% 胜率",
  "with a controlled": "并把最大回撤控制在",
  "6% max drawdown": "6%",
  "in historical simulations.": "（基于历史模拟）。",
  "Risk Simulation:": "风险模拟：",
  "Conducted Monte Carlo simulations to stress-test portfolio performance under extreme market volatility scenarios.": "做蒙特卡洛模拟，对组合在极端市场波动情形下的表现做压力测试。",
  "Python (NumPy, Matplotlib) · Time-Series Analysis · Statistical Modeling": "Python（NumPy、Matplotlib）· 时间序列分析 · 统计建模",

  /* — 招商期货 · 行业研究 — */
  "Supply Chain Forecasting:": "供应链预测：",
  "Modeled supply chain costs and inventory decay rates using raw customs data, forecasting a": "基于海关原始数据，对供应链成本与库存损耗率建模，预测区域出口量将保持",
  "20%+ CAGR": "20%+ 的年复合增长率",
  "in regional export volumes.": "。",
  "Industry Publication:": "行业发表：",
  "Synthesized insights from": "汇总",
  "30+ market sources": "30+ 个市场信息源",
  "into strategic industry primers. Published a featured data-driven report in": "的洞察，整理成战略性行业入门报告；并在",
  "\"SugarTalk\"": "《糖讯》",
  "magazine.": "杂志上发表了一篇数据驱动的专题报告。",
  "Market Analysis:": "市场分析：",
  "Delivered weekly briefs and deep-dive reports; built Excel dashboards to support trade discussions and identify arbitrage opportunities.": "输出每周简报与深度报告；搭建 Excel 看板，支持交易讨论并发掘套利机会。",
  "Excel (Advanced Modeling) · Data Visualization · Fundamental Analysis": "Excel（高级建模）· 数据可视化 · 基本面分析",

  /* — 普华永道 — */
  "User Funnel Analytics:": "用户漏斗分析：",
  "Processed": "处理了",
  "200k+ user behavior records": "20 万+ 条用户行为记录，",
  "via": "并用",
  "to construct granular funnel models, pinpointing critical drop-offs in the purchasing journey.": "构建精细化漏斗模型，定位购买旅程中的关键流失环节。",
  "Competitive Benchmarking:": "竞品对标：",
  "Benchmarked": "对标了",
  "40+ app features": "40+ 项 App 功能",
  "across leading F&B brands, translating behavioral data into a prioritized roadmap of": "（覆盖头部餐饮品牌），把行为数据转化为优先级明确的路线图，最终锁定",
  "12 high-ROI features": "12 项高投入产出比功能",
  "Strategic Impact:": "战略成效：",
  "Formulated digital engagement strategies projected to increase User Conversion Rate (CVR) by": "制定数字化互动策略，预计可将用户转化率（CVR）提升",
  "5pp": "5 个百分点，",
  "and Retention by": "留存率提升",
  "8pp": "8 个百分点",
  "SQL (PostgreSQL) · Python · Tableau · PowerPoint": "SQL（PostgreSQL）· Python · Tableau · PowerPoint",

  /* — 立信 / BDO — */
  "Audit Fieldwork:": "审计现场：",
  "Performed substantive testing procedures on key financial statement accounts, including Cash & Cash Equivalents, Accounts Receivable, and Fixed Assets.": "对关键财务报表科目执行实质性测试程序，涵盖货币资金、应收账款与固定资产。",
  "Financial Verification:": "财务核验：",
  "Conducted bank confirmations and vouching procedures to verify the accuracy of transactions, ensuring compliance with": "执行银行函证与凭证抽查程序，核验交易准确性，确保符合",
  "CAS (Chinese Accounting Standards)": "《企业会计准则》（CAS）",
  "Data Validation:": "数据校验：",
  "to perform analytical reviews on large datasets, identifying variances and potential audit risks for senior auditors.": "对大体量数据做分析性复核，为高级审计师识别异常波动与潜在审计风险。",
  "Excel · Auditing Standards (CAS) · Financial Statement Analysis": "Excel · 企业会计准则（CAS）· 财务报表分析",

  /* — OnePlus — */
  "Global Inventory Management:": "全球库存管理：",
  "Managed cross-functional operations for": "统筹管理",
  "300+ SKUs globally": "全球 300+ 个 SKU 品类",
  ", tracking high-volume weekly orders via": "的跨部门运营；每周大批量订单的跟踪依托",
  "ERP systems": "ERP 系统",
  "Process Optimization:": "流程优化：",
  "Aligned operational goals with": "通过 Coupa 与",
  "50+ external stakeholders": "50+ 个外部相关方",
  "via Coupa to optimize procurement workflows, boosting order processing accuracy to": "对齐运营目标，优化采购流程，把订单处理准确率提升到",
  "Data-Driven Resolution:": "数据驱动的问题解决：",
  "Analyzed operational datasets to identify and resolve supply bottlenecks, successfully reducing shipping errors by": "分析运营数据，定位并解决供应瓶颈，把发货差错率降低了",
  "and accelerating delivery timelines.": "，同时缩短了交付周期。",
  "ERP Systems · Excel (Pivot Tables) · Supply Chain Management": "ERP 系统 · Excel（数据透视表）· 供应链管理",

  /* — 兴业证券 — */
  "CRM Management:": "CRM 管理：",
  "Maintained and updated the Client Relationship Management (CRM) system, ensuring accurate profiling of client risk preferences and investment history.": "维护并更新客户关系管理（CRM）系统，确保客户风险偏好与投资历史的画像准确。",
  "Market Communication:": "市场沟通：",
  "Assisted Investment Advisors in preparing daily market briefings and investment summaries for high-net-worth (VIP) clients.": "协助投资顾问，为高净值（VIP）客户准备每日市场简报与投资总结。",
  "Client Service:": "客户服务：",
  "Facilitated account opening procedures and resolved client inquiries regarding trading platforms and wealth management products.": "协助办理开户流程，解答客户关于交易平台与理财产品的咨询。",
  "CRM Software · Market Research · Client Communication": "CRM 软件 · 市场研究 · 客户沟通"
};

  // 构建反向字典 中文 -> 英文
  const ZH_TO_EN = {};
  for (const en in EN_TO_ZH) {
    ZH_TO_EN[EN_TO_ZH[en]] = en;
  }

  const STORAGE_KEY = "site_lang";

  // 记住每个文本节点被翻译前的英文原文。
  // 切回英文时优先按此还原，避免多个英文映射到同一中文时还原错误
  // （例如 "HANG LIN" 和 "Hang Lin" 都译作「林航」）。
  const ORIGINAL = new WeakMap();

  // 遍历页面所有可翻译的文本节点
  function walkTextNodes(fn) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          // 跳过脚本/样式内的文本
          const p = node.parentNode;
          if (!p) return NodeFilter.FILTER_REJECT;
          const tag = p.nodeName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA") return NodeFilter.FILTER_REJECT;
          // 跳过标记为不翻译的区域（如诗歌）
          if (p.closest && p.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(fn);
  }

  // 英文 -> 中文
  function toZh() {
    walkTextNodes(function (node) {
      const raw = node.nodeValue;
      const key = raw.trim();
      if (!key) return;
      if (Object.prototype.hasOwnProperty.call(EN_TO_ZH, key)) {
        if (!ORIGINAL.has(node)) ORIGINAL.set(node, raw); // 记下英文原文
        // 保留原有前后空白
        node.nodeValue = raw.replace(key, EN_TO_ZH[key]);
      }
    });
    document.documentElement.setAttribute("lang", "zh");
  }

  // 中文 -> 英文
  function toEn() {
    walkTextNodes(function (node) {
      // 优先精确还原
      if (ORIGINAL.has(node)) {
        node.nodeValue = ORIGINAL.get(node);
        ORIGINAL.delete(node);
        return;
      }
      // 兜底：没有记录时（如页面直接以中文载入后又被改动）按反向字典翻
      const raw = node.nodeValue;
      const key = raw.trim();
      if (!key) return;
      if (Object.prototype.hasOwnProperty.call(ZH_TO_EN, key)) {
        node.nodeValue = raw.replace(key, ZH_TO_EN[key]);
      }
    });
    document.documentElement.setAttribute("lang", "en");
  }

  function applyLang(lang) {
    if (lang === "zh") {
      toZh();
    } else {
      toEn();
    }
    localStorage.setItem(STORAGE_KEY, lang);
    updateButtonLabel(lang);
  }

  function updateButtonLabel(lang) {
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = (lang === "zh") ? "EN" : "中";
  }

  let current = localStorage.getItem(STORAGE_KEY) || "en";

  /*__readyPatch*/(document.readyState!=="loading"?function(f){f();}:function(f){document.addEventListener("DOMContentLoaded",f);})(function () {
    // 页面初始如果记忆为中文，则立即翻译
    if (current === "zh") {
      toZh();
    }
    updateButtonLabel(current);

    const btn = document.getElementById("lang-toggle");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        current = (current === "zh") ? "en" : "zh";
        applyLang(current);
      });
    }
  });
})();
