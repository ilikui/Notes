flomo-id:: MjQ5MzQ1Nzg5
flomo-created-at:: 2026-07-30T19:36:26+08:00
flomo-updated-at:: 2026-11-01T09:32:03+08:00
flomo-tags:: Area/学习管理/嵌入式学习
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjQ5MzQ1Nzg5
flomo-word-count:: 5516
flomo-migration-status:: raw-import

# Linker File（链接脚本）进阶——语法深度、多编译器和 AUTOSAR 实战

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**Linker File（链接脚本）进阶——语法深度、多编译器和 AUTOSAR 实战**

第1张卡覆盖了核心三要素和常见错误。这张卡再往深一层——语法细节、多编译器差异、高级场景。

**一、GNU LD 链接脚本语法深度**

**PROVIDE——条件式符号定义**

定义符号，但只在其他目标文件没有定义时才生效。用在启动文件里非常常见：

PROVIDE(\_\_stack\_top = ORIGIN(RAM) + LENGTH(RAM)); PROVIDE(\_\_heap\_start = ADDR(.bss) + SIZEOF(.bss));

好处：链接脚本提供一个默认值，但启动文件可以覆盖它。

**KEEP——阻止 --gc-sections 丢弃段**

SECTIONS { .isr\_vector : { KEEP(\*(.isr\_vector)) /\* 中断向量表——即使没被引用也不能被 GC \*/ } > FLASH }

如果不加 KEEP，链接器的 --gc-sections（垃圾回收）可能认为 .isr\_vector 没有被任何代码"调用"（因为没有函数直接跳转到它——CPU 硬件根据向量表跳转的）——回收掉——ECU 启动不了。

**ASSERT——编译期断言**

ASSERT(SIZEOF(.text) + SIZEOF(.rodata) < 512K, "FLASH 空间不足，代码+只读数据超过 512KB"); ASSERT(ABSOLUTE(ADDR(.bss)) + SIZEOF(.bss) < 0x20020000, "BSS 段超出 RAM 范围");

在 CI 构建时特别好用——编译失败比"上电后跑飞了"好在 CI 阶段就发现。

**ALIGN——地址对齐**

. = ALIGN(4); /\* 当前地址对齐到 4 字节 \*/ . = ALIGN(16); /\* 对齐到 16 字节（Cache Line）——适合多核共享数据 \*/

**SORT——文件名的排序控制**

SECTIONS { .text : { \*(.text .text.\*) /\* 所有 .text 段，按文件名排序 \*/ SORT(\*)(.text .text.\*) /\* 显式按文件名排序 \*/ } > FLASH }

在确定性的二进制构建（reproducible build）中，SORT 保证每次编译生成的二进制完全一致——即使源文件的扫描顺序变了。

**二、三种链接脚本格式的对比——GNU LD vs IAR .icf vs ARMCC scatter**

**GNU LD (.ld)**

- 语法：类 C（大括号 + 赋值表达式）

- MEMORY 和 SECTIONS 分开定义

- 符号用 symbol = expression;

- 工具链：arm-none-eabi-gcc / GCC for ARM / RISC-V

- 优点：开源生态、最广泛的支持


**IAR .icf（ILINK Configuration File）**

- 语法：类 VHDL（关键字驱动）

- 用 define region 定义存储区，用 place in / place at 定义放置规则

- 用 export symbol 导出符号


define region FLASH\_region = mem:\[from 0x08000000 to 0x080FFFFF\]; define region RAM\_region = mem:\[from 0x20000000 to 0x2001FFFF\]; place in FLASH\_region { section .text }; place in RAM\_region { section .data, section .bss }; export symbol \_\_stack\_top = 0x20020000;

- 优点：IDE 集成好，带图形化的 linker 配置向导

- 跟 GNU LD 最大的不同：.icf 用关键字描述放置逻辑，不用地址计算表达式


**ARM scatter-loading（ARMCC / Keil）**

- 语法：描述性格式（.sct 后缀）

LR\_IROM1 0x08000000 0x00100000 { ER\_IROM1 0x08000000 0x00100000 { \*.o (RESET, +First) \*(InRoot$$Sections) .ANY (+RO) } RW\_IRAM1 0x20000000 0x00020000 { .ANY (+RW +ZI) } }

- 优点：加载时域（LR）和执行时域（ER）的概念清晰——非常适合 XIP（Flash 原地执行）和 Overlay

**格式迁移的要点：**

- GNU LD → IAR .icf：MEMORY → define region，SECTIONS → place in / place at

- IAR .icf → GNU LD：反方向

- 项目中如果存在"PC 用 GCC 调试、但标定用 IAR 编译"的场景——两份链接脚本要保持逻辑一致


**三、AUTOSAR 项目中链接脚本的高级功能**

**3.1 Calibration Parameter 专属段**

AUTOSAR 项目中，标定（Calibration）数据需要跟代码分开存放——方便标定工具在运行时修改。

SECTIONS { /\* 标定参数：放在 RAM 中，运行时可通过 XCP/CCP 修改 \*/ .calib : { \*(.calib) /\* 所有标定参数 \*/ \*(.Calprm) /\* AUTOSAR 标准标定段 \*/ } > RAM AT > FLASH /\* 常数列：在 Flash 中，运行时只读 \*/ .calib\_const : { \*(.calib\_const) } > FLASH }

**3.2 多核 VirtAddress 映射**

AUTOSAR 多核项目中，每个核的本地 RAM 地址空间不同——链接脚本需要做地址映射。

