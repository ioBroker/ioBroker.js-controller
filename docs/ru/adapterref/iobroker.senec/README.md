---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/nobl/iobroker.senec.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/nobl/ioBroker.senec/master.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.senec/README.md
title: ioBroker.senec
hash: yHSh9ZxI8b/Rf5ZSdeDzYz/gikzalfpid0Vt2yPaIgQ=
---
![логотип](../../../de/adapterref/iobroker.senec/admin/senec.png)

# IoBroker.senec
## Адаптер SENEC для ioBroker
Адаптер разработан для систем Senec Home V2.1.
В системе Senec.Home нельзя изменить никакие значения. Интеграция платы за безопасность была намеренно опущена.
В настоящее время Senec больше не предоставляет надежный способ воздействия на пиковое бритье через веб-интерфейс. Для этого mein-senec.de должен приложить усилия.
Работают ли с ним и другие системы (например, V3), зависит от того, основаны ли они также на lala.cgi и предоставляют ту же информацию JSON.
Даже при интеграции в Senec.Clound нет гарантии, что данные все еще можно будет вызывать через веб-интерфейс (см. Полевые отчеты).

Системы, которые должны работать, потому что они используют один и тот же интерфейс, перечислены ниже. Однако точки данных могут быть разными (отсутствующими, дополнительными, измененными).

* Senec Home 4.0 / свинец
* Senec Home 6.0 Pb
* Senec Home 8.0 / свинец
* Senec Home 10.0 Пб
* Senec Home 5.0 / 7.5 / 10.0 / Литий
* Senec Home 15.0 / Литий
* Senec Home V2 5.0 / 7.5 / 10.0
* Senec Home V2 10.0 / ведущий
* Senec Home V2.1 1 фаза / литиевый
* Senec.Home V3 Гибрид
* Гибридный дуэт Senec.Home V3
* Senec Business 30.0 / свинец
* Senec Business V2 30.0 / ведущий
* Senec Business 25.0 / Литий
* Senec Business V2_2ph / Литий
* Senec Business V2 3 фазы / литиевый
* ADS Tec
* OEM LG
* Solarinvert Storage 10.0 / свинец,

### SENEC.Home
Это система, сердцем которой является литий-ионный аккумулятор, который накапливает и высвобождает электричество, вырабатываемое солнечной системой на крыше. Он работает так же, как аккумулятор в смартфоне, ноутбуке или аккумуляторной отвертке. В принципе, используется та же проверенная временем технология. Если вы производите на крыше больше электроэнергии, чем можете использовать самостоятельно в доме, электричество поступает не в сеть, а в вашу систему хранения. Вы можете использовать его, когда стемнеет или надвигаются облака, и вы производите меньше или не вырабатываете электричества. Затем вы можете управлять телевизором или готовить еду вечером на собственной солнечной энергии.

## Требования перед установкой
Обязательным условием работы системы хранения Senec.Home с ioBroker является успешная установка системы электриком. Система также должна быть в той же сети, что и ioBroker.

### Монтаж
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker.
После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## Конфигурация
### Окно «Основные настройки»
![Основные настройки](../../../de/adapterref/iobroker.senec/media/mainSettings.png "Основные настройки")

| Поле | Описание |
|:-------------|:-------------|
| Система SENEC | Здесь вводится IP-адрес желаемой системы Senec.Home. Если в сети есть работающий DNS, также можно указать полное доменное имя. |
| Интервал запроса, высокий приоритет | Здесь вы вводите временные интервалы (миллисекунды), через которые Senec.Home Systems получает высокий приоритет. (По умолчанию: 10 секунд) |

| Интервал запроса с низким приоритетом | Здесь вы вводите интервалы времени (миллисекунды), через которые Senec.Home Systems получает низкий приоритет. (По умолчанию: 60 минут)<br> Опасность! Если система SENEC запрашивается с слишком высокой частотой, это может означать, что на сервер SENEC больше нельзя передавать данные! (например, нет текущих значений в приложении или на mein-senec.de) |

