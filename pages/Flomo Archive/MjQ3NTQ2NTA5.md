flomo-id:: MjQ3NTQ2NTA5
flomo-created-at:: 2026-07-19T18:46:00+08:00
flomo-updated-at:: 2026-11-01T11:51:36+08:00
flomo-tags:: Area/技术/硬件
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTA5
flomo-word-count:: 3258
flomo-migration-status:: raw-import

# 专栏⑬·第6篇：嵌入式MCU硬件设计——从原理图到上电

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑬·第6篇：嵌入式MCU硬件设计——从原理图到上电**

📎 第5篇：信号完整性 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NDgw](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NDgw)

**一、最小系统——MCU能跑起来的最少条件**

1. MCU的最小系统由四部分组成：电源、时钟、复位、调试接口。缺了任何一个MCU都跑不起来。为什么先把这四个搞通再管其他的——因为你做一块新板子，回来第一件事就是焊最小系统、烧一个LED闪烁的程序。如果LED不闪，是软件还是硬件的问题——这四个里的哪一个出了问题？

2. 每个电源引脚配一个去耦电容——这是PCB Layout的"第一铁律"。0.1μF+1μF（或4.7μF）并联，紧贴MCU的电源引脚。为什么两个电容？因为0.1μF的自谐振频率约几十MHz，负责高频去耦；1-10μF的自谐振频率约几MHz，负责中频去耦。如果Layout空间不够只能放一个——放0.1μF（高频去耦更重要）

3. 模拟电源（VDDA/VREF+）的供电应该独立于数字电源吗？在STM32中，VDDA必须连接到VDD，即使不使用ADC。如果用且只用VDD给VDDA供电——数字电路的高频噪声会通过电源耦合到ADC的参考电压，导致ADC读数跳动。所以建议在VDDA和VDD之间加一个磁珠（Ferrite Bead）或低通滤波器（如10Ω+1μF的RC）？


**二、时钟电路——晶振的设计与布局**

1. 晶振为什么需要负载电容（C\_L）？晶振的振荡频率由它的机械尺寸决定，但外接电容会微调振荡频率。负载电容C\_L由两个外部电容C1和C2串联（加上PCB和引脚寄生电容C\_stray）计算：C\_L = (C1×C2)/(C1+C2) + C\_stray。如果C1=C2=22pF、C\_stray≈5pF，C\_L≈16pF——如果你买的晶振标称负载电容是20pF，实际16pF会导致晶振频率偏移几十到几百ppm——可能影响CAN的位定时精度？

2. 晶振最大的Layout禁忌——晶振下方的PCB的所有层都不能走任何信号线。为什么？晶振的高阻抗振荡回路对寄生电容极度敏感——如果晶振下方有一根信号线经过，信号线与晶振焊盘之间的寄生电容会改变振荡频率。同时晶振产生的电磁场也会干扰下方的信号线？

3. 为什么MCU的PLL（锁相环）需要独立的电源引脚（如STM32的VDD\_PLL或VCAP）——PLL内部是一个模拟电路（振荡器+相位比较器+环路滤波器），对电源噪声非常敏感。数字电路的高频噪声如果耦合到PLL的电源上，PLL输出时钟的抖动（Jitter）会增加——最终影响CAN和Ethernet的时序精度


**三、复位电路——上电那一刻的顺序**

1. MCU的复位引脚在正常工作时是高电平（通常内部上拉到VDD）。为什么复位电路需要加一个外部电容（通常0.1μF）？上电时电容两端电压不能突变，复位引脚电压缓慢上升，给MCU的内部振荡器足够的时间稳定。这个RC常数（R×C）一般设多大——如果复位引脚内部有40kΩ上拉，外接0.1μF，τ=4ms——大概3τ=12ms后复位引脚才到达高电平？但对于某些MCU来说这个时间可能太长，需要查数据手册的"最小复位脉冲宽度"

2. 外部看门狗（External Watchdog）——在安全关键系统（你记过的AUTOSAR功能安全ISO 26262）中，MCU内部看门狗（IWDG）的可靠性不够（如果MCU主时钟停了，IWDG也无法工作）。所以需要外部的独立看门狗芯片，有自己的独立时钟源，在MCU没按时喂狗时直接复位MCU或切断电源再上电？


**四、调试接口——JTAG/SWD的硬件设计**

1. 你2023年记过JTAG的4线接口：TMS（模式选择）、TCK（时钟）、TDI（数据输入）、TDO（数据输出）。为什么现在大多数MCU还支持SWD（2线：SWDIO+SWCLK），且SWD能实现跟JTAG同样的调试功能？因为SWD在SWCLK时钟线上复用：在SWCLK的上升沿传输"请求"，在SWCLK的下降沿传输"响应"——一根数据线实现了双向通信

2. JTAG/SWD的信号是否需要上拉/下拉电阻？通常：JTAG的TMS/TDI需要有上拉电阻（使默认状态为高），nTRST需要上拉（上电时不触发复位），TDO不需要（由MCU驱动）。SWD的SWDIO（双向线）需要一个上拉电阻（约10kΩ）——如果没有上拉，调试器第一次连接MCU时可能发现不了设备。这个细节被多少硬件工程师忽略了导致第一板烧录不进去？

3. SWD接口只用了2根线，为什么不能省掉RST（复位）线——因为当SWD调试器需要连接一个"被锁死"的MCU（比如烧了错误的时钟配置导致MCU无法运行），它可以通过RST引脚复位MCU，在复位后立即发送SWD连接请求——在晶振起振前就抢占SWD总线。如果没有RST线——MCU被锁死时只能通过断电重试来恢复？


**五、实际Layout中的MCU周边电路设计**

1. ADC输入电路的阻抗匹配——你记过ADC采样异常（读数偏高）的案例，原因是采样时间不够、源阻抗太高。硬件设计时怎么避免——在ADC输入引脚和信号源之间加一个运放电压跟随器（缓冲），它的输入阻抗极高（GΩ级），输出阻抗极低（几十Ω），保证ADC的采样电容能在采样时间内完全充电。如果成本敏感不加运放——信号源的输出阻抗必须< MCU的ADC输入阻抗的1/10

2. GPIO的驱动能力——MCU的GPIO可以输出多少电流？STM32的GPIO典型值为±8mA（推挽输出）。如果你要用GPIO直接驱动一个LED（LED电流通常20mA）——已经超了！如果超载使用，长期可靠性会下降吗——不会立即烧毁，但GPIO的电压输出会偏离VDD（从3.3V降到2.8V），LED亮度不够。同时多个引脚超载会使MCU内部电源产生压降？

3. 为什么裸露焊盘（Exposed Pad / Thermal Pad）必须焊接到GND上——裸露焊盘有两个功能：散热（芯片的热量通过它传到PCB上的铜皮）和接地（提供一个低阻抗的GND连接）。如果裸露焊盘没焊好——芯片散热不良，轻则温度升高（影响MCU性能），重则热保护关机？

4. 未使用的IO引脚怎么处理——浮空？接固定电平？如果你在驱动GPIO时水平不够，就会留下一堆悬空的IO引脚——这些引脚可能是高阻抗输入，容易感应外部噪声，使MCU进入意外的状态。一般的做法是：通过软件配置为输出低或内部下拉——如果配置为内部上拉模式也可以


📎 第5篇：信号完整性 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NDgw](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NDgw)

📎 第7篇：汽车电子硬件 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTQ1](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTQ1)

📎 专栏⑬导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2MDE3](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3)

**专栏⑬进度：6/10篇**

#Area/技术/硬件

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
