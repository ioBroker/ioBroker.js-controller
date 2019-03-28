---
BADGE-Number of Installations: http://iobroker.live/badges/s7-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.s7.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.s7.svg
BADGE-Tests: https://travis-ci.org/ioBroker/ioBroker.s7.svg?branch=master
BADGE-NPM: https://nodei.co/npm/iobroker.s7.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.s7/README.md
title: ioBroker.S7
hash: I6x/U3+nhImauYGf++qbdsGE3FrGTXoqptKnNB87LBo=
---
# IoBroker.S7
## Подробное описание
Адаптер S7, который поставляется с ioBroker, основан на Snap7 \. Snap7 будет установлен во время первой установки адаптера и обрабатывает связь TCP / IP между ПЛК S7 и ioBroker. Поэтому обязательно, чтобы S7 был оснащен интерфейсом Ethernet (встроенным или внешним CP) для связи по TCP / IP с оборудованием, на котором работает ioBroker. В качестве предварительного условия пользователь должен знать основы связи по протоколу TCP / IP и должен иметь возможность конфигурировать ПЛК S7 с помощью программного обеспечения Step7. Но это не должно быть проблемой для тех, кто рассматривает возможность подключения S7 к ioBroker.

## Монтаж
Это руководство основано на следующей конфигурации:

* S7-315 со встроенным интерфейсом Ethernet
* Raspberry Pi 2, ioBroker, работающий под Debian GNU / Linux 7.8 (wheezy)
* Диапазон IP-адресов 192.168.1.xxx
* ПК работает:
    * Инструмент для работы с электронными таблицами, такой как MS Excel, Apache Open Office
    * Браузер Google Chrome
    * Step7 V5.5 SP4 HF5

** нужен дополнительный документ: (iobroker_adapter_S7.xlsx) [iobroker_adapter_S7.xlsx] **

### Связь через блоки данных (БД)
В этом руководстве описывается связь между ioBroker и ПЛК S7 через блоки данных. Для связи могут быть созданы идеально выделенные БД. БД должны быть интегрированы в код, запущенный в S7 \. Преимущество такого подхода заключается в том, что вы можете быть уверены, что не будете перезаписывать данные случайно, например, в экземпляре блока данных, что может привести к нежелательным или неожиданным реакциям в вашем программном обеспечении S7. Если вам приходится использовать существующие блоки данных из-за ограничений памяти или из-за невозможности внесения каких-либо изменений в программное обеспечение S7, убедитесь, что вы вводите соответствующие данные в ioBroker только во избежание конфликтов.

### Генерация БД связи
Мы собираемся работать с 4 БД:

* DB20 - двоичные значения, отправленные из ioBroker в S7 (цифровой вход из представления S7)
* DB21 - двоичные значения, отправленные в ioBroker из S7 (цифровой вывод из представления S7)
* DB22 - Реальные значения, отправленные из ioBroker в S7 (аналоговый вход из представления S7)
* DB23 - реальные значения, отправленные в ioBroker из S7 (аналоговый выход из представления S7)

БД будут генерироваться с использованием электронной таблицы с одной таблицей на блок данных.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_1.png)

#### Подготовка DB20 - двоичные значения, отправленные из ioBroker в S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

Столбцы от A до M основаны на структуре в ioBroker и должны быть заполнены пользователем на основе программного обеспечения S7. Возможно, вы захотите использовать части таблицы символов S7 (копировать - вставить). В столбце O код для S7 DB выводится из содержимого в столбцах от A до M.

* Столбец A: DB = номер БД в S7 и первая часть адреса в ioBroker
* Столбец B: Байт = Байт в БД в S7 и вторая часть адреса в ioBroker
* Столбец C: Бит = Бит в БД в S7 и третья часть адреса в ioBroker
* Столбец D: Имя = Имя в БД в S7 и имя в ioBroker
* Колонка E: Описание = Комментарий в БД в S7 и описание в ioBroker
* Столбец F: Тип = Введите в БД в S7 и введите в ioBroker
* Столбец G: длина = длина в ioBroker
* Колонка H: Единица = Единица в ioBroker
* Столбец I: Роль = роль в ioBroker
* Столбец J: Комната = комната в ioBroker
* Столбец K: опрос = точка данных будет опрашиваться циклически (истина / ложь)
* Столбец L: RW = точка данных может быть записана (true / false) и «true» в DB20, поскольку мы хотим записать данные в S7
* Столбец M: WP = точка данных будет установлена на «1» только для «времени импульса», определенного в «General - General»

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_config_1.png)

