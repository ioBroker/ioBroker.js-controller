---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nina/README.md
title: ioBroker.nina
hash: odSTrZwJDkv0OJaiU4jx+IZgY6uZ0iDDEMDC7G9iFVA=
---
![Логотип](../../../en/adapterref/iobroker.nina/admin/nina.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.nina.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nina.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.nina.svg)
![Известные уязвимости](https://snyk.io/test/github/TA2k/ioBroker.nina/badge.svg)
![NPM](https://nodei.co/npm/iobroker.nina.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/TA2k/ioBroker.nina/master.svg)

# IoBroker.nina
## Адаптер nina для ioBroker
Notfall-Information- und Nachrichten-App

<https://www.bbk.bund.de/DE/NINA/Warn-App_NINA_node.html>

<https://warnung.bund.de/>

### Начиная
Die AGS разрабатывает Landkreises или kommasepariert mehrere AGS eingeben.

AGS (Amtlicher Gemeindeschlüssel) ermitteln: Über diese Seite kannst du den AGS für die gesuchte Stadt / Gemeinde ermitteln:

<https://www.statistikportal.de/de/gemeindeverzeichnis>

### Error Ошибка запроса {"errno": "EPROTO", "code": "EPROTO", "syscall": "write"}
Веб-сайт, посвященный альте Verschlüsselung для Debian Buster и RP4 muss folgende temporäre Änderung vorgenommen werden:

Änderungen in der /etc/ssl/openssl.cnf von:

[system_default_sect] MinProtocol = TLSv1.2 CipherString = DEFAULT @ SECLEVEL = 2

в: [system_default_sect] MinProtocol = TLSv1.2 CipherString = DEFAULT @ SECLEVEL = 1

## Changelog

### 0.0.24
- (thost96) fixed broken link in README
- (thost96) added icon with transparent background for admin ui
- (thost96) updated link on admin ui to the same as on this README as old link was broken

### 0.0.23

- (tomboxi) Convert all state changes to async.

### 0.0.22

- (tomboxi) Optionen zum Filtern und JSON Ausgabe hinzugefügt.

### 0.0.19

- (tomboxi) Auslastung reduziert. Objekte werden nur geändert wenn die Warnungen sich ändern.

### 0.0.17

- (tomboxi) Fehlerbehandlung verbessert. Option zum Deaktiveren der Area Objekte hinzugefügt.

### 0.0.13

- (tomboxi) Identifierliste hinzugefügt.

### 0.0.12

- (tomboxi) Fix Info connection, improve deleting, fix gzip problem.

### 0.0.8

- (tomboxi) Katwarn Warnungen hinzugefügt.

### 0.0.7

- (tomboxi) BiwApp Warnungen hinzugefügt.

### 0.0.6

- (tomboxi) NumberOfWarns werden nur geändert wenn eine Änderung vorliegt

### 0.0.5

- (tomboxi) Option für Beispielwarnung

### 0.0.4

- (tomboxi) Mehrere Warnungen werden jetzt korrekt angezeigt.

### 0.0.3

- (tomboxi) Unwetter und Hochwasserwarnungen hinzugefügt

### 0.0.1

- (tomboxi) initial release

## License

MIT License

Copyright (c) 2020 tomboxi <tombox_2020@gmail.com>

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