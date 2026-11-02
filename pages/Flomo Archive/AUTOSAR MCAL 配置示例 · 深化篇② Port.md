flomo-id:: MjU1NzY1Nzgx
flomo-created-at:: 2026-09-09T06:17:07+08:00
flomo-updated-at:: 2026-11-01T09:18:26+08:00
flomo-tags:: Area/技术/AUTOSAR/MCAL
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU1NzY1Nzgx
flomo-word-count:: 994
flomo-migration-status:: raw-import

# AUTOSAR MCAL 配置示例 · 深化篇② Port

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；不要在此文件中直接改写，专题提炼请链接到对应主题页。

**AUTOSAR MCAL 配置示例 · 深化篇② Port**

给 Port 一份带参数值的配置示例。

**示例（某 32 位 MCU，按实际引脚图调整）**：

- 引脚 1：GPIO 输出，初始电平 HIGH，上拉，MUX = GPIO。
- 引脚 2：GPIO 输入，下拉，MUX = GPIO。
- 引脚 3：复用 CAN（MUX = CAN\_RX），方向输入。
- 引脚 4：复用 CAN（MUX = CAN\_TX），方向输出。
- 引脚 5：复用 ADC 模拟输入（MUX = ADC，type = ADC）。
- 引脚 6：复用 SPI（MUX = SPI\_SCK），方向输出，初始电平 LOW。
- 引脚 7：运行时需切换方向（如 one-wire），设 PortPinDirectionChangeable = TRUE。

**提示**：

- 每根引脚按硬件设计确定功能（GPIO 还是外设复用），方向、上下拉、初始电平要与外设电气匹配。
- 复用外设的功能方向、波特率等由对应驱动模块（Can / Spi / Adc）配，Port 只配 MUX 和基础电气。
- 上电瞬间引脚状态取决于初始电平与上下拉，配错会影响外设 / 负载。

📎 模块卡（Port）： [https://v.flomoapp.com/mine/?memo\_id=MjU1NzIwOTQ1](https://v.flomoapp.com/mine/?memo_id=MjU1NzIwOTQ1)<br><br><br>
📎 总览： [https://v.flomoapp.com/mine/?memo\_id=MjU1NzIwNjEy](https://v.flomoapp.com/mine/?memo_id=MjU1NzIwNjEy)<br><br><br>
📎 专题入口： [https://v.flomoapp.com/mine/?memo\_id=MjU1NzIwMTcx](https://v.flomoapp.com/mine/?memo_id=MjU1NzIwMTcx)

#Area/技术/AUTOSAR/MCAL

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
