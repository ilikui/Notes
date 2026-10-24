# Windows 批处理脚本教程

Windows 批处理文件通常使用 `.bat` 或 `.cmd` 扩展名，由命令解释器执行，适合简单的本地自动化。更复杂的脚本可考虑 PowerShell、Python 或专用构建工具。

## 基础结构

```bat
@echo off
set "NAME=Notes"
echo Hello, %NAME%!
if exist README.md (
  echo README.md exists
) else (
  echo README.md not found
)
```

- `@echo off`：减少命令本身的回显。
- `set "NAME=value"`：定义变量；使用带引号的赋值方式避免尾随空格问题。
- `if exist`：检查文件或目录是否存在。
- `echo`：输出信息，适合加入简单诊断日志。

## 常见控制结构

### FOR 遍历文件

```bat
@echo off
for %%F in (*.md) do (
  echo Found: %%F
)
``

在批处理文件中通常使用双百分号变量（如 `%%F`）；在命令提示符交互窗口中直接执行时通常使用单百分号（如 `%F`）。

### 错误码

```bat
some-command
if errorlevel 1 (
  echo Command failed
  exit /b 1
)
exit /b 0
```

## 安全与调试

- 对路径和参数中的空格使用正确的引号。
- 不要在未检查变量内容时拼接危险命令。
- 使用 `echo on` 或临时输出变量定位问题。
- 对删除、覆盖、重命名等操作先提供预览或备份。
- 记录命令退出码，并让自动化流程在失败时返回非零状态。

## 学习路径

变量与路径 → 条件判断 → FOR 循环 → 子程序与参数 → 错误处理 → 日志与任务计划 → 实际自动化项目。