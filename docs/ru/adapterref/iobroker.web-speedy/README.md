---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web-speedy/README.md
title: ioBroker.web-скоростной
hash: JVh7sCm5G2DiV8lPopZ2orRBflHlWpQnhjSWN1NZKKc=
---
![логотип](../../../en/adapterref/iobroker.web-speedy/admin/web-speedy.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.web-speedy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.web-speedy.svg)
![Количество установок (последняя)](http://iobroker.live/badges/web-speedy-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/web-speedy-stable.svg)
![Состояние зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.web-speedy.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.web-speedy/badge.svg)
![NPM](https://nodei.co/npm/iobroker.web-speedy.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.web-speedy/master.svg)

# IoBroker.web-speedy
## Web-speedy адаптер для ioBroker
Web-Speedy позволяет вам регулярно проверять ваше интернет-соединение и сохранять результаты в ioBroker!

### Как использовать этот адаптер
При первом запуске он извлекает лучшие серверы поблизости на основе результатов проверки связи и запускает первый тест.

Web-Speedy построен так, что все выполнение обрабатывается автоматически, то есть у вас нет страницы конфигурации.
Тем не менее, вы все еще можете влиять на некоторые вещи (см. Точки данных):

- [test_best] Теперь запустите тестирование на лучшем сервере на основе результатов последнего пинга
- [test_specific] Используйте выпадающий список, чтобы выбрать один из 5 лучших серверов, найденных в предыдущем сканировании
- [test_duration] Максимальная продолжительность (в секундах) одного запуска теста (выгрузка или загрузка)
- [test_id_always] Запускайте тест ВСЕГДА на определенном идентификаторе сервера.
- [test_id_once] Запустить тест ONCE для определенного идентификатора сервера.
- [test_auto_intervall] Время интервала для автоматического выполнения теста (по умолчанию = 60, если установлено значение 0, автоматический тест не будет выполняться!)

## Поддержите меня
Если вам нравится моя работа, пожалуйста, не стесняйтесь предоставить личное пожертвование (это личная ссылка на пожертвования для DutchmanNL, никакого отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.1.6 Implemented specific scan by url
* (DutchmanNL) Implemented specific scan by url

### 0.1.5 New settings possibilities & Code improvements
* (DutchmanNL) Implemented states for progress in %
* (DutchmanNL) No automated scan if test_auto_intervall set zo 0
* (DutchmanNL) Ensure propper running state reset at adapter start
* (DutchmanNL) Improve code performance  and avoid multiple running instances
* (DutchmanNL) Implemented adjustable duration time for scan by(increase if you see strange test results, like to 20 secons)
* (DutchmanNL) Implemented state to run test ONCE by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)
* (DutchmanNL) Implemented state to run test ALWAYS by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)

### 0.1.1 MegaByte to Megabit calculation and current test speeds implemented
* (DutchmanNL) Fix wrong status "test runnig"
* (DutchmanNL) Implement byte to bit calculation for test - results
* (DutchmanNL) implement current speeds in kb/s during download

### 0.1.0 Beta release for public testing
* (DutchmanNL) Beta release for public testing

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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