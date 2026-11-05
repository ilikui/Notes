flomo-id:: MjQ5NTIwODI2
flomo-created-at:: 2026-07-31T22:21:37+08:00
flomo-updated-at:: 2026-11-01T09:26:05+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ5NTIwODI2
flomo-word-count:: 2765
flomo-migration-status:: raw-import

# 专栏⑫·第8篇：SENT（Single Edge Nibble Transmission）——汽车传感器的"单线传真"

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·第8篇：SENT（Single Edge Nibble Transmission）——汽车传感器的"单线传真"**

第1-7篇覆盖了 UART/SPI/I2C/RS-485 四大板级协议，第4篇提过 SENT 但没展开。这篇把 SENT 讲透——它是汽车传感器（节气门位置、氧传感器、制动压力、转向角）最常用的 **单线单向协议**，你在 CAN/SPI 之外几乎一定会碰到它。

**一、SENT 是什么——为什么需要它**

**背景**：汽车里有大量传感器需要把模拟量（位置/压力/温度）数字化后传给 ECU。传统做法：

- 模拟信号（0.5-4.5V）——抗干扰差、精度低、一根线一个信号

- CAN——大材小用（传感器就传一个值），成本高

- LIN——20kbps 够用但时序不定（Master 调度）


**SENT 的定位**：单线、单向（传感器→ECU）、低成本、高精度、确定性时序。它 **没有时钟线**——数据通过 **脉冲之间的时间间隔** 编码（所以叫"单边沿"协议）。

**二、SENT 的物理层和编码**

**一根线，地线共用，信号是"脉冲宽度"**

SENT 的基本单位是 **Nibble（4 bit）**——每个 Nibble 用一个"低电平时间 + 高电平时间"的脉冲表示。每个 Nibble 由固定宽度的同步段 + 可变宽度数据段组成：数据段宽度 = 12 + (Nibble值 × 3) ticks，Nibble 值 0-15 → 高电平 12-57 ticks。

**一帧 SENT 消息的结构：**

Sync 脉冲（固定 56 ticks，校准）→ Status Nibble（4 bit，状态/配置信息）→ Data1-4（4 × 4 bit = 16 bit 数据，如 12 bit 位置 + 4 bit 状态）→ CRC Nibble（4 bit，校验前 5 个 Nibble）

**关键特性：**

- **单向**：只有传感器→ECU，ECU 不能发数据回去（没有反向通道）

- **无时钟**：靠时间间隔编码，不需要时钟同步

- **帧周期可配置**：典型 500μs-1ms（比 LIN 快）

- **可带辅助通道**：额外传诊断信息（低速）


**三、工程里的三个坑**

**坑 1：时间测量的精度——MCU 的输入捕获要够快**

SENT 的 tick 周期通常是 3μs（500kbps 等效）。Nibble 的最小间隔（12 ticks）= 36μs。MCU 要用 **输入捕获（Input Capture）定时器** 精确测量脉冲间隔——误差超过 1 tick 就可能解错 Nibble。

**坑 2：干扰导致的时间抖动——CRC 校验挡不住所有错误**

SENT 只有 4 bit CRC——对随机位错误能检出大部分，但对 **系统性时序偏移**（比如电源干扰导致所有脉冲同时变宽）可能检不出。工程上：

- 硬件加滤波（RC 低通）

- 软件做"合理性检查"——解析出的值超出物理范围（比如节气门位置 \> 100%）就丢弃并计数


**坑 3：帧丢失的降级策略**

SENT 是单向的——ECU 无法请求传感器重发。如果连续几帧解析失败：

- ECU 用"上一有效值"保持（但要有超时——超过 N 帧无有效值就进故障处理）

- 结合 DEM 报"传感器信号无效"的 DTC（进诊断链——专栏②的防抖/确认逻辑）


**四、SENT 在 AUTOSAR 里的位置**

AUTOSAR 里 SENT 走 **SENT 收发器驱动 + ECU 抽象层**，不经过通信栈（Com/PduR）——它属于 **传感器信号采集** 路径，跟 ADC 采集类似：

SENT 传感器 → SENT 收发器 → MCU 输入捕获定时器 → SENT 驱动 → 应用 SWC

（不走 CAN 栈，不走 LIN 栈，是独立的外设驱动路径）

**工程注意**：SENT 信号要"翻译"成应用能用的物理值——每个传感器的 SENT 数据格式（哪 12 bit 是位置、缩放因子、偏移）在传感器的规格书里定义——跟 CAN 的 DBC 类似——要建"信号解析表"。

**五、SENT 100 问（前 10 问）**

01. SENT 为什么不需要时钟线？时间编码是怎么工作的？

02. 一个 Nibble 的最小和最大时间是多少？跟数据率什么关系？

03. SENT 是半双工还是单工？ECU 能向传感器发数据吗？

04. Sync 脉冲的作用是什么？丢了会怎样？

05. SENT 的 CRC 是多少 bit？能检出哪些错误、检不出哪些？

06. MCU 用什么外设接收 SENT？输入捕获还是 GPIO 中断？

07. SENT 的帧周期可配吗？配短了有什么风险？

08. 辅助通道（Secondary Channel）传什么？有什么用？

09. SENT 跟 LIN 比，为什么传感器场景更常用 SENT？

10. SENT 信号解析表怎么建？跟 CAN DBC 有什么异同？


📎 嵌入式通信协议专题导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjE0](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjE0)

📎 第4篇：汽车嵌入式场景 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM5NjYw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM5NjYw)

📎 专栏②·DEM 防抖（信号无效的 DTC 处理）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ0NTYwNTU1](https://v.flomoapp.com/mine/?memo_id=MjQ0NTYwNTU1)

📎 第9篇：USB 设备通信 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5NTIwODgw](https://v.flomoapp.com/mine/?memo_id=MjQ5NTIwODgw)

**专栏⑫进度：8/10篇**

#Area/技术/通信

