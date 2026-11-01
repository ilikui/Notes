flomo-id:: MjUzMzkxMTYy
flomo-created-at:: 2026-08-24T20:41:20+08:00
flomo-updated-at:: 2026-11-01T11:56:30+08:00
flomo-tags:: Area/技术/电气与电子
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUzMzkxMTYy
flomo-word-count:: 1130
flomo-migration-status:: raw-import

# 电气 10000问 · EMC Q1：电磁兼容的「三要素」是什么？干扰有哪几种耦合路径？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**电气 10000问 · EMC Q1：电磁兼容的「三要素」是什么？干扰有哪几种耦合路径？**

▎ 五大学习法：西蒙学习法——把「EMC 三要素」这个分析框架钻透

**三要素**

- 干扰源（Source）：产生电磁干扰的源头——开关电源、电机换向、数字时钟、继电器触点、雷电
- 耦合路径（Coupling Path）：干扰从源传到受害设备的途径
- 敏感设备（Victim / Receptor）：受干扰影响的设备——传感器、通信电路、控制器、人体
- 处理思路：三要素里打断任何一个，问题就解决——这是 EMC 所有措施的总纲

**四种耦合路径**

1. 传导耦合：干扰沿导线/电源线/信号线直接传导——共电源线、共地线（公共阻抗）传输
2. 辐射耦合：干扰以电磁波形式在空间传播——近场（电场/磁场耦合）和远场（电磁波）——源和受害之间没有导体连接
3. 容性耦合（电场耦合）：两导体之间有寄生电容，高频电压通过电容串扰——线束平行就是大电容
4. 感性耦合（磁场耦合）：两回路之间有互感，高频电流的磁场在另一回路感应电压——线束靠近、环路面积大就是大互感

**怎么用这个框架**

- 诊断：先判断「源在哪、路径是传导还是辐射、受害是谁」——对症下药
- 传导问题：加滤波器（共模/差模）、光电隔离、分开地
- 辐射问题：屏蔽、接地、减小环路、加磁环
- 高低频分开：低频（kHz 级）多为传导，高频（MHz 级）多为辐射——频率决定路径

**一句话总结**：EMC 三要素 = 干扰源 + 耦合路径 + 敏感设备，打断任一个就解决问题（总纲）；耦合路径四类——传导（导线）、辐射（空间）、容性（寄生电容）、感性（互感）——先判断「源、路径、受害」再对症，频率决定路径：低频多传导、高频多辐射。

📎 题目（10000问）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc1MTM2](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc1MTM2)<br><br><br>
📎 电气安全Q2（RCD——EMC 是设备级、安全是系统级，同为可靠性）→ [https://v.flomoapp.com/mine/?memo\_id=MjUzMzkxMDcz](https://v.flomoapp.com/mine/?memo_id=MjUzMzkxMDcz)

#Area/技术/电气与电子

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
