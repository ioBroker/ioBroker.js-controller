---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mikrotik/README.md
title: без названия
hash: 2QllcQo+36Hh2pTRpMCJV29QqLILPJvPVUEjrN4ajQA=
---
![логотип](../../../en/adapterref/iobroker.mikrotik/admin/mikrotik_admin.png) ioBroker Адаптер MikroTik Router =================

![Версия NPM](http://img.shields.io/npm/v/iobroker.mikrotik.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mikrotik.svg)
![тесты](http://img.shields.io/travis/instalator/ioBroker.mikrotik/master.svg)
![NPM](https://nodei.co/npm/iobroker.mikrotik.png?downloads=true)

## С помощью
### Add_firewall
Добавьте адрес в список брандмауэров и включите.
например `name,127.0.0.1,comment`.

### Raw Отправить команду api в mikrotik, например. `/ip/firewall/address-list/add\n=list=2vpn\n=address=195.82.146.0/24\n=comment=rutracker.org`.
### Перезагрузка, выключение Перезагрузка / выключение микротик
### Usb_reset Сброс питания USB в микротике
* Созданные объекты не удаляются автоматически при удалении в роутере. *

## Changelog

#### 1.0.4
* (instalator) fix add_firewall command [issues#18](https://github.com/instalator/ioBroker.mikrotik/issues/18#issue-358331248)

#### 1.0.3
* (instalator) added checkboxes - receive the following data

#### 1.0.2
* (bondrogeen) added support for the Admin 3
* (instalator) fixed some bugs
* (instalator) added in settings time polling

#### 1.0.1
* (instalator) Change in objects symbol "*" to "_", see [issues#10](https://github.com/instalator/ioBroker.mikrotik/issues/10)
* (instalator) fix [issues#9](https://github.com/instalator/ioBroker.mikrotik/issues/9)
* (instalator) add to settings Timeout get
* (instalator) add firewall list [issues#7](https://github.com/instalator/ioBroker.mikrotik/issues/7) and command 'add_firewall' e.g. "name,127.0.0.1,comment"

#### 1.0.0
* (instalator) up to stable

#### 0.0.20
* (instalator) add mask for password in settings dialog
* (instalator) added info error login or password

#### 0.0.12
* (instalator) change logic connect

#### 0.0.11
* (instalator) added WAN address to systeminfo

#### 0.0.10
* (instalator) change logo
* (instalator) fix error

#### 0.0.4
* (instalator) added commands usb power reset
* (instalator) fix error

#### 0.0.2
* (instalator) added command 'disbled ' for: filter, interface, filter nat.
* (instalator) fix error
* (instalator) added list dhcp and wifi client

#### 0.0.1
* (instalator) initial version