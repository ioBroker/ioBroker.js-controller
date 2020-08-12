---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: Адаптер ioBroker для настенного бокса KEBA KeContact
hash: NWcJNViFqmMdew0IG36iCau7nPWSHVmhinSCNL6COYc=
---
![Логотип адаптера](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![Количество установок](http://iobroker.live/badges/kecontact-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Travis](https://img.shields.io/travis/iobroker-community-adapters/ioBroker.kecontact.svg)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.kecontact.svg)

# IoBroker адаптер для настенного бокса KEBA KeContact
Предоставляет информацию о текущем состоянии настенного бокса KEBA KeContact, используя его протокол UDP.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес своего настенного бокса KEBA KeContact.
3. При необходимости отрегулируйте интервал обновления.
4. Сохраните конфигурацию.
5. Запустите адаптер.

## Конфигурация
### KeContact IP-адрес
Это IP-адрес вашего настенного бокса KEBA KeContact.

### Интервал обновления
Это интервал в секундах, в течение которого настенный ящик должен запрашивать новые значения.

Значение по умолчанию - 30 секунд, что является хорошим балансом между нагрузкой на KeConnect и наличием актуальной информации в ioBroker.

### Другие варианты
Вы также можете определить состояния для зарядки автомобиля с оптимизацией PV или ограничения макс. мощность основного питания.

## Legal
Этот проект не связан прямо или косвенно с компанией KEBA AG.

KeConnect - зарегистрированная торговая марка KEBA AG.

## Changelog
### 0.3.2 (2020-08-04)
* (Sneak-L8) in PV automatics mode wallbox will be disabled as long as no vehicle is plugged

### 0.3.1 (2020-07-23)
* (Sneak-L8) do not start charging when vehicle is plugged even if current is too low for photovoltaics automation

### 0.3.0 (2020-07-21)
* (Sneak-L8) regulate wallbox by PV automatics independant from state curr user

### 0.2.6 (2020-07-20)
* (Sneak-L8) try again to regulate wallbox by currtime instead of curr as suggested

### 0.2.3 (2020-05-24)
* (Sneak-L8) fix call to display PV automatics after vehicle is plugged, fix object in energy meter states

### 0.2.2 (2020-05-13)
* (Sneak-L8) display information about photovoltaics automatic also at begin of charging
* (Sneak-L8) delayed display of photovoltaics automatic when vehicle is plugged (8 sec)

### 0.2.1 (2019-11-14)
* (Sneak-L8) handle values of undefined in getStates
* (Sneak-L8) better recognition of max power function

### 0.2.0 (2019-02-05)
* (Sneak-L8) added automatic regulation by output photovoltaics unit
* (Sneak-L8) added possibility to limit wallbox to keep total power below a limit
* (Sneak-L8) added state to display text on wallbox

### 0.1.0 (2019-01-12)
* (Apollon77) Updated CI testing, update basic files

### 0.0.3 (2017-07-04)
* (UncleSamSwiss) Improved UDP datagram sending
* (UncleSamSwiss) Added all known writable states

### 0.0.2 (2017-06-25)
* (UncleSamSwiss) Improved UDP socket handling (thanks to ehome)
* (UncleSamSwiss) Added reading all known states

### 0.0.1 (2017-06-11)
* (UncleSamSwiss) Initial version

## License

Copyright 2020 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.