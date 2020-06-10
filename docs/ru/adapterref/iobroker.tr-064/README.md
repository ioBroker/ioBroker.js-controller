---
local: true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![логотип](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Информация
Этот адаптер считывает основную информацию из AVM Fritz! Box, например, список вызовов или количество сообщений на автоответчике.
На основании этого [AVM документация](https://avm.de/service/schnittstellen/)

### Простые состояния и функции
- включить / выключить Wi-Fi для 2,4 ГГц и 5 ГГц,
- включить / выключить гостевой Wi-Fi,
- перезагрузить Fritz! Box,
- запустить процесс WPS,
- переподключить интернет
- внешний IP-адрес

### Звонок (набрать номер)
- При использовании международного номера (например, ** 610) состояние звонка позволяет звонить на этот внутренний телефон.

например: ** 610 [, тайм-аут]

- При использовании внешнего номера состояние вызова соединит вас с внешним номером.

FritzBox позвонит по внешнему номеру, и ваш телефон по умолчанию будет звонить, когда вызываемый телефон будет снят.
Телефон по умолчанию можно настроить в FritsBox в разделе: Телефон / Анруфе / [Tab] Wahlhilfe / Wählhilfe verwenden

### ToPauseState
- Значения: кольцо, соединение, конец
- Может использоваться для приостановки видеоплеера при входящем звонке (звонок) или при снятии телефона (соединение).
- Резюме можно сделать по конечному значению.

### Присутствие
Вы можете настроить список устройств для прослушивания.
Может быть вызвано mDNS. При использовании MDNS опрос не требуется, и он быстрее

### AB - Anrufbeantworter (автоответчик)
Можно включить / выключить.
Состояние cbIndex может быть установлено по адресу # автоответчика.

### Вызов монитора
Callmonitor будет создавать состояния в реальном времени для каждого входящего и исходящего вызова.
Если телефонная книга включена (по умолчанию), номера будут преобразованы в Имена. Существует также состояние, указывающее звонящий телефон.

### Телефонная книга
- Телефонная книга, если она включена, будет использоваться для получения имени телефона вызывающего абонента.
- Далее есть три состояния для разрешения числа или имени. Если доступно, вы также получите URL-адрес изображения контакта.

  например: если вы установили телефонную книгу штата. Для всех трех состояний имя, номер и изображение будут установлены для найденного контакта. Обратите внимание, что поиск по имени сначала сравнивает полное имя, если оно не найдено, часть используется.

### Списки звонков
Выходные форматы:

- JSON
- HTML

Списки вызовов:

- все звонки
- пропущенные звонки
- входящие звонки
- исходящие звонки

Счетчик вызовов: счетчик вызовов может быть установлен на 0. Следующий вызов будет инициирован 1.

Вывод html может быть настроен с помощью шаблона

### Command & commandResult state
С помощью состояния команды вы можете вызывать каждую команду tr-064 из этого [документация](https://avm.de/service/schnittstellen/).
например

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Состояние команды должно быть установлено в JSON из указанных выше строк. Итак, {...} (без command = и разрывов строки) Обратный вызов вызова установит состояние commandResult.

### Включить монитор вызовов
Чтобы использовать функцию мониторинга вызовов, ее необходимо сначала включить в AVM Fritz! Box.
Для включения монитора вызовов наберите ```#96*5*``` и откроется порт TCP / IP 1012. Чтобы закрыть порт, наберите ```#96*4*```.

### Предварительные версии
Предварительные версии доступны на npm с тегом dev.
Вы не можете установить их из корневого каталога ioBroker с помощью:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog

### 4.0.7 (2020-06-09)
* (Apollon77) Fix Admin UI to allow setting poll Interval correctly again

### 4.0.4 (2020-06-05)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-D)
* (Apollon77) Make sure adapter do not crash when invalid parameter are provided (Sentry IOBROKER-TR-064-B)
* (Apollon77) https is not supported right now (Sentry IOBROKER-TR-064-E)

### 4.0.3 (2020-05-11)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-7)
* (Apollon77) Make sure adapter do not crash when providing a non string to "ring" state (Sentry IOBROKER-TR-064-8) 

### 4.0.1 (2020-04-23)
* (Apollon77) handle case where no Phone deflections are available (Sentry IOBROKER-TR-064-1/2)

### 4.0.0 (2020-04-12)
* (Apollon77) update dependencies, use auto decrypt features with js-controller 3.0
* (foxriver76) make callmonitor compatible with js-controller 3.0

### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

Copyright (c) 2015-2020 soef <soef@gmx.net>

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