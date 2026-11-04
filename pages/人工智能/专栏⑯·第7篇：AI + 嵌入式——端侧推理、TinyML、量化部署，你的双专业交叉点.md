flomo-id:: MjUwNTg2NDAz
flomo-created-at:: 2026-08-06T19:05:46+08:00
flomo-updated-at:: 2026-11-01T09:17:27+08:00
flomo-tags:: Area/技术/AI
flomo-source:: https://v.flomoapp.com/mine/?memo_id=MjUwNTg2NDAz
flomo-word-count:: 2102
flomo-migration-status:: raw-import

# 专栏⑯·第7篇：AI + 嵌入式——端侧推理、TinyML、量化部署，你的双专业交叉点

> 原始 Flomo 笔记归档。正文按 Flomo 返回内容保留；专题提炼请链接到对应主题页。

**专栏⑯·第7篇：AI + 嵌入式——端侧推理、TinyML、量化部署，你的双专业交叉点**

📎 第6篇：AI Agent 与工作流 → [https://v.flomoapp.com/mine/?memo_id=MjUwNTg2Mjk5](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2Mjk5)

1000 问里有端侧 AI 和模型部署的问题（TinyML、量化、CMSIS-NN）。这篇把 AI 和嵌入式拉到一起——这是你 15 个专栏里唯一一个跨界交叉点，也是未来最值钱的组合。

**一、为什么要在 MCU 上跑 AI——而不是发云端**

- **延迟**：本地推理 <10ms，云端往返 50-200ms——实时控制（电机、刹车）只能本地

- **隐私**：数据不出设备（摄像头画面、健康数据）

- **可靠性**：断网也能工作

- **成本**：无云端推理费用

**代价**：Cortex-M4 的算力（100MHz 级、无 GPU）跑不了大模型——只能跑 **小模型**（KWS 关键词识别、异常检测、简单分类）。

**二、TinyML 的典型栈——模型怎么塞进 MCU**

训练（PC/Python）→ 量化（float32→int8）→ 导出（TFLite/ONNX）→ 部署（TFLite Micro / CMSIS-NN）→ 推理（MCU）

**量化为什么精度不掉**：神经网络对噪声鲁棒（1000 问里有）。float32 的权重 0.1234567 量化成 int8 的 0.12——精度损失在网络的容错范围内。模型大小缩小 4 倍，推理快 3-4 倍。

**CMSIS-NN 怎么加速**：利用 Cortex-M4/M7 的 DSP 指令（SIMD 乘加）优化卷积和全连接层——比裸 for 循环快 4-5 倍。关键： **算法不变，用指令级优化榨硬件**。

**三、一个完整的 MCU 端 AI 例子——关键词唤醒（KWS）**

1. **数据**：采集"Hey 设备"音频（几千条）

2. **特征**：MFCC（梅尔频率倒谱系数）——把音频变频谱特征（跟 1000 问 ASR 里 Mel 频谱同源）

3. **模型**：小 CNN（2-3 层卷积 + 全连接），参数量 <100K

4. **量化**：int8，模型 <200KB

5. **部署**：TFLite Micro + CMSIS-NN，跑在 Cortex-M4 上

6. **推理**：一次推理 10-30ms，占内存 <64KB

**判断能不能塞进 MCU 的三问**：模型多大（Flash）？激活内存多大（RAM）？推理多久（算力/实时要求）？

**四、AI + 汽车的三个落地方向（你的专业视角）**

**1\. 传感器异常检测**：用 AI 检测 CAN 信号异常（而非固定阈值）——正常模式是"学习出来的"，异常是"偏离模式"（对应 1000 问异常检测的上下文异常）

**2\. 诊断数据分析**：OBD/诊断数据量大，用 AI 做故障分类（DTC 关联分析）——边缘节点预处理，云端跑大模型

**3\. 车辆预测性维护**：电池/电机数据流上跑小模型预测剩余寿命——但注意：功能安全（ISO 26262）对 AI 决策有额外要求，AI 只能辅助不能全权

**五、一个工程判断——MCU 端 AI 的边界在哪**

- **能做的**：小模型分类/检测/回归（<100K 参数），推理 <50ms

- **不能做的**：大语言模型（7B 参数需要 8GB+ 内存）、复杂视觉（YOLO 需要 GPU 级算力）

- **分水岭**：需要"理解语义"（NLP/对话）→ 云端或 NPU；只需要"识别模式"（传感器/信号/简单图像）→ MCU 端可行

📎 第6篇：AI Agent 与工作流 → [https://v.flomoapp.com/mine/?memo_id=MjUwNTg2Mjk5](https://v.flomoapp.com/mine/?memo_id=MjUwNTg2Mjk5)<br> 📎 专栏⑮嵌入式导航 → [https://v.flomoapp.com/mine/?memo_id=MjQ1NzMzNDk3](https://v.flomoapp.com/mine/?memo_id=MjQ1NzMzNDk3)<br> 📎 专栏⑬硬件导航 → [https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3](https://v.flomoapp.com/mine/?memo_id=MjQ3NTQ2MDE3)

**专栏⑯进度：7/10篇**

#Area/技术/AI

#Archive/MigratedWiki #Archive/DeleteCandidate

#Archive/MigratedNotion
