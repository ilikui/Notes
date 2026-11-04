flomo-id:: MjUxMDI5NzAy
flomo-created-at:: 2026-08-09T18:29:19+08:00
flomo-updated-at:: 2026-11-01T09:17:23+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5NzAy
flomo-word-count:: 1403
flomo-migration-status:: raw-import

# 专栏⑯·补充二：微调与提示工程——不换模型，让它更懂你

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑯·补充二：微调与提示工程——不换模型，让它更懂你**

**▎先分清三个层次**

1. 提示工程（Prompt）：不改权重，靠把话说清楚让模型干对——零成本、立刻生效
2. 微调（Fine-tuning）：改权重，让模型学会一种「行为方式」——要数据、要算力
3. 预训练：从零造模型——不是你要干的事

选型判断：能提示工程解决的先用提示工程；微调只在你「有大量特定格式数据」或「模型怎么提示都不听话」时上。

**▎提示工程三板斧**

1. 角色 \+ 任务 \+ 约束 \+ 示例（few-shot）——结构化把话说全
2. 思维链（CoT）：让模型先推理再回答，「一步步想」对数学/逻辑题提升明显
3. 输出格式约束：JSON / 固定模板，配合「如果不符合格式就重试」

你的场景：RAG 问答、笔记整理、专栏写作——提示里给足上下文和格式要求，比换模型划算。

**▎微调的真面目**

- 全量微调：改所有权重——显存大、数据要多，个人基本不用
- LoRA / QLoRA：只训一小块低秩矩阵，7B 模型单卡 24GB 能跑；QLoRA 在 4bit 基础上训，更低门槛
- 微调改变的是「风格/格式/领域口径」，改不了「知识」——知识靠 RAG 喂，风格靠微调调

**▎RLHF 和它前面那步**

- SFT（监督微调）：拿人工标注的问答对先教一遍
- RLHF（人类反馈强化学习）：再拿偏好排序训一个奖励模型，让输出更「像人喜欢的样子」
- 你的认知里要有这层：现成模型（如 DeepSeek）已经过了这两步，你微调是接着往后调

**▎三个坑**

1. 数据量幻觉：几百条样本微调效果有限，质量 \> 数量，至少几千条同格式数据才谈得上
2. 灾难性遗忘：微调太狠，原来会的能力（通用对话）退化——LoRA 学习率别拉太高
3. 微调 ≠ 补知识：想让它懂你的 flomo 体系，先做 RAG；微调只能让它「说话像你」

**▎一句话总结**：提示工程是零成本先试，微调是「风格整形」不是「知识充值」；你的落地路径是 RAG 管知识、提示管格式、LoRA 管风格——三件套按顺序上。

📎 第5篇：RAG 实战 → [https://v.flomoapp.com/mine/?memo\_id=MjUwNTg2Mjk4](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2Mjk4)<br><br><br>
📎 第9篇：AI 与知识管理方法论 → [https://v.flomoapp.com/mine/?memo\_id=MjUwNTg2NDA1](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDA1)<br><br><br>
📎 专栏⑯导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc0NzUw](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc0NzUw)

**专栏⑯进度：10/10 + 补充二**

#Area/技术/AI

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
