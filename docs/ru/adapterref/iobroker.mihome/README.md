---
local: true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome/README.md
title: ioBroker Mi Home Адаптер
hash: GmavLxm+klUaUCFI7o/yKJ8KJqOtoyN2RmgfJUQcojY=
---
![логотип](../../../de/adapterref/iobroker.mihome/media/mihome.png)

# IoBroker Адаптер Mi Home Адаптер Mi Home адаптер Mi Control Hub (шлюз) интегрирован в систему ioBroker, обеспечивая связь между различными датчиками Xiaomi, коммутаторами и т. д. с помощью ioBroker.
О ioBroker можно, например, освещение и динамик шлюза контролируются.

## Требования
* Приложение Mi Home на устройстве Android или iOS и бесплатная функция локальной сети
* Подключен Mi Home Gateway
* Операционная система ioBroker

### Установите приложение Mi Home и разблокируйте функцию локальной сети
#### Android
* §§LLLL_0§§ на устройстве Android для загрузки, установки, открытия и

согласиться с условиями.

* Выберите страну *Материковый Китай*
* Создать аккаунт через *Войти*
* После успешной регистрации через `+` добавьте устройство
* В разделе *Безопасность домашних хозяйств* выберите `MI Control Hub` и следуйте инструкциям.

следовать

* После успешной интеграции шлюза, 3 точки на верхнем правом экране

и затем нажмите *О*

* Нажмите на текст *плагин версии* ниже 10 раз
* Теперь включен режим разработчика, и это должно занять некоторое время.

Появятся еще 2 пункта меню> Если нет, попробуйте еще раз

* Выберите пункт меню `Wireless communication protocol`
* Включите ползунковый переключатель сверху, запишите пароль и подтвердите, нажав `OK`.

> Пароль понадобится позже при установке ioBroker.

Теперь другие устройства можно обучить с помощью символа `+`.

#### IOS
* §§LLLL_0§§ на устройстве iOS для загрузки, установки, открытия и

Согласитесь с политикой конфиденциальности

* Выберите страну *Материк* через Профиль / Настройки / Региональные настройки.
* Создать аккаунт через *Войти*
* После успешной регистрации через `+` добавьте устройство
* В разделе *Безопасность домашних хозяйств* выберите `MI Control Hub` и следуйте инструкциям.

следовать

* После успешной интеграции шлюза, 3 точки на верхнем правом экране

нажмите и нажмите *О*

* Неоднократно нажмите в пустой нижней области
* Теперь включен режим разработчика, и это должно занять некоторое время.

появляются другие пункты меню> Если это не работает так же, повторите шаги

* Выберите 4-й пункт меню
* Включите ползунковый переключатель сверху, запишите пароль и подтвердите, нажав `OK`.

> Пароль понадобится позже при установке ioBroker.

Теперь другие устройства можно обучить с помощью символа `+`.

### Настройка на роутере
В разделе About / Hub info IP-адрес шлюза, используемого шлюзом, можно определить в тексте после _localip_. В используемом маршрутизаторе этот IP должен быть назначен шлюзу.
Если работа изученных устройств через приложение больше не требуется, после изучения всех устройств в маршрутизаторе и доступа в Интернет через шлюз можно отключить.

### Поддерживаемые устройства
Следующий список не является исчерпывающим:

- шлюз - Xiaomi RGB Шлюз
- sensor_ht - Xiaomi Температура / Влажность
- weather.v1 - Xiaomi Температура / Влажность / Давление
- переключатель - беспроводной переключатель Xiaomi
- sensor_switch.aq2 - Датчик беспроводного переключателя Xiaomi Aqara
- sensor_switch.aq3 - Датчик беспроводного переключателя Xiaomi Aqara
- штекер - Xiaomi Smart Plug
- 86plug - Умная розетка Xiaomi
- 86sw2 - Xiaomi Wireless Dual Wall Switch
- 86sw1 - Xiaomi Wireless Single Wall Switch
- natgas - Детектор газовой сигнализации Xiaomi Mijia Honeywell
- дым - Детектор пожарной сигнализации Xiaomi Mijia Honeywell
- ctrl_ln1 - Переключатель противопожарной стены Xiaomi Aqara 86 одна кнопка
- ctrl_ln1.aq1 - Настенный выключатель Xiaomi Aqara LN
- ctrl_ln2 - Двойной ключ для настенного выключателя Xiaomi 86
- ctrl_ln2.aq1 - Настенный выключатель Xiaomi Aqara LN, двойной ключ
- ctrl_neutral2 - Двойной настенный выключатель Xiaomi
- ctrl_neutral1 - Проводной одностенный выключатель Xiaomi
- куб - Xiaomi Cube
- sensor_cube.aqgl01 - Xiaomi Cube
- магнит - датчик двери Xiaomi
- sensor_magnet.aq2 - Датчик двери Xiaomi Aqara
- занавес - Умный занавес Xiaomi Aqara
- движение - датчик движения Xiaomi
- sensor_motion.aq2 - Датчик движения Xiaomi Aqara
- sensor_wleak.aq1 - Датчик воды Xiaomi Aqara
- ctrl_ln2.aq1 - Настенный выключатель Xiaomi Aqara LN (двухместный)
- remote.b286acn01 - Беспроводной пульт дистанционного управления Xiaomi Aqara (Double Rocker)
- remote.b1acn01 - Беспроводной пульт дистанционного управления Xiaomi Aqara
- вибрация - датчик вибрации Xiaomi
- wleak1 - Датчик воды Xiaomi Aqara
- lock_aq1 - Xiaomi Lock

