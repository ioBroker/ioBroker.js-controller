---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objetctsschema.md
title: Основная концепция
hash: +IiUhViJwTVu/ux3jUbrAkvLZtYImrDNIKJFW4Cv1zA=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных. Так называемые **состояния** (`states`) и **объекты**

Объекты представляют редко изменяющиеся и большие данные, такие как метаданные устройств вашей системы, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». Ниже приведена дополнительная информация о том, какие типы объектов доступны и какие обязательные атрибуты необходимы объекту определенного типа. Такие функции, как setObject, getObject, ... предоставляются вам модулем адаптера.

Состояния представляют собой часто изменяющиеся данные в вашей системе, например, например. если лампа включена или выключена, если детектор движения обнаружил какое-либо движение, температуру вашей гостиной или нажатие кнопки пульта дистанционного управления. В противоположность объектам состояния могут использоваться для запуска действий, а состояния могут создавать данные истории. Для работы с состояниями в модуле адаптера есть несколько функций, таких как setState, getState и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

Следующие главы описывают схему базы данных.

## Идентификаторы
ID - это строка длиной до 240 байт, иерархически структурированная, уровни разделены точками.

Следующие символы запрещены для использования в идентификаторах: `[]*,;'"&#96;<>\\?`.

Также не рекомендуется использовать `^$()/`.

Идентификатор имеет разные уровни. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- **system** - пространство имен для системных объектов
- **адаптер** - пространство имен для конфигураций адаптера
- **admin** - имя адаптера
- **0** - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- **hm-rpc** - это имя адаптера
- **1** - экземпляр адаптера
- **ABC110022** - адрес устройства
- **2** - название канала
- **VALUE** - название государства

## Пространства имен
* система. - Системные объекты и состояния
* system.host. - Контроллер процессов
* system.config. - Системные настройки, такие как язык по умолчанию
* system.meta. - Системные метаданные
* system.user. - Пользователи
* system.group. - группы
* system.adapter. & lt; имя-адаптера & gt; - конфигурация адаптера по умолчанию
* & lt; имя-адаптера & gt; - объекты, содержащие вложения, доступные через http:// & lt; couch & gt;: 5984 / iobroker / & lt; имя-адаптера & gt; / path
* & lt; имя-адаптера & gt; .meta. - общие метаданные, используемые всеми экземплярами этого адаптера
* & lt; имя-адаптера & gt;. & lt; номер-экземпляра & gt ;. - Пространство имен экземпляра адаптера
* enum. - Перечни
* история. - История данных
* скрипты. - Скрипты движка скриптов
* scripts.js. - Скрипты движка JavaScript
* scripts.py. - Сценарии Python Engine Script (будущее)

### Пространство имен system.config.
```
{
    _id:   id,
    type: 'config',
    common: {
        language:     'en',         // Default language for adapters. Adapters can use different values.
        tempUnit:     '°C',         // Default temperature units.
        currency:     '€',          // Default currency sign.
        dateFormat:   'DD.MM.YYYY'  // Default date format.
        isFloatComma: true,         // Default float divider ('.' - false, ',' - true)
        "activeRepo": "online1",    // active repository
        "listRepo": {               // list of possible repositories
            "default": "conf/sources-dist.json",
            "online1": "https://raw.githubusercontent.com/ioBroker/ioBroker.nodejs/master/conf/sources-dist.json"
        }
    }
}
```

### Пространство имен system.host. & Lt; hostname & gt;
```
{
    _id:   id,
    type: 'host',
    common: {
        name:       id,
        process:    title,           // iobroker.ctrl
        version:    version,         // Vx.xx.xx
        platform:   'javascript/Node.js',
        cmd:        process.argv[0] + ' ' + process.execArgv.join(' ') + ' ' + process.argv.slice(1).join(' '),
        hostname:   hostname,
        address:    ipArr,
        defaultIP:  ???
    },
    native: {
        process: {
            title:      process.title,
            pid:        process.pid,
            versions:   process.versions,
            env:        process.env
        },
        os: {
            hostname:   hostname,
            type:       os.type(),
            platform:   os.platform(),
            arch:       os.arch(),
            release:    os.release(),
            uptime:     os.uptime(),
            endianness: os.endianness(),
            tmpdir:     os.tmpdir()
        },
        hardware: {
            cpus:       os.cpus(),
            totalmem:   os.totalmem(),
            networkInterfaces: os.networkInterfaces()
        }
    }
};
```

