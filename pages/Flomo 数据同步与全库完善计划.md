# Flomo 数据同步与全库完善计划

> 目标：把 Flomo 中有价值的原始记录可靠地纳入 Notes，同时逐步提升现有知识库的结构、内容质量、可检索性和可验证性。本计划与 NotesBook、wiki 等其他仓库的迁移任务分开管理。

## 1. 数据源盘点

- Flomo 标签树：103 个标签，未截断。
- 顶层分类：Archive（5）、Area（56）、Inbox（17）、Project（3）、Resource（22）。
- 技术子类：24 个，包括 AI、AUTOSAR、C/C#、MATLAB、Python、嵌入式、数据库、汽车电子电气架构、电机控制、电气电子、硬件、网络安全、自动驾驶、设计模式和通信。
- Notes 当前主分支盘点：402 个文件，其中 `pages/` 125、`journals/` 38、`whiteboards/` 2、`assets/` 22；仓库同时包含 Logseq/Obsidian 配置和插件文件。

## 2. 迁移原则

1. 原始 Flomo 笔记按 ID 独立归档，保留正文、创建时间、更新时间、标签、原始链接和字数。
2. 以 Flomo ID 幂等去重；已有主题页优先补充链接，不覆盖原始日记、白板、插件或配置。
3. `Archive/MigratedWiki`、`Archive/MigratedNotion`、`Archive/DeleteCandidate` 只是来源标签，必须保留；不能据此跳过 Notes 同步或删除 Flomo 原文。
4. 长篇内容先完整归档，再提炼到主题页；不要把摘要当作原文迁移完成。
5. 带图片、语音或附件的笔记要单独登记附件状态；没有实际下载和验证时不得标记附件已迁移。
6. 涉及个人信息、项目机密、凭证或不适合公开的内容，先进入待审查清单，不直接公开。

## 3. 目标目录

```text
pages/
  Flomo Archive/          # 原始 Flomo 快照，按 memo ID 命名
  AUTOSAR.md              # 主题提炼与导航
  C语言.md
  嵌入式.md
  ...
journals/                 # 原有日记保留，不把 Flomo 原文覆盖到旧日记
assets/                   # 经过检查的图片与附件
```

原始归档采用 Logseq 页面属性：`flomo-id`、`flomo-created-at`、`flomo-updated-at`、`flomo-tags`、`flomo-source`、`flomo-word-count`、`flomo-migration-status`。

## 4. 专题映射

| Flomo 标签主题 | Notes 目标专题 |
|---|---|
| Area/技术/AUTOSAR | AUTOSAR、Classic Platform、BSW、RTE、通信栈、诊断栈 |
| Area/技术/C语言 | C语言、编译原理、内存管理、数据结构 |
| Area/技术/嵌入式 | 嵌入式、嵌入式系统、嵌入式软件、嵌入式硬件 |
| Area/技术/AI | AI 与智能体、MCP、具身智能 |
| Area/技术/自动驾驶 | 自动驾驶、汽车电子、电子电气架构 |
| Area/技术/电气与电子 | 电气电子、EMC、电源、硬件 |
| Area/技术/硬件、通信、电机控制 | 嵌入式硬件、通信、汽车电子、电机控制 |
| Area/学习管理、Area/知识管理 | 学习管理、知识管理、卡片笔记、阅读管理 |
| Area/个人成长、Inbox | 思考笔记、日记索引、问题树；保留个人记录属性 |
| Project、Resource | 项目索引、工具资源、阅读与来源清单 |

## 5. 已执行导入批次

### 2026-11-01 · 第一批原始快照

已在分支 `flomo-sync/2026-11-01` 导入 110 条 Flomo 原始笔记，全部通过 `memo_batch_get` 获取完整正文（无 `content_truncated`、无 omitted IDs），并写入 `pages/Flomo Archive/<memo-id>.md`：

- AUTOSAR / MCAL：10 条
- C 语言：10 条
- 嵌入式：10 条
- AI：10 条
- 自动驾驶：10 条
- 电气与电子：10 条
- 硬件：10 条
- 通信：10 条
- 知识管理：10 条
- 学习管理：10 条
- 方法与资源：10 条

目录索引：[`Flomo Archive`](Flomo%20Archive/README.md)。本批是首轮样本，不代表 Flomo 全量迁移完成；多个标签检索达到 50 条上限，需按日期继续分段查询。个人成长、职业、财富、日记等可能包含私人或工作敏感信息的类别暂不公开导入，先做隐私审查。

## 6. 后续全量迁移队列

- [ ] 按全部 103 个标签逐类检索，记录每类实际命中数；对超过 50 条的标签按日期拆分。
- [ ] 覆盖所有非技术 Area、Inbox、Project、Resource 标签，不只迁移技术笔记。
- [ ] 对长正文逐条批量读取，任何 `content_truncated=true` 或 `omitted_ids` 都必须继续取回。
- [ ] 核对 Flomo 附件、图片、语音与链接；记录缺失项。
- [ ] 以 Flomo ID 与已有归档比对，更新索引而非重复写入。
- [ ] 将高价值卡片提炼到已有主题页，并添加来源反向链接。
- [ ] 对公开仓库内容做隐私与机密检查。
- [ ] 全部迁移后输出源端总数、成功数、重复数、失败数、附件缺失数和抽样回读结果。

## 7. Notes 全库完善队列

- [ ] 修复 `pages/contents.md` 中重复的 renderer 条目，检查 TOC 插件兼容性。
- [ ] 检查 125 个主题页面的空壳、重复主题、内容深度和链接目标。
- [ ] 检查 38 个 journals 文件、2 个 whiteboards、22 个 assets 的引用完整性；保留原件。
- [ ] 检查 Logseq、Obsidian 配置及插件兼容性，不随意升级或删除。
- [ ] 对 AUTOSAR、C、嵌入式、AI、自动驾驶等专题补充 Mermaid 架构图、流程图、工程示例、版本和验证依据。
- [ ] 对知识管理、阅读管理、学习方法、个人成长内容建立可导航的索引与卡片关联。
- [ ] 检查所有内部链接、图片、Mermaid 围栏和 GitHub Pages / Cloudflare 发布结果。
- [ ] 每批变更在独立分支完成回读和构建验证，再提交 PR。

## 8. 当前状态与边界

- 当前分支只包含原始快照首批 80 条与索引；尚未创建或合并 PR。
- 没有删除或修改任何 Flomo 原始笔记。
- 没有修改 Notes 原有 journals、whiteboards、插件配置或历史资料。
- 不能将 80 条描述为全部 103 标签或全部 Flomo 数据已迁移。
- Flomo 搜索接口单次最多返回 50 条；超限类别需按日期拆分，避免漏项。
