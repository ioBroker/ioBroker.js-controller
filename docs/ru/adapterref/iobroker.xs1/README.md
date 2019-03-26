---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.xs1/README.md
title: ioBroker.xs1
hash: IeybNGgMEMa/IF18ankudZnwKWWL8wrsSWuzSaS5VS4=
---
![логотип](../../../en/adapterref/iobroker.xs1/admin/xs1.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.xs1.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.xs1.svg)
![Трэвис-CI](http://img.shields.io/travis/frankjoke/ioBroker.xs1/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/frankjoke/ioBroker.xs1?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.xs1.png?downloads=true)

# IoBroker.xs1
=================

## Адаптер ioBroker zu EZcontrol XS1 Der Adapter kommuniziert über die RestAPI des XS1 and hängt sich auch and das XS1 als listener um alle Änderungen смягчают и меняют iBroker weiterzuleiten.
Befehle vom ioBroker werden zuerst mit ack = false gesendet und wenn etwas vom Слушатель kommt dann passiert das mit ack = true. Man wei dann zumindest dass XS1 den Befehl gesendet hat.
Der Adapter scannt alle verfügbaren Sensoren (только для чтения) и Aktoren (чтение / запись) и verwendet die am XS1 vergebenen Namen.

Momentan werden keine Spezialinformationen wie Batterielevel.

Вы можете связаться с ним по телефону или по телефону. XS1 zugreifen kann.
Моментальные данные Passwort-Zugriff реализованы и реализованы в XS1 kein Passwort gesetzt sein!

  Für Sensoren welche im state eine 'Батарея разряжена' - Meldung anzeigen wird ein .LOWBAT-State erzeugt.

Die Copylist erlaubt direktes Gleichschalten zwischen Слушатель и Акторен.
Damit kann man Aktoren zusammenschalten welche ohne im ioБрокерские скрипы шрайбен цу мюссен.
Также Wenn Aktor A von XS! Ауф Эйн Гехт Вирд ау Актор Б (и С ..) Ауф Эйн Гешальтет.
Das ist sinnvoll wenn Aktoren verschiedene Systeme benutzen (Aktor A = FS20, B = AB400, C = HMS) и zusammen geschaltet werden sollen (Ein funksender von FS20 cann dann directct auch einen AB400 Funkstekdose schalten).

Синтаксис формы ist {"von_a": "auf_b (, auf_c, ...)", "von_b": "auf_c", ....} Отрицательный знак назначения, указанный как запятая, без запутанных ангелов.
Ein Beispiel von mir: {"UWPumpeT2": "UWPumpe", "UWPumpe": "UWPumpeT2", "Schalter1": "Licht1, Licht2"} Дамит Вирд дер Тастер (UWPumpeT2) с мужским взором в Рихтхюнгене ioBroker nur noch einen Aktor verwenden.
'Schalter1' würde 'Licht1' и 'Licht2' gleichzeitig mitschalten.

Für die neu hinzugefügte Watchdog-Funktion sollte im XS1 в действии Актуатор намен 'Сторожевой пес' kreiert werden.
Dieser wird jede Минутный удар и падение 4 Minuten lan dieser Umschaltvorgang nicht zurückgemeldet wird wird der Adapter neu gestartet.

## Wichtig!
* Der Adapter benötigt Node> = v4.3!
* Einen blinden (aber nicht virtuellen) Актуатор с демоном Namen 'Watchdog' erstellen.

## Changelog
### 1.0.2
* Added more sensors. All unknown types will use 'value' role. This can lead to problems if actual type is a boolean, but should work otherwise. As a result all sensors should be listed now.

### 1.0.0
* Update accepted device list and test for node v 8
* Tarvis updated to test right repository

### 0.5.2
* Update variables list and values from XS1 but change values only if they are different than in state not to create false state updates

### 0.5.1
* Adapter test auf Node 4.x und 6.x für Windows und Linux.
* Fehler beim ersten Einlesen von boolean states korrigiert.

### 0.5.0 
* LOWBAT für Sensoren mit Battery low state.
* Abhängigkeit von 'async' und 'request' entfernt, damit braucht xs1 keine zusätzlichen Module mehr.
* Watchdog mit XS1-Aktuator implementiert.
* Cleanup der states wenn sie nicht mehr verwendet werden (und z.B. vom XS1 gelöscht werden)

### 0.4.2
  Watchdog von 4 Minuten implementiert, wenn 4 Minuten kein Signal vom XS1 kommt wird Adapter gestoppt.
  jede Minute sendet der Adapter ein Signal an den Aktuator 'Watchdog' der dies bestätigen sollte.
  iobroker sollte den Adapter dann neu starten.
 
### 0.4.0
  Erster öffentliche Version, kann lesen und Aktuatoren schreiben (Befehle absetzten).
  TODO: Dokumentieren und Batteriestatus polling implementieren.

### 0.1.0
  Erster Test, Kann nur lesen und mithören

## License
The MIT License (MIT)

Copyright (c) 2016 Frank Joke

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