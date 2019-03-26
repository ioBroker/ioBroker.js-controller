---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
BADGE-Stable: http://iobroker.live/badges/admin-stable.svg
BADGE-installed: http://iobroker.live/badges/admin-installed.svg
BADGE-NPM: https://nodei.co/npm/iobroker.admin.png?downloads=true
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/README.md
title: без названия
hash: k4IUgPdp7JdnkhVG20ud9BIBeLMtR2mzJ4Hr8SN1rBU=
---
## Подробное описание
Адаптер admin используется для управления всей установкой ioBroker. Он предоставляет веб-интерфейс. Это называется в соответствии с `<IP-Adresse des Servers>:8081`. Этот адаптер создается непосредственно во время установки ioBroker.

GUI, предоставляемый адаптером, может включать, но не ограничивается: получены следующие функции:

* Установка дополнительных адаптеров
* Доступ к обзору объекта
* Доступ к обзору состояния объектов
* Доступ к администрированию пользователей и групп
* Доступ к лог-файлу
* Администрация хозяев

## Установка
Этот адаптер создается непосредственно во время установки ioBroker, установка вручную не требуется

## Конфигурация
![adapter_admin_konfiguration](../../../de/adapterref/iobroker.admin/img/admin_konfiguration.png)

#### IP
Здесь вводится IP-адрес, под которым можно связаться с адаптером. Доступны различные варианты Ipv4 и Ipv6. <span style="color: #ff0000;">** По умолчанию 0.0.0.0 \. Это не должно быть изменено! **</span>

#### Порт
Здесь устанавливается порт, по которому может быть вызван администратор. Если на сервере работает несколько веб-серверов, этот порт должен быть адаптирован так, чтобы не было проблем с дублированием назначения портов.

#### Шифрование
Если вы хотите использовать защищенный протокол https, вам необходимо установить этот флажок.

#### Аутентификация
Если аутентификация должна быть здесь, нужно поставить хук.

## Операция
Из веб-браузера перейдите на следующую страницу:

`<IP-Adresse des Servers>:8081`

## Райдер
Главная страница администратора состоит из нескольких вкладок. В базовой установке вкладки отображаются, как показано. Используя значок карандаша в правом верхнем углу (1), можно добавить дополнительные вкладки после установки дополнительных адаптеров. Там также райдеры могут быть отключены, чтобы получить лучший обзор.

![iobroker_adapter_admin_001a](../../../de/adapterref/iobroker.admin/img/admin_ioBroker_Adapter_Admin_001a.jpg)

Подробная информация представлена на страницах, ссылки на которые есть в заголовках.

### [адаптер](admin/tab-adapters.md)
Здесь отображаются доступные и установленные адаптеры и управление ими.

### [экземпляры](admin/tab-instances.md)
Здесь перечислены экземпляры, уже установленные через вкладку Адаптер, и их можно настроить соответствующим образом.

### [объекты](admin/tab-objects.md)
Управляемые объекты (например, устройства / переменные / программы CCU). Здесь объекты могут быть созданы и удалены.
Кнопки со стрелками вверх и вниз могут использоваться для загрузки или загрузки целых структур объектов.
Другая кнопка позволяет просматривать экспертный вид.

Если значения отображаются красным цветом, они еще не подтверждены (`ack = false`).

### [условия](admin/tab-states.md)
Текущее состояние объектов.

### [события](admin/tab-events.md)
Список обновлений статуса.

### [группы](admin/tab-groups.md)
Здесь создаются созданные группы пользователей и управление правами

### [пользователь](admin/tab-users.md)
Здесь пользователи могут быть созданы и добавлены в существующие группы.

### [перечисления](admin/tab-enums.md)
Здесь перечислены фавориты, торги и комнаты от Homematic CCU.

### [хостов](admin/tab-hosts.md)
Информация о компьютере, на котором установлен ioBroker.
Здесь вы можете обновить текущую версию контроллера JS.
Если доступна новая версия, вкладка вкладки отображается зеленым цветом.

### [журнал](admin/tab-log.md)
Здесь отображается журнал

На вкладке «Экземпляры» для отдельных экземпляров можно задать уровни регистрации.
В меню выбора выбран минимальный уровень журнала, который будет отображаться.
Если возникает ошибка, ярлык вкладки отображается красным цветом.

После установки дополнительных адаптеров вы можете активировать дополнительные вкладки, используя значок карандаша в правом верхнем углу (1). Описание этой вкладки находится на соответствующем адаптере.

