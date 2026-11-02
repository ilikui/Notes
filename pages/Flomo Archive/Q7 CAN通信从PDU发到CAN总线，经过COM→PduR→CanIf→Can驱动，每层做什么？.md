---
flomo_id: MjQ2MjY5Njc0
created_at: 2026-07-11T16:11:25+08:00
tags:
  - Area/技术/AUTOSAR
source: https://v.flomoapp.com/mine/?memo_id=MjQ2MjY5Njc0
migration_status: archived
---

> Flomo 原文快照：保留原文；实际调用路径须以对应 AUTOSAR 版本、配置和生成代码为准。

**Q7: CAN通信从PDU发到CAN总线，经过COM→PduR→CanIf→Can驱动，每层做什么？**

**数据流图**：

应用层 SW-C (Rte\_Write)

│ ▼ ┌───────────┐ │ COM 层 │ ← 将Signal组包成PDU，管理发送周期 │ Com\_SendSignal │ ← 应用层调用入口 └─────┬─────┘ │ (PDU) ▼ ┌───────────┐ │ PduR 层 │ ← 根据路由表，判断走CAN/LIN/ETH │ PduR\_ComTransmit │ ← 路由入口 └─────┬─────┘ │ (CAN方向的PDU) ▼ ┌───────────┐ │ CanIf 层 │ ← 封装CAN控制器差异，提供统一接口 │ CanIf\_Transmit │ ← 发送入口 │ CanIf\_RxIndication│ ← 接收回调 └─────┬─────┘ │ (CAN帧) ▼ ┌───────────┐ │ Can驱动层 │ ← 直接操作CAN控制器寄存器 │ Can\_Write │ ← 写Tx缓冲区 │ Can\_IrqHandler│ ← 中断处理 └─────┬─────┘ │ ▼ ─── CAN 总线 ───

**每层职责**：

- **Can 驱动层**：操作 CAN 控制器寄存器，调用 Can\_Write 把帧塞进 Tx 缓冲区，CAN 控制器自动发到总线；收到帧时触发 Rx 中断，驱动把帧传给 CanIf。
- **CanIf 层**：CAN 接口抽象层。屏蔽不同 CAN 控制器（FlexCAN、BxCAN 等）的差异，给上层提供统一接口（如 CanIf\_Transmit）。收到帧后根据 PDU ID 判断该传给哪个上层模块。
- **PduR 层**：PDU 路由器。根据路由表判断 PDU 的目标是发到 CAN、LIN 还是 Ethernet。实现跨总线转发——同一个 PDU 可以被发到不同总线。
- **COM 层**：通信管理层。把应用层的 Signal 组包成 PDU，管理发送周期和信号更新通知。上层 SW-C 调用 Rte\_Write 时值先到这里。

**一句话**：数据从应用层出来，COM 组包→PduR 选路→CanIf 转标准 CAN 帧→Can 驱动收发。分四层的目的是 **解耦**——换 CAN 控制器只需改最底层。

**五大学习法视角**：

- 费曼：四层对应"装信封→分拣→转标准→投递"
- 西蒙：四个最小单元各1-2小时
- SQ3R：读 SWS\_CanIf 前写3问，带着找答案
- 康奈尔：见上面表格化整理
- 番茄：4个🍅走完一个循环

参见 → AUTOSAR 1000题

流程图 → 可参考 CAN 通信栈层级图

---

**后续校订提示（不属于 Flomo 原文）**

- 发送方向的典型路径可概括为 SWC 经 RTE/COM，再经 PduR、CanIf、Can Driver；但具体 API 调用关系由配置与生成代码决定。
- COM 的 API 通常由 RTE 映射到 SWC 使用的 Sender/Receiver 端口；不能笼统说所有 Rte_Write 都“直接到 COM”。
- PduR 不只是简单选择 CAN/LIN/Ethernet；路由路径、上层/下层模块关系、网关转发与接口类型取决于配置。
- CanIf 处理 PDU 与 CAN 控制器/HOH 等抽象映射；CAN Driver 负责控制器硬件交互。接收路径与发送路径方向相反，回调函数名应按规范和生成配置核对。
  
[查看 Flomo 原文](https://v.flomoapp.com/mine/?memo_id=MjQ2MjY5Njc0)
