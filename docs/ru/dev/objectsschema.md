---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/objectsschema.md
title: Основная концепция
hash: CqQzaGTMEJ4vcogtfW+fxcWeQCKxQRTiPDr6bRyQTAw=
---
# Основная концепция
В ioBroker есть два принципиально разных типа данных. Так называемые **состояния** (`states`) и **объекты**

Объекты представляют собой редко изменяющиеся и большие данные, такие как метаданные ваших системных устройств, конфигурации и дополнительные файлы. Каждый объект должен иметь атрибут «тип». См. Ниже дополнительные сведения о том, какие типы объектов доступны и какие обязательные атрибуты необходимы объекту определенного типа. Такие функции, как setObject, getObject, ... предоставляются вам модулем адаптера.

Состояния представляют собой часто изменяющиеся данные в вашей системе, например, например. если лампа горит или выключена, если датчик движения обнаружил какое-либо движение, температуру в вашей гостиной или нажатие кнопки пульта дистанционного управления. В отличие от объектов состояния могут использоваться для запуска действий, а состояния могут создавать исторические данные. Для работы со состояниями в модуле адаптера есть несколько функций, таких как setState, getState и так далее.

Для каждого состояния также должен существовать соответствующий объект с `type=state`.

В следующих главах описывается схема базы данных.

## ID
ID - это строка с максимальной длиной 240 байт, иерархически структурированная, уровни разделены точками.

В идентификаторах запрещено использовать следующие символы: `[]*,;'"&#96;<>\\?`.

Также не рекомендуется использовать `^$()/`.

Идентификатор имеет разные уровни. Каждый уровень определяется точкой. Пример: `system.adapter.admin.0`

- `system` - пространство имен для системных объектов
- `adapter` - пространство имен для конфигураций адаптера
- `admin` - имя адаптера
- `0` - экземпляр адаптера

Или другой пример `hm-rpc.1.ABC110022.2.VALUE`:

- `hm-rpc` - имя адаптера
- `1` - экземпляр адаптера
- `ABC110022` - адрес устройства
- `2` - название канала
- `VALUE` - название государства

## Пространства имен
* `system.` - Системные объекты и состояния
* `system.host.` - Процессы контроллера
* `system.config.` - Системные настройки, например язык по умолчанию
* `system.meta.` - Системные метаданные
* `system.user.` - Пользователи
* `system.group.` - Группы
* `system.adapter. <adapter-name>` - конфигурация адаптера по умолчанию
* `<adapter-name> .` - объекты для конкретного адаптера.
* `<adapter-name> .meta.` - общие метаданные, используемые всеми экземплярами этого адаптера
* `<имя-адаптера>. <номер-экземпляра> .` - пространство имен экземпляра адаптера.
* `enum.` - Перечисления
* `history.` - Исторические данные
* `scripts.` - Скрипты движка скриптов
* `scripts.js.` - скрипты движка скриптов javascript
* `scripts.py.` - скрипты движка скриптов python (в будущем)

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
Метод getState и событие stateChange доставляют объект со всеми атрибутами, кроме истечения срока действия.

для метода `setState` все, кроме `val`, является необязательным, `from` устанавливается автоматически методом `setState`. `ack` по умолчанию имеет значение false, `ts` и `lc` установлены как ожидалось

атрибуты для объекта getState / stateChange / setState:

* `val` - фактическое значение - может иметь любой тип," кодируемый "в формате JSON.
* `ack` - логический флаг, указывающий, подтвердила ли целевая система значение
* `ts` - временная метка unix, указывающая последнее обновление состояния (в миллисекундах)
* `lc` - временная метка unix, указывающая последнее изменение фактического значения состояния (в миллисекундах)
* `from` - экземпляр адаптера, который выполнил` setState`
* `user` - имя пользователя, установившее значение
* `expire` - целочисленное значение, которое может использоваться для установки состояний, которые истекают через заданное количество секунд. Может использоваться только с setValue. По истечении срока действия значения оно исчезает из redisDB.
* `c` - комментарий к этому изменению состояния.
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

Каждое *состояние* должно быть представлено объектом типа state, содержащим метаданные для состояния. См. ниже.

## Объекты
### Обязательные атрибуты
В каждом объекте должны присутствовать следующие атрибуты:

* `_id`
* `type` - возможные значения см. ниже
* `common` - объект, содержащий специфические свойства абстракции ioBroker
* `native` - объект, содержащий совпадающие свойства целевой системы

