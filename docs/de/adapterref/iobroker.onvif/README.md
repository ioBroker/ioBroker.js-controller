---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: 0Sa3sSzmqayHNfgyBTbLkdyeSBK6oUU98CiU3akhXPY=
---
![Logo](../../../en/adapterref/iobroker.onvif/admin/onvif_logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.onvif.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/onvif-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/onvif-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Haba1234/iobroker.onvif.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Haba1234/ioBroker.onvif/badge.svg)
![NPM](https://nodei.co/npm/iobroker.onvif.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Haba1234/ioBroker.onvif/master.svg)

# IoBroker.onvif
## RU
### Настройка
1. Открыть Настройки драйвера
2. Нажать кнопку сканирования (сверху справа)
3. Ввести необходимые настройки или оставить по умолчанию: startRange - начальный ip адрес диапазона сканирова

End Range - конечный ip адрес диапазона сканирования, Port-Liste - через запятую порты сервиса onvif (по умолчанию: 80, 75,

4. ARTажать SCAN STARTEN

Если все сделано правильно, в основном окне настроек появятся найденые камеры и через несколько секунд должны будут подтянуться снапшоты

### События
Драйвер автоматически подписывается на события к настроенным камерам.
События, которые генерирует камера, появятся в объектах вида:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

### Запрос снапшота
Для этого используется команда: `sendTo('onvif.0', command, message, callback);`

Пример скрипта для запроса снапшота и отправка в телеграм:

```
const fs = require('fs');

function getSnapshot(caption){
    sendTo('onvif.0', 'saveFileSnapshot', {"id":"onvif.0.192_168_1_4_80", "file":"/opt/cameras/snapshot.jpg"}, (data) => {
        console.log('image принят: ' + data);
        if (data === "OK")
            sendTo('telegram.0', {text: '/opt/cameras/snapshot.jpg', caption: caption});
    });
}
```

* caption * - заголовок для картинки в телеграме.
Вызывать можно как по событию, так и по кнопке / рассписанию

## ENG
### Anpassung
1. Öffnen Sie die Treibereinstellungen
2. Drücken Sie die Scan-Taste (oben rechts).
3. Geben Sie die erforderlichen Einstellungen ein oder belassen Sie die Standardeinstellung:

startRange - die Start-IP-Adresse des Scanbereichs, End Range - die End-IP-Adresse des Scanbereichs, Portliste - durch Kommas getrennte Ports des Onvif-Dienstes (Standard: 80, 7575, 8000, 8080, 8081), Benutzername - Standardadministrator, Passwort - Standardadministrator

4. Drücken Sie START SCAN

Wenn alles korrekt gemacht wurde, werden die gefundenen Kameras in einem primären Einstellungsfenster angezeigt und in einigen Sekunden müssen die Schnappschüsse verschärft werden.

### Veranstaltungen
Der Treiber abonniert automatisch Ereignisse für die konfigurierten Kameras.
Die von der Kamera erzeugten Ereignisse werden in folgenden Objekten angezeigt:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

### Snapshot-Anfrage
Verwenden Sie dazu den Befehl: `sendTo('onvif.0', command, message, callback);`

Beispiel eines Skripts zur Anforderung des Schnappschusses und zum Senden an Telegramm:

```
const fs = require('fs');

function getSnapshot(caption){
    sendTo('onvif.0', 'saveFileSnapshot', {"id":"onvif.0.192_168_1_4_80", "file":"/opt/cameras/snapshot.jpg"}, (data) => {
        console.log('image принят: ' + data);
        if (data === "OK")
            sendTo('telegram.0', {text: '/opt/cameras/snapshot.jpg', caption: caption});
    });
}
```

* caption * - steuert das Bild im Telegramm an

Es ist möglich, sowohl bei einem Ereignis als auch gemäß der Schaltfläche / dem Zeitplan zu verursachen

## Changelog

### 0.0.3 (2020-04-03)
* (haba1234) bag fix and different little things
* (haba1234) compact mode
* (haba1234) deprecated 'request' is replaced by class 'http'
* (haba1234) 'onvif-snapshot' is replaced by class 'http'

### 0.0.2 (2018-11-20)
* (haba1234) add events and snapshot

### 0.0.1 (2018-02-20)
* (Kirov Ilya) intial commit

## License

The MIT License (MIT)

Copyright (c) 2018-2020 Haba1234 <b_roman@inbox.ru>