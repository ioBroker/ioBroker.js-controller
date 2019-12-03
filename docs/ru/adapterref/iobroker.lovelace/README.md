---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: 71VvHB178O6BdfyZHf2WgeRgNbSJFA7SfbKNWOSEa4o=
---
![логотип](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

# IoBroker.lovelace
## Адаптер ловелас для ioBroker
С помощью этого адаптера вы можете создавать визуализацию для ioBroker с помощью интерфейса Home Assistant Lovelace.

## Конфигурация
Существует два способа настройки сущностей:

- авто
- руководство по эксплуатации

### Авто
В автоматическом режиме аналогичный процесс будет применяться так же, как и для `google home` или `material adapter`.

*** Будут обнаружены только объекты и канал, для которых определены категории `function` и `room` ***

Вы можете определить дружественные имена, и это будет использоваться в сущностях.

### Руководство по эксплуатации
Объекты могут быть определены вручную в дереве объектов, например, sql или histroy. Тип объекта должен быть предоставлен и, необязательно, имя объекта.
С помощью этого метода могут быть созданы только простые объекты, такие как input_number, input_text или input_boolean. Он не может иметь более одного состояния или атрибута.

## Панели
### Панель сигнализации
ioBroker пока не поддерживает такое устройство, но его можно смоделировать. Если вы создаете такой скрипт:

```
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

или вы просто используете `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` для этого.

### Ввод числа
Это можно сделать вручную, если в пользовательском диалоге выбран тип объекта input_number.
Для этого типа могут быть добавлены `min` и `max` значения в `common` и необязательные `step`.
Если вы хотите видеть стрелки вверх и вниз, вы должны установить в пользовательском `mode` значение «номер»:

```
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### Выберите вход
Это можно сделать вручную, если в пользовательском диалоге выбран тип объекта input_select.
Список опций для выбора должен быть представлен в стандартном объекте commom.states:

```
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```

другими словами, вход также должен быть выбран в IoB.

### Таймер
Таймер может быть смоделирован следующим скриптом:

```
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

### Погода
Протестировано с год и daswetter. Для одного или нескольких следующих объектов в конфигурации должны быть доступны `Function=Weather` и `Room=Any`:

- daswetter.0.NextDays.Location_1
- yr.0.forecast

Протестировано с драйвером AccuWeather v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Пользовательская карта Lovelace, созданная в поддержку прогноза accuweather - https://github.com/algar42/IoB.lovelace.accuweather-card

### Список покупок
Список покупок записывает значения в форме:

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

в `lovelace.X.control.shopping_list` гос.

### Карта
Объекты должны выглядеть так:

```
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

или это два объекта:

```
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### Картинка объекта
Вы можете использовать статическое изображение для него или использовать любое состояние, которое доставляет URL как состояние.
Например.:

```
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

или просто вручную установите тип объекта на `camera` и запишите в него URL-адрес.

### Скрыть панель инструментов
Чтобы скрыть панель инструментов, вы можете установить флажок в диалоговом окне конфигурации ioBroker на вкладке Темы.
Чтобы показать его, вы можете снова отключить его в диалоговом окне или просто вызвать URL с параметром `?toolbar=true`.

### Уценка
Вы можете использовать привязки в уценке, как в [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

Например. Текст `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` выведет текст `Admin adapter is alive` на панели уценки.

## Пользовательские карты
### Загрузка пользовательских карт
Чтобы загрузить пользовательскую карту, напишите следующее:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

После перезапуска адаптера lovelace он автоматически включит все файлы из каталога `cards`.

Следующие пользовательские карты могут быть успешно протестированы:

- карта bignumber: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- простой термостат: https://github.com/nervetattoo/simple-thermostat/releases (принять последний выпуск)
- термостат: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (требуются оба файла .js и .lib.js)

Я нашел эту ссылку https://github.com/jimz011/homeassistant как интересный ресурс для пользовательских карт.

Часто пользовательские карты хранятся на github как источники и должны быть скомпилированы перед использованием.
Вам следует проверить меню `Releases` на github и попытаться найти там скомпилированные файлы.
Как этот: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Найдите файл `mini-graph-card-bundle.js`)

## Собственные изображения
Пользовательские изображения (например, для фона) могут быть загружены через тот же диалог конфигурации, что и пользовательские карты. И используйте это так:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

или

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

в конфигурационном файле lovelace. Узнайте больше о фоне в Лавлейсе [Вот](https://www.home-assistant.io/lovelace/views/#background).

## Темы
Темы могут быть определены в диалоге конфигурации ioBroker.
Вставьте что-то вроде:

```
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

взято из [Вот](https://community.home-assistant.io/t/midnight-theme/28598/2).

## Иконки
Используйте значки в форме `mdi:NAME`, например, «mdi: play-network». Имена можно взять здесь: https://materialdesignicons.com/

## Уведомления
Вы можете добавить уведомления через функции `sendTo` или записав состояние в `lovelace.X.notifications.add`:

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

или

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Голосовое управление
Все команды из веб-интерфейса будут записаны в состояние lovelace.X.conversation с `ack=false`.
Вы можете написать скрипт, который будет реагировать на запросы и отвечать:

```
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## Оригинальные источники для ловеласа
Использованные источники здесь https://github.com/GermanBluefox/home-assistant-polymer.

## Сделать
Безопасность должна быть взята от текущего пользователя, а не от default_user

## Разработка
### Версия
Используемая версия home-assistant-frontend@1.0.0

### Как собрать новую версию Lovelace
Прежде всего фактический https://github.com/home-assistant/home-assistant-polymer (ветвь разработчика) необходимо **вручную** объединить с https://github.com/GermanBluefox/home-assistant-polymer. .git (iob) ветка.

Все изменения для ioBroker помечены комментарием `// IoB`.
На данный момент (2019.11.23) были изменены следующие файлы:

- `.gitignore` - добавлено` .idea` игнорировать
- `build-scripts / gulp / app.js` - добавлено новое задание gulp
- `build-scripts / gulp / webpack.js` - добавлено новое задание gulp
- `src / entrypoints / core.ts` - модифицированный процесс аутентификации
- `src / data / lovelace.ts` - добавлена опция скрытия панели
- `src / Panel / lovelace / hui-root.ts` - добавлены уведомления и голосовое управление
- `src / dialogs / notifications /tification-box.js` - добавлена кнопка подтверждения всех
- `src / layouts / home-assistant-main.ts` - удалить боковую панель приложения

После этого извлечения измененная версия в папке `./build`. Затем.

1. Перейдите в каталог ./build.
2. `git clone https:// github.com / GermanBluefox / home-assistant-Polymer.git` это вилка https://github.com/home-assistant/home-assistant-polymer.git, но некоторые вещи изменены (см. список файлов ранее).
3. «CD-home-assistant-polymer»
4. `git checkout master`
5. `npm install`
6. «gulp run build-app» для выпуска или «gulp runvelop-iob» для отладочной версии. Чтобы построить веб после изменений, вы можете вызвать `webpack-dev-app` для более быстрой сборки, но вам все равно нужно вызвать` build-app` после того, как версия будет готова к использованию.
7. Скопируйте все файлы из `. / Build / home-assistant-polymer / hass_frontend` в`. / Hass_frontend` в этом репо
8. Запустите задачу gulp rename.

## Changelog
### 1.0.5 (2019-11-27)
* (algar42) getting back broken update of internal_entities

### 1.0.4 (2019-11-25)
* (bluefox) Implemented bindings ala vis in markdown
* (bluefox) protect access to states

### 0.2.5 (2019-11-18)
* (algar42) Dimmer light is now switched on with the previous brightness level and not 100%
* (algar42) Added ability to correctly control light brightness from Card and from more_info dialog as well
* (algar42) input_boolean processing correct and initial value added to entity
* (algar42) input_select processing added
* (algar42) Entities object updates with new states added (resolved issue #46 showing old values on page refresh)
* (algar42) Switch entity updated to show two state buttons in GUI (assumed_state attribute set to true)
* (algar42) Russian translation updated
* (algar42) Language support added. Lovelace runs with IoB System Language

### 0.2.4 (2019-11-05)
* (ldittmar) Fixed translations

### 0.2.3 (2019-10-22)
* (bluefox) The custom settings were corrected

### 0.2.1 (2019-10-15)
* (bluefox) Processing of empty states was corrected

### 0.2.0 (2019-09-19)
* (Scrounger) Some bugs on "Custom Dialog" were fixed
* (Scrounger) bug fix: if value set by lovelace and max is not 100
* (Scrounger) log warn if no max value set for light entity
* (bluefox) Version of home-assistant-polymer was updated to 1.0.0

### 0.1.5 (2019-08-26)
* (bluefox) fixed timestamp conversion

### 0.1.3 (2019-07-18)
* (SchumyHao) If no ACTUAL is discovered, use SET value as switch entity value

### 0.1.2 (2019-07-14)
* (SchumyHao) Translate Chinese words to pinyin

### 0.1.1 (2019-06-10)
* (bluefox) Fixed control of states

### 0.1.0 (2019-06-06)
* (bluefox) Authentication could be disabled
* (bluefox) Lovelace compiled extra for ioBroker

### 0.0.3 (2019-06-02)
* (bluefox) initial release

## License

Copyright 2019, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.