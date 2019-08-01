---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.iot/README.md
title: ioBroker IoT адаптер
hash: gi1jrml4CUm7XcuVnQ/8DKvQ7P1q6GrV+U56CoZ4EuQ=
---
![логотип](../../../en/adapterref/iobroker.iot/admin/iot.png)

![Количество установок](http://iobroker.live/badges/iot-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.iot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.iot.svg)
![NPM](https://nodei.co/npm/iobroker.iot.png?downloads=true)

# IoBroker IoT Adapter
Этот адаптер предназначен ТОЛЬКО для связи с Amazon Alexa.
Это не для удаленного доступа к вашему экземпляру ioBroker. Для этого используйте адаптер ioBroker.cloud.

## Настройки
Для использования облачного адаптера вы должны сначала зарегистрироваться в облаке ioBroker [https://iobroker.pro](https://iobroker.pro).

![вступление](../../../en/adapterref/iobroker.iot/img/intro.png)

### Язык
Если вы выберете язык по умолчанию, интеллектуальные имена устройств и перечислений не будут переведены. Если в каком-либо языке указано, все известные имена будут переведены на этот язык.
Это сделано для быстрого переключения между многими языками в демонстрационных целях.

### Сначала поместите функцию в имена
Измените порядок функций и ролей в собственных именах:

- если false: «Функция комнаты», например, "Гостиная диммер"
- если истина: «Функциональная комната», например, "Диммер гостиная"

### Объединить слова с
Вы можете определить слово, которое будет помещено между функцией и комнатой. Например. «в» и из «Диммер гостиной» будет «Диммер в гостиной».

Но делать это не рекомендуется, потому что механизм распознавания должен проанализировать еще одно слово, и это может привести к недоразумениям.

### ВЫКЛ уровень для переключателей
Некоторые группы состоят из смешанных устройств: диммеры и выключатели. Управлять ими можно с помощью команд «ВКЛ» и «ВЫКЛ» и с процентами.
Если команда «Установить на 30%» и * ВЫКЛ. Уровень «30%», то переключатели будут включены. По команде «Установите на 25%» все переключатели будут выключены.

Кроме того, если команда «ВЫКЛ», адаптер запоминает текущий уровень диммера, если фактическое значение превышает или равно «30%».
Позже, когда придет новая команда «ON», адаптер переключит диммер не на 100%, а на уровень в памяти.

Пример:

- Предположим, что *уровень ВЫКЛ* составляет 30%.
- Виртуальное устройство «Свет» имеет два физических устройства: *переключатель* и *диммер*
- Команда: «установить свет на 40%». Адаптер запомнит это значение для *dimmer* установит его для "dimmer" и включит переключатель *ON*
- Команда: «выключить свет». Адаптер установит *диммер* на 0% и выключит *переключатель*
- Команда: «Включить свет». *диммер* => 40%, *переключатель* => ВКЛ.
- Команда: «установить свет на 20%». *диммер* => 20%, *переключатель* => ВЫКЛ. Значение для диммера не будет запомнено, потому что оно ниже *OFF level*
- Команда: «Включить свет». *диммер* => 40%, *переключатель* => ВКЛ.

### ON
Вы можете выбрать поведение команды ON придет для состояния номера. Можно выбрать конкретное значение или использовать последнее ненулевое значение.

### Написать ответ на
Для каждой команды будет сгенерирован текстовый ответ. Здесь вы можете определить Идентификатор объекта, в который должен быть записан этот текст. Например. *Sayit.0.tts.text*

### Цвета
Только сейчас только английский alexa поддерживает управление цветом.
Канал должен иметь 4 состояния со следующими ролями:

- level.color.saturation (требуется для обнаружения канала),
- level.color.hue,
- level.dimmer,
- переключатель (опционально)

```
Alexa, set the "device name" to "color"
Alexa, turn the light fuschia
Alexa, set the bedroom light to red
Alexa, change the kitchen to the color chocolate
```

### Замок
Чтобы иметь возможность блокировать блокировки, состояние должно иметь роль «switch.lock» и иметь native.LOCK_VALUE для определения состояния блокировки.

```
Alexa, is "lock name" locked/unlocked
Alexa, lock the "lock name"
```

## Как будут генерироваться имена
Адаптер пытается создать виртуальные устройства для управления умным домом (например, Amazon Alexa или Google Home).

Для этого есть два важных перечисления: комнаты и функции.

Комнаты похожи: гостиная, ванная комната, спальня.
Функции как: свет, слепой, отопление.

Следующие условия должны быть выполнены, чтобы получить состояние в автоматически сгенерированном списке:

- состояние должно быть в некотором «функциональном» перечислении.
- состояние должно иметь роль («состояние», «переключатель» или «уровень. *», например, level.dimmer), если оно не включено непосредственно в «функции».

Может быть так, что канал находится в «функциях», но сам по себе нет.

- состояние должно быть доступно для записи: common.write = true
- государственный диммер должен иметь общий тип в качестве «числа»
- состояние нагрева должно иметь общий блок в виде «°C», «°F» или «° K» и общий тип в виде «числа»

Если состояние находится только в «функциях», а не в «комнате», будет использоваться название состояния.

Имена состояний будут генерироваться из функции и комнаты. Например. все *огни* в *гостиной* будут собраны в виртуальном устройстве *свет в гостиной* Пользователь не может изменить это имя, потому что оно генерируется автоматически.
Но если имя перечисления изменится, это имя тоже будет изменено. (например, функция «свет» изменилась на «свет», поэтому *свет в гостиной* будет изменен на *свет в гостиной*

Все правила будут игнорироваться, если состояние имеет общее.smartName. В этом случае будет использоваться только умное имя.

если *common.smartName* равно **false** состояние или перечисление не будут включены в генерацию списка.

Диалог конфигурации позволяет удобно удалять и добавлять отдельные состояния в виртуальные группы или как одно устройство.
![конфигурация](../../../en/adapterref/iobroker.iot/img/configuration.png)

Если группа имеет только одно состояние, она может быть переименована, так как для этого будет использоваться smartName состояния.
Если группа имеет более одного состояния, группа должна быть переименована через имена перечисления.

Для создания собственных групп пользователь может установить адаптер «сцены» или создать «скрипт» в адаптере Javascript.

### Заменяет
Вы можете указать строки, которые могут быть автоматически заменены в именах устройств. Например, если вы установите заменить на:

```.STATE,.LEVEL```, so all ".STATE" and ".LEVEL" will be deleted from names. Be careful with spaces.
If you will set ```.STATE, .LEVEL```, so ".STATE" and " .LEVEL" will be replaced and not ".LEVEL".

## Helper states
- **smart.lastObjectID**: This state will be set if only one device was controlled by home skill (alexa, google home).
- **smart.lastFunction**: Function name (if exists) for which last command was executed.
- **smart.lastRoom**:     Room name (if exists) for which last command was executed.
- **smart.lastCommand**:  Last executed command. Command can be: true(ON), false(OFF), number(%), -X(decrease at x), +X(increase at X)
- **smart.lastResponse**: Textual response on command. It can be sent to some text2speech (sayit) engine.

## IFTTT
[instructions](doc/ifttt.md)

## Services
There is a possibility to send messages to cloud adapter.
If you call ```[POST]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>``` und value as payload.

```

curl --data "myString" https://service.iobroker.in/v1/iotService?service=custom_ <NAME> & key = <XXX> & user = <USER_EMAIL>

```

or

```[GET]https://service.iobroker.in/v1/iotService?service=custom_<NAME>&key=<XXX>&user=<USER_EMAIL>&data=myString```

Если вы зададите в настройках для поля «Белый список служб» имя *custom_test* и вызовете с именем «custom_test» в качестве имени службы, состояние **cloud.0.services.custom_test** будет установлено на *myString*

Вы можете написать «*» в белом списке, и все услуги будут разрешены.

Здесь вы можете найти инструкции, как использовать его с [Tasker](doc/tasker.md).

Услуга IFTTT разрешена, только если установлен ключ IFTTT.

Зарезервированные имена: «ifttt», «text2command», «simpleApi», «swagger». Они должны использоваться без префикса ```"custom_"```.

### Text2command
Вы можете написать «text2command» в белый список, вы можете отправить запрос POST в ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>``` для записи данных в переменную *text2command.X.text*

Вы также можете использовать метод GET ```https://service.iobroker.in/v1/iotService?service=text2command&key=<user-app-key>&user=<USER_EMAIL>&data=<MY COMMAND>```

«X» можно определить в настройках с помощью параметра «Использовать экземпляр text2command».

## Custom skill
Ответы на пользовательский навык могут быть обработаны двумя способами:

- text2command
- JavaScript

### Text2command
если в диалоге конфигурации определен *text2command* instance, то вопрос будет отправлен к экземпляру.

* text2command * должен быть настроен так, что ожидаемая фраза будет проанализирована и ответ будет возвращен.

### Javascript
Есть возможность обработать вопрос напрямую скриптом. Он активируется по умолчанию, если не выбран экземпляр *text2command*

Если экземпляр *text2command* определен, то этот экземпляр должен предоставить ответ, и ответ от *script* будет проигнорирован.

Адаптер предоставит детали в двух состояниях с разным уровнем детализации.

* **smart.lastCommand** содержит полученный текст, включая информацию о типе запроса (намерении). Пример: "askDevice Status Rasenmäher"
* ** smart.lastCommandObj *** содержит строку JSON, которую можно проанализировать для объекта, содержащего следующую информацию
 * **words** содержит полученные слова в массиве
 * **intent** содержит тип запроса. В настоящее время возможны следующие значения: «askDevice», «controlDevice», «actionStart», «actionEnd», «askWhen», «askWhere», «askWho»
 * **deviceId** содержит идентификатор устройства, идентифицирующий устройство, на которое был отправлен запрос, доставленный Amazon, будет пустой строкой, если не предоставлено
 * **sessionId** содержит sessionId сеанса Skill, должен быть одинаковым, если было произнесено несколько команд, доставленных Amazon, будет пустой строкой, если не предоставлено
 * **userId** содержит идентификатор пользователя от владельца устройства (или, возможно, позже пользователя, который взаимодействовал со скиллом), предоставленный Amazon, будет пустой строкой, если не указан

 Подробнее о том, как слова обнаруживаются и какие типы запросов различает пользовательский навык Alexa, см. На странице https://forum.iobroker.net/viewtopic.php?f=37&t=17452.

** Вернуть результат через состояние smart.lastResponse **

Ответ должен быть отправлен в течение 200 мс в состоянии «smart.lastResponse» и может быть простой текстовой строкой или объектом JSON.
Если это текстовая строка, то этот текст будет отправлен в ответ на умение.
если текст является объектом JSON, то можно использовать следующие ключи:

* **responseText** должен содержать текст для возврата в Amazon
* **shouldEndSession** является логическим значением и контролирует, будет ли сеанс закрыт после разговора или остается открытым, чтобы принять другой голосовой ввод.

** Вернуть результат через сообщение в iot экземпляр **

Экземпляр iot также принимает сообщение с именем «alexaCustomResponse», содержащее ключ «response» с объектом, который может содержать ключи **responseText** и **shouldEndSession** как описано выше.
Там не будет никакого ответа от экземпляра iot на сообщение!

** Пример скрипта, который использует тексты **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommand', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    setState('iot.0.smart.lastResponse', 'Received phrase is: ' + obj.state.val); // important, that ack=false (default)
});
```

** Пример скрипта, который использует объекты JSON **

```
// important, that ack=true
on({id: 'iot.0.smart.lastCommandObj', ack: true, change: 'any'}, obj => {
    // you have 200ms to prepare the answer and to write it into iot.X.smart.lastResponse
    const request = JSON.parse(obj.state.val);
    const response = {
        'responseText': 'Received phrase is: ' + request.words.join(' ') + '. Bye',
        'shouldEndSession': true
    };

    // Return response via state
    setState('iot.0.smart.lastResponse', JSON.stringify(response)); // important, that ack=false (default)

    // or alternatively return as message
    sendTo('iot.0', response);
});
```

### Частное облако
Если вы используете личное умение / действие / навык для общения с `Alexa/Google Home/Алиса`, то у вас есть возможность использовать экземпляр IoT для обработки запросов от него.

Например. для `yandex alice`:

```
const OBJECT_FROM_ALISA_SERVICE = {}; // object from alisa service or empty object
OBJECT_FROM_ALISA_SERVICE.alisa = '/path/v1.0/user/devices'; // called URL, 'path' could be any text, but it must be there
sendTo('iot.0', 'private', {type: 'alisa', request: OBJECT_FROM_ALISA_SERVICE}, response => {
    // Send this response back to alisa service
    console.log(JSON.stringify(response));
});
```

Поддерживаются следующие типы:

- `alexa` - действие с Amazon Alexa или Amazon Custom Skill
- `ghome` - действие с действиями Google через Google Home
- `Алиса` - действует с Яндексом Алиса
- `ifttt` - действует как IFTTT (на самом деле не требуется, но для целей тестирования)

## Changelog
### 1.0.3 (2019-07-30)
* (bluefox) Fixed language issues for google home and yandex alice

### 1.0.1 (2019-07-26)
* (bluefox) Support of private skills/actions was added.

### 1.0.0 (2019-07-14)
* (TA2k) Google Home list was added 

### 0.5.0 (2019-06-29)
* (bluefox) tried to add yandex Alisa 

### 0.4.3 (2019-04-14)
* (Apollon77) Change enable/disable of Amazon Alexa and of Google Home from configuration to be really "active if selected". 

### 0.4.2 (2019-03-10)
* (bluefox) Allowed the enable and disable of Amazon Alexa and of Google Home from configuration. 

### 0.4.1 (2019-02-19)
* (bluefox) Add version check to google home

### 0.3.1 (2019-01-13)
* (bluefox) Blockly was fixed

### 0.3.0 (2018-12-30)
* (bluefox) Detection of google devices was fixed

### 0.2.2 (2018-12-21)
* (bluefox) Generation of new URL key was added

### 0.2.0 (2018-12-18)
* (bluefox) Change the name of adapter

### 0.1.8 (2018-10-21)
* (bluefox) Added extended diagnostics

### 0.1.7 (2018-10-14)
* (bluefox) The configuration dialog was corrected
* (bluefox) The possibility to create the answer with script for the custom skill was implemented.

### 0.1.4 (2018-09-26)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2109 bluefox <dogafox@gmail.com>

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