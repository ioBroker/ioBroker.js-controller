---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/simatec/ioBroker.backitup/edit/master//README.md
title: BackitUp
hash: +xOmuPvKI9Iq2qYtWitfFl3l3Qebi5FUwrKFt46Gbig=
adapter: true
license: MIT
authors: simatec <nais@gmx.net>, peoples0815 <peoples0815github@gmail.com>, bluefox <dogafox@gmail.com>
description: This adapter enables the cyclical creation of backups of an IoBroker / Homematic installation
keywords: Backup, IoBroker, Homematic
readme: https://github.com/simatec/ioBroker.backitup/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2018-06-29T15:39:03.465Z
version: 1.1.3
---
Backitup是一种备份解决方案，可以对IoBroker安装以及Homematic CCU进行循环备份。

该适配器适用于多平台，除了Windows和Mac安装上的Linux安装外，还可以使用该适配器。

CIFS安装必须安装cifs-utils。

     -  sudo apt-get install cifs-utils

NFS安装必须安装nfs-common。

     -  sudo apt-get install nfs-common

##目录：
1.备份类型
    -  1.1最小备份（标准IoBroker备份）
    -  1.2完整备份
    -  1.3 CCU备份（CCU-Original / pivCCU / Raspberrymatic）
    -  1.4可选的Mysql备份（Localhost）
    -  1.5可选的Redis备份

2.准备

3. Ftp，CIFS，NFS，Copy和Dropbox

4.使用
    -  4.1创建的数据点
    -  4.3使用CCS格式化历史记录
    -  4.4在OneClick按钮中显示备份状态
    -  4.5成功备份后通知
5.还原备份
    -  5.1恢复最小备份
    -  5.2恢复完整备份
    -  5.3恢复Raspberrymatic / CCU备份
6.故障排除
    -  6.1激活日志记录
    -  6.2启用调试
7.遇到错误/解决方案
    -  7.1恢复后无法访问Web界面
    -  7.2 JS数据点不可写
    -  7.3错误信息：“未找到命令”
    -  7.4完全备份挂起
    -  7.5不接受Dp中的更改值

## 1.备份类型：
Backitup提供了循环或按下按钮执行不同备份类型的三种类型（可选择DB备份）的选项。默认情况下，每个备份都放在/ opt / iobroker / backups /目录中。可选地，可以设置FTP上载，或者可以使用CIFS安装。

1.标准备份
    - 此备份对应于IoBroker中包含的备份，该备份可通过“./iobroker backup”调用在控制台中启动。但是，它是通过适配器配置或OneClick备份窗口小部件中的指定设置完成的，无需使用控制台。
2.完成备份
    - 此备份可保护整个IoBroker文件夹，包括所有子文件夹及其文件，包括文件权限。这里，不应忽略文件大小，因为这样的备份通常有几百MB。

要确保必须在配置中备份所有最新状态，必须设置IoBroker停止/启动时的复选标记。

3. CCU备份（Homematic）
    - 此备份提供了保存3种不同版本的家庭装置（CCU original / pivCCU / Raspberrymatic）的可能性。也可以通过适配器配置或OneClick备份小组件中指定的设置来执行此备份。
4. mysql备份（localhost）
    - 如果激活，将为每个备份创建此单独可调备份，无论是“最小”还是“完成”，并将在指定的保留时间到期后删除。除非为其他IoBroker备份类型设置，否则FTP或CIFS对此备份也有效。
5. Redis备份
    - 如果激活，将为每个备份创建此单独可调备份，无论是“最小”还是“完成”，并将在指定的保留时间到期后删除。除非为其他IoBroker备份类型设置，否则FTP或CIFS对此备份也有效。

## 2.准备工作：
应使用以下步骤来使用适配器（如果使用v1 / v2 / v3备份脚本，请先删除所有内容（禁用/删除数据点/ enum.functions / shell脚本和javascript！）

## 3.使用Ftp，CIFS，NFS，Copy或Dropbox在Nas上进行可选备份？
   -  CIFS：
     - 在Linux上CIFS挂载不是问题。
     - 应该注意安装了cifs-utils
     - 路径应如下所示（例如：“/ Sharename / Pfadangabe”）
     - （可选）您可以启用/禁用是否应从NAS删除备份
   -  NFS：
     - 在Linux上，NFS挂载不是问题。
     - 应该注意安装了nfs-common
     - 路径应如下所示（例如：“/ Sharename / Pfadangabe”）
     - （可选）您可以启用/禁用是否应从NAS删除备份
   -  FTP：
     - 所有操作系统都可以使用FTP，并可作为CIFS安装的替代方案
     -  FTP下的路径必须始终以“/”开头（例如：“/ path”）
     - （可选）您可以启用/禁用是否应从NAS删除备份
   - 复制：
     - 如果无法安装CIFS，则还有另一种复制功能
     - 在CIFS设置中，必须在此处输入路径，其中应进行复制
     - 复制功能的IP地址规范必须为空
   -  Dropbox：
     - 要在Dropbox中使用备份，必须在https://www.dropbox.com/developers/apps上创建访问令牌和APP
     - 步骤1：使用“创建备份”按钮
     - 第2步：选择“Dropbox API”
     - 第3步：选择“App文件夹”
     - 第4步：提供“为您的应用命名”
     - 步骤5：按“生成的访问令牌”按钮（在Backitup的设置中输入令牌）
     - 在Dropbox中，现在有一个名为“Apps”的新文件夹

