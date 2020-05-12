---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: mT8dWi3HI4cgX+3ij/BLbR5HBfMfC1GFhW9mdsX8CFc=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных. Так называемые **состояния** (`states`) и **объекты**

Объекты представляют редко изменяющиеся и большие данные, такие как метаданные устройств вашей системы, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». Ниже приведена дополнительная информация о том, какие типы объектов доступны и какие обязательные атрибуты нужны объекту определенного типа. Такие функции, как setObject, getObject, ... предоставляются вам модулем адаптера.

Состояния представляют собой часто изменяющиеся данные в вашей системе, например, например. если лампа включена или выключена, если детектор движения обнаружил какое-либо движение, температуру вашей гостиной или нажатие кнопки пульта дистанционного управления. В противоположность объектам состояния могут использоваться для запуска действий, а состояния могут создавать исторические данные. Для работы с состояниями в модуле адаптера есть несколько функций, таких как setState, getState и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

Следующие главы описывают схему базы данных.

## Идентификаторы
ID - это строка длиной не более 240 байтов, иерархически структурированная, уровни разделены точками.

Следующие символы запрещены для использования в идентификаторах: `[]*,;'"&#96;<>\\?`.

Также не рекомендуется использовать `^$()/`.

Идентификатор имеет разные уровни. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - пространство имен для системных объектов
- `adapter` - пространство имен для конфигураций адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - это имя адаптера
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - название государства

## Пространства имен
* `system`. - Системные объекты и состояния
* `system.host. - Контроллер процессов
* `system.config` - системные настройки, такие как язык по умолчанию
* `system.meta` - системные метаданные
* `system.user. - Пользователи
* `system.group. - Группы
* `system.adapter. <имя-адаптера>` - конфигурация адаптера по умолчанию
* `<имя-адаптера> .` - объекты для конкретного адаптера.
* `<имя-адаптера> .meta` - общие метаданные, используемые всеми экземплярами этого адаптера
* `<имя-адаптера>. <номер-экземпляра> .` - пространство имен экземпляра адаптера
* enum. - Перечисления
* `история`. История данных
* `scripts. - Скрипты движка скриптов
* `scripts.js.` - скрипты javascript Script Engine
* `scripts.py` - скрипты Python Engine Script (будущее)

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

### Пространство имен system.host. &lt; hostname &gt;
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

<a id="states"></a>

## Состояния
Метод getState и событие stateChange доставляют объект со всеми атрибутами, кроме expire.

для метода `setState` все, кроме `val` является необязательным, `from` устанавливается автоматически методом `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` установлены как и ожидалось

атрибуты для объекта getState / stateChange / setState:

* `val` - фактическое значение - может быть любого типа, который является JSON-" кодируемым "
* `ack` - логический флаг, указывающий, подтвердило ли целевая система значение
* `ts` - метка времени Unix, указывающая последнее обновление состояния (в миллисекундах)
* `lc` - метка времени Unix, указывающая последнее изменение фактического значения состояния (в миллисекундах)
* `from` - экземпляр адаптера, который сделал` setState`
* `user` - имя пользователя, которое устанавливает значение
* `expire` - целочисленное значение, которое можно использовать для установки состояний, срок действия которых истекает через заданное количество секунд. Может использоваться только с `setValue`. После истечения срока действия значение исчезает из redisDB.
* `c` - комментарий для этого изменения состояния.
* `q` - качество. Номер со следующими состояниями:

```
  0x00 - 00000000 - good (can be undefined or null)
  0x01 - 00000001 - general bad, general problem
  0x02 - 00000010 - no connection problem

  0x10 - 00010000 - substitute value from controller
  0x20 - 00100000 - substitute initial value
  0x40 - 01000000 - substitute value from device or instance
  0x80 - 10000000 - substitute value from sensor

  0x11 - 01000001 - general problem by instance
  0x41 - 01000001 - general problem by device
  0x81 - 10000001 - general problem by sensor

  0x12 - 00010010 - instance not connected
  0x42 - 01000010 - device not connected
  0x82 - 10000010 - sensor not connected

  0x44 - 01000100 - device reports error
  0x84 - 10000100 - sensor reports error
```

