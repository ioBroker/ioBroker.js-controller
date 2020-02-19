![Logo](admin/web-speedy.png)
# ioBroker.web-speedy

[![NPM version](http://img.shields.io/npm/v/iobroker.web-speedy.svg)](https://www.npmjs.com/package/iobroker.web-speedy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.web-speedy.svg)](https://www.npmjs.com/package/iobroker.web-speedy)
![Number of Installations (latest)](http://iobroker.live/badges/web-speedy-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/web-speedy-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.web-speedy.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.web-speedy)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.web-speedy/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.web-speedy)

[![NPM](https://nodei.co/npm/iobroker.web-speedy.png?downloads=true)](https://nodei.co/npm/iobroker.web-speedy/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.web-speedy/master.svg)](https://travis-ci.org/iobroker-community-adapters/ioBroker.web-speedy)

## web-speedy adapter for ioBroker

Web-Speedy enables you to test your internet connection on a regular base and store results in ioBroker !

### How to use this adapter 

At first startup it will retrieve best-servers nearby based on ping results and run the first test.

Web-Speedy is build in a way all execution is handled automatically, meaning you don't have a configuration page.
However, you still can influance some things (see datapoints):

| State               | Description                                                                                                                                                                          |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| test_auto_modus     | Server mode to run automatically tests with                                                                                                                                          |
| test_auto_intervall | Intervall time for automated test-execution (default = 30, if set to 0 no automated test will run !)                                                                                 |
| test_best           | Run test now on best-server based on last ping results                                                                                                                               |
| test_by_id          | Run test on specific server ID now !                                                                                                                                                          |
| test_by_url         | Run test on specific server URL now !                                                                                                                                                         |
| test_duration       | The maximum length (in seconds) of a single test run (upload or download)                                                                                                            |
| test_specific       | Use the dropdown list to choose one of the top 5 servers found in previous scan                                                                                                      |
| test_specific_id    | Enter specific server ID [Please find a server ID here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)   |
| test_specific_url   | Enter specific server URL [Please find a server URL here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A) |


![Mbyte](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/Mbyte.png)
![Mbit](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/Mbit.png)
![States](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.web-speedy/master/admin/states.png)

## Support me
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.2.0 Initial release
* (DutchmanNL) Attention : Delete all objects beforer adapter start if previous version installed !
* (DutchmanNL) Implement [ test_auto_modus ] Server mode to run automatically tests with
* (DutchmanNL) Fix issues with running specific server tests
* (DutchmanNL) Upload speed calculation issue fixed

### 0.1.5 New settings possibilities & Code improvements
* (DutchmanNL) Implemented states for progress in %
* (DutchmanNL) No automated scan if test_auto_intervall set zo 0
* (DutchmanNL) Ensure propper running state reset at adapter start
* (DutchmanNL) Improve code performance and avoid multiple running instances
* (DutchmanNL) Implemented adjustable duration time for scan by (increase if you see strange test results, like to 20 secons)
* (DutchmanNL) Implemented state to run test by id or URL at specific server [Please find a server id here](https://c.speedtest.net/speedtest-servers-static.php?fbclid=IwAR3mLi2N9mwp1zG4Xu96cn4h1Zql6NG26p6GDjctjMftq0YzKKwPk-wme8A)

### 0.1.1 MegaByte to Megabit calculation and current test speeds implemented
* (DutchmanNL) Fix wrong status "test runnig"
* (DutchmanNL) Implement byte to bit calculation for test - results
* (DutchmanNL) implement current speeds in kb/s during download

### 0.1.0 Beta release for public testing
* (DutchmanNL) Beta release for public testing

## License
MIT License

Copyright (c) 2020 DutchmanNL <rdrozda86@gmail.com>

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