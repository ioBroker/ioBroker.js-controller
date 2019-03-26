---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.phantomjs/README.md
title: ioBroker.phantomjs
hash: w6UxlDY+5VfvYk44dGnqfn7YCQusj9p25QbIPkwoteA=
---
![логотип](../../../en/adapterref/iobroker.phantomjs/admin/phantomjs.png)

![Количество установок](http://iobroker.live/badges/phantomjs-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.phantomjs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.phantomjs.svg)
![тесты](https://travis-ci.org/ioBroker/ioBroker.phantomjs.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.phantomjs.png?downloads=true)

# IoBroker.phantomjs ====================
Этот адаптер позволяет создавать снимки экрана веб-страниц (например, flot) и сохранять его в виде файла png или делиться им через внутренний WEB-сервер.

Пользователь может позже отправить этот файл по электронной почте или по телеграмме или что-то еще.

Медленные веб-клиенты могут отображать графики, если графики будут генерироваться автоматически каждые x минут.

## Prerequire
Используется предварительно собранный пакет фантомов. Если для вашей системы предварительная сборка не существует, вы не можете использовать этот адаптер.
В некоторых системах Linux требуется дополнительная библиотека "libfontconfig". Он может быть установлен следующим образом:

```
sudo apt-get install libfontconfig
```

## Использование
Есть два способа создания изображений.

### Через штаты
При создании экземпляра для состояний будут созданы:

- **имя файла** - имя файла, в котором будет сохранена картинка. Если путь не является абсолютным, он будет относиться к `` `... / iobroker / node_modules / iobroker.phantomjs```.
- **ширина** - ширина картинки. Значение по умолчанию 800px.
- **высота** - высота картинки. Значение по умолчанию 600px.
- **paging** - Формат страницы PDF. Имя файла должно заканчиваться на «.pdf»
- **renderTime** - Интервал в мс для ожидания отображения страницы.
- **онлайн** - если запрошенная картинка URL должна быть загружена на внутренний веб-сервер. Доступ к нему можно получить через http:// ip: 8082 / state / phantomjs.0.filename_png.
- **clipTop** - верхняя позиция прямоугольника клипа. Значение по умолчанию 0px.
- **clipLeft** - левая позиция прямоугольника клипа. Значение по умолчанию 0px.
- **clipWidth** - ширина прямоугольника клипа. Значение по умолчанию равно ширине. Внимание, это значение будет перезаписываться каждый раз при изменении ширины.
- **clipHeight** - высота положения прямоугольника клипа. Значение по умолчанию равно высоте. Внимание это значение будет перезаписываться каждый раз при изменении высоты.
- **scrollTop** - Прокрутить верхнюю позицию. Значение по умолчанию 0px.
- **scrollLeft** - Прокрутить левую позицию. Значение по умолчанию 0px.

После записи состояния url адаптер пытается создать рисунок и при его создании флаг ack состояния **url** изменяется на true.

### Через сообщения
С кодом скрипта, вот так:

```
sendTo('phantomjs.0', 'send', {
    url:                    'http://localhost:8082/flot/index.html?l%5B0%5D%5Bid%5D=system.adapter.admin.0.memHeapTotal&l%5B0%5D%5Boffset%5D=0&l%5B0%5D%5Bart%5D=average&l%5B0%5D%5Bcolor%5D=%23FF0000&l%5B0%5D%5Bthickness%5D=3&l%5B0%5D%5Bshadowsize%5D=3&timeArt=relative&relativeEnd=now&range=10&live=false&aggregateType=step&aggregateSpan=300&hoverDetail=false&useComma=false&zoom=false',
    output:                 'picture.png',  // default value
    width:                  800,            // default value
    height:                 600,            // default value
    timeout:                2000,           // default value
    zoom:                   1,              // default value

    'clip-top':             0,              // default value
    'clip-left':            0,              // default value
    'clip-width':           800,            // default value is equal to width
    'clip-height':          600,            // default value is equal to height
    'scroll-top':           0,              // default value
    'scroll-left':          0,              // default value

    online:                 false           // default value
}, function (result) {
    if (result.error) {
        console.error(JSON.stringify(result.error));
    }
    if (result.stderr) {
        console.error(result.stderr);
    }
    if (result.stdout) {
        console.log(result.stdout);
    }
    console.log(result.output);
});
```

Вы можете создать снимок экрана некоторого URL. Только поле **url** является обязательным, все остальные являются необязательными и будут заполнены из текущих настроек.

### Генерация PDF
```
sendTo('phantomjs.0', 'send', {
    url:                    'http://localhost:8082/flot/index.html?l%5B0%5D%5Bid%5D=system.adapter.admin.0.memHeapTotal&l%5B0%5D%5Boffset%5D=0&l%5B0%5D%5Bart%5D=average&l%5B0%5D%5Bcolor%5D=%23FF0000&l%5B0%5D%5Bthickness%5D=3&l%5B0%5D%5Bshadowsize%5D=3&timeArt=relative&relativeEnd=now&range=10&live=false&aggregateType=step&aggregateSpan=300&hoverDetail=false&useComma=false&zoom=false',
    output:                 'document.pdf',

    'paper-margin':         '0cm',          // paper-margin or paper-margin-top/paper-margin-left
    'paper-margin-top':     0,
    'paper-margin-left':    0,

    // only one of
    // 1.
    'paper-format':         'A4',           // 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid': 'paper-format' should be used with 'paper-orientation'
    'paper-orientation':    'portrait',     // 'portrait', 'landscape'

    // 2.
    'paper-width':          200,            // '5in',   '10cm': 'paper-width' should be used 'paper-height'
    'paper-height':         300,            // '7.5in', '20cm'

    timeout:                2000            // default value
}, function (result) {
    if (result.error) {
        console.error(JSON.stringify(result.error));
    }
    if (result.stderr) {
        console.error(result.stderr);
    }
    if (result.stdout) {
        console.log(result.stdout);
    }
    console.log(result.output);
});
```

Поддерживаемые размерные единицы: «мм», «см», «дюйм», «px». Отсутствие единицы означает «px».

Вы можете прочитать больше о phantomJS [Вот](http://phantomjs.org/api/webpage/property/paper-size.html).

## Changelog
### 1.0.1 (2018-05-04)
* (bluefox) Problem with page size fixed

### 1.0.0 (2018-02-19)
* (bluefox) clipping support
* (bluefox) IMPORTANT: paging is replaces by 'paper-xxx' options.

### 0.1.3 (2017-09-24)
* (bluefox) add pdf support

### 0.1.2 (2016-04-30)
* (bluefox) change package name from phantomjs to phantomjs-prebuilt

### 0.1.0 (2016-04-30)
* (bluefox) add renderTime
* (bluefox) add upload to local web-server

### 0.0.1 (2016-04-28)
* (bluefox) initial commit

## License
Copyright 2016-2018 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific 
language governing permissions and limitations under the License.