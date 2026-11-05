flomo-id:: MjUwNTg2NDA0
flomo-created-at:: 2026-08-06T19:05:46+08:00
flomo-updated-at:: 2026-11-01T09:17:29+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDA0
flomo-word-count:: 2101
flomo-migration-status:: raw-import

# 专栏⑯·第8篇：AI 内容创作与风险——视频生成、新闻解析、版权与幻觉

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑯·第8篇：AI 内容创作与风险——视频生成、新闻解析、版权与幻觉**

📎 第7篇：AI + 嵌入式 → [https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDAz](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDAz)

1000 问里有视频生成（Sora、Diffusion）和 AI 伦理问题。你的笔记里也有几个真实想法：AI 解析新闻做视频（2024-09-28）、AI 生成概念车视频（2026-01-14）、AI 调 PID。这篇把"AI 做内容"从"能生成"带到"知道坑在哪"。

**一、AI 内容创作的真实流程——从你的想法出发**

**你的新闻聚合项目（2024-09-28）**：AI 解析热点新闻 → 生成深度解析 → 做成视频 → 分发到平台。

**拆成 AI 能做的环节：**

1. 新闻抓取 → 工具能做（RSS/爬虫）

2. 新闻摘要/深度解析 → LLM 能做（但风险见下）

3. 文案转脚本 → LLM 能做

4. 视频生成（文生视频）→ 工具能做（Sora 类/图片动画化）

5. 配音 → TTS 能做（1000 问里有）

6. 分发 → 平台 API

**关键认知**：AI 内容创作的价值不在"全自动"，在"人做审校、AI 做批量"——你自己在 AI 三问其一里就写过：AI 生成初稿、人做审校修正。

**二、四个绕不开的风险（你 2024-09-28 就列过）**

**1\. AI 恶意解读/误导性**：AI 摘要可能"语气正确但事实偏差"——新闻事件有立场、有因果，LLM 会按训练分布"脑补"没说的事。对策： **只允许 AI 做"结构化提取"（谁/何时/何地/何事），禁止 AI 做"评论/归因"**。

**2\. 法律红线**：深度伪造（Deepfake）、误导性视频、医疗/投资建议——平台和法规都在收紧。你的概念车视频是安全的（虚构内容），但"AI 解析新闻"涉及真实人物事件——高风险区。

**3\. IP 知识产权**：AI 训练数据里的版权争议（图片/文字/声音）；生成内容的版权归属（目前各国规定不一）。 **工程对策**：用明确授权的素材 \+ 保留生成记录（prompt/模型/日期）作为溯源。

**4\. 幻觉**：AI 会编造"看起来真实"的内容——引用不存在的论文、编造事件细节。做新闻解析时幻觉是致命的（新闻的第一要求是真实）。 **对策**：RAG 只基于检索来源（第5篇）+ 人工终审。

**三、AI 视频生成的现状——Sora 类工具能做什么**

- **能做的**：文生视频（概念车视频完全可行）、图片动画化、风格迁移

- **不能做的**：物理规律（Sora 会犯常识错误——1000 问里有）、长叙事一致性（角色前后不统一）、精确控制（"车从左边开过来转三圈"做不到逐帧精确）

- **工程技巧**：分镜生成（每镜头一个 prompt）比一整段生成可控得多；用图片生视频（image-to-video）比纯文生视频可控

**四、AI 调 PID——你记过的具体应用（江协教程）**

AI 调 PID 的本质：AI 给出调参建议（经验性知识：先 P 后 I 再 D、从临界振荡法开始），但 **执行和验证必须人做**——这就是 AI 三问其二说的"实践层 AI 帮不上"。AI 是"加速器"，不是"替代者"。

**五、内容创作的最小可行流程（给你的实践模板）**

选题（人）→ 资料收集（AI 检索+人筛选）→ 初稿（AI）→ 事实核查（人+AI 交叉）→ 终审（人）→ 成片（AI 工具）→ 发布（人）

**每个环节谁负责要写死**：AI 负责"批量生产候选"，人负责"判断、核查、放行"。

📎 第7篇：AI + 嵌入式 → [https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDAz](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDAz)<br> 📎 新闻聚合项目想法 → [https://v.flomoapp.com/mine/?memo_id=MTM5MjYzMTM0](https://v.flomoapp.com/mine/?memo_id=MTM5MjYzMTM0)<br> 📎 第2篇：AI 在知识管理里的角色 → [https://v.flomoapp.com/mine/?memo_id=MjQ5MDI4MDU0](https://v.flomoapp.com/mine/?memo_id=MjQ5MDI4MDU0)

**专栏⑯进度：8/10篇**

<p></p>

#Area/技术/AI

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