### [настройки системы](admin/tab-system.md)
В открывшемся меню выполняются такие настройки, как язык, формат времени и даты и другие общесистемные настройки.

![Настройки системы администратора](../../../de/adapterref/iobroker.admin/img/admin_Systemeinstellungen.jpg)

Репозитории и параметры безопасности также могут быть установлены здесь.
Более подробное описание можно получить по ссылке в заголовке этого раздела.

## Changelog
### 3.6.0 (2018-11-08)
* (foxriver76) New update states added in info channel
* (foxriver76) Take respect to async when creating info states
* (SchumyHao) Added chinese translations

### 3.5.10 (2018-09-22)
* (bluefox) Disable too many debug outputs

### 3.5.9 (2018-09-12)
* (bluefox) The log output problem was fixed

### 3.5.8 (2018-09-03)
* (bluefox) Google map was replaces with "open street map"

### 3.5.7 (2018-08-30)
* (bluefox) Edit of the table entries in configuration dialog was corrected.

### 3.5.6 (2018-08-22)
* (bluefox) Import and export of the instance configuration was implemented.

### 3.5.5 (2018-08-21)
* (bluefox) Fix upload of files

### 3.5.3 (2018-08-18)
* (bluefox) Dropdown was fixed on touch devices
* (bluefox) Speedup build of instances

### 3.5.1 (2018-08-11)
* (bluefox) Error in custom settings was fixed

### 3.5.0 (2018-08-03)
* (bluefox) Editing of enums was changed
* (bluefox) Logo was updated
* (bluefox) The function icons were added

### 3.4.9 (2018-07-17)
* (bluefox) Support of the custom login screen background
* (bluefox) show tooltip about refresh on instances page
* (bluefox) Destroy tabs after they left

### 3.4.8 (2018-07-17)
* (bluefox) fix error with add new enum
* (bluefox) try to fix error with custom settings
* (bluefox) place all titles at the top in the config
* (bluefox) add expert mode to common
* (bluefox) allow edit of enum's names in many languages

### 3.4.7 (2018-06-25)
* (bluefox) add getInterfaces function
* (bluefox) save scroll position for some tables
* (bluefox) add info about "filtered out"

### 3.4.6 (2018-06-18)
* (bluefox) Minor GUI fixes

### 3.4.5 (2018-06-12)
* (bluefox) Minor GUI fixes

### 3.4.4 (2018-06-04)
* (bluefox) add touch support for draggable and droppable
* (bluefox) edit raw value and not escaped in selectID.js
* (bluefox) allow edit of empty names in selectID.less
* (bluefox) add change with ack=true to selectID
* (bluefox) fix select for admin3 in configuration dialog
* (bluefox) add autocomplete for configs
* (bluefox) fix enums

### 3.4.3 (2018-05-13)
* (bluefox) The button in selectID was fixed
* (bluefox) disk info was added
* (bluefox) The filter in table mode on adapter tab was showed
* (bluefox) memAvailable for RAM monitoring is used
* (bluefox) fix select problem in config dialog
* (bluefox) added the asking about unsaved scripts

### 3.4.2 (2018-05-04)
* (BuZZy1337) fix wrong height calculation in select id dialog

### 3.4.1 (2018-05-03)
* (bluefox) fix wait popup
* (bluefox) fix button name in config dialog
* (BuZZy1337) escape html from log entries
* (bluefox) fix objects counter
* (BuZZy1337) show current Tab in Page-Title
* (BuZZy1337) escape HTML Tags from selectID.js
* (bluefox) GUI bugfixes
* (BuZZy1337) Fix: Unable to scroll trough Dropdown on Touchscreens
* (BuZZy1337) Enhancement: Show current Tab in Pagetitle

### 3.4.0 (2018-04-23)
* (bluefox) show error about not activated admin for cloud
* (bluefox) handle mutlilanguage names
* (bluefox) show number of objects
* (BuZZy1337) always addChips when input blurs
* (bluefox) fix select ID dialog for old styles
* (bluefox) add states view for object tab

### 3.3.9 (2018-04-12)
* (bluefox) The user and groups deletion was corrected
* (bluefox) Force using of socket.io 2.1.0

### 3.3.8 (2018-04-10)
* (bluefox) Hosts selection is improved

### 3.3.7 (2018-04-10)
* (bluefox) small UI corrections

### 3.3.5 (2018-03-25)
* (bondrogeen) info for server redesigned
* (bondrogeen) hosts list redesigned
* (bluefox) small UI corrections

