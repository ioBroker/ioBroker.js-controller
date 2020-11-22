---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight-smart-light/README.md
title: ioBroker.milight-smart-light
hash: sNYZ4pRzYCdPo+Z1noG5Vu/siGKkapBbADx0hC8kKOA=
---
![Логотип milight-smart-light](../../../en/adapterref/iobroker.milight-smart-light/public/milight-smart-light-logo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.milight-smart-light.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight-smart-light.svg)
![Тесты](http://img.shields.io/travis/Steiger04/ioBroker.milight-smart-light/master.svg)
![стабильный](http://iobroker.live/badges/milight-smart-light-stable.svg)
![установлен](http://iobroker.live/badges/milight-smart-light-installed.svg)
![NPM](https://nodei.co/npm/iobroker.milight-smart-light.png?downloads=true)

# IoBroker.milight-smart-light
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

### Версии
- **Node.js** используйте версию 8.0.0 или выше.
- **iobroker.admin** используйте версию 3.5.10 или выше.

## Changelog
### 1.0.0 (2020-11-21)
- (steiger04) Added admin-UI based on Vue and Quasar
### 0.6.0 (2020-05-23)
- (steiger04): Added effectBrightness, effectOn, effectOff, effectOnOff for iBox1 and iBox2

### 0.5.0 (2020-05-21)
- (steiger04): Bug fix in rgb(w)

## License

The MIT License (MIT)

Copyright (c) 2017-2020 Steiger04 <steiger04@posteo.de>