---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fritzdect.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fritzdect.svg
BADGE-Build Status: https://travis-ci.org/foxthefox/ioBroker.fritzdect.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.fritzdect.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fritzdect/README.md
title: Инструкция по монтажу
hash: lGaWT1nRwOi9PZbQFpJ0OKapX9z2FxtoOlSKxYorj5Q=
---
![логотип](../../../de/adapterref/iobroker.fritzdect/../../admin/fritzdect_logo.png)

# Инструкция по установке
## Настройки FritzBox
Должен быть создан пользователь, имеющий доступ к объектам DECT.

![Fritzbox](../../../de/adapterref/iobroker.fritzdect/fritzdect_einstellung.PNG)

если был создан специальный пользователь (т. е. для iobroker не используется admin), то необходимо установить разрешения, и по умолчанию пользователь должен войти в систему только при входе администратора.

![Fritzbox](../../../de/adapterref/iobroker.fritzdect/fritz_iobroker_user.PNG)

![Fritzbox](../../../de/adapterref/iobroker.fritzdect/fritz_user.PNG)

## Настройки адаптера
* Введите IP с префиксом "http: //"
* Интервал опроса может быть выбран произвольно (по умолчанию 5 минут = 300 секунд). Это необходимо для отслеживания вне ioBroker, поскольку FritzBox не обеспечивает автоматическое обновление.

![админ](../../../de/adapterref/iobroker.fritzdect/fritzdect_admin.PNG)

## Запуск адаптера
с запуском адаптера делается следующее:

* FW Fritzbox запрашивается и записывается в журнал (некоторые Fritz не отвечают, и это приводит к ошибке).
* точки данных (объекты) создаются для устройств
* создаются точки данных (объекты) для групп
* объекты снабжены данными

Следующие объекты пишутся только один раз при запуске:

* идентификатор
* fwversion
* производитель
* название продукта
* masterdviceid
* участники

## Функция термостата
Термостат может работать в автоматическом режиме (контроль температуры) и регулируется до заданной температуры.
Заданная температура может быть комфортной температурой, заданной температурой или самостоятельно выбранной температурой.

Кроме того, клапан может быть полностью закрыт и соответствует состоянию ВЫКЛ.
Другое направление также может быть выбрано с помощью ON и будет соответствовать режиму BOOST или сауне (не забудьте снова исправить его ;-)).

Эти 3 режима работы могут быть предварительно выбраны с помощью 0, 1 или 2 в режиме точки данных.
При предварительном выборе 0-AUTO выбирается последняя заданная температура.

### Температура со смещением
Измеренную температуру можно исправить в FritzBox, это измеренная температура и есть смещение. Это смещение учитывается для точки данных .temp. Здесь вы получаете измерение внутренней температуры.
Фактическая температура (фактическая температура), используемая внутри контроллера радиатора, также изменяется смещением. что HKR внутренне регулирует скорректированное значение.
Таким образом, сопоставимым для цели / Istverlaufs является atualtemp и targettemp.

## Устранение неисправностей
Желательно, чтобы посмотреть журнал, если не имеет смысла или слишком мало информации, чтобы выбрать режим отладки в настройках эксперта экземпляра.

## Changelog
### 0.2.1
* gulp added
* correction for DECT100 without temperature (caused a stop in creation of objects)
* template creation corrected
* my templates added in admin page

### 0.2.0
* compact mode

### 0.1.5
* reading and activation of templates added
* correction of actual temperature in DECT200 and COMET (now offset recognized)
* password now hidden typed and encrypted
* new datapoint actualtemp for Comet
* fritzapi 0.10.5

### 0.1.4
* button added, only send the timestamp of last click
* fritzapi 0.10.4

### 0.1.3
* windowopenactiv added to thermostat

### 0.1.2
* errorcode string->number
* batterylow -> boolean
* switch in admin for non native API call for battery charge in % (shall prevent 403 message logs)

### 0.1.1
* switch for GuestWLAN when no access is granted and polling creates an error
* check for devices in admin page for better access to the xml/json stream from fritzbox
* admin v3 implemented

### 0.1.0
* major code change to use the xml stream instead the dedicated API-commands for the dedicated values
* creation of objects according the feedback from fritzbox
* support of groups
* still usage of non-universal object names
* more objects

### 0.0.14
* correction of temp offset influence

### 0.0.13
* DECT200 voltage new object
* DECT200 mode/lock value polling
* Comet mode as number and not array
* ADMIN v3

### 0.0.12
* changed state to  mode AUTO/OFF/ON for thermostat (including datapoint lasttarget when going back to AUTO)
* added name state for thermostat
* DECT100 temperature reading
* Contact reading

### 0.0.11
* added state OFF/ON for thermostat

### 0.0.10
* change to object oriented interface
* getOSversion when starting for log

### 0.0.9
* values '1' accepted for ON
* values '0' accepted for OFF

### 0.0.8
* messages info-> debug
* values 1/true/on/ON accepted for ON
* values 0/false/off/OFF accepted for OFF

### 0.0.7
* current temp of Comet/DECT300
* cyclic polling GuestWLAN

### 0.0.6
* correction targettemp in DECT200 section

### 0.0.5
* setTemp on COMET
* GuestWlan corrected

### 0.0.4
* cyclic status polling

### 0.0.3
* user now configurable

### 0.0.2
* metro widget for Dect200
* smartfritz-promise->fritzapi
* running version, tested with 1x DECT200 and Fritzbox FW=6.51 on Win10 with 4.5.0 and raspberry 4.7.0

### 0.0.1
* running version, tested with 1x DECT200 and Fritzbox FW=6.30

## License

The MIT License (MIT)

Copyright (c) 2018 foxthefox <foxthefox@wysiwis.net>