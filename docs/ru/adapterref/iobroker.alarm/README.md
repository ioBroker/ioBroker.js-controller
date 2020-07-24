---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: HTGk4nS62rUA6r2P64RF+fNZf28kh3UB08Sw/nwlbp4=
---
![логотип](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Количество установок](http://iobroker.live/badges/alarm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Статус зависимости](https://img.shields.io/david/misanorot/iobroker.alarm.svg)
![Известные уязвимости](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/misanorot/ioBroker.alarm/master.svg)

# IoBroker.alarm
[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

**[Английское описание](https://github.com/misanorot/ioBroker.alarm/blob/master/lib/Readme_en.md)**

## IoBroker Alarm
Умирает в адаптере, с его помощью. Сигнализация.
Er bietet die Möglichkeit 3 Sicherheitskreise zu konfigurieren und diese z.B. Находится на территории De- und Aktivierung zu überwachen. Des Weiteren ist eine direkte Verknüpfung der jeweiligen Instanz «заявляет», auf anddere «заявляет» меглиц. Diese Verknüpfungen werden im Reiter Verknüpfungen angelegt.

-------------------------------------------------- -------------------------------------------------- ------------------ *Стенд 05.07.2020 ab Версия 0.8.0*

#### Wichtig ab 0.8.0
- Es empfiehlt sich bei Vorinstallationen <0.8.0, beim Update Обновление адаптеров для других устройств! Es haben sich ein paar Datenpunkte geändert.

### Tab Haupteinstellungen
В настоящее время в нем представлены Einstellungen wie die Zeiten der Nachtruhe, Sirenezeit, Stiller-Alarm и Passwort vorgenommen.

*Alle Zeiten sind в Sekunden einzugeben*

- Aktivierzeit -> Zeitverzögerung bis zu Aktivierung wenn man einen задержка Datenpunkt benutzt
- Sirenenzeit bei Einbruch -> Bei Einbruch wird der Datenpunkt alarm.0.status.siren für die Zeit auf true gesetzt
- Alarmverzögerung -> Verzögerungszeit bis Einbruch ausgelöst wird (большой вес) Zeit wird der Stille Alarm ausgelöst)
- Auslösezeit bei Warnungen / Sirene innen -> Bei Auslösung des Benachrichtigungskreises oder scharf innen Kreises, wird der jeweils zugehörige Datenpunkt für die Zeit auf true gesetzt

----------------------------------------------------------------------------------------------------------------------

### Tab Benachrichtigungen
Benachrichtigungen über Andere Adapter wie z.B. Телеграмма, электронная почта или андер.
[Probleme](#Probleme)

----------------------------------------------------------------------------------------------------------------------

### Tab Überwachung
Hier werden die Kreise der Anlage konfiguriert.
* умри, но не лассен сич андерн *

Der Alarmkreis hat die Priorität "hoch" and hat bei aktivierter Anlage (scharf) Vorrang vor allen andderen Keisen. Er dient zur eigentlichen Überwachung der Anlage. Умирает в полном объеме. В настоящее время он принимает участие в международном конкурсе молодых людей, а также в международном масштабе.
* Es ist durchaus möglich, dassman für einen State, den Haken bei allen drei Kreisen macht. *

Die Kreise werden folgendermaßen überwacht:

#### Alarmkreis:
Alarmanlage lässt sich nicht aktivieren (scharf schalten) wenn ein konfigurierter State aktiv ist. Bei aktivierter Alarmanlage führt eine Veränderung sofort zur Auslösung der Anlage.

#### Шарф интерн Крейс:
Все конфигюриртены констатируют werden beim Zustand scharf intern überwacht und lösen unter anderem den internen Alarm aus.

#### Meldekreis:
Der überwacht die konfigurierten заявляет, что умирает.

----------------------------------------------------------------------------------------------------------------------

### Tab Sprachausgabe
Ist eine gewünschte Sprachausgabe z.B. bei bei Änderung des Zustandes gewünscht, lässt sich das hier mit den gewünschten Sätzen konfigurieren.
* Man muss sich sicher sein, das der ausgewählte Datenpunkt, mit einem Text beschrieben werden kann! Z.B. "sayit.0.tts" *

Möchte man sich die Ausgabe von Namen mit Ansagen lassen, kann man diese Вариант anwählen.

----------------------------------------------------------------------------------------------------------------------

### Tab Verknüpfungen
Hier ist es möglich Адаптер международных государств, директива по внешним государствам, в целом. Somit is ein Umweg über ein Skript oder ähnlichen nicht erforderlich.
Es lässt sich somit z.B. Bei Beginn der Nachtruhe, Eine Veriegelung des Türschlosses realisieren.
![логотип](../../../en/adapterref/iobroker.alarm/admin/img/short.png)

#### Eingabeverknüpfungen
Триггер -> любой = вирд бей хедер Андерунг гетриггерт

Auslösewert -> Ist der Wert, auf welchen getriggert werden soll

----------------------------------------------------------------------------------------------------------------------

Der Adapter liefet eine ganze Anzahl заявляет:

#### "alarm.x.use .....".
Das sind die eigentlichen заявляет, что um die Alarmanlage zu bedienen.

- use.activate_nightrest -> Активирунг дер Нахтруэ
- use.activate_sharp_inside_circuit -> Aktivierung der Uberwachung des Warnkreises (intern scharf)
- use.disable -> Deaktivierung der Anlage (Alarmkreis)
- use.enable -> Aktivierung der Anlage (Alarmkreis)
- use.enable_with_delay -> Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.list -> Deaktivierung / Aktivierung / Warnkreis / Aktivierung mit Verzögerungszeit
- use.quit_changes -> Rücksetzen der states *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed*
- use.toggle_password -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Passwort
- use.toggle_with_delay -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Verzögerungszeit
- use.toggle_with_delay_and_password -> Deaktivierung / Aktivierung der Anlage (Alarmkreis) mit Passwort und Verzögerungszeit
- use.panic -> Händische Auslösung der Alarmanlage (Einbruch), в настоящее время не работает

#### "alarm.x.status ...."
Hier lässte sich der Zustand der Anlage смог.

- status.sleep -> Signalisiert den Zustand der automatischen Nachtruhe

#### "alarm.x.info ...."
Liefert zusätzliche Informationen wie z.B. Welche "Türen offen sind" oder einen Лог государства.
Der log_today State Wird Um Mitternacht Geleert.

----------------------------------------------------------------------------------------------------------------------

## Проблема
- мужская телеграмма телеграмм ünliches über das + hinzufügt, kann man nur ein state der Instanz auswählen und man muss bis auf *telegram.0* alles löschen.

#### Wichtig, die Benutzung dieses.

## Changelog

#### 1.2.0 (09.07.2020)
* (misanorot) added countdown speech output

#### 1.1.0 (05.07.2020)
* (misanorot) Added input shortcuts

#### 1.0.0 (01.07.2020)
* (misanorot) added alarm and silent flash light

#### 0.9.0 (28.06.2020)
* (misanorot) Homekit integrated, set shortcuts only when changed

#### 0.8.0 (18.06.2020)
#### (misanorot) !!! Changed circuits dramatacly !!! Please do a new installation when you come from less versions

#### 0.7.5 (14.06.2020)
* (misanorot) fixed a few little issues

#### 0.7.0 (07.06.2020)
* (misanorot) edit notification sentences in admin

#### 0.6.0 (31.05.2020)
* (misanorot) changed speech output

#### 0.5.0 (14.05.2020)
* (misanorot) added use.list state

#### 0.4.0 (14.05.2020)
* (misanorot) added warn circuit monitoring

#### 0.3.0 (04.05.2020)
* (misanorot) expaned speech output

#### 0.2.2 (30.04.2020)
* (misanorot) added alexa2 speak output

#### 0.2.0 (22.04.2020)
* (misanorot) added more states

#### 0.1.2 (19.04.2020)
* (misanorot) status.state  activated

#### 0.1.1 (28.03.2020)
* (misanorot) added states and lists - fixed issues - translation

#### 0.1.0 ()
* (misanorot) add password for de/activation -- better logging

#### 0.0.9 (19.02.2020)
* (misanorot) add sayit

#### 0.0.8 (03.02.2020)
* (misanorot) initial release

## License
MIT License

Copyright (c) 2019-2020 misanorot <audi16v@gmx.de>

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