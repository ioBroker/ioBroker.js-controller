---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: YH5cKUNTTU8K0wtF+CA6cM8T+v+DJa8Rhu+Xc6Pid3o=
---
![商标](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.svg)

![NPM版本](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![安装数量（最新）](http://iobroker.live/badges/frontier_silicon-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/frontier_silicon-stable.svg)
![依赖状态](https://img.shields.io/david/halloamt/iobroker.frontier_silicon.svg)
![已知漏洞](https://snyk.io/test/github/halloamt/ioBroker.frontier_silicon/badge.svg)
![NPM](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)
![建立状态](https://travis-ci.org/halloamt/ioBroker.frontier_silicon.svg?branch=master)

＃ioBroker.frontier_silicon
## IoBroker的frontier_silicon适配器
为配备有使用FSAPI的Frontier Silicon芯片组的媒体播放器提供支持。

＃＃ 特征
公关和建设性批评总是受欢迎的。

###实现的功能
- 功率控制
-模式选择
-预设选择
-多个州的通知
- 音量控制
-通知

###计划功能
-自动发现
-更多状态
-翻译
-更多异常处理
-清洁代码
-多房间功能

###未计划的功能
-更改系统信息

###已知错误
-必须打开媒体播放器才能进行预设发现
-一段时间后没有通知

##文档
该适配器使您可以基于Frontier Silicon芯片组控制互联网广播和媒体播放器。可以通过[Undok]（https://www.frontiersmart.com/undok）应该可以。经过测试的设备来自[Revo]（https://revo.co.uk/de/products/），[Sangean]（https://www.sangean.eu/products/all_product.asp）和[SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/)控制的许多设备，其他设备也应该工作。

安装后，必须在配置对话框中输入设备的IP和PIN。如果通过Undok或此适配器打开后无线电无法播放DAB，请尝试启用“没有声音的DAB启动”。

适配器首次启动时，它将收集有关设备的信息。为此，它需要切换所有模式。在检查设置期间，设备将静音几秒钟，以免干扰声音。

当适配器读取设备的设置对象并创建状态时。状态可以是只读（`ro`）或可读写（`rw`§）*好，按钮也可以只写*。

-音频

  基本音频设置。尚未实施均衡器控制。

  -maxVolume（`number，ro`）

    最大音量可选

  -静音（布尔值，rw）

    `true`如果设备已静音，则`false`否则

  -音量（`number，rw`）
  - 控制
    -volumeDown和volumeUp

In- /或将音量减小1

-设备

  -friendlyName（`text，rw`）
  -功率（布尔值，rw）
  -radioId（`test，ro`）

    我的猜测是这是设备的MAC

  -版本（`text，ro`）

    软件版本

  -webfsapi（`text，ro`）

    API的地址

-信息

  -连接（`boolean，ro`）

    适配器的连接指示灯

-媒体

  -状态（`number，rw`）

    有效值为：

    -0：暂停
    -1：播放

  - 控制

    - 下一个
    -辩解
    -玩
    -前

  不要太在意以下名称。电台在不同模式下使用它们的方式有所不同。

  -专辑（`text，ro`）
  -艺术家（`text，ro`）
  -图形（`text，ro`）

    使用此URL获取专辑封面或电台徽标。

  -名称（`text，ro`）
  -文字（`text，ro`）
  -标题（`text，ro`）

-模式

  -readPresets

    重新读取所有预设

  -selectPreset（`number，rw`）

    用于获取或选择预设。请注意，适配器会猜测该值不能从API中读取。

  -已选择（“数字”，“ rw”）

    指示或选择所选模式。也可以通过`modes.{number}.switchTo`选择

  -`{number}`

    -id（`text，ro`）

      该模式的名称

    -键（`number，ro`）

      该模式的索引。等于对象树中的`mode.{number}`，可以写入`modes.selected`。

    -可选（``boolean，ro''）

      `true`（如果可以手动选择此模式）。

    -流式（`boolean，ro`）

      仅在启用多房间的设备上存在。 `true`（如果此模式可以用作多个多房间设备的源）。

    - 切换到

      选择该模式。

    -预设

      -availabe（`boolean，ro`）

        指示此模式的预设是否可用

      -`{number}`

        该预设的索引。等于`mode.*.presets.{number}.key`。

        -键

          该预设的索引。等于对象树中的`mode.*.presets.{number}`，可以写入`modes.selectPreset`。

        -名称（`text，ro`）

          该预设的名称

        - 切换到

          选择该预设和相应的模式。

请注意，有时您可以在“按下按钮”或“设置值”之间进行选择。使用对您来说更方便的东西。

##开发人员手册
本部分适用于开发人员。以后可以删除

＃＃＃ 入门
您差不多完成了，只剩下几步了：

1.在GitHub上创建一个名为ioBroker.frontier_silicon的新存储库。

1.将所有文件推送到GitHub存储库。创建者已经为您设置了本地存储库：

	```bash
	git push origin master
	```

1.在https://github.com/halloamt/ioBroker.frontier_silicon/settings/secrets下添加一个新密码。它必须命名为“ AUTO_MERGE_TOKEN”，并包含一个具有对存储库的推送访问权限的个人访问令牌，例如你的。您可以在https://github.com/settings/tokens下创建一个新令牌。

1.转到[main.js]（main.js）并开始编程！

###最佳做法
我们已经收集了一些有关ioBroker开发和编码的[最佳做法](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices)。如果您不熟悉ioBroker或Node.js，则应将其签出。如果您已经有经验，还应该看看它们-您可能会学到一些新东西:)

`package.json`中的###脚本
为方便起见，已预定义了几个npm脚本。您可以使用`npm run <scriptname>`运行它们

|脚本名称|描述 |
| `test:js`|执行您在`*.test.js`文件中定义的测试。 |
| `test:package`|确保您的`package.json`和`io-package.json`有效。 |
| `test`|对软件包文件和您的测试执行最少的测试。 |
| `lint`|运行`ESLint`来检查您的代码是否存在格式错误和潜在的错误。 |
| `lint` |运行`ESLint`来检查您的代码是否存在格式错误和潜在的错误。 |

###写作测试
如果操作正确，测试代码将是无价之宝，因为它使您可以放心地更改代码，同时准确知道何时以及何时发生故障。 https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92是关于测试驱动开发的一个很好的读物。
尽管乍一看在代码之前编写测试可能看起来很奇怪，但是它具有非常明显的优势。

该模板为适配器启动和软件包文件提供了基本测试。
建议您将自己的测试添加到组合中。

###发布适配器
由于您已选择GitHub Actions作为CI服务，因此只要您按下与`v<major>.<minor>.<patch>`形式匹配的新git标签，就可以在npm上启用自动发布。必要的步骤在`.github/workflows/test-and-release.yml`中进行了描述。

要在ioBroker中发布适配器，请参阅[ioBroker。存储库](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository)的文档。

###在本地ioBroker安装上手动测试适配器
为了在本地发布适配器而不发布，建议执行以下步骤：

1.从您的dev目录创建一个tarball：

	```bash
	npm pack
	```

1.将结果文件上传到您的ioBroker主机
1.在本地安装（Windows上的路径不同）：

	```bash
	cd /opt/iobroker
	npm i /path/to/tarball.tgz
	```

对于以后的更新，不需要上述过程。只需执行以下操作：

1.覆盖适配器目录中的更改文件（`/ opt / iobroker / node_modules / iobroker.frontier_silicon`）
1.在ioBroker主机上执行iobroker upload frontier_silicon上传

</ details>

## Changelog
### 0.0.10 (2020-11-29)
* Übersetzungen

### 0.0.9
* (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.
* (halloamt) Nicer readme
* (halloamt) (Hopefully) more robust session handling.
* (halloamt) Long polling should work more reliably
* (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8
* (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6
* (halloamt) Nothing really, small stuff for npm

### 0.0.5
* (halloamt) Media state controls
* (halloamt) Bugfixes

### 0.0.4
* (halloamt) Media and volume control buttons
* (halloamt) Bugfixes

### 0.0.3
* (halloamt) Get notifications from the radio
* (halloamt) Change volume / mute

### 0.0.1
* (halloamt) initial release
* (halloamt) Change mode
* (halloamt) Select Preset

<details>
<summary>Developer Manual</summary>

## License
MIT License

Copyright (c) 2020 halloamt <iobroker@halloserv.de>

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