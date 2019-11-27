---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: IUmLDzAkE5Cb6dAckIUOdrK6ff5u79VdmrRKAR9jGpw=
---
![логотип](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![Количество установок](http://iobroker.live/badges/roadtraffic-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![тесты](https://travis-ci.org/BuZZy1337/ioBroker.roadtraffic.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.roadtraffic.png?downloads=true)

# IoBroker.roadtraffic
## Об этом адаптере
Этот адаптер использует Google Maps API для проверки трафика на ваших маршрутах. Вы можете настроить несколько маршрутов, и адаптер проверит фактическую ситуацию с трафиком и покажет, сколько времени займет ваше путешествие. (На данный момент это экономит время в секундах).
Адаптер сейчас находится на ранней стадии. Я планирую включить будильник - чтобы вы могли сказать Адаптеру, в какое время вы должны быть на работе, - и что должно произойти, когда пора уходить / просыпаться (Пуск включите радио и сделайте объявление типа «Похоже, что на вашем маршруте пробка. Вам нужно встать сейчас, чтобы не опоздать на работу!» на Алексе и т. д.) ..
Не стесняйтесь создавать некоторые запросы к функциям здесь, на Github - просто откройте для этого вопрос! ;)

## Начиная
Прежде всего: Вас может беспокоить шаг «Настройка учетной записи и способа оплаты», который Google может попросить вас при создании учетной записи, чтобы получить ключ API. Не беспокойтесь! Google предоставляет вам кредит в размере 200 долларов США каждый месяц. (Посетите https://cloud.google.com/maps-platform/pricing/sheet/ для получения дополнительной информации). Вы можете сделать ~ 40.000 запросов в месяц бесплатно ..

Итак, начнем:

1. Перейдите на страницу https://cloud.google.com/maps-platform/?apis=routes и войдите в свою учетную запись Google (или создайте новую, если у вас ее еще нет).

![Readme1](../../../en/adapterref/iobroker.roadtraffic/img/Readme1.png)

2. Выберите название для вашего проекта. Вы можете ввести все, что вы хотите здесь. Имя предназначено только для идентификации, если в вашей учетной записи Google будет запущено несколько проектов.

![Readme2](../../../en/adapterref/iobroker.roadtraffic/img/Readme2.png)

3. Настройте метод выставления счетов и платежей для учетной записи Google (как упоминалось выше - не беспокойтесь об этом - вы получаете 200 долларов в месяц от Google для своей учетной записи платежа).

Если вы все еще волнуетесь, проверьте эту страницу: https://cloud.google.com/maps-platform/pricing/sheet/).

![Readme3](../../../en/adapterref/iobroker.roadtraffic/img/Readme3.png)

4. Завершите настройку Google API

![Readme4](../../../en/adapterref/iobroker.roadtraffic/img/Readme4.png)

5. И скопируйте ваш ключ API в буфер обмена.

![Readme5](../../../en/adapterref/iobroker.roadtraffic/img/Readme5.png)

6. Откройте настройки экземпляра адаптера roadtraffic в ioBroker и вставьте свой ключ API Google в поле ввода.

После этого вы можете нажать «Plus-Icon», чтобы настроить свой первый маршрут.

![Readme6](../../../en/adapterref/iobroker.roadtraffic/img/Readme6.png)

После того, как вы ввели всю информацию в диалог настроек, нажмите «Сохранить и закрыть».
Адаптер должен перезагрузиться, и вы готовы к работе!

## Changelog

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