---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/aliases.md
title: 别名
hash: NWUy6T4dxNPqgj/4GIA3p697eSGnvkF0Twd3+v0eRmg=
---
#Aliases
别名（假名）是与真实状态相关联的虚拟状态对象。

＃＃ 用例
通常，真实设备将被破坏，用户必须更换此设备。
此外，将更换硬件，此设备的地址将被更改。例如。从`hm-rpc.0.ABC123`到`hm-rpc.0.QJU978`。

因为旧地址用于许多地方，如vis，javascript，场景或其他地方，用户现在必须找到所有这些地方并在那里替换它。

此功能允许用户为物理设备分配别名，并在所有情况下使用此别名。
由于必须替换设备，因此必须仅在别名中更改ID。

此功能的另一个用例是支持iot或材料等特殊智能适配器中的设备。
在别名的帮助下，可以创建所需的状态结构，但是将从物理设备读取值。

##解释
在Object名称空间`alias.0`中创建的所有状态都将作为别名进行管理。

别名的状态值将从链接状态（目标）中读取，但是对象值（如普通，本机）将从别名状态本身读取。

实际上，`alias`对象将镜像目标对象的状态值。
如果允许，两个状态都可以更改，并由ioBroker核心系统自动同步。
这两种状态也可以用于在脚本中订阅，并且应该完全相同。

以下是此类对象的示例：

```
{
  "_id": "alias.0.Light.Device_1.WORKING",
  "type": "state",
  "common": {
    "alias": {
      "id": "admin.0.connected"
    },
    "name": "WORKING",
    "role": "indicator.working",
    "type": "boolean"
  },
  "native": {}
}
```

`native`始终为空，因为没有设备在别名后面，所有设置都将存储在`common`中。

但是在`common.alias.id`中存储了必须读取或写入状态值的ID。

如果定义了（别名和目标）对象的最小/最大设置，则别名会自动转换值。

例如。如果别名有`min=0,max=100`且目标有`min=0,max=255`那么通过读取，目标状态的值10将转换为3.9215686274509802并写入别名10将转换为25.5。

类型也将自动转换。从字符串到数字，从数字到布尔值等等。取决于别名和目标的类型。

此外，写入和读取功能可以在`common.alias`中定义：

```
{
  "_id": "alias.0.Temperature.SET",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786878.value",
      "write": "(val * 9/5) + 32",
      "read": "(val − 32) * 5/9"
    },
    "unit": "°C",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

和

```
{
  "_id": "knx.0.6786878.value",
  "type": "state",
  "common": {
    "unit": "°F",
    "name": "Temperature",
    "role": "value.temperature",
    "type": "number"
  },
  "native": {}
}
```

如果定义了转换函数，则将禁用自动转换。对于只读，可以省略写入功能，因此对于只写功能 - 读取功能。

例如。

```
{
  "_id": "alias.0.button",
  "type": "state",
  "common": {
    "alias": {
      "id": "knx.0.6786879.value",
      "write": "val ? 1 : 0"
    },
    "name": "Button",
    "role": "button",
    "type": "boolean"
  },
  "native": {}
}
```

和

```
{
  "_id": "knx.0.6786879.value",
  "type": "state",
  "common": {
    "name": "KNX Switch",
    "role": "value",
    "type": "number",
    "min": 0,
    "max": 1
  },
  "native": {}
}
```

订阅将自动管理。如果将订阅别名，那么也将订阅目标ID。

目标设备的ID可以动态更改（通过管理员），并且将针对新目标ID更新订阅。