---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/frankjoke/ioBroker.bmw/edit/master//README.md
title: BMW ConnectedDrive data Adapter
hash: WSiMLJfkAv94JqYmfI+BWGrzXHhuFeMY0oKE5E4+CjU=
adapter: true
license: MIT
authors: frankjoke <frankjoke@hotmail.com>
description: Queries BMW ConnectedDrive data for registered cars in your BMW account
keywords: BMW, ConnectedDrive
readme: https://github.com/frankjoke/ioBroker.bmw/blob/master/README.md
mode: daemon
materialize: false
compact: false
published: 2017-09-02T11:56:25.197Z
version: 1.3.3
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.bmw.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.bmw.svg
BADGE-特拉维斯-CI: http://img.shields.io/travis/frankjoke/ioBroker.bmw/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.bmw?branch=master&svg=true
BADGE-NPM: https://nodei.co/npm/iobroker.bmw.png?downloads=true
---
＃![商标](zh-cn/adapterref/iobroker.bmw/../../../en/adapterref/iobroker.bmw/admin/bmw.png)适用于BMW ConnectedDrive-Daten的适配器
==============

###适配器zum Auslesen von BMW ConnectedDrive-Daten Der Adapter versucht die ConnectedDrive-Datenfürdieauf die angegebenen Benutzer registrierten Fahrzeuge。
Man kann filtern welche Daten angezeigt werden indem man im Admin dieEinstellungenfür
* zu verwendete服务（ich verwende nur：效率，动态，导航和远程执行）。文恩'调试！' am anfang schreibt wird der Adapter im Log die debug-Ausgaben einschalten und damit sieht man welche Daten er abfragt und geliefert bekommt。适配器muss im admin auf'info'stihen！
*zulöschendeEinträge（Bei mir Daten wie：* modelType，series，basicType，brand，licensePlate，hasNavi，bodyType，dcOnly，hasSunRoof，hasRex，steering，driveTrain，doorCount，vehicleTracking，isoCountryCode，auxPowerRegular，auxPowerEcoPro，auxPowerEcoProPlus，ccmMessages *）
*Einträgedievon Arrays umgewandelt werden sollen（bei mir：* lastTripList | name | lastTrip，specs | key | value，service | name | services，cdpFeatures | name | status，cbsMessages | text | date，lifeTimeList | name | value，characteristicList |特征|数量，remote_history | eventId，storePortfolio | offerCode *）。 bestehen nurzweieinträgemit'|' getrennt dann ist der erste der name des arrays das umgewandelt wird und der zweite der Name des eintrags und es werden alle Sub-Elementeübernommen，wenn ein dritter wert vorhanden ist wird nur dieser alsWertübernommen。
*Einträge死于ihrer Hirarchie nach oben wandern sollen（bei mir *attributesMap，vehicleMessages，cbsMessages，twoTimeTimer，characteristicList，lifeTimeList，lastTripList，update，storePortfolio*
* der zu verwendete Datenserver kann auch angegeben werden，der DefaultistfürdenRest der Welt，wer in anderen Regionen wohnt kann auch <https://b2vapi.bmwgroup.cn:8592>fürChina，<https：//b2vapi.bmwgroup .us>fürUSAund <https://b2vapi.bmwgroup.com>fürEurope/其他的世界大家庭。 www.bmw-connecteddrive.com wird hoffentlich immer auf den richtigen weitergeleitet。
* Man kann States umbenennen wenn man im rename ** originalName | neuerName ** verwendet。 weder Original noch der neue名字dürfenmehrmalsvorkommen。 '' werden durch'_'ersetzt。 MehrereEinträgevon** x | y ** werden durch'**，**'getrennt。 Damit kann man den Vin des Autos auf z.B. '325i'umbenennen。
* Der Adapter versteht jetzt auch'sendTo'Kommandos。 `sendTo（'bmw.0'，'send'，'225xe.Versperren'）`würdedenWagen den sie auf 225xe umbenannt haben versperren，`sendTo（'bmw.0'，'send'，'_ DatenNeuLaden'）`würde einen刷新ausführen和`sendTo（'bmw.0'，'debug'，'on'）`（es geht auch 0,1，on，off，ein，aus，true，false）würdedebugein-oder ausschalten。 Mit`sendTo（'bmw.0'，'get'，'225xe.Versperren'）`kann der state von Werten abgefragt werden，man bekommt z.B. `{val：'Nicht gestartet'，ack：true，ts：1505839335870，q：0，from：'system.adapter.bmw.0'，lc：1505839335870}`zurück。
* Im config kann man jetzt 2 flags setzten：Alle Daten bei Adapter-Neustartlöschen（默认值：ein）und alle Daten die bei einem wiederholten download nicht mehr runtergeladenwerdenlöschen（默认值：aus）。 Damit kann man bei Adapter-restart mit anderen设置die alten states vergessen aber wenn einKommunikationsfehlerwärendineseinstets entsteht die Daten vom letzten refresh sehen wenn der 2. Haken nicht gesetzt wird。