## 4.用法：
1.适配器创建7个数据点以供Vis使用
 -  oneClick.ccu  - >用作CCU备份的触发器触发器（可以通过按钮在Vis中设置为true）
 -  oneClick.minimal  - >用作标准备份的触发器触发器（可以通过按钮在Vis中设置为true）
 -  oneClick.total  - >用作完整备份的触发器触发器（可以通过按钮在Vis中设置为true）

 -  history.html  - >用作历史日志，在Vis中通过CCS可以通过设计进行自定义。
 -  history.ccuLastTime  - >存储上次CCU备份的创建日期和时间
 -  history.minimalLastTime  - >存储上次标准备份的创建日期和时间
 -  history.totalLastTime  - >存储上次完整备份的创建日期和时间
     -  history.totalSuccess  - >显示成功备份时的状态“true”
     -  history.ccuSuccess  - >显示成功备份时的状态“true”
     -  history.minimalSuccess  - >显示成功备份时的状态“true”

2.在Vis中显示历史记录
    - 通过在HTML中输入以下行，可以在html小部件中显示历史记录日志：

```
{backitup.0.history.html}
```

语法：{BackitupInstance.history.html}

3.历史日志的CCS格式：

```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-minimal
       {
           float:left;
           color:white;
           font-size:20px;
       }
   .backup-type-total
       {
           float:left;
           color:yellow;
           font-size:20px;
       }
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```

4.具有状态文本的OneClick按钮
    - 如果OneClick数据点设置为true，则相应的备份将启动，并且在预定义的时间之后，此数据点将再次设置为false，因此可以通过调整以下行并在Vis中将其作为按钮文本输入来创建具有状态的按钮：

