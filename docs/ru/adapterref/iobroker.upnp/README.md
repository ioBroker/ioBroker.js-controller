---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: 617ChqfRst2Q58t23/VOM3YFegsnPuDI9EQJ+um5Fxs=
---
![логотип](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![логотип](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Образ](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
ВАЖНО: этот адаптер находится в состоянии бета-версии.

*** Нужен узел 4.x +! ***

1. [Deutsch] (# немецкий)
* [Был ли это upnp?] (# Was_ist_upnp)
* [Funktionsbeschreibung] (# Funktionsbeschreibung)
* [Объекттструктур] (# Objektstruktur)
* [Allgemeine Objekte] (# Allgemeine_Objekte)
* [Upnp Objekte] (# Upnp_Objekte)
* [Steuerung] (# Steuerung)
* [Geräte / Dienst Spezifische Besonderheiten] (# Безендерхайтен)

2. [английский] (# английский)
* [Что такое upnp?] (# What_is_upnp)
* [Функциональное описание] (# Functional_description)
* [Структура объекта] (# Object_structure)
* [Общие объекты] (# General_objects)
* [Объекты Upnp] (# Object_structure)
* [Контроль] (# Контроль)
* [Устройства / Особенности сервиса] (# Специфично)

3. [История изменений] (# История изменений)

<a name="German">Немецкий Описание:</a> ================================ **Verwendungszweck**

Dient der Kommunikation und Interaktion mit allen upnp-Fähigen Geräten.

<a name="Was_ist_upnp">** Был ли это upnp? **</a>

upnp = универсальный подключи и играй. Первый этап стандартизации в области коммуникаций в сфере здравоохранения.
Dazu gibt es sogenannte „Schemas“, diese werden в форме einer xml Datei dargestellt. Вся информация о программном обеспечении и услугах Dienste die Sie Bereit Stellen. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst festgelegten Schema, dadurch können schnell Informationen and Befehle ausgetauscht werden ohne das es nötig ist zu wissen um Welches Modell on the Welchem Hersteller das Gerät oder as is is is. В настоящее время он не имеет ничего общего со стандартами Mediengeräte и Software genutzt. Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des IoT - Internet of Things «со своей диетологией Standardisierung zu vereinheitlichen.
Dazu wurde 2016 от «Открытого фонда связи», посвященного вопросам, связанным с проведением форумов, посвященных вопросам защиты прав и возможностей, в том числе в соответствии со стандартами.

<a name="Funktionsbeschreibung">** Funktionsbeschreibung **</a>

Der Adapter führt beim ersten Начните вещание в прямом эфире в прямом эфире и в эфире. Die Antworten enthalten den Link zu den xml Dateien der Dienste. Anhand der xml Dateien werden die Objekte в ioBroker erzeugt und mit allen verfügbaren Informationen befüllt.

Zeitverzögert wird ein Dienst gestartet der auf Nachrichten von Geräten / Diensten wartet die sich an abmelden. Neu erkannte Geräte / Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät and Abonniert Statusmeldungen, damit bekommt ioBroker jede Änderung (die gesendet wird) des Gerätes / Dienstes automatisch mitgeteilt.

<a name="Objektstruktur">** Objektstruktur **</a>

Jedes Gerät oder Программное обеспечение умирает от трансляции и до сих пор не получено. Objekt angelegt. Unterhalb Dieses Objekts, прежде всего sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden in 3 Kategorien (Rolle / role) eingeteilt: индикатор. Состояние, действие и аргумент.

** display.state - ** ist eine Переменная die den Aktuellen zustand eines Objekts / Datenpunkts im Gerät / Dienst darstellt. Jeder Indicator.state hat einen bestimmten Введите число, строку, логическое значение,…. Darüber hinaus ist auch genau festgelegt welchen Wert oder Wertebereich der inidcator.state haben kann, diese Angaben sind im «native» eines Objekts hinterlegt.
Внедрение Bisher natives:

- sendEvents = Bedeutung bis jetzt Unbekannt.
- allowValues = Струны умирают.
- минимум = Gibt den niedrigsten Zahlen wert an der Akzeptiert wird.
- максимум = Gibt den höchsten Zahlen wert an der Akzeptiert wird.
- step = Gibt an in welchen Schritten ein Wert verändert werden kann.

** действие - ** это в Бефельд-дер-дас-Герат / ден Денст Гешикт Верден Канн и фон Диесем Акцептьер Вирд. Dieses Objekt Hat Im Regelfall в Унтеробъекте, аргумент.

** аргумент - ** это действие Unterobjekt von einer. Der Type is „gemischt“ da er nicht vorgegeben wird. В документе «Родные и дети» говорится о доводах и доводах Андерса Сеина.
Bisher bekannte уроженцы:

- direction = Gibt die Richtung in in der der Informationsfluss statt findet.

„In“ bedeutet es wird kein Wert zurück geliefert.
„Out“ bedeutet es wird ein Wert zurück geliefert.

- relatedStateVariable = Показатель гиббедта. Состояние и дата Аустауш дер Дата

Zuständig ist.

- Argument_No = Gibt an das wievielte Argument der Action is is.

<a name="Allgemeine_Objekte">** Allgemeine Objekte **</a>

Die folgenden Objekte finden sich für jedes Gerät / jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des upnp Стандарты для Geräte- / Dienstbeschreibung des jeweliligen Gerätes.

** Живой - ** Вирд Вом Герат / Dienst auf «true» gesetzt und vom Adapter nach x Sekunden auf «null» gesetzt, wenn das Gerät / Dienst diesen nicht wieder auf «true» setzt. Die Ablauf Zeit Is Abhängig Davon Welche Максимальный Lebensdauer vom Gerät für das Живой сигнал. Wenn ein Gerät sich abmeldet wird der Status auf „false gesetzt. Es ist möglich dieses Объективный фон по сценарию «истинный», заданный как единое целое, мудрость, мудрость, верен, человек, родной и родной. Wenn Alive manull auf «true» gesetzt wurde sollte es auch manuell auf «false» gesetzt wern wenn nicht mehr nötig, da andernfalls Fehler auftreten können.

** Sid - ** Идентификация Dies als der Subscription. Diese sid wird jedesmal vom host erzeugt wenn eine Подписка на клиентское приложение angefordert wird. Die sid läuft nach einer vom host определенное Zeit ab, daher wird sie immer wieder Aktualisiert Sie gilt nur für einen bestimmten Dienst.

<a name="Upnp_Objekte">** Upnp Objekte **</a>

Умеренный по своему вкусу. Цель: найти стандартную информацию о герате- / Dinestbeschreibungen. Es handelt sich hier nicht um eine Vollständige liste аллергия Objekte, diese Auswahl и Objekten stellt lediglich häufig vorkommende Objekte dar.

** (A_ARG_TYPE_) InstanceID - ** Die InstanceID is it am Häufigsten zu finden und world. In den meisten ist die InstanceID = 0. Diese ID wird bei jeder Сообщение о событии vin einem Dienst und jedem Befehl der a einen Dienst gesendet wird, mit übergeben.

** (A_ARG_TYPE_) Канал (*) - ** Канал Das Objekt findet sich im Zusammenhang mit Audio / Video Diensten. Ein Channel muss zum Beispiel angegeben wern wenn die Lautstärke verändert werden soll. Mögliche Werte können Beispielsweise «Мастер», «LF» или «RF». В «Beispiel steht« Master »для Allgemeine Lautstärke,« LF »für links vorne и« RF »for the rechts vorne. Wenn jetzt die Lautstärke nur rechts vorne verändert werden soll, gibt man „RF“ bei Channel an.

** (Установить / Получить) Громкость (*) - ** Громкость звука Объект поиска с помощью аудио / видео Diensten. В настоящее время мы не можем найти ничего нового, что бы ни случилось. Dieses Objekt hat immer einen Mindestwert und einen Maximalwert den man angeben kann, in den meisten fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittweite обычно в течение 1, более поздних сроках года, день рождения.

<a name="Steuerung">** Steuerung **</a>

** Действие - ** Eine Действие stellt einen Befehl dar, der an das Gerät / den Dienst geschickt werden канн. Zu jeder Action gehören auch Argumente, die Zwingend angegeben werden müssen. Экстренный человек действия - их роль, роль, роль, «действие». Beschreibt man die Action Действие с «отправить» Вирд дер Бефель и дас Герат / ден Дьенст Гезенде.

** Аргумент - ** Muss zwingend bei einer Действие angegeben werden, wenn unter «уроженцы» -> «направление» „in“ steht. Mögliche Werte die angegeben werden können / müssen findet man in der «Связанная переменная состояния». Имя пользователя Dieser «Связанная переменная состояния» ist im Objekt unter «native» -> «relatedStateVariable». Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es «native» -> Argument_No. Ein Argument erkennt человек сейнер ролл / роль, дорт стехт «аргумент». Manche strings müssen mit einem „“ “in den Datenpunkt geschrieben werden. Es kann nicht pauschal beantwortet werden wann das der Fall ist, aber bei komplexen strings wie zum Beispiel URL-адрес Канн-дас-дер-Фолл. Hier Hilft Nur Ausprobieren. Будет ли человек в "einem Argument übergeben muss man" "verwenden".

** (Связанное состояние) Переменная - ** Es handelt sich um Переменная переменная для даты Datenaustausch genutzt werden. In den Native‘s der Variablen finden sich verschiedene Informationen:

- allowValues = gibt Auskunft über die möglichen Inhalte der Переменная переменная была аргументом Аргумент с целью действий Действие gesendet werden kann.
--imum = der niedrigste Wert den die Переменная enthalten kann oder als Аргумент mit einer Действие gesendet werden kann.
- maximum = der höchste Wert den die Переменная enthalten kann oder als Аргумент с помощью действия Действие gesendet werden kann.
- step = gibt an in welchen Schritten ein Wert angegeben wird.
- sendEvents =? Mögliche Werte sind «да» или «нет». Es is aber völlig unklar была шляпой das zu bedeuten. Die Annahme dass die Werte für diese Переменная nur dann von einem Gerät / Dienst automatisch gesendet wern wenn „yes“ bei sendEvents steht hat sich nicht bestätigt.

<a name="Besonderheiten">## Geräte / Dienst Spezifische Besonderheiten</a>

** Sonos: ** Für QPlay ist es nicht möglich eine Подписка zu erstellen. Möglicherweise ist hierfür eine Autentifikation notwendig

** Мост Филиппа Хюэ 2: ** Внедрение стандартов в Мосте Хуэй 2 - Мост Фехлерхафта, Мост Хюэ - 2 Звар Гефунден Вирд Джедоч Нихт через upnp ansprechbar ist.

** Yamaha: ** Verwendet eine auf dem upnp Стандартный API-интерфейс basierende, новый формат даты и времени. Derzeit wird das vom upnp Адаптер nicht unterstützt.

** Sony. Derzeit wird das vom upnp Адаптер nicht unterstützt.

** Amazon Kindle: ** Stellt einen upnp Dienst bereit, jedoch wird keine upnp-Dienstbeschreibung geliefert и kann daher nicht genutzt werden.

<a name="English">Описание на английском языке:</a> ================================ *** Перевод по https://www.deepl.com/ переводчик***

*** Использование по назначению ***

Служит для связи и взаимодействия со всеми устройствами с поддержкой upnp.

<a name="What_is_upnp">** Что такое UPNP? **</a>

upnp = универсальный подключи и играй. Попытка стандартизировать связь между устройствами в сети. Для этого существуют так называемые «схемы», которые отображаются в виде xml-файла. Они содержат всю информацию об устройстве или программном обеспечении и предоставляемых ими услугах. Чтобы гарантировать, что эти услуги также могут быть использованы, предоставляется описание каждой услуги. Это описание следует схеме, определенной для службы, что позволяет быстро обмениваться информацией и командами, не зная, какой моделью или производителем является устройство или программное обеспечение. В прошлом эта стандартизация использовалась главным образом для медиа-устройств и программного обеспечения. В течение некоторого времени были также предприняты усилия для стандартизации связи «Интернета вещей - Интернет вещей» с помощью этой стандартизации. С этой целью в 2016 году был основан «Фонд открытого подключения», который берет на себя задачи форума upnp, который провел сертификацию устройств с поддержкой upnp и создал стандарты.

<a name="Functional_description">**Функциональное описание**</a>

Адаптер передает и оценивает ответы при первом запуске. Ответы содержат ссылку на XML-файлы сервисов. XML-файлы используются для создания объектов в ioBroker и заполнения их всей доступной информацией.

Время с задержкой запускается служба, которая ожидает сообщений от устройств / служб, которые входят или выключаются. Вновь обнаруженные устройства / услуги автоматически добавляются к существующим. Вторая служба регистрируется на каждом доступном устройстве и подписывается на сообщения о состоянии, так что ioBroker автоматически уведомляется о любых изменениях (отправляемых) на устройство / службу.

<a name="Object_structure">** Структура объекта **</a>

Каждое устройство или программное обеспечение, которое реагирует на трансляцию, создается как отдельный объект. Под этим объектом вы найдете все доступные сервисы со своими возможностями. Возможности разделены на 3 категории (роль / роль): индикатор. состояние, действие и аргумент.

**индикатор. состояние - ** - это переменная, представляющая текущее состояние объекта / точки данных в устройстве / услуге. Каждый индикатор .state имеет определенный тип, такой как число, строка, логическое значение, ..... Кроме того, также указывается, какое именно значение или диапазон значений указателя. состояние может иметь, эти данные хранятся в «родной» объекта. Ранее реализованные нативы:

- sendEvents = Значение до сих пор неизвестно.
- allowValues = строки, которые принимаются.
- минимум = дает наименьшее значение, при котором значение принимается.
- максимум = дает наибольшее значение, при котором принимается.
- step = Указывает, на каких шагах можно изменить значение.

** действие - ** - это команда, которая может быть отправлена и принята устройством / службой. Этот объект обычно имеет подобъект, аргумент.

** аргумент - ** является подобъектом действия. Тип «смешанный», так как он не указан. Нативные объекты объекта содержат различную информацию, они могут отличаться от аргумента к аргументу. Ранее известные нативы:

- direction = Указывает направление, в котором происходит поток информации. В «означает, что значение не возвращается. Out» означает, что значение возвращается.
- relatedStateVariable = Возвращает индикатор. состояние, в котором обмен данными отвечает.
- Argument_No = Возвращает количество аргументов действия, которым оно является.

<a name="General_objects">** Общие объекты **</a>

Следующие объекты находятся для каждого устройства / службы и необходимы для администрирования. Они не являются частью стандарта upnp или устройства / инструкции по эксплуатации соответствующего устройства.

** Alive - ** для устройства / службы установлено значение "true" и через x секунд для адаптера значение "null", если устройство / служба снова не установили значение "true". Время истечения зависит от максимального времени жизни живого сигнала, заданного устройством. Когда устройство выходит из системы, состояние устанавливается на «ложь». Можно установить для этого объекта значение «true» вручную или с помощью сценария, но это следует делать только в том случае, если вы уверены, что устройство / служба достижимы. Если для параметра «Alive» было установлено значение «true» вручную, его также следует установить вручную в значение «false», если в этом больше нет необходимости, иначе могут возникнуть ошибки.

** Sid - ** Служит для идентификации подписки. Эта страница создается хостом каждый раз, когда от клиента запрашивается подписка. Sid запускается через определенное хостом время, поэтому он обновляется снова и снова. Это действительно только для конкретной услуги.

<a name="Upnp_O">** Upnp объектов **</a>

Перечисленные здесь объекты можно найти в стандарте upnp и / или в описании устройства / dinest. Это не полный список всех объектов, этот выбор объектов представляет только часто встречающиеся объекты.

** (A_ARG_TYPE_) InstanceID - ** instanceID является наиболее распространенным и обязательным, поскольку он указывает экземпляр службы, к которой необходимо обратиться. В большинстве случаев instanceID = 0. Этот идентификатор передается с каждым сообщением о событии службой и каждой командой, отправляемой службе.

** (A_ARG_TYPE_) Channel (*) - ** Объект канала связан с аудио / видеоуслугами. Например, канал должен быть указан, если вы хотите изменить громкость. Возможные значения могут быть, например, «Master», «LF» или «RF». В этом примере «Master» обозначает общую громкость, «LF» для левой передней части и «RF» для правой передней. Если вы хотите изменить громкость только на правой передней панели, вы должны указать «RF» в канале.

** (Установить / Получить) Громкость (*) - ** Объект Громкость связан с аудио / видео сервисами. В зависимости от того, где это происходит, он используется для отображения громкости или для регулировки громкости. Этот объект всегда имеет минимальное и максимальное значение, которое можно указать, в большинстве случаев диапазон значений составляет от 0 до 100. Размер шага обычно равен 1, что означает, что можно вводить только четные числа.

<A name="Control">** Управление **</a>

** Действие - ** Действие - это команда, которую можно отправить на устройство / службу. Каждое действие также включает аргументы, которые должны быть указаны как обязательные. Действие можно узнать по его роли / роли, которая говорит «действие». Если вы описываете действие с помощью команды «отправить», команда отправляется на устройство / службу.

** Аргумент - ** Обязательный для действия, если «native» -> «direction» установлено в «in». Возможные значения, которые можно / нужно указывать, можно найти в «Связанной переменной состояния». Имя этой «Связанной переменной состояния» хранится в объекте в «native» -> «relatedStateVariable». Аргументы должны быть заданы в определенном порядке, для этого есть «native» -> Argument_No. Аргумент может быть распознан по его роли / роли, где он говорит «аргумент». Некоторые строки должны быть написаны с "" "" в точке данных. Невозможно ответить на этот вопрос однозначно, но с такими сложными строками, как URL, это может иметь место. Это только помогает попробовать. Если вы хотите передать "в аргументе, вы должны использовать" "".

** (Связанное состояние) Переменная - ** Эти переменные используются для обмена данными. В нативе переменной есть некоторая информация:

- allowValues = предоставляет информацию о возможном содержимом переменной или о том, что может быть отправлено в качестве аргумента с действием.
- минимум = минимальное значение, которое переменная может содержать или отправлять в качестве аргумента с действием.
- максимум = максимальное значение, которое переменная может содержать или отправлять в качестве аргумента с действием.
- step = указывает, на каких шагах указывается значение.
- sendEvents =? Возможные значения: «да» или «нет». Но совершенно неясно, что это значит. Предположение о том, что значения для этой переменной автоматически отправляются устройством / службой, только если для sendEvents установлено «да», не подтвердилось.

<a name="Specific">** Устройства / Особенности обслуживания **</a>

** Sonos: ** Невозможно создать подписку для QPlay. Это может потребовать аутентификации.

** Phillips Hue Bridge 2: ** Реализация стандарта upnp в Hue Bridge 2 неверна, поэтому Hue Bridge 2 найден, но недоступен через upnp.

** Yamaha: ** Использует API, основанный на стандарте upnp, но используя собственный формат данных. В настоящее время это не поддерживается адаптером upnp.

** Sony: ** Использует интерфейс ScalarWebApi, который называется адресуемым upnp, но использует собственный формат данных. В настоящее время это не поддерживается адаптером upnp.

** Amazon Kindle: ** Предоставляет сервис upnp, но описание сервиса upnp не предоставляется и поэтому не может быть использовано.

## Changelog

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
* (jey-cee) added possibility for controling upnp devices

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
* (jey-cee) getting all xml data from upnp devices

#### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016 Jey Cee <jey-cee@live.com>

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