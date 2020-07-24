---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: Адаптер ioBroker.nanoleaf-lightpanels
hash: /gMSjR122XgKD81je0cHoSR6U6NFssNBgMO2sZJDQc0=
---
![логотип](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![Статус сборки Трэвис](https://travis-ci.org/daniel-2k/ioBroker.nanoleaf-lightpanels.svg?branch=master)
![Статус сборки Appveyor](https://ci.appveyor.com/api/projects/status/29fjgn8ww5w96etq/branch/master?svg=true)
![NPM](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# IoBroker.nanoleaf-lightpanels Адаптер
=================

Это адаптер ioBroker для управления световыми панелями nanoleaf (ранее Aurora nanoleaf) или Canvas nanoleaf через OpenAPI nanoleaf.

## Подключение к световым панелям nanoleaf / Canvas Controller:
1. В настройках адаптера необходимо установить IP-адрес и порт контроллера nanoleaf. Для nanoleaf OpenAPI необходим токен авторизации для предоставления доступа к REST-API. Если у вас уже есть один, вы можете ввести токен здесь и пропустить следующий шаг.

   Вы можете использовать функцию поиска устройств на странице администратора, чтобы обнаружить ваши устройства nanoleaf.

2. Если у вас нет авторизационного токена, вам нужно запросить его у nanoleaf OpenAPI.

Для этого установите контроллер nanoleaf в режим сопряжения, нажав и удерживая кнопку питания на устройстве в течение 5-7 секунд, пока светодиоды не начнут попеременно мигать.
Затем нажмите кнопку «Получить токен авторизации» в течение 30 секунд (режим сопряжения прекратится через 30 секунд). Адаптер должен быть запущен! Если он прошел успешно, токен авторизации должен отображаться в поле «Токен аутентификации». Если произошла ошибка, вы получите всплывающее окно с сообщением об ошибке (подробности вы можете увидеть в журнале).

3. Сохраните настройки.
4. Веселитесь!

Поскольку версия встроенного ПО Light Panels> 3.1.0 и версия встроенного ПО Canvas> 1.1.0 Отправленные события сервера (SSE) могут использоваться для прямого обновления состояния. Для устройств Canvas сенсорные события поддерживаются.
Настройка интервала опроса обновления состояния влияет только на устройства с более низкими версиями прошивки, где опрос используется для обновления состояния.

## Алекса
Вы можете управлять световыми панелями / холстом nanoleaf с Alexa через ioBroker (Cloud-Adapter).
Питание вкл / выкл, яркость, цвет и цветовая температура поддерживается.
Вы должны настроить точки данных

* состояние (для включения / выключения)
* оттенок (для цвета)
* насыщенность (для цвета)
* яркость (для цвета)
* colorTemp (для цветовой температуры)

в облачном адаптере под тем же смарт-именем.

## IoBroker Визуализация
Световые панели / холст nanoleaf можно контролировать в ioBroker Visualization, используя базовые виджеты, такие как «Включение / выключение радиокнопок» или ползунки для управления состояниями насыщенности, яркости, оттенка, насыщенности и цветовой температуры.

Для эффектов вы можете использовать виджет «Select ValueList», чтобы использовать его в качестве раскрывающегося списка, а затем сопоставить состояние EffectList со свойством value и text виджета (тип: «{nanoleaf-lightpanels.0.LightPanels.effectsList}» -> фигурные скобки важны!)

Для управления и визуализации цвета необходимо установить виджеты в стиле палитры цветов. Вы можете сопоставить идентификатор RGB с состоянием colorRGB или использовать три состояния HSV.

Вы можете использовать демонстрационный проект nanoleaf vis, который находится в подпапке / vis на github.

## Changelog

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)
Copyright (c) 2019 daniel_2k <daniel_2k@outlook.com>