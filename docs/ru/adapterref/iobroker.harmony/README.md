---
lastChanged: 20.07.2018
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.harmony/README.md
title: Логитек Гармония
hash: aGutf+nqKKk59Zci67BUBICmxdGGXNhuY0ktt6U10HI=
---
![гармония](../../../de/adapterref/iobroker.harmony/media/harmony.png)

# Logitech Harmony
Адаптер Logitech Harmony позволяет легко интегрировать один или несколько концентраторов Logitech Harmony в систему ioBroker.

Logitech Harmony Hub может управлять различными устройствами для развлечений и умного дома. С помощью ioBroker действия можно запускать и останавливать через концентратор, запрашивать состояние действий и управлять устройствами дистанционно с помощью виртуальных нажатий клавиш.

![Harmony Hub](../../../de/adapterref/iobroker.harmony/media/harmony_850.jpg "Logitech Harmony Hub с пультом дистанционного управления Harmony Elite")

## Обзор
### Logitech Harmony
Logitech Harmony совместим с более чем 270 000 развлекательных и умных домашних устройств. К ним относятся телевизоры и кабельные коробки, проигрыватели дисков и игровые приставки, AV-ресиверы и потоковые мультимедийные проигрыватели, а также интеллектуальное освещение, замки, термостаты и многое другое.

С Logitech Harmony вы можете переключать программы, регулировать громкость, устанавливать избранное и управлять освещением и другими интеллектуальными устройствами. Изюминкой системы является создание действий по управлению несколькими устройствами одним нажатием кнопки.

1. Logitech Harmony Hub подключается к домашней сети через Wi-Fi.
2. Концентраторы Harmony не имеют порта Ethernet.
3. Концентратор поддерживает только полосу частот WLAN 2,4 ГГц. Диапазон частот 5 ГГц будет

   не поддерживается

4. Следует использовать маршрутизатор 802.11 g / n. 802.11 a / b не поддерживается.
5. WEP 64/128, WPA Personal и WEP используются в качестве шифрования для WLAN

   WPA2-AES поддерживается.

6. UPnP не должен быть включен для приложения Harmony, чтобы приложение Harmony могло выполнять

Распознать Хаба и пообщаться с ним. С другой стороны, он должен быть включен для концентратора, чтобы обнаруживать и работать с другими устройствами в сети.
Это относится, например, к таким устройствам, как Philips Hue, Sonos, Nest, Roku или Smart TV.

7. Максимальное количество устройств на ход составляет 8 устройств. 15 устройств возможно, если как

   Удаленный по крайней мере один Harmony Touch или Ultimate один зарегистрирован в концентраторе.

8. Максимальное количество предпочтительных каналов - 50 на мобильное устройство.

### Адаптер Logitech Harmony
Адаптер Logitech Harmony автоматически находит все концентраторы Logitech Harmony, которые находятся в одной сетевой подсети, через соединение Wi-Fi с сервером ioBroker.

Объекты для запуска функций и действий (= макросы команд) автоматически создаются адаптером в ioBroker. Текущий статус концентратора также доступен. Указывая или читая созданные объекты, их состояние можно изменить, и, таким образом, действия могут быть инициированы или запрошены

## Предварительные условия перед установкой
Адаптер ioBroker для системы Logitech Harmony не позволяет создавать или изменять устройства или действия. Поэтому перед использованием адаптера необходимо настроить систему дистанционного управления, как описано в руководстве Logitech, и работать с контролируемыми устройствами.

## Установка
Экземпляр адаптера устанавливается через интерфейс администратора ioBroker. Подробные инструкции для необходимых шагов установки можно найти **здесь**

После завершения установки экземпляра адаптера окно конфигурации открывается автоматически.

## Конфигурация
Адаптер автоматически находит все концентраторы Harmony, которые находятся в подсети сервера ioBroker.

### Окно «Настройки адаптера Logitech Harmony»
![Администратор](../../../de/adapterref/iobroker.harmony/media/a_harmony_admin_settings.png "Интерфейс администратора")

| Поле | Описание |
|:-------------|:-------------|
| **Пользователь Hub** | Если доступ к конфигурации Harmony Hub обеспечивается с помощью пользователя и пароля, здесь необходимо ввести имя пользователя. Он чувствителен к регистру.
| **Пароль концентратора** | Если доступ к конфигурации Harmony Hub обеспечивается с помощью пользователя и пароля, необходимо ввести пароль здесь. Он чувствителен к регистру.

