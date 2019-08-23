---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tileboard/README.md
title: ioBroker.tileboard
hash: KDDfAmppbMhPsVKDFRcw4XVgwSDkfh3rObW7OlcqqWQ=
---
![商标](../../../en/adapterref/iobroker.tileboard/admin/tileboard.png)

![安装数量](http://iobroker.live/badges/tileboard-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tileboard.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tileboard.svg)
![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)

＃ioBroker.tileboard
基于[家庭助理TileBoard](https://github.com/resoai/TileBoard)的ioBroker平台的WEB可视化。
非常感谢[阿列克谢伊万诺夫](https://github.com/resoai)。

##安装和文档
<！ - ![演示界面](images/user0.png) - > <！ - ![演示界面](../../../en/adapterref/iobroker.tileboard/images/user7.png) - >

##控制界面
TileBoard创建了3个变量：

 -  control.instance  - 如果必须控制每个浏览器，则应写入浏览器实例或“*”。
 -  control.data  - 命令的参数。请参阅特定命令说明。
 -  control.command  - 命令名称。写这个变量会触发命令。这意味着在编写命令之前，必须用数据准备“实例”和“数据”。

命令：

*警告 - 在TileBoard中显示警报窗口。 “control.data”具有以下格式“message; title; jquery-icon”。 Title和jquery-icon是可选的。图标名称可以在[这里]（http://jqueryui.com/themeroller/）找到。要显示图标“ui-icon-info”，请写“``Message ;; info```。
* changeView  - 切换到所需的视图。 “control.data”必须具有视图的索引或标题，如config中所定义。
* refresh  - 重新加载TileBoard，例如在项目更改为在所有浏览器上重新加载之后。
*重新加载 - 与刷新相同。
*弹出 - 打开一个新的浏览器窗口。必须在“control.data”中指定链接，例如http://google.com
* playSound  - 播放声音文件。文件的链接在“control.data”中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  您可以在TileBoard中上传自己的文件，并将其播放为例如“/tileboard.0/main/img/myFile.mp3”。

如果用户更改视图或在开始时，TileBoard将填充变量

 - “control.instance”：浏览器实例和ack = true
 - “control.data”：config中定义的页面标题
 - “control.command”：“changedView”和ack = true

您可以将JSON-string或Object编写为control.command，如```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```。在这种情况下，实例和数据将从JSON对象中获取。

###警报
要获得更多警报设置，您可以发送以下结构来调整脚本适配器中通知弹出窗口的每个参数。

```
setState('tileboard.0.control.command', JSON.stringify({
    command: "alert",
    instance: "*",
    data: {
        "icon": "mdi-car",        // Material icon
        "type": "info",           // Type: info, warning, error, success
        "title": "Information",   // Header of the message
        "message": "Hello world", // Text of the message
        "lifetime": 5,            // Seconds
    }
}));
```

## Changelog
### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019 bluefox <dogafox@gmail.com>
 
MIT License