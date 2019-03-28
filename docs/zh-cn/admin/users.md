---
title: 用户
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/admin/users.md
hash: 8jYWtumjWGf3hSM81yXLYzlD4MxMtGBFLljKoySqw5U=
---
＃页面用户
可以在此页面上创建用户和组，也可以分配组的权限。

![页面用户](../../de/admin/media/ADMIN_Benutzer_numbers.png)

左侧是现有组，右侧是用户。

可以通过简单的拖放将用户拖入组中。

## 1.）新组
单击此图标后，将打开另一个窗口：

![创建新组](../../de/admin/media/ADMIN_Benutzer_newgroup_allgemein.png)

该窗口由两个子单元组成。

###一般
以下是输入的基本内容：

**姓名**

组的名称。此名称可以自由选择，但必须是唯一的。

** ID ** ID自动填写

** **说明

可以在此字段中输入对该组任务的说明。

** **预览

自动出现并包含完整的ID sytem.group.group名称。

可以通过[+]按钮添加图标，但也可以将其拖放到窗口上。

** **彩

在那里设置颜色后，该组的图块将突出显示。

###访问权限
权限分配给组。因此，用户具有某些权限，必须将其分配给相应的组。

![该组的访问权限](../../de/admin/media/ADMIN_Benutzer_newgroup_rechte.png)

这里分配了不同任务的访问权限。

## 2.）新用户
单击此图标后，将打开另一个窗口：

![创建新用户](../../de/admin/media/ADMIN_Benutzer_newuser.png)

**姓名**

用户名。此名称可以自由选择，但必须是唯一的。

** ** ID

该ID将自动填写

** **说明

在该字段中，可以输入对用户的声明。

** **预览

自动出现并包含完整的ID sytem.group.Username。

** **密码

用户的密码

**重复密码**

为防止输入错误，必须在此处再次输入密码