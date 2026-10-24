# Windows 批处理脚本教程（.bat）

> Windows 批处理文件使用命令解释器执行一系列命令，适合开发环境初始化、文件整理和重复操作自动化。复杂脚本应增加输入校验、错误处理和日志，避免误删文件或静默失败。

## 1. 原有学习提纲（保留）

- **第一章 批处理基础**
  - 基本的操作 #card
    card-last-interval:: 4
    card-repeats:: 1
    card-ease-factor:: 2.36
    card-next-schedule:: 2025-10-13T01:45:44.550Z
    card-last-reviewed:: 2025-10-09T01:45:44.551Z
    card-last-score:: 3
- **第二章 DOS 循环：for 命令详解**
- **第三章 choice 简介**
- **第四章 相关的指令**

## 2. 最小脚本

```bat
@echo off
setlocal

echo Hello, Windows!
echo 当前目录：%CD%

endlocal
```

- `@echo off`：不回显每条命令，输出更简洁。
- `setlocal`：限制环境变量修改的作用范围。
- `%CD%`：当前工作目录。
- `echo`：输出文本。

## 3. 变量与输入

```bat
@echo off
setlocal
set "PROJECT_NAME=Demo"
echo Project: %PROJECT_NAME%

set /p USER_INPUT=请输入一个名称：
if not defined USER_INPUT (
  echo 输入不能为空。
  exit /b 1
)
echo 你好，%USER_INPUT%！
endlocal
```

对不可信输入要特别小心：批处理的变量展开与特殊字符处理比较复杂。不要直接把用户输入拼接到删除、覆盖或命令执行操作中。

## 4. 条件与循环

```bat
if exist "config.ini" (
  echo 找到配置文件。
) else (
  echo 未找到配置文件。
)

for %%F in (*.log) do (
  echo 日志文件：%%F
)
```

在批处理文件中，for 变量通常写成 `%%F`；在命令行交互执行时一般使用 `%F`。文件名包含空格时应使用引号。

## 5. 选择菜单与退出码

```bat
@echo off
choice /c YN /m "继续执行吗？"
if errorlevel 2 (
  echo 用户选择了 N。
  exit /b 1
)
echo 继续执行。
exit /b 0
```

检查 `errorlevel` 时，传统批处理条件判断常按从高到低的顺序书写，避免较大的返回码被前面的条件提前匹配。

## 6. 安全与调试建议

- 在修改或删除文件前先打印将要处理的路径。
- 使用引号处理包含空格的路径。
- 对关键命令检查退出码，并明确成功/失败行为。
- 不把密码、访问令牌或其他秘密写入脚本或日志。
- 在测试目录中验证脚本，再用于真实工程目录。
- 如果脚本用于构建发布，记录工具版本、工作目录和关键输出。

## 7. 建议的学习顺序

1. 命令、路径、变量与退出码。
2. 条件判断、for 循环和子程序。
3. 参数传递、文件操作与日志。
4. 错误处理、编码、特殊字符和路径兼容。
5. 将脚本用于一个可回滚的小型自动化任务。

## 8. 相关笔记

- [[Git]]
- [[Tools]]
- [[工具软件]]
- [[软件工程]]