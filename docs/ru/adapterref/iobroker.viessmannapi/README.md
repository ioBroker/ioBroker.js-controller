---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.viessmannapi/README.md
title: ioBroker.viessmannapi
hash: 7TwBm83Z4fHk+yMnvfkWck9bFA79Uckvq29ymA3N344=
---
![логотип](../../../en/adapterref/iobroker.viessmannapi/admin/viessmannapi.png)

![Статус сборки](https://travis-ci.org/thovid/ioBroker.viessmannapi.svg?branch=master)

# IoBroker.viessmannapi =================
Этот адаптер соединяет вашу систему ioBroker с центральным отоплением Viessmann через API Viessmann. Для этого необходимо, чтобы ваша система отопления была подключена к серверу Viessmann через Vitoconnect или подобное устройство. Вся включенная информация, предоставляемая API, периодически опрашивается (каждые 60 секунд) и записывается в состояния.

Обратите внимание, что это частный проект, поэтому используйте на свой страх и риск. Это не поддерживается и не одобряется Viessmann!

## Монтаж
Поскольку этот адаптер находится на ранней стадии разработки, его установка может быть осуществлена через «последний» репозиторий ioBroker. В настройках адаптера введите имя пользователя и пароль вашей учетной записи Viessmann. Если все идет хорошо, вы должны увидеть, что состояния появляются под `viessmannapi.X`. Первые значения должны прийти через 60 секунд.

## Состояния
Конкретные состояния могут зависеть от вашей установки. Примеры

- `viessmannapi.0.heating.boiler.sensors.tempera.main.value` - температура котла
- `viessmannapi.0.heating.circuits.0.heating.curve.shift` и` slope` - смещение и наклон, определяющие кривую нагрева
- `viessmannapi.0.heating.circuits.0.operating.modes.active.value` - текущий режим работы; например, «dhw» означает только горячую воду, «dhwAndHeating» означает горячую воду и отопление
- `viessmannapi.0.heating.sensors.tempera.outside.value` - внешняя температура, измеренная внешним датчиком

## Действия
Некоторые функции предоставляют *действия* для изменения некоторых свойств. Действие может быть вызвано с помощью метода `sendTo`. Синтаксис выглядит так:

```javascript
sendTo('viessmannapi.0', 'action', {
    feature: 'heating.circuits.0.operating.programs.comfort',
    action: 'setTemperature',
    payload: {targetTemperature: 20}
});
```

Вышеупомянутый вызов установит целевую температуру для программы комфорта на 20 °C.

### Поддерживаемые действия
Ниже приведен список поддерживаемых действий (обратите внимание, что в зависимости от вашей отопительной установки некоторые действия могут быть недоступны, или другие действия доступны, но не задокументированы здесь).

| Особенность | Действие | Поле | Примечания
|---------------------------------------------------|----------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **heating.circuits.X.circulation.schedule** | | | |
| | setSchedule | | устанавливает график обращения контура "Х" |
| | | `newSchedule` (тип: расписание, см. Ниже, режимы: «включено», по умолчанию: «выключено») | см. описание типа расписания ниже |
| **Heating.Circuits.X.heating.curve** | | | |
| | | `slope` (число, мин: 0,2, макс: 3,5, степпинг: 0,1) | |
| | | `shift` (число, мин: -13, макс.: 40, шаг: 1) |
| | | `shift` (число, мин: -13, макс": 40, шаг: 1) |
| **heating.circuits.X.heating.schedule** | | | |
| | | `newSchedule` (тип: Расписание, см. Ниже, режимы: «обычный», по умолчанию: «уменьшенный» | см. Описание типа расписания ниже |
| | | `newSchedule` (тип: Расписание, см. ниже, режимы:« обычный », по умолчанию:« уменьшенный »| см. описание типа расписания ниже |
| **heating.circuits.X.operating.modes.active** | | | |
| | | `mode` (string, enum: ["standby", "dhw", "dhwAndHeating", "принудительное уменьшение", "вынужденный нормальный"]) | требуется |
| | | `mode` (string, enum: [" standby "," dhw "," dhwAndHeating "," принудительное уменьшение "," вынужденный нормальный "]) | требуется |
| **heating.circuits.X.operating.programs.comfort** | | | |
| | | `targetTemperature` (число, мин: 4, макс: 37, степпинг: 1) | требуется |
| | | `targetTempera` (число, мин: 4, макс: 37, шаг: 1) | требуется |
| | активировать | | Нет полей (отправить пустой объект), активирует комфортный режим |
| | деактивировать | | Нет полей (отправить пустой объект), деактивирует комфортный режим |
| **heating.circuits.X.operating.programs.eco** | | | |
| | | `temperature` (число, мин: 3, макс: 37, степпинг: 1) | необязательно |
| | | `температура` (число, мин: 3, макс: 37, степпинг: 1) | необязательно |
| | деактивировать | | Нет полей (отправить пустой объект), отключает эко-режим |
| **Heating.Circuits.X.operating.programs.holiday** | | | |
| | | `start` (строка) | требуется, неизвестный формат (возможно, какая-то форма строки даты?) |
| | | `end` (строка) | требуется, неизвестный формат (возможно, какая-то форма строки даты?) |
| | | `end` (строка) | требуется, неизвестный формат (возможно, какая-то форма строки даты?) |
| | внеплановый | | Нет полей (отправить пустой объект), отключение праздничной программы |
| **heating.circuits.X.operating.programs.normal** | | | |
| | | `targetTemperature` (число, мин: 3, макс: 37, степпинг: 1) | требуется |
| | | `targetTempera` (число, мин: 3, макс: 37, шаг: 1) | требуется |
| **heating.circuits.X.operating.programs.reduced** | | | |
| | | `targetTemperature` (число, мин: 3, макс: 37, степпинг: 1) | требуется |
| | | `targetTempera` (число, мин: 3, макс: 37, шаг: 1) | требуется |
| **heating.dhw.oneTimeCharge** | | | |
| | активировать | | Нет полей (отправить пустой объект). Активирует одноразовую зарядку хранения горячей воды. |
| | деактивировать | | Нет полей (отправить пустой объект). Отключает одноразовую зарядку хранения горячей воды. |
| **отопление.двт.температура** | | | |
| | | `temperature` (число, мин: 10, макс: 60, степпинг: 1) | требуется |
| | | `температура` (число, мин: 10, макс: 60, степпинг: 1) | требуется |
| **heating.dhw.schedule** | | | |
| | | `newSchedule` (тип: расписание, см. Ниже, режимы: «включено», по умолчанию: «выключено») | Смотрите описание типа расписания ниже |
| | | `newSchedule` (тип: Расписание, см. ниже, режимы:« включено », по умолчанию:« выключено ») | Смотрите описание типа расписания ниже |

### Тип расписания
В большинстве действий используются простые типы данных (числа, строки). Некоторые действия позволяют настроить расписание. Расписание выглядит так:

```javascript
{
   "mon":[
      {
         "start":"05:30",
         "end":"10:00",
         "mode":"on",
         "position":0
      },
      {
          "start":"11:00",
          "end":"12:30",
          "mode":"on",
          "position":1
      },
      /* ... */
   ],
   "tue":[ /* ... */ ],
   "wed":[ /* ... */ ],
   "thu":[ /* ... */ ],
   "fri":[ /* ... */ ],
   "sat":[ /* ... */ ],
   "sun":[ /* ... */ ]
}
```

Для каждого дня должен быть предоставлен массив, содержащий «расписания» на этот день. Одна запись состоит из времени начала и окончания, запланированного «режима» и позиции. Поддерживаемые режимы зависят от того, что запланировано, см. Таблицу поддерживаемых функций выше. За пределами запланированных элементов используется режим по умолчанию, см. Таблицу выше. В приведенном выше примере запланировано, что что-то будет «включено» в понедельник с 5:30 до 10:00 и с 11:00 до 12:30. За пределами этих временных интервалов запланирован режим по умолчанию («выкл.»).

### Запрос всех функций
Чтобы получить список всех доступных функций со всеми доступными действиями, просто отправьте сообщение `describe` запущенному экземпляру адаптера. Результатом является массив всех доступных функций, которые, например, могут быть напечатаны в виде строки JSON через `JSON.stringify()`.

*Пример:*

```javascript
sendTo('viessmannapi.0', 'describe', {}, (result) => {
    const features = JSON.stringify(result.result);
    log(features);
});
```

Этот скрипт запрашивает все доступные функции и выводит их в журнал.

## Заметки
- Этот adpater находится на ранней стадии разработки! Ожидайте ошибки и не стесняйтесь сообщать об ошибках здесь, на github (https://github.com/thovid/ioBroker.viessmannapi/issues ").

## Legal
- Viessmann и Vitoconnect являются зарегистрированными товарными знаками Viessmann Werke GmbH & Co. KG.

- Этот проект является частным проектом и *не* официально поддерживается или одобрен Viessmann Werke GmbH & Co. KG, используйте на свой страх и риск

- Если у вас есть какие-либо вопросы, пожалуйста, свяжитесь со мной через GitHub!

## Changelog
### 1.3.2 (2019/02/10)
* (thovid) Fixed a bug preventing the adapter to start
### 1.3.1 (2019/02/05)
* (thovid) reduced package size by removing unused stuff
### 1.3.0 (2019/02/05)
* (thovid) impoved action execution: validation of payload improved, schedule payload now supported
* (thovid) added support for compact mode
* (thovid) added configuration for poll interval
### 1.2.0 (2018/12/18)
* (thovid) added experimental support to execute actions on a feature via the `sendTo` function
### 1.1.2 (2018/12/10)
* (thovid) fixed bug that prevented email and password to be removed after initial authentication 
### 1.1.1 (2018/12/10)
* (thovid) fixed a bug that prevented certain properties from beeing exposed as states (for example `heating.burner`)
### 1.1.0 (2018/12/10)
* (thovid) Deletes email and password after sucessful connection, further connections are done via refresh token
* (thovid) Uses npm released version of client lib, so no longer requires git upon installation
### 1.0.0 (2018/12/07)
* (thovid) Initial adapter

## License
The MIT License (MIT)

Copyright (c) 2018 Thomas Vidic

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