Два поля необходимо заполнять только в том случае, если концентратор защищен именем пользователя и паролем.

После завершения настройки диалоговое окно конфигурации закрывается с `SPEICHERN UND SCHLIEßEN`. Это приведет к последующему перезапуску адаптера.

## Экземпляры
При установке адаптера был создан активный экземпляр адаптера Logitech Harmony Hub в разделе `Objekte`.

![пример](../../../de/adapterref/iobroker.harmony/media/a_harmony_instanz.png "Первый экземпляр")

На сервере ioBroker может быть установлен только один экземпляр адаптера Logitech Harmony.

Включен ли адаптер или подключен к Logitech Harmony Hub, указывается цветом поля «Состояние» экземпляра. Если указатель мыши указывает на символ, отображается дополнительная подробная информация.

## Объекты адаптера
В разделе `Objekte` все устройства и действия, распознаваемые адаптером в концентраторе, перечислены в древовидной структуре. Кроме того, предоставляется также информация о том, происходит ли связь с концентратором гладко.

![объекты](../../../de/adapterref/iobroker.harmony/media/a_harmony_objekte.png "Предметы адаптера Гармония")

Каждая точка данных связана со своим типом данных и разрешениями.
Разрешения можно читать (R), а также писать (W). Каждая точка данных может быть по меньшей мере прочитана (R), тогда как другие также могут быть описаны. Чтобы найти конкретную точку данных, рекомендуется поиск с использованием комбинации клавиш «CTRL + F».

| Объект | Доступ | Bescheibung |
|------|-------|-----------|
| **гармония.0** | R | Имя первого *экземпляра* адаптера Logitech Harmony |
| & #; **Harmony Hub** | R | Имя *Hub* |
| & mp; **Apple TV поколения 3** | R | Имя *устройства* содержит функции устройства |
| &emsp; **** Denon AV Receiver** | R | Имя *устройства* содержит функции устройства |
| &emsp; &emsp; **** | R | Другие *устройства* |
| &emsp; &emsp; **деятельность** | R | Список всех *действий* | запрограммированных в Harmony Hub
| &emsp; &emsp; ***hubBlocked*** | R | Указывает, занят ли концентратор |
| &emsp; &emsp; ***hubConnected*** | R | Состояние соединения между адаптером и концентратором |

### Функции устройства
Если вы откроете устройство, вы получите список всех функций, принадлежащих устройству. Эти функции устройства зависят от устройства и поэтому различаются в устройствах разных типов.

![устройство](../../../de/adapterref/iobroker.harmony/media/a_harmony_geraet.png "функции устройства")

#### Запуск функции устройства
Каждая функция устройства `{Instanz}.{Hub Name}.{Gerät}.{Gerätefunktion}` запускает соответствующую реакцию адресованного устройства. Значения функций устройства могут быть прочитаны и записаны. Запуск можно проверить с помощью указателя мыши, чтобы активировать звонок справа от функции. Кроме того, вы также можете ввести значение там с символом карандаша.
Значения имеют единицу измерения `Millisekunden`. Если вы вводите значение от 1 до 250 мс, концентратор Harmony обычно выдает нажатие одной клавиши указанной длины. Значения, превышающие 250 мс, могут привести к тому, что устройство будет работать несколько раз.
После запуска функции устройства значение снова изменяется на 0.

### Мероприятия
Ниже `activities` перечислены все действия, запрограммированные в Harmony Hub.

![деятельность](../../../de/adapterref/iobroker.harmony/media/a_harmony_activities.png "деятельность")

#### Начало деятельности
Действия начинаются, если вы вводите число больше 0 для действия `{Instanz}.{Hub Name}.activities.{Aktivität}`.
Во время выполнения операции это значение сначала изменяется на 1 (= начало), а затем на 2 (= активно).

#### Завершение деятельности
Работу можно остановить, установив для нее значение 0.
Кроме того, вы можете ввести любой номер, чтобы прекратить действие в объекте `{Instanz}.{Hub Name}.activities.currentStatus`.
Во время прекращения действия `{Instanz}.{Hub Name}.activities.currentStatus` изменяется с 3 (= прекращается) на 0 (= неактивен).

