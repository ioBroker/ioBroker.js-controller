---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.calendar/README.md
title: ioBroker.calendar
hash: 5Oon6BS1Ri7dDHrSAvewD1qgw+8jZjHpH7mlDgI486s=
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
Прочитайте свой Google, Caldav или ical календарь.

## Сделать
* Добавить календарь Outlook
* Добавить функцию, чтобы добавить события в календарь
* Расширить виджет vis

## Google Authentication
Следующий шаг необходим, только если ваш ioBroker установлен на другом компьютере / сервере и вы не можете получить доступ к веб-интерфейсу через localhost.

### Windows:
Запустите ```nodepad.exe``` с правами администратора и откройте файл ```C:\Windows\System32\drivers\etc\hosts```.
Добавьте запись, например, ```192.168.0.10    example.com``` (\ <IP-адрес ioBroker \> \ <FQDN \>) Сохраните файл и откройте веб-интерфейс через <FQDN>, который вы записали в файле hosts. Пример: http://example.com:8081

### Linux:
    Скоро ...

### Mac
    Скоро ...

### Ключ API Google
Вам нужен ключ API. Перейдите на страницу https://console.cloud.google.com/apis/dashboard и войдите в свою учетную запись Google.

Откройте список в шапке и создайте новый проект. Введите название проекта, например, «Календарь ioBroker», и нажмите «Создать».

Убедитесь, что вы выбрали правильный проект из списка. Откройте вкладку библиотеки. Найдите «Календарь» и нажмите «API Календаря Google».

Нажмите «активировать», а затем «API и сервисы». Откройте вкладку «Экран согласия OAuth» и введите имя приложения, например «Календарь ioBroker». Вы также можете загрузить логотип, но это не обязательно.

Откройте вкладку «Учетные данные», щелкните «Раскрыть учетные данные» и выберите «Идентификатор клиента OAuth». На следующем шаге выберите «Веб-приложение». Введите имя типа «ioBroker» или «Webclient». Добавьте ```http://<FQDN>:<Port from adapter config>``` к авторизованным источникам JavaScript. Добавьте ```http://<FQDN>:<Port from adapter config>/google``` и ```http://<FQDN>:<Port from adapter config>/google/``` в URI авторизованного перенаправления.

Создайте идентификатор клиента и скопируйте отображаемый идентификатор клиента и секрет клиента.

Перейдите в конфигурацию адаптера и добавьте идентификатор клиента и секрет клиента.

## Caldav Calendar (протестировано с Nextcloud, Web.de и Mail.de)
Вы можете добавить свой календарь Caldav в конфигурации адаптера.

Введите ваши данные доступа и имя хоста в конфигурации.

### Baseurl список
* Nextcloud: https:// \ <имя хоста \> /remote.php/dav/principals
* Web.de: https://caldav.web.de
* mail.de: https://kalender.mail.de
* Posteo: https://posteo.de:8443

Если вы знаете больше, пожалуйста, дайте мне знать, чтобы я мог включить их.

## Файловый календарь iCal
Вы можете добавить свой календарь iCal в конфигурации адаптера.

Введите путь к файлу на вкладке CalDav в поле имени хоста.

## Changelog

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