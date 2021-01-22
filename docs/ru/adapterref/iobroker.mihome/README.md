---
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome/README.md
title: Домашний адаптер ioBroker Mi
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
---
![логотип](../../../de/adapterref/iobroker.mihome/media/mihome.png)

# IoBroker Mi Home Adapter С помощью Mi Home Adapter Mi Control Hub (шлюз) интегрирован в систему ioBroker и, таким образом, позволяет различным датчикам, переключателям и т. д. Xiaomi взаимодействовать с ioBroker.
ioBroker может, например, можно управлять освещением и громкоговорителем шлюза.

## Требования
* Приложение Mi Home на устройстве Android или iOS и активированная функция локальной сети
* Подключен домашний шлюз Mi
* Операционная система ioBroker

### Установка приложения Mi Home и активация функции локальной сети
#### Android
* [Android App] (https://play.google.com/store/apps/details?id=com.xiaomi.smarthome) на устройстве Android: загрузите, установите, откройте и

согласен с условиями.

* Выберите *Материковый Китай* в качестве страны
*Создайте учетную запись через * Вход*
* После успешной регистрации добавьте устройство через `+`
* В разделе *Бытовая безопасность* выберите `MI Control Hub` и следуйте инструкциям.

последствия

* После успешной интеграции шлюза 3 точки в правом верхнем углу экрана

а затем нажмите *О себе*

* Введите текст *Версия плагина* 10 раз ниже
* Теперь режим разработчика включен и должен через определенное время

Появятся еще 2 пункта меню> Если нет, попробуйте еще раз

* Выберите пункт меню «Протокол беспроводной связи»
* Включите ползунковый переключатель вверху, запомните пароль и подтвердите, нажав «OK».

> Пароль потребуется позже при установке ioBroker.

Теперь с помощью знака `+` можно обучить другие устройства.

#### IOS
* [Приложение iOS] (https://itunes.apple.com/de/app/mi-home-xiaomi-smarthome/id957323480?mt=8) на устройстве iOS: загрузите, установите, откройте и

Я согласен с политикой конфиденциальности

* Выберите страну *Материк* через Профиль / Настройки / Настройки страны.
*Создайте учетную запись через * Вход*
* После успешной регистрации добавьте устройство через `+`
* В разделе *Бытовая безопасность* выберите `MI Control Hub` и следуйте инструкциям.

последствия

* После успешной интеграции шлюза 3 точки в правом верхнем углу экрана

нажмите и нажмите *О программе*

* Нажмите несколько раз в пустой области ниже
* Теперь режим разработчика включен и должен через определенное время

появляются дальнейшие пункты меню> Если сразу не работает, повторите шаги

* Выберите 4-й пункт меню
* Включите ползунковый переключатель вверху, запомните пароль и подтвердите, нажав «OK».

> Пароль потребуется позже при установке ioBroker.

Теперь с помощью знака `+` можно обучить другие устройства.

### Настройка на роутере
В разделе About / Hub info IP-адрес шлюза, используемого шлюзом, можно определить в тексте после _localip_. В используемом маршрутизаторе этот IP-адрес должен быть постоянно назначен шлюзу.
Если вы больше не хотите управлять обученными устройствами через приложение, доступ к Интернету на шлюзе также можно отключить после того, как все устройства были обучены в маршрутизаторе.

### Поддерживаемые устройства
Следующий список не претендует на полноту:

- шлюз - Xiaomi RGB Gateway
- sensor_ht - Температура / влажность Xiaomi
- weather.v1 - Xiaomi Температура / Влажность / Давление
- переключатель - Xiaomi Wireless Switch
- sensor_switch.aq2 - Датчик беспроводного переключателя Xiaomi Aqara
- sensor_switch.aq3 - Датчик беспроводного переключателя Xiaomi Aqara
- вилка - Xiaomi Smart Plug
- 86plug - Умная настенная розетка Xiaomi
- 86sw2 - Двойной настенный беспроводной переключатель Xiaomi
- 86sw1 - Беспроводной одностенный выключатель Xiaomi
- natgas - Детектор газовой сигнализации Xiaomi Mijia Honeywell
- дым - Детектор пожарной сигнализации Xiaomi Mijia Honeywell
- ctrl_ln1 - Xiaomi Aqara 86 Fire Wall Switch One Button
- ctrl_ln1.aq1 - Настенный выключатель Xiaomi Aqara LN
- ctrl_ln2 - Двойная клавиша выключателя нулевого брандмауэра Xiaomi 86
- ctrl_ln2.aq1 - Двойная клавиша настенного переключателя Xiaomi Aqara LN
- ctrl_neutral2 - Двойной проводной настенный переключатель Xiaomi
- ctrl_neutral1 - Проводной одностенный выключатель Xiaomi
- куб - Xiaomi Cube
- sensor_cube.aqgl01 - Xiaomi Cube
- магнит - Датчик двери Xiaomi
- sensor_magnet.aq2 - Датчик двери Xiaomi Aqara
- шторка - Xiaomi Aqara Smart Curtain
- движение - датчик движения Xiaomi
- sensor_motion.aq2 - Датчик движения Xiaomi Aqara
- sensor_wleak.aq1 - Датчик воды Xiaomi Aqara
- ctrl_ln2.aq1 - Настенный выключатель Xiaomi Aqara LN (двойной)
- remote.b286acn01 - Беспроводной пульт дистанционного управления Xiaomi Aqara (двойной рокер)
- remote.b1acn01 - Беспроводной пульт дистанционного управления Xiaomi Aqara
- вибрация - датчик вибрации Xiaomi
- wleak1 - Датчик воды Xiaomi Aqara
- lock_aq1 - Замок Xiaomi

## Установка ioBroker Mi Home Adapter
Дальнейшие настройки могут быть выполнены только через интерфейс администратора ioBroker.
Найдите адаптер в области *Адаптер* и установите его, используя знак `+`.

![логотип](../../../de/adapterref/iobroker.mihome/media/Adapter.png)

Затем открывается следующее окно конфигурации:

![логотип](../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

Введите пароль, указанный выше в `Default Gateway Key`, и закройте окно, нажав * сохранить * * и закрыть *. Затем работающий адаптер должен отображаться зеленым цветом в разделе * Экземпляры *:

![логотип](../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

Шлюз и его обученные устройства теперь отображаются в разделе *Объекты*

![логотип](../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

Инструкции были составлены на основе наших знаний и убеждений.

## Changelog

### 1.3.7 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-MIHOME-A)

### 1.3.6 (2020-09-25)
* (VLGorskij) Added new device QBKG24LM

### 1.3.5 (2020-09-17)
* (Apollon77) Fix crash cases (Sentry IOBROKER-MIHOME-1..4)

### 1.3.4 (2020-08-31)
* (Alan) Fixed the crash for non existing attributes 

### 1.3.3 (2020-08-26)
* (bluefox) Sentry is activated

### 1.3.2 (2020-08-25)
* (VLGorskij) Added ac-partner.v3 support
* (bluefox) Added compact mode

### 1.3.1 (2020-08-19)
* (Diginix) Fixed calculation for sensor's battery percentage

### 1.3.0 (2020-01-16)
* (algar42) Ability to add devices with missing model by their SID ([e.g. for Aqara two-channel relay](https://github.com/algar42/ioBroker.mihome#usage))

### 1.2.9 (2019-11-15)
* (Diginix) Fixed pressure range and values of Aqara weather sensor

### 1.2.8 (2019-07-18)
* (SchumyHao) Change curtain and gateway light role that making them can be detected by type-detector

### 1.2.7 (2019-06-25)
* (SchumyHao) Add several devices support for protocol 2.0.x

### 1.2.6 (2019-03-04)
* (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
* (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
* (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
* (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
* (bluefox) refactoring

### 1.1.2 (2018-10-08)
* (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
* (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
* (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
* (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
* (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
* (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
* (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
* (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
* (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
* (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
* (bluefox) Do not overwrite the names
* (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
* (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
* (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
* (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
* (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
* (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
* (bluefox) fix battery level

### 0.1.4 (2017-06-09)
* (bluefox) add cube
* (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
* (bluefox) Initial commit

## License
MIT

Copyright (c) 2017-2020 bluefox <dogafox@gmail.com>