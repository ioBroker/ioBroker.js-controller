---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fakeroku/README.md
title: ioBroker.fakeroku
hash: PhCqlWB3YX4j4bvXMQXbutCelfuftGo/QGBDhbRX2Kg=
---
![логотип](../../../en/adapterref/iobroker.fakeroku/admin/fakeroku.png)

![Статус сборки](https://travis-ci.org/Pmant/ioBroker.fakeroku.svg?branch=master)
![Количество установок](http://iobroker.live/badges/fakeroku-stable.svg)

# ioBroker.fakeroku Этот адаптер ioBroker эмулирует Roku, и его единственная цель - подключить ioBroker к концентраторам Logitech Harmony.
Он также может работать с другими устройствами, которые могут управлять Roku.
## Монтаж
Адаптер Intall в ioBroker Admin

## Использование
### Конфигурация в ioBroker Admin:
- ***LAN-IP*** должен быть сетевым IP-адресом вашего устройства ioBroker
- ***IP-адрес многоадресной рассылки*** только измените это, если вы знаете, что делаете
- ***Roku устройства*** добавить / изменить / удалить устройства для эмуляции

### Настройка в приложении и программном обеспечении Harmony
Добавьте устройство Roku 3, следуя этому руководству: https://support.myharmony.com/en-us/harmony-experience-with-roku Вы можете переименовать устройство на Harmony.

### Состояния
Состояния автоматически создаются, когда fakeRoku впервые получает ключ.

## Changelog

### 0.2.1
  (Pmant) fix jQuery error in admin
  (ykuendig) add translations

### 0.2.0
  (Pmant) run multiple fakeroku's in one instance

### 0.1.1
  (Pmant) fix package.json

### 0.1.0
  (Pmant) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 Pmant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.