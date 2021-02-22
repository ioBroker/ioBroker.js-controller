---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: 4sdZO6IOGBcPd76d69n1/OCVpuBx87HVNQMT8DnOjvo=
---
![Логотип](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Количество установок](http://iobroker.live/badges/upnp-stable.svg)
![Логотип](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Изображение](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
*** Требуется узел 10.x +! ***

1. [Deutsch] (# german_description)
* [Was ist UPnP?] (# Was-ist-upnp)
* [Funktionsbeschreibung] (# funktionsbeschreibung)
* [Objektstruktur] (# objektstruktur)
* [Allgemeine Objekte] (# allgemeine-objekte)
* [Upnp Objekte] (# upnp-objekte)
* [Steuerung] (# steuerung)
* [Geräte / Dienst Spezifische Besonderheiten] (# gerätedienst-spezifische-besonderheiten)

2. [английский] (# english_description)
* [Что такое UPnP?] (# What-is-upnp)
* [Функциональное описание] (# функциональное-описание)
* [Структура объекта] (# объект-структура)
* [Общие объекты] (# общие объекты)
* [Upnp Objects] (# объект-структура)
* [Control] (# control)
* [Устройства / особенности службы] (# устройств, специфичных для службы)

3. [Список изменений] (# список изменений)

## Немецкое описание
### Verwendungszweck
Dient der Kommunikation und Interaktion mit allen UPnP-Fähigen Geräten.

#### Был ли UPnP?
UPnP = универсальный Plug and Play. Ist der versuch eine Standardisierung der Kommunikation zwischen Geräten im Netzwerk herzustellen.
Dazu gibt es sogenannte «Schemas», diese werden in form einer xml Datei dargestellt. Sie enthalten all Information über das Gerät oder die Software und deren Dienste die sie bereit stellen. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst festgelegten Schema, dadurch können schnell Informationen und Befehle ausgetauscht werden ohne das es nötig ist zu wissen um Welches Modell oder von welchem Hersteller das Gerät oder die Software ist. In der Vergangenheit wurde diese Standardisierung vor allem für Mediengeräte und Software genutzt. Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des «IoT - Internet of Things» mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 die «Open Connectivity Foundation» gegründet, diese übernimmt die Aufgaben des UPnP-Forums, welches die Zertifizierung von UPnP-Fähigen Geräten durchgeführt und Standards erstellt hat.

#### Funktionsbeschreibung
Der Adapter führt beim ersten Start einen Broadcast durch und Wertet die Antworten aus. Die Antworten enthalten den Link zu den xml Dateien der Dienste. Anhand der xml Dateien werden die Objekte in ioBroker erzeugt und mit allen verfügbaren Informationen befüllt.

Zeitverzögert wird ein Dienst gestartet der auf Nachrichten von Geräten / Diensten wartet die sich anoder abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und Abonniert Statusmeldungen, damit bekommt ioBroker jede Änderung (die gesendet wird) des Gerätes / Dienstes automatisch mitgeteilt.

#### Objektstruktur
Jedes Gerät или Software Die auf den Broadcast реагирует на собственные запросы Objekt angelegt. Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden in 3 Kategorien (Rolle / role) eingeteilt: indicator.state, action und argument.

** состояние - ** ist eine Variable die den Aktuellen zustand eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder indicator.state hat einen bestimmten Введите число, строка, логическое значение,…. Darüber hinaus ist auch genau festgelegt welchen Wert oder Wertebereich der inidcator.state haben kann, diese Angaben sind im «native» eines Objekts hinterlegt.
Bisher Implementierte native’s:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowedValues = Strings die Akzeptiert werden.
- минимум = Gibt den niedrigsten Zahlen wert an der Akzeptiert wird.
- максимум = Gibt den höchsten Zahlen wert an der Akzeptiert wird.
- step = Gibt an in welchen Schritten ein Wert verändert werden kann.

** кнопка - ** «запрос» - это Befehl der an das Gerät / den Dienst geschickt werden kann und von diesem Aktzeptiert wird. Dieses Objekt hat im Regelfall ein Unterobjekt, das argument.

** аргумент - ** ist ein Unterobjekt von einer Aktion-Channel. Der Type ist «gemischt» da er nicht vorgegeben wird. In den native’s des Objekts finden sich verschiedene Informationen, sie können von argument zu argument anders sein.
Бишер беканнте уроженец:

- direction = Gibt die Richtung an in der der Informationsfluss statt findet.

«In» bedeutet es wird kein Wert zurück geliefert.
«Out» bedeutet es wird ein Wert zurück geliefert.

- relatedStateVariable = Индикатор гибкости. состояние an der für den Austausch der Daten

Zuständig ist.

- аргументNumber = Gibt an das wievielte Argument der Action es ist.

### Allgemeine Objekte
Die folgenden Objekte finden sich für jedes Gerät / jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des UPnP Standards oder der Geräte- / Dienstbeschreibung des jeweiligen Gerätes.

** Живой - ** wird vom Gerät / Dienst auf «true» gesetzt und vom Adapter nach x Sekunden auf «null» gesetzt, wenn das Gerät / Dienst diesen nicht wieder auf «true» setzt. Die Ablauf zeit ist abhängig davon welche maximal Lebensdauer vom Gerät für das Alive signal mitgeteilt wurde. Wenn ein Gerät sich abmeldet wird der Status auf „false gesetzt. Es ist möglich dieses Objekt von Hand oder per Skript auf «true» zu setzen, das sollte jedoch nur gemacht werden wenn man sicher ist dass das Gerät / Dienst erreichbar ist. Венн Живой мануэл на «истинном» месте, где царит соллте, эс аух, мануэль на «ложном», венн живой мануэль, да андернфолс, Фелер ауфтретен, коннен.

** Sid - ** Идентификация Dient als по подписке. Diese sid wird jedesmal vom host erzeugt wenn eine Подписка на einem client angefordert wird. Die sid läuft nach einer vom host Definierten Zeit ab, daher wird sie immer wieder Aktualisiert. Sie gilt nur für einen bestimmten Dienst.

** запрос - ** отправить запрос SOAP mit den gegebenen Optionen

### UPnP Objekte
Die hier auf gelisteten Objekte finden sich im UPnP Standard und / oder den Geräte- / Dinestbeschreibungen. Es handelt sich hier nicht um eine Vollständige listealler Objekte, diese Auswahl an Objekten stellt lediglich häufig vorkommende Objekte dar.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID ist am Häufigsten zu finden und wird zwingend benötigt da sie die Instanz eines Dienstes angibt der angesprochen werden soll. In den meisten fällen ist die InstanceID = 0. Diese ID wird bei jeder Сообщение о событии от einem Dienst und jedem Befehl der an einen Dienst gesendet wird, mit übergeben.

** (A_ARG_TYPE_) Channel (*) - ** Das Channel Objekt findet sich im Zusammenhang mit Audio / Video Diensten. Ein Channel muss zum Beispiel angegeben werden wenn die Lautstärke verändert werden soll. Mögliche Werte können Beispielsweise «Master», «LF» или «RF» sein. В diesem Beispiel steht «Master» für die Allgemeine Lautstärke, «LF» für links vorne und «RF» für rechts vorne. Wenn jetzt die Lautstärke nur rechts vorne verändert werden soll, gibt man «RF» bei Channel an.

** (Установить / получить) Volume (*) - ** Das Volume Objekt findet sich im Zusammenhang mit Audio / Video Diensten. Je nachdem wo es vorkommt wird es zum Anzeigen der Lautstärke genutzt oder zum einstellen der Lautstärke. Dieses Objekt hat immer einen Mindestwert und einen Maximalwert den man angeben kann, in den meisten fällen liegt der Wertebereich zwischen 0 и 100. Die Schrittweite liegt normal bei 1, das bedeutet es können nur glatte Zahlen angeben.

### Steuerung
** кнопка - ** "запрос" Eine Action stellt einen Befehl dar, der an das Gerät / den Dienst geschickt werden kann. Zu jeder Action gehören auch Argumente, die Zwingend angegeben werden müssen. Герой экшена и егорер Ролл / роль, dort steht «действие». Beschreibt man die Action mit «send» wird der Befehl an das Gerät / den Dienst gesendet.

** state.argument.x - ** Muss zwingend bei einer Action angebeben werden, wenn unter Rolle "state.argument.in" ист. Mögliche Werte die angegeben werden können / müssen findet man in der «Связанная переменная состояния». От имени dieser «Связанная переменная состояния» является объектом для «родной» -> «Связанная переменная состояния» внутри. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es «native» -> Argument_No. Ein Argument erkennt man an seiner Rolle / role, dort steht «аргумент». Manche strings müssen mit einem «» в ден Datenpunkt geschrieben werden. Es kann nicht pauschal beantwortet werden wann das der Fall ist, aber bei komplexen strings wie zum Beispiel URL’s kann das der Fall sein. Hier hilft nur ausprobieren. Will man ein "in einem Argument übergeben muss man" "" verwenden.

** (Связанное состояние) Переменная - ** Es handelt sich um Variablen die für den Datenaustausch genutzt werden. In den Native’s der Variablen finden sich verschiedene Informationen:

- allowedValues = gibt Auskunft über die möglichen Inhalte der Variable order was as as Argument mit einer Action gesendet werden kann.
- minimum = der niedrigste Wert den die Variable enthalten kann oder als Argument mit einer Action gesendet werden kann.
- maximum = der höchste Wert den die Variable enthalten kann oder als Argument mit einer Action gesendet werden kann.
- step = gibt an in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind «да» или «нет». Es ist aber völlig unklar was das zu bedeuten hat. Die Annahme dass die Werte für diese Variable nur dann von einem Gerät / Dienst automatisch gesendet werden wenn «yes» bei sendEvents steht hat sich nicht bestätigt.

Beispiel, wie man die Werte pollen kann:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auch die Möglichkeit bei dem "request" Objekt das Polling im Admin einzustellen. Dafür Klickt man auf das Schraubenschlüssel Symbol bei dem Objekt.

### Geräte / Dienst Spezifische Besonderheiten
** Sonos: ** Für QPlay ist es nicht möglich eine Subscription zu erstellen. Möglicherweise ist hierfür eine Autentifikation notwendig

** Phillips Hue Bridge 2: ** Внедрение стандартов UPnP в Hue Bridge 2 ist Fehlerhaft, weshalb die Hue Bridge 2 zwar gefunden wird jedoch nicht via UPnP ansprechbar ist.

** Yamaha: ** Verwendet eine auf dem UPnP Standard basierende API, die jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom UPnP Adapter nicht unterstützt.

** Sony: ** Verwendet eine ScalarWebApi genannte Schnittstelle die über UPnP ansprechbar ist jedoch ein eigenes Daten Format verwendet. Derzeit wird das vom UPnP Adapter nicht unterstützt.

** Amazon Kindle: ** Stellt einen UPnP Dienst bereit, jedoch wird keine UPnP-Dienstbeschreibung geliefert und kann daher nicht genutzt werden.

## Описание на английском языке
*** Перевод https://www.deepl.com/translator***

### Использование по назначению
Служит для связи и взаимодействия со всеми устройствами с поддержкой UPnP.

#### Что такое UPnP?
UPnP = универсальный Plug and Play. Попытка стандартизировать связь между устройствами в сети. Для этого существуют так называемые «схемы», которые отображаются в виде файла xml. Они содержат всю информацию об устройстве или программном обеспечении и услугах, которые они предоставляют. Чтобы гарантировать, что эти услуги также можно использовать, предоставляется описание каждой услуги. Это описание следует схеме, определенной для услуги, позволяя быстро обмениваться информацией и командами, не зная, какой модели или производителя является устройство или программное обеспечение. В прошлом эта стандартизация в основном использовалась для мультимедийных устройств и программного обеспечения. В течение некоторого времени также были предприняты попытки стандартизировать коммуникацию «IoT - Интернет вещей» с этой стандартизацией. С этой целью в 2016 году была основана «Open Connectivity Foundation», которая берет на себя задачи форума UPnP, который проводит сертификацию устройств с поддержкой UPnP и создает стандарты.

#### Функциональное описание
Адаптер передает и оценивает ответы при первом запуске. Ответы содержат ссылку на xml файлы сервисов. Файлы xml используются для создания объектов в ioBroker и заполнения их всей доступной информацией.

С задержкой по времени запускается служба, ожидающая сообщений от устройств / служб, которые входят в систему или выходят из нее. Новые обнаруженные устройства / услуги автоматически добавляются к существующим. Вторая служба регистрируется на каждом доступном устройстве и подписывается на сообщения о состоянии, так что ioBroker автоматически уведомляется о любых изменениях (отправленных) в устройство / службу.

#### Структура объекта
Каждое устройство или программное обеспечение, которое реагирует на трансляцию, создается как отдельный объект. Ниже этого объекта вы найдете все доступные сервисы с их возможностями. Возможности разделены на 3 категории (роль / роль): индикатор. состояние, действие и аргумент.

** состояние - ** - это переменная, представляющая текущее состояние объекта / точки данных в устройстве / службе. Каждый indicator.state имеет определенный тип, такой как число, строка, логическое значение, ..... Кроме того, также указывается, какое именно значение или диапазон значений инициатор. состояние может иметь, эти детали хранятся в «родном» объекте. Ранее реализованные нативные:

- sendEvents = Значение до сих пор неизвестно.
- allowedValues = допустимые строки.
- минимум = дает наименьшее значение, при котором принимается значение.
- maximum = дает наибольшее значение, при котором выполняется приемка.
- step = Определяет, в каких шагах значение может быть изменено.

** кнопка - ** «reuqest» - это команда, которая может быть отправлена и принята устройством / службой. У этого объекта обычно есть подобъект, аргумент.

** аргумент - ** - подобъект действия. Тип "смешанный", так как не указан. Собственные данные объекта содержат разную информацию, они могут отличаться от аргумента к аргументу. Ранее известные аборигены:

- direction = Указывает направление, в котором происходит информационный поток. In означает, что значение не возвращается. Out означает, что значение возвращается.
- relatedStateVariable = Возвращает индикатор. государство, за которое отвечает обмен данными.
- argumentNumber = Возвращает количество аргументов действия.

### Общие объекты
Следующие объекты найдены для каждого устройства / службы и необходимы для администрирования. Они не являются частью стандарта UPnP или устройства / руководства по эксплуатации соответствующего устройства.

** Активен - ** устанавливается в значение «true» устройством / службой и устанавливается в значение «NULL» адаптером через x секунд, если устройство / служба не устанавливает его снова в значение «true». Время истечения зависит от максимального срока службы живого сигнала, выдаваемого устройством. Когда устройство выходит из системы, устанавливается статус «false». Можно вручную или скриптом установить для этого объекта значение «true», но это следует делать только в том случае, если вы уверены, что устройство / служба достижимы. Если для Alive было вручную установлено значение «true», его также следует установить вручную на «false», если в этом нет необходимости, иначе могут возникнуть ошибки.

** Sid - ** служит идентификатором подписки. Эта страница создается хостом каждый раз, когда у клиента запрашивается подписка. Sid запускается через время, определенное хостом, поэтому он обновляется снова и снова. Это действительно только для определенной услуги.

### Объекты UPnP
Перечисленные здесь объекты можно найти в стандарте UPnP и / или в описаниях устройств / dinest. Это не полный список всех объектов, этот набор объектов представляет только часто встречающиеся объекты.

** (A_ARG_TYPE_) InstanceID - ** instanceID является наиболее распространенным и требуется, поскольку он определяет экземпляр службы, к которой нужно обратиться. В большинстве случаев instanceID = 0. Этот идентификатор передается службой с каждым сообщением о событии и каждой командой, отправляемой службе.

** (A_ARG_TYPE_) Канал (*) - ** Объект канала связан с аудио / видео услугами. Например, если вы хотите изменить громкость, необходимо указать канал. Возможные значения могут быть, например, «Master», «LF» или «RF». В этом примере «Master» обозначает общую громкость, «LF» - левый фронт, а «RF» - правый фронт. Если вы хотите изменить громкость только на правой передней панели, вы должны указать «RF» в Channel.

** (Set / Get) Volume (*) - ** Объект Volume связан с аудио / видео сервисами. В зависимости от того, где это происходит, он используется для отображения громкости или для регулировки громкости. Этот объект всегда имеет минимальное и максимальное значения, которые можно указать, в большинстве случаев диапазон значений находится между 0 и 100. Размер шага обычно равен 1, что означает, что можно вводить только четные числа.

### Контроль
** кнопка - ** действие «запрос» - это команда, которую можно отправить на устройство / службу. Каждое действие также включает аргументы, которые должны быть указаны как обязательные. Действие можно распознать по его роли / роли, в которой написано «действие». Если описать действие словом «отправить», то команда отправляется на устройство / службу.

** state.argument.x - ** Обязательный для действия, если роль - "state.argument.in". Возможные значения, которые могут / должны быть указаны, можно найти в «Связанной переменной состояния». Имя этой «связанной переменной состояния» хранится в объекте в разделе «native» -> «relatedStateVariable». Аргументы нужно указывать в определенном порядке, для этого есть «native» -> Argument_No. Аргумент можно распознать по его роли / роли, где написано «аргумент». Некоторые строки должны быть записаны с "" "" в точке данных. На этот вопрос невозможно ответить однозначно, но со сложными строками, такими как URL-адреса, это может иметь место. Помогает только попробовать. Если вы хотите передать "в аргументе", вы должны использовать "" ".

** (Связанное состояние) Переменная - ** Это переменные, используемые для обмена данными. В Native переменной есть некоторая информация:

- allowedValues = дает информацию о возможном содержимом переменной или о том, что может быть отправлено в качестве аргумента с действием.
- минимум = наименьшее значение, которое может содержать переменная или которое может быть отправлено в качестве аргумента с действием.
- maximum = максимальное значение, которое может содержать переменная или которое может быть отправлено в качестве аргумента с действием.
- step = указывает, в каких шагах указывается значение.
- sendEvents =? Возможные значения: «да» или «нет». Но что это значит, совершенно неясно. Предположение о том, что значения для этой переменной автоматически отправляются устройством / службой, только если в sendEvents установлено «да», не подтверждено.

Пример опроса значений:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Вы можете включить опрос в админке через конфигурацию объектов.

### Особенности устройств / услуг
** Sonos: ** Невозможно создать подписку на QPlay. Это может потребовать аутентификации.

** Phillips Hue Bridge 2: ** Реализация стандарта UPnP в Hue Bridge 2 неверна, поэтому Hue Bridge 2 обнаружен, но недоступен через UPnP.

** Yamaha: ** использует API, основанный на стандарте UPnP, но с использованием собственного формата данных. В настоящее время это не поддерживается адаптером UPnP.

** Sony: ** использует интерфейс ScalarWebApi, называемый адресуемым UPnP, но с использованием собственного формата данных. В настоящее время это не поддерживается адаптером UPnP.

** Amazon Kindle: ** Предоставляет службу UPnP, но описание службы UPnP не предоставляется и поэтому не может использоваться.

## Changelog

### 1.0.17 (2021-02-21)
* (jey-cee) fix warning messages with js-controller 3.2.x [Github issue #63](https://github.com/iobroker-community-adapters/ioBroker.upnp/issues/63)


### 1.0.16 (2020-04-27)
* (jey-cee) fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

## Changelog
### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

## Changelog
### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable


### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs


#### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

#### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2021 Jey Cee <jey-cee@live.com>

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