---
title: 安装
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/install/requirements.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: jYPUXpm8ET8LTKs1J7hz/lj9aT42Qcc64vVktdd9Ees=
---
＃系统要求
？&gt; ***这是一张通配符***。 <br><br>帮助ioBroker并扩展这篇文章。请注意[ioBroker风格指南](community/styleguidedoc)，以便更容易采用这些更改。

@@@表包含RAM，cpu，OS，Node.js，npm，构建工具，网络，磁盘空间，SD卡大小@@@

###重新安装
| |变种|版本|
|---|:---------:|:-------:|

**运行时环境** | | Node.js | 32- / 64位<br> ppc641e <br> arm v61，armv71，arm64 <br> aix-ppc64，s390x | 8.12.0 **包管理器** | |节点包管理器npm | | 6.4.1

ioBroker可以安装在Node.js可用的所有系统上。

###现有安装
| |变种|版本|
|---|:---------:|:-------:|

**运行时环境** | | Node.js | 32- / 64位<br> ppc641e <br> arm v61，armv71，arm64 <br> aix-ppc64，s390x | 6.0.0  -  10.10.0 <sup>* 1</sup> **包管理器** | |节点包管理器npm | | 3.0.0  -  4.6.1 5.7.1  -  6.4.1

<sup>* 1</sup>以下适配器仍然存在Node.js版本&gt; = 10.0的问题：

 -  maxcul（因为串口依赖）
 -  noolite（因为串行端口依赖）
 -  wetty（因为pty.js依赖）

###支持的操作系统
| |变种|
|---|:---------:|

* Windows *| Windows 7 | 32/64位Windows Server 2008 R2 | 64位/ IA64版Windows 8 | 32/64位Windows Server 2012 | 64位Windows 8.1 | 32/64位Windows Server 2012 R2 | 64位Windows 10 | 32/64位Windows Server 2016 | 64位* Linux发行版* | Arch和Derivatives | Debian和衍生品|例如Ubuntu，Bananian， <br> Cubian，Raspbian，Knoppix Gentoo和衍生物|红帽和衍生品|例如Fedora，Pidora， <br> CentOS，Mandriva Slackware和Derivatives |例如openSUSE* 他* | macos | 64位Linux From Scratch |