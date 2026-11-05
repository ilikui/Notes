flomo-id:: MjYxMzU2MzQ3
flomo-created-at:: 2026-10-17T07:29:39+08:00
flomo-updated-at:: 2026-11-01T09:18:08+08:00
flomo-tags:: Area/技术/AUTOSAR
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYxMzU2MzQ3
flomo-word-count:: 1289
flomo-migration-status:: raw-import

# AUTOSAR 1000问 · SWC类型Q6：RTE 生成之后怎么验证接对了？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；不要在此文件中直接改写，专题提炼请链接到对应主题页。

**AUTOSAR 1000问 · SWC类型Q6：RTE 生成之后怎么验证接对了？**

▎ 五大学习法：费曼——把验证讲成「拿生成的代码跟配置对一遍」

**费曼（一句话本质）**：Generate 不报错不代表接对了。要拿生成的代码和配置对一遍，确认「配置里连的」和「代码里调出来的」是一回事。

**SQ3R（去哪找）**

- 生成的 Rte.c / Rte.h：看每个 Runnable 的函数壳、每个 Port 的读写 API（Rte\_Read\_ / Rte\_Write\_ / Rte\_Call\_ / Rte\_Send\_ / Rte\_Receive\_）
- SchM.c：看调度骨架，确认每个 Runnable 被编进了对的 Task
- Generate 的日志和 Validate 报告

**麦肯锡金字塔（三层验证，MECE）**

1. 静态对齐（代码 vs 配置）：每个 R-Port 都生成了对应的 Rte\_Read/Receive，每个 P-Port 生成了 Rte\_Write/Send，每个映射过的 Runnable 在 SchM 里出现在正确的 Task 下
2. 编译期：全量重生成 \+ clean build，diff 生成物，看有没有该出现却没出现的 API
3. 运行期：加最小桩或日志，看数据流和调用顺序对不对，周期 Task 里的 Runnable 是否按周期被调

**西蒙（流程四步）**：Generate 后先看 Rte.c 里这个 SWC 的 API 清单 → 对着 Configurator 的连接表逐个勾 → clean build 做一次 diff → 下板跑，用 DLT/trace 看调用与数据

**几个常见的坑**

- 只 Generate 不 clean build，旧文件残留，看着对其实是脏的
- Rte\_Read 的返回值没检查（NEVER\_RECEIVED / 超时状态），运行期拿了旧值还不知道
- C/S 接口忘了实现 server runnable，Rte\_Call 永远等不到结果
- 跨 ECU 的信号没打通，Rte\_Read 一直返回默认值

📎 上一题 SWC类型Q5（Port Connector 怎么连）→ [https://v.flomoapp.com/mine/?memo\_id=MjYxMzU2Mjc5](https://v.flomoapp.com/mine/?memo_id=MjYxMzU2Mjc5)

📎 AUTOSAR 1000问总表 → [https://v.flomoapp.com/mine/?memo\_id=MjMxMTQ2NDk4](https://v.flomoapp.com/mine/?memo_id=MjMxMTQ2NDk4)

#Area/技术/AUTOSAR
