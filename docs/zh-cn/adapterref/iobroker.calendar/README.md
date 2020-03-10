---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.calendar/README.md
title: ioBroker.calendar
hash: 5Oon6BS1Ri7dDHrSAvewD1qgw+8jZjHpH7mlDgI486s=
---
![商标](../../../en/adapterref/iobroker.calendar/admin/calendar.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.calendar.svg?logo=npm)
![资料下载](https://img.shields.io/npm/dm/iobroker.calendar?logo=npm)
![装置](http://iobroker.live/badges/calendar-installed.svg)
![稳定](http://iobroker.live/badges/calendar-stable.svg)
![依赖状态](https://img.shields.io/david/WLAN-Kabel/ioBroker.calendar.svg)
![已知漏洞](https://snyk.io/test/github/WLAN-Kabel/ioBroker.calendar/badge.svg)
![NPM](https://nodei.co/npm/iobroker.calendar.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/WLAN-Kabel/ioBroker.calendar/master.svg?logo=travis)
![AppVeyor](https://img.shields.io/appveyor/build/WLANKabel/ioBroker-calendar/master?logo=appveyor)

＃ioBroker.calendar
## IoBroker日历适配器
阅读您的Google，caldav或ical日历。

＃＃ 去做
*添加Outlook日历
*添加功能以将事件添加到日历
*扩展可见小部件

## Google身份验证
仅当ioBroker安装在另一台计算机/服务器上并且您无法通过本地主机访问Web界面时，才需要执行以下步骤。

### Windows：
使用管理员权限运行```nodepad.exe```，然后打开```C:\Windows\System32\drivers\etc\hosts```文件。
添加诸如```192.168.0.10    example.com```之类的条目（\ <IP-地址ioBroker \> \ <FQDN \>）保存文件并通过您在主机文件中编写的<FQDN>打开Web界面。范例：http：//example.com：8081

### Linux：
    即将推出...

＃＃＃ 苹果电脑
    即将推出...

### Google API密钥
您需要一个api键。访问https://console.cloud.google.com/apis/dashboard并使用您的Google帐户登录。

打开标题中的列表并创建一个新项目。输入项目名称，例如“ ioBroker Calendar”，然后单击“创建”。

确保从列表中选择了正确的项目。打开库选项卡。搜索“日历”，然后单击“ Google Calendar API”。

单击“激活”，然后单击“ API和服务”。打开标签“ OAuth同意屏幕”，然后输入应用程序名称，例如“ ioBroker Calendar”。您也可以上传徽标，但这不是必需的。

打开“凭据”标签，点击“创建凭据”下拉菜单，然后选择“ OAuth客户端ID”。在下一步中选择“ Web应用程序”。输入类似“ ioBroker”或“ Webclient”的名称。将```http://<FQDN>:<Port from adapter config>```添加到授权的JavaScript来源。将```http://<FQDN>:<Port from adapter config>/google```和```http://<FQDN>:<Port from adapter config>/google/```添加到授权重定向URI。

创建客户端ID，然后复制显示的客户端ID和客户端密码。

转到适配器配置，然后添加客户端ID和客户端密钥。

## Caldav日历（已通过Nextcloud，Web.de和Mail.de测试）
您可以在适配器配置中添加caldav日历。

在配置中输入访问数据和主机名。

### Baseurl列表
* Nextcloud：https：// \ <主机名\> / remote.php / dav / principals
* Web.de：https://caldav.web.de
* mail.de：https://kalender.mail.de
* Posteo：https：//posteo.de：8443

如果您了解更多信息，请告诉我，以便我将其包括在内。

## ICal文件日历
您可以在适配器配置中添加iCal日历。

在主机名字段的CalDav选项卡上输入文件路径。

## Changelog

### 1.1.2 (2020-03-03)
* (WLAN-Kabel) #15 - Fixed a serious bug that caused incorrect credentials for CalDav accounts
* (WLAN-Kabel) #15 - Fixed a bug that caused a 'TypeError' message

### 1.1.1 (2020-02-26)
* (WLAN-Kabel) Password encryption added
* (WLAN-Kabel) Error messages for caldav lib extended
* (WLAN-Kabel) Fixed an issue that caused errors when reading null events

### 1.1.0 (2020-02-05)
* (WLAN-Kabel) Caldav support expanded
* (WLAN-Kabel) iCal file support added

### 1.0.1 (2020-01-11)
* (WLAN-Kabel) Missing dependency added

### 1.0.0 (2020-01-11)
* (WLAN-Kabel) Added caldav support
* (WLAN-Kabel) Multiple calendars can be displayed in one widget
* (WLAN-Kabel) Added more widget settings
* (WLAN-Kabel) State structure changed
* (WLAN-Kabel) Appointments are now shown in the popup
* (WLAN-Kabel) Some internal functions revised
* (WLAN-Kabel) Fixed an error when saving the authentication data

### 0.2.0 (2020-01-08)
* (WLAN-Kabel) Multiple calendar support for one account
* (WLAN-Kabel) Calendar color is now supported
* (WLAN-Kabel) Calender states color, name, account added
* (WLAN-Kabel) Calendar name is set as the state name
* (WLAN-Kabel) Fixed an issue where the credentials were not properly controlled
* (WLAN-Kabel) The google calendar name and color will be adopted

### 0.1.0 (2020-01-07)
* (WLAN-Kabel) Added calendar widget
* (WLAN-Kabel) Cron job and server will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages
* (WLAN-Kabel) Removed adapter from state settings
* (WLAN-Kabel) Fixed problem where series appointments were not loaded

### 0.0.1
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.