---
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/adapterref/iobroker.javascript/blockly.md
title: content
hash: M7GQwgI497RpKFJcBY1bHyu/mjr8k/IJkPAMV3ynyG8=
---
# Content
- [description] (# description)
- [Getting started] (# getting-started)
    - [Example 1] (# example-1)
    - [Example 2] (# example-2)
    - [Example 3] (# example-3)
- [blocks] (# blocks)
    - [system blocks] (# system blocks)
        - [debug output] (# debug output)
        - [comment] (# comment)
        - [Control State] (# control-state)
        - [Update State] (# update-state)
        - [Bind states] (# bind-states)
        - [Write states] (# write-states)
        - [Create state] (# create-state)
        - [get value of state] (# get-value-of-state)
        - [Get Object ID] (# get-object-id)
    - [action blocks] (# action blocks)
        - [exec command] (# exec --- command)
        - [request URL] (# request-url)
    - [SendTo blocks] (# sendTo blocks)
        - [Send to telegram] (# send-to-telegram)
        - [Send to SayIt] (# send-to-sayit)
        - [Send to pushover] (# send-to-pushover)
        - [Send email] (# send email)
        - [Custom sendTo block] (# custom-sendto-block)
    - [date and time blocks] (# date-and-time-blocks)
        - [Time comparision] (# time-comparision)
        - [actual time-comparision] (# actual-time-comparision)
        - [get actual time in specific format] (#get-actual-time-in-specific-format)
        - [Get time of astro events for today] (#get-time-of-astro-events-for-today)
    - [Convert blocks] (# convert-blocks)
        - [Convert to number] (convert-to-number)
        - [Convert to boolean] (convert-to-boolean)
        - [Get type of variable] (get-type-of-variable)
        - [convert to date / time object] (convert-to-datetime-object)
        - [convert date / time object to string] (convert-datetime-object-to-string)
        - [Convert JSON to object] (convert json-to-object)
        - [Convert object to JSON] (convert-object-to-json)
    - [Trigger] (# trigger)
        - [Trigger on states change] (# trigger-on-states-change)
        - [Trigger on state change] (# trigger-on-state-change)
        - [Trigger info] (# trigger info)
        - [Schedule] (# schedule)
        - [Trigger on astro event] (# trigger-on-astro-event)
        - [Named schedule] (# named-schedule)
        - [Clear schedule] (# clear-schedule)
        - [CRON dialog] (# cron-dialog)
        - [CRON rule] (# cron-rule)
    - [Timeouts] (# timeouts)
        - Delayed execution (# delayed-execution)
        - [Clear delayed execution] (# clear-delayed-execution)
        - [Execution by interval] (# execution-by-interval)
        - Stop execution by interval (# stop-execution-by-interval)
    - [Logic] (#logic)
        - [If else block] (# if-else-block)
        - [Comparision block] (# comparision-block)
        - [logical AND / OR block] (# logical-and-or-block)
        - [Negation block] (# negation-block)
        - [logical value TRUE / FALSE] (# logical-value-true-false)
        - [null block] (# null-block)
        - [test block] (# test-block)
    - [Loops] (# loops)
        - [Repeat N times] (# repeat-n-times)
        - [Repeat while] (# repeat-while)
        - [Count] (# count)
        - [For each] (# for-each)
        - [Break out of loop] (# break-out-of-loop)
    - [Math] (# math)
        - [Number value] (# number-value)
        - [arithmetical operations + - \ * / ^] (# arithmetical-operations--)
        - [Square root, Abs, -, ln, log10, e ^, 10 ^] (# square-root-abs --- ln-log10-e-10)
        - [sin, cos, tan, asin, acos, atan] (# sin-cos-tan-asin-acos-atan)
        - [Math constants: pi, e, phi, sqrt (2), sqrt (1/2), infinity] (# math-constants-pi -e-phi-sqrt2-sqrt12-infinity)
        - [Is even, odd, prime, whole, positive, negative, divisibly by] (# is-even-odd-prime-whole-positive-negative-divisibly-by)
        - [Modify variably by value plus or minus] (# modify-variably-by-value-plus-or-minus)
        - [round, floor, ceil value] (# round-floor-ceil-value)
        - [operations on the list of values: sum, min, max, average, median, modes, deviation, random item] (# operations-on-the-list-of-values-sum-min-max-average-median) modes-deviation-random-item)
        - [modulus] (# modulus)
        - [limit some value by min and max] (# limit-some-value-by-min-and-max)
        - [Random value from 0 to 1] (# random-value-from-0-to-1)
        - [random value-between-min-and-max]
    - [text] (# text)
        - [String value] (# string-value)
        - [concatenate strings] (# concatenate strings)
        - [Append string to variable] (# append-string-to-variable)
        - [Length of string] (# length-of-string)
        - [is string empty] (# is-string-empty)
        - [find position in string] (# find-position-in-string)
        - [Get symbol in string on specific position] (# get-symbol-in-string-on-specific-position)
        - [Get substring] (# get-substring)
        - [Convert to upper case or lower case] (# Convert-to-upper-case-or-to-lower-case)
        - [Trim string] (# trim-string)
    - [Lists] (# lists)
        - [Create empty list] (# create-empty-list)
        - [Create list with values] (# create-list-with-values)
        - [Create list with same value N times] (# create-list-with-same-value-n-times)
        - [Get length of list] (# get-length-of-list)
        - [is list empty] (# is-list-empty)
        - [Find position of item in list] (# Find-position-of-item-in-list)
        - [get item in list] (# get-item-in-list)
        - [set item in list] (# set-item-in-list)
        - [Get sublist of list] (# get-sublist-of-list)
        - [Convert text to list and vice versa] (# convert-text-to-list-and-vice-versa)
    - [Color] (# color)
        - [Color value] (# color-value)
        - [Random color] (# random-color)
        - [RGB color] (# rgb-color)
        - [Mix colors] (# mix-colors)
    - [Variables] (#variables)
        - [Set variable's value] (# set-variables-value)
        - [Get variable's value] (# get-variable-value)
    - [Functions] (# functions)
        - [Create function from blocks with no return value] (# create-function-from-blocks-with-no-return-value)
        - [Create function from blocks with return value] (# create-function-from-blocks-with-return-value)
        - [Return value in function] (# return-value-in-function)
        - [Create custom function with no return value] (# create-custom-function-with-no-return-value)
        - [Create custom function with return value] (# create-custom-function-with-return-value)
        - [Call function] (# call-function)

& Nbsp;

# Description Blockly is a graphical editor that allows users to create scripts by merging blocks.
It was developed for users who have no experience in programming computers.
& Nbsp;

# Getting started
## Example 1
** Change the state of a data point when changing another data point **

![Getting started 1](../../../de/adapterref/iobroker.javascript/img/getting_started_1_de.png)

This is the classic example of changing a data point to something else.

Here the light is switched on or off when movement or no movement is detected.

First insert the block "Triggers => If object". Select the object ID to use the state of the object as a trigger for this script.

Add another block - "System => Control" and in the dialog select the other state that should be changed by the trigger.

Insert a block "System => Value of object ID" in this control block and select the object "Motion" in the dialog to write its state to "Light":.

** There is a special variable "value" for the trigger blocks. This is always defined here and can be used for different purposes. It contains the current value of the triggering object and therefore you can create simpler scripts by using the block "Variable => Object ID" and renaming it to "Value". **

![Getting started 1](../../../de/adapterref/iobroker.javascript/img/getting_started_1_2_de.png)

& Nbsp; Example to import:

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

& Nbsp;

## Example 2 **Turn on and off the lights when moving if there is no movement for 10 minutes.**
![Getting started 2](../../../de/adapterref/iobroker.javascript/img/getting_started_2_de.png)

If the state "Motion" is updated with the value "true", do:

- turn on "light"
- Start the delay of 10 minutes to turn off "light" and delete all previous delays for this data point.

As you can see, the "Delay Delay" flag is cleared by the last command. This deletes all timers for this data point and starts a new timer

& Nbsp; Example to import:

<! - `` `xml <xml xmlns =" http://www.w3.org/1999/xhtml "> -> <block type =" comment "id =" s7s ** k + Cc_KjDnJW` (h ~ "x =" 112 "y =" 63 "> <field name =" COMMENT "> Switch light ON and OFF in 10 minutes of IDLE </ field> <next> <block type =" on_ext "id =" #} : B (M-o5: /] k, _msr% y "> <mutation items =" 1 "> </ mutation> <field name =" CONDITION "> true </ field> <field name =" ACK_CONDITION "> true </ field> <value name = "OID0"> <shadow type = "field_oid" id = "o ~ 6)! C0IVy {WD% Km (lkc"> <field name = "oid"> javascript.0.Motion < / field> </ shadow> </ value> <statement name = "STATEMENT"> <block type = "control" id = "(ZqzhS_7 * jGpk;` zJAZg "> <mutation delay_input =" false "> </ mutation> <field name = "OID"> javascript.0.Light </ field> <field name = "WITH_DELAY"> FALSE </ field> <value name = "VALUE"> <block type = "logic_boolean" id = "% ^ ADwe * 2l0tLw8Ga5F * Y "> <field name =" BOOL "> TRUE </ field> </ block> </ value> <next> <block type =" control "id =" =] vmzp6j ^ V9: 3? R ? 2Y, x "> <mutation delay_input =" true "> </ mutation> <field name =" OID "> javascript.0.Light </ field> <field name =" WITH_DELAY "> TR UE </ field> <field name = "DELAY_MS"> 600000 </ field> <field name = "CLEAR_RUNNING"> TRUE </ field> <value name = "VALUE"> <block type = "logic_boolean" id = "! ; DiIh, D] l1oN {D; skYl "> <field name =" BOOL "> FALSE </ field> </ block> </ value> </ block> </ next> </ block> </ statement> < / block> </ next> </ block> </ xml>

```


&nbsp;
## Beispiel 3
**Verschicke eine eMail wenn die Außentemperatur höher als 25 Grad Celsius ist.**

![Getting started 3](../../../de/adapterref/iobroker.javascript/img/getting_started_3_de.png)

Erklärung:

Zuerst müssen wir eine Variable definieren um zu speichern, dass die eMail für den aktuellen Temperaturalarm bereits gesendet wurde und diese Variable auf "falsch" setzen.
Dann beobachten wir die Veränderungen der Temperatur. Wir könnten dieses Skript auch periodisch ausführen, aber das ist nicht so effektiv.

Wenn sich die Temperatur ändert vergleichen wir den aktuellen Wert mit 25 und prüfen ob die eMail bereits verschickt wurde oder nicht.
Wenn die eMail noch nicht versendet war, speichern wir dass wir sie jetzt senden und senden sie auch. Natürlich muss der eMail-Adapter vorher installiert und konfiguriert worden sein.

Wenn die Temperatur unter 23 Grad fällt setzen wir die Variable "emailSent" zurück, damit beim nächsten Temperaturalarm wieder eine eMail gesendet wird.
Dazu wird die aktuelle Temperatur mit 23 verglichen und es werden keine eMails geschickt, solange die Temperatur um 25 Grad schwankt.

Um den "falls ... sonst falls ..." Block zu erstellen klickt man auf das Zahnrad und fügt die zusätzlich benötigten Elemente dem "falls" Block hinzu.

![Getting started 3](../../../de/adapterref/iobroker.javascript/img/getting_started_3_1_de.png)

Man kann zu jedem Block einen Kommentar hinterlegen, indem man "Kommentar hinzufügen" im Kontextmenü des Blocks anklickt. Diesen Kommentar kann man später durch anklicken des Fragezeichens ansehen.

![Getting started 3](../../../de/adapterref/iobroker.javascript/img/getting_started_3_2_de.png)

Man kann größere Blöcke einklappen um eine bessere Übersicht zu erhalten, indem man im Kontextmenü den Punkt "Block einklappen" auswählt.

![Getting started 3](../../../de/adapterref/iobroker.javascript/img/getting_started_3_3_de.png)


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

& Nbsp;

& Nbsp;

# Blocks
## System blocks
### Debug output
![Debug output](../../../de/adapterref/iobroker.javascript/img/system_debug_en.png)

This block does not matter, except to write a line to the log. You can use it to debug the script, like this one:

![Debug output](../../../de/adapterref/iobroker.javascript/img/system_debug_1_en.png)

& Nbsp; Example to import:

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

You can define 4 different message severity levels:

- debug (the debug-level of the javascript instance has to be activated.)
- info (default, at least the info log level must be enabled on the javascript instance)
- warning
- error (always displayed, the other levels can be ignored if set in the javascript instance accordingly)

& Nbsp;

### Comment ![Comment](../../../de/adapterref/iobroker.javascript/img/system_comment_en.png)
Add a comment to the script to understand it later.

The block does not matter, it's just a comment.

& Nbsp;

### Control State ![Control state](../../../de/adapterref/iobroker.javascript/img/system_control_en.png)
You can write a state in two different ways:

- To control something and send the value to the hardware (This block)
Write a new value for information only, e.g. Temperature change ([next block] (# update-state))

& Nbsp; Typical application of this block:

![Control state](../../../de/adapterref/iobroker.javascript/img/system_control_sample1_en.png)

The object ID is selected in the dialog, the value to be sent must be specified. Depending on the type of data point, the value can be of the type [string] (# string-value), [number] (# number-value) or [boolean](#ogical-value-trueflase).

Further explanations can be found in [here](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses).

This block writes the command to the data point (ack = false). In addition, a delay can be specified.
If the delay is not 0, the state is not set immediately but only in milliseconds after the specified time.

You can delete all other delays for this data point by checking the checkbox.

Thus, in the following example, the data point "light" is switched only once (after 2 seconds): ![Control state](../../../de/adapterref/iobroker.javascript/img/system_control_1_en.png)

& Nbsp; Example to import:

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

In contrast to the previous example, the state of "light" is switched twice in the following example (after 1 second and after 2 seconds): ![Control state](../../../de/adapterref/iobroker.javascript/img/system_control_2_en.png)

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

& Nbsp;

### Update State ![Update state](../../../de/adapterref/iobroker.javascript/img/system_update_en.png)
This block is similar to [Control block](#steuere-state), but it only sets the current value. There is no command sent to control the hardware.

Typical application of this block:

![Update state](../../../de/adapterref/iobroker.javascript/img/system_update_sample_en.png)

& Nbsp;

### Bind States ![Bind state](../../../de/adapterref/iobroker.javascript/img/system_bind_en.png)
This block binds two states together.

You can do the same with these blocks:

![Bind state](../../../de/adapterref/iobroker.javascript/img/system_bind_1_en.png)

You can choose whether the value is forwarded only when the source changes or every time it is updated.

& Nbsp; Example to import:

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

& Nbsp;

### Write states ![Write state](../../../de/adapterref/iobroker.javascript/img/system_write_en.png)
Universal write block that can do the same as ["Update state"] (# update-state) and ["Control state"](#control-state) together.

But in comparison with you can make it.

### Create state
![Create state](../../../de/adapterref/iobroker.javascript/img/system_create_en.png) There are two types of variables that can be created in scripts:

- local [variables] (# set-variables-value)
- global variables or states.

Global states are visible in all scripts, but are only visible in this current script.

Global states can be used in vis, mobile and all other logic or visualization modules, can be logged into db or whatever.

This block will create a global state and the state will exist. You can safely call this block by every start of the script.

This block generates global states and if it already exists the command is ignored. Therefore, this block can be used without risk at every script start.

& Nbsp; Typical application of this block:

![Create state](../../../de/adapterref/iobroker.javascript/img/system_create_sample1_en.png)

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

You can already use the newly created state in the block sekber.

The following code returns an error on the first execution because subscribe 'for "myState" can not find the object:

![Create state](../../../de/adapterref/iobroker.javascript/img/system_create_sample2_en.png)

In the second execution, no errors are output because the data point now exists.

& Nbsp;

### Value of object ID ![Get value of state](../../../de/adapterref/iobroker.javascript/img/system_get_value_en.png)
This block is used to read the value of a data point. The following attributes of the data point can be read out:

- Value
- Acknowledge command = wrong or update = true
- Timestamp in ms since 01.01.1970 (Has the type "Date object")
- last change of the value in ms since 01.01.1970 (has the type "date object")
- quality
- Source - name of the instance that has written the last value, such as "System.adapter.javascript.0"

& Nbsp; Example to output the time of the last change of the value:

![Get value of state](../../../de/adapterref/iobroker.javascript/img/system_get_value_sample_en.png)

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

& Nbsp;

### Object ID
![Get Object ID](../../../de/adapterref/iobroker.javascript/img/system_get_id_en.png)

This is a simple helper block to comfortably select the object ID to trigger the block.

The ID selection dialog is opened by clicking on "Object ID".

& Nbsp; Typical application of this block:

![Get Object ID](../../../de/adapterref/iobroker.javascript/img/system_get_id_sample_en.png)

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

& Nbsp;

& Nbsp;

## Action blocks
### Exec - Command
![Exec - execute](../../../de/adapterref/iobroker.javascript/img/action_exec_en.png)

This block executes the entered command in the system as if it had been entered on the command line via SSH.

The command is executed with the right of the user under which ioBroker was started.

If no output is desired, this can be suppressed:

![Exec - execute](../../../de/adapterref/iobroker.javascript/img/action_exec_2_en.png)

If an output should be made:

![Exec - execute](../../../de/adapterref/iobroker.javascript/img/action_exec_1_en.png)

& Nbsp;

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

& Nbsp;

To analyze the output, 3 special variables are generated:

- result, contains the regular output to the console (for example, for the command "ls / opt" the output is "iobroker nodejs")
- Error object if the command could not be executed by the JavaScript module
- stderr, the error output of the executed program

In addition, the same output will also appear in the log if the loglevel is not 'none'.

& Nbsp;

### Request URL
![request URL](../../../de/adapterref/iobroker.javascript/img/action_request_en.png)

Calls a URL and returns the result.

& Nbsp; Example:

![request URL](../../../de/adapterref/iobroker.javascript/img/action_request_1_en.png)

To analyze the output, 3 special variables are generated:

- Result, contains the body of the requested page
- Error, contains an error description
- Answer (only for advanced), special object of type [http.IncomingMessage] (https://nodejs.org/api/http.html#http_class_http_incomingmessage)

If no output is desired, this can be suppressed. To do this, check the option "with result".

& Nbsp;

& Nbsp;

## SendTo blocks
### Send to telegram
![Send to telegram](../../../de/adapterref/iobroker.javascript/img/sendto_telegram_en.png)

This block is used to send a message via telegram using the telegram adapter.

Of course, the telegram adapter must first be installed and configured for this.

To send the message about a specific instance, the desired instance of the adapter (usually telegram.0) must be selected, otherwise the message will be sent across all available instances.

The *Message* field is mandatory and the text contained there will be sent to the client in exactly the same way.

User name ID is optional and this is ID from [telegram](https://core.telegram.org/bots/api#user) (Unique identifier for user or bot).

Additionally if the log level is not "none", the same message will be sent to log.

& Nbsp;

### Send to SayIt
![Send to SayIt](../../../de/adapterref/iobroker.javascript/img/sendto_sayit_en.png)

This block is used to send text to sayit instance to pronounce this text.

Of course the adapter must be installed and configured.

Elsewise message wants to be present to all existing instances.

Property *message* is mandatory and exactly this text will be pronounced.

You must check the language property. This will be used for text2speech engine.

Volume is optional (normally from 0 to 100).

Additionally if the log level is not "none", the same message will be sent to log.

& Nbsp;

### Send to pushover
![Send to pushover](../../../de/adapterref/iobroker.javascript/img/sendto_pushover_en.png)

This block is used to send text to pushover client. You can read about pushover driver [here](https://github.com/ioBroker/ioBroker.pushover).

Of course the pushover adapter must be installed and configured.

Elsewise message wants to be present to all existing instances.

Property *message* is mandatory and exactly this text wants to be sent to client.

All other properties are optional and you can read bout them [here](https://pushover.net/api):

- *device ID* - your user's device name to send the message directly to that device, rather than all of the user's devices (multiple devices may be separated by a comma)
- *title* - your message's title, otherwise your app's name is used
- *URL* - a URL to show with your message
- *URL title* - a title for your url URL, otherwise the URL is shown
- *priority* - send as -2 to generate no notification / alert, -1 to always send as a quiet notification, 1 to display as high-priority and bypass the user's quiet hours, or 2 to request confirmation from the user
- *time in ms* - a Unix timestamp of your message's date and time to display the user, rather than the time your message is received by our API
- *sound* - the name of one of the sounds supported by device clients to override the user's default sound choice

Additionally if the log level is not "none", the same message will be sent to log.

& Nbsp;

### Send email
![Send to email](../../../de/adapterref/iobroker.javascript/img/sendto_email_en.png)

This block is used to send text as email.

Of course the email adapter must be installed, configured and tested.

Elsewise message wants to be present to all existing instances.

Property *text* is mandatory and exactly this text wants to be sent to client.

Of course the destination (* to *) must be filled with valid email address.

You can attach up to files (normally images) to email. To use images in the text, you must change format to HTML (check "Send as HTML" option) and text could look like:

```html
<p>Embedded image 1: <img src='cid:file1'/></p>
<p>Embedded image 2: <img src='cid:file2'/></p>
```

You can refer to files as ```<img src='cid:file1'/>```. "file1" and "file2" are reserved IDs and can not be changed.

"file name" must be full path to image on disk.

![Send to email](../../../de/adapterref/iobroker.javascript/img/sendto_email_1_en.png)

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

Additionally if the log level is not "none", the same message will be sent to log.

& Nbsp;

### Custom sendTo block
![Custom sendTo block](../../../de/adapterref/iobroker.javascript/img/sendto_custom_en.png)

This is just a block to send internal system message (sendTo) to any adapter.

Of course you can use custom function block to do crazy, and to send messages too.

You can define your own parameters for sendTo command:

![Custom sendTo block](../../../de/adapterref/iobroker.javascript/img/sendto_custom_1_en.png)

Read more [here](https://github.com/ioBroker/ioBroker.javascript#sendto) about "sendTo".

Example how to send SQL query to sql adapter:

![Custom sendTo block](../../../de/adapterref/iobroker.javascript/img/sendto_custom_2_en.png)

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

If you want to use only one parameter with empty name, so no structure will be created, like here:

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

Or how to request history from SQL adapter:

![Custom sendTo block](../../../de/adapterref/iobroker.javascript/img/sendto_custom_3_en.png)

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

Generated javascript code:

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

If you want start value with "{" it will be interpreted as JSON string. Use double quotes in string.

& Nbsp;

& Nbsp;

## Date and time blocks
### Time comparision
![Time comparision](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_en.png)

If used operator "between" or "not between", the block looks like this:

![Time comparision](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_1_en.png)

You can specify a time, which must be compared. Block expects the time as "Date object".

![Time comparision](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_2_en.png)

There are following compare modes:

- less than, check if actual time less than specified time.
- equal to or less than
- greater than
- equal to or greater than
- equal to
between, check if the time between some day times.
    - E.g. if time must be between 12:00 and 20:00. It will be checked if actual time grater or equal than 12:00 and less than 20:00. 20:00 wants to return false.
    - or for instance between 21:00 and 8:00. In the last case it will be checked if time is greater or equal to 21:00 or less than 8:00.

- not between, if the time is not in the given period of the day time. If the time is less than start and greater or equal to end. (if start time is greater than end time, it will be checked if the time is greater or equal than end and less than start)

Following time formats are valid:

- YYYY-MM-DD hh: mm: ss
- YYYY-MM-DD hh: mm
- hh: mm: ss
- hh: mm

& Nbsp;

### Actual time comparision
![Actual time comparision](../../../de/adapterref/iobroker.javascript/img/datetime_compare_en.png)

This block is used to compare the daytime with actual time. It has the same logic as [Time comparision](#time-comparision), but limits can not be a blocks and it compares only actual time. (for compatibility with old versions)

& Nbsp;

### Get actual time in specific format
![Get actual time in the specific format](../../../de/adapterref/iobroker.javascript/img/datetime_actualtime_en.png)

Returns the actual time in some specified format.

Following formats are supported:

- milliseconds - returns only milliseconds of current second from 0 to 999 (not epoch milliseconds). To get epoch milliseconds use "Date object";
- seconds - returns only seconds of current minute from 0 to 59,
- seconds in day - number of seconds from start of the day (0 to 24 * 3600 - 1),
- minutes - returns minutes of current hour from 0 to 59,
- minutes in day - return number of minutes from the day start (0 to 24 * 60 - 1),
- hours - returns hours of current day from 0 to 23,
- day of month - day of month from 1 to 31,
- month as number - get month as number from 1 to 12,
- month as text - get month as text. Language must be specified.
- month as short text - get month as text: Jan, Feb, Mar, Apr, May, June, July, Aug, Sept, Oct, Nov, Dec. Language must be specified.
- short year - Year from 0 to 99, e.g for 2016 the result will be 16.
- full year - Full year: 2016
- week day text - Get day of week as text.
- short week day - Get a week of short text: Su, Mo, Tu, We, Th, Fri, Sat.
weekday as number - day of week as from 1 (monday) to 7 (sunday).
- custom format - You can specify your own [format] (https://github.com/ioBroker/ioBroker.javascript#formatdate).
- Date object - Returns date and time as number of milliseconds from start of epoch (1970.1.1 00: 00: 00.000Z GMT). This is always GMT.
- yyyy.mm.dd - 2016.09.14
- yyyy / mm / dd - 2016/09/14
- yy.mm.dd - 16.09.14
- yy / mm / dd - 16/09/14
- dd.mm.yyyy - 14.09.2016
- dd / mm / yyyy - 14/09/2016
- dd.mm.yy - 14.09.16
- dd / mm / yy - 14/09/16
- mm / dd / yyyy - 09/14/2016
- mm / dd / yy - 09/14/16
- dd.mm. - 14.09.
- dd / mm - 14/09
- mm.dd - 09.14
- mm / dd - 09/14
- hh: mm - 12:00
- hh: mm: ss - 12:00:00
- hh: mm: ss.sss - 12: 00: 00.000

& Nbsp;

### Get time of astro events for today
![Get time of astro events for today](../../../de/adapterref/iobroker.javascript/img/datetime_astro_en.png)

Returns the time in the current day of some specific astrological event.

The attribute "offset" is the offset in minutes. It can be negative too, to define time before astro event.

Following values can be used as an attribute in astro-function:

- sunrise: sunrise (top edge of the sun on the horizon)
- sunriseEnd: sunrise ends (bottom edge of the sun touches the horizon)
goldenhourEnd: morning golden hour (soft light, best time for photography) ends
- solarNoon: solar noon (sun is in the highest position)
- golden Hour: evening golden hour starts
- sunsetStart: sunset starts (bottom edge of the sun touches the horizon)
- sunset: sunset (sun disappears below the horizon, evening civil twilight starts)
- dusk: dusk (evening nautical twilight starts)
- nauticalDusk: nautical dusk (evening astronomical twilight starts)
- night: night starts (dark enough for astronomical observations)
- nightEnd: night ends (morning astronomical twilight starts)
- nauticalDawn: nautical dawn (morning nautical twilight starts)
- dawn: dawn (morning nautical twilight ends, morning civil twilight starts)
- nadir: nadir (darkest moment of the night, sun is in the lowest position)

The return value has type "Date Object", which is just the number of milliseconds from 1970.01.01.

** Note: ** to use "astro" -function the "latitude" and "longitude" must be defined in javascript adapter settings.

& Nbsp;

& Nbsp;

## Convert blocks
Sometimes it is required to convert into another type. Following blocks allow to convert values into specific types.

### Convert to number
![Convert to number](../../../de/adapterref/iobroker.javascript/img/convert_tonumber_en.png)

Convert value to number (float).

& Nbsp;

### Convert to boolean
![Convert to boolean](../../../de/adapterref/iobroker.javascript/img/convert_toboolean_en.png)

Convert value to boolean (true or false).

& Nbsp;

### Convert to string
![Convert to string](../../../de/adapterref/iobroker.javascript/img/convert_tostring_en.png)

Convert value to string.

& Nbsp;

### Get type of variable
![Get type of variable](../../../de/adapterref/iobroker.javascript/img/convert_typeof_en.png)

Get type of value. Type can be: boolean, number, string, object.

& Nbsp;

### Convert to date / time object
![Convert to date / time object](../../../de/adapterref/iobroker.javascript/img/convert_todate_en.png)

Convert value to "Date object". Read [here](#get-actual-time-im-specific-format), what the "Date object" is.

& Nbsp;

### Convert date / time object to string
![Convert to boolean](../../../de/adapterref/iobroker.javascript/img/convert_fromtime_en.png)

Convert "Date object" into string. It has the same format options as [Get actual time in the specific format](#get-actual-time-im-specific-format).

& Nbsp;

### Convert JSON to object
![Convert JSON to object](../../../de/adapterref/iobroker.javascript/img/convert_json2object_en.png)

Convert JSON string into javascript object. If an error occurs, the empty object will be returned. (only for experts)

& Nbsp;

### Convert object to JSON
![Convert object to JSON](../../../de/adapterref/iobroker.javascript/img/convert_object2json_en.png)

Convert Javascript object to JSON string. If prettify option is selected the result string looks like:

```json
{
  "a": 1,
  "b": 2
}
```

if not:

```
{"a": 1, "b": 2}
```

& Nbsp;

& Nbsp;

## Trigger
### Trigger on states change
![Trigger on states change](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_en.png)

This block executes some action. This is the main block to build between different states and accordingly systems.

With this block you can bind different states together or send message or email on value change.

Typical usage of block:

![Trigger on states change](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_1_en.png)

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

You can define as many ObjectIDs as you want via extension dialog:

![Trigger on states change](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_2_en.png)

If only one object ID is used in the statement block:

- value - actual value of state
- oldValue - old value of state

![Trigger on states change](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_3_en.png)

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

elsewise if more than one object ID is used for trigger, you can access value and old value via [Trigger info](#trigger-info).

& Nbsp;

### Trigger on state change
![Trigger on state change](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_en.png)

This is the same block as "Trigger on states change", but with no multiple object IDs for triggering (for versions compatibility).

& Nbsp;

### Trigger info
![Trigger info](../../../de/adapterref/iobroker.javascript/img/trigger_object_id_en.png)

Get information about value, timestamp or ID of the state, that triggered the trigger.

This block can only be used inside ["Trigger on state change" or "trigger on state change" or "trigger on state change"](#trigger-on-state-change) blocks.

Following information can be accessed:

- object ID - ID of state, that fired the trigger
- name - name of state from common.name
- description - description of state from common.desc
- channel ID - ID of channel to which belongs the state. If not there, it will be zero
- channel name - name of channel to which belongs the state. If not there, it will be zero
- device ID - ID of device to which belongs the state. If not there, it will be zero
- device name - which belongs to the state. If not there, it will be zero
- state value - actual value of fired state
- state timestamp - actual timestamp as Date object
- state quality - actual quality code of value
- origin of value - name of instance that cause the change
- is command or update - is it command (ack = false) or update (ack = true)
last change of state
- previous value - previous value of this state, before the trigger is fired
- previous timestamp - previous timestamp of this state, before the trigger is fired
- previous quality - previous quality of this state, before the trigger fired
- previous origin - previous origin of this state, before the trigger fired
- previous command or update - previous type of this value, before the trigger fired
- previous last change - previous "last changed value" of this state, before the trigger fired

Typical usage:

![Trigger info](../../../de/adapterref/iobroker.javascript/img/trigger_object_id_1_en.png)

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

& Nbsp;

### Schedule
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_en.png)

This is the second main block for automation after ["Trigger on states change"](#trigger-on-states-change). This block lets execute some actions periodically.

CRON [format](https://en.wikipedia.org/wiki/Cron). With extension, that seconds can be defined too.
CRON Rule and rule will have 6 parts.

Generally CRON rule consist of 5 or 6 parts:

- seconds rules (optional)
- minutes rules
- hours rules
- day of month rules
- month's rules
- and day of week rules.

For every part following formats are allowed:

- \ * - fire every (second, minute, hour, ...)
- X (eg 5) - fire only in this second, minute, hour ...
- from-to (e.g 1-9) - fire only in this interval
- \ * / X (eg \ * / 5) - fire every X seconds, minutes ... In case of "\ * / 5" for hours the trigger will fire on 0, 5, 10, 15 and on 20 hours.
- numbers and intervals can be combined by comma (e.g 1,3,4-6). Do not make spaces between numbers, because space is delimiter for rule's parts.

\ */ 10 \* \ *\* 6,7 - fire every 10 minutes on saturday and sunday.

\ */ 30 \* \ *\* \ *\* - fire every 30 seconds.

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

or if seconds used:

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

But there is a good help for you to build such a rules. By clicking on the CRON dialog will be opened and you can specify by your rule.

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_1_en.png)

& Nbsp;

### Trigger on astro event
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_astro_en.png)

Execute some action on astrological event. Following events are possible:

- sunrise: sunrise (top edge of the sun on the horizon)
- sunriseEnd: sunrise ends (bottom edge of the sun touches the horizon)
goldenhourEnd: morning golden hour (soft light, best time for photography) ends
- solarNoon: solar noon (sun is in the highest position)
- golden Hour: evening golden hour starts
- sunsetStart: sunset starts (bottom edge of the sun touches the horizon)
- sunset: sunset (sun disappears below the horizon, evening civil twilight starts)
- dusk: dusk (evening nautical twilight starts)
- nauticalDusk: nautical dusk (evening astronomical twilight starts)
- night: night starts (dark enough for astronomical observations)
- nightEnd: night ends (morning astronomical twilight starts)
- nauticalDawn: nautical dawn (morning nautical twilight starts)
- dawn: dawn (morning nautical twilight ends, morning civil twilight starts)
- nadir: nadir (darkest moment of the night, sun is in the lowest position)

** Note: ** to use "astro" -function the "latitude" and "longitude" must be defined in javascript adapter settings.

Additionally you can set the offset in minutes to astrological event, e.g. to fire the trigger 1 hour before down:

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_astro_1_en.png)

As you can see the offset can be negative too to specify time before astrological events.

& Nbsp;

### Named schedule
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_en.png)

This block is the same as [Schedule](#schedule), but with possibility to set CRON rule by string and with possibility to stop the schedule.

You can specify unique name of this schedule block and then later to clear it with [Clear schedule](#clear-schedule).

Here's an example of configurable alarm clock:

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_1_en.png)

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

& Nbsp;

### Clear schedule
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_clear_en.png)

With this function you can clear named schedule. If you define one more time without clearing it.

See an example in [Named schedule](#named-schedule)

& Nbsp;

### CRON dialog
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_en.png)

Create CRON rule from dialog. This block can be connected to [Named schedule](#named-schedule).

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_1_en.png)

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

& Nbsp;

### CRON rule
![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_en.png)

Combine CRON rule from different parts.

You can display rule as block or as line:

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_1_en.png)

With additional parameter "with seconds" you can specify seconds for CRON rule too

![Schedule](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_2_en.png)

This block can be used (like [CRON dialog] (# cron-dialog)) only with [Named schedule](#named-schedule) block.

& Nbsp;

& Nbsp;

## Timeouts
### Delayed execution
![Delayed execution](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_en.png)

With this block you can execute other blocks delayed by some time specified in milliseconds.
if you know Javascript is the same function as setTimeout.

There is no "break" in blockly, but you can use this block to simulate break. If you place all blocks, that must be done after the break you want to achieve the same effect as with break.

An additional feature is to set the interval by using a variable, just replace the "ms" with an predefined variable: ![Execution by interval variable](../../../de/adapterref/iobroker.javascript/img/Timer_variable_en.PNG)

Every delayed execution can have a unique name. It can be canceled by other block. [Clear delayed execution](#clear-delayed-execution)

![Delayed execution](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_1_en.png)

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

& Nbsp;

### Clear delayed execution
![Clear delayed execution](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_en.png)

This block is used to cancel the delay by name. Typical usage is simulation of motion detection scenario.
By first motion the light should go on and after the last motion after 30 seconds the light should go off.

![Clear delayed execution](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_1_en.png)

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

& Nbsp;

### Execution by interval
![Execution by interval](../../../de/adapterref/iobroker.javascript/img/timeouts_interval_en.png)

This block allows you to execute some action periodically. Of course there is a CRON block, but CRON block has a minimum interval one second.
This block can execute actions in milliseconds periods.

If you set the interval too small (under 100ms) it may be bigger.

Similar to timeout block you can set unique interval name too.

& Nbsp;

### Stop execution by interval
![Stop execution by interval](../../../de/adapterref/iobroker.javascript/img/timeouts_interval_clear_en.png)

With the help of this block you can cancel periodically.

& Nbsp;

& Nbsp;

## Logic
### If else block
### Comparision block
### Logical AND / OR block
### Negation block
### Logical value TRUE / FALSE
### Null block
### Test block
& Nbsp;

& Nbsp;

## Loops
### Repeat N times
### Repeat while
### Count
### For each
### Break out of the loop
& Nbsp;

& Nbsp;

## Math
### Number value
### Arithmetical operations + - * / ^
### Square root, Abs, -, ln, log10, e ^, 10 ^
### Sin, cos, tan, asin, acos, atan
### Math constants: pi, e, phi, sqrt (2), sqrt (1/2), infinity
### Is even, odd, prime, whole, positive, negative, divisibly by
### Modify variably by value (plus or minus)
### Round, floor, ceil value
### Operations on the list of values: sum, min, max, average, median, modes, deviation, random item
### Modulus
### Limit some value by min and max
### Random value from 0 to 1
### Random value between min and max
& Nbsp;

& Nbsp;

## Text
### String value
### Concatenate strings
### Append string to variable
### Length of string
### Is string empty
### Find position in string
### Get symbol in string on specific position
### Get substring
### Convert to upper case or lower case
### Trim string
& Nbsp;

& Nbsp;

## Lists
### Create empty list
### Create list with values
### Create list with same value N times
### Get length of list
### Is list empty
### Find position of item in list
### Get item in list
### Set item in list
### Get sublist of list
### Convert text to list and vice versa
& Nbsp;

& Nbsp;

## Color
### Color value
### Random color
### RGB color
### Mix colors
& Nbsp;

& Nbsp;

## Variables
### Set variable's value
![Set variable's value](../../../de/adapterref/iobroker.javascript/img/variables_set_en.png)

To use this block you should understand basic programming rules: how to use variables.

With this block you can write into global (variable everywhere) and use it to store some values. If variable does not exist, it will be declared automatically.

This block can create new variable or use existing one.

![Set variable's value](../../../de/adapterref/iobroker.javascript/img/variables_set_1_en.png)

This code:

![Set variable's value](../../../de/adapterref/iobroker.javascript/img/variables_set_2_en.png)

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

does only this:

```javascript
var item;
item = 0;
```

& Nbsp;

### Get variable's value
![Get variable's value](../../../de/adapterref/iobroker.javascript/img/variables_get_en.png)

This block gets the value of variable. You can create a new one or use existing one.

![Get variable's value](../../../de/adapterref/iobroker.javascript/img/variables_get_1_en.png)

There is one exception with trigger blocks [Trigger on state change] and trigger on state change](#trigger-on-state-change).
Inside these blocks variable "value" yet exist, but anyway to read their values you must rename variable into value and then use it.

![Get variable's value](../../../de/adapterref/iobroker.javascript/img/variables_get_2_en.png)

& Nbsp;

& Nbsp;

## Functions
### Create function from blocks with no return value
### Create function from blocks with return value
### Return value in function
### Create custom function with no return value
### Create custom function with return value
### Call function