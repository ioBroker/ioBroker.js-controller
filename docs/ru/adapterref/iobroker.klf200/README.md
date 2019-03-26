---
BADGE-Number of Installations: http://iobroker.live/badges/klf200-stable.svg
BADGE-Travis CI: https://travis-ci.org/MiSchroe/ioBroker.klf200.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/t28nlps5c99jy5v7/branch/master?svg=true
BADGE-GitHub issues: https://img.shields.io/github/issues/MiSchroe/ioBroker.klf200.svg
BADGE-GitHub license: https://img.shields.io/github/license/MiSchroe/ioBroker.klf200.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.klf200.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.klf200.svg
BADGE-NPM: https://nodei.co/npm/iobroker.klf200.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.klf200/README.md
title: Документация к адаптеру KLF-200
hash: Ju0Pch23b2A9SxISJePGcq8iK7w8OF/BBWi9nSZbzys=
---
# Документация к адаптеру KLF-200
Этот адаптер используется для управления интерфейсом VELUX® KLF-200. Этот адаптер не является официальным продуктом VELUX и не поддерживается компанией, которой принадлежат продукты VELUX.

Основное назначение этого адаптера - управление электрическими окнами в крыше и / или электрическими жалюзи или ставнями.
Однако интерфейс KLF-200 может подключать другие устройства, такие как лампы, выключатели, жалюзи и т. Д.
Я не проектировал адаптер для использования с этими устройствами. Таким образом, возможно, что эти устройства также могут управляться этим адаптером.

Адаптер использует внутренний REST API интерфейса KLF-200, и вам не нужно соединять входы и выходы, хотя все еще можно использовать их параллельно.

---

## Подготовьте свой интерфейс KLF-200
Чтобы использовать этот адаптер, вы должны настроить блок KLF-200 в режиме **интерфейса** Это не работает, если вы используете вашу коробку в качестве повторителя.

> Для подробного объяснения следующих задач, пожалуйста, прочитайте руководства, прилагаемые к коробке.
>> Предполагается, что вы успешно вошли в свой ящик в веб-браузере.

### Продукты
Любой продукт, которым вы хотите управлять с помощью этого адаптера, должен быть зарегистрирован на странице Мои продукты.
Вы можете зарегистрировать новые продукты либо

- Копировать с другого пульта
- Поиск товаров

Когда все ваши продукты зарегистрированы, вы должны увидеть список, подобный следующему:

![Снимок экрана "Мои продукты" интерфейса KLF-200](../../../de/adapterref/iobroker.klf200/img/ProductList.PNG)

### Настройка сцен
Чтобы записать сцену, нажмите кнопку

![Кнопка записи программы](../../../de/adapterref/iobroker.klf200/img/RecordProgramButton.PNG)

Откроется окно *подготовка программы* Теперь используйте пульт дистанционного управления, прилагаемый к вашему продукту, чтобы что-то изменить, например, откройте окно до 40%. Затем введите имя для программы и нажмите *Сохранить программу*

![Скриншот записи в процессе](../../../de/adapterref/iobroker.klf200/img/RecordingInProgress.PNG)

> СОВЕТ:> - Назовите вашу программу по продукту и уровню открытия, например, окно ванной 40%. Однако адаптер не использует соглашения об именах.
> - Если ваше окно закрыто, начните со 100% открытия и продолжайте вниз с каждой дополнительной программой, пока не достигнете 0%.
> - У вас есть максимум 32 программы, которые вы можете сохранить в ящике, поэтому планируйте количество шагов, так как нет реальной разницы между 30% или 40% открытого окна.

Когда вы закончите запись программ, вы получите такой список:

![Скриншот списка программ](../../../de/adapterref/iobroker.klf200/img/ProgramList.PNG)

### Установить связи
Этот последний шаг не является обязательным. Если вы не используете линии ввода и вывода, вы, возможно, заметили, что маленький светодиод на коробке постоянно мигает. Чтобы избавиться от надоедливой перепрошивки, нужно настроить хотя бы одно соединение.

Вы просто должны установить его в коробке, вам не нужно ничего подключать! Просто выбери что-нибудь.

---

## Настройте адаптер
![Снимок экрана конфигурации адаптера](../../../de/adapterref/iobroker.klf200/img/AdapterConfiguration.PNG)

### Хост
Имя хоста вашего интерфейса KLF-200. Это тот же адрес, который вы вводите в адресной строке веб-браузера для подключения к вашему ящику.

