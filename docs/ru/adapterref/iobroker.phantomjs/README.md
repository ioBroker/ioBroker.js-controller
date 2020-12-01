---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.phantomjs/README.md
title: ioBroker.phantomjs
hash: wB5lseMg/xyHiORnWgccglXroLLv8OmrbnMbjHmG0Y4=
---
![Логотип](../../../en/adapterref/iobroker.phantomjs/admin/phantomjs.png)

![Количество установок](http://iobroker.live/badges/phantomjs-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.phantomjs.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.phantomjs.svg)
![Тесты](https://travis-ci.org/ioBroker/ioBroker.phantomjs.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.phantomjs.png?downloads=true)

# IoBroker.phantomjs
Этот адаптер позволяет создавать скриншоты веб-страниц (например, flot) и сохранять их как файл png или делиться ими через внутренний WEB-сервер.

Позже пользователь может отправить этот файл по электронной почте, телеграммой или другим способом.

Медленные веб-клиенты могут отображать диаграммы, если диаграммы будут автоматически генерироваться каждые x минут.

## Prerequire
Используется готовый пакет phantomjs. Если для вашей системы не существует предварительной сборки, вы не можете использовать этот адаптер.
В некоторых системах Linux требуется дополнительная библиотека libfontconfig. Его можно установить следующим образом:

```
sudo apt-get install libfontconfig
```

## Ошибки установки
Если вы получите сообщение об ошибке

```
Unexpected platform or architecture: linux/armIt seems there is no binary available for your platform/architecture Try to install PhantomJS globally
```

во время установки мы извиняемся. Вам нужно зайти в Google и поискать, как установить phantomjs глобально в вашу систему.

## Применение
Есть два способа создания изображений.

### Через состояния
При создании экземпляра для состояний будут созданы:

- **filename** - имя файла, в котором будет сохранена картинка. Если путь не абсолютный, он будет относиться к `` ... / iobroker / node_modules / iobroker.phantomjs``.
- **width** - ширина рисунка. Значение по умолчанию 800 пикселей.
- **высота** - высота рисунка. Значение по умолчанию 600 пикселей.
- **paging** - Формат страницы PDF. Имя файла должно заканчиваться на «.pdf».
- **renderTime** - Интервал в мс для ожидания отображения страницы.
- **онлайн** - если запрошенный URL-адрес должен быть загружен на внутренний веб-сервер. Тогда к нему можно было получить доступ через http:// ip: 8082 / state / phantomjs.0.pictures.filename_png
- **clipTop** - верхняя позиция прямоугольника клипа. Значение по умолчанию 0 пикселей.
- **clipLeft** - левое положение прямоугольника клипа. Значение по умолчанию 0 пикселей.
- **clipWidth** - ширина прямоугольника клипа. Значение по умолчанию равно ширине. Внимание, это значение будет перезаписываться каждый раз при изменении ширины.
- **clipHeight** - высота прямоугольника клипа. Значение по умолчанию равно высоте. Внимание, это значение будет перезаписываться каждый раз при изменении высоты.
- **scrollTop** - верхняя позиция прокрутки. Значение по умолчанию 0 пикселей.
- **scrollLeft** - прокрутка влево. Значение по умолчанию 0 пикселей.

После того, как состояние URL-адреса записано, адаптер пытается создать изображение и при его создании изменяет флаг подтверждения состояния **url** на true.

### Через сообщения
С кодом сценария, например:

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

вы можете создать снимок экрана с некоторым URL. Только поле **url** является обязательным, все остальные необязательны и будут заполнены исходя из текущих настроек.

### Создание PDF
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

Поддерживаемые единицы измерения: «мм», «см», «дюйм», «пиксели». Отсутствие единицы означает «пикс».

Вы можете узнать больше о phantomJS [Вот](http://phantomjs.org/api/webpage/property/paper-size.html).

## Changelog

### 1.1.2 (2020-07-28)
* (Apollon77) added ssl handling to ignore self signed ssl certificates

### 1.1.1 (2020-07-27)
* (Apollon77) libfontconfig automatically installed

### 1.0.2 (2020-07-24)
* (Apollon77) Add config to automatically install libfontconfig when js-controller 3+ is used
* (Apollon77) Add ignore-ssl-errors=true to parameters to prevent error with self signed ssl certs
* (Apollon77) Adjust state description to not confuse witha static port number :-)

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
Copyright 2016-2020 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an 
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific 
language governing permissions and limitations under the License.