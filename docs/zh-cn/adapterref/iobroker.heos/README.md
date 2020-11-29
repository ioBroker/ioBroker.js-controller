---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heos/README.md
title: ioBroker.heos
hash: hE6ToxZKTxiOM031WbCm3VmfoAcE1V7Lh3Wo8jJeECY=
---
![商标](../../../en/adapterref/iobroker.heos/admin/heos.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.heos.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.heos.svg)
![安装数量（最新）](http://iobroker.live/badges/heos-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/heos-stable.svg)
![依赖状态](https://img.shields.io/david/withstu/iobroker.heos.svg)
![已知漏洞](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)
![NPM](https://nodei.co/npm/iobroker.heos.png?downloads=true)

＃ioBroker.heos
## Heos ioBroker适配器
该适配器可以从ioBroker控制HEOS

##配置
*“自动播放”：连接播放器或取消静音后，自动播放音乐。可以在配置中全局配置。如果已全局启用它，则可以使用状态auto_play禁用一个特定播放器
*“ ignore_broadcast_cmd”：如果播放器应忽略对所有播放器的命令，则配置此播放器状态，例如播放器/ set_mute＆state = on或按播放按钮以获取预设/播放列表

##命令
HEOS CLI规范：http://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification.pdf

### HEOS命令状态
*“系统/连接”：尝试连接到HEOS
*“系统/断开连接”：与HEOS断开连接
*“系统/重新连接”：断开并连接
*“ system / load_sources”：重新加载源
*“ group / set_group？pid = <pid1>，<pid2>，...”：使用玩家ID列表设置组，例如“ group / set_group？pid = 12345678,12345679”。
*“ group / set_group？pid = <pid1>”：删除现有的组，例如“组/ set_group？pid = 12345678”
*“ group / ungroup_all”：删除所有组
*“ group / group_all”：将所有玩家分组
*“ player / [cmd]”：将命令发送给所有玩家。例如玩家/ set_mute＆state = on
*“ leader / [cmd]”：将命令发送给所有领先玩家。例如玩家/ set_mute＆state = on
*“ scope / [cmd]”：将命令scope_pids中的所有播放器，前导播放器或逗号分隔的播放器pid发送到已配置的作用域
*“ ...”：尝试将所有其他命令发送到HEOS

###玩家命令状态
注意：如果多个命令与管道分开，则可能是多个命令，例如set_volume＆level = 20 | play_preset＆preset = 1

*“ set_volume＆level = 0 | 1 | .. | 100”：设置播放器音量
*“ set_play_state＆state =播放|暂停|停止”：设置播放器状态
*“ set_play_mode＆repeat = on_all | on_one | off＆shuffle = on | off”：设置重复和随机播放模式
*“ set_mute＆state = on | off”：静音播放器
*“ volume_down＆step = 1..10”：降低音量
*“ volume_up＆step = 1..10”：提高音量
*“ play_next”：继续播放
*“ play_previous”：播放上一个
*“ play_preset＆preset = 1 | 2 | .. | n”：播放预设n
*“ play_stream＆url = url_path”：播放URL流
*“ add_to_queue＆sid = 1025＆aid = 4＆cid = [CID]”：播放器上带有[CID]的播放列表（帮助：1 –现在播放； 2 –接下来播放； 3 –添加到结尾； 4 –替换并播放）

##使正则表达式静音
在配置中，您可以根据歌曲信息的正则表达式匹配，激活使播放器静音的功能。可以用来自动静音广告。例如对于Spotify，您可以使用以下正则表达式：§§JJJJJ_0_0§§。

##浏览源
为了减少ioBroker中的状态量，只有播放列表和预设会自动存储在状态中。但是，首先必须单击播放列表或预设文件夹中的浏览按钮。您可以在“源”文件夹中找到并控制它们。如果要浏览来源的音乐，只需按浏览按钮。您将在sources.browse_result状态中找到浏览结果。还提供了一些命令，可以更深入地导航或播放资源。只需将命令粘贴到全局HEOS命令字段中即可。如果这是一个浏览命令，您将在Browse_result状态下找到结果。在配置中，您可以找到一个选项来控制播放命令的范围。这样，您可以控制播放命令是发给所有玩家，所有领导者和非小组玩家还是在状态command_scope_pid中定义的玩家ID列表。

对于VIS集成，您可以使用browser_result和以下脚本来生成html表（该表未集成在适配器中，因此您可以为其设置样式）。或者，您可以使用Uhula的脚本https://forum.iobroker.net/post/498779：

```javascript
on({id: 'heos.0.sources.browse_result', change: 'any'}, function (obj) {
  let data = JSON.parse(obj.state.val);
  let html = `<style>
  .heos-browse {
      background-color: #333333;
      color: #eaeaea;
      height: 100%;
      width: 100%;
      position: absolute;
      overflow: auto;
  }
  .heos-browse table {
      width: 100%;
      border-collapse: collapse;
  }
  .heos-browse table,
  .heos-browse th,
  .heos-browse td {
      border: 1px solid #929292;
      border-width:1px 0;
  }
  .heos-browse th {
      font-size: 2em;
      border: 1px solid #c50000;
      border-width: 0 0 1px 0;
      text-align: center;
  }
  .heos-browse th {
      padding: 15px;
      height: 60px;
  }
  .heos-browse td {
      padding: 5px;
      height: 60px;
  }
  .heos-browse-btn {
      color: #fff;
      background-color: Transparent;
      background-repeat:no-repeat;
      border: none;
      cursor:pointer;
      overflow: hidden;
      outline:none;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 30px !important;
      line-height: 30px;
      width: 60px;
      height: 60px;
  }
  .heos-browse-btn-multi {
      border-right: 1px solid #929292;
  }
  .heos-browse-row-media {
      cursor: pointer;
  }
  .heos-browse-row-control {
      color: #d60000;
      cursor: pointer;
  }
  .heos-browse-image {
      white-space: nowrap;
      padding: 0 !important;
      text-align: right;
      font-size: 0;
  }
  .heos-browse-image img {
      height: 60px;
  }
  .heos-browse-name {
      width: 100%;
      text-align: left;
  }
  .heos-browse-control {
      padding: 0 !important;
      margin: 0 !important;
      white-space: nowrap;
      font-size: 0;
      text-align: right;
  }
  </style>`;
  if(data){
      html += "<div class=\"heos-browse\">"
      html += "<table>"
      html += "<tr><th>";
      if(data.image_url.length){
          html += "<img src=\"" + data.image_url + "\" height=\"30px\">";
      }
      html += "</th><th>" + (data.name == "sources" ? "Overview" : data.name) + "</th><th></th></tr>";
      for (let i = 0; i < data.payload.length; i++) {
          let payload = data.payload[i];
          html += "<tr class=\"";
          if(payload.type == "control"){
            html += "heos-browse-row-control";
          } else {
              html += "heos-browse-row-media"
          }
          html += "\">";
          html += "<td class=\"heos-browse-image\"";
          if("browse" in payload.commands){
              html += " onClick=\"servConn.setState('heos.0.command','" + payload.commands["browse"].replace(/'/g, "\\'") +"')\"";
          } else if(Object.keys(payload.commands).length == 1){
              html += " onClick=\"servConn.setState('heos.0.command','" + payload.commands[Object.keys(payload.commands)[0]].replace(/'/g, "\\'") +"')\"";
          }
          html += ">"
          if(payload.image_url.length){
            html += "<img src=\"" + payload.image_url + "\">";
          }
          html += "</td>";
          html += "<td class=\"heos-browse-name\"";
          if("browse" in payload.commands){
              html += " onClick=\"servConn.setState('heos.0.command','" + payload.commands["browse"].replace(/'/g, "\\'") + "')\"";
          } else if(Object.keys(payload.commands).length == 1){
              html += " onClick=\"servConn.setState('heos.0.command','" + payload.commands[Object.keys(payload.commands)[0]].replace(/'/g, "\\'") +"')\"";
          }
          html += ">"
          if(payload.type == "control"){
            switch(payload.name){
              case "load_next":
                html += "Next page";
                break;
              case "load_prev":
                html += "Previous page";
                break;
              case "play_all":
                html += "Play all";
                break;
              case "back":
                html += "Back";
                break;
              case "sources":
                html += "Overview";
                break;
            }
          } else {
            html += payload.name;
          }
          html +="</td>";
          html += "<td class=\"heos-browse-control\">";
          for (let key in payload.commands) {
            let command = payload.commands[key];
            html += "<button class=\"heos-browse-btn"
            if(Object.keys(payload.commands).length > 1){
                html += " heos-browse-btn-multi"
            }
            html += "\" onClick=\"servConn.setState('heos.0.command','" + command.replace(/'/g, "\\'") +"')\">"
            switch(key){
                case "play":
                html += "►";
                break;
                case "browse":
                html += ">";
                break;
            }
            html += "</button>";
          }
          html += "</td>";
          html += "</tr>";
      }
      html += "</table></div>";
  }
  setState("0_userdata.0.heos.browse_result_html", html);
});
```

## Changelog

### 1.6.1 (2020-11-25)
* (withstu) clear timeout and interval on unload; fix roles; remove sleep in tts module

### 1.6.0 (2020-11-22)
* (withstu) add regex mute

### 1.5.6 (2020-11-22)
* (withstu) add source images & optimize auto play

### 1.5.5 (2020-11-01)
* (withstu) update some packages and add sources event

### 1.5.4 (2020-10-24)
* (withstu) ignore invalid now playing responses

### 1.5.3 (2020-10-18)
* (withstu) minor improvements related to auto play feature

### 1.5.2 (2020-10-11)
* (withstu) improve tts stop method

### 1.5.1 (2020-10-11)
* (withstu) improve tts and don't update queue during tts

### 1.5.0 (2020-10-10)
* (withstu) add tts support and maximum volume

### 1.4.0 (2020-10-10)
* (withstu) add more play and queue settings
* (withstu) bugfixing for invalid heos responses (empty player name)

### 1.3.4 (2020-10-04)
* (withstu) remove sorting and available filter and fix browse play

### 1.3.3 (2020-10-04)
* (withstu) fix previous page button in browse feature

### 1.3.2 (2020-10-04)
* (withstu) fix preset sorting

### 1.3.1 (2020-10-03)
* (withstu) add back button to browse feature

### 1.3.0 (2020-10-03)
* (withstu) add queue and some browse improvements

### 1.2.4 (2020-09-29)
* (withstu) minor bugfix

### 1.2.3 (2020-09-29)
* (withstu) improve browse feature (add pictures and sources view)

### 1.2.2 (2020-09-28)
* (withstu) rename browse command

### 1.2.1 (2020-09-28)
* (withstu) introduce browse_result state

### 1.2.0 (2020-09-27)
* (withstu) Breaking change: restructure playlists/presets (you should delete the devices playlists, presets and sources before installation)

### 1.1.2 (2020-09-26)
* (withstu) log browse parameters

### 1.1.1 (2020-09-26)
* (withstu) add source browse feature (Click the button in the sources. You can find the possible next commands in the log.)

### 1.1.0 (2020-09-26)
* (withstu) encrypt password

### 1.0.1 (2020-09-21)
* (withstu) remove connected state, because it is included in the info channel

### 1.0.0 (2020-09-21)
* (withstu) initial release

## License
MIT License

Copyright (c) 2020 withstu <withstu@gmx.de>

derived from https://forum.iobroker.net/topic/10420/vorlage-denon-heos-script by Uwe Uhula
TTS derived from https://github.com/ioBroker/ioBroker.sonos

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