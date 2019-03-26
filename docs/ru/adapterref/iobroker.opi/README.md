---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opi/README.md
title: ioBroker.opi
hash: qCQ8fHk1aPPvId/F6XawZRmekkuZrbj6rhVN3lwc9ZI=
---
![логотип](../../../en/adapterref/iobroker.opi/admin/opi.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.opi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opi.svg)
![NPM](https://nodei.co/npm/iobroker.opi.png?downloads=true)

# IoBroker.opi ===================
Реализация OPI-Monitor для интеграции в ioBroker.

### Важная информация
протестированное оборудование: OrangePi plus2 H3

### Следующие объекты доступны после выбора:
## *ЦПУ*
- cpu_frequency
- load1
- нагрузка5
- нагрузка15

## *Объем памяти*
- память доступна
- память_свободная
- memory_total

## *Сеть (eth0)*
- net_received
- net_send

## *eMMC*
- emmc_root_total
- emmc_root_used

## *Своп*
- swap_total
- swap_used

## *Температура*
- soc_temp

## *Время работы*
- время работы

## *WLAN*
- wifi_received
- wifi_send

### Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ЦПУ
- Объем памяти
- сеть
- eMMC
- Своп
- температура
- время работы
- WLAN

## 0.1.1 (2018-01-27)
обновить index_m.html.
обновить index.html.
- обновить коды.

## 0.1.0 (2018-01-24)
- Поддержка Admin3.

## 0.0.6 (2017-08-01)
стабильный выпуск.

## 0.0.2 (2017-06-01)
- Первый выпуск. Бета-версия.

## Changelog

## License
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>

Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License