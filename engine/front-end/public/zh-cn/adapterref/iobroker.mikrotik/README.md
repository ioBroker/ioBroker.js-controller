---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/instalator/iobroker.mikrotik/edit/master//README.md
title: MikroTik Router adapter
hash: 2QllcQo+36Hh2pTRpMCJV29QqLILPJvPVUEjrN4ajQA=
adapter: true
license: MIT
authors: instalator <vvvalt@mail.ru>
description: ioBroker mikrotik Adapter
keywords: ioBroker, mikrotik
readme: https://github.com/instalator/iobroker.mikrotik/blob/master/README.md
mode: daemon
materialize: true
compact: false
published: 2017-07-27T16:46:54.455Z
version: 1.0.4
BADGE-NPM版本: http://img.shields.io/npm/v/iobroker.mikrotik.svg
BADGE-下载: https://img.shields.io/npm/dm/iobroker.mikrotik.svg
BADGE-测试: http://img.shields.io/travis/instalator/ioBroker.mikrotik/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.mikrotik.png?downloads=true
---
![商标](zh-cn/adapterref/iobroker.mikrotik/../../../en/adapterref/iobroker.mikrotik/admin/mikrotik_admin.png)ioBrokerMikroTik路由器适配器=================


##使用
### Add_firewall
将地址添加到防火墙列表并启用。
例如`name,127.0.0.1,comment`。

### Raw将命令api发送给mikrotik，例如`/ip/firewall/address-list/add\n=list=2vpn\n=address=195.82.146.0/24\n=comment=rutracker.org`。
### Reboot，shutdown重启/关闭mikrotik
### Usb_reset重置mikrotik中的电源USB
*在路由器中删除时，不会自动删除创建的对象。*

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