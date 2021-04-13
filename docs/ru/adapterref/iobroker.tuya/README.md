---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tuya/README.md
title: ioBroker.tuya
hash: w5Wvp8cqmi7jYdq4nzNU5aCU6AKPwoCacnh/D6CUl1M=
---
![Логотип](../../../en/adapterref/iobroker.tuya/admin/tuya.png)

![Количество установок](http://iobroker.live/badges/tuya-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tuya.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tuya.svg)
![Трэвис-Си](http://img.shields.io/travis/Apollon77/ioBroker.tuya/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Apollon77/ioBroker.tuya?branch=master&svg=true)
![НПМ](https://nodei.co/npm/iobroker.tuya.png?downloads=true)

# IoBroker.tuya
** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

Адаптер ioBroker для подключения к нескольким небольшим и дешевым устройствам Wi-Fi, которые подключены к Tuya Cloud и в основном используют приложение Smartlife / Alexa-Skill. Адаптер поддерживает чтение обновлений статуса в реальном времени и управление этими устройствами после синхронизации с соответствующим приложением мобильного телефона.

Устройства Tuya - это умные устройства ESP8266MOD WiFi от Shenzhen Xenon.

Помимо устройств, которые можно использовать с приложением Smart Live, также должно быть возможно использование приложения Jinvoo Smart, приложения Xenon Smart, eFamilyCloud, io.e (Luminea или другого). Пожалуйста, сообщите в случае успеха. <img src="https://https://raw.githubusercontent.com/Apollon77/ioBroker.tuya/master/admin/warning.png" width="50" height="50"> **Адаптер работает только с Tuya и совместимыми приложениями, если их версия &lt;3.14 (!!)**

Доказано, что адаптер отлично работает со всеми устройствами, которые «всегда подключены к Wi-Fi». Устройства, которые подключаются к сети только при возникновении события, отправляют свои данные и снова переходят в автономный режим, не поддерживаются. Это означает, что **устройства с батарейным питанием обычно НЕ работают!**

Один экземпляр адаптера может обрабатывать все устройства в одной сети, которая маршрутизирует пакеты UDP.

## Совместимые мобильные приложения и версии
Текущие версии Tuya Smart, а также приложения Smartlife **больше не совместимы** с тем, как работает адаптер, потому что Tuya зашифровал весь трафик, который адаптер мог перехватить. На данный момент все еще работают некоторые старые версии приложений ...

* Приложение Smartlife <3.14, лучшее 3.12.6 !!
* Tuya Smart App <3.14, лучшее 3.12.x
* Приложение STL Smart Home 1.1.1 (последнее от сентября 2019 г.)
* Домашнее приложение Ucomen (??)

## Важная заметка
Если устройства неправильно обнаруживаются через их пакеты UDP, вы можете установить IP вручную, отредактировав объект устройства. см. https://github.com/Apollon77/ioBroker.tuya/issues/221#issuecomment-702392636

## Как работает адаптер
### Базовая функциональность
Адаптер отслеживает в локальной сети UDP-пакеты устройств Tuya (старая прошивка, поэтому только незашифрованные). Необходимо, чтобы хост ioBroker, на котором работает адаптер, находился в том же сегменте сети, что и устройства, и маршрутизатор должен поддерживать многоадресную рассылку UDP!

Все обнаруженные устройства добавляются к адаптеру, и в качестве основной функциональности адаптер запрашивает данные в заданном интервале опроса. Без синхронизации с соответствующим мобильным приложением (см. Ниже) НИКАКИЕ дополнительные функции, такие как обновления в реальном времени или управление, невозможны.

Новые зашифрованные устройства НЕ будут отображаться до того, как вы выполните синхронизацию устройства (см. Далее ...)

### Расширенные функции после синхронизации устройства
Чтобы получить полную функциональность адаптера, а также поддерживать устройства с новой зашифрованной прошивкой, адаптер должен знать ключ шифрования.

Самый простой способ получить этот ключ шифрования - получить его из используемого мобильного приложения. Для этого адаптер предоставляет прокси-сервер, который перехватывает связь приложения с серверами tuya и получает необходимую информацию.

** Важное примечание для пользователей iOS: ** Описанный здесь подход с использованием прокси больше не работает. Как только у вас установлено приложение Smart Life версии 3.10 или выше, прокси-сервер не видит сообщения из приложения. Но он по-прежнему работает со всеми версиями приложений Android, поэтому лучшим подходом является эмулятор Androis, как примерно описано на https://forum.iobroker.net/topic/23431/aufruf-tuya-adapter-tests-verschl%C3%BCsselte- ger% C3% A4te / 19

Для этого в первую очередь необходимо добавить на мобильное устройство собственный Root-сертификат.
Когда вы нажимаете «Запустить прокси» в конфигурации экземпляра адаптера, сертификат создается для вашей системы и показывает QR-код для места загрузки. В идеале отсканируйте QR-код своим мобильным устройством и следуйте инструкциям, чтобы добавить этот корневой сертификат и доверять ему.
Если местоположение QR-кода недоступно (может случиться при использовании Docker или подобного), откройте «Proxy Web Info Port» в своем браузере и нажмите «Root-CA» в навигации, и вы также можете загрузить файл CA.

Теперь не забудьте закрыть / убить соответствующее смарт-приложение Tuya.
После этого добавьте прокси-порт и хост ioBroker в качестве «ручного» прокси для вашего WLAN-соединения на вашем мобильном телефоне.

Теперь откройте соответствующее приложение Tuya Smart и / или перезагрузите.

Конфигурация администратора покажет сообщение об успешном завершении, если соответствующий пакет данных был получен, а затем через 10 секунд отключит прокси. Теперь вы можете удалить прокси со своего телефона, а также не доверять сертификату.

Сразу после этого объекты должны быть обновлены с более значимыми именами и с этого момента автоматически получать обновления в реальном времени и должны иметь возможность общаться.

Синхронизация требуется только на начальном этапе или после того, как вы добавили новые устройства в свое приложение.

Некоторые образы для некоторых мобильных ОС можно найти в [Прокси-страница](PROXY.md).

## Не для устройств с батарейным питанием
Устройства с батарейным питанием обычно НЕ поддерживаются этим адаптером! Причина в том, что они не всегда в сети для экономии энергии. Как только они получают сигнал, они выходят в сеть, отправляют обновление на облачные серверы Tuya и снова отключаются. Они не отправляют никаких пакетов UDP или находятся в сети достаточно долго, чтобы адаптер мог подключиться к ним.
Как только кто-то найдет способ напрямую получать данные из облака Tuya, это может измениться.

## Кредиты
Работа адаптера была бы невозможна без отличной работы @codetheweb, @kueblc и @ NorthernMan54 (https://github.com/codetheweb/tuyapi) и https://github.com/clach04/python-tuya. и многое другое.

## Делать
* улучшение тестирования: проверки состояния и setState's
* улучшить документацию

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого проблемы GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог "log" в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Changelog

### 3.6.1 (2021-04-11)
* (Apollon77) More schema information added

### 3.6.0 (2021-04-02)
* (Apollon77) Fix broken data updates because of tuyaapi change
* (Apollon77) Optimize "json unvalid" cases by refreshing data manually differently 
* (Apollon77) More schema information added

### 3.5.9 (2021-03-28)
* (Apollon77) More schema information added

### 3.5.8 (2021-03-24)
* (Apollon77) More schema information added

### 3.5.7 (2021-03-18)
* (Apollon77) Fix crash case (Sentry IOBROKER-TUYA-P9)
* (Apollon77) More schema information added

### 3.5.6 (2021-02-09)
* (Apollon77) More schema information added

### 3.5.4 (2021-01-30)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-TUYA-MG)
* (Apollon77) More schema information added

### 3.5.3 (2021-01-13)
* (Apollon77) More schema information added

### 3.5.2 (2020-12-24)
* (Apollon77) More schema information added

### 3.5.0 (2020-12-10)
* (Apollon77) More schema information added
* (Apollon77) Try to decode "raw" values via base64

### 3.4.3 (2020-11-29)
* (Apollon77) More schema information added

### 3.4.2 (2020-11-19)
* (Apollon77) More schema information added

### 3.4.1 (2020-11-05)
* (Apollon77) More schema information added
* (Apollon77) fix IP lookup via UDP

### 3.4.0 (2020-10-29)
* (Apollon77) update tuya-api library

### 3.3.15 (2020-10-29)
* (Apollon77) More schema information added

### 3.3.14 (2020-09-15)
* (Apollon77) More schema information added

### 3.3.12 (2020-08-26)
* (Apollon77) More schema information added
* (Apollon77) Crash case prevented (Sentry IOBROKER-TUYA-89)

### 3.3.11 (2020-08-18)
* (Apollon77) More schema information added

### 3.3.10 (2020-08-02)
* (Apollon77) More schema information added

### 3.3.9 (2020-07-16)
* (Apollon77) More schema information added

### 3.3.8 (2020-07-09)
* (Apollon77) Work around invalid data that are returned by some devices
* (Apollon77) More schema information added

### 3.3.7 (2020-07-01)
* (Apollon77) More schema information added

### 3.3.6 (2020-06-29)
* (Apollon77) More schema information added

### 3.3.5 (2020-06-11)
* (Apollon77) More schema information added
* (Apollon77) Optimizations and fixes

### 3.3.2 (2020-03-19)
* (Apollon77) Many new schemas added

### 3.2.3 (2020-03-08)
* (Apollon77) Many new schemas added

### 3.2.2 (2020-02-08)
* (Apollon77) New schemas added
* (Apollon77) Better handle strange case where qrcode library is not existing

### 3.2.0 (2020-02-05)
* (Apollon77) Many new schemas added
* (Apollon77) Add Infos about compatible App versions with link to enhanced docs
* (Apollon77) try to detect unsupported apps when trying to sync and write warning in logfile
* (Apollon77) Switch Sentry to iobroker own instance hosted in germany

### 3.1.16 (2019-12-26)
* (Apollon77) New schemas added
* (Apollon77) prevent crash when proxy request had no hosts array

### 3.1.15 (2019-12-24)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.14 (2019-12-20)
* (Apollon77) New schemas added
* (Apollon77) prevent usage of invalid Port numbers

### 3.1.13 (2019-12-11)
* (Apollon77) New schemas added

### 3.1.12 (2019-12-07)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.11 (2019-12-06)
* (Apollon77) New schemas added
* (Apollon77) Dependency update

### 3.1.10 (2019-12-05)
* (Apollon77) New schemas added

### 3.1.9 (2019-11-30)
* (Apollon77) New schemas added
* (Apollon77) Improve error handling for proxy web port

### 3.1.8 (2019-11-28)
* (Apollon77) New schemas added
* (Apollon77) Add check for invalid proxy port

### 3.1.7 (2019-11-26)
* (Apollon77) New schemas added

### 3.1.6 (2019-11-25)
* (Apollon77) New schemas added
* (Apollon77) Optimize Sentry integration and dedupe errors

### 3.1.4 (2019-11-24)
* (Apollon77) New schemas added

### 3.1.3 (2019-11-24)
* (Apollon77) try to get rid of SSL errors with new proxies
* (Apollon77) Many new schemas added
* (Apollon77) Sentry added for error/exception/schema reporting
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

Copyright (c) 2018-2020 Apollon77 <iobroker@fischer-ka.de>

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