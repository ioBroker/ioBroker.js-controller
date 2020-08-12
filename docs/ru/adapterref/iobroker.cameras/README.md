---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: S2DXJveAgZbhf55Ekua2qiIe7Z08WoOTSOJhirISeaA=
---
![логотип](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![NPM](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## Адаптер IP-камеры для ioBroker
Вы можете интегрировать свои веб- и IP-камеры в визуализацию и другие визуализации.
Если вы настроите камеру с именем `cam1`, она будет доступна на веб-сервере в разделе `http(s)://iobroker-IP:8082/cameras.0/cam1`.

Кроме того, изображение может быть запрошено через сообщение:

```
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90   // optional
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

Результат всегда в формате `jpg`.

Поддерживаемые камеры:

### URL-изображение Это обычный URL-запрос, все параметры которого указаны в URL. Как `http://mycam/snapshot.jpg`
### URL изображения с базовой аутентификацией
Это URL-запрос для изображения, где все параметры указаны в URL-адресе, но вы можете предоставить учетные данные для базовой аутентификации. Как `http://mycam/snapshot.jpg`

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 bluefox <dogafox@gmail.com>

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