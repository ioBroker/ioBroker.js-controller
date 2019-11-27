---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.backitup/README.md
title: 没有标题
hash: bzs5oxDy5vnxzGAnMRWCNpBWfGCNZoo3NkG//y1V+lc=
---
Backitup是一种备份解决方案，它可以对ioBroker安装以及Homematic CCU进行周期性备份。

该适配器适用于多平台，除了Windows和Mac安装上的Linux安装之外，还可以使用该适配器。

CIFS安装必须安装了cifs-utils。

    -`sudo apt-get install cifs-utils`

NFS挂载必须已安装nfs-common。

    -`sudo apt-get install nfs-common`

## 1.备份类型
Backitup提供了以下选项：周期性地或按一下按钮即可执行三种类型（可选地使用数据库备份）的不同备份类型。默认情况下，每个备份都放置在/ opt / iobroker / backups /目录中。 （可选）可以设置FTP上传，也可以使用CIFS挂载。

1.标准备份
   -该备份对应于ioBroker中包含的备份，可以通过调用“ ./iobroker backup”在控制台中启动它。但是，此操作是通过适配器配置或OneClick Backup小部件中的指定设置完成的，而不必使用控制台。
2. CCU备份（Homematic）
   -此备份可以保存Homematic安装的3种不同变体（CCU原始/ pivCCU / Raspberrymatic）。也可以通过适配器配置或OneClick备份小部件中的指定设置来执行此备份。
3. mysql备份（本地主机）
   -如果激活了此可单独调整的备份，则会为每个备份“最少”创建一个备份，并在指定的保留时间到期后将其删除。除非为其他ioBroker备份类型设置，否则FTP或CIFS对此备份也有效。
4. Redis备份
   -如果激活了此可单独调整的备份，则会为每个备份“最少”创建一个备份，并在指定的保留时间到期后将其删除。除非为其他ioBroker备份类型设置，否则FTP或CIFS对此备份也有效。
5.历史数据备份
   -如果激活了此可单独调整的备份，则会为每个备份“最少”创建一个备份，并在指定的保留时间到期后将其删除。除非为其他ioBroker备份类型设置，否则FTP或CIFS对此备份也有效。

## 2.使用Ftp，CIFS，NFS，Copy或Dropbox在Nas上进行可选备份吗？
  -CIFS：
    -在Linux上，CIFS挂载不是问题。
    -请注意，已安装cifs-utils
    -路径应如下所示（例如：“ / Sharename / Pfadangabe”）
    -（可选）您可以启用/禁用是否应从NAS删除备份
  -NFS：
    -在Linux上，NFS挂载不是问题。
    -请注意，已安装nfs-common
    -路径应如下所示（例如：“ / Sharename / Pfadangabe”）
    -（可选）您可以启用/禁用是否应从NAS删除备份
  -FTP：
    -在所有操作系统上都可以使用FTP，并且FTP可以替代CIFS安装
    -FTP下的路径必须始终以“ /”开头（例如：“ / path”）
    -（可选）您可以启用/禁用是否应从NAS删除备份
  -复制：
    -如果没有CIFS挂载，则复制功能还有另一种可能性
    -在CIFS设置中，必须在此处输入路径，并在其中进行复制
    -复制功能的IP地址规范必须保留为空
  -保管箱：
    -要在Dropbox中使用备份，必须在https://www.dropbox.com/developers/apps中创建访问令牌和APP
    -步骤1：使用按钮“创建备份”
    -步骤2：选择“ Dropbox API”
    -步骤3：选择“应用文件夹”
    -步骤4：输入“为您的应用命名”
    -第5步：按“生成的访问令牌”按钮（在Backitup的设置中输入了令牌）
    -在您的Dropbox中，现在有一个名为“ Apps”的新文件夹
  -Google云端硬盘：
    -要在Google云端硬盘中使用备份，必须获取访问令牌。您可以在配置页面上执行此操作
    -ioBroker仅攻击定义的区域。可以在[此处]（https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js）查看oAuth的代码。
    -没有令牌或用户数据存储在云中。

## 3.使用
1.适配器创建7个数据点以用于Vis
-oneClick.ccu->用作CCU备份的触发触发器（可以在Vis中通过按钮设置为true）
-oneClick.minimal->用作标准备份的触发触发器（可以在Vis中通过按钮设置为true）

-history.html->用作历史记录，该记录可在Vis中通过CCS由设计定制。
-history.ccuLastTime->存储上一次CCU备份的创建日期和时间
-history.minimalLastTime->存储上次标准备份的创建日期和时间
    -history.ccuSuccess->成功备份后显示状态“ true”
    -history.minimalSuccess->成功备份后显示状态“ true”

