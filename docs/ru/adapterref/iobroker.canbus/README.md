---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.canbus/README.md
title: ioBroker.canbus
hash: BsHvCP3XTKPy/kU0CP3ByqkoVjiWxgvleJmi5vIW3nQ=
---
# IoBroker.canbus
![Логотип](../../../en/adapterref/iobroker.canbus/admin/canbus.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.canbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.canbus.svg)
![Количество установок (последнее)](https://iobroker.live/badges/canbus-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/canbus-stable.svg)
![Статус зависимости](https://img.shields.io/david/crycode-de/iobroker.canbus.svg)
![НПМ](https://nodei.co/npm/iobroker.canbus.png?downloads=true)

[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Тесты: ** ![Тестирование и выпуск](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## Адаптер CAN-шины для ioBroker
Этот адаптер подключает ioBroker к сети контроллеров (шина CAN).

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Функции
* Получать и отправлять необработанные сообщения с использованием стандартных и расширенных фреймов.
* Каждое сообщение может быть настроено для приема и / или отправки данных
* Возможность автоматического добавления объектов для увиденных сообщений CAN, которые еще не настроены
* Настройте парсеры для каждого сообщения для чтения / записи данных из / в буфер необработанных сообщений
  * Числовые типы
  * Логические значения, включая поддержку битовой маски
  * Строки в разных кодировках символов
  * Пользовательские скрипты для чтения / записи из / в буфер необработанных данных
* Расширенная функция импорта / экспорта
  * Импорт конфигураций сообщений для расширения существующей конфигурации
  * Импорт предопределенных "хорошо известных" конфигураций из GitHub в интерфейсе администратора.
  * Экспортируйте и импортируйте конфигурации сообщений в виде файлов `json` или` csv`
* Дополнительная поддержка фиксированной длины данных (DLC)
* Дополнительная поддержка флага RTR
* Дополнительные необработанные состояния, содержащие необработанные объекты сообщений CAN

## Требования
* Операционная система Linux (из-за используемой библиотеки socketcan)
* Оборудование CAN, которое поддерживается ядром и создает интерфейс, подобный `can0`
* Некоторые знания о сообщениях, отправляемых на CAN-шину

## Парсеры
Используя синтаксические анализаторы, вы можете читать или записывать данные в буфер сообщений CAN.

Существуют предопределенные парсеры для следующих типов данных.
Кроме того, вы можете написать собственные сценарии для чтения / записи значений с помощью *настраиваемого парсера*

### Числовые типы в репрезентации *с прямым порядком байтов* и *с прямым порядком байтов*
* Знаковые и беззнаковые 8-, 16- и 32-битные целые числа
* 32-битное число с плавающей запятой
* 64-битный двойной

### Логическое
* 1 байт, включая поддержку битовой маски

### Нить
* Длина от 1 до 8 байт
*Кодировка: * ascii *, * base64 *, * hex *, * latin1 *, * utf8 *, * utf16le*

### Обычай
Для настраиваемого парсера вы должны предоставить собственный сценарий чтения и записи.
Эти скрипты должны быть чистым javascript и запускаться в песочнице.

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

В начале пользовательского сценария чтения `buffer` будут данными полученного / текущего сообщения CAN (как в состоянии `.json`).
`value` будет `undefined` и должен быть установлен скриптом.

Содержимое переменной `value` в конце настраиваемого сценария чтения будет использоваться как новое значение для состояния.
Если `value` равен `undefined`, он будет проигнорирован. Используя это, вы можете фильтровать сообщения в пользовательском сценарии чтения по частям данных.

##### Пример настраиваемого сценария чтения
Проверьте первые три байта в полученном буфере на соответствие фиксированным значениям.
При совпадении считайте 16-битовое целое число со знаком из байтов 3 и 4 буфера и разделите его на 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Причина `value` устанавливается только при совпадении первых трех байтов, все остальные данные будут проигнорированы и не будут устанавливать новое значение для состояния.

#### Пользовательский сценарий записи
В сценарии записи вы должны изменить (или заменить) переменную `buffer`.

В начале пользовательского сценария записи, `buffer` будет текущими данными сообщения CAN (как в состоянии `.json`).
`value` устанавливается в значение состояния, которое должно быть записано в `buffer`.

Содержимое переменной `buffer` в конце настраиваемого сценария записи будет использоваться в качестве новых данных для сообщения CAN.

##### Пример настраиваемого сценария записи
Подготовьте новый буфер с фиксированными значениями.
Запишите значение состояния в буфер как 16-битное целое число со знаком, начиная с пятого байта в буфере.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

После этого новый `buffer` будет установлен как состояние `.json`.
Если для сообщения включена опция *autosend* сообщение будет отправлено автоматически.

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

### 1.1.3 (2021-04-12)
* (crycode-de) Added definition of possible state values in admin
* (crycode-de) Added selection of the state role for each parser in admin
* (crycode-de) Fixed display bug of floating action buttons in admin
* (crycode-de) Export uses defaults if some config parts are not defined (e.g. if the config is from an older version)
* (crycode-de) Fixed wrong validation if a message/parser was deleted

### 1.1.2 (2021-04-06)
* (crycode-de) Added copy/paste function for message and parser configurations in admin

### 1.1.1 (2021-04-02)
* (crycode-de) Import bugfixes
* (crycode-de) Prevent wrong log warning if a parser returned undefined
* (crycode-de) Added react errorboundary for better clientside error handling

### 1.1.0 (2021-04-01)
* (crycode-de) Added import/export feature for messages in json or csv format
* (crycode-de) Added import of well known configurations from GitHub
* (crycode-de) Fixed config import in admin
* (crycode-de) Added ioBroker state data type option for custom parsers

### 1.0.2 (2021-03-26)
* (crycode-de) Fixed issue where missing state prevented custom parser write
* (DutchmanNL) Dutch translation updates
* (UncleSamSwiss) French translation updates
* (VeSler) Russian translation updates

### 1.0.1 (2021-03-12)
* (crycode-de) Use a queue to process _parser_ and _send_ state changes in the correct order
* (crycode-de) Fixed some spelling issues
* (crycode-de) Updated dependencies

### 1.0.0 (2021-02-23)
* (crycode-de) Sort messages in admin
* (VeSler) Russian admin translations
* (crycode-de) Updated dependencies

Older changelog is in CHANGELOG_OLD.md

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2021 Peter Müller <peter@crycode.de> (https://crycode.de/)