flomo-id:: MjU3NTg0ODY5
flomo-created-at:: 2026-09-21T06:14:48+08:00
flomo-updated-at:: 2026-11-01T10:10:05+08:00
flomo-tags:: Resource/方法
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjU3NTg0ODY5
flomo-word-count:: 1519
flomo-migration-status:: raw-import

# MCP 在 VSCode 中运行 · 技术方案

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**MCP 在 VSCode 中运行 · 技术方案**

**原理**：VSCode 1.99+ 原生支持 MCP——工作区 .vscode/mcp.json 声明 server，stdio 启动本地 Python 服务，Copilot Chat / Agent 模式直接调工具。

**架构**（Python 写）：

- Resources：30 思维模型 JSON + 5 大学习法 JSON（本地文件）
- Tools：apply_model / learn_plan / question_stack
- 接入：mcp.json → 启动 python server

**目录结构**：

- my-mcp/
  - .vscode/mcp.json
  - server/main.py（FastMCP 入口）
  - server/tools/（apply_model.py / learn_plan.py / ...）
  - server/resources/（models.json / methods.json）
  - requirements.txt（mcp 官方 SDK）

**mcp.json 示例（stdio）**：<br><br>
{ "servers": { "my-mcp": { "type": "stdio", "command": "python", "args": \["-m", "server.main"\], "env": { "PYTHONPATH": "${workspaceFolder}" } } } }

**落地 4 步（选不如删）**：

1. 建仓库结构 \+ pip install mcp
2. 30 模型清单转 JSON（清单现成，机械活）
3. 先写 learn_plan 一个 tool 跑通——五法模板现成，见效最快
4. VSCode 接入，Copilot 里实测「用西蒙法规划学 AUTOSAR」

**HTTP 补充（多端/远程方案）**：

- 适用场景：服务器/云上跑、多端访问（VSCode/手机/其他电脑）、团队共享
- 传输：Streamable HTTP（旧 SSE 已弃用），服务器开 POST /mcp 端点
- Python 侧：FastMCP 同一 server 代码，transport 改 "http"，监听 0.0.0.0:8000
- VSCode 配置：type "http" + url（http://localhost:8000/mcp）+ headers（Authorization: Bearer token）
- 安全三件事：加 token 鉴权、别直接开公网（先内网/反代）、生产环境上 HTTPS
- 策略：先 stdio 本地跑通，HTTP 切换成本五分钟（改一行 transport）

**关联**：MCP 全景方案 [https://v.flomoapp.com/mine/?memo_id=MjU3Mzc2NTg4](https://v.flomoapp.com/mine/?memo_id=MjU3Mzc2NTg4) / MCP 想法 [https://v.flomoapp.com/mine/?memo_id=MjU3MzczNjA0](https://v.flomoapp.com/mine/?memo_id=MjU3MzczNjA0)

#Resource/方法

