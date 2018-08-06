![Logo](media/mqtt.png)
# ioBroker MQTT
==============

[![NPM version](http://img.shields.io/npm/v/iobroker.mqtt.svg)](https://www.npmjs.com/package/iobroker.mqtt)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt.svg)](https://www.npmjs.com/package/iobroker.mqtt)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.mqtt.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.mqtt)

[![NPM](https://nodei.co/npm/iobroker.mqtt.png?downloads=true)](https://nodei.co/npm/iobroker.mqtt/)

Requires node.js **6.0** or higher.

# MQ Telemetry Transport for ioBroker (MQTT).

MQTT (formerly Message Queue Telemetry Transport) is a publish-subscribe based "light weight" messaging protocol for use on top of the TCP/IP protocol.
It is designed for connections with remote locations where a "small code footprint" is required and/or network bandwidth is limited.
The Publish-Subscribe messaging pattern requires a message broker. The broker is responsible for distributing messages to interested clients based on the topic of a message.
Historically, the 'MQ' in 'MQTT' came from IBM's MQ message queuing product line.

This adapter uses the MQTT.js library from https://github.com/adamvr/MQTT.js/

## Configuration
- **Type** - Select "Client" (If you want to receive and send messages to other broker) or "Server" if you want create own MQTT broker.

### Server settings
- **WebSockets** - if parallel to TCP Server, the WebSocket MQTT Server should run.
- **Port** - Port where the server will run (Default 1883). **WebSockets** will always run on port+1 (Default 1884)
- **SSL** - If TCP and WebSockets should run as secure server.
- **Authentication/User name** - If authentication required, you can specify username. It is suggested to always use SSL with authentication to not send passwords over unsequre connection.  
- **Authentication/Password** - Password for user.
- **Mask to publish own states** - Pattern to filter ioBroker states, which will be sent to clients. You can use wildcards to specify group of messages, e.g "*.memRss, mqtt.0.*" to get all memory states of all adapters and all states of adapter mqtt.0
- **Publish only on change** - New messages will be sent to client only if the state value changes. Every message sent by client will be accepted, even if the value does not changed.
- **Publish own states on connect** - by every client connection the all known states will be sent to client (defined by state mask), to say him which states has the ioBroker.
- **Prefix for all topics** - if set, every sent topic will be prepended with this prefix, e.g if prefix "iobroker/" all states will have names like "**iobroker**/mqtt/0/connected"
- **Trace output for every message** - Debug outputs.
- **Send states (ack=true) too** - Normally only the states/commands with ack=false will be sent to partner. If this flag is set every state independent from ack will be sent to partner. 
- **Use different topic names for set and get** - if active, so every state will have two topics: ```adapter/instance/stateName``` and ```adapter/instance/stateName/set```. In this case topic with "/set" will be used to send non acknowledged commands (ack: false) and topic without "/set" to receive state updates (with ack: true). The client will receive sent messages back in this mode.
- **Interval before send topics by connection** - Pause between connection and when all topics will be sent to client (if activated).
- **Send interval** - Interval between packets by sending all topics (if activated). Used only by once after the connection establishment.
- **Use chunk patch** - There is a problem with last update of mqtt-packet, that frames will be sent directly to client and not first completely built and then sent to client. Some old clients do not like such a packets and do not work with new library. To fix it you can activate this flag.

### Client settings
- **URL** - name or ip address of the broker/server. Like "localhost".
- **Port** - Port of the MQTT broker. By default 1883
- **Secure** - If secure (SSL) connection must be used.
- **User** - if broker required authentication, define here the user name.
- **Password** - if user name is not empty the password must be set. It can be empty.
- **Password confirmation** - repeat here the password.
- **Subscribe Patterns** - Subscribe pattern. See chapter "Examples of using wildcards" to define the pattern. '#' to subscribe for all topics. 'mqtt/0/#,javascript/#' to subscribe for states of mqtt.0 and javascript
- **Publish only on change** - Store incoming messages only if payload is differ from actual stored.
- **Mask to publish own states** - Mask for states, that must be published to broker. '*' - to publish all states. 'io.yr.*,io.hm-rpc.0.*' to publish states of "yr" and "hm-rpc" adapter.  
- **Publish all states at start** - Publish all states (defined by state mask) every time by connection establishment to announce own available states and their values.
- **Prefix for topics** - The prefix can be defined for own states. Like "/var/ioBroker/". Name of topics will be for example published with the name "/var/ioBroker/ping/192-168-1-5".
- **Test connection** - Press the button to check the connection to broker. Adapter must be enabled before.
- **Send states (ack=true) too** - Normally only the states/commands with ack=false will be sent to partner. If this flag is set every state independent from ack will be sent to partner. 
- **Use different topic names for set and get** - if active, so every state will have two topics: ```adapter/instance/stateName``` and ```adapter/instance/stateName/set```. In this case topic with "/set" will be used to send non acknowledged commands (ack: false) and topic without "/set" to receive state updates (with ack: true).
 
## Install

```node iobroker.js add mqtt```

## Usage

### How to test mqtt client:
- Set type to "Client".
- Leave port on 1883.
- Set URL as "broker.mqttdashboard.com"
- To get absolutely all topics(messages) set pattern to "#".
- To receive all topics for "/4MS" set pattern to "/4MS/#"
- To receive all topics for "/MS and "/floorish" set pattern to "/4MS/#, /floorish/#"

### Examples of using wildcards
The following examples on the use of wildcards, builds on the example provided in topic strings.

- "Sport"
- "Sport/Tennis"
- "Sport/Basketball"
- "Sport/Swimming"
- "Sport/Tennis/Finals"
- "Sport/Basketball/Finals"
- "Sport/Swimming/Finals"

If you want to subscribe to all Tennis topics, you can use the number sign '#', or the plus sign '+'.

- "Sport/Tennis/#" (this will receive "Sport/Tennis" and "Sport/Tennis/Finals")
- "Sport/Tennis/+" (this will receive "Sport/Tennis/Finals" but not "Sport/Tennis")

For JMS topics, if you want to subscribe to all Finals topics, you can use the number sign '#', or the plus sign '+'.

- "Sport/#/Finals"
- "Sport/+/Finals"

For MQTT topics, if you want to subscribe to all Finals topics, you can use the plus sign '+' .

"Sport/+/Finals"

### Tests
The broker was tested with following clients:

- http://mitsuruog.github.io/what-mqtt/
- http://mqttfx.jfx4ee.org/
- http://www.eclipse.org/paho/clients/tool/

## Todo
* Implement resend of "QoS 2" messages after a while.
  Whenever a packet gets lost on the way, the sender is responsible for resending the last message after a reasonable amount of time. This is true when the sender is a MQTT client and also when a MQTT broker sends a message.

* queue packets with "QoS 1/2" for the offline clients with persistent session.
  [Read here](https://www.hivemq.com/blog/mqtt-essentials-part-7-persistent-session-queuing-messages)

## Changelog
### 2.0.1 (2018-07-06)
* (bluefox) Double prefix by client was fixed

### 2.0.0 (2018-03-05)
* (bluefox) broke node.js 4 support
* (bluefox) remove mqtt-stream-server
* (bluefox) partial mqtt5 support

### 1.5.0 (2018-03-05)
* (bluefox) The patch for wifi-iot removed
* (bluefox) the mqtt library updated
* (bluefox) implement QoS>0

### 1.4.2 (2018-01-30)
* (bluefox) Admin3 settings are corrected

### 1.4.1 (2018-01-13)
* (bluefox) Convert error is caught
* (bluefox) Ready for admin3

### 1.3.3 (2017-10-15)
* (bluefox) Fix sending of QOS=2 if server

### 1.3.2 (2017-02-08)
* (bluefox) Fix convert of UTF8 payloads
* (bluefox) optional fix for chunking problem

### 1.3.1 (2017-02-02)
* (bluefox) Update mqtt packages
* (bluefox) add Interval before send topics by connection ans send interval settings
* (bluefox) reorganise configuration dialog

### 1.3.0 (2017-01-07)
* (bluefox) Update mqtt packages
* (bluefox) configurable client ID

### 1.2.5 (2016-11-24)
* (bluefox) Fix server publishing

### 1.2.4 (2016-11-13)
* (bluefox) additional debug output

### 1.2.1 (2016-11-06)
* (bluefox) fix publish on start

### 1.2.0 (2016-09-27)
* (bluefox) implementation of LWT for server
* (bluefox) update mqtt package version

### 1.1.2 (2016-09-13)
* (bluefox) fix authentication in server

### 1.1.1 (2016-09-12)
* (bluefox) do not parse JSON states, that do not have attribute "val" to support other systems

### 1.1.0 (2016-07-23)
* (bluefox) add new setting: Use different topic names for set and get

### 1.0.4 (2016-07-19)
* (bluefox) convert values like "+58,890" into numbers too

### 1.0.3 (2016-05-14)
* (cdjm) change client protocolID

### 1.0.2 (2016-04-26)
* (bluefox) update mqtt module

### 1.0.1 (2016-04-25)
* (bluefox) Fix translations in admin

### 1.0.0 (2016-04-22)
* (bluefox) Fix error with direct publish in server

### 0.5.0 (2016-03-15)
* (bluefox) fix web sockets
* (bluefox) fix SSL

### 0.4.2 (2016-02-10)
* (bluefox) create object "info.connection"
* (bluefox) add reconnection tests

### 0.4.1 (2016-02-04)
* (bluefox) fix error with states creation

### 0.4.0 (2016-01-27)
* (bluefox) add tests
* (bluefox) client and server run

### 0.3.1 (2016-01-14)
* (bluefox) change creation of states by client

### 0.3.0 (2016-01-13)
* (bluefox) try to fix event emitter

### 0.2.15 (2015-11-23)
* (Pmant) fix publish on subscribe

### 0.2.14 (2015-11-21)
* (bluefox) fix error with wrong variable names 

### 0.2.13 (2015-11-20)
* (Pmant) fix error with wrong variable name 

### 0.2.12 (2015-11-14)
* (Pmant) send last known value on subscription (server)

### 0.2.11 (2015-10-17)
* (bluefox) set maximal length of topic name
* (bluefox) convert "true" and "false" to boolean values

### 0.2.10 (2015-09-16)
* (bluefox) protect against empty topics

### 0.2.8 (2015-05-17)
* (bluefox) do not ty to parse JSON objects

### 0.2.7 (2015-05-16)
* (bluefox) fix test button

### 0.2.6 (2015-05-16)
* (bluefox) fix names if from mqtt adapter

### 0.2.5 (2015-05-15)
* (bluefox) subscribe to all states if no mask defined

### 0.2.4 (2015-05-14)
* (bluefox) add state "clients" to server with the list of clients

### 0.2.3 (2015-05-14)
* (bluefox) fix some errors

### 0.2.2 (2015-05-13)
* (bluefox) fix some errors with sendOnStart and fix flag sendAckToo

### 0.2.0 (2015-05-13)
* (bluefox) translations and rename config sendNoAck=>sendAckToo
* (bluefox) lets create server not only on localhost

### 0.1.8 (2015-05-13)
* (bluefox) fix topic names in server mode
* (bluefox) implement subscribe
* (bluefox) update mqtt package

### 0.1.7 (2015-03-24)
* (bluefox) create objects if new state received
* (bluefox) update mqtt library

### 0.1.6 (2015-03-04)
* (bluefox) just update index.html

### 0.1.5 (2015-01-02)
* (bluefox) fix error if state deleted

### 0.1.4 (2015-01-02)
* (bluefox) support of npm install

### 0.1.2 (2014-11-28)
* (bluefox) support of npm install

### 0.1.1 (2014-11-22)
* (bluefox) support of new naming concept

### 0.1.0 (2014-10-23)
* (bluefox) Update readme
* (bluefox) Support of authentication for server and client
* (bluefox) Support of prefix for own topics

### 0.0.2 (2014-10-19)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2018, bluefox<dogafox@gmail.com>

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
