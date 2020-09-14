---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: a5XMy2RH028ypMZGZZKBxBTRMvIjemVroqfyQHtWmQM=
---
![Логотип](../../../en/adapterref/iobroker.knx/admin/knx.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.knx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
## Описание
ru: Этот адаптер позволяет импортировать файлы knxproj из ETS. Он генерирует перевод между групповыми адресами KNX и ioBroker и помещает устройства в комнаты (особенно для MobileUI).

Он подключается к стандартным шлюзам KNX / LAN.

Перед началом: Каждый DPT com.Objects должен быть установлен в вашем проекте ETS. Каждое устройство должно быть рассортировано по структуре вашего объекта.

## Характеристики:
* импорт файла `knxproj`
* создание ETS-подобной объектной структуры
* поиск и объединение act-channel и state-channel (эвристика)
* обновление всех состояний при запуске
* отправка READ в KNX-Bus при записи на объект-состояние
* сортировка каналов по комнатам

## Конфигурация адаптера
После установки этого адаптера откройте конфигурацию адаптера. Заполнить:

### IP-адрес шлюза KNX
<IP вашего KNX / Lan GW> в формате IPv4

### Порт
Обычно это порт 3671.

### Phys. Адрес ЕИБ
Заполните бесплатно физ. адрес, соответствующий вашей архитектуре KNX, **НО НЕ такой, как у вашего шлюза KNX!**

### Уровень отладки
Расширяет выходной уровень адаптера для целей отладки

### Загрузить knxproj
здесь вы можете загрузить свой экспорт ETS в формате `knxproj`.

После успешного импорта в диалоговом окне отображается номер импортированного объекта. Теперь нажмите «сохранить и закрыть», и адаптер должен запуститься.
При запуске адаптер читает все groupAddresses с флагом чтения. Это может занять некоторое время и привести к высокой нагрузке на вашу шину KNX. Но значения в вашем vis обновляются после запуска.

### Объекты
Вот под knx.0 дерево групповых адресов, как в вашем проекте ETS.

### Перечисления
Если в вашем ETS есть строительная конструкция с соответствующими устройствами, она будет показана здесь. Под «членами» находятся имена групповых адресов, перечисленных для устройств с флагом отправки в этой группе.

### Использование
Если адаптер запускается успешно, ваши точки данных будут доступны для всего, что вы хотите делать.

### Типы точек данных
Доступны все DPT в соответствии с "Системными спецификациями, взаимодействием, типами данных" от KNX Association. Это означает, что есть 2 типа информации, которую вы можете получить: 1) значение или строку 2) значения, разделенные запятыми, или массив значений (на данный момент я не знаю, как лучше обрабатывать)

Например, DPT5.001 кодируется как 8-битное целое число без знака. Это дает единственное значение. DPT3.007 (Control Dimming) кодируется как 1 бит (логическое значение) + 3 бит (беззнаковое целое число).
Это приводит к f.e. в значении типа «0,5», где «0» означает «уменьшение», а «5» означает количество интервалов.

## Wie werden die Datenpunkte generiert
### 1) Auslesenaller Kommunikationsobjektreferenzen (im folgenden KOR)
Dabei werden den Gruppenaddressreferenz (im folgenden GAR) ID's der jeweilige DPT der KOR zugeordnet, wenn er vorhanden ist. Ausserdem bekommt der erste Eintrag die Attribute write = yes und read = no. Alle darauf folgenden GAR ID's bekommen nur den DPT zugeordnet

### 2) Erzeugen der Gruppenadressstruktur (im folgenden GAS)
После того, как ГАЗ и ГАР ID's erzeugt и ebenfalls умирают, DPT умирает, падает до 1) noch nicht geschehen ist.

### 3) Herausfinden der Schalt- und Statusaddressen
In dem ETS Export sind die Schalt- und Statusadressen nicht hinterlegt. Somit führe ich eine Ähnlichkeitsprüfungaller Gruppenadressnamen durch mit der Auswertung auf status und state.
Wird ein Pärchen gefunden, dessen Ähnlichkeit mehr als 90% beträgt, dann wird angenommen, das die GA1 die Schaltadresse und GA2 die Statusadresse ist. Dabei erhält GA1 das write = true und read = false и GA2 das write = false und read = true.
Ausserdem werden die DPT abgeglichen aus der jeweilig korrespondierenden GA. Aus diesem Grund ist es schwierig, Pärchen zu finden, wenn die Gruppenadressbeschriftungen nicht konsistent sind.

