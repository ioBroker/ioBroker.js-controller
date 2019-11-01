---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.lovelace/README.md
title: ioBroker.lovelace
hash: HTCuDysdffGJcO9kQvOXLG6a7YaXX0VM+u52A1+RIMU=
---
![商标](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.lovelace.svg)
![依赖状态](https://img.shields.io/david/ioBroker/iobroker.lovelace.svg)
![已知漏洞](https://snyk.io/test/github/ioBroker/ioBroker.lovelace/badge.svg)
![NPM](https://nodei.co/npm/iobroker.lovelace.png?downloads=true)
![特拉维斯](http://img.shields.io/travis/ioBroker/ioBroker.lovelace/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.lovelace?branch=master&svg=true)

＃ioBroker.lovelace
## IoBroker的lovelace适配器
使用此适配器，您可以使用Home Assistant Lovelace UI构建ioBroker的可视化。

##配置
如何配置实体有两种方法：

-自动
-手册

###自动
在自动模式下，类似的过程将应用于`google home`或`material adapter`。

***仅检测到定义了`function`和`room`类别的对象和通道***

您可以定义友好名称，这将在实体中使用。

###手册
可以在对象树（如sql或histroy）中手动定义对象。必须提供实体的类型以及对象的名称（可选）。
使用此方法，只能创建简单实体，例如input_number，input_text或input_boolean。它可能没有多个状态或属性。

##面板
###警报面板
ioBroker目前尚不支持这种设备，但是可以对其进行仿真。如果创建这样的脚本：

```
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

或者您只使用`lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`。

###数字输入
如果在自定义对话框中选择了input_number实体类型，则可以手动完成此操作。
可以添加`common`中的这种必需的`min`和`max`值以及可选的`step`。
如果要查看向上和向下箭头，则应在自定义`mode`中将其设置为“数字”：

```
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

###计时器
计时器可以通过以下脚本进行模拟：

```
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

###天气
经过yr和daswetter的测试。以下一个或多个对象必须设置为`Function=Weather`和`Room=Any`以在配置中可用：

-daswetter.0.NextDays.Location_1
-yr.0.cast

＃＃＃ 购物清单
购物清单以以下形式写入值：

```
[
   {name: 'Task 1', id: 1234222, complete: false},
   {name: 'Task 2', id: 1234223, complete: true}
]
```

进入`lovelace.X.control.shopping_list`状态。

###地图
对象必须看起来像这样：

```
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

或这两个对象：

```
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

###图片实体
您可以为其使用静态图片，也可以使用传递URL作为状态的任何状态。
例如。：

```
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

或者只是手动将实体类型设置为`camera`并将URL写入其中。

###隐藏工具栏
要隐藏工具栏，可以在“主题”选项卡上的ioBroker配置对话框中设置复选框。
要显示它，您可以再次在对话框中禁用它，或者仅使用`?toolbar=true`参数调用URL。

##自定义卡
###上载自定义卡
要上传自定义卡，请执行以下操作：

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

重新启动lovelace适配器后，它将自动包括`cards`目录中的所有文件。

以下定制卡可以成功测试：

-bignumber-card：https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
-simple-thermostat：https：//github.com/nervetattoo/simple-thermostat/releases（采用最新版本）
-恒温器：https://github.com/ciotlosm/custom-lovelace/tree/master/thermostat-card（都需要.js和.lib.js文件）

我发现此链接https://github.com/jimz011/homeassistant是自定义卡片的有趣资源。

通常，自定义卡作为源存储在github上，并且必须在使用前进行编译。
您应该检查github上的`Releases`菜单并尝试在其中找到编译的文件。
像这样：[https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases)（查找文件`mini-graph-card-bundle.js`）

##自己的图片
可以通过与自定义卡相同的配置对话框来加载自定义图像（例如背景图片）。并像这样使用它：

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

要么

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

在lovelace配置文件中。阅读更多有关lovelace[这里](https://www.home-assistant.io/lovelace/views/#background)中的背景的信息。

##主题
可以在ioBroker的配置对话框中定义主题。
粘贴类似：

```
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

摘自[这里](https://community.home-assistant.io/t/midnight-theme/28598/2)。

##图标
使用`mdi:NAME`形式的图标，例如'mdi：play-network'。可以从这里获取名称：https：//materialdesignicons.com/

##通知
您可以通过`sendTo`功能或通过将状态写入`lovelace.X.notifications.add`中来添加通知：

```
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

要么

```
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Lovelace的原始来源
使用的资源在这里https://github.com/GermanBluefox/home-assistant-polymer。

＃＃ 去做
必须从当前用户而不是从default_user获得安全性

##发展
###版本
二手版本的home-assistant-frontend@1.0.0

###如何构建新的Lovelace版本
1.转到./build目录。
2.`git clone https：// github.com / GermanBluefox / home-assistant-polymer.git`这是https://github.com/home-assistant/home-assistant-polymer.git的分支，但有些事情被修改（例如，通知）。
3.`cd home-assistant-polymer`
4.`git checkout master`
5.`npm install`
6.`gulp run build-app`发布或`gulp rundevelop-iob`调试版本
7.在此仓库中，将所有文件从./build/home-assistant-polymer/hass_frontend复制到`。/ hass_frontend`中。
8.启动“ gulp重命名”任务。

## Changelog
### 0.2.3 (2019-10-22)
* (bluefox) The custom settings were corrected

### 0.2.1 (2019-10-15)
* (bluefox) Processing of empty states was corrected

### 0.2.0 (2019-09-19)
* (Scrounger) Some bugs on "Custom Dialog" were fixed
* (Scrounger) bug fix: if value set by lovelace and max is not 100
* (Scrounger) log warn if no max value set for light entity
* (bluefox) Version of home-assistant-polymer was updated to 1.0.0

### 0.1.5 (2019-08-26)
* (bluefox) fixed timestamp conversion

### 0.1.3 (2019-07-18)
* (SchumyHao) If no ACTUAL is discovered, use SET value as switch entity value

### 0.1.2 (2019-07-14)
* (SchumyHao) Translate Chinese words to pinyin

### 0.1.1 (2019-06-10)
* (bluefox) Fixed control of states

### 0.1.0 (2019-06-06)
* (bluefox) Authentication could be disabled
* (bluefox) Lovelace compiled extra for ioBroker

### 0.0.3 (2019-06-02)
* (bluefox) initial release

## License

Copyright 2019, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.