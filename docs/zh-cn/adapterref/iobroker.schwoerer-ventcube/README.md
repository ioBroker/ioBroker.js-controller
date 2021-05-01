---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: ooQd7u6nAw3NV7A4xcAwWg32vY9GzGvOivxyM/aXzcQ=
---
![商标](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![依赖状态](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![安装数量（最新）](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![语言等级：JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![NPM](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

＃ioBroker.schwoerer-ventcube
![Github发布状态](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)

## IoBroker的schwoerer-ventcube适配器
Schwoererhaus Ventcube系统的适配器。可以在[这里](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/)中找到有关Ventcube Fresh的更多信息。

**免责声明**：此适配器既未由分发Ventcube系统的公司[Schwoererhaus KG](https://www.schwoererhaus.de/)开发也未得到官方支持。请严格按照说明进行操作，风险自负。

###前提条件
为了访问Ventcube的网络接口，需要满足以下（已知）先决条件：

-Ventcube需要连接到您的内部网络（通常通过网络电缆）
-需要支持Modbus TCP接口（控制面板：> = V1.05，VentCube：> = V02.11），通常必须先手动启用
    *在控制面板上登录“服务”部分（使用docs中的标准密码）
*在“基本设置”中，检查是否已建立网络连接，并且“ 9.网络接口”和“ 10. Modbus TCP”均处于活动状态。
*如果最后两个设置均未激活，请激活它们并重新启动Ventcube（例如，暂时切断电源）

###配置参数
根据特定于建筑物的Ventcube设置，不会使用所有可以从Ventcube接口检索或更改的参数。 “ parameters”文件夹中的每个参数与“ lastUpdate”文件夹中的条目并排，该条目指示每个参数的最后获取时间戳。

下文引用的规范中提到的所有参数均已添加到适配器中，并且可以通过***高级功能***选项进行访问，该选项可在适配器部署期间进行配置。启用此选项将导致适配器定期检索100多个参数的数据，其中大多数可能不会在普通家庭中使用。测试范围仅限于***基本功能***（默认情况下启用）。

可能需要在适配器部署期间更改以下默认配置值，以使其正确连接到Ventcube：

|参数默认值**应该** |说明|
| `Server`|本地主机| *** HERMES-LT ***或*** Ventcube的局域网IP *** |默认值用于测试，肯定需要更改！ |
| `Port`| 10502 | ***502*** |默认值用于测试，肯定需要更改！ |
| `Interval`| 30 | 30 |在几秒钟后，应该从服务器刷新指标。 |
| `Request Timeout`| 5000 | 5000 |到Ventcube的请求超时要等待多少毫秒|
| `Reconnection Attempts`| 10 | 10 |万一失去与Ventcube的连接，应尝试多少次重新连接|
| `Delay between reconnection attempts`| 10000 | 10000 |两次重新连接尝试之间等待的时间（以毫秒为单位）|
| `Advanced Functions`| ＆＃10003; | |如果仅将Ventcube用于通风，基本功能就足够了，但是如果需要加热/冷却功能或系统指标（错误代码，风扇详细信息），则应激活高级功能。 |
| “高级功能” | ＆＃10003; | |如果仅将Ventcube用于通风，基本功能就足够了，但是如果需要加热/冷却功能或系统指标（错误代码，风扇详细信息），则应激活高级功能。 |

####有趣的功能（开始）
-*** Betriebsart ***，多变
-***Stoßlüftung***（30分钟4级空气喷射），可更换
-*** Ist Temp Raum 1 ***（室内温度）
-*** T10Außentemperatur***

###参考系统
ioBroker适配器已成功测试：

|控制面板Ventcube | Modbus规格|
|---------------|----------|-----------------------------------|
| V01.10 | V02.26 |参数列表e_Modbus_TCP_03.2020 |

## License
MIT License

Copyright (c) 2020 Excodibur <non@existant.com>

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