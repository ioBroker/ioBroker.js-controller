---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eventlist/README.md
title: ioBroker.eventlist
hash: auofOnwss1vveKXRxK7rZmb4tpajlTLLVP7Mvgv5ULU=
---
![Логотип](../../../en/adapterref/iobroker.eventlist/admin/eventlist.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.eventlist.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eventlist.svg)
![Количество установок (последнее)](http://iobroker.live/badges/eventlist-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/eventlist-stable.svg)
![Статус зависимости](https://img.shields.io/david/bluefox/iobroker.eventlist.svg)
![Известные уязвимости](https://snyk.io/test/github/bluefox/ioBroker.eventlist/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.eventlist.png?downloads=true)

# IoBroker.eventlist
## Адаптер списка событий для ioBroker
Позволяет определить состояния, которые необходимо регистрировать в списке событий.

Список может быть отображен в админке, веб, vis, сохранен как PDF, материал (еще не реализован).

Кроме того, вы можете отправлять события через Telegram или WhatsApp.

![Список](../../../en/adapterref/iobroker.eventlist/img/list.png)

![PDF](../../../en/adapterref/iobroker.eventlist/img/pdf.png)

## Режим тревоги
События могли генерироваться только в режиме тревоги.
Режимом тревоги можно управлять с помощью переменной `eventlist.X.alarm`.

Кроме того, сообщения в мессенджеры могут быть отправлены, только если включен режим тревоги.

Пример использования:

- Например, датчик двери может отправлять сообщения, только если никого нет дома. В противном случае события об открытии дверей будут собираться только в списке событий.

## Возможные презентации
### В Admin как вкладка
Вы можете включить список событий на вкладке в админке.

### Интернет
Список событий может отображаться под `http://<IP>:8082/eventlist/index.html`.

### Виджет Vis
Список событий может отображаться как виджет vis.

### Создание PDF
Есть возможность сгенерировать PDF-документ со всеми событиями.

Заголовок документа может состоять из даты создания, если вы поместите в него шаблон: `Event list on {{YYYY MM DD}}`.
Точное описание формата времени можно найти здесь: https://momentjs.com/docs/#/displaying/format/

Создание PDF-файла может быть инициировано записью `true` в `eventlist.0.triggerPDF`.

Доступ к файлу PDF можно получить через:

- web: `http:// <IP>: 8082 / eventlist / eventlist / report.pdf`
- admin: `http:// <IP>: 8081 / files / eventlist / report.pdf`

** Значки не могли отображаться в PDF. **

## Сделать
- Множество предустановленных значков (минимум 100)
- Виджет материалов
- Отправлять сообщения в системный журнал (может быть splunk) https://www.npmjs.com/package/splunk-logging

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 0.2.5 (2020-09-24)
* (bluefox) Extended icon selector 
 
### 0.2.1 (2020-09-21)
* (bluefox) Vis-widget was corrected 

### 0.1.3 (2020-09-15)
* (bluefox) Implemented the alarm mode and messengers 

### 0.0.3 (2020-09-08)
* (bluefox) Objects with states are supported now 

### 0.0.2 (2020-09-07)
* (bluefox) initial commit

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

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