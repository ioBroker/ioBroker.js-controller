---
BADGE-Build Status: https://travis-ci.org/dkleber89/ioBroker.beckhoff.svg?branch=master
BADGE-Build status: https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true
BADGE-npm: https://img.shields.io/npm/v/iobroker.beckhoff.svg
BADGE-Number of Installations: http://iobroker.live/badges/beckhoff-installed.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.beckhoff/README.md
title: ioBroker.beckhoff
hash: nsTJDR3Hq3eUizABKih+ky7zMz59zxZXq/T8sT+JJLY=
---
![логотип](../../../de/adapterref/iobroker.beckhoff/img/beckhoff.png)

![Статус сборки](https://ci.appveyor.com/api/projects/status/tpqe657lqrir3kew/branch/master?svg=true)
![НПМ](https://img.shields.io/npm/v/iobroker.beckhoff.svg)
![Количество установок](http://iobroker.live/badges/beckhoff-installed.svg)

# IoBroker.beckhoff
Этот адаптер ioBroker осуществляет связь с контроллером Beckhof (Twincat 2 или 3) по протоколу ADS.
Протокол ADS реализован в каждом контроллере Beckhoff и может использоваться без лицензии.

Этот проект не связан с компанией Beckhoff

## Описание
### Требования
* Beckhoff с сетевым подключением, которое висит в сети, к которой может обратиться ioBroker
    * Контроллеру должен быть назначен фиксированный IP-адрес
    * Элемент управления должен быть pingable от ioBroker
  * TwinCat 2 **кроме элементов управления BC** или TwinCat 3

### Настройка управления
1. ADS должны быть активированы в проекте. Для этого перейдите в конфигурацию задачи в проекте управления и активируйте флажок «Генерировать символы». Затем загрузите конфигурацию на контроллер и перезапустите ее. Перезапуск необходим только при использовании TwinCat 2.

    ![создать символы](../../../de/adapterref/iobroker.beckhoff/img/createSymbols.png)

2. В контроллере должен быть создан статический маршрут. Маршрут должен соответствовать ioBroker (IP-адрес и AMS-Net-ID).

    Вот пример того, как это могло бы выглядеть, если бы маршрут был добавлен непосредственно к контроллеру. Маршрут также может быть добавлен через инженерный калькулятор.

    ![создать символы](../../../de/adapterref/iobroker.beckhoff/img/addRoute.png)

    Дополнительную информацию о маршрутизаторе TwinCat и системе управления в целом можно найти в [Beckhoff информационная система](https://infosys.beckhoff.com/ "Beckhoff Information System").

3. С TwinCat 2 в элементе управления должна быть создана другая структура. Затем добавьте структуру в таблицу глобальных переменных. Все необходимые переменные могут быть созданы здесь. Затем обмен данными осуществляется независимо ADS и адаптером.

    ##### Поддерживаемые типы данных: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, STRING (80)
    ДОПОЛНИТЕЛЬНО: Переменная может быть создана непосредственно в таблице переменных без вложения с точным именем -> ioBrokerResync (чувствителен к регистру и тип данных не имеет значения) -> Каждый раз, когда это значение изменяется, таблица переменных снова считывается в ioBroker.

3. При использовании TwinCat 3 в контроллере должна быть создана таблица глобальных переменных. Все необходимые переменные могут быть созданы здесь. Затем обмен данными осуществляется независимо ADS и адаптером.

    ##### Поддерживаемые типы данных: BOOL, BYTE, WORD, DWORD, SINT, USINT, INT, UINT, DINT, UDINT, REAL, STRING (80)
    ДОПОЛНИТЕЛЬНО: Переменная может быть создана непосредственно в таблице переменных без вложения с точным именем -> ioBrokerResync (чувствителен к регистру и тип данных не имеет значения) -> Каждый раз, когда это значение изменяется, таблица переменных снова считывается в ioBroker.

### Настройки адаптера
#### Twincat 3 и Twincat 2
1. Выберите версию во время выполнения
2. Введите IP-адрес назначения и идентификатор сети AMS.
3. С помощью TwinCat 2 введите имя экземпляра структуры из таблицы глобальных переменных.
4. Введите правильное имя таблицы переменных для TwinCat 3.
5. Остальные пункты обычно не нужно менять.

#### Twincat 2 <= v2.11.2240
Файл * .tpy из проекта PLC должен быть загружен. -> Всякий раз, когда что-то изменяется в структуре, отвечающей за связь с ioBroker, этот файл должен быть загружен снова.

### Обмен данными
- Как только переменная изменяется в контроллере, это значение автоматически переводится в соответствующее состояние в ioBroker.
- Если значение изменяется в ioBroker (важно: ACK должен быть ЛОЖНЫМ !!), оно автоматически передается в элемент управления. Если значение принимается контроллером, ACK устанавливается на TRUE.

### Важно
1. Маршрутизатор TwinCAT AMS не разрешает множественные TCP-соединения с одного хоста. Если два экземпляра настроены с одного хоста на один и тот же маршрутизатор TwinCat, маршрутизатор автоматически закрывает первое соединение и только самые новые ответы.
2. Адаптер автоматически синхронизирует все переменные в ioBroker. Существует несколько способов запуска повторной синхронизации:
    - Если значение переменной Resyc изменяется (см. [Здесь] (# конфигурация контроллера))
    - Если контроллер не находится в режиме RUN дольше, чем Интервал повторного подключения -> Тогда таблица переменных повторно синхронизируется при переходе контроллера в режим RUN.
    - Когда проект загружен на контроллер. Исключение -> OnlineChange
    - При перезапуске адаптера.
3. «Синхронизация» или «чтение» означает не обмен значениями переменных, а синхронизацию самих переменных и их создание или удаление в ioBroker.

## Changelog
### 1.2.0 (2020-01-02)

- (dkleber89) Add Support for Strings with fixed length to 80 Chars 

### 1.1.0 (2019-11-12)

- (dkleber89) Add Support for older TwinCat2 Systems with no autosync

### 1.0.7 (2019-10-25)

- (dkleber89) Add Support for Compact Mode -> JS Controller >= 2.0.0

### 1.0.6 (2019-08-11)

-   (dkleber89) Add check change of Datatype on resync

### 1.0.5 (2019-08-10)

-   (dkleber89) Eslint, Prettier with Airbnb Codestyle, CI adopted, little random changes in Project Structure

### 1.0.4 (2019-08-01)

-   (dkleber89) Increase depth of LOG details, Update dependency versions

### 1.0.2 (2019-05-18)

-   (Appollon77) Update testing for Node.js v12 in Appveyor und Travis

### 1.0.1 (2019-04-06)

-   (dkleber89) Random Bugfixes, Add some monitoring that States get correct Ack

### 1.0.0 (2019-03-23)

-   (dkleber 89) Stable Release, Update Gulp, add new Translations

### 0.3.0 (2019-03-09)

-   (Appollon77) Core Files/Testing Update and introduce adapter-core
-   (dkleber89) Fix Problem 'write after End'

### 0.2.2 (2019-02-11)

-   (dkleber89) DEBUG Version -> Still Problems with 'write after end'

### 0.2.1 (2018-12-30)

-   (dkleber89) Add IE 11 and Mobile Support

### 0.2.0 (2018-11-24)

-   (dkleber89) Code cleanup and second Beta Release

## License

The MIT License (MIT)

Copyright (c) 2018-2019 dkleber89 <dkleber89@gmail.com>

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