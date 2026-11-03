flomo-id:: MjU2MjY2NDQ2
flomo-created-at:: 2026-09-12T13:15:22+08:00
flomo-updated-at:: 2026-11-01T09:23:56+08:00
flomo-tags:: Area/技术/自动驾驶
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU2MjY2NDQ2
flomo-word-count:: 1067
flomo-migration-status:: raw-import

# 自动驾驶 1000问 · 十一 · 第 31 题：自动驾驶为什么必须靠仿真？纯路测不够吗？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**自动驾驶 1000问 · 十一 · 第 31 题：自动驾驶为什么必须靠仿真？纯路测不够吗？**

**先算一笔账：纯路测数学上过不去**

- 要证明「比人安全」，需要海量里程——常引用的是要跑到上亿甚至上百亿公里量级。
- 一个车队一年能跑多少？几百辆 × 每天几百公里，一年也就千万公里级，差好几个数量级。
- 长尾场景（corner case）靠随机路测遇到，概率极低，为看一个罕见场景可能要跑几百万公里。

**仿真不可替代的四点**

1. 覆盖长尾：突然窜出的行人、掉落物、极端天气，仿真里可无限复现、可参数化生成，路测覆盖不了。

2. 效率与成本：仿真可并行、24 小时跑、加速时间（一天模拟几千次）；路测每公里都是油费、人力、场地。

3. 安全与责任：故意撞、极限避险这类危险场景只能仿真，真车测有事故和伦理风险。

4. 可复现：路测遇到问题很难精确复现，仿真里同一场景能反复跑、调参数、定位原因，对 DEBUG 太关键。


**但仿真不能代替路测**

- 软肋是保真度：物理模型、传感器模型（噪声、材质、天气）不可能完全真实，仿真过了不代表真车没问题（sim-to-real gap）。
- 真实世界有建模不了的复杂性：其他交通参与者的随机行为、道路施工、非标场景。
- 所以业界是「仿真为主、路测验证」的组合。

**结论**

- 纯路测不够——跑不到那个里程，也覆盖不了长尾。
- 纯仿真也不够——保真度有天花板，sim-to-real 有鸿沟。
- 正确做法：仿真 \+ 路测 \+ 实车数据回灌，三者闭环。

一句话：路测受限于里程和长尾覆盖率，仿真能无限复现、加速、还能安全测危险场景；但仿真有保真度天花板，最终得靠路测验证真实性——是组合，不是替代。

📎 导航： [https://v.flomoapp.com/mine/?memo\_id=MjU2MDMwMzA0](https://v.flomoapp.com/mine/?memo_id=MjU2MDMwMzA0)

📎 上一题： [https://v.flomoapp.com/mine/?memo\_id=MjU2MjY2MDg3](https://v.flomoapp.com/mine/?memo_id=MjU2MjY2MDg3)

#Area/技术/自动驾驶

#Archive/MigratedWiki<br><br>
#Archive/DeleteCandidate

#Archive/MigratedNotion
