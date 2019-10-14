---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wm-bus/README.md
title: без названия
hash: 6njKhpGr6/kOA37w9bFfDaO2DkjSIZlXknJm5sm7v8M=
---
![логотип](../../../en/adapterref/iobroker.wm-bus/admin/wm-bus.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.wm-bus.svg)
![тесты](http://img.shields.io/travis/soef/ioBroker.wm-bus/master.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус сборки](https://ci.appveyor.com/api/projects/status/xg29a1r5dl00dq23?svg=true)

### IoBroker.wm-bus
*** Для этого адаптера требуется как минимум Node 4.4 ***

#### Описание
Адаптер для беспроводной M-Bus

#### Информация
Поддерживаемые USB-адаптеры:

+ [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) + [CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) + [Янтарь 8465-М](https://www.amber-wireless.de/en/amb8465-m.html)

#### Конфигурация
Если используется, ключ AES для расшифровки сообщения.
Идентификатор производства, тип и версия будут определены после первого полученного сообщения

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.wm-bus
```

#### Требования
+ USB-накопитель [iM871A](http://www.wireless-solutions.de/products/gateways/wirelessadapter) + или USB-накопитель [CUL](http://shop.busware.de/product_info.php/products_id/29?osCsid=eab2ce6ef5efc95dbdf61396ca256b6e) + устройство WM-Bus, например, [EasyMeter](http://www.easymeter.com/)

## Changelog
### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library