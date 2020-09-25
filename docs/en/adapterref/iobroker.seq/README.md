![Logo](admin/seq.png)
# ioBroker.seq

[![NPM version](http://img.shields.io/npm/v/iobroker.seq.svg)](https://www.npmjs.com/package/iobroker.seq)
[![Downloads](https://img.shields.io/npm/dm/iobroker.seq.svg)](https://www.npmjs.com/package/iobroker.seq)
![Number of Installations (latest)](http://iobroker.live/badges/seq-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/seq-stable.svg)
[![Dependency Status](https://img.shields.io/david/o0shojo0o/iobroker.seq.svg)](https://david-dm.org/o0shojo0o/iobroker.seq)

[![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)](https://nodei.co/npm/iobroker.seq/)

## Seq adapter for ioBroker

This adapter allows you to push your ioBroker log into the system of [Seq](https://datalust.co/seq)

## Configuration

1. Create a new instance of the adapter
2. Fill the URL/IP and port of the [Seq](https://datalust.co/seq) instance
3. Specify which log events you want to push to [Seq](https://datalust.co/seq)
4. Save the settings

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release prerelease beta -- --all
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 0.0.5 (2020-09-23)
* (IdleBit) add param SystemName for display in Seq

### 0.0.4 (2020-09-23)
* (IdleBit) bugfix at the server address check  

### 0.0.3 (2020-09-22)
* (IdleBit) fix minimum js.controller version

### 0.0.2 (2020-09-17)
* (IdleBit) new release for npm...

### 0.0.2-beta.0 (2020-09-16)
* (IdleBit) initial release

### 0.0.1
* (IdleBit) initial push

## License
MIT License

Copyright (c) 2020 Dennis Hinzpeter <info@bastelbunker.de>

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
