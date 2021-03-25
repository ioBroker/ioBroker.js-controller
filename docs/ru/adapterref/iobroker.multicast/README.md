---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.multicast/README.md
title: Адаптер Multicast-APi для ioBroker
hash: BMajt41V8iwGH+aqDL/L/f3MZJja6m62+jbpW80vWiM=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.multicast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.multicast.svg)
![Количество установок (последнее)](http://iobroker.live/badges/multicast-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/multicast-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/ioBroker.multicast.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.multicast/badge.svg)
![НПМ](https://nodei.co/npm/ioBroker.multicast.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/DrozmotiX/ioBroker.multicast/master.svg)

<h1>

<img  src="admin/multicast.png"  width="64" alt=""/>ioBroker.multicast

</h1>

# Адаптер Multicast-APi для ioBroker
Этот адаптер предоставляет API, основанный на протоколе многоадресной передачи, для отправки и получения состояний устройствам с настраиваемым микропрограммным обеспечением.

Назначение этого адаптера было:

* предоставить альтернативу http post и MQTT protokoll
* Иметь единый API, доступный на основе многоадресной передачи и передачи данных в формате JSON.
* Имейте адаптер с нулевым касанием для интеграции любого устройства Ethernet (пример: плата на базе ESP, например, Wemos D1 mini), например интеллектуальные разъемы Vansware / Gosound или другие средства автоматизации сборки на заказ.

### Нулевое касание?
APi построен таким образом, что не требует дополнительной настройки конечного пользователя, используемого в самом адаптере или используемом устройстве.
В случае использования перехода Wi-Fi необходимо предоставить только учетные данные Wi-Fi (устройства на базе локальной сети будут обрабатываться полностью автоматически).
Это требует усилий со стороны разработчика двоичного файла, который должен быть записан на соответствующий набор микросхем (например, наборы микросхем на основе ESP).

Когда прошивка следует всем правилам APi (см. Ниже), связь осуществляется следующим образом:

* Устройство отправляет значения состояния по многоадресной рассылке UDP
* Адаптер распознает это сообщение и проверяет, присутствуют ли состояния для этого устройства в ioBroker.

#### Новое устройство
Из предыдущего сообщения адаптер указал, что устройство не найдено, будет выполнена следующая процедура:

* ioBroker отправляет широковещательное сообщение для инициализации устройства
* Устройство отправляет все состояния и связанную структуру в ioBroker
* ioBroker создает новое устройство и все необходимые состояния
* Когда все состояния созданы, ioBroker отправляет рукопожатие устройству, «готовому к приему данных».
* Устройство начинает посылать свои состояния с интервалами или изменениями (в зависимости от конфигурации прошивки)

#### Повторное подключение существующих устройств
Из предыдущего сообщения адаптер указал, что устройство уже существует, будет обработана следующая процедура:

* ioBroker проверяет, установлена ли конфигурация на «восстановление»
* Когда восстановление активировано, ioBroker отправляет все состояния (кроме состояний информации) на устройство
* Когда все состояния получены, устройство de отправляет подтверждение ioBroker «готово к приему данных».
* ioBroker подтверждает
* Устройство начинает посылать свои состояния с интервалами или изменениями (в зависимости от конфигурации прошивки)

#### Изменения состояния
Адаптер рассчитан на отправку до 5 повторных попыток, чтобы все изменения состояния были получены устройством. Эта процедура выполняется следующим образом:

* Состояние изменено в ioBroker
* Адаптер распознает изменение значения и отправит новое значение на устройство.
* Устройство должно подтвердить сообщение в течение 500 мс.
* Если сообщение не подтверждается, адаптер повторно отправит значение
* Это будет обрабатываться максимум до 5 повторов, после этого сообщение об ошибке укажет на потерю связи.

### Структура APi и документация
{будет сделано / в процессе}

## Планируемые дела:
* [] Реализуйте очередь, подождите 20 мс после изменения состояния для устройства и отправьте массив со всеми обновлениями состояния
* [] Реализовать истечение срока действия через API
* [x] Оптимизация повторных попыток состояния, не запускайте каждые 500 мс очередей
* [x] Отправить данные для восстановления, если Harbert получен и соединение с устройством ЛОЖНО.
* [x] Состояния реализации (возможность для списка значений)
* [x] Правильная обработка имени хоста и изменений имени хоста

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.1.6 (2021-03-23)
* (DutchmanNL) Dependency updates

### 0.1.5
* (Dutchman & Andiling) Stable-Release candidate

### 0.1.4
* (DutchmanNL) Fix Device Name
* (DutchmanNL) improved way of handling info channel values compatible with old firmware

### 0.1.3
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.2
* (Dutchman) Optimise state retry, don't fire every 500ms more queuing
* (Dutchman) Correct handling of hostname and hostname changes

### 0.1.1
* (Dutchman) Send recovery data if Harbeat is received and connection to device is FALSE
* (Dutchman) Implement states (capability for value list)

### 0.1.0

* (Dutchman & Andiling) initial release

## License

MIT License

Copyright (c) 2021 Dutchman & Andiling

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