2.在Vis中显示历史记录日志
   -例如，通过在HTML中输入以下行，可以在html小部件中显示历史记录日志：

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
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```

4.带有状态文本的OneClick按钮
   -如果OneClick数据点设置为true，则将启动相应的备份，并且在预定义的时间后，该数据点将再次设置为false，因此可以通过调整以下行并在Vis中将其输入为按钮文本来创建具有状态的按钮：

```
{wert: backitup.0.oneClick.minimal; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

语法：{value：<BackitupInstance> .oneClick。<触发触发器>;值===“ true” ||值===正确吗？ “备份创建期间的文本”：“标准文本”}

5.成功备份后，Backitup支持以下Messenger进行通知。
   -电报
   -俯卧撑
   -电子邮件

## 4.还原：
可以从本地路径，Dropbox，GoogleDrive，FTP或NAS恢复最小备份以及mysql，历史数据和Redis。
目前，还原仍处于测试阶段。

必须仍然通过CCU的Web界面还原CCU备份。

对于所有备份类型，iobroker在还原过程中都会停止，然后自动重新启动。

那些希望手动还原其备份的人应该执行以下操作：

1.恢复最小/正常的ioBroker备份：
    -备份必须照常位于“ opt / iobroker / backups /”目录中
    -可以使用以下命令从控制台进行还原：“ iobroker restore（列表中的备份数）”。
    -还原后，需要“ iobroker全部上传”

2.还原Raspberrymatic / CCU备份：
    -通过SCP将* .sbk文件复制到Raspberrymatic上的目录“ / usr / local / tmp directory”
    -通过控制台以root用户身份登录Raspberrymatic
    -在Raspberrymatic上执行命令：“ / bin / restoreBackup.sh / user / local / tmp / YourBackupFileName”。
    -在Raspberrymatic上执行命令：“ reboot”以重新启动PI
    -当然，也可以通过Web界面照常还原备份。

3.恢复Redis：
    -还原期间，必须将Redis数据库解压缩到相应的文件夹中。 （例如：/ var / lib / redis）

4.还原历史记录：
    -在还原过程中，必须将历史数据库解压缩到相应的文件夹中。

## 6.故障排除
    1.要记录错误，必须在ioBroker附加程序实例下将Backitup设置为“调试”。

## 7.遇到的错误/解决方案：
这里列出了到目前为止遇到的问题及其解决方案（如果有）。

1. Olifall（来自论坛）遇到的问题是，在还原ioBrokers的Web界面后，无法再通过在控制台上执行以下步骤来解决此问题：
    -sudo iobroker身份
    -消息=“未连接到状态127.0.0.0:6379[redis]
    -sudo apt-get install redis-server

2.如果无法通过IP地址安装CIFS，则应使用NAS的主机名
3.如果在cifs-mount中使用带有特殊字符的密码，则用户会注意到，该密码必须在引号中存储在引号中。
4.一些用户认为，cifs-mount无法处理非常长的密码。如果安装不起作用，密码将略微缩短（12个字符对我有用）。
5.如果未安装适配器，请检查您的node和nodejs版本。适配器不支持版本<Node 8。
6.如果您的iobroker系统是使用新的安装程序脚本安装的，则您可能没有新用户iobroker的所有权利。

    不幸的是，这也适用于备份，因为备份使用一些与系统相关的命令。

为了解决缺少权限的问题，现在对iobroker安装程序脚本进行了修复。
请在控制台的Iobroker环境中运行以下命令：

```
curl -sL https://iobroker.net/fix.sh | bash -
sudo reboot
```

8.如果在创建Redis数据库时遇到错误，请检查您的用户iobroker是否具有权限以及该用户是否存在于用户组Redis中。

    如果不是这种情况，则可以在控制台中使用以下命令对其进行修复。

```
sudo usermod -a -G redis iobroker
sudo reboot
```

    如果您尚未使用安装程序脚本设置Iobroker安装，并且您的用户使用其他名称，请在命令“ iobroker”中将其替换为您的用户。

## Changelog

### 1.3.0 (22.11.2019)
* (simatec) support end for the total backup
* (simatec) Added backup of history data path
* (simatec) Added startup of all adapters after restore
* (simatec) Revision of the restoration for Redis
* (simatec) revision of log issues
* (simatec) Rebuild the start / stop processes under Unix
* (simatec) Rebuilding the start / stop processes under Windows
* (simatec) new translations
* (simatec) adjustments to the new Windows Installer
* (simatec) adjustments to the new Linux installer
* (simatec) fixed some small bugs

### 1.2.2 (20.10.2019)
* (simatec) Fix update process

### 1.2.1 (19.10.2019)
* (simatec) Fix CIFS password with special characters

### 1.2.0 (02.07.2019)
* (bluefox) Google Drive was added
* (simatec) Support for node 6 ended

### 1.1.4 (08.04.2019)
* (simatec) Support for SMB3
* (simatec) Backup for Zigbee Database
* (simatec) Restore for Zigbee Database

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

Copyright (c) 2018 - 2019 simatec <nais@gmx.net>

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