flomo-id:: MjUzMzkwNTE3
flomo-created-at:: 2026-08-24T20:36:04+08:00
flomo-updated-at:: 2026-11-01T11:56:48+08:00
flomo-tags:: Area/技术/电气与电子
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUzMzkwNTE3
flomo-word-count:: 1392
flomo-migration-status:: raw-import

# 电气 10000问 · 新能源Q1：光伏发电为什么要做 MPPT？光照变化时光伏电池的工作点怎么移动？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**电气 10000问 · 新能源Q1：光伏发电为什么要做 MPPT？光照变化时光伏电池的工作点怎么移动？**

▎ 五大学习法：西蒙学习法——把「MPPT」讲成「追着最大功率点跑」

**光伏电池的 I-V / P-V 特性**

- I-V 曲线：电压从 0 到开路电压 Voc，电流从短路电流 Isc 降到 0——近似一个拐弯的台阶
- P-V 曲线（功率 = 电流×电压）：在某个电压点上有唯一的功率最大值（最大功率点 MPP）
- 工作点由负载决定：负载阻抗不同，工作点在 I-V 曲线上不同位置，功率也不同

**为什么要 MPPT**

- 光伏电池的 MPP 会随光照和温度移动：光照强 → 电流大 → MPP 移向高功率；温度高 → 电压降 → MPP 移向低电压
- 如果工作点不跟踪：光照变了但负载没变，工作点偏离 MPP——发电量损失（可能损失 20-30%）
- MPPT = 不断调整工作点（通过 DC-DC 变换器的占空比改变等效负载），让光伏始终工作在最大功率点

**光照变化时工作点怎么移动**

- 光照增强：Isc 增大（电流上升），MPP 沿电压轴基本不动、功率升高——曲线整体上移
- 光照减弱：Isc 减小，MPP 功率下降、电压略降——曲线整体下移
- 温度升高：Voc 下降（电压降低），MPP 移向更低电压——温度每升 1℃，电压降约 0.4-0.5%
- 所以 MPPT 要追：光照/温度一变，MPP 就换位置，跟踪算法要跟上

**常用 MPPT 算法**

- 扰动观察法（P&O，最常用）：每隔一段加一点扰动（改变占空比），看功率变大还是变小，变大就继续同方向、变小就反向——简单、无需模型
- 增量电导法（IncCond）：比较 dP/dV 与 -I/V 的关系判断当前在 MPP 左边还是右边——更准、响应快
- 恒定电压法（CV）：近似认为 MPP 电压 ≈ 0.8×Voc——最简单但精度差，光照变化大时失效
- 工程实现：MPPT 算法在控制器里跑，输出占空比给 Boost（光伏常用 Boost 升压）

**一句话总结**：光伏 MPP 随光照（电流变）和温度（电压变）移动，工作点不跟踪就损失 20-30% 发电量；MPPT = 通过调 DC-DC 占空比改等效负载，让工作点钉在 MPP 上——扰动观察法简单常用、增量电导法更准，光照强 MPP 上移、温度高 MPP 左移。

📎 题目（10000问）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ2Mzc1MTM2](https://v.flomoapp.com/mine/?memo_id=MjQ2Mzc1MTM2)<br><br><br>
📎 电力电子Q3（Buck/Boost——MPPT 的执行机构）→ [https://v.flomoapp.com/mine/?memo\_id=MjUzMTQyMDIy](https://v.flomoapp.com/mine/?memo_id=MjUzMTQyMDIy)

#Area/技术/电气与电子

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
