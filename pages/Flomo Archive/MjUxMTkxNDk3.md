flomo-id:: MjUxMTkxNDk3
flomo-created-at:: 2026-08-10T19:07:08+08:00
flomo-updated-at:: 2026-11-01T09:25:51+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMTkxNDk3
flomo-word-count:: 968
flomo-migration-status:: raw-import

# SPI 菊花链——一根 CS 串起 N 个从机

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**SPI 菊花链——一根 CS 串起 N 个从机**

▎ **两种接法**

- 并行：各从机独立 CS，共享 MOSI/MISO/SCK——从机多时 CS 不够用、MISO 负载重
- 菊花链：SDO 接下一级 SDI，像移位寄存器逐级传，全链只用一根 CS。典型：74HC595 级联、LED 驱动

▎ **时序**

- 一个 CS 周期内 SCK 打 8×N 拍（N = 从机数），数据从链头进、链尾回
- 命令按「末端先进」排序——先发的最后到链尾，写代码要倒着想

▎ **用 vs 不用**

- 用：从机多、CS 不够、芯片支持级联（datasheet 有 SDO）、顺序处理即可
- 不用：要随机寻址、芯片不支持、每片要独立实时响应
- 代价：总吞吐 = 单机速率 ÷ N，链越长越慢

▎ **三个坑**

- 普通 SPI 芯片没 SDO 级联脚，不能硬串——先查 datasheet
- 链上节点有传播延迟，SCK 拉太快链尾收错
- 命令/数据顺序是反的，调试最容易懵

▎ **一句话**：用时间换引脚——适合数量多、顺序处理、带宽要求不高的场景；要随机寻址或高吞吐就回并行接法。

📎 专栏⑫·第2篇 四大协议 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM1NjM4](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM1NjM4)<br><br><br>
📎 通信1000问 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4ODcyNjYw](https://v.flomoapp.com/mine/?memo_id=MjQ4ODcyNjYw)<br><br><br>
📎 通信导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjEw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjEw)

#Area/技术/通信

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
