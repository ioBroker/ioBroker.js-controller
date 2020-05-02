
---
---
![Logo](admin/mihome-airpurifier.png)
# ioBroker.mihome-airpurifier
![Number of Installations](http://iobroker.live/badges/mihome-airpurifier-installed.svg) ![Number of Installations](http://iobroker.live/badges/mihome-airpurifier-stable.svg) 
Xiaomi Air Purifier adapter for ioBroker IoT platform.[![Build Status](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier.svg?branch=master)](https://travis-ci.org/JoJ123/ioBroker.mihome-airpurifier)

## How to get the token?
You have to install the miio command line tool
`npm install -g miio`

Now you have two options:
1. With Mi Home App:

    You connect the purifier with MI Home App to your Wifi Network and then run the following command:

    `miio discover`

    You should get the following output and can save the token.

    ```
    Device ID: 48765421
    Model info: zhimi.airpurifier.m1
    Address: 192.168.100.9
    Token: token-as-hex-here via auto-token
    Support: At least basic
    ```

2. Without Mi Home App:

    You reset the WIFI settings of the air purifier. Then you connect your network with the WIFI of the air purifier and run the following command:

    `miio discover`

    You should get the same output as above and can now configure the connection to your network by following command:

    `miio configure id-or-address --ssid ssid-of-network --passwd password-of-network`

    Now the air purifier is connected to your network.

## Cloud Connection
To control the Air Purifier with the cloud adapter just add the state "manuallevel" to your Cloud Adapter. After that you can send f.e. the following commands through Alexa:

*Alexa, turn the air purifier on*,

*Alexa, set the air purifier to 50%*,

*Alexa, turn the air purifier off*

If you set in the Cloud adapter the "On Value" to "Last active value", the device always start running in the latest active power level.


## Control States
To control your air purifier, the following objects can be written:

| State          | Description |
| :---           | :---        |
| `power`          | Turn the device on / off  |
| `auto`           | Activate the auto mode of the device. |
| `silent`         | Activate the silent mode of the device. |
| `manual`         | Activate the manual mode of the device. |
| `manuallevel`    | Control the power of the manual mode in the range from 0-100%. This will also turn on / off the device if necessary |
| `led`          | Turn the auto led on / off  |
| `buzzer`       | Turn the buzzer on / off  |

## Info States
The following information is collected from your air purifier (read-only states):

### Device Info

| State       | Description |
| :---        | :---        |
| `mode`        | The actual device mode, just valid, if the device is powered on. |
| `temperature` | The measured temperature in °C of the device. |
| `humidity`    | The measured relative humidity in % of the device. |
| `pm25`        | The air pollution in PM2.5. |
| `filterLifeRemaining`        | The remaining filter life in hours. |
| `filterHoursUsed`        | The used hours of the filter. |

## Changelog
### 0.1.7 (01.05.2020)
* (JoJ123) add new parameter

### 0.1.6 (01.05.2020)
* (JoJ123) add new parameter

### 0.1.5 (01.05.2020)
* (JoJ123) add new parameter

### 0.1.4 (01.05.2020)
* (JoJ123) bug fixing

### 0.1.1 (18.04.2020)
* (JoJ123) move to typescript

### 0.0.6 (09.04.2019)
* (JoJ123) update miio to fork of Sineos

### 0.0.5 (06.01.2019)
* (JoJ123) update natives

### 0.0.4 (02.01.2019)
* (JoJ123) update type

### 0.0.3 (18.12.2018)
* (JoJ123) npm release

### 0.0.2 (29.11.2018)
* (JoJ123) auto reconnect

### 0.0.1 (10.10.2018)
* (JoJ123) initial release

## License
The MIT License (MIT)

Copyright (c) 2019 Johannes Jaeger johannesjaegeroffice@gmail.com

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

Copyright (c) 2020 Johannes Jaeger <johannesjaegeroffice@gmail.com>

