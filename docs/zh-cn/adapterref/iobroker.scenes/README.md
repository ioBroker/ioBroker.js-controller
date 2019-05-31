---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.scenes/README.md
title: ioBroker场景适配器
hash: G1E4YTsd0Q1l6+A7mv99P5sg5zK8+foyWJ0BN3JhoI4=
---
![商标](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![安装数量](http://iobroker.live/badges/scenes-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.scenes.svg)
![下载](https://img.shields.io/npm/dm/iobroker.scenes.svg)
![NPM](https://nodei.co/npm/iobroker.scenes.png?downloads=true)

#ioBroker场景适配器
_scenes Adapter_可以在ioBroker环境中创建场景并执行它们。

此适配器可以创建三种类型的场景：

 -  **场景**
 -  **组**
 -  **虚拟团体**

##场景
**如果未使用设置“set on false”，将创建场景**。
每个场景都可以单独配置，因此您可以在一个适配器实例中拥有**场景**和**组**。
**场景**只是状态id和值的列表，这些状态必须通过激活场景来获得。例如。我们在场景中创建了“_scene.allLightInBath_”：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

要激活场景，我们必须将“_scene.allLightInBath_”设置为true（例如，通过脚本或vis）。然后将两个状态设置为所需的值，为** true **。
_scene.allLightInBath_的值也是** true **。如果我们手动切换顶灯，_scene.allLightInBath_的值将变为** false **。
如果我们将手动切换灯，请再次** **。

让我们加入**场景**粉丝：

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

在这种情况下，风扇将在**场景**的激活时接通，并在一分钟内关闭。
关闭风扇后，_scene.allLightInBath_的值将变为** false **，因为并非所有状态都等于所需的值。
有延迟的国家不参与计算。

您可以使用“播放”按钮测试场景。
此外，您可以直接将**场景**与其他场景ID链接。例如，如果门上有传感器，您可以选择它作为触发器：

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

每次你打开浴室的门，所有带风扇的灯都会打开。

##组
**组**就像虚拟频道。您可以在**组的帮助下创建**来自多个执行器的虚拟设备并将它们一起控制，就像一个设备一样。
让我们用浴缸灯修改我们的样品。

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

如果您将此**组**与门传感器链接如下：

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

每次打开门，浴室的所有灯都会打开。 _scene.allLightInBath_的值将变为** true **。
如果您关闭门，灯将关闭。并且_scene.allLightInBath_的值将变为** false **。

它没用，但作为一个例子很好。

如果你手动打开一个灯，_scene.allLightInBath_的值将变为**不确定**。

延迟也可用于**组**，但延迟状态不参与**组**的当前值的计算。

##虚拟组
**虚拟组**类似于虚拟通道和类似组，但可以具有任何类型的值：数字，字符串等。
您可以创建虚拟组来控制起居室中的所有快门。通过将40％写入虚拟组，所有快门将设置为40％。

##将实际状态保存为场景
要保存某些场景中的实际状态，您可以向适配器发送消息：

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

适配器将读取此场景中定义的ID的所有实际值，并将其保存为已配置的ID。

## Changelog
### 1.1.1 (2019-05-26)
* (bluefox)Added storing of actual values in scene via message

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