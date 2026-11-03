flomo-id:: MjYxMzU2NTI1
flomo-created-at:: 2026-10-17T07:32:14+08:00
flomo-updated-at:: 2026-11-01T09:18:04+08:00
flomo-tags:: Area/技术/AUTOSAR
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYxMzU2NTI1
flomo-word-count:: 1256
flomo-migration-status:: raw-import

# AUTOSAR 1000问 · OS&调度Q4：OS 的保护与错误处理怎么做？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；不要在此文件中直接改写，专题提炼请链接到对应主题页。

**AUTOSAR 1000问 · OS&调度Q4：OS 的保护与错误处理怎么做？**

▎ 五大学习法：费曼——把保护讲成「在任务跑飞、栈被踩穿之前拦住它」

**费曼（一句话本质）**：OS 得在任务跑飞、栈被踩穿之前拦住它，把错误收进一个统一的处理入口，别让整块 ECU 直接挂掉。

**SQ3R（去哪找）**

- Configurator 的 Os 模块：内存保护、栈监控、OsApplication、各种 Hook
- 收尾：Shutdown 相关的 Hook
- 错误入口：ProtectionHook（保护类错误）、ErrorHook（OSEK 标准 API 错误）

**麦肯锡金字塔（四层，从便宜到贵，MECE）**

1. 栈监控（最便宜）：打开栈监控，给每个 Task/ISR 配填充模式和栈大小；运行期查栈底填充字节有没有被改动，被改了就报溢出。它只检测，不阻止
2. 内存保护（中等，要芯片带 MPU/MMU）：把每个 OsApplication 划成受保护区域，越界访问触发 trap
3. 时序保护：给 Task/ISR 配执行预算，超了就触发保护，防止某个任务跑太久把别人饿死
4. 错误处理与收尾：ProtectionHook 收到保护错后决定终止任务还是重启应用；ErrorHook 处理标准 API 错误；Shutdown Hook 在关机时收尾

**西蒙（流程）**：先看芯片有没有 MPU/MMU，有才谈内存保护 → 开栈监控，给关键任务配栈 → 要隔离就划 OsApplication、开内存保护 → 配执行预算 → 在 ProtectionHook/ErrorHook 里定「终止还是重启」→ 用故障注入测（故意写越界、故意超预算）

**几个常见的坑**

- 栈监控只报警不停手，没人处理 ProtectionHook，该崩还是崩
- 内存保护要芯片支持，区域划不好反而拖性能
- OsApplication 边界划错，跨应用调用变慢甚至报错
- ErrorHook 里别写重逻辑，容易重入
- Shutdown Hook 里想持久化数据，但那会儿时间和资源都紧张

📎 上一题 OS&调度Q3（任务周期和优先级）→ [https://v.flomoapp.com/mine/?memo\_id=MjYxMzU2NDQ4](https://v.flomoapp.com/mine/?memo_id=MjYxMzU2NDQ4)

📎 AUTOSAR 1000问总表 → [https://v.flomoapp.com/mine/?memo\_id=MjMxMTQ2NDk4](https://v.flomoapp.com/mine/?memo_id=MjMxMTQ2NDk4)

#Area/技术/AUTOSAR

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
