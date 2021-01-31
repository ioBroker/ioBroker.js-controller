![Logo](admin/heos.png)
# ioBroker.heos

[![NPM version](http://img.shields.io/npm/v/iobroker.heos.svg)](https://www.npmjs.com/package/iobroker.heos)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heos.svg)](https://www.npmjs.com/package/iobroker.heos)
![Number of Installations (latest)](http://iobroker.live/badges/heos-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/heos-stable.svg)
[![Dependency Status](https://img.shields.io/david/withstu/iobroker.heos.svg)](https://david-dm.org/withstu/iobroker.heos)
[![Known Vulnerabilities](https://snyk.io/test/github/withstu/ioBroker.heos/badge.svg)](https://snyk.io/test/github/withstu/ioBroker.heos)

[![NPM](https://nodei.co/npm/iobroker.heos.png?downloads=true)](https://nodei.co/npm/iobroker.heos/)

## heos adapter for ioBroker

The adapter lets control HEOS from ioBroker

## Configuration

* "AutoPlay": Automatically plays music after the player is connected or on unmute. Can be configured globally in configuration. If it is enabled globally you can disable it for one specific player with the state auto_play
* "ignore_broadcast_cmd": This player state configures, if the player should ignore commands to all players e.g. player/set_mute&state=on or pressing the play button for presets/playlists 

## Command

HEOS CLI specification: http://rn.dmglobal.com/euheos/HEOS_CLI_ProtocolSpecification.pdf

### HEOS Command State

* "system/connect": Try to Connect to HEOS
* "system/disconnect": Disconnect from HEOS
* "system/reconnect": Disconnect and Connect
* "system/load_sources": Reload sources
* "group/set_group?pid=<pid1>,<pid2>,...": Set group with the list of player ids e.g. "group/set_group?pid=12345678,12345679".
* "group/set_group?pid=<pid1>" : Delete existing group e.g. "group/set_group?pid=12345678"
* "group/ungroup_all" : Delete all groups
* "group/group_all" : Group all player in one group
* "player/[cmd]": Send the command to all players. e.g. player/set_mute&state=on 
* "leader/[cmd]": Send the command to all leading players. e.g. leader/set_mute&state=on
* "scope/[cmd]": Send the command to the configured scope all players, leading players or comma separated player pids in scope_pids
* "...": All other commands are tried to send to HEOS

### Player Command State

Note: Multiple commands are possible, if they are separated with the pipe e.g. set_volume&level=20|play_preset&preset=1

* "set_volume&level=0|1|..|100": Set the player volume 
* "set_play_state&state=play|pause|stop": Set the player state
* "set_play_mode&repeat=on_all|on_one|off&shuffle=on|off": Set Repeat and Shuffle mode
* "set_mute&state=on|off": Mute player
* "volume_down&step=1..10": Lower volume
* "volume_up&step=1..10": Raise volume
* "play_next": Play next
* "play_previous": Play previous
* "play_preset&preset=1|2|..|n": Play preset n
* "play_stream&url=url_path": Play URL-Stream
* "add_to_queue&sid=1025&aid=4&cid=[CID]": Play playlist with [CID] on player (aid: 1 – play now; 2 – play next; 3 – add to end; 4 – replace and play)

## Mute Regex
In the configuration you can activate a function to mute the player based on a regex match on the song information. That can be used to mute ads automatically. For example for Spotify you can use the following regex: ```spotify:ad:|Advertisement```.

## Seek
The seek functionality is not working on all sources. Spotify and Amazon Music are supporting seeking.

## Browse Sources
To reduce the state amount in ioBroker, only playlists and the presets are automatically stored in the states. However at first you have to click the browse button in the playlists or presets folder. You can find and control them in the "sources" folder. If you want to browse the music of a source, just press the browse button. You'll find the browse result in the sources.browse_result state. There are also commands provided to navigate deeper or play a resource. Just paste the commands in the global HEOS command field. If it is a browse command you'll find the result in the browse_result state. In the configuration you find an option to control the scope of the play commands. With that you can control if the play commands go to all players, to all leaders and non-group players or to a list of player Ids defined in the state command_scope_pid.

For VIS integration you can use the browse_result and the following script to generate a html table (It is not integrated in the adapter, so that you have the chance to style it). Alternative you use the script from Uhula https://forum.iobroker.net/post/498779:

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

### 1.7.2 (2021-01-30)
* (withstu) fix seek in groups

### 1.7.1 (2021-01-30)
* (withstu) add seek

### 1.7.0 (2021-01-29)
* (withstu) reboot not responding players
* (withstu) delete old presets and playlists

### 1.6.2 (2021-01-02)
* (withstu) fix "user not logged in" handling

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