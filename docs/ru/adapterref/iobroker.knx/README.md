---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: 5ikYMO9N6xRwzYabxcpGt0/3qRMjI8H71DF8VB/w2CQ=
---
![логотип](../../../en/adapterref/iobroker.knx/admin/knx.png)

![Количество установок](http://iobroker.live/badges/knx-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.knx.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx =================
## Описание
en: Этот адаптер позволяет импортировать файлы knxproj из ETS. Он генерирует перевод между адресами групп KNX и ioBroker и помещает устройства в комнаты (особенно для MobileUI).

Он подключается к стандартным шлюзам KNX / LAN.

Перед началом: Каждый DPT для com.Objects должен быть установлен в вашем проекте ETS. Каждое устройство должно быть отсортировано в структуре вашего объекта.

## Устаревший на данный момент в 1.0.19
### ВНИМАНИЕ для версии 1.0.18: для будущих выпусков я изменил значения «логическое» с 1 и 0 на истинное ложное, как и должно быть. На самом деле, проверьте, чтобы ваши сценарии использовали «true» и «false» вместо 0 и 1
### ACHTUNG für Версия 1.0.18: Версия для проверки подлинности Werte für den DPT1.xxx boolean wurde von 1 bzw 0 auf true bzw false gesetzt. Deshalb sind alle Scripte auf diese Auswertung hin zu prüfen.
## Характеристики:
* импорт файла knxproj
* создание ETS-подобной структуры объекта
* нахождение и объединение акт-канала и канала состояния (эвристический)
* обновление всех состояний при запуске
* испуская READ на KNX-Bus, при записи на объекте состояния
* сортировка каналов по комнатам

## Конфигурация адаптера
После установки этого адаптера откройте конфигурацию адаптера. Заполнить:

### KNX Gateway IP
<IP вашего KNX / Lan GW> в формате ipv4

### Порт
это обычно порт 3671

### Физ. EIB Адрес
заполните бесплатный физ. адрес, соответствующий вашей KNX-архитектуре, !!! НО не то же самое, что ваш шлюз KNX !!!

### Уровень отладки
расширяет выходной уровень адаптера для целей отладки

### Загрузить knxproj
Здесь вы можете загрузить свой ETS Export в формате "knxproj".

После успешного импорта в диалоговом окне отображается номер импортируемого объекта. Теперь нажмите «сохранить и закрыть», и адаптер должен запуститься.
При запуске адаптер читает все групповые адреса с read-Flag. Это может занять некоторое время и может вызвать большую нагрузку на вашу шину KNX. Но значения в вашем vis обновляются после запуска.

### Объекты
Вот под knx.0 дерево группового адреса, как в вашем проекте ETS.

### Перечисления
Если у вас в ETS есть строительная конструкция с соответствующими устройствами, это будет показано здесь. Под «членами» указаны имена групповых адресов, перечисленных на устройствах с флажком отправки в этой группе.

### Использование
Если адаптер запускается успешно, ваши точки данных будут доступны для всего, что вам нравится делать.

### Типы Datapoint
Все DPT в соответствии с «Системными спецификациями, взаимодействием, типами данных» от KNX Association доступны. Это означает, что есть 2 типа информации, которую вы можете получить: 1) Значение или Строка 2) Разделенные запятыми Значения или массив значений (на данный момент я не знаю, какой способ лучше обрабатывать)

Например, DPT5.001 кодируется как 8-разрядное целое число без знака. Это дает единственное значение. DPT3.007 (управление диммированием) кодируется как 1 бит (булево) + 3 бит (без знака Int).
Это приводит к ф. Е. в значении, таком как «0,5», где «0» означает «уменьшение», а «5» означает количество интервалов.

## Wie werden die Datenpunkte generiert
### 1) Ауслезен аллерг Коммуникационсобъектреферензен (im folgenden KOR)
Dabei werden den Gruppenaddressreferenz (im folgenden GAR) удостоверение личности ювелирного изделия DPT der KOR zugeordnet, wenn er vorhanden ist. Ausserdem bekommt der erste Eintrag die Атрибут write = yes и read = no. Alle darauf folgenden GAR ID в bekommen nur den DPT zugeordnet

