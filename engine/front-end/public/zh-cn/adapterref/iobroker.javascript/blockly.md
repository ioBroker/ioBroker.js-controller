---
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/iobroker/ioBroker.javascript/edit/master//blockly.md
title: 脚本引擎
hash: M7GQwgI497RpKFJcBY1bHyu/mjr8k/IJkPAMV3ynyG8=
adapter: true
license: MIT
authors: bluefox <dogafox@gmail.com>, hobbyquaker <hq@ccu.io>, Apollon77 <ingo@fischer-ka.de>, AlCalzone
description: Javascript/Blockly Script Engine for ioBroker
keywords: js, javascript, typescript, coffeescript, rules, automate, scriptengine, blockly, blokly
readme: https://github.com/iobroker/ioBroker.javascript/blob/master/README.md
mode: daemon
materialize: true
compact: true
published: 2015-01-02T23:37:49.644Z
version: 4.1.12
---
#Content
- [描述](#beschreibung)
- [入门](#getting-started)
    - [例1](#beispiel-1)
    - [例2](#beispiel-2)
    - [例3](#beispiel-3)
- [块](#blocks)
    - [系统块](#systemblöcke)
        - [调试输出](#debug-ausgabe)
        - [评论](#kommentar)
        - [控制状态](#steuere-state)
        - [更新状态](#aktualisiere-state)
        - [绑定州](#bind-states)
        - [写州](#write-states)
        - [创建状态](#create-state)
        - [获得国家的价值](#get-value-of-state)
        - [获取对象ID](#get-object-id)
    - [动作块](#aktionsblöcke)
        - [执行命令](#exec---kommando)
        - [请求网址](#request-url)
    - [SendTo块](#sendTo-blöcke)
        - [发送电报](#send-to-telegram)
        - [发送给SayIt](#send-to-sayit)
        - [发送到pushover](#send-to-pushover)
        - [发送邮件](#send-email)
        - [自定义sendTo块](#custom-sendto-block)
    - [日期和时间块](#datum-und-zeit-blöcke)
        - [时间比较](#time-comparision)
        - [实际时间比较](#actual-time-comparision)
        - [获取特定格式的实际时间](#get-actual-time-im-specific-format)
        - [获取今天的astro活动时间](#get-time-of-astro-events-for-today)
    - [转换块](#convert-blocks)
        - [转换为数字](convert-to-number)
        - [转换为布尔值](convert-to-boolean)
        - [获取变量的类型](get-type-of-variable)
        - [转换为日期/时间对象](convert-to-datetime-object)
        - [将日期/时间对象转换为字符串](convert-datetime-object-to-string)
        - [将JSON转换为对象](convert-json-to-object)
        - [将对象转换为JSON](convert-object-to-json)
    - [触发](#trigger)
        - [触发状态改变](#trigger-on-states-change)
        - [触发状态变化](#trigger-on-state-change)
        - [触发信息](#trigger-info)
        - [时间表](#schedule)
        - [触发astro事件](#trigger-on-astro-event)
        - [命名时间表](#named-schedule)
        - [时间安排清晰](#clear-schedule)
        - [CRON对话框](#cron-dialog)
        - [CRON规则](#cron-rule)
    - [超时](#timeouts)
        - [延迟执行](#delayed-execution)
        - [清除延迟执行](#clear-delayed-execution)
        - [按间隔执行](#execution-by-interval)
        - [按间隔停止执行](#stop-execution-by-interval)
    - [逻辑](#logic)
        - [如果是阻止](#if-else-block)
        - [比较块](#comparision-block)
        - [逻辑AND / OR块](#logical-and-or-block)
        - [否定块](#negation-block)
        - [逻辑值TRUE / FALSE](#logical-value-true-false)
        - [零块](#null-block)
        - [试块](#test-block)
    - [循环](#loops)
        - [重复N次](#repeat-n-times)
        - [重复一遍](#repeat-while)
        - [算](#count)
        - [对于每一个](#for-each)
        - [打破循环](#break-out-of-loop)
    - [数学](#math)
        - [数值](#number-value)
        - [算术运算+  -  \ * / ^](#arithmetical-operations--)
        - [平方根，Abs， - ，ln，log10，e ^，10 ^](#square-root-abs---ln-log10-e-10)
        - [罪，cos，棕褐色，asin，acos，atan](#sin-cos-tan-asin-acos-atan)
        - [数学常数：pi，e，phi，sqrt（2），sqrt（1/2），无穷大](#math-constants-pi-e-phi-sqrt2-sqrt12-infinity)
        - [是偶数，奇数，素数，整数，正数，负数，是否可分](#is-even-odd-prime-whole-positive-negative-divisibly-by)
        - [通过值加或减可变地修改](#modify-variably-by-value-plus-or-minus)
        - [圆形，地板，ceil值](#round-floor-ceil-value)
        - [值列表上的操作：总和，最小值，最大值，平均值，中值，模式，偏差，随机项](#operations-on-the-list-of-values-sum-min-max-average-median-modes-deviation-random-item)
        - [系数](#modulus)
        - [以min和max限制某些值](#limit-some-value-by-min-and-max)
        - [随机值从0到1](#random-value-from-0-to-1)
        - [最小值和最大值之间的随机值](#random-value-between-min-and-max)
    - [文本](#text)
        - [字符串值](#string-value)
        - [连接字符串](#concatenate-strings)
        - [将字符串附加到变量](#append-string-to-variable)
        - [字符串长度](#length-of-string)
        - [字符串为空](#is-string-empty)
        - [在字符串中查找位置](#find-position-in-string)
        - [在特定位置的字符串中获取符号](#get-symbol-in-string-on-specific-position)
        - [获取子字符串](#get-substring)
        - [转换为大写或小写](#Convert-to-upper-case-or-to-lower-case)
        - [修剪字符串](#trim-string)
    - [清单](#lists)
        - [创建空列表](#create-empty-list)
        - [使用值创建列表](#create-list-with-values)
        - [创建具有相同值N次的列表](#create-list-with-same-value-n-times)
        - [获取列表的长度](#get-length-of-list)
        - [列表是空的](#is-list-empty)
        - [在列表中查找项目的位置](#Find-position-of-item-in-list)
        - [获取列表中的项目](#get-item-in-list)
        - [在列表中设置项目](#set-item-in-list)
        - [获取列表的子列表](#get-sublist-of-list)
        - [将文本转换为列表，反之亦然](#convert-text-to-list-and-vice-versa)
    - [颜色](#colour)
        - [颜色值](#colour-value)
        - [随机颜色](#random-colour)
        - [RGB颜色](#rgb-colour)
        - [混合颜色](#mix-colours)
    - [变量](#variables)
        - [设置变量的值](#set-variables-value)
        - [获取变量的值](#get-variables-value)
    - [功能](#functions)
        - [从没有返回值的块创建函数](#create-function-from-blocks-with-no-return-value)
        - [从具有返回值的块创建函数](#create-function-from-blocks-with-return-value)
        - [函数返回值](#return-value-in-function)
        - [创建没有返回值的自定义函数](#create-custom-function-with-no-return-value)
        - [使用返回值创建自定义函数](#create-custom-function-with-return-value)
        - [通话功能](#call-function)

＆NBSP;

＃说明Blockly是一个图形编辑器，允许用户通过合并块来创建脚本。
它是为没有编程计算机经验的用户开发的。
＆NBSP;

＃入门
##例1
**更改另一个数据点时更改数据点的状态**

![入门1](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_1_de.png)

这是将数据点更改为其他内容的经典示例。

这里，当检测到移动或没有移动时，灯打开或关闭。

首先插入块“Triggers => If object”。选择对象ID以使用对象的状态作为此脚本的触发器。

添加另一个块 - “System => Control”，然后在对话框中选择应由触发器更改的另一个状态。

在此控制块中插入一个块“System =>对象ID的值”，并在对话框中选择对象“Motion”，将其状态写入“Light”：

**触发块有一个特殊的变量“value”。这总是在这里定义，可以用于不同的目的。它包含触发对象的当前值，因此您可以使用块“Variable => Object ID”创建更简单的脚本，并将其重命名为“Value”。**

![入门1](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_1_2_de.png)

＆NBSP;导入示例：

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="s7s**k+Cc_KjDnJW`(h~" x="12" y="63">
    <field name="COMMENT">Switch light ON or OFF it motion detected or IDLE</field>
    <next>
      <block type="on_ext" id="#}:B(M-o5:/]k,_msr%y">
        <mutation items="1"></mutation>
        <field name="CONDITION">ne</field>
        <field name="ACK_CONDITION"></field>
        <value name="OID0">
          <shadow type="field_oid" id="o~6)!C0IVy{WD%Km(lkc">
            <field name="oid">javascript.0.Motion</field>
          </shadow>
        </value>
        <statement name="STATEMENT">
          <block type="control" id="(ZqzhS_7*jGpk;`zJAZg">
            <mutation delay_input="false"></mutation>
            <field name="OID">javascript.0.Light</field>
            <field name="WITH_DELAY">FALSE</field>
            <value name="VALUE">
              <block type="get_value" id="a-E@UcwER=knNljh@:M/">
                <field name="ATTR">val</field>
                <field name="OID">javascript.0.Motion</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

##示例2 **如果10分钟没有移动，请在移动时打开和关闭灯。**
![入门2](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_2_de.png)

如果使用值“true”更新状态“Motion”，请执行以下操作：

 - 打开“灯”
 - 开始延迟10分钟以关闭“灯”并删除此数据点的所有先前延迟。

如您所见，“延迟延迟”标志由最后一个命令清除。这将删除此数据点的所有计时器并启动新计时器

＆NBSP;导入示例：

<！ - ```xml <xml xmlns =“http://www.w3.org/1999/xhtml”> - > <block type =“comment”id =“s7s ** k + Cc_KjDnJW`（h 〜“x =”112“y =”63“> <field name =”COMMENT“>在IDLE的10分钟内开灯和关灯</ field> <next> <block type =”on_ext“id =”＃} ：B（M-o5：/] k，_ msr％y“> <mutation items =”1“> </ mutation> <field name =”CONDITION“> true </ field> <field name =”ACK_CONDITION“> true </ field> <value name =“OID0”> <shadow type =“field_oid”id =“o~6）！C0IVy {WD％Km（lkc”> <field name =“oid”> javascript.0.Motion < / field> </ shadow> </ value> <statement name =“STATEMENT”> <block type =“control”id =“（ZqzhS_7 * jGpk;`zJAZg”> <mutation delay_input =“false”> </ mutation> <field name =“OID”> javascript.0.Light </ field> <field name =“WITH_DELAY”> FALSE </ field> <value name =“VALUE”> <block type =“logic_boolean”id =“％^ ADwe * 2l0tLw8Ga5F * Y“> <field name =”BOOL“> TRUE </ field> </ block> </ value> <next> <block type =”control“id =”=] vmzp6j ^ V9：3？R ？2Y，x“> <mutation delay_input =”true“> </ mutation> <field name =”OID“> javascript.0.Light </ field> <field name =”WITH_DELAY“> TR UE </ field> <field name =“DELAY_MS”> 600000 </ field> <field name =“CLEAR_RUNNING”> TRUE </ field> <value name =“VALUE”> <block type =“logic_boolean”id =“！ ; DiIh，D] l1oN {D; skYl“> <field name =”BOOL“> FALSE </ field> </ block> </ value> </ block> </ next> </ block> </ statement> < / block> </ next> </ block> </ xml>

```


&nbsp;
## Beispiel 3
**Verschicke eine eMail wenn die Außentemperatur höher als 25 Grad Celsius ist.**

![Getting started 3](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_3_de.png)

Erklärung:

Zuerst müssen wir eine Variable definieren um zu speichern, dass die eMail für den aktuellen Temperaturalarm bereits gesendet wurde und diese Variable auf "falsch" setzen.
Dann beobachten wir die Veränderungen der Temperatur. Wir könnten dieses Skript auch periodisch ausführen, aber das ist nicht so effektiv.

Wenn sich die Temperatur ändert vergleichen wir den aktuellen Wert mit 25 und prüfen ob die eMail bereits verschickt wurde oder nicht.
Wenn die eMail noch nicht versendet war, speichern wir dass wir sie jetzt senden und senden sie auch. Natürlich muss der eMail-Adapter vorher installiert und konfiguriert worden sein.

Wenn die Temperatur unter 23 Grad fällt setzen wir die Variable "emailSent" zurück, damit beim nächsten Temperaturalarm wieder eine eMail gesendet wird.
Dazu wird die aktuelle Temperatur mit 23 verglichen und es werden keine eMails geschickt, solange die Temperatur um 25 Grad schwankt.

Um den "falls ... sonst falls ..." Block zu erstellen klickt man auf das Zahnrad und fügt die zusätzlich benötigten Elemente dem "falls" Block hinzu.

![Getting started 3](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_3_1_de.png)

Man kann zu jedem Block einen Kommentar hinterlegen, indem man "Kommentar hinzufügen" im Kontextmenü des Blocks anklickt. Diesen Kommentar kann man später durch anklicken des Fragezeichens ansehen.

![Getting started 3](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_3_2_de.png)

Man kann größere Blöcke einklappen um eine bessere Übersicht zu erhalten, indem man im Kontextmenü den Punkt "Block einklappen" auswählt.

![Getting started 3](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/getting_started_3_3_de.png)


&nbsp;
Beispiel zum importieren:

```xml
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="r53:ZiP]3DYe;Ly;@!v5" x="87" y="13">
    <field name="COMMENT"> Send email if outside temperature is more than 25 grad Celsius.</field>
    <next>
      <block type="variables_set" id="oyEg!Z7~qid+!HYECD8C">
        <field name="VAR">emailSent</field>
        <value name="VALUE">
          <block type="logic_boolean" id="gakxd?9T354S1#_(=)%K">
            <field name="BOOL">FALSE</field>
          </block>
        </value>
        <next>
          <block type="on_ext" id="DR}w0I%EUL-FCI%`w5L4">
            <mutation items="1"></mutation>
            <field name="CONDITION">ne</field>
            <field name="ACK_CONDITION">true</field>
            <value name="OID0">
              <shadow type="field_oid" id="}TdS?2Lg~Mt[0!o0iMG.">
                <field name="oid">javascript.0.Outside_temperature</field>
              </shadow>
            </value>
            <statement name="STATEMENT">
              <block type="controls_if" id="rBBI(VLLLRnwd|ys59si">
                <mutation elseif="1"></mutation>
                <value name="IF0">
                  <block type="logic_operation" id="B5R%#,6F,xYI1gB!jjq|">
                    <field name="OP">AND</field>
                    <value name="A">
                      <block type="logic_compare" id="I=R,TaB*pge*l#j|[HZ0">
                        <field name="OP">EQ</field>
                        <value name="A">
                          <block type="variables_get" id="wd1I0gzqle,y-:h@GF)v">
                            <field name="VAR">emailSent</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="logic_boolean" id="q5~/ZIb))r`w]/RaSXUu">
                            <field name="BOOL">FALSE</field>
                          </block>
                        </value>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO0">
                  <block type="variables_set" id="i):z[{@|*;4zOruzXH46">
                    <field name="VAR">emailSent</field>
                    <comment pinned="false" h="80" w="160">Remember, that email was sent</comment>
                    <value name="VALUE">
                      <block type="logic_boolean" id="56A@]MZKiuL(iuuj)MRI">
                        <field name="BOOL">FALSE</field>
                      </block>
                    </value>
                    <next>
                      <block type="email" id="3J#TXZ`oei_NMEL,_w8K">
                        <field name="INSTANCE"></field>
                        <field name="IS_HTML">FALSE</field>
                        <field name="LOG">log</field>
                        <value name="TO">
                          <shadow type="text" id="j*x?kanQQyGH/pN,r9B2">
                            <field name="TEXT">myaddress@domain.com</field>
                          </shadow>
                        </value>
                        <value name="TEXT">
                          <shadow type="text" id="QE(T_Z]{=o8~h~+vz!ZU">
                            <field name="TEXT">Temperature is over 25°C</field>
                          </shadow>
                        </value>
                        <value name="SUBJECT">
                          <shadow type="text" id="/_AxN7@=T|t@XW.^Fu1(">
                            <field name="TEXT">Temperature alert</field>
                          </shadow>
                        </value>
                      </block>
                    </next>
                  </block>
                </statement>
                <value name="IF1">
                  <block type="logic_compare" id="S?0|;{3V3!_rqUk]GJ4)">
                    <field name="OP">LT</field>
                    <value name="A">
                      <block type="variables_get" id="IJwq1,|y;l7ueg1mF{~x">
                        <field name="VAR">value</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="math_number" id="m(.v?M3ezTKz(kf5b9ZE">
                        <field name="NUM">23</field>
                      </block>
                    </value>
                  </block>
                </value>
                <statement name="DO1">
                  <block type="variables_set" id="M0{G}QBtF!FYrT,xWBnV">
                    <field name="VAR">emailSent</field>
                    <value name="VALUE">
                      <block type="logic_boolean" id="ti#H=_:;-XRC%CzR/+/0">
                        <field name="BOOL">FALSE</field>
                      </block>
                    </value>
                  </block>
                </statement>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

＆NBSP;

＃块
##系统块
###调试输出
![调试输出](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_debug_en.png)

除了在日志中写入一行之外，此块无关紧要。您可以使用它来调试脚本，如下所示：

![调试输出](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_debug_1_en.png)

＆NBSP;导入示例：

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="K|2AnJ|5})RoNZ1T%Hh#" x="38" y="13">
    <field name="COMMENT">Print time into log every second</field>
    <next>
      <block type="timeouts_setinterval" id="LNsHTl,!r6eR8J9Yg,Xn">
        <field name="NAME">interval</field>
        <field name="INTERVAL">1000</field>
        <statement name="STATEMENT">
          <block type="debug" id=".oLS7P_oFU0%PWocRlYp">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="X^Z/.qUry9B5Rr#N`)Oy">
                <field name="TEXT">test</field>
              </shadow>
              <block type="time_get" id="TPo6nim+=TBb-pnKMkRp">
                <mutation format="false" language="false"></mutation>
                <field name="OPTION">hh:mm:ss</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

您可以定义4种不同的消息严重性级别：

 -  debug（必须激活javascript实例的调试级别。）
 -  info（默认情况下，至少必须在javascript实例上启用信息日志级别）
 - 警告
 - 错误（总是显示，如果在javascript实例中相应设置，则可以忽略其他级别）

＆NBSP;

###评论![评论](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_comment_en.png)
在脚本中添加注释以便以后了解它。

该块无关紧要，只是一个评论。

＆NBSP;

###控制状态![控制状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_control_en.png)
您可以通过两种不同的方式编写状态：

 - 控制某些内容并将值发送到硬件（此块）
仅为信息写一个新值，例如温度变化（[下一个街区](#update-state)）

＆NBSP;该块的典型应用：

![控制状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_control_sample1_en.png)

在对话框中选择对象ID，必须指定要发送的值。根据数据点的类型，值可以是[string]（＃string-value），[number]（＃number-value）或[boolean](#ogical-value-trueflase)类型。

进一步的解释可以在[这里](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses)中找到。

该块将命令写入数据点（ack = false）。此外，可以指定延迟。
如果延迟不为0，则不会立即设置状态，而是仅在指定时间后的毫秒内设置。

您可以通过选中复选框来删除此数据点的所有其他延迟。

因此，在以下示例中，数据点“light”仅切换一次（2秒后）：![控制状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_control_1_en.png)

＆NBSP;导入示例：

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="K|2AnJ|5})RoNZ1T%Hh#" x="38" y="13">
    <field name="COMMENT">Will be executed only once</field>
    <next>
      <block type="control" id="IWceY@BFn9/Y?Ez^b(_-">
        <mutation delay_input="true"></mutation>
        <field name="OID">javascript.0.Light</field>
        <field name="WITH_DELAY">TRUE</field>
        <field name="DELAY_MS">1000</field>
        <field name="CLEAR_RUNNING">FALSE</field>
        <value name="VALUE">
          <block type="logic_boolean" id="I/LUv5/AknHr#[{{qd-@">
            <field name="BOOL">TRUE</field>
          </block>
        </value>
        <next>
          <block type="control" id=".Ih(K(P)SFApUP0)/K7,">
            <mutation delay_input="true"></mutation>
            <field name="OID">javascript.0.Light</field>
            <field name="WITH_DELAY">TRUE</field>
            <field name="DELAY_MS">2000</field>
            <field name="CLEAR_RUNNING">TRUE</field>
            <value name="VALUE">
              <block type="logic_boolean" id="B?)bgD[JZoNL;enJQ4M.">
                <field name="BOOL">TRUE</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

与前面的示例相反，在下面的示例中（1秒后和2秒后），“light”的状态被切换两次：![控制状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_control_2_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="K|2AnJ|5})RoNZ1T%Hh#" x="38" y="13">
    <field name="COMMENT">Will be executed twice</field>
    <next>
      <block type="control" id="IWceY@BFn9/Y?Ez^b(_-">
        <mutation delay_input="true"></mutation>
        <field name="OID">javascript.0.Light</field>
        <field name="WITH_DELAY">TRUE</field>
        <field name="DELAY_MS">1000</field>
        <field name="CLEAR_RUNNING">FALSE</field>
        <value name="VALUE">
          <block type="logic_boolean" id="I/LUv5/AknHr#[{{qd-@">
            <field name="BOOL">TRUE</field>
          </block>
        </value>
        <next>
          <block type="control" id=".Ih(K(P)SFApUP0)/K7,">
            <mutation delay_input="true"></mutation>
            <field name="OID">javascript.0.Light</field>
            <field name="WITH_DELAY">TRUE</field>
            <field name="DELAY_MS">2000</field>
            <field name="CLEAR_RUNNING">FALSE</field>
            <value name="VALUE">
              <block type="logic_boolean" id="B?)bgD[JZoNL;enJQ4M.">
                <field name="BOOL">FALSE</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

###更新状态![更新状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_update_en.png)
此块类似于[控制块](#steuere-state)，但它仅设置当前值。没有命令发送来控制硬件。

该块的典型应用：

![更新状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_update_sample_en.png)

＆NBSP;

### BindStates![绑定状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_bind_en.png)
该块将两个状态绑定在一起。

您可以对这些块执行相同的操作：

![绑定状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_bind_1_en.png)

您可以选择仅在源更改时还是每次更新时转发值。

＆NBSP;导入示例：

```xml 
<block xmlns="http://www.w3.org/1999/xhtml" type="on_ext" id="w/@=5/5!D;8wn4DZ;jzG" x="287.99999999999943" y="37.999999999999716">
  <mutation items="1"></mutation>
  <field name="CONDITION">ne</field>
  <field name="ACK_CONDITION"></field>
  <value name="OID0">
    <shadow type="field_oid" id="tQBL3[;V1luVO[`h2ONM">
      <field name="oid">javascript.0.Motion</field>
    </shadow>
  </value>
  <statement name="STATEMENT">
    <block type="control" id="w=sN]yxb)5Jv!,YK[C5%">
      <mutation delay_input="false"></mutation>
      <field name="OID">javascript.0.Light</field>
      <field name="WITH_DELAY">FALSE</field>
      <value name="VALUE">
        <block type="variables_get" id="6`1|t;T%_h^|ES+nd~/?">
          <field name="VAR">value</field>
        </block>
      </value>
    </block>
  </statement>
</block>
```

＆NBSP;

###写状态![写状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_write_en.png)
通用写入块可以与[“更新状态”]（＃update-state）和[“控制状态”](#control-state)一起执行。

但与你相比，你可以做到。

###创建状态
![创建状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_create_en.png)可以在脚本中创建两种类型的变量：

 - 本地[变量](#set-variables-value)
 - 全局变量或状态。

全局状态在所有脚本中都可见，但仅在当前脚本中可见。

全局状态可以用于vis，移动和所有其他逻辑或可视化模块，可以登录到db或其他任何东西。

该块将创建一个全局状态，并且状态将存在。您可以在每次启动脚本时安全地调用此块。

此块生成全局状态，如果已存在，则忽略该命令。因此，可以在每个脚本启动时无风险地使用此块。

＆NBSP;该块的典型应用：

![创建状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_create_sample1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="dBV.{0z/{Fr@RB+10H5i" x="38" y="13">
    <field name="COMMENT">Create state and subscribe on it changes</field>
    <next>
      <block type="create" id="D%[{T~!b9^V#Z.7bI+3y">
        <field name="NAME">myState</field>
        <statement name="STATEMENT">
          <block type="on_ext" id="H@F~z_,FpvXo8BptmAtL">
            <mutation items="1"></mutation>
            <field name="CONDITION">ne</field>
            <field name="ACK_CONDITION"></field>
            <value name="OID0">
              <shadow type="field_oid" id="hn{OMH9y7AP_dns;KO6*">
                <field name="oid">javascript.0.myState</field>
              </shadow>
            </value>
            <statement name="STATEMENT">
              <block type="debug" id="DjP1pU?v=))`V;styIRR">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="de?mCXefl4v#XrO])~7y">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="text_join" id="^33}.]#ov(vUAEEn8Hdp">
                    <mutation items="2"></mutation>
                    <value name="ADD0">
                      <block type="text" id="_-p%CZq4%)v1EYvh)lf@">
                        <field name="TEXT">Value of my state is </field>
                      </block>
                    </value>
                    <value name="ADD1">
                      <block type="variables_get" id="6r!TtpfrfQ@5Nf[4#[6l">
                        <field name="VAR">value</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

您已经可以在块sekber中使用新创建的状态。

以下代码在第一次执行时返回错误，因为subscribe'for“myState”找不到该对象：

![创建状态](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_create_sample2_en.png)

在第二次执行中，不输出错误，因为数据点现在存在。

＆NBSP;

###对象ID的值![获得国家的价值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_get_value_en.png)
该块用于读取数据点的值。可以读出数据点的以下属性：

 - 价值
 - 确认命令=错误或更新=真
 - 自1970年1月1日起的ms中的时间戳（具有“日期对象”类型）
 - 自1970年1月1日以来的最后一次更改值（具有“日期对象”类型）
 - 质量
 -  Source  - 写入最后一个值的实例的名称，例如“System.adapter.javascript.0”

＆NBSP;输出值的最后一次更改时间的示例：

![获得国家的价值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_get_value_sample_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="GVW732OFexZ9HP[q]B3," x="38" y="13">
    <field name="COMMENT">Print time of last change for myState</field>
    <next>
      <block type="debug" id="t,GmgLjo]1d0{xT+@Yns">
        <field name="Severity">log</field>
        <value name="TEXT">
          <shadow type="text" id="w{UF-|ashrP4e*jl~{9_">
            <field name="TEXT">test</field>
          </shadow>
          <block type="text_join" id="i~L{r:B9oU}.ANc.AV8F">
            <mutation items="2"></mutation>
            <value name="ADD0">
              <block type="text" id="r5=i|qvrII+NCAQ~t{p5">
                <field name="TEXT">Last change of myState was at</field>
              </block>
            </value>
            <value name="ADD1">
              <block type="convert_from_date" id="?cGS1/CwThX!tTDMVSoj">
                <mutation format="false" language="false"></mutation>
                <field name="OPTION">hh:mm:ss</field>
                <value name="VALUE">
                  <block type="get_value" id="k+#N2u^rx)u%Z9lA`Yps">
                    <field name="ATTR">lc</field>
                    <field name="OID">javascript.0.myState</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </value>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

###对象ID
![获取对象ID](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_get_id_en.png)

这是一个简单的辅助块，可以轻松选择对象ID来触发块。

单击“对象ID”打开ID选择对话框。

＆NBSP;该块的典型应用：

![获取对象ID](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/system_get_id_sample_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="GVW732OFexZ9HP[q]B3," x="38" y="13">
    <field name="COMMENT">Typical usage of Object ID selector</field>
    <next>
      <block type="on_ext" id="D+1_tP(lF!R]wy?R#|~A">
        <mutation items="1"></mutation>
        <field name="CONDITION">ne</field>
        <field name="ACK_CONDITION"></field>
        <value name="OID0">
          <shadow type="field_oid" id="rpg#*-DXMVqzexE8-^Xc">
            <field name="oid">default</field>
          </shadow>
          <block type="field_oid" id="YYTRKxeC@l3WE~OJx4ei">
            <field name="oid">javascript.0.myState</field>
          </block>
        </value>
        <statement name="STATEMENT">
          <block type="debug" id="{;_x6LATJ,b^leE,xgz9">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="-)V}_9Cxt2kj:]36y,7#">
                <field name="TEXT">Changed</field>
              </shadow>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

＆NBSP;

##动作块
### Exec  - 命令
![执行 - 执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/action_exec_en.png)

该块在系统中执行输入的命令，就像通过SSH在命令行输入一样。

该命令是在用户启动ioBroker的权限下执行的。

如果不需要输出，可以抑制：

![执行 - 执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/action_exec_2_en.png)

如果要输出：

![执行 - 执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/action_exec_1_en.png)

＆NBSP;

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="GVW732OFexZ9HP[q]B3," x="313" y="38">
    <field name="COMMENT">Execute some system command</field>
    <next>
      <block type="exec" id="hGkHs.IkmiTa{jR^@-}S">
        <mutation with_statement="true"></mutation>
        <field name="WITH_STATEMENT">TRUE</field>
        <field name="LOG"></field>
        <value name="COMMAND">
          <shadow type="text" id=":KG#hyuPRhQJWFSk)6Yo">
            <field name="TEXT">ls /opt/</field>
          </shadow>
        </value>
        <statement name="STATEMENT">
          <block type="debug" id="ELv(y5V4[hZ,F8,]D51x">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="J[o*Fylexfu41}smph).">
                <field name="TEXT">result</field>
              </shadow>
              <block type="variables_get" id="gWo7Y^,QI=PqL(Q;7D=^">
                <field name="VAR">result</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

要分析输出，会生成3个特殊变量：

 -  result，包含到控制台的常规输出（例如，对于命令“ls / opt”，输出为“iobroker nodejs”）
 - 如果JavaScript模块无法执行命令，则为Error对象
 -  stderr，执行程序的错误输出

此外，如果loglevel不是“none”，则相同的输出也将出现在日志中。

＆NBSP;

###请求网址
![请求网址](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/action_request_en.png)

调用URL并返回结果。

＆NBSP;例如：

![请求网址](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/action_request_1_en.png)

要分析输出，会生成3个特殊变量：

 - 结果，包含所请求页面的正文
 - 错误，包含错误说明
 - 答案（仅限高级用户），[http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)类型的特殊对象

如果不需要输出，则可以抑制此输出。为此，请选中“带结果”选项。

＆NBSP;

＆NBSP;

## SendTo块
###发送电报
![发送电报](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_telegram_en.png)

该块用于使用电报适配器通过电报发送消息。

当然，必须首先为此安装和配置电报适配器。

为了发送有关特定实例的消息，必须选择所需的适配器实例（通常是telegram.0），否则将在所有可用实例中发送消息。

* Message *字段是必填字段，其中包含的文本将以完全相同的方式发送到客户端。

用户名ID是可选的，这是来自[电报](https://core.telegram.org/bots/api#user)（用户或机器人的唯一标识符）的ID。

此外，如果日志级别不是“none”，则会将相同的消息发送到日志。

＆NBSP;

###发送给SayIt
![发送给SayIt](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_sayit_en.png)

此块用于将文本发送到sayit实例以发出此文本。

当然必须安装和配置适配器。

Elsewise消息希望存在于所有现有实例中。

属性*消息*是强制性的，确切地说这个文本将被发音。

您必须检查语言属性。这将用于text2speech引擎。

卷是可选的（通常从0到100）。

此外，如果日志级别不是“none”，则会将相同的消息发送到日志。

＆NBSP;

###发送到pushover
![发送到pushover](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_pushover_en.png)

此块用于向pushover客户端发送文本。您可以阅读有关推送驱动程序[这里](https://github.com/ioBroker/ioBroker.pushover)的信息。

当然必须安装和配置推进适配器。

Elsewise消息希望存在于所有现有实例中。

属性*消息*是必需的，确切地说这个文本要发送给客户端。

所有其他属性都是可选的，您可以阅读它们[这里](https://pushover.net/api)：

 - *备ID* - 用户的设备名称，用于将消息直接发送到该设备，而不是所有用户的设备（多个设备可能用逗号分隔）
 - *title* - 您的邮件标题，否则使用您的应用程序名称
 - *URL* - 显示您的消息的URL
 -  *网址标题*  - 网址网址的标题，否则显示网址
 - *priority* - 发送为-2以不生成通知/警报，-1发送始终作为安静通知发送，1发送为高优先级并绕过用户的安静时间，或2发送请求用户确认
 -  *以毫秒为单位的时间*  - 显示用户的消息的日期和时间的Unix时间戳，而不是我们的API接收消息的时间
 - *sound* - 设备客户端支持的声音之一的名称，以覆盖用户的默认声音选择

此外，如果日志级别不是“none”，则会将相同的消息发送到日志。

＆NBSP;

###发送电子邮件
![发送电子邮件](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_email_en.png)

此块用于将文本作为电子邮件发送。

当然，必须安装，配置和测试电子邮件适配器。

Elsewise消息希望存在于所有现有实例中。

属性*文本*是必需的，并且此文本正好要发送给客户端。

当然，目的地（*到*）必须填写有效的电子邮件地址。

您可以将文件（通常是图像）附加到电子邮件中。要在文本中使用图像，您必须将格式更改为HTML（选中“以HTML格式发送”选项），文本可能如下所示：

```html
<p>Embedded image 1: <img src='cid:file1'/></p>
<p>Embedded image 2: <img src='cid:file2'/></p>
```

您可以将文件称为```<img src='cid:file1'/>```。 “file1”和“file2”是保留ID，不能更改。

“文件名”必须是磁盘上映像的完整路径。

![发送电子邮件](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_email_1_en.png)

```xml 
<block xmlns="http://www.w3.org/1999/xhtml" type="email" id="VeysPTJXFh^.CW1t(s@Q" x="563" y="63">
  <field name="INSTANCE"></field>
  <field name="IS_HTML">FALSE</field>
  <field name="LOG"></field>
  <value name="TO">
    <shadow type="text" id=".6+6Rp^N7JHiNkP/.^09">
      <field name="TEXT"></field>
    </shadow>
    <block type="text" id="NC6==~4g|OB^`xZ:|Rlx">
      <field name="TEXT">user@myemail.com</field>
    </block>
  </value>
  <value name="TEXT">
    <shadow type="text" id="jaGOyI%O4wl(.s.wo(Y`">
      <field name="TEXT"></field>
    </shadow>
    <block type="text" id=")--+u-+rdoAyWpi9I87+">
      <field name="TEXT">&lt;p&gt;Embedded image 1: &lt;img src='cid:file1'/&gt;&lt;/p&gt;</field>
    </block>
  </value>
  <value name="SUBJECT">
    <shadow type="text" id="|49=rPOCP]hwFD[HX@_I">
      <field name="TEXT">From Sweet Home</field>
    </shadow>
  </value>
  <value name="FILE_1">
    <block type="text" id="tlb_Kuh5?JvPTQr)A{}4">
      <field name="TEXT">/opt/video/imageCam.png</field>
    </block>
  </value>
</block>
```

此外，如果日志级别不是“none”，则会将相同的消息发送到日志。

＆NBSP;

###自定义sendTo块
![自定义sendTo块](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_custom_en.png)

这只是将内部系统消息（sendTo）发送到任何适配器的块。

当然你可以使用自定义功能块来做疯狂，也可以发送消息。

您可以为sendTo命令定义自己的参数：

![自定义sendTo块](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_custom_1_en.png)

阅读更多关于“sendTo”的[这里](https://github.com/ioBroker/ioBroker.javascript#sendto)。

示例如何将SQL查询发送到sql适配器：

![自定义sendTo块](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_custom_2_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml"> -->
  <block type="comment" id="GVW732OFexZ9HP[q]B3," x="163" y="13">
    <field name="COMMENT">Send query to SQL adapter</field>
    <next>
      <block type="sendto_custom" id="84lYloO4o+RvLszPVHZ5">
        <mutation items="" with_statement="true"></mutation>
        <field name="INSTANCE">sql.0</field>
        <field name="COMMAND">query</field>
        <field name="WITH_STATEMENT">TRUE</field>
        <field name="LOG">log</field>
        <value name="ARG0">
          <shadow type="text" id=")faamoSD,nGPXawY4|(Z">
            <field name="TEXT">SELECT * FROM datapoints</field>
          </shadow>
        </value>
        <statement name="STATEMENT">
          <block type="debug" id="Q#UJl]^_g/VHzM*G/a:f">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="#!NJS43!0z@}z:6~_,9(">
                <field name="TEXT">test</field>
              </shadow>
              <block type="procedures_callcustomreturn" id="0E2fmQQduf4)-({z(om|">
                <mutation name="JSON.stringify">
                  <arg name="obj"></arg>
                </mutation>
                <value name="ARG0">
                  <block type="variables_get" id=",^2E2eT#598hI^TvABD9">
                    <field name="VAR">result</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
  <block type="procedures_defcustomreturn" id="lm*.n3kQXll8o9X^*m,k" x="163" y="263">
    <mutation statements="false">
      <arg name="obj"></arg>
    </mutation>
    <field name="NAME">JSON.stringify</field>
    <field name="SCRIPT">cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
  </block>
</xml>
```

如果您只想使用一个带有空名称的参数，那么不会创建任何结构，如下所示：

```javascript
var obj, result;

/**
 * Describe this function...
 */
function JSON_stringify(obj) {
    return JSON.stringify(obj);
}


// Send query to SQL adapter
sendTo("sql.0", "query", 'SELECT * FROM datapoints', function (result) {
    console.log((JSON_stringify(result)));
  });
console.log("sql.0: " + "");
```

或者如何从SQL适配器请求历史记录：

![自定义sendTo块](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/sendto_custom_3_en.png)

```XML
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="GVW732OFexZ9HP[q]B3," x="263" y="13">
    <field name="COMMENT">Get history from SQL adapter</field>
    <next>
      <block type="variables_set" id="J;8I^fN*4YQ1+jPI3FS#">
        <field name="VAR">end</field>
        <value name="VALUE">
          <block type="time_get" id="kZFFxa-2%7/:=IHU|}eB">
            <mutation format="false" language="false"></mutation>
            <field name="OPTION">object</field>
          </block>
        </value>
        <next>
          <block type="sendto_custom" id="84lYloO4o+RvLszPVHZ5">
            <mutation items="id,options" with_statement="true"></mutation>
            <field name="INSTANCE">sql.0</field>
            <field name="COMMAND">getHistory</field>
            <field name="WITH_STATEMENT">TRUE</field>
            <field name="LOG"></field>
            <value name="ARG0">
              <shadow type="text" id=")faamoSD,nGPXawY4|(Z">
                <field name="TEXT">system.adapter.admin.0.memRss</field>
              </shadow>
            </value>
            <value name="ARG1">
              <shadow type="text" id="/nmT=qDw;S`#*tXN=C6n">
                <field name="TEXT">{start: end - 3600000, end: end, aggregate: "minmax"}</field>
              </shadow>
            </value>
            <statement name="STATEMENT">
              <block type="debug" id="Q#UJl]^_g/VHzM*G/a:f">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="#!NJS43!0z@}z:6~_,9(">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="procedures_callcustomreturn" id="0E2fmQQduf4)-({z(om|">
                    <mutation name="JSON.stringify">
                      <arg name="obj"></arg>
                    </mutation>
                    <value name="ARG0">
                      <block type="variables_get" id=",^2E2eT#598hI^TvABD9">
                        <field name="VAR">result</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </next>
  </block>
  <block type="procedures_defcustomreturn" id="lm*.n3kQXll8o9X^*m,k" x="263" y="313">
    <mutation statements="false">
      <arg name="obj"></arg>
    </mutation>
    <field name="NAME">JSON.stringify</field>
    <field name="SCRIPT">cmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7</field>
    <comment pinned="false" h="80" w="160">JSON.stringify object</comment>
  </block>
</xml>
```

生成的javascript代码：

```javascript
var obj, end, result;

/**
 * JSON.stringify object
 */
function JSON_stringify(obj) {
    return JSON.stringify(obj);
}


// Get history from SQL adapter
end = (new Date().getTime());
sendTo("sql.0", "getHistory", {
   "id": 'system.adapter.admin.0.memRss',
   "options": {start: end - 3600000, end: end, aggregate: "minmax"}
}, function (result) {
    console.log((JSON_stringify(result)));
  });
```

如果你想用“{”开始值，它将被解释为JSON字符串。在字符串中使用双引号。

＆NBSP;

＆NBSP;

##日期和时间块
###时间比较
![时间比较](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_en.png)

如果使用运算符“between”或“not between”，则块看起来像这样：

![时间比较](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_1_en.png)

您可以指定必须比较的时间。 Block期望时间为“Date对象”。

![时间比较](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_2_en.png)

有以下比较模式：

 - 小于，检查实际时间是否小于指定时间。
 - 等于或小于
 - 大于
 - 等于或大于
 - 等于
之间，检查是否有一天之间的时间。
     - 例如如果时间必须在12:00到20:00之间。将检查实际时间是否大于或等于12:00且小于20:00。 20:00想要归还假。
     - 或者例如在21:00到8:00之间。在最后一种情况下，将检查时间是否大于或等于21:00或小于8:00。

 - 如果时间不在一天的给定时间内，则不介于两者之间。如果时间小于开始且大于或等于结束。 （如果开始时间大于结束时间，将检查时间是否大于或等于结束且小于开始）

以下时间格式有效：

 -  YYYY-MM-DD hh：mm：ss
 -  YYYY-MM-DD hh：mm
 -  hh：mm：ss
 - 嗯：mm

＆NBSP;

###实际时间比较
![实际时间比较](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_compare_en.png)

该块用于比较白天和实际时间。它具有与[时间比较](#time-comparision)相同的逻辑，但限制不能是块，它只比较实际时间。 （与旧版本兼容）

＆NBSP;

###以特定格式获取实际时间
![获取特定格式的实际时间](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_actualtime_en.png)

以某种指定格式返回实际时间。

支持以下格式：

 - 毫秒 - 仅返回从0到999（不是纪元毫秒）的当前秒的毫秒数。要获得纪元毫秒，请使用“日期对象”;
 - 秒 - 仅返回当前分钟的秒数，从0到59，
 - 一天中的秒数 - 从一天开始的秒数（0到24 * 3600  -  1），
 - 分钟 - 将当前小时的分钟数从0恢复为59，
 - 白天分钟 - 从一天开始返回分钟数（0到24 * 60  -  1），
 - 小时 - 将当天的小时数从0恢复为23，
 - 月中的某一天 - 从1到31的某一天，
 - 月份为数字 - 从1到12获取月份数，
 - 作为文本的月份 - 将月份作为文本。必须指定语言。
 - 月份为短文本 - 以月为文本：1月，2月，3月，4月，5月，6月，7月，8月，9月，10月，11月，12月必须指定语言。
 - 短年 - 从0到99年，例如2016年，结果将是16。
 - 全年 - 全年：2016年
 - 工作日文本 - 以文本形式获取星期几。
 - 短暂的一周 - 获得一周的短文：Su，Mo，Tu，We，Th，Fri，Sat。
工作日作为数字 - 从1（星期一）到7（星期日）的星期几。
 - 自定义格式 - 您可以指定自己的[格式](https://github.com/ioBroker/ioBroker.javascript#formatdate)。
 - 日期对象 - 以从纪元开始（1970.1.1 00：00：00.000Z GMT）开始的毫秒数返回日期和时间。这总是GMT。
 -  yyyy.mm.dd  -  2016.09.14
 -  yyyy / mm / dd  -  2016/09/14
 -  yy.mm.dd  -  16.09.14
 -  yy / mm / dd  -  16/09/14
 -  dd.mm.yyyy  -  2016年9月14日
 -  dd / mm / yyyy  -  2016年9月14日
 -  dd.mm.yy  -  14.09.16
 - 年/月/日 -  14/09/16
 -  mm / dd / yyyy  -  09/14/2016
 -  mm / dd / yy  -  09/14/16
 -  dd.mm. -  14.09。
 -  dd / mm  -  14/09
 -  mm.dd  -  09.14
 -  mm / dd  -  09/14
 -  hh：mm  -  12:00
 -  hh：mm：ss  -  12:00:00
 -  hh：mm：ss.sss  -  12：00：00.000

＆NBSP;

###获取今天的astro活动时间
![获取今天的astro活动时间](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/datetime_astro_en.png)

返回某个特定占星事件当天的时间。

属性“offset”是以分钟为单位的偏移量。在astro事件之前定义时间也可能是否定的。

以下值可用作astro-function中的属性：

 - 日出：日出（地平线上太阳的顶部边缘）
 -  sunriseEnd：日出结束（太阳的底部边缘接触地平线）
goldenhourEnd：早上黄金时段（柔和的光线，摄影的最佳时间）结束
 -  solarNoon：太阳正午（太阳处于最高位置）
 - 黄金时段：黄昏时分开始
 -  sunsetStart：日落开始（太阳的底部边缘接触地平线）
 - 日落：日落（太阳消失在地平线以下，晚上民间黄昏开始）
 - 黄昏：黄昏（傍晚航海黄昏开始）
 - 航海黄昏：航海黄昏（晚上天文学黄昏开始）
 - 夜晚：夜间开始（黑暗足以进行天文观测）
 -  nightEnd：夜晚结束（早晨天文学黄昏开始）
 - 航海黎明：航海黎明（早上航海黄昏开始）
 - 黎明：黎明（早晨航海黄昏结束，早晨民间黄昏开始）
 - 最低点：最低点（夜晚最黑暗的时刻，太阳处于最低位置）

返回值的类型为“Date Object”，它只是1970.01.01之后的毫秒数。

**注意：**使用“astro”函数必须在javascript适配器设置中定义“纬度”和“经度”。

＆NBSP;

＆NBSP;

##转换块
有时需要转换为另一种类型。以下块允许将值转换为特定类型。

###转换为数字
![转换为数字](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_tonumber_en.png)

将值转换为数字（浮点数）。

＆NBSP;

###转换为布尔值
![转换为布尔值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_toboolean_en.png)

将值转换为布尔值（true或false）。

＆NBSP;

###转换为字符串
![转换为字符串](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_tostring_en.png)

将值转换为字符串。

＆NBSP;

###获取变量类型
![获取变量的类型](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_typeof_en.png)

获取价值类型。类型可以是：boolean，number，string，object。

＆NBSP;

###转换为日期/时间对象
![转换为日期/时间对象](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_todate_en.png)

将值转换为“日期对象”。阅读[这里](#get-actual-time-im-specific-format)，“Date对象”是什么。

＆NBSP;

###将日期/时间对象转换为字符串
![转换为布尔值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_fromtime_en.png)

将“Date object”转换为string。它具有与[获取特定格式的实际时间](#get-actual-time-im-specific-format)相同的格式选项。

＆NBSP;

###将JSON转换为对象
![将JSON转换为对象](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_json2object_en.png)

将JSON字符串转换为javascript对象。如果发生错误，将返回空对象。 （仅限专家）

＆NBSP;

###将对象转换为JSON
![将对象转换为JSON](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/convert_object2json_en.png)

将Javascript对象转换为JSON字符串。如果选择了prettify选项，结果字符串如下所示：

```json
{
  "a": 1,
  "b": 2
}
```

如果不是：

```
{"a": 1, "b": 2}
```

＆NBSP;

＆NBSP;

##触发器
###触发状态变化
![触发状态改变](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_en.png)

该块执行一些操作。这是在不同状态和相应系统之间构建的主要块。

使用此块，您可以将不同的状态绑定在一起，或者在值更改时发送消息或电子邮件

块的典型用法：

![触发状态改变](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="]L0d;6j+=OH*[4n{C7v^" x="112" y="13">
    <field name="COMMENT">Switch light on if motion detected</field>
    <next>
      <block type="on_ext" id="QYVeQlu|#2hwniNg)=z8">
        <mutation items="1"></mutation>
        <field name="CONDITION">ne</field>
        <field name="ACK_CONDITION"></field>
        <value name="OID0">
          <shadow type="field_oid" id="Xe6D#r|nf9SEK`.oAuS0">
            <field name="oid">javascript.0.Motion</field>
          </shadow>
        </value>
        <statement name="STATEMENT">
          <block type="control" id="J(HiEvnNKw2B%V1~WXsX">
            <mutation delay_input="false"></mutation>
            <field name="OID">javascript.0.Light</field>
            <field name="WITH_DELAY">FALSE</field>
            <value name="VALUE">
              <block type="logic_boolean" id="o;j8lE#h.XE,0:0_LcW{">
                <field name="BOOL">TRUE</field>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

您可以通过扩展对话框定义任意数量的ObjectID：

![触发状态改变](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_2_en.png)

如果语句块中只使用了一个对象ID：

 - 价值 - 国家的实际价值
 -  oldValue  - 旧的状态值

![触发状态改变](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_3_en.png)

```xml 
<block xmlns="http://www.w3.org/1999/xhtml" type="on_ext" id="QYVeQlu|#2hwniNg)=z8" x="38" y="39">
  <mutation items="1"></mutation>
  <field name="CONDITION">ne</field>
  <field name="ACK_CONDITION"></field>
  <value name="OID0">
    <shadow type="field_oid" id="Xe6D#r|nf9SEK`.oAuS0">
      <field name="oid">javascript.0.Motion</field>
    </shadow>
  </value>
  <statement name="STATEMENT">
    <block type="debug" id="jT6fif_FI9ua|,rL[Ra1">
      <field name="Severity">log</field>
      <value name="TEXT">
        <shadow type="text" id="}=qIm)a0)};f+J/JRgy^">
          <field name="TEXT">test</field>
        </shadow>
        <block type="text_join" id="wjgpY(Whewaqy0d8NVx%">
          <mutation items="4"></mutation>
          <value name="ADD0">
            <block type="text" id="M?[Xy1(Fu36A;b#=4~[t">
              <field name="TEXT">Actual value is</field>
            </block>
          </value>
          <value name="ADD1">
            <block type="variables_get" id="W)*G#(JDzuVpV^1P|[2m">
              <field name="VAR">value</field>
            </block>
          </value>
          <value name="ADD2">
            <block type="text" id="7TW;voPvdc#c4e/SWCjZ">
              <field name="TEXT">Old value was</field>
            </block>
          </value>
          <value name="ADD3">
            <block type="variables_get" id="s`6)4s:}%L#f]pu4E[vK">
              <field name="VAR">oldValue</field>
            </block>
          </value>
        </block>
      </value>
    </block>
  </statement>
</block>
```

否则，如果将多个对象ID用于触发器，则可以通过[触发信息](#trigger-info)访问值和旧值。

＆NBSP;

###触发状态变化
![触发状态变化](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_trigger_en.png)

这与“触发状态更改”相同，但没有多个对象ID用于触发（用于版本兼容性）。

＆NBSP;

###触发信息
![触发信息](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_object_id_en.png)

获取有关触发触发器的状态的值，时间戳或ID的信息。

该块只能在[“触发状态变化”或“触发状态变化”或“触发状态变化”](#trigger-on-state-change)块中使用。

可以访问以下信息：

 - 对象ID  - 触发触发器的状态ID
 -  name  - 来自common.name的状态名称
 -  description  - 来自common.desc的状态描述
 - 通道ID  - 属于该状态的通道的ID。如果不存在，则为零
 - 频道名称 - 属于该州的频道名称。如果不存在，则为零
 - 设备ID  - 属于该状态的设备的ID。如果不存在，则为零
 - 设备名称 - 属于州。如果不存在，则为零
 - 州值 - 被解雇州的实际价值
 -  state timestamp  - 作为Date对象的实际时间戳
 - 国家质量 - 实际质量价值代码
 - 值的来源 - 导致更改的实例的名称
 - 是命令还是更新 - 是命令（ack = false）还是更新（ack = true）
最后一次改变国家
 - 上一个值 - 触发触发器之前此状态的上一个值
 - 上一个时间戳 - 触发触发器之前此状态的上一个时间戳
 - 之前的质量 - 此状态的先前质量，在触发器触发之前
 - 前一个原点 - 触发器触发前该状态的上一个原点
 - 上一个命令或更新 - 触发器触发前的此值的上一个类型
 - 上一次上次更改 - 触发器触发前此状态的上一次“上次更改的值”

典型用法：

![触发信息](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_object_id_1_en.png)

```xml 
<block xmlns="http://www.w3.org/1999/xhtml" type="on_ext" id="QYVeQlu|#2hwniNg)=z8" x="113" y="238">
  <mutation items="1"></mutation>
  <field name="CONDITION">ne</field>
  <field name="ACK_CONDITION"></field>
  <value name="OID0">
    <shadow type="field_oid" id="Xe6D#r|nf9SEK`.oAuS0">
      <field name="oid">javascript.0.Motion</field>
    </shadow>
  </value>
  <statement name="STATEMENT">
    <block type="debug" id="jT6fif_FI9ua|,rL[Ra1">
      <field name="Severity">log</field>
      <value name="TEXT">
        <shadow type="text" id="}=qIm)a0)};f+J/JRgy^">
          <field name="TEXT">test</field>
        </shadow>
        <block type="text_join" id="wjgpY(Whewaqy0d8NVx%">
          <mutation items="4"></mutation>
          <value name="ADD0">
            <block type="text" id="M?[Xy1(Fu36A;b#=4~[t">
              <field name="TEXT">Actual value is</field>
            </block>
          </value>
          <value name="ADD1">
            <block type="on_source" id="_q8v0HD`c[7e76O{@4Tq">
              <field name="ATTR">state.val</field>
            </block>
          </value>
          <value name="ADD2">
            <block type="text" id="7TW;voPvdc#c4e/SWCjZ">
              <field name="TEXT">Old value was</field>
            </block>
          </value>
          <value name="ADD3">
            <block type="on_source" id="D`gpXSShKRQuy:jyMK}6">
              <field name="ATTR">oldState.val</field>
            </block>
          </value>
        </block>
      </value>
    </block>
  </statement>
</block>
```

＆NBSP;

###日程安排
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_schedule_en.png)

这是[“触发国家变化”](#trigger-on-states-change)之后的第二个自动化主要块。此块可以定期执行某些操作。

CRON[格式](https://en.wikipedia.org/wiki/Cron)。通过扩展，也可以定义秒数。
CRON规则和规则将有6个部分。

通常CRON规则由5或6个部分组成：

 - 秒规则（可选）
 - 分钟规则
 - 小时规则
 - 每月规则
 - 月的规则
 - 和周日规则。

对于允许以下格式的每个部分：

 -  \ *  - 每（第二，分钟，小时......）开火
 -  X（例如5） - 仅在此秒，分钟，小时内点火......
 - 从 - 到（例如1-9） - 仅在此间隔内开火
 -  \ * / X（例如\ * / 5） - 每X秒，分钟点火......如果时间为“\ * / 5”，触发器将在0,5,10,15和20小时点火。
 - 数字和间隔可以用逗号组合（例如1,3,4-6）。不要在数字之间留出空格，因为空格是规则部分的分隔符。

\ */ 10 \* \ *\* 6,7 - 星期六和星期日每10分钟开火一次。

\ */ 30 \* \ *\* \ *\* - 每30秒开火一次。

```
 ┌───────────── min (0 - 59)
 │ ┌────────────── hour (0 - 23)
 │ │ ┌─────────────── day of month (1 - 31)
 │ │ │ ┌──────────────── month (1 - 12)
 │ │ │ │ ┌───────────────── day of week (0 - 6) (0 to 6 are Sunday to Saturday; 7 is also Sunday)
 │ │ │ │ │
 │ │ │ │ │
 │ │ │ │ │
 * * * * *  schedule
```

或者如果使用秒数：

```
 ┌───────────── seconds (0 - 59)
 │ ┌───────────── min (0 - 59)
 │ │ ┌────────────── hour (0 - 23)
 │ │ │ ┌─────────────── day of month (1 - 31)
 │ │ │ │ ┌──────────────── month (1 - 12)
 │ │ │ │ │ ┌───────────────── day of week (0 - 6) (0 to 6 are Sunday to Saturday; 7 is also Sunday)
 │ │ │ │ │ │
 │ │ │ │ │ │
 │ │ │ │ │ │
 * * * * * *  schedule
```

但是建立这样的规则对你有很好的帮助。通过单击CRON对话框将打开，您可以按规则指定。

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_schedule_1_en.png)

＆NBSP;

###触发astro事件
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_astro_en.png)

对占星事件执行一些操作。以下活动是可能的：

 - 日出：日出（地平线上太阳的顶部边缘）
 -  sunriseEnd：日出结束（太阳的底部边缘接触地平线）
goldenhourEnd：早上黄金时段（柔和的光线，摄影的最佳时间）结束
 -  solarNoon：太阳正午（太阳处于最高位置）
 - 黄金时段：黄昏时分开始
 -  sunsetStart：日落开始（太阳的底部边缘接触地平线）
 - 日落：日落（太阳消失在地平线以下，晚上民间黄昏开始）
 - 黄昏：黄昏（傍晚航海黄昏开始）
 - 航海黄昏：航海黄昏（晚上天文学黄昏开始）
 - 夜晚：夜间开始（黑暗足以进行天文观测）
 -  nightEnd：夜晚结束（早晨天文学黄昏开始）
 - 航海黎明：航海黎明（早上航海黄昏开始）
 - 黎明：黎明（早晨航海黄昏结束，早晨民间黄昏开始）
 - 最低点：最低点（夜晚最黑暗的时刻，太阳处于最低位置）

**注意：**使用“astro”函数必须在javascript适配器设置中定义“纬度”和“经度”。

此外，您可以在几分钟内将偏移设置为占星事件，例如：在击倒前1小时触发扳机：

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_astro_1_en.png)

正如您所看到的，偏移量也可能是负值，以指定占星事件之前的时间。

＆NBSP;

###命名时间表
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_en.png)

此块与[时间表](#schedule)相同，但可以按字符串设置CRON规则，并可以停止计划。

您可以指定此调度块的唯一名称，然后再使用[时间安排清晰](#clear-schedule)清除它。

以下是可配置闹钟的示例：

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="QWp.l96v1;-4{x)j5K5y" x="38" y="13">
    <field name="COMMENT">Configurable alarm. Set time as: hh:mm</field>
    <next>
      <block type="create" id="5*XX`C;PgnU(q#Nk~D,o">
        <field name="NAME">alarmTime</field>
        <statement name="STATEMENT">
          <block type="on_ext" id="ot:9oFMh.(c)sxkufTxA">
            <mutation items="1"></mutation>
            <field name="CONDITION">ne</field>
            <field name="ACK_CONDITION"></field>
            <value name="OID0">
              <shadow type="field_oid" id="qV#=^mz,%qxL#}VsA)3C">
                <field name="oid">javascript.0.alarmTime</field>
              </shadow>
            </value>
            <statement name="STATEMENT">
              <block type="schedule_clear" id="ukGIQYyTpip_9!1H_xnN">
                <field name="NAME">alarm</field>
                <next>
                  <block type="schedule_create" id=")^!A|k+`1=[pFp(S-*sw">
                    <field name="NAME">alarm</field>
                    <value name="SCHEDULE">
                      <shadow type="field_cron" id="uSka7fK[T7j0m_4!4+fO">
                        <field name="CRON">* * * * *</field>
                      </shadow>
                      <block type="procedures_callcustomreturn" id=")E!Ljg1z9iQ3)Nb#CX~n">
                        <mutation name="time to CRON">
                          <arg name="time"></arg>
                        </mutation>
                        <value name="ARG0">
                          <block type="on_source" id="qs+k30Lnd1V(BSNs{}P!">
                            <field name="ATTR">state.val</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <statement name="STATEMENT">
                      <block type="debug" id="7arB5vcx^ci2Un#}TLKh">
                        <field name="Severity">log</field>
                        <value name="TEXT">
                          <shadow type="text" id="N;`AY!p#T_do@vP_OQr9">
                            <field name="TEXT">Wake up!</field>
                          </shadow>
                        </value>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </statement>
          </block>
        </statement>
      </block>
    </next>
  </block>
  <block type="procedures_defcustomreturn" id="_*_L4XpCr!7eLsYWS(R(" x="38" y="337">
    <mutation statements="false">
      <arg name="time"></arg>
    </mutation>
    <field name="NAME">time to CRON</field>
    <field name="SCRIPT">dmFyIHBhcnRzID0gdGltZS5zcGxpdCgnOicpOwovLyBpZiBpdCBpcyBDUk9OCmlmIChwYXJ0cy5sZW5ndGggPT09IDEpIHJldHVybiB0aW1lOwpyZXR1cm4gcGFydHNbMV0gKyAnICcgKyBwYXJ0c1swXSArICcgKiAqIConOw==</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
  </block>
</xml>
```

＆NBSP;

###清除时间表
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_clear_en.png)

使用此功能，您可以清除命名的计划。如果再定义一次而不清除它。

请参阅[命名时间表](#named-schedule)中的示例

＆NBSP;

### CRON对话框
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_en.png)

从对话框创建CRON规则。该块可以连接到[命名时间表](#named-schedule)。

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="comment" id="]aB;GhQJvYrr~:H4Ft9l" x="63" y="38">
    <field name="COMMENT">Every 0th minute every hour</field>
    <next>
      <block type="schedule_create" id="?}upFtiA@CE_Gd)SmDo|">
        <field name="NAME">schedule</field>
        <value name="SCHEDULE">
          <shadow type="field_cron" id="1Ag|noK^~u]GFEW/(lb)">
            <field name="CRON">* * * * *</field>
          </shadow>
          <block type="field_cron" id="phjg#B~@BJTO9i[HmZ4O">
            <field name="CRON">0 * * * *</field>
          </block>
        </value>
        <statement name="STATEMENT">
          <block type="debug" id="Lv[a}BtvBDO-2Lt,s+z4">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="evxnn0R1(AC^Y_U`oT_a">
                <field name="TEXT">It is exactly</field>
              </shadow>
              <block type="text_join" id="6!2uB_db8.g}63I{^e}#">
                <mutation items="3"></mutation>
                <value name="ADD0">
                  <block type="text" id="HH((bCdxr?A5)8Svuo6(">
                    <field name="TEXT">It is exactly </field>
                  </block>
                </value>
                <value name="ADD1">
                  <block type="time_get" id="7{BBfF0jmKD[qX,y6voK">
                    <mutation format="false" language="false"></mutation>
                    <field name="OPTION">h</field>
                  </block>
                </value>
                <value name="ADD2">
                  <block type="text" id="edML0zJ2V9kN}5/DLdS5">
                    <field name="TEXT"> o'clock</field>
                  </block>
                </value>
              </block>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

### CRON规则
![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_en.png)

结合不同部分的CRON规则。

您可以将规则显示为块或行：

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_1_en.png)

使用附加参数“with seconds”，您也可以指定CRON规则的秒数

![时间表](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_2_en.png)

可以使用此块（如[CRON对话框]（＃cron-dialog））仅与[命名时间表](#named-schedule)块。

＆NBSP;

＆NBSP;

##超时
###延迟执行
![延迟执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_en.png)

使用此块，您可以执行延迟一段时间的其他块，以毫秒为单位。
如果你知道Javascript与setTimeout的功能相同。

块中没有“中断”，但您可以使用此块来模拟中断。如果放置所有块，必须在中断后完成，您希望获得与中断相同的效果。

另一个功能是使用变量设置间隔，只需用预定义的变量替换“ms”：![由区间变量执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/Timer_variable_en.PNG)

每个延迟执行都可以具有唯一名称。它可以被其他块取消。 [清除延迟执行](#clear-delayed-execution)

![延迟执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="debug" id=":6GZ!E*FHy@vPKKl{`hV" x="487" y="163">
    <field name="Severity">log</field>
    <value name="TEXT">
      <shadow type="text" id="LV!-dx[I(8bAu(_kcG.U">
        <field name="TEXT">Make a pause 5 seconds</field>
      </shadow>
    </value>
    <next>
      <block type="timeouts_settimeout" id="~?BW3eBK_t:TzNk}x9l3">
        <field name="NAME">timeout</field>
        <field name="DELAY">5000</field>
        <statement name="STATEMENT">
          <block type="debug" id="glbs:mQxsDfEieLaru!0">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="_7T9e{FEJTWcpLl*BltU">
                <field name="TEXT">After pause</field>
              </shadow>
            </value>
          </block>
        </statement>
      </block>
    </next>
  </block>
</xml>
```

＆NBSP;

###清除延迟执行
![清除延迟执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_en.png)

此块用于按名称取消延迟。典型用法是运动检测场景的模拟。
通过第一次运动，灯应该继续，并且在30秒后最后一次运动之后，灯应该熄灭。

![清除延迟执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_1_en.png)

```xml 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="on_ext" id="+nZ`H6mh/;g(e3u,t;wJ" x="163" y="12">
    <mutation items="1"></mutation>
    <field name="CONDITION">ne</field>
    <field name="ACK_CONDITION"></field>
    <value name="OID0">
      <shadow type="field_oid" id="{mRcPH:!k^_5q-hwg1q%">
        <field name="oid">node-red.0.javascript.0.Motion</field>
      </shadow>
    </value>
    <statement name="STATEMENT">
      <block type="controls_if" id="]lX4.m?HnwXigM.6wY/D">
        <value name="IF0">
          <block type="logic_compare" id="s0DHFun9e*,c3AawmP_~">
            <field name="OP">EQ</field>
            <value name="A">
              <block type="variables_get" id="g}IH`Bx0T(mkht8~{Ul0">
                <field name="VAR">value</field>
              </block>
            </value>
            <value name="B">
              <block type="logic_boolean" id="Meek9{gS-NOR?|(fgbVg">
                <field name="BOOL">TRUE</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="debug" id=":6GZ!E*FHy@vPKKl{`hV">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="LV!-dx[I(8bAu(_kcG.U">
                <field name="TEXT">Motion detected</field>
              </shadow>
            </value>
            <next>
              <block type="comment" id="6_T-s#wApgZhu0+4uEk}">
                <field name="COMMENT">Switch light ON</field>
                <next>
                  <block type="control" id="fxgT@s0r?[`LJIsqR~M_">
                    <mutation delay_input="false"></mutation>
                    <field name="OID">javascript.0.Light</field>
                    <field name="WITH_DELAY">FALSE</field>
                    <value name="VALUE">
                      <block type="logic_boolean" id="0mgo#`N%Zm{MTELxw%~0">
                        <field name="BOOL">TRUE</field>
                      </block>
                    </value>
                    <next>
                      <block type="comment" id="rZ^o06`}^uFftKj2oYvE">
                        <field name="COMMENT">Stop timer, even if it not running</field>
                        <next>
                          <block type="timeouts_cleartimeout" id="#H#~HxipC8_-/{%,2R1P">
                            <field name="NAME">lightOff</field>
                            <next>
                              <block type="timeouts_settimeout" id="~?BW3eBK_t:TzNk}x9l3">
                                <field name="NAME">lightOff</field>
                                <field name="DELAY">5000</field>
                                <statement name="STATEMENT">
                                  <block type="debug" id="glbs:mQxsDfEieLaru!0">
                                    <field name="Severity">log</field>
                                    <value name="TEXT">
                                      <shadow type="text" id="_7T9e{FEJTWcpLl*BltU">
                                        <field name="TEXT">Light OFF</field>
                                      </shadow>
                                    </value>
                                    <next>
                                      <block type="control" id="McdOD=k4)MlO42RVgB~r">
                                        <mutation delay_input="false"></mutation>
                                        <field name="OID">javascript.0.Light</field>
                                        <field name="WITH_DELAY">FALSE</field>
                                        <value name="VALUE">
                                          <block type="logic_boolean" id="XLHrXB)/|dqGlh,nXl^[">
                                            <field name="BOOL">FALSE</field>
                                          </block>
                                        </value>
                                      </block>
                                    </next>
                                  </block>
                                </statement>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </statement>
      </block>
    </statement>
  </block>
</xml>
```

＆NBSP;

###按间隔执行
![按间隔执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_interval_en.png)

此块允许您定期执行某些操作。当然有CRON块，但CRON块的最小间隔为1秒。
该块可以以毫秒为单位执行操作。

如果将间隔设置得太小（小于100毫秒），则可能会更大。

与超时块类似，您也可以设置唯一的间隔名称。

＆NBSP;

###按间隔停止执行
![按间隔停止执行](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/timeouts_interval_clear_en.png)

在此块的帮助下，您可以定期取消。

＆NBSP;

＆NBSP;

##逻辑
### If else阻止
###比较块
###逻辑AND / OR块
###否定块
###逻辑值TRUE / FALSE
### Null块
###测试块
＆NBSP;

＆NBSP;

##循环
###重复N次
###重复一遍
###伯爵
###每个人
###打破循环
＆NBSP;

＆NBSP;

##数学
###数值
### Arithmetical operations +  -  * / ^
###平方根，Abs， - ，ln，log10，e ^，10 ^
### Sin，cos，tan，asin，acos，atan
###数学常数：pi，e，phi，sqrt（2），sqrt（1/2），无穷大
###是偶数，奇数，素数，整数，正数，负数，是否可分
###按值修改（加号或减号）
###圆形，地板，ceil值
###值列表上的操作：总和，最小值，最大值，平均值，中位数，模式，偏差，随机项
###模数
###按最小值和最大值限制一些值
### 0到1之间的随机值
### Min和max之间的随机值
＆NBSP;

＆NBSP;

##文字
###字符串值
###连接字符串
###将字符串追加到变量
###字符串的长度
###字符串为空
###在字符串中查找位置
###在特定位置的字符串中获取符号
###获取子字符串
###转换为大写或小写
###修剪字符串
＆NBSP;

＆NBSP;

##列表
###创建空列表
###使用值创建列表
###创建具有相同值N次的列表
###获取列表长度
###列表为空
###在列表中查找项目的位置
###获取列表中的项目
###在列表中设置项目
###获取列表的子列表
###将文本转换为列表，反之亦然
＆NBSP;

＆NBSP;

##颜色
###颜色值
###随机颜色
### RGB颜色
###混合颜色
＆NBSP;

＆NBSP;

##变量
###设置变量的值
![设置变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_set_en.png)

要使用此块，您应该了解基本的编程规则：如何使用变量。

使用此块，您可以写入全局（变量无处不在）并使用它来存储一些值。如果变量不存在，则会自动声明。

此块可以创建新变量或使用现有变量。

![设置变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_set_1_en.png)

这段代码：

![设置变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_set_2_en.png)

```xml 
<block xmlns="http://www.w3.org/1999/xhtml" type="variables_set" id="ch{H@omhfzI(QA{syxAG" x="212.99999999999977" y="37.99999999999994">
  <field name="VAR">item</field>
  <value name="VALUE">
    <block type="math_number" id="SbmD7,uR:hMW!(P%IZRc">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
```

只做这个：

```javascript
var item;
item = 0;
```

＆NBSP;

###获取变量的值
![获取变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_get_en.png)

该块获取变量的值。您可以创建一个新的或使用现有的。

![获取变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_get_1_en.png)

触发块[触发状态改变]并触发状态改变](#trigger-on-state-change)有一个例外。
在这些块中，变量“value”仍然存在，但无论如何要读取它们的值，您必须将变量重命名为value然后使用它。

![获取变量的值](zh-cn/adapterref/iobroker.javascript/../../../de/adapterref/iobroker.javascript/img/variables_get_2_en.png)

＆NBSP;

＆NBSP;

##功能
###从没有返回值的块创建函数
###从具有返回值的块创建函数
###函数返回值
###创建没有返回值的自定义函数
###使用返回值创建自定义函数
###通话功能