Каждое *состояние* должно быть представлено объектом типа состояния, содержащего метаданные для состояния. См. ниже.

## Объекты
### Обязательные атрибуты
Следующие атрибуты должны существовать в каждом объекте:

* `_id`
* `type` - смотрите ниже возможные значения
* `common` - объект, содержащий особые свойства абстракции ioBroker
* `native` - объект, содержащий конгруэнтные свойства целевой системы

### Необязательные атрибуты
* `common.name` - имя объекта (необязательно, но строго рекомендуется его заполнить)

### Древовидная структура
Древовидная структура собирается автоматически по именам. Например. ```system.adapter.0.admin``` является родителем для `system.adapter.0.admin.uptime`. Используйте это соглашение об имени с точкой ".", Как разделитель уровней.

### Типы объектов
* `state` - родитель должен иметь тип channel, device, instance или host
* `канал` - объект для группировки одного или нескольких состояний. Родитель должен быть устройством.
* `устройство` - объект для группировки одного или нескольких каналов или состояния. Не должно иметь родителя, кроме пространства имен экземпляра адаптера.
* `enum` - объекты, содержащие массив в common.members, который указывает на состояния, каналы, устройства или файлы. перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` - хост, который запускает процесс контроллера
* `adapter` - конфигурация адаптера по умолчанию. Наличие также указывает на то, что адаптер успешно установлен. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родитель должен быть типа адаптер
* `meta` - редко меняющая метаинформацию, которая нужна адаптеру или его экземплярам
* `config` - настройки
* `script` - скрипты
* `user` - пользователи
* `группа` - группы
* `chart` - диаграммы
* `folder` - куча устройств или могут быть другие вещи.

#### Атрибуты для определенных типов объектов
##### Государственный
атрибуты:

* `common.type` (необязательно - (по умолчанию смешанный == любой тип) (возможные значения: число, строка, логическое значение, массив, объект, смешанный, файл). В качестве исключения объекты с типом` meta` могут иметь `common .type = meta.user` или `meta.folder`
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательно) - интервал увеличения / уменьшения. Например. 0,5 для термостата
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательно - если установлен common.def, это значение используется как флаг ack, js-controller 2.0.0+)
* `common.desc` (необязательно, строка или объект) - описание, объект для многоязычного описания
* `common.read` (логическое, обязательное) - true, если состояние доступно для чтения
* `common.write` (логическое, обязательное) - true, если состояние доступно для записи
* `common.role` (строка, обязательная) - роль состояния (используется в пользовательских интерфейсах для указания, какой виджет выбрать, см. ниже)
* `common.states` (необязательный) атрибут номера типа с объектом возможных состояний` {'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'} `
* `common.workingID` (строка, необязательно) - если это состояние имеет вспомогательное состояние WORKING. Здесь должно быть написано полное имя или только последняя часть, если первые части совпадают с фактическими. Используется для HM.LEVEL и обычно имеет значение «РАБОТАЕТ»
* `common.custom` (необязательно) - структура с пользовательскими настройками для конкретных адаптеров. Например, `{" influenxdb.0 ": {" enabled ": true," alias ":" name "}}`. Атрибут `enabled` является обязательным, и если он не равен true, весь атрибут будет удален.

##### Штат `common.history`
Для функции истории необходим адаптер истории или любой другой адаптер хранения истории типов

Длина FIFO уменьшается до минимума при достижении максимума. установить на ноль или оставить неопределенным, чтобы использовать значения по умолчанию

список транспортов см. в истории адаптера README.

* `common.history` (необязательно)
* `common.history. <HISTORY-INSTANCE> .changesOnly` (необязательно, логическое значение, если регистрируются только изменения значения true)
* `common.history. <HISTORY-INSTANCE> .enabled` (логическое)

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
| `звонит` | `индикатор` | | | `логическое` |

...

#### Устройство
#### Enum
* `common.members` - (необязательно) массив идентификаторов членов перечисления

#### Мета
Я бы

 * `* &lt; имя-адаптера &gt;. & lt; номер-экземпляра & gt; .meta. & lt; имя-мета & gt; *`
 * `* &lt; имя-адаптера &gt; .meta. & lt; имя-мета & gt; *`
 * `system. *meta. &lt; meta-name &gt;*

