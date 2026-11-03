flomo-id:: MjUzMzkxMTY4
flomo-created-at:: 2026-08-24T20:41:25+08:00
flomo-updated-at:: 2026-11-01T11:56:28+08:00
flomo-tags:: Area/技术/电气与电子
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUzMzkxMTY4
flomo-word-count:: 1175
flomo-migration-status:: raw-import

# 电气 10000问 · EMC Q2：产品 EMC 整改的「三板斧」是什么？为什么接地和屏蔽能解决大部分辐射问题？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**电气 10000问 · EMC Q2：产品 EMC 整改的「三板斧」是什么？为什么接地和屏蔽能解决大部分辐射问题？**

▎ 五大学习法：费曼学习法——把「整改三板斧」讲成「治标的三招」

**三板斧（基本措施）**

1. 接地（Grounding）：给干扰电流提供低阻抗回路——让它按设计路径流走，而不是乱串
2. 屏蔽（Shielding）：用导电/导磁材料把源或受害包起来——切断辐射路径
3. 滤波（Filtering）：用 LC/磁珠/共模电感把不该出现的频率滤掉——切断传导路径

- 补充常见招：减小环路面积（走线/布局）、加吸收（磁环/吸收材料）、去耦电容

**为什么接地和屏蔽能解决大部分辐射问题**

- 辐射问题的根源：高频电流在导线上流动，导线就是天线——环路面积越大、电流频率越高、辐射越强
- 接地的作用：把高频电流引到地（低阻抗回路），让电流走受控路径而不是在机壳/线缆上乱窜形成天线；接地阻抗要低（大面积地、短接地线）——地线长了阻抗高，接地反而成天线
- 屏蔽的作用：导体外壳把辐射反射/吸收——内部干扰出不去（防发射）、外部干扰进不来（防敏感）；屏蔽要有完整导电连续性（缝隙/开口是泄漏点）
- 两者配合：屏蔽体必须接地良好，否则屏蔽层本身变成天线（不接地的屏蔽比不屏蔽还糟）
- 所以「接地 \+ 屏蔽」从源头（电流路径）和路径（辐射通道）两头堵——覆盖了辐射问题的大多数

**工程口诀**

- 先布局（环路小、分区）、再接地、再屏蔽、再滤波——成本从低到高，见效从根到表
- 地是 EMC 的命根：地没做好，其他都是白搭

**一句话总结**：整改三板斧 = 接地（给干扰电流受控回路）\+ 屏蔽（切断辐射通道）\+ 滤波（切传导通道）；辐射问题大多是「电流在导线上当天线」——接地让电流走受控路径、屏蔽把源/受害包起来，屏蔽体还必须接地良好否则自身变天线；先布局再接地再屏蔽再滤波，地是命根。

📎 题目（10000问）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc1MTM2](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc1MTM2)<br><br><br>
📎 EMC Q1（三要素与耦合路径）→ [https://v.flomoapp.com/mine/?memo\_id=MjUzMzkxMTYy](https://v.flomoapp.com/mine/?memo_id=MjUzMzkxMTYy)

#Area/技术/电气与电子

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
