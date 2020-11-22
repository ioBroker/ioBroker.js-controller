---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.legrand-ecocompteur/README.md
title: ioBroker.legrand-ecocompteur
hash: a73AiyFhTrm8yGm4x+3V6E38/K+jNg56NsBwZYyJ+MY=
---
![商标](../../../en/adapterref/iobroker.legrand-ecocompteur/admin/legrand-ecocompteur.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.legrand-ecocompteur.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.legrand-ecocompteur.svg)
![安装数量（最新）](http://iobroker.live/badges/legrand-ecocompteur-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/legrand-ecocompteur-stable.svg)
![依赖状态](https://img.shields.io/david/raintonr/iobroker.legrand-ecocompteur.svg)
![已知漏洞](https://snyk.io/test/github/raintonr/ioBroker.legrand-ecocompteur/badge.svg)
![测验](https://travis-ci.org/raintonr/ioBroker.legrand-ecocompteur.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.legrand-ecocompteur.png?downloads=true)

＃ioBroker.legrand-ecocompteur
##适用于ioBroker的legrand-ecocompteur适配器
Legrand Ecocompteur模块的适配器（又名Legrand测量集中器EMDX³412000）。

这是具有自己的Web界面的功率测量设备。适配器通过以下方式利用该Web界面：

-轮询瞬时功率读数（在JSON响应中读取）。
-轮询设备的索引页以读取TIC界面。 TIC代表法国的Télé-InformationClient。通常从连接到Ecocompteur的公用事业计费表中读取该值。

这些对象是为Ecocompteur读取的5条回路中的每条回路加上总总数创建的：

-瞬时功率（瓦）。
-适配器运行时测得的总累积能量（以kWh为单位）。

创建另一个对象来存储TIC接口值。

###注意Ecocompteur的脆弱IP堆栈
通过测试发现，Ecocompteur具有相当脆弱的IP堆栈。有时堆栈可能会“挂起”并停止响应请求，尽管根据作者的经验，这已跟踪到来自另一台家庭自动化设备的不符合RFC的请求。

尽管如此，通过将设备放在简单的Nginx微缓存反向代理后面来减轻这种风险是谨慎的。位于http://192.168.0.10/的Ecocompteur的示例Nginx配置（因此将此适配器的* BaseURL *设置设置为* http：// <Nginx地址>：8080 / le / *）：

```
proxy_cache_path /tmp/cache keys_zone=cache:32k levels=1 inactive=10s max_size=256k;

server {
    listen 8080;

    proxy_cache cache;
    proxy_cache_valid 200 1s;
    location /le/ {
        proxy_pass http://192.168.0.10/;
    }
}
```

###配置
需要以下配置：

-设备的基本网址。
-JSON轮询间隔（以秒为单位）。
-索引轮询间隔（以秒为单位）。
-验证：最大电路读数（以瓦特为单位）。

## Changelog

### 0.0.6
* (Robin Rainton) Change IP address setting to base URL. **Settings will need to be updated.**
* (Robin Rainton) Fixed timeout handling. Parse readings from index HTML. Refactor to use more promises & single interval timer.

### 0.0.4
* (Robin Rainton) Added reading validation filter.

### 0.0.3
* (Robin Rainton) initial clean release.

## License
MIT License

Copyright (c) 2020 Robin Rainton <robin@rainton.com>

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