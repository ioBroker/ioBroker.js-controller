---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.modbus/README.md
title: iobroker.modbus
hash: W78h8cDmiiVC7EQz9IpNrKqsdqu4+7O5CWHO43ZIHVY=
---
![Логотип](../../../en/adapterref/iobroker.modbus/admin/modbus.png)

![Количество установок](http://iobroker.live/badges/modbus-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.modbus.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.modbus.svg)
![NPM](https://nodei.co/npm/iobroker.modbus.png?downloads=true)

# Iobroker.modbus
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Реализация ModBus Slave и Master для ioBroker. Поддерживаются следующие типы:

- Modbus RTU через последовательный порт (мастер)
- Modbus RTU через TCP (мастер)
- Modbus TCP (ведомый, ведущий)

## Настройки
### Партнерский IP-адрес
IP-адрес партнера Modbus.

### Порт
TCP-порт партнера Modbus, если он настроен как главный (клиент) или собственный порт, если настроен как подчиненный (сервер).

### Идентификатор устройства
ID устройства Modbus. Важно, если используется мост TCP / Modbus.

### Тип
Slave (сервер) или Master (клиент).

### Использовать псевдонимы в качестве адреса
Обычно все регистры могут иметь адреса от 0 до 65535. Используя псевдонимы, вы можете определять поля виртуального адреса для каждого типа регистров. Как обычно:

- дискретные входы от 10001 до 20000
- катушки от 1 до 1000
- регистры ввода от 30001 до 40000
- регистры хранения от 40001 до 60000

Каждый псевдоним будет внутренне сопоставлен с адресом, например 30011 будет отображен на входной регистр 10. и так далее.

### Не выравнивать адреса по слову
Обычно адреса катушек и дискретных входов выровнены по 16 битам. Подобные адреса с 3 по 20 будут выровнены от 0 до 32.
Если эта опция активна, адреса не будут выровнены.

### Округлить вещественное число до
Сколько цифр после запятой для чисел с плавающей запятой и удвоений.

### Задержка опроса
Интервал циклического опроса (актуально только для мастера)

### Время повторного подключения
Интервал повторного подключения (актуально только для мастера)

### Время импульса
если импульс используется для катушек, это определяет интервал продолжительности импульса.

### Максимальная длина запроса на чтение
Максимальная длина команды READ_MULTIPLE_REGISTERS как количество регистров для чтения.

Некоторые системы требуют первого «запроса записи» для доставки данных по «запросу чтения».
Вы можете принудительно включить этот режим, установив для параметра «Максимальная длина запроса на чтение» значение 1.

** Примечание: ** Некоторые решения USB Modbus (например, основанные на socat) могут иметь проблемы при работе с модулем последовательного порта npm.

Существует программный шлюз [** Modbus RTU <-> Modbus RTU через TCP **](http://mbus.sourceforge.net/index.html), позволяющий использовать последовательный RTU по протоколу TCP.

Оба решения **RTU через TCP** и **TCP** работают хорошо.

### Не используйте несколько регистров
Если ведомое устройство не поддерживает команду «записать несколько регистров», вы можете активировать ее, чтобы получать предупреждения, когда будут записаны несколько регистров.

### Интервал записи
Задержка между двумя запросами на запись в мс. По умолчанию 0.

## Параметры для одной адресной строки в config
### Адрес
Адрес Modbus для чтения

### Идентификатор ведомого устройства В случае наличия нескольких ведомых устройств это идентификатор, если не тот, который задан по умолчанию в глобальной конфигурации.
### Имя Это имя параметра
### Описание Описание параметра
### Единица Единица измерения параметра
### Введите Datatype для чтения из Bus. Для получения дополнительной информации о возможных типах данных см. Раздел Типы данных
### Длина Длина параметра. Для большинства параметров это определяется на основе типа данных, но для строк это определяет длину в байтах / символах.
### Фактор Этот коэффициент используется для умножения считанного значения из шины для статического масштабирования. Таким образом, расчет выглядит следующим образом: val = x * Factor + Offset
### Смещение Это смещение добавляется к считанному значению после указанного выше умножения. Таким образом, расчет выглядит следующим образом: val = x * Factor + Offset
### Формула Это поле можно использовать для расширенных вычислений, если Фактора и Смещения недостаточно. Если это поле установлено, то поле «Фактор и смещение» игнорируется.
Формула выполняется функцией eval (). Поэтому поддерживаются все общие функции. Особенно математические функции. Формула должна соответствовать синтаксису Javascript, поэтому также позаботьтесь о верхнем и нижнем регистрах.
В формуле "x" должен использоваться для считываемого значения из Modbus. Например. "x * Math.pow (10, sf ['40065']);"

Если формула не может быть вычислена во время выполнения, адаптер записывает предупреждающее сообщение в журнал.

### Роль
Роль IOBroker для назначения

### Комната IOBroker Комната для назначения
### Опрос Если активирован, значения опрашиваются через предопределенный интервал от ведомого устройства.
### WP Импульс записи
### CW Циклическая запись
### SF Использовать значение как коэффициент масштабирования. Это необходимо для использования коэффициентов динамического масштабирования, которые в некоторых системах предоставляются через значения в интерфейсе. Если значение отмечено этим flac, то значение будет сохранено в переменной со следующим соглашением об именах: sf ['Modbus_address']. Затем эту переменную можно использовать в любой формуле для других параметров. Например. можно установить следующую формулу: "(x * sf ['40065']) + 50;"
## Типы данных
- uint16be - 16 бит без знака (Big Endian): AABB => AABB
- uint16le - 16 бит без знака (Little Endian): AABB => BBAA
- int16be - 16 бит со знаком (Big Endian): AABB => AABB
- int16le - 16 бит со знаком (Little Endian): AABB => BBAA
- uint32be - 32-битное беззнаковое (Big Endian): AABBCCDD => AABBCCDD
- uint32le - 32-битное беззнаковое (Little Endian): AABBCCDD => DDCCBBAA
- uint32sw - 32-битное беззнаковое (Big Endian Word Swap): AABBCCDD => CCDDAABB
- uint32sb - 32-битное беззнаковое (Big Endian Byte Swap): AABBCCDD => DDCCBBAA
- int32be - 32-битный знак (Big Endian): AABBCCDD => AABBCCDD
- int32le - 32-битный знак (Little Endian): ABBCCDD => DDCCBBAA
- int32sw - 32-битная подпись (замена слов с прямым порядком байтов): AABBCCDD => CCDDAABB
- int32sb - 32-битный знаковый (перестановка байтов Big Endian): AABBCCDD => DDCCBBAA
- uint64be - 64-разрядный беззнаковый (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- uint64le - Беззнаковый 64-разрядный (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- uint8be - 8 бит без знака (Big Endian): AA => AA
- uint8le - 8 бит без знака (Little Endian): AA => AA
- int8be - 8 бит со знаком (Big Endian): AA => AA
- int8le - 8 бит со знаком (Little Endian): AA => AA
- floatbe - Float (Big Endian): AABBCCDD => AABBCCDD
- floatle - Float (Little Endian): AABBCCDD => DDCCBBAA
- floatsw - Float (замена слов с прямым порядком байтов): AABBCCDD => CCDDAABB
- floatsb - Float (перестановка байтов с прямым порядком байтов): AABBCCDD => DDCCBBAA
- doublebe - Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH
- doublele - Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA
- строка - Строка (нулевой конец): ABCDEF \ 0 => ABCDEF \ 0
- строка - Строка (Little Endian, нулевой конец): BADCFE \ 0 => ABCDEF \ 0

Следующее описание было скопировано из [Вот](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

Протокол Modbus точка-точка - популярный выбор для связи RTU, хотя бы по той причине, что это простое удобство. Сам протокол контролирует взаимодействие каждого устройства в сети Modbus, то, как устройство устанавливает известный адрес, как каждое устройство распознает свои сообщения и как основная информация извлекается из данных. По сути, протокол является основой всей сети Modbus.

Однако такое удобство сопряжено с некоторыми сложностями, и протокол сообщений Modbus RTU не является исключением. Сам протокол был разработан на базе устройств с длиной регистра 16 бит. Следовательно, при реализации 32-битных элементов данных требовалось особое внимание. Эта реализация решила использовать два последовательных 16-битных регистра для представления 32 бита данных или, по сути, 4 байта данных. Именно в этих 4 байтах данных данные с плавающей запятой одинарной точности могут быть закодированы в сообщение Modbus RTU.

### Важность порядка байтов
Сам Modbus не определяет тип данных с плавающей запятой, но широко распространено мнение, что он реализует 32-битные данные с плавающей запятой с использованием стандарта IEEE-754. Однако в стандарте IEEE нет четкого определения порядка байтов полезной нагрузки данных. Поэтому наиболее важным соображением при работе с 32-битными данными является то, что данные адресуются в правильном порядке.

Например, число 123 / 456.00, определенное в стандарте IEEE 754 для 32-битных чисел с плавающей запятой одинарной точности, выглядит следующим образом:

![Изображение1](../../../en/adapterref/iobroker.modbus/img/img1.png)

Влияние различного порядка байтов значимо. Например, упорядочивание 4 байтов данных, которые представляют 123456,00 в последовательности «B A D C», называется «перестановкой байтов». При интерпретации как тип данных с плавающей запятой IEEE 744 результат будет совершенно другим:

![Изображение2](../../../en/adapterref/iobroker.modbus/img/img2.png)

Упорядочивание одних и тех же байтов в последовательности «C D A B» называется «заменой слов». Опять же, результаты сильно отличаются от исходного значения 123456.00:

![Изображение3](../../../en/adapterref/iobroker.modbus/img/img3.png)

Кроме того, как «замена байтов», так и «замена слов» по существу полностью изменит последовательность байтов, чтобы получить еще один результат:

![Изображение4](../../../en/adapterref/iobroker.modbus/img/img4.png)

Очевидно, что при использовании сетевых протоколов, таких как Modbus, необходимо уделять особое внимание тому, как байты памяти упорядочиваются при передаче, что также известно как «порядок байтов».

### Определение порядка байтов
Сам протокол Modbus объявлен как протокол с прямым порядком байтов в соответствии со Спецификацией протокола приложения Modbus, V1.1.b:

```Modbus uses a “big-Endian” representation for addresses and data items. This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.```

Big-Endian - это наиболее часто используемый формат для сетевых протоколов - настолько распространен, что его также называют «сетевым порядком».

Учитывая, что протокол сообщений Modbus RTU является прямым порядком байтов, для успешного обмена 32-битным типом данных через сообщение Modbus RTU необходимо учитывать порядок байтов как ведущего, так и ведомого устройства. Многие ведущие и ведомые устройства RTU позволяют конкретный выбор порядка байтов, особенно в случае программно-смоделированных устройств. Нужно просто убедиться, что оба модуля установлены в один и тот же порядок байтов.

Как показывает практика, порядок байтов определяется семейством микропроцессоров устройства. Как правило, стиль big-Endian (старший байт сохраняется первым, а затем младший) обычно встречается в процессорах, разработанных с процессором Motorola. Стиль little-Endian (сначала сохраняется младший байт, а затем старший) обычно встречается в процессорах, использующих архитектуру Intel. Какой стиль считается «обратным» - это вопрос личной точки зрения.

Если, однако, порядок байтов и порядок байтов не являются настраиваемой опцией, вам придется определить, как интерпретировать байт. Это можно сделать, запросив известное значение с плавающей запятой у ведомого устройства. Если возвращается невозможное значение, то есть число с двузначным показателем степени или тому подобное, порядок байтов, скорее всего, потребуется изменить.

### Практическая помощь
Драйверы FieldServer Modbus RTU предлагают несколько перемещений функций, которые обрабатывают 32-битные целые числа и 32-битные значения с плавающей запятой. Что еще более важно, эти функциональные перемещения учитывают все различные формы байтовой последовательности. В следующей таблице показано, как функция FieldServer перемещает два соседних 16-разрядных регистра в 32-разрядное целое число.

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32 | N / A | [a b] [c d] | [а б в г] |
| 2.i16-1.i32-s | замена байтов и слов | [a b] [c d] | [d c b a] |
| 2.i16-1.i32-sb | перестановка байтов | [a b] [c d] | [b a d c] |
| 2.i16-1.i32-sw | обмен словами | [a b] [c d] | [c d a b] |

В следующей таблице показано, как функция FieldServer перемещает два соседних 16-разрядных регистра в 32-разрядное значение с плавающей запятой:

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat | N / A | [a b] [c d] | [а б в г] |
| 2.i16-1.ifloat-s | замена байтов и слов | [a b] [c d] | [d c b a] |
| 2.i16-1.ifloat-sb | перестановка байтов | [a b] [c d] | [b a d c] |
| 2.i16-1.ifloat-sw | обмен словами | [a b] [c d] | [c d a b] |

В следующей таблице показано, как функция FieldServer перемещает, копируя одно 32-битное значение с плавающей запятой в два соседних 16-битных регистра:

| Ключевое слово функции | Режим обмена | Исходные байты | Целевые байты |
|------------------|-------------------|-----------------|----------------|
| 1.float-2.i16 | Н / Д | [a b] [c d] | [a b] [c d] |
| 1.float-2.i16-s | замена байтов и слов | [a b] [c d] | [d c] [b a] |
| 1.float-2.i16-sb | перестановка байтов | [a b] [c d] | [b a] [d c] |
| 1.float-2.i16-sw | замена слов | [a b] [c d] | [c d] [a b] |

Учитывая различные перемещения функций FieldServer, правильная обработка 32-битных данных зависит от выбора правильного. Обратите внимание на следующее поведение этой функции FieldServer при перемещении известного десятичного значения с плавающей запятой одинарной точности 123456.00:

| 16-битные значения | Функция Move | Результат | Функция Move | Результат |
|---------------|-------------------|-----------|-------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float | 123456.00 | 1.float-2.i16 | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s | 123456.00 | 1.float-2.i16-s | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.флот-2.и16-сб | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Обратите внимание, что разный порядок байтов и слов требует использования соответствующего перемещения функции FieldServer. После выбора правильного перемещения функции данные можно преобразовать в обоих направлениях.

Из множества доступных в Интернете преобразователей и калькуляторов шестнадцатеричных чисел в числа с плавающей запятой очень немногие позволяют управлять порядком байтов и слов. Одна такая утилита находится по адресу www.61131.com/download.htm, откуда можно загрузить версии утилит для Linux и Windows. После установки утилита запускается как исполняемый файл с единым диалоговым интерфейсом. Утилита представляет десятичное значение с плавающей запятой 123456.00 следующим образом:

![Изображение5](../../../en/adapterref/iobroker.modbus/img/img5.png)

Затем можно поменять местами байты и / или слова, чтобы проанализировать, какие потенциальные проблемы с порядком следования байтов могут существовать между ведущим устройством Modbus RTU и ведомыми устройствами.

## Контрольная работа
В папке * test 'есть несколько программ для проверки связи TCP:

- Ananas32 / 64 - симулятор подчиненного устройства (только регистры хранения и входы, без катушек и цифровых входов)
- РММС - мастер-симулятор
- mod_RSsim.exe - симулятор рабов. Возможно, вам понадобится [Распространяемый пакет Microsoft Visual C ++ 2008 SP1] (https://www.microsoft.com/en-us/download/details.aspx?id=5582) для его запуска (из-за ошибки SideBySide).

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog

### 3.2.0 (2020-12-09)
* (nkleber78) Fixed formula where return keyword was missing

### 3.1.13 (2020-12-07)
* (nkleber78) Added the possibility to use formulas for values

### 3.1.12 (2020-12-05)
* (Apollon77) fix admin serial port selection

### 3.1.10 (2020-09-25)
* (nkleber78) Corrected: the exported data cannot be imported without modification

### 3.1.9 (2020-09-17)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MODBUS-1C)  

### 3.1.7 (2020-07-23)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-N)

### 3.1.6 (2020-07-06)
* (bluefox) Fix some Sentry crash reports (IOBROKER-MODBUS-J)

### 3.1.5 (2020-06-29)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-F)

### 3.1.4 (2020-06-24)
* (Apollon77) Fix some Sentry crash reports (IOBROKER-MODBUS-4, IOBROKER-MODBUS-7, IOBROKER-MODBUS-6)
* (Apollon77) Change the way adapter restarts when reconnections do not help

### 3.1.3 (2020-06-12)
* (Apollon77) fix scheduled restart

### 3.1.2 (2020-06-12)
* (Apollon77) fix serialport list for Admin

### 3.1.1 (2020-06-11)
* (Apollon77) Add Sentry crash reporting when used with js-controller >=3.x

### 3.1.0 (2020-06-11)
* (Apollon77) Make sure that regular adapter stops do not terminate the process, so that scheduled restarts still work
* (Apollon77) update serialport, support nodejs 12/14

### 3.0.4 (2020-06-05)
* (bluefox) Added device ID by export/import
* (bluefox) Added the write interval parameter
* (bluefox) Added the disabling of write multiple registers

### 3.0.3 (2020-06-05)
* (bluefox) Corrected error after refactoring

### 3.0.2 (2020-06-01)
* (compton-git) Decodes 0xFF00 as coil ON

### 3.0.1 (2020-01-23)
* (BlackBird77) Fixes for Serial Timeouts done
* (bluefox) Refactoring

### 3.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 2.0.9 (2018-10-11)
* (Bjoern3003) Write registers was corrected

### 2.0.7 (2018-07-02)
* (bluefox) The server mode was fixed

### 2.0.6 (2018-06-26)
* (bluefox) rtu-tcp master mode was fixed

### 2.0.3 (2018-06-16)
* (bluefox) Fixed the rounding of numbers

### 2.0.2 (2018-06-12)
* (bluefox) The error with blocks reading was fixed
* (bluefox) The block reading for discrete values was implemented

### 2.0.1 (2018-05-06)
* (bluefox) Added the support of multiple device IDs

### 1.1.1 (2018-04-15)
* (Apollon77) Optimize reconnect handling

### 1.1.0 (2018-01-23)
* (bluefox) Little endian strings added
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-20)
* (bluefox) Fixed read of coils

### 0.5.4 (2017-09-27)
* (Apollon77) Several Fixes

### 0.5.0 (2017-02-11)
* (bluefox) Create all states each after other

### 0.4.10 (2017-02-10)
* (Apollon77) Do not recreate all datapoints on start of adapter
* (ykuendig) Multiple optimization and wording fixes

### 0.4.9 (2016-12-20)
* (bluefox) fix serial RTU

### 0.4.8 (2016-12-15)
* (Apollon77) update serialport library for node 6.x compatibility

### 0.4.7 (2016-11-27)
* (bluefox) Use old version of jsmodbus

### 0.4.6 (2016-11-08)
* (bluefox) backward compatibility with 0.3.x

### 0.4.5 (2016-10-25)
* (bluefox) better buffer handling on tcp and serial

### 0.4.4 (2016-10-21)
* (bluefox) Fix write of holding registers

### 0.4.1 (2016-10-19)
* (bluefox) Support of ModBus RTU over serial and over TCP (only slave)

### 0.3.11 (2016-08-18)
* (Apollon77) Fix wrong byte count in loop

### 0.3.10 (2016-02-01)
* (bluefox) fix lost of history settings.

### 0.3.9 (2015-11-09)
* (bluefox) Use always write_multiple_registers by write of holding registers.

### 0.3.7 (2015-11-02)
* (bluefox) add special read/write mode if "Max read request length" is 1.

### 0.3.6 (2015-11-01)
* (bluefox) add cyclic write for holding registers (fix)

### 0.3.5 (2015-10-31)
* (bluefox) add cyclic write for holding registers

### 0.3.4 (2015-10-28)
* (bluefox) add doubles and fix uint64

### 0.3.3 (2015-10-27)
* (bluefox) fix holding registers

### 0.3.2 (2015-10-27)
* (bluefox) fix import from text file

### 0.3.1 (2015-10-26)
* (bluefox) fix error with length of read block (master)
* (bluefox) support of read blocks and maximal length of read request (master)
* (bluefox) can define fields by import

### 0.3.0 (2015-10-24)
* (bluefox) add round settings
* (bluefox) add deviceID
* (bluefox) slave supports floats, integers and strings

### 0.2.6 (2015-10-22)
* (bluefox) add different types for inputRegisters and for holding registers ONLY FOR MASTER

### 0.2.5 (2015-10-20)
* (bluefox) fix names of objects if aliases used

### 0.2.4 (2015-10-19)
* (bluefox) fix error add new values

### 0.2.3 (2015-10-15)
* (bluefox) fix error with master

### 0.2.2 (2015-10-14)
* (bluefox) implement slave
* (bluefox) change addressing model

### 0.0.1
* (bluefox) initial commit

The MIT License (MIT)

Copyright (c) 2015-2020 Bluefox <dogafox@gmail.com>

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