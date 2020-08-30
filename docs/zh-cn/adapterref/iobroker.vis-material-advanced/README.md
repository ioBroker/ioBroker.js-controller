---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-material-advanced/README.md
title: ioBroker.vis-material-advanced
hash: 5un1eu/U2JI3iwrWNwdkXYl7PE5XKcU6QDoJlBvlOjw=
---
![商标](../../../en/adapterref/iobroker.vis-material-advanced/admin/vis-material-advanced.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.vis-material-advanced.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.vis-material-advanced.svg)
![安装数量（最新）](http://iobroker.live/badges/vis-material-advanced-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/vis-material-advanced-stable.svg)
![依赖状态](https://img.shields.io/david/EdgarM73/iobroker.vis-material-advanced.svg)
![已知漏洞](https://snyk.io/test/github/EdgarM73/ioBroker.vis-material-advanced/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-advanced.png?downloads=true)

＃ioBroker.vis-material-advanced
## IoBroker的可见材料高级适配器
该适配器为ioBroker中的vis提供了标准化的小部件。许多不同的预定义小部件

该适配器的基础已经由创建：

*（nisio）https://github.com/iobroker-community-adapters/ioBroker.vis-material
*（pix--）https://github.com/Pix---/ioBroker.vis-material

但改写成90％

几个错误修正和许多新的小部件添加

＃＃＃ 入门
安装适配器并在“编辑”模式下启动VIS。
在左侧选择vis-material-adapter，然后所有小部件都显示在预览中。

.............缺少许多文档...................

**由于@ sigi234，您可以将example.json文件导入vis **

## Changelog

### 0.4.2
* keine Änderungen, nur ein Label für Latest repository

### 0.3.5
* opacity kann beim Luftdruck frei geählt werden. Erstmal nur um es testen zu können

### 0.3.4
* Folgende Readonly Widgets: Light,LightDim,LightTemperature,Volume,Shutter

### 0.3.2
* npm ist erstellt, Pull Request für latest Repo gestellt
* volume widget hinzugrfügt
* erste Version vom Garagentor Widget ist erstellt, infos fehlen noch
* migration von vis-material zu vis-material-advanced ist bestätigt 
    Wer es sich traut, hier eine "Anleitung" für den Umzug:

    In vis alle widgets markieren und dann auf widgets exportieren klicken.

    Im Editor öffnen und folgende 2 "Suchen und ersetzen" ausführen:

    suchen: widgets/material
    ersetzen: widgets/vis-material-advanced

    suchen: "widgetSet": "material"
    ersetzen: "widgetSet": "vis-material-advanced"

    wieder importieren in vis.

### 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
### 0.0.1
* (EdgarM73) initial release


### Best Practices
We've collected some [best practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) regarding ioBroker development and coding in general. If you're new to ioBroker or Node.js, you should
check them out. If you're already experienced, you should also take a look at them - you might learn something new :)

### Scripts in `package.json`
Several npm scripts are predefined for your convenience. You can run them using `npm run <scriptname>`
| Script name | Description                                              |
|-------------|----------------------------------------------------------|
| `test:package`    | Ensures your `package.json` and `io-package.json` are valid. |
| `test` | Performs a minimal test run on package files. |

### Publishing the widget
Since you have chosen GitHub Actions as your CI service, you can 
enable automatic releases on npm whenever you push a new git tag that matches the form 
`v<major>.<minor>.<patch>`. The necessary steps are described in `.github/workflows/test-and-release.yml`.

To get your widget released in ioBroker, please refer to the documentation 
of [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Test the adapter manually on a local ioBroker installation
In order to install the adapter locally without publishing, the following steps are recommended:
1. Create a tarball from your dev directory:  
    ```bash
    npm pack
    ```
1. Upload the resulting file to your ioBroker host
1. Install it locally (The paths are different on Windows):
    ```bash
    cd /opt/iobroker
    npm i /path/to/tarball.tgz
    ```

For later updates, the above procedure is not necessary. Just do the following:
1. Overwrite the changed files in the adapter directory (`/opt/iobroker/node_modules/iobroker.vis-material-advanced`)
1. Execute `iobroker upload vis-material-advanced` on the ioBroker host

## Changelog

### 0.1.0
* (EdgarM73) copied all functionality to new git and new Adapter
### 0.0.1
* (EdgarM73) initial release

## License
MIT License

Copyright (c) 2020 EdgarM73 <edgar.miller@gmail.com>

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