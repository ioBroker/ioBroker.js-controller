---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sourceanalytix/README.md
title: ИсточникAnalytix
hash: fcjxbDQUYMVPlqNiVtkXq1RokJv0C36kr7g4DANUvz0=
---
# SourceAnalytix

![Версия NPM](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Количество установок (последнее)](http://iobroker.live/badges/sourceanalytix-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sourceanalytix-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.sourceanalytix.svg)
![НПМ](https://nodei.co/npm/iobroker.sourceanalytix.png?downloads=true)

[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/sourceanalytix/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg) **Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств.** Подробнее см. Ниже!

Подробный анализ вашего потребления энергии, газа и жидкости Любой источник (кВтч, Втч, Ватт, л / час или м3) может быть использован для анализа данных:

## Функции
#### Основные характеристики
| состояние | функциональность | Описание |
|--|--|--|
| > устройство <.cumulativeReading | [накапливать значения] (# cumulativeReading) | Рассчитать накопленные значения<br/> включая [преобразование] (# valueTransformation)<br/> накопленное значение можно изменить, выполнив [эти шаги](#cumulativeReading-Reset) |
| &gt; Устройство &lt;.&gt; Год &lt;.&gt; Текущий год | [Статистика за текущий год](#Current-Period) | Хранить статистическую информацию за текущий год на уровне<br/> &gt; устройство.&gt; текущий год &lt;.&gt; выбранный период &lt;|
| &gt; Год &lt;.&gt; Текущий год.&gt; Тип потребления &lt;| [Потребление](#consumptionCalculation) | Корневая папка для хранения данных о потреблении<br/> (текущее значение - предыдущее значение).<br/> Может быть потребление или доставка |
| &gt; Год &lt;.&gt; CurrentYear.&gt; Тип затрат &lt;| [Расходы](#costCalculation) | Корневая папка для хранения данных о расходах.<br/> текущая стоимость * стоимость + базовая цена<br/> Может быть потребление или доставка |
| &gt; Год &lt;.&gt; CurrentYear.&gt; Тип затрат &lt;| [Стоимость] (# costCalculation) | Корневая папка для хранения данных о расходах.<br/> текущая стоимость * стоимость + базовая цена<br/> Может быть потребление или доставка |

Все местоположения штатов сгруппированы по названию штатов и разделены точками и структурами [Категория](#Categories).<br/> Вычисления будут выполняться автоматически, а значения преобразованы в соответствующие единицы, как определено в [Цена-определения](#Price-DefinitionsPrice-Definitions).

Если у вас есть какие-либо вопросы, пожалуйста, прочтите сначала **[Исправление проблем](#Troubleshooting)**

## Как
### Состояние-Активация! ![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/settingKey.png)
![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

| Элемент конфигурации | Описание |
|--|--|
| включен | Состояние активации для SourceAnalytix |
| Псевдоним | по умолчанию: имя состояния, имя устройства, как показано в SA |
| Выберите тип | обязательно, выберите тип расчета для расчета в соответствии с [Цена-определения](#Price-Definitions) |
| Выберите блок | по умолчанию: автоматически, при необходимости выберите вручную (см. журналы) |
| Стоимость | Расчет стоимости |
| с (вне) основной зарядкой | в т.ч. базовая плата при расчете стоимости |
| потребление | рассчитать данные о потреблении |
| значения счетчика | сохранить текущие значения счетчиков |
| Показания счетчика в </br> начале x: | Начальное значение счетчика за определенный период для обработки </br> текущего расчета - startValue |

### Базовая конфигурация (экземпляр адаптера)
![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/mainSettings.png)

#### CumulativeReading
> ToDo: Опишите логику <

#### Расчет потребления
> ToDo: Опишите логику <

#### CostCalculation
> ToDo: Опишите логику <

#### ValueTransformation
&gt; Задачи: ссылка на документ в библиотеке (также в библиотеке документов!)<br/> &gt; Задачи: Документируйте преобразование ватт в кВтч<br/> &gt; Задачи: преобразование единиц измерения документа (например, ватт в Втч в кВтч<br/>

#### Год-Статистика
Хранить статистическую информацию о потреблении / ценах и / или затратах / доходах на уровне года<br/> &gt;&gt; устройство.&gt; thisYear &lt;.&gt; категория &lt;.&gt; выбранный период

Эта информация обычно используется для хранения данных и исторических сравнений.<br/> Штаты сгруппированы по указанному периоду (например, 2020 год по сравнению с 2021 годом, или февраль 2019 года по сравнению с февралем и т. Д.)

&gt; #### *Недели* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Расходы / прибыль<br/> &gt; потребление / доставка &lt;.weeks. **weekNr** &lt;&gt; #### *Месяцы* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Расходы / прибыль<br/> &gt; потребление / доставка &lt;.months. **Month** &lt;&gt; #### *Quarters* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Расходы / прибыль<br/> &gt; расход / доставка &lt;. четверть. **Qx** &lt;

#### Текущий период
Сохранение статистической информации за текущий год на уровне:> устройство.> Текущий год <.> Выбранный период

&gt; #### *Недели* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Расходы / прибыль<br/> &gt; потребление / доставка &lt;.weeks. **weekNr** &lt;&gt; #### *Месяцы* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Расходы / прибыль<br/> &gt; потребление / доставка &lt;.months. **Month** &lt;&gt; #### *Quarters* br/> &gt; Устройство &lt;.&gt; Год &lt;.&gt; Затраты / прибыль&gt; потребление / доставка &lt;. Четверть. **Qx** &lt;

Эта информация обычно используется для ежедневного / еженедельного / ежемесячного расчета<br/> расходы / прибыль и / или потребление / доставка сгруппированы по указанному периоду

> ToDo: добавить скриншоты <

#### Категории
| категория | тип | Описание |
|--|--|--|
| расходы | финансовый | Результат расчета значение * себестоимость + базовая цена |
| заработок | финансовый | Результат расчета стоимость * доходная цена + базовая цена |
| потребление | расчеты | Результат расчета значение как стоимость - начальное значение<br/> года / месяца / квартала и т. д. |
| доставка | расчеты | Результат расчета стоимости доставки - начальная стоимость<br/> года / месяца / квартала и т. д. |

### Исправление проблем
Прежде чем мы начнем устранение неполадок, важно понять, как инициализируется source analytix, поскольку здесь могут возникать ошибки, см. Раздел проблем.
Будет обработана следующая последовательность:

1) Запустите SourceAnalytix 2) Перечислите все состояния, активированные для SourceAnalytix 3) Инициируйте состояния для каждого состояния:

    * Чтение текущего накопленного чтения </br>

      (если есть) и значения памяти из состояния

    * Проверить, можно ли обращаться с устройством {Проблема 1}
    * Проверьте, выбран ли тип стоимости {Проблема 2}
    * Проверьте, присутствует ли действительное определение цены для типа затрат {Проблема 3}
    * Проверить, не превышает ли предыдущее значение инициализации текущее накопленное значение {Проблема 4}
    * Проверьте, действительно ли известно о предыдущем сбросе устройства> текущее накопленное значение {Проблема 5}
    * Хранить все данные в памяти

4) Инициализируйте состояния для каждого состояния:

    * создание состояния cumulativeReading (для сохранения результатов расчета, также может использоваться только для W to kWh) {Issue 6}
    * создавать состояния, как выбрано в конфигурации состояний {Проблема 7}
    * начать расчет

5) При изменении / обновлении состояния

    * Убедитесь, что информация верна
    * преобразовать значение в правильную единицу (единицу состояния в единицу, выбранную в конфигурации состояния)
  * проверьте правильность ввода значения (текущее значение **** предыдущее значение) {см. **7 При сбросе устройства** Проблема 8}
    * рассчитать {выпуск 9}
      * Для ватт: вычислить ватт в кВтч, вычислить накопленное чтение = текущее считывание + накопленное считывание
      * Для других: вычислить cumulatedReading = currentReading + previousDeviceReset (если есть)

6) Ночью (00.00)

    * Список всех включенных состояний SourceAnalytix
    * Сброс значений начала (день / неделя / год / месяц)

7) При перезагрузке устройства

    * Сохранить текущее значение как значение previousDeviceReset и previousInit </br>

Если устройство снова будет перезагружено (определяется значением previousInit), </br> currentReading + previousDeviceReset сохраняется как previousDeviceReset.

** Проблема 1 ** Не определены единицы для ....., невозможно выполнить вычисления </br> Пожалуйста, выберите правильную единицу в настройках состояния

** Проблема 2 ** Тип затрат не определен для ....., пожалуйста, выберите Тип расчета при настройке состояния </br> Пожалуйста, выберите требуемый тип затрат, чтобы понять, какую сумму следует использовать для обработки расчетов

** Проблема 3 ** Выбранный тип ... не существует в определениях цен </br> Теперь определения цен найдены для выбранного типа затрат, проверьте настройки цены (адаптируйте конфигурацию)

** Проблема 4 ** Проверьте настройки для .....! Известное значение инициализации: .....> известное совокупное значение ..... невозможно продолжить </br> Известное значение инициализации> известные совокупные значения, это можно решить, удалив или изменив эти объекты в необработанном объекте состояния

```"valueAtDeviceInit": xxxx```

** Проблема 5 ** Проверьте настройки для .....! Известное значениеAtDeviceReset: .....> известное кумулятивное значение ..... не может быть выполнено </br> Известное значение инициализации> известные накопленные значения, это можно решить </br>, удалив или изменив эти объекты в необработанном объекте состояния

```valueAtDeviceReset": xxxx```

** Проблема 6 ** Состояние для cumulativeReading не создается </br> Инициализация состояния не удалась, см. Проблемы с 1 по 5

** Проблема 7 ** Состояния для показаний затрат не созданы </br> Тип расчета не включен в настройках состояния ![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateSettings.png)

### Определение цен ![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/priceSettings.png)
** Проблема 8 **текущее значение** <** previousInit </br> Обнаружен сброс устройства, см. Функцию 7

** Проблема 9 ** Мои расчеты неверны </br>

#### CumulativeReading-Reset 1) Убедитесь, что выбрана правильная единица измерения (из невыбранных, SA попытается определить автоматически) 2) Убедитесь, что cumulativeReading отражает правильное общее значение вашего значения, если нет </br>
        - Остановить SA
        - Перейти на вкладку объектов

          ![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/cumulativeReading-Reset.png)

        - Войдите в экспертный режим
        - Изменить кумулятивное чтение
        - Выйти из экспертного режима
        - Убедитесь, что начальные значения установлены правильно
        - Запустить SA </br>

3) Убедитесь, что начальные значения установлены правильно.</br> SA обрабатывает вычисления с помощью cumulatedReading - известного cumulatedReading в начале периода. <b/>Эти начальные значения определены в настройках состояния и должны быть &lt;** currentReading **.</b></br> <b/>Убедитесь, что кумулятивное чтение&gt; = DayStart&gt; = WeekStart&gt; = MonthStart&gt; = QuarterStart&gt; = YearStart ![Основные параметры](../../../en/adapterref/iobroker.sourceanalytix/admin/readmeDocu/stateStartValues.png)</b>

4) Проверьте эти значения в состоянии необработанного объекта:

```valueAtDeviceReset": xxx```

```"valueAtDeviceInit": xxx```

<! - **Проблема 6** Настройка - Невозможно деактивировать состояние для SourceAnalytix

Im RAW NUR "потребление": ложный umgestellt, gespeichert. Das wurde behavior (wo ggf. noch nicht false, auch bei "enabled": false und bei "cost": false) In der Objekt-Übersicht ist der Schraubenschlüssel nachwievor blau. Dann mit dem Schraubenschlüssel in das Objekt, SA war nicht der Haken bei aktiviert drin. Dort einmal auf aktiviert, nicht speichern, wieder auf deaktiviert, speichern.
Контроль в RAW, ob SA-EIntrag nun weg => jup, is nun fott ->

<!--

* Отслеживайте потребление ежедневно, еженедельно, ежемесячно, ежеквартально, ежегодно
* рассчитать затраты (текущая цена настраивается)
* Может использоваться для потребления энергии, жидкостей и ГАЗА
* Входные значения могут быть Вт / кВтч / Вт / м3 / л.

-->

Этот адаптер имеет корни благодаря pix еще в 2016 году https://forum.iobroker.net/viewtopic.php?f=21&t=2262

Что было улучшено с помощью @hadering и опубликовано на github https://github.com/hdering/homematic_verbrauchszaehler

## Сделать
* [ ] Документация!
* [] Расчет периода можно выбрать, но еще не реализован
* [] месячная себестоимость еще не учтена в расчетах
* [] пересчет на основе значений счетчика (настраивается по дате)
* [] добавить состояния объекта за предыдущий [x] день, [x] неделю, [x] месяц, [x] квартал, [x] год, настраивается в настройках адаптера

## Поддержите меня
Если вам нравятся мои работы, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать информацию об ошибках в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш идентификатор установки (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

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