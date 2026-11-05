flomo-id:: MjYxMzU2NDQ4
flomo-created-at:: 2026-10-17T07:31:05+08:00
flomo-updated-at:: 2026-11-01T09:18:06+08:00
flomo-tags:: Area/技术/AUTOSAR
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYxMzU2NDQ4
flomo-word-count:: 1364
flomo-migration-status:: raw-import

# AUTOSAR 1000问 · OS&调度Q3：任务周期和优先级怎么定，跟 Runnable 的 TimingEvent 怎么互相约束？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；不要在此文件中直接改写，专题提炼请链接到对应主题页。

**AUTOSAR 1000问 · OS&调度Q3：任务周期和优先级怎么定，跟 Runnable 的 TimingEvent 怎么互相约束？**

▎ 五大学习法：费曼——把周期和优先级讲成「谁能等、谁不能等，倒推出来的」

**费曼（一句话本质）**：周期和优先级不是拍脑袋，是从「谁能等、谁不能等」倒推的。周期决定任务多久跑一次，优先级决定同一时刻谁先跑。

**SQ3R（去哪找）**

- 周期：Configurator 里的 OsTask（Task 周期 / 调度方式）、TimingEvent 的周期
- 优先级：OsTask 的优先级属性（注意方向，多数实现是数值越小优先级越高）
- 静态调度：Schedule Table

**麦肯锡金字塔（三件事，MECE）**

1. 周期怎么定：从信号和控制需求倒推。快变信号要短周期，慢变状态可以长周期。TimingEvent 周期要是 Task 周期的整数倍；一个 Task 的周期，取挂在它下面所有 Runnable 周期里能整除它们的那个值
2. 优先级怎么定：按速率单调——周期越短、优先级越高。优先级数值方向先确认清楚，别弄反
3. 互相约束：同一个 Task 里的 Runnable 共享一个周期。想让某个 Runnable 跑更快，只能把它单独挂到更快的 Task 上

**西蒙（流程五步）**

1. 列出所有 Runnable 和它们需要的触发周期
2. 按周期分组，得到几个 Task 周期
3. 给每个 Task 定优先级，短周期高优先级
4. 配 OsTask、映射 Runnable，Validate 看有没有周期不整除、优先级冲突
5. 生成后用 trace 量抖动和最大执行时间

**几个常见的坑**

- TimingEvent 周期不是 Task 周期的整数倍，校验报错或行为不符
- 优先级方向搞反，以为大数优先
- 周期太短 CPU 超载，或栈开太小
- 高优先级任务跑太久把低优先级饿死，没做预算控制
- 扩展任务没配 WaitEvent

📎 同专题 OS&调度Q2（如何在 Davinci 新增一个 Task）→ [https://v.flomoapp.com/mine/?memo\_id=MjYxMzU1MDgy](https://v.flomoapp.com/mine/?memo_id=MjYxMzU1MDgy)

📎 上一题 SWC类型Q6（RTE 生成之后怎么验证）→ [https://v.flomoapp.com/mine/?memo\_id=MjYxMzU2MzQ3](https://v.flomoapp.com/mine/?memo_id=MjYxMzU2MzQ3)

📎 AUTOSAR 1000问总表 → [https://v.flomoapp.com/mine/?memo\_id=MjMxMTQ2NDk4](https://v.flomoapp.com/mine/?memo_id=MjMxMTQ2NDk4)

#Area/技术/AUTOSAR

