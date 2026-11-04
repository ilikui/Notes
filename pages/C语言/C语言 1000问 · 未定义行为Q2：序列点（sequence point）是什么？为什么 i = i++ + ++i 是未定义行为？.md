flomo-id:: MjU2NDUxMTU2
flomo-created-at:: 2026-09-13T20:34:26+08:00
flomo-updated-at:: 2026-11-01T09:20:15+08:00
flomo-tags:: Area/技术/C语言
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU2NDUxMTU2
flomo-word-count:: 1590
flomo-migration-status:: raw-import

# C语言 1000问 · 未定义行为Q2：序列点（sequence point）是什么？为什么 i = i++ + ++i 是未定义行为？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**C语言 1000问 · 未定义行为Q2：序列点（sequence point）是什么？为什么 i = i++ + ++i 是未定义行为？**

▎ 五大学习法：费曼学习法——把「序列点」讲透

**什么是序列点（sequence point）**

- 序列点是程序执行中的一个「时间点」，保证「这个点之前所有副作用（side effect）都已完成，之后的操作都还没开始」。
- 直观理解：它是「求值顺序的检查站」——过了这个点，前面该改的内存都改完了。
- 常见序列点：
  - 完整表达式结束时（每句分号之后）。
  - &&、\|\|、?: 的第一个操作数求值之后（有短路求值）。
  - 逗号运算符的左操作数之后。
  - 函数调用时，参数求值之后、进入函数体之前（但参数之间没有序列点！）。
  - 函数返回时。

**C11 之后：从「序列点」到「先序 / 后序（sequenced before）关系」**

- C11 把描述改成了 sequenced before / unsequenced / indeterminately sequenced 这种关系语言，思想一样：不允许「未定序」地既读又写同一个对象。
- 简单说：两个操作若「没有先序关系」，又都作用于同一对象、其中一个还改了它 → 未定义行为。

**为什么 i = i++ + ++i 是 UB**

- 这里对 i 有多个修改：i++（读并改）、++i（改）、以及赋值给 i（又改一次）。
- 这些修改之间没有序列点 / 没有先序关系，顺序未定。
- 于是「最终 i 等于几」标准不做保证 → 未定义行为。
- 不同编译器给出不同结果（6、7、8 都可能），优化后甚至完全变样——正是 UB 的典型表现。

**类似的高频 UB 表达式**

- i = i++; a\[i\] = i++; f(i++, i++);（函数参数求值顺序未指定）
- printf("%d %d", i++, i++); —— 参数之间无序列点。
- x = x++ + 1; y = i++ \* i++;
- 经验法则：一个表达式里「同一个对象只读一次或只改一次」，别既读又改。

**「未指定行为」也要小心**

- 函数参数求值顺序是「未指定」（unspecified）——不是 UB，但结果依赖编译器，同样不该依赖。
- 运算符优先级 ≠ 求值顺序：a + b 里 a、b 谁先算，标准不规定。

**怎么避开**

- 别在一个表达式里对同一变量既读又写。
- 需要自增 / 自减时，拆成独立语句。
- 函数多个参数有副作用时，先在单独语句里算好再传。
- -Wall -Wextra 常能提示序列点问题。

一句话：序列点就是「副作用清理的检查站」——两次改动同一个变量若中间没有序列点 / 没有先后关系，就是未定义；i = i++ + ++i 正是「对 i 改了三次、顺序未定」，所以结果标准不管，各编译器随便给。

📎 问题库（专栏⑭导航）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ1NzM0NTk5](https://v.flomoapp.com/mine/?memo_id=MjQ1NzM0NTk5)

📎 未定义行为Q1（UB 是什么）→ [https://v.flomoapp.com/mine/?memo\_id=MjU2NDUxMTA5](https://v.flomoapp.com/mine/?memo_id=MjU2NDUxMTA5)

#Area/技术/C语言

#Archive/MigratedWiki<br><br>
#Archive/DeleteCandidate

#Archive/MigratedNotion