#### Другие значения статуса
`{Instanz}.{Hub Name}.activities.currentActivity` возвращает текущее текущее действие в виде строки.

`{Instanz}.{Hub Name}.activities.currentStatus` указывает на статус Центра Гармонии. Значения означают

- 0 = неактивно
- 1 = старт
- 2 = активный
- 3 = отделка

`{Instanz}.{Hub Name}.activities.{Aktivität}` указывает на статус действия.
Значение значений аналогично `{Instanz}.{Hub Name}.activities.currentStatus`.

## Деинсталляция
> T: Я думаю, что стандартная установка адаптера в центральной статье подробно описана. Адаптер будет (всегда) ссылаться на эту центральную статью. Здесь описаны только отклонения от стандартной процедуры.

Если экземпляр нужно удалить снова, он будет удален с помощью назначенного значка корзины в столбце Экземпляры

![удалять](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_01.png)

Появится запрос подтверждения, который должен быть подтвержден с помощью ***OK***

![delete2](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_02.png)

Затем снова появится окно, показывающее обработку команд удаления

![удалить3](../../../de/adapterref/iobroker.harmony/media/adapter_harmony_delete_03.png)

Эта деинсталляция полностью удаляет все объекты, принадлежащие экземпляру.

Если установочные файлы полностью удалены с хоста, это необходимо сделать с помощью значка корзины на плитке адаптера Harmony в разделе Адаптеры.

## Скидки
резервная копия

multihost

история

производительность

## FAQ
!> Ищите на форуме часто задаваемые вопросы и дайте справочный ответ здесь

1. **Соединение с концентратором прерывается снова и снова.**

Для связи с адаптером Harmony Hub требуется отличная беспроводная связь. Рекомендуется использовать точку доступа беспроводной локальной сети в непосредственной близости от концентратора.

2. **Как реализовать кнопку "alles aus" через ioBroker?**

   Установите для `{Instanz}.{Hub Name}.activities.currentStatus` значение 0.

3. ** Под Windows сообщение появляется при установке адаптера

   `ERR! code ENOGIT` и адаптер не работает. **

Перед установкой адаптера Harmony загрузите и установите GIT с веб-сайта https://git-scm.com/download/win.

4. ** Под Linux сообщение появляется при установке адаптера

   `ERR! code ENOGIT` и адаптер не работает. **

Установите GIT с помощью командной строки и `sudo apt install git` перед установкой адаптера Harmony.

6. **Скрипты больше не работают с более новыми версиями адаптера.**

Начиная с версии 0.9.1 адаптера, объекты называются по-разному. Из старых `harmony.0.Harmony_Hub` был, например, новый `harmony.0.Harmony Hub`. Пожалуйста, проверьте объекты и добавьте к ним компоненты, например, Настройте скрипты.

7. ** Wi-Fi автоматически отключается ночью. Адаптер подстраивается под

   Перезапуск WLAN не приводит к автоматическому подключению к концентратору. **

Вставьте автоматический перезапуск экземпляра гармонии (экспертный режим) через 5-10 минут после запуска WiFi-роутера.

8. **HUB не найден.**

Проверьте, является ли концентратор действительно той же сетевой подсетью и VLAN, что и сервер ioBroker. Разрешены ли многоадресные рассылки или они отфильтрованы маршрутизатором? Горит ли светодиодный индикатор состояния на концентраторе зеленым? Доступен ли концентратор через приложение Logitech? Следуйте инструкциям Logitech для решения проблем с подключением.

9. **Может быть установлен только один экземпляр адаптера.**

На сервере ioBroker может быть установлен только один экземпляр адаптера Logitech Harmony.

## Примеры
### JavaScript
Триггерные функции устройства. Здесь AV-ресивер Denon включается или выключается при изменении значения другой точки данных.

```
if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == true) {
  setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  // Bei Kontrolle Schalter == AN keine Verzögerung Schalter
} else if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == false) {
  // Bei Kontrolle Schalter == AUS schalte mit Verzögerung
  var timeout = setTimeout(function () {
    setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfängerr:PowerOn*/, '1', true);
  }, 1000);
}
```

### Блэкли
Триггерные функции устройства. Здесь AV-ресивер Denon включается или выключается при изменении значения другой точки данных.