* Столбец N: намеренно оставлено пустым
* Столбец O: содержимое БД = содержимое, которое будет скопировано в Шаг 7 для генерации БД, формула: `` `= CONCATENATE (D2;": "; F2;": = ";" false; ";" // "; E2 ) `` `

#### Подготовка DB21 - двоичные значения, отправленные в ioBroker из S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_3.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец L: RW и «ложь» в DB21, поскольку мы хотим читать данные с S7

#### Подготовка DB22 - реальные значения, отправленные с ioBroker на S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_4.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец B: Байт = начальный байт действительного значения (0, 4, 8,…)
* Столбец C: Бит = оставлено пустым
* Столбец L: RW и «истина» в DB22, поскольку мы хотим записать данные в S7
* Столбец O: Формула: `` `= CONCATENATE_ _ (D2;": "; F2;": = ";" 0.000000e + 000; ";" // "; E2)` ``

#### Подготовка DB23 - Реальные значения, отправленные в ioBroker из S7
![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_tabelle_5.png)

![](../../../en/adapterref/iobroker.s7/img/zoom61_black.png)

* Столбец B: Байт = начальный байт действительного значения (0, 4, 8,…)
* Столбец C: Бит = оставлено пустым
* Столбец L: RW и «ложь» в DB23, поскольку мы хотим читать данные с S7
* Столбец O: Формула: `` `= CONCATENATE_ _ (D2;": "; F2;": = ";" 0.000000e + 000; ";" // "; E2)` ``

#### Создание источников БД в Шаге 7
Теперь мы сгенерируем БД в Шаге 7, используя код в столбце O нашей электронной таблицы. В вашей программе Step7 вставьте источник STL, щелкнув правой кнопкой мыши на «Источники». [![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_1.png)

Переименуйте новый источник в «DB20».
Вставьте следующий код в пустой источник:

```
DATA_BLOCK DB 20
    TITLE =
    VERSION : 0.1
    STRUCT
    END_STRUCT ;
    BEGIN
END_DATA_BLOCK
```

Источник должен выглядеть так:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_2.png)

Скопируйте источник «DB20» 3 раза и назовите копии DB21, DB22, DB23, а также измените строку в каждом источнике на:

* `` `DATA_BLOCK DB 21```
* `` `DATA_BLOCK DB 22```
* `` `DATA_BLOCK DB 23```

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_3.png)

Теперь перейдите к электронной таблице, таблице DB20, и скопируйте код в столбце O (без заголовка):

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_4.png)

Вставьте ячейки в источнике под названием «DB20» на шаге 7 между «STRUCT» и «END_STRUCT;»

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_5.png)

Запустите компилятор, и результат должен быть 0 ошибок, 0 предупреждений. DB20 теперь сгенерирован, и вы нашли новый блок в разделе «Блоки» в вашей программе S7.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_6.png)

Блок выглядит так:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_7.png)

 Адрес должен соответствовать адресу в электронной таблице, просто выполните проверку работоспособности, сравнив комбинацию байтов и битов:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_8.png)

Повторите эти действия для DB21, DB22, DB23 и убедитесь, что вы выбрали столбец O из правой таблицы и вставили его в правильный источник (таблица DB21 в источник DB21 и т. Д.). Поскольку DB22 и 23 будут работать со значениями REAL, вы можете найти ниже, как блоки будут смотреться

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_9.png)

Также здесь адрес должен соответствовать электронной таблице (байт):

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_10.png)

Теперь у нас есть 4 БД, необходимые для связи:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_step7_11.png)

Вы должны дать им символическое имя соответственно, что помогает сохранить ясность. Не забудьте подключить их к логике S7 и загрузить модифицированный код.

### Заполнение БД в ioBroker
Теперь, когда 4 БД являются частью кода, работающего в S7, мы расскажем ioBroker, как связаться с S7.

#### Установка экземпляра адаптера S7
Адаптеры - аппаратное обеспечение - Siemens S7 Adapter - +

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_1.png)

Несколько экземпляров возможны, если вы хотите, чтобы ваш ioBroker соединялся с несколькими процессорами S7. Включите новый экземпляр адаптера:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_2.png)

