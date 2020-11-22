---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.legrand-ecocompteur/README.md
title: ioBroker.legrand-ecocompteur
hash: a73AiyFhTrm8yGm4x+3V6E38/K+jNg56NsBwZYyJ+MY=
---
![Логотип](../../../en/adapterref/iobroker.legrand-ecocompteur/admin/legrand-ecocompteur.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.legrand-ecocompteur.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.legrand-ecocompteur.svg)
![Количество установок (последнее)](http://iobroker.live/badges/legrand-ecocompteur-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/legrand-ecocompteur-stable.svg)
![Статус зависимости](https://img.shields.io/david/raintonr/iobroker.legrand-ecocompteur.svg)
![Известные уязвимости](https://snyk.io/test/github/raintonr/ioBroker.legrand-ecocompteur/badge.svg)
![Тесты](https://travis-ci.org/raintonr/ioBroker.legrand-ecocompteur.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.legrand-ecocompteur.png?downloads=true)

# IoBroker.legrand-ecocompteur
## Адаптер legrand-ecocompteur для ioBroker
Адаптер для модуля Legrand Ecocompteur (он же Legrand Measurement Concentrator EMDX³ 412000).

Это прибор для измерения мощности с собственным веб-интерфейсом. Адаптер использует этот веб-интерфейс:

- Опрос для мгновенных показаний мощности (читается в ответе JSON).
- Опрос индексной страницы устройства для чтения интерфейса TIC. TIC - это аббревиатура от Télé-Information Client, французская конструкция. Это значение обычно считывается со счетчика коммунальных платежей, подключенного к Ecocompteur.

Эти объекты создаются для каждой из 5 цепей, считываемых Ecocompteur, плюс общая сумма:

- Мгновенная мощность (в ваттах).
- Общая накопленная энергия, измеренная во время работы адаптера (в кВтч).

Еще один объект создается для хранения значения интерфейса TIC.

### Обратите внимание на хрупкий IP-стек Ecocompteur
В ходе тестирования было отмечено, что Ecocompteur имеет довольно хрупкий IP-стек. Иногда стек может «зависнуть» и перестать отвечать на запросы, хотя, по опыту автора, это отслеживалось на запросы, не соответствующие RFC, поступающие с другого устройства домашней автоматизации.

Тем не менее, было бы разумно снизить этот риск, разместив устройство за простым обратным прокси-сервером Nginx с микрокэшированием. Пример конфигурации Nginx для Ecocompteur по адресу http://192.168.0.10/ (поэтому в настройках *BaseURL* для этого адаптера укажите *http:// &lt; Nginx address &gt;: 8080 / le /* :

```
proxy_cache_path /tmp/cache keys_zone=cache:32k levels=1 inactive=10s max_size=256k;

server {
    listen 8080;

    proxy_cache cache;
    proxy_cache_valid 200 1s;
    location /le/ {
        proxy_pass http://192.168.0.10/;
    }
}
```

### Конфигурация
Требуется следующая конфигурация:

- Базовый URL-адрес устройства.
- Интервал опроса JSON (в секундах).
- Интервал опроса индекса (в секундах).
- Проверка: максимальное показание цепи (в ваттах).

## Changelog

### 0.0.6
* (Robin Rainton) Change IP address setting to base URL. **Settings will need to be updated.**
* (Robin Rainton) Fixed timeout handling. Parse readings from index HTML. Refactor to use more promises & single interval timer.

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