![блок](../../../de/adapterref/iobroker.harmony/media/a_hamony_simple_blockly.jpg "блок")

[источник](media/a_harmony_blockly.xml)

### Node-Red
> связанные нод-красные элементы

> Примеры

> Экспорт для повторного использования

### Vis
> связанные элементы vis

> Примеры

> Экспорт для повторного использования

> Фрагменты кода

## Ссылки
> Ссылки на другие документы на портале ioBroker

> Веб-ссылки, например производителю

> Ссылки на GitHub

* Сторона производителя [https://www.logitech.com/de-de/product/harmony-hub](https://www.logitech.com/de-de/product/harmony-hub)

## Changelog
### 1.2.2 (2019-03-11)
* (foxriver76) reduce discover interval and only log newly discovered hubs

### 1.2.1 (2019-02-21)
* (foxriver76) use at least 1.0.5 of harmonyhubws 

### 1.2.0 (2019-01-06)
* (foxriver76) compact mode compatibility added

### 1.1.5 (2018-12-28)
* (Pmant) fix hold key (for values > 250ms)

### 1.1.4 (2018-12-25)
* (Pmant) fix single key presses 

### 1.1.2
* (Pmant) reduce log spam
* (Pmant) fix multiple instances of one hub

### 1.1.1
* (Pmant) switch to api module

### 1.1.0
* (Pmant) switch to websocket client

### 1.0.0
* (foxriver76) replace blanks by underscores
* (foxriver76) minor readme adjustments
* (foxriver76) discover interval 1000 ms by default again

### 0.10.2
* (foxriver76) added discover interval and port to code
* (foxriver76) discover interval is now 300 ms instead of 1000 ms

### 0.10.0
* (foxriver76) added possibility to specify subnet for discovery
* (foxriver76) fix translations
* (foxriver76) Logging improved
* (foxriver76) materialized index.html for admin v3
* (foxriver76) make sure callback in unload is called

### 0.9.6
* (foxriver76) updating code to es6
* (foxriver76) using maintained harmony libs for discover and client
* (foxriver76) possibility to only add whitelisted hubs
* (foxriver76) MAX_CLIENTS = 6 error fixed
* (foxriver76) enhanced logging
* (foxriver76) changes for new libs

### 0.9.3
* (justr1) fix error with hubname

### 0.9.1
please delete all harmony.x objects once
* (Pmant) fix problematic chars

### 0.7.0
* (Pmant) support multiple hubs
* (Pmant) removed hub config from admin
* (Pmant) find free Port for Hub-Discovery

### 0.6.2
* (Pmant) fix wrong port

### 0.6.1
* (Pmant) reduce logging

### 0.6.0
* (Pmant) fix admin in firefox
* (Pmant) improve connection stability (needs testing)

### 0.5.6
* (PArns) update harmony lib
* (PArns) removed unneeded functions due to lib update
* (Pmant) fix bug with blocked state

### 0.5.5
* (Pmant) fix hub lifecycle

### 0.5.4
* (Pmant) fix node 5.0.0

### 0.5.3
* (Pmant) fix node-xmpp-client version

### 0.5.2
* (Pmant) change: add instance after installation
* (Pmant) fix: deletes history settings

### 0.5.1
* (Pmant) fix: bug with wrong states

### 0.5.0
* (Pmant) change: object structure (delete instance once if had 0.2.1 or lower installed!)
* (Pmant) add: send commands for x milliseconds
* (Pmant) add: delete unused activities and devices
* (Pmant) add: delay commands when hub is busy

### 0.2.1
* (bluefox) change logo

### 0.2.0
* (Pmant) switch activity on state change
* (Pmant) stop current activity on hub status change
* (Pmant) move activities to activity channel
* (Pmant) add devices channel
* (Pmant) add device control

### 0.1.2
* (Pmant) hub discovery

### 0.1.1
* (Pmant) fixes

### 0.1.0
* (Pmant) keep alive connection to hub
* (Pmant) create/update objects and states
* (Pmant) update current activity status

### 0.0.1
* (Pmant) connect to hub
* (Pmant) listen for activies


### TODO
* translations

## License
MIT

Copyright (c) 20xx-2019 Pmant <patrickmo@gmx.de>