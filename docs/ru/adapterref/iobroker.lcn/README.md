---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: huwsxU4/YbYGapJUD98J8NIoQW2t3uDw1T5ci8Vw/LE=
---
![логотип](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn =================
Этот адаптер позволяет подключить локальную сеть управления [LCN](https://www.lcn.eu/) к ioBroker.

## Поддерживаемые шлюзы
- LCN-PKE

![ПКЕ](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- ЛКН-ФКУ с ЛКН-ПЧК

![ПКЕ](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

** Не забывайте, что ioBroker.lcn заблокирует одну лицензию на подключение LCN. **

Конфигурация и модули будут автоматически обнаружены при сканировании.

## Типы
Поддерживаются следующие группы чтения и записи:

- Аналоговые значения (выход / вход)
- Реле (выход)
- Датчики (входные)
- светодиоды (выход / вход)
- переменные (входные)

## Переменные
Чтобы применить действительные функции преобразования к переменным, переменные должны иметь допустимые роли. Поддерживаются следующие роли:

- значение.температура - температура в градусах Цельсия
- значение.яркость - люкс (I-вход) в люксах
- value.speed.wind - скорость ветра в м / с
- value.current - ток в вольтах
- value.power - мощность в ампере

-

## Changelog

### 0.3.0
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018 bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.