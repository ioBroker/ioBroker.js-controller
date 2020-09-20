---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.scenes/README.md
title: ioBroker场景适配器
hash: T+S1r3KxE3Cf5/KnPfB5zms1Kgmc38oHlYJy5tdahjU=
---
![商标](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![安装数量](http://iobroker.live/badges/scenes-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.scenes.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.scenes.svg)
![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)

＃ioBroker场景适配器
_scenes Adapter_可以创建场景并在ioBroker环境中执行它们。

**此适配器使用Sentry库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参见[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！ Sentry报告从js-controller 3.0开始使用。

该适配器可以创建三种类型的场景：

-**场景**
-**团体**
-**虚拟团体**

##场景
如果未使用“设置为假”设置，将创建“场景”。
每个场景都可以单独配置，因此您可以在一个适配器实例中拥有“场景”和“组”。
场景只是状态ID和值的列表，这些状态必须通过激活场景才能具有。例如。我们已经在场景“ _scene.allLightInBath_”上创建了：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

要激活场景，我们必须将“ _scene.allLightInBath_”设置为true（例如，通过脚本或vis）。然后将两个状态都设置为期望值，即“ true”。
_scene.allLightInBath_的值也将为“ true”。如果我们手动切换顶部灯，则_scene.allLightInBath_的值将变为** false **。
如果我们将手动打开灯，请再次设为“ true”。

让我们将“风扇”添加到“场景”中：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

在这种情况下，风扇将在“现场”激活时打开，并在一分钟后关闭。
风扇关闭后，_scene.allLightInBath_的值将变为** false **，因为并非所有状态都等于所需值。
延迟的国家不参与计算。

您可以使用“播放”按钮测试场景。
另外，您可以将此“场景”直接与其他场景ID链接。例如，如果门上有传感器，则可以将其选作触发器：

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

每次您打开浴缸的门时，所有带风扇的灯都会打开。

##组
**群组**就像虚拟频道。您可以借助来自多个执行器的“分组”虚拟设备进行创建，并像一台设备一样一起控制它们。
让我们用浴缸的灯修改样本。

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

如果您将此“组”与门传感器链接起来，例如：

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

每次打开门时，浴池中的所有灯都会打开。 _scene.allLightInBath_的值将变为** true **。
如果您要关上门，照明灯将关闭。 _scene.allLightInBath_的值将变为** false **。

它没有用，但是很好地举例说明。

如果您将手动打开一盏灯，则_scene.allLightInBath_的值将变为**不确定**。

延迟也可以在** group **组中使用，但是具有延迟的状态不会参与** group **当前值的计算。

##虚拟群组
**虚拟组**就像虚拟通道和组一样，但可以具有任何类型的值：数字，字符串等。
您可以创建虚拟组来控制客厅中的所有百叶窗。通过将40％写入虚拟组，所有快门将被设置为40％。

##将实际状态另存为场景
要在某些场景中保存实际状态，可以向适配器发送消息：

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

适配器将读取该场景中定义的ID的所有实际值，并将其保存为已配置的ID。

＃＃ 去做：
-更改“ Bereits gestartetet Befehle anhalten”的工具提示：
-更新selectID对话框

## Changelog

### 2.1.3 (2020-09-18)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-SCENES-B, IOBROKER-SCENES-8, IOBROKER-SCENES-D)

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