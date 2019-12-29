---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.velux/README.md
title: ioBroker.velux
hash: Rdrp2GJ5SQJIK/StfKJqEs1mxlmmbm3CGTJMEIN+2jU=
---
![логотип](../../../en/adapterref/iobroker.velux/admin/velux.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.velux.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.velux.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.velux.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.velux/badge.svg)
![NPM](https://nodei.co/npm/iobroker.velux.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.velux/master.svg)

# IoBroker.velux
## Адаптер Velux для ioBroker
Адаптер для Velux KIX 300

## Использование
Введите под модулем вашу новую target_position. Windows допускает только target_position 0.

Чтобы преобразовать температуру

```
createState("veluxTemperature", 0,{
    "role": "level.temperature"});
on('velux.0.home.rooms01.temperature',function(obj){
   setState("veluxTemperature", obj.state.val / 10);
})
```

## Changelog

### 0.0.2

* add changing target_position for non windows  
  
### 0.0.1

* (ta2k) initial release

## License

MIT License

Copyright (c) 2019 ta2k <tombox2020@gmail.com>

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