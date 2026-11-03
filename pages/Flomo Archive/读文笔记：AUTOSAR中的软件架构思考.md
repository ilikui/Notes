---
flomo_id: MjQ4NDc0Mzk3
created_at: 2026-07-25T09:37:11+08:00
updated_at: 2026-10-06T21:03:19+08:00
tags:
  - Area/技术/AUTOSAR
source: https://v.flomoapp.com/mine/?memo_id=MjQ4NDc0Mzk3
migration_status: archived
---

> Flomo 原文快照：只读保存。专题页中的解释和修订不得覆盖本文件。

**读文笔记：AUTOSAR中的软件架构思考**

来源：可可村（2026-07-25 微信公众号）

**核心观点：AUTOSAR = 统一度量衡**

AUTOSAR 让不同供应商使用共同语言（ARXML），避免各自定义架构造成集成困难。

**两种工作流对比**

| 维度 | 前 AUTOSAR 时代 | AUTOSAR 时代 |
|---|---|---|
| 输入 | OEM 给 DBC/Excel 矩阵 | OEM 给 ARXML |
| 输出 | 工程师手写代码 | 工具生成 RTE 代码 |
| 优点 | 灵活、小供应商友好 | 一致性、OEM 可控 |
| 缺点 | 质量依赖工程师能力 | 门槛高、工具链复杂 |

**SWC 架构设计关键概念**

- **Atomic SWC**：原子软件组件；具体代码生成形态由工具和配置决定。
- **Composition**：组织和连接多个 SWC 的组合组件。
- **SWC Type vs SWC Prototype**：Type 是可复用的组件类型定义，Prototype 是该类型在组合中的实例。
- **Port Interface**：端口使用的接口契约。Sender/Receiver 常见 API 为 Rte_Read/Rte_Write；Client/Server 常见 API 为 Rte_Call。

**工程边界**：这条笔记适合作为“为什么需要 AUTOSAR”的入门解释，不能替代对应版本规范对 SWC、Port、Interface 和生成代码的定义。

关联原文：[AUTOSAR 知识体系导航](https://v.flomoapp.com/mine/?memo_id=MjQ4MDU3MzE3)；[汽车电子架构导航](https://v.flomoapp.com/mine/?memo_id=MjQ4MTAxNjg3)

[查看 Flomo 原文](https://v.flomoapp.com/mine/?memo_id=MjQ4NDc0Mzk3)
