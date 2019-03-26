---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hid/README.md
title: 无题
hash: ocorguClOBzHzBoeOx9POaHFhiuwEqU3Ppx/5S23HMo=
---
![商标](../../../en/adapterref/iobroker.hid/admin/hid.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.hid.svg)
![建立状态](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![执照](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

### IoBroker.hid
####说明
适用于HID设备的适配器， Apple Remote

####信息
完全重新设计

####安装
在iobroker根目录中执行以下命令（例如在/ opt / iobroker中）

```
npm install iobroker.hid
```

＃＃＃＃ 状态
有两个国家组，原始和关键。密钥组只会被触发，是找到映射。

只有一个状态xxx.double，xxx.single和xxx.long将在事件上发生变化。
状态xxx.dsl得到结果.double，single或long。
动作表示向下，向上或重复。

#### Mappings
添加或编辑io-package.json文件中的映射部分以查看密钥代码的名称。
这不是必需的，无论如何都将创建原始数据状态。

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

＃＃＃＃ 要求
在对node-hid项目进行较小的更改之前，node-hid模块在Windows 10上不起作用。
安装iobroker.hid之后编辑：

```
<path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid/hidapi/windows/hid.c
```

找：

```
open_device
```

更改函数调用“CreateFileA”的第2和第3个参数：

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

要重建node-hid模块，请更改为irectory：

```
cd <path to iobroker>/node_modules/iobroker.hid/node_modules/node-hid
```

执行：

```
npm install --build-from-source
```

重启iobroker.hid模块......
 - >