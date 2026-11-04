flomo-id:: MjUxMDI5MjY2
flomo-created-at:: 2026-08-09T18:25:30+08:00
flomo-updated-at:: 2026-11-01T09:25:53+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MjY2
flomo-word-count:: 1561
flomo-migration-status:: raw-import

# 专栏⑫·补充四：车载以太网——从 CAN 到 100BASE-T1，带宽跃迁

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·补充四：车载以太网——从 CAN 到 100BASE-T1，带宽跃迁**

**▎为什么车上要以太网**

CAN 2.0 顶到 1Mbps、CAN FD 到 8Mbps，但 OTA 刷写、高清环视、ADAS 传感器数据融合要的是 Gbps 级带宽。以太网是唯一能平滑升级的链路，AVB/TSN 补实时性。带宽需求是驱动力，不是追新。

**▎100BASE-T1 和普通以太网差在哪**

1. 单对双绞线（IT 以太网要 2-4 对），全双工在一对线上同时收发
2. 100Mbps 全双工，点对点连接——不像 CAN 是总线，以太网是星型/菊花链，要交换机
3. 为什么不用现成 100BASE-TX：4 根线太重太贵，车规要抗干扰和共模抑制
4. 车规 PHY 芯片：博通 BCM89810、Marvell 88Q2112 这类

**▎协议栈：IT 的底子 + 车规的皮**

- IP/UDP/TCP 那套原样在
- **SomeIP**：面向服务的中间件——服务发现（SD）+ 远程调用（RPC），把 AUTOSAR 的通信方式搬到以太网上
- **DoIP**：诊断 over IP——UDS 诊断报文封装进 TCP/IP，OTA 远程诊断靠它
- **AVB/TSN**：时间敏感网络，802.1AS 时间同步、音视频同步、实时控制

**▎SomeIP 核心概念**

1. 服务 = 方法（Method）/ 事件（Event）/ 字段（Field）
2. 服务发现三连：FindService（谁有这服务？）→ OfferService（我有）→ SubscribeEvent（订阅事件）
3. 思路转变：从 CAN「信号周期发送」到以太网「服务按需调用」——带宽利用率高得多

**▎三个坑**

1. 100BASE-T1 不能插普通网线/RJ45（那是 100BASE-TX），接错物理层不通——车规连接器是 H-MTD / HSD
2. SomeIP 服务发现失败：SD 报文被交换机/防火墙过滤，或服务实例 ID 配错——先抓包看 SD 有没有 Offer
3. DoIP 超时：TCP 重传和 UDS 超时叠加，网关转发延迟导致 S3Server 超时断开

**▎一句话总结**：车载以太网 = IT 的 TCP/IP 搬进车里，物理层换成单对双绞线（100BASE-T1），上层多了 SomeIP（服务化）和 DoIP（诊断）两个车规协议；排查工具从示波器、万用表升级成抓包。

📎 专栏⑫·补充三 信号完整性 → [https://v.flomoapp.com/mine/?memo\_id=MjUxMDI5MjAz](https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MjAz)<br><br><br>
📎 专栏⑫·补充一 LIN → [https://v.flomoapp.com/mine/?memo\_id=MjUxMDI5MDYy](https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MDYy)<br><br><br>
📎 专栏⑫导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjEw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjEw)

**专栏⑫进度：10/10 + 补充四（共 14 篇）**

#Area/技术/通信

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