## IoBroker Mi Home Установка адаптера
Дальнейшие настройки возможны только через интерфейс администратора ioBroker.
Найдите адаптер в области *Adapter* и установите символ через `+`.

![логотип](../../../de/adapterref/iobroker.mihome/media/Adapter.png)

Затем откроется следующее окно конфигурации:

![логотип](../../../de/adapterref/iobroker.mihome/media/Adapterconfig1.PNG)

Введите указанный выше пароль в `Default Gateway Key` и сохраните его с помощью * и * закройте * окно. Текущий адаптер должен отображаться зеленым цветом под * Экземпляры *:

![логотип](../../../de/adapterref/iobroker.mihome/media/Instanz.PNG)

Под *Объектами* шлюз и его изученные устройства теперь отображаются:

![логотип](../../../de/adapterref/iobroker.mihome/media/Objekte.PNG)

Руководство было создано, насколько мне известно, и убеждения.

## Changelog
### 1.2.6 (2019-03-04)
- (Diginix) Improved calculation for sensor's battery percentage

### 1.2.5 (2019-01-24)
- (Vanwards) Added long click for Aquara wall switch

### 1.2.4 (2019-01-15)
- (SchumyHao) Add Chinese support

### 1.2.3 (2018-10-23)
- (goohnie) New wall switch was added

### 1.2.0 (2018-10-12)
- (bluefox) refactoring

### 1.1.2 (2018-10-08)
- (bluefox) New button switch was added

### 1.1.1 (2018-09-23)
- (bluefox) Fixed the creation of new devices

### 1.1.0 (2018-09-13)
- (bluefox) New devices added:  sensor_switch.aq3, ctrl_ln1.aq1, ctrl_ln2.aq1, sensor_cube.aqgl01, remote.b286acn01, vibration, wleak1, lock_aq1
- (bluefox) Names will be taken from gateway

### 1.0.7 (2018-06-25)
- (bluefox) The heartbeat timeout and the re-connection interval settings were added

### 1.0.6 (2018-05-26)
- (bluefox) Added new Aqara cube sensor

### 1.0.5 (2018-03-05)
- (bluefox) Xiaomi Aqara Wall Switch LN Double was added

### 1.0.4 (2018-01-21)
- (bluefox) The alarm state was fixed.

### 1.0.3 (2018-01-21)
- (bluefox) Invalid temperature values will be ignored

### 1.0.2 (2018-01-14)
- (bluefox) Ignore unknown state of sensors

### 1.0.0 (2018-01-05)
- (bluefox) Do not overwrite the names
- (bluefox) Ready for Admin3

### 0.3.3 (2017-11-26)
- (bluefox) Allow multiple mihome gateways

### 0.2.4 (2017-11-04)
- (bluefox) Add aqara water sensor

### 0.2.3 (2017-09-22)
- (bluefox) Remove "." from id of the device

### 0.2.2 (2017-08-01)
- (bluefox) Set after 300ms doublePress to false by Temperature Sensor\nAllow control of Plug

### 0.2.1 (2017-07-29)
- (bluefox) Implement double click on temperature sensor

### 0.2.0 (2017-07-18)
- (bluefox) fix battery level

### 0.1.4 (2017-06-09)
- (bluefox) add cube
- (bluefox) remove voltage by gateway

### 0.1.1 (2017-06-06)
- (bluefox) Initial commit

## License

MIT

Copyright (c) 2017-2019 bluefox <dogafox@gmail.com>