### Пароль
Пароль, необходимый для подключения к интерфейсу KLF-200. Это то же самое, что вы используете при подключении в веб-браузере.

> Пароль по умолчанию для KLF-200 - `velux123`, но вы все равно должны были его изменить!

### Частота запросов в минутах
<span style="color: #ff0000"><strong><em>Эта опция запланирована на будущий выпуск. Если вы хотите перезагрузить конфигурацию, вы должны перезагрузить адаптер.</em></strong></span>

Количество минут, по истечении которых адаптер перезагружает конфигурацию из интерфейса KLF-200.

---

## Использование адаптера
После того, как адаптер прочитает метаданные из интерфейса KLF-200, вы найдете следующие состояния в дереве объектов:

Устройство | Канал | Государство | Тип данных | Описание --- | --- | --- | --- | --- продукты | | | | Имеет подстатью для каждого продукта в списке продуктов KLF-200.
продукты | | продуктыНайдено | значение | Количество товаров в списке. Только для чтения.
продукты | 0..n | категория | текст | Категория продукта. Только для чтения.
продукты | 0..n | уровень | уровень | Текущее состояние продукта Установите это значение для соответствующей сцены, которая будет выполнена. Читать / писать.
продукты | 0..n | scenesCount | значение | Количество сцен, в которых используется продукт. Только для чтения.
сцены | | | | Имеет подстатью для каждого продукта в списке продуктов KLF-200.
сцены | | scenesFound | значение | Количество сцен в списке. Только для чтения.
сцены | 0..n | productsCount | значение | Количество продуктов в этой сцене. Только для чтения.
сцены | 0..n | запустить | button.play | Указывает, работает ли сцена. Установите это значение для запуска сцены. Читать / писать.
сцены | 0..n | тихий | индикатор.silent | Указывает, работает ли сцена в тихом режиме (если поддерживается продуктами в сцене). Только для чтения.

> **ВАЖНО:** >> Идентификаторы, используемые в каналах, - это идентификаторы, поступающие из интерфейса KLF-200. Если вы внесете изменения в список продуктов или список программ в вашем KLF-200, идентификаторы могут измениться.

Чтобы выполнить сцену, вы можете установить состояние `run` сцены на `true` или установить состояние `level` продукта на значение, соответствующее сцене, которая устанавливает продукт на этот уровень ,

### Пример
Предположим, что окно вашей ванной комнаты находится на канале `0`. У вас есть сцена на канале `10`, которая открывает окно ванной комнаты до 40%.

```javascript
// Variant 1: Open the bathroom window at 40% using the scenes run state:
setState('klf200.0.scenes.10.run', true);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
    3. klf200.0.products.0.level will be set to 40%.
*/

// Variant 2: Open the bathroom window at 40% using the products level state:
setState('klf200.0.products.0.level', 40);
/*
    The following will happen:
    1. Your window will start to move to 40% opening level.
    2. klf200.0.scenes.10.run will be set to true.
    3. After your window has stopped, klf200.0.scenes.10.run will be set to 'false' again.
*/

// What happens, if we don't have a scene for that level?
setState('klf200.0.products.0.level', 41);
/*
    The following will happen:
    1. Your window won't move at all!
    2. klf200.0.products.0.level will be reset to the previous value, e.g. 40
*/

```

---

## Известные ограничения
Адаптер управляет KLF-200 с помощью внутреннего REST API, который используется веб-интерфейсом устройства.
Хотя мы используем только подмножество API, существуют некоторые ограничения:

- Адаптер не может прочитать текущую степень открытия окна. Если вы управляете им с помощью пульта дистанционного управления или он закрывается из-за дождя, адаптер не узнает об этом и будет отображать последнее известное значение.
- Интерфейс KLF-200 ограничен максимум 32 сценами.
- Адаптер не знает, когда действие закончилось. Состояние остается верным в течение не менее 30 секунд.
- Не выполняйте сцены слишком быстро подряд. KLF-200 может сообщать об ошибках. (Вы можете найти ошибки в журнале.)

---

VELUX и логотип VELUX являются зарегистрированными товарными знаками VKR Holding A / S.

## Changelog

#### 0.9.5
* (Michael Schroeder) Bug fixes

#### 0.9.4
* (Michael Schroeder) Compatible to Admin 3, add documentation

#### 0.9.0
* (Michael Schroeder) Initial public beta release

#### 0.0.1
* (Michael Schroeder) Initial developer release

## License
The MIT License (MIT)

Copyright (c) 2018 Michael Schroeder <klf200@gmx.de>

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

------------------------------------------------------------------------------

VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.