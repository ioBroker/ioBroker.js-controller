---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: EG7xfJyq/qRZYg9VctTZlelxO4Q8EknXrX6ZY2CMseA=
---
![商标](../../../en/adapterref/iobroker.bring/admin/bring.png)

![建立状态Travis](https://travis-ci.org/foxriver76/ioBroker.bring.svg?branch=master)
![建立状态](https://ci.appveyor.com/api/projects/status/r7whpsbjfqn18toe/branch/master?svg=true)
![安装数量](http://iobroker.live/badges/bring-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.bring.svg)
![下载](https://img.shields.io/npm/dm/iobroker.bring.svg)
![NPM](https://nodei.co/npm/iobroker.bring.png?downloads=true)

＃ioBroker.bring ===========================
[![Greenkeeper徽章]（https://badges.greenkeeper.io/foxriver76/ioBroker.bring.svg）](https://greenkeeper.io/)

＃＃ 状态
有关创建状态的说明，请参见下文。

###频道：信息
* info.connection

    |数据类型|权限|
    |:---:|:---:|
    |布尔| R |

   *只读布尔指示符。如果您的经纪人在登录时登录，则状态为真，否则为假。*

* info.user

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

   *只读字符串。包含登录用户的名称。*

###购物清单
对于每个购物清单，将创建具有以下状态的渠道：

* *list* .content / *list* .contentHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

*只读json / html字符串格式化为列表或html表。包含您购物清单上当前的商品。
NoHead Html表格没有表格标题。*

* *list* .recentContent / *list* .recentContentHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

*只读json / html字符串格式化为列表或html表。包含最近在您的购物清单上的项目。
NoHead Html表格没有表格标题。*

* *list* .removeItem

    |数据类型|权限|
    |:---:|:---:|
    |串| R / W |

*选择应从购物清单和最近的内容列表中删除的项目。
当Bring确认命令时，将确认状态！ API。*

* *list* .moveToRecentContent

    |数据类型|权限|
    |:---:|:---:|
    |串| R / W |

*选择应移动或添加到最近内容列表的项目。
当Bring确认命令时，将确认状态！ API。*

* *list* .saveItem

    |数据类型|权限|
    |:---:|:---:|
    |串| R / W |

*选择应添加到购物清单的项目。您还可以通过以下架构设置状态来指定项目的其他信息：*

```Apple, 2.50 $, the green ones```

*注意，逗号后面的所有内容都描述了规范。
当Bring确认命令时，将确认状态！ API。*

* *list* .users / *list* .usersHtml / NoHead

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

*只读json / html字符串格式化为列表或html表。包含作为购物清单一部分的用户以及他们的电子邮件地址。
NoHead Html表格没有表格标题。*

* *list* .count

    |数据类型|权限|
    |:---:|:---:|
    |数| R |

   *只读号码，表示列表中包含的项目数。*

* *list* .messageTrigger

    |数据类型|权限|
    |:---:|:---:|
    |按钮| R / W |

*如果按此按钮，购物清单将被发送到配置的实例，例如： G。 Pushover，Telegram或/和E-Mail。*

* *list* .enumSentence

    |数据类型|权限|
    |:---:|:---:|
    |字符串| R |

*只读字符串，其中包含可说形式的购物清单项目的枚举。
这可以使用e。 G。通过智能助手进行语音输出。*

## Changelog

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