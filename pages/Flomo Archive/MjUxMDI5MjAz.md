flomo-id:: MjUxMDI5MjAz
flomo-created-at:: 2026-08-09T18:24:49+08:00
flomo-updated-at:: 2026-11-01T09:25:55+08:00
flomo-tags:: Area/技术/通信
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MjAz
flomo-word-count:: 1362
flomo-migration-status:: raw-import

# 专栏⑫·补充三：信号完整性——为什么短线上也要讲传输线

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑫·补充三：信号完整性——为什么短线上也要讲传输线**

**▎为什么排查到最后都变成信号问题**

时序对、协议对、代码对，波形就是不对——八成是信号完整性问题。UART/SPI/I2C 低速时问题少，但 RS-485 长线、USB、SDIO 高速、以太网就躲不过。1000问 Q351-400 那 10 问，就是这个专题。

**▎什么时候「短线」变「长线」**

1. 信号在 FR4 上传播约 15cm/ns
2. 判断标准：走线长度 \> 信号上升沿对应长度的 1/6，就要按传输线处理
3. 例子：1ns 上升沿，线长超 ~9cm 就得认真对待；115200 的 UART（bit 宽 8.7µs）几乎不用管，几十米的 RS-485 必须管

**▎反射与阻抗匹配**

- 阻抗不连续 → 部分反射 → 振铃（ringing），误码就是这么来的
- 特征阻抗参考值：差分 120Ω（RS-485 / CAN）、USB 90Ω、以太网 100Ω
- 两种端接：源端串联（串 33Ω，吸收反射）、末端并联（120Ω，消除反射）
- RS-485 总线两端各挂一个 120Ω 就是这个原因——不加终端电阻，长线波形毛刺、偶发误码

**▎串扰**

- 相邻走线电磁耦合，一根线的跳变串到另一根线
- 3W 原则：线间距 ≥ 3 倍线宽
- 回流路径被分割会放大串扰——高速信号要连续地平面回流

**▎共地与隔离**

- RS-485 共模电压：A/B 线相对地压差超范围（±7V）会损坏收发器，长距离要隔离（光耦/数字隔离器）

**▎排查三板斧**

1. 示波器看波形：振铃 = 反射，毛刺 = 串扰/电源，眼图闭合 = 高速信号
2. 加端接：源端串 33Ω 或末端并 120Ω，先压振铃
3. 查布线：线长、线距、回流路径，3W 原则有没有守

**▎一句话总结**：低速协议调时序，高速协议调阻抗——反射、串扰、回流是三大敌人，端接电阻是常用解药；排查顺序永远是「先看波形、再加端接、再查布线」。

📎 1000问·信号完整性 Q351-400 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4ODcyNjYw](https://v.flomoapp.com/mine/?memo_id=MjQ4ODcyNjYw)<br><br><br>
📎 专栏⑫·补充二 SDIO → [https://v.flomoapp.com/mine/?memo\_id=MjUxMDI5MTM2](https://v.flomoapp.com/mine/?memo_id=MjUxMDI5MTM2)<br><br><br>
📎 专栏⑫导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ4NjM0MjEw](https://v.flomoapp.com/mine/?memo_id=MjQ4NjM0MjEw)

**专栏⑫进度：10/10 + 补充三**

#Area/技术/通信

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