## Состояния
Метод getState и событие stateChange доставляют объект со всеми атрибутами, кроме expire.

для метода `setState` все, кроме `val` является необязательным, `from` устанавливается автоматически методом `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` установлены, как ожидается

атрибуты для объекта getState / stateChange / setState:

* `val` - фактическое значение - может быть любого типа, который является JSON-" кодируемым "
* `ack` - логический флаг, указывающий, подтвердило ли целевая система значение
* `ts` - метка времени Unix, указывающая последнее обновление состояния
* `lc` - метка времени Unix, указывающая последнее изменение фактического значения состояния
* `from` - экземпляр адаптера, который сделал` setState`
* `user` - имя пользователя, которое устанавливает значение
* `expire` - целочисленное значение, которое можно использовать для установки состояний, срок действия которых истекает через заданное количество секунд. Может использоваться только с `setValue`. После истечения срока действия значение исчезает из redisDB.
* `q` - качество. Номер со следующими состояниями:

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x40 - 00100000 - substitute value from device or instance
  0x80 - 01000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

Каждое *состояние* должно быть представлено объектом типа состояния, содержащего метаданные для состояния. Увидеть ниже.

## Объекты
### Обязательные атрибуты
Следующие атрибуты должны существовать в каждом объекте:

* `_id`
* `type` - см. ниже возможные значения
* `common` - объект, содержащий свойства абстракции, специфичные для ioBroker
* `native` - объект, содержащий конгруэнтные свойства целевой системы

### Необязательные атрибуты
* `common.name` - название объекта (необязательно, но строго рекомендуется его заполнить)

### Древовидная структура
Древовидная структура собирается автоматически по именам. Например. ```system.adapter.0.admin``` является родителем для `system.adapter.0.admin.uptime`. Используйте это соглашение об имени с точкой ".", Как разделитель уровней.

### Типы объектов
* `state` - родитель должен иметь тип channel, device, instance или host
* `канал` - объект для группировки одного или нескольких состояний. Родитель должен быть устройством.
* `устройство` - объект для группировки одного или нескольких каналов или состояния. Не должно иметь родителя, кроме пространства имен экземпляра адаптера.
* `enum` - объекты, содержащие массив в common.members, который указывает на состояния, каналы, устройства или файлы. перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` - хост, который запускает процесс контроллера
* `adapter` - конфигурация адаптера по умолчанию. Наличие также указывает, что адаптер успешно установлен. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родитель должен быть типа адаптер
* `meta` - редко меняющая метаинформацию, которая нужна адаптеру или его экземплярам
* `config` - настройки
* `script`
* `пользователь`
* `группа`

#### Атрибуты для определенных типов объектов
##### Государственный
атрибуты:

* `common.type` (необязательно - (по умолчанию смешанный == любой тип) (возможные значения: число, строка, логическое значение, массив, объект, смешанный, файл)
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательно - если установлен common.def, это значение используется как флаг ack, js-controller 2.0.0+)
* `common.desc` (необязательно, строка)
* `common.read` (логическое, обязательное) - true, если состояние доступно для чтения
* `common.write` (логическое, обязательное) - true, если состояние доступно для записи
* `common.role` (строка, обязательная) - роль состояния (используется в пользовательских интерфейсах для указания, какой виджет выбрать, см. ниже)
* `common.states` (необязательный) атрибут номера типа с объектом возможных состояний {'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'}
* `common.workingID` (строка, необязательно) - если это состояние имеет вспомогательное состояние WORKING. Здесь должно быть написано полное имя или только последняя часть, если первые части совпадают с фактическими. Используется для HM.LEVEL и обычно имеет значение «РАБОТАЕТ»

##### Штат `common.history`
Для функции истории необходим адаптер истории или любой другой адаптер хранения истории типов

Длина FIFO уменьшается до минимума при достижении максимума. установить на ноль или оставить неопределенным, чтобы использовать значения по умолчанию

список транспортов см. в истории адаптера README.

* `common.history` (необязательно)
* `common.history.HISTORY-INSTANCE.changesOnly` (необязательно, логическое значение, если записано значение true, только изменения регистрируются)
* `common.history.HISTORY-INSTANCE.enabled` (логическое)

##### Штат `common.role`
* `common.role` (указывает, как это состояние должно быть представлено в пользовательских интерфейсах)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
предложение: канал-объекты common.role должен / может подразумевать набор обязательных и / или необязательных состояний-дочерних объектов

возможные значения:

* `info` - курс валюты или акций, цены на топливо, вставка почтовых ящиков и тому подобное
* `календарь` -
* `прогноз` - прогноз погоды

* `media - общий медиа канал
* `media.music` - медиаплеер, вроде SONOS, YAMAHA и т. д.
* `media.tv` - ТВ
* `media.tts` - текст в речь

