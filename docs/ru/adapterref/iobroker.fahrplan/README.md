---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fahrplan/README.md
title: ioBroker.fahrplan
hash: 2f1JTLdANv3W8733DPUa/4GZSHAWQ+wl8dwVD1EY2wQ=
---
![Логотип](../../../en/adapterref/iobroker.fahrplan/admin/fahrplan.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.fahrplan.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fahrplan.svg)
![Количество установок (последнее)](https://iobroker.live/badges/fahrplan-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/fahrplan-stable.svg)
![Статус зависимости](https://img.shields.io/david/gaudes/iobroker.fahrplan.svg)
![НПМ](https://nodei.co/npm/iobroker.fahrplan.png?downloads=true)

# IoBroker.fahrplan
![Тестирование и выпуск](https://github.com/gaudes/ioBroker.fahrplan/workflows/Test%20and%20Release/badge.svg)

## Адаптер Fahrplan для ioBroker
### Deutsch
Dieser Adapter для мобильного API от HAFAS verwendet. HAFAS steht für HaCon Fahrplan-Auskunfts-System und wird von vielen europäischen Verkehrsunternehmen verwendet, unter anderem auch von der Deutschen Bahn.
Der Zugriff auf HAFAS erfolgt hierbei über [HAFAS-Клиент](https://github.com/public-transport/hafas-client).

Der Adapter bietet hierbei drei Funktionen:

#### Fahrplan für Verbindungen (Routen)
Die gewünschten Routen müssen in der Adapterkonfiguration eingerichtet und aktiviert werden.
Über einen konfigurierbaren Intervall ruft der Adapter dann regelmäßig die Verbindungsinformationen ab.
Неизвестно, какие вербиндинги вердены на HTML и дополнительные детали, как на объекты в ioBroker dargestellt.
Das HTML-Objekt kann einfach in VIS eingebunden werden.

#### Benachrichtigung bei Verspätungen der Routen
Für die konfigurierten Routen kann ein Verspätungsalarm aktiviert werden. Таким образом, kann beispielsweise eine Benachrichtigung через Telegram или Alexa erfolgen, попадает во все, что вам нравится, Verbindung verspätet ist.

#### Abfahrtstafeln für Stationen
Zusätzlich bietet der Adapter eine Abfahrtstafel für konfigurierte Stationen.
Hierbei werden die nächsten drei Abfahrten einer Station abgerufen und als Objekte und HTML dargestellt.

** Адаптер Dieser доступен для Sentry Bibliotheken um automatisch Abstürze und Programmfehler an die Entwickler zu übermitteln. ** Подробная информация и информация о Deaktivierung der Fehlerberichterstattung в [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting - это версия JS-Controller 3.0.

### Английский
Этот адаптер для ioBroker использует мобильный API HAFAS. HAFAS - это система управления общественным транспортом, используемая поставщиками общественного транспорта по всей Европе, например Deutsche Bahn.
[HAFAS-Клиент](https://github.com/public-transport/hafas-client) используется для доступа к HAFAS.

Адаптер выполняет три функции:

#### Расписание пересадок (маршрутов)
Желаемые маршруты должны быть настроены и включены в конфигурации адаптера.
Адаптер автоматически получает информацию о соединении с заданным интервалом.
Следующие три соединения сохраняются в ioBroker как HTML и необязательно как подробные объекты.
HTML-объект можно легко использовать в VIS.

#### Уведомление о задержках на маршрутах
Уведомление о задержке может быть активировано для настроенных маршрутов. Например, Telegram или Alexa может получать уведомление, когда все или одно конкретное соединение задерживается.

#### Расписание отправления по станциям
Кроме того, адаптер предоставляет расписание отправлений для настроенных станций.
Здесь следующие три соединения обнаруживаются и создаются как объекты и HTML.

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Конфигурация
### Deutsch
Die Start- und Zielorte sowie Zwischenziele müssen mit ihrer numerischen ID angegeben werden.
Eine suchfunktion ist im Tab Einstellungen integriert.

#### Tab Einstellungen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings.png)

| Einstellung | Beschreibung | ------------------------------ | --- | Анбитер | Auswahl des zu verwendenden Anbieters, aktuell DB, ÖBB und SBB | Aktualisierungsintervall | Intervall in dem die Route aktualisiert werden, Ангабе в Минутене | Verspätet markieren ab | Verspätung в Minuten ab der die Verbindung als verspätet markiert wird. Standardmäßig werden nur Verspätungen ab zwei Minuten markiert | HTML-Ansicht erzeugen | Erzeugt pro Route eine konfigurierbare HTML-tabelle in einem Objekt | Детальерте специальные объекты | Konfiguration der auszugebenden Objekte | JSON-Elemente speichern | Die Rückgabe von HAFAS erfolgt als JSON, diese sollten zur Fehlerbehebung gespeichert werden

Auf der rechten Seite ist die suchfunktion integriert. Zuerst muss ein Anbieter ausgewählt werden.
Данах канн über дас Сухфельд и Дрюккен де Кнопфс "Суше" найнер Станция gesucht werden.
Die Suchergebnisse der aktuellen Suche werden in der Tabelle angezeigt.

#### Вкладка Routen
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_routes.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Wenn die Route aktiviert ist werden die Verbindungsinfos aktualisiert | Фон | Numerische ID von Startbahnhof или Starthaltestelle (Ermittlung über Suche) | Фон (имя Эйгенера) | Benutzerdefinierter Name von Startbahnhof или Starthaltestelle, für HTML- и Verspätungstext verwendet | Нач | Numerische ID von Zielbahnhof oder Zielhaltestelle (Ermittlung über Suche) | Нах (имя Айгенер) | Benutzerdefinierter Name von Zielbahnhof oder Zielhaltestelle, für HTML- и Verspätungstext verwendet | Via 1 | Fahrt über bestimmten Ort angegeben als numerische ID (необязательно, sonst leer) | Via 2 | Fahrt über bestimmten Ort angegeben als numerische ID (необязательно, sonst leer) | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Автобус, S-Bahn, usw. Standardmäßig werden all Verkehrsmittel ausgewählt | Максимум. Umstiege | Maximale Anzahl an Umstiegen. 0 für nur direkte Verbindungen.
| Абфахртен | Анзал абзуруфендер Фартен | Fahrradmitnahme | Nur Verbindungen mit Fahrradmitnahme auswählen

#### Вкладка Verspätungsalarm
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_delaynotification.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Wenn der Verspätungsalarm aktiviert ist wird dieser geprüft | Маршрут | Route auf die sich der Alarm beziehen soll | Geplante Abfahrt | Geplante Abfahrtszeit der zu prüfenden Route (Leer = Alle Verbindungen) | Wochentag | Wochentage an denen die Prüfung erfolgen soll | Benachrichtigung в Минутене | Anzahl der Minuten vor der Abfahrt, in denen benachrichtigt werden soll | Objekt für Ausgabetext | Angabe eines vorhandenen Objekts

Hinweis zum Ausgabetext: Hier kann neben einfachen Objekten für VIS z.B. auch das "Speak" -Objekt des Alexa-Adapters или das "reponse" -Objekt des Telegram-Adapters verwendet werden.

#### Tab Abfahrtstafeln
![](../../../en/adapterref/iobroker.fahrplan/docs/de/img/settings_departuretimetables.png)

Mit dem + -Button können neue Einträge zur Tabelle hinzugefügt werden.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Die Nummer entspricht dem Unterknoten in den Objekten und wird automatisch vergeben.
| Актив | Венн дер Эйнтраг активный активист вирд dieser abgerufen | Фон | Numerische ID von Startbahnhof или Starthaltestelle (Ermittlung über Suche) | Фон (имя Эйгенера) | Benutzerdefinierter Name von Startbahnhof или Starthaltestelle, für HTML-Ausgabe verwendet | Абфахртен | Anzahl abzurufender Abfahrten | Verkehrsmittel | Auswahl des Verkehrsmittels, z.B. Автобус, S-Bahn, usw. Standardmäßig werden alle Verkehrsmittel ausgewählt

### Английский
Начало, пункт назначения и остановки должны быть обозначены числовым идентификатором.
Функция поиска по этим идентификаторам встроена в настройки вкладок.

#### Настройки вкладки
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings.png)

| Настройка | Описание | ----------------------------- | --- | Провайдер | Выбор поставщика общественного транспорта, в настоящее время DB, ÖBB и SBB | Интервал обновления | Интервал обновления маршрутов в минутах | Отметка задерживается после задержки в | Определить минуты после того, как задержка должна быть помечена как задержка, по умолчанию задержка отмечается, когда задержка превышает одну минуту | Создать представление HTML | Создает для каждого маршрута настраиваемую таблицу HTML в объекте | Сохранить подробные объекты | Конфигурация объектов вывода | Сохранить элементы JSON | Возврат из HAFAS - это JSON, следует сохранить для устранения неполадок.

#### Вкладка Маршруты
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_routes.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Настройка | Описание | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Информация о подключении обновляется, когда активен маршрут | От | Числовой идентификатор начальной станции или начальной остановки | От (Пользовательское имя) | Пользовательское имя для начальной станции или start stop, используется в выводе HTML- и задержек уведомлений | К | Числовой идентификатор станции назначения или остановки назначения | От (Пользовательское имя) | Пользовательское имя станции назначения или остановки назначения, используемое в выводе HTML- и задержек уведомления | Via 1 | Проехать через специальную станцию с числовым идентификатором (необязательно, по умолчанию пусто) | Via 2 | Проехать через специальную станцию с числовым идентификатором (необязательно, по умолчанию пусто) | Автомобиль | Выбор автомобиля, например Автобус, S-Bahn и т. Д. По умолчанию выбраны все автомобили | Максимум. трансферы | Максимальное количество пересадок по маршруту, 0 только для прямых пересадок | Отправления | Количество отправлений для приема | Bycicle | Выбирать только те соединения, где разрешены велосипеды

#### Тревога задержки табуляции
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_delaynotification.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Einstellung | Beschreibung | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Активирована проверка задержки сигнала тревоги | Маршрут | Маршрут относительно этого сигнала задержки | Планируемый отъезд | Планируемое отправление соединения для проверки (Пусто = Все маршруты) | Будни | Будни, когда нужно проверять соединение | Уведомление за считанные минуты | Минуты до отправления при активном сигнале задержки | Объект для вывода текста | Состояние ioBroker для вывода текста

Подсказка для «Объект для вывода текста»: могут использоваться простые состояния для использования в VIS, но также «говорить» -состояние адаптера Alexa или «ответ» -состояние адаптера Telegram.

#### Вкладка "Расписание отправлений"
![](../../../en/adapterref/iobroker.fahrplan/docs/en/img/settings_departuretimetables.png)

С помощью + -Button новые записи могут быть добавлены в таблицу.

| Настройка | Описание | ----------------------------- | --- | № | Номер соответствует подузлу в объектах и присваивается автоматически | Activ | Информация о подключении обновляется, когда элемент активен | От | Числовой идентификатор начальной станции или начальной остановки | От (Пользовательское имя) | Пользовательское имя для начальной станции или start stop, используется в выводе HTML- и задержек уведомлений | Отправления | Количество отправлений для приема | Автомобиль | Выбор автомобиля, например Автобус, S-Bahn и т. Д. По умолчанию выбраны все автомобили.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (Gaudes) Quality fixing (lgtm.com)

### 1.0.4 (2021-02-13)
* (Gaudes) Add product selection to departure timetable
* (Gaudes) Update HAFAS client to 5.15.1 (Fix error Clientversion with OEBB profile)
* (Gaudes) Enhanced information reporting on error (Sentry Breadcrumbs)
* (Gaudes) Include Dependabot updates

### 1.0.3 (2021-01-27)
* (Gaudes) Station search returns only stations (Sentry Multiple results found for station)
* (Gaudes) Integrate SBB profile
* (Gaudes) Leave out superflous journey per route than configured
* (Gaudes) Fix call of helper for correct counters
* (Gaudes) Include Dependabot updates

### 1.0.2 (2021-01-12)
* (Gaudes) Configurable Headline for HTML tables
* (Gaudes) Fix correct deletion of unneeded objects (Sentry)
* (Gaudes) Include Dependabot updates

### 1.0.1 (2020-12-28)
* (Gaudes) Fixing different errors from HAFAS
* (Gaudes) Fixing identical start and destination station
* (Gaudes) Require vehicle in configuration
* (Gaudes) Include Dependabot updates

### 1.0.0 (2020-12-09)
* (Gaudes) First stable release

## License
MIT License

Copyright (c) 2020 Ralf Gaudes <ralf@gaudes.net>

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