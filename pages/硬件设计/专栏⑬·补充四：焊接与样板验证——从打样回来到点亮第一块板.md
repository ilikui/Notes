flomo-id:: MjUxMDMwMDIw
flomo-created-at:: 2026-08-09T18:32:09+08:00
flomo-updated-at:: 2026-11-01T11:51:22+08:00
flomo-tags:: Area/技术/硬件
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUxMDMwMDIw
flomo-word-count:: 1624
flomo-migration-status:: raw-import

# 专栏⑬·补充四：焊接与样板验证——从打样回来到点亮第一块板

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑬·补充四：焊接与样板验证——从打样回来到点亮第一块板**

**▎第10篇到「打样」结束，这篇接上「怎么验证」**

打样回来的板子，软件工程师的第一块板怎么焊、怎么查、怎么通电——这是从「设计过」到「真跑起来」的分水岭。很多人第一块板回来直接上电冒烟，就是因为跳过了验证步骤。

**▎手工焊接基本功（贴片为主）**

1. 工具：恒温烙铁（350°C 左右）+ 助焊剂 + 镊子 + 放大镜/显微镜
2. 焊接顺序：矮的先焊（电阻/电容）→ 高的后焊（电感/插座）→ 芯片最后
3. 芯片焊接三招：拖焊（引脚多的）、定位（先焊对角固定）、回流检查（虚焊用放大镜 \+ 万用表蜂鸣档量相邻引脚短路）
4. 常见翻车：虚焊（锡没吃透）、桥连（相邻引脚粘连）、焊盘脱落（温度过高/反复焊）

**▎DFM 回看：焊的时候才发现的坑**

1. 元件间距太近：烙铁头伸不进去
2. 极性元件没标：电解电容/二极管方向看不清
3. 焊盘太小：手工焊难度大
4. 通孔元件背面焊盘被覆铜吃掉：散热太快焊不实<br><br><br>
   ——这些问题设计时就要避免，焊接时发现已经晚了（呼应你 7/28 记的硬件容差思维）

**▎首板通电流程（按顺序，错一步烧一块板）**

1. 目检 \+ 万用表短路检查：先量电源对地电阻（3.3V 对地不能是 0Ω）——短路没查出来就上电必烧
2. 空载上电：不焊 MCU，只焊电源部分，量各路电压对不对（5V/3.3V/1.8V 误差内）
3. 带载上电：焊上 MCU，限流上电（可调电源限流 100mA 起步），观察电流——电流异常大说明有短路/接错
4. 最小系统点亮：时钟（示波器看晶振起振）、复位（复位脚电平）、调试接口（能连上烧录器）
5. 外设逐个验证：GPIO 点灯 → 通信（UART 打印）→ 传感器 → 总线

**▎三个坑**

1. 不上电先量短路：这是唯一能救板子的步骤，跳过 = 送人头
2. 限流上电：可调电源设限流，电流异常立刻断电，保护板和元件
3. 一次只动一处：改一处测一处，别同时改三处再上电——出问题不知道是谁干的

**▎一句话总结**：样板验证四步——短路检查 → 空载量电压 → 限流带载 → 最小系统点亮；「一次只动一处」是硬件调试和软件 debug 唯一相通的美德。

📎 第10篇：完整项目（需求到打样）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NjU0](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NjU0)<br><br><br>
📎 第9篇：硬件调试（示波器）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NjE2](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NjE2)<br><br><br>
📎 第6篇：MCU 最小系统 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2NTA5](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2NTA5)<br><br><br>
📎 专栏⑬导航 → [https://v.flomoapp.com/mine/?memo\_id=MjQ3NTQ2MDE3](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3)

**专栏⑬进度：10/10 + 补充四（共 14 篇）**

#Area/技术/硬件

#Archive/MigratedNotion<br><br>
#Archive/DeleteCandidate

#Archive/MigratedWiki