### Необязательные атрибуты
* `common.name` - имя объекта (необязательно, но строго рекомендуется для заполнения)

### Древовидная структура
Древовидная структура автоматически собирается по именам. Например. ```system.adapter.0.admin``` является родительским для `system.adapter.0.admin.uptime`. Используйте это соглашение об именах с точкой «.» В качестве разделителя уровней.

### Типы объектов
* `state` - родитель должен быть типа channel, device, instance или host
* `канал` - объект для группировки одного или нескольких состояний. Родитель должен быть устройством.
* `устройство` - объект для группировки одного или нескольких каналов или состояний. Не должно иметь родителя, кроме пространства имен экземпляра адаптера.
* `enum` - объекты, содержащие массив common.members, указывающий на состояния, каналы, устройства или файлы. перечисления могут иметь родительское перечисление (возможна древовидная структура)
* `host` - хост, на котором выполняется процесс контроллера
* `adapter` - конфигурация адаптера по умолчанию. Наличие также свидетельствует об успешной установке адаптера. (предложение: должен иметь атрибут, содержащий массив хостов, на которых он установлен)
* `instance` - экземпляр адаптера. Родитель должен принадлежать к типу адаптера.
* `meta` - редко меняющаяся метаинформация, которая нужна адаптеру или его экземплярам
* `config` - конфигурации
* `script` - скрипты
* `user` - пользователи
* `group` - группы
* `chart` - графики
* `папка` - куча устройств или может быть другое.

#### Атрибуты для определенных типов объектов
##### Состояние
атрибуты:

