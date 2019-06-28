---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: 6CvYBjhtz9gp9QYsounGpuWdRZEfsOfBUY8C8Lp1t70=
---
![商标](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![下载](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![建立状态](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

＃ioBroker.homeconnect
=================

## Voraussetzungen vor der Installation
EsmußmindestensNode.js Version 8 installiert sein !!

FürdenAdapter Wird eineClientIDbenötigt。 Nutze die Einstellungen um jeden Schritt der Registrierung zu erreichen。

##安装前的要求
至少必须安装Node.js版本8！

适配器需要ClientID。使用每个步骤的设置进行注册。

https://developer.home-connect.com

![截图](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **默认主页连接测试用户帐户** die E-Mail-Adresse angeben，mit der die Home-Connect-App registriert wurde，diesewirdspäterauchbeim授权 - Prozessbenötigt。

对于**默认主页连接用户帐户测试**，请指定用于发送Home Connect应用程序的电子邮件地址。
注册后，授权过程中也需要这样做。

![截图](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **账户类型**个人auswählen。 Die restlichen Daten sofernvorhandenergänzen（keine Ahnung，obdasgeprüftwird）。

对于**帐户类型**选择个人。添加剩余数据（如果可用）（不知道是否会检查）。

![截图](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **Applications** ndanschließendauf**注册申请** gehen。

然后转到** Applications **然后转到** Register Application **。

![截图](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **请ID** einenNamenfürdie应用eintragen，z.B。 ioBroker。 Bei **OAuth Flow** 备流程selektieren das letzte Feld kann leer bleiben。 Dann Speichern和dann hat mandiebenötigteClientID。

对于**申请ID **，输入申请的名称，例如ioBroker。使用** OAuth Flow **设备流程选择最后一个字段可以保持为空。然后保存并且您拥有所需的ClientID。

## Konfiguration
In der Adapter-Config muss nur die ClientID eingetragen werden。 Wenn derAdapterläuft，wird eine授权-URL generiert，diese wird in den Einstellungen nach dem Speichern der ClientID angezeigt。 Einfach nach dem Speichern死于Einstellungenneuöffnen

##配置
必须在适配器配置中仅输入ClientID。如果适配器正在运行，则会生成授权URL。保存后您可以在设置中看到此URL，等待并重新打开设置。

## Benutzung
Mit den in commands kannst du das Programm stoppen，pausirenoderfortführen。
Mit den在设置kannst dudasGerätteinoder ausschalten中说明。
ÄnderndesStatesprograms.active.BSH_Common_Root_ActiveProgramführtzumstarten einesProgrammsÄnderndesStatesprograms.selected.BSH_Common_Root_SelectedProgramführtzumususwählendesProgramms order Optionen

##用法
使用命令中的状态，您可以停止，暂停和恢复程序。
设置中的状态可以关闭或打开设备更改程序的值。活动.BSH_Common_Root_ActiveProgram导致启动程序更改程序的值。选择.BSH_Common_Root_SelectedProgram导致选择程序或选项

## Changelog

### 0.0.18 (26.06.2019)

-   (ta2k) add error handling for stoping

### 0.0.17 (26.06.2019)

-   (ta2k) make commands writeable

### 0.0.16 (26.06.2019)

-   (ta2k) cleanup states after update

### 0.0.15 (24.06.2019)

-   (ta2k) reconnect after token refresh

### 0.0.14 (18.06.2019)

-   (ta2k) check for keep alive events

### 0.0.13 (18.06.2019)

-   (ta2k) close event stream before reconnect

### 0.0.12 (18.06.2019)

-   (ta2k) fix events lost after 12hr

### 0.0.11 (09.06.2019)

-   (ta2k) fix set values and refresh available options after program select

### 0.0.10 (04.06.2019)

-   (ta2k) add settings and commands, add options to available and fix bugs

### 0.0.9 (29.05.2019)

-   (ta2k) clean up code and receive event notifications

### 0.0.8 (10.04.2019)

-   (dna909) increase refreshTokenInterval

### 0.0.7 (03.04.2019)

-   (TA2k) Improve refreshToken and add Register process in instance option

### 0.0.6 (09.01.2019)

-   (dna909) Oven: add Option.FastPreHeat, Logging, query stream.type DISCONNECTED
-   (tFaster) code format and cleanups,fixed devices data structure,renamed deviceArray to devices,
    added startInRelative for Oven

### 0.0.5 (28.11.2018)

-   (dna909) add eventstream handling

### 0.0.4 (23.11.2018)

-   (dna909) add event-listener

### 0.0.3 (14.11.2018)

-   (dna909) query States and available programs

### 0.0.2 (08.11.2018)

-   (dna909) OAuth2 Deviceflow-Authorization, enumerate connected appliances

### 0.0.1 (09.10.2018)

-   (dna909) initial release

## License

The MIT License (MIT)

Copyright (c) 2019 dna909 <dna909@googlemail.com>

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