```
{wert: backitup.0.oneClick.minimal; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

语法：{value：<BackitupInstance> .oneClick。<触发器触发器>;值===“真”||值得===真的？ “备份创建期间的文本”：“标准文本”}

5.备份成功备份后，Backitup支持以下信使通知。
    - 电报
    -  Pushover
    - 电子邮件

## 5.恢复：
从版本0.30开始，backitup具有恢复功能。
目前可以从本地路径，Dropbox，FTP或NAS恢复总备份，最小备份以及mysql和redis。
目前，还原仍处于测试阶段。

仍然必须通过CCU的Web界面恢复CCU备份。

对于所有备份类型，iobroker在还原期间停止，然后自动重新启动。

那些喜欢手动恢复备份的人应该执行以下操作：

1.恢复最小/正常IoBroker备份：
     - 备份必须像往常一样位于“opt / iobroker / backups /”目录中
     - 可以使用以下命令通过控制台恢复：“iobroker restore（列表中的备份数量）”。
     - 恢复后，需要“iobroker upload all”

2.恢复完整备份：
     - 通过控制台执行命令：“sudo iobroker stop”
     - 必须将创建的备份复制到目录“root /”
     - 从控制台运行命令：“sudo tar -xzvf Backupname.tar.gz -C /”
     - 等待 - 在恢复期间，您将看到正在完成的工作
     - 通过控制台执行命令：“sudo iobroker start”

3.还原Raspberrymatic / CCU备份：
     - 通过SCP将* .sbk文件复制到Raspberrymatic上的“/ usr / local / tmp目录”目录
     - 以root用户身份通过控制台登录Raspberrymatic
     - 在Raspberrymatic上执行命令：“/ bin/restoreBackup.sh / user / local / tmp / YourBackupFileName”。
     - 在Raspberrymatic上执行命令：“reboot”以重新启动PI
     - 或者，备份当然也可以像往常一样通过Web界面恢复。
4.恢复Redis：
     - 在恢复期间必须将Redis数据库解压缩到相应的文件夹中（例如：/ var / lib / redis）

## 6.故障排除：
1.要记录错误，必须在IoBroker rider实例下将Backitup设置为“debug”

## 7.遇到的错误/解决方案：
以下列出了目前遇到的问题及其解决方案（如果有）。

1. Olifall（来自论坛）的问题是，在恢复之后，IoBrokers的Web界面不再可用，通过控制台的以下步骤，他可以解决这个问题：
     -  sudo iobroker状态
     - 消息=“没有连接到状态127.0.0.0:6379[redis”
     -  sudo apt-get install redis-server

2.如果无法使用具有IP地址的CIFS装载，则应使用NAS的主机名
3.如果在cifs-mount中使用带有特殊字符的密码，则用户会注意到密码必须在配置中使用引号进行存储。
4.根据一些用户的说法，cifs-mount无法处理很长的密码。如果挂载不起作用，密码将略微缩短（12个字符对我有效）。
5.如果未安装适配器，请检查节点和nodejs的版本。适配器不支持<节点6版本。
6.如果您的iobroker没有以root身份运行，则backitup提供了使用sudo为cifs / nfs运行mount的选项。

    但是，在使用sudo调用时，您的系统必须已禁用root密码查询。

    这是一个小教程，通过几个步骤可以实现整体的可行性。

         -  sudo visudo

    在末尾的文件中插入以下行：

         - 用户名ALL =（ALL）NOPASSWD：/ bin / mount，/ bin / umount，/ bin / systemctl，/ usr / bin / systemd-run

    将“用户名”替换为您的iob用户

然后使用STR + o保存，使用Enter确认，然后使用STR + x关闭。
之后，我建议重新启动......但这取决于系统。

但我想再次强调，这些事情与backitup无关，因此backitup没有问题。
这些东西是您系统所独有的。

7.如果您的iobroker系统安装了新的安装程序脚本，则可能没有新用户iobroker的所有权限。

    不幸的是，这也适用于backitup，因为backitup使用一些与系统相关的命令。

为了解决缺少权限的问题，现在修复了iobroker的安装程序脚本。
请在控制台中的Iobroker环境中运行以下命令：

```
curl -sL https://raw.githubusercontent.com/ioBroker/ioBroker/master/fix_installation.sh | bash
sudo reboot
```

8.如果在创建Redis数据库时出错，请检查您的用户iobroker是否拥有Redis用户组中的权限。

    如果不是这种情况，您可以在控制台中使用以下命令进行修复。

```
sudo usermod -a -G redis iobroker
sudo reboot
```

    如果您尚未使用安装程序脚本设置Iobroker安装，并且您的用户具有不同的名称，请在命令“iobroker”中将其替换为您的用户。

## Changelog

### 1.1.3 (12.03.2019)
* (simatec) Timeout for email sending
* (simatec) Timeout for pushover sending
* (simatec) Timeout for telegram sending
* (simatec) Code cleaned up

### 1.1.2 (21.02.2019)
* (simatec) exec Start for iobroker
* (simatec) Fix umount before Restore

### 1.1.1 (12.02.2019)
* (simatec) Fix iobroker-stop for total backup

### 1.1.0 (10.02.2019)
* (simatec) stable Release

### 1.0.9 (02.02.2019)
* (simatec) Add New umount query
* (simatec) Add Umount wait by device busy
* (simatec) Add Timeout for History settings
* (simatec) Add Notification only on error

### 1.0.8 (26.01.2019)
* (simatec) modification for new installer
* (simatec) WOL-waittime adjustable
* (simatec) Fix History settings

### 1.0.7 (17.01.2019)
* (simatec) better start/stop Handling for backup and restore

### 1.0.6 (16.01.2019)
* (simatec) Fix Start/Stop for new iobroker-installer

### 1.0.5 (14.01.2019)
* (simatec) Fix compact mode
* (simatec) Fix total backup
* (simatec) better history handling for html
* (simatec) better history handling
* (simatec) error Message for telegram
* (simatec) error Message for E-Mail
* (simatec) error Message for pushover

### 1.0.4 (08.01.2019)
* (simatec) support for compact mode

### 1.0.3 (06.01.2019)
* (simatec) Bugfix

### 1.0.2 (05.01.2019)
* (simatec) Fix start/stop for new iobroker-Installer

### 1.0.1 (30.12.2018)
* (simatec) Fix delete old Files
* (simatec) Add wake on LAN for CIFS and NFS

### 1.0.0 (24.12.2018)
* (simatec) Stable Release

### 0.4.4 (19.12.2018)
* (simatec) Fix cifs-mount User

### 0.4.3 (17.12.2018)
* (simatec) Add device ID for pushover

### 0.4.2 (10.12.2018)
* (simatec) Fix mount / umount
* (simatec) Fix Readme

### 0.4.1 (07.12.2018)
* (simatec) Added boolean for backup Success
* (simatec) Added Selection menu SMB type (CIFS)
* (simatec) Added Checkbox for mount as root (sudo)

### 0.4.0 (04.12.2018)
* (simatec) Added Pushover Notification

### 0.3.9 (03.12.2018)
* (simatec) Fix cifs/nfs mount and umount

### 0.3.8 (08.11.2018)
* (simatec) Fix notifications format
* (simatec) Fix Telegram User

### 0.3.7 (07.11.2018)
* (simatec) Added e-mail notification
* (simatec) Create backup directory on first boot
* (simatec) many small changes
* (peoples) Fix Telegram SilentNotice
* (peoples) Added Possibility to select a Telegram Receiver
* (peoples) Added Possibility to select a Telegram Notification length
* (peoples) Some Translations

### 0.3.6 (16.10.2018)
* (simatec) Fix Dropbox Backup
* (simatec) Fix Restore path for ownDir
* (simatec) Fix FTP and NAS path
* (simatec) Fix Access Token for dropbox

### 0.3.5 (03.10.2018)
* (simatec) Fix Translation
* (simatec) Fix Filename Suffix for Restore
* (peoples) Bugfix Title for Backup deletion

### 0.3.4 (01.10.2018)
* (simatec) Fix Restart after total-backup

### 0.3.3 (27.09.2018)
* (simatec) Fix Backup-Directoy for dropbox
* (simatec) Fix Restart after total-backup
* (simatec) Fix error Log on cifs

### 0.3.2 (25.09.2018)
* (simatec) Fix Filename for ccu backup

### 0.3.1 (25.09.2018)
* (simatec) Fix FTP Directory
* (simatec) delete old Files

### 0.3.0 (24.09.2018)
* (bluefox/simatec) Add Multiplatform (Windows/Linux/Mac)
* (bluefox/simatec) Backitup switched to Javascript
* (bluefox/simatec) shell support removed
* (bluefox/simatec) Deleting old backups up to the last X backups added
* (bluefox/simatec) restore feature added (beta)
* (bluefox/simatec) Restore added via NAS/FTP/Local/Dropbox (Beta)
* (simatec) NFS support added
* (bluefox) Dropbox Support added
* (bluefox) Fix History
* (peoples) Added silent mode for telegram
* (simatec) Redis/mysql added with standard backup
* (simatec) translations added
* (simatec) Docs adapted

### 0.2.7 (29.07.2018)
* (simatec) Fix Delete old Files

### 0.2.6 (27.07.2018)
* (bluefox) Configurable redis path was added
* (simatec) Translations Script
* (simatec) Fix FTP Upload

### 0.2.5 (26.07.2018)
* (simatec) Check for dependencies
* (simatec) Delete older files if number of files greater than X
* (simatec) Check for Backup Dir
* (simatec) Translations added

### 0.2.4 (23.07.2018)
 * (peoples) Some Bugfixes
 * (peoples) Added translations in words.js


### 0.2.3 (19.07.2018)
 * (bluefox) The backup buttons in configuration dialog were added
 * (bluefox) Show bash output text
 * (peoples) Bug Fix Mysql-Login Error

### 0.2.2 (17.07.2018)
 * (peoples/simatec/bluefox) Bug Fix Code

### 0.2.1 (15.07.2018)
 * (peoples/simatec) Bug Fix

### 0.2.0 (14.07.2018)
 * (blufox) Code formatting

### 0.1.8 (11.07.2018)
 * (darkiop) MySQL-Sicherung um Host- und Portabfrage erweitert
 * (peoples) Versendende Telegram-Instanz wählbar
 * (peoples) Telegram-Nachrichten angepasst an Verbindungstyp
 * (peoples) History-Log angepasst an Verbindungstyp
 * (simatec) Komprimierung der MySQL-Datenbank-Sicherung eingebaut
 * (simatec) Anpassung der Konfigoberfläche an Telegram-Instanz Auswahl

### 0.1.7 (05.07.2018)
 * (peoples) Datenpunkte in io-package definiert

### 0.1.6 (04.07.2018)
 * (simatec/peoples) Beta Version

### 0.1.5 (03.07.2018)
 * (peoples) Log Einträge neu formatiert

### 0.1.4 (02.07.2018)
 * (simatec/peoples) diverse Anpassungen

### 0.1.3 (01.07.2018)
 * (simatec/peoples) Sprachen hinzugefügt

### 0.1.2 (30.06.2018)
 * (simatec/peoples) Erste Beta-Version

### 0.1.0 (25.06.2018)
 * (simatec/peoples) Erste Git-Adapter-Version

## License

The MIT License (MIT)

Copyright (c) 2019 simatec <nais@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.