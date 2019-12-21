---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: 3GNg5U61bVzmvAJjPUT1XYz/q5dqqkVKAu327pb9qMk=
---
![логотип](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![Количество установок](http://iobroker.live/badges/roadtraffic-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![тесты](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

# IoBroker.roadtraffic
## Об этом адаптере
Этот адаптер использует HERE.com API для проверки трафика на ваших маршрутах. Вы можете настроить несколько маршрутов, и адаптер проверит фактическую ситуацию с трафиком и покажет, сколько времени займет ваше путешествие.
Адаптер находится в раннем состоянии прямо сейчас .. Я планирую включить будильник - чтобы вы могли сказать Адаптеру, в какое время вы должны быть на работе - и что должно произойти, когда пора уходить / просыпаться (Начните играть Сделайте радио и сделайте объявление типа «Похоже, что на вашем маршруте пробка. Вам нужно встать сейчас, чтобы не опоздать на работу!» На Алексе и т. Д.) ..
Не стесняйтесь создавать некоторые запросы к функциям здесь, на Github - просто откройте для этого вопрос! ;)

## Начиная
Итак, начнем:

1. Перейдите на страницу https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account и создайте бесплатную учетную запись разработчика HERE.com (Freemium).

![Here1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2. Убедитесь, что выбран Freemium, и заполните форму слева. (Имя, Фамилия, адрес электронной почты, ..)

![здесь 2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3. Нажмите «Зарегистрироваться для получения учетной записи ЗДЕСЬ ...» и не забудьте поставить галочку (в соответствии с Условиями обслуживания и т. Д.).

![Here3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4. Еще раз - согласитесь с Условиями и нажмите кнопку «Начать кодирование».

![Here4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5. На следующей странице вы уже находитесь на панели инструментов HERE.com. Найдите раздел REST и нажмите «Создать приложение».

![Here5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6. Нажмите «Создать ключ API» - вы получите ключ API. Откройте настройки экземпляра адаптера roadtraffic в ioBroker и вставьте ключ API в поле конфигурации.

![Here6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7. Щелкните значок «Плюс» в настройках экземпляра и создайте свой первый маршрут.

После того, как вы ввели всю информацию в диалог настроек, нажмите «Сохранить и закрыть».
Адаптер должен перезагрузиться, и вы готовы к работе!

## Changelog
### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes))

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

### 0.0.1
* (BuZZy1337) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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