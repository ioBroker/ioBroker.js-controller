---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: 8uArILQcXoIm3R6vAKGn06Km8xh7PXGDGvSMF+SREe4=
---
![Logo](../../../en/adapterref/iobroker.onvif/admin/onvif_logo.png)

# IoBroker.onvif ===================
# RU
## Настройка
1. Открыть Настройки драйвера
2. Нажать кнопку сканирования (сверху справа)
3. Ввести необходимые настройки или оставить по умолчанию: startRange - начальный ip

End-Range - Port-Übersicht - Port-Liste - Port-Liste - Port-Liste - Port-Liste - Portierung - Port-Liste - Port-Liste - Portierung

4. Нажать START SCAN

Если все сделано правильно, в основном окне настроек появятся найденые камеры и через несколько секунд должны будут подтянуться снапшоты

## События
Драйвер автоматически подписывается на события к настроенным камерам.
События, которые генерирует камера, появятся в объектах вида:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

## Запрос снапшота
Для этого используется команда:

```
sendTo('onvif.0', command, message, callback);
```

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

=================

# ENG
## Anpassung
1. Öffnen Sie die Treibereinstellungen
2. Drücken Sie die Scantaste (oben rechts).
3. Geben Sie die erforderlichen Einstellungen ein oder übernehmen Sie die Standardeinstellung:

startRange - die Start-IP-Adresse des Scanbereichs, End Range - die End-IP-Adresse des Scanbereichs, Portliste - durch Kommas getrennte Ports des Onvif-Diensts (Standard: 80, 7575, 8000, 8080, 8081), Benutzername - Standard-Admin, Passwort - Standard-Admin

4. Drücken Sie START SCAN

Wenn alles korrekt gemacht wurde, werden die gefundenen Kameras in einem primären Fenster mit Einstellungen angezeigt und in wenigen Sekunden müssen Schnappschüsse geschärft werden.

## Veranstaltungen
Der Treiber abonniert automatisch Ereignisse für die konfigurierten Kameras.
Die von der Kamera generierten Ereignisse werden in den folgenden Objekten angezeigt:

```
onvif.0.192_168_1_4_80.message.tns1:RuleEngine/FieldDetector/ObjectsInside
onvif.0.192_168_1_4_80.message.tns1:VideoSource/MotionAlarm.State
```

## Schnappschussanfrage
Verwenden Sie dazu den Befehl:

```
sendTo('onvif.0', command, message, callback);
```

Beispiel für ein Skript zur Anforderung des Snapshots und zum Senden an Telegramm:

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

* caption * - steuert das Bild in Telegramm

Es ist möglich, sowohl bei einem Ereignis als auch gemäß der Schaltfläche / des Zeitplans zu veranlassen

## Changelog
### 0.0.2 (2018-11-20)
* (haba1234) add events and snapshot

### 0.0.1 (2018-02-20)
* (Kirov Ilya) intial commit

## License

The MIT License (MIT)

Copyright (c) 2018 Kirov Ilya <kirovilya@gmail.com>

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