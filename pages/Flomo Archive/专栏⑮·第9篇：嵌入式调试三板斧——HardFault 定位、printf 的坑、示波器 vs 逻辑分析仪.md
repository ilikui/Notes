flomo-id:: MjUwNTg0NTQy
flomo-created-at:: 2026-08-06T18:49:30+08:00
flomo-updated-at:: 2026-11-01T09:22:52+08:00
flomo-tags:: Area/技术/嵌入式
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUwNTg0NTQy
flomo-word-count:: 2217
flomo-migration-status:: raw-import

# 专栏⑮·第9篇：嵌入式调试三板斧——HardFault 定位、printf 的坑、示波器 vs 逻辑分析仪

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑮·第9篇：嵌入式调试三板斧——HardFault 定位、printf 的坑、示波器 vs 逻辑分析仪**

📎 第8篇：Linux 驱动入门 → [https://v.flomoapp.com/mine/?memo\_id=MjUwNTg0NDgw](https://v.flomoapp.com/mine/?memo_id=MjUwNTg0NDgw)

1000 问里调试章节 4 问（JTAG vs SWD、printf 调试的坑、逻辑分析仪 vs 示波器、HardFault 第一步）。这篇把"程序跑飞了怎么查"整理成可执行的流程。

**一、HardFault 定位——第一步不是看代码，是看现场**

程序跑飞（HardFault）后的标准动作：

1. **停住 CPU**，别让它继续跑（HardFault\_Handler 里死循环或进调试器）
2. **看 LR 寄存器**（链接寄存器）——它保存了异常发生时的返回地址。LR 的低 4 位指示用的是 MSP（主栈）还是 PSP（进程栈）
3. **看栈顶**——Cortex-M 压栈了 8 个寄存器（xPSR、PC、LR、R0-R3、R12）。从当前 SP 往上看，第 7 个（偏移 24 字节）就是 **进入异常前 PC 的值**——那就是跑飞的现场
4. **反汇编那个地址**——看是哪条指令崩的（通常是空指针解引用、非法指令、总线错误）
5. **看 R0/R1/R2**——往往是崩坏时的操作数（R0 是空指针最常见）

**一条经验**：GDB 里 bt（backtrace）能自动做 1-4 步。裸机调试器（Keil/IDE）打开 Fault 窗口也能看到压栈现场。手动读栈是为了在没有调试器的产线上也能定位——把 PC/LR/栈内容打印到日志里。

**二、printf 调试的坑——它本身会改变问题**

- **实时性**：printf 走 UART，115200bps 下打 10 个字符 ≈ 1ms。在 ISR 里 printf → 中断延迟暴涨（第7篇）
- **时序改变**：printf 占用的时间改变了调度时序——"加了 printf 正常，删了反而崩"是经典假象
- **缓冲区**：stdio 默认行缓冲/全缓冲，嵌入式里可能丢数据
- **替代方案**：SWO（单线输出，不占 UART，速度 2Mbps+）、ITM、RTT（Segger，最快）、CANoe 的 Trace

**三、示波器 vs 逻辑分析仪——各看什么**

- **示波器**：看 **模拟** 信号——电压、波形、上升沿、噪声、纹波。适合：电源、CAN 差分波形、I2C 上拉是否够
- **逻辑分析仪**：看 **数字** 时序——0/1 序列、协议解码（I2C/SPI/UART/逻辑）。适合：协议是否对、地址是否冲突、时序是否满足

**选型**：怀疑物理层（电平/噪声/纹波）→ 示波器；怀疑协议层（时序/帧格式/地址）→ 逻辑分析仪。CAN 排查里两个都要：示波器看差分信号完整性，CANoe 看协议帧（见专栏⑥）。

**四、JTAG vs SWD——为什么 SWD 只用两根线**

- **JTAG**：5 根（TCK/TMS/TDI/TDO/nTRST），全功能，能边界扫描
- **SWD**：2 根（SWDIO/SWCLK），数据复用在一根线上——时钟上升沿传请求、下降沿传响应，够调试用

**选型**：新设计优先 SWD（省引脚），需要边界扫描测试（BIST）才用 JTAG。

**五、排查流程总结——从外到内**

1. **供电**：电压对不对、纹波大不大（示波器）
2. **时钟**：晶振起振没有、频率对不对（示波器）
3. **复位**：复位引脚状态、复位源是什么（读 RCC 标志）
4. **调试口**：SWD 连得上吗（连不上→检查 SWDIO/SWCLK/GND/VCC 四线）
5. **代码**：能连上后再断点/打印定位

前四步是硬件问题，第五步才是软件问题。90% 的"板子不工作"是前四步里的——先查硬件再查软件，别上来就怀疑代码。

📎 专栏⑥CAN 排查（示波器/CANoe 工具链）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ5ODAzMzU4](https://v.flomoapp.com/mine/?memo_id=MjQ5ODAzMzU4)

📎 专栏⑬第9篇：硬件调试三板斧 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NjE2](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NjE2)

📎 专栏⑮导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ1NzMzNDk3](https://v.flomoapp.com/mine/?memo_id=MjQ1NzMzNDk3)

**专栏⑮进度：9/10篇**

#Area/技术/嵌入式

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
