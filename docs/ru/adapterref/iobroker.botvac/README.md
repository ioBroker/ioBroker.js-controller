---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.botvac/README.md
title: ioBroker.botvac
hash: VfgnY3yRgOnFfABjHM3CpUQmymouMY6j6pOGCVGAr/E=
---
![логотип](../../../en/adapterref/iobroker.botvac/admin/botvac.png)

![Количество установок](http://iobroker.live/badges/botvac-stable.svg)

# IoBroker.botvac
## Монтаж
- установить адаптер
- введите свои учетные данные пользователя Botvac
- при необходимости измените интервал опроса (минимум 60)

## Использование
- используйте состояния в канале команд для управления вашим Botvac
- используйте состояния can * в канале статуса, чтобы увидеть, какие команды являются действительными
- все состояния в канале статуса доступны только для чтения

## Примеры
### Чистить в эко режиме
- проверьте, является ли status.canStart `` `true```
- установите для commands.eco значение `` `true```
- установите для commands.clean значение `` `true```

### Очистить пятно 150 см * 150 см
- поместите Botvac перед желаемым местом
- проверьте, является ли status.canStart `` `true```
- установите для groups.spotHeight и commands.spotWidth значение «150».
- установите для commands.cleanSpot значение `` `true```

### Вернуться на базу
- status.dockHasBeenSeen должен быть `` `истинным```
- Botvac должен быть в состоянии паузы или остановки (commands.stop / commands.pause)
- установите для arguments.goToBase значение `` `true```

## Changelog
### 0.5.0
- (Pmant) add readme
- (Pmant) change pollInterval to seconds
- (Pmant) change pollInterval min to 60 seconds

### 0.4.0
- (Pmant) reduce update calls (/dashboard)

### 0.3.0
- (Pmant) fix bug where Botvac is not connected to wifi

### 0.2.0
- (Pmant) update status after command
- (Pmant) update commands 

### 0.1.0
- (Pmant) inital commit

## License
The MIT License (MIT)