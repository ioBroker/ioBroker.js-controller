---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: OJ0LLGitVyh0vmRVsJQPP1GdFu053rxmRODedfsNC5A=
---
![标识](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![安装数量](http://iobroker.live/badges/alarm-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.alarm.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![依赖状态](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![已知漏洞](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

＃ioBroker.alarm
** Github操作**：

![GitHub动作](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![贝宝（https://www.paypalobjects.com/zh_CN/DK/i/btn/btn_donateCC_LG.gif）](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[英文说明](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker警报
Dies ist ein Adapter（适配器适配器），mit dem sich eine kleine Alarmanlage ohnegroßeprogrammiertechnische Vorkenntnisse realisierenlässt。
圣经的三分法和三分法。 B. bei Nachtruhe oder De- und Aktivierung zuüberwachen。德斯坦·维特伦主义者·伊恩·迪内克特·德斯坦·威斯坦·因斯坦斯（州），安夫·安德烈（州）莫格利希。 DieseVerknüpfungenwerden im ReiterVeregnüpfungenangelegt。

----------------------------------------------------------------------------------------------------------------------

### Tab Haupteinstellungen
较高的等级，包括Zeiten der Nachtruhe，Sirenezeit，Stiller-Alarm和Passwort vorgenommen。

-Aktivierzeit->Zeitverzögerungbis zu Aktivierung wenn man einen delay Datenpunkt benutzt
-Sienenzeit bei Einbruch-> Bei Einbruch wird der Datenpunkt alarm.0.status.sirenfürdie Zeit auf true gesetzt
-Alarmverzögerung->Verzögerungszeitbis Einbruchausgelöstwird（währenddieser Zeit wird der Stille Alarmausgelöst）
-Warnungen / Sirene innen的Auslösezeitit-> Benachrichtigungskreises ods scharf innen的北Auslösungzekreises，wird der jeweilszugehörigeDatenpunktfürdie Zeit auf true gesetzt

----------------------------------------------------------------------------------------------------------------------

### Tab Benachrichtigungen
BenachrichtigungenüberAndere转接器wie z。 B.电报，电子邮件或其他。
[问题](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### TabÜberwachung
werden die Kreise der Anlage konfiguriert。
*戴姆·德恩州立大学拉森·希恩·恩德恩*

阿尔赫拉克（Achage）优先保护区（沙夫）和阿尔伦安德烈（Kreisen）的风土人情。阿尔贝拉格（Ellentzur eigentlichenÜberwachungder Anlage）死了。 Scharf实习生因患病而死于EinemAußenhautschutzeiner Alarmanlage。
* Es ist durchausmöglich，达斯·曼·埃因姆州，den Haken bei allen drei Kreisen macht。*

Sollte man einen Kontakt haben，der den Alarmkreis nicht sofortauslösensoll，kann man dasHäkchenbei“ stiller Alarm” aktivieren，dadurch wird nach Ablauf der eingestellten Zeit（Haupteinstellungen）和der Alarmausgelöst。

因特尔（Einzelnen）州的国家（true。），sondern auf（a）* false * zu triggern（z.B. Drahtbruchsichere Sensoren），所以kann man dasHäkchenbei“ negieren” setzen。

Die Kreise werdenfolgendermaßenüberwacht：

#### Alarmkreis：
阿兰基拉格国家广播公司（沙夫·沙尔滕）您可以在警报器中查看警报。

#### Scharf实习生Kreis：
Alle hier konfigurierten州werden beim Zustand scharf实习生überwachtundLösen实习生anerem den internen报警澳大利亚。

#### Meldekreis：
维也纳州立大学和威尔士立陶宛模具。

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Iine eewgewünschteSprachausgabe z。 B. beiÄnderungdes Zustandesgewünscht，最高法院书记官长Sätzenkonfigurieren。
*曼斯·缪斯·希奇·谢尔森（Mus sich sicher sein），达斯·达·奥斯特瓦特·达滕彭特（das derausgewählteDatenpunkt），麻省理工学院的einem Text beschrieben werden kann！ Z.B. “ sayit.0.tts” *

曼彻斯特·曼·希奇（Ausgabe von Namen mit Ansagen lassen），坎恩·曼彻斯（Kann Man diese）选择anwählen。

----------------------------------------------------------------------------------------------------------------------

### TabVerknüpfungen
等级较高的适配器州际直辖市外部州zuverknüpfen。 Somit ist ein Umwegüberein Skript oderähnlichennicht erforderlich。
Eslässtsich somit z。 B. bei beijing der Nachtruhe，房地产公司。
![标识](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

####Eingabeverknüpfungen
触发器->任意= es wird bei jederÄnderunggetriggert ne = es wird nur getriggert，温德·韦特sichgeändert

Auslösewert-> Ist der Wert，Auf Welchen Getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

### Taber Andere Alarme
Es stehen einen zwei frei konfigurierbare德国，德国Als Voreinstellung sinse als Feuer- und Wasseralarm被追捧。在《危险的世界》中，克雷伊斯1和2以及其他书画。

因特尔（Einzelnen）州的国家（true。），sondern auf（a）* false * zu triggern（z.B. Drahtbruchsichere Sensoren），所以kann man dasHäkchenbei“ negieren” setzen。

#### Es ist darauf zu achten，dass keine国家aus dem eigentlichenHauptüberwachungskreisenbenutzt werden！
----------------------------------------------------------------------------------------------------------------------

Der Adapter liefert eine ganze Anzahl国家/地区：

####“ alarm.x.use .....”。
紧急状态下的警报和警报状态。

-use.activate_nightrest-> Aktivierung der Nachtruhe
-use.activate_sharp_inside_circuit->战役实习生（实习生）
-use.disable-> Deaktivierung der Anlage（Alarmkreis）
-use.enable-> Aktivierung der Anlage（Alarmkreis）
-use.enable_with_delay->安拉日（Alarmkreis）mitVerzögerungszeit
-use.list-> Deaktivierung / Aktivierung / Warnkreis / Aktivierung mitVerzögerungszeit
-use.quit_changes->状态设置* info.notification_circuit_changes，info.sharp_inside_siren，status.activation_failed，other_alarms.one_changes，other_alarms.two_changes *
-use.toggle_password-> Deaktivierung / Aktivierung der Anlage（Alarmkreis）mit Passwort
-use.toggle_with_delay-> Deaktivierung / Aktivierung der Anlage（Alarmkreis）mitVerzögerungszeit
-use.toggle_with_delay_and_password-> Dealtivierung / Aktivierung der Anlage（Alarmkreis）mit Passwort undVerzögerungszeit
-use.panic->HändischeAuslösungder Alarmanlage（Einbruch）

####“ alarm.x.status ....”
尊贵的祖斯塔德·安拉格能力较高的人。

-status.sleep->自动发送信号Nachtruhe

####“ alarm.x.info ....”
LiefertzusätzlicheInformationen wie z.B. welche“Türenoffen sind” oder einen日志状态。
由Mitternacht Geleert提供的log_today状态。

####“ alarm.x.other_alarms ....”
Beinhaltet收到了“ anderen” Alarmkreise的信息1 + 2。

----------------------------------------------------------------------------------------------------------------------

##问题
-温恩·曼恩（Wen man eine）的电报oderähnlichesüberdas +hinzufügt，坎恩·曼努尔·爱因州立大学（Instanzauswählen）和曼斯·穆斯·比斯·奥夫* telegram.0 * Alleslöschen。

#### Wichtig，死于Benutzung，死于适配器。

## Changelog

#### 2.0.0 (22.03.2021)
* (misanorot) added other alarms

#### 1.9.0 (08.01.2021)
* (misanorot) added html states and fixed little issues

#### 1.8.0 (26.11.2020)
* (misanorot) added status.state_list to shortcuts

#### 1.7.0 (20.11.2020)
* (misanorot) changed notifications and fixed little issues

#### 1.6.0 (08.11.2020)
* (misanorot) changed time inputs to numbers

#### 1.5.0 (08.11.2020)
* (misanorot) added stop inside alarm with disable

#### 1.4.0 (05.11.2020)
* (misanorot) added silent alarm selection for every state

#### 1.3.0 (01.11.2020)
* (misanorot) added diffrent time options

#### 1.2.0 (09.07.2020)
* (misanorot) added countdown speech output

#### 1.1.0 (05.07.2020)
* (misanorot) Added input shortcuts

#### 1.0.0 (01.07.2020)
* (misanorot) added alarm and silent flash light

#### 0.9.0 (28.06.2020)
* (misanorot) Homekit integrated, set shortcuts only when changed

#### 0.8.0 (18.06.2020)
#### (misanorot) !!! Changed circuits dramatacly !!! Please do a new installation when you come from less versions

#### 0.7.5 (14.06.2020)
* (misanorot) fixed a few little issues

#### 0.7.0 (07.06.2020)
* (misanorot) edit notification sentences in admin

#### 0.6.0 (31.05.2020)
* (misanorot) changed speech output

#### 0.5.0 (14.05.2020)
* (misanorot) added use.list state

#### 0.4.0 (14.05.2020)
* (misanorot) added warn circuit monitoring

#### 0.3.0 (04.05.2020)
* (misanorot) expaned speech output

#### 0.2.2 (30.04.2020)
* (misanorot) added alexa2 speak output

#### 0.2.0 (22.04.2020)
* (misanorot) added more states

#### 0.1.2 (19.04.2020)
* (misanorot) status.state  activated

#### 0.1.1 (28.03.2020)
* (misanorot) added states and lists - fixed issues - translation

#### 0.1.0 ()
* (misanorot) add password for de/activation -- better logging

#### 0.0.9 (19.02.2020)
* (misanorot) add sayit

#### 0.0.8 (03.02.2020)
* (misanorot) initial release

## License
MIT License

Copyright (c) 2019-2021 misanorot <audi16v@gmx.de>

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