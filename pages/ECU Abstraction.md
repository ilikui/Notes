# ECU 抽象层（ECU Abstraction）

ECU 抽象层用于隐藏板级器件和 ECU 外部硬件的部分差异，让上层模块通过相对稳定的接口访问外部设备或板级资源。它通常位于 MCAL 与更高层服务之间；具体模块归属以采用的 AUTOSAR 版本和供应商实现为准。

- [[Basic Software Layer]]
- [[MCAL(Microcontroller Abstraction Layer)]]
- [[ECU Hardware]]
- [[Communication Interfaces]]

## 与 MCAL 的区别

- **MCAL**：更贴近 MCU 内部外设，如定时器、ADC、SPI 控制器和片上 CAN 控制器。
- **ECU Abstraction**：面向 ECU 板级或外部器件，如外部收发器、存储器、看门狗器件和板级接口。
- **CDD**：当标准模块或现有抽象无法满足特殊硬件/时序需求时，项目可能使用复杂设备驱动。

## 设计与调试要点

1. 确认硬件原理图、器件型号、引脚复用和供电条件。
2. 检查底层驱动初始化是否早于抽象层调用。
3. 识别接口是否暴露了不必要的硬件细节。
4. 验证器件故障、超时、读写错误和复位场景。
5. 更换板级器件时，检查变更是否限制在抽象层与配置中。
