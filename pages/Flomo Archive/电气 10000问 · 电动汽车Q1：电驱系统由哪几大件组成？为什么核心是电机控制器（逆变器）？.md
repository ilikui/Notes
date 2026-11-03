flomo-id:: MjUzMzkwNjQx
flomo-created-at:: 2026-08-24T20:37:15+08:00
flomo-updated-at:: 2026-11-01T11:56:44+08:00
flomo-tags:: Area/技术/电气与电子
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUzMzkwNjQx
flomo-word-count:: 1209
flomo-migration-status:: raw-import

# 电气 10000问 · 电动汽车Q1：电驱系统由哪几大件组成？为什么核心是电机控制器（逆变器）？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**电气 10000问 · 电动汽车Q1：电驱系统由哪几大件组成？为什么核心是电机控制器（逆变器）？**

▎ 五大学习法：费曼学习法——把「电驱三电」讲成人话

**电驱系统的几大件**

- 电机（Motor）：永磁同步 PMSM 或异步感应——把电能转机械能（驱动车轮）
- 电机控制器（MCU / 逆变器）：IGBT/SiC 模块——把电池的直流电变成变频交流电驱动电机
- 减速器（Reducer）：把电机的高转速低扭矩变成车轮需要的低转速高扭矩（+差速）
- 加上外围：电池（BMS 管）、车载充电机 OBC、DC-DC（高压转 12V）
- 三电 = 电池、电机、电控——电驱 = 电机 \+ 控制器 \+ 减速器

**为什么核心是电机控制器（逆变器）**

- 电机本体是执行机构，性能上限由控制器决定：控制器输出什么电压/频率/相位的波形，电机就怎么转
- 逆变器 = 功率电子核心：用 IGBT/SiC 高频开关，把电池直流电逆变成三相变频交流——变频变压全靠它
- FOC 矢量控制算法跑在控制器里（呼应电力拖动Q2）：扭矩怎么响应、效率多高、低速有没有力，全是控制器的活
- 能量回收（制动回馈）：控制器把电机变成发电机，交流电整流回电池——能不能回收、回收多少，也看控制器
- 所以：电机是身体，控制器是大脑+心脏——电驱的性能、效率、安全性大头都在控制器

**关键器件**

- IGBT：当前主流（耐压 600-1200V），SiC MOSFET：新一代（效率更高、开关更快、高温好）——800V 高压平台必配 SiC
- 冷却：控制器功率密度高，液冷是标配
- 安全：过流/过温/母线电压监控 \+ 主动放电（碰撞后母线电容放电）都在控制器里

**一句话总结**：电驱三件套 = 电机 \+ 电机控制器（逆变器）\+ 减速器；控制器是核心——它用 IGBT/SiC 把直流变变频交流、跑 FOC 算法管扭矩和效率、还负责能量回收和故障保护，电机只是执行它的指令。

📎 题目（10000问）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc1MTM2](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc1MTM2)<br><br><br>
📎 电力拖动Q2（FOC——电机控制器的核心算法）→ [https://v.flomoapp.com/mine/?memo\_id=MjUzMzkwNDQw](https://v.flomoapp.com/mine/?memo_id=MjUzMzkwNDQw)

#Area/技术/电气与电子

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
