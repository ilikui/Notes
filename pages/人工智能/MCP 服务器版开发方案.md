flomo-id:: MjYxMjU1MTQz
flomo-created-at:: 2026-10-16T13:05:25+08:00
flomo-updated-at:: 2026-11-01T09:17:17+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjYxMjU1MTQz
flomo-word-count:: 1173
flomo-migration-status:: raw-import

# MCP 服务器版开发方案

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**MCP 服务器版开发方案**

**1\. 传输**

用 Streamable HTTP，单一端点 /mcp；每条 JSON-RPC 消息一个 POST，需要流式就在该请求上返回 SSE。旧的 HTTP+SSE 已废弃。

**2\. 框架**

用官方 SDK（TypeScript 的 @modelcontextprotocol/sdk 或 Python 的 FastMCP），注册 tool / resource / prompt 后以 streamable-http 模式启动，不手写 JSON-RPC。

**3\. 对齐协议修订 2026-07-28**

- 协议已无状态：没有 initialize 会话握手，也没有 Mcp-Session-Id
- 每个请求在 \_meta 里带 protocolVersion 和 clientCapabilities
- 新增 server/discover，客户端先问版本与能力
- 跨调用状态自己发 handle（如 job_id）当普通参数传回
- 这样服务才能放到负载均衡后面横向扩

**4\. 能力面分开设计**

- tools：会改状态 / 调外部接口的动作
- resources：只读数据（URI + 模板）
- prompts：固定模板
- 只读查询不包成工具

**5\. 认证分两档**

- 自用或小团队：bearer token（Authorization 头）最省事
- 对外：OAuth 2.1，服务当 resource server，暴露 Protected Resource Metadata 指向授权服务器，令牌仅对本服务有效

**6\. 安全与运维**

- 校验 Origin（防 DNS rebinding）
- 本地调试绑 127.0.0.1
- 工具参数按 inputSchema 校验，不直接拼进 shell 或 SQL
- 写操作带 idempotency_key
- 无状态后可直接进容器、网关或 Serverless

**7\. 落地顺序**

本地 stdio 版跑通 → 换 streamable-http transport → 加 token → 部署并关掉不需要的能力

📎 相关：MCP 在 VSCode 中运行·技术方案 → [https://v.flomoapp.com/mine/?memo_id=MjU3NTg0ODY5](https://v.flomoapp.com/mine/?memo_id=MjU3NTg0ODY5)

