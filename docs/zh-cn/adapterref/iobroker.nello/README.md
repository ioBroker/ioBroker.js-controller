---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nello/README.md
title: ioBroker.nello
hash: 9mYaOuhtrAZlJJyFGdwkd5IDvGd7MlrkrbIjH4DUI2U=
---
![贝宝捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/nello-installed.svg)
![稳定版](http://iobroker.live/badges/nello-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nello.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.nello.svg?branch=master)
![资料下载](https://img.shields.io/npm/dm/iobroker.nello.svg)
![环保管理员徽章](https://badges.greenkeeper.io/Zefau/ioBroker.nello.svg)
![NPM](https://nodei.co/npm/iobroker.nello.png?downloads=true)

：heavy_exclamation_mark：| ** nello API已关闭。**因此该适配器不起作用。
------------ | -------------

________________________

![商标](../../../en/adapterref/iobroker.nello/admin/nello.png)

＃ioBroker.nello nello one可将您的对讲机与智能手机和Wi-Fi连接。该适配器使用官方API（https://nellopublicapi.docs.apiary.io/）将您的nello一个连接到ioBroker。
开发人员可以通过https://github.com/Zefau/nello.io找到nello.io API的javascript实现。

## [德语自述文件/ Deutsche Anleitung](https://github.com/Zefau/ioBroker.nello/blob/master/README.de.md)
**目录**

1. [功能]（＃features）
2. [设置说明（快速设置）]（＃quick-setup）
3. [设置说明（高级设置）]（＃advanced-setup）
4. [用法/动作]（＃usage--actions）
   1. [开门]（＃open-door）
   2. [添加时间窗口]（＃adding-a-new-time-window）
   3. [删除时间窗口]（＃deleting-time-window）
5. [使用ioBroker.javascript进行智能家居/ Alexa集成]（＃smart-home--alexa-integration-using-iobrokerjavascript）
   1. [使用Alexa打开门]（＃open-door-using-alexa）
   2. [让Alexa告知您有关门环的信息]（＃let-alexa-告知您关于门环的信息）
   3. [让电报通知您有关门环的信息]（＃let-telegram-inform-you-about-door-ring）
   4. [让彩色灯通知您有关门环的信息]（＃leted-colored-lamps通知您关于门环的信息）
6. [学分]（＃credits）
7. [变更日志]（＃changelog）
8. [许可证]（＃license）

＃＃ 特征
此适配器随附以下功能：

-从您的nello中检索“所有位置” __，包括“地址”和“时间窗口”（完整列表请参见[查看州]（＃states））
-通过ioBroker添加和删除时间窗口
-当您的门铃响起时，会收到来自内罗的各种“事件”：
  -__deny__：当nello检测到铃响时，但“时间窗”或“ Homezone事件”均未导致门打开。
  -__swipe__：授权用户打开门时。
  -__geo__：由于Homezone Unlock功能（带铃响）而打开门时。
  -__tw__：由于有时间限制（带有铃响）而打开门时。
-让Alexa告知您有关门环的信息（[见下文]（＃let-alexa-告知您关于门环的信息））
-从ioBroker触发__``打开门''
-__Web Interface__，显示来自nello的最近事件：

  ![Nello介面](../../../en/adapterref/iobroker.nello/screenshots/interface.png)

##安装说明
＃＃＃ 快速设置
nello auth API负责所有nello客户端应用程序的身份验证。此服务遵循OAuth2作为身份验证方案来对应用程序/用户进行身份验证。有关OAuth2标准的更多信息，请在此处检查：https：//oauth.net/2/。
要使用此服务，必须从位于https://auth.nello.io/admin的nello auth管理员UI获得客户端凭据。请暂时不要只获得一对client_id和client_secret。它们由一个client_id和一个client_secret组成。

1.在https://auth.nello.io/admin上生成客户端ID和客户端密钥
2.在ioBroker.nello适配器设置中，填写客户端ID /客户端密钥
3.按下按钮“获取令牌”以生成令牌
4.保存并享用适配器

此快速设置将从nello API检索您的位置（所有可用的门），包括各自的地址。此外，将检索位置的分配时间窗口。此外，您可以使用此基本设置打开门。
要接收事件（门铃），您必须遵循高级设置。

####日志
如果成功快速设置ioBroker.nello，您将在ioBroker日志中找到以下内容：

```
nello.0	2018-11-24 21:29:48.132	info	Updating time windows of location XXXXX.
nello.0	2018-11-24 21:29:47.905	info	Updating location: {"location_id":"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX","address":{"number":"X","country":"XXXXX","street":"XXXXX ","zip":"XXXXX","city":"XXXXX","state":""}}
nello.0	2018-11-24 21:29:47.342	info	starting. Version X.X.X in /opt/iobroker/node_modules/iobroker.nello, node: vX.XX.X
```

＃＃＃＃ 状态
如果成功快速设置ioBroker.nello，您将在“ ** nello.0。**”中找到您的门作为设备。门的格式为_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_。在每个设备中，创建以下通道和状态：

|频道|州|描述 |
|:------- |:----- |:------------- |
|地址| -|位置的地址数据|
|地址|地址|地点的完整地址|
|地址|城市|所在城市|
|地址|国家|所在国家/地区|
|地址|州|位置状态|
|地址|街道|街道与位置编号|
|地址| streetName |位置的街道名称|
|地址| streetNumber |位置的街道号|
|地址|拉链位置的邮政编码|
| timeWindows | -|位置的时间窗|
| timeWindows | indexedTimeWindows |所有时间窗的索引|
| timeWindows | deleteAllTimeWindows |删除所有时间窗口|
| timeWindows | **createTimeWindow** \ * |用于创建新时间窗口的JSON对象（[文献资料](#adding-a-new-time-window)）|
| timeWindows.0000000000000000000 | -|时间窗口：时间窗口的说明|
| timeWindows.0000000000000000000 |启用|说明是否启用了时间窗口|
| timeWindows.0000000000000000000 | icalObj |日历数据的JSON对象|
| timeWindows.0000000000000000000 | icalRaw | iCal格式的日历数据文本|
| timeWindows.0000000000000000000 | id |时间窗口的ID |
| timeWindows.0000000000000000000 |图片（未使用）|
| timeWindows.0000000000000000000 |名称|时间窗口名称|
| timeWindows.0000000000000000000 |州|州|
| timeWindows.0000000000000000000 | **deleteTimeWindow** \ * |删除此时间窗口|
| -| **＃95; openDoor** \ * |打开位置XXXXX的门|
| -| id |位置XXXXX的ID |
| -| refreshedDateTime |位置XXXXX的最新更新（DateTime）|
| -| refreshedTimestamp |位置XXXXX的最新更新（时间戳）|

\ * _突出显示的状态将在更改后触发/执行操作_

**备注：如果您已成功快速设置ioBroker.nello，您将仅查看那些状态！**

###高级设置
####选项1：ioBroker.cloud / ioBroker.iot自定义URL（推荐）
要接收事件（门铃），建议使用ioBroker.cloud或ioBroker.iot适配器。
ioBroker.cloud / ioBroker.iot adpater将从nello接收事件并将其写入状态，然后ioBroker.nello适配器可以读取该状态。

##### IoBroker.iot
1.转到ioBroker.iot的适配器设置，然后导航到_Services和IFTTT_选项卡。
2.将术语“ _nello_”添加到“服务的_白名单_”，然后复制自定义服务的链接（“ _为自定义服务使用以下链接_”），其外观类似于“ https://service.iobroker.in / v1 / iotService？service = custom_ <SERVICE_NAME> &key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&user=email@domain.com&data= <SOME_TEXT>`。

   ![第2步](../../../en/adapterref/iobroker.nello/screenshots/step-2.jpg)

3.用服务名称“ custom_nello”替换“ custom_ <SERVICE_NAME>”（确保附加到“ custom_”的术语与步骤2中列入白名单的单词匹配）。此外，删除`＆data = <SOME_TEXT>`由于没有必要。
4.转到** nello适配器配置**并将链接粘贴到“ _ioBroker.iot服务URL _”（在选项1中）。

   ![第四步](../../../en/adapterref/iobroker.nello/screenshots/step-4.jpg)

5.保存nello适配器设置，然后等待（重新）启动适配器。然后，在您的家门口响起并确认ioBroker.iot已创建状态。您可以通过iot.0.services在ioBroker对象中找到名为custom_nello的状态。

   ![第6步](../../../en/adapterref/iobroker.nello/screenshots/step-6.jpg)

6.成功创建状态后，请再次重新启动nello适配器，以确保nello适配器订阅了此新创建的物联网状态

##### IoBroker.cloud
1.转到ioBroker.cloud的适配器设置，然后导航到_Services和IFTTT_选项卡。
2.将术语“ _nello_”添加到“服务的_白名单_”并复制自定义服务的链接（“ _为自定义服务使用以下链接_”），其外观类似于“ https://iobroker.net/service /```。
3.添加“ custom_nello”（确保“ custom_`”后面的术语与步骤2中列入白名单的词匹配）。
4.添加您的API密钥，因此URL最终看起来像是“ https：// iobroker.net / service / custom_nello / xxxxxx`”。
5.转到** nello适配器配置**，并将链接粘贴到“ _ioBroker.iot服务URL _”（在选项1中）。
6.保存nello适配器设置，然后等待（重新）启动适配器。然后，在您的家门口响起并确认状态已由ioBroker.cloud创建。您可以通过“ cloud.0.services”在ioBroker对象中找到名为“ custom_nello”的状态。
7.成功创建状态后，请再次重新启动nello适配器，以确保nello适配器订阅了此新创建的云状态

####选项2：DynDNS URL
要接收事件（门铃），您也可以在ioBroker.nello适配器设置中提供一个外部URL（带有端口）。
该URL（包括端口）将发送到nello API并进行注册。如果API注册了门铃，则API会将此信息推送到提供的URL。请参阅https://en.wikipedia.org/wiki/Webhook了解更多信息。
如果您没有DynDNS地址，也不知道我在说什么，请参阅https://www.howtogeek.com/66438/how-to-e-easily-access-your-home-network-from-anywhere- with-ddns /。

1.将包含您选择的端口的外部DynDNS地址放入ioBroker.nello适配器设置中
2.在路由器中打开您选择的端口，并将其路由到ioBroker
3.完成。现在，您的nello树中的“事件”通道中将具有其他状态，并且所有事件都被写入名为“ feed”的状态。

####日志
如果您成功地高级设置了ioBroker.nello，则与选择的选项无关，您还将在ioBroker日志中找到以下内容：

```
nello.0	2018-11-24 21:29:48.220	info	Listener attached to uri https://XXXX.XXXXX.XX:YYYY.
```

如果webook侦听器已识别事件，则可以在ioBroker日志中找到任何这些条目：

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -deny-).
```

**拒绝**：当nello检测到铃声时，但“时间窗口”或“家乡事件”均未导致门打开。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -swipe-).
```

**滑动**：授权用户打开门时。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -geo-).
```

** geo **：由于Homezone Unlock功能（带铃响）而打开门时。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -tw-).
```

** tw **：由于有时间限制（带有铃响）而打开门时。

＃＃＃＃ 状态
如果您成功高级设置了ioBroker.nello，则会创建以下其他通道和状态：

|频道|州|描述 |
|:------- |:----- |:------------- |
|大事记-|活动地点|
|大事记饲料活动提要/事件历史记录|
|大事记refreshedDateTime |最后一个事件的DateTime |
|大事记refreshedTimestamp |最后一个事件的时间戳|

**备注：如果您已成功成功设置ioBroker.nello并确认了第一个事件（有人在打您的电话），您将_仅_查看那些状态！**

“提要”状态将提供Webhook注册的所有事件的JSON。这将是一个对象数组，其中每个对象都提供以下内容（有关详细信息，请参阅https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/add-/-update-webhook）：

-**操作**：拒绝，滑动，tw或geo
-**数据**：
    -location_id
    -时间戳
    -user_id（仅滑动，tw或geo动作）
    -名称（仅滑动，tw或geo动作）

##用法/动作
＃＃＃ 开门
要打开您的内洛门，请按状态```_openDoor```的按钮。

###添加新的时间窗口要添加新的时间窗口，请将内容粘贴到状态```timeWindows.createTimeWindow```§中。预期以下格式：
```
{"name":"<NAME>","ical":"<iCal-String>"}
```

可以在Nello API文档（https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/create-a-new-time-window）中找到iCal-String的格式。 **使用§§JJJJJ_0_0§§**分隔各个元素很重要。

时间窗口示例：

```
{"name":"Cleaner","ical":"BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20190101T163000Z\r\nDTEND:20190101T170000Z\r\nSUMMARY:Cleaner\r\nEND:VEVENT\r\nEND:VCALENDAR"}
```

###删除时间窗口
要删除时间窗口，请在相应时间窗口的对象树中按下按钮。

##使用ioBroker.javascript进行智能家居/ Alexa集成
您的智能家居中可能集成的一些示例。

###使用Alexa打开门
这需要ioBroker适配器ioBroker.cloud（https://github.com/ioBroker/ioBroker.cloud）。

在ioBroker的“脚本”选项卡的“全局”文件夹中的脚本中保存以下功能：

```javascript
/**
 * Register node in Cloud Adapter
 *
 * @param   {string}    node        Node to be published
 * @param   {string}    label       Name / label of the node within Cloud Adapter
 * @param   {object}    settings    (optional) Extra settings
 * @param   {string}    type        (optional) Type of node, e.g. LIGHT, SWITCH, THERMOSTAT, ACTIVITY_TRIGGER, SCENE_TRIGGER, SMARTPLUG, SMARTLOCK, CAMERA
 * @param   {string}    byOn        (optional) Default when turning on
 * @return  void
 */
function cloud(node, label, settings = {})
{
    log('Published '+node+' as '+label+' in Cloud Adapter.');

    settings = typeof settings === 'string' ? {type: settings} : settings;
    extendObject(node, {common: {smartName: {en: label, smartType: settings.type || 'SWITCH', byON: settings.byON || ''}}});
}
```

_（于2018-11-22更新，并修复了不正确的空设置）_

您可以对ioBroker对象树中的每个状态使用此功能，以在ioBroker.cloud适配器中注册状态并在Alexa中使用它。
**重要**：进入ioBroker.javascript的适配器设置，然后选中“启用命令setObject”框！

现在，使用以下函数在“普通”文件夹中创建一个新脚本：

```javascript
cloud('nello.0.#YOUR DOOR ID#._openDoor', 'Tür öffnen');
```

用您要打开的门的ID替换**＃YOUR DOOR ID＃**（还要替换＃）。您可以在ioBroker.nello状态树（ioBroker的“对象”选项卡）中找到ID。

最终，在您的Alexa应用程序中搜索/发现新设备，并在Alexa应用程序中创建一个例程（例如“ Alexa，开门”）并将新发现的状态分配给它。完蛋了！现在，您可以告诉Alexa为您打开门。

###让Alexa告知您有关门铃的信息
这需要ioBroker适配器ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

为了使用Alexa的语音输出，我们定义了一个函数```say```§。将以下函数放在ioBroker.javascript的“全局”文件夹中的脚本中（您可以将其放在与上面相同的位置）。 **重要**：用您的Alexa ID替换＃您的ALEXA ID＃（也替换＃）。您可以在ioBroker```alexa2.0.Echo-Devices```的对象树中找到Alexa ID。

```javascript
/**
 * Say something with Alexa.
 *
 * @param       {string}        message         Message to say
 * @param       {string|array}  alexas          Alexa Device to say the voice message
 * @return      void
 *
 */
function say(message, alexas = '#YOUR ALEXA ID#') // use alexas = ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'] for default voice output from multiple devices (also replace #)
{
    alexas = typeof alexas === 'string' ? [alexas] : alexas;
    alexas.forEach(function(alexa)
    {
        setState('alexa2.0.Echo-Devices.' + alexa + '.Commands.speak', message);
    });
}
```

_（于2018-11-18更新，一次支持从多个Alexa设备输出语音）_

您可以在ioBroker.javascript中使用此功能，使用Alexa§§JJJJJ_0_0§或```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])```来说出短语，以从多个设备输出语音。

在ioBroker.javascript的“ common”文件夹中创建一个脚本（或使用上面创建的脚本），然后向其中添加以下侦听器：

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      say(L.actionRingUnknown);

   else if (event.action == 'swipe')
      say(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      say(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      say(L.actionOpen);
});
```

_（已于2019-01-02更新，以也反映具有特定Alexa短语的地理选项）_

根据事件的动作，Alexa将通知您有关门被打开或门铃被识别的信息。
**重要**：用您的nello门ID替换#YOUR DOOR ID＃（也请替换＃）。

###让Telegram通知您有关门铃的信息
这需要ioBroker适配器ioBroker.telegram（https://github.com/iobroker-community-adapters/ioBroker.telegram#iobroker-telegram-adapter）。

为了使用Telegram Messenger，我们定义了一个函数```msg```§。将以下函数放在ioBroker.javascript的“全局”文件夹中的脚本中（您可以将其放在与上面相同的位置）。

```javascript
/**
 * Send something with Telegram
 *
 * @param       {string}        content         Content to send via Telegram
 * @param       {string}  		[user='']		User to send the content to
 * @return      void
 *
 */
function msg(content, user = '')
{
    const CONFIG = {
        text: content,
        parse_mode: 'HTML'
    };

    sendTo('telegram', user ? Object.assign({user: user}, CONFIG) : CONFIG);
}
```

您可以在ioBroker.javascript中使用此功能，使用§§JJJJJ_0_0§§将任何内容发送到Telegram。您可以使用```msg('Hello World', 'User')```将内容发送给特定用户。

在ioBroker.javascript的“ common”文件夹中创建一个脚本（或使用上面创建的脚本），然后向其中添加以下侦听器：

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

   var event = events[events.length-1];
   if (event.action == 'deny')
      msg(L.actionRingUnknown);

   else if (event.action == 'swipe')
      msg(L.actionOpenName.replace(/%name%/gi, event.data.name));

   else if (event.action == 'geo')
      msg(L.actionOpenGeo.replace(/%name%/gi, event.data.name));

   else
      msg(L.actionOpen);
});
```

根据事件的动作，Telegram将通知您有关门被打开或门铃被识别的信息。

###让彩色灯通知您有关门铃的信息
此功能需要一个适配器，该适配器可以设置彩色/ RGB灯，例如ioBroker.hue（https://github.com/ioBroker/ioBroker.hue）。

为了使用彩色灯，必须定义功能```color```和```colors```。将以下函数放在ioBroker.javascript的“全局”文件夹中的脚本中（您可以将其放在与上面相同的位置）：

```javascript
/**
 * Visualize a message using a color / hue.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {object}        hue             Color code to bet set
 * @param       {integer}       hue.r           (optional) Red part of the color to be set
 * @param       {integer}       hue.g           (optional) Green part of the color to be set
 * @param       {integer}       hue.b           (optional) Blue part of the color to be set
 * @param       {integer}       hue.w           (optional) White part of the color to be set
 * @param       {integer}       hue.bri         (optional) Brightness part of the color to be set
 * @param       {integer}       hue.rgb         (optional) All RGB parts of the color to be set
 * @return      void
 *
 */
function color(devices, hue)
{
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
	    ['b', 'g', 'w', 'r', 'bri', 'rgb'].forEach(function(key)
    	{
    		if (hue[key] !== undefined)
    			setState(device + '.' + key, hue[key]);
    	});
    });
}
```

```javascript
/**
 * Append multiple messages using a delay to create a light sequence.
 *
 * @param       {string|array}  devices         Device(s) the color shall be set
 * @param       {array}         hues            Color code to bet set
 * @param       {number}        delay           (optional) Delay between steps
 * @param       {number}        start           (optional) Delayed start
 * @return      {number}                        Total delay used
 *
 */
function colors(devices, hues, delay = 3000, start = 0)
{
    var delayed = start;
    devices = typeof devices === 'string' ? [devices] : devices;
    devices.forEach(function(device)
    {
        // get initial state and colors
        var defaults = {};
        ['on', 'xy', 'bri'].forEach(function(initial) {defaults[initial] = getState(device + '.' + initial).val});

        // turn lights on if currently off
        if (defaults.on !== true)
        {
            setState(device + '.on', true);
            delayed += 800;
        }

        // loop through colors
        hues.forEach(function(hue, i)
    	{
            delayed += delay;
            setTimeout(function()
            {
                color(device, hue);
            }, delayed);
    	});

        // restore initial states
        delayed += 1000;
        setTimeout(function()
        {
            setState(device + '.xy', defaults['xy']);
            if (defaults['on'] === true)
                setState(device + '.bri', defaults['bri']);
        }, delayed);

        // turn off again (if it was off)
        if (defaults['on'] === false)
        {
            delayed += 2000;
            setTimeout(function() {setState(device + '.on', false)}, delayed); // delayed so colors is set before turned off
        }
    });

    return delayed;
}
```

_（于2019年1月20日更新以解决问题[＃11](https://github.com/Zefau/ioBroker.nello/issues/11)）_

您可以在ioBroker.javascript中使用这些功能为任何灯着色，例如```color('hue.0.Philips_hue.Lamp', {'r': 0, 'g': 255, 'b': 0})```（绿色）或```color(['hue.0.Philips_hue.Lamp1', 'hue.0.Philips_hue.Lamp2'], {'r': 0, 'g': 255, 'b': 0})```来为多个设备着色。

在ioBroker.javascript的“ common”文件夹中创建一个脚本（或使用上面创建的脚本），然后向其中添加以下侦听器：

```javascript
var lamp = '#YOUR LAMP#'; // e.g. hue.0.Philips_hue.Lamp
var rgb = {
   'actionRingUnknown': {'r': 255, 'g': 0, 'b': 0, 'bri': 255},
   'actionOpenName': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpenGeo': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'actionOpen': {'r': 0, 'g': 255, 'b': 0, 'bri': 255},
   'reset': {'r': 255, 'g': 255, 'b': 255, 'bri': 255},
};

on({id: 'nello.0.#YOUR DOOR ID#.events.feed', change: 'any'}, function(obj)
{
   var events = obj && obj.state && JSON.parse(obj.state.val);
   if (!events || events.length == 0) return;

    var event = events[events.length-1];
    if (event.action == 'deny')
        colors(lamp, [
            rgb.actionRingUnknown,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'swipe')
        colors(lamp, [
            rgb.actionOpenName,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else if (event.action == 'geo')
        colors(lamp, [
            rgb.actionOpenGeo,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);

    else
        colors(lamp, [
            rgb.actionOpen,
            {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}, {'bri': 50}, {'bri': 255}
        ], 500);
});
```

根据事件的动作，灯将以定义的值着色。
**重要**：将**＃LAMP LAMP＃**（也替换为＃）替换为您要着色的灯的状态。用您的nello门ID替换**＃YOUR DOOR ID＃**（也请替换＃）。

##学分
<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>从<a href="https://www.flaticon.com/" title="平面图标">www.flaticon.com</a>制作的图标<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">已获</a> <a href="http://creativecommons.org/licenses/by/3.0/" title="知识共享BY 3.0" target="_blank">CC 3.0 BY</a>许可

## Changelog

### 2.0.8 (2019-08-11)
- (Zefau) Fixed Error `State not properly defined`

### 2.0.7 (2019-08-10)
- (Zefau) Performance improvements

### 2.0.6 (2019-07-20)
- (Zefau) updated dependencies to fix security vulnerabilities in depending packages

### 2.0.5 (2019-05-15)
- ([@Apollon77](https://github.com/Apollon77)) updated testing for Node.js v12 ([#25](https://github.com/Zefau/ioBroker.nello/pull/25))
- (Zefau) updated dependencies

### 2.0.4 (2019-03-15)
- ([@Apollon77](https://github.com/Apollon77)) Core Files/Testing Update and introduce adapter-core ([#17](https://github.com/Zefau/ioBroker.nello/pull/17)) and Update CI testing ([#19](https://github.com/Zefau/ioBroker.nello/pull/19))

### 2.0.3 (2019-03-03)
- (Zefau) added folder `.events.latest` with states `action`, `twName`, `userId` and `userName` reflecting the information of the latest event

### 2.0.2 (2019-02-09)
- (Zefau) fixed error incorrectly stating a missing token

### 2.0.1 (2019-02-01)
- (Zefau) added error stack trace in log debug output
- ([@ldittmar81](https://github.com/ldittmar81)) added support for gulp

### 2.0.0 (2019-01-27)
- (Zefau) added visual timeline of nello events
- (Zefau) support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
- (Zefau) updated API dependency

### 1.x.x
For earlier release, [please see Github branch for v1](https://github.com/Zefau/ioBroker.nello/tree/v1#changelog).

## License
The MIT License (MIT)

Copyright (c) 2018-2019 Zefau <zefau@mailbox.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.