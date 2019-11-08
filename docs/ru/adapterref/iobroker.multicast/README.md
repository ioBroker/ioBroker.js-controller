---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.multicast/README.md
title: Multicast-APi адаптер для ioBroker
hash: c3cMlDxkT43iLtk4oAmyMCvXhCXzTRsP+0z0Y0td2TQ=
---
![Количество установок](http://iobroker.live/badges/iobroker.multicastsvg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.multicast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.multicast.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.multicast/badge.svg)
![NPM](https://nodei.co/npm/iobroker.multicast.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/iobroker-community-adapters/ioBroker.multicast/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/iobroker-community-adapters/ioBroker.multicast?branch=master&svg=true)

<h1>

<img  src="admin/multicast.png"  width="64"/> ioBroker.multicast

</ H1>

# Multicast-APi адаптер для ioBroker
Этот адаптер предоставляет API на основе протокола многоадресной связи для отправки и получения состояний на устройства с пользовательской микропрограммой.

Назначение этого адаптера было:

* предоставить альтернативу http post и MQTT protokoll
* Иметь единый доступный API на основе многоадресной связи и передачи данных в формате JSON
* Наличие адаптера без прикосновения для интеграции любого устройства Ethernet (например, платы на базе ESP eq Wemos D1 mini), например, интеллектуальных разъемов Vansware / Gosound или других пользовательских средств автоматизации сборки.

### Нулевое прикосновение?
APi построен таким образом, что не требует дополнительной настройки конечного пользователя, использующего в самом адаптере или используемом устройстве.
В случае использования передачи по Wi-Fi необходимо предоставить только учетные данные Wi-Fi (устройства на основе локальной сети будут обрабатываться полностью автоматически).
Это требует усилий разработчика двоичного файла для прошивки на соответствующем чипсете (например, на чипсетах на базе ESP).

Когда микропрограмма соответствует всем правилам APi (см. Далее ниже), связь обрабатывается следующим образом:

* Устройство отправляет значения состояния по многоадресной UDP
* Адаптер распознает это сообщение и проверяет наличие состояний для этого устройства в ioBroker.

#### Новое устройство
Из предыдущего сообщения адаптер указал, что устройство не найдено, будет обработана следующая процедура:

* ioBroker отправляет широковещательное сообщение для инициализации устройства
* Устройство отправляет все состояния и связанную структуру на ioBroker
* ioBroker создать новое устройство и все необходимые состояния
* Когда все состояния созданы, ioBroker отправляет рукопожатие на устройство, «готовое к приему данных».
* Устройство начинает отправку своих состояний через определенные промежутки времени или по изменениям (как запрограммировано разработчиком устройства).

#### Переподключение существующих устройств
Из предыдущего сообщения адаптер указал устройство уже существует, следующая процедура будет обработана:

* ioBroker проверяет, настроена ли конфигурация на «восстановление»
* Когда активировано восстановление, ioBroker отправляет все состояния (кроме информационных состояний) на устройство
* Когда все состояния получены, устройство de отправляет рукопожатие ioBroker "готов к приему данных"
* ioBroker подтверждает
* Устройство начинает отправку своих состояний через определенные промежутки времени или по изменениям (как запрограммировано разработчиком устройства).

#### Состояние меняется
Адаптер предназначен для повторной отправки до 5 раз, чтобы гарантировать, что все изменения состояния будут получены устройством. Эта процедура обрабатывается следующим образом:

* Состояние изменено в ioBroker
* Адаптер распознает изменение значения и отправит новое значение на устройство
* Устройство должно подтвердить сообщение в течение 500 мс
* Если сообщение не подтверждено, адаптер повторно отправит значение
* Это будет обработано максимум 5 попыток, после этого сообщение об ошибке будет указывать на потерю связи

### API структура и документация
{должно быть сделано / в процессе}

## To-Do запланировано:
* [x] Оптимизация повторных состояний, не стреляйте каждые 500 мс больше очередей
* [x] Отправка данных восстановления, если Harbeat получен и соединение с устройством ЛОЖНО
* [] Реализация состояний (возможность для списка значений)
* [] Реализация очередей, ожидание устройства через 20 мс после изменения состояния и отправка массива со всеми обновлениями состояния
* [] Реализовать значение expire с помощью API
* [x] Правильная обработка изменений имени хоста и имени хоста

## Changelog

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2019 Dutchman & Andiling

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