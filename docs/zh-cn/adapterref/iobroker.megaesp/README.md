---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.megaesp/README.md
title: 无题
hash: rrEFJwkYerquTCblm5SJhcy1XC38din97wXnJcyH6f4=
---
![商标](../../../en/adapterref/iobroker.megaesp/admin/megad.png)ioBrokerMega-ESP适配器=================

![NPM版本](http://img.shields.io/npm/v/iobroker.megaesp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.megaesp.svg)
![NPM](https://nodei.co/npm/iobroker.megaesp.png?downloads=true)

让我们通过以太网控制[巨型ESP](http://ab-log.ru/forum/viewtopic.php?f=1&t=1130)。

##English[по русски](#Русский)
##安装
```node iobroker.js add megaesp```

###信息
该设备有10个端口，输入/输出。
读取端口调用的状态

```http://mega_ip/sec/?pt=4&cmd=get``` , where sec is password (max 3 chars), 4 is port number
The result will come as "ON", "OFF" or analog value for analog ports

To set the state call:
```http://mega_ip/sec/?cmd=2:1``` , where sec is password (max 3 chars), 2 is port number, and 1 is the value
For digital ports only 0, 1 and 2 (toggle) are allowed, for analog ports the values from 0 to 255 are allowed

The device can report the changes of ports to some web server in form
```http://ioBroker:80/?pt=6```  , where 6 is the port number

### Configuration

- IP: IP address of Mega-ESP;
- Mega-ESP Name: Name of the Mega-ESP to assign the port changes, e.g. "DevA". If no name set the adapter instance will be used for that;
- Port: Listening port on ioBroker. Default value: 80.
- Poll interval: poll interval in seconds. All configured input ports will be polled in defined interval;
- Password: password to access the device (max 3 characters). Default value "sec";

Mega-ESP can report about changes on some ports if configured.
You can configure something like that "http://ioBrokerIP/instance" on MegaESP in "Net"-Field and Mega-ESP will send reports like this one "http://ioBrokerIP/instance/?pt=7" to ioBroker.
That means the button on port 7 was pressed. ioBroker expects instance number (e.g. "0") or defined name of Mega-ESP (e.g. "DevA"). The "Net" field will look like: "http://192.168.0.8/0/".

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

ioBrokerValue = MegaESPValue * factor + offset;

```

For output:
```

MegaESPValue =（ioBrokerValue  -  offset）/ factor;

```

To get the range of the analog value from 100 to 500 set the factor as 400 and offset = 100.

**The order of the ports is very important. The port in first row will be associated with P0 in MegaESP. In row number 10 with P9.**

-------------------
## Русский
Подробную документацию можно найти здесь: [http://ab-log.ru/forum/viewtopic.php?f=1&t=1130](http://ab-log.ru/forum/viewtopic.php?f=1&t=1130)

### Настройки

- IP Адрес устройства: IP адрес Mega-ESP;
- Mega-ESP Имя: Имя Mega-ESP устройства для идентификации сообщений о смене состояния порта от Mega-ESP, например "DevA". Если имя не задано, то для этих целей будет использоватся номер инстанции драйвера.;
- ioBroker веб-порт: Порт на котором ioBroker разворачивает веб сервер для приёма сообщений от Mega-ESP. Значение по умолчанию: 80.
- Интервал опроса (сек): инетрвал опроса портов в секундах;
- Mega-ESP Пароль: пароль для доступа на Mega-ESP (максимально 3 символа). Значение по умолчанию: "sec";
- Интервал для длинного нажатия (мс): если отжатие после нажатия кнопки произошло позже указанного интервала, то сгенерируется длинное нажатие;
- Интервал двойного нажатия (мс): если между нажатиями пройдет меньше указанного времени, то сгенерируется двойное нажатие;

В сетевых настройках Mega-ESP можно сконфигуририровать IP-адрес ioBroker. При каждом нажатии на кнопку Mega-ESP сообщает ioBroker (restAPI) номер сработавшего входа.

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
- Длинное нажатие: если активировано, то порт будет генерировать событие "длинное нажатие" в объекте port_long (Порт должен быть "цифровой вход" и иметь тип "при изменении")
- Двойное нажатие: если активировано, то порт будет генерировать событие "double click" в объекте port_double

Для выхода:

```

MegaESPЗначение=（ioBrokerЗначение - Сдвиг）/Множитель;

```

Для входа:

```

ioBrokerЗначение=MegaESPЗначение*Множитель+Сдвиг;

```

Например, что бы получить интервал значений от 100 до 500 нужно установить сдиг 100 и множитель 400.

Только аналоговый порт P9 принимают во внимание Множитель и Сдвиг.

**Порядок портов очень важен. Порт в первой колонке таблицы ассоциируется с портом P0 на MegaESP. Порт в колонке 10 с P9.**

## Changelog
### 0.1.0 (2017-03-19)
* (ausHaus) add files

### 0.0.7 (2017-03-17)
* (ausHaus) riname adapter

### 0.0.6 (2017-03-16)
* (ausHaus) fix README

### 0.0.5 (2016-08-20)
* (ausHaus) add MCP23017 in/out

### 0.0.3 (2016-08-20)
* (ausHaus) add RGB

### 0.0.2 (2016-08-20)
* (ausHaus) update

### 0.0.1 (2016-08-16)
* (ausHaus) test