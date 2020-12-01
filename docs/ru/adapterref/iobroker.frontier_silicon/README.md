---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: YH5cKUNTTU8K0wtF+CA6cM8T+v+DJa8Rhu+Xc6Pid3o=
---
![Логотип](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.svg)

![Версия NPM](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Количество установок (последнее)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![Статус зависимости](https://img.shields.io/david/halloamt/iobroker.frontier_silicon.svg)
![Известные уязвимости](https://snyk.io/test/github/halloamt/ioBroker.frontier_silicon/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)
![Статус сборки](https://travis-ci.org/halloamt/ioBroker.frontier_silicon.svg?branch=master)

# IoBroker.frontier_silicon
## Переходник frontier_silicon для ioBroker
Обеспечивает поддержку медиаплееров, оснащенных набором микросхем Frontier Silicon, с использованием FSAPI.

## Характеристики
Всегда приветствуются пиары и конструктивная критика.

### Реализованные функции
- Контроль мощности
- Выбор режима
- Выбор предустановок
- Уведомления для нескольких состояний
- Контроль громкости
- Уведомления

### Планируемые функции
- Автоматическое обнаружение
- Больше состояний
- Переводы
- Больше обработки исключений
- Код очистки
- Особенности нескольких комнат

### Незапланированные функции
- Изменение системной информации

### Известные ошибки
- Медиа-плеер должен быть включен для предустановленного обнаружения
- Нет уведомлений через некоторое время

## Документация
Этот адаптер позволяет управлять интернет-радио и медиаплеерами на базе чипсетов Frontier Silicon. Многие устройства, которыми можно управлять с помощью [Undok] (https://www.frontiersmart.com/undok) должен работать. Протестированные устройства поступают от [Revo] (https://revo.co.uk/de/products/), [Sangean] (https://www.sangean.eu/products/all_product.asp) и [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/), должны работать и другие.

После установки IP-адрес и PIN-код устройства необходимо ввести в диалоговом окне конфигурации. Если радио не воспроизводит DAB после включения через Undok или этот адаптер, попробуйте включить «DAB запускается без звука».

Когда адаптер запускается в первый раз, он собирает информацию об устройстве. Для этого нужно переключить все режимы. Во время проверки настроек устройство будет отключено на несколько секунд, чтобы избежать мешающих звуков.

Пока адаптер читает настройки устройства, создаются объекты и состояния. Состояния могут быть доступны только для чтения (`ro`) или для чтения-записи (`rw`) *хорошо, возможна только запись для кнопок*

- аудио

  Основные настройки звука. Элементы управления эквалайзером еще не реализованы.

  - maxVolume (`число, ro`)

    Максимальный выбор громкости

  - mute (`логическое, rw`)

    `true`, если на устройстве отключен звук, `false` в противном случае

  - объем (`number, rw`)
  - контроль
    - volumeDown и volumeUp

В- / или уменьшает громкость на 1

- устройство

  - friendlyName (`текст, rw`)
  - мощность (`boolean, rw`)
  - radioId (`test, ro`)

    Я предполагаю, что это MAC устройства

  - версия (`text, ro`)

    Версия ПО

  - webfsapi (`текст, ro`)

    Адрес API

- Информация

  - соединение (`boolean, ro`)

    Индикатор подключения адаптера

- средства массовой информации

  - состояние (`число, rw`)

    допустимые значения:

    - 0: пауза
    - 1: Играть

  - контроль

    - следующий
    - плаза
    - играть
    - предыдущий

  Не относитесь к следующим именам слишком серьезно. Радио по-разному использует их в разных режимах.

  - альбом (`text, ro`)
  - исполнитель (`text, ro`)
  - графика (`text, ro`)

    Используйте этот URL, чтобы получить обложку альбома или логотип станции.

  - имя (`текст, ро`)
  - текст (`text, ro`)
  - заголовок (`text, ro`)

- режимы

  - прочитатьПресеты

    Перечитывает все пресеты

  - selectPreset (`число, rw`)

    Используется для получения или выбора предустановки. Имейте в виду, что адаптер предполагает, что это значение не может быть прочитано из API.

  - выбрано (`number, rw`)

    Указывает или выбирает выбранный режим. Также можно выбрать с помощью `modes.{number}.switchTo`.

  - `{number}`

    - id (`текст, ro`)

      Название этого режима

    - клавиша (`number, ro`)

      Индекс этого режима. Равно `mode.{number}` из дерева объектов и может быть записан в `modes.selected`.

    - выбираемый (`boolean, ro`)

      `true`, если этот режим можно выбрать вручную.

    - потоковый (`boolean, ro`)

      Присутствует только на устройствах с несколькими комнатами. `true`, если этот режим может использоваться в качестве источника для нескольких многокомнатных устройств.

    - переключить на

      Выбирает этот режим.

    - пресеты

      - available (`логическое, ro`)

        Указывает, доступны ли предустановки для этого режима

      - `{number}`

        Индекс этой предустановки. Равно `mode.*.presets.{number}.key`.

        - ключ

          Индекс этой предустановки. Равно `mode.*.presets.{number}` из дерева объектов и может быть записан в `modes.selectPreset`.

        - имя (`текст, ро`)

          Название этой предустановки

        - переключить на

          Выбирает эту предустановку и соответствующий режим.

Имейте в виду, что иногда вы можете выбирать между «нажатием кнопки» или «установкой значения». Используйте то, что вам удобнее.

## Руководство разработчика
Этот раздел предназначен для разработчика. Его можно будет удалить позже

### Начиная
Вы почти закончили, осталось всего несколько шагов:

1. Создайте новый репозиторий на GitHub с именем `ioBroker.frontier_silicon`

1. Отправьте все файлы в репозиторий GitHub. Создатель уже настроил для вас локальный репозиторий:

	```bash
	git push origin master
	```

1. Добавьте новый секрет в https://github.com/halloamt/ioBroker.frontier_silicon/settings/secrets. Он должен называться AUTO_MERGE_TOKEN и содержать токен персонального доступа с принудительным доступом к репозиторию, например твой. Вы можете создать новый токен по адресу https://github.com/settings/tokens.

1. Перейдите на [main.js] (main.js) и начните программировать!

### Лучшие практики
Мы собрали несколько [лучшие практики](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) относительно разработки и программирования ioBroker в целом. Если вы новичок в ioBroker или Node.js, вам стоит их проверить. Если у вас уже есть опыт, вам также стоит взглянуть на них - вы можете узнать что-то новое :)

### Скрипты в `package.json`
Для вашего удобства предопределено несколько сценариев npm. Вы можете запустить их с помощью `npm run <scriptname>`.

| Имя скрипта | Описание |
| `test:js` | Выполняет тесты, определенные вами в файлах `*.test.js`. |
| `test:package` | Убедитесь, что ваши `package.json` и `io-package.json` действительны. |
| `test` | Выполняет минимальный тестовый запуск для файлов пакетов и ваших тестов. |
| `lint` | Запускает `ESLint` для проверки кода на наличие ошибок форматирования и потенциальных ошибок. |
| `lint` | Запускает `ESLint`, чтобы проверить ваш код на наличие ошибок форматирования и потенциальных ошибок. |

### Написание тестов
Когда все сделано правильно, тестирование кода бесценно, потому что оно дает вам уверенность в том, что вы можете изменить свой код, точно зная, когда и когда что-то сломается. Хорошее прочтение по теме разработки через тестирование: https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92.
Хотя написание тестов до кода поначалу может показаться странным, но у него есть очень явные плюсы.

Шаблон предоставляет вам базовые тесты для файлов запуска адаптера и пакетов.
Рекомендуется добавлять в микс свои собственные тесты.

### Публикация адаптера
Поскольку вы выбрали GitHub Actions в качестве службы CI, вы можете включить автоматические выпуски в npm всякий раз, когда вы нажимаете новый тег git, соответствующий форме `v<major>.<minor>.<patch>`. Необходимые шаги описаны в `.github/workflows/test-and-release.yml`.

Чтобы выпустить адаптер в ioBroker, обратитесь к документации [ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Протестируйте адаптер вручную при локальной установке ioBroker
Чтобы установить адаптер локально без публикации, рекомендуется выполнить следующие действия:

1. Создайте архив из вашего каталога разработчика:

	```bash
	npm pack
	```

1. Загрузите полученный файл на свой хост ioBroker.
1. Установите его локально (в Windows пути разные):

	```bash
	cd /opt/iobroker
	npm i /path/to/tarball.tgz
	```

Для более поздних обновлений описанная выше процедура не требуется. Просто сделайте следующее:

1. Замените измененные файлы в каталоге адаптера (`/ opt / iobroker / node_modules / iobroker.frontier_silicon`)
1. Выполните `iobroker upload frontier_silicon` на хосте ioBroker.

</details>

## Changelog
### 0.0.10 (2020-11-29)
* Übersetzungen

### 0.0.9
* (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.
* (halloamt) Nicer readme
* (halloamt) (Hopefully) more robust session handling.
* (halloamt) Long polling should work more reliably
* (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8
* (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6
* (halloamt) Nothing really, small stuff for npm

### 0.0.5
* (halloamt) Media state controls
* (halloamt) Bugfixes

### 0.0.4
* (halloamt) Media and volume control buttons
* (halloamt) Bugfixes

### 0.0.3
* (halloamt) Get notifications from the radio
* (halloamt) Change volume / mute

### 0.0.1
* (halloamt) initial release
* (halloamt) Change mode
* (halloamt) Select Preset

<details>
<summary>Developer Manual</summary>

## License
MIT License

Copyright (c) 2020 halloamt <iobroker@halloserv.de>

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