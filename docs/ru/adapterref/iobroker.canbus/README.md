---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: JG9ulj+GTIm+5hiIQgcTji7RE9/DL3LG+pQjj5S57sI=
---
# IoBroker.canbus
![Логотип](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Количество установок (последнее)](https://iobroker.live/badges/canbus-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/canbus-stable.svg)
![Статус зависимости](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)
![Известные уязвимости](https://snyk.io/test/github/crycode-de/ioBroker.canbus/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Тесты: ** ![Тестирование и выпуск](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер CAN-шины для ioBroker
Этот адаптер подключает ioBroker к сети контроллеров (шина CAN).

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация по Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Характеристики
* Получать и отправлять необработанные сообщения с использованием стандартных и расширенных фреймов
* Каждое сообщение может быть настроено для приема и / или отправки данных
* Возможность автоматического добавления объектов для увиденных сообщений CAN, которые еще не настроены
* Настройте парсеры для каждого сообщения для чтения / записи данных из / в буфер необработанных сообщений
  * Числовые типы
  * Логические, включая поддержку битовой маски
  * Строки в разных кодировках символов
  * Пользовательские скрипты для чтения / записи из / в буфер необработанных данных
* Дополнительная поддержка флага RTR
* Дополнительные необработанные состояния, содержащие необработанные объекты сообщений CAN

## Требования
* Операционная система Linux (из-за используемой библиотеки socketcan)
* Оборудование CAN, которое создает интерфейс, подобный `can0`
* Некоторые знания о сообщениях, отправляемых на шину CAN

## Парсеры
Используя синтаксические анализаторы, вы можете читать или записывать данные в буфер сообщений CAN.

Существуют предопределенные парсеры для следующих типов данных.
Кроме того, вы можете написать собственные сценарии для чтения / записи значений с помощью *настраиваемого парсера*

### Числовые типы в репрезентации *big-endian* и *little-endian*
* Знаковые и беззнаковые 8-, 16- и 32-битные целые числа
* 32-битное число с плавающей запятой
* 64-битный двойной

### Boolean
* 1 байт, включая поддержку битовой маски

### Строка
* Длина от 1 до 8 байт
*Кодировка: * ascii *, * base64 *, * hex *, * latin1 *, * utf8 *, * utf16le*

### Пользовательский
Для настраиваемого парсера вы должны предоставить собственный сценарий чтения и записи.
Эти скрипты должны быть чистым javascript и работать в песочнице.

В скриптах вы можете использовать следующие возможности:

* Большинство встроенных функций Node.js
* `async` /` ожидание`
* Функции журнала адаптера `log.warn ('something')`, `log.info ('something')`, `log.debug ('something')`
* `getStateAsync ('id')` и `getObjectAsync ('id')`, где `id` - это полный идентификатор состояния / объекта

Ошибки в скриптах будут регистрироваться адаптером.

В обоих сценариях предварительно определены переменные `buffer` и `value`.
`buffer` всегда содержит текущее содержимое сообщения CAN в виде буфера Node.js.

#### Пользовательский сценарий чтения
В сценарии чтения вы должны прочитать `value` из переменной `buffer`.

В начале пользовательского сценария чтения `buffer` будут данными принятого / текущего сообщения CAN (как в состоянии `.json`).
`value` будет `undefined` и должен быть установлен сценарием.

Содержимое переменной `value` в конце настраиваемого сценария чтения будет использоваться как новое значение для состояния.
Если `value` равен `undefined`, он будет проигнорирован. Используя это, вы можете фильтровать сообщения в пользовательском сценарии чтения по частям данных.

#### Пользовательский сценарий записи
В сценарии записи вы должны изменить (или заменить) переменную `buffer`.

В начале пользовательского сценария записи, `buffer` будет текущими данными сообщения CAN (как в состоянии `.json`).
`value` устанавливается в значение состояния, которое должно быть записано в `buffer`.

Содержимое переменной `buffer` в конце настраиваемого сценария записи будет использоваться в качестве новых данных для сообщения CAN.

## Использование в скриптах
Вы можете обрабатывать / изменять состояния `<messageId>.json` или `<messageId>.<parserId>` в своих сценариях.

Кроме того, вы можете использовать состояния `raw.received` и `raw.send`, если они включены в конфигурации адаптера.
Они содержат строковые данные JSON данных сообщения и могут использоваться для обработки каждого полученного или отправленного сообщения независимо от настроенных сообщений.
Записывая данные JSON в состояние `raw.send`, вы можете отправлять сообщения CAN, содержащие любые данные, которые вам нравятся.

### Пример объекта необработанного сообщения
```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` и `rtr` являются необязательными и по умолчанию равны `false`.

## Changelog

### 1.0.0-beta.4 (2020-11-27)
* (crycode-de) Ignore read value if a parser returned undefined

### 1.0.0-beta.3 (2020-11-25)
* (crycode-de) Fixed js-controller dependency
* (crycode-de) Custom parsers `getStateAsync` function now uses `getForeignStateAsync` internally
* (crycode-de) Added parses readme
* (crycode-de) Updated dependencies

### 1.0.0-beta.2 (2020-11-23)
* (crycode-de) Added Sentry error reporting
### 1.0.0-beta.1 (2020-11-17)
* (crycode-de) Added optional raw states.
* (crycode-de) Added option to enable/disable rtr states.

### 0.1.0-alpha.1 (2020-11-09)
* (crycode-de) New React UI
* (crycode-de) Support for messages with specific DLC
* (crycode-de) Parsers read on json state change with ack=false

### 0.0.1
* (crycode-de) initial development release

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020 Peter Müller <peter@crycode.de> (https://crycode.de/)