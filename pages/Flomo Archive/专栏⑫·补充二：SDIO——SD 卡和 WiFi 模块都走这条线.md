flomo-id:: MjUxMDI5MTM2
flomo-created-at:: 2026-08-09T18:24:17+08:00
flomo-updated-at:: 2026-11-01T09:25:57+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MTM2
flomo-word-count:: 1637
flomo-migration-status:: raw-import

# 专栏⑫·补充二：SDIO——SD 卡和 WiFi 模块都走这条线

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·补充二：SDIO——SD 卡和 WiFi 模块都走这条线**

**▎为什么有 SDIO**

SDIO 是同一套物理接口，既能读 SD 卡，也能挂 WiFi/蓝牙/GPS 模块（经典如博通 SDIO WiFi 芯片）。嵌入式里常用它替代 SPI 挂高速外设——SPI 极限带宽不够时，SDIO 4-bit 是更顺的路。

**▎线和模式**

1. 物理线：CLK + CMD + DAT0-3（4 条数据线）+ 电源
2. 三种工作模式：SPI 模式（1-bit，兼容老 MCU）、1-bit SD 模式、4-bit SD 模式（最快）
3. 时钟节奏：初始识别阶段 ≤400kHz（兼容老卡），初始化后拉高到 25MHz（普通卡）/ 50MHz（UHS-I）

**▎初始化流程（关键路径）**

1. 上电 → 拉低 ≥74 个时钟周期（等卡内部上电稳定）
2. CMD0（复位）→ CMD8（电压检查，区分 SD 1.x / 2.0）→ ACMD41（OCR 电压协商）
3. 读 CID（卡识别码）→ 设 RCA（相对卡地址）→ 选卡 → ACMD6 切 4-bit → CMD16 设块长度

坑：很多人卡在 ACMD41——它前面必须发 CMD55 前缀（APP 命令标志），忘了就永远收不到响应。

**▎CMD vs ACMD**

- CMD：普通命令，卡直接响应
- ACMD：应用专用命令 = CMD55 + ACMDxx 两段握手
- 响应类型别写错位宽：R1（32bit 状态）、R2（136bit CID/CSD）、R3（OCR）、R6（RCA）——读响应的位数写错，状态永远不对

**▎三个坑**

1. 上电 74 个时钟不能省：MCU 时钟没跑起来就发 CMD0，卡完全不响应且查不出错
2. 4-bit 切换顺序：先设卡（ACMD6）再设控制器总线宽度寄存器，顺序反了 DAT 线乱
3. 热插拔：DAT3 兼作卡检测脚，无卡时发命令会挂死——所有命令都要设超时

**▎SD 卡 vs eMMC vs SDIO WiFi**

- SD 卡：可拆卸存储，块读写（CMD17 读 / CMD24 写）
- eMMC：焊在板上的 SD 接口存储（内置 Flash 控制器）
- SDIO WiFi：SD 接口挂非存储外设，靠 CMD52（单字节）/ CMD53（块）IO 读写访问寄存器
- 三者物理层同源，初始化前段几乎一样，后面分叉

**▎一句话总结**：SDIO 是「存储 + 外设」两用的接口——SD 卡走块读写、WiFi 模块走 IO 读写；新手两大拦路虎是上电 74 个时钟和 ACMD41 的 CMD55 前缀。

📎 1000问·SPI vs SDIO 对比 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4ODcyNjYw](https://v.flomoapp.com/mine/?memo_id=MjQ4ODcyNjYw)<br><br><br>
📎 专栏⑫·补充一 LIN → [https://v.flomoapp.com/mine/?memo\_id=MjUxMDI5MDYy](https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MDYy)<br><br><br>
📎 专栏⑫导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjEw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjEw)

**专栏⑫进度：10/10 + 补充二**

#Area/技术/通信

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
