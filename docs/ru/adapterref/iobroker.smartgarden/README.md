---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: yRQ1kH5yZ+LlZk7k2uqFylv98qOlrWYFKz/AXPuTjfE=
---
![логотип](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Установлены](http://iobroker.live/badges/smartgarden-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Статус сборки](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![стабильный](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## IoBroker smartgarden адаптер для интеллектуальной системы GARDENA
Адаптер для интеллектуальной системы GARDENA с использованием официальных [GARDENA интеллектуальная система API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) и сервисов.

Адаптер позволяет разрабатывать приложение (например, с VIS), которое можно использовать параллельно с официальным приложением GARDENA. Адаптер и его дополнительные функции не влияют ни на одну из основных функций приложения GARDENA и наоборот.

Адаптер - не полная замена приложения GARDENA, а дополнение к интеграции устройств GARDENA в умный дом с ioBroker.
Наиболее важные действия могут быть выполнены с адаптером. Он также предлагает возможность реализовать свои собственные идеи, которые невозможны с приложением GARDENA.

## Поддерживаемые устройства
  - GARDENA smart SILENO роботизированные газонокосилки
  - GARDENA умный ирригационный контроль
  - Интеллектуальный напорный насос GARDENA
  - GARDENA умный контроль воды
  - Интеллектуальный адаптер питания GARDENA
  - GARDENA умный датчик

Для получения дополнительной информации об устройствах см. [GARDENA немецкий сайт](https://www.gardena.com/de/produkte/smart/smartsystem/) и [здесь на английском](https://www.gardena.com/uk/products/smart/smart-system/).

## Требования
Для использования этого адаптера вам понадобятся две вещи:

1. интеллектуальная системная учетная запись GARDENA
1. ключ приложения GARDENA

Чтобы получить обе вещи, пожалуйста, перейдите к [https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/](https://developer.husqvarnagroup.cloud/docs#/docs/getting-started/).

![getting_application_key](../../../en/adapterref/iobroker.smartgarden/getting_application_key.jpg)

**Запись:**

  - Если у вас уже есть Husqvarna Automower® Connect или

Учетная запись GARDENA smart system, вы можете войти в систему с этой учетной записью и перейти к шагу 2. Создание приложения, чтобы получить ключ приложения.

	---

*** И почти наверняка у вас есть учетная запись. ** Пожалуйста, используйте ту же учетную запись, что и для приложения GARDENA, в котором зарегистрированы ваши устройства GARDENA. В противном случае вы не получите доступ к своим устройствам. *

	---

  - Убедитесь, что вы подключили приложение (из шага 2) к API
  - API аутентификации ***и***
- GARDENA интеллектуальная система API.

И, конечно, вам нужна работающая установка ioBroker, и вы должны иметь хотя бы одну [GARDENA умное устройство](#supported-devices).

## Оглавление
  * [ioBroker smartgarden адаптер для интеллектуальной системы GARDENA] (# iobroker-smartgarden-адаптер-для-сада-smart-система)
  * [Поддерживаемые устройства] (# поддерживаемые устройства)
  * [Требования] (# требования)
  * [Оглавление] (# оглавление)
  * [Установка] (# установка)
  * [Настроить адаптер] (# setup-adapter)
  * [Получение поддержки] (# получение поддержки)
  * [Точки данных адаптера] (# Точки данных адаптера)
     * [Общие сведения о точках данных] (# общие сведения о точках данных)
     * [Для SERVICE_MOWER] (# для-service_mower)
     * [Для SERVICE_VALVE_SET] (# для-service_valve_set)
     * [Для SERVICE_VALVE] (# для-service_valve)
     * [Для SERVICE_POWER_SOCKET] (# для-service_power_socket)
     * [Для SERVICE_SENSOR] (# для-service_sensor)
     * [Для SERVICE_COMMON] (# для-service_common)
  * [Полив запрещен во время кошения] (# Полив запрещен во время кошения)
     * [В чем проблема?] (# В чем проблема)
* [Что делается?] (# Что делается)
* [Основное поведение - ПРЕДУПРЕЖДЕНИЕ] (# основное поведение ---- предупреждение)
  * [Пожелания для точек данных] (# Желания для точек данных)
  * [Примечание] (# примечание)
  * [Changelog] (# changelog)
     * [1.0.0] (# 100)
     * [0.6.0] (# 060)
     * [0.5.1] (# 051)
     * [0.5.0] (# 050)
     * [предыдущие версии] (# 042)
  * [Кредиты] (# кредитов)
  * [Лицензия] (# лицензия)

## Установка
Адаптер доступен

- при npm: установить с помощью `npm установить iobroker.smartgarden`
- на GitHub по адресу https://github.com/jpgorganizer/ioBroker.smartgarden.

Описание установки с GitHub доступно [Вот](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren) (немецкий язык).

## Установочный адаптер
1. Установите адаптер
2. Создайте экземпляр адаптера
3. Проверьте и завершите настройку экземпляра.

  **Если вы измените какое-либо значение этих настроек, перезагрузите адаптер.**

3.1 Изменить имя пользователя, пароль и ключ приложения в конфигурации основного экземпляра

      | Параметр | Описание |
      | - | - |
      | имя пользователя | имя пользователя для интеллектуальной системы GARDENA |
      | пароль | соответствующий пароль |
      | API Key | Ключ API (ключ приложения), например в соответствии с [Требования](#requirements) |

Обратите внимание, что пароль и ключ приложения кодируются и хранятся в адаптере и просто декодируются для аутентификации на хосте приложения GARDENA.

3.2 Проверьте значения по умолчанию для разных настроек и включите / выключите опции в конфигурации экземпляра. Для большинства пользователей значения по умолчанию будут в порядке.

      | Параметр | Описание |
      | - | - |
   | предварительно определить состояния | предварительно определить все состояния API Gardena независимо от того, передаются ли они в данный момент; включить или выключить; если он включен, то все состояния API интеллектуальной системы GARDENA создаются независимо от того, передаются ли они в настоящее время службой GARDENA или нет; по умолчанию: выкл; *(новое в v0.4.0)* |
   | прогноз | использовать прогноз времени зарядки и оставшегося времени косилки; включить / выключить прогнозную зарядку и время кошения косилки; по умолчанию: выкл; *(новое в v0.5.0)* |
      | циклы | количество циклов истории MOWER; Вы можете использовать любое число от 3 (минимум), но 10 (по умолчанию) кажется хорошим значением; актуально только в том случае, если вышеупомянутый «прогноз» * включен; * (новое в v0.5.0) * |
   | проверка орошения | Используйте проверку, разрешено ли орошение во время кошения; включить / выключить; по умолчанию: выкл; *(новое в v0.6.0)* |

3.3 Проверьте значения по умолчанию системных настроек и включите / выключите опции в конфигурации экземпляра. **Большинству пользователей не нужно ничего менять на этой вкладке.**

      | Параметр | Описание |
      | - | - |
      | Loglevel | Уровень журнала: 0 = нет журнала, 1 = несколько журналов, 2 = еще несколько журналов, 3 = все журналы; по умолчанию: 0 |
      | частота пинга | Частота отправки Ping's в Gardena Webservice (в секундах); по умолчанию: 150 |
      | фактор аутентификации | Фактор достоверности токена аутентификации; по умолчанию: 1.001 |
      | Auth-URL | URL хоста аутентификации; по умолчанию: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev) |
      | Base-URL | Базовый URL веб-сервиса; по умолчанию: [https://api.smart.gardena.dev] (https://api.smart.gardena.dev) |
      | TestVar | использовать тестовую переменную для отладки; включить / выключить; по умолчанию: выключено |

## Получение поддержки
Чтобы получить помощь, внимательно прочтите этот README и [Часто задаваемые вопросы](FAQ.md). Если вам нужна дополнительная поддержка, пожалуйста, присоединяйтесь к [Тема форума ioBroker](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system).

## Точки данных адаптера
Адаптер предназначен для мониторинга и управления интеллектуальными системными устройствами GARDENA.
Для этого будет один `LOCATION` и один или несколько `DEVICE`.
Для каждого `DEVICE` будет

  - один `SERVICE_COMMON_ <id>` и
  - один или несколько `SERVICE_ <servicelink_type> _ <id>`.

Где `<servicelink_type>` - описание типа для устройства, например, MOWER или VALVE, а `<id>` - (закодированный) идентификатор устройства GARDENA, используемый API.
См. Описание для ServiceLink в [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Управление / мониторинг для каждого устройства возможен через `SERVICE_<servicelink_type>`, перечисленные в следующей таблице. В `SERVICE_COMMON` представлена общая информация об устройстве.

  | устройство | SERVICE_ <servicelink_type> |
  | - | - |
  | интеллектуальная газонокосилка-робот SILENO | SERVICE_MOWER и SERVICE_COMMON |
  | умный ирригационный контроль | SERVICE_VALVE_SET, SERVICE_VALVE и SERVICE_COMMON |
  | умный насос давления | SERVICE_VALVE и SERVICE_COMMON |
  | умный контроль воды | SERVICE_VALVE и SERVICE_COMMON |
  | умный адаптер питания | SERVICE_POWER_SOCKET и SERVICE_COMMON |
  | умный датчик | SERVICE_SENSOR и SERVICE_COMMON |

Если вам нужна дополнительная информация о точках данных, ознакомьтесь с [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).
Там вы найдете описание для каждой точки данных; за исключением тех, которые помечены как точки данных адаптера, а не API GARDENA smart system.

Адаптер создает свои собственные точки данных для различных функций / опций, когда функция выбрана. Эти точки данных не удаляются автоматически при отмене выбора объекта. Если вам больше не нужны эти точки данных, они должны быть удалены вручную.

### Общие сведения о точках данных
Адаптер не изменяет значения, передаваемые интеллектуальным API GARDENA.
Единственное, что делается (начиная с версии 1.0.0), это проверяет тип *отметок времени* и *чисел*

| проверить на | описание |
| - | - |
| метки времени | все метки времени указаны в UTC; если полученная временная метка не является действительной временной меткой, вместо нее используется `01 Jan 1970 00:00:00Z` (ноль времени Unix). Так что, если вы видите эту дату / время, пожалуйста, сообщите. |
| номера | если число не является допустимым числом, вместо него используется `-1`. Так что, если вы видите этот номер, пожалуйста, сообщите. |

### Для SERVICE_MOWER
#### Контроллинг
Для управления устройством используйте точку данных

- `activity_control_i`

  *Эта точка данных генерируется адаптером и не требуется из-за API-интерфейса интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы запустить газонокосилку.

  - Для запуска в течение определенного времени установите значение запланированной продолжительности в

  секунд (пожалуйста, используйте кратные 60)

  - для автоматической операции установите строку `START_DONT_OVERRIDE`
  - отменить текущую операцию и вернуться к использованию зарядной станции

  строка `PARK_UNTIL_NEXT_TASK`

  - чтобы отменить текущую операцию, вернитесь на зарядную станцию и проигнорируйте

  график использования строки `PARK_UNTIL_FURTHER_NOTICE`

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальные данные:

- `activity_mowing_i`

  *Эта точка данных генерируется адаптером и не требуется из-за API-интерфейса интеллектуальной системы GARDENA.*

  Эта точка данных показывает два разных состояния для газонокосилки:

  - `true`: кошение или
  - `false`: не косить.

Эта точка данных может использоваться для дальнейших действий, когда важно знать, безопасно ли газонокосилка на газоне или нет.

В зависимости от значения точки данных `activity_value` эта точка данных устанавливается.
Пожалуйста, смотрите следующую таблицу для деталей.

  | `activity_value` | `activity_mowing_i` |
  | `OK_CHARGING` Косилка должна косить, но недостаточный уровень заряда удерживает ее в зарядной станции. | ложь |
  | `PARKED_TIMER` Газонокосилка припаркована согласно таймеру, запустится снова в установленное время. | ложь |
  | `PARKED_PARK_SELECTED` Газонокосилка припаркована до дальнейшего уведомления. | ложь |
  | `PARKED_AUTOTIMER` Косилка пропускает кошение из-за недостаточной высоты травы. | ложь |
  | `PAUSED` Газонокосилка находится в состоянии ожидания с закрытым люком. | ложь |
  | `OK_CUTTING` Газонокосилка режет в режиме AUTO (расписание). | правда |
  | `OK_CUTTING_TIMER_OVERRIDDEN` Косилка режет вне графика. | правда |
  | `OK_SEARCHING` Газонокосилка ищет зарядную станцию. | правда |
  | `OK_LEAVING` Газонокосилка покидает зарядную станцию. | правда |
  | `NONE` Никаких действий не происходит, возможно, из-за ошибки. | правда |
  | `NONE` Никаких действий не происходит, возможно, из-за ошибки. | правда |
  | все остальные значения | правда |

- `batteryState_chargingTime_remain_i` *(под SERVICE_COMMON ...)* и <br/>

`activity_mowingTime_remain_i` *(под SERVICE_MOWER ...)*

  *Обе точки данных генерируются адаптером и не требуются из-за API интеллектуальной системы GARDENA.*

Эти данные показывают прогноз оставшегося времени зарядки и кошения в секундах газонокосилки.
Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.

Для прогнозирования значения история последних нескольких циклов зарядки и скашивания сохраняется в двух состояниях `info.saveMowingHistory` и `info.saveChargingHistory`.

Эта функция может быть включена / выключена в конфигурации экземпляра адаптера наряду с количеством сохраненных циклов зарядки и скашивания в истории.

Чтобы запустить эту функцию **убедитесь, что хотя бы один цикл скашивания и подзарядки проходит без ошибок (например, не прерывается вручную или с помощью сенсора).** Лучше, если хотя бы три прогона были выполнены без ошибок.
Эта функция пытается распознать нормальный случай и первоначально предполагает, что следующий процесс является нормальным случаем. Если это неисправно, то этот неисправный прогон считается нормальным случаем, а прогоны, которые затем проходят нормально, как случай неисправности. Если во время выполнения возникла ошибка, остановите адаптер, удалите две точки данных и начните снова.

Для получения дополнительной информации об общих механизмах прогнозирования см. [FORECAST.md](FORECAST.md).

  **Ноты:**

    1. Прогнозные значения доступны, только если хотя бы один завершен

Цикл зарядки и кошения сохраняется в истории.

    2. История сохраняется в `info`, так что если нужно` LOCATION`

быть удаленным, например в случае будущего обновления оно не теряется.

    3. Если вы отключите газонокосилку от интеллектуальной системы GARDENA и

подключите его снова, история потеряна, потому что ваша газонокосилка получает новый идентификатор в интеллектуальной системе GARDENA. Это означает, что адаптер не может распознать газонокосилку как предыдущую газонокосилку - возможно, это вторая газонокосилка.
В этом случае рекомендуется удалить эти две точки данных и перезапустить адаптер, чтобы предыдущие (теперь старые) наборы истории не читались и не записывались постоянно. Затем адаптер начинает строить новую историю.

4. Эта функция должна работать для нескольких косилок, но она

не проверено *(я не могу этого сделать, потому что у меня только одна газонокосилка)* Если у вас есть более одной косилки, пожалуйста, проверьте и сообщите об ошибках и, конечно же, сообщите, если он работает как задумано. Заранее спасибо за это.

- `lastErrorCode_value`

Пожалуйста, обратите особое внимание на пункт данных `lastErrorCode_value`.
Описание возможных значений можно найти по адресу https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, см. «MowerService - lastErrorCode»

### Для SERVICE_VALVE_SET
#### Контроллинг
Для управления устройством используйте точку данных

- `stop_all_valves_i`

  *Эта точка данных генерируется адаптером и не требуется из-за API-интерфейса интеллектуальной системы GARDENA.*

  Измените эту точку данных, чтобы остановить все клапаны.

  - Для остановки всех клапанов немедленно используйте строку `STOP_UNTIL_NEXT_TASK`

** Примечание: ** Не отображайте значение этой точки данных в вашем приложении, так как это значение в основном не определено. Кроме того, эта точка данных не может служить триггером для ваших собственных действий, потому что она просто установлена в значение *null* после запуска команды.

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

### Для SERVICE_VALVE
#### Контроллинг
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы запустить клапан.

  - Для запуска в течение определенного времени установите значение на значение в секундах.

  (пожалуйста, используйте кратные 60).

** Примечание: ** Существуют некоторые ограничения для допустимых значений.
Пожалуйста, сообщите, если вы видите другие ограничения.

    | устройство | предел |
    | - | - |
    | GARDENA умный ирригационный контроль | 3540 секунд (59 минут) |
    | GARDENA умный насос | 36000 (10 часов) |
    | GARDENA умный контроль воды | 36000 (10 часов) |

  - Для отмены текущего полива и продолжения с графиком используйте строку

  `STOP_UNTIL_NEXT_TASK`

  - Чтобы пропустить автоматический режим работы до указанного времени, текущий активен

операция может или не может быть отменена (зависит от модели устройства), используйте строку `PAUSE_<number_of_seconds>`, например, `PAUSE_86400` сделать паузу на 24 часа

  - Для восстановления автоматической работы, если она была приостановлена, используйте строку `UNPAUSE`

- `орошениеWhileMowing_allowed_i` и` орошениеWhileMowing_mowerDefinition_i`

  *Эти точки данных генерируются адаптером и не требуются из-за API-интерфейса интеллектуальной системы GARDENA.*

Эти точки данных дают возможность управлять функцией *Полив запрещен при кошении* Они создаются только тогда, когда функция выбрана в конфигурации экземпляра.
Описание этой функции см. В главе [Полив не допускается при скашивании](#Irrigation-not-allowed-while-mowing).

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальный пункт данных:

- `duration_leftover_i`

  *Эта точка данных генерируется адаптером и не требуется из-за API-интерфейса интеллектуальной системы GARDENA.*

Значение описывает количество минут до закрытия клапана и прекращения полива.

    - Целое число, один (`1`) или более.
    - `null`, если не определено

### Для SERVICE_POWER_SOCKET
#### Контроллинг
Для управления устройством используйте точку данных

- `duration_value`

  Измените эту точку данных, чтобы начать розетку.

  - Для запуска в течение определенного времени установите значение на значение в секундах.

  (пожалуйста, используйте кратные 60)

  - Чтобы включить устройство навсегда, используйте строку `START_OVERRIDE`.
  - Чтобы остановить устройство, используйте `STOP_UNTIL_NEXT_TASK`.
  - Пропустить автоматическую работу до указанного времени. Текущая активная операция

НЕ будет отменено. используйте строку `PAUSE_<number_of_seconds>`, например, `PAUSE_86400`, чтобы сделать паузу на 24 часа (используйте кратные 60)

  - Для восстановления автоматической работы, если она была приостановлена, используйте строку `UNPAUSE`

#### Мониторинг
Все остальные точки данных предназначены только для мониторинга и информации.

Специальный пункт данных:

- `duration_leftover_i`

  *Эта точка данных генерируется адаптером и не требуется из-за API-интерфейса интеллектуальной системы GARDENA.*

  Значение описывает количество минут до отключения электрической розетки.

    - Целое число, один (`1`) или более.
    - `null`, если не определено

### Для SERVICE_SENSOR
#### Контроллинг
Нет доступных функций управления.

#### Мониторинг
Все точки данных предназначены только для мониторинга и информации.

### Для SERVICE_COMMON
В `SERVICE_COMMON` представлена общая информация об устройстве.
Описание интегрируется в описание другого СЕРВИСА, где это необходимо.

## Полив запрещен при скашивании
### В чем проблема?
Если у вас есть как газонокосилка, так и ирригационная система с выдвижными дождевателями, существует риск того, что ваша косилка столкнется с выдвижным дождевателем во время работы ирригационной системы и повредит или нанесет сам ущерб.

Чтобы предотвратить это, система полива или отдельные отдельные клапаны должны быть отключены, когда косилка косит.

### Что делается?
С помощью этой функции можно прервать полив, когда газонокосилка находится на газоне. Это может быть определено отдельно для каждого клапана.

Для каждого клапана можно определить одну или несколько косилок, для которых нельзя открывать клапан, когда косилка косится.
По сути, косилка имеет приоритет перед поливом, то есть, если возникает конфликт, что косилка косит, а клапан открыт, клапан закрывается и устанавливается соответствующее предупреждение.

Кроме того, можно определить, что клапан никогда не должен открываться независимо от газонокосилки. Например. может использоваться, если клапан или труба позади него повреждены.

Вся проверка может быть включена или выключена в конфигурации экземпляра с помощью паранетра *проверка орошения*

Для каждого `SERVICE_VALVE` доступно три точки данных.
Они используются для настройки и создания отчетов о предупреждениях.

  | точка данных | записываемый | Описание точек данных |
  | - | - | - |
  | `irrigationWhileMowing_allowed_i` | да | установить на `false`, если необходимо проверить, разрешено ли полив, когда газонокосилка косит газон, `true` в противном случае |
  | `irrigationWhileMowing_warningCode_i` | нет | Код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. В следующей таблице. Если установлено более одного предупреждения, коды объединяются с `+` (например, `STOPPED+UNKNOWN_MOWER`). |
  | `IrrigationWhileMowing_warningCode_i` | нет | Код предупреждения устанавливается, если клапан открывается. Возможные коды предупреждений см. В следующей таблице. Если установлено более одного предупреждения, коды объединяются с помощью `+` (например, `STOPPED + UNKNOWN_MOWER`). |

* ***формат идентификатора косилки***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Вы можете скопировать этот идентификатор косилки с вкладки объектов ioBroker, см. Красную стрелку на следующем рисунке.

  ![газонокосилка](../../../en/adapterref/iobroker.smartgarden/mowerid.jpg)

* ***предупреждающие коды*** </br>

  | код предупреждения | описание |
  | - | - |
  | `NO_WARNING` | без предупреждения, клапан открыт |
  | `STOPPED` | клапан автоматически закрывается, потому что косилка косит |
  | `FORBIDDEN` | клапан закрыт, потому что в точке данных установлен специальный код `IRRIGATION_FORBIDDEN` `irrigationWhileMowing_mowerDefinition_i` |
  | `FORBIDDEN` | клапан закрыт, потому что в точке данных` орошениеWhileMowing_mowerDefinition_i` | установлен специальный код `IRRIGATION_FORBIDDEN` |

Эта функция запускается каждый раз, когда

- клапан открывается или
- косилка начинает косить

Он не запускается при изменении значений в точках данных, перечисленных выше.
Это означает: если возникла конфликтная ситуация, и вы изменили `irrigationWhileMowing_allowed_i` с `true` на `false`, конфликт не будет распознан и конфликт продолжится. Такое же поведение относится к изменению `irrigationWhileMowing_mowerDefinition_i`.

### Основное поведение - ПРЕДУПРЕЖДЕНИЕ
Эта функция не может помешать открытию клапана, когда косилка косится. Это может, например, делается вручную через приложение GARDENA или автоматически по расписанию.

Эта функция может закрыть клапан как можно быстрее только в случае конфликта. И конфликт не может быть признан либо.
Так что может случиться так, что вода пропущена.
**Например. Нельзя предотвратить расширение выдвижных спринклеров и попадание косилки в опрыскиватели **, но вероятность того, что это произойдет, сведена к минимуму.
** Так что ваше приложение должно убедиться, что этот конфликт никогда не произойдет. **

## Пожелания для точек данных
Этот адаптер сообщает **каждое значение** как точку данных, которая предоставляется через API интеллектуальной системы GARDENA. Если кто-то хочет получить больше значений, свяжитесь с GARDENA и сообщите им, что это значение также будет включено в API. Для этого перейдите в раздел ***Свяжитесь с нами и оставьте отзыв*** в нижнем колонтитуле на [GARDENA Портал разработчиков](https://developer.husqvarnagroup.cloud).

## Запись
Это частный проект. Я не связан с GARDENA или Husqvarna.

## Кредиты
Логотип smartgarden: http://www.freepik.com Дизайн Freepik

## Changelog
### 1.0.0
* (jpgorganizer)
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser.
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer) 
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 
  - Dependency get's resolved now
  
### 0.4.0
* (jpgorganizer) 
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1
* (jpgorganizer) initial release

## License

Copyright (c) 2020 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2157 $ $Date: 2020-06-11 19:24:52 +0200 (Do, 11 Jun 2020) $ --->