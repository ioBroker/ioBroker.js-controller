---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.systeminfo/README.md
title: 无题
hash: foC/wzSvgAwpM+gnbhyD3KIRK/89kpPq4SNlySZNoDY=
---
![商标](../../../en/adapterref/iobroker.systeminfo/./admin/systeminfo.png)从系统中读取（和写入）信息---

![NPM版本](http://img.shields.io/npm/v/iobroker.systeminfo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.systeminfo.svg)
![Travis-CI构建状态](https://travis-ci.org/frankjoke/ioBroker.systeminfo.svg?branch=master)
![AppVeyor构建状态](https://ci.appveyor.com/api/projects/status/pil6266rrtw6l5c0?svg=true)
![NPM](https://nodei.co/npm/iobroker.systeminfo.png?downloads=true)

##适配器处理来自自己或其他系统和Web源的信息
它通过不同的方法从它找到的信息中生成状态

*在操作系统中执行的命令
*要在本地或连接的系统上读取的文件
*来自网页或API的结果
* Nodejs工具命令

*命令和文件也可以在两个方向上工作，这意味着您也可以向系统写入信息。
*这允许访问和写入Raspi或OrangePi上的GPIO引脚，或者还可以控制Raspi / Opi上的gren或红色LED
*它允许在Lunux中获取/设置通过/ sys访问的一些系统信息
*有一个'系统信息'部分用于Windows和Linux上

它使用特殊的查询机制处理文本，HTML，json和XML数据类型。

＃＃＃ 注意
*我想对网上的一些模块表示感谢，我使用或使用自己的代码实现了这些模块。适配器使用一些外部模块，如[cheerio]（https://github.com/cheeriojs/cheerio），[systeminformation]（https://github.com/sebhildebrandt/systeminformation）和[node-schedule]（https：/ /github.com/node-schedule/node-schedule）就像他们一样。它的灵感来自[JSONPath]（http://goessner.net/articles/JsonPath/index.html#e2）和[scrape-it]（https://github.com/IonicaBizau/scrape-it）的代码但他们的代码没有直接使用，而是针对不同的需求重新实现。

##配置
*在适配器配置中配置（放大页面）
*我存储了一个示例配置的图片[这里]（./ admin / Systeminfo.Config.jpg）
    *第一项是一个命令列表，它将在适配器启动时执行（逐行）。它可用于设置使用的GPIO端口。
    *不以“＃”开头的行
    *如果第一个文本是'debug！`'，它将适配器设置为调试模式，它显示了他尝试拉取和接收的更多信息。
*启动确认后，每个数据源的配置列表包括
    *名称字段，也可包括
        *如果名称以“-`”开头，则该行将被忽略（关闭），就像没有时间表一样
        *`[*]`，`[name，...]`，`[name /（value）]`语法
        *没有任何上述名称用于创建状态。
        *如果在某处使用`[]`，则使用不同的方法插入名称
            *`[*]`如果返回多个元素，则将它们作为数字插入。示例：`Meldung []`将生成`Meldung0` -..Meldung（n）`if（n）返回元素
            *`[name1，name2，...]`正好创建这些名称（例如`System.Memory_ [used，free，available]`将创建三个名为`System.Memory_used，System.Memory_free，System.Memory_available`的状态。
            *`[name / value]`从对象属性`name`（可能不同）中获取名称，并从属性`value`中获取值。可以使用任何属性或值名称。
            *`[name /]`没有值将取名`name`并为该对象中的所有其他属性创建子状态（例如`System.Network。[iface /]`）

    *可以是信息源的`type`和`source`
        *`file`：`source`字段描述了一个被读取的文件名
        *`exec`：`source`字段描述了一个执行的单行命令
        *`info`：`source`字段描述了单行`systeminfo`命令功能
        *`web`：`source`字段描述了一个被读取的Web URL（或描述访问的对象，这需要稍后记录！）。
        *如果同时请求具有相同类型/源内容的多个条目，则缓存请求！这意味着如果您安排每分钟执行命令并从同一命令中获取两个不同的数据项，则它只运行一次，并且仅多次应用数据过滤器。
        *如果您想要检索更多项目，这有助于不要多次下载同一页面。

    *`regexp / filter``用于描述如何过滤接收到的文本
        *`Regexp`语句，其中的indovidual项需要以`（）`为基础。

        示例：`/lic\s+(\d+)K\s+(\d+)K\s+(\d+)/m`将查找文本`lic`后跟空格，然后在所有行中以`K`结尾的数字，它将返回3个数字。在Linux的`df -BK`命令中使用它来向我显示名称中以'lic'结尾的已挂载NFS共享的大小。

        *`JsonPath`声明。我创建了一个特殊版本的JsonPath来从Json或任何javascript对象中选择数据。
            *它的语法由一行选择器组成
            *`name`属性名称
            *`*`此对象中的任何项，这可以是所有属性，或者如果对象是数组，则它是所有数组项
            *`[（...）]`评估`...`获取将被选中的属性名称。 `@`将用作当前对象的占位符，可以在eval语句中使用。
            *`[？（...）]`用......过滤这个项目的元素，

            示例：`list[?(@.user == 'pi')]`将首先选择属性`list`（这是一个数组），然后通过仅选择具有`.user`set`pi`的列表项来编制列表。

            *`[！（...）]`将评估值作为新项返回。通过这种方式，您可以从找到的对象中计算出您自己的数据。
            *`[name1，name2，name3]`将只选择那些属性名称
            *`[0]`只选择'first'（或n'th）元素或属性
            *`[start：end：step]`将使用`step`从'start`和`<end`开始。所有都需要数字，或留空。 `start`和`end`可以是负数，这意味着他们会从结束开始。示例：`[1：-1：2]`将从第二个元素中获取每个第二个元素，但不包括最后一个元素。最后一个是`[-1 ::]`，前3个是`[：3：]`，最后3个是`[ -  3 ::]`
            *`..`是一个recurseive下降选择器，这意味着`..name`将在对象的'any dept'中选择属性名称！
        *`html WebObject查询`在解析html的情况下，我创建了一个特殊的查询工具，用于从类似于jQuery的web paqges中选择项目。这个工具创建了一个最终使用`JsonPath`解析的对象。 **文件要遵循**

    *`convert`条目也可以
        *`json`用于要解析的json数据，在Web条目上这意味着接收的文本将直接作为json处理，regexp / filter将是`JsonParse`语句/过滤器。
        *`xml`表示XML数据，这意味着接收的数据将从XML转换为json并按上述方式处理
        *`html`会生成一个`cheerio`对象，然后使用特殊的WebObject查询进行搜索
    *`number`或`boolean`会尝试将值转换为数字或布尔值，而布尔值> 0的数字是真的，但** ****的**** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** ** ****** **真正。
        *```其他任何类似`！parseInt（@）`将被评估，在这种情况下返回** true **如果值是'0'或** false **如果值是一个更大的整数。

    *`role / type`字段描述了ioBroker字段ty，并且可以命名为一个单元。普通字段类型是文本或转换中看到的值。
        *`json`表示字段属性取自obnject
        *`number | MB`将定义一个单位为MB（兆字节）的数字字段

    *`Write Command` fiel描述将用于回写项目的陈述或证据。它仅适用于'`exec`'或'`file`'类型。
        *对于`exec`，它是一个命令行，可以包含要评估的`@（...）`语句。示例：`gpio write 1 @（@？'0'：'1'）`如果状态为真，将转换为`gpio write 1 0`，如果为false则转换为`gpio write 1 1`。如果GPIO引脚为“低”（0），它会控制我的红外线灯亮。
        *对于`file`，它是一个简单的eval表达式，它被执行并写入文件。示例：`@？ '1'：'0'`如果值为真则写'1'，如果为假则写'0'。

    *最后是`schedule`。如果它是空的，则根本不执行迭代！共享完全相同值的所有调度将与相同的缓存一起执行。
        *`cron-syntax`你可以使用相同的'cron'语法，就像oBroker使用inJavascript调度一样，在[node-schedule]中描述（https://github.com/node-schedule/node-schedule）
        *`time-syntax`我创建了一个特殊的时间语法`？：？（：？）`这使得它更容易
            *`*：16`将在每小时的第15分钟请求此数据
            *`* / 2：1：1`将在第1分钟和1秒钟内每隔一小时请求一次。
            *`？s`，`？m`，`？h`用？如果数字> 0将每隔？秒，monites或小时运行请求，则不能同时指定多个项目！
        *时间表被分组到同一时间，如果省略上面第一个例子中的秒数，它将被分配给某个数字，试图避免所有项目的相同秒数。这样做不会同时运行太多命令。

＃＃ 已知的问题
* Beta测试，没有实现的网页写入

##重要/ Wichtig
*需要节点> = v4.5

##安装
Mit ioBroker admin，npm install iobroker.systeminfo oder von <https://github.com/frankjoke/ioBroker.systeminfo>

## Changelog
### 0.3.0
* Added save and load config in admin screen

### 0.2.2
* First public beta includes jsonParse and WebQuery parse, jsonParse syntax mistake corrected for selectors
* New icon to separate it from info-Adapter

### 0.2.0
* First public beta includes jsonParse and WebQuery parse

### Todo for later revisions
* Allow import/export of configs to easily add new functions
* Allow access of web pages with authentication and also writing/postng web content

## License

The MIT License (MIT)

Copyright (c) 2017, frankjoke <frankjoke@hotmail.com>

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