### 3.3.4 (2018-03-17)
* (bluefox) small UI corrections

### 3.3.3 (2018-03-15)
* (bluefox) small UI corrections

### 3.3.1 (2018-03-11)
* (bluefox) Corrections for scenes
* (bluefox) move from socket.io 2.0.4 to 1.5.1 because of bug
* (bluefox) small fix for hosts

### 3.3.0 (2018-03-10)
* (bluefox) Overview page was added
* (bluefox) Many bugs were fixed

### 3.2.4 (2018-03-04)
* (bluefox) Adjust layout on mobile devices

### 3.2.1 (2018-03-03)
* (bluefox) Many UI fixes

### 3.2.0 (2018-02-09)
* (bluefox) The select ID dialog was fixed

### 3.1.12 (2018-02-05)
* (bondrogeen) Configuration dialog updated
* (bondrogeen) Open menu button is fixed

### 3.1.11 (2018-02-04)
* (bluefox) Connection LED fixed

### 3.1.10 (2018-02-02)
* (bluefox) update material CSS
* (bluefox) fix permission error
* (bluefox) fix filter of adapters

### 3.1.7 (2018-01-31)
* (bluefox) Fixing the role selection
* (bluefox) It runs even in IE10

### 3.1.6 (2018-01-30)
* (bluefox) Fixes for Firefox and MS-EDGE

### 3.1.2 (2018-01-25)
* (bluefox) GUI corrections

### 3.0.12 (2018-01-19)
* (bluefox) Old configuration dialogs fixed
* (bluefox) convert strings to booleans by object edit
* (DeepCoreSystem) Updates in english, german and french translations
* (bluefox) buttons layout fixed
* (bluefox) event fixes

### 3.0.11 (2018-01-11)
* (DeepCoreSystem) French update
* (bluefox) fix error with empty ID 
* (bluefox) add sort by "recently updated"
* (ldittmar) add readme and issues viewer

### 3.0.10 (2018-01-06)
* (bluefox) Update indication
* (ldittmar) Use jQuery3
* (AlCalzone) German translations

### 3.0.7 (2018-01-01)
* (soef) update instances, objects and other lists
* (bluefox) rewrite interface with materialize 

### 2.0.11 (2017-10-23)
* (bluefox) Configurable event update disable threshold

### 2.0.10 (2017-10-22)
* (soef) added use of delete-key in the objects view

### 2.0.8 (2017-10-12)
* (soef) fix quickEdit: number with boolean value

### 2.0.7 (2017-10-11)
* (soef) Sort option added to object view

### 2.0.5 (2017-10-06)
* (bluefox) Show the history charts if the web server has the https option on too

### 2.0.3 (2017-08-13)
* (bluefox) Fix user access rights for sendToHost

### 2.0.2 (2017-08-12)
* (bluefox) Add the editing of the default access rights

### 2.0.1 (2017-08-07)
* (bluefox) Allow access via iobroker.pro
* (bluefox) Add node.js version recommendation

### 1.8.3 (2017-07-24)
* (bluefox) allow access on tmp directory

### 1.8.0 (2017-06-02)
* (bluefox) split into modules

### 1.7.6 (2017-06-01)
* (bluefox) Fix edit of the enum name

### 1.7.5 (2017-05-20)
* (bluefox) catch error if translated object is not text
* (bluefox) update selectID.js
* (bluefox) do not open configuration dialog for instances with no config
* (Steiger04) select multiple auch bei data-name="[eigner-name]"

### 1.7.3 (2017-03-25)
* (bluefox) fix license dialog
* (bluefox) change color of tooltip text
* (ykuendig) update german translation
* (bluefox) add docs

### 1.7.2 (2017-03-15)
* (bluefox) add statistics selector for no-city
* (bluefox) support of discovery by first start

### 1.7.1 (2017-03-11)
* (apollon77) fix save button functionality
* (ykuendig) Update german translations
* (bluefox) patch repositories to support stable

### 1.7.0 (2017-03-08)
* (bluefox) fix log
* (bluefox) show jQuery button for role button
* (apollon77) update testing setup.js
* (bluefox) fix wetty loading
* (bluefox) fix add/delete tabs
* (bluefox) implement hints for configuration dialog
* (bluefox) redirect if IP address changes
* (bluefox) add tooltip instruction
* (bluefox) wizard support
* (bluefox) fix acl error
* (bluefox) fix license agree button

## License

The MIT License (MIT)

Copyright (c) 2014-2019 bluefox <dogafox@gmail.com>