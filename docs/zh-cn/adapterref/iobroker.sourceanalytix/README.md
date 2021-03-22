---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sourceanalytix/README.md
title: SourceAnalytix
hash: fcjxbDQUYMVPlqNiVtkXq1RokJv0C36kr7g4DANUvz0=
---
![NPM版本](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![资料下载](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![安装数量（最新）](http://iobroker.live/badges/sourceanalytix-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sourceanalytix-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.sourceanalytix.svg)
![NPM](https://nodei.co/npm/iobroker.sourceanalytix.png?downloads=true)

＃SourceAnalytix
[![翻译状态]（https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg）](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试与发布](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)] **此适配器使用服务[哨兵](https://sentry.io)向开发人员自动向我报告异常和代码错误以及新的设备模式。**更多详细信息，请参见下文！

详细分析您的能源，气体和液体消耗可以使用任何来源（kWh，Wh，Watt，l / h或m3）进行数据分析：

＃＃ 特征
####基本功能
|州|功能|说明|
|--|--|--|
| >设备<.cumulativeReading | [累积值]（＃cumulativeReading）|计算累计值<br/>包括[transformation]（＃valueTransformation）<br/>可以通过以下[这些步骤来更改累积值](#cumulativeReading-Reset)|
| &gt;设备&lt;。&gt;年份&lt;。&gt;当前年份| [本年度统计](#Current-Period)|在级别上存储当年的统计信息<br/>&gt;设备。&gt; currentYear &lt;。&gt;所选时间段&lt;|
| &gt;年&lt;。&gt;当前年。&gt;消费类型&lt;| [消耗](#consumptionCalculation)|根目录存储消费数据<br/>（当前值-上一个值）。<br/>可以消费或交付|
| &gt;年份&lt;。&gt;当前年份。&gt;费用类型&lt;| [费用表](#costCalculation)|用于存储成本数据的根文件夹。<br/>现值*成本+基本价格<br/>可以消费或交付|
| &gt;年份&lt;。&gt;当前年份。&gt;费用类型&lt;| [费用]（＃costCalculation）|用于存储成本数据的根文件夹。<br/>现值*成本+基本价格<br/>可以消费或交付|

所有状态位置均按状态名称分组，并以句点和[类别](#Categories)结构分隔。<br/>将自动处理计算，并将值转换为[价格定义](#Price-DefinitionsPrice-Definitions)中定义的适当单位。

如果您有任何问题，请先阅读**[故障排除](#Troubleshooting)**！

＃＃ 如何
###状态激活！ ![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)
![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

|配置项|说明|
|--|--|
|启用|激活SourceAnalytix的状态|
|别名|默认值：状态名称，如SA |中所示的设备名称 |
|选择类型|强制，请选择计算类型以根据[价格定义](#Price-Definitions)|
|选择单位|默认值：自动，如果需要，请手动选择（请参阅日志） |
|费用|成本计算|
|有（无）基本费用|包括成本计算中的基本费用|
|消费|计算消费数据|
|计数器值|存储当前计数器值|
| x的</br>处的仪表读数：|特定时期内计数器的起始值以处理</br>计算电流-startValue |

###基本配置（适配器实例）
![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

####累积阅读
> ToDo：描述逻辑<

####消费计算
> ToDo：描述逻辑<

#### CostCalculation
> ToDo：描述逻辑<

#### ValueTransformation
&gt; ToDo：指向库的文档链接（文档lib也！）<br/> &gt; ToDo：记录从瓦特到千瓦时的转换<br/>&gt; ToDo：文档单位转换（如瓦特，从Wh到KWh<br/>

####年统计
在年级别存储消费/价格和/或成本/收益的统计信息<br/>&gt;&gt;设备。&gt; thisYear &lt;。&gt; cathegory &lt;。&gt;所选时间段

此信息通常用于数据存储和历史比较。<br/>各州按指定时期进行分组（例如2020年与2021年，2019年2月矿石与2月ect等）

&gt; #### *周*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收入<br/>&gt;消费/配送&lt;.weeks。** weekNr **&lt;&gt; #### *月*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收入<br/>&gt;消费/交付&lt;.months。**月** &lt;&gt; #### *季度*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收入<br/>&gt;消费/交付&lt;。季度。** Qx** &lt;

＃＃＃＃ 现时阶段
将当前年份的统计信息存储在> device。> currentYear <。>选定的级别

&gt; #### *周*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收入<br/>&gt;消费/配送&lt;.weeks。** weekNr **&lt;&gt; #### *月*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收入<br/>&gt;消费/交付&lt;.months。**月** &lt;&gt; #### *季度*<br/> &gt;设备&lt;。&gt;年&lt;。&gt;成本/收益&gt;消耗/交付&lt;。季度。** Qx** &lt;

此信息通常用于每日/每周/每月的<br/>按指定时期分组的成本/收入和/或消耗/交付

>待办事项：添加屏幕截图<

####类别
|类别|类型说明|
|--|--|--|
|费用|财务|计算值的结果*成本价+基本价|
|收益|财务|计算值的结果*盈余价格+基本价格|
|消费|计算计算值的结果作为成本-起始值<br/>年/月/季度等信息|
|交货|计算计算值的结果作为交货-起始值<br/>年/月/季度等信息|

＃＃＃ 故障排除
在开始进行故障排除之前，了解源分析的初始化方式非常重要，因为此处可能会发生错误，请参见问题部分。
将按以下顺序处理：

1）启动SourceAnalytix 2）列出为SourceAnalytix激活的所有状态3）为每个状态初始化状态：

    *读取当前的累计读数</br>

      （如果存在）和状态中的内存值

    *检查单元是否可以处理{问题1}
    *检查是否选择了费用类型{问题2}
    *验证是否为费用类型{问题3}提供了有效的价格定义
    *检查先前的初始化值>当前的累积值{问题4}
    *检查先前设备重置的有效已知信息>当前累积值{问题5}
    *将所有数据存储到内存

4）为每个状态初始化状态：

    *创建状态累积读数（用于存储计算结果，也可以仅用于W到kWh）{问题6}
    *创建在状态配置中选择的状态{问题7}
    *开始计算

5）在状态更改/更新

    *验证信息是否正确
    *将值转换为适当的单位（状态单位转换为状态配置中选择的单位）
  *检查值输入是否正确（当前值**> ** previousInit值）{请参阅** 7设备复位时**问题8}
    *计算{问题9}
      *对于瓦特：计算瓦特到kWh，计算cumulatedReading = currentReading + cumulatedReading
      *对于其他：计算cumulatedReading = currentReading + previousDeviceReset（如果存在）

6）晚上（00.00）

    *列出所有启用了SourceAnalytix的状态
    *重置开始（日/周/年/月）值

7）重置设备时

    *将当前值存储为previousDeviceReset和previousInit值</br>

如果设备将再次被重置（通过previousInit值检测到），则将<br> currentReading + previousDeviceReset与previousDeviceReset一样存储。

**问题1 **没有为.....定义单位，无法执行计算</br>请在状态设置中选择正确的单位

**问题2 **尚未为.....定义费用类型，请在状态设置中选择计算类型</br>。请选择所需的费用类型，以了解应使用多少金额进行计算

**问题3 **所选类型...在价格定义中不存在</br> </br>现在，已找到所选成本类型的价格定义，请验证您的价格设置（自适应配置）

**问题4 **检查.....的设置！已知的初始值：.....>已知的累积值.....无法继续</br>已知的初始值>已知的累积值，可以通过在状态原始对象中删除或修改这些对象来解决

```"valueAtDeviceInit": xxxx```

**问题5 ** .....已知valueAtDeviceReset：.....>已知累积值.....无法进行处理</br>已知init值>已知累积值，可以解决</br>在状态原始对象中删除或修改这些对象

```valueAtDeviceReset": xxxx```

**问题6 **未创建用于累计读取的状态</br>状态初始化失败，请参见问题1至5

**问题7 **未创建费用读数的状态</br>状态设置![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)中未启用计算类型

###价格定义![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)
**问题8 **当前值** <** previousInit </ br>检测到设备复位，请参见功能7

**问题9 **我的计算不正确</br>

#### CumulativeReading-Reset 1）验证是否选择了正确的单位（未选择，SA将尝试自动检测）2）验证cumulatedReading是否反映了您的数值读数的正确总值，否则
        -停止SA
        -转到标签对象

          ![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

        -进入专家模式
        -更改累积读数
        -退出专家模式
        -确保正确设置起始值
        -启动SA </br>

3）确保正确设置起始值</br>SA通过cumulatedReading-周期开始时的已知cumulatedReading处理计算。<b/>这些起始值在状态设置中定义，并且应小于** currentReading **</b></br><b/>请确保累积读数&gt; = DayStart&gt; = WeekStart&gt; = MonthStart&gt; = QuarterStart&gt; = YearStart![主要设定](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)</b>

4）验证状态原始对象中的这些值：

```valueAtDeviceReset": xxx```

```"valueAtDeviceInit": xxx```

<！-**问题6 **设置-无法停用SourceAnalytix的状态

Im RAW NUR“消费”：false umgestellt，gespeichert。 Das wurde behalten（wo ggf. noch nicht false，auch bei“ enabled”：错误和bei“ costs”：false）在derObjekt-Übersichtist derschraubenschlüsselnachwievor blau。位于美国达斯·奥贝耶特（Das Objekt）的Dann mit demSchraubenschlüssel，战争发生在德黑肯（Ahtiv bei aktiviert drin）。 Dort einmal auf aktiviert，nicht speichern，wieder auf deaktiviert，speichern。
Kontrolle im RAW，ob SA-EIntrag修女=> jup，是修女->

<!--

*跟踪每天，每周，每月，每季度，每年的消耗量
*计算成本（当前价格是可配置的）
*可用于功耗，液体和气体
*输入值可以是wh / kWh / Watt / m3 / l

-->

此适配器的起源归功于pix早在2016年https://forum.iobroker.net/viewtopic.php?f=21&t=2262

@hadering对此进行了改进，并发布在github https://github.com/hdering/homematic_verbrauchszaehler

＃＃ 去做
* []文档！
* []期间计算可选，但尚未实施
* []尚未在计算中实施的每月费用价格
* []根据仪表值重新计算（可按日期配置）
* []添加可在适配器设置中配置的前[x]天，[x]周，[x]月，[x]季度，[x]年的对象状态

＃＃ 支持我
如果您喜欢我的工作，请考虑个人捐赠（这是DutchmanNL的个人捐赠链接，与ioBroker项目无关！）[![捐赠]（https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png）](http://paypal.me/DutchmanNL)

##什么是Sentry.io，什么报告给该公司的服务器？
Sentry.io是一项服务，供开发人员从其应用程序中获取有关错误的概述。正是在此适配器中实现了这一点。

当适配器崩溃或发生其他代码错误时，此错误消息（也出现在ioBroker日志中）将提交给Sentry。当您允许iobroker GmbH收集诊断数据时，还将包括您的安装ID（这是唯一ID，**没有**有关您的任何其他信息，电子邮件，姓名等）。这使Sentry可以对错误进行分组，并显示有多少唯一用户受此错误影响。所有这些都帮助我提供了基本上不会崩溃的无错误适配器。

<！-下一个版本的占位符（在该行的开头）：

### __正在进行的工程__->

## Changelog
### 0.4.8 (2021-01-20)
#### Breaking changes
* (DutchmanNL) Breaking!!! Move current values to currentYear [#135](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/135)
* (DutchmanNL & ToTXR4Y) MajorChange !: Replaced **Current_Reading** with **CumulativeReading** [226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)

#### New Features
* (DutchmanNL) Code cleanup
* (DutchmanNL) Add back "currentYear"
* (DutchmanNL) (debug) Logging improved
* (DutchmanNL) Weekly reset of weekdays
* (DutchmanNL) Calculation for all states
* (DutchmanNL) change default log-level to info
* (DutchmanNL) Calculation for previous states [#242](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/242)
* (DutchmanNL) Optimized error reporting (Sentry)
* (DutchmanNL) Removed unneeded settings in configuration
* (DutchmanNL) Implemented new configuration for "currentYear"
* (DutchmanNL & ToTXR4Y) implement "05_currentYear" in year root folder [#280](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/280)
* (DutchmanNL) Implemented category cumulative values under year statistics
* (DutchmanNL & ToTXR4Y) implement cached memory slot for initialisation value [#226](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/226)
* (DutchmanNL & ToTXR4Y) Implement log messages if state attributes are changed
* (DutchmanNL & ToTXR4Y) Implement automatically detection of currency from admin settings [#247](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/247)

#### BugFixes
* (DutchmanNL) Bugfix : dev: 0 bug workaround
* (DutchmanNL) Do not round cumulated reading
* (DutchmanNL) Bugfix : delete states in create function
* (DutchmanNL) Bugfix : quarters.1 has no existing object
* (DutchmanNL) Bugfix : Calculations for "previous" values
* (DutchmanNL) Bugfix : Incorrect initialisation for states
* (DutchmanNL) Bugfix : Avoid NULL & 0 values at night reset
* (DutchmanNL) Bugfix : 05_currentYear has no existing object
* (DutchmanNL) Bugfix : Avoid calculation of non-Initialised states
* (DutchmanNL) Bugfix : Cannot read property 'stateDetails' of null
* (DutchmanNL) Correct error handling of "Watt" state initialisation
* (DutchmanNL) Bugfix : Ensure a proper reset and init of Watt values
* (DutchmanNL) Bugfix : Avoid loop if init value is set and > reading
* (DutchmanNL) Bugfix : Caught sentry error : Alias xxxxx has no target
* (DutchmanNL & ToTXR4Y) Bugfix : Rebuild calculation logic which solves :
  * Watt values : Ensure proper reading start (0 instead of current watt value)
    Watt values : Ensure proper reading calculation with exponent (0 instead of current watt value) [#281](https://github.com/DrozmotiX/ioBroker.sourceanalytix/issues/281)
  * All calculations : correct handling  of device reset (if value is reset or 0)
* (DutchmanNL) Bugfix : Incorrect initialisation for Watt values with 0 input
* (DutchmanNL) Bugfix : Only create cumulatedXXX in year statistics if activated
* (DutchmanNL) Bugfix : Incorrect warn message if configuration for objects is changed
* (DutchmanNL) Bugfix : Error {Is not a number, cannot continue calculation} if value =  0
* (DutchmanNL) Bugfix : Throw error if value is NULL for troubleshooting instead of handling incorrect calculation
* (DutchmanNL) Bugfix : Ensure daily reset does not destroy cumulative memory value (Fixes NULL values for Watt after night reset)


### 0.4.7 (2020-09-15) Solved NULL error's & daily resets
* (DutchmanNL) Implement Sentry
* (DutchmanNL) Implement configuration for Price definitions
* (DutchmanNL) Bugfix: NULL value issue  at daily reset
* (DutchmanNL) Bugfix: Issue found in selection of category
* (DutchmanNL) Bugfix: Category issue (read value of undefined)
* (DutchmanNL) Bugfix: Issue in storing meter values by month
* (DutchmanNL) Bugfix: Wrong reading value for Watt initialisation
* (DutchmanNL) Bugfix: Warnings at object creations (js-controller 3.x)
* (DutchmanNL) Bugfix: wrong interpretation of start values at value resets
* (DutchmanNL) Bugfix: Proper error message instead of code crash if no cost type defined
* (DutchmanNL) Add device name for log messages if device value < than currently known value
* (DutchmanNL) Bugfix : Crash at adapter start if chosen Type is not present in instance configuration    

### 0.4.2 (2020-04-12) BugFixes
* (DutchmanNL) Translations updated
* (DutchmanNL) Bugfix : Values do not reset at new day start
* (DutchmanNL) Bugfix : Handle calculations when reading = 0
* (DutchmanNL) Bugfix : Handle calculations at initialisation
* (DutchmanNL) Bugfix : Pause all calculation during day-reset
* (DutchmanNL) Do not calculate values is state is update with same value as previous

### 0.4.0 (2020-04-05) Adapter completely redesigned, please test carefully
* (DutchmanNL) Complete code rebuild
* (DutchmanNL) Change data points to root by year
* (DutchmanNL) Delete unneeded states automatically
* (DutchmanNL) Calculation by quarter implemented
* (DutchmanNL) Storage of meter values implemented
* (DutchmanNL) Rebuild calculation logic to handle in memory instead of object DB (performance)

### 0.3.0   
* (DutchmanNL) m³ Implemented

### 0.2.5
* (xXBJXx) Fix wrong storage of start meter values

### 0.2.41
* (DutchmanNL) Fix wrong storage of daily reset of meter values

### 0.2.3
* (Xoroles & DutchmanNL) fix watt calculation, thank you @Xoroles !

### 0.2.29
* (DutchmanNL) implemented w to kWh calculations :) with thanks to @AlCalzone and @andiling !

### 0.2.276
* (DutchmanNL) implemented meter readings
* (DutchmanNL & @AlCalzone) code improvements & stability
* (DutchmanNL) fix issue with liquid unit reading (m3)

### 0.2.273
* (DutchmanNL) fix issue in daily reset of start values
* (DutchmanNL) Fix badges in readme
* (DutchmanNL) exclude calculations of w from current routines (will be implemented in next version(s)

### 0.2.272
* (DutchmanNL) change logic of initialisation
* (DutchmanNL) fix issue in calculation handling
* (DutchmanNL) extract unit definition to central function
* (DutchmanNL) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (DutchmanNL) implement compact mode
* (DutchmanNL) fix testing issues
* (DutchmanNL) fix error "unit" or "tolowercase" is undefind
* (DutchmanNL) fixed installation issues

### 0.2.27
* (DutchmanNL) fixed issue related to multihost installations with slave as target

### 0.2.26
* (DutchmanNL) fixed issue in calculations for gas environments and liquids
* (DutchmanNL) improve logging related to issue analytics

### 0.2.25
* (DutchmanNL) add option in state setting to automatically OR manually choose the meassurement unit (for cases device state does not have correct value)

### 0.2.24
* (DutchmanNL) add support for heating pumps
* (DutchmanNL) improvements in adapter configuration screen

### 0.2.2
* (DutchmanNL) fixed reset of start values
* (DutchmanNL) removed uneeded logging "Write calculations for : "
* (DutchmanNL) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise onlyu erros will be shown and add/del devices
* (DutchmanNL) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (DutchmanNL) small fixed in configuration screen to show logging options

### 0.2.1
* (DutchmanNL) fixed "current_day" missing in object tree
* (DutchmanNL) fixed log messages "removed from SourceAnalytix"
* (DutchmanNL) fixed unit issue to support upper and lower case in values
* (DutchmanNL) fixed unit issue replace strange characters
* (DutchmanNL) remove intervall setting from configuraiton screen (handle by state subscribtion now!)
* (DutchmanNL) remove start meassurement from state configuraiton screen (not need, please use day start, week start etc !)

### 0.2.0
* (DutchmanNL) rebuild logic to calculate values (beta testing)
* (DutchmanNL) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (DutchmanNL) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (DutchmanNL) fixed issue incorrect states are added to monitoring
* (DutchmanNL) fixed issue calculation not stopped when state removed from monitoring
* (DutchmanNL) always store all current meassurements to values of cathegorie regardless setting year etc
* (DutchmanNL) code cleanup and optiomalisation
* (DutchmanNL) added logging option "satus notification"
* (DutchmanNL) implement new translation mechanisme


### 0.1.9 
* (DutchmanNL) Adapter moved to community development tree
* (DutchmanNL) added npm version and test-status to readme
* (DutchmanNL) finalized new konfiguration screen & translations
* (DutchmanNL) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (DutchmanNL) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (DutchmanNL) added options to year analytics to choose values (days,weeks,years etc)
* (DutchmanNL) option added for Developer logging
* (DutchmanNL) Basic price is currently not considered in cost calculations !
* (DutchmanNL) Values day start, week start etc are currenlty not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (DutchmanNL) konfiguration pages completly redesigned : Please do not enter values yet !
* (DutchmanNL) master konfiguration added to globally define costs
* (DutchmanNL) intervall settings moved to global setting instead of each state seperated
* (DutchmanNL) instead of cost-price in each state use drop down menu to choose values from global settings
* (DutchmanNL) fixed naming and translations

### 0.1.6
* (DutchmanNL) fixed data reset for quarter values (thank you Jens !)
* (DutchmanNL) fixed usage of alias
* (DutchmanNL) fixeded issue in calculation of earnings and delivery
* (DutchmanNL) logging improvement
* (DutchmanNL) fixed log messages
* (DutchmanNL) calculation for m3 values
* (DutchmanNL) calculation for l values

### 0.1.5
* (DutchmanNL) improved state write logic, only sent write commando when needed

### 0.1.3
* (DutchmanNL) add support for calculation of Wh values

### 0.1.0
* (DutchmanNL) first public beta release
* (DutchmanNL) fixed translations
* (DutchmanNL) rebuild calculation logic
* (DutchmanNL) fixed calculation of start offset
* (DutchmanNL) adjustable if state is used for cosumption or delivery
* (DutchmanNL) limited possible logging to kWh only for this moment
* (DutchmanNL) only create states and channels for logging types selected

### 0.0.9
* (DutchmanNL) fixed wrong calculation of start values
* (DutchmanNL) fixed wrong calculation of quarter values
* (DutchmanNL) prepare public beta and travis testing
* (DutchmanNL) change name to SourceAnalytix
* (DutchmanNL) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (DutchmanNL) configurable unit for every state, automatically from object state. currently only kWh supported !

### 0.0.8
* (DutchmanNL) configurable intervall for every state

### 0.0.7
* (DutchmanNL) automated reset of start values

### 0.0.6
* (DutchmanNL) fixed issue with travis build
* (DutchmanNL) fixed wrong information in package-json

### 0.0.4
* (DutchmanNL) cost calculation
* (DutchmanNL) adjustable starting point of meassurement
* (DutchmanNL) support of multiple device states instead of 1
* (DutchmanNL) fixed calculation of current consumptions

### 0.0.3
* (DutchmanNL) code optimalisation

### 0.0.2
* (DutchmanNL) creation of object structure
* (DutchmanNL) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL

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