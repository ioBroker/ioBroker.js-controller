---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.simple-api/README.md
title: Простой апи
hash: +UvlKC+TP4oxOMqddd9G1ktB61MlJqtF/FvBlf5CkV4=
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
}
```

### GetPlainValue
Позвоните, например:

```
http://ipaddress:8087/getPlainValue/system.adapter.admin.0.alive
```

Результат:

```
true
```

### Получить
Позвоните, например:

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
    получить много состояний одним запросом, возвращенным как объект с идентификатором в качестве ключа и val / ts как подобъект

### Задавать
Позвоните, например:

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

## Changelog

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