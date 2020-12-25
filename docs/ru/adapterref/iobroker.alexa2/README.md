---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: D+SRUcPZBTZSG1ROflwqDxficUfm4fatrviEkRp4RUQ=
---
![Логотип](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Количество установок](http://iobroker.live/badges/alexa2-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.alexa2.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/c92hrxu79mvs1qxo?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.alexa2.svg)

# IoBroker.alexa2
** Этот адаптер использует службу [Sentry.io](https://sentry.io) для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. ** Подробнее см. Ниже!

Этот адаптер позволяет удаленно управлять устройствами Alexa (Amazon Echo).

Большое спасибо soef за версию 1 адаптера и Hauke и ruhr70 за идеи в их скриптах с ioBroker-Forum (особенно за обновления медиа)! Также большое спасибо Meicker за поддержку в документировании всего этого и многочисленным пользователям форума ioBroker за их поддержку в тестировании!

## Состояния и их значения:
В пространстве имен адаптера (например, alexa2.0) создаются некоторые каналы

### Alexa2.0
| Государственное название | значение |
| - | - |
| эхо-устройства. * | Состояния на устройство Echo, см. Ниже |
| история. * | Информацию об истории команд см. Ниже |
| умные домашние устройства. * | Состояния на устройство умного дома и в целом см. Ниже |
| информация. * | Общая информация о состоянии адаптера |
| requestResult | Информация об ошибках при запросах устройств TuneIn и умного дома |

### Alexa2.0.Contacts.ContactId. *
Все контакты Alexa, которым можно отправлять текстовые сообщения, включая самого себя. Собственный контакт получает особое "(Я)" после его имени.

| Государственное название | значение |
| - | - |
| #clearOwnMessages | Существует только в собственном контакте, и триггер удаляет все сообщения, которые отправляются ему (также включают сообщения самому себе через приложение или устройства!) |
| textMessage | Отправляет этот текст как сообщение пользователю. Он отображается на всех устройствах этого пользователя с «желтым кольцом» |

### Alexa2.0.Echo-Devices.Serialnumber. *
В разделе «echo-devices» каждое устройство amazon echo указано с его серийным номером. Не каждое устройство показывает все состояния. Каждое устройство имеет свои собственные состояния, как описано ниже:

### Alexa2.0.Echo-Devices.Serialnumber.Alarm. *
Настройки будильника (Wecker) для каждого устройства, если есть.

| Государственное название | значение | значение |
| - | - | - |
| включен | Показывает состояние тревоги и позволяет изменить его: Активировать тревогу с истинным - Отключить тревогу с ложью | истина / ложь |
| время | Время для тревоги. Перезаписать время для существующего будильника, чтобы установить новое время для этого будильника. Если у вас уже есть будильник, вы можете изменить время здесь, просто перезаписав время в формате чч: мм: сс, секунды устанавливать не нужно | Ввод времени |
| срабатывает | истина, если тревога достигнута и сработала. Часы должны быть синхронизированы с Amazon и iobroker. Используйте это, чтобы запускать другие действия по достижении времени будильника | истина / ложь |
| новый | время для нового будильника для этого устройства. Если вы установите здесь значение, будет создан новый сигнал тревоги | Ввод времени (чч: мм: сс, секунды не нужны) |

### Alexa2.0.Echo-Devices.Serialnumber.Bluetooth. *
Здесь вы найдете все подключенные или известные устройства Bluetooth с MAC-адресами. Состояния каждого устройства:

| Государственное название | значение |
| - | - |
| подключен | Показывает текущий статус подключения и разрешает соединение (установлено значение true) или отключение (установлено значение false) |
| разорвать пару | Кнопка для отмены сопряжения этого устройства с устройством эха |

### Alexa2.0.Echo-Devices.Serialnumber.Commands. *
С помощью команд вы можете запускать некоторые действия на вашем устройстве Alexa. Если вы используете их на мультирумном устройстве, они выполняются независимо и *не* синхронизируются на отдельных устройствах!

| Государственное название | значение | значение |
| - | - | - |
| doNotDisturb | Включение / выключение режима "Не беспокоить" для этого устройства | истина / ложь |
| флешбрифинг | Брифинг за 100 секунд - новости etc.pp | Кнопка |
| доброе утро | Доброе утро от Алексы ... | Кнопка |
| забавный факт | Интересный факт от Алексы ... (На данный момент только США) | Кнопка |
| шутка | Шутка от Алексы ... | Кнопка |
| очистка | Воспроизводит "гонг" как для начала / конца режима прослушивания ... | Кнопка |
| curatedtts | Случайное предложение из области, выбранной в Alexa ... | Текст (разрешено: «до свидания», «подтверждения», «доброе утро», «комплименты», «день рождения», «спокойной ночи», «iamhome») |
| Singasong | Алекса поет песню ... | Кнопка |
| говорить | Алекса говорит, что вы здесь вводите ... | Ввод текста |
| SpeakVolume | Отрегулируйте громкость речи Alexa, эта громкость устанавливается перед разговором и сбрасывается после | 0-100 |
| рассказ | Алекса рассказывает историю | Кнопка |
| трафик | Новости дорожного движения | Кнопка |
| погода | Новости погоды | Кнопка |
| deviceStop | Остановить все действия на устройстве | Кнопка |
| уведомление | Отправить текстовое уведомление покупателю устройства | Текст |
| объявление | Воспроизвести объявление (например, говорить, но с Bing перед текстом) | Текст |
| ssml | Озвучить строку XML SSML | Текст |
| текстовая команда | Отправьте текстовую команду в Alexa, пока только в США! | Текст |

Подробная информация Говорите и объявляйте: введите здесь то, что вы хотите, чтобы Алекса сказала. Вы также можете отрегулировать громкость Alexa, указав процент перед текстом.
Пример: 10; Alexa говорит, что Alexa имеет объем 10%, а 100; Alexa - объем 100%.
Обычно вы можете отправить только 250 символов за одну команду произнесения. Используя точку с запятой, можно писать сколько угодно, при условии, что вы разделите 250 символов точкой с запятой.
Затем Alexa будет говорить текст друг за другом с небольшим перерывом. Вы также можете использовать громкость вместе с более 255 блоками, написав #Volume; # Block1; # Block2, a.s.o. Установленная здесь громкость будет использоваться вместо определенной громкости речи.

### Alexa2.0.Echo-Devices.Serialnumber.Info. *
Информация об устройстве Alexa

| Государственное название | значение | значение |
| - | - | - |
| возможности | возможности устройства alexa | Информация |
| deviceType | тип устройства от Amazon | Информация |
| deviceTypeString | Тип устройства в виде строки | Информация |
| isMultiroomDevice | Мультирум-устройство - Мультирум - это группа виртуальных устройств | Информация, правда / ложь |
| isMultiroomMember | Является ли Multiroom member - если true, устройство является частью группы устройств Multiroom | Информация, правда / ложь |
| MultiroomParents | Если это устройство является частью группы многокомнатных устройств, в этом состоянии отображается родительская группа device | Информация |
| имя | Имя устройства Alexa | Информация |
| SerialNumber | Серийный номер устройства Alexa |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider. *
Непосредственно скажите Alexa воспроизвести музыку или плейлист от поддерживаемых музыкальных провайдеров. Фактически поддерживаются: Моя библиотека, Amazon Music, Tune In. Вы также можете включить название группы мультирум-устройств во фразу, чтобы воспроизвести ее в этой группе (например, "SWR3 auf Erdgeschoss")

| Государственное название | значение | значение |
| - | - | - |
| Amazon-Music | Фраза для игры с Amazon Music | Ввод текста |
| Amazon-Music-Playlist | Плейлист для воспроизведения с Amazon Music | Ввод текста |
| Моя библиотека | Фраза для игры с моей библиотекой | Ввод текста |
| Моя-библиотека-плейлист | Плейлист для игры с My Library | Ввод текста |
| Tune-In | Фраза для воспроизведения с Tune In | Ввод текста |
| Tune-In-Playlist | Плейлист для воспроизведения с Tune In | Ввод текста |

### Alexa2.0.Echo-Devices.Serialnumber.Player. *
Состояния для управления воспроизведением устройства и просмотра текущего состояния и информации о мультимедиа

| Государственное название | значение | значение |
| - | - | - |
| TuneIn-Station | текстовое поле, чтобы ввести название станции для воспроизведения этой станции на этом устройстве. Также можно ввести номер станции (s123456 ...), идентификатор шоу / подкаста (p1234567 ...) или идентификатор темы (t123456789 ...) | Ввод текста |
| ContentType | текстовое поле для вставки желаемого содержимого для воспроизведения на этом устройстве | Информация |
| controlForward | Кнопка для запуска команды игрока «вперед» (30сек) | Кнопка |
| controlNext | Кнопка для запуска команды игрока "следующий" | Кнопка |
| controlPause | Кнопка для запуска команды "пауза" для игрока | Кнопка |
| controlPlay | Кнопка для запуска команды игрока "play" | Кнопка |
| controlPrevious | Кнопка для запуска игрока "предыдущая" команда | Кнопка |
| controlRepeat | Кнопка для запуска команды «повторить» игрока | истина / ложь |
| controlRewind | Кнопка для запуска команды "перемотка" плеера (30сек) | Кнопка |
| controlShuffle | Включите или отключите режим воспроизведения в случайном порядке для игрока | истина / ложь |
| currentAlbum | Текущий альбом проигрывается | Информация |
| currentArtist | Текущий исполнитель играет | Информация |
| currentState | Если играет -> истина, иначе ложь | истина / ложь |
| currentTitle | Текущее название проигрывается | Информация |
| imageURL | URL-адрес изображения альбома | Информация |
| mainArtURL | URL к текущему основному арту | Информация |
| mediaLength | Длина текущего заголовка | Информация |
| mediaLengthStr | активная длина носителя как (ЧЧ:) ММ: СС | Информация |
| mainProgress | истекшее время активных медиа | Информация |
| mainProgressPercent | истекшее время активных медиа в процентах | Информация |
| mediaProgressStr | активный медиа прогресс как (ЧЧ:) ММ: СС | Информация |
| miniArtUrl | URL на произведение искусства (мини) | Информация |
| приглушен | состояние «MUTE» | Информация, истина / ложь, громкость = 0 считается приглушенной |
| providerID | ID текущего музыкального провайдера | Информация |
| providerName | Имя текущего музыкального провайдера | Информация |
| radioStationId | ID радиостанции TuneIn | Информация |
| сервис | название текущего музыкального сервиса | Информация |
| объем | Громкость воспроизведения. Вы можете ввести значение от 0 до 100% | INPUT Volume |

### Alexa2.0.Echo-Devices.Serialnumber.Reminder. *
Настройки напоминания (Erinnerungen) для каждого устройства, если таковые имеются.

| Государственное название | значение | значение |
| - | - | - |
| включен | Показывает статус напоминания и позволяет его изменить: Активировать напоминание с истиной - Деактивировать напоминание со значением false, при отключении будет автоматически удалено через некоторое время после этого | истина / ложь |
| время | Время для напоминания. Перезаписать время для существующего напоминания, чтобы установить новое время | Ввод времени | Если у вас есть напоминание, вы можете изменить время здесь, просто перезаписав время в формате чч: мм: сс, секунды устанавливать не нужно |
| срабатывает | истина, если напоминание достигнуто и сработало. Часы должны быть синхронизированы с Amazon и iobroker. Используйте это, чтобы запускать другие действия, как только наступит время напоминания | истина / ложь |

| новый | Добавить новое напоминание в формате<br> время (чч: мм), текст<br> | Ввод текста<br> 12:00, напомнить мне

### Alexa2.0.Echo-Devices.Serialnumber.Routines. *
Обзор процедур, установленных в приложении Alexa. Самостоятельно созданные процедуры имеют серийный номер, Amazon показывает как «предварительно сконфигурировано: ...» Каждая процедура может быть запущена с помощью кнопки для однократного запуска.

| Государственное название | значение | значение |
| - | - | - |

| Серийное или внутреннее имя процедуры | название процедуры | Кнопка

### Alexa2.0.Echo-Devices.Serialnumber.Timer. *
На каждом устройстве Alexa можно запустить один или несколько таймеров. Из-за очень динамичной природы таймеров больше не будет создаваться объектов, таких как Alarm или Reminders, но существует способ получить информацию о срабатывании триггера.

| Государственное название | значение | значение |
| - | - | - |

| срабатывает | Сработал таймер | Информация

### Alexa2.0.Echo-Devices.Serialnumber.online
Это устройство Alexa подключено к сети и подключено к облаку Amazon?

| Государственное название | значение | значение |
| - | - | - |

| онлайн | Устройство в сети? | Верно / неверно

### Alexa2.0.История
| Государственное название | значение | значение |
| - | - | - |
| #trigger | Кнопка для получения новой истории (более актуальной, чем отметка времени в createTime), требуется только тогда, когда push-соединение не используется | Кнопка |
| cardContent | Дополнительная информация, как показано в Alexa-App / Echo Show | Информация |
| cardJson | Дополнительная информация, отображаемая в приложении Alexa / Echo Show в формате JSON | Информация |
| creationTime | дата этой записи в истории, новые записи в истории учитываются только позже, как эта отметка времени | Информация |
| domainApplicationId | Дополнительная информация, такая как Skill-ID или подобная, необязательная | Информация |
| domainApplicationName | Дополнительная информация, например название навыка или что-то подобное, необязательно | Информация |
| json | Json последних данных команды, чтобы иметь возможность обрабатывать всю информацию, например. в собственных JavaScripts | JSON |
| имя | Имя устройства, получившего последний запрос | Информация |
| serialNumber | серийный номер устройства, получившего последний запрос | Информация |
| статус | Статус последней команды для Alexa | УСПЕХ / ОТКАЗ / DISCARDED_NON_DEVICE_DIRECTED_INTENT; последний генерируется при активации устройства путем произнесения слова пробуждения или когда устройство отклоняет ввод как «не для меня» |
| резюме | текст / сводка / действие, полученное устройством | Информация |

### Alexa.0.Smart-Home-Devices
Включает в себя все устройства для умного дома, которые Alexa знает по вашим навыкам. Состоит следующим образом для всех известных устройств:

| Государственное название | значение | значение |
| - | - | - |

| deleteAll | удаляет все устройства умного дома из Alexa, так же, как кнопка в приложении Alexa | Кнопка | DiscoverDevices | находит новые устройства для умного дома, такие же, как кнопка в приложении Alexa | Кнопка | queryAll | запрашивает все устройства, отображается только тогда, когда хотя бы одно устройство может получить информацию | Кнопка

### Alexa.0.Smart-Home-Devices.SerialNumber. *
| Государственное название | значение | значение |
| - | - | - |

| #delete | удалить умное домашнее устройство из Alexa | Кнопка | #enabled | Активно ли устройство умного дома? | Информация

| #query | данные запроса для этого устройства, видимые только в том случае, если умное домашнее устройство / навык поддерживает получение информации | Кнопка |
| активный | показаны для сцен, когда они могут быть активированы / деактивированы | истина / ложь |
| powerState | Включение / выключение питания | изменчивый, истина / ложь |
| ... | Еще много возможных состояний в зависимости от типа устройства умного дома | Информационная или изменчивая :-) |

** -> Особые состояния для цветных / световых устройств **

| Государственное название | значение | значение |
| - | - | - |
| яркость | яркость света HUE | изменчивый 0-100% |
| цвет-яркость | яркость для определения цвета (вместе с оттенком и насыщенностью, HSV) | Информация, 0-1% |
| цвет-оттенок | значение оттенка цвета (вместе с яркостью и насыщенностью, HSV) | Информация, 0-360 ° |
| насыщенность цвета | насыщенность цвета (вместе с яркостью и оттенком, HSV) | Информация, 0-1 |
| colorRGB | RGB-код фактического построения цвета из значений цвета- * | Информация, #rrggbb |
| colorName | Название цвета, определенное Alexa - фиксированные значения | изменяемый, чтобы установить цвет, 0-144 |
| colorTemperarureInKelvin | Цветовая температура в Кельвинах | Информация, 1000-10000К |
| colorTemperatureName | Название цветовой температуры согласно определению Alexa - фиксированные значения | изменяемый, чтобы установить, 0-18 |

С помощью #brightness вы можете настроить яркость вашего света, #colorName - это выбрать один предопределенный цвет (0-144). Для HUE Ambient light вы можете выбрать между 19 значениями от 0 до 18 в #colorTemperatureName. Весь свет можно включать и выключать с помощью #powerState.

### Alexa2.0.Info. *
| Государственное название | значение | значение |
| - | - | - |
| соединение | Если соединение с Alexa в порядке | Информация -> правда / ложь |
| печенье | Cookie Alexa, используется с несколькими внешними скриптами, которые также хотят получить доступ к API Alexa | Информация |
| csrf | Alexa CSRF, используйте с несколькими внешними скриптами, которые также хотят получить доступ к API Alexa | Информация |

## Отсутствующие функции
* как обновить исходный статус для громкости, перемешивания или повтора и doNotDisturb ?! Или ненужно?
* добавить поля для отображения игровой информации, например, версии JS
* самодеактивация, если cookie / csrf недействительны

## Установка
Как обычно, используйте стабильный репозиторий, последний репозиторий или используйте опцию «Установить» ioBroker с GitHub

## Поиск проблемы
### Проблемы с определением файлов cookie по электронной почте / паролю
Иногда Amazon использует специальные проверки при обнаружении неожиданного трафика при входе в систему.
Это может привести к проблеме, заключающейся в том, что для входа в систему необходимо ответить на капчу.
Чаще всего на эту капчу нужно ответить один раз, и после этого вход в систему работает без нее.

Когда вам нужно ответить на такую капчу, попробуйте сделать следующее:

* Используйте обычный браузер (например, Chrome)
* отключить Javascript!
* очистить все файлы cookie, которые могут существовать для Amazon, или использовать режим Proivate / Incognito в браузере
* звоните https://alexa.amazon.de
* вы должны получить форму входа (обычно отображается в старых мобильных браузерах)
* войдите туда со своими учетными данными Amazon, в которых зарегистрирован Echo / Alexa
* вам может потребоваться дважды войти в систему или ввести CAPTCHA
* В конце вы должны увидеть «https://alexa.amazon.de/spa/index.html» как URL, но без какого-либо реального содержимого (потому что JS все еще отключен), НО ЭТО ПОЛНОСТЬЮ ОК !!!!
* теперь попробуйте снова получить cookie
* если он по-прежнему не работает, сделайте это еще раз и проверьте User-Agent и accept-Language в своем браузере и используйте их в адаптере при следующей попытке

Кроме того, Accept-Language-Header (по умолчанию «de-DE») должен соответствовать вашему языку / языку браузера / языку страницы amazon, на которую вы входите.

Вы также можете попробовать поиграть с User-Agent и использовать тот, который больше соответствует типу вашей системы.
Например, при использовании «Mozilla / 5.0 (X11; Linux x86_64) AppleWebKit / 537.36 (KHTML, например, Gecko) Chrome / 51.0.2704.103 Safari / 537.36» в качестве User-Agent сообщалось, что он работает лучше, когда ioBroker работает в системе Linux.

Вы можете переопределить все эти параметры в конфигурации адаптера.

### Как самостоятельно определить Cookie?
Если автоматическое определение файлов cookie не работает или вы не доверяете Адаптеру предоставлять адрес электронной почты / пароль, вы можете определить файл cookie самостоятельно. В сети есть несколько информации о том, как это сделать. Вот несколько ссылок:

* https://www.gehrig.info/alexa/Alexa.html
* или используйте shellscript из https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html, чтобы получить его в оболочке ...

Но имейте в виду: время ожидания Cookie истечет через несколько раз, а затем адаптер перестанет работать и отключится. Затем вам нужно вручную получить новый файл cookie!

## Что такое Sentry.io и что передается на серверы этой компании?
Sentry.io - это сервис, позволяющий разработчикам получать обзор ошибок в своих приложениях. Именно это и реализовано в этом адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешили iobroker GmbH собирать диагностические данные, включается также ваш идентификатор установки (это просто уникальный идентификатор **без** дополнительной информации о вас, электронной почты, имени и т. Д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуты такой ошибкой. Все это помогает мне предоставлять безошибочные адаптеры, которые практически никогда не дают сбоев.

## Changelog

### 3.5.0 (2020-12-24)
* (Apollon77) Remove bespoken because textCommand is more flexible
* (Apollon77) Add and adjust some known devices, add Echo 4 image

### 3.4.0 (2020-12-11)
* (Apollon77) add support for textCommand - tell an Alexa device a text as you would speak it
* (Apollon77) make sure discovery of devices is still possible also after deleting all devices before

### 3.3.5 (2020-12-03)
* (Apollon77) make sure music providers with empty names do not produce errors

### 3.3.2 (2020-11-23)
* (Apollon77) prevent crash cases and optimize reconnection handling

### 3.3.1 (2020-07-24)
* (Apollon77) Further optimize Cookie handling

### 3.3.0 (2020-07-19)
* (Apollon77) Hopefully allow easier upgrades if old deviceId is invalid now
* (Apollon77) Allow to have separate deviceIds per instance

### 3.2.8 (2020-07-16)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.7 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again
* (arteck) add echo studio

### 3.2.6 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again 

### 3.2.5 (2020-07-13)
* (Apollon77) Work around Amazon Security changes and make proxy working again 
* (Apollon77) fix Sentry crash case when Amazon do not respond correctly (IOBROKER-ALEXA2-1C)

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