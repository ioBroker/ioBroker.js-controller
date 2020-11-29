---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tradfri/README.md
title: ioBroker.tradfri
hash: waY56Oxf+bx+srdcpDHrwGSMihR7UNSfR/l/TSCILIE=
---
![商标](../../../en/adapterref/iobroker.tradfri/admin/tradfri.png)

![警报总数](https://img.shields.io/lgtm/alerts/g/AlCalzone/ioBroker.tradfri.svg?logo=lgtm&logoWidth=18)
![安装数量](http://iobroker.live/badges/tradfri-stable.svg)

＃ioBroker.tradfri
![建立状态](https://action-badges.now.sh/AlCalzone/ioBroker.tradfri)

＃＃ 要求
* Linux（例如Raspberry Pi）/ OSX / Windows
* NodeJS> = 6.x
*Trådfri网关

##安装
1.通过iobroker管理员GUI或通过`npm install iobroker.tradfri --production`安装此适配器。
1.在ioBroker GUI中，添加适配器实例。
1.通过输入网关的IP /主机名以及可在底部标签上找到的安全代码来配置实例。

###解决安装问题：
#### Linux / OSX：
确保安装最新发行的版本。如果有编译错误，则可能必须安装build-essential：

```
apt-get -y install build-essential
```

#### Windows：
如果您在较低版本的NodeJS（<10）上运行，则安装可能会失败，并在日志中的某处出现以下错误：

```
Can't find Python executable "python", you can set the PYTHON env variable.
```

要解决此问题，请打开管理外壳程序：

1.按<kbd>⊞Windows</kbd>键
2.输入`cmd`，按<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Enter</kbd>
3.确认UAC提示

并运行以下命令：

```
npm install --add-python-to-path --global windows-build-tools
```

这可能需要一些时间...之后安装应该成功。

##发送自定义CoAP数据包
您可以使用`sendTo`从其他适配器发送自定义CoAP数据包。 JavaScript中的示例：

```js
sendTo("tradfri.0", "request", options, (ret) => {
	// do something with the result
});
```

`options`对象如下所示：

```js
{
	path: string,
	method?: "get" | "post" | "put" | "delete", // optional, default = "get"
	payload?: object                            // optional, should be a JSON object
}
```

结果对象`ret`如下所示：

```js
{
	error: string | null,
	result: {
		code: string,            // see https://tools.ietf.org/html/rfc7252#section-12.1.2
		payload: object | Buffer
	}
}
```

## Changelog
<!--
	Placeholder for next release:
	### __WORK IN PROGRESS__
-->

### 2.6.4 (2020-11-29)
* Fix: Updated `node-tradfri-client` to suppress warnings about unknown property `9109`

### 2.6.3 (2020-06-01)
* Bugfix: Changed the role of RGB states to `level.color.rgb`

### 2.6.2 (2020-04-29)
* Bugfix: The unhandled error handler should now correctly log the error even if `adapter` is not defined

### 2.6.1 (2020-04-17)
* Bugfix: Blinds would not always be stopped

### 2.6.0 (2020-03-17)
* Support stopping blinds at their current position

### 2.5.2 (2020-01-26)
* Fix: Suppress log warnings for Symfonisk remotes

### 2.5.1 (2019-12-23)
* Made it possible to operate plugs using virtual groups

### 2.5.0 (2019-12-22)
* Allow more device types in virtual groups

### 2.4.7 (2019-11-18)
* Fixed small display issues with 3rd party bulbs

### 2.4.6 (2019-11-15)
* Group states for blinds are now synchronized correctly

### 2.4.5 (2019-11-07)
* Fix: Suppress log warnings for motion sensors

### 2.4.4 (2019-10-11)
* Fix: Suppress log warnings for slave remotes and signal repeaters

### 2.4.3 (2019-09-22)
* Fix: Operate blinds when states are changed

### 2.4.2 (2019-09-22)
* Fix: Also create objects for blinds

### 2.4.0 (2019-08-18)
* Add support for blinds

### 2.3.0 (2019-04-05)
* The gateway can now be discovered automatically

### 2.2.0 (2019-02-25)
* Expose the battery percentage for devices with a battery

### 2.1.0 (2019-01-08)
* When `node-aead-crypto` is not installed, display instructions on how to fix it
* Optimizations and fixes under the hood
* Support for compact mode

### 2.0.0 (2018-05-14)
* Support for Admin v3 and material design
* **BREAKING:** Dropped support for Admin v2

### 1.5.4 (2018-11-11)
* Fix handling of decimal digits in the adapter settings. This fixes rounding of group states.

### 1.5.2 (2018-11-06)
* Reworked installation procedure to fix problems with `node-aead-crypto`

### 1.5.1 (2018-10-29)
* Added experimental support for smart plugs

### 1.4.0 (2018-05-14)
* The names of state objects no longer get overwritten

### 1.3.0 (2018-05-06)
* Reduce logging of "updated scenes for group..."
* Made rounding of numeric values configurable
* Stability improvements

### 1.2.1 (2018-05-01)
* Use the native encryption methods of NodeJS 10 instead of `node-aead-crypto`

### 1.1.11 (2018-04-27)
* Add support for NodeJS 10

### 1.1.10 (2018-03-18)
* Improved automatic reconnection

### 1.1.9 (2018-03-15)
* Fixed group states not always updating the lightbulbs when changed

### 1.1.8 (2018-03-09)
* Ignore minimum brightness reports when lights are turned off

### 1.1.7 (2018-02-23)
* Fixed activation of scenes when the scene is already selected

### 1.1.6 (2018-02-22)
* Fixes for RGB support
* Support for floating point values

### 1.1.3 (2018-02-15)
* Update `node-tradfri-client` version for better RGB support and floating point values

### 1.1.1 (2018-02-07)
* Attempt to fix `TypeError: generator already running`

### 1.1.0 (2018-02-07)
* Added an option to preserve the transition duration for single lightbulbs

### 1.0.7 (2018-02-05)
* Fixed an error loading virtual groups

### 1.0.6 (2018-01-13)
* Update `node-tradfri-client` version

### 1.0.5 (2018-01-13)
* Removed error in log on adapter startup
* Change brightness role for better compatibility with the cloud adapter

### 1.0.4 (2018-01-10)
* Removed warning caused by Gateway v1.3.14

### 1.0.3 (2018-01-07)
* Updated `node-tradfri-client` version
* Load objects on adapter start so they don't get overwritten (#35)

### 1.0.2 (2017-12-28)
* New attempt at automatically restarting the adapter on connection loss

### 1.0.1 (2017-12-25)
* Update `node-tradfri-client` dependency to support receiving blockwise messages

### 1.0.0 (2017-11-19)
* This is stable enough for a 1.x version
* Improved browser compatiblity of the admin UI

### 0.6.0 (2017-11-07)
* Moved tradfri-related code into its own library
* Changed authentication procedure to comply with IKEA's request

### 0.5.5 (2017-10-31)
* Restored compatibility to Gateway version 1.2.42

### 0.5.4 (2017-10-29)
* Brightness is now expressed in 0..100%
* Fixed parsing RGB colors

### 0.5.3 (2017-10-28)
* Fixed transition duration for groups

### 0.5.2 (2017-10-28)
* Added icons for devices

### 0.5.1 (2017-10-28)
* Support virtual groups
* Validate hex colors on input

### 0.4.5 (2017-10-20)
* RGB and connection fixes.

### 0.4.3 (2017-10-17)
* Experimental support for RGB and lightbulbs with fixed color

### 0.3.4 (2017-10-17)
* Disabled automatic restart on connection loss.

### 0.3.3 (2017-10-07)
* Eliminated potential sources of infinite loops

### 0.3.2 (2017-10-04)
* Fixed an error resulting from the upgrade to ES2015 output

### 0.3.1 (2017-10-02)
* Update CoAP library to fix a bug

### 0.3.0 (2017-09-25)
* official release of the previous changes
* added transition duration and brightness change for groups
* monitor connection state and update info.connection
* fix connection attempts to unavailable endpoints

### 0.2.9 (2017-09-25)
* Support changing the transition duration

### 0.2.8 (2017-09-24)
* Fixed group and scene deletion

### 0.2.7 (2017-09-23)
* Update CoAP and DTLS library for the next features
* Offloaded concurrency handling to CoAP lib

### 0.2.5 (2017-09-12)
* Selection of scenes from the admin UI is now possible

### 0.2.4 (2017-09-11)
* Add support for groups (renaming, switching)
* Partial support for scenes (switching when id is known)

### 0.2.3 (2017-09-11)
* Send custom CoAP packets by using sendTo

### 0.2.2 (2017-09-10)
* Changed internal handling of objects to prepare the next updates

### 0.2.1 (2017-08-26)
* Sync io-package and package version

### 0.2.0 (2017-08-14)
* Remove git dependency, publish on npm

### 0.1.5 (2017-08-14)
* Ensure only whole numbers are sent (fixes #6)
* Fix connection to the gateway using the hostname

### 0.1.4 (2017-08-12)
* Switched to TypeScript

### 0.1.3 (2017-07-21)
* Reboot of the adapter without 3rd party libraries.

### 0.1.2 (2017-05-06)
* Color temperature of lightbulbs is now expressed in terms of 0 (cold) - 100% (warm).

### 0.1.1 (2017-05-04)
* Added support for NodeJS 4.X and building the dependencies on Windows systems

### 0.1.0 (2017-05-02)
* initial release. 
* Functionality limited to controlling lightbulbs.

### 0.0.0
* not ready yet!

## License
The MIT License (MIT)

Copyright (c) 2017-2020 AlCalzone <d.griesel@gmx.net>

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