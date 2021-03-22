---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.web-speedy/README.md
title: ioBroker.web-speedy
hash: SOLdAZSiuEwO+0FLjgLsyMFd7E/8DV8xyANM1lRUKNk=
---
![Логотип](../../../en/adapterref/iobroker.web-speedy/admin/web-speedy.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.web-speedy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.web-speedy.svg)
![Количество установок (последнее)](http://iobroker.live/badges/web-speedy-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/web-speedy-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.web-speedy.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.web-speedy/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.web-speedy.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/DrozmotiX/ioBroker.web-speedy/master.svg)

# IoBroker.web-speedy
## Веб-адаптер для ioBroker
Web-Speedy позволяет вам регулярно проверять подключение к Интернету и сохранять результаты в ioBroker!

### Как использовать этот адаптер
При первом запуске он найдет ближайшие ближайшие серверы на основе результатов пинга и запустит первый тест.

Web-Speedy построен таким образом, что все выполнение выполняется автоматически, что означает, что у вас нет страницы конфигурации.
Однако вы все еще можете влиять на некоторые вещи (см. Данные):

| Государство | Описание |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| test_auto_modus | Серверный режим для автоматического запуска тестов с |
| test_auto_intervall | Интервал времени для автоматического выполнения теста (по умолчанию = 30, если установлено значение 0, автоматический тест запускаться не будет!) |
| test_best | Запустить тест сейчас на лучшем сервере по результатам последнего пинга |
| test_by_id | Запустите тест на определенном ID сервера прямо сейчас! |
| test_by_url | Запустите тест на определенном URL-адресе сервера прямо сейчас! |
| test_duration | Максимальная продолжительность (в секундах) одного тестового прогона (загрузка или загрузка) |
| test_specific | Используйте раскрывающийся список, чтобы выбрать один из 5 лучших серверов, обнаруженных при предыдущем сканировании |
| test_specific_id | Введите идентификатор конкретного сервера [Пожалуйста, найдите здесь ID сервера](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A) |
| test_specific_url | Введите URL-адрес конкретного сервера [Здесь можно найти URL-адрес сервера] (https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk |wme8A) |

![Мбайт](https://raw.githubusercontent.com/DrozmotiX/ioBroker.web-speedy/master/admin/Mbyte.png) ![Мбит](https://raw.githubusercontent.com/DrozmotiX/ioBroker.web-speedy/master/admin/Mbit.png) ![состояния](https://raw.githubusercontent.com/DrozmotiX/ioBroker.web-speedy/master/admin/states.png)

## Поддержите меня
Если вам нравятся мои работы, пожалуйста, сделайте личное пожертвование (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.0 Initial release
* (DutchmanNL) Attention : Delete all objects beforer adapter start if previous version installed !
* (DutchmanNL) Implement [ test_auto_modus ] Server mode to run automatically tests with
* (DutchmanNL) Fix issues with running specific server tests
* (DutchmanNL) Upload speed calculation issue fixed

### 0.1.5 New settings possibilities & Code improvements
* (DutchmanNL) Implemented states for progress in %
* (DutchmanNL) No automated scan if test_auto_intervall set zo 0
* (DutchmanNL) Ensure propper running state reset at adapter start
* (DutchmanNL) Improve code performance and avoid multiple running instances
* (DutchmanNL) Implemented adjustable duration time for scan by (increase if you see strange test results, like to 20 secons)
* (DutchmanNL) Implemented state to run test by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)

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