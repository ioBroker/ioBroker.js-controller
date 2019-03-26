---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kecontact/README.md
title: Адаптер ioBroker для настенной коробки KEBA KeContact
hash: KqCnXeT45sZPgAY9INjY2pZ5QG76wcl5EA5ClvlbrcE=
---
![Логотип адаптера](../../../en/adapterref/iobroker.kecontact/admin/charger.png)

![Количество установок](http://iobroker.live/badges/kecontact-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.kecontact.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kecontact.svg)
![Travis](https://img.shields.io/travis/UncleSamSwiss/ioBroker.kecontact.svg)
![AppVeyor Статус сборки](https://img.shields.io/appveyor/ci/UncleSamSwiss/iobroker-kecontact-fxdvr.svg)
![GitHub вопросы](https://img.shields.io/github/issues/UncleSamSwiss/ioBroker.kecontact.svg)

# IoBroker адаптер для настенной коробки KEBA KeContact
Предоставляет информацию о текущем состоянии KEBA KeContact Wallbox, используя его протокол UDP.

## Установить
Установите этот адаптер через ioBroker Admin:

1. Откройте диалоговое окно конфигурации экземпляра.
2. Введите IP-адрес вашего стенда KEBA KeContact
3. Настройте интервал обновления, если это необходимо
4. Сохраните конфигурацию
5. Запустите адаптер

## Конфигурация
### KeContact IP-адрес
Это IP-адрес вашей настенной коробки KEBA KeContact.

### Интервал обновления
Это интервал в секундах, с которым часто следует запрашивать у wallbox новые значения.

Значение по умолчанию составляет 30 секунд, что является хорошим балансом между нагрузкой для KeConnect и наличием актуальной информации в ioBroker.

## Legal
Этот проект не связан прямо или косвенно с компанией KEBA AG.

KeConnect является зарегистрированным товарным знаком KEBA AG.

## Changelog
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