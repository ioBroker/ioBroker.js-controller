---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: cWv7WlDzwUw8WHGt7KPNdnmutK4CenySEwXQgJItWjc=
---
![Логотип milight-smart-light](../../../en/adapterref/iobroker.milight-smart-light/admin/milight-smart-light.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![стабильный](http://iobroker.live/badges/milight-smart-light-stable.svg)
![установлены](http://iobroker.live/badges/milight-smart-light-installed.svg)
![Статус зависимости](https://img.shields.io/david/steiger04/iobroker.milight-smart-light.svg)
![Известные уязвимости](https://snyk.io/test/github/steiger04/ioBroker.milight-smart-light/badge.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
![Тестирование и выпуск](https://github.com/steiger04/ioBroker.milight-smart-light/workflows/Test%20and%20Release/badge.svg)

Этот адаптер для ioBroker управляет светодиодными лампами и светодиодными лентами Milight и основан на модуле узла от mwittig.

mwittig / [node-milight-обещание](https://github.com/mwittig/node-milight-promise)

С адаптером вы можете использовать как **v6 Bridge** так и **Legacy Bridge**

** Мост v6: **

- мост (только iBox1)
- белый
- RGB (ш)
- полноцветный
- fullColor8Zone

** Устаревший мост: **

- белый
- RGB (ш)

**Описание**

Подробное описание можно найти в [его](https://steiger04.github.io/milight-smart-light-doku/).

### Версии
- **Node.js** используйте версию 10.18.1 или выше.
- **iobroker.admin** используйте версию 3.5.10 или выше.

## Changelog
### 1.1.1 (2020-01-13)
- (steiger04) compact mode added
### 1.0.5 (2020-01-10)
- (steiger04) Small bug fix
### 1.0.1 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2

### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License

The MIT License (MIT)

Copyright (c) 2017-2021 Steiger04 <steiger04@posteo.de>