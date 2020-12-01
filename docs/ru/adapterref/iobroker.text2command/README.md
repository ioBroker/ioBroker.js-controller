---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.text2command/README.md
title: ioBroker.text2command
hash: EJKyI8ZO0IeFIyxLvHk2Zt/zsWCaU+vR7TAxE2A0oaI=
---
![Логотип](../../../en/adapterref/iobroker.text2command/admin/text2command.png)

![Количество установок](http://iobroker.live/badges/text2command-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.text2command.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.text2command.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.text2command.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.text2command.png?downloads=true)

# IoBroker.text2command
## Описание
Этот адаптер может преобразовывать обычные предложения, такие как *'Включить свет на кухне'* в определенную команду и устанавливать для состояния *'adapter.0.device.kitchenLight'* значение **true**

Этот адаптер нет смысла активировать отдельно. Его следует использовать с другими адаптерами, такими как Telegram или Android-приложение **iobroker.vis**

## Применение
Чтобы выполнить команду, напишите состояние **text2command. <INSTANCE> .text** с предложением. Вы всегда получите ответ в **text2command. <INSTANCE> .response**

Если вы определите **Ответ на ID** ответ будет записан и в этом ID. Это необходимо, например, для чтобы понять голос подтверждает.

Вы можете отправить сообщение через `sendTo` из javascript. Ответ придет в ответном сообщении:

```
sendTo('text2command', 'Switch light in kitchen on', function (err, response) {
    console.log('Response is: ' + response);
});
```

Можно использовать регулярные выражения, например: ```/^light\son|^lamp\son/```. Регулярные выражения всегда нечувствительны к регистру.

Для использования «Включение / выключение по функции» следует позаботиться о функциях.

Ключевые слова работают следующим образом:

- ключевые слова разделены пробелом
- все ключевые слова должны присутствовать в предложении, чтобы сработало правило: например, ключевое слово: `` свет горит '' срабатывает по `` включить свет '', `` зажигать повсюду`` и не срабатывать по `` включить '', `` сделать свет ''.
- одно ключевое слово может иметь много форм. Варианты ключевого слова должны быть разделены знаком "/". Например. ключевые слова: `` включить / сделать / включить свет / истина`` будет срабатывать: `` сделать свет истинным``, `` сделать, пожалуйста, зажгите``.
- если ключевое слово может присутствовать во многих падежах (ном, род, винительный падеж, множественное число, ...), все они должны быть указаны как варианты, например: `` включить свет / свет ''.

Следующие функции будут интерпретироваться как

enum.functions:

** enum.functions.light ** (Licht | Свет):

- роли - диммер уровня
- роли - switch.light

** enum.functions.backlight ** (Beleuchtung | Подсветка):

- роли - level.backlight
- роли - switch.backlight

** enum.functions.blinds / shutter ** (Rolladen | Жалюзи / окна)

- роли - level.blind
- роли - switch.blind

** enum.functions.curtain ** (Vorhänge | Шторы)

- роли - level.curtain
- роли - switch.curtain

** enum.functions.heating ** (Heizung | Отопление / Подогрев)

- роли - уровень. температура
- роли - переключатель. температура

** enum.functions.music ** (Музыка | Музыка)

- роли - button.play
- роли - button.stop / button.pause

** enum.functions.alarm / security ** (Alarmanlage / Alarm | Охрана)

- роли - switch.security

** enum.functions.lock ** (Schloß / Schloss | Замок)

- роли - switch.open
- роли - switch.lock

Поддерживаются следующие комнаты:

| ключевое слово во фразе | Возможные enum.rooms на английском языке | на немецком языке | на русском |
|-----------------------|---------------------------------|--------------------------|------------------------|
| везде | везде | - | - |
| живущий | гостиная | wohnzimmer | зал |
| спальня | спальня / спальня | schlafzimmer | спальня |
| ванна | ванная / ванна | бадезиммер / плохой | ванная |
| рабочий / офис | офис | arbeitszimmer | кабинет |
| дети / ребенок / ясли | питомник | детский сад | детская |
| туалет / гостевой туалет | guestwc | gästewc | гостевой туалет |
| туалет / шкаф | туалет | туалет | туалет |
| этаж / вход | этаж | диель / ганг / флур | коридор / прихожая |
| кухня | кухня | куче / куче | кухня |
| балкон / терраса / патио | терраса | балкон / терраса | терасса / балкон |
| столовая | столовая | эссзиммер | столовая |
| гараж | гараж | гараж | гараж |
| лестница | лестница | трепе / треппенхаус | лестница |
| сад | сад | сад | сад |
| двор / двор | суд | хоф | двор |
| гостевая комната | гостевая комната | gästezimmer | гостевая |
| чердак | чердак | Speicher | кладовка |
| крыша | крыша | dachstuhl | крыша |
| терминал | терминал | аншлюссраум | сени |
| умывальник | туалет | waschraum | прачечная |
| отопление | теплая | обогреватель / heizungsraum | котельная |
| лачуга | лачуга | schuppen / scheune | сарай |
| летний домик | беседка | садовый дом | теплица |

Вы можете использовать шаблоны в подтверждениях:

- %s : значение
-% u: блок
-% n: имя (планируется!)
- {objectId}: здесь будет помещено состояние этого objectID

Поддерживаются следующие команды:

### Который сейчас час?
Ответ: 14:56 (текущее время)

### Как Вас зовут?
Ответ настраиваемый. По умолчанию: ```My name is Alpha```

### Какая наружная температура?
Пользователь должен указать ID состояния, где читать наружную температуру.
Ответ настраиваемый. По умолчанию: ```Outside temperature is %s %u``` **%s** будет заменено температурой, округленной до целого числа. **u** будет заменен на единицы измерения этого состояния или единицы измерения температуры системы.

### Какая внутри температура?
Пользователь должен указать ID состояния, где читать внутреннюю температуру.
Ответ настраиваемый. По умолчанию: ```Inside temperature is %s %u``` **%s** будет заменено температурой, округленной до целого числа. **u** будет заменен на единицы измерения этого состояния или единицы измерения температуры системы.

### Включение / выключение по функции
Эта команда считывает информацию из перечислений. Он использует **enum.functions** для поиска типа устройства (например, свет, будильник, музыка) и **enum.rooms** для определения названия комнаты.

Пример на немецком языке: ![Перечисления](../../../en/adapterref/iobroker.text2command/img/enums.png)

Ключевые слова для включения: *включить* например ```switch rear light in bath on```

Ключевые слова для выключения: *выключить* например ```switch light in living room off```

При желании автоматически будет сгенерирован ответ: ```Switch off %function% in %room%```, где% function% и% room% будут заменены на тип и местоположение найденного устройства.

Команда также принимает числовое значение. Он имеет приоритет, например в команде ```switch light off in living room on 15%``` свет будет установлен на 15%, а не в состоянии *выключено*

Вы можете определить комнату по умолчанию в []. Например, ```switch the light on[sleepingroom]```

### Открытие / закрытие жалюзи
Эта команда считывает информацию из перечислений. Он использует **enum.functions.blind** для поиска типа жалюзи или ставни и **enum.rooms** для определения имени комнаты.

Ключевые слова для поднятия блайндов: *блайнды вверх* например ```set blinds up in sleeping room```

Ключевые слова для опускания блайндов: *блайнды вниз* например ```move blinds down in office```

Вы можете указать точное положение блайнда в процентах, например ```move blinds to 40 percent in office```

При желании автоматически будет сгенерирован ответ: ``` in %room%```, где% room% будет заменено на тип и местоположение найденного устройства.

### Включить / выключить что-нибудь
Пользователь должен указать ID состояния устройства, которым необходимо управлять, и значение, которое необходимо записать.

Вы должны создать правило для каждой позиции (например, для *on* и для *off* .

Ответ настраиваемый. По умолчанию: ```Switched on```

Например.:

- `` Деактивировать тревогу``, ID объекта: `` hm-rpc.0.alarm``, Значение: `` false``, Ответ: `` Тревога деактивирована / Деактивирована`` . В этом случае ответ будет рандомизирован между *Тревога деактивирована* и *Деактивирована*
- `` Активировать тревогу``, ID объекта: `` hm-rpc.0.alarm``, Значение: `` true``, Ответ: `` Тревога активирована / Активирована / Готово` ``. В этом случае ответ будет рандомизирован между *Тревога активирована* *Активирована* и *Готово*

* Деактивировать * должен быть первым в списке, потому что он длиннее.

В управляющих командах можно использовать значения с плавающей запятой. Если в тексте будет какое-то числовое значение, оно будет использоваться как контрольное значение, а предопределенное значение будет проигнорировано.

НАПРИМЕР. для правила для правила:

- `` Установить уровень освещенности '', ID объекта: `` hm-rpc.0.light.STATE '', значение: `` 10 '', ответ: `` Уровень установлен на %s  % ``.

Если команда похожа на ```Set light level to 50%```, то в ```hm-rpc.0.light.STATE``` будет написано 50 и ответ будет ```Level set to 50%```.

Если команда похожа на ```Set light level```, то в ```hm-rpc.0.light.STATE``` будет написано 10 и ответ будет ```Level set to 10%```.

### Спросите о чем-нибудь
Пользователь должен указать ID состояния устройства, значение которого будет считываться.
Этот шаблон ответит информацией из некоторого состояния.

Например.:

- `` окна открыты '', ID объекта: `` javascript.0.countOpenedWindows``, Подтверждение: `` Фактические %s  окна открыты``
- `` температура в спальне '', ID объекта: `` hm-rpc.0.sleepingRoomSensor.TEMPERATURE '', Подтвердите: `` Фактическая температура в спальне %s % u /% s% u ``. В этом случае ответ будет рандомизирован между *Фактическая температура в спальне% s% u* и *s% u*

### Отправить текст в состояние
Вы можете ввести текст в состояние. Пользователь должен указать идентификатор состояния, чтобы написать в него текст.

Например. правило: ```email [to] wife```, ID объекта: ```javascript.0.emailToWife```, Подтверждение: ```Email sent``` Текст: *Отправить электронное письмо моей жене: я опоздаю* Адаптер ищет последнее слово из ключевых слов (в данном случае *жена* , извлекает текст из следующего слова (в данном случае *я опоздаю* и записывает этот текст в *javascript.0.emailToWife* Слова с *по* не требуются для срабатывания правила, но будут удалены из текста.

### Ты молодец (просто для удовольствия)
Ответ настраиваемый. По умолчанию: ```Thank you``` или ```You are welcome```

### Спасибо (просто для удовольствия)
Ответ настраиваемый. По умолчанию: ```No problem``` или ```You are welcome```

### Создать ответ
Вы можете сгенерировать ответ с привязкой {objectId} в подтверждении. Используется для alexa.

Например.:

- `` windows open '', подтверждение: `` актуальные {javascript.0.countOpenedWindows} окна открыты``
- `` температура в спальне '', Подтвердите: `` Фактическая температура в спальне равна {t: hm-rpc.0.sleepingRoomSensor.TEMPERATURE; Math.round (t)} / {hm-rpc.0.sleepingRoomSensor.TEMPERATURE; раунд (1)} степень ''. В этом случае ответ будет рандомизирован между *Фактическая температура в спальне <VALUE>* и *<VALUE>*

Вы можете узнать больше о привязках здесь: (Привязки объектов) [https://github.com/ioBroker/ioBroker.vis#bindings-of-objects]

Дополнительно вы можете получить время до настоящего момента с помощью {hm-rpc.0.light.STATE.lc; dateinterval} (2 минуты 12 секунд) или {hm-rpc.0.light.STATE.lc; dateinterval (true)} ( 2 минуты 12 секунд **назад**

## Внешние правила с javascript
Есть возможность использовать движок javascript для обработки команд в text2command.
Для этого вы должны указать какое-то состояние в «ID состояния процессора» (Дополнительные настройки) и прослушивать это состояние в каком-нибудь JS или Blockly скрипте.
Вы можете создать какое-то состояние вручную в админке или в скрипте. Скрипт обработки может выглядеть так:

```
createState("textProcessor", '', function () {
    // text2command writes the value with ack=false. Change "any" is important too, to process repeated commands.
    on({id: "javascript.0.textProcessor", ack: false, change: 'any'}, function (obj) {
         var task = JSON.parse(obj.state.val);
         // value looks like
         // {
         //     "command":      "text to process", // command that was received by text2command
         //     "language":     "en",              // language in command or system language
         //     "withLanguage": false              // indicator if language was defined in command (true) or used default language (false)
         // }
         // response to text2command with ack=true
         if (task.command === 'switch light on') {
            setState("hm-rpc.0.light", true);
            setState("javascript.0.textProcessor", 'light is on', true);
         } else {
            // let it process with predefined rules
            setState("javascript.0.textProcessor", '', true);
         }
    });
});
```

Задайте в настройках text2command **ID состояния процессора** как *javascript.0.textProcessor* чтобы этот пример работал.

Сначала команда будет обработана вашим javascript, и если javascript ответит "" или не ответит в заранее определенное время (1 секунда по умолчанию), команда будет обработана по правилам.

### Вариант: писать в ответ каждой командой
Если это активировано каждой командой (независимо от того, пришел ли запрос через состояние или sendTo), `text2command.X.response` будут записаны с ответом.

# Делать
- на русском языке мужские и женские ответы.

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Prevent crash case (Sentry IOBROKER-TEXT2COMMAND-D, IOBROKER-TEXT2COMMAND-C)

### 2.0.5 (2020-09-5)
* (bluefox) Updated the select ID dialog.

### 2.0.3 (2020-07-14)
* (bluefox) Fixed GUI errors

### 2.0.2 (2020-07-13)
* (bluefox) Fixed GUI errors

### 2.0.1 (2020-07-08)
* (bluefox) Fixed select ID dialog

### 2.0.0 (2020-07-06)
* (bluefox) New GUI

### 1.3.1 (2019-07-18)
* (unltdnetworx) changed copyright year to 2019, according to issue #41
* (unltdnetworx) additional words for blinds and functions in english and german
* (unltdnetworx) fixed typo

### 1.3.0 (2019-07-18)
* (bluefox) Using the defined language by words

### 1.2.5 (2019-02-12)
* (unltdnetworx) description in german corrected
* (unltdnetworx) added percent to true/false rules

### 1.2.4 (2018-05-05)
* (Apollon77) Fix

### 1.2.3 (2018-05-01)
* (bluefox) Support of bindings in answer {objId}

### 1.2.0 (2018-04-23)
* (bluefox) Support of Admin3 (but not materialize style)

### 1.1.7 (2018-04-04)
* (bluefox) The parsing error was fixed

### 1.1.6 (2017-10-05)
* (bluefox) Check if units are undefined

### 1.1.5 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 1.1.4 (2017-03-27)
* (bluefox) translations

### 1.1.3 (2016-08-30)
* (bluefox) russian translations

### 1.1.2 (2016-08-29)
* (bluefox) fix the russian temperature text
* (bluefox) extend rule "control device" with option 0/1
* (bluefox) use by control of devices min/max values if set

### 1.1.1 (2016-08-19)
* (bluefox) add additional info for external text processor

### 1.1.0 (2016-08-16)
* (bluefox) add text processor state ID

### 1.0.2 (2016-07-22)
* (bluefox) fix error with detection of numeric values

### 1.0.1 (2016-06-01)
* (bluefox) fix: send text command

### 1.0.0 (2016-05-05)
* (bluefox) replace special chars in input text: #'"$&/\!?.,;:(){}^

### 0.1.10 (2016-03-20)
* (bluefox) fix double pronunciation of some answers

### 0.1.9 (2016-03-20)
* (bluefox) ignore spaces

### 0.1.8 (2016-03-15)
* (bluefox) fix error with enums

### 0.1.7 (2016-03-12)
* (bluefox) implement "say something"

### 0.1.6 (2016-02-24)
* (bluefox) fix temperature

### 0.1.5 (2016-02-23)
* (bluefox) fix russian outputs

### 0.1.4 (2016-02-22)
* (bluefox) fix russian outputs

### 0.1.3 (2016-02-21)

* (bluefox) round temperature in answers

### 0.1.2 (2016-02-21)
* (bluefox) implement russian time

### 0.1.1 (2016-02-19)
* (bluefox) check invalid commands

### 0.1.0 (2016-02-19)
* (bluefox) fix problem with controlling of channels
* (bluefox) enable write JSON as argument

### 0.0.3 (2016-02-14)
* (bluefox) remove unused files

### 0.0.2 (2016-02-10)
* (bluefox) extend readme

### 0.0.1 (2016-02-09)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

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