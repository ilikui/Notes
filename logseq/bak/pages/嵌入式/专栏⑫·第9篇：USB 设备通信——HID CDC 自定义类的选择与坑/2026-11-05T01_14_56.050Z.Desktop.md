flomo-id:: MjQ5NTIwODgw
flomo-created-at:: 2026-07-31T22:21:59+08:00
flomo-updated-at:: 2026-11-01T09:26:03+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ5NTIwODgw
flomo-word-count:: 3304
flomo-migration-status:: raw-import

# 专栏⑫·第9篇：USB 设备通信——HID / CDC / 自定义类的选择与坑

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·第9篇：USB 设备通信——HID / CDC / 自定义类的选择与坑**

通信系列覆盖了 UART/SPI/I2C/RS-485/SENT。这篇补 USB——嵌入式设备（调试工具、HMI、数据采集器、产线设备）跟 PC 连接最常用的接口。跟板级协议不同，USB 是一套 **有主机（Host）和设备（Device）的完整协议栈**。

**一、USB 通信的基本概念**

**拓扑**：一个 Host（PC）可连多个 Device（外设），通过 Hub 扩展。Device 不能主动发数据——只能响应 Host 的请求（端点轮询）。

**四个传输类型：**

控制传输（Control）：枚举/配置/命令，双向、可靠、最慢

批量传输（Bulk）：大数据（U盘/串口），双向、可靠、带宽保证

中断传输（Interrupt）：小数据周期传输（HID），单向、有限时延

同步传输（Isochronous）：音视频流，无重传、保证带宽

**端点（Endpoint）**：Device 内部的数据通道——每个端点有地址（0-15）+ 方向（IN/OUT）。Host 通过"端点轮询"取数据。

**二、三种常见的设备类（Class）选择**

**2.1 HID（Human Interface Device）——最简单、免驱动**

HID 类是"人机交互设备"的通用类——鼠标/键盘/游戏手柄/自定义 HID。

**优点：** 免驱动（Windows/Linux/macOS 自带）、即插即用、无需安装任何东西。

**限制：** 中断传输——数据率低（全速 64 字节/帧，1kHz 轮询 → 约 64KB/s）；数据结构要符合 HID 描述符（Report Descriptor）；不适合大数据传输。

**嵌入式场景**：产线测试工具、配置工具、简单数据采集（传感器读数）、加密狗。

**2.2 CDC（Communications Device Class）——虚拟串口（VCP）**

CDC-ACM 让设备在 PC 上显示为一个"COM 口"——软件按串口读写，实际走 USB。

**优点：** 兼容串口软件（波特率设置无意义但界面熟悉）；免驱动（Windows 10+ 自带 USB 串口驱动）；批量传输——数据率远高于 HID。

**限制：** 需要系统串口驱动（一般自带）；无实时性保证（批量传输）。

**嵌入式场景**：调试日志口、固件下载、AT 指令设备（4G 模块）、示波器数据流。

**2.3 自定义类（Vendor Specific）——最高性能但要装驱动**

用厂商自定义类 \+ WinUSB/libusb——绕过操作系统对设备类的限制。

**优点：** 完全自定义、最高吞吐（批量传输可以打满 USB 2.0 的 480Mbps 理论带宽）。

**限制：** 需要装驱动（WinUSB 免驱但需要 INF 或 WinUSB 兼容 ID）。

**嵌入式场景**：高速数据采集（AD 采样流）、FPGA 配置下载、量产烧录器。

**三、嵌入式 USB 工程的五个坑**

**坑 1：枚举失败——D+ 上拉电阻**

USB Device 的 D+（全速）或 D-（低速）线上要有 1.5kΩ 上拉电阻——Host 检测到这个上拉才知道"有设备插进来了"，开始枚举。

很多 MCU（STM32）内置了这个上拉（通过 USB\_DP 引脚的内部上拉，或 OTG 的软上拉）——但用错了引脚（比如用了不带 USB 的 GPIO 做 D+），Host 永远检测不到设备。

**坑 2：枚举超时——描述符响应太慢**

Host 枚举时对每个请求（GET\_DESCRIPTOR）有超时（典型 5 秒）。如果设备的 USB 中断优先级太低，被其他中断（比如 CAN 接收）阻塞——描述符响应超时——枚举失败。

修复：枚举阶段的 USB 中断优先级要最高；或者初始化阶段先别开其他高频中断。

**坑 3：批量传输"卡死"——端点 NAK 风暴**

批量传输的 Device 端点没数据时，收到 IN 请求会回 NAK（忙）。如果应用层忘了往端点写数据——Host 一直轮询端点收到 NAK——PC 端的 ReadFile 挂起——看起来"卡死"。

修复：确认应用在"Host 有读请求"时真的往端点写了数据。调试用 USB 分析仪（或 PC 端的 UsbTreeView）看端点状态。

**坑 4：CDC 的波特率是"假的"——应用层要自己解析**

CDC 虚拟串口的波特率设置（比如 115200） **不经过 USB 传输**——它只是 Host 发的一个控制请求（SetLineCoding）。设备端要自己接收这个请求，决定"这个值怎么用"（通常忽略，因为 USB 不走波特率）。

坑：如果你在设备端"按波特率"处理数据（比如按 115200 定时采样）——但用户把 COM 口波特率设成了 9600——设备端行为可能不对。正确做法：CDC 数据就是字节流，跟波特率无关。

**坑 5：热插拔——拔线时的状态清理**

USB 支持热插拔——设备被拔走时没有"断开通知"（电源都断了）。应用层可能：

- 缓冲区还存着数据 → 下次插入时误以为是新数据

- 端点状态残留 → 新连接枚举失败


修复：重新枚举成功时，应用层清空所有缓存和状态。

**四、USB vs 其他协议的选型**

需要跟 PC 通信？

- 只是调试日志 → CDC 虚拟串口（免驱、串口软件兼容）

- 简单命令控制 → HID（免驱、即插即用、简单）

- 高速数据流 → 自定义类 \+ WinUSB（高吞吐、需驱动）

- 不做 USB（MCU 之间通信）→ CAN/SPI/UART（回到第7篇决策树）


**一句话**：嵌入式跟 PC 通信，USB 是最通用的选择——但"免驱"和"高速"是矛盾的两端：HID 免驱但慢，自定义类快但要装驱动，CDC 居中（免驱 + 够用）。

**五、USB 100 问（前 10 问）**

01. USB 为什么有四种传输类型？各适合什么场景？

02. HID 和 CDC 的最大区别是什么？选型依据？

03. D+ 上拉电阻的作用？没有它会怎样？

04. 枚举是什么？枚举失败最常见的原因？

05. NAK 风暴是什么？怎么避免？

06. CDC 的波特率是"真的"吗？应用层怎么处理？

07. 批量传输能打满多少带宽？跟什么有关？

08. USB 设备的电源管理——挂起（Suspend）时怎么唤醒？

09. 一个端点最多能传多少数据？跟端点大小什么关系？

10. 自定义类的驱动怎么装？WinUSB 免驱的条件？


📎 嵌入式通信协议专题导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjE0](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjE0)

📎 第7篇：RS-485 多节点组网 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5MDc5MTAz](https://v.flomoapp.com/mine/?memo_id=MjQ5MDc5MTAz)

📎 第8篇：SENT 传感器协议 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5NTIwODI2](https://v.flomoapp.com/mine/?memo_id=MjQ5NTIwODI2)

**专栏⑫进度：9/10篇**

#Area/技术/通信

