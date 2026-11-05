flomo-id:: MjUxMDI5MDYy
flomo-created-at:: 2026-08-09T18:23:43+08:00
flomo-updated-at:: 2026-11-01T09:25:59+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MDYy
flomo-word-count:: 1442
flomo-migration-status:: raw-import

# 专栏⑫·补充一：LIN 总线——UART 底子、成本优先的车上第二大巴

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·补充一：LIN 总线——UART 底子、成本优先的车上第二大巴**

**▎为什么有 LIN：CAN 太贵了**

车窗、天窗、雨刷、门锁、后视镜——低速执行器对实时性要求不高，但数量多。一个 LIN 节点比 CAN 省在哪：单线（1 根线 + 地）、收发器便宜、MCU 自带 UART 就能跑（LIN 协议栈比 CAN 栈轻得多）。

**▎LIN 和 UART 的关系（1000问 UART-Q17 的答案）**

LIN 物理层基于 UART 8N1 帧，加一颗 LIN 收发器（TJA1020 / TJA1021）把 TX 转成 12V 单总线。软件上：用 UART 发帧，额外处理同步间隔和同步场。

**▎LIN 帧：5 个场**

1. 同步间隔（Sync Break）：总线拉低 ≥13 bit——UART 帧里没有，作用是唤醒和帧起始标志
2. 同步场（0x55）：接收方用它校准波特率（容错 ±14%）
3. PID（保护 ID）：6 bit ID + 2 bit 奇偶校验。0x3C 主请求帧、0x3D 从响应帧是诊断帧
4. 数据场：1-8 字节
5. 校验场：经典校验，或含 PID 的增强校验

**▎主从架构 \+ 调度表**

1 主、最多 16 从（地址 0-15）。主节点用调度表（Schedule Table）决定「什么时候发什么帧」，从节点只能被动响应，且要遵守位置约束（Position Constraint）——收到自己的 PID 才回数据。

**▎三个坑**

1. 同步间隔识别：UART 硬件没有 break 检测时，要么配 9-bit 模式要么用定时器量低电平宽度——新手第一次调 LIN 常死在这
2. 唤醒：总线空闲超 4s 进休眠；主节点拉低总线 250µs-5ms 唤醒——唤醒脉冲太短从节点不理你
3. 终端电阻：主节点 1kΩ 上拉到 12V + 串二极管防反向电流，从节点 30kΩ——阻值错了电平识别不了

**▎一句话总结**：LIN 是「便宜的 CAN」——单线、主从、20kbps 封顶，拿 UART 当物理底子、调度表当交通警察；它填的是「CAN 太贵、UART 点对点不够用」之间的夹缝。

📎 1000问·LIN 为什么基于 UART → [https://v.flomoapp.com/mine/?memo\_id=MjQ4ODcyNjYw](https://v.flomoapp.com/mine/?memo_id=MjQ4ODcyNjYw)<br><br><br>
📎 专栏⑫·第2篇 四大协议 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM1NjM4](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM1NjM4)<br><br><br>
📎 专栏⑫导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjEw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjEw)

**专栏⑫进度：10/10 + 补充一**

#Area/技术/通信

