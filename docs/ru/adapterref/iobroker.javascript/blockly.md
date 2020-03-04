---
chapters: {"pages":{"de/adapterref/iobroker.javascript/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.javascript/README.md"},"de/adapterref/iobroker.javascript/blockly.md":{"title":{"de":"Inhalt"},"content":"de/adapterref/iobroker.javascript/blockly.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.javascript/blockly.md
title: содержание
hash: PmGhnq2LunmzZzqWkSpNxK3X11V1CmIVcs0cRO4mhdo=
---
# Содержание
- [описание] (# описание)
- [Начало работы] (# начало работы)
    - [Пример 1] (# пример-1)
    - [Пример 2] (# пример-2)
    - [Пример 3] (# пример-3)
- [блоки] (# блоков)
    - [системные блоки] (# системные блоки)
        - [вывод отладки] (# вывод отладки)
        - [комментарий] (# комментарий)
        - [Steer State] (# steer-state)
        - [Состояние обновления] (# состояние обновления)
        - [Связанные состояния] (# состояния связывания)
        - [Состояния записи] (# состояния записи)
        - [Создать состояние] (# create-state)
        - [Получить значение состояния] (# получить значение состояния)
        - [Получить идентификатор объекта] (# get-object-id)
    - [блоки действий] (# блоки действий)
        - [Exec команда] (# exec --- команда)
        - [URL запроса] (# URL запроса)
    - [блоки SendTo] (# блоки SendTo)
        - [Отправить в телеграмму] (# отправить в телеграмму)
        - [Отправить в SayIt] (# отправить в sayit)
        - [Отправить в pushover] (# отправить в pushover)
        - [Отправить письмо] (# отправить письмо)
        - [Пользовательский блок sendTo] (# custom-sendto-block)
    - [блоки даты и времени] (# блоки даты и времени)
        - [Сравнение времени] (# сравнение времени)
        - [Сравнение фактического времени] (# сравнение фактического времени)
        - [Получить фактическое время в определенном формате] (# получить фактическое время в определенном формате)
        - [Получить время астро-событий на сегодня] (# получить время-астро-событий на сегодня)
    - [Конвертировать блоки] (# конвертировать блоки)
        - [Преобразовать в число] (# преобразовать в число)
        - [Преобразовать в логическое значение] (# преобразовать в логическое значение)
        - [Получить тип переменной] (# get-type-of-variable)
        - [Преобразовать в объект даты / времени] (# convert-to-datetime-object)
        - [Преобразовать объект даты / времени в строку] (# convert-datetime-object-to-string)
        - [Преобразовать JSON в объект] (# convert-json-to-object)
        - [Преобразовать объект в JSON] (# convert-object-to-json)
        - [Преобразовать по выражению JSONata] (# convert-by-jsonata-expression)
    - [триггер] (# триггер)
        - [Триггер при изменении состояния] (# триггер при изменении состояния)
        - [Триггер при изменении состояния] (# триггер при изменении состояния)
        - [Информация о триггере] (# информация о триггере)
        - [Расписание] (# расписание)
        - [Триггер на астро-событии] (# триггер на астро-событии)
        - [Именованное расписание] (# именованное расписание)
        - [Очистить расписание] (# очистить расписание)
        - [Диалог CRON] (# cron-диалог)
        - [Правило CRON] (# cron-rule)
    - [Тайм-ауты] (# тайм-ауты)
        - [Отложенное выполнение] (# отложенное выполнение)
        - [Очистить отложенное выполнение] (# очистить отложенное выполнение)
        - [Выполнение по интервалу] (# выполнение по интервалу)
        - [Остановить выполнение по интервалу] (# остановить выполнение по интервалу)
    - [Логика] (# логика)
        - [Если еще блок] (# if-else-block)
        - [Блок сравнения] (# блок сравнения)
        - [Логический блок И / ИЛИ] (# логический и / или блок)
        - [Блок отрицания] (# блок отрицания)
        - [Логическое значение ИСТИНА / ЛОЖЬ] (# логическое значение-истина-ложь)
        - [нулевой блок] (# нулевой блок)
        - [Тестовый блок] (# тестовый блок)
    - [Петли] (# петли)
        - [Повторить N раз] (# повторять n раз)
        - [Повторять пока] (# повторять пока)
        - [Количество] (# количество)
        - [Для каждого] (# для каждого)
        - [Разорвать из цикла] (# разорвать из цикла)
    - [Математика] (# математика)
        - [Числовое значение] (# числовое значение)
        - [Арифметические операции + - \ * / ^] (# арифметические операции--)
        - [Квадратный корень, Abs, -, ln, log10, e ^, 10 ^] (# square-root-abs --- ln-log10-e-10)
        - [sin, cos, tan, asin, acos, atan] (# sin-cos-tan-asin-acos-atan)
        - [Математические константы: пи, е, фи, sqrt (2), sqrt (1/2), бесконечность] (# математические константы-пи-е-фи-sqrt2-sqrt12-бесконечность)
        - [Является четным, нечетным, простым, целым, положительным, отрицательным, делимым на]
        - [Изменить переменно на значение плюс или минус] (# изменить-переменно-значением-плюс-или-минус)
        - [Round, floor, ceil value] (# round-floor-ceil-value)
        - [Операции со списком значений: сумма, мин, макс, среднее, медиана, режимы, отклонение, случайный элемент] режимы-отклонение-случайный элемент)
        - [модуль] (# модуль)
        - [Ограничить некоторое значение min и max] (# limit-some-value-by-min-and-max)
        - [Случайное значение от 0 до 1] (# случайное значение от 0 до 1)
        - [Случайное значение между min и max] (# случайное значение-между-min-и-max)
    - [текст] (# текст)
        - [Строковое значение] (# строковое значение)
        - [Конкатенация строк] (# конкатенация строк)
        - [Добавить строку в переменную] (# append-string-to-variable)
        - [Длина строки] (# длина строки)
        - [Строка пуста] (# is-string-empty)
        - [Найти позицию в строке] (# найти позицию в строке)
        - [Получить символ в строке в определенной позиции] (# get-symbol-in-string-on-specific-position)
        - [Получить подстроку] (# получить подстроку)
        - [Преобразовать в верхний или нижний регистр] (# Преобразовать в верхний регистр или в нижний регистр)
        - [Строка обрезки] (# строка обрезки)
    - [Списки] (# списки)
        - [Создать пустой список] (# create-empty-list)
        - [Создать список со значениями] (# create-list-with-values)
        - [Создать список с одинаковым значением N раз] (# create-list-with-same-value-n-times)
        - [Получить длину списка] (# get-length-of-list)
        - [Список пуст] (# список пуст)
        - [Найти позицию элемента в списке] (# Find-position-of-item-in-list)
        - [Получить элемент в списке] (# получить элемент в списке)
        - [Установить элемент в списке] (# set-item-in-list)
        - [Получить список из списка] (# get-sublist-of-list)
        - [Преобразовать текст в список и наоборот] (# конвертировать текст в список и наоборот)
    - [Цвет] (# цвет)
        - [Значение цвета] (# значение цвета)
        - [Случайный цвет] (# случайный цвет)
        - [Цвет RGB] (# rgb-цвет)
        - [Смешивать цвета] (# смешивать цвета)
    - [Переменные] (# переменные)
        - [Установить значение переменной] (# set-variable-value)
        - [Получить значение переменной] (# get-variable-value)
    - [Функции] (# функции)
        - [Создать функцию из блоков без возвращаемого значения] (# create-function-from-blocks-with-no-return-value)
        - [Создать функцию из блоков с возвращаемым значением] (# create-function-from-blocks-with-return-value)
        - [Возвращаемое значение в функции] (# возвращаемое значение в функции)
        - [Создать пользовательскую функцию без возвращаемого значения] (# create-custom-function-with-no-return-value)
        - [Создать пользовательскую функцию с возвращаемым значением] (# create-custom-function-with-return-value)
        - [Функция вызова] (# функция вызова)

& nbsp;

# Описание Blockly - графический редактор, который позволяет пользователям создавать сценарии путем сборки блоков.
Он был разработан для пользователей, которые не имеют опыта программирования компьютеров.
& nbsp;

# Начало работы
## Пример 1
** Изменить состояние точки данных при изменении другой точки данных **

![Начало работы 1](../../../de/adapterref/iobroker.javascript/img/getting_started_1_de.png)

Это классический пример переключения чего-то еще при изменении точки данных.

Здесь свет включается или выключается, когда движение или движение не обнаружено.

Сначала вставьте блок «Триггеры => Если объект». Выберите идентификатор объекта, чтобы использовать состояние объекта в качестве триггера для этого сценария.

Добавьте еще один блок - «System => Control» и выберите другое состояние в диалоговом окне, которое должно быть изменено триггером.

Вставьте блок «System => Value of Object ID» в этот блок управления и выберите объект «Movement» в диалоговом окне, чтобы записать его статус в «Light»:

** Для блоков триггеров есть специальная переменная «Значение». Это всегда определяется здесь и может использоваться для различных целей. Он содержит текущее значение инициирующего объекта, и поэтому вы можете создавать более простые сценарии, используя блок «Variable => Object ID» и переименовывая его в «Value». **

![Начало работы 1](../../../de/adapterref/iobroker.javascript/img/getting_started_1_2_de.png)

& nbsp; Пример для импорта:

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

& nbsp;

## Пример 2 **Включать и выключать свет, когда в течение 10 минут нет движения.**
![Начало работы 2](../../../de/adapterref/iobroker.javascript/img/getting_started_2_de.png)

Если состояние «движение» обновляется значением «true», выполните:

- включить "свет"
- запустите задержку в 10 минут, чтобы выключить «свет» и удалить все предыдущие задержки для этой точки данных.

Как видите, флаг «clear delay» сбрасывается последней командой. Это удаляет все таймеры для этой точки данных и запускает новый таймер

& nbsp; Пример для импорта:

<! - `` `xml <xml xmlns =" http://www.w3.org/1999/xhtml "> -> <block type =" comment "id =" s7s ** k + Cc_KjDnJW` (h ~ "x =" 112 "y =" 63 "> <field name =" COMMENT "> Включить свет и выключить его через 10 минут бездействия </ field> <next> <block type =" on_ext "id =" #} : B (M-o5: /] k, _msr% y "> <mutation items =" 1 "> </ mutation> <field name =" CONDITION "> true </ field> <field name =" ACK_CONDITION "> true </ field> <value name = "OID0"> <shadow type = "field_oid" id = "o ~ 6)! C0IVy {WD% Km (lkc"> <field name = "oid"> javascript.0.Motion < / field> </ shadow> </ value> <инструкция name = "STATEMENT"> <block type = "control" id = "(ZqzhS_7 * jGpk;` zJAZg "> <mutation delay_input =" false "> </ mutation> <field name = "OID"> javascript.0.Light </ field> <field name = "WITH_DELAY"> FALSE </ field> <value name = "VALUE"> <block type = "logic_boolean" id = "% ^ ADwe * 2l0tLw8Ga5F * Y "> <имя поля =" BOOL "> ИСТИНА </ field> </ block> </ value> <следующее> <тип блока =" control "id =" =] vmzp6j ^ V9: 3? R ? 2Y, x "> <mutation delay_input =" true "> </ mutation> <field name =" OID "> javascript.0.Light </ field> <field name =" WITH_DELAY "> TR UE </ field> <field name = "DELAY_MS"> 600000 </ field> <field name = "CLEAR_RUNNING"> TRUE </ field> <value name = "VALUE"> <block type = "logic_boolean" id = "! ; DiIh, D] l1oN {D; skYl "> <field name =" BOOL "> FALSE </ field> </ block> </ value> </ block> </ next> </ block> </ Statement> < / block> </ next> </ block> </ xml>

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

& nbsp;

& nbsp;

# Блоки
## Системные блоки
### Отладочный вывод
![Отладочный вывод](../../../de/adapterref/iobroker.javascript/img/system_debug_en.png)

Этот блок ничего не делает, кроме записи строки в журнал. Вы можете использовать его для отладки скрипта, например:

![Отладочный вывод](../../../de/adapterref/iobroker.javascript/img/system_debug_1_en.png)

& nbsp; Пример для импорта:

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

Вы можете определить 4 различных уровня серьезности для сообщений:

- debug (для этого должен быть активирован уровень отладки экземпляра Javascript.)
- информация (по умолчанию, по крайней мере, уровень журнала информации должен быть активирован в экземпляре Javascript.)
- предупреждение
- ошибка (всегда отображается. Другие уровни могут быть проигнорированы, если он установлен соответствующим образом в экземпляре Javascript.)

& nbsp;

### Комментарий ![комментарий](../../../de/adapterref/iobroker.javascript/img/system_comment_en.png)
Добавьте комментарий к сценарию, чтобы лучше понять его позже.

Блок не имеет значения, это просто комментарий.

& nbsp;

### Налоговое государство ![Контроль состояния](../../../de/adapterref/iobroker.javascript/img/system_control_en.png)
Есть два способа написать состояние:

- Для контроля чего-либо и отправки значения на оборудование (этот блок)
- Напишите новое значение, которое предназначено только для информации, например, Изменение температуры ([следующий блок] (# состояние обновления))

& nbsp; Типичное использование этого блока:

![Контроль состояния](../../../de/adapterref/iobroker.javascript/img/system_control_sample1_en.png)

Идентификатор объекта выбирается в диалоговом окне, должно быть указано значение для отправки. В зависимости от типа точки данных значение может иметь тип [строка] (# строковое значение), [число] (# числовое значение) или [логическое значение](#ogical-value-trueflase).

Есть дальнейшие объяснения [здесь](https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#commands-and-statuses).

Этот блок записывает команду в точку данных (ack = false). Задержка также может быть указан.
Если задержка не равна 0, состояние устанавливается не сразу, а только после указанного времени в миллисекундах.

Вы можете удалить все другие задержки для этой точки данных, установив флажок.

В следующем примере точка данных «свет» переключается только один раз (через 2 секунды): ![Контроль состояния](../../../de/adapterref/iobroker.javascript/img/system_control_1_en.png)

& nbsp; Пример для импорта:

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

В отличие от предыдущего примера, состояние «света» переключается дважды в следующем примере (через 1 секунду и через 2 секунды): ![Контроль состояния](../../../de/adapterref/iobroker.javascript/img/system_control_2_en.png)

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

& nbsp;

### Обновить состояние ![Состояние обновления](../../../de/adapterref/iobroker.javascript/img/system_update_en.png)
Этот блок похож на [Блок управления](#steuere-state), но он только устанавливает текущее значение. Команда для управления оборудованием не отправлена.

Типичное использование этого блока:

![Состояние обновления](../../../de/adapterref/iobroker.javascript/img/system_update_sample_en.png)

& nbsp;

### Связывание состояний ![Состояние привязки](../../../de/adapterref/iobroker.javascript/img/system_bind_en.png)
Этот блок связывает два состояния вместе.

Вы можете сделать то же самое с этими блоками:

![Состояние привязки](../../../de/adapterref/iobroker.javascript/img/system_bind_1_en.png)

Вы можете выбрать, будет ли значение пересылаться только при изменении источника или при каждом обновлении.

& nbsp; Пример для импорта:

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

& nbsp;

### Напишите состояния ![Написать состояние](../../../de/adapterref/iobroker.javascript/img/system_write_en.png)
Универсальный блок записи, который может делать то же самое, что и [«Состояние обновления»] (# update-state) и [«Состояние управления»](#control-state) вместе.

Но по сравнению с ними вы можете определить Object ID и задержку с другими блоками, чтобы сделать ваш скрипт более универсальным.

### Создать государство
![Создать государство](../../../de/adapterref/iobroker.javascript/img/system_create_en.png) Существует два типа переменных, которые могут быть созданы в сценариях:

- local [variable] (# set-variable-value)
- глобальные переменные или состояния.

Глобальные состояния видны во всех скриптах, но локальные видны только в этом текущем скрипте.

Глобальные состояния могут использоваться в vis, mobile и во всех других модулях логики или визуализации, могут быть зарегистрированы в db или в любом другом месте.

Этот блок создает глобальное состояние, и если оно еще существует, команда будет проигнорирована. Вы можете безопасно вызывать этот блок при каждом запуске скрипта.

Этот блок создает глобальные состояния, и если он уже существует, команда игнорируется. Поэтому этот блок можно использовать при любом запуске скрипта без какого-либо риска.

& nbsp; Типичное использование этого блока:

![Создать государство](../../../de/adapterref/iobroker.javascript/img/system_create_sample1_en.png)

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

Вы уже можете использовать вновь созданное состояние в блоке secber.

Следующий код выдает ошибку при первом запуске, потому что «subscribe» для «myState» не может найти объект:

![Создать государство](../../../de/adapterref/iobroker.javascript/img/system_create_sample2_en.png)

Во втором исполнении ошибки не выводятся, поскольку точка данных теперь существует.

& nbsp;

### Значение идентификатора объекта ![Получить значение состояния](../../../de/adapterref/iobroker.javascript/img/system_get_value_en.png)
Этот блок используется для считывания значения точки данных. Следующие атрибуты точки данных могут быть считаны:

- стоимость
- Подтвердить команду = false или обновить = true
- Метка времени в мс с 01.01.1970 (имеет тип «объект даты»)
- Последнее изменение значения в мс с 01.01.1970 (имеет тип «объект даты»)
- качество
- Источник - имя экземпляра, который записал последнее значение, например, "System.adapter.javascript.0"

& nbsp; Пример для вывода времени последнего изменения значения:

![Получить значение состояния](../../../de/adapterref/iobroker.javascript/img/system_get_value_sample_en.png)

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

& nbsp;

### Идентификатор объекта
![Получить идентификатор объекта](../../../de/adapterref/iobroker.javascript/img/system_get_id_en.png)

Это простой вспомогательный блок для удобного выбора идентификатора объекта для запуска блока.

Диалог выбора идентификатора открывается нажатием на «Идентификатор объекта».

& nbsp; Типичное использование этого блока:

![Получить идентификатор объекта](../../../de/adapterref/iobroker.javascript/img/system_get_id_sample_en.png)

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

& nbsp;

& nbsp;

Блоки действий
### Exec команда
![Exec - выполнить](../../../de/adapterref/iobroker.javascript/img/action_exec_en.png)

Этот блок выполняет команду, введенную в систему, как если бы она была введена в командной строке через SSH.

Команда выполняется с правами пользователя, под которым был запущен ioBroker.

Если вывод не требуется, это можно подавить:

![Exec - выполнить](../../../de/adapterref/iobroker.javascript/img/action_exec_2_en.png)

Если вы хотите вывести:

![Exec - выполнить](../../../de/adapterref/iobroker.javascript/img/action_exec_1_en.png)

& nbsp;

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

& nbsp;

Для анализа выходных данных создаются три специальные переменные:

- Результат, содержит обычный вывод на консоль (например, для команды "ls / opt" вывод "iobroker nodejs")
- Ошибка объекта, если команда не может быть выполнена модулем JavaScript
- stderr, ошибка вывода выполненной программы

Кроме того, тот же вывод будет также отображаться в журнале, если уровень логики не установлен в «none».

& nbsp;

### Запросить URL
![URL запроса](../../../de/adapterref/iobroker.javascript/img/action_request_en.png)

Получает URL и возвращает результат.

& nbsp; пример:

![URL запроса](../../../de/adapterref/iobroker.javascript/img/action_request_1_en.png)

Для анализа выходных данных создаются три специальные переменные:

- Результат, содержит тело запрашиваемой страницы
- Ошибка, содержит описание ошибки
- Ответ (только для опытных пользователей), специальный объект типа [http.IncomingMessage] (https://nodejs.org/api/http.html#http_class_http_incomingmessage)

Если вывод не требуется, это можно подавить. Отметьте опцию «с результатом».

& nbsp;

& nbsp;

## SendTo блоки
### Отправить в телеграмму
![Отправить на телеграмму](../../../de/adapterref/iobroker.javascript/img/sendto_telegram_en.png)

Этот блок используется для отправки сообщения через телеграмму с помощью адаптера телеграммы.

Конечно, адаптер Telegram должен быть установлен и настроен заранее.

Чтобы отправить сообщение через конкретный экземпляр, необходимо выбрать нужный экземпляр адаптера (обычно telegram.0), в противном случае сообщение отправляется через все доступные экземпляры.

Поле *Message* является обязательным, и содержащийся в нем текст отправляется клиенту точно таким же образом.

Идентификатор имени пользователя является необязательным, и это идентификатор из [телеграмма](https://core.telegram.org/bots/api#user) (Уникальный идентификатор пользователя или бота).

Кроме того, если уровень журнала не «none», то же сообщение будет отправлено в журнал.

& nbsp;

### Отправить в SayIt
![Отправить SayIt](../../../de/adapterref/iobroker.javascript/img/sendto_sayit_en.png)

Этот блок используется для отправки текста экземпляру sayit для произнесения этого текста.

Конечно, адаптер sayit должен быть установлен и настроен.

Чтобы отправить сообщение какому-либо конкретному экземпляру, вы должны выбрать установленный экземпляр адаптера (обычно sayit.0), в противном случае сообщение будет отправлено всем существующим экземплярам.

Свойство *message* обязательно и именно этот текст будет произноситься.

Вы должны проверить свойство языка. Это будет использоваться для движка text2speech.

Объем не является обязательным (обычно от 0 до 100).

Кроме того, если уровень журнала не «none», то же сообщение будет отправлено в журнал.

& nbsp;

### Отправить в pushover
![Отправить на pushover](../../../de/adapterref/iobroker.javascript/img/sendto_pushover_en.png)

Этот блок используется для отправки текста клиенту pushover. Вы можете прочитать о драйвере pushover [здесь](https://github.com/ioBroker/ioBroker.pushover).

Конечно, адаптер Pushover должен быть установлен и настроен.

Чтобы отправить сообщение какому-либо конкретному экземпляру, вы должны выбрать установленный экземпляр адаптера (обычно pushover.0), в противном случае сообщение будет отправлено всем существующим экземплярам.

Свойство *message* обязательно, и именно этот текст будет отправлен клиенту.

Все остальные свойства являются необязательными, и вы можете прочитать о них [здесь](https://pushover.net/api):

- *идентификатор устройства* - имя устройства вашего пользователя для отправки сообщения непосредственно на это устройство, а не на все устройства пользователя (несколько устройств могут быть разделены запятой)
- *title* - заголовок вашего сообщения, в противном случае используется имя вашего приложения
- *URL* - дополнительный URL для отображения в вашем сообщении
- *URL title* - заголовок для вашего дополнительного URL, в противном случае отображается только URL
- *priority* - отправить как -2, чтобы не генерировать уведомление / предупреждение, -1, чтобы всегда отправлять как тихое уведомление, 1, чтобы отображать как высокоприоритетный и игнорировать тихие часы пользователя, или 2, чтобы также требовать подтверждения от пользователя
- *время в мс* - метка времени Unix даты и времени вашего сообщения для отображения пользователю, а не времени, когда ваше сообщение получено нашим API
- *sound* - имя одного из звуков, поддерживаемых клиентами устройства, чтобы переопределить выбор звука по умолчанию для пользователя

Кроме того, если уровень журнала не «none», то же сообщение будет отправлено в журнал.

& nbsp;

### Отправить письмо
![Отправить на электронную почту](../../../de/adapterref/iobroker.javascript/img/sendto_email_en.png)

Этот блок используется для отправки текста по электронной почте.

Конечно, почтовый адаптер должен быть установлен, настроен и протестирован.

Чтобы отправить сообщение какому-либо конкретному экземпляру, вы должны выбрать установленный экземпляр адаптера (обычно email.0), в противном случае сообщение будет отправлено всем существующим экземплярам.

Свойство *text* является обязательным, и именно этот текст будет отправлен клиенту.

Конечно, пункт назначения (* до *) должен быть заполнен действительным адресом электронной почты.

Вы можете прикрепить файлы (обычно изображения) к электронной почте. Чтобы использовать изображения в тексте, необходимо изменить формат на HTML (установите флажок «Отправить как HTML»), и текст может выглядеть следующим образом:

```html
<p>Embedded image 1: <img src='cid:file1'/></p>
<p>Embedded image 2: <img src='cid:file2'/></p>
```

Вы можете ссылаться на файлы как ```<img src='cid:file1'/>```. «file1» и «file2» являются зарезервированными идентификаторами и не могут быть изменены.

«имя файла» должно содержать полный путь к изображению на диске.

![Отправить на электронную почту](../../../de/adapterref/iobroker.javascript/img/sendto_email_1_en.png)

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

Кроме того, если уровень журнала не «none», то же сообщение будет отправлено в журнал.

& nbsp;

### Пользовательский блок sendTo
![Пользовательский блок sendTo](../../../de/adapterref/iobroker.javascript/img/sendto_custom_en.png)

Это просто блок справки для отправки внутреннего системного сообщения (sendTo) на любой адаптер.

Конечно, вы можете использовать пользовательский функциональный блок, чтобы делать что-то сумасшедшее, а также отправлять сообщения.

Вы можете определить свои собственные параметры для команды sendTo:

![Пользовательский блок sendTo](../../../de/adapterref/iobroker.javascript/img/sendto_custom_1_en.png)

Прочитайте больше [здесь](https://github.com/ioBroker/ioBroker.javascript#sendto) о «sendTo».

Пример отправки SQL-запроса в адаптер sql:

![Пользовательский блок sendTo](../../../de/adapterref/iobroker.javascript/img/sendto_custom_2_en.png)

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

Если вы будете использовать только один параметр с пустым именем, структура не будет создана, как здесь:

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

Или как запросить историю из адаптера SQL:

![Пользовательский блок sendTo](../../../de/adapterref/iobroker.javascript/img/sendto_custom_3_en.png)

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

Сгенерированный код JavaScript:

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

Если вы начнете значение с «{», оно будет интерпретировано как строка JSON. Используйте двойные кавычки в строке.

& nbsp;

& nbsp;

## Блоки даты и времени
### Сравнение времени
![Сравнение времени](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_en.png)

Если используется оператор «между» или «не между», блок выглядит так:

![Сравнение времени](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_1_en.png)

Вы можете указать время, которое нужно сравнить. Блок ожидает время как «Объект даты».

![Сравнение времени](../../../de/adapterref/iobroker.javascript/img/datetime_compare_ex_2_en.png)

Существуют следующие режимы сравнения:

- меньше, проверьте, если фактическое время меньше указанного времени.
- равно или меньше чем
- больше чем
- равно или больше чем
- равно
- между, проверьте, если время между днями.
    - Например, если время должно быть между 12:00 и 20:00. Будет проверено, если фактическое время больше или равно 12:00 и меньше 20:00. 20:00 вернет false.
    - или, например, с 21:00 до 8:00. В последнем случае будет проверено, будет ли время больше или равно 21:00 или меньше 8:00.

- не между, если время не относится к данному периоду дневного времени. Если время меньше начала и больше или равно концу. (если время начала больше, чем время окончания, будет проверено, будет ли время больше или равно концу и меньше начала)

Допустимы следующие форматы времени:

- ГГГГ-ММ-ДД чч: мм: сс
- ГГГГ-ММ-ДД чч: мм
- чч: мм: сс
- чч: мм

& nbsp;

### Фактическое сравнение времени
![Фактическое сравнение времени](../../../de/adapterref/iobroker.javascript/img/datetime_compare_en.png)

Этот блок используется для сравнения дневного времени с фактическим временем. Он имеет ту же логику, что и [Сравнение времени](#time-comparision), но пределы не могут быть блоками, и он сравнивает только фактическое время. (для совместимости со старыми версиями)

& nbsp;

### Получить фактическое время в определенном формате
![Получить фактическое время в определенном формате](../../../de/adapterref/iobroker.javascript/img/datetime_actualtime_en.png)

Возвращает фактическое время в указанном формате.

Поддерживаются следующие форматы:

- миллисекунды - возвращает только миллисекунды текущей секунды от 0 до 999 (не миллисекунд эпохи). Чтобы получить миллисекунды эпохи, используйте «Объект даты»;
- seconds - возвращает только секунды текущей минуты от 0 до 59,
- секунды в дне - возвращает количество секунд с начала дня (от 0 до 24 * 3600 - 1),
- minutes - возвращает минуты текущего часа от 0 до 59,
- минуты в дне - возвращает количество минут с начала дня (от 0 до 24 * 60 - 1),
- hours - возвращает часы текущего дня с 0 до 23,
- день месяца - получить день месяца от 1 до 31,
- месяц как число - получить месяц как число от 1 до 12,
- месяц как текст - получить месяц как текст. Язык должен быть указан.
- месяц как краткий текст - получить месяц как текст: январь, февраль, мар, апрель, май, июнь, июль, август, сентябрь, октябрь, ноябрь, декабрь Язык должен быть указан.
- короткий год - год от 0 до 99, например, за 2016 год результат будет 16.
- полный год - полный год: 2016
- текст дня недели - Получить день недели в виде текста.
- короткий день недели - Получить день недели в виде короткого текста: Su, Mo, Tu, We, Th, Fr, Sa.
- день недели как число - день недели как число от 1 (понедельник) до 7 (воскресенье).
- пользовательский формат - вы можете указать свой собственный [формат] (https://github.com/ioBroker/ioBroker.javascript#formatdate).
- Date object - возвращает дату и время в виде количества миллисекунд с начала эпохи (1970.1.1 00: 00: 00.000Z GMT). Это всегда время по Гринвичу.
- гггг.мм.дд - 14.09.2016
- гггг / мм / дд - 2016/09/14
- гг.мм.дд - 16.09.14
- гг / мм / дд - 16.09.14
- дд.мм.гггг - 14.09.2016
- дд / мм / гггг - 14.09.2016
- дд.мм.гг - 14.09.16
- дд / мм / гг - 14.09.16
- мм / дд / гггг - 14.09.2016
- мм / дд / гг - 14.09.16
- ддммм - 14.09.
- дд / мм - 14/09
- мм.дд - 09.14
- мм / дд - 09/14
- чч: мм - 12:00
- чч: мм: сс - 12:00:00
- чч: мм: сссс - 12: 00: 00.000

& nbsp;

### Получить время астро-событий на сегодня
![Получить время астро-событий на сегодня](../../../de/adapterref/iobroker.javascript/img/datetime_astro_en.png)

Возвращает время в текущем дне определенного астрологического события.

Атрибут «смещение» - это смещение в минутах. Это также может быть отрицательным, чтобы определить время до астро-события.

Следующие значения могут быть использованы в качестве атрибута в астро-функции:

- восход солнца: восход солнца (верхний край солнца появляется на горизонте)
- sunriseEnd: восход солнца заканчивается (нижний край солнца касается горизонта)
- goldenHourEnd: утренний золотой час (мягкий свет, лучшее время для фотографии) заканчивается
- solarNoon: солнечный полдень (солнце находится на самой высокой позиции)
- goldenHour: вечер золотого часа начинается
- sunsetStart: начинается закат (нижний край солнца касается горизонта)
- закат: закат (солнце исчезает за горизонтом, начинается вечерние гражданские сумерки)
- сумерки: сумерки (вечерние морские сумерки начинаются)
- nauticalDusk: морской закат (вечерние астрономические сумерки начинаются)
- ночь: начинается ночь (достаточно темная для астрономических наблюдений)
- nightEnd: ночь заканчивается (начинаются утренние астрономические сумерки)
- nauticalDawn: морской рассвет (начинаются утренние морские сумерки)
- рассвет: рассвет (утренние морские сумерки заканчиваются, начинаются утренние гражданские сумерки)
- Надир: Надир (самый темный момент ночи, солнце находится в самом низком положении)

Возвращаемое значение имеет тип «Объект даты», который представляет собой количество миллисекунд с 01.01.1970.

** Примечание: ** для использования функции "astro" "широта" и "долгота" должны быть определены в настройках адаптера javascript.

& nbsp;

& nbsp;

## Конвертировать блоки
Иногда требуется преобразовать значение в другой тип. Следующие блоки позволяют конвертировать значения в конкретные типы.

### Преобразовать в число
![Преобразовать в число](../../../de/adapterref/iobroker.javascript/img/convert_tonumber_en.png)

Преобразовать значение в число (с плавающей точкой).

& nbsp;

### Преобразовать в логическое значение
![Преобразовать в логическое значение](../../../de/adapterref/iobroker.javascript/img/convert_toboolean_en.png)

Преобразовать значение в логическое (истина или ложь).

& nbsp;

### Преобразовать в строку
![Преобразовать в строку](../../../de/adapterref/iobroker.javascript/img/convert_tostring_en.png)

Преобразовать значение в строку.

& nbsp;

### Получить тип переменной
![Получить тип переменной](../../../de/adapterref/iobroker.javascript/img/convert_typeof_en.png)

Получить тип значения. Тип может быть: логическое значение, число, строка, объект.

& nbsp;

### Преобразовать в объект даты / времени
![Преобразовать в объект даты / времени](../../../de/adapterref/iobroker.javascript/img/convert_todate_en.png)

Преобразовать значение в «Объект даты». Прочитайте [здесь](#get-actual-time-im-specific-format), что такое «объект Date».

& nbsp;

### Преобразовать объект даты / времени в строку
![Преобразовать в логическое значение](../../../de/adapterref/iobroker.javascript/img/convert_fromtime_en.png)

Преобразуйте «Объект даты» в строку. Он имеет те же параметры формата, что и [Получить фактическое время в определенном формате](#get-actual-time-im-specific-format).

& nbsp;

### Конвертировать JSON в объект
![Конвертировать JSON в объект](../../../de/adapterref/iobroker.javascript/img/convert_json2object_en.png)

Преобразуйте строку JSON в объект JavaScript. Если произойдет ошибка, пустой объект будет возвращен. (только для экспертов)

& nbsp;

### Преобразовать объект в JSON
![Конвертировать объект в JSON](../../../de/adapterref/iobroker.javascript/img/convert_object2json_en.png)

Преобразовать объект Javascript в строку JSON. Если выбран параметр prettify, результирующая строка выглядит следующим образом:

```json
{
  "a": 1,
  "b": 2
}
```

если нет:

```
{"a": 1, "b": 2}
```

### Преобразовать по выражению JSONata
![Преобразовать по выражению JSONata](../../../de/adapterref/iobroker.javascript/img/convert_by_jsonata_en.png)

Конвертировать объект Javascript по выражению JSONata. Вы можете прочитать больше об этом здесь: [https://jsonata.org/](https://jsonata.org/)

Пример полезной нагрузки:

```
{"example": [{"value": 4},{"value": 7},{"value": 13}]}
```

Результат:

```
[{"value": 4},{"value": 7},{"value": 13}]
24
4
13
```

## Триггер
### Триггер при изменении состояния
![Триггер при изменении состояний](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_en.png)

Этот блок выполняет некоторое действие, если состояние данных объектов изменилось или обновилось. Это основной блок для построения взаимодействия между различными состояниями и, соответственно, системами.

С помощью этого блока вы можете связать разные состояния вместе или отправить сообщение или электронную почту при изменении значения.

Типичное использование блока:

![Триггер при изменении состояний](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_1_en.png)

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

Вы можете определить столько идентификаторов объектов, сколько захотите, в диалоге расширения:

![Триггер при изменении состояний](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_2_en.png)

Если используется только один идентификатор объекта, специальные переменные доступны в блоке операторов:

- значение - фактическое значение состояния
- oldValue - старое значение состояния

![Триггер при изменении состояний](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_ex_3_en.png)

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

в противном случае, если для триггера используется более одного идентификатора объекта, вы можете получить доступ к значению и старому значению через [Информация о триггере](#trigger-info).

& nbsp;

### Триггер при изменении состояния
![Триггер при изменении состояния](../../../de/adapterref/iobroker.javascript/img/trigger_trigger_en.png)

Это тот же блок, что и «Триггер при изменении состояний», но без возможности использовать несколько идентификаторов объектов для запуска (для совместимости версий).

& nbsp;

### Информация о триггере
![Информация о триггере](../../../de/adapterref/iobroker.javascript/img/trigger_object_id_en.png)

Получить информацию о значении, отметке времени или идентификаторе состояния, которое активировало триггер.

Этот блок может использоваться только внутри блоков [«Триггер при изменении состояния»] (# триггер при изменении состояния) или [«Триггер при изменении состояния»](#trigger-on-state-change).

Следующая информация может быть доступна:

- идентификатор объекта - идентификатор состояния, в котором сработал триггер
- name - название штата от common.name
- описание - описание состояния от common.desc
- идентификатор канала - идентификатор канала, которому принадлежит государство. Если нет канала там, он будет нулевым
- название канала - название канала, которому принадлежит государство. Если нет канала там, он будет нулевым
- идентификатор устройства - идентификатор устройства, которому принадлежит государство. Если нет канала там, он будет нулевым
- имя устройства - имя устройства, которому принадлежит государство. Если нет канала там, он будет нулевым
- значение состояния - фактическое значение запущенного состояния
- отметка времени состояния - фактическая отметка времени как объекта Date
- государственное качество - актуальный код качества
- источник значения - имя экземпляра, вызвавшего изменение
- это команда или обновление - это команда (ack = false) или обновление (ack = true)
- последнее изменение состояния - отметка времени последнего изменения этого значения
- предыдущее значение - предыдущее значение этого состояния до срабатывания триггера
- предыдущая временная метка - предыдущая временная метка этого состояния до срабатывания триггера
- предыдущее качество - предыдущее качество этого состояния до срабатывания триггера
- предыдущий источник - предыдущий источник этого состояния до срабатывания триггера
- предыдущая команда или обновление - предыдущий тип этого значения до срабатывания триггера
- предыдущее последнее изменение - предыдущее «последнее измененное значение» этого состояния до срабатывания триггера

Типичное использование:

![Информация о триггере](../../../de/adapterref/iobroker.javascript/img/trigger_object_id_1_en.png)

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

& nbsp;

### Расписание
![график](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_en.png)

Это второй основной блок для автоматизации после [«Триггер при изменении состояний»](#trigger-on-states-change). Этот блок позволяет периодически выполнять некоторые действия.

Определение правила расписания будет сделано в очень хорошо задокументированном CRON [формат](https://en.wikipedia.org/wiki/Cron). С расширением, эти секунды также могут быть определены.
Если необходимо использовать секунды, они должны быть определены как самый первый параметр правила CRON, и правило будет состоять из 6 частей.

Обычно правило CRON состоит из 5 или 6 частей:

- правила секунд (необязательно)
- правила минут
- правила часов
- правила дня месяца
- правила месяца
- и правила дня недели.

Для каждой части разрешены следующие форматы:

- \ * - огонь каждый (секунда, минута, час, ...)
- X (например, 5) - огонь только в эту секунду, минуту, час ...
- от-до (например, 1-9) - огонь только в этом интервале
- \ * / X (например, \ * / 5) - срабатывать каждые X секунд, минут ... В случае «\ * / 5» в течение нескольких часов триггер сработает в 0, 5, 10, 15 и 20 часов.
- числа и интервалы могут быть объединены запятой (например, 1,3,4-6). Не делайте пробелы между числами, потому что пробел является разделителем для частей правила.

\ */ 10 \* \ *\* 6.7 - стреляйте каждые 10 минут в субботу и воскресенье.

\ */ 30 \* \ *\* \ *\* - стрелять каждые 30 секунд.

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

или если используются секунды:

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

Но есть хорошая помощь для вас, чтобы построить такие правила. При нажатии на правило откроется диалоговое окно CRON, и вы можете указать мышью свое правило.

![график](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_1_en.png)

& nbsp;

### Триггер на астро-событии
![график](../../../de/adapterref/iobroker.javascript/img/trigger_astro_en.png)

Выполните какое-то действие по астрологическому событию. Возможны следующие события:

- восход солнца: восход солнца (верхний край солнца появляется на горизонте)
- sunriseEnd: восход солнца заканчивается (нижний край солнца касается горизонта)
- goldenHourEnd: утренний золотой час (мягкий свет, лучшее время для фотографии) заканчивается
- solarNoon: солнечный полдень (солнце находится на самой высокой позиции)
- goldenHour: вечер золотого часа начинается
- sunsetStart: начинается закат (нижний край солнца касается горизонта)
- закат: закат (солнце исчезает за горизонтом, начинается вечерние гражданские сумерки)
- сумерки: сумерки (вечерние морские сумерки начинаются)
- nauticalDusk: морской закат (вечерние астрономические сумерки начинаются)
- ночь: начинается ночь (достаточно темная для астрономических наблюдений)
- nightEnd: ночь заканчивается (начинаются утренние астрономические сумерки)
- nauticalDawn: морской рассвет (начинаются утренние морские сумерки)
- рассвет: рассвет (утренние морские сумерки заканчиваются, начинаются утренние гражданские сумерки)
- Надир: Надир (самый темный момент ночи, солнце находится в самом низком положении)

** Примечание: ** для использования функции "astro" "широта" и "долгота" должны быть определены в настройках адаптера javascript.

Дополнительно вы можете установить смещение в минутах для астрологического события, например, спустить курок за 1 час до спуска:

![график](../../../de/adapterref/iobroker.javascript/img/trigger_astro_1_en.png)

Как видите, смещение может быть и отрицательным, чтобы указать время до астрологических событий.

& nbsp;

### Именованное расписание
![график](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_en.png)

Этот блок такой же, как [график](#schedule), но с возможностью установить правило CRON по строке и с возможностью остановить расписание.

Вы можете указать уникальное имя этого блока расписания, а затем очистить его с помощью [Четкое расписание](#clear-schedule).

Вот пример настраиваемого будильника:

![график](../../../de/adapterref/iobroker.javascript/img/trigger_schedule_ex_1_en.png)

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

& nbsp;

### Очистить расписание
![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_clear_en.png)

С помощью этого функционального блока вы можете очистить именованное расписание. Если вы определили named еще раз, не очистив его, старый все равно будет активен.

Смотрите пример в [Названный график](#named-schedule)

& nbsp;

### CRON диалог
![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_en.png)

Создать CRON-правило из диалога. Этот блок может быть связан с [Названный график](#named-schedule).

![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_input_1_en.png)

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

& nbsp;

### CRON rule
![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_en.png)

Объедините правило CRON из разных частей.

Вы можете отобразить правило в виде блока или в виде строки:

![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_1_en.png)

С помощью дополнительного параметра «с секундами» вы также можете указать секунды для правила CRON

![график](../../../de/adapterref/iobroker.javascript/img/trigger_cron_rule_2_en.png)

Этот блок можно использовать (например, блок [Диалог CRON] (# cron-dialog)) только с [Именованное расписание](#named-schedule).

& nbsp;

& nbsp;

## Тайм-ауты
### Отсроченное исполнение
![Задержка исполнения](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_en.png)

С помощью этого блока вы можете выполнять другие блоки с задержкой на некоторое время, указанное в миллисекундах.
если вы знаете javascript, это та же функция, что и setTimeout.

В блоке нет «паузы», но вы можете использовать этот блок для имитации паузы. Если вы разместите все блоки, которые должны быть выполнены после паузы, вы получите тот же эффект, что и с паузой.

Дополнительной функцией является установка интервала с помощью переменной, просто замените «ms» на предопределенную переменную: ![Выполнение по интервальной переменной](../../../de/adapterref/iobroker.javascript/img/Timer_variable_en.PNG)

Каждое отложенное выполнение может иметь уникальное имя. Это может быть отменено другим блоком. [Очистить отложенное выполнение](#clear-delayed-execution)

![Задержка исполнения](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_1_en.png)

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

& nbsp;

### Очистить отложенное выполнение
![Очистить отложенное выполнение](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_en.png)

Этот блок используется для отмены задержки запуска по имени. Типичное использование - симуляция сценария обнаружения движения.
При первом движении свет должен гореть, а после последнего движения через 30 секунд свет должен погаснуть.

![Очистить отложенное выполнение](../../../de/adapterref/iobroker.javascript/img/timeouts_timeout_clear_1_en.png)

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

& nbsp;

### Исполнение по интервалу
![Исполнение по интервалу](../../../de/adapterref/iobroker.javascript/img/timeouts_interval_en.png)

Этот блок позволяет периодически выполнять некоторые действия. Конечно, есть блок CRON, но блок CRON имеет наименьший интервал в одну секунду.
Этот блок может выполнять действия в миллисекундах.

Если вы установите слишком малый интервал (менее 100 мс), то интервалы будут больше.

Подобно блоку тайм-аута, вы также можете установить уникальное имя интервала.

& nbsp;

### Остановить выполнение по интервалу
![Остановить выполнение через интервал](../../../de/adapterref/iobroker.javascript/img/timeouts_interval_clear_en.png)

С помощью этого блока вы можете периодически отменять выполнение интервального блока по его имени.

& nbsp;

& nbsp;

## Логика
### Если еще блок
### Блок сравнения
### Логический блок И / ИЛИ
### Блок отрицания
### Логическое значение ИСТИНА / ЛОЖЬ
### Нулевой блок
### Тестовый блок
& nbsp;

& nbsp;

## Петли
### Повторить N раз
### Повторите, пока
### Count
### Для каждого
### Вырваться из цикла
& nbsp;

& nbsp;

## Математика
### Числовое значение
### Арифметические операции + - * / ^
### Квадратный корень, Abs, -, ln, log10, e ^, 10 ^
### Грех, потому что, загар, асин, акос, атан
### Математические константы: пи, е, фи, sqrt (2), sqrt (1/2), бесконечность
### Четное, нечетное, простое, целое, положительное, отрицательное, делится на
### Изменение по значению (плюс или минус)
### Круглый, напольный, потолочный
### Операции со списком значений: сумма, минимум, максимум, среднее, медиана, режимы, отклонение, случайный элемент
### Модуль
### Ограничить некоторое значение минимальным и максимальным
### Случайное значение от 0 до 1
### Случайное значение между мин и макс
& nbsp;

& nbsp;

## Текст
### Строковое значение
### Конкатенация строк
### Добавить строку в переменную
### Длина строки
### Строка пуста
### Найти позицию в строке
### Получить символ в строке на определенной позиции
### Получить подстроку
### Преобразовать в верхний или нижний регистр
### Стрижка
& nbsp;

& nbsp;

## Списки
### Создать пустой список
### Создать список со значениями
### Создать список с тем же значением N раз
### Получить длину списка
### Список пуст
### Найти позицию элемента в списке
### Получить элемент в списке
### Установить элемент в списке
### Получить список рассылки
### Конвертировать текст в список и наоборот
& nbsp;

& nbsp;

## Цвет
### Значение цвета
### Случайный цвет
### RGB цвет
### Смешивать цвета
& nbsp;

& nbsp;

## Переменные
### Установить значение переменной
![Установить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_set_en.png)

Чтобы использовать этот блок, вы должны понимать основные правила программирования: как использовать переменные.

С помощью этого блока вы можете записать в глобальную (видимую везде в этом скрипте) переменную и использовать ее для хранения некоторых значений. Если переменная не существует, она будет объявлена автоматически.

Этот блок может создать новую переменную или использовать существующую.

![Установить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_set_1_en.png)

Этот код:

![Установить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_set_2_en.png)

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

делает только это:

```javascript
var item;
item = 0;
```

& nbsp;

### Получить значение переменной
![Получить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_get_en.png)

Этот блок получает значение переменной. Вы можете создать новый или использовать существующий.

![Получить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_get_1_en.png)

Есть одно исключение с триггерными блоками [Триггер при изменении состояния] (# триггер при изменении состояния) и [Триггер при изменении состояния](#trigger-on-state-change).
Внутри этих блоков переменная «значение» еще существует, но в любом случае, чтобы прочитать их значения, необходимо переименовать переменную в значение и затем использовать ее.

![Получить значение переменной](../../../de/adapterref/iobroker.javascript/img/variables_get_2_en.png)

& nbsp;

& nbsp;

## Функции
### Создать функцию из блоков без возвращаемого значения
### Создать функцию из блоков с возвращаемым значением
### Возвращаемое значение в функции
### Создать пользовательскую функцию без возвращаемого значения
### Создать пользовательскую функцию с возвращаемым значением
### Вызов функции