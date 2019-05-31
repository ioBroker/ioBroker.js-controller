---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iqontrol/README.md
title: без названия
hash: 7pR92s+CFBEhp650wrHpmMzulu2u6AostexQBUBBzOw=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.iqontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iqontrol.svg)
![Статус зависимости](https://img.shields.io/david/sbormann/iobroker.iqontrol.svg)
![Известные уязвимости](https://snyk.io/test/github/sbormann/ioBroker.iqontrol/badge.svg)
![NPM](https://nodei.co/npm/iobroker.iqontrol.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/sbormann/ioBroker.iqontrol/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/sbormann/ioBroker.iqontrol?branch=master&svg=true)

<h1><img src="admin/iqontrol.png" width="64"/> ioBroker.iqontrol </h1>

## Адаптер iqontrol для ioBroker
Быстрое веб-приложение для визуализации.

![пример](img/screenshot1.jpg) ![пример](../../../en/adapterref/iobroker.iqontrol/img/screenshot2.jpg)

Работает в любом браузере.
Вы можете сохранить его как веб-приложение на домашнем экране iOS, и оно будет выглядеть как нативное приложение.
Это полностью настраиваемый.

## Тебе нужно...
* Nodejs 8 или выше
* socketIO должен быть включен в веб-адаптере

## Как пользоваться
* Начните создавать представления.

Вы можете рассматривать представления как страницы.

* Затем создайте устройства на этих представлениях.

У устройств есть роль, которая определяет функцию устройства, какие значки используются и так далее.
В зависимости от этой роли вы можете связать несколько состояний с устройством. Это даст устройству его функциональность.
Если вы выберете «Ссылка на другой вид» в качестве роли, вы сможете создавать ссылки на другие виды. Я предлагаю скины Ссылки на другие виды с тем же фоном, который есть у связанного вида.
Вы также можете попробовать использовать функцию автоматического создания, чтобы выбрать существующее устройство из дерева объектов iobroker. Autocreate пытается выяснить роль и сопоставить как можно больше состояний.

* После этого вы можете создать панель инструментов, которая отображается в нижнем колонтитуле.

Панель инструментов-Entrys - это ссылки на виды.
Первая панель инструментов будет вашей «Домашней панелью» и будет загружена при запуске.

* Чтобы придать всему модный стиль, вы можете загрузить свои собственные изображения.

Вы можете использовать свои изображения в качестве фоновых изображений для представлений или для устройств.
Бесплатные встроенные демо-обои от www.pexels.com.

## Известные проблемы
Это первый альфа-релиз, поэтому может быть много ошибок. Но для меня это работает абсолютно стабильно.
Однако есть несколько ограничений:

- Загрузка изображений (в качестве фоновых изображений или для кнопок устройств оформления) работает, но переименование и удаление не работает
- Создание и удаление подкаталогов также не работает.

Вы можете сделать эти операции вручную через ftp в iobroker / iobroker-data / files / iqontrol / userimages

Пожалуйста, не стесняйтесь комментировать и дайте мне знать, как исправить эти проблемы!

Посетите [форум iobroker](https://forum.iobroker.net/topic/22039/neuer-adapter-visualisierung-iqontrol).

## Описание ролей и связанных состояний
Каждое устройство имеет роль, которая определяет функцию устройства. Каждая роль генерирует набор состояний, которые могут быть связаны с соответствующим состоянием io-брокера.
Если вы используете функцию автоматического создания, вы можете выбрать существующее устройство из дерева объектов io-broker. Autocreate пытается выяснить роль и сопоставить как можно больше состояний.
Это будет работать только для известных устройств. Для неизвестных устройств и для предоставления устройств дополнительных функций вы можете добавлять устройства вручную с помощью кнопки (+) - или редактировать устройства, созданные с помощью функции автоматического создания.
Чтобы отредактировать роль и состояния устройства, нажмите на карандаш позади устройства. Ниже вы найдете краткое описание ролей и используемых состояний:

### Общие положения:
Каждая роль имеет следующие три состояния:

* BATTERY: boolean - при значении true будет отображаться маленький значок батареи
* ОШИБКА: логическое значение - при значении true будет отображаться маленький значок с восклицательным знаком
* UNREACH: логическое значение - при значении true будет отображаться маленький значок беспроводной сети.

Почти все роли имеют состояние STATE и / или LEVEL. В большинстве случаев это представляет собой основную функцию устройства. Вы можете назначить ему состояния io-broker следующих типов:

* boolean - если возможно, он будет переведен в содержательный текст, такой как «вкл / выкл», «открыт / закрыт» или тому подобное. Если вы щелкнете по значку плитки, он попытается переключить логическое значение (например, чтобы включить или выключить свет). Если он не предназначен только для чтения, в диалоговом окне появится сальто-переключатель.
* число - будет отображаться с соответствующим ему блоком и генерировать слайдер в диалоге.
* строка - текст для отображения
* список значений - будет отображаться выбранное значение. Если он не защищен от записи, в диалоговом окне появится раскрывающееся меню. Технически, список значений - это число с соответствующим списком переводов, определенным в свойстве native.states.

Однако не каждый тип имеет смысл для каждой роли. Так, например, СОСТОЯНИЕ переключателя будет в большинстве случаев булевым, чтобы его можно было переключать между включением и выключением. Строка может отображаться, но переключатель не будет работать.

### Ссылка на другой вид:
* Больше не имеет состояний, но будет уважать свойство связанный вид

### <img src="img/icons/switch_on.png" width="32"> Switch, <img src="img/icons/fan_on.png" width="32"> Поклонник:
* STATE: boolean - отображать и устанавливать вкл / выкл
* POWER: число - энергопотребление, которое будет отображаться маленьким в верхнем правом углу

### <img src="img/icons/light_on.png" width="32"> Свет:
Каждый источник света может иметь одно или оба из следующих состояний:

* STATE: boolean - отображать и устанавливать вкл / выкл
* LEVEL: номер - отображать установленный уровень освещенности

По желанию вы можете определить следующие состояния:

* HUE: число - цвет света
* CT: число - цветовая температура света
* POWER: число - энергопотребление, которое будет отображаться маленьким в верхнем правом углу - но только, если CT не указан (в противном случае CT отображается и POWER игнорируется)

### <img src="img/icons/radiator.png" width="32"> Термостат:
* SET_TEMPERATURE: число - цель-температура
* ТЕМПЕРАТУРА: число - фактическая температура, отображаемая маленьким шрифтом в правом верхнем углу.
* ВЛАЖНОСТЬ: число - фактическая влажность, отображаемая маленьким в верхнем правом углу
* CONTROL_MODE: список значений - отобразить и установить режим термостата
* VALVE_STATES: массив имен и чисел - показывает процент открытия клапанов, связанных с тростатом

### <img src="img/icons/radiator.png" width="32"> Homematic Термостат:
В дополнение к обычному термостату вы можете определить:

* PARTY_TEMPERATURE: строка - строка в специальном формате для определения режима праздника гомеатических термостатов.
* BOOST_STATE: число - отображает оставшееся время ускорения термостатов homematic.

### <img src="img/icons/temperature.png" width="32"> Датчик температуры, <img src="img/icons/humidity.png" width="32"> Датчик влажности:
* STATE: число - температура или влажность, которые будут отображаться в нижней части устройства.
* ТЕМПЕРАТУРА: число - температура, которая будет отображаться маленьким в верхнем правом углу
* ВЛАЖНОСТЬ: число - влажность, которая будет отображаться маленьким в верхнем правом углу.
* Уважает свойство связанный вид

### <img src="img/icons/brightness_light.png" width="32"> Brigthness-Sensor:
* STATE: число - яркость, которая будет отображаться в нижней части устройства
* BRIGHTNESS: число - яркость, которая будет отображаться маленьким в верхнем правом углу
* Уважает свойство связанный вид

### <img src="img/icons/motion_on.png" width="32"> Датчик движения:
* STATE: булево - отображать, обнаружено движение или нет
* Уважает свойство связанный вид

### <img src="img/icons/door_closed.png" width="32"> Дверь, <img src="img/icons/window_closed.png" width="32"> Окно:
* STATE: boolean - показывать, открыта или закрыта дверь или окно.
    * Альтернативно, вы можете назначить список значений, чтобы отобразить дополнительные состояния, такие как «наклон».
    * Вы также можете назначить строку для отображения любого текста, например «3 открытых окна» или «все закрыто».
* Уважайте свойство связанный вид

### <img src="img/icons/door_locked.png" width="32"> Дверь с замком:
* STATE: логическое значение - отображать, открыта или закрыта дверь.
* LOCK_STATE: логическое значение - отображать, заблокирована или разблокирована дверь
* LOCK_STATE_UNCERTAIN: логическое значение - СОСТОЯНИЕ будет отображаться курсивом, если true, чтобы показать, что точная позиция блокировки неизвестна
* LOCK_OPEN: логическое значение - при значении true дверь полностью откроется

### <img src="img/icons/blind_middle.png" width="32"> Слепой:
* УРОВЕНЬ: число - высота блайндов в процентах
* DIRECTION: список значений - может быть Stop, Up и Down
* STOP: логическое значение - при значении true блайнд остановится

### <img src="img/icons/fire_on.png" width="32"> Fire-Sensor:
* STATE: логическое значение - при значении true датчик будет отображаться как сработавший
    * Альтернативно, вы можете назначить список значений, чтобы отобразить дополнительные состояния, такие как «подделка».
    * Вы также можете назначить строку для отображения любого текста, как «огонь на верхнем этаже».
* Уважает свойство связанный вид

### <img src="img/icons/alarm_on.png" width="32"> Тревога:
* STATE: логическое значение - при значении true датчик будет отображаться как сработавший
    * Альтернативно, вы можете назначить список значений, чтобы отобразить дополнительные состояния, такие как «подделка».
    * Вы также можете назначить строку для отображения любого текста, как «огонь на верхнем этаже».

### <img src="img/icons/value_on.png" width="32"> Значение:
* СОСТОЯНИЕ: любое действительное состояние, которое будет отображаться (см. Раздел общих состояний)
* LEVEL: число - создаст слайдер в диалоге

### <img src="img/icons/play_on.png" width="32"> Программа:
* STATE: boolean - если установлено значение true, программа будет запущена

### <img src="img/icons/play.png" width="32"> Сцена:
* STATE: логическое значение - отображается, если сцена активна. Если установлено значение true, сцена будет запущена

### <img src="img/icons/button.png" width="32"> Кнопка:
* СОСТОЯНИЕ: любое - любой желаемый тип государства
* SET_VALUE: CONSTANT string - это константа (а не связанное состояние io-broker!), Которая будет назначена в STATE, если нажата кнопка

### <img src="img/icons/popup.png" width="32"> Неожиданно возникнуть:
* СОСТОЯНИЕ: любое - может использоваться для отображения дополнительной информации
* URL: CONSTANT строка - этот URL будет открыт как всплывающее окно внутри всплывающего окна
* HTML: CONSTANT string - эта разметка будет отображаться во всплывающем окне, если URL не указан

### <img src="img/icons/link.png" width="32"> Внешняя ссылка:
* СОСТОЯНИЕ: любое - может использоваться для отображения дополнительной информации
* URL: CONSTANT строка - этот URL будет открыт

## Разработка
* Взгляните на [Принцип работы внешнего интерфейса] (Операция% 20Principle% 20of% 20Frontend.md)

## Changelog

### 0.0.28
* (Sebastian Bormann) Added datapoint POWER to switch, fan and light.
* (Sebastian Bormann) Fixed marquee for small info texts in the upper right corner at big screen sizes.
* (Sebastian Bormann) Added more options for configuring header-colors and device-colors (experimental state). Text-color ist not configurable yet.

### 0.0.27
* (Sebastian Bormann) Added marquee (scrolling text) for long states and device names (can be configured  in options). 
* (Sebastian Bormann) Added more toolbar-options. 
* (Sebastian Bormann) Enhanced handling of value lists. 
* (Sebastian Bormann) Disabled swiping when dialog is opened.

### 0.0.26
* (Sebastian Bormann) Added brightness to motion-sensor.
* (Sebastian Bormann) Added options tab. You can now configure colors of toolbar.
* (Sebastian Bormann) Fixed rendering of constants.
* (Sebastian Bormann) Resized the demo-wallpapers for faster loading.

### 0.0.25
* (Sebastian Bormann) Added motion-sensor.
* (Sebastian Bormann) Added description, how the frontend works: [Operating Principle of Frontend](Operating%20Principle%20of%20Frontend.md).
* (Sebastian Bormann) Added dialog for editing constants like SET_VALUE, URL or HTML.
* (Sebastian Bormann) Changed the way arrays are stored.
* (Sebastian Bormann) Added submit-button for values of type string.
* (Sebastian Bormann) Added saturation to hue-lights.
* (Sebastian Bormann) Better icons for color-temperature and brightness-sensor.

### 0.0.24
* (Sebastian Bormann) Fixed jittering on Safari while scrolling (was related to Pull2Refresh).
* (Sebastian Bormann) System language of iobroker will be loaded and used.

### 0.0.23
* (Sebastian Bormann) Rewrote how constant values (instead of linkedStates) are handeled - this is a requirement for further development.
* (Sebastian Bormann) Fixed Pull2Refresh on android devices / chrome.
* (Sebastian Bormann) Added external links
* (Sebastian Bormann) Added popups with iframes

### 0.0.22
* (watcherkb) Improved german translation.
* (BramTown) Improved german translation.
* (Sebastian Bormann) Short after another coming reconnect-events (<5s) are ignored now.

### 0.0.21
* (Sebastian Bormann) Added Pull2Refresh on mobile devices - reloads whole page when pulling down on homepage, otherwise only the acual view is reloaded.
* (Sebastian Bormann) Improved reloading on reconnect (hoepefully to get it finally good working on iOS 12.2).

### 0.0.20
* (Sebastian Bormann) New trial to get it working in iOS 12.2.

### 0.0.19
* (Sebastian Bormann) Improved reloading of page in new PWA-Mode of iOS 12.2.

### 0.0.18
* (Sebastian Bormann) Improved fetching of VALVE_STATES.
* (Sebastian Bormann) Changed Button Icon.
* (Sebastian Bormann) Added Loading-Spinner if disconnected.
* (Sebastian Bormann) Due to new iOS 12.2 PWA-Mode added visibility-check and connectivity-check.
* (Sebastian Bormann) Added role-icons to role-selectbox in edit device dialog.
* (Sebastian Bormann) Fixed missing value-list for states of the type string.

### 0.0.17
* (Sebastian Bormann) Changed description of slider (level/dimmer/value/height).

### 0.0.16
* (Sebastian Bormann) Role of device is displayed in devices-table.
* (Sebastian Bormann) VALVE_STATES is now editable via GUI (show opening of valves associated with a thermostat in percentage).
* (Sebastian Bormann) Added Role 'Button': You can define a constant SET_VALUE wich will be written to the ID that is linked with STATE if the button is pressed.
* (Sebastian Bormann) Rewritten parts of front-end to guarentee better compatibility. Boost-Mode for Homematic-Thermostat should work now.
* (Sebastian Bormann) Added state BOOST_STATE for Homematic-Thermostat - ability to display remaining boost-time if in boost-mode.
* (Sebastian Bormann) Added dessription of roles and corresponding states.
* (Sebastian Bormann) Temperature und Humidity-Sensors can now display a STATE at bottom of device, and both, TEMPERATURE and HUMIDITY, in small in the upper right corner.
* (Sebastian Bormann) Better handling of Auto-Create of Temperature- und Humidity-Sensors.
* (Sebastian Bormann) German translation: 'geöffnet' lower case.
* (Sebastian Bormann) Zigbee humidity and temperature added to auto-creation.
* (Sebastian Bormann) Fixed not scrollable selectbox at devices tab.

### 0.0.15
* (Sebastian Bormann) Improved check for value type of states.
* (Sebastian Bormann) Improved slider-tooltip to lower font-size at large numbers.

### 0.0 14
* (Sebastian Bormann) If role of state is not further specified, then check for role of parent object.

### 0.0.13
* (Sebastian Bormann) Doors and Windows now force true/false to be translated to opened/closed.
* (Sebastian Bormann) Double Entrys on WelcomeScreen/Overview removed.
* (Sebastian Bormann) States are now set with the correct value type.
* (Sebastian Bormann) Changed recognition of state types. I hope there are no new bugs now!

### 0.0.12
* (Sebastian Bormann) Check for unallowed chars in object names.
* (Sebastian Bormann) Check for duplicates in view names.
* (Sebastian Bormann) Level fires a slider in dialog - even when it has a state list (HUE again :)).
* (Sebastian Bormann) Added Blinds (Homematic) - please test it, i don't have one to test.

### 0.0.11
* (Sebastian Bormann) Added compatibility for edge and firefox. 
* (Sebastian Bormann) Again Hue bugfixes.
* (Sebastian Bormann) Removed Tooltip from Toolbar.

### 0.0.10
* (Sebastian Bormann) Added ColorTemperature. Hoepfully HUE works now? Can't test ist, because i do not own any hue lamp :)

### 0.0.9
* (Sebastian Bormann) Philips HUE added to autocreate (colortemp is not working yet!).  
* (Sebastian Bormann) LinkedView now also works on windows, doors and fire-sensor.
* (Sebastian Bormann) Added translation (thanks ldittmar!).

### 0.0.8
* (Sebastian Bormann) Added icons to image selectboxes.

### 0.0.7
* (Sebastian Bormann) Changed order of tabs
* (Sebastian Bormann) Autocreate for shelly should work now (i hope so, can't test it here)

### 0.0.6
* (Sebastian Bormann) Improved speed of select id and autocreate
* (Sebastian Bormann) Set filter to channel on autocreate

### 0.0.5
* (Sebastian Bormann) Bugfix: creation of many devices schould work now

### 0.0.4
* (Sebastian Bormann) Bugfix: copy device created just a reference to old object
* (Sebastian Bormann) Addes Toolbar-Icons

### 0.0.3
* (Sebastian Bormann) various bugfixes

### 0.0.2
* (Sebastian Bormann) first partly running version

### 0.0.1
* (Sebastian Bormann) initial release

## License
MIT License

Copyright (c) 2019 Sebastian Bormann

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