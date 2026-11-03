---
flomo_id: OTAzNDYyOTc
created_at: 2023-11-12T18:40:21+08:00
tags:
  - Area/学习管理/Linux学习
source: https://v.flomoapp.com/mine/?memo_id=OTAzNDYyOTc
migration_status: archived
---

> Flomo 原文快照：保留原始正文；专题页中的订正不得覆盖本文件。

**Linux 学习指南**

**1. 查看系统信息**

- 内核版本：cat /proc/version、uname -a
- 发行版：cat /etc/os-release、lsb_release -a
- CPU：lscpu、cat /proc/cpuinfo
- 内存：free -h、cat /proc/meminfo
- 磁盘：df -h、lsblk
- 硬件：lsusb、lspci

**2. 文件与目录**

- 查看：pwd、ls -al、cd
- 复制 / 移动 / 删除：cp -r、mv、rm -rf
- 查找：find、which、locate
- 权限：chmod -R 777（权限过宽，慎用）、chown、ls -l
- 软链：ln -s

**3. 文本处理**

- 查看：cat、less、head、tail -f
- 搜索：grep -rn "关键词" .
- 编辑：vi / vim
- 管道与重定向：|、>、>>

**4. 进程与服务**

- 进程：ps aux、top / htop、kill -9、pkill
- 服务：systemctl status / start / stop
- 日志：dmesg、journalctl -f

**5. 网络**

- 地址与连通：ip addr、ping
- 端口：ss -tunlp、netstat -tunlp
- 传输：wget、scp、rsync
- 远程：ssh、ssh-keygen

**6. 包管理**

- Debian / Ubuntu：apt update、apt install
- RHEL / CentOS：yum、dnf

参考：Linux 常用命令汇总 → https://www.cnblogs.com/ywl925/p/11083351.html

相关：Linux 常用指令 → https://v.flomoapp.com/mine/?memo_id=MTE3ODI0MzE1

[查看 Flomo 原文](https://v.flomoapp.com/mine/?memo_id=OTAzNDYyOTc)
