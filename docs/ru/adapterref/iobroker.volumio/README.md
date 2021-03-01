---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: DbvHbyB6CJysKT2u0D/hKX3zeydtPRIkex7ZxOvChCk=
---
![Логотип](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Количество установок (последнее)](http://iobroker.live/badges/volumio-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/volumio-stable.svg)
![Статус зависимости](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Известные уязвимости](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
** Тесты: ** ![Тестирование и выпуск](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Поддержите меня
Если этот адаптер помог вам реализовать классную автоматизацию в вашем SmartHome и помог сократить время на разработку, вы можете пригласить меня на чашечку кофе :)

[![Пожертвовать] (https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## Адаптер volumio для ioBroker
Адаптер Volumio для ioBroker Это адаптер для удаленного управления экземпляром volumio.

Он использует следующий API REST: https://volumio.github.io/docs/API/REST_API.html

На данный момент реализованы следующие функции:

* Команды игрока
    * Отключить / включить
    * След. / Назад
    * Играть в
        * Воспроизвести n-ю песню из плейлиста
    * Пауза
    * Переключение между воспроизведением / паузой
    * Останавливаться
    * Контроль громкости
        * Установите конкретное значение
        * Увеличение / уменьшение громкости
* Очередь
    * Очистить очередь
    * Повтор трека
    * Режим воспроизведения в случайном порядке
* Получить состояние игрока

Сделать:

- [] Установить позицию поиска
- [] Список плейлистов
- [] Просмотр

## Changelog

### 0.1.2
* (André Iske) Minor bug fixes 

### 0.1.1
* (André Iske) Minor bug fixes 

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2021 André Iske <andre.iske@mailbox.org>

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