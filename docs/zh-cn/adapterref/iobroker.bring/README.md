---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: n1lrpEniOSNdTJPhXYpr74N+pzHkxWVNnX3UPJa37bc=
---
![商标](../../../en/adapterref/iobroker.bring/admin/bring.png)

![安装数量](http://iobroker.live/badges/bring-installed.svg)
![稳定版](http://iobroker.live/badges/bring-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.bring.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.bring.svg)
![环保管理员徽章](https://badges.greenkeeper.io/foxriver76/ioBroker.bring.svg)
![NPM](https://nodei.co/npm/iobroker.bring.png?downloads=true)

＃ioBroker.bring
===========================

![建立状态](https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg)

＃＃ 状态
有关创建状态的说明，请参见下文。

###频道：信息
*信息连接

    |数据类型|权限|
    |:---:|:---:|
    |布尔| R |

   *只读的布尔指标。如果您的经纪人随身登录，则状态为true，否则为false。*

* info.user

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

   *只读字符串。包含已登录用户的名称。*

###购物清单
对于每个购物清单，将创建具有以下状态的渠道：

* *list* .content / *list* .contentHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

*只读格式为列表或html表的json / html字符串。包含当前在您的购物清单上的商品。
NoHead Html表是不带表头的*。

* *list* .recentContent / *list* .recentContentHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

*只读格式为列表或html表的json / html字符串。包含最近在您的购物清单上的商品。
NoHead Html表是不带表头的*。

* *list* .removeItem

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R / W |

*选择应从购物清单和近期内容清单中删除的项目。
当Bring！确认命令时，将确认状态。 API。*

* *list* .moveToRecentContent

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R / W |

*选择应移动或添加到最近内容列表的项目。
当Bring！确认命令时，将确认状态。 API。*

* *list* .saveItem

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R / W |

*选择应添加到购物清单中的商品。您还可以通过以下模式设置状态，从而指定项目的其他信息：*

```Apple, 2.50 $, the green ones```

*请注意，逗号后面的所有内容均描述了规范。
当Bring！确认命令时，将确认状态。 API。*

* *list* .users / *list* .usersHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

*只读格式为列表或html表的json / html字符串。包含属于购物清单的用户以及他们的电子邮件地址。
NoHead Html表是不带表头的*。

* *列表* .count

    |数据类型|权限|
    |:---:|:---:|
    | number | R |

   *只读数字，代表列表中包含的项目数。*

* *list* .messageTrigger

    |数据类型|权限|
    |:---:|:---:|
    |按钮| R / W |

*如果按此按钮，购物清单将发送到已配置的实例，例如G。推送，电报或/和电子邮件。*

* *list* .enumSentence

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

*只读字符串，其中包含以可说形式列出的购物清单项目。
可以使用e。 G。用于通过智能助手进行语音输出。*

* *列表*。翻译

    |数据类型|权限|
    |:---:|:---:|
    | string | R |

    *只读json字符串，其中包含将瑞士项目名称翻译为列表语言的字典。*

## Changelog
### 1.6.6 (2019-11-21)
* (foxriver76) improved error handling in widget

### 1.6.5 (2019-09-22)
* (foxriver76) re-auth when bearer token is no longer valid

### 1.6.3 (2019-08-28)
* (foxriver76) fixed bug which only allowed one registered event handler
* (foxriver76) by using obj with wid instead of var because vis handles global variables of widgets global
* (foxriver76) now more bring widgets can be used in one vis project
* (foxriver76) bump version of textFit to 2.3.1 -> 2.4.0 and use minified version

### 1.6.2 (2019-08-04)
* (foxriver76) also use translations for enumSentence and notifiations (e. g. email)

### 1.6.1 (2019-07-13)
* (foxriver76) fixed bug, that prevent html states and other from being set

### 1.6.0 (2019-07-12)
* (foxriver76) get translations according to list language
* (foxriver76) translations will be stored in datapoint
* (foxriver76) use bring-node-api at least 1.2.1
* (foxriver76) widget now uses configured language
* (foxriver76) bugfixes and optimizations in front- and backend

### 1.4.0 (2019-06-07)
* (foxriver76) use textFit to fit text to one line in widget
* (foxriver76) internal reworks on widget

### 1.3.4
* (foxriver76) add possibility to use this widget multiple times on same page

### 1.3.3
* (foxriver76) also change height and div sizes according to users specification
* (foxriver76) when item is on recent list and added by text input it is now instantly removed from recent list

### 1.3.2
* (foxriver76) enable configuration of width for items in widget

### 1.3.1
* (foxriver76) api module outsourced

### 1.3.0
* (foxriver76) added widget
* (foxriver76) add possibility to move items to recentContent

### 1.2.1
* (foxriver76) uri encode login request because it can contain special character

### 1.2.0
* (foxriver76) added state which contains a speakable enumeration of each shopping list

### 1.1.0
* (foxriver76) add possibility to send messages
* (foxriver76) respect in app list renaming / recreate channel on name change

### 1.0.0
* (foxriver76) stable release
   
### 0.0.10
* (foxriver76) set info.connection state to false, when cannot get data
   
### 0.0.9
* (foxriver76) also update no head states on normal polling
* (foxriver76) fix bug where polling could grow exponentially
* (foxriver76) fix unhandled error when no internet connection

### 0.0.8
* (foxriver76) add html states w/o header
* (foxriver76) minor fixes
   
### 0.0.7
* (foxriver76) fixed a potential memory leak by setTimeout functions

### 0.0.6
* (foxriver76) add equivalent html states for json states
* (foxriver76) add counter for every list

### 0.0.4
* (foxriver76) fix when login fails

### 0.0.3
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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