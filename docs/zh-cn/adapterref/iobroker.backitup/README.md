---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-Dependency Status: https://img.shields.io/david/simatec/iobroker.backitup.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg
BADGE-Travis-CI: http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.backitup.png?downloads=true
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.backitup/README.md
title: ioBroker.backitup
hash: 6lTimXcn7K/rQM1vfH7j9aPrezOBL0E/ejH6adlrdT0=
---
![商标](../../../de/adapterref/iobroker.backitup/img/backitup.png)

![安装数量](http://iobroker.live/badges/backitup-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.backitup.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.backitup.svg)
![依赖状态](https://img.shields.io/david/simatec/iobroker.backitup.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg)
![特拉维斯](http://img.shields.io/travis/simatec/ioBroker.backitup/master.svg)
![NPM](https://nodei.co/npm/iobroker.backitup.png?downloads=true)

＃ioBroker.backitup
＃ 内容
* [基本]（＃基本）
* [依赖关系]（＃个依赖关系）
* [备份类型]（＃个备份类型）
* [ioBroker备份]（＃ioBroker备份）
* [CCU备份（Homematic）]（＃CCU-Backup-（Homematic））
* [Mysql-Backup]（＃Mysql-Backup）
    * [Redis备份]（＃Redis备份）
* [InfluxDB备份]（＃InfluxDB备份）
    * [PostgreSQL备份]（＃PostgreSQL备份）
    * [Javascript-Backup]（＃Javascript-Backup）
    * [Jarvis备份]（＃Jarvis备份）
    * [Zigbee备份]（＃Zigbee备份）
    * [Grafana备份]（＃Grafana备份）
* [存储选项]（＃个存储选项）
    * [CIFS]（＃CIFS）
    * [NFS]（＃NFS）
    * [FTP]（＃FTP）
    * [复制]（＃复制）
    * [Dropbox]（＃Dropbox）
    * [Google云端硬盘]（＃Google-Drive）
    * [WebDAV]（＃WebDAV）
* [用法]（＃用法）
* [通知]（＃条通知）
* [还原]（＃还原）
* [故障排除]（＃故障排除）
* [发生的错误/解决方案]（＃发生的错误/解决方案）

---

＃ 基本
Backitup是一种备份解决方案，可以对ioBroker安装和Homematic CCU进行周期性备份。

该适配器适用于多平台，除Linux安装外，还可以在Windows和Mac安装上使用。

### [背部](#Inhalt)
---

＃依赖关系
*必须为CIFS挂载安装Cifs-utils。
    -`sudo apt-get install cifs-utils`

*必须安装Nfs-common才能进行NFS挂载。
    -`sudo apt-get install nfs-common`

*要使用MySql备份，必须在系统上安装mysqldump
    -`sudo apt-get install mysql-client`或在Debian下sudo apt-get install default-mysql-client`

*要使用PostgreSQL备份，必须在系统上安装mysqldump
    -[PostgreSQL安装说明]（https://www.postgresql.org/download/linux/debian/）

*要使用InfluxDB备份，必须安装influxd
    -[InfluxDB安装说明]（https://docs.influxdata.com/influxdb/v1.8/introduction/install/）

### [背部](#Inhalt)
---

＃备份类型
Backitup提供了很多可能性，可以循环执行或只需按一下按钮即可执行不同的备份类型。默认情况下，每个备份都存储在/ opt / iobroker / backups /目录中。 （可选）可以设置FTP上传，或者可以使用CIFS / NFS挂载。

## IoBroker备份
此备份对应于ioBroker中包含的备份，可以通过调用`iobroker backup`在控制台中启动它。仅在此处，它是通过适配器配置或OneClick备份小部件中的指定设置执行的，而不必使用控制台。

## CCU备份（本地）
该备份可以保存Homematic安装的3种不同变体（CCU原始版/ pivCCU / Raspberrymatic）。也可以使用适配器配置或OneClick备份小部件中指定的设置来执行此备份。

## MySQL备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br>重要的是，即使mysql服务器在远程系统上运行，mysqldump也必须在ioBroker系统上运行。<br>对于Linux系统，安装命令如下：`sudo apt-get install mysql-client`或在Debian之下`sudo apt-get install default-mysql-client`

## Redis备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br>要将Redis与Backitup一起使用，应调整iobroker用户的权限：<br>

```
sudo usermod -a -G redis iobroker
sudo reboot
```

##历史数据备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也将被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。

## InfluxDB备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br> **为了能够执行InfluxDB备份，必须在iobroker系统上安装Influxd。<br> **数据库是在本地还是在其他服务器上管理都没有关系。<br><br>如果要从远程服务器备份InfluxDB，则必须在远程服务器上的influxdb.conf中调整RPC服务的远程权限。

```
bind-address = "<InfluxDB-IP>:8088"
```

或者

```
bind-address = "0.0.0.0:8088"
```

**更改配置后，必须重新启动InfluxDB服务。

有关InfluxDB数据备份的更多信息，请参见[这里](https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#online-backup-and-restore-for-influxdb-oss)。

## PostgreSQL备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br>在此重要的是，即使PostgreSQL服务器在远程系统上运行，PostgreSQL也必须在ioBroker系统上运行。<br>对于Linux系统，有[这里](https://www.postgresql.org/download/linux/debian/)安装说明

## Javascript备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br>为了能够创建Javascript备份，必须在Javascript适配器配置中预先指定菜单项“文件路径中的镜像脚本”和“进行镜像的实例”。<br>然后，Backitup可以接管配置菜单中的设置

## Jarvis备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br> ***可以从Jarvis版本2.2.0-beta.7备份Jarvis配置。

## Zigbee备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也将被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。

## Grafana备份
如果激活，则此单独可调整的备份将与每个ioBroker备份一起创建，并且在指定的保留期限到期后也会被删除。如果已设置其他ioBroker备份类型，则FTP或CIFS对此备份也有效。<br><br> **为了能够创建Grafana备份，需要Grafana用户名和密码。<br><br> **此外，必须在Grafana Web界面中生成API密钥才能访问仪表板。<br>可以在***“配置→API密钥” ***下创建API密钥。

### [背部](#Inhalt)
---

＃储存选项
## CIFS
在Linux下，CIFS挂载不是问题。<br>请注意，已安装cifs-utils

路径信息应如下所示（例如：“ /共享名称/路径信息”）<br>您可以选择启用/停用是否应从NAS删除备份

  ## NFS
在Linux下，NFS挂载不是问题。<br>应该注意的是，已经安装了nfs-common<br><br>路径规范应如下所示（示例：“ /共享名称/路径规范”）。<br>您可以选择启用/停用是否应从NAS删除备份

## FTP
FTP可以在所有操作系统上使用，并且可以替代CIFS挂载<br>FTP下的路径规范必须始终以“ /”开头（例如：“ /路径规范”）<br>您可以选择启用/停用是否应从NAS删除备份

＃＃ 复制
如果无法进行CIFS挂载，则复制功能还有另一种可能性<br>在此，必须在要进行复制的CIFS设置中输入路径。<br>对于复制功能，IP地址的规范必须保留为空。

## Dropbox
要在Dropbox中使用备份，必须在https://www.dropbox.com/developers/apps中创建访问令牌和APP。<br><br>

*步骤1：使用“创建备份”按钮
*步骤2：选择“范围访问”
*步骤3：选择“应用程序文件夹”
*步骤4：输入“命名您的应用”，然后选择“创建应用”按钮
*步骤5：在“权限”标签中，在“文件和文件夹”区域中设置所有4个勾号
*步骤6：在“设置”标签中，将“访问令牌过期”设置为“无过期”
*第7步：按“生成的访问令牌”按钮（此生成的令牌已在Backitup设置中输入）<br><br>

在您的Dropbox中，现在有一个名为“ Apps”的新文件夹

## Google云端硬碟
为了在Google云端硬盘中使用备份，必须获取访问令牌。您可以在配置页面上执行此操作。<br> ioBroker仅攻击定义的区域。 oAuth的代码可以在[这里](https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js)中看到。<br><br>没有令牌或用户数据存储在云中。

## WebDAV
借助WebDAV，Backitup提供了解决多个云系统的可能性。<br>这里最著名的是NextCloud。为了建立WebDAV连接，需要云帐户的用户名和密码。<br>到云的连接是通过加密连接建立的。<br><br>为了能够建立连接，云的主机名必须符合所有安全证书。无法使用本地IP地址进行连接，因为它不包含任何Lets Encrypt证书。<br><br> &gt;示例网址：“ https://example.com/remote.php/dav/files/username/”

### [背部](#Inhalt)
---

＃ 用
1.适配器创建一些数据点以在Vis中使用<br>
* oneClick.ccu->用作CCU备份的触发器（可以在Vis中使用按钮设置为true）
* oneClick.iobroker-&gt;用作标准备份的触发器（可以在Vis中使用按钮设置为true）<br><br>
* history.html->用作历史记录，可通过CCS在Vis中的设计中进行修改。
    * history.json->用作历史记录，可通过CCS在Vis中的设计中进行修改。
* history.ccuLastTime->保存上一次CCU备份的创建日期和时间
* history.minimalLastTime->保存上一次标准备份的创建日期和时间
    * history.ccuSuccess->如果备份成功，则显示状态“ true”
    * history.minimalSuccess->如果备份成功，则显示状态“ true”
    * history.iobrokerLastTime->显示最近的ioBroker备份
    * history.ccuLastTime->显示最近的CCU备份
    * info.ccuNextTime->显示CCU备份的下一次执行时间
    * info.iobrokerNextTime->显示ioBroker备份的下一次执行时间
    * info.latestBackup->将在开始时确定的最后一个备份显示为json

2.在Vis中显示历史记录日志
   -可以在HTML小部件中显示历史记录日志，方法是在HTML中输入以下行：

```
{backitup.0.history.html}
```

语法：{BackitupInstanz.history.html}

3.历史日志的CCS格式：

```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-iobroker
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
   -如果将OneClick数据点设置为true，则将启动相应的备份，并且在预定义的时间之后，该数据点将再次设置为false，因此可以创建一个带有状态的按钮，调整下一行并在Vis中输入按钮文字：

```
{wert: backitup.0.oneClick.iobroker; wert === "true" || wert === true ? "Minimal Backup </br> wird erstellt" : "Minimal Backup </br> starten"}

```

语法：{value：<BackitupInstanz> .oneClick。<触发触发器>;值===“ true” ||值===正确吗？ “备份创建期间的文本”：“标准文本”}

### [背部](#Inhalt)
---

＃通知
成功备份后，Backitup支持以下Messenger进行通知。
必须安装并设置相应的适配器才能使用。

   *电报
   *俯卧撑
   * 电子邮件
   * Whatsapp的

### [背部](#Inhalt)
---

＃ 恢复
使用Backitup，可以还原通过ioBroker中的配置菜单创建的所有备份类型。<br><br>可以从所有存储介质执行还原。<br><br> **但是，基本上，最安全的方法是在本地执行还原。<br><br>如果选择最安全的方式并希望在本地进行还原，则必须将备份文件存储在iobroker备份文件夹中。在Linux系统上，此文件夹位于以下路径下：`/opt/iobroker/backups`

使用备份类型“ iobroker”和“ redis”时，iobroker在还原过程中将停止，然后自动重新启动。<br>停止iobroker后，将打开一个新的浏览器选项卡，可以在其中查看还原进度。<br><br> ***如果此选项卡未打开，则必须检查块弹出窗口的浏览器设置。<br><br>

** iobroker不会与所有其他备份类型一起停止。在这里，只有受影响的适配器会短暂停止。<br><br>

如果您希望手动还原备份，则应执行以下操作：

***还原ioBroker备份：***

    -像往常一样，备份必须位于目录opt / iobroker / backups中
    -可以使用以下命令通过控制台还原该文件：iobroker restore <备份文件名>。
    -还原后，必须将“ iobroker全部上传”

可以在[这里](https://forum.iobroker.net/topic/27271/howto-iobroker-restore-unter-linux-durchf%C3%BChren)中找到有关使用备份进行还原以及进行手动还原的详细说明。

**必须仍然通过CCU的Web界面还原CCU备份。

***恢复Raspberrymatic / CCU备份：***

    -通过SCP将* .sbk文件复制到Raspberrymatic上的目录“ / usr / local / tmp目录”中
    -通过控制台以root用户身份登录到Raspberrymatic
    -在Raspberrymatic上执行命令：“ / bin / restoreBackup.sh / user / local / tmp / EuerBackupDateiname”。
    -在Raspberrymatic上执行命令：“ reboot”以重新启动PI
    -另外，当然也可以通过Web界面照常还原备份。

### [背部](#Inhalt)
---

＃ 故障排除
    为了记录错误，必须在“ ioBroker实例”选项卡中将“备份”设置为“调试”。

### [背部](#Inhalt)
---

＃遇到的错误/解决方案：
此处列出了到目前为止已发生的问题及其解决方案（如果有）。

1.Olifall（来自论坛）遇到的问题是，还原后无法再访问ioBroker的Web界面，他可以通过控制台执行以下步骤来解决此问题：
    -sudo iobroker身份
    -消息=“与状态127.0.0.0:6379[redis]无关”
    -sudo apt-get install redis-server

2.如果无法通过IP地址安装CIFS，则应使用NAS的主机名。
3.如果将带有特殊字符的密码用于cifs-mount，则用户会发现该密码必须存储在配置文件中并带有引号。
4.一些用户认为，cifs-mount无法处理非常长的密码。如果安装不起作用，请稍微缩短密码（我可以使用12个字符）。
5.如果无法安装适配器，请检查您的node和nodejs版本。适配器不支持版本<Node 8。
6.如果您的iobroker系统是使用新的安装程序脚本安装的，则可能会发生您对新用户iobroker不具有所有权限的情况。

    不幸的是，这也适用于备份，因为备份使用一些与系统相关的命令。

为了解决缺少权限的问题，现在提供了针对iobroker安装程序脚本的修复程序。
请在控制台的Iobroker环境中执行以下命令：

```
iobroker stop
iobroker fix
sudo reboot
```

8.如果在创建Redis数据库时收到错误消息，请检查您的用户iobroker是否具有权限以及他是否在Redis用户组中。

    如果不是这种情况，则可以在控制台中使用以下命令对其进行修复。

```
sudo usermod -a -G redis iobroker
sudo reboot
```

    如果您尚未使用安装程序脚本设置Iobroker安装，并且您的用户使用其他名称，请在命令中用您的用户替换“ iobroker”。

### [背部](#Inhalt)
---

## Changelog

### 2.1.2 (13.04.2021)
* (simatec) Creation of temporary folders changed
* (simatec) Filter for redis rdb files changed
* (simatec) automatic deletion of old influx databases added
* (simatec) noserverino option for CIFS mount added
* (simatec) dependencies updated

### 2.1.1 (11.04.2021)
* (simatec) Bugfix redis
* (simatec) debug Log for Restore request added
* (simatec) Bugfix influxdb
* (simatec) ignore Filenames for javascript-Backup added

### 2.1.0 (24.03.2021)
* (simatec) Admin-Tab added
* (simatec) dependencies targz removed
* (simatec) dependencies tar-fs added
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 2.0.5 (14.03.2021)
* (simatec) error handling for redis backup added
* (simatec) error handling for history backup added
* (simatec) BugFix Grafana backup

### 2.0.4 (10.03.2021)
* (simatec) Bugfix history json
* (simatec) BugFix Redis backup
* (simatec) chmod for backup directory added
* (simatec) error handling for Grafana backup added

### 2.0.3 (04.03.2021)
* (simatec) Promise for redis aof added
* (simatec) BugFix Grafana restore
* (simatec) small BugFix umount

### 2.0.2 (03.03.2021)
* (simatec) BugFix redis backup
* (simatec) aof for redis added

### 2.0.1 (23.02.2021)
* (simatec) BugFix redis backup/restore
* (simatec) dependencies node-tar added
* (simatec) BugFix Notification
* (simatec) BugFix Grafana backup

### 2.0.0 (31.01.2021)
* (simatec) BugFix detect last backup
* (simatec) WebDAV added
* (simatec) BugFix Zigbee
* (simatec) stop/start Instances on restore
* (simatec) Download Icon for Cloud Restore added
* (simatec) javscript Backup added
* (simatec) Grafana Backup added
* (simatec) Restore added for some types without restart
* (simatec) timestamp for history-json added
* (simatec) Source code rewritten
* (simatec) Restore revised
* (simatec) fixed many small bugs
* (simatec) Added warning messages
* (simatec) Fixed cloud restore

### 1.8.5 (11.01.2021)
* (simatec) Bugfix Jarvis Backup
* (simatec) Bugfix GUI

### 1.8.4 (09.01.2021)
* (simatec) Bugfix influxDB Backup
* (simatec) Bugfix influxDB Restore
* (simatec) Jarvis Backup added
* (simatec) Jarvis Restore added
* (simatec) Bugfix mysql Backup
* (simatec) Bugfix pgsql Backup
* (simatec) small Bugfixes
* (simatec) Info-Message for storage added

### 1.8.3 (22.12.2020)
* (simatec) Bugfix iobroker start after restore on Windows
* (simatec) changed webui-port for restore
* (simatec) Bugfix influxDB Restore
* (simatec) dependencies updated

### 1.8.2 (09.12.2020)
* (simatec) code cleaned
* (simatec) code for history.html object revised
* (simatec) code for history.json object revised

### 1.8.1 (07.12.2020)
* (simatec) influxDB Backup added
* (simatec) influxDB Restore added
* (simatec) Postgresql Backup added
* (simatec) Postgresql Restore added
* (simatec) translation added
* (simatec) new zigbee Restore added
* (simatec) dependencies updated
* (simatec) many small bugfixes
* (simatec) new redis Restore added
* (simatec) enable/disable option for Sentry Plugin
* (simatec) smb 3.02 support added
* (simatec) smb 3.1.1 support added

### 1.7.0 (26.10.2020)
* (simatec) small Bugfix for umount on cifs/nfs mount
* (simatec) Dev-Dependencies updated
* (simatec) Dependencies updated

### 1.6.9 (30.09.2020)
* (simatec) Timeout fix for backup process

### 1.6.8 (24.09.2020)
* (simatec) Translations update for Weblate
* (simatec) dependencies updated
* (simatec) devdependencies updated
* (weblate) translation updated

### 1.6.7 (09.09.2020)
* (simatec) Bugfix error on GoogleDrive

### 1.6.6 (08.09.2020)
* (simatec) Bugfix clean local backups
* (simatec) Bugfix mount and umount for sentry.io

### 1.6.5 (07.09.2020)
* (simatec) Bugfix GoogleDrive Rate Limit errors 
* (simatec) small fixes on zigbee backup

### 1.6.4 (04.09.2020)
* (simatec) small fixes for sentry.io
* (simatec) small fixes on zigbee backup


### 1.6.3 (01.09.2020)
* (simatec) dependencies for googleapis updated
* (simatec) dependencies for dropbox-v2-api updated
* (simatec) devdependencies updated

### 1.6.2 (31.08.2020)
* (simatec) added whatsapp-cmb support for notifications

### 1.6.1 (24.08.2020)
* (Apollon77) several fixes and optimizations

### 1.6.0 (03.08.2020)
* (Jey-Cee/simatec) adapter configuration revised

### 1.5.9 (21.07.2020)
* (simatec) small fixes on mysql backup
* (simatec) next bugfixs errorhandling sentry.io
* (simatec) updated dependencies

### 1.5.8 (20.05.2020)
* (simatec) small fixes on zigbee backup
* (simatec) added log for zigbee Instances
* (simatec) next bugfix errorhandling sentry.io

### 1.5.7 (11.05.2020)
* (simatec) bugfix errorhandling sentry.io
* (simatec) updated dependencies
* (simatec) added node14 support

### 1.5.6 (02.05.2020)
* (simatec) Bugfix reading restore list

### 1.5.5 (01.05.2020)
* (simatec) bugfix errorhandling sentry.io

### 1.5.4 (29.04.2020)
* (simatec) added osDependencies for nfs and cifs
* (simatec) Bugfixes for errorhandling telegram, pushover, e-mail, ftp list and create backup folder


### 1.5.3 (28.04.2020)
* (simatec) many smal Bugfixes for errorhandling sentry.io

### 1.5.2 (24.04.2020)
* (simatec) errorhandling sentry.io
* (AlCalzone) docu updated

### 1.5.1 (23.04.2020)
* (simatec) Bugfix list from nas
* (simatec) Bugfix sentry errors

### 1.5.0 (21.04.2020)
* (simatec) revised error handling
* (simatec) revised mount process
* (simatec) revised umount process
* (simatec) added log for last backup file
* (simatec) updated dependencies
* (simatec) added sentry.io support

### 1.4.5 (23.03.2020)
* (simatec) Bugfix CIFS Domain

### 1.4.4 (23.03.2020)
* (simatec) Fix history error

### 1.4.3 (21.03.2020)
* (simatec) Fix for autochecker

### 1.4.2 (21.03.2020)
* (simatec) Fix start after restore
* (simatec) update dependencies

### 1.4.1 (02.03.2020)
* (simatec) json historystate with more options

### 1.4.0 (27.02.2020)
* (simatec) added next Backup Time
* (simatec) added Name Suffix for mysql Backup
* (simatec) added more Options for mysql
* (simatec) added domain support for cifs
* (simatec) added json historystate

### 1.3.6 (18.12.2019)
* (simatec) Fix historyList for compact-mode
* (simatec) Added ack for history states

### 1.3.5 (17.12.2019)
* (simatec) Fix compact-mode for history

### 1.3.4 (15.12.2019)
* (simatec) Fix hide passwords

### 1.3.3 (14.12.2019)
* (simatec) Fix Webinterface for Restore
* (simatec) Fix MySql Backup
* (simatec) Added some debug logs for Restore
* (simatec) some Bug Fix
* (simatec) Messagebox for restore list
* (simatec) hide password on log
* (simatec) Added password hiding
* (simatec) Clean Code
* (simatec) detected history path
* (simatec) Fix deteced

### 1.3.2 (04.12.2019)
* (simatec) Add Webinterface for Restore
* (simatec) Bug fix

### 1.3.1 (02.12.2019)
* (bluefox) Added information about latest backup
* (simatec) some Bug fix
* (simatec) add new translation
* (simatec) Fix translation
* (simatec) Default backup renamed to ioBroker backup
* (simatec) delete old objects

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

Copyright (c) 2018 - 2021 simatec

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