На этом шаге также можно изменить название адаптера (стандарт: адаптер Siemens S7). Использование IP-адреса в качестве части заголовка было бы одной идеей. Откройте конфигурацию адаптера

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_3.png)

и начинаем настраивать адаптер S7:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_4.png)

* Вкладка «Общие»
    * PLC соединение
        * IP-адрес ПЛК IP-адрес ПЛК, как определено в настройке StepW HW Config

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_5.png)

* S7 LOGO! Если вы используете ЛОГОТИП, а не ПЛК S7
* PLC Rack Rack номер процессора, как указано в конфигурации StepW HW (R0 / S2)
* Номер слота ПЛК ЦПУ, как указано в настройке StepW HW (R0 / S2)

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_6.png)

* Генеральный
    * Округление до: количество цифр, на которые будут округлены действительные значения после разделителя, например 2 -> 12.12 3 -> 12.123… 9 -> 12.123456789
    * Задержка опроса: цикл обновления связи в миллисекундах
* Время <span style="line-height: 1.5;">повторного подключения</span> : <span style="line-height: 1.5;">длительность в миллисекундах после попытки повторного подключения после потери соединения с S7.</span>
* Время импульса: <span style="line-height: 1.5;">время в миллисекундах для «1» для точек данных, настроенных как WP = true</span>
* Импорт файла символов:
    * Загрузка символов Функция импорта символов Step7 из файла ASCII - здесь не используется
* Импорт файла БД:
    * Добавление функции БД для импорта БД Step7 из файла ASCII - здесь не используется

#### Настройка ioBroker для связи
Мы пропускаем вкладки «Входы», «Выходы» и «Маркеры» и переходим прямо к «БД»:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_7.png)

Здесь вы можете найти структуру электронной таблицы. Мы снова готовы к массовому проектированию. Нажмите кнопку «Импортировать из CSV» [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_8.png)

и вы получите пустое поле. Теперь снова перейдите к электронной таблице, таблице DB20, и скопируйте столбцы от A до M (без заголовков). [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_9.png)

Вставьте ячейки в пустое поле импорта в ioBroker и подтвердите, нажав «Экспорт», который должен называться «Импорт». [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_10.png)

Первая БД готова и готова к общению:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_11.png)

Повторите для DB21, DB22, DB23 \. Каждый раз, когда вы нажимаете «Импорт из CSV», вы получаете пустое поле, но содержимое будет добавлено в список. Вы должны сделать это в кратчайшие сроки, независимо от того, сколько точек данных вы хотите заполнить. Если вы хотите использовать функции, которые входят в ioBroker, заполнив Длина, Единица, Роль, Комната, вы также можете сделать это в электронной таблице, чтобы воспользоваться преимуществами массового проектирования. Если вы решите сделать это позже или только для пары точек данных, вы также можете сделать это непосредственно в ioBroker в разделе «БД» со встроенными опциями редактирования. Не забудьте сохранить, хотя! 12 [

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_12.png)

#### Тест связи
Перейдите на вкладку «Объекты» в ioBroker и найдите экземпляр S7 (например, s7.0, а не system.adapter.S7.0). Если вам что-то не хватает: F5 (обновление веб-страницы) - король! Ее вы найдете две группы:

* БД с 4 БД, которые мы настроили:
    * DB20
    * DB21
    * DB22
    * DB23
* Информация с информацией о связи:
    * Соединение: «истина», если S7 можно найти в сети
    * pdu: PDU размера Snap7 подключен к S7 (обычно 240 для S7-300, 480 для S7-400)
    * poll_time: время в миллисекундах, которое Snap7 берет на связь - должно быть меньше, чем задержка опроса, настроенная в «General» - «General» в конфигурации экземпляра адаптера.

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_13.png)

 Мы настроили DB21 и DB23 как БД, отправляющие информацию в ioBroker, то есть, если вы открываете БД в разделе «Объекты», вы должны увидеть, что уже поступают значения, если в БД поступают данные из кода S7.

## Мониторинг и эксплуатация в vis
Запустите ioBroker.vis на вкладке «Экземпляры». Я рекомендую установить vis-hqwidgets. Давайте начнем с переключателя:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_14.png)