* `thermo` - контролировать или контролировать температуру, влажность и т. д.
* `thermo.heat`
* `thermo.cool`

* `шторка '- управление жалюзи

* `свет`
* `light.dimmer` - светлый диммер
* `light.switch` - выключатель света.
* `light.color` - управление светом с возможностью изменения цвета
* `light.color.rgb` - установить цвет в RGB
* `light.color.rgbw` - установить цвет в RGBW
* `light.color.hsl` - установка цвета в оттенках / насыщенности / яркости (цветовой тон оттенка - LivingColors ...)
* `light.color.hslct` - установка цвета в оттенках / насыщенности / яркости или цветовой температуре (цветовой оттенок расширенный)
* `light.color.ct` - цветовая температура K

* `switch` - какой-то общий переключатель

* `датчик` - напр. оконный или дверной контакт, датчик протечки воды, датчик пожара
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, заблокировать
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true (тревога), false (без тревоги)
* `sensor.fire` - true (тревога), false (без тревоги)
* `sensor.CO2` - true (тревога), false (без тревоги)

*

* `тревога` - немного тревоги

* `телефон` - фритч бокс, спидпорт и тд

* `button` - как настенный выключатель или пульт ДУ телевизора, где каждая кнопка находится в состоянии .play, .stop, .pause
* `remote` - телевизор или другие пульты с указанием состояния - это строка с нажатыми значениями, например, "PLAY", "STOP", "PAUSE"

* `meta` - информация об устройстве
* `meta.version` - версия устройства
* `meta.config` - настройка с устройства
* ...

#### Описания каналов
~~ Имена атрибутов могут быть свободно определены адаптером, кроме тех, которые написаны шрифтом **bold** ~~

"W" - common.write = true

"М" - обязательно

##### Необязательные состояния для каждого канала / устройства
```javascript
// state-working (optional)
{
   "_id": "adapter.instance.channelName.stateName-working", // e.g. "hm-rpc.0.JEQ0205612:1.WORKING"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.working"     // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-direction (optional). The state can have following states: "up"/"down"/""
{
   "_id": "adapter.instance.channelName.stateName-direction", // e.g. "hm-rpc.0.JEQ0205612:1.DIRECTION"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   "",                     // optional,  default ""
       "type":  "string",               // optional,  default "string"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "role":  "direction"             // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
,
// state-maintenance (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance", //e.g. "hm-rpc.0.JEQ0205612:1.MAINTENANCE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance" // mandatory
       "desc":  "Problem description"   // optional,  default undefined
   }
}
,
// state-maintenance-unreach (optional).
{
   "_id": "adapter.instance.channelName.stateName-maintenance-unreach", //e.g. "hm-rpc.0.JEQ0205612:0.UNREACH"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": false,                  // mandatory, default false
       "min":   false,                  // optional,  default false
       "max":   true,                   // optional,  default true
       "role":  "indicator.maintenance.unreach" // mandatory
       "desc":  "Device unreachable"    // optional,  default 'Device unreachable'
   }
}
```

##### `light.switch` - Описание атрибутов
| **Имя** | **common.role** | **М** | **W** | **common.type** | **Описание** | ------------- |: -------------------------- |: -----: | -----: | ----------------- | ---

| состояние | переключатель | X | X | логическое значение |
| описание | text.description | | | |
| ммм | Indicator.maintenance.mmm | | | | ммм = низкий бит или недостигнут или что-то |

```
// SWITCH CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205614:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.switch"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// SWITCH STATES
{
   "_id": "adapter.instance.channelName.state-switch", // e.g. "hm-rpc.0.JEQ0205614:1.STATE"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   false,                  // optional,  default false
       "type":  "boolean",              // optional,  default "boolean"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "role":  "switch"                // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `light.dimmer` - Описание атрибутов
```
// DIMMER CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205612:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
       "role":  "light.dimmer"          // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// DIMMER STATES
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205612:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.dimmer"          // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
// see "Optional states for every channel/device" for description of optional states
//            "adapter.instance.channelName.state-working",             // optional
//            "adapter.instance.channelName.state-direction",           // optional
//            "adapter.instance.channelName.state-maintenance"          // optional
//            "adapter.instance.channelName.state-maintenance-unreach"  // optional

```

##### `blind` - Описание атрибутов
```
// BLIND CHANNEL
{
   "_id": "adapter.instance.channelName", // e.g. "hm-rpc.0.JEQ0205615:1"
   "type": "channel",
   "common": {
       "name":  "Name of channel",      // mandatory, default _id ??
      "role":  "blind"                 // optional   default undefined
       "desc":  ""                      // optional,  default undefined
   }
},
// BLIND STATES
// Important: 0% - blind is fully closed, 100% blind is fully opened
{
   "_id": "adapter.instance.channelName.state-level", // e.g. "hm-rpc.0.JEQ0205615:1.LEVEL"
   "type": "state",
   "common": {
       "name":  "Name of state",        // mandatory, default _id ??
       "def":   0,                      // optional,  default 0
       "type":  "number",               // optional,  default "number"
       "read":  true,                   // mandatory, default true
       "write": true,                   // mandatory, default true
       "min":   0,                      // optional,  default 0
       "max":   100,                    // optional,  default 100
       "unit":  "%",                    // optional,  default %
       "role":  "level.blind"           // mandatory
       "desc":  ""                      // optional,  default undefined
   }
}
```

##### `phone` - Описание атрибутов
| **Имя** | **common.role** | **М** | **W** | **common.type** | **Описание** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `звонит` | `индикатор` | | | `boolean` |

...

#### Устройство
#### Enum
* `common.members` - (необязательно) массив идентификаторов членов перечисления

#### Мета
Я бы

 ** & lt; имя-адаптера & gt;. & lt; номер-экземпляра & gt; .meta. & lt; имя-мета & gt;*
 ** & lt; имя-адаптера & gt; .meta. & lt; имя-мета & gt;*
 *system. * meta. & lt; meta-name & gt;*

#### Адаптер
id *system.adapter. & lt; имя адаптера & gt;*

* Примечание: * все флаги являются необязательными, кроме специальных, отмеченных как **обязательные**

* `common.name` - **обязательное** имя адаптера без« ioBroker ».
* `common.title` - (устарело) более длинное имя адаптера для отображения в админке
* `common.titleLang` - **обязательно** длинное имя адаптера на всех поддерживаемых языках, таких как {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.mode` - **обязательные** возможные значения см. ниже
* `common.version` - **обязательная** доступная версия
* `common.installedVersion` - **обязательная** установленная версия
* `common.enabled` - **обязательное** значение [true / false] должно быть ложным, поэтому новые экземпляры по умолчанию отключены
* `common.platform` - **обязательные** возможные значения: Javascript / Node.js, еще больше
* `common.webservers` - массив экземпляров веб-сервера, которые должны обслуживать контент из папки www адаптеров
* `common.noRepository` - [true / false], если адаптер поставляется с начальной установкой или имеет собственный репозиторий
* `common.messagebox` - true, если поддерживается окно сообщения. Если да, будет создан объект system.adapter. & Lt; имя-адаптера & gt & lt; adapter.instance & gt.messagebox для отправки сообщений адаптеру (используется для электронной почты, отправки по почте, ...;
* `common.subscribe` - имя переменной, которая подписывается автоматически
* `common.subscribeable` - переменные этого адаптера должны быть подписаны с sendTo для включения обновлений
* `common.wakeup` -
* `common.availableModes` - значения для common.mode, если возможно более одного режима
* `common.localLink` - ссылка на веб-сервис этого адаптера. Например, http:// localhost: 5984 / _utils для футона от администратора
* `common.logTransporter` - если этот адаптер получает журналы от других хостов и адаптеров (например, где-то их обрабатывает)
* `common.nondeletable` - [true / false] этот адаптер нельзя удалить или обновить. Он будет обновляться вместе с контроллером.
* `common.icon` - имя локального значка (должен находиться в подкаталоге« admin »)
* `common.extIcon` - ссылка на внешний значок для неустановленных адаптеров. Обычно на github.
* `common.logLevel` - отладка, информация, предупреждение или ошибка
* `common.supportStopInstance`- [true / false], если адаптер поддерживает сигнал stopInstance (требуется **окно сообщения** . Сигнал будет отправлен до остановки на адаптер. (используется, если проблемы возникли с SIGTERM)
* `common.allowInit` - [true / false] позволяет« запланированному »адаптеру быть вызванным« не по расписанию », если настройки изменены или адаптер запущен.
* `common.onlyWWW` - [true / false] говорит контроллеру, что у адаптера есть только html-файлы и нет main.js, например, рикша
* `common.singleton` - адаптер может быть установлен только один раз во всей системе
* `common.singletonHost` - адаптер может быть установлен только один раз на один хост
* `common.allowInit` - [true / false] разрешить запуск запланированного адаптера один раз после изменения конфигурации, а затем по расписанию
* `common.config.width` - ширина по умолчанию для диалогового окна конфигурации
* `common.config.height` - высота по умолчанию для диалогового окна конфигурации
* `common.config.minWidth` - минимальная ширина для диалогового окна конфигурации
* `common.config.minHeight` - минимальная высота для диалога конфигурации
* `common.os` - строка или массив поддерживаемых операционных систем, например [" linux "," darwin "]
* `common.stopBeforeUpdate` - [true / false], если адаптер должен быть остановлен перед обновлением
* `common.adminTab.singleton` - [true / false], если в адаптере есть TAB для администратора. Будет показан только один TAB для всех экземпляров.
* `common.adminTab.name` - имя вкладки в админке
* `common.adminTab.link` - ссылка для iframe в TAB. Вы можете использовать замену параметров следующим образом: «http://% ip%:% port%». IP будет заменен на IP хоста. "порт" будет извлечен из native.port.
* `common.adminTab.ignoreConfigUpdate` - не обновлять TAB конфигурации, если конфигурация изменена (чтобы включить настройки конфигурации в TAB)
* `common.restartAdapters` - массив с именами адаптера, который необходимо перезапустить после установки этого адаптера, например, [ "Визави"]
* `common.preserveSettings` - строка (или массив) с именами атрибутов, общих для экземпляра, которые не будут удалены. Например. "history", поэтому с помощью setState ('system.adapter.mqtt.0 ", {..}) поле common.history не будет удалено, даже если новый объект не имеет этого поля. Чтобы удалить атрибут, оно должно быть явно сделано с `` `common: {history: null}` ``.
* `common.noConfig` - [true / false], например, не показывать диалог конфигурации
* `common.stopTimeout` - время ожидания в мс для ожидания отключения адаптера. По умолчанию 500мс.
* `common.unsafePerm` - [true / false], если пакет должен быть установлен с параметром« npm --unsafe-perm »
* `common.supportCustoms` - [true / false], если адаптер поддерживает настройки для каждого состояния. Он должен иметь файл custom.html в админке. Образец можно найти в ioBroker.history
* `common.getHistory` - [true / false], если адаптер поддерживает сообщение getHistory
* `common.blockly` - [true / false], если в адаптере есть пользовательские блоки для blockly. (admin / blockly.js требуется)
* `common.webExtendable` - [true / false], если веб-сервер в этом адаптере можно расширить с помощью плагинов / расширений, таких как proxy, simple-api
* `common.webExtension` - относительное имя файла для подключения веб-расширения. Например. в simple-api "lib / simpleapi.js" относительно корневого каталога адаптера. Кроме того, native.webInstance должен указывать, куда будет включено это расширение. Пустой означает, что он должен работать как собственный веб-сервис. «*» означает, что каждый веб-сервер должен включать его.
* `common.welcomeScreen` - массив страниц, которые должны отображаться на странице« web »index.html. ["vis / edit.html", "vis / index.html"] или [{"link": "vis / edit.html", "name": "Vis editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.unchanged` - (система), пожалуйста, не используйте этот флаг. Это флаг, информирующий систему о том, что диалоговое окно конфигурации должно быть показано администратором.
* `common.serviceStates` - [истина / ложь или путь], если адаптер может доставлять дополнительные состояния. Если да, будет вызван адаптер пути / lib / states.js, который предоставит функцию следующих параметров (объекты, состояния, экземпляр, config, callback). Функция должна выдавать массив точек со значениями, такими как function (err, result) {result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.nogit` - если true, установка с github напрямую невозможна
* `common.materialize` - если адаптер поддерживает> admin3 (стиль материализации)
* `common.materializeTab` - если адаптер поддерживает> admin3 для вкладки (стиль материализации)
* `common.dataFolder` - папка относительно iobroker-data, в которой адаптер хранит данные. Эта папка будет заархивирована и восстановлена автоматически. Вы можете использовать переменную "% INSTANCE%" в нем.
* `common.webPreSettings` - список параметров, которые должны быть включены в info.js адаптером webServer. (Пример материала)
* `common.apt-get` - список пакетов Debian, которые требуются для этого адаптера (конечно, только Debian)
* `common.eraseOnUpload` - стереть все предыдущие данные в каталоге перед загрузкой
* `common.webByVersion` - показывать версию в качестве префикса в веб-адаптере (обычно - ip: порт / материал, webByVersion - ip: порт / 1.2.3 / материал)
* `common.noIntro` - никогда не показывать экземпляры этого адаптера на экране Intro / Overview в admin (например, значки, виджеты)
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.compact` - говорит контроллеру, что этот адаптер может быть запущен в том же процессе при желании

#### Пример
id *system.adapter. & lt; имя адаптера & gt;. & lt; номер-экземпляра & gt;*

* common.host - (обязательный) хост, на котором должен запускаться адаптер - объект *system.host. & lt; host & gt;* должен существовать
* common.enabled - (обязательно)
* common.mode - (обязательные) возможные значения, см. ниже

##### Адаптер / экземпляр common.mode
* **нет** - этот адаптер не запускает процесс
* **daemon** - всегда запущенный процесс (будет перезапущен при выходе из процесса)
* ** подписка ** - запускается при изменении состояния *system.adapter. & lt; имя-адаптера & gt;. & lt; номер-экземпляра & gt; .alive* на *true* Уничтожается при изменении *.alive* на *false* и установке *.alive* на *false* при выходе из процесса (** не ** будет перезапущен при выходе из процесса)
* **schedule** - запускается по расписанию, найденному в *system.adapter. & lt; имя-адаптера & gt;. & lt; instance-number & gt; .schedule* - реагирует на изменения *.schedule* путем перепланирования с новым состоянием
* **один раз** - этот адаптер будет запускаться при каждом изменении объекта system.adapter.yyy.x. Он не будет перезапущен после завершения.

#### Хост
id *system.host. & lt; host & gt;*

* `common.name` - например "System.host.banana"
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - например "банан"
* `common.address` - массив строк IP-адресов

#### Config
#### Скрипт
* `common.platform` - (обязательные) возможные значения 'Javascript / Node.js' (еще не все)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) исходный код скрипта
* `common.engine` - (необязательно) *scriptengine* экземпляр, который должен запускать этот скрипт (например, 'javascript.0') - если пропущенный движок выбран автоматически

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (@HQ: без учета регистра? @Bluefox ваш выбор, я думаю, что с учетом регистра тоже хорошо)
* `common.password` - (обязательно) MD5 Хэш пароля

#### Группа
* `common.name` - (обязательно) название группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов
* `common.desc` - (необязательно) описание назначения группы