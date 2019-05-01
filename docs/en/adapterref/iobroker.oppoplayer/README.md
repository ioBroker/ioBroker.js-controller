![Logo](admin/oppoplayer.png)
# ioBroker.oppoplayer
![Number of Installations](http://iobroker.live/badges/oppoplayer-installed.svg) ![Number of Installations](http://iobroker.live/badges/oppoplayer-stable.svg)

This adapter adds support for oppo digital UHD player (UDP-20x) to ioBroker. 
You can control playback and query status.

## Tips & Tricks
* The player doesn't start the network interface if it's connected to power again (confirmed by oppo).
  If you disconnect him from power you have to use the trigger to start it.  

## Contributors
* volkerrichert

## Changelog

### 0.2.2
* (volkerrichert) "enable" compact mode

### 0.2.1 
* (volkerrichert) fixed power removed detection

### 0.2.0 ("Compact mode" release)
* (volkerrichert) add support for compact mode 

### 0.1.0 (first public release)
* (volkerrichert) handle changes on writeable states

### 0.0.2 (not released)
* (volkerrichert) providing most of the objects and remote key

### 0.0.1 (not released)
* (volkerrichert) initial commit

## License
The MIT License (MIT)

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

Copyright (c) 2018-2019 Volker Richert volker@richert.nrw