Перетащите виджет переключателя на свой вид, подключите его к идентификатору объекта переключателя в DB20, и все готово. Если вы сейчас используете коммутатор, вы обнаружите, что точка данных в «Объектах» - «s7.x» - «БД» - «DB20» будет переключаться, и S7 включит и выключит все, что когда-либо подключено к БД. Если вы выполните мониторинг БД на этапе 7 в режиме онлайн, вы увидите, что точка данных в БД изменится с «0» на «1» и т. Д. Бинарный статус работает точно так же: перетащите виджет в вид и подключите соответствующая точка данных от DB21 к нему. И то же самое снова для реальных ценностей:

![](../../../en/adapterref/iobroker.s7/img/adapter_en_s7_15.png)

Важно: пользователь отвечает за подключение правильных точек данных к виджетам. Вы можете подключить реальное значение к двоичному состоянию (например, лампочка), так что лампочка будет отображаться «вкл», как только действительное значение станет больше 1,0. Вот и все, ребята, довольно легко и прямо, а?

## Changelog
### 1.1.4 (2018.07.10)
* (Apollon77) Support for nodejs 10 on windows

### 1.1.3 (2018.01.19)
* (bluefox) The time offset was added

### 1.1.1 (2018.01.05)
* (Apollon77) Fix LOGO! support

### 1.1.0 (2018.01.03)
* (bluefox) Fix strings
* (bluefox) fix names if they have more than one space

### 1.0.6 (2017.12.18)
* (bluefox) Decode error codes

### 1.0.5 (2017.12.17)
* (bluefox) Error by the DB import is fixed

### 1.0.4 (2017.11.30)
* (bluefox) Fix read of DB (range error)

### 1.0.2 (2017.10.30)
* (Apollon77) Enhance object data to allow writing if available
* (bluefox) Add export from Graphpic

### 1.0.1 (2017.10.24)
* (bluefox) Detect DB and db in addresses

### 1.0.0 (2017.09.25)
* (bluefox) Activate save button if something was deleted

### 0.3.2 (2017.09.20)
* (bluefox) Fix DB bit offset bug if starting not from 0

### 0.3.0 (2017.07.12)
* (Apollon77) Upgrade node-snap7 library to current version

### 0.2.6 (2017.05.19)
* (Apollon77) Fix history handling

### 0.2.5 (2016.12.09)
* (bluefox) Fix button text: Import

### 0.2.4 (2015.10.29)
* (bluefox) add comment about python
* (bluefox) implement string read and write
* (bluefox) implement auto-increment of addresses.
* (bluefox) fix length
* (bluefox) implement export import from/to CSV
* (bluefox) fix small errors in config
* (bluefox) implement import/export for inputs and outputs too.
* (bluefox) add translation

### 0.2.3 (2015.09.24)
* (bluefox) add suppor of Logo!

### 0.2.2 (2015.09.11)
* (bluefox) add S7time
* (bluefox) support rooms and roles
* (bluefox) it works
* (bluefox) update packets

### 0.2.1 (2015.09.09)
* (bluefox) fix creation of objects

### 0.2.0 (2015.08.15)
* (bluefox) improve performance and enable DB2 3.9 addresses.

### 0.1.8 (2015.08.10)
* (smiling_Jack) Bugfix send info states
* (smiling_Jack) Remove unneeded conole.log

### 0.1.7 (2015.08.06)
* (smiling_Jack) Bugfix send to SPS
* (smiling_Jack) Bugfix reconnect on connection lost

### 0.1.6 (2015.07.31)
* (smiling_Jack) Bugfix typo (Adress, Merkers)

### 0.1.5 (2015.07.29)
* (smiling_Jack) Bugfix translation Admin

### 0.1.4 (2015.07.28)
* (smiling_Jack) Add S5Time as Type
* (smiling_Jack) Bugfix History
* (smiling_Jack) Bugfix (fast value change)

### 0.1.3 (2015.06.04)
* (bluefox) translate admin
* (bluefox) remove jshint warnings
* (bluefox) add info.connected and rename info.connection to info.state

### 0.1.2
* Bugfix startup
* Bugfix add states

### 0.1.1
* change import options

### 0.1.0
* redesign Admin UI
* add write as Pulse
* Bugfix delete unused objects

### 0.0.8
* Bugfix start file
* Bugfix DB import
* Working on Admin style
* Add Units

### 0.0.6
* Bugfix start file