#### Адаптер
id `system.adapter.<adapter.name>`

* Примечание: * все флаги являются необязательными, кроме специальных, отмеченных как **обязательные**

* `common.adminTab.fa-icon` - имя Font-Awesome для вкладки.
* `common.adminTab.ignoreConfigUpdate` - не обновлять TAB конфигурации, если конфигурация изменена (чтобы включить настройки конфигурации в TAB)
* `common.adminTab.link` - ссылка для iframe в TAB. Вы можете использовать замену параметров следующим образом: «http://% ip%:% port%». IP будет заменен на IP хоста. "порт" будет извлечен из native.port.
* `common.adminTab.name` - имя TAB в админке
* `common.adminTab.singleton` - [true / false], если в адаптере есть TAB для администратора. Будет показан только один TAB для всех экземпляров.
* `common.allowInit` - [true / false] позволяет« запланированному »адаптеру быть вызванным« не в расписании », если настройки изменены или адаптер запущен. Или разрешите запуск запланированного адаптера один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` - значения для common.mode, если возможно более одного режима
* `common.blockly` - [true / false], если в адаптере есть пользовательские блоки для блоков. (требуется admin / blockly.js)
* `common.connectionType` - Тип соединения с устройством:` local / cloud`. Смотрите также `common.dataSource`.
* `common.compact` - говорит контроллеру, что этот адаптер может быть запущен в том же процессе при желании
* `common.config.height` - высота по умолчанию для диалогового окна конфигурации (не рекомендуется - действует только для admin2)
* `common.config.minHeight` - минимальная высота для диалогового окна конфигурации (не рекомендуется - действует только для admin2)
* `common.config.minWidth` - минимальная ширина для диалогового окна конфигурации (не рекомендуется - действует только для admin2)
* `common.config.width` - ширина по умолчанию для диалогового окна конфигурации (не рекомендуется - действует только для admin2)
* `common.dataFolder` - папка относительно iobroker-data, в которой адаптер хранит данные. Эта папка будет заархивирована и восстановлена автоматически. Вы можете использовать переменную "% INSTANCE%" в нем.
* `common.dataSource` - Как данные будут получены с устройства:` poll / push / assump`. Это важно вместе с `connectionType`.
* `common.dependencies` - массив типа` [{"js-controller": "> = 2.0.0"}] `, который описывает, какие модули ioBroker необходимы для этого адаптера.
* `common.docs` - структура типа` {"en": "docs / en / README.md", "de": ["docs / de / README.md", "docs / de / README1.md" ]} `который описывает документацию, если не в README.md
* `common.enabled` - **обязательное** значение [true / false] должно быть ложным, поэтому новые экземпляры по умолчанию отключены
* `common.engineTypes` - устарел. Используйте движок в package.json
* `common.eraseOnUpload` - стирать все предыдущие данные в каталоге перед загрузкой
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.extIcon` - ссылка на внешний значок для неустановленных адаптеров. Обычно на github.
* `common.getHistory` - [true / false], если адаптер поддерживает сообщение getHistory
* `common.icon` - имя локального значка (должен находиться в подкаталоге« admin »)
* `common.installedVersion` - **обязательная** установленная версия
* `common.keywords` - аналогично ключевым словам в package.json, но может быть определено на многих языках. Просто массив.
* `common.localLinks` - ссылка на веб-сервис этого адаптера. Например, http:// localhost: 5984 / _utils для футона от администратора
* `common.localLink` - устарело. Используйте `common.localLinks`.
* `common.logLevel` - отладка, информация, предупреждение или ошибка
* `common.logTransporter` - если этот адаптер получает журналы от других хостов и адаптеров (например, где-то их обрабатывает)
* `common.main` - стартовый файл адаптера. То же, что в package.json.
* `common.materializeTab` - если адаптер поддерживает> admin3 для вкладки (стиль материализации)
* `common.materialize` - если адаптер поддерживает> admin3 (стиль материализации)
* `common.messagebox` - true, если поддерживается окно сообщения. Если да, будет создан объект system.adapter. &lt; имя-адаптера & gt & adapter.instance & gt.messagebox для отправки сообщений адаптеру (используется для электронной почты, отправки, ...;
* `common.mode` - **обязательные** возможные значения см. ниже
* `common.name` - **обязательно** имя адаптера без« ioBroker ».
* `common.noConfig` - [true / false], например, не показывать диалог конфигурации
* `common.noIntro` - никогда не показывать экземпляры этого адаптера на экране Intro / Overview в admin (например, значки, виджеты)
* `common.noRepository` - [true / false], если адаптер поставляется с начальной установкой или имеет собственный репозиторий
* `common.nogit` - если true, установка с github напрямую невозможна
* `common.nondeletable` - [true / false] этот адаптер нельзя удалить или обновить. Он будет обновляться вместе с контроллером.
* `common.npmLibs` - устарело. Используйте package.json `зависимости`.
* `common.onlyWWW` - [true / false] говорит контроллеру, что в адаптере есть только html-файлы и нет main.js, например, рикша
* `common.osDependencies.darwin` - массив пакетов OSX, необходимых для этого адаптера
* `common.osDependencies.linux` - массив пакетов debian / centos, которые требуются для этого адаптера (конечно, только ОС с apt, apt-get, yum в качестве менеджеров пакетов)
* `common.osDependencies.win32` - не используется, потому что в win32 нет менеджера пакетов
* `common.os` - строка или массив поддерживаемых операционных систем, например [" linux "," darwin "]
* `common.platform` - **обязательные** возможные значения: Javascript / Node.js, еще больше
* `common.preserveSettings` - строка (или массив) с именами общих атрибутов экземпляра, которые не будут удалены. Например. "history", поэтому с помощью setState ('system.adapter.mqtt.0 ", {..}) поле common.history не будет удалено, даже если новый объект не имеет этого поля. Чтобы удалить атрибут, оно должно быть явно сделано с `` `common: {history: null}` ``.
* `common.readme` - устарел. Используйте `документы`.
* `common.restartAdapters` - массив с именами адаптера, который необходимо перезапустить после установки этого адаптера, например, [ "Визави"]
* `common.schedule` - расписание CRON, если адаптер работает в режиме` schedule`.
* `common.serviceStates` - [истина / ложь или путь], если адаптер может доставлять дополнительные состояния. Если да, то будет вызван адаптер пути / lib / states.js, который предоставит функцию следующих параметров (объекты, состояния, экземпляр, config, callback). Функция должна выдавать массив точек со значениями, такими как function (err, result) {result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.singletonHost` - адаптер может быть установлен только один раз на один хост
* `common.singleton` - адаптер может быть установлен только один раз на всю систему
* `common.stopBeforeUpdate` - [true / false], если адаптер должен быть остановлен перед обновлением
* `common.stopTimeout` - время ожидания в мс для ожидания отключения адаптера. По умолчанию 500мс.
* `common.subscribeable` - переменные этого адаптера должны быть подписаны с sendTo для включения обновлений
* `common.subscribe` - имя переменной, которая подписывается автоматически
* `common.supportCustoms` - [true / false], если адаптер поддерживает настройки для каждого состояния. Он должен иметь файл custom.html в админке. Образец можно найти в ioBroker.history
* `common.supportStopInstance`- [true / false], если адаптер поддерживает сигнал stopInstance (требуется **окно сообщения** . Сигнал будет отправлен до остановки на адаптер. (используется, если проблемы возникли с SIGTERM)
* `common.titleLang` - **обязательно** длинное имя адаптера на всех поддерживаемых языках, таких как {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.title` - (устарело) длинное имя адаптера для отображения в админке
* `common.type` - тип адаптера. Смотрите [Типы] (adapterpublish.md)
* `common.unchanged` - (система), пожалуйста, не используйте этот флаг. Это флаг, информирующий систему о том, что диалоговое окно конфигурации должно быть показано администратором.
* `common.unsafePerm` - [true / false], если пакет должен быть установлен с параметром« npm --unsafe-perm »
* `common.version` - **обязательная** доступная версия
* `common.wakeup` - Адаптер будет запущен, если какое-либо значение будет записано в` system.adapter.NAME.x.wakeup`. Обычно адаптер должен останавливаться после обработки события.
* `common.webByVersion` - отображать версию в качестве префикса в веб-адаптере (обычно - ip: порт / материал, webByVersion - ip: порт / 1.2.3 / материал)
* `common.webExtendable` - [true / false], если веб-сервер в этом адаптере можно расширить с помощью плагинов / расширений, таких как proxy, simple-api
* `common.webExtension` - относительное имя файла для подключения веб-расширения. Например. в simple-api "lib / simpleapi.js" относительно корневого каталога адаптера. Кроме того, native.webInstance должен указывать, куда будет включено это расширение. Пустой означает, что он должен работать как собственный веб-сервис. «*» означает, что каждый веб-сервер должен включать его.
* `common.webPreSettings` - список параметров, которые должны быть включены в info.js адаптером webServer. (Пример материала)
* `common.webservers` - массив экземпляров веб-сервера, которые должны обслуживать контент из папки www адаптеров
* `common.welcomeScreen` - массив страниц, которые должны отображаться на странице« web »index.html. ["vis / edit.html", "vis / index.html"] или [{"link": "vis / edit.html", "name": "Vis editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.welcomeScreen.order` - задача
* `common.welcomeScreenPro` - То же, что и` common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.wwwDontUpload` - не загружайте в БД каталог www. Используется только для администратора. Вы можете просто назвать свой каталог как-нибудь еще и ОК.
* protectedNative - массив атрибутов конфигурации, которые будут доступны только для собственного адаптера, например `[ "Пароль"]`
* encryptedNative` - массив атрибутов конфигурации, которые будут автоматически шифроваться при сохранении на странице конфигурации администратора и автоматически расшифровываться во время работы адаптера, например, `[" пароль "," токен "]`
* `native` - предопределенные атрибуты, которые доступны в index_m.html и во время выполнения через` adapter.config. <attribute> `, например `{" port ": 1234," password ":" secret "}`

#### Пример
id *system.adapter. &lt; имя адаптера &gt;. & lt; номер экземпляра & gt;*

* `common.host` - (обязательный) хост, с которого должен запускаться адаптер - объект *system.host. &lt; host &gt;* должен существовать
* `common.enabled` - (обязательно)
* `common.mode` - (обязательные) возможные значения смотрите ниже

##### Адаптер / экземпляр common.mode
* `none` - этот адаптер не запускает процесс
* `daemon` - всегда запущенный процесс (будет перезапущен при выходе из процесса)
* `subscribe` - запускается, когда состояние *system.adapter. &lt; имя-адаптера &gt;. & lt; номер-экземпляра & gt; .alive* меняется на *true* Уничтожается при изменении *.alive* на *false* и установке *.alive* на *false* при выходе из процесса (** не ** будет перезапущен при выходе из процесса)
* `schedule` - запускается по расписанию, найденному в *system.adapter. &lt; имя-адаптера &gt;. & lt; instance-number & gt; .schedule* - реагирует на изменения *.schedule* путем перепланирования с новым состоянием
* `Once` - этот адаптер будет запускаться при каждом изменении объекта system.adapter.yyy.x. Он не будет перезапущен после завершения.
* `extension` - этот адаптер не будет запущен` js-controller`, но будет запущен веб-экземпляром. Веб-экземпляр может быть определен в `native.webInstance` как '*' (если есть в каждой сети) или как` web.x` для конкретного веб-экземпляра. (Примеры: `камеры, прокси`). Дополнительно в `common.webExtension` должен быть указан путь к файлу плагина.

#### Хост
id `system.host.<host>`

* `common.name` - например `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - например `banana`
* `common.address` - массив строк IP-адресов

#### Config
#### Скрипт
* `common.platform` - (обязательные) возможные значения` Javascript / Node.js` (еще не все)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) исходный код скрипта
* `common.engine` - (необязательно) *скрипт-движок* экземпляр, который должен запускать этот скрипт (например, 'javascript.0') - если пропущенный движок выбран автоматически

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательно) MD5 Хэш пароля

#### Группа
* `common.name` - (обязательное) название группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов
* `common.desc` - (необязательно) описание назначения группы