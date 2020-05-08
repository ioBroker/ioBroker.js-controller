![Logo](admin/mpd.png)
# ioBroker.mpd adapter
![Number of Installations](http://iobroker.live/badges/mpd-installed.svg) ![Number of Installations](http://iobroker.live/badges/mpd-stable.svg) 
[![NPM version](https://img.shields.io/npm/v/iobroker.mpd.svg)](https://www.npmjs.com/package/iobroker.mpd)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mpd.svg)](https://www.npmjs.com/package/iobroker.mpd)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.mpd/master.svg)](https://travis-ci.org/instalator/ioBroker.mpd)

[![NPM](https://nodei.co/npm/iobroker.mpd.png?downloads=true)](https://nodei.co/npm/iobroker.mpd/)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PFUALWTR2CTPY)

Connect to a [music player daemon](http://musicpd.org) server, send commands,
emit events.

## Documentation

See also the [MPD Protocol Documentation](http://www.musicpd.org/doc/protocol/).


## Changelog

#### 1.0.5
* (instalator) fix error state

#### 1.0.4
* (instalator) Changed the appearance of the settings
* (instalator) Added support compact mode
* (instalator) Refactoring

#### 1.0.2
* (twonky) support admin3

#### 1.0.0
* (instalator) Up to stable

#### 0.2.4
* (instalator)  change  for sayit

#### 0.2.3
* (instalator)  change  log level for send command
                change  replay
                fix replay online radio
                fix error

#### 0.2.2
* (instalator)  fix replay in sayit

#### 0.2.1
* (instalator)  fix different error
                fix time
                fix messagebox
                added smooth volume for sayit if is play music

#### 0.2.0
* (instalator) Big change for SayIt

#### 0.1.7
* (instalator) change role media.pos to media.track

#### 0.1.6
* 05.01.2017 (instalator)  fix error for sayit

#### 0.1.4
* 05.01.2017 (instalator)  fix error

#### 0.1.3
* 02.01.2017 (instalator)  fix clear playlist\nadded file manager

#### 0.1.2
* 02.01.2017 (instalator)  change for playlist widgets

#### 0.1.1
* 02.01.2017 (instalator)   fix error sendTo text2speech
                            change error level (NOT connected)
                            change progressbar to seek
                            fix mute
                            refactor default object

#### 0.1.0
* 22.12.2016 (instalator) change structure

#### 0.0.13
* 21.12.2016 (instalator) clearTag(), adding states - progressbar and mute

#### 0.0.12
* 19.12.2016 (instalator) add support sayit. add state addplay

#### 0.0.11
* 18.12.2016 (instalator) add tests

#### 0.0.10
* 15.12.2016 (instalator) add update status if play, to check whether the value has changed, fix error, fix different cmd

#### 0.0.3
* 14.12.2016 (instalator) fix send command
                          change functions parse
                          add function status mpd

#### 0.0.2
* 13.12.2016 (instalator) Add send command

#### 0.0.1
* 11.12.2016 (instalator) initial adapter

## License
The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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

