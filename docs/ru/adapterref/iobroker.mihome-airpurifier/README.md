---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-airpurifier/README.md
title: ioBroker.mihome-воздухоочиститель
hash: aP5HbXr/jC25Q7hsEn7VDVtlmTeECXkZ9XzIXva5+dE=
---
![логотип](../../../en/adapterref/iobroker.mihome-airpurifier/admin/mihome-airpurifier.png)

![Количество установок](http://iobroker.live/badges/mihome-airpurifier-stable.svg)
![Статус сборки](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master)

# IoBroker.mihome-airpurifier Адаптер Xiaomi для очистки воздуха для платформы ioB ioBroker.
## Как получить токен?
Вы должны установить инструмент командной строки miio `npm install -g miio`

Теперь у вас есть два варианта:

1. С приложением Mi Home:

    Вы подключаете очиститель с помощью MI Home App к своей сети Wifi и затем запускаете следующую команду:

    `miio discover`

    Вы должны получить следующий вывод и сохранить токен.

```
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

2. Без Mi Home App:

    Вы сбрасываете настройки WIFI очистителя воздуха. Затем вы подключаете свою сеть с WIFI очистителя воздуха и запускаете следующую команду:

    `miio discover`

    Вы должны получить тот же вывод, что и выше, и теперь можете настроить соединение с вашей сетью, выполнив следующую команду:

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    Теперь очиститель воздуха подключен к вашей сети.

## Облачное соединение
Для управления очистителем воздуха с помощью облачного адаптера просто добавьте состояние «manuallevel» в ваш облачный адаптер. После этого вы можете отправить е.э. следующие команды через Alexa:

* Alexa, включи очиститель воздуха *,

* Alexa, установите очиститель воздуха на 50% *,

*Алекса, выключи очиститель воздуха*

Если вы установите в облачном адаптере значение «Вкл. Значение» на «Последнее активное значение», устройство всегда начнет работать с самым последним активным уровнем мощности.

## Контрольные состояния
Для управления очистителем воздуха можно написать следующие объекты:

| Государство | Описание |
| :---           | :---        |
| сила | Включить / выключить устройство |
| авто | Активируйте автоматический режим устройства. |
| тихий | Активируйте беззвучный режим устройства. |
| руководство | Активируйте ручной режим устройства. |
| ручной уровень | Управляйте мощностью ручного режима в диапазоне от 0 до 100%. Это также включит / выключит устройство при необходимости |

## Инфо Состояния
Следующая информация собирается из вашего очистителя воздуха (только для чтения):

### Информация об устройстве
| Государство | Описание |
| :---        | :---        |
| режим | Фактический режим устройства, только действительный, если устройство включено. |
| температура | Измеренная температура в ° С прибора. |
| влажность | Измеренная относительная влажность в% от прибора. |
| вечера25 | Загрязнение воздуха в PM2.5. |

## Changelog
### 0.0.5 (06.01.2019)
* (JoJ123) update natives

### 0.0.4 (02.01.2019)
* (JoJ123) update type

### 0.0.3 (18.12.2018)
* (JoJ123) npm release

### 0.0.2 (29.11.2018)
* (JoJ123) auto reconnect

### 0.0.1 (10.10.2018)
* (JoJ123) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com

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

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com