---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mobile/README.md
title: ioBroker.mobile
hash: UeI6kCqqBtJl00cXKLlIqsbY28eCGpbRXhiiiZNxsCg=
---
![Логотип](../../../en/adapterref/iobroker.mobile/admin/mobile.png)

![Количество установок](http://iobroker.live/badges/mobile-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mobile.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mobile.svg)
![НПМ](https://nodei.co/npm/iobroker.mobile.png?downloads=true)

# IoBroker.mobile
Пользовательский интерфейс на основе jQuery Mobile.

![Экран](../../../en/adapterref/iobroker.mobile/img/screen.png)

## Использование
Чтобы использовать мобильный интерфейс, вам необходимо создать логическую структуру в админке.

Например: перейдите на вкладку «Перечисления» и создайте новое перечисление, например "таможня".
![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting1.png)

Создайте новую группу перечислений в "enum.customs", например «контролирует» ![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting2.png)

Добавьте несколько состояний в "enum.customs.controls" ![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting3.png)

![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting4.png)

Перейдите на мобильную страницу, нажмите «Информация» (вверху справа) и нажмите «Обновить», чтобы загрузить объекты из ioBroker ![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting5.png)

После перезагрузки вы можете перейти в «Таможня => Контроль» ![Слайдер](../../../en/adapterref/iobroker.mobile/img/starting6.png)

## Поддерживаемые типы
### Слайдеры:
![Слайдер](../../../en/adapterref/iobroker.mobile/img/widget-slider.png)

    - role = "level.dimmer"
    - role = "level.blind"
    - роль состоит из «level», common.type - «number», common.write - «true», а common.max определен
    - common.type = "number", common.write равно "true", а common.max определен

Пример:

```
{
  "_id": "javascript.0.mobile.inputSlider",
  "type": "state",
  "common": {
    "name": "Slider",
    "type": "number",
    "read": true,
    "write": true,
    "min": 0,
    "max": 100
  },
  "native": {}
}
```

### Кнопки (должны быть явно установлены как видимые в режиме редактирования):
![Кнопка](../../../en/adapterref/iobroker.mobile/img/widget-button.png)

    - роль состоит из «кнопки»
    - роль состоит из «действия»

По умолчанию кнопки невидимы. Они просто пишут "истина" при нажатии.

Пример:

```
{
  "_id": "javascript.0.mobile.inputButton",
  "type": "state",
  "common": {
    "name": "Button",
    "role": "button",
    "type": "boolean",
    "write": true
  },
  "native": {}
}
```

### Переключатель:
![Переключатель](../../../en/adapterref/iobroker.mobile/img/widget-switch.png)

    - common.type = "boolean", common.write равно "true"

Пример:

```
{
  "_id": "javascript.0.mobile.inputSwitch",
  "type": "state",
  "common": {
    "name": "Switch",
    "type": "boolean",
    "write": true
  },
  "native": {}
}
```

### Установить с полем ввода:
![Поле ввода](../../../en/adapterref/iobroker.mobile/img/widget-input-number.png)

    - common.type = "number", common.max не определен, common.write равен "true", common.states не определен

Пример:

```
{
  "_id": "javascript.0.mobile.inputNumber",
  "type": "state",
  "common": {
    "name": "Number",
    "type": "number",
    "write": true
  },
  "native": {}
}
```

### Набор с состояниями:
![состояния](../../../en/adapterref/iobroker.mobile/img/widget-value-states.png)

    - common.type = "number", common.max не определен, common.write равен "true", common.states определен

Пример:

```
{
  "_id": "javascript.0.mobile.inputNumber",
  "type": "state",
  "common": {
    "name": "Number",
    "type": "number",
    "write": true,
    "states": {
          "1": "Value 1",
          "2": "Value 2"
        }
  },
  "native": {}
}
```

### Показать логическое значение:
![Логическое значение](../../../en/adapterref/iobroker.mobile/img/widget-value-boolean.png)

    - common.write имеет значение false, а common.type - логическое.

Пример:

```
{
  "_id": "javascript.0.mobile.valueBoolean",
  "type": "state",
  "common": {
    "name": "Boolean value",
    "type": "bolean"
  },
  "native": {}
}
```

### Показать значение:
![Числовое значение](../../../en/adapterref/iobroker.mobile/img/widget-value-number.png)

    - common.write имеет значение false, а common.type не является логическим.

Пример:

```
{
  "_id": "javascript.0.mobile.valueNumber",
  "type": "state",
  "common": {
    "name": "Number value",
    "type": "number",
    "unit": "%"
  },
  "native": {}
}
```

## Делать:
- редактирование Иконки
- показать некоторые виджеты с большим количеством значков
- вид планшета

## Changelog
### 1.0.1 (2020-08-22)
* (bluefox) The compatibility to socket.io 3.0.13 provided

### 1.0.0 (2019-01-30)
* (ldittmar) Add translations
* (ldittmar) Some fixes

### 0.5.0 (2019-01-24)
* (Hirsch-DE) The multilingual names were fixed

### 0.4.12 (2017-11-14)
* (Apollon77) update adapter type

### 0.4.11 (2017-07-12)
* (BasGo) Fixed blind states

### 0.4.10 (2016-11-08)
* (bluefox) Better cloud support

### 0.4.9 (2016-10-29)
* (bluefox) Fix rooms rendering
* (bluefox) add green, red, blue, white types

### 0.4.8 (2016-10-09)
* (bluefox) implement type blind

### 0.4.7 (2016-09-10)
* (bluefox) make narrow screen on wide displays
* (bluefox) fix some widgets

### 0.4.6 (2016-09-03)
* (bluefox) support of custom images
* (bluefox) fix input number and select value

### 0.4.5 (2016-07-01)
* (bluefox) fix open first page

### 0.4.4 (2016-06-24)
* (bluefox) reload if problems occur

### 0.4.3 (2016-06-24)
* (bluefox) just check invalid objects

### 0.4.2 (2016-06-14)
* (bluefox) update version number

### 0.4.1 (2016-05-12)
* (bluefox) fix control of logical states

### 0.4.0
* (bluefox) add theme switcher

### 0.3.0
* (bluefox) fix problem with room names with spaces
* (bluefox) implement side panel

### 0.2.2
* (bluefox) fix locations in edit mode
* (bluefox) enable visibility of indicators

### 0.2.1
* (bluefox) fix some errors

### 0.2.0
* (bluefox) sorting and edit name

### 0.1.1
* (bluefox) fix errors for some devices

### 0.1.0
* (bluefox) edit of visibility

### 0.0.4
* (bluefox) first version. No edit possible.

## License
The MIT License (MIT)

Copyright (c) 2015-2019 bluefox <dogafox@gmail.com>

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