Weiterhin werden die Флаги in den Gerätekonfigurationen betrachtet. Dabei werden die Flags wie folgt umgesetzt:

| KNX | | | iobroker | | |
|-------|-----------|------------|----------|----------|-------------------------------------------------|
| Lesen | Шрайбен | Übertragen | Lesen | Шрайбен | Erklärung |
| - | - | - | - | - | der wert wird über GroupValueResponse aktualiesiert |
| х | - | - | х | х | ein Trigger darauf löst GroupValueRead aus |
| - | х | - | - | х | Schreibt den angegeben Wert mit GroupValueWrite auf den KNX-Bus |
| - | - | х | х | - | der Wert wird über GroupValueResponse aktualisiert |
| х | - | х | х | х | ein Trigger darauf löst GroupValueRead aus |

### 4) Erzeugen der Datenpunktpaaren (im folgenden DPP)
Ein DPP wird erzeugt, wenn die GA, GAR и DPT действительный синд. Mit diesen DPP arbeitet der Adapter. Фелен также умирает от DPT в einer GA, weil sie auf keiner der o. A. Wege gefunden werden konnte, so wird für diese GA kein DPP erzeugt und ist im Weiteren nicht nutzbar.

Im Idealfall werden somit für einen Schaltkanal 2 DPP erzeugt. Das erste ist das Schalten. В этом случае GAR ID указывает на исходный статус DPP. Das zweite ist dann das Status DPP ohne weitere Refenrenz.

## Beim Start des Adapters
Alle mit dem Lesen-Flag markieren DPP werden beim Start abgefragt. Dies verursacht u.U. eine höhere Buslast und dauert einen Moment. Im Anschluss sind aber alle aktuellen Werte verfügbar.

## (скрытый) Характеристики:
Durch senden eines Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt.

### Vermeidung von Problemen
1) соблюдать Программирование ETS и соблюдать Программирование ETS и соблюдать Программирование ETS

* zuweisen der DPT's !!
* einheitliche Beschriftung der GA-Namen (z.B "EG Wohnen Decke Licht schalten" и "EG Wohnen Decke Licht schalten status")
* Vermeidung von Sonderzeichen ",. /; \ &% $ § []" (kann zu Problemen bei der Erzeugung der GAS führen)

2) Prüfen ob das KNX / LAN GW erreichbar ist. Wenn es das nicht ist, versucht der Adapter sich kontinuierlich zu verbinden.

3) Physikalische Adresse richtig wählen (wichtig beim Einsatz von Linienkopplern). !!! АЧТУНГ: его собственный физический адрес - это НИХТ, который адрес шлюзов локальной сети и дарф ничего не делает !!!

4) Der Port der LAN Schnittstelle ist i.d.R. 3671

5) Durch die Möglichkeit der Statusabfrage ist eines zu beachten: Es ist sicherzustellen das nicht mehr als 40 Anfragen pro Sekunde vom ioBroker genert werden, denn diese könniter dann Physikalisch Bedingt nicht mehr durch den Adaptor.

## Строганные элементы
* добавление адресов в описание объекта (id)
* выборочный импорт knx-проекта
* требуется версия узла> 8.9.4!

## Changelog
### 1.0.42 (2020_09_03)
* Fixed problem with missing index_m.html

### 1.0.41
* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40
* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39
* fixed import error

### 1.0.38
* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)
* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)
* some bugs fixed 

### 1.0.35 (2019-09-15)
* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)
* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)
* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)
* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31
* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog

### 1.0.31
* fixed bug in deviceTree generation

### 1.0.30
* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20
* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

### 1.0.19
* reverted to true/false handling for DPT1.x

### 1.0.18
* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)
* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)
* change ChID on reconnect
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)
* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefined connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)
* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)
* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)
* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)
* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)
* fixed empty objects, related to DPT1 (error message [object Object] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certificate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bug-fixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)
* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)
* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)
* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)
* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)
* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependencies

### 0.7.1 (2016-11-19)
* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)
* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)
* (chefkoch009) redesign

### 0.5.0
  (vegetto) include vis widget

#### 0.4.0
* (bluefox) fix errors with grunt

#### 0.2.0
* (bluefox) initial release

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2020 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)