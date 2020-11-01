---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: HZMqnIYJpRdZhcSBH9zMKwYeK5yhLIkznc2+sDE5aN0=
---
![Логотип](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.echarts.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.echarts.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.echarts.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.echarts/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.echarts.png?downloads=true)

# IoBroker.echarts
## Echarts адаптер для ioBroker
Создавайте полезные графики в ioBroker:

![Снимок экрана](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

## Применение
Добавить после перезапуска вкладки в админке: ![Админ](../../../en/adapterref/iobroker.echarts/img/admin.png)

### Рендеринг на стороне сервера
Вы можете отобразить пресеты на сервере и получить их как URL-адрес base64 или сохранить на диске в базе данных ioBroker:

```
sendTo('echarts.0', {
    renderer: 'svg',         // svg | png | jpg | pdf, default: svg
    width: 1024,             // default 1024
    height: 300,             // default 300
    height: 300,             // default 300
    title: 'ioBroker Chart', // Title of PDF document
    quality: 0.8,            // quality of JPG
    compressionLevel: 3,     // Compression level of PNG
    filters: 8,              // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)
    fileOnDisk: '',          // Path on disk to save the file
    fileName: '',            // Path in ioBroker DB to save the files on 'echarts.0',
    background: '',          // Background color
    theme: 'light',          // Theme type: 'light', 'dark'
}, result => {
    if (result.error) {
        console.error(result.error);
    } else {
        console.log(result.data);
    }
});
```

## Руководство разработчика
Вы можете отлаживать графики просмотра локально с помощью:

- cd iobroker.echarts / src-chart
- запуск npm
- Браузер: http:// localhost: 8081 / adapter / echarts / tab.html? Dev = true

## Делать
- виджет для vis (кнопка)
- виджет для материала
- показывать значки перечислений в папках или рядом с ними

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 0.3.1 (2020-10-31)
* (bluefox) Added the color of export button 
* (bluefox) The interpolated values are shown now
* (bluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)
* (bluefox) GUI fixes

### 0.2.0 (2020-10-22)
* (bluefox) Implemented the grouping by category.

### 0.1.2 (2020-10-21)
* (bluefox) Added support of multiple charts

### 0.1.1 (2020-10-21)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>

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