### 2) Erzeugen der Gruppenadressstruktur (im folgenden GAS)
Его странная смерть GAS anhand der GAR ID erzeugt и ebenfalls умирает zugeordnet DPT, падает умирает до 1) noch nicht geschehen ist.

### 3) Herausfinden der Schalt- und Statusaddressen
ETS Export sind die Schalt- und Statusadressen nicht hinterlegt. Somit führe ich eine Ähnlichkeitsprüfung аллергия Gruppenadressnamen durch mit der Auswertung auf status and state.
Wird ein Pärchen gefunden, dessen Ähnlichkeit mehr als 70% beträgt, dann wird angenommen, das die GA1 die Schaltadresse и GA2 die Statusadresse ist. Dabei erhält GA1 das write = true и read = false and GA2 das write = false и read = true.
Ausserdem werden die DPT abgeglichen aus der jewelilig korrespondierenden GA. Aus diesem Grund ist es schwierig, Pärchen zu finden, wenn die Gruppenadressbeschriftungen nicht последовательный вид.

### 4) Erzeugen der Datenpunktpärchen (im folgenden DPP)
Ein DPP wird erzeugt, wenn die GA, GAR и der DPT действительный вид. Mit Diesen DPP arbeitet der Adapter. Фелен также умирает от АКДС в Эйнере, штат Джорджия, США. A. Wege gefunden werden konnte, так странно, что GA GAIN DPP erzeugt und ist im Weiteren nicht nutzbar.

Im Idealfall werden somit für einen Schaltkanal 2 DPP erzeugt. Das erste ist das Schalten. В этом случае GAR ID des Статус DPP задним числом. Das zweite ist dann das Статус DPP ohne weitere Refenrenz.

## Beim Start des Adapters
Alle mit dem Lesen-Flag markieren DPP werden beim Запустить abgefragt. Умирает verursacht u.U. Eine Höhere Buslast und Dauert Einen Момент. Im Anschluss sind aber alle aktuellen Werte verfügbar.

## (скрыто) Особенности:
Durch senden eines Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt.

### Vermeidung von Problemen
1) Программа ETS Programmeung и программа ETS Programmeung и Saubere Программа ETS

* Цувейзен дер DPT!
* einheitliche Beschriftung der GA-Namen (z.B "Э. Г. Вонен Декке Лихт Шальтен" и "Э. Г. Вонен Декке Лихт Шальтен статус")
* Vermeidung von Sonderzeichen ",. /; \ &% $ § []" (канн цу проблеммен эрзейгунг дер гас фюрен)

2) Prüfen ob das KNX / LAN GW erreichbar ist. Wenn es das nicht ist, versucht der Adapter sich kontinuierlich zu verbinden.

3) Physikalische Adresse richtig wählen (Wichtig Beim Einsatz von Linienkopplern). !!! АХТУНГ: умереть, получить физический адрес.

4) Der Port der LAN Schnittstelle ist i.d.R. 3671

5) В настоящее время мы не имеем права участвовать в этой работе: 40 минут, 40 минут, больше, чем когда-либо.

## Строганные функции
* добавление адресов в описание объекта (id)
* выборочный импорт knx-проекта
* Требуется версия узла> 8.9.4!

## Changelog
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
* on Startup read wait for response of Statechannel or timeout

### 1.0.13 (2018-07-04)
* elemination of special signs while importing
* small bugfixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bugfixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefinded connection state
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
* fixed empty objects, related to DPT1 (error message [object Object] unkown Inputvalue)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise propery update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certifate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapterconfiguration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed postcomma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bugfixes
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
* implemented generation of room list with device dependicies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependicies

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

Copyright (c) 2016-2018 K.Ringmann <info@punktnetzwerk.net>

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