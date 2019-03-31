---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vcard/README.md
title: 适用于ioBroker的vCard适配器
hash: rUHMx/sduIGMe3JSK2JEegk6Z/mN1Wdwbdw1sMIrHBg=
---
![商标](../../../en/adapterref/iobroker.vcard/admin/vcard.png)

适用于ioBroker的#vCard适配器
##说明
vCard适配器的主要焦点是，替换ioBroker.fritzBox适配器输出的电话号码。

此适配器读取vCard文件，并提供以下可能性：

a）Outputs.FilteredFullNames上的名称（全名）输出。
b）在Outputs.FilteredEmailAddresses上输出电子邮件地址。
c）Outputs.FilteredPostalAddresses上的邮政地址输出。
d）Outputs.FilteredEmailAddresses上的电子邮件地址输出。
e）a）b）c）和d）的输出可以通过将搜索模式（以全名执行）设置为Inputs.Filter来触发。此过滤器工作原理不敏感。
f）如果将值设置为Inputs.ReplacePhoneNumbersChX（X：是通道编号），则此值内的所有电话号码都将替换为相应的全名。输出将写入Outputs.ReplacedPhoneNumbersChX。替换会忽略德语电话号码中的起始'0'和'+49'。 Inputs.ReplacePhoneNumbersChX可以通过脚本或直接链接手动设置。
对于直接链接，请在设置中输入相应的对象。
g）输出。今天生日显示今天有生日的任何人的全名。
h）如果一个输出有多个结果，则不同的结果由HTML换行符分隔。

_到目前为止，适配器已通过导出od“Mac contacts”和“Outlook”（vCard文件版本3.0）进行测试._

### VCF路径
* Windows：c：/data/vcard.vcf
* Linux：/tmp/vcard.vcf
* http：http：//192.168.1.1/data/vcard.vcf
* http（FritzBox Nas）：http：//192.168.1.1/nas/filelink.lua？id = 164fe89123456789

### CSS示例（固定列宽）
**样式标题：**

```
<style type="text/css">
spanVcard1 {
display: inline-block;
width: 300px;
}
</style>
```

**样式前缀：**`<spanVcard1>`

** Style Postfix：**`</spanVcard1>`

**注意：每个频道都需要自己的标签（例如spanVcard1，spanVcard2，spanVcard3，spanVcard4，spanVcard5）！**

##预先要求：
 -  [ioBroker]（http://www.ioBroker.net“ioBroker主页”）

## LOP
*通过CardDav阅读联系人

## Changelog

### 0.0.9 (2016-11-12)
* Addapter category changed 

### 0.0.8 (2016-05-27)
* Bugfixing new Channels  

### 0.0.7 (2016-05-21)
* Typos  
* Readme updated  

### 0.0.6 (2015-01-16)
* Typos  
* Readme updated  

### 0.0.5 (2015-11-15)
* Reading contacts via http updated  
* Multiple channels subscribed to one output fixed  
* CSS Example updated

### 0.0.4 (2015-11-6)  
* Missing dependency  

### 0.0.3 (2015-10-25)
* Three channels for replacing numbers
* Channels can be connected to outputs of other adapters (no script needed)
* Replaced names can be formated by CSS  
* VCF files can be read via http

### 0.0.2 (2015-10-02)
* Documentation updates
* Missing icon
* vcard-json issue with white spaces (inside Outlook files)

### 0.0.1 (2015-09-18)
* Initial version

## License
![Number of Installations](http://iobroker.live/badges/vcard-installed.svg) ![Number of Installations](http://iobroker.live/badges/vcard-stable.svg) The MIT License (MIT)

Copyright (c) 2016-2019 hometm 

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