---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.rssfeed/README.md
title: ioBroker适配器，用于请求和显示不同标准（Atom，RSS，RDF）的RSS Feed
hash: fdZGN3otuVCjYZjFFxzWNfhB/D59zu4ZgSI8B7Pene4=
---
![商标](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![安装数量](http://iobroker.live/badges/rssfeed-installed.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.rssfeed.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![特拉维斯](https://img.shields.io/travis/oweitman/ioBroker.rssfeed.svg)
![AppVeyor构建状态](https://img.shields.io/appveyor/ci/oweitman/iobroker-rssfeed.svg)
![GitHub问题](https://img.shields.io/github/issues/oweitman/ioBroker.rssfeed.svg)

＃ioBroker适配器以请求并显示不同标准（Atom，RSS，RDF）的RSS Feed
##概述
请求和显示不同标准（Atom，RSS，RDF）的RSS feed的适配器。
您可以使用模板系统自定义提要的输出。在模板中，您可以包括HTML，CSS和Javascript。

##安装
最新存储库中提供的适配器。

##添加实例
安装后，适配器应显示在iobroker的适配器部分中。
有时会发生更改不可见的情况，尤其是对于Web更改（窗口小部件/配置对话框），可能必须在命令行上执行以下命令：

```
iobroker upload rssfeed
```

在适配器行的右侧区域，可以使用加号按钮添加实例。

##配置
配置相对容易。只有几个领域

|设置|描述|
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
|刷新|是应在几分钟内再次调用一次提要的一般规范。默认为60分钟|
|数据点中的最大项目数在此可以限制要处理的数据总量。 |

然后，对于每个新的提要：

|设置|描述|
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
|姓名|数据点的名称。在文件夹内，名称不能出现两次。 |
|分类|子文件夹的名称，数据点应出现在该文件夹中。类别必须是唯一的|
|网址|供稿的完整地址（带有http：//或https：//，请参见下面的示例）|
|刷新|可以为此Feed指定其他值。否则，采用通用规范|
|编辑按钮|所选项目将被删除，值将显示在“添加”部分|
|删除按钮|所选项目将被删除|

如果保存并关闭了配置，则可以在对象树中将提要数据作为JSON数据点找到。

##视觉和小部件
以下小部件实际存在

* RSS Feed小部件-显示单个feed
* RSS Feed Multi小部件-在一个小部件中显示多个汇总的feed。
* RSS Feed meta Helper-帮助器小部件，用于检查提要的元数据
* RSS Feed文章帮助程序-帮助程序窗口小部件，用于检查摘要的文章数据
* RSS提要字幕-一个将提要的标题显示为选框的小部件
* JSON模板-与RSS Feed无关的wdiget，但是您可以定义一个自定义模板以显示vis中的任何JSON-Data。

vis小部件的文档可在vis或[小部件文档/德语](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html)中找到

##基于示例的模板
我使用以下RSS feed测试了一个示例：

* http://www.tagesschau.de/xml/rss2
* https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html

```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

模板系统可与某些标签一起使用。
使用的标签表示以下内容

|标签|描述|
| ----- | --------------------------------------------------------------------- |
| <％= |包含的表达式/变量的内容将被转义。 |
| <％-|所包含的表达式/变量的内容未转义。 |
| <％|没有输出，用于随附的javascript指令|
| ％> |通常是一个结束标记，用于完成先前的标记之一|

这些标记之外的所有内容都将按原样显示，或者如果将HTML解释为HTML，则显示为正确。 （例如，参见p标签，div标签，小标签。在模板中，您可以使用2个预定义变量

####元
这包含有关提要的所有元信息。以下内容可用。我认为标识符是不言自明的。在帮助中，我将更详细地描述它们。或指定内容（有些是数组）meta.title meta.description meta.link meta.xmlurl meta.date meta.pubdate meta.author meta.language meta.image meta.favicon meta.copyright meta.generator meta.categories

####文章
是具有单个元素的数组（javascript数组）。每个元素具有以下属性。
为了使其适合，例如，我将在其前面添加前缀项。但是，如果您愿意，可以自己选择。它只需要在循环中相应地命名（forEach）。在这里，标识符也是不言自明的。并非每个提要中都填写了所有属性。最重要的部分已经包含在上面的模板中。

item.title item.description item.summary item.link item.origlink item.permalink item.date item.pubdate item.author item.guid item.comments item.image item.categories item.source item.enclosures

##模板示例和详细说明
```
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

各个行Z1中发生的情况的简要说明：提要标题Z2的输出：无输出。 Javascript命令遍历所有文章，每转一圈将当前元素分配给变量项。
Z3：日期和时间的输出为。它带有一个p / small标签用于格式化。拥有日期格式功能用于格式化。可以在适配器vis中找到说明。
Z4：文章标题的输出。标头3-标记用于格式化。
Z5：文章内容的输出。它带有一个p标签。在这里，至少在两个示例中，包括了HTML代码，该代码通常带有图像和描述性文本Z6：在feed-html中输出一个清除特殊格式的div标签（在两个示例中都需要tagesschau和bild。其他饲料也许不需要它。
Z7：无输出。这行代码关闭了javascript循环。 Z2和Z7之间定义的所有内容都会针对每篇文章重复进行。

＃＃ 去做
*通过保存在管理对话框中清除datapoint info.lastRequest中未使用的条目。
*按钮，用于清除管理对话框中未使用的数据点
* ~~多个小部件RSS源~~
* ~~多个小组件字幕~~
* ~~ Weitere Datenpunkte im Templateverfügbarmachen。~~
* ~~蒂法尔河畔劳夫教堂的小工具https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2~~

## Changelog
### 0.0.28
* remove customtab
### 0.0.27
* adapter configuration is now editable
### 0.0.26
* correct changelog size 
### 0.0.25
* the error messages for the template are improved 
### 0.0.24
* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved 
* marquee3 widget: options to show time and date
### 0.0.23
* republish to npm
### 0.0.22
* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)
### 0.0.21
* add link option to marquee widget
* widget help added 
* marquee widget: the divider characters (default: +++) are configurable
### 0.0.20
* add ejs syntax to template editor
### 0.0.19
* try to fix marquee widget.
### 0.0.18
* try to fix the wrong NoSave dialog
### 0.0.17
* rework setting objects and states
### 0.0.16
* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles
### 0.0.15
* fix bug saving last request in adapter configuration / improve debug messages
### 0.0.14
* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib
### 0.0.13
* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.
### 0.0.12
* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.
### 0.0.11
* improve admin layout
* implement a forceRefresh button
### 0.0.10
* fix bug a bug in marquee widget. not all styles should applied to the span tag.
### 0.0.9
* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.
### 0.0.8
* improve lasrequest logic of the adapter
* fix problem with datapoint naming
### 0.0.7
* test with encapsulation of ejs.js, becaus of error in some browsers
### 0.0.6
* add attribute duration for widget marquee to control animation duration
### 0.0.5
* new widget marquee for article titles
* add filter function for articles. the filter searchs in title,description and categories, seceral filter criteria can be seperated by semicolon
### 0.0.4
* some adjustments in readme, io-package
### 0.0.3
* add addveyor build
### 0.0.2
* added widgets meta helper and article helper
### 0.0.1
* initial release

## License
MIT License

Copyright (c) 2020 oweitman <oweitman@gmx.de>

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