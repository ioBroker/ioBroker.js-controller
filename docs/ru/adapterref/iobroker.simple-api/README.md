---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-api/README.md
title: Простой апи
hash: NU/ASH5oDUPKo5V5ywigX+HJJDXUrsPD9MOK4WgvGZ0=
---
![логотип](../../../en/adapterref/iobroker.simple-api/admin/simple-api.png)

![Количество установок](http://iobroker.live/badges/simple-api-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.simple-api.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.simple-api.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.simple-api.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.simple-api.png?downloads=true)

# Simple-api
Это интерфейс RESTFul для чтения объектов и состояний из ioBroker и для записи / управления состояниями по HTTP-запросам Get / Post.

## Использование
Позвоните в браузер ```http://ipaddress:8087/help```, чтобы получить справку об API. Результат:

```
{
  "getPlainValue": "http://ipaddress:8087/getPlainValue/stateID",
  "get": "http://ipaddress:8087/get/stateID/?prettyPrint",
  "getBulk": "http://ipaddress:8087/getBulk/stateID1,stateID2/?prettyPrint",
  "set": "http://ipaddress:8087/set/stateID?value=1&prettyPrint",
  "toggle": "http://ipaddress:8087/toggle/stateID&prettyPrint",
  "setBulk": "http://ipaddress:8087/setBulk?stateID1=0.7&stateID2=0&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&prettyPrint",
  "objects": "http://ipaddress:8087/objects?pattern=system.adapter.admin.0*&type=adapter&prettyPrint",
  "states": "http://ipaddress:8087/states?pattern=system.adapter.admin.0*&prettyPrint"
  "search": "http://192.168.0.24:8087/search?pattern=system.adapter.admin.0*&prettyPrint",
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?noHistory=true&prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&d&prettyPrint"
  "query": "http://192.168.0.24:8087/query/stateID1,stateID2/?dateFrom=2019-06-06T12:00:00.000Z&dateTo=2019-06-06T12:00:00.000Z&prettyPrint"
}
```

### GetPlainValue
Звоните, например:

```
http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive
```

Результат:

```
true
```

### Получить
Звоните, например:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive
```

Результат:

```
{"val":true,"ack":true,"ts":1442432193,"from":"system.adapter.admin.0","lc":1442431190,"expire":23437,"_id":"system.adapter.admin.0.alive","type":"state","common":{"name":"admin.0.alive","type":"boolean","role":"indicator.state"},"native":{}}
```

или позвоните, например:

```
http://ipaddress:8087/get/system.adapter.admin.0.alive?prettyPrint
```

Результат:

```
{
  "val": true,
  "ack": true,
  "ts": 1442432238,
  "from": "system.adapter.admin.0",
  "lc": 1442431190,
  "expire": 28494,
  "_id": "system.adapter.admin.0.alive",
  "type": "state",
  "common": {
    "name": "admin.0.alive",
    "type": "boolean",
    "role": "indicator.state"
  },
  "native": {}
}
```

### GetBulk
    получить много состояний одним запросом, возвращенным как массив объектов в порядке списка в запросе и id / val / ts как подобъект

### Задавать
Звоните, например:

```
http://ipaddress:8087/set/javascript.0.test?value=1
```

Результат:

```
{"id":"javascript.0.test","value":1}
```

или позвоните, например:

```
http://ipaddress:8087/set/javascript.0.test?value=1&prettyPrint
```

Результат:

```
{
  "id": "javascript.0.test",
  "value": 1
}
```

Конечно, точка данных *javascript.0.test* должна существовать.

### Переключатель
    переключает значение:

- логическое: true => false, false => true
- число без ограничений: х => 100-х
- число с ограничениями: x => max - (x - min)

### SetBulk
    Установить много состояний одним запросом. Этот запрос также поддерживает метод POST, поскольку данные POST должны быть в теле, а не в URL.

### SetValueFromBody
    Позволяет установить значение данного состояния, устанавливаемого содержимым тела POST.

### Объекты
### Состояния
### Поиск
Если в конфигурации задан источник данных (History, SQL), то будут перечислены только точки данных, известные источнику данных.
Если активирована опция «Список всех точек данных» или не указан источник данных, будут перечислены все точки данных.
Эта команда необходима для подключаемого модуля Grafana JSON / SimpleJSON.

### Запрос
Если был указан источник данных (History, SQL), данные из указанных точек данных считываются за указанный период, в противном случае считывается только текущее значение.
Эта команда необходима для подключаемого модуля Grafana JSON / SimpleJSON.

### Помогите
Возвращает [этот](#usage) обратно

## Установить
```node iobroker.js add simple-api```

## Использование
Предположим, у нас нет защиты, и сервер работает по умолчанию через порт 8087.

Для всех запросов можно указать имя или идентификатор состояния.

Для каждого запроса, который возвращает JSON, вы можете установить параметр *prettyPrint* чтобы получить вывод в удобочитаемой форме.

Если аутентификация включена, два других поля являются обязательными: <pre> ? Пользователь = администратора и передать = iobroker </pre>

### GetPlainValue
Прочитайте значение состояния как текст. Вы можете указать больше идентификаторов, разделенных точкой с запятой

<pre> http:// IP: 8087 / getPlainValue / admin.0.memHeapTotal </pre>

<pre> 31,19 </pre>

<pre> http:// ip: 8087 / getPlainValue / admin.0.memHeapTotal, admin.0.memHeapUsed </pre><pre> 31,19 17,52 </pre>

### Получить
Считать состояние и данные объекта состояния как json. Вы можете указать больше идентификаторов, разделенных точкой с запятой.
Если запрошено более одного идентификатора, будет возвращен массив JSON.

<pre> http:// локальный: 8087 / прибудете / admin.0.memHeapTotal / prettyPrint </pre>

<pre> {&quot;val&quot;: 31.19, &quot;ack&quot;: true, &quot;ts&quot;: 1423154619, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc&quot;: 1423153989, &quot;_id&quot;: &quot;system.adapter.admin. 0.memHeapTotal &quot;,&quot; type &quot;:&quot; state &quot;,&quot; common &quot;: {&quot; name &quot;:&quot; admin.0.memHeapTotal &quot;,&quot; type &quot;:&quot; number &quot;,&quot; role &quot;:&quot; Indicator.state &quot;,&quot; unit &quot;:&quot; MB &quot;,&quot; history &quot;: {&quot; enabled &quot;: true,&quot; changesOnly &quot;: true,&quot; minLength &quot;: 480,&quot; maxLength &quot;: 960,&quot; retention &quot;: 604800,&quot; debounce &quot;: 10000}},&quot; родные&quot;: {} } </pre>

<pre> http:// IP: 8087 / прибудет / admin.0.memHeapTotal, admin.0.memHeapUsed / prettyPrint </pre><pre> [{&quot;val&quot;: 31.19, &quot;ack&quot;: true, &quot;ts&quot;: 1423154544, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc&quot;: 1423153989, &quot;_id&quot;: &quot;system.adapter.admin .0.memHeapTotal &quot;,&quot; type &quot;:&quot; state &quot;,&quot; common &quot;: {&quot; name &quot;:&quot; admin.0.memHeapTotal &quot;,&quot; type &quot;:&quot; number &quot;,&quot; role &quot;:&quot; Indicator.state &quot;,&quot; unit &quot;:&quot; MB &quot;,&quot; history &quot;: {&quot; enabled &quot;: true,&quot; changesOnly &quot;: true,&quot; minLength &quot;: 480,&quot; maxLength &quot;: 960,&quot; retention &quot;: 604800,&quot; debounce &quot;: 10000}}, &quot;native&quot;: {}}, {&quot;val&quot;: 16.25, &quot;ack&quot;: true, &quot;ts&quot;: 1423154544, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc&quot;: 1423154544, &quot;_id&quot; : &quot;system.adapter.admin.0.memHeapUsed&quot;, &quot;type&quot;: &quot;state&quot;, &quot;common&quot;: {&quot;name&quot;: &quot;admin.0.memHeapUsed&quot;, &quot;type&quot;: &quot;number&quot;, &quot;role&quot;: &quot;Indicator.state&quot;, &quot;unit&quot;: &quot;MB&quot;, &quot;history&quot;: {&quot;enabled&quot;: true, &quot;changesOnly&quot;: true, &quot;minLength&quot;: 480, &quot;maxLength&quot;: 960, &quot;retention&quot;: 604800, &quot; debounce &quot;: 10000}},&quot; native &quot;: {}}] </pre>

### GetBulk
Читайте состояния больше идентификаторов с отметкой времени. Вы можете указать больше идентификаторов, разделенных точкой с запятой.
Всегда будет возвращен массив JSON.

<pre> http:// IP: 8087 / GetBulk / admin.0.memHeapTotal, admin.0.memHeapUsed / prettyPrint </pre>

<pre> {&quot;admin.0.memHeapTotal&quot;: {&quot;val&quot;: 31.19, &quot;ts&quot;: 1423154754}, &quot;admin.0.memHeapUsed&quot;: {&quot;val&quot;: 15.6, &quot;ts&quot;: 1423154754}} </pre>

### Задавать
Напишите состояния с указанными идентификаторами. Вы можете указать опцию *wait* в миллисекундах, чтобы дождаться ответа от водителя.

<pre> http:// IP: 8087 / набор / гм-rpc.0.IEQ12345.LEVEL значение = 1 &amp; prettyPrint </pre><pre> {&quot;id&quot;: &quot;hm-rpc.0.IEQ12345.LEVEL&quot;, &quot;value&quot;: 1} </pre>

<pre> http:// IP: 8087 / набор / гм-rpc.0.IEQ12345.LEVEL значение = 1 &amp; ждать = 5000 &amp; prettyPrint </pre><pre> {&quot;val&quot;: 1, &quot;ack&quot;: true, &quot;ts&quot;: 1423155399, &quot;from&quot;: &quot;hm-rpc.0.IEQ12345.LEVEL&quot;, &quot;lc&quot;: 1423155399} </pre>

Если ответ не будет получен в указанное время, будет возвращено значение *null* В первом случае ответ будет возвращен немедленно, а *ack* будет ложным. Во втором случае *ack* верно. Это означает, что это был ответ от водителя.

### SetBulk
- написать большую часть идентификаторов в одном запросе.

<pre> http:// IP: 8087 / setBulk гм-rpc.0.FEQ1234567: 1.LEVEL = 0,7 &amp; Anwesenheit = 0 &amp; prettyPrint </pre><pre> [{&quot;id&quot;: &quot;hm-rpc.0.FEQ1234567: 1.LEVEL&quot;, &quot;val&quot;: &quot;0.7&quot;}, {&quot;error&quot;: &quot;error: datapoint \&quot; Anwesenheit \ &quot;not found&quot;}] </pre> Вы также можете отправить этот запрос как POST.

### Объекты
Получить список всех объектов для шаблона. Если шаблон не указан, будут возвращены все объекты в виде массива JSON.

<pre> http:// IP: 8087 / объекты prettyPrint? </pre><pre> {&quot;system.adapter.admin.0.uptime&quot;: {&quot;_id&quot;: &quot;system.adapter.admin.0.uptime&quot;, &quot;type&quot;: &quot;state&quot;, &quot;common&quot;: {&quot;name&quot;: &quot;admin. 0.uptime &quot;,&quot; type &quot;:&quot; number &quot;,&quot; role &quot;:&quot; Indicator.state &quot;,&quot; unit &quot;:&quot; seconds &quot;},&quot; native &quot;: {}},&quot; system.adapter.admin.0.memRss &quot;: {&quot; _id &quot;:&quot; system.adapter.admin.0.memRss &quot;,&quot; type &quot;:&quot; state &quot;,&quot; common &quot;: {&quot; name &quot;:&quot; admin.0.memRss &quot;,&quot; desc &quot;:&quot; Resident установить размер &quot;,&quot; тип &quot;:&quot; число &quot;,&quot; роль &quot;:&quot; индикатор.стейт &quot;,&quot; единица измерения &quot;:&quot; МБ &quot;,&quot; история &quot;: {&quot; включено &quot;: true,&quot; changesOnly &quot;: true,&quot; minLength &quot; : 480, &quot;maxLength&quot;: 960, &quot;retention&quot;: 604800, &quot;debounce&quot;: 10000}}, &quot;native&quot;: {}}, ...
</pre>

Получить все объекты управления адаптера system.adapter.admin.0: <pre> http:// IP: 8087 / объекты шаблон = system.adapter.admin.0 * &amp; prettyPrint </pre><pre> {&quot;system.adapter.admin.0.uptime&quot;: {&quot;_id&quot;: &quot;system.adapter.admin.0.uptime&quot;, &quot;type&quot;: &quot;state&quot;, &quot;common&quot;: {&quot;name&quot;: &quot;admin. 0.uptime &quot;,&quot; type &quot;:&quot; number &quot;,&quot; role &quot;:&quot; Indicator.state &quot;,&quot; unit &quot;:&quot; seconds &quot;},&quot; native &quot;: {}}, ...

</ PRE>

### Состояния
Получить список всех состояний для шаблона. Если шаблон не указан, будут возвращены все состояния в виде массива JSON.

<pre> http:// IP: 8087 / состояния prettyPrint </pre><pre> {&quot;system.adapter.admin.0.uptime&quot;: {&quot;val&quot;: 32176, &quot;ack&quot;: true, &quot;ts&quot;: 1423156164, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc&quot;: 1423156164}, &quot;system.adapter.admin.0.memRss&quot;: {&quot;val&quot;: 41.14, &quot;ack&quot;: true, &quot;ts&quot;: 1423156164, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc &quot;: 1423156119},&quot; system.adapter.admin.0.memHeapTotal &quot;: {&quot; val &quot;: 31.19,&quot; ack &quot;: true,&quot; ts &quot;: 1423156164,&quot; from &quot;:&quot; system.adapter.admin.0 &quot;, &quot;lc&quot;: 1423155084}, ...
</pre>

 Получить все объекты управления адаптера system.adapter.admin.0:

<pre> http:// IP: 8087 / состояния шаблон = system.adapter.admin.0 * &amp; prettyPrint </pre><pre> {&quot;system.adapter.admin.0.uptime&quot;: {&quot;val&quot;: 32161, &quot;ack&quot;: true, &quot;ts&quot;: 1423156149, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc&quot;: 1423156149}, &quot;system.adapter.admin.0.memRss&quot;: {&quot;val&quot;: 41.14, &quot;ack&quot;: true, &quot;ts&quot;: 1423156149, &quot;from&quot;: &quot;system.adapter.admin.0&quot;, &quot;lc &quot;: 1423156119},&quot; system.adapter.admin.0.memHeapTotal &quot;: {&quot; val &quot;: 31.19,&quot; ack &quot;: true,&quot; ts &quot;: 1423156149,&quot; from &quot;:&quot; system.adapter.admin.0 &quot;, &quot;lc&quot;: 1423155084}, &quot;system.adapter.admin.0.memHeapUsed&quot;: {&quot;val&quot;: 19.07, &quot;ack&quot;: true, &quot;ts&quot;: 1423156149, &quot;from&quot;: &quot;system.adapter.admin.0 &quot;,&quot; lc &quot;: 1423156149},&quot; system.adapter.admin.0.connected &quot;: {&quot; val &quot;: true,&quot; ack &quot;: true,&quot; ts &quot;: 1423156149,&quot; from &quot;:&quot; system.adapter.admin .0 &quot;,&quot; lc &quot;: 1423128324,&quot; expire &quot;: 28100},&quot; system.adapter.admin.0.alive &quot;: {&quot; val &quot;: true,&quot; ack &quot;: true,&quot; ts &quot;: 1423156149,&quot; from &quot;:&quot; system.adapter.admin.0 &quot;,&quot; lc &quot;: 1423128324,&quot; expire &quot;: 28115}} </pre>

### Поиск
Если в конфигурации задан источник данных (History, SQL), то будут перечислены только точки данных, известные источнику данных.
Если активирована опция «Список всех точек данных» или не указан источник данных, будут перечислены все точки данных.

<pre> http:// IP: 8087 / шаблон поиска = system.adapter.admin.0 * &amp; prettyPrint </pre><pre> {&quot;system.adapter.admin.0.outputCount&quot;, &quot;system.adapter.admin.0.inputCount&quot;, &quot;system.adapter.admin.0.uptime&quot;, &quot;system.adapter.admin.0.memRss&quot;, &quot; system.adapter.admin.0. adapter.admin.0.connected &quot;,&quot; system.adapter.admin.0.alive &quot;} </pre>

### Запрос
Если был указан источник данных (History, SQL), данные из указанных точек данных считываются за указанный период.

<pre> http:// IP: 8087 / запрос / system.host.iobroker-dev.load, system.host.iobroker-dev.memHeapUsed / prettyPrint &amp; dateFrom = 2019-06-08T01: 00: 00.000Z &amp; dateTo = 2019-06-08T01: 00: 10.000Z </pre><pre> [{&quot;target&quot;: &quot;system.host.iobroker-dev.load&quot;, &quot;datapoints&quot;: [[0.12, 1559955600000], [0.46, 1559955601975], [0.44, 1559955610000]]}, {&quot;target&quot;: &quot;system .host.iobroker-dev.memHeapUsed &quot;,&quot; datapoints &quot;: [[23.01, 1559955600000], [22.66, 1559955601975], [22.69, 1559955610000]]}] </pre>

Если источник данных не указан или передан параметр noHistory, то будет считано только текущее значение точки данных.

<pre> http:// IP: 8087 / запрос / system.host.iobroker-dev.load, system.host.iobroker-dev.memHeapUsed / prettyPrint &amp; noHistory = верно? </pre><pre> [{&quot;target&quot;: &quot;system.host.iobroker-dev.load&quot;, &quot;datapoints&quot;: [[0.58, 1559970500342]]}, {&quot;target&quot;: &quot;system.host.iobroker-dev.memHeapUsed&quot;, &quot;datapoints &quot;: [[21.53, 1559970500342]]}] </pre>

## Changelog

### 2.1.0 (2019-07-05)
* (Marco.K) Added command set for the Grafana plugins JSON / SimpleJSON. Usage see https://forum.iobroker.net/topic/23033/aufruf-modifikation-simpleapi-adapter-iobroker-als-datenquelle-f%C3%BCr-grafana

### 2.0.5 (2019-06-26)
* (Apollon77) remove logging

### 2.0.4 (2019-06-23)
* (Apollon77) fix usage as web extension

### 2.0.2 (2018-12-17)
* (Apollon77) fix decoding for state Ids with # in it

### 2.0.0 (2018-06-29)
* (Giermann) BREAKING CHANGE: getBulk is returning data in a different structure

### 1.6.3 (2018-04-15)
* (Apollon77) Return used character encoding (UTF-8)

### 1.6.2 (2017-11-27)
* (Apollon77) Fix decoding problems

### 1.6.1 (2017-09-25)
* (Apollon77) Fix statuscode for setBulk and optimize permission errors

### 1.6.0 (2017-07-10)
* (Apollon77) Fix handling of URL-encoded values, they are now decoded properly
* (Apollon77) Optimize Permission handling
* (Apollon77) add possibility to only allow access to states where user is also owner, finally works correct with js-controller 1.1.1!

### 1.5.0 (2017-03-10)
* (greyhound) Add new POST method setValueFromBody

### 1.4.0 (2017-01-05)
* (bluefox) new web server plugin support

### 1.3.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.2.0 (2016-08-27)
* (bluefox) support of letsencrypt certificates

### 1.1.1 (2016-07-06)
* (bluefox) support of chained certificates

### 1.1.0 (2016-02-09)
* (bluefox) fix toggle, objects, states, setBulk, POST
* (bluefox) add tests

### 1.0.0 (2015-09-30)
* (bluefox) stop adapter before update

### 0.1.2 (2015-06-28)
* (bluefox) add description in readme.md
* (bluefox) change "toggle" for boolean and numbers

### 0.1.1 (2015-06-28)
* (bluefox) change setForeignState api
* (bluefox) add type to io-package.json
* (bluefox) enable run from "web"
* (bluefox) add default user

### 0.1.0 (2015-06-10)
* (bluefox) change setForeignState api
* (bluefox) support of user permissions

### 0.0.4 (2015-03-11)
* (bluefox) remove socket.io from file

### 0.0.3 (2015-02-13)
* (bluefox) remove socket.io from dependencies

### 0.0.2 (2015-02-12)
* (bluefox) enable be a part of "web"

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2019 bluefox <dogafox@gmail.com>

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