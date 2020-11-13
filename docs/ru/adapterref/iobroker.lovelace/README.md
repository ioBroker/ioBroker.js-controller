---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: ZNKMNBwj/Ckj6HnlyQStaxeCU2B9xBva3tY0haLxQPY=
---
![Логотип](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

# IoBroker.lovelace
## Lovelace адаптер для ioBroker
С помощью этого адаптера вы можете создать визуализацию для ioBroker с пользовательским интерфейсом Home Assistant Lovelace.

## Конфигурация
Есть два способа настройки сущностей:

- авто
- руководство

### Авто
В автоматическом режиме будет применяться тот же процесс, что и для `google home` или `material adapter`.

*** Будут обнаружены только объекты и канал, для которых определены категории `function` и `room` ***

Вы можете определить понятные имена, и они будут использоваться в сущностях.

### Руководство
Объекты можно определить вручную в дереве объектов, например sql или histroy. Должен быть предоставлен тип объекта и, необязательно, имя объекта.
С помощью этого метода могут быть созданы только простые сущности, такие как input_number, input_text или input_boolean. Он не может иметь более одного состояния или атрибута.

## Панели
### Панель сигнализации
ioBroker пока не поддерживает такое устройство, но его можно смоделировать. Если вы создадите такой скрипт:

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

или вы просто используете для этого `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`.

### Ввод числа
Это можно сделать вручную, если в настраиваемом диалоговом окне выбран тип сущности input_number.
Для этого типа требуются значения `min` и `max` в `common` и могут быть добавлены дополнительные `step`.
Если вы хотите видеть стрелки вверх и вниз, вы должны установить в пользовательском `mode` значение 'number':

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

### Выбрать ввод
Это можно сделать вручную, если в настраиваемом диалоговом окне выбран тип сущности input_select.
Список опций для выбора должен быть предоставлен в стандартном объекте commom.states:

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

другими словами, в IoB также должен быть выбран входной сигнал.

### Таймер
Таймер можно смоделировать с помощью следующего скрипта:

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
Протестировано с yr и daswetter. Для одного или нескольких из следующих объектов должны быть установлены `Function=Weather` и `Room=Any`, чтобы они были доступны в конфигурации:

- daswetter.0.NextDays.Location_1
- прогноз на 0 год

Протестировано с драйвером AccuWeather v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Специальная карта Lovelace, созданная в поддержку прогноза accuweather - https://github.com/algar42/IoB.lovelace.accuweather-card

### Список покупок
Список покупок записывает значения в форме:

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

в `lovelace.X.control.shopping_list` государства.

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

### Картинка
Вы можете использовать для него статическое изображение или любое состояние, которое предоставляет URL-адрес в качестве состояния.
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

или просто установите вручную тип объекта на `camera` и впишите в него URL.

### Скрыть панель инструментов
Чтобы скрыть панель инструментов, вы можете установить флажок в диалоговом окне конфигурации ioBroker на вкладке «Темы».
Чтобы отобразить его, вы можете снова отключить его в диалоговом окне или просто вызвать URL-адрес с параметром `?toolbar=true`.

### Markdown
Вы можете использовать привязки в уценке, как в [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

Например. Текст `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` создаст текст `Admin adapter is alive` на панели уценки.

## Пользовательские карты
### Загрузка пользовательских карточек
Чтобы загрузить пользовательскую карту, напишите следующее:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

После перезапуска адаптера lovelace он автоматически включит все файлы из каталога `cards`.

Следующие пользовательские карты могут быть успешно протестированы:

- bignumber-card: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- простой термостат: https://github.com/nervetattoo/simple-thermostat/releases (возьмите последнюю версию)
- термостат: https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card (требуются оба файла .js и .lib.js)

Я нашел эту ссылку https://github.com/jimz011/homeassistant как интересный ресурс для пользовательских карточек.

Часто пользовательские карты хранятся на github в качестве источников и должны быть скомпилированы перед использованием.
Вам следует проверить меню `Releases` на github и попытаться найти там скомпилированные файлы.
Как этот: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (Найдите файл `mini-graph-card-bundle.js`)

## Собственные изображения
Пользовательские изображения (например, для фона) могут быть загружены через тот же диалог конфигурации, что и пользовательские карты. И используйте это так:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

или

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

в файле конфигурации lovelace. Узнать больше об истории ловеласа можно в [Вот](https://www.home-assistant.io/lovelace/views/#background).

## Темы
Темы могут быть определены в диалоговом окне конфигурации ioBroker.
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
Используйте значки в форме `mdi:NAME`, например «mdi: play-network». Имена можно взять отсюда: https://materialdesignicons.com/

## Уведомления
Вы можете добавить уведомления с помощью функции `sendTo` или записав состояние в `lovelace.X.notifications.add`:

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
Все команды из веб-интерфейса будут записаны в состояние разговора lovelace.X. с `ack=false`.
Вы можете написать скрипт, который будет реагировать на запрос и отвечать:

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

## Исправление проблем
Если вы испортили код YAML и видите пустую страницу, но у вас все еще есть верхнее меню, вы можете включить режим редактирования (если он еще не включен) из меню, а затем снова открыть меню, чтобы получить доступ к «Редактору RAW Yaml», в котором вы увидеть полный код YAML и очистить его.
Если это не поможет, вы можете открыть конфигурацию объекта lovelace. *. В raw-редакторе ioBroker и посмотреть там.
Вы также можете восстановить этот объект из резервной копии. Он содержит полную конфигурацию вашей визуализации.

## Первоисточники lovelace
Используемые источники находятся здесь https://github.com/GermanBluefox/home-assistant-polymer.

## Делать
Безопасность должна быть взята у текущего пользователя, а не у default_user

## Разработка
### Версия
Использованная версия home-assistant-frontend@20201021.4

### Как собрать новую версию Лавлейс
Прежде всего, фактический https://github.com/home-assistant/frontend (ветка dev) должен быть ** вручную ** объединен с https://github.com/GermanBluefox/home-assistant-polymer.git (* ** iob *** ветка!).

Все изменения для ioBroker отмечены комментарием `// IoB`.
На данный момент (20201021.4) были изменены следующие файлы:

- `.gitignore` - добавить` .idea` ignore
- `build-scripts / gulp / app.js` - Добавить новую задачу gulp
- `build-scripts / gulp / webpack.js` - Добавить новую задачу gulp
- `src / data / lovelace.ts` - добавить опцию скрытия панели инструментов
- `src / dialogs / more-info / ha-more-info-dialog.ts` - удалить кнопку настроек объекта и удалить состояние погоды и историю
- `src / entrypoints / core.ts` - измененный процесс аутентификации
- `src / layouts / home-assistant-main.ts` - удалить боковую панель приложения
- `src / panel / lovelace / hui-root.ts` - добавлены уведомления и голосовое управление
- `src / util / documentation-url.ts` - для ссылки на справку iobroker вместо homeassistant.
- `src / dialogs / more-info / controls / more-info-weather.ts` - добавить поддержку для отображения значка погоды по URL-адресу.
- `src / data / weather.ts` - добавить поддержку отображения значка погоды по URL-адресу.
- `src / panel / lovelace / cards / hui-weather-прогноз-card.ts` - добавить поддержку отображения значка погоды по URL-адресу.
- `src / panel / lovelace / entity-rows / hui-weather-entity-row.ts` - добавить поддержку для отображения значка погоды по URL-адресу с аутентификацией.

После этого оформляйте измененную версию в папке `./build`. Затем.

1. перейдите в каталог ./build.
2. `git clone https:// github.com / GermanBluefox / home-assistant-polymer.git` это форк https://github.com/home-assistant/frontend.git, но некоторые вещи изменены ( см. список файлов ранее).
3. `CD домашний помощник-полимер`
4. `git checkout master`
5. `npm install`
6. «gulp build-app» для выпуска или «gulp develop-iob» для отладочной версии. Чтобы создать сеть после изменений, вы можете вызвать `webpack-dev-app` для более быстрой сборки, но вам все равно нужно вызвать` build-app` после того, как версия будет готова к использованию.
7. скопируйте все файлы из `. / Build / home-assistant-polymer / hass_frontend` в`. / Hass_frontend` в этом репозитории.
8. Запустите задачу `gulp rename`.

## License

Copyright 2019-2020, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.