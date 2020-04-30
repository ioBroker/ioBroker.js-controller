---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.homeconnect/README.md
title: ioBroker.homeconnect
hash: 9dYiNc4TRPp1J5/Hynp2s6JxQPlDuIfKKeP3SiWlr24=
---
![商标](../../../en/adapterref/iobroker.homeconnect/admin/homeconnect.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.homeconnect.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)
![建立状态](https://travis-ci.org/dna909/ioBroker.homeconnect.svg?branch=master)

＃ioBroker.homeconnect
=================

## Voraussetzungen vor der安装
ES介意Node.js版本8安装程序！！

使用ClientIDbenötigt的适配器。坚果和坚果的注册。

##安装前的要求
至少必须安装Node.js版本8！

适配器需要ClientID。使用每个步骤的设置进行注册。

<https://developer.home-connect.com>

![屏幕截图](../../../en/adapterref/iobroker.homeconnect/img/registrierung1.JPG)

Bei **“用于测试的默认Home Connect用户帐户” **电子邮件地址和地址，仅限于Home-Connect-App的注册人，也可以通过Authorization-Prozessbenötigt。

对于“用于测试的默认Home Connect用户帐户”，指定用于发送Home Connect应用程序的电子邮件地址。
已注册，这在以后的授权过程中也需要。

![屏幕截图](../../../en/adapterref/iobroker.homeconnect/img/registrierung2.JPG)

Bei **帐户类型**个人auswählen。 Die restlichen Daten sofern vorhandenergänzen（凯恩·阿洪（Keine Ahnung），《世界之窗》）。

对于“帐户类型”，选择个人。添加剩余的数据（如果可用）（不知道是否将被选中）。

![屏幕截图](../../../en/adapterref/iobroker.homeconnect/img/application1.JPG)

Dann auf **应用程序**和anschließendauf **注册应用程序** gehen。

然后转到“应用程序”，然后转到“注册应用程序”。

![屏幕截图](../../../en/adapterref/iobroker.homeconnect/img/application2.JPG)

Bei **应用程序ID ** einen Namenfürdie Application eintragen，z.B. ioBroker。 Bei ** OAuth流**设备流selektieren das letzte Feld kann leer bleiben。 Dann Speichern和dann hat客户ID。

对于** Application ID **，输入应用程序的名称，例如ioBroker。使用** OAuth Flow **设备流选择最后一个字段可以保留为空。然后保存，您将拥有所需的ClientID。

## Konfiguration
在Adapter-Config中，您可以使用ClientID进行身份验证。 Wenn der Adapterläuft，无线授权URL生成器，在ClientID的Einstellungen nach dem Speichern中失效。 Einfach nach dem Speichern die Einstellungenneuöffnen

##配置
必须在适配器配置中仅输入ClientID。如果适配器正在运行，那么将生成授权URL。保存后，您可以在设置中看到此网址，请等待并重新打开设置。

##贝努宗
密特山州在命令kannst du das Programm Stoppen中陈述，在州立监狱中。
密特根州（Kitst du dasGerätein oder ausschalten）
进入国家程序。

##用法
使用命令中的状态，您可以停止，暂停和继续执行程序。
设置状态后，您可以关闭或打开设备。更改程序的值。active.BSH_Common_Root_ActiveProgram导致启动程序。更改程序的值。selected.BSH_Common_Root_SelectedProgram导致选择程序或选项。

## Changelog

### 0.0.27 (13.11.2019)

-   (ta2k) improve option selecting

### 0.0.26 (04.11.2019)

-   (ta2k) fix boolean settings

### 0.0.25 (08.09.2019)

-   (ta2k) fix compact mode
-   (ta2k) reduce query per minute to prevent too much request error

### 0.0.24 (08.09.2019)

-   (ta2k) improve error messaging

### 0.0.22 (08.09.2019)

-   (ta2k) improve error messaging

### 0.0.22 (26.07.2019)

-   (ta2k) bugfixing

### 0.0.21 (12.07.2019)

-   (ta2k) bugfixing

### 0.0.19 (30.06.2019)

-   (ta2k) improve displaying long states, options and events

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

Copyright (c) 2020 dna909 <dna909@googlemail.com>, TA2k

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