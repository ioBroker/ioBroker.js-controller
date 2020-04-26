---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.calendar/README.md
title: ioBroker.calendar
hash: Th83raSd6dt7sLUlOdYPxEuaPmChd5EkCb7+NNKxmNA=
---
![логотип](../../../en/adapterref/iobroker.calendar/admin/calendar.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.calendar.svg?logo=npm)
![Загрузки](https://img.shields.io/npm/dm/iobroker.calendar?logo=npm)
![сооружения](http://iobroker.live/badges/calendar-installed.svg)
![стабильный](http://iobroker.live/badges/calendar-stable.svg)
![Статус зависимости](https://img.shields.io/david/WLAN-Kabel/ioBroker.calendar.svg)
![Известные уязвимости](https://snyk.io/test/github/WLAN-Kabel/ioBroker.calendar/badge.svg)
![NPM](https://nodei.co/npm/iobroker.calendar.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/WLAN-Kabel/ioBroker.calendar/master.svg?logo=travis)
![AppVeyor](https://img.shields.io/appveyor/build/WLANKabel/ioBroker-calendar/master?logo=appveyor)

# IoBroker.calendar
## Адаптер календаря для ioBroker
Читайте ваш календарь событий Google, Caldav или ical.

## Делать
* Добавить календарь Outlook
* Добавить функцию, чтобы добавить события в календарь
* Расширить виджет vis

## Календарь Google
### Ключ API Google
Вам нужен ключ API. Перейдите на страницу https://console.cloud.google.com/apis/dashboard и войдите в свою учетную запись Google.

Откройте список в шапке и создайте новый проект. Введите название проекта, например, «Календарь ioBroker», и нажмите «Создать».

Убедитесь, что вы выбрали правильный проект из списка. Откройте вкладку библиотеки. Найдите «Календарь» и нажмите «API Календаря Google».

Нажмите «активировать», а затем «API и сервисы». Откройте вкладку «Экран согласия OAuth» и введите имя приложения, например «Календарь ioBroker». Вы также можете загрузить логотип, но это не обязательно.

Откройте вкладку «Учетные данные», щелкните «Раскрыть учетные данные» и выберите «Идентификатор клиента OAuth». На следующем шаге выберите «Другое». Введите имя как «ioBroker» или «Клиент».

Создайте идентификатор клиента и скопируйте отображаемый идентификатор клиента и секрет клиента.

Перейдите в конфигурацию адаптера и добавьте идентификатор клиента и секрет клиента.

### Добавить аккаунт
Если вы хотите добавить учетную запись, нажмите на кнопку.

Кнопка переместит вас на страницу авторизации, где вы должны дать разрешение.

Когда вы выбрали свою учетную запись и авторизовали клиента, будет отображен код.

Скопируйте код и добавьте календарь в настройках адаптера с помощью символа +.

Вставьте код в столбец «Код» и сохраните все настройки.

После перезагрузки адаптер считывает и сохраняет все доступные календари. Календари могут быть активированы в настройках.

## Caldav Calendar (протестировано с помощью Nextcloud, Web.de и Mail.de)
Вы можете добавить свой календарь Caldav в конфигурации адаптера.

Введите ваши данные доступа и имя хоста в конфигурации.

### Baseurl список
| Имя | URL |
| ------ | ------ |
| GMX | https://caldav.gmx.net |
| mail & period; de | https://kalender.mail.de |
| Nextcloud | [https:// &lt;имя хоста&gt; /remote.php/dav] (https://example.com/remote.php/dav) или <br> [Https: // &lt;имя хоста&gt; /remote.php/dav/principals](https://example.com/remote.php/dav/principals) |
| Постео | https://posteo.de:8443 |
| Web & period; de | https://caldav.web.de |

Если вы знаете больше, пожалуйста, дайте мне знать, чтобы я мог включить их.

## Файловый календарь iCal
Вы можете добавить свой календарь iCal в конфигурации адаптера.

Введите путь к файлу на вкладке CalDav в поле имени хоста.

## Changelog

### 1.2.0 (2020-04-11)
* (WLAN-Kabel) #24 - New iCal library to better read calendars and support future event writing functionality
* (WLAN-Kabel) Google authorization changed
* (WLAN-Kabel) #27 - ical events with recurrence are now handled
* (WLAN-Kabel) #25 - Regular request for new calendars added
* (WLAN-Kabel) #29 - Fixed a bug that caused a \"TypeError\" message on iCal calendars

### 1.1.3 (2020-03-22)
* (WLAN-Kabel) #18 - Added possibility to load ics files from web servers
* (WLAN-Kabel) #21 - Added option to ignore certificate errors
* (WLAN-Kabel) #15 - Caldav time range is used to reduce traffic
* (WLAN-Kabel) Caldav library revised
* (WLAN-Kabel) Google functions outsourced in own lib
* (WLAN-Kabel) #15 - Fixed caldav bug that occurred when end times were missing
* (WLAN-Kabel) #15 - Added more debug messages

### 1.1.2 (2020-03-03)
* (WLAN-Kabel) #15 - Fixed a serious bug that caused incorrect credentials for CalDav accounts
* (WLAN-Kabel) #15 - Fixed a bug that caused a 'TypeError' message

### 1.1.1 (2020-02-26)
* (WLAN-Kabel) Password encryption added
* (WLAN-Kabel) Error messages for caldav lib extended
* (WLAN-Kabel) Fixed an issue that caused errors when reading null events

### 1.1.0 (2020-02-05)
* (WLAN-Kabel) Caldav support expanded
* (WLAN-Kabel) iCal file support added

### 1.0.1 (2020-01-11)
* (WLAN-Kabel) Missing dependency added

### 1.0.0 (2020-01-11)
* (WLAN-Kabel) Added caldav support
* (WLAN-Kabel) Multiple calendars can be displayed in one widget
* (WLAN-Kabel) Added more widget settings
* (WLAN-Kabel) State structure changed
* (WLAN-Kabel) Appointments are now shown in the popup
* (WLAN-Kabel) Some internal functions revised
* (WLAN-Kabel) Fixed an error when saving the authentication data

### 0.2.0 (2020-01-08)
* (WLAN-Kabel) Multiple calendar support for one account
* (WLAN-Kabel) Calendar color is now supported
* (WLAN-Kabel) Calender states color, name, account added
* (WLAN-Kabel) Calendar name is set as the state name
* (WLAN-Kabel) Fixed an issue where the credentials were not properly controlled
* (WLAN-Kabel) The google calendar name and color will be adopted

### 0.1.0 (2020-01-07)
* (WLAN-Kabel) Added calendar widget
* (WLAN-Kabel) Cron job and server will stopped on unload
* (WLAN-Kabel) Fixed an issue where not all states were deleted
* (WLAN-Kabel) Added some debug messages
* (WLAN-Kabel) Removed adapter from state settings
* (WLAN-Kabel) Fixed problem where series appointments were not loaded

### 0.0.1
* (WLAN-Kabel) Initial release

## License
MIT License

Copyright (c) 2019-2020 WLAN-Kabel <wlan-kabel@outlook.de>

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