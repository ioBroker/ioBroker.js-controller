---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bmw/README.md
title: ! [Логотип] (admin / bmw.png) Адаптер для BMW ConnectedDrive-Daten
hash: XKyVIm465//CVoxHf/uz8FuatJE7/BCNjnfZ+5WQ+4M=
---
# ![логотип](../../../en/adapterref/iobroker.bmw/admin/bmw.png) Адаптер для BMW ConnectedDrive-Daten

![Версия NPM](http://img.shields.io/npm/v/iobroker.bmw.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![установлены](http://iobroker.live/badges/bmw-installed.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.bmw/master.svg)
![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

==============

### Адаптер Zum Auslesen von BMW ConnectedDrive-Daten
Универсальный адаптер для подключения к Интернету.
Man kann filtern welche Daten angezeigt werden indem man im Admin die Einstellungen für

* zu verwendete services (ich verwende nur: эффективность, динамичность, навигация и удаленное выполнение). Wenn человек "отладка!" Я вхожу в контакт с адаптером в журнале «Отладка» и «Освободитесь от смерти», а также от его имени. Адаптер muss im admin auf 'info' stehen!
* zu löschende Einträge (Bei mir Daten wie: * modelType, series, basicType, торговая марка, licensePlate, hasNavi, bodyType, dcOnly, hasSunRoof, hasRex, рулевое управление, трансмиссия, doorCount, vehicleTracking, isoCountryCode, auxPowerExPowerPowerPowerExPeurePowerPowerExPeurePowerPeugePlus)
* Einträge die von Arrays umgewandelt werden sollen (bei mir: *lastTripList | name | lastTrip, specs | key | value, service | name | services, cdpFeatures | name | status, cbsMessages | text | date, lifeTimeList | name | value, attributeList | характеристика | количество, удаленная_история | eventId, storePortfolio | offerCode* . bestehen nur zwei einträge mit '|' получить имя имени массива имени человека и его имени имя и фамилию субэлементных элементов, в том числе и таких, которые были бы более низкими.
* Einträge die in ihrer Hirarchie nach oben wandern sollen (bei mir *атрибуты Карта, транспортное сообщение, сообщения cbs, twoTimeTimer, характеристический список, lifeTimeList, lastTripList, обновление, storePortfolio*
* der zu verwendete Datenserver kann auch angegeben werden, der По умолчанию ist für den Rest der Welt, wer in anderen Regionen wohnt kann auch <https://b2vapi.bmwgroup.cn:8592> в Китае, <https://bwvgm. .us> для США и <https://b2vapi.bmwgroup.com> для Европы и других стран. www.bmw-connecteddrive.com wird hoffentlich immer auf den richtigen weitergeleitet.
* Man kann States umbenennen wenn man im переименовывают ** originalName | neuerName ** verwendet. weder Original noch der neue Название dürfen mehrmals vorkommen. '' Werden Durch '_' Ersetzt. Mehrere Einträge von ** x | y ** werden durch '**, **' getrennt. Damit kann man den Vin des Autos auf z.B. 325i Умбеннен.
* Der Adapter versteht jetzt auch 'SendTo' Kommandos. `sendTo ('bmw.0', 'send', '225xe.Versperren')` würde den Wagen den sie auf 225xe umbenannt haben versperren, `sendTo ('bmw.0', 'send', '_ DatenNeuLaden')` würde einen Refresh ausführen und `sendTo ('bmw.0', 'debug', 'on')` (es geht auch 0,1, on, off, ein, aus, true, false) würde debug einder ausschalten. Mit `sendTo ('bmw.0', 'get', '225xe.Versperren')` kann der state von Werten abgefragt werden, man bekommt z.B. `{val: 'Nicht gestartet', ack: true, ts: 1505839335870, q: 0, из: 'system.adapter.bmw.0', lc: 1505839335870}` zurück.
* Я настраиваюсь, чтобы установить 2 флага: Установить дату и время адаптера (по умолчанию: ein) и указать дату загрузки (nicht mehr runtergeladen werden löschen) (по умолчанию: aus). Damit kann man bei Адаптер-перезапуск с настройками и другими состояниями vergesen aber wenn ein Kommunikationsfehler wärend eines refresh entsteht die Daten vom letzten refresh sehen wenn der 2. Haken nicht gesetzt wird.

Wenn der Adapter die Position vom Navigationssystem auslesen kann übersetz er diese mit Hilfe on Google auf eine Adresse and gibt diese unter navigation.formatted_address an.

Ein spezieller '_RefresData' - Государство странно и хорошо, что я администратор. Объект klicken kann oder welchen man über Vis / oder andere Программа ansteuern kann.

Wenn das Fahrzeug aktive remote-services hat (** service ** muss bei den Services eingeschaltet sein!) Sollten Button-States angelegt werden. Diese können die Aktion durchführen wenn im Objectviewer drauf geclickt wird oder wenn sie mit einem wert und *ack = false* beschrieben werden. Der Wert dieses States wird mit dem Service-Status überschrieben, z.B ** В ОЖИДАНИИ ** oder ** EXECUTED ** (oder deutsche übersetzungen).

Ab 1.2.0 werden im **debug!** - Режим **_ originalData** - Состояния обобщенные. Эта проблема решается с помощью Datenpunkten hab köönt ihr das verwenden um mir die Daten zu senden (ich habe nicht alle Zum Testen BMW!).

<sub>ps: Ich möchte</sub> <https://github.com/Lyve1981/BMW-ConnectedDrive-JSON-Wrapper> <sub>унд</sub> <https://github.com/edent/BMW-i-Remote> <sub>для смерти Beispiele danken mittels более дорогие источники ich den Zugriff</sub>

## Важно / Wichtig
* Для адаптера требуется узел> = v4.3. *!

## Установить
Installieren über ioBroker.admin

## Конфигурация
Der Benutzername, das Passwort and die Datenfilter müssen im Adapter config eingegeben werden.

### Todo для последующих ревизий
## Монтаж
Mit admin, ioBroker oder von <https://github.com/frankjoke/ioBroker.bmw> или npm install ioBroker.bmw

## Changelog

### 1.4.0
* Update for Admin 3,0 and compact mode as well as config page

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

Copyright (c) 2014-2019, Frank Joke <frankjoke@hotmail.com>

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