---
local: true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: gQb6+lw6ghlkjZdyw4RE6KoR3pbJ2ScyXASA/1CoXQ0=
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
- При использовании международного номера (например, ** 610) состояние вызова позволит звонить на этот внутренний телефон.

например: ** 610 [, тайм-аут]

- При использовании внешнего номера состояние вызова соединит вас с внешним номером.

FritzBox позвонит по внешнему номеру, и ваш телефон по умолчанию будет звонить, когда вызываемый телефон будет снят.
Телефон по умолчанию может быть настроен в FritsBox в: Телефон / Anrufe / [Tab] Wahlhilfe / Wählhilfe verwenden

### ToPauseState
- Значения: кольцо, соединение, конец
- Может использоваться для приостановки видеоплеера при входящем звонке (звонок) или при снятии трубки (соединение)
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

```javascript
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
### 0.4.18
* (soef) IP and MAC-address added to device object
### 0.4.17
* (soef) readme updated
### 0.4.16
* (soef) terminating adapter, if init fails, so that the adapter will be restarted",
### 0.4.15
* (soef) callmonitor: new toPauseState with extension
### 0.4.14
* (soef) Errorhandling of connecting to FritzBox extended
### 0.4.12
* (soef) Errorhandling of deflections fixed
### 0.4.11
* (Apollon77) Update utils.js and usage, CI Testing and deps
### 0.4.10 (2017-11-23)
* (soef) readme changelog extended
### 0.4.9
* (soef) fix tag error in io-package.json
### 0.4.8
* (soef) fix posible timeout on getting WLAN-Infos
### 0.4.6
* (soef) fix posible exception in deflections
### 0.4.5
* (apollon77) update basic package-file testing
### 0.4.4
* (soef) states of call forwarding will now be updated in the configured interval
### 0.4.3
* (soef) Call forwarding now configurable
### 0.4.2
* (soef) fixed exception in deflections
### 0.4.1
* (soef) fix changing forwarding state
### 0.4.0
* (soef) enable/disable call forwarding added
### 0.3.24
* (soef) States from the callmonitor are renewed, even if no change
### 0.3.23
* (soef) node 0.12 removed from testing
### 0.3.22
* (soef) Enhance CI testing
### 0.3.21
* (soef) using soef 0.4.6 to fix adapter load
### 0.3.20
* (soef) adapter type changed to media
### 0.3.19
* (soef) error message removed
### 0.3.18
* (soef) clear caller/callee before next call
### 0.3.17
* (soef) Only active will be shone in configuration
### 0.3.16
* (soef) Some extensions in onMessage discovery
### 0.3.15
* (soef) toPauseState added. Values: ring, connect, end
### 0.3.14
* (soef) callee name added
### 0.3.12 (2017-03-15)
* (bluefox) phone book for repeater excluded
* (bluefox) readme extended
### 0.3.11 (2017-03-07)
* (soef) external property adde to call list
### 0.3.10 (2017-03-07)
* (soef) Error message in configuration, if an older admin adapter is installed
### 0.3.7 (2017-03-06)
* (soef) Fixed imageurl for external phone book again. E.g. google
### 0.3.6 (2017-03-06)
* (soef) Fixed imageurl for external phone book. e.g. google
### 0.3.5 (2017-03-06)
* (soef) Json device list added
### 0.3.3 (2017-03-01)
* (soef) phonebook functions/states added
### 0.3.1 (2017-02-28)
* (soef) some bug fixes
* (soef) releasing call lists
### 0.3.0 (2017-02-25)
* (bluefox) use new table for configuration dialog

### 0.2.0 (2016)
* (soef) initial commit