Wenn der Adapter die Position vom Navigationssystem auslesenkannübersetzerdiese mit Hilfe von Google auf eine Adresse und gibt diese unter navigation.formatted_address an。

Ein spezieller'_RefresData'-State wird angelegt auf welchen man im admin.object klicken kann oder welchenmanüberVis/ oder andere program ansteuern kann。

Wenn das Fahrzeug aktive remote-services hat（** service ** muss bei den Services eingeschaltet sein！）sollten Button-States angelegt werden。 DiesekönnendieAktiondurchführenwennim Objectviewer drauf geclickt wird oder wenn sie mit einem wert und *ack = false* beschrieben werden。 Der Wert死亡国家wird mit dem服务状态überschrieben，z.B ** PENDING ** oder ** EXECUTED **（oderdeutscheübersetzungen）。

Ab 1.2.0 werden im **debug！** - 模式** _ originalData** - 状态generiert。 Wenn ihr Probleme mit einigen Datenpunktenhabkööntihrdas verwenden um mir die Daten zu senden（ich habe nicht alle BMW's zum Testen！）。

<sub>ps：Ichmöchte</sub> <https://github.com/Lyve1981/BMW-ConnectedDrive-JSON-Wrapper> <sub>UND</sub> <https://github.com/edent/BMW-i-Remote> <sub>fürdieBeispiele danken mittels derer来源ich den Zugriff geschafft habe！</sub> </aub>

##重要/ Wichtig
*适配器需要节点> = v4.3。*！

##安装
InstallierenüberoBroker.admin

##配置
Der Benutzername，das Passwort und dieDatenfiltermüssenimAdapter config eingegeben werden。

### Todo以后的版本
##安装
Mit admin，ioBroker oder von <https://github.com/frankjoke/ioBroker.bmw> oder mit npm install ioBroker.bmw

## Changelog
### 1.3.3
* Just removed 'preserveSettings' and 'supportCustoms' not to show up in admin custom config

### 1.3.1
* Added flags in config to clear all data on adapter restart and to clear data not downloaded on every download

### 1.3.0
* Added renaming of states to the adapter control
* Added '***sendTo***' message capabilities
* Remote services cannot be executed as long as other services are still to be finished

### 1.2.4
* added states for last successful donload and error to see how old data is
* Improved error handling when services are not available
* added _originalData object (wen in debug!) for root request for available cars on this account

### 1.2.3
* Removed bug for remote-control
* Removed bug after token times out (~2h of operation) to renew token
* added check if service is not available (happens too often!)

### 1.2.1
* Removed RCT from possible services for remote control
* Crerate a **.google_maps_link** state for the navigation which can be used to open a web-page with google maps to show the location.
* set same level of debug if adapter is in debug mode and **debug!** is set

### 1.2.0 Test
* Remoteservice implemented, basic functions like lock/unlock door or flash lights can be executed  
* New services **store** and **map_download** added, this adds also **update** and **storePortfolio** in flatten and **storePortfolio|offerCode** in arrays.
* If ConnectedDrive returns numbers as strings then they are converted to javascript numbers
* Added creation of states for the original values received from ConnectedDrive in 'debug'-mode. They will be shown as **._originalData** entries and have the original string from ConnectedDrive as a value.

### 1.1.0
* Added _RefreshData - State which can be used to start a refresh cycle manually (for example from admin.objects)
* Added 'debug'-mode when you start services config string with 'debug!'

### 1.0.1
* Changed name of email to username in config not to conflict with other data and services
* Removed the dependency on 'xml2js' module

### 1.0.0
* Changed remoteservises/chargingprofile to remote_chargingprofile
* Added services remote_history and remote_execution
* Changed to automatic deletion of states which are not anymore delivered
* Removed Flag to delete all car data at start

### 0.2.2
* Multiple cars did not work - resolved
* Flag to delete all car data on adapter start included

### 0.2.1
* Small changes to the text and description as well as for npm

### 0.2.0
* First public release, working fine for my car!

## License

The MIT License (MIT)

Copyright (c) 2014-2016, bluefox <dogafox@gmail.com>

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