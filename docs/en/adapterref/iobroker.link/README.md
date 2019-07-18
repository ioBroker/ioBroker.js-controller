![Logo](admin/link.png)
# ioBroker.link

[![NPM version](http://img.shields.io/npm/v/iobroker.link.svg)](https://www.npmjs.com/package/iobroker.link)
[![Downloads](https://img.shields.io/npm/dm/iobroker.link.svg)](https://www.npmjs.com/package/iobroker.link)

[![NPM](https://nodei.co/npm/iobroker.link.png?downloads=true)](https://nodei.co/npm/iobroker.link/)

This adapter allows secure connection over [ioBroker.link](https://iobroker.link/) cloud.

## Adapter Settings

## Proxy
Proxy can be defined as URI: *http://proxy:8080* or via **HTTPS_PROXY** environment variable.

## Changelog
### 0.4.4 (2019-07-16)
* (gh-got) closing tunnels in case server considers an agent as offline
* (gh-got) fixed timeout to query active connection status

### 0.4.2 (2019-03-28)
* (gh-got) agents will report own version by registration

### 0.4.0 (2019-03-10)
* (bluefox) Made this adapter to be compatible with the new server

### 0.3.7 (2018-09-23)
* (bluefox) Do not connect to the cloud if no configuration defined

### 0.3.6 (2018-06-26)
* (bluefox) The download of SSF from github depending on platform was added

### 0.2.7 (2018-06-17)
* (bluefox) UDP communication is now supported

### 0.2.6 (2018-06-10)
* (bluefox) HTTP proxy support

### 0.1.3 (2018-04-25)
* (bluefox) Initial commit

## License
Creative Common Attribution-NonCommercial (CC BY-NC)

Copyright (c) 2018-2019 bluefox <dogafox@gmail.com>, gh-got

http://creativecommons.org/licenses/by-nc/4.0/

![CC BY-NC License](https://github.com/GermanBluefox/DashUI/raw/master/images/cc-nc-by.png)

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).