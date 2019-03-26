![Logo](admin/hid.png)
### ioBroker.hid

[![NPM version](http://img.shields.io/npm/v/iobroker.hid.svg)](https://www.npmjs.com/package/iobroker.hid)
[![Build status](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)](https://ci.appveyor.com/project/soef/iobroker-hid)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/soef/iobroker.yamaha/blob/master/LICENSE)

#### Description

Adapter for HID devices e.g. Apple Remote

#### Info
Completly redesigned 

#### Installation
Execute the following command in the iobroker root directory (e.g. in /opt/iobroker)
```
npm install iobroker.hid 
```

#### States

There are two state groups, raw and key. the key group will only be fired, is a mapping is found.

Only one of the states xxx.double, xxx.single and xxx.long will change on an event.
The state xxx.dsl gets the results .double, single or long.
Action indicates down, up or repeat.

#### Mappings
Add or edit the mapping section in the io-package.json file to see the names of the key codes. 
This is not necessary, the raw data states will be created anyway. 
```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```


<!--
#### Requirements

The node-hid module does not work on Windows 10 until you make a smal change to the node-hid project.
After installation of iobroker.hid edit:
```
<path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid/hidapi/windows/hid.c
```
Find:
```
open_device
```
Change the 2nd and 3rd parameter of the function call "CreateFileA":
```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ... 
      
	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...	
}
```
To rebuild the node-hid module, change to the irectory:
```
cd <path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid
```
execute:                              
```
npm install --build-from-source 
```
Restart the iobroker.hid module...
-->
