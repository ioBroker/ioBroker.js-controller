![Logo](admin/amazon-dash.png)
# ioBroker.amazon-dash (Linux only!)
=================

[![NPM version](http://img.shields.io/npm/v/iobroker.amazon-dash.svg)](https://www.npmjs.com/package/iobroker.amazon-dash)
[![Downloads](https://img.shields.io/npm/dm/iobroker.amazon-dash.svg)](https://www.npmjs.com/package/iobroker.amazon-dash)

[![NPM](https://nodei.co/npm/iobroker.amazon-dash.png?downloads=true)](https://nodei.co/npm/iobroker.amazon-dash/)


Adapter to add Amazon Dash Buttons to ioBroker

## Steps 
1. Install libpcap-dev

    ```apt-get install libpcap-dev```

2. Pair your Dash-Adapter within the Amazon App but don't select a product! 
    Just quit the installation procedure at the product selection tab.
    Otherwise you'll order every time a product ;) [German instructions](https://www.amazon.de/gp/help/customer/display.html?nodeId=201746340).
  
3. Hit the dash button (should be white first, then flashing red)

4. Within the adapter objects, a new dash button should appear which you can use to start scenes or within the JS adapter


## HELP WANTED!

As this project is developed during my spare time, I*m actively looking for help to maintain and extend this lib! If you're willing to help, drop me a line!

## Changelog

### 0.3.1
+ (PArns) Added new Amazon MAC family

### 0.3.0
+ (foxriver76) materialize ui
+ (foxriver76) dash buttons are now of type device

### 0.2.9
+ (cernst1980) Ignore duplicate ARPs for 5 seconds
+ (PArns) Added new Amazon MAC family

### 0.2.8
+ (offline4ever) Added new Amazon MAC family

### 0.2.7
+ (arteck) fixed MAC parsing

### 0.2.6
+ (arteck) edit admin
+ (arteck) add manual MAC Adresses 
+ (PArns) Added new Amazon MAC family

### 0.2.5
+ (PArns) Added new Amazon MAC family

### 0.2.4
+ (PArns) Added new Amazon MAC family

### 0.2.3
+ (PArns) Added new Amazon MAC family

### 0.2.2
+ (PArns) Added new Amazon MAC family
+ (PArns) Fixed function name in description

### 0.2.1
+ (PArns) Added new Amazon MAC family

### 0.2.0
+ (PArns) Simplified MAC lookup (thx to GermanBluefox)

### 0.1.2
+ (PArns) Added new Amazon MAC family

### 0.1.1
+ (GermanBluefox) Try to install libpcap-dev automatically

### 0.1.0
+ (Niksac) Added the ability to select an interface

### 0.0.5
+ (PArns) Fixed lastPushed
+ (PArns) Fixed GIT dependency which might cause problems on some systems

### 0.0.4
+ (PArns) Removed debug infos

### 0.0.3
+ (PArns) Fixed switch state

### 0.0.2
* (PArns) Added switch state, which toggles between true and false
* (PArns) Changed License

### 0.0.1
* (PArns) Initial release 

## License
The MIT License (MIT)

Copyright (c) 2016-2017 Patrick Arns <npm@patrick-arns.de>

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
