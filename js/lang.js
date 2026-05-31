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
  "Version 1.0: The Beginning": "1.0 版本：一切的开始",
  "Windows Download v1.0": "Windows 下载 v1.0",
  "Mac Download v1.0": "Mac 下载 v1.0",
  "Buy me a coffee ☕️": "请我喝杯咖啡 ☕️",
  "If you enjoy my work, consider supporting me. Your tip fuels my late-night coding and next journey!": "如果你喜欢我的作品，欢迎支持我。你的心意，是我深夜敲代码和下一段旅程的动力！",
  "WeChat Pay": "微信支付",
  "Alipay": "支付宝",
  "Scan with WeChat to support": "用微信扫码支持"
};

  // 构建反向字典 中文 -> 英文
  const ZH_TO_EN = {};
  for (const en in EN_TO_ZH) {
    ZH_TO_EN[EN_TO_ZH[en]] = en;
  }

  const STORAGE_KEY = "site_lang";

  // 遍历页面所有文本节点，按映射表替换
  function translateNodes(map) {
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
    nodes.forEach(function (node) {
      const raw = node.nodeValue;
      const key = raw.trim();
      if (!key) return;
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        // 保留原有前后空白
        node.nodeValue = raw.replace(key, map[key]);
      }
    });
  }

  function applyLang(lang) {
    if (lang === "zh") {
      translateNodes(EN_TO_ZH);
      document.documentElement.setAttribute("lang", "zh");
    } else {
      translateNodes(ZH_TO_EN);
      document.documentElement.setAttribute("lang", "en");
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
      translateNodes(EN_TO_ZH);
      document.documentElement.setAttribute("lang", "zh");
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