| Тайм-аут запроса | Здесь вы вводите количество миллисекунд, по истечении которого система Senec.Home должна ответить на запрос не позднее, чем он будет отменен. (По умолчанию: 5000) |
| Попытки повторных попыток | Здесь вы указываете, как часто вы должны пытаться запрашивать систему Senec в случае ошибки. Это не применяется при запуске адаптера - если система недоступна, адаптер прекращает свою работу. (По умолчанию: 10) |
| Коэффициент повторения опроса | Это значение может использоваться, чтобы влиять на интервал между попытками повторения. Применяется следующее: n-я попытка повторения происходит через интервал *множитель* n секунд после попытки n-1. Пример: со стандартными значениями первая попытка повторения происходит через 20 секунд после первой попытки, а вторая попытка повторения происходит через 40 секунд после 1. Успешное извлечение данных сбрасывает счетчик повторений.  |

После завершения настройки в диалоговом окне настройки останется `SPEICHERN UND SCHLIEßEN`.
Затем будет перезапущен адаптер.

## Экземпляров
При установке адаптера был создан активный экземпляр адаптера sonnen в разделе `Objekte`.

На сервере ioBroker можно создать несколько экземпляров адаптера Senec. И наоборот, система Senec.Home также может работать с несколькими серверами ioBroker. Если несколько устройств должны управляться одним сервером ioBroker, необходимо создать экземпляр для каждой системы.<br/><br/> Активирован ли адаптер и подключен ли он к системе, отображается цветом поля состояния экземпляра. Если указатель мыши указывает на символ, отображается более подробная информация.

## Объекты адаптера
В разделе `Objekte` все устройства и действия, распознаваемые адаптером в концентраторе, перечислены в древовидной структуре.

Далее объекты делятся на состояния.
Каждая точка данных указана с соответствующим типом данных и полномочиями.
В настоящее время авторизации можно только читать (R). Каждую точку данных можно как минимум прочитать (R).
Для поиска определенной точки данных мы рекомендуем использовать для поиска комбинацию клавиш «CTRL + F».
В зависимости от отдельной системы состояния могут не существовать или могут также возникать недокументированные состояния.
Если для состояния нет документации, но кто-то знает, что представляет собой состояние, отправьте мне запрос на перенос (или откройте заявку с соответствующей информацией).

### Примеры состояний (доступные состояния зависят от системы и версии программного обеспечения)
#### Канал: информация
* info.connection

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если установлено соединение между ioBroker и Senec.Home.*

#### Канал: _calc
Этот канал содержит расчетные значения. В настоящее время это дневные значения для определенных точек данных.

* xxx.refDay

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | W |

   * Изменяемое число, указывающее день года, для которого применяются ежедневные данные.

* xxx.refValue

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | W |

   *Изменяемое число, указывающее, какое контрольное значение используется для расчета текущего суточного значения.*

* xxx.today

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | W |

   *Изменяемое число, представляющее текущее дневное значение соответствующей точки данных.*

* ххх. вчера

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | W |

   *Изменяемое число, представляющее значение соответствующей точки данных за предыдущий день.*

