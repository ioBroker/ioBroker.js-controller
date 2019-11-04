---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ds18b20.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ds18b20.svg
BADGE-Dependency Status: https://img.shields.io/david/crycode-de/iobroker.ds18b20.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/crycode-de/ioBroker.ds18b20/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.ds18b20.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/crycode-de/ioBroker.ds18b20/master.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ds18b20/README.md
title: ioBroker.ds18b20
hash: q9VZmrwA+sLrNiHTVoHFc0wpppVHdQmzWD97klY1Kw0=
---
![логотип](../../../de/adapterref/iobroker.ds18b20/../../admin/ds18b20.png)

# IoBroker.ds18b20
Адаптер `ds18b20` обеспечивает прямую интеграцию 1-проводных датчиков температуры типа DS18B20 в ioBroker.

Требуется соответствующее оборудование с поддержкой шины 1-Wire (например, Raspberry Pi), и в системе должна быть функционально настроена шина 1-Wire (датчики перечислены в `/sys/bus/w1/devices/`).

Пример подключения датчиков DS18B20 к Raspberry Pi можно найти ниже.

## Особенности
* Чтение текущего значения температуры
* Автоматическое обнаружение подключенных датчиков
* Обнаружение ошибок при опросе датчиков (контрольная сумма, ошибка связи, устройство отключено)
* Интервал опроса для каждого датчика настраивается
* Округление и преобразование измеренного значения для каждого датчика адаптируется

## Установка
В настоящее время адаптер доступен через последний репозиторий.

Кроме того, его можно установить через URL-адрес `https://github.com/crycode-de/ioBroker.ds18b20.git`.

## Конфигурация
В конфигурации адаптера **стандартный интервал опроса** для всех датчиков может быть установлен в миллисекундах. Минимум 500.

В таблице отдельные датчики могут быть добавлены вручную или через *Поиск датчиков*

![конфигурация](../../../de/adapterref/iobroker.ds18b20/./img/konfiguration.png)

** адрес ** является однопроводным адресом / идентификатором датчика и в то же время определяет идентификатор объекта.
Например, датчик с адресом `28-0000077ba131` получает идентификатор объекта `ds18b20.0.sensors.28-0000077ba131`.

** имя ** может быть свободно выбрано для идентификации датчика.

Для каждого датчика можно установить дополнительный **интервал опроса** в миллисекундах.
Если поле оставить пустым, применяется интервал запроса по умолчанию.
Минимум 500.

** Единица ** определяет единицу, хранящуюся в объекте ioBroker для значения.
По умолчанию это `°C`.

С помощью **Factor** и **Offset** можно настроить значение, считываемое датчиком, в соответствии с формулой `Wert = (Wert * Faktor) + Offset`.

** десятичные разряды ** указывают, сколько раз после десятичной точки значение округляется.
Округление происходит после расчета с коэффициентом и смещением.

** Ноль при ошибке ** определяет, как обрабатывать ошибки при считывании датчика.
Если опция установлена, то значения `null` записываются в состояние датчика в случае ошибок.
Без этой опции состояние не будет обновляться в случае ошибок.

### Преобразование `°C` в `°F`
Чтобы измеренные температуры возвращались адаптером в `°F`, необходимо использовать коэффициент `1.8` и в качестве смещения `32`.

## Действия
Записав в состояние `ds18b20.0.actions.readNow`, можно начать немедленное считывание всего или определенного датчика.

Для немедленного считывания всех датчиков ключевое слово `all` должно быть написано в состоянии.

Если должен быть считан только один конкретный датчик, адрес или идентификатор объекта ioBroker датчика должны быть записаны в состояние.

## Использовать в скриптах
Можно отправлять команды адаптера для чтения данных датчика или для поиска датчиков.

### `readNow`
Команда `readNow` запускает немедленный запрос всех или определенного датчика.
Чтобы запросить все датчики, часть сообщения можно оставить пустой или использовать строку `all`.
Чтобы прочитать определенный датчик, часть сообщения должна быть настроена на адрес или ioBroker ID датчика.

Команда `readNow` не возвращает данных. Он только запускает немедленное считывание датчиков.

```js
sendTo('ds18b20.0', 'readNow');
sendTo('ds18b20.0', 'readNow', '28-0000077ba131');
```

### `read`
Один датчик можно прочитать с помощью команды `read`.
Часть сообщения должна быть адресом или идентификатором объекта ioBroker датчика, который будет считан.
Считанное значение может быть дополнительно обработано с помощью функции обратного вызова.

```js
sendTo('ds18b20.0', 'read', '28-0000077ba131', (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    }
});
```

### `search`
Команда `search` выполняет поиск подключенных в данный момент 1-проводных датчиков и возвращает адреса датчиков, найденные с помощью функции обратного вызова.

```js
sendTo('ds18b20.0', 'search', {}, (ret) => {
    log('ret: ' + JSON.stringify(ret));
    if (ret.err) {
        log(ret.err, 'warn');
    } else {
        for (let s of ret.sensors) {
            log('Sensor: ' + s);
        }
    }
});
```

## Информация об адаптере
Используя состояние `ds18b20.*.info.connection`, каждый экземпляр адаптера предоставляет информацию о том, предоставляют ли данные все настроенные датчики.
Если последнее считывание всех датчиков прошло успешно, это состояние - `true`.
Как только один из датчиков имеет ошибку, это состояние `false`.

## DS18B20 на Raspberry Pi
Подключение датчиков температуры DS18B20 к Raspberry Pi выполняется, как показано на следующем рисунке.
Обратите внимание, что подтягивающий резистор должен быть подключен к + 3,3 В вместо + 5 В, так как это повредит GPIO.
В этом примере используется GPIO.04 (BCM).

![DS18B20 Raspberry Pi](../../../de/adapterref/iobroker.ds18b20/./img/raspi-ds18b20.png)

Чтобы активировать шину 1-Wire на Raspberry Pi, необходимо добавить следующую строку в файл `/boot/config.txt` и затем Raspberry Pi необходимо перезапустить.

```
dtoverlay=w1-gpio,gpiopin=4
```

Если все работает, подключенные датчики отображаются под `/sys/bus/w1/devices/`.

```
$ ls -l /sys/bus/w1/devices/
insgesamt 0
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b4592 -> ../../../devices/w1_bus_master1/28-0000077b4592
lrwxrwxrwx 1 root root 0 Nov  2 11:18 28-0000077b9fea -> ../../../devices/w1_bus_master1/28-0000077b9fea
lrwxrwxrwx 1 root root 0 Nov  2 10:49 w1_bus_master1 -> ../../../devices/w1_bus_master1
```

## Changelog
### 1.0.3 (2019-11-03)
* (Peter Müller) Added documentation about DS18B20 at a Raspberry Pi; Dependencies updated

### 1.0.2 (2019-10-07)
* (Peter Müller) Display error message when tried to search for sensors without adapter running.

### 1.0.1 (2019-10-01)
* (Peter Müller) Type changed to hardware, Renamed command, Added missing documentation

### 1.0.0 (2019-09-09)
* (Peter Müller) initial release

## License

Copyright (c) 2019 Peter Müller <peter@crycode.de>

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.