---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.legrand-ecocompteur/README.md
title: ioBroker.legrand-ecocompteur
hash: GskKx1N3hLFOVqoNql58dpwzh/PEP8DA+YvzQmanxac=
---
![логотип](../../../en/adapterref/iobroker.legrand-ecocompteur/admin/legrand-ecocompteur.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.legrand-ecocompteur.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.legrand-ecocompteur.svg)
![Количество установок (последняя)](http://iobroker.live/badges/legrand-ecocompteur-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/legrand-ecocompteur-stable.svg)
![Статус зависимости](https://img.shields.io/david/raintonr/iobroker.legrand-ecocompteur.svg)
![Известные уязвимости](https://snyk.io/test/github/raintonr/ioBroker.legrand-ecocompteur/badge.svg)
![тесты](https://travis-ci.org/raintonr/ioBroker.legrand-ecocompteur.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.legrand-ecocompteur.png?downloads=true)

# IoBroker.legrand-ecocompteur
## Адаптер legrand-ecocompteur для ioBroker
Адаптер для модуля Legrand Ecocompteur (также известный как измерительный концентратор Legrand EMDX³ 412000).

Это устройство для измерения мощности с собственным веб-интерфейсом. Адаптер использует этот веб-интерфейс следующим образом:

- Опрос для мгновенного чтения мощности (читайте в ответе JSON).
- Опрос индексной страницы устройства для чтения интерфейса TIC. TIC означает Télé-Information Client, который является французской конструкцией. Это значение обычно считывается с счетчика коммунальных платежей, подключенного к Ecocompteur.

Эти объекты создаются для каждой из 5 цепей, которые считывает Ecocompteur, плюс общая сумма:

- Мгновенная мощность (в ваттах).
- Общая накопленная энергия, измеренная во время работы адаптера (в кВтч).

Еще один объект создается для хранения значения интерфейса TIC.

### Конфигурация
Требуется следующая конфигурация:

- IP-адрес устройства.
- Интервал опроса JSON (в секундах).
- Интервал опроса индекса (в секундах).
- Проверка: максимальное чтение цепи (в ваттах).

## Changelog

### 0.0.4
* (Robin Rainton) Added reading validation filter.

### 0.0.3
* (Robin Rainton) initial clean release.

## License
MIT License

Copyright (c) 2020 Robin Rainton <robin@rainton.com>

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