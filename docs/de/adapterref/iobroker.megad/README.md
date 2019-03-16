![Logo](media/megad.png)
ioBroker MegaD-328 adapter
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.megad.svg)](https://www.npmjs.com/package/iobroker.megad)
[![Downloads](https://img.shields.io/npm/dm/iobroker.megad.svg)](https://www.npmjs.com/package/iobroker.megad)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.megad.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.megad)

[![NPM](https://nodei.co/npm/iobroker.megad.png?downloads=true)](https://nodei.co/npm/iobroker.megad/)

Lets control the [MegaD-328](http://www.ab-log.ru/smart-house/ethernet/megad-328) over ethernet.
## English 
[по русски](#Русский)

## Install

```node iobroker.js add megad```

### Information
The device has 14 ports, 0-7 inputs and 8-13 outputs.
To read the state of the port call
```http://mega_ip/sec/?pt=4&cmd=get``` , where sec is password (max 3 chars), 4 is port number
The result will come as "ON", "OFF" or analog value for analog ports

To set the state call:
```http://mega_ip/sec/?cmd=2:1``` , where sec is password (max 3 chars), 2 is port number, and 1 is the value
For digital ports only 0, 1 and 2 (toggle) are allowed, for analog ports the values from 0 to 255 are allowed

The device can report the changes of ports to some web server in form
```http://ioBroker:80/?pt=6```  , where 6 is the port number

MegaD-328 cannot report on other port than 80.

### Configuration

- IP: IP address of MegaD-328;
- MegaD-328 Name: Name of the MegaD-328 to assign the port changes, e.g. "DevA". If no name set the adapter instance will be used for that;
- Port: Listening port on ioBroker. MegaD-328 cannot send to ports other than 80. Default value: 80. 
- Poll interval: poll interval in seconds. All configured input ports will be polled in defined interval;
- Password: password to access the device (max 3 characters). Default value "sec";

MegaD-328 can report about changes on some ports if configured. 
You can configure something like that "http://ioBrokerIP/instance" on MegaD-328 in "Net"-Field and MegaD-328 will send reports like this one "http://ioBrokerIP/instance/?pt=7" to ioBroker. 
That means the button on port 7 was pressed. ioBroker expects instance number (e.g. "0") or defined name of MegaD-328 (e.g. "DevA"). The "Net" field will look like: "http://192.168.0.8/0/".

### Ports
All ports, that are desired to be used must be configured in right order. Following settings must be set for every port:

- Name: name of the port. Used by ioBroker;
- Input: Is the port INPUT(true) or output(false);
- Switch: Is the port can be ON or OFF (in this case value = TRUE) or just used to send the reports about button press (FALSE);
- Digital: Analog or digital port. ioBroker expects analog ports with range from 0 to 255.
- Offset: offset for the **analog** port.
- Factor:  multiply factor for **anaolog** port.
- Long press: detect long press on digital port (port have to be SWITCH type)
- Double click ms: interval for detection of double click

For input:
```
ioBrokerValue = MegaValue * factor + offset;
```

For output: 
```
MegaValue = (ioBrokerValue - offset) / factor;
```

To get the range of the analog value from 100 to 500 set the factor as 400 and offset = 100.

**The order of the ports is very important. The port in first row will be associated with P0 in MegaD-328. In row number 14 with P13.**

-------------------
## Русский        
Подробную документацию можно найти здесь: [http://www.ab-log.ru/smart-house/ethernet/MegaD-328](http://www.ab-log.ru/smart-house/ethernet/MegaD-328)
    
### Настройки

- IP Адрес устройства: IP адрес MegaD-328;
- MegaD Имя: Имя MegaD-328 устройства для идентификации сообщений о смене состояния порта от MegaD-328, например "DevA". Если имя не задано, то для этих целей будет использоватся номер инстанции драйвера.;
- ioBroker веб-порт: Порт на котором ioBroker разворачивает веб сервер для приёма сообщений от MegaD-328. MegaD-328 не поддерживает на данный момент порты отличные от 80. Значение по умолчанию: 80. 
- Интервал опроса (сек): инетрвал опроса портов в секундах;
- MegaD-328 Пароль: пароль для доступа на MegaD-328 (максимально 3 символа). Значение по умолчанию: "sec";
- Интервал для длинного нажатия (мс): если отжатие после нажатия кнопки произошло позже указанного интервала, то сгенерируется длинное нажатие;
- Интервал двойного нажатия (мс): если между нажатиями пройдет меньше указанного времени, то сгенерируется двойное нажатие;

В сетевых настройках MegaD-328 можно сконфигуририровать IP-адрес ioBroker. При каждом нажатии на кнопку MegaD-328 сообщает ioBroker (restAPI) номер сработавшего входа. 

Выглядит запрос примерно следующим образом:
´´´http://192.168.0.250/0/?pt=7´´´

### Порты
Необходимо сконфигурироваь все порты, которые должны быть видимы в ioBorker. Для каждого порта необходимо настроить следующее:

- Имя: имя порта. Исползуется в ioBroker для создание объектов;
- Вход: является ли порт входом (true) или выходом(false);
- Переключатель: Может ли порт быть в положениях ВКЛ и ВЫКЛ (в этом случае значение TRUE) или он просто используется для сигнализирования нажатия на кнопку (FALSE);
- Цифровой: Цифровой или аналоговый порт. ioBroker ожидает значени с аналогового порта в промежутке от 0 до 255.
- Множитель:  множитель для значения **аналогового** порта.
- Сдвиг: сдвиг для значения **аналогового** порта.
- Длинное нажатие: если активировано, то порт будет генерировать событие "длинное нажатие" в объекте port_long (Порт должен быть цифровым и иметь тип "Переключатель")
- Двойное нажатие: если активировано, то порт будет генерировать событие "double click" в объекте port_double

Для выхода:

```
MegaЗначение = (ioBrokerЗначение - Сдвиг) / Множитель;
```

Для входа:

```
ioBrokerЗначение = MegaЗначение * Множитель + Сдвиг;
```

Например, что бы получить интервал значений от 100 до 500 нужно установить сдиг 100 и множитель 400.

Только аналоговые порты принимают во внимание Множитель и Сдвиг.

**Порядок портов очень важен. Порт в первой колонке таблицы ассоциируется с портом P0 на MegaD-328. Порт в колонке 14 с P13.**          
         
          
## Changelog
### 1.3.0 (2017-11-23)
* (ausHaus) Removed support DHT11 sensors
* (ausHaus) Added hysteresis function (ADC ports and DS18B20 sensors)
* (ausHaus) Deleted team tget (request for internal temperature sensor value) is not yet done
* (ausHaus) Added the ability to Smooth to control smooth speed PWM control.

### 1.2.1 (2016-08-14)
* (bluefox) extend digital temperature sensor with new type

### 1.2.0 (2016-05-03)
* (bluefox) add info.connection state
* (bluefox) fix error if more ports in megad than configured

### 1.1.0 (2015-12-22)
* (bluefox) make counters writeable

### 1.1.0 (2015-12-17)
* (bluefox) add counter for digital inputs
* (bluefox) fix the internal temperature sensor monitor

### 1.0.6 (2015-11-13)
* (bluefox) fix short press

### 1.0.5 (2015-11-11)
* (bluefox) fix small errors

### 1.0.4 (2015-11-10)
* (bluefox) fix errors after optimization

### 1.0.3 (2015-11-06)
* (bluefox) if 1wire sensor not connected, NA value will be received 

### 1.0.2 (2015-11-04)
* (bluefox) fix using of more than one megad

### 1.0.1 (2015-10-03)
* (bluefox) support of iButton

### 1.0.0 (2015-10-03)
* (bluefox) Fix small error with 1-Wire and threshold mode

### 0.2.14 (2015-09-30)
* (bluefox) fix discover function

### 0.2.13 (2015-09-29)
* (bluefox) add link to admin (only with admin version >= 0.5.14)
* (bluefox) use misc flag 
* (bluefox) enable pwm only for ports 10,12,13
* (bluefox) disable action for DHT11/22

### 0.2.12 (2015-09-29)
* (bluefox) fix discover function
* (bluefox) generate true and false for simple clicks

### 0.2.11 (2015-09-28)
* (bluefox) disable discover button if adapter disabled
* (bluefox) fix discover function
* (bluefox) write for inputs misc=1 and add de-bounce parameter

### 0.2.10 (2015-09-26)
* (bluefox) return "OK" and not "OK->" to other than 0 instances

### 0.2.9 (2015-09-20)
* (bluefox) change server script from "/0/" to "0/"

### 0.2.8 (2015-09-19)
* (bluefox) fix PWM output

### 0.2.6 (2015-09-18)
* (bluefox) tuning on settings for ports: Ports 14 and 15 are always ADC. Threshold are shown only for 1-wire if digital sensor.

### 0.2.5 (2015-09-17)
* (bluefox) fix settings for digital sensors

### 0.2.4 (2015-09-11)
* (bluefox) fix read of analog inputs (0-1023)

### 0.2.3 (2015-09-09)
* (bluefox) fix read of PWM values

### 0.2.2 (2015-09-07)
* (bluefox) fix write outputs
* (bluefox) implement discover function

### 0.2.1 (2015-08-27)
* (bluefox) works only with latest firmware. 
            For Digital Sensor the meaning of attribute m was changed from "sensor type" to "threshold detection"
            Sensor type is "d"
* (bluefox) support of digital sensors 1W and iB            

### 0.2.0 (2015-08-19)
* (bluefox) completely rewrite adapter

### 0.1.2 (2015-06-29)
* (bluefox) add tests

### 0.1.1 (2015-05-24)
* (bluefox) add 14,15 ports
* (bluefox) add settings for port 3

### 0.1.0 (2015-05-22)
* (bluefox) fix error if no configuration for ports

### 0.0.3 (2015-03-14)
* (bluefox) double click&long click
* (bluefox) fix error with read all ports together

### 0.0.2 (2015-03-14)
* (bluefox) read status off all ports together

### 0.0.1 (2015-03-05)
* (bluefox) make socket usable as module
