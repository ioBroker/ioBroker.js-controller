---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scenes/README.md
title: Адаптер сцен ioBroker
hash: ZMp10ixUfAOKTgCSzrFyreen3NEPoX4iRy/ylfSxlKM=
---
![логотип](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Количество установок](http://iobroker.live/badges/scenes-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.scenes.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.scenes.svg)
![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)

# Адаптер сцен ioBroker
_scenes Adapter_ может создавать сцены и выполнять их в среде ioBroker.

Этот адаптер может создавать сцены трех типов:

- **сцены**
- **группы**
- **виртуальные группы**

## Сцены
** Сцены **будут созданы, если настройка «установлено на ложь» не используется.
Каждая сцена может быть настроена индивидуально, поэтому вы можете иметь** сцены **и** группы **в одном экземпляре адаптера.
** scene** - это просто список идентификаторов и значений состояний, которые эти состояния должны иметь при активации сцены. Например. мы создали на сцене "_scene.allLightInBath_":

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Чтобы активировать сцену, мы должны установить для "_scene.allLightInBath_" значение true (например, поверх сценария или vis). Тогда оба состояния будут установлены на желаемые значения, **true** Значение _scene.allLightInBath_ также будет **true** Если мы вручную переключим верхний источник света, значение _scene.allLightInBath_ изменится на **false** И снова в **true** если мы включим свет вручную.

Давайте добавим к **сцене** фанат:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

В этом случае вентилятор будет включен при активации **сцены** и будет выключен через одну минуту.
После выключения вентилятора значение _scene.allLightInBath_ перейдет в **false** поскольку не все состояния равны требуемым значениям.
Состояния с задержкой не участвуют в расчетах.

Вы можете проверить сцену с помощью кнопки «Play».
Кроме того, вы можете связать эту **сцену** напрямую с другим идентификатором сцены. Например, если у вас есть датчик на двери, вы можете выбрать его в качестве триггера:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

И каждый раз, когда вы откроете дверь в ванну, все огни с вентилятором будут включены.

## Группы
** Группы ** похожи на виртуальные каналы. Вы можете создавать с помощью ** групп ** виртуальное устройство из нескольких приводов и управлять ими вместе, как одно устройство.
Давайте изменим наш образец с подсветкой ванны.

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Если вы свяжете эту **группу** с датчиком двери, например:

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

Каждый раз, когда вы откроете дверь, в ванной будут включены все огни. Значение _scene.allLightInBath_ перейдет к **true** Если вы закроете дверь, огни будут выключены. И значение _scene.allLightInBath_ перейдет в **false**

Это бесполезно, но это хорошо, как пример.

Если вы вручную включите один источник света, значение _scene.allLightInBath_ станет **неопределенным**

Задержки можно использовать и в **группе** но состояния с задержкой не участвуют в расчетах текущего значения **группы**

## Виртуальные группы
** Виртуальные группы ** похожи на виртуальные каналы и похожи на группы, но могут иметь любые значения: числа, строки и так далее.
Вы можете создать виртуальную группу для управления всеми ставнями в гостиной. При записи 40% в виртуальную группу все затворы будут установлены на 40%.

## Сохранить фактические состояния как сцены
Для сохранения реальных состояний в какой-либо сцене вы можете отправить сообщение адаптеру:

```
sendTo(
    'scenes.0',
    'save',
    {sceneId:
        'scene.0.SCENE_ID', // scene ID
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false
    },
    result => result.err && console.error(result.error) // optional
);
```

Адаптер прочитает все фактические значения для идентификаторов, определенных в этой сцене, и сохранит их как настроенные.

## ДЕЛАТЬ:
- Изменить подсказку для "Bereits gestartetet Befehle anhalten": ??
- Обновить диалог selectID

## Changelog
### 2.1.2 (2020-07-08)
* (bluefox) Interval between states was corrected

### 2.0.17 (2020-06-29)
* (bluefox) GUI error corrected

### 2.0.13 (2020-06-27)
* (bluefox) Mobile view added

### 2.0.12 (2020-06-26)
* (bluefox) GUI error corrected

### 2.0.10 (2020-06-20)
* (bluefox) Added "Do not overwrite state if it has the required value" option

### 2.0.9 (2020-06-17)
* (bluefox) The colors are corrected

### 2.0.8 (2020-06-16)
* (bluefox) The tolerance is implemented

### 2.0.3 (2020-06-14)
* (bluefox) New GUI based on react

### 1.1.1 (2019-05-26)
* (bluefox) Added storing of actual values in scene via message

### 1.1.0 (2018-04-24)
* (bluefox) Works now with Admin3

### 1.0.2 (2018-01-21)
* (bluefox) use new select ID dialog
* (DeepCoreSystem) translations
* (paul53) text fixes

### 1.0.0 (2017-11-11)
* (bluefox) fix false scenes

### 0.2.7 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 0.2.6 (2016-06-21)
* (bluefox) add read/write settings to scene object

### 0.2.5 (2016-02-03)
* (bluefox) update node-schedule

### 0.2.4 (2016-01-24)
* (bluefox) fix error disabled states in scene

### 0.2.3 (2015-12-10)
* (bluefox) fix error with trigger on false

### 0.2.2 (2015-11-22)
* (bluefox) fix error with restart adapter

### 0.2.1 (2015-10-27)
* (bluefox) delete triggers if virtual groups enabled

### 0.2.0 (2015-10-27)
* (bluefox) support of virtual groups

### 0.1.3 (2015-09-19)
* (bluefox) show set value if 0 or false in settings

### 0.1.2 (2015-08-15)
* (bluefox) add translations
* (bluefox) try to fix error by renaming

### 0.1.1 (2015-08-10)
* (bluefox) allow description for states in scene
* (bluefox) check by rename if the scene with the same name yet exists
* (bluefox) allow copy scene
* (bluefox) fix error with delay and stopAllDelays settings

### 0.1.0 (2015-08-09)
* (bluefox) fix error with delays and config change
* (bluefox) implement replace 

### 0.0.2 (2015-08-05)
* (bluefox) change configuration schema
* (bluefox) add cron
* (bluefox) add burst interval

### 0.0.1 (2015-07-29)
* (bluefox) initial commit

The MIT License (MIT)

Copyright (c) 2015-2020, Bluefox (dogafox@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.