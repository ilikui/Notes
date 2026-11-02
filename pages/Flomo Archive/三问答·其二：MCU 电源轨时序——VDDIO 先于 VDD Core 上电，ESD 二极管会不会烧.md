flomo-id:: MjQ5MzM1NDg2
flomo-created-at:: 2026-07-30T18:08:21+08:00
flomo-updated-at:: 2026-11-01T09:32:07+08:00
flomo-tags:: Area/学习管理/嵌入式学习
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ5MzM1NDg2
flomo-word-count:: 1933
flomo-migration-status:: raw-import

# 三问答·其二：MCU 电源轨时序——VDDIO 先于 VDD\_Core 上电，ESD 二极管会不会烧

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**三问答·其二：MCU 电源轨时序——VDDIO 先于 VDD\_Core 上电，ESD 二极管会不会烧**

**问题本质：** MCU 的 I/O 引脚内部有 ESD 保护二极管——阳极接 GND，阴极接 VDDIO（或 VDD\_Core，取决于 I/O 电源域的设计）。如果 VDDIO 已经上电（比如 3.3V）但 VDD\_Core 还没上电（0V），外部设备通过 I/O 引脚向 MCU 灌入 3.3V——ESD 二极管的正向压降约 0.7V——3.3V - 0.7V = 2.6V 施加在芯片内部电路上。如果内部电路还没上电，这个 2.6V 可能通过 ESD 二极管反灌到 VDD\_Core 网络——Vin/2 电平导致内部逻辑处于不确定状态——最坏情况：闩锁（Latch-up）或 ESD 二极管过流损坏。

**三个方案，从简单到可靠：**

**方案 A：读 datasheet 的 "Power-up Sequence" 确认风险（最低成本，但需要正确解读）**

绝大多数汽车级 MCU（TC3xx、S32K、RH850）的 datasheet 都有 "Power-up and Power-down Sequence" 章节，里面有：

- VDD\_Core 和 VDDIO 的上电顺序要求（通常要求 VDD\_Core 先于或同时于 VDDIO）

- VDDIO 和 VDDA 的关系（通常 VDDA 必须 ≥ VDDIO）

- 各电源轨之间的最大压差允许值（比如 VDDIO - VDD\_Core ≤ 0.5V）


如果 datasheet 写明 "VDDIO 不能先于 VDD\_Core 上电"——那就说明这个芯片的 I/O 电源域依赖于 Core 电源域先就绪。如果没写但也没禁止——可以用实验验证：让 VDDIO 先上电、Core 后上电，量 I/O 引脚在 Core 上电前的状态——如果不正常（电压反灌/电流倒灌），就不能这么用。

**但有一个常见的陷阱：** datasheet 的时序要求通常是"recommended"，不是"absolute maximum"。有些芯片上了电也能工作——但长期可靠性下降（ESD 二极管反复承受反向偏置 → 寿命缩短）。项目中的做法是：安全第一——按照时序要求来设计，不依赖"大部分时间能工作"。

**方案 B：加电压监控芯片（如 TPS3808）（推荐——一劳永逸）**

TPS3808 是 TI 的电压监控复位芯片——监控 VDD\_Core 的电压是否达到阈值（如 1.2V），输出一个 open-drain 的 RESET 信号接 MCU 的复位引脚。当 VDD\_Core 未达到阈值时，RESET 保持低电平——MCU 不启动——IO 引脚处于高阻态（Hi-Z），ESD 二极管不会导通。

但这只解决了"MCU 不启动时 I/O 不会反灌"的问题—— **电源轨本身的上电时序还是要由电源芯片（PMIC/DC-DC/LDO）的使能顺序来保证。** TPS3808 只做监控和复位，不做电源轨的时序控制。

更好的做法：用 PMIC（如 TPS65218、TC3xx 配套的 TLF35584）——它内置了电源轨的上电时序控制，按配置好的顺序依次使能各电源轨。

**方案 C：用 PMIC 的使能顺序控制时序（最可靠但成本最高）**

PMIC 通过 EN（Enable）引脚的延迟链来控制各电源轨的上电顺序。比如：EN\_Core 先使能 → Core LDO 输出 1.2V → 延迟 1ms → EN\_IO 使能 → IO LDO 输出 3.3V → 延迟 1ms → VDDA LDO 输出 3.3V。完全可控，无需额外器件。

**工程建议：**

- 样机阶段：读 datasheet 确认要求 + 示波器量各电源轨的上电顺序（看是否满足 datasheet 的时序图）

- 量产阶段：用 PMIC 或 使能延迟电路 保证时序。不依赖"datasheet 说可以容忍同时上电"——不同批次芯片的 ESD 参数有离散性，量产时不能赌


📎 7/30 今日三问 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5MjU2NzE0](https://v.flomoapp.com/mine/?memo_id=MjQ5MjU2NzE0)

<p></p>

#Area/学习管理/嵌入式学习

#Archive/MigratedNotion<br>
#Archive/DeleteCandidate
