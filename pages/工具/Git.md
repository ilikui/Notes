# Git 使用指南

Git 是分布式版本控制系统。它记录文件快照之间的变化，帮助开发者协作、回溯和审查。Git 本身不等同于 GitHub；Git 是版本控制工具，GitHub 是托管与协作平台之一。

## 基本工作流

```mermaid
flowchart LR
    A[工作区 Working Tree] -->|git add| B[暂存区 Index]
    B -->|git commit| C[本地仓库 Repository]
    C -->|git push| D[远程仓库 Remote]
    D -->|Pull Request / Review| E[合并到目标分支]
```

## 常用命令

```bash
git status
git switch -c feature/my-change
git add path/to/file
git diff --staged
git commit -m "docs: improve learning guide"
git fetch origin
git pull --rebase
git push -u origin feature/my-change
```

## 日常协作原则

- 提交前检查 `git status` 和 `git diff`，避免提交无关文件或密钥。
- 一次提交尽量只表达一个逻辑变化，提交信息说明“做了什么”。
- 重要修改在独立分支完成，通过 Pull Request 讨论和审查。
- 发生冲突时，先理解两边意图，再合并；不要盲目覆盖他人修改。
- 不要把密码、令牌、个人数据和构建产物提交到仓库。
- `git reset --hard`、强制推送和历史重写可能丢失他人工作，执行前先确认工作区和协作状态。

## 出错时的诊断顺序

1. `git status`：确认当前分支与未提交修改。
2. `git log --oneline --decorate -n 10`：确认提交历史。
3. `git diff`：检查工作区差异。
4. `git diff --staged`：检查已暂存差异。
5. 需要恢复前先备份或建立临时分支，再选择合适的恢复命令。

## 推荐练习

创建一个练习仓库，分别练习分支、合并冲突、撤销未提交修改、回滚某次提交、打标签和 Pull Request。每个练习都记录命令、仓库状态变化和适用边界。
