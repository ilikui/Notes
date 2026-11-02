flomo-id:: MjUxMDI5NzE4
flomo-created-at:: 2026-08-09T18:29:27+08:00
flomo-updated-at:: 2026-11-01T09:17:22+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5NzE4
flomo-word-count:: 1442
flomo-migration-status:: raw-import

# 专栏⑯·补充三：多模态与视频生成——Sora 为什么叫「世界模拟器」

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑯·补充三：多模态与视频生成——Sora 为什么叫「世界模拟器」**

**▎多模态：模型不再只吃文字**

- 多模态 = 文本 \+ 图像 \+ 音频 \+ 视频进同一个模型（GPT-4o、Gemini 这类）
- 关键机制：把图像/音频切成 patch/token，和文本 token 一起进 Transformer——模态边界在 token 层消失
- 你 1000问 里那两问的答案核心：视频不是「会动的图」，是「有时间维度的序列」

**▎视频理解的难点：时间维度**

- 静态图是 2D 空间，视频是 2D 空间 + 时间——要跨帧建模
- 两条路线：3D 卷积（把时间当第三维，C3D 那类）vs 时序注意力（Video Transformer，每帧算 token 再跨帧注意力）
- 现在的趋势是后者：先空间编码，再时间注意力，计算量小且能捕捉长程关系

**▎视频生成：从 Diffusion 到 Sora**

- 图像生成是 Diffusion（第8篇提过）：从噪声一步步去噪出图
- 视频生成 = 在 Diffusion 上加时间轴：同时生成 N 帧，帧间要自洽
- Sora 为什么叫「世界模拟器」而不是「视频生成器」：它学的是像素分布，但能推出「遮挡、光影、物体运动」的一致性——本质是学会了世界的表象规律，不是物理定律

**▎为什么 Sora 也会犯常识错误**

- 模型只学像素分布，不学物理规律——杯子穿桌、人走路滑步，因为它没见过「牛顿定律」这种文本知识，只见过「什么像素跟着什么像素动」
- 这解释了你 1000问 里的问题：为什么生成视频会有物理 bug

**▎你的场景落点**

- 概念车视频（你 1/14 记过）：文生视频工具（Sora/可灵/即梦）出初稿，Diffusion 在文本提示词里控场景，时间轴靠多段拼接
- AI 解析新闻做视频（9/28 记过）：视频理解模型抽关键帧 + LLM 写脚本 + TTS 配音，管道式工作流

**▎一句话总结**：多模态把一切切成 token，视频比图像多一个时间维度；Sora 是「像素级世界模拟」——看着合理但不懂物理，所以常识错误是它的天花板，你的内容创作要把它当「草稿生成器」用。

📎 第8篇：AI 内容创作与风险 → [https://v.flomoapp.com/mine/?memo\_id=MjUwNTg2NDA0](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDA0)<br><br><br>
📎 1000问·视频理解与生成 → [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc0NzUw](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc0NzUw)<br><br><br>
📎 专栏⑯导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc0NzUw](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc0NzUw)

**专栏⑯进度：10/10 + 补充三**

#Area/技术/AI

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
