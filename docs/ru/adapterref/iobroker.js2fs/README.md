---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.js2fs/README.md
title: без названия
hash: 9N08pUHC8+SEtfl84UAZfsUk3pq1yvYr3NrROL3JAt4=
---
![логотип](../../../en/adapterref/iobroker.js2fs/admin/js2fs.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.js2fs.svg)
![тесты](https://img.shields.io/travis/soef/iobroker.js2fs/master.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

### IoBroker.js2fs
Этот адаптер позволяет вам редактировать файлы jaascript ioBroker с помощью предпочитаемой вами IDE / редактора.

### Информация
- Только для разработчиков и для целей резервного копирования (тогда скрипты представляют собой файлы на диске и поэтому могут быть включены в резервную копию)
- Это предварительная версия и только для целей тестирования
- В настоящее время отладка ограничена

### Выгоды
- используйте предпочитаемую среду
- отладка
- контрольные точки

### Использование
например: веб-буря:

#### Монтаж
Выполните следующую команду в корневом каталоге iobroker (например, в / opt / iobroker)

```
npm install iobroker.js2fs
```