以 TC3xx 为例：

- Core0 本地 RAM：0x70000000~0x7003FFFF

- Core1 本地 RAM：0x60000000~0x6003FFFF

- 共享 LMU RAM：0x90000000~0x9003FFFF


链接脚本需要把 Core0 的 .data 放到 0x70000000+、Core1 的 .data 放到 0x60000000+、共享数据放到 0x90000000+。

关键： **Core0 的代码引用了共享变量——链接器看到的地址是 0x90000000——但 Core0 通过 LMU 映射到本地地址空间访问。** 如果链接脚本配错了（把共享变量放在了 Core0 的本地 RAM），Core1 就读不到。

**3.3 NvM Block 地址空间预留**

AUTOSAR 的 NvM 模块需要知道每个 Flash Block 所在的物理地址。链接脚本里要预留一个"不会放代码"的区域：

MEMORY { FLASH\_CODE (rx) : ORIGIN = 0x08000000, LENGTH = 896K /\* 代码区 \*/ FLASH\_NVM (rx) : ORIGIN = 0x080E0000, LENGTH = 128K /\* NvM 存储区（物理地址固定） \*/ }

然后 NvM 配置工具中把 Block 的物理地址指向 FLASH\_NVM 区域。

**3.4 链接后处理——校验码注入**

OTA 刷写需要 CRC/SHA 校验。固件编译后，链接器不知道完整的固件大小——需要编译后做"链接后处理"：

1. 编译 \+ 链接 → 生成 .elf

2. 用 objcopy 提取 .bin（不带校验码）

3. 算整个 .bin 的 CRC

4. 把 CRC 值写入 .bin 的末尾（或指定地址）

5. 重新生成带校验码的 .bin


这个过程不是链接脚本本身做的事——是编译流程（Makefile/CI）的一部分。但链接脚本需要为 CRC 值预留地址空间：

.wrapper\_info : { . = ALIGN(4); KEEP(\*(.wrapper\_info)) } > FLASH

然后在 C 语言里定义一个结构体占据这个段：

\_\_attribute\_\_((section(".wrapper\_info"))) const struct { uint32\_t magic; // 魔数标记 uint32\_t image\_size; // 固件大小 uint32\_t crc32; // CRC（编译后填充） uint32\_t version; // 版本号 } wrapper = { 0xA5A5A5A5, 0, 0, 0 };

**四、调试进阶：.map 文件"三层分析法"**

.map 文件是链接脚本的执行报告。三层逐层看：

**第一层：段摘要**

Memory Configuration Name Origin Length Attributes FLASH 0x08000000 0x00100000 xr RAM 0x20000000 0x00030000 xrw

→ 确认芯片的内存布局跟 datasheet 一致。

**第二层：段详细溢出分析**

.text 0x08000000 0x3A4E0 .../main.o(.text) 0x08000000 0x1234 .../can.o(.text) 0x08001234 0x890 .../dcm.o(.text) 0x08001AC4 0x2BC0

→ 每个目标文件的代码大小。如果某个模块膨胀了（比如 DCM 加了新功能，.text 从 0x1A00 涨到 0x2BC0）——一眼看出是谁在"吃 Flash"。

**第三层：跨段地址分析**

.isr\_vector 0x08000000 0x1A0 .text 0x080001A0 0x3A4E0 .rodata 0x0803A680 0x1234 .data 0x20000000 0x5678 LOAD 0x0803B8B4

→ .data 的 VMA（运行地址）= 0x20000000，LMA（加载地址）= 0x0803B8B4。启动代码从 LMA 拷贝到 VMA——拷多大？5120 字节（0x5678-0x0000）。拷过去后 RAM 还剩多少？从 0x20005678 到 0x20030000（约 168KB）。如果某个 BSS 段突然变大——RAM 不够了——MAP 文件里一眼能看到。

**五、堆问题法·Linker File 100 问（前 10 问）**

01. .text 段在 FLASH 中的地址由谁决定——链接脚本还是启动文件？

02. .data 段为什么需要两个地址（LMA 和 VMA）？

03. .bss 段的初始值是谁给的？为什么启动文件要清零它？

04. KEEP() 不加上去，链接器什么时候会丢掉中断向量表？

05. 链接后 .map 文件里出现 undefined reference to \_sdata——是链接脚本没写好还是启动文件没引用？

06. 两个目标文件定义了同名全局变量——链接器会报错吗？还是合并？

07. PROVIDE 和 EXTERN 的区别是什么？

08. ASSERT 在链接脚本里能检查什么？

09. --gc-sections 开启后，如何防止标定数据被回收？

10. .ld 文件和 .icf 文件的语法能否互相转换？需要改哪些关键字？


📎 第1卡：Linker File基础 → [https://v.flomoapp.com/mine/?memo\_id=MjQ5MzQ1NTYx](https://v.flomoapp.com/mine/?memo_id=MjQ5MzQ1NTYx)<br> 📎 嵌入式三问·其一（启动文件/链接脚本/VTOR）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ5MDI2MDAw](https://v.flomoapp.com/mine/?memo_id=MjQ5MDI2MDAw)<br> 📎 C语言三问·其二（const段与链接脚本）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ5MDI3NjAz](https://v.flomoapp.com/mine/?memo_id=MjQ5MDI3NjAz)

#Area/学习管理/嵌入式学习

#Archive/MigratedNotion<br>
#Archive/DeleteCandidate
