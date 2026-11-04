flomo-id:: MjYyMjQ2Mjg4
flomo-created-at:: 2026-10-23T08:27:25+08:00
flomo-updated-at:: 2026-11-01T09:17:15+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYyMjQ2Mjg4
flomo-word-count:: 686
flomo-migration-status:: raw-import

# 什么是具身智能（Embodied Intelligence）

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**什么是具身智能（Embodied Intelligence）**

有物理身体、能在真实环境里靠「感知 → 决策 → 行动 → 反馈」闭环完成任务的智能系统。机器人、无人车、机械臂都算；核心主张是智能得靠身体与环境交互才立得起来，纯处理文字图像的系统给不了。

**难在哪**

- 输入是连续、带噪声的传感数据：视觉、雷达、力矩、触觉
- 动作要毫秒级发出去，还得应对物理世界的不确定性
- 出错没有撤销键，功能安全和失效兜底要提前硬起来
- 真实数据难采集，常见做法是仿真里训练再迁到真机（sim2real）

**主流技术路线**<br><br><br>
VLA（视觉-语言-动作模型）：大模型负责理解指令和任务规划，向下输出动作；底层靠强化学习、模仿学习、SLAM、运动控制执行。

**为什么这两年热**<br><br><br>
供应链和汽车电子高度重叠——域控制器、实时操作系统、传感器、功能安全这些直接能复用。

**瓶颈**<br><br><br>
泛化：实验室跑通的动作，换场景换物体就失效；数据和算力成本压不下来。

📎 关联：物理 AI 与具身智能（工业 5.0）→ [https://v.flomoapp.com/mine/?memo_id=MjU4NTAzMjUw](https://v.flomoapp.com/mine/?memo_id=MjU4NTAzMjUw)