* `common.type` (необязательно - (по умолчанию смешанный == любой тип) (возможные значения: число, строка, логическое значение, массив, объект, смешанный, файл). В качестве исключения объекты с типом` meta` могут иметь `common .type = meta.user` или `meta.folder`
* `common.min` (необязательно)
* `common.max` (необязательно)
* `common.step` (необязательно) - интервал увеличения / уменьшения. Например. 0,5 для термостата
* `common.unit` (необязательно)
* `common.def` (необязательно - значение по умолчанию)
* `common.defAck` (необязательно - если задан common.def, это значение используется как флаг подтверждения, js-controller 2.0.0+)
* `common.desc` (необязательно, строка или объект) - описание, объект для многоязычного описания
* `common.read` (логическое, обязательное) - истина, если состояние читаемое
* `common.write` (логическое, обязательное) - истина, если состояние доступно для записи
* `common.role` (строка, обязательный) - роль состояния (используется в пользовательских интерфейсах, чтобы указать, какой виджет выбрать, см. ниже)
* `common.states` (необязательный) атрибут типа number с объектом возможных состояний` {'value': 'valueName', 'value2': 'valueName2', 0: 'OFF', 1: 'ON'} ` или (поддерживается администратором 5) массив состояний, например `['Start', 'Flight', 'Land']`
* `common.workingID` (строка, необязательно) - если это состояние имеет вспомогательное состояние WORKING. Здесь должно быть указано полное название или только последняя часть, если первые части совпадают с фактическими. Используется для HM.LEVEL и обычно имеет значение "РАБОТАЕТ".
* `common.custom` (необязательно) - структура с пользовательскими настройками для конкретных адаптеров. Например, `{" Influxdb.0 ": {" enabled ": true," alias ":" name "}}`. Атрибут enabled является обязательным, и если он неверен, весь атрибут будет удален.

##### Штат `common.history`
Для функции истории требуется адаптер истории или любой другой адаптер хранилища типа history.

Длина фифо уменьшается до минимума при достижении максимума. установите значение null или оставьте значение undefined, чтобы использовать значения по умолчанию

список транспортов см. в истории адаптера README

* `common.history` (необязательно)
* `common.history. <HISTORY-INSTANCE> .changesOnly` (необязательный, логический, если true, регистрируются только изменения значений)
* `common.history. <HISTORY-INSTANCE> .enabled` (логическое)

##### Штат `common.role`
* `common.role` (указывает, как это состояние должно быть представлено в пользовательских интерфейсах)

[возможные значения](stateroles.md)

#### Канал
##### Канал `common.role` (необязательно)
предложение: объект-канал common.role должен / мог бы подразумевать набор обязательных и / или необязательных дочерних-объектов-состояний

возможные значения:

* `info` - курс валюты или акций, цены на топливо, вставка почтового ящика и тому подобное
* `календарь` -
* `прогноз` - прогноз погоды

* `media - общий медиа-канал
* `media.music` - медиаплеер, например SONOS, YAMAHA и т. д.
* `media.tv` - ТВ
* `media.tts` - преобразование текста в речь

* `thermo` - Мониторинг или контроль температуры, влажности и т. д.
* `thermo.heat`
* `thermo.cool`

* `blind` - Управление жалюзи на окнах

* `свет`
* `light.dimmer` - Диммер света
* `light.switch` - выключатель света.
* `light.color` - Управление светом с возможностью изменения цвета
* `light.color.rgb` - Установить цвет в RGB
* `light.color.rgbw` - Установить цвет в RGBW
* `light.color.hsl` - Установить цвет в Hue / Saturation / Luminance (Hue color light - LivingColors ...)
* `light.color.hslct` - Установить цвет в Hue / Saturation / Luminance или Color Temperature (Расширенный цветовой оттенок света)
* `light.color.ct` - цветовая температура K

* `switch` - какой-то общий переключатель

* `sensor` - например, оконный или дверной контакт, датчик утечки воды, датчик пожара
* `sensor.door` - открыть, закрыть
* `sensor.door.lock` - открыть, закрыть, заблокировать
* `sensor.window` - открыть, закрыть
* `sensor.window.3` - открыть, наклонить, закрыть
* `sensor.water` - true (тревога), false (нет тревоги)
* `sensor.fire` - true (тревога), false (нет тревоги)
* `sensor.CO2` - истина (тревога), ложь (нет тревоги)

*

* `alarm` - некоторая тревога

* `phone` - fritz box, speedport и т. д.

* `button` - как настенный выключатель или пульт от телевизора, где каждая кнопка находится в состоянии, например .play, .stop, .pause.
* `remote` - ТВ или другие пульты с состоянием - это строка с нажатыми значениями, например «ИГРАТЬ», «СТОП», «ПАУЗА»

* `meta` - Информация об устройстве
* `meta.version` - версия устройства
* `meta.config` - конфигурация с устройства
* ...

#### Описание каналов
~~ Имена атрибутов могут быть произвольно определены адаптером, кроме тех, которые написаны **жирным** шрифтом. ~~

«W» - common.write = true

«M» - обязательно

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
| **Имя** | **common.role** | **M** | **W** | **common.type** | **Описание** | ------------- |: -------------------------- |: -----: | : -----: | ----------------- | ---

| состояние | переключатель | X | X | логическое |
| описание | text.description | | | |
| ммм | indicator.main maintenance.mmm | | | | mmm = lowbat или unreach или что-то еще |

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
| **Имя** | **common.role** | **M** | **W** | **common.type** | **Описание** | `ringing_number` | `text.phone_number` | | | `string` |

| `ringing` | `indicator` | | | `boolean` |
| `звенящий` | `индикатор` | | | `логическое` |

...

#### Устройство
#### Enum
* `common.members` - (необязательный) массив идентификаторов членов перечисления

#### Мета
я бы

 *`* &lt; имя-адаптера &gt;. & lt; номер-экземпляра & gt; .meta. & lt; имя-мета & gt;*
 *`* &lt; имя-адаптера &gt; .meta. & lt; имя-мета & gt;*
 * `system. * meta. &lt; meta-name &gt; *`

#### Адаптер
id `system.adapter.<adapter.name>`

* Примечание: * все флаги являются необязательными, кроме специальных, помеченных как **обязательные**

* `common.adminColumns` - настраиваемые атрибуты, которые должны отображаться в админке в обозревателе объектов. Например: `[{" name ": {" en ":" KNX-адрес "}," path ":" native.address "," width ": 100," align ":" left "}, {" name ": DPT, path: native.dpt, width: 100, align: «right», «type»: «number», «edit»: true, «objTypes»: [«state» , "канал"]}] `. `type` - это тип атрибута (например, строка, число, логическое значение) и требуется только в том случае, если разрешено редактирование. objTypes - это список типов объектов, которые могут иметь такой атрибут. Также используется только в режиме редактирования.
* `common.adminTab.fa-icon` - Font-Awesome имя значка для TAB.
* `common.adminTab.ignoreConfigUpdate` - не обновлять ВКЛАДКУ конфигурации, если конфигурация изменена (чтобы включить параметры конфигурации во ВКЛАДКЕ)
* `common.adminTab.link` - ссылка на iframe во ВКЛАДКЕ. Вы можете использовать замену параметров следующим образом: `http://% ip%:% port%`. IP будет заменен IP-адресом хоста. "Порт" будет извлечен из native.port.
* `common.adminTab.name` - имя TAB в админке
* `common.adminTab.singleton` - [true / false], если в адаптере есть ВКЛАДКА для администратора. Будет показана только одна вкладка для всех экземпляров.
* `common.allowInit` - [true / false] разрешить" запланированный "адаптер вызываться" вне расписания ", если настройки изменились или адаптер запущен. Или разрешите запуск адаптера по расписанию один раз после изменения конфигурации, а затем по расписанию.
* `common.availableModes` - значения для` common.mode`, если возможно более одного режима
* `common.blockly` - [true / false], если в адаптере есть настраиваемые блоки для блочного. (требуется admin / blockly.js)
* `common.connectionType` - Тип соединения с устройством:` local / cloud`. Смотрите также `common.dataSource`.
* `common.compact` - сообщает контроллеру, что этот адаптер при желании может быть запущен в том же процессе.
* `common.config.height` - высота по умолчанию для диалога конфигурации (устарело - действительно только для admin2)
* `common.config.minHeight` - минимальная высота для диалогового окна конфигурации (устарело - действительно только для admin2)
* `common.config.minWidth` - минимальная ширина диалогового окна конфигурации (устарело - действительно только для admin2)
* `common.config.width` - ширина по умолчанию для диалогового окна конфигурации (устарело - действительно только для admin2)
* `common.dataFolder` - папка относительно iobroker-data, в которой адаптер хранит данные. Эта папка будет зарезервирована и восстановлена автоматически. Вы можете использовать в нем переменную `% INSTANCE%`.
* `common.dataSource` - Как данные будут получены от устройства:` poll / push / допущение`. Это важно вместе с `connectionType`.
* `common.disableDataReporting` - не сообщать об ошибках через` sentry` для этого экземпляра
* `common.dependencies` - массив типа` [{"js-controller": "> = 2.0.0"}] `, который описывает, какие модули ioBroker требуются для этого адаптера на том же хосте.
* `common.docs` - структура типа` {"en": "docs / en / README.md", "de": ["docs / de / README.md", "docs / de / README1.md" ]} `, который описывает документацию, если ее нет в` README.md`
* `common.enabled` - **обязательное** значение [true / false] должно быть false, поэтому новые экземпляры по умолчанию отключены
* `common.engineTypes` - не рекомендуется. Использовать движок в package.json
* `common.eraseOnUpload` - стереть все предыдущие данные в каталоге перед загрузкой
* `common.expert` - показывать этот объект только в экспертном режиме в админке
* `common.extIcon` - ссылка на внешний значок для неустановленных адаптеров. Обычно на гитхабе.
* `common.getHistory` - [true / false], если адаптер поддерживает сообщение getHistory
* `common.globalDependencies` - массив типа` [{"admin": "> = 2.0.0"}] `, который описывает, какие модули ioBroker требуются для этого адаптера на одном из хостов.
* `common.icon` - имя локального значка (должно находиться в подкаталоге" admin ")
* `common.installedVersion` - не использовать, будет установлен только для внутреннего использования
* `common.ignoreVersion` - не показывать значок обновления для этого адаптера для этой конкретной версии
* `common.jsonConfig` - этот адаптер поддерживает admin5 и предоставляет admin / jsonConfig.json с описанием макета диалогового окна конфигурации.
* `common.jsonCustom` - этот адаптер поддерживает admin5 и предоставляет admin / jsonCustom.json с описанием макета пользовательских настроек.
* `common.keywords` - аналогично ключевым словам в package.json, но может быть определено на многих языках. Просто массив.
* `common.localLinks` - ссылка на веб-сервис этого адаптера. Например. на http:// localhost: 5984 / _utils для футона от администратора
* `common.localLink` - не рекомендуется. Используйте `common.localLinks`.
* `common.loglevel` - отладка, информация, предупреждение или ошибка
* `common.logTransporter` - если этот адаптер получает журналы с других хостов и адаптеров (например, чтобы где-то их хранить)
* `common.main` - **Не рекомендуется** Используйте main в package.json.
* `common.materializeTab` - если адаптер поддерживает> admin3 для вкладки (стиль материализации)
* `common.materialize` - если адаптер поддерживает> admin3 (стиль материализации)
* `common.messagebox` - истина, если поддерживается окно сообщения. Если да, объект system.adapter. &lt; adapter.name & gt &lt; adapter.instance & gt.messagebox будет создан для отправки сообщений адаптеру (используется для электронной почты, pushover, ...;
* `common.mode` - **обязательный** возможные значения см. ниже
* `common.name` - **обязательный** имя адаптера без« ioBroker ».
* `common.noConfig` - [true / false], например, не показывать диалог конфигурации
* `common.noIntro` - никогда не показывать экземпляры этого адаптера на экране Intro / Overview в админке (например, значки, виджеты)
* `common.noRepository` - [true / false], если адаптер поставляется с первоначальной установкой или имеет собственный репозиторий
* `common.nogit` - если true, установка напрямую с github невозможна
* `common.nondeletable` - [true / false] этот адаптер нельзя удалить или обновить. Он будет обновляться вместе с контроллером.
* `common.npmLibs` - не рекомендуется. Используйте package.json `dependencies`.
* `common.onlyWWW` - [true / false] сказать контроллеру, что у этого адаптера есть только html-файлы и нет main.js, например rickshaw
* `common.osDependencies.darwin` - массив пакетов OSX, необходимых для этого адаптера
* `common.osDependencies.linux` - массив пакетов debian / centos, необходимых для этого адаптера (конечно, только ОС с apt, apt-get, yum в качестве менеджеров пакетов)
* `common.osDependencies.win32` - не используется, потому что win32 не имеет диспетчера пакетов
* `common.os` - строка или массив поддерживаемых операционных систем, например ["Linux", "Дарвин"]
* `common.platform` - **обязательные** возможные значения: Javascript / Node.js, скоро будут
* `common.pugins.sentry` - структура с данными конфигурации для плагина` sentry`
* `common.preserveSettings` - строка (или массив) с именами общих атрибутов экземпляра, которые не будут удалены. Например. "history", поэтому с помощью setState ('system.adapter.mqtt.0 ", {..}) поле common.history не будет удалено, даже если новый объект не имеет этого поля. Чтобы удалить атрибут, он должен быть явно сделано с `` common: {history: null} `` `.
* `common.readme` - URL файла ReadMe
* `common.restartAdapters` - массив с именами адаптеров, которые необходимо перезапустить после установки этого адаптера, например ["vis"]
* `common.schedule` - расписание CRON, если адаптер работает в режиме` schedule`.
* `common.serviceStates` - [истина / ложь или путь], если адаптер может передавать дополнительные состояния. Если да, будет вызван адаптер пути / lib / states.js, который предоставит следующие параметры функции (объекты, состояния, экземпляр, конфигурация, обратный вызов). Функция должна доставить массив точек со значениями типа function (err, result) {result = [{id: 'id1', val: 1}, {id: 'id2', val: 2}]}
* `common.singletonHost` - адаптер можно установить только один раз на один хост
* `common.singleton` - адаптер может быть установлен только один раз во всей системе
* `common.stopBeforeUpdate` - [true / false], если адаптер должен быть остановлен перед обновлением
* `common.stopTimeout` - таймаут в мс для ожидания отключения адаптера. По умолчанию 500 мс.
* `common.subscribable` - переменные этого адаптера должны быть подписаны с помощью sendTo для включения обновлений
* `common.subscribe` - имя переменной, на которую подписывается автоматически
* `common.supportCustoms` - [true / false], если адаптер поддерживает настройки для каждого состояния. В админке должен быть файл custom.html. Образец можно найти в ioBroker.history
* `common.supportStopInstance`- [true / false], если адаптер поддерживает сигнал stopInstance (требуется **messagebox** . Сигнал перед остановкой будет отправлен на адаптер. (используется, если проблемы возникли с SIGTERM)
* `common.titleLang` - **обязательный** более длинное имя адаптера на всех поддерживаемых языках, например {en: 'Adapter', de: 'adapter', ru: 'Драйвер'}
* `common.title` - (устарело) более длинное имя адаптера для отображения в админке
* `common.type` - Тип адаптера. См. [Типы] (adapterpublish.md)
* `common.unchanged` - (система), пожалуйста, не используйте этот флаг. Это флаг, информирующий систему о том, что диалоговое окно конфигурации должно отображаться в админке.
* `common.unsafePerm` - [true / false], если пакет должен быть установлен с параметром` npm --unsafe-perm`
* `common.version` - **обязательный** доступная версия
* `common.wakeup` - Адаптер будет запущен, если в` system.adapter.NAME.x.wakeup` будет записано какое-то значение. Обычно адаптер должен останавливаться после обработки события.
* `common.webByVersion` - показывать версию как префикс в веб-адаптере (обычно - ip: port / material, webByVersion - ip: port / 1.2.3 / material)
* `common.webExtendable` - [true / false], если веб-сервер в этом адаптере может быть расширен с помощью плагина / расширений, таких как прокси, simple-api
* `common.webExtension` - относительное имя файла для подключения веб-расширения. Например. в `simple-api`,` lib / simpleapi.js` относительно корневого каталога адаптера. Кроме того, «native.webInstance» требуется, чтобы указать, куда будет включено это расширение. Пустой означает, что он должен работать как собственный веб-сервис. «*» означает, что каждый веб-сервер должен включать его.
* `common.webPreSettings` - список параметров, которые должны быть включены в info.js адаптером webServer. (Пример материала)
* `common.webservers` - массив экземпляров веб-сервера, которые должны обслуживать контент из папки www адаптера
* `common.welcomeScreen` - массив страниц, которые должны отображаться на" веб-странице index.html ". ["vis / edit.html", "vis / index.html"] или [{"link": "vis / edit.html", "name": "Vis editor", "img": "vis / img / edit.png "," color ":" blue "}," vis / index.html "]
* `common.welcomeScreen.order` - задача
* `common.welcomeScreenPro` - то же самое, что` common.welcomeScreen`, но используется только при доступе из ioBroker.cloud.
* `common.wwwDontUpload` - Не загружать в базу данных каталог www. Используется только для админа. Вы можете просто назвать свой каталог как-нибудь еще и ОК.
* `protectedNative` - массив атрибутов конфигурации, которые будут доступны только для собственного адаптера, например `[" пароль "]`
* `encryptedNative` - массив атрибутов конфигурации, которые будут автоматически зашифрованы при сохранении через страницу конфигурации администратора и автоматически расшифрованы во время выполнения адаптера, например `[" пароль "," токен "]`
* `native` - предопределенные атрибуты, которые доступны в` index_m.html` и во время выполнения через `adapter.config. <attribute>`, например `{" порт ": 1234," пароль ":" секрет "}`

#### Пример
id *system.adapter. &lt; имя-адаптера &gt;. & lt; номер-экземпляра & gt;*

* `common.host` - (обязательно) хост, на котором должен быть запущен адаптер - object *system.host. &lt; host &gt;* должен существовать
* `common.enabled` - (обязательно)
* `common.mode` - (обязательные) возможные значения см. ниже

##### Адаптер / экземпляр common.mode
* `none` - этот адаптер не запускает процесс
* `daemon` - всегда запущенный процесс (будет перезапущен, если процесс завершится)
* `subscribe` - запускается, когда состояние *system.adapter. &lt; имя-адаптера &gt;. & lt; instance-number & gt; .alive* изменяется на *true* Убивается, когда *.alive* изменяется на *false* и устанавливает *.alive* на *false* если процесс завершается (** не ** перезапускается при выходе из процесса)
* `schedule` - запускается расписанием, найденным в *system.adapter. &lt; имя-адаптера &gt;. & lt; instance-number & gt; .schedule* - реагирует на изменения *.schedule* изменением расписания с новым состоянием
* `once` - этот адаптер будет запускаться каждый раз при изменении объекта system.adapter.yyy.x. После завершения он не будет перезапущен.
* `extension` - этот адаптер не будет запускаться` js-controller`, но он будет запущен веб-экземпляром. Веб-экземпляр может быть определен в `native.webInstance` как '*' (если в каждом вебе) или как` web.x` для конкретного веб-экземпляра. (Примеры: «камеры, прокси»). Дополнительно в common.webExtension должен быть указан путь к файлу плагина.

#### Хозяин
id `system.host.<host>`

* `common.name` - например, `system.host.banana`
* `common.process`
* `common.version`
* `common.platform`
* `common.cmd`
* `common.hostname` - например, `банан`
* `common.address` - массив строк ip-адресов

#### Конфиг
#### Скрипт
* `common.platform` - (обязательно) возможные значения` Javascript / Node.js` (еще не все)
* `common.enabled` - (обязательно) активирован скрипт или нет
* `common.source` - (обязательно) исходный код скрипта
* `common.engine` - (необязательно) *экземпляр скриптового движка* который должен запускать этот скрипт (например, 'javascript.0') - если не указано, движок выбирается автоматически

#### Пользователь
* `common.name` - (обязательно) Имя пользователя (с учетом регистра)
* `common.password` - (обязательно) MD5 Хеш пароля

#### Группа
* `common.name` - (обязательно) имя группы
* `common.members` - (обязательный) массив идентификаторов пользовательских объектов
* `common.desc` - (необязательно) описание назначения группы