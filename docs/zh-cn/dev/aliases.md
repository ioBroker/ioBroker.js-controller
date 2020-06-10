---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/dev/aliases.md
title: 别名
hash: Y/W7WkG7kysiHCFcvIpn8l5VD8cfsmU3P3ksGMvRc9M=
---
＃别名
别名（化名）是与真实状态链接的虚拟状态对象。

＃＃ 用例
通常，真实设备会损坏，用户必须更换该设备。
另外，将更换硬件，并更改该设备的地址。例如。从`hm-rpc.0.ABC123`到`hm-rpc.0.QJU978`。

由于旧地址已在vis，javascript，场景或其他地方使用过，因此用户现在必须找到所有这些地方并将其替换。

此功能允许用户为物理设备分配别名，然后在所有情况下都使用此别名。
由于必须更换设备，因此只能在别名中更改ID。

此功能的另一个用例是在特殊的智能适配器（如物联网或材料）中支持设备。
借助别名，可以创建所需的状态结构，但将从物理设备读取值。

##说明
在对象名称空间`alias.0`中创建的所有状态都将作为别名进行管理。

别名的状态值将从链接状态（目标）中读取，而对象值（如通用，本机）将从别名状态本人中读取。

有效地，`alias`对象将镜像目标对象的状态值。
如果允许，则ioBroker核心系统可以更改和自动同步这两种状态。
同样，这两种状态都可以用于订阅脚本，并且其行为应完全相同。

这是此类对象的示例：

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

`native`始终为空，因为没有设备位于别名本身后面，并且所有设置都将存储在`common`中。

但是，在`common.alias.id`中存储的ID是必须读取或写入状态值的位置。

如果定义了两个（别名和目标）对象的最小/最大设置，则别名将自动转换该值。

例如。如果别名具有`min=0,max=100`，而目标具有`min=0,max=255`，则通过读取将目标状态的值10转换为3.9215686274509802，并将其写入别名10将转换为25.5。

类型也将自动转换。从字符串到数字，从数字到布尔等等。取决于别名和目标的类型。

另外，可以在`common.alias`中定义写入和读取功能：

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

如果定义了转换功能，则将禁用自动转换。对于只读，可以省略写入功能，因此对于只读功能-读取功能。

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

内部转换函数具有以下参数，如下所示：

```
function read(val, type, min, max, sType, sMin, sMax) {
    // val - source value
    // type - the type of alias
    // min - minimum limit (if exists) of alias
    // max - maximum limit (if exists) of alias
    // sType - the type of "s"ource value
    // sMin - minimum limit (if exists) of source value
    // sMax - maximum limit (if exists) of source value
    return val > max ? max : (val < min ? min : val);
}
```

您作为用户必须只写带有return的行：`common.alias.read="val > max ? max : (val < min ? min : val)"`。

写入功能如下所示：

```
function write(val, type, min, max, sType, sMin, sMax) {
    // val - source value
    // type - the type of alias
    // min - minimum limit (if exists) of alias
    // max - maximum limit (if exists) of alias
    // tType - the type of target value
    // tMin - minimum limit (if exists) of target value
    // tMax - maximum limit (if exists) of target value
    return val > tMax ? tMax : (val < tMin ? tMin : val);
}
```

您作为用户必须只写带有return的行：`common.alias.write="val > tMax ? tMax : (val < tMin ? tMin : val)"`。

**仅从`js-controller >= 3.2.x`中提供`max`，`min`和`type`**

订阅将被自动管理。如果别名将被订阅，那么目标ID也将被订阅。

目标设备的ID可以动态更改（通过admin），并且订阅将更新为新的目标ID。