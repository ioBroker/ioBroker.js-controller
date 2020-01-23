---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tileboard/README.md
title: ioBroker.tileboard
hash: VWBJDpsB6tMzUlHb7q3XKs2qslIhBqzHjlBBGpwuP/k=
---
![商标](../../../en/adapterref/iobroker.tileboard/admin/tileboard.png)

![安装数量](http://iobroker.live/badges/tileboard-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tileboard.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.tileboard.svg)
![NPM](https://nodei.co/npm/iobroker.tileboard.png?downloads=true)

＃ioBroker.tileboard
基于[TileBoard家庭助理](https://github.com/resoai/TileBoard)的ioBroker平台的WEB可视化。
非常感谢[阿列克谢·伊万诺夫（Alexey Ivanov）](https://github.com/resoai)。

##安装与说明文件
<！-![演示界面](images/user0.png)-> <！-![演示界面](../../../en/adapterref/iobroker.tileboard/images/user7.png)->

##控制界面
TileBoard创建3个变量：

-control.instance-如果必须控制每个浏览器，则应在此处编写浏览器实例或“ *”。
-control.data-命令参数。请参阅特定的命令描述。
-control.command-命令名称。编写此变量将触发命令。这意味着在写入命令之前，“实例”和“数据”必须与数据一起准备。

命令：

*警报-在TileBoard中显示警报窗口。 “ control.data”具有以下格式“ message; title; jquery-icon”。标题和jquery-icon是可选的。图标名称可以在[here]（http://jqueryui.com/themeroller/）中找到。要显示图标“ ui-icon-info”，请写“ Message ;; info`”。
* changeView-切换到所需的视图。 “ control.data”必须具有视图的索引或标题，如config中定义的那样。
*刷新-重新加载TileBoard，例如在将项目更改为在所有浏览器上重新加载后。
*重新加载-与刷新相同。
*弹出窗口-打开一个新的浏览器窗口。链接必须在“ control.data”中指定，例如http://google.com
* playSound-播放声音文件。文件的链接在“ control.data”中指定，例如http://www.modular-planet.de/fx/marsians/Marsiansrev.mp3。

  您可以将自己的文件上传到TileBoard中，然后像“ /tileboard.0/main/img/myFile.mp3”一样播放。

如果用户更改视图或在开始时，变量将由TileBoard填充，并带有

-“ control.instance”：浏览器实例和ack = true
-“ control.data”：配置中定义的页面标题
-“ control.command”：“ changedView”和ack = true

您可以将JSON字符串或对象作为```{instance: 'AABBCCDD', command: 'cmd', data: 'ddd'}```§写入control.command中。在这种情况下，实例和数据将从JSON对象获取。

###警报
要获取更多警报设置，您可以发送以下结构来调整脚本适配器通知弹出窗口的每个参数。

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

##对于开发人员
如何将原始存储库合并到此存储库中：

以下文件已更改：

-`/ index.html`-添加了../tileboard.0/custom.css、../../lib/js/socket.io.js、../_socket/info.js和`scripts / vendors / conn.js`，删除了`styles / custom.css`
-`/ scripts / models / api.js`-已完全替换
-`/ scripts / controllers / main.js`-

扩展功能`getItemEntity`：

```
   $scope.getItemEntity = function (item) {
      if(typeof item.id === "object") return item.id;

      if(!(item.id in $scope.states)) { // IoB
          if (typeof Api.getState === 'function') {
              Api.getState(item.id);
          } else {
              warnUnknownItem(item);
          }
          return null;
      }

      return $scope.states[item.id];
   };
```

新增功能`setNewStates`：

```
    // IoB - required for lazy load of the states, becasue every update of the single state cause the request of all states again.
    // To avoid that all states must be updated at once and only then updateView should be called.
    function setNewStates (states) {
        states.forEach(function (state) {
            if(!$scope.states[state.entity_id]) $scope.states[state.entity_id] = state.new_state;

            // Is it required? If $scope.states[key] just assigned?
            for(var k in state.new_state) $scope.states[state.entity_id][k] = state.new_state[k];
        });
    }
```

修改功能：

```
   function handleEvent (event) {
      try {
         if (event.event_type === "state_changed") {
            debugLog('state change', event.data.entity_id, event.data.new_state);

            if (event.data instanceof Array) { // IoB
                setNewStates(event.data);
                event.data.forEach(function (state) {
                    checkStatesTriggers(state.entity_id, state.new_state);
                });
            } else {
                setNewState(event.data.entity_id, event.data.new_state);
                checkStatesTriggers(event.data.entity_id, event.data.new_state);
            }
         }
         else if (event.event_type === "tileboard") {
            debugLog('tileboard', event.data);

            triggerEvents(event.data);
         }
      }
      catch (e) {console.error(e);}
      updateView();
   }
```

在末尾：

```   if(CONFIG.pingConnection !== false) {```

=>

```
   if (CONFIG.pingConnection) { // Changed for IoB
```

-`/styles/main.less（css）`

添加：

```
@media screen and (max-height: 770px) { // IoB
  .header {
    display: none;
  }
}
```

## Changelog
### 0.3.0 (2020-01-23)
* (yaming116) fixed pingConnection
* (bluefox) Changes of the original tileboard were merged

### 0.2.0 (2019-07-15)
* (bluefox) Changes of the original tileboard were merged

### 0.1.1 (2019-02-12)
* (bluefox) Changes of the original tileboard were merged

### 0.1.0 (2019-01-16)
* (bluefox) initial commit

## License
Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>
 
MIT License