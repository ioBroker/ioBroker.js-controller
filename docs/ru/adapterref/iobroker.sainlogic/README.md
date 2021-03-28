---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: oZy344kV1gK0Lo1OUjQkqEk5OkhMReMwWGYf6OSxkLc=
---
![Логотип](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Количество установок (последнее)](http://iobroker.live/badges/sainlogic-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sainlogic-stable.svg)
![Статус зависимости](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Известные уязвимости](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic адаптер для ioBroker
Чтение данных с метеостанции на базе sainlogic

## Поддерживаемые устройства
В основном любое устройство, работающее с аппаратным обеспечением sainlogic, прошивка обычно сообщает как «EasyWeather Vx.x.x)».

Известные рабочие устройства:

1. ELV WS980Wifi
1. Eurochron EFWS2900 (только в режиме прослушивания)
1. Froggit WH400SE
1. Froggit DP1500
1. Sainlogic WS3500 (только в режиме прослушивания)

## Использование
Адаптер поддерживает два режима отображения данных вашей метеостанции.

В режиме прослушивания адаптер поддерживает дополнительный датчик, если он доставляется с вашей метеостанции. В настоящее время поддерживаются температура и влажность. Если у вас есть еще один дополнительный датчик, поднимите проблему с github и опубликуйте строку данных, так как это поможет мне расширить функциональность.

### Режим слушателя:
С последними выпусками прошивки метеостанция поддерживает отправку данных на собственный сервер. Адаптер будет выступать в роли такого сервера. Для настройки требуется два шага:

#### Настроить метеостанцию
Используйте приложение WS View на мобильном устройстве для настройки метеостанции. Настройте следующие параметры для индивидуальных параметров сервера:

- Сервер: IP / имя хоста вашего сервера IOBroker.
- Путь: что угодно, просто запомните его для конфигурации адаптера
- Порт: любое число от 1024 до 65000 (по умолчанию 45000), должно быть уникальным и бесплатным в вашей системе IOBroker.
- ID станции: не используется
- Ключ станции: не используется
- Тип протокола: WeatherUnderground
- Интервал загрузки: любой, поддерживаемый вашей метеостанцией

#### Настроить слушатель
В конфигурации экземпляра выберите вкладку «Слушатель» и установите следующее:

- Активный: правда
- IP: выберите IP-адрес вашего IOBroker, к которому метеостанция сможет подключиться (по умолчанию 0.0.0.0, чтобы разрешить все IP-адреса), это в основном актуально, если у вас несколько сетей, в противном случае подойдет значение по умолчанию.
- Порт: введите тот же порт, что и в приложении WS View.
- Путь: введите тот же путь, что и в приложении WS View.
- URL-адрес пересылки: если вы хотите перенаправить полученные данные другому потребителю, вы можете указать дополнительный адрес. Например. вы можете получать данные в формате WU и по-прежнему хотите переслать их в WeatherUnderground.

Сохранить.
Слушатель запустится и будет ждать входящих подключений. В зависимости от вашего интервала вы должны увидеть в журнале сообщение «Слушатель получил обновление: ...» с данными.

### Режим планировщика:
Если ваша метеостанция поддерживает извлечение данных, вы можете настроить планировщик для этого. Используемый протокол основан на [Документация WS980](https://github.com/RrPt/WS980).

#### Настроить планировщик
В конфигурации экземпляра выберите вкладку «Планировщик» и установите следующее:

- Активный: правда
- IP: выберите IP-адрес вашей метеостанции, вы должны убедиться, что IP-адрес фиксированный и не меняется
- Порт: введите порт для подключения (по умолчанию 45000).
- Интервал: введите интервал в секундах (я бы рекомендовал минимум 10 секунд, чтобы не перегружать систему или сеть)

Сохранить.

Schheduler запустится и подключится к метеостанции после первого интервала времени. Вы должны увидеть в журнале сообщение вроде «Планировщик запрашивает новые данные». Если вы установите режим журнала на отладку, вы также увидите полученные строки данных.

## Кредиты
Благодарим: lemuba, StrathCole, Glasfaser, Latzi: за неустанное тестирование моих ошибок :) Лизе за ее [код для перевода градусов ветра в курс](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2020 Fogg <foggch@gmail.com>

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