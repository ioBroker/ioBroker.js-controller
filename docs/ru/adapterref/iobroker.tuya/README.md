---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: ITcFjoWgbOVJgbLYwtz9JlPem9GwgnE7neC7mwnrJt4=
---
![логотип](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Значок Greenkeeper](https://badges.greenkeeper.io/Apollon77/ioBroker.tuya.svg)
![Количество установок](http://iobroker.live/badges/tuya-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![Трэвис-CI](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

# IoBroker.tuya
** Этот адаптер использует службу [Sentry.io](https://sentry.io), чтобы автоматически сообщать об исключениях и ошибках кода и новых схемах устройств мне как разработчику. **

Адаптер ioBroker для подключения к нескольким небольшим и дешевым Wi-Fi-устройствам, которые подключены к Tuya Cloud и в основном используют приложение Smartlife / Alexa-Skill. Адаптер поддерживает чтение обновлений статуса в реальном времени и управление этими устройствами после синхронизации с соответствующим приложением для мобильного телефона.

Устройства Tuya - это интеллектуальные устройства ESP8266MOD WiFi от Shenzhen Xenon.

Помимо устройств, которые можно использовать с приложением Smart Live, также должно быть возможно использование приложения Jinvoo Smart, приложения Xenon Smart, eFamilyCloud, io.e (Luminea или аналогичного). Пожалуйста, сообщите в случае успеха.

Адаптер отлично работает со всеми устройствами, которые всегда подключены к Wi-Fi. Устройства, которые подключаются к сети только при наличии события, отправляют свои данные и снова отключаются, не поддерживаются.

Один экземпляр адаптера может обрабатывать все устройства в одной сети, которая маршрутизирует пакеты UDP.

## Как работает адаптер
### Основные функции
Адаптер контролирует локальную сеть на наличие UDP-пакетов устройств Tuya (старая прошивка, только незашифрованная). Необходимо, чтобы хост ioBroker, на котором работает адаптер, был расположен в том же сегменте сети, что и устройства, и многоадресная рассылка UDP должна поддерживаться маршрутизатором!

Все обнаруженные устройства добавляются в адаптер, и в качестве базовой функции адаптер запрашивает данные в определенный интервал опроса. Без синхронизации с соответствующим мобильным приложением (см. Ниже) НИКАКИЕ дополнительные функции, такие как обновления в реальном времени или управление, невозможны.

Более новые зашифрованные устройства НЕ будут отображаться до того, как вы выполните синхронизацию устройства (см. Далее ...)

### Расширенная функциональность после синхронизации устройства
Для получения полной функциональности адаптера, а также для поддержки устройств с новой зашифрованной микропрограммой адаптер должен знать ключ шифрования.

Самый простой способ получить этот ключ шифрования - получить их из используемого мобильного приложения. Для этого адаптер предоставляет прокси-сервер для отслеживания связи приложения с серверами tuya и получения необходимой информации.

** Важное примечание для пользователей iOS: ** Описанный здесь подход Proxy больше не работает. Как только у вас будет приложение Smart Life версии 3.10 или выше, связь из приложения больше не будет видна прокси-серверу. Но он по-прежнему работает со всеми версиями Android-приложений, поэтому лучшим подходом является эмулятор Андроиса, который примерно описан по адресу https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- GER% C3% A4te / 19

Для этого в первую очередь необходимо добавить собственный Root-сертификат на ваше мобильное устройство.
При нажатии «Запустить прокси» в конфигурации экземпляра адаптера для вашей системы создается сертификат, который показывает QR-код в месте загрузки. В идеале отсканируйте QR-код на своем мобильном устройстве и следуйте процессу, чтобы добавить этот Root-сертификат и доверять ему.
Если местоположение QR-кода недоступно (может случиться при использовании Docker и т. П.), Откройте «Порт прокси-веб-информации» в своем браузере и нажмите «Root-CA» в навигации, и вы также сможете скачать файл CA.

Теперь убедитесь, что закрыли / убили соответствующее смарт-приложение Tuya.
После этого добавьте прокси-порт и хост ioBroker в качестве прокси-сервера «Вручную» для подключения к беспроводной локальной сети на мобильном телефоне.

Теперь откройте соответствующее приложение Tuya Smart и / или перезагрузите.

Конфигурация администратора покажет сообщение об успехе, если соответствующий пакет данных был получен, а затем отключит прокси через 10 секунд. Теперь вы можете удалить прокси с вашего телефона, а также не доверять сертификату.

Сразу после этого объекты должны обновляться с более значимыми именами и автоматически получать живые обновления с этого момента и должны иметь возможность общаться.

Синхронизация необходима только сначала или после добавления новых устройств в приложение.

Некоторые образы для некоторых мобильных ОС можно найти по адресу [Прокси-страницу](PROXY.md).

## Не для устройств с батарейным питанием
Устройства с батарейным питанием обычно НЕ поддерживаются этим адаптером! Причина в том, что они не в сети все время, чтобы экономить энергию. Когда они получают сигнал, они выходят в интернет, отправляют обновление на облачные серверы Tuya и снова выходят в автономный режим. Они не излучают никаких пакетов UDP или находятся в сети достаточно долго, чтобы адаптер мог к ним подключиться.
Как только кто-то найдет способ напрямую получить данные из облака Tuya, это может измениться.

## Кредиты
Работа адаптера была бы невозможна без большой работы @codetheweb, @kueblc и @ NorthernMan54 (https://github.com/codetheweb/tuyapi) и https://github.com/clach04/python-tuya. и многое другое.

## Сделать
* улучшить тестирование: проверки состояния и setState
* улучшить документацию

## Changelog

### 3.1.1 (2019-11-23)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) New schemas added
* (Apollon77) Sentry added for error reporting
* (Apollon77) Compact Mode added

### 3.0.0 (2019-09-03)
* (Apollon77) Switch from AnyProxy to mitm ... hopefully get SSL-Proxy working again. Important: The Proxy is called "NodeMITMProxyCA"!

### 2.0.4 (2019-08-01)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.3 (2019-07-11)
* (Apollon77) New schemas added
* (Apollon77) removed a check so that also devices that use other message formats can be read

### 2.0.2 (2019-06-27)
* (Apollon77) New schemas added
* (Apollon77) Update all Dependencies
* (Apollon77) Nodejs 6.x no longer supported!
* (Apollon77) Support encrypted devices

### 1.0.8 (2019-03-08) [Unreleased]
* (Apollon77) New schemas added

### 1.0.7 (2018-11-23)
* (Apollon77) New schemas added, fixed one error

### 1.0.5 (2018-11-18)
* (Apollon77) preserve device name too, New schemas

### 1.0.4 (2018-11-16)
* (Apollon77) New schemas added

### 1.0.3
* (Apollon77) New schemas added

### 1.0.2
* (Apollon77) New schemas added
* (Apollon77) Data are requested from the device after controlling because sometimes not all data seems to be updated automatically

### 1.0.1
* (Apollon77) Automatically convert some value types like booleans better

### 1.0.0
* (Apollon77) Add several new schema definitions
* (Apollon77) Optimizations and bug fixes

### 0.1.3
* (Apollon77) Add several new schema definitions
* (Apollon77) Try to preserve names of objects. Sync with App via proxy will overwrite in any case!
* (Apollon77) Optimizations and bug fixes

### 0.1.2
* (BuZZy1337) Optimized Admin, thank you very much!

### 0.1.0/1
* (Apollon77) development and first tests

## License

The MIT License (MIT)

Copyright (c) 2018-2019 Apollon77 <iobroker@fischer-ka.de>

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