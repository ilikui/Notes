flomo-id:: MjYxNDE5OTQ5
flomo-created-at:: 2026-10-17T17:17:37+08:00
flomo-updated-at:: 2026-11-01T09:18:01+08:00
flomo-tags:: Area/技术/AUTOSAR
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYxNDE5OTQ5
flomo-word-count:: 1087
flomo-migration-status:: raw-import

# AUTOSAR 1000问 · 通信与网络Q1：从 SWC 端口到总线报文，数据是怎么流的？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；不要在此文件中直接改写，专题提炼请链接到对应主题页。

**AUTOSAR 1000问 · 通信与网络Q1：从 SWC 端口到总线报文，数据是怎么流的？**

▎ 五大学习法：费曼——把整条链讲成「SWC 写一个值，剩下的打包发货收货都是 COM 的事」

**费曼（一句话本质）**：SWC 只管往端口写一个值，剩下「打包、发出去、到了拆开、再交给对面端口」都是 COM 管的；PDU Router 把上层 PDU 和下层帧衔接起来。

**SQ3R（去哪找）**

- COM：Configurator 的 Com 模块（信号、IPDU、发送模式）
- 路由：PduR 模块的路由表
- 下层：CanIf / Can（要分段还有 CanTp）
- 上层：RTE 的 S/R 端口

**麦肯锡金字塔（自下而上分层，MECE）**

1. Can → CanIf：发帧、收帧
2. CanTp（可选）：超过一帧长度就分段、重组
3. PduR：把 CanIf 的 PDU 路由给 COM（或给 DCM、Tp）
4. COM：把信号打包成 IPDU，按发送模式（周期 / 事件 / 混合）发出；收到时拆包、更新信号缓存
5. RTE：SWC 用 Rte\_Write/Rte\_Read 读写信号，不用管 PDU 细节

**西蒙（流程）**：定义信号 → 组 IPDU → 定发送模式和周期 → PduR 配路由 → CanIf/Can 配帧 → Generate → 用 trace 看报文周期和数据对不对

**几个常见的坑**

- 信号起始位或字节序配错，收到数据全是乱的
- 发送模式配错，该周期发的配成了事件触发
- PduR 路由没配，报文上不来
- 长数据没配 CanTp，发不出去
- 信号长度跟 DBC 对不上

📎 上一题 OS&调度Q4（OS 的保护与错误处理）→ [https://v.flomoapp.com/mine/?memo\_id=MjYxMzU2NTI1](https://v.flomoapp.com/mine/?memo_id=MjYxMzU2NTI1)

📎 AUTOSAR 1000问总表 → [https://v.flomoapp.com/mine/?memo\_id=MjMxMTQ2NDk4](https://v.flomoapp.com/mine/?memo_id=MjMxMTQ2NDk4)

#Area/技术/AUTOSAR

