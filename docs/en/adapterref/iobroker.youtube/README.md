![Logo](admin/youtube.png)

# ioBroker.youtube

[![NPM version](http://img.shields.io/npm/v/iobroker.youtube.svg)](https://www.npmjs.com/package/iobroker.youtube)
[![Downloads](https://img.shields.io/npm/dm/iobroker.youtube.svg)](https://www.npmjs.com/package/iobroker.youtube)
[![Stable](http://iobroker.live/badges/youtube-stable.svg)](http://iobroker.live/badges/youtube-stable.svg)
[![installed](http://iobroker.live/badges/youtube-installed.svg)](http://iobroker.live/badges/youtube-installed.svg)
[![Dependency Status](https://img.shields.io/david/klein0r/iobroker.youtube.svg)](https://david-dm.org/klein0r/iobroker.youtube)
[![Known Vulnerabilities](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)](https://snyk.io/test/github/klein0r/ioBroker.youtube)
[![Build Status](http://img.shields.io/travis/klein0r/ioBroker.youtube.svg)](https://travis-ci.org/klein0r/ioBroker.youtube)

[![NPM](https://nodei.co/npm/iobroker.youtube.png?downloads=true)](https://nodei.co/npm/iobroker.youtube/)

Statistics like views, subscribers and videos

## Configuration

To get an API-Key you have to go to [console.developers.google.com](https://console.developers.google.com/apis/dashboard).

1. Create a new Project
2. Create a new API key
3. Add "YouTube Data API v3" of the library
4. Use that API-Key in the options panel
5. Add multiple channels in the channels tab by using the id and a custom name

## Changelog

### 1.0.2

* (klein0r) Delete unsed states

### 1.0.1

* (klein0r) Fixed trailing dot in channel error message

### 1.0.0

* (klein0r) First stable release

### 0.0.13

* (klein0r) Changed to new library

### 0.0.12

* (klein0r) Added json summary

### 0.0.11

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.10

* (klein0r) Added missing translations

### 0.0.9

* (klein0r) Updated depencencies

### 0.0.8

* (klein0r) Removed link from overview

### 0.0.7

* (klein0r) Added VIS widget

### 0.0.6

* (klein0r) Collect YouTube information after configuration changes

### 0.0.5

* (klein0r) Bugfix

### 0.0.4

* (klein0r) Added more options

### 0.0.3

* (klein0r) Support for multiple channels

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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
