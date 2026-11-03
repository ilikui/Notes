flomo-id:: MjUxMDMwMDAz
flomo-created-at:: 2026-08-09T18:31:59+08:00
flomo-updated-at:: 2026-11-01T11:51:23+08:00
flomo-tags:: Area/技术/硬件
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDMwMDAz
flomo-word-count:: 1762
flomo-migration-status:: raw-import

# 专栏⑬·补充三：电源深入——从「能出电压」到「纹波达标、环路稳定」

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑬·补充三：电源深入——从「能出电压」到「纹波达标、环路稳定」**

**▎第4篇只解决了「有电」，这篇解决「电好不好」**

第4篇讲了 LDO 和 DC-DC 怎么工作。但实际项目里：电源纹波把 ADC 精度吃掉、DC-DC 啸叫、负载跳变电压跌落、多路电源上电顺序不对导致 MCU 死锁——这些才是电源设计的后半场。

**▎纹波：DC-DC 的固有噪声**

1. 纹波来源：开关纹波（开关频率基波 \+ 谐波）\+ 输出电容 ESR 尖峰
2. 降纹波三板斧：加大输出电容（降 ESR，用 MLCC 并联）、加 LC 后级滤波、选更低 ESR 电容
3. LDO 的噪声是宽带噪声，DC-DC 是开关纹波——混合供电时：敏感模拟电路用 LDO 接在 DC-DC 后面（级联）
4. 纹波规格怎么定：ADC 参考电压纹波要求最严，一般 < 10mVpp 才安全

**▎环路稳定：为什么啸叫、为什么振荡**

1. DC-DC 是负反馈系统，环路增益相位裕度不够 → 振荡/啸叫
2. 输出电容 ESR 太低（全 MLCC）会让环路不稳定——很多 DC-DC 数据手册要求 ESR 有下限或加纹波注入
3. 判断标准：负载瞬态响应——跳变后有没有振铃，振铃几下
4. 排查：拿示波器看 SW 节点，开关占空比抖动 = 环路在临界

**▎布局：电源工程师 80% 的活**

1. 开关回路（输入电容 → MOS → 电感 → 输出电容）面积最小化——回路面积大 = 辐射大（接补充二 EMC）
2. 反馈走线远离电感/SW 节点，从输出电容根部取（Kelvin 接法）
3. 功率地 vs 模拟地：单点连接，别让开关电流流过模拟地

**▎多路电源树：上电顺序**

1. 车规 ECU 常见：12V → 5V（DC-DC）→ 3.3V / 1.8V / 1.2V（LDO 或 DCDC）
2. 上电顺序坑：MCU 内核先于 IO 供电，IO 会漏电/闩锁——按数据手册要求排序
3. 常用手段：使能脚顺序控制（EN 级联）、电源监控芯片（PMIC / 复位监控）
4. 下电顺序同样要管：掉电不同步可能写坏 Flash

**▎三个坑**

1. 电容全上 MLCC：ESR 太低环路不稳定、啸叫——看手册要不要加电解/钽电容
2. 反馈取线从负载端拉：压降导致采样不准——从输出电容根部取
3. 上电顺序不管：MCU 死锁、Flash 写坏——上电时序图和 PMIC 是标配

**▎一句话总结**：电源后半场是「纹波、环路、布局、时序」四件事——降纹波靠电容和滤波，防振荡看环路和 ESR，减辐射靠回路面积，保稳定靠上电顺序。

📎 第4篇：电源设计（LDO/DC-DC 基础）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NDQ5](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NDQ5)<br><br><br>
📎 第6篇：MCU 最小系统 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTA5](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTA5)<br><br><br>
📎 第8篇：PCB设计 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTg2](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTg2)<br><br><br>
📎 专栏⑬导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2MDE3](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3)

**专栏⑬进度：10/10 + 补充三**

#Area/技术/硬件

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
