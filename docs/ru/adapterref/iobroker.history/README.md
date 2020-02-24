---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: PtdWXDfO7iyz5LSlWyu5E++pME8W7qWuproQAaoXRFc=
---
![логотип](../../../en/adapterref/iobroker.history/admin/history.png)

![Количество установок](http://iobroker.live/badges/history-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.history.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.history.svg)
![тесты](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
Этот адаптер сохраняет историю состояний в два этапа.

## Конфигурация
* [Английское описание] (docs / en / README.md)
* [deutsche Beschreibung] (docs / de / README.md)

## 1.9.0 (2020-01-16)
* (foxriver76) убрал использование адаптера. объекты
* __requires js-controller> = 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) старые файлы должны быть удалены автоматически

### 1.8.6
* Исправлено несколько мелких проблем и оптимизированы некоторые тексты.

### 1.8.5 (2018-07-02)
* (Apollon77) Исправлена ошибка в storeState

### 1.8.4 (2018-06-24)
* (Apollon77) Исправление / позволяет отключить запись начальных и конечных значений

### 1.8.0 (2018-06-19 / 24)
* (Apollon77) Добавить опцию для записи данных в другой идентификатор, чтобы облегчить изменения устройства. Получение данных работает для обоих идентификаторов

### 1.7.4 (2018-04-03)
* (AlCalzone) Исправлена обработка имени файла для состояний со специальными символами

### 1.7.3 (2018-03-28)
* (Apollon77) Соблюдайте настройку «сохранить навсегда» для сохранения из конфигурации datapoint

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3 Исправления

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3 Исправления

### 1.7.0 (2018-01-17)
* (bluefox) готов для администратора3

### 1.6.6 (2017-12-20)
* (bluefox) переводы

### 1.6.5 (2017-10-05)
* (Apollon77) исправлено свойство значения журнала

### 1.6.4 (2017-08-12)
* (bluefox) добавить опцию «сохранить последнее значение»

### 1.6.3 (2017-08-03)
* (Apollon77) исправлено поведение журнала интервалов, чтобы всегда записывать текущее значение

### 1.6.2 (2017-04-07)
* исправить в преобразованиях типов данных

### 1.6.0 (2017-02-28)
* (Apollon77) Заменить некоторые символы в истории имен файлов

### 1.5.3 (2017-02-22)
* (Apollon77) Небольшое исправление для старых конфигураций

### 1.5.2
* (Apollon77) Улучшенная логика Min-Delta для точек данных из смешанного типа

### 1.5.1 (2017-01-16)
* (bluefox) Исправлена обработка значений с плавающей точкой в конфигурации адаптера и конфигурации Datapoint.

### 1.5.0 (2016-12-01)
* (Apollon77) Добавление сообщений enableHistory / disableHistory
* (Apollon77) добавить поддержку для регистрации изменений, только если значение отличается от минимального значения для чисел
* (Apollon77) Исправление расчета агрегата

### 1.4.0 (2016-10-29)
* (Apollon77) добавить опцию, чтобы повторно регистрировать неизмененные значения, чтобы упростить визуализацию
* (Apollon77) добавлены скрипты конвертера для перемещения данных истории в БД

### 1.3.1 (2016-09-25)
* (Apollon77) Исправлено: ts назначается как val
* (bluefox) Исправлен селектор для объектов истории

### 1.3.0 (2016-08-30)
* (bluefox) совместимо только с новым администратором

### 1.2.0 (2016-08-27)
* (bluefox) изменить имя объекта из истории на пользовательский

### 1.1.0 (2016-08-27)
* (bluefox) исправляет агрегацию последней точки
* (bluefox) агрегация - нет, просто доставляйте необработанные данные без агрегирования

### 1.0.5 (2016-07-24)
* (bluefox) исправляет агрегацию на больших интервалах

### 1.0.4 (2016-07-05)
* (bluefox) исправляет агрегацию по секундам

### 1.0.3 (2016-05-31)
* (bluefox) рисует линию до конца, если игнорирует ноль

### 1.0.2 (2016-05-29)
* (bluefox) переключают макс и мин между собой

### 1.0.1 (2016-05-28)
* (bluefox) рассчитывает конечные / начальные значения для "on change"

### 1.0.0 (2016-05-20)
* (bluefox) изменить имя агрегации по умолчанию

### 0.4.1 (2016-05-14)
* (bluefox) поддержка sessionId

### 0.4.0 (2016-05-05)
* (bluefox) использовать файл агрегации из адаптера SQL
* (bluefox) исправляет хранилище значений при выходе
* (bluefox) хранит все кэшированные данные каждые 5 минут
* (bluefox) поддержка MS

### 0.2.1 (2015-12-14)
* (bluefox) добавить описание настроек
* (bluefox) помещает агрегатную функцию в отдельный файл для обеспечения возможности обмена с другими адаптерами
* (Smiling-Jack) Добавить сгенерировать демонстрационные данные
* (улыбается Джек) получи историю в собственном форке
* (bluefox) добавить флаг storeAck
* (bluefox) макет для обмена

### 0.2.0 (2015-11-15)
* (Smiling_Jack) сохранять и загружать в адаптер, а не в js-контроллер
* (Smiling_Jack) агрегация точек данных
* (Smiling_Jack) поддержка пути к хранилищу

### 0.1.3 (2015-02-19)
* (bluefox) исправляет небольшую ошибку в истории (спасибо Dschaedl)
* (bluefox) обновить страницу администратора

### 0.1.2 (2015-01-20)
* (bluefox) включить кнопку сохранения и закрытия по конфигурации

### 0.1.1 (2015-01-10)
* (bluefox) проверка, если состояние не было удалено

### 0.1.0 (2015-01-02)
* (bluefox) включить установку npm

### 0.0.8 (2014-12-25)
* (bluefox) поддержка интервала de-bounce

### 0.0.7 (2014-11-01)
* (bluefox) хранит каждое изменение, а не только lc! = ts

### 0.0.6 (2014-10-19)
* (bluefox) добавить страницу конфигурации

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.