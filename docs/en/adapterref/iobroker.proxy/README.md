![Logo](admin/proxy.png)
# ioBroker.proxy

![Number of Installations](http://iobroker.live/badges/proxy-installed.svg) ![Number of Installations](http://iobroker.live/badges/proxy-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.proxy.svg)](https://www.npmjs.com/package/iobroker.proxy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.proxy.svg)](https://www.npmjs.com/package/iobroker.proxy)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.proxy.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.proxy)

[![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)](https://nodei.co/npm/iobroker.proxy/)

## Usage
Allows to access defined URLs or local files via one web server.

Specified routes will be available under `http://ip:8082/proxy.0/context/...`. Of course port, protocol, `proxy.0`, can variate depends on settings.

## Configuration
- Extend WEB adapter: For which web instance will active this proxy.
- Route path: Path for proxy. If "/proxy.0", so the routes will be available under `http://webIP:8082/proxy.0/...`
- Error timeout(ms): Minimal interval between retries if the requested resource was unavailable or returned error.
- Use simple proxy: in this case the very simple but robust method will be used. It is not suitable for web sockets or POST request. Use this method if you have some issues with WEB Instance or socket.io communication.  

## Sample settings
| Context        |      URL                                           |      Description                                   |
|----------------|:---------------------------------------------------|:---------------------------------------------------|
| admin/         | http://localhost:8081                              | access to admin page                               |
| router/        | http://192.168.1.1                                 | access to local router                             |
| cam/           | http://user:pass@192.168.1.123                     | access to webcam (e.g. call http://ip:8082/proxy.0/cam/web/snapshot.jpg) |
| dir/           | /tmp/                                              | access to local directory "/tmp/"                  |
| dir/           | tmp/                                               | access to local directory "/opt/iobroker/tmp"      |
| file.jpg       | /tmp/picture.jpg                                   | access to local file "/tmp/picture.jpg"            |

**Not all devices can be accessed via proxy.** 

Some devices wants to be located in the root `http://ip/` and cannot run under `http://ip/proxy.0/context/`.

You can read more about context [here](https://www.npmjs.com/package/http-proxy-middleware#context-matching)

Additionally the user can define the route path for proxy requests.

## Changelog
### 1.2.1 (2020-04-14)
* (bluefox) Corrected error with access to local files

### 1.2.0 (2020-03-08)
* (Apollon77) update dependencies

### 1.1.1 (2019-07-02)
* (bluefox) Implemented simple proxy to eliminate socket.io problem

### 1.0.3 (2018-07-14)
* (bluefox) Newer mime version used

### 1.0.2 (2018-06-30)
* (bluefox) URI was decoded for usage of special chars in password and login

### 1.0.1 (2018-03-01)
* (bluefox) Fixed error: after 10 timeouts the web cam was never reachable
* (bluefox) Ready for Admin3

### 1.0.0 (2017-10-09)
* (bluefox) do not allow the error generation to fast

### 0.2.0 (2017-03-13)
* (bluefox) fix run-mode

### 0.0.1 (2017-01-09)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>

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
