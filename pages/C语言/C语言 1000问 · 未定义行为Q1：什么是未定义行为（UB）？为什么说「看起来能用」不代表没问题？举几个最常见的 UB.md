flomo-id:: MjU2NDUxMTA5
flomo-created-at:: 2026-09-13T20:34:00+08:00
flomo-updated-at:: 2026-11-01T09:20:17+08:00
flomo-tags:: Area/技术/C语言
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU2NDUxMTA5
flomo-word-count:: 1620
flomo-migration-status:: raw-import

# C语言 1000问 · 未定义行为Q1：什么是未定义行为（UB）？为什么说「看起来能用」不代表没问题？举几个最常见的 UB。

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**C语言 1000问 · 未定义行为Q1：什么是未定义行为（UB）？为什么说「看起来能用」不代表没问题？举几个最常见的 UB。**

▎ 五大学习法：西蒙学习法——把「UB」钻透

**什么是未定义行为（UB）**

- C 标准对某些程序行为「不做任何保证」——标准没说会发生什么，编译器可以任意处理（看起来正常、崩溃、静默算错、甚至把整段代码优化掉）。
- 关键词：UB 不是「结果随机」，而是「标准不约束，实现随便」——任何结果都不算编译器违约。
- 相邻概念：未指定行为（unspecified，几个允许结果之一）、实现定义行为（implementation-defined，编译器必须文档化，如 int 宽度、char 是否有符号）。

**为什么「看起来能用」不代表没问题**

- 编译器会「假设 UB 不会发生」来做优化——一旦真触发 UB，优化可能让它表现得更诡异。
- 经典：有符号溢出是 UB → 编译器可假设「a + 1 > a 永远成立」，于是把 if (a + 1 < a) 判成死代码删掉。
- 表现随「编译器 / 优化级别 / 平台」而变：debug 版正常、release 版崩溃；换个编译器就出问题。
- 所以 UB 的危害在于隐性、延迟、不可复现——这正是它在嵌入式里最危险的地方。

**几个最常见的 UB（务必背下来）**

01. 有符号整数溢出：INT\_MAX + 1（无符号是回绕、定义良好；有符号是 UB）。
02. 数组 / 指针越界访问（哪怕只读）。
03. 解引用空指针 / 悬垂指针 / 野指针。
04. 读取未初始化的自动变量。
05. 序列点 / 未定序修改：i = i++ + ++i;
06. 整数除零 / 取模零。
07. 移位越界：x << 32（移位量 ≥ 类型宽度）、左移负数。
08. 违反严格别名的类型双关。
09. free 后使用、free 非 malloc 指针、free 两次。
10. 函数返回后使用指向其局部变量的指针。
11. 修改字符串字面量：char \*s = "abc"; s\[0\] = 'A';
12. va\_arg 类型不匹配（回看可变参数）。

**怎么防**

- 编译警告开全：-Wall -Wextra -Werror，测试时用 -fsanitize=undefined,address（UBSan / ASan）。
- 静态分析：clang-tidy、Coverity、MISRA C 检查器。
- 写代码时：位运算用无符号、边界检查、初始化所有变量、别写多重副作用表达式。
- 嵌入式：MISRA C 大量规则就是在消 UB——不可移植 / 未定义的构造一律禁。

一句话：UB 是「标准没规定、编译器随便」——不是随机，而是「任何事都可能」；最坑的是它让优化器「把 UB 当不会发生」来做假设，于是 debug 正常、release 崩；背熟有符号溢出、越界、未初始化、i=i++、除零这些高频 UB，再用警告和 sanitizer 兜底。

📎 问题库（专栏⑭导航）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ1NzM0NTk5](https://v.flomoapp.com/mine/?memo_id=MjQ1NzM0NTk5)

📎 多文件组织Q3（前置声明）→ [https://v.flomoapp.com/mine/?memo\_id=MjU2NDUxMDQ4](https://v.flomoapp.com/mine/?memo_id=MjU2NDUxMDQ4)

#Area/技术/C语言


