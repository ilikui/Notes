flomo-id:: MjQ5MDc5MDY4
flomo-created-at:: 2026-07-29T06:38:03+08:00
flomo-updated-at:: 2026-11-01T09:26:14+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ5MDc5MDY4
flomo-word-count:: 2560
flomo-migration-status:: raw-import

# 专栏⑫·第6篇：I2C 传感器/EEPROM 深入——时钟拉伸、多主仲裁、上拉电阻选值

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·第6篇：I2C 传感器/EEPROM 深入——时钟拉伸、多主仲裁、上拉电阻选值**

前5篇讲了基础概念（第1篇）、四大协议详解（第2篇）、故障排查（第3篇）、汽车嵌入式场景（第4篇）、SPI Flash驱动深入（第5篇）。本篇从 I2C 在传感器和 EEPROM 项目中的真实坑出发，把 I2C 从"会读时序图"带到"能修线上问题"。

**场景：I2C 扫描找不到温度传感器——但逻辑分析仪显示有 ACK**

I2C 总线上挂了一个温度传感器（从机地址 0x48）和一个 EEPROM（从机地址 0x50）。MCU 做 I2C 总线扫描（0x01~0x7F），0x50 回复了 ACK，0x48 没有。但逻辑分析仪抓 SDA/SCL 波形——0x48 确实回复了 ACK——MCU 的 I2C 外设没检测到。

根因： **温度传感器支持时钟拉伸（Clock Stretching）**——主机发送完地址字节后，从机把 SCL 拉低，告诉主机"等我准备好数据再继续"。MCU 的 I2C 外设检测到 SCL 被拉低——等待 SCL 释放——但 MCU 的 I2C 超时配置太短（典型的 100μs）——温度传感器需要 200μs 才能准备好数据——超时后 MCU 放弃了当前传输。

逻辑分析仪看到的 ACK 是"从机确实回复了 ACK"，但 MCU 的 I2C 外设在 ACK 后的等待阶段超时了——所以 MCU 软件层面没有收到数据。

修复：增大 I2C 超时值（从 100μs 改到 500μs），或使用硬件 I2C 的 timeout 自动重试机制。

**I2C 的三个核心工程问题**

**问题 1：开漏输出 + 上拉电阻——阻值选错了整个总线都不工作**

I2C 的 SDA 和 SCL 是开漏（Open-Drain）输出——只能拉低，不能拉高。拉高靠外部上拉电阻。

**电阻太小**（比如 1kΩ）→ 拉低时电流过大（3.3V / 1kΩ = 3.3mA）→ 可能超过 MCU 的 I/O 驱动能力 → I2C 信号异常。且功耗高。

**电阻太大**（比如 47kΩ）→ 上升沿太慢（RC 时间常数 = R × Cbus）→ 高速模式（400kHz）下信号还没升到高电平阈值就进入下一个时钟周期了。

实用经验：100kHz 标准模式用 4.7kΩ，400kHz 快速模式用 2.2kΩ，1MHz 快速+模式用 1kΩ。总线电容每增加 100pF，上拉电阻减半。

**问题 2：多主仲裁——两个主机同时发数据时谁赢**

多主机 I2C 系统中两个 MCU 可能同时尝试向同一个从设备发数据——I2C 的仲裁机制：谁先拉低 SDA 谁赢，输的一方自动释放总线。

工程中的坑： **仲裁丢失后没有重新发送**。I2C 硬件在仲裁丢失时通常会设置一个仲裁丢失中断标志（ARB\_LOST），但很多 MCU 的 I2C 外设不会自动重发——需要软件在 ISR 里重新发起传输。

**问题 3：从机地址冲突——两个设备用同一个地址**

I2C 的 7 位地址空间只有 128 个地址。不同厂商的传感器可能用相同的默认地址。比如温度传感器 TMP100 默认地址 0x48，跟另一个气压传感器 BMP180 的默认地址 0x48 冲突。

检查方法：读设备的 datasheet——确认设备是否有地址选择引脚（ADDR/AD0/A0/A1）。大多数器件支持 2-4 个可选地址。如果总线上两个设备都用 0x48——要么换地址，要么加一个 I2C 多路复用器（如 PCA9548A）。

**I2C EEPROM 的读写序列（与 SPI Flash 对比）**

SPI Flash（4-6线，最大 128MB-2GB，10万次/扇区，Page Program 0.5-3ms/256字节，24/32位地址，写前需写使能，写前需擦除）vs I2C EEPROM（2线，1Kb-4Mb，100万次/字节，Page Write 3-5ms/64字节，7位从机地址+16位内部地址，Page Write 指令内含写使能，写前不需要擦除）

**I2C EEPROM 的 Page Write 陷阱（跟 SPI Flash 一样有跨页回卷）**

跟 SPI Flash 一样，I2C EEPROM 也有页写入限制——一次最多写一页（通常 64 字节或 128 字节）。超过页边界会回卷到当前页开头。

修复：写之前按页边界拆分，每段写完等 EEPROM 内部写入完成（延时或查 ACK）。

**一条总结**：I2C 的最核心工程细节不在"怎么写读写函数"——在 **上拉电阻选值、时钟拉伸处理、多主仲裁恢复、地址冲突解决**。这四个问题任何一个没处理好，I2C 总线看起来"初始化成功了"但实际收不到数据。调试工具必须用逻辑分析仪（不是示波器）——因为 I2C 的 ACK/NACK、时钟拉伸、仲裁丢失，示波器很难一次性看到完整时序。

📎 第5篇：SPI Flash 驱动深入 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5MDc4OTky](https://v.flomoapp.com/mine/?memo_id=MjQ5MDc4OTky)

📎 嵌入式通信协议专题导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjE0](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjE0)

📎 第7篇：RS-485 组网 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5MDc5MTAz](https://v.flomoapp.com/mine/?memo_id=MjQ5MDc5MTAz)

**专栏⑫进度：6/10篇**

#Area/技术/通信

