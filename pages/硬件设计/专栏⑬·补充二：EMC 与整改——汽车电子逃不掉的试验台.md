flomo-id:: MjUxMDI5OTc5
flomo-created-at:: 2026-08-09T18:31:48+08:00
flomo-updated-at:: 2026-11-01T11:51:25+08:00
flomo-tags:: Area/技术/硬件
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5OTc5
flomo-word-count:: 1540
flomo-migration-status:: raw-import

# 专栏⑬·补充二：EMC 与整改——汽车电子逃不掉的试验台

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑬·补充二：EMC 与整改——汽车电子逃不掉的试验台**

**▎为什么 EMC 是汽车电子的生死线**

第7篇讲了 AEC-Q100（元件级），第8篇讲了 PCB 层叠——但整车厂验收的最后一关是 EMC 测试：传导发射（CE）、辐射发射（RE）、传导抗扰（CS）、辐射抗扰（RS）。过不了就上不了车。这不是玄学，是可分析、可整改的工程问题。

**▎电磁干扰三要素（所有 EMC 问题的分析框架）**

干扰源 → 耦合路径 → 敏感设备。整改就是干三件事：削弱源、切断路径、加固受害者。

**▎四个耦合路径**

1. 传导耦合：干扰沿导线/电源线直接走——电源线上串磁珠/共模电感
2. 辐射耦合：空间电磁波——屏蔽罩 \+ 接地
3. 容性耦合：相邻走线间寄生电容——拉开间距（3W 原则）
4. 感性耦合：相邻回路互感——减小回路面积

**▎你项目里最常见的干扰源**

1. DC-DC 开关节点（第4篇电源）：高频开关噪声，dV/dt 大——布局时开关回路尽量小
2. PWM 驱动（电机控制）：相线电压跳变——输出端加 RC 吸收
3. CAN/LIN 总线：共模噪声——共模扼流圈
4. 时钟线：谐波丰富——串阻降振铃

**▎整改三板斧（按顺序试）**

1. 滤波：电源入口 π 滤波（磁珠 \+ 电容）、信号线串阻/磁珠、共模扼流圈
2. 屏蔽：敏感器件加屏蔽罩、线束用屏蔽线、屏蔽层单点接地（低频）/多点接地（高频）
3. 接地：单点 vs 多点——低频信号单点地防地环路，高频多点地降回路电感；地平面永远优先于走线

**▎测试不过的排查顺序**

1. 先看超标频点：是开关频率的谐波（DC-DC/PWM）还是时钟谐波（晶振/总线）——频点会告诉你干扰源在哪
2. 对应频点去找源：100MHz 附近一般是时钟/数字信号，几十 MHz 一般是开关电源
3. 对症下药：源端串阻降振铃、电源加磁珠、IO 加滤波、线束加屏蔽

**▎一句话总结**：EMC 三要素（源/路径/受害）是分析框架，整改三板斧（滤波/屏蔽/接地）是手段；测试超标先看频点定干扰源，别上来就瞎加磁珠。

📎 第7篇：汽车电子硬件（AEC-Q100）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTQ1](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTQ1)<br><br><br>
📎 第8篇：PCB设计 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTg2](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTg2)<br><br><br>
📎 第4篇：电源设计 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NDQ5](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NDQ5)<br><br><br>
📎 专栏⑬导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2MDE3](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3)

**专栏⑬进度：10/10 + 补充二**

#Area/技术/硬件

