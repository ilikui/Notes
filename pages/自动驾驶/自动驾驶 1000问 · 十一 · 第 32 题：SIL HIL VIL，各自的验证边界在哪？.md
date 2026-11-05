flomo-id:: MjU2MjY2NTA1
flomo-created-at:: 2026-09-12T13:15:56+08:00
flomo-updated-at:: 2026-11-01T09:23:54+08:00
flomo-tags:: Area/技术/自动驾驶
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU2MjY2NTA1
flomo-word-count:: 1342
flomo-migration-status:: raw-import

# 自动驾驶 1000问 · 十一 · 第 32 题：SIL / HIL / VIL，各自的验证边界在哪？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**自动驾驶 1000问 · 十一 · 第 32 题：SIL / HIL / VIL，各自的验证边界在哪？**

先定义三个层级：

- SIL = Software-in-the-Loop：软件在环，被测代码跑在 PC / 服务器上，无真实硬件。
- HIL = Hardware-in-the-Loop：硬件在环，真实 ECU 接在仿真环境里，传感器 / 执行器信号由 I/O 板卡给。
- VIL = Vehicle-in-the-Loop：整车在环，真车（或整车台架）在虚拟场景里跑，虚拟信号经传感器注入喂给真车。

**各自的验证边界**

1. SIL（软件在环）

- 测什么：算法逻辑、控制策略、软件功能正确性。
- 边界：没有真实硬件、真实时序和资源约束，跑理想模型；测不了实时性、中断、驱动、总线时序。
- 用在哪：算法早期开发、快速迭代、CI 回归。

1. HIL（硬件在环）

- 测什么：ECU 的软硬件集成——总线通信（CAN / Ethernet）、诊断（UDS）、I/O、时序、故障注入（拔线、短路、信号失真）。
- 边界：环境仍是仿真的，传感器 / 执行器是模型，测不了真实传感器物理特性和真实车辆动力学；但测的是真实 ECU 行为。
- 用在哪：ECU 级验证、集成测试、功能安全验证。

1. VIL（整车在环）

- 测什么：真车 \+ 虚拟场景，传感器接收虚拟注入，验证感知 / 决策在真车上的效果。
- 边界：场景仍是虚拟的（危险 / 长尾可控），但车辆动力学是真的；注入信号的保真度有限。
- 用在哪：系统级验证，实车前的最后一环。

**演进逻辑**

- 被测对象真实度逐步提高：纯软件 → 真 ECU → 真整车。
- 环境始终是仿真的（只有 VIL 带真实车辆动力学）。
- 越往右越接近实车，但成本越高、覆盖越难、越危险——所以左侧跑得多，右侧跑得少。

**关键理解**：三者的边界本质是「真实了什么、仿真了什么」：

- SIL：全仿真（软件真、硬件假、环境假）
- HIL：真 ECU + 仿真环境
- VIL：真整车 + 虚拟场景

它们是验证金字塔：SIL 铺量 → HIL 验集成 → VIL 验系统 → 实车路测背书。

一句话：SIL 测纯软件逻辑，HIL 测真实 ECU 的集成与总线 / 诊断 / 故障，VIL 测真车在虚拟场景里的系统表现——真实度一路升级，各自补对方测不到的边界。

📎 导航： [https://v.flomoapp.com/mine/?memo\_id=MjU2MDMwMzA0](https://v.flomoapp.com/mine/?memo_id=MjU2MDMwMzA0)

📎 上一题： [https://v.flomoapp.com/mine/?memo\_id=MjU2MjY2NDQ2](https://v.flomoapp.com/mine/?memo_id=MjU2MjY2NDQ2)

#Area/技术/自动驾驶

