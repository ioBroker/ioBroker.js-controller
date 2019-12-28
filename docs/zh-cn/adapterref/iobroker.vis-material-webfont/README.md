---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-material-webfont/README.md
title: ioBroker.material-webfont
hash: eGDWusilKI9U+7qXm2xOZNivpK3ZFGzPg0clQnlHprY=
---
![商标](../../../en/adapterref/iobroker.vis-material-webfont/admin/material-webfont.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vis-material-webfont.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-material-webfont.svg)
![依赖状态](https://img.shields.io/david/om2804/iobroker.vis-material-webfont.svg)
![已知漏洞](https://snyk.io/test/github/om2804/ioBroker.vis-material-webfont/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-webfont.png?downloads=true)

＃ioBroker.material-webfont
##用于ioBroker的vis-material-webfont适配器
材料设计图标（https://materialdesignicons.com/）

##用法
添加基本HTML并使用**常规-> CSS类**。 （https://dev.materialdesignicons.com/getting-started/webfont）

###基本###
每个图标都可以通过以* mdi- *开头的名称来引用。例如，获取主页图标* mdi-home *。

**示例：** mdi mdi-home

###旋转###
mdi-rotate-45-旋转45度。
mdi-rotate-90-旋转90度。
mdi-rotate-135-旋转135度。
mdi-rotate-180-旋转180度。
mdi-rotate-225-旋转225度。
mdi-rotate-270-旋转270度。
mdi-rotate-315-旋转315度。

**示例：** mdi mdi-account mdi-rotate-45

###翻转###
mdi-flip-h-水平翻转。
mdi-flip-v-垂直翻转。

**示例：** mdi mdi-account mdi-flip-h **注意：** mdi-flip- *和mdi-rotate- *类不能在同一元素上同时使用。

###旋转###
mdi-spin-旋转图标。
**示例：** mdi mdi-loading mdi-spin

＃＃＃ 更多 ＃＃＃
查看更多（/widgets/material-webfont/css/materialdesignicons.css）

## Changelog

### 0.0.3
* (om2804) fixes

### 0.0.1
* (om2804) initial release

## License
Apache 2.0 and SIL Open Font License 1.1

Copyright (c) 2019 om2804 <om2804@mail.ru>

Copyright (c) 2014, Austin Andrews (http://materialdesignicons.com/),
with Reserved Font Name Material Design Icons.

Copyright (c) 2014, Google (http://www.google.com/design/)
uses the license at https://github.com/google/material-design-icons/blob/master/LICENSE