#### Канал: BMS
* BL [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемый номер, который гласит :? на каждый аккумулятор.*

* CHARGED_ENERGY [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   * Читаемое число, указывающее, сколько энергии было заряжено на каждый аккумулятор. Ед. изм: ?*

* CHARGE_CURRENT_LIMIT [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, насколько велика зарядная емкость каждой аккумуляторной батареи в амперах.*

* ТЕКУЩИЙ [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, сколько ампер в настоящее время имеет каждый аккумулятор.*

* ЦИКЛЫ [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько циклов зарядки имеет каждый аккумулятор.*

* DISCHARGED_ENERGY [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   * Читаемое число, показывающее, сколько энергии было получено от аккумуляторной батареи. Ед. изм: ?*

* DISCHARGE_CURRENT_LIMIT [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее текущую разрядную емкость каждого блока батарей.*

* FW [0-3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, какая версия микропрограммы установлена в аккумуляторной батарее.*

* HW_EXTENSION [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, какое аппаратное расширение имеет соответствующий аккумулятор.*

* HW_MAINBOARD [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, которое указывает версию аппаратного обеспечения материнской платы соответствующей аккумуляторной батареи.*

* MAX_CELL_VOTAGE [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, насколько велико максимальное напряжение отдельной аккумуляторной батареи.*

* MIN_CELL_VOTAGE [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, насколько высокое минимальное напряжение отдельного блока батарей.*

* SN [0-3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Только для чтения номер, который показывает серийный номер отдельной аккумуляторной батареи.*

* SOC [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, обозначающее уровень заряда отдельной аккумуляторной батареи.*

* SOH [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее на состояние здоровья отдельного аккумулятора.*

* СТАТУС [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, которое указывает состояние отдельного аккумулятора.*

* TEMP_MAX [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее максимальную температуру отдельной аккумуляторной батареи.*

* TEMP_MIN [0–3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее минимальную температуру отдельной аккумуляторной батареи.*

* НАПРЯЖЕНИЕ [0-3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, насколько высокое напряжение отдельной аккумуляторной батареи.*

* BMS_READY_FLAG

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если BMS готова.*

* MODULES_CONFIGURED

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько модулей настроено в системе.*

* MODULE_COUNT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Только читаемое число, которое указывает, сколько модулей подключено к системе (включая те, которые не настроены).*

* НАЧАТЬ ОБНОВЛЕНИЕ

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если должно быть запущено обновление.*

* WIZARD_ABORT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, если процесс установки был прерван.*

* WIZARD_CONFIRM

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, процесс установки подтвержден.*

* WIZARD_DCCONNECT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, что верно, процесс установки ?.*

* WIZARD_START

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое истинно, когда процесс установки был запущен.*

* WIZARD_STATE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Число только для чтения, указывающее статус процесса настройки.*

#### Канал: ЭНЕРГИЯ
* GUI_BAT_DATA_CURRENT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее текущий ток батареи в амперах.*

* GUI_BAT_DATA_FUEL_CHARGE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее уровень заполнения в% от системы.*

* GUI_BAT_DATA_VOLTAGE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Только чтение числа, которое показывает текущее напряжение батареи в вольтах*

* GUI_BAT_DATA_POWER

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, которое указывает, сколько ватт в настоящее время подается в аккумулятор или выводится из него (отрицательное значение).*

* GUI_BOOSTING_INFO

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, значение которого еще не совсем ясно.*

* GUI_CHARGING_INFO

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, указывающее, заряжается ли аккумулятор в данный момент.*

* GUI_GRID_POW

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько ватт в настоящее время потребляется из сети или подается в сеть (отрицательное значение).*

* GUI_HOUSE_POW

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько ватт в настоящее время потребляет дом.*

* GUI_INVERTER_POWER

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько ватт в настоящее время вырабатывается фотоэлектрической системой.*

* STAT_HOURS_OF_OPERATION

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее количество часов работы системы.*

* STAT_MAINT_REQUIRED

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, указывающее, нуждается ли система в обслуживании.*

* STAT_STATE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемый номер, который представляет состояние системы.*

* STAT_STATE_Text

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Символьная строка, доступная только для чтения, которая определяет статус системы в виде обычного текста. К сожалению, у нас есть только оригинальные тексты сенека на немецком языке.*

#### Канал: СТАТИСТИЧЕСКИЙ
* STAT_DAY_BAT_CHARGE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, сколько кВтч было сохранено в батарее на сегодняшний день.*

* STAT_DAY_BAT_DISCHARGE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   * Читаемое число, которое показывает, сколько кВтч было снято с батареи сегодня.

* STAT_DAY_E_GRID_EXPORT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, которое показывает, сколько кВтч было подано в сеть сегодня.*

* STAT_DAY_E_GRID_IMPORT

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, показывающее, сколько кВтч было взято из сети сегодня.*

* STAT_DAY_E_HOUSE

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, обозначающее сегодняшнее домашнее потребление в кВтч.*

* STAT_DAY_E_PV

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, указывающее, сколько кВтч было произведено фотоэлектрической системой на сегодняшний день.*

#### Канал: SYS_UPDATE
* NPU_IMAGE_VERSION

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   * Только читаемый номер со значением ревизии NPU-IMAGE (*

* NPU_VER

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Единственный читаемый номер, соответствующий значению ревизии NPU-REGS*

* ОБНОВЛЕНИЕ ДОСТУПНО

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, указывающее, доступно ли обновление (однако они предоставляются Senec и также импортируются автоматически).*

#### Канал: WIZARD
* APPLICATION_VERSION

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Только читаемый текст, со значением для версии MCU.*

* CONFIG_LOADED

    | Тип данных | Разрешение |
    |:---:|:---:|
    | логическое | R |

   *Только читаемое логическое значение, которое указывает, была ли загружена конфигурация (это значение не должно быть постоянно установлено на false).*

* INTERFACE_VERSION

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Только читаемый текст, со значением Revision GUI.*

* SETUP_NUMBER_WALLBOXES

    | Тип данных | Разрешение |
    |:---:|:---:|
    | номер | R |

   *Читаемое число, которое указывает, сколько настенных боксов настроено в системе.*

* SETUP_WALLBOX_SERIAL [0..3]

    | Тип данных | Разрешение |
    |:---:|:---:|
    | строка | R |

   *Только читаемый текст с указанием серийных номеров любых настенных боксов 0–3.*

## Changelog
### 1.2.0 (NoBl)
* Added datapoints for: PM1OBJ1, PM1OBJ2, EG_CONTROL, RTC, PM1, TEMPMEASURE, DEBUG, SOCKETS, CASC, WALLBOX, CONNX50, STECA (please report wrong / missing units).
* Adapter now calculates day-values for: STATISTIC.LIVE_GRID_EXPORT, STATISTIC.LIVE_GRID_IMPORT, STATISTIC.LIVE_HOUSE_CONS, STATISTIC.LIVE_PV_GEN, STATISTIC.LIVE_BAT_CHARGE_MASTER, STATISTIC.LIVE_BAT_DISCHARGE_MASTER. Calculated values can be found below the "_calc." datapoint. Information about daily values was removed from the API by SENEC in the past. So here we go again ...

### 1.1.1 (NoBl)
* Object attributes are updated to what they are expected to be: unit, description, datatype (this will break anything that still relies on datapoints being STRING that aren't meant to be string)

### 1.1.0 (NoBl)
* Updated to current adapter template
* Integrated GitHub Testing and auto npm publishing
* Some other administrative updates

### 1.0.13 (NoBl)
* Added System Description 19 for Senec.Home V3 Hybrid (Credits to noffycws)
* Added Mode Descriptions for 86-91. (Credits to noffycws)

### 1.0.12 (NoBl)
* Just set 'supportCustoms' to false so it won't show up in admin custom config.

### 1.0.11 (NoBl)
* Update to current adapter template
* Added Datapoints: PV1.MPP_CUR, MPP_VOL, MPP_POWER (former: MPP_INT which is unused at this moment but does still exist)
* Added Datapoints (please feedback any improvements for their descriptions, ...): FEATURES.SGREADY, WIZARD.SETUP_WALLBOX_MAX_TOTAL_CURRENT_BY_GRID, WIZARD.SG_READY_CURR_MODE, BMS.ERROR, BMS.RECOVERLOCKED, BMS.SERIAL, BMS.START_SELFTEST, BAT1.RESET, BAT1.SELFTEST_ACT, BAT1.SELFTEST_LIMIT, BAT1.SELFTEST_OFF, BAT1.SELFTEST_OVERALL_STATE, BAT1.SELFTEST_STATE, BAT1.SELFTEST_STEP, BAT1.SELFTEST_TIME, BAT1.SERIAL, BAT1.TRIG_ITALY_SELF, BAT1OBJ1.COMM, GRIDCONFIG.AU_SOFT_RAMP_EN, GRIDCONFIG.AU_VRR_MAX, GRIDCONFIG.AU_VRR_MIN, GRIDCONFIG.AU_VVAR_PERCENTAGE, GRIDCONFIG.AU_VVAR_P_MAX, GRIDCONFIG.AU_VVAR_P_MIN, GRIDCONFIG.AU_VVAR_VOLTAGE, GRIDCONFIG.AU_VWC_VOLTAGE, GRIDCONFIG.AU_VWD_VOLTAGE, GRIDCONFIG.CEI_SEGNALE_ESTERNO, GRIDCONFIG.VDELVFRTDISABLE, GRIDCONFIG.VDEURMSMAX10

### 1.0.10 (NoBl, smartpran)
* DateType objects are stored as date again
* changed WIZARD.SETUP_POWER_RULE unit to '%'
* changed name of STATISTIC.STAT_SUM_E_PU to "STAT_SUM Energy PowerUnit"
* changed name of STATISTIC.STAT_SUM_E_WB to "STAT_SUM Energy Wallbox"
* changed name of STATISTIC.LIVE_WB_ENERGY to "Live Wallbox Energy"
* changed name of STATISTIC.LIVE_PU_ENERGY to "Live PowerUnit Energy"
* changed name of WIZARD.PWRCFG_PEAK_PV_POWER to "Configured Peak PV Power"
* enforcing conversion of number values to Number(). Otherwise they are created as String in ioBroker (manually delete existing datapoints in ioBroker to change them!)
* fixed representation for temp values (off by *10)
* json delivers a non-value (apparently an error message produced by senec itself). Ignoring that.
* Added variable mpp_int to high priority and changed unit it. (smartpran)

### 1.0.9 (NoBl)
* IP types are shown as IP again.
* added datapoints for FACTORY along with more state descriptions for Battery Type, Country and System Type.
* added datapoints for GRIDCONFIG

### 1.0.8 (NoBl)
* Added more states to known states (please feedback if they need special handling (unit, special description, value modification, ...))
* Bugfix in creating debug data
* Unknown states are now reported in debug instead of info.
* Code cleanup

### 1.0.7 (NoBl)
* Reading all known states from SENEC.
* Split states into high/low priority (heavy requesting the SENEC system renders it unable to sync with the SENEC datacenter!).
* Updated adapter-core and testing versions along with current dev dependencies. Removed node 8 support.
* Added more state descriptions to manual. But need input on these and those that are still not documented.

### 1.0.6 (NoBl)
* Moved senec states and state attributes to libs
* Added missing state descriptions

### 1.0.5 (2020-03-07) (NoBl)
* Added States for: Energy: GUI_BAT_DATA_VOLTAGE, GUI_BAT_DATA_CURRENT, STAT_HOURS_OF_OPERATION; Sys_update: NPU_VER, NPU_IMAGE_VERSION, Wizard: APPLICATION_VERSION, INTERFACE_VERSION
* Readme and Documentation (EN exists, now) updated
* Changed behavior for unknown values completely. They will now be stored as string plus prefixed with "REPORT TO DEV:" so users can easily report back what needs updating.
* added handling for "st_" values in json
* added additional configuration options
* changed retry-behaviour in case of connection issues, ...

### 1.0.4 (2020-03-06)
* (NoBl) Repo URL updated
### 1.0.3 (2020-03-06)
* (NoBl) added link to documentation in german
### 1.0.2 (2020-03-04)
* (NoBl) added missing status codes (85 in total now)
* (NoBl) added status code to status message for easier reference
* (NoBl) added states for wallboxes and battery modules
### 1.0.1
* (NoBl) updated readme
### 1.0.0
* (NoBl) initial release

## License
MIT License

Copyright (c) 2021 Norbert Bluemle <github@bluemle.org>

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