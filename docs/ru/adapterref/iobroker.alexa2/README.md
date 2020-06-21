---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: TNWMr7Aq/2ZKAbSMk++/Qlv7klBRWMN2u4MFYvdWsgQ=
---
![логотип](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Количество установок](http://iobroker.live/badges/alexa2-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)

# IoBroker.alexa2
** Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать об исключениях и ошибках кода и новых схемах устройств мне как разработчику. ** Подробнее см. Ниже!

Этот адаптер позволяет удаленно управлять устройствами Alexa (Amazon Echo).

Большое спасибо SOEF за версию 1 адаптера и Hauke и ruhr70 за идеи в их сценариях от ioBroker-Forum (особенно обновления медиа-прогресса)! Также большое спасибо meicker за поддержку в документировании всего этого и многочисленным пользователям ioBroker Forum за поддержку тестирования!

## Государства и их значения:
В пространстве имен адаптера (например, alexa2.0) создано несколько каналов

### Alexa2.0
| Государственное название | смысл |
| - | - |
| сделанный на заказ. * | Отправить текстовые команды на виртуальное устройство, как если бы вы говорили с ним |
| эхо-устройства. * | Состояния на эхо-устройство, см. Ниже |
| история. * | Информацию об истории команд смотрите ниже |
| умные домашние устройства. * | Штаты на устройство умного дома и в целом, смотрите ниже |
| Информация о *. | Общая информация о состоянии адаптера |
| requestResult | Информация об ошибках для запросов TuneIn и устройств умного дома |

### Alexa2.0. Разговор. *
Bespoken обычно является поставщиком услуг, который помогает автоматически тестировать навыки. Но на самом деле вы можете использовать его для отправки команд на «вашу» учетную запись Alexa / Amazon. При этом вы можете запускать действия навыков, которые обычно не доступны через приложение Alexa. По характеру его работы возможны только команды, которые не взаимодействуют напрямую с «устройством, с которым вы разговариваете», как обычные команды, которые выполняют определенное действие и дают ответ. Воспроизведение аудио или видео или что-либо подобное, обычно выполняемое устройством, которому вы дали команду, не будет работать!

Запрос в Bespoken займет несколько секунд, потому что отправленный текст сначала преобразуется в аудио, который затем отправляется в Alexa Voice Services, а затем получает ответ от Alexa и отправляет обратно. Так что это легко может занять до 10 секунд.

| Государственное название | смысл |
| - | - |
| #sendText | Текст для отправки на виртуальное устройство |
| ответ | Ответ с устройства в виде текста |
| anwserJson | Ответ от адаптера в виде JSON, может содержать дополнительную информацию, такую как информация о карте или тому подобное |
| статус | Состояние связи с заказом (ОК = Готово / Ожидание следующей команды, ОБРАБОТКА = ожидание ответа от Заказа, ОТКАЗ = ошибка при обработке) |

### Alexa2.0.Contacts.ContactId. *
Все Alexa-контакты, которые могут быть использованы для отправки текстовых сообщений, включая его самого. Собственный контакт получает специальное «(Я)» после его имени.

| Государственное название | смысл |
| - | - |
| #clearOwnMessages | Существует только в собственном контакте, а триггер удаляет все сообщения, которые отправляются самому себе (также включает в себя сообщения самому себе через приложение или устройства!) |
| TextMessage | Отправляет этот текст как сообщение пользователю. Показывается на всех устройствах этого пользователя с «желтым кольцом» |

### Alexa2.0.Echo-Devices.Serialnumber. *
В разделе «эхо-устройства» на каждом эхо-устройстве amazon указан его серийный номер. Не каждое устройство показывает все состояния. Каждое устройство имеет свои собственные состояния, как описано ниже:

### Alexa2.0.Echo-Devices.Serialnumber.Alarm. *
Настройки тревоги (Wecker) для каждого устройства, если доступно.

| Государственное название | смысл | значение |
| - | - | - |
| включен | Показывает состояние тревоги и позволяет изменить его: Активировать тревогу с истинным - Деактивировать тревогу с ложным | правда / ложь |
| время | Время для тревоги. Перезапишите время для существующего будильника, чтобы установить новое время для этого будильника. Если у вас есть существующий сигнал тревоги, вы можете изменить здесь время, просто переписав время в формате чч: мм: сс, секунды не нужны для установки | Ввод времени |
| сработал | истина, если тревога достигнута и сработала. Часы должны быть синхронизированы с Amazon и iobroker. Используйте это для запуска других действий, как только наступит время будильника | правда / ложь |
| новый | время для новой тревоги для этого устройства. Если вы введете значение здесь, будет создан новый сигнал тревоги | Ввод времени (чч: мм: сс, секунды не нужны) |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth. *
Здесь вы найдете все подключенные или известные Bluetooth-устройства с MAC-адресами. Состояния каждого устройства:

| Государственное название | смысл |
| - | - |
| подключен | Показывает текущее состояние соединения и разрешить соединение (установлено в true) или отключение (установлено в false) |
| несправедливый | Кнопка, чтобы отключить это устройство от эхо-устройства |

### Alexa2.0.Echo-Devices.Serialnumber.Commands. *
С помощью команд вы можете запускать некоторые действия на вашем устройстве Alexa. Если вы используете их на многокомнатном устройстве, то они выполняются независимо и *не* будут работать синхронно на отдельных устройствах!

| Государственное название | смысл | значение |
| - | - | - |
| doNotDisturb | Включить / выключить Не беспокоить для этого устройства | правда / ложь |
| флэшбрифинг | Брифинг за 100 секунд - новости и т.д.pp | Кнопка |
| доброе утро | Доброе утро от Алекса ... | Кнопка |
| фунфакт | Забавный факт из Alexa ... | Кнопка |
| шутка | Шутка из Алекса ... | Кнопка |
| очистка | Воспроизведение звука "гонг", как для начала / конца режима прослушивания ... | Кнопка |
| кураторы Случайное предложение из выбранной области из Alexa ... | Текст (допускается: «до свидания», «подтверждения», «доброе утро», «комплименты», «день рождения», «спокойной ночи», «я дома») |
| пение Алекса поет песню ... | Кнопка |
| говорить | Алекса говорит, что вы вводите здесь ... | Ввод текста |
| говорящий по объему | Отрегулируйте громкость речи Alexa, эта громкость устанавливается до выступления и сбрасывается после | 0-100 |
| рассказывать | Алекса рассказывает историю | Кнопка |
| трафик | Дорожные новости | Кнопка |
| погода | Новости погоды | Кнопка |
| deviceStop | Остановить все действия на устройстве | Кнопка |
| уведомление | Отправить текстовое уведомление клиенту устройства | Текст |
| объявление | Воспроизвести объявление (как говорить, но с Bing до текста) | Текст |
| ssml | Произнесите SSML XML строку | Текст |

Подробная информация Говорите: введите здесь то, что вы хотите, чтобы Алекса сказала. Вы также можете отрегулировать громкость Alexa, указав в процентах перед вашим текстом.
Пример: 10; Алекса говорит Алекса с 10% объема, а 100; Алекса - 100% объема.
Обычно вы можете послать только 250 символов на команду выступления. Используя точку с запятой, можно написать столько, сколько вы хотите, при условии, что вы разделяете 250 символов точкой с запятой.
Затем Алекса будет произносить текст друг за другом с небольшим перерывом. Вы также можете использовать громкость вместе с более чем 255 блоками, написав #Volume; # Block1; # Block2, a.s.o Установленный здесь громкость будет использоваться поверх определенного громкости разговора.

### Alexa2.0.Echo-Devices.Serialnumber.Info. *
Информация об устройстве Alexa

| Государственное название | смысл | значение |
| - | - | - |
| возможности | возможности, если устройство alexa | Информация |
| deviceType | тип устройства от Amazon | Информация |
| deviceTypeString | Тип устройства в виде строки | Информация |
| isMultiroomDevice | Многокомнатное устройство - Multiroom - группа виртуальных устройств | Информация, правда / ложь |
| isMultiroomMember | Is multiroom member - если true, устройство является частью группы мультирум | Информация, правда / ложь |
| MultiroomParents | Если это устройство является частью группы многокомнатных устройств, это состояние показывает устройство родительской группы | Информация |
| имя | Название устройства Alexa | Информация |
| SerialNumber | Серийный номер устройства Alexa |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider. *
Напрямую попросите Алекса воспроизвести музыку или список воспроизведения из поддерживаемых музыкальных провайдеров. На самом деле поддерживаются: Моя библиотека, Amazon Music, Tune In. Вы также можете включить имя группы многокомнатных устройств в фразу, чтобы воспроизвести ее в этой группе (например, «SWR3 auf Erdgeschoss»)

| Государственное название | смысл | значение |
| - | - | - |
| Амазон-Музыка | Фраза, чтобы играть с Amazon Music | Ввод текста |
| Amazon-Music-Playlist | Плейлист, чтобы играть с Amazon Music | Ввод текста |
| Моя библиотека | Фраза, чтобы играть с моей библиотекой | Ввод текста |
| Моя библиотека-Плейлист | Плейлист для воспроизведения с Моей библиотекой | Ввод текста |
| Tune-In | Фраза, чтобы играть с Tune In | Ввод текста |
| Tune-In-Playlist | Плейлист, чтобы играть с Tune In | Ввод текста |

### Alexa2.0.Echo-Devices.Serialnumber.Player. *
Состояния для управления воспроизведением устройства и просмотра текущего состояния и информации о мультимедиа

| Государственное название | смысл | значение |
| - | - | - |
| TuneIn-Station | текстовое поле для ввода названия станции для воспроизведения этой станции на этом устройстве. Также можно ввести номер станции (s123456 ...), идентификатор шоу / подкаста (p1234567 ...) или идентификатор темы (t123456789 ...) | Ввод текста |
| ContentType | текстовое поле для размещения желаемого контента для воспроизведения на этом устройстве | Информация |
| controlForward | Кнопка запуска команды игрока «вперед» (30 с) | Кнопка |
| controlNext | Кнопка для запуска игрока "следующая" команда | Кнопка |
| controlPause | Кнопка запуска команды «пауза» игрока | Кнопка |
| controlPlay | Кнопка для запуска игрока "play" команда | Кнопка |
| controlPrevious | Кнопка для запуска игрока "предыдущая" команда | Кнопка |
| controlRepeat | Кнопка для запуска игрока "повторить" команду | правда / ложь |
| controlRewind | Кнопка запуска команды «перемотка» игрока (30 с) | Кнопка |
| controlShuffle | Переключить, чтобы включить или отключить режим случайного воспроизведения для игрока | правда / ложь |
| currentAlbum | Текущий альбом на самом деле играет | Информация |
| currentArtist | Текущий художник на самом деле играет | Информация |
| currentState | Если играешь -> true, иначе false | правда / ложь |
| currentTitle | Текущий заголовок на самом деле играет | Информация |
| imageURL | URL к изображению альбома | Информация |
| mainArtURL | URL к текущему основному искусству | Информация |
| mediaLength | Длина текущего заголовка | Информация |
| mediaLengthStr | длина активного носителя как (ЧЧ:) ММ: СС | Информация |
| mainProgress | активное медиа прошло время | Информация |
| mainProgressPercent | активных СМИ прошло время в процентах | Информация |
| mediaProgressStr | активный прогресс СМИ как (ЧЧ:) ММ: СС | Информация |
| miniArtUrl | URL к искусству (мини) | Информация |
| приглушенный | состояние "MUTE" | Информация true / false, volume = 0 считается отключенной |
| providerID | ID текущего музыкального провайдера | Информация |
| providerName | Название текущего музыкального провайдера | Информация |
| radioStationId | ID радиостанции TuneIn | Информация |
| сервис | название текущей музыкальной службы | Информация |
| объем | Громкость воспроизведения. Вы можете ввести значение в диапазоне 0-100% | ВХОД Объем |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder. *
Настройки напоминания (Erinnerungen) для каждого устройства, если они доступны.

| Государственное название | смысл | значение |
| - | - | - |
| включен | Показывает состояние напоминания и позволяет изменить его: Активировать напоминание с истинным - Деактивировать напоминание с ложным, будет удалено через некоторое время после его автоматического при отключении | правда / ложь |
| время | Время для напоминания. Перезаписать время для существующего напоминания, чтобы установить новое время | Ввод времени | Если у вас есть существующее напоминание, вы можете изменить время здесь, просто переписав время в формате чч: мм: сс, секунды не нужны для установки |
| сработал | истина, если напоминание достигнуто и сработало. Часы должны быть синхронизированы с Amazon и iobroker. Используйте это для запуска других действий, как только наступит время напоминания | правда / ложь |

| новый | Добавить новое напоминание в формате <br> время (чч: мм), текст <br> | Ввод текста <br> 12:00, напомни мне

### Alexa2.0.Echo-Devices.Serialnumber.Routines. *
Обзор процедур, установленных в Alexa App. Самостоятельно созданные подпрограммы имеют серийный номер, Amazon показывает как «предварительно сконфигурированный: ...». Каждая подпрограмма может быть запущена с помощью кнопки для запуска один раз.

| Государственное название | смысл | значение |
| - | - | - |

| Серийное или внутреннее название рутины | название рутины | кнопка

### Alexa2.0.Echo-Devices.Serialnumber.Timer. *
На каждом устройстве Alexa может работать один или несколько таймеров. Из-за очень динамичной природы таймеров не будет никаких других объектов, созданных, как с помощью Alarm или Reminders, но существует способ получить информацию о срабатывании.

| Государственное название | смысл | значение |
| - | - | - |

| сработал | Таймер сработал | Информация

### Alexa2.0.Echo-Devices.Serialnumber.online
Это устройство Alexa онлайн и подключено к облаку Amazon?

| Государственное название | смысл | значение |
| - | - | - |

| онлайн | Устройство в сети? | True / False

### Alexa2.0.История
| Государственное название | смысл | значение |
| - | - | - |
| #trigger | Кнопка для получения новой истории (более актуальная, чем отметка времени в creationTime), требуется только в том случае, если не используется push-соединение | Кнопка |
| cardContent | Дополнительная информация, как показано в Alexa-App / Echo Show | Информация |
| cardJson | Дополнительная информация, как показано в Alexa-App / Echo Show в формате JSON | Информация |
| creationTime | дата этой записи в истории, новые записи истории рассматриваются только тогда, когда позже эта отметка времени | Информация |
| domainApplicationId | Дополнительная информация, такая как Skill-ID или такая, необязательная | Информация |
| domainApplicationName | Дополнительная информация, такая как имя навыка или другое, необязательно | Информация |
| JSON | Json последних командных данных для обработки всей информации, например в собственных JavaScripts | JSON |
| имя | Название устройства, получившего последний запрос | Информация |
| серийный номер | серийный номер устройства, получившего последний запрос | Информация |
| статус | Статус последней команды в Alexa | SUCCESS / FAULT / DISCARDED_NON_DEVICE_DIRECTED_INTENT; последний генерируется при активации устройства, произнося слово «пробуждение», или когда устройство отбрасывает ввод как «не для меня» |
| резюме | текст / сводка / действие, полученное устройством | Информация |

### Alexa.0.Smart-Home-Устройства
Включает в себя все устройства для умного дома Алекса знает из ваших навыков. Сформулируйте следующее для всех известных устройств:

| Государственное название | смысл | значение |
| - | - | - |

| deleteAll | удаляет все устройства умного дома из Alexa, так же, как кнопка в приложении Alexa | Кнопка | DiscoverDevices | находит новые умные домашние устройства, такие же, как кнопка в приложении Alexa | Кнопка | queryAll | запрашивает все устройства, видимые только тогда, когда хотя бы одно устройство может получить информацию | кнопка

### Alexa.0.Smart-Home-Devices.SerialNumber. *
| Государственное название | смысл | значение |
| - | - | - |

| #delete | удалить устройство умного дома из Alexa | Кнопка | #enabled | Устройство «Умный дом» активно? | Информация

| #query | данные запроса для этого устройства, видимые только тогда, когда устройство / умный дом поддерживает умение извлекать информацию | Кнопка |
| активный | показано для сцен, когда их можно активировать / деактивировать | правда / ложь |
| powerState | Включить / выключить питание | изменяемый, правда / ложь |
| ... | Много других возможных состояний в зависимости от типа устройства «умный дом» | Информация или изменчива :-) |

** -> Специальные состояния для цветных / световых приборов **

| Государственное название | смысл | значение |
| - | - | - |
| яркость | яркость оттенка света | изменяемый 0-100% |
| цвет-яркость | яркость для определения цвета (вместе с оттенком и насыщенностью, HSV) | Информация, 0-1% |
| цветовой тон | значение оттенка цвета (вместе с яркостью и насыщенностью, HSV) | Информация, 0-360 ° |
| насыщенность цвета | насыщенность цвета (вместе с яркостью и оттенком, HSV) | Информация, 0-1 |
| colorRGB | RGB-код фактического цвета строится из цветовых * значений | Информация, #rrggbb |
| colorName | Название цвета, как определено Alexa - фиксированные значения | изменяемый, чтобы установить цвет, 0-144 |
| colorTemperarureInKelvin | Цветовая температура в Кельвинах | Информация, 1000-10000К |
| colorTemperaName | Имя цветовой температуры как определено Alexa - фиксированные значения | изменяемый для установки, 0-18 |

С помощью #brightness вы можете отрегулировать яркость освещения, #colorName - выбрать один предопределенный цвет (0-144). Для HUE Ambient light вы можете выбрать между 19 значениями от 0 до 18 в #colorTemperaName. Весь свет может включаться и выключаться с помощью #powerState.

### Alexa2.0.Info. *
| Государственное название | смысл | значение |
| - | - | - |
| связь | Если подключение к Алексе в порядке | Информация -> правда / ложь |
| печенье | Alexa cookie, используйте с несколькими внешними скриптами, которые также хотят получить доступ к Alexa APIs | Информация |
| CSRF | Alexa CSRF, используйте с несколькими внешними скриптами, которые также хотят получить доступ к Alexa APIs | Информация |

## Отсутствующие функции
* Как обновить исходный статус для тома, перемешать или повторить и сделать не Disturb ?! Или ненужный?
* добавить поля для отображения информации об игре, например, версии JS
* Самостоятельная деактивация, если cookie / csrf недействительны

## Установка
Как обычно, используя стабильный репозиторий, последний репозиторий или используйте опции «Установить» ioBroker из GitHub

## Поиск проблемы
### Проблемы с определением Cookie через E-Mail / Пароль
Иногда Amazon применяет проверки, когда обнаруживает неожиданный трафик при входе в систему.
Это может привести к проблеме, требующей ответа на контрольную сумму для входа в систему.
В основном на эту капчу нужно ответить один раз, и после этого вход в систему работает без капчи.

Когда вам нужно ответить на такую капчу, попробуйте сделать следующее:

* Используйте общий браузер (например, Chrome)
* отключить Javascript!
* очистить все куки, которые могут существовать для Amazon или использовать режим браузера Proivate / Incognito
* звоните https://alexa.amazon.de
* вы должны получить форму входа (обычно отображается для старых мобильных браузеров)
* войдите туда с вашими учетными данными Amazon, где Echo / Alexa зарегистрирован в
* вам может потребоваться войти в систему дважды или решить вопрос с помощью контрольного кода
* В конце вы должны увидеть «https://alexa.amazon.de/spa/index.html» как URL, но без какого-либо реального контента (потому что JS все еще отключен), НО ЭТО ПОЛНОСТЬЮ ОК !!!!
* теперь попробуйте снова получить cookie
* если это все еще не работает, сделайте это снова и проверьте User-Agent и accept-Language в вашем браузере и используйте их в адаптере при следующей попытке

Кроме того, Accept-Language-Header (по умолчанию "de-DE") должен соответствовать вашему языку / языку браузера / языку страницы Amazon, которую вы входите.

Вы также можете попробовать поиграть с User-Agent и использовать тот, который больше соответствует типу системы, которую вы используете.
Например, используя «Mozilla / 5.0 (X11; Linux x86_64) AppleWebKit / 537.36 (KHTML, как Gecko) Chrome / 51.0.2704.103 Safari / 537.36» в качестве User-Agent, было сообщено, что он работает лучше, когда ioBroker работает в системе linux.

Вы можете переопределить все эти параметры в конфигурации адаптера.

### Как определить Cookie самостоятельно?
Если автоматическое определение файлов cookie не работает или вы не доверяете адаптеру в предоставлении адреса электронной почты / пароля, вы можете определить файл cookie самостоятельно. В Интернете есть несколько информации о том, как это сделать. Вот несколько ссылок:

* https://www.gehrig.info/alexa/Alexa.html
* или используйте скрипт из https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html, чтобы получить его на оболочке ...

Но имейте в виду: Cookie истекает через несколько раз, а затем адаптер перестает работать и отключается. Затем вам нужно вручную получить новый файл cookie!

## Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io - это сервис для разработчиков, позволяющий получить обзор ошибок в своих приложениях. И именно это реализовано в этом адаптере.

Когда происходит сбой адаптера или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включался и ваш установочный идентификатор (это просто уникальный идентификатор **без** каких-либо дополнительных сведений о вас, адрес электронной почты, имя или тому подобное). Это позволяет Sentry группировать ошибки и показывать, на сколько уникальных пользователей влияет такая ошибка. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не выходят из строя

## Changelog

### 3.2.4 (2020-06-18)
* (Apollon77) Update Alexa-Remote Library to optimize communication error/timeout cases

### 3.2.3 (2020-06-17)
* (Apollon77) Fix currentState handling

### 3.2.2 (2020-06-17)
* (Apollon77) remove goodnight because was not working
* (Apollon77) Fix Play/Pause states and some media optimizations

### 3.2.1 (2020-06-17)
* (Apollon77) update amazon-cookie library: another optimization for Node.js 14

### 3.2.0 (2020-06-17)
* (Apollon77/hive) add new commands, jokes/facts/goodnight/cleanup
* (Apollon77/hive) add new command curatedtts with allowed values ["goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome"] to play random curated sentences
* (Apollon77) Prevent some crashes
* (Apollon77) Make sure Timer are not triggering the state when deleted
* (Apollon77) make sure that Lists objects are deleted correctly when deleting
* (Apollon77) Make compatible with nodejs 14
* (Apollon77) Adjust to changes from Amazon so that initial Proxy process works again
* (OberstVonGatow) Make sure that for Spotify Media data requests do not have negative effects and stop the playback  

### 3.1.2 (2020-03-18)
* (Gieskanne/Apollon77) Add Next Timer Date as state
* (Apollon77) Fix missing history entries
* (Apollon77) Prevent List deletions from logging errors
* (Apollon77) optimiztions, dependency updates and fixes
* (Apollon77) Switch to ioBroker own sentry instance
* (Apollon77) add Info.softwareVersion

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes 

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems 

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above) 

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive


### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.x (Github only as iobroker.alexa)
* (Apollon77) 0.1.5: Adapter disables itself on error (no cookie/no csrf in cookie/captcha needed)
* (Apollon77) 0.1.5: Reorganized some states (delete object again please), add playerinfo section for later usage, hopefully fixed unplanned device renaming and other things
* (Apollon77) 0.1.5: Added adapter config options to overwrite used amazon-page, user-agent and accept-language for cookie determination and
* (Apollon77) 0.1.4: State changes are logged and only considered when ack=false!
* (Apollon77) 0.1.3: Corrected all roles, delete objects and start again!
* (Apollon77) 0.1.3: bluetooth connection status filled correctly initially
* (Apollon77) 0.1.2: Library fixes and updates
* (Apollon77) 0.1.1: Library fixes and updates

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2017-2018 soef <soef@gmx.net>, 2018-2020 Ingo Fischer <iobroker@fischer-ka.de>

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