---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.foobar2000/README.md
title: Адаптер Foobar2000 для iobroker
hash: fbOZYCXQIBRpKL+vSNQAHr5EXJhUtwi/2rDWlKRDnEQ=
---
![Логотип](../../../en/adapterref/iobroker.foobar2000/admin/foobar2000.png)

![Количество установок](http://iobroker.live/badges/foobar2000-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.foobar2000.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.foobar2000.svg)
![NPM](https://nodei.co/npm/iobroker.foobar2000.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Foobar2000 адаптер для iobroker [![Тесты] (https://github.com/instalator/iobroker.foobar2000/workflows/Test%20and%20Release/badge.svg)](https://github.com/instalator/ioBroker.foobar2000/actions/)
![настройки администратора.](../../../en/adapterref/iobroker.foobar2000/admin/admin.png)

## С помощью
Описание [тут](http://blog.instalator.ru/archives/541).
Для управления проигрывателем установить плагин [foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/).
Для отображения обложки как ссылка на файл, необходимо в файле ```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config``` изменить параметр ```albumart_prefer_embedded=0```

Для управления плеером необходимо установить плагин [foo_httpcontrol](https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/).
Чтобы обложка отображалась как ссылка на файл, в файле ```c:\Users\{USER}\AppData\Roaming\foobar2000\foo_httpcontrol_data\foobar2000controller\config``` измените параметр ```albumart_prefer_embedded = 0```

## Changelog

#### 2.0.4
* (instalator) fixed error

#### 2.0.3
* (instalator) fixed admin error

#### 2.0.2
* (instalator) fixed error

#### 2.0.0
* (instalator) Completely rewritten

#### 1.0.0
* (instalator) Up to stable

#### 0.2.0
* (instalator) Change for widgets vis-players

#### 0.1.2
* (instalator) del widgets folders
* (instalator) change log level
* (instalator) add news object

#### 0.1.1
* (instalator) fix start, exit for local

#### 0.1.0
* (instalator) beta (20.10.2016)

#### 0.0.1
* (instalator) initial (12.10.2016)

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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