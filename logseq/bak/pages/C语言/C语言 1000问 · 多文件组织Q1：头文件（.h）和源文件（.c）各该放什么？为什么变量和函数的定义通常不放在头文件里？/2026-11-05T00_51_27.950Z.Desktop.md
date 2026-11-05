flomo-id:: MjU2NDUwOTUz
flomo-created-at:: 2026-09-13T20:32:52+08:00
flomo-updated-at:: 2026-11-01T09:20:22+08:00
flomo-tags:: Area/技术/C语言
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU2NDUwOTUz
flomo-word-count:: 1598
flomo-migration-status:: raw-import

# C语言 1000问 · 多文件组织Q1：头文件（.h）和源文件（.c）各该放什么？为什么变量和函数的定义通常不放在头文件里？

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**C语言 1000问 · 多文件组织Q1：头文件（.h）和源文件（.c）各该放什么？为什么变量和函数的定义通常不放在头文件里？**

▎ 五大学习法：西蒙学习法——把「声明 vs 定义」钻透

**核心区分：声明（declaration）vs 定义（definition）**

- 声明：告诉编译器「有这么个东西、类型是什么」，不分配空间、不生成代码，可重复出现。
- 定义：真正分配空间 / 生成代码，只能有一份（单一定义规则 ODR）。
- 头文件被多个 .c 包含 = 内容被复制多份 → 头文件里只能放「可以出现多份」的东西。

**头文件（.h）该放什么**

- 函数声明（原型）。
- 宏定义、常量宏。
- 类型定义：struct / union / enum / typedef。
- extern 变量声明（只声明，不定义）。
- inline 函数（多个翻译单元允许同一份 inline 定义）。
- 头文件守卫 / pragma once（防重复包含）。
- 模块的公开接口。

**源文件（.c）该放什么**

- 函数定义（实现体）。
- 变量定义（分配存储的那一份）。
- 只在本文件用的 static 函数 / static 变量（内部实现，不对外暴露）。
- 需要的头文件 include。

**为什么「定义」通常不放头文件**

1. 重复定义 / 链接错误：头文件被 A.c、B.c 各包含一次 → 若头文件里有 int counter = 0; 这种定义，两个翻译单元各生成一份，链接时 multiple definition 冲突（违反 ODR）。函数定义（非 inline）放头文件同理。

2. 代码膨胀 / 编译变慢：头文件被大量包含，改一行触发一堆重编译；函数体放头文件还可能让每个 .c 各生成一份。

3. 封装与信息隐藏：对外只暴露接口（声明），实现细节藏在 .c 里，改实现不影响使用者。


**那 extern 怎么办**

- 共享全局变量：在 .c 里定义一次（int g; 或 int g = 0;），头文件里写 extern int g; —— 头文件只声明存在，定义在唯一一个 .c 里。
- 共享 inline 函数：C99 起 inline 函数定义可放头文件（注意不同标准的语义差异）。
- static 变量 / 函数放头文件：每个包含它的 .c 各有一份独立副本，通常不是你要的效果。

**实践约定**

- 一个模块 = 一个 .h（接口）+ 一个 .c（实现）。
- 私有函数 / 变量用 static 藏起来。
- 头文件只 include 最小集合（用前置声明减少耦合、加快编译）。
- 别在头文件里放耗时逻辑或大量代码。

一句话：头文件放「可重复出现的声明」，.c 放「只能有一份的定义」——因为头文件被多份包含，定义放进去就变成同一名字多份定义，违反 ODR、链接直接报重复定义。共享变量就用 .c 定义 + 头文件 extern 声明。

📎 问题库（专栏⑭导航）→ [https://v.flomoapp.com/mine/?memo\_id=MjQ1NzM0NTk5](https://v.flomoapp.com/mine/?memo_id=MjQ1NzM0NTk5)

📎 函数与递归Q3（函数指针）→ [https://v.flomoapp.com/mine/?memo\_id=MjU2NDUwODk5](https://v.flomoapp.com/mine/?memo_id=MjU2NDUwODk5)

#Area/技术/C语言

#Archive/MigratedNotion #Archive/DeleteCandidate

#Archive/MigratedWiki
