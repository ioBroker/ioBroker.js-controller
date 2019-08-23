---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.nello/README.md
title: ioBroker.nello
hash: KHMCB9HRsYdH9J1r0p0yPnDhlS6GNyjrldwjCBn1gE0=
---
![商标](../../../en/adapterref/iobroker.nello/admin/nello.png)

![Paypal捐赠](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![安装数量](http://iobroker.live/badges/nello-installed.svg)
![稳定的版本](http://iobroker.live/badges/nello-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.nello.svg)
![特拉维斯CI](https://travis-ci.org/Zefau/ioBroker.nello.svg?branch=master)
![下载](https://img.shields.io/npm/dm/iobroker.nello.svg)
![Greenkeeper徽章](https://badges.greenkeeper.io/Zefau/ioBroker.nello.svg)
![NPM](https://nodei.co/npm/iobroker.nello.png?downloads=true)

＃ioBroker.nello nello one将您的对讲机与智能手机和Wi-Fi连接起来。此适配器使用官方API（https://nellopublicapi.docs.apiary.io/）将您的nello连接到ioBroker。
开发人员可以通过https://github.com/Zefau/nello.io找到nello.io API的javascript实现。

## [德语自述文件/ Deutsche Anleitung](https://github.com/Zefau/ioBroker.nello/blob/master/README.de.md)
**目录**

1. [特点]（＃个特写）
2. [设置说明（快速设置）]（＃快速设置）
3. [设置说明（高级设置）]（＃高级设置）
4. [使用/操作]（＃用法 - 操作）
   1. [门户开放]（＃开门）
   2. [添加时间窗口]（＃adding-a-new-time-window）
   3. [删除时间窗口]（＃deletion-a-time-window）
5. [智能家居/ Alexa使用ioBroker.javascript集成]（＃smart-home  -  alexa-integration-using-iobrokerjavascript）
   1. [使用Alexa打开门]（＃open-door-using-alexa）
   2. [让Alexa告诉你关于门铃的信息]（＃let-alexa-inform-you-about-door-ring）
   3. [让彩色灯通知你门环]（＃let-colored-lamps-inform-you-about-door-ring）
6. [学分]（＃学分）
7. [更改日志]（#changelog）
8. [许可证]（#licence）

＃＃ 特征
此适配器附带以下功能：

 - 从您的nello中检索__all locations__，包括`address`和`time windows`（[查看状态]（＃状态）以获取完整列表）
 - 通过ioBroker添加和删除时间窗口
 - 当门铃响起时，从nello接收所有类型的“事件”：
   -  __deny__：当nello检测到铃声响起时，时间窗口和Homezone事件都没有导致门被打开。
   -  __swipe__：授权用户打开门时。
   -  __geo__：由于Homezone Unlock功能（带铃声）打开门。
   -  __tw__：由于时间流逝（带铃声）打开门。
 - 让Alexa告诉你关于门环的信息（[见下文]（＃let-alexa-inform-you-about-door-ring））
 - 从ioBroker触发__打开门___
 -  __Web Interface__显示来自nello的最新事件：

  ![Nello界面](../../../en/adapterref/iobroker.nello/screenshots/interface.png)

##安装说明
＃＃＃ 快速设置
nello auth API负责所有nello客户端应用程序的身份验证。此服务遵循OAuth2作为身份验证方案来验证应用程序/用户。有关OAuth2标准的更多信息，请访问：https：//oauth.net/2/。
要使用此服务，必须从位于以下网址的nello auth管理UI获取客户端凭据：https：//auth.nello.io/admin。请注意，目前您只能获得一对client_id和client_secret。它们由client_id和client_secret组成。

1.在https://auth.nello.io/admin上生成客户端ID和客户端密钥
2.在ioBroker.nello适配器设置中，填写客户端ID /客户端密钥
3.按“获取令牌”按钮生成令牌
4.保存并享受适配器

此快速设置将从nello API检索您的位置（所有可用的门），包括相应的地址。此外，将检索位置的指定时间窗口。此外，您可以使用此基本设置打开门。
要接收事件（门铃响铃），您必须遵循高级设置。

####日志
如果您成功快速设置ioBroker.nello，您将在ioBroker日志中找到以下内容：

```
nello.0	2018-11-24 21:29:48.132	info	Updating time windows of location XXXXX.
nello.0	2018-11-24 21:29:47.905	info	Updating location: {"location_id":"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX","address":{"number":"X","country":"XXXXX","street":"XXXXX ","zip":"XXXXX","city":"XXXXX","state":""}}
nello.0	2018-11-24 21:29:47.342	info	starting. Version X.X.X in /opt/iobroker/node_modules/iobroker.nello, node: vX.XX.X
```

＃＃＃＃ 状态
如果您成功快速设置ioBroker.nello，您将在“** nello.0。**”中找到您的门作为设备。门的格式是_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_。在每个设备中，创建以下通道和状态：

|频道|国家|说明|
|:------- |:----- |:------------- |
|地址| -  |地址数据|
|地址|地址|地址的完整地址|
|地址|城市|城市的位置|
|地址|国家|国家的位置|
|地址|州|位置状态|
|地址|街道|街道的位置数量|
|地址| streetName |街道名称的位置|
|地址| streetNumber |位置的街道号码|
|地址| zip |邮政编码的位置|
| timeWindows | -  |时间窗的位置|
| timeWindows | indexedTimeWindows |所有时间窗口的索引|
| timeWindows | deleteAllTimeWindows |删除所有时间窗口|
| timeWindows | **createTimeWindow** \ * |用于创建新时间窗的JSON对象（[文档](#adding-a-new-time-window)）|
| timeWindows.0000000000000000000 | -  |时间窗口：时间窗口的描述|
| timeWindows.0000000000000000000 |启用|说明是否启用了时间窗口 |
| timeWindows.0000000000000000000 | icalObj |日历数据的JSON对象|
| timeWindows.0000000000000000000 | icalRaw | iCal格式的日历数据文本|
| timeWindows.0000000000000000000 | id |时间窗口的ID |
| timeWindows.0000000000000000000 |图片| （未使用）|
| timeWindows.0000000000000000000 |名字|时间窗的名称|
| timeWindows.0000000000000000000 |州|国家|
| timeWindows.0000000000000000000 | **deleteTimeWindow** \ * |删除此时间窗|
| - | **＃95; openDoor** \ * |打开位置XXXXX |
| -  | id |位置XXXXX的ID |
| -  | refreshedDateTime |上次更新（日期时间）的位置XXXXX |
| -  | refreshedTimestamp |上次更新（时间戳）位置XXXXX |

\ * _highlighted状态将在更改时触发/执行操作_

**备注：如果您已成功快速设置ioBroker.nello，您将_only_看到这些状态！**

###高级设置
####选项1：ioBroker.cloud / ioBroker.iot自定义URL（推荐）
要接收事件（门铃响铃），建议使用ioBroker.cloud或ioBroker.iot适配器。
ioBroker.cloud / ioBroker.iot adpater将从nello接收事件并将其写入一个状态，然后由ioBroker.nello适配器读取。

##### IoBroker.iot
1.转到ioBroker.iot的适配器设置，然后导航到_Services和IFTTT_选项卡。
2.将术语“_nello_”添加到“_White list for services_”并复制自定义服务的链接（“_Use follow link for custom service_”），看起来像```https://service.iobroker.in / V1 / iotService？服务= custom_ <SERVICE_NAME> &key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&user=email@domain.com&data= <SOME_TEXT>```。

   ![第2步](../../../en/adapterref/iobroker.nello/screenshots/step-2.jpg)

3.用服务名称```custom_nello```替换```custom_ <SERVICE_NAME>```（确保附加到```custom_```的术语与步骤＃2中列入白名单的单词相匹配）。此外，删除```＆data = <SOME_TEXT>```因为没有必要。
4.转到** nello适配器配置**并将链接粘贴到“_ioBroker.iot服务URL_”（在选项1中）。

   ![第4步](../../../en/adapterref/iobroker.nello/screenshots/step-4.jpg)

5.保存nello适配器设置并等待（重新）启动适配器。然后，在你的门口响起，并确认ioBroker.iot已创建状态。您将通过```iot.0.services```在ioBroker对象中找到名为```custom_nello```的状态。

   ![第6步](../../../en/adapterref/iobroker.nello/screenshots/step-6.jpg)

6.成功创建状态后，再次重新启动nello适配器以确保nello适配器订阅此新创建的iot状态

##### IoBroker.cloud
1.转到ioBroker.cloud的适配器设置，然后导航到_Services和IFTTT_选项卡。
2.将术语“_nello_”添加到“_White list for services_”并复制自定义服务的链接（“_Use follow link for custom service_”），看起来像```https://iobroker.net/service /```。
3.添加```custom_nello```（确保附加到```custom_```的术语与步骤＃2中列入白名单的单词相匹配）。
4.添加您的API密钥，因此URL最终看起来像```https：// iobroker.net / service / custom_nello / xxxxxx```。
5.转到** nello适配器配置**并将链接粘贴到“_ioBroker.iot服务URL_”（在选项1中）。
6.保存nello适配器设置并等待（重新）启动适配器。然后，在您的门口响起并验证状态是否已由ioBroker.cloud创建。您将通过```cloud.0.services```在ioBroker对象中找到名为```custom_nello```的状态。
7.成功创建状态后，再次重新启动nello适配器以确保nello适配器订阅此新创建的云状态

####选项2：DynDNS URL
要接收事件（门铃响铃），您可以在ioBroker.nello适配器设置中提供外部URL（带端口）。
此URL（包括端口）将发送到nello API并进行注册。如果API注册了门铃，则API会将此信息推送到提供的URL。有关更多信息，请参阅https://en.wikipedia.org/wiki/Webhook。
如果你没有DynDNS地址，也不知道我在说什么，请参考https://www.howtogeek.com/66438/how-to-easily-access-your-home-network-from-anywhere-与-DDNS /。

1.将外部DynDNS地址（包括您选择的端口）放在ioBroker.nello适配器设置中
2.在路由器中打开您选择的端口并将其路由到ioBroker
3.完成。现在，您将在通道“事件”中的nello树中有其他状态，并且所有事件都将写入名为“feed”的状态。

####日志
独立于您选择的选项，如果您成功进行了高级设置ioBroker.nello，您还将在ioBroker日志中找到以下内容：

```
nello.0	2018-11-24 21:29:48.220	info	Listener attached to uri https://XXXX.XXXXX.XX:YYYY.
```

如果webook listener已识别出某个事件，您将在ioBroker日志中找到以下任何条目：

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -deny-).
```

**拒绝**：当nello检测到铃声响起时，时间窗口和Homezone事件都没有导致门被打开。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -swipe-).
```

**滑动**：当授权用户打开门时。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -geo-).
```

** geo **：由于Homezone Unlock功能（带铃声）打开门时。

```
nello.0	2018-11-24 21:38:48.322	info	Received data from the webhook listener (action -tw-).
```

** tw **：由于时间流逝而打开门（带铃声）。

＃＃＃＃ 状态
如果您成功高级设置ioBroker.nello，则会创建以下附加通道和状态：

|频道|国家|说明|
|:------- |:----- |:------------- |
|事件| -  |位置事件|
|事件|饲料|活动Feed /活动历史记录|
|事件| refreshedDateTime |最后一个事件的日期时间|
|事件| refreshedTimestamp |最后一个事件的时间戳|

**备注：如果您已成功进行高级设置ioBroker.nello并且第一个事件已被识别（有人在您身上响起），您将_only_看到这些状态！**

“feed”状态将提供webhook注册的所有事件的JSON。这将是一个对象数组，其中每个对象提供以下指示（有关详细信息，请参阅https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/add-/-update-webhook）：

 -  **动作**：拒绝，滑动，tw或地理位置
 -  **数据**：
     -  location_id
     - 时间戳
     -  user_id（仅限操作滑动，tw或geo）
     - 名称（仅限操作滑动，tw或geo）

##用法/操作
＃＃＃ 开门
要打开你的nello的门，按下状态```_openDoor```的按钮。

###添加新的时间窗口要添加新的时间窗口，请将内容粘贴到状态```timeWindows.createTimeWindow```。预计将采用以下格式：
```
{"name":"<NAME>","ical":"<iCal-String>"}
```

可以在Nello API文档（https://nellopublicapi.docs.apiary.io/#reference/0/locations-collection/create-a-new-time-window）中找到iCal-String的格式。 **使用```\r\n```**将各个元素分开是很重要的。

时间窗的示例：

```
{"name":"Cleaner","ical":"BEGIN:VCALENDAR\r\nBEGIN:VEVENT\r\nDTSTART:20190101T163000Z\r\nDTEND:20190101T170000Z\r\nSUMMARY:Cleaner\r\nEND:VEVENT\r\nEND:VCALENDAR"}
```

###删除时间窗口
要删除时间窗口，请按相应时间窗口的对象树中的按钮。

## Smart Home / Alexa使用ioBroker.javascript集成
智能家居中可能集成的一些示例。

###使用Alexa打开门
这需要ioBroker适配器ioBroker.cloud（https://github.com/ioBroker/ioBroker.cloud）。

将以下函数保存在ioBroker的“脚本”选项卡中“global”文件夹的脚本中：

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

_（更新于2018-11-22并修复了错误的空白设置）_

您可以将此函数用于ioBroker对象树中的每个状态，以在ioBroker.cloud适配器中注册状态并在Alexa中使用它。
**重要**：进入ioBroker.javascript的适配器设置并选中“启用命令setObject”框！

现在使用以下函数在“common”文件夹中创建一个新脚本：

```javascript
cloud('nello.0.#YOUR DOOR ID#._openDoor', 'Tür öffnen');
```

将** #YOUR DOOR ID＃**（也替换为＃）替换为您要打开的门的ID。您可以在ioBroker.nello状态树中找到该ID（ioBroker的“Objects”选项卡）。

最后，在Alexa应用程序中搜索/发现新设备并在Alexa应用程序中创建例程（例如“Alexa，open door”）并将新发现的状态分配给它。完了！现在您可以告诉Alexa为您打开门。

###让Alexa告诉你关于门环的信息
这需要ioBroker适配器ioBroker.alexa2（https://github.com/Apollon77/ioBroker.alexa2）。

为了使用Alexa的语音输出，我们定义了一个函数```say```。将以下函数放在ioBroker.javascript的“global”文件夹中的脚本中（您可以将它放在与上面相同的文件夹中）。 **重要**：用您的Alexa ID替换#YOUR ALEXA ID＃（也替换＃）。您可以在ioBroker```alexa2.0.Echo-Devices```的Objects树中找到Alexa ID。

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

_（2018-11-18更新，以支持多个alexa设备的语音输出）_

您可以在ioBroker.javascript中使用此函数来使用Alexa```say('Hello World')```或```say('Hello World', ['#YOUR ALEXA ID 1#', '#YOUR ALEXA ID 2#'])```来表示来自多个设备的语音输出的短语。

在ioBroker.javascript的“common”文件夹中创建一个脚本（或使用您在上面创建的文件夹）并添加以下监听器：

```javascript
var L = {
   'actionRingUnknown': 'Es hat geklingelt',
   'actionOpenName': '%name% hat die Tür geöffnet',
   'actionOpenGeo': '%name% hat das Haus betreten',
   'actionOpen': 'Die Haustür wurde geöffnet'
};

on({id: 'nello.0.ID.events.feed', change: 'any'}, function(obj)
{
   var events = JSON.parse(obj.state.val);
   if (events.length === 0) return;

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

_（在2019-01-02更新，以反映具有特定Alexa短语的地理选项）_

根据活动的动作，Alexa将通知您门被打开或门铃被识别。
**重要**：用您的nello门ID替换#YOUR DOOR ID＃（也替换＃）。

###让彩色灯通知你关于门环的信息
该功能需要一个可以设置彩色/ rgb灯的适配器，例如， ioBroker.hue（https://github.com/ioBroker/ioBroker.hue）。

为了使用彩色灯，必须定义函数```color```和```colors```。将以下函数放在ioBroker.javascript的“global”文件夹中的脚本中（您可以将它放在与上面相同的文件夹中）：

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

_（更新于2019-01-20以解决问题[＃11](https://github.com/Zefau/ioBroker.nello/issues/11)）_

您可以在ioBroker.javascript中使用这些功能为任何灯泡着色，例如通过```color('hue.0.Philips_hue.Lamp', {'r': 0, 'g': 255, 'b': 0})```（颜色绿色）或```color(['hue.0.Philips_hue.Lamp1', 'hue.0.Philips_hue.Lamp2'], {'r': 0, 'g': 255, 'b': 0})```，为多个设备着色。

在ioBroker.javascript的“common”文件夹中创建一个脚本（或使用您在上面创建的文件夹）并添加以下监听器：

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
    var events = JSON.parse(obj.state.val);
    if (events.length === 0) return;

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

根据事件的动作，灯将使用定义的值着色。
**重要**：将** #YOUR LAMP＃**（也替换＃）替换为您想要着色的灯的状态。用您的nello门ID替换** #YOUR DOOR ID＃**（也替换＃）。

##学分
由<a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>从<a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>制作的图标由<a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>许可

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