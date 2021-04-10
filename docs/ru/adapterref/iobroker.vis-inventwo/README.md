---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-inventwo/README.md
title: ioBroker.vis-inventorywo
hash: EsnAj/k5t+GnG0yC3lbNfeptFavgrkT07OATg57YxkI=
---
![Логотип](../../../en/adapterref/iobroker.vis-inventwo/admin/inventwo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-inventwo.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-inventwo-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vis-inventwo-installed.svg)
![Статус зависимости](https://img.shields.io/david/inventwo/iobroker.vis-inventwo.svg)
![Известные уязвимости](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo/badge.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/2hvs4fvfms7xhmnw?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-green.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-inventwo.png?downloads=true)

# IoBroker.vis-inventorywo
## Виджеты Schalter для адаптера ioBroker.vis
###### .. ab v 2.0.0
<table><tr><td><center><b>Универсальный</b><br><img src="widgets/vis-inventwo/img/Universal.gif"></td><td><center> <b>Мульти</b><br><img src="widgets/vis-inventwo/img/Multi.gif"></td><td><center> <b>Изображение</b><br><img src="widgets/vis-inventwo/img/Image.png"></td><td><center> <b>Таблица</b> <br><img src="widgets/vis-inventwo/img/Table.png"></td></tr><tr><td colspan=4></td></tr><tr><td><center><b>Список</b><br><img src="widgets/vis-inventwo/img/List.png"></td><td><center> <b>Шатер</b><br><img src="widgets/vis-inventwo/img/Marquee.gif"></td><td><center> <b>Переключатель</b><br><img src="widgets/vis-inventwo/img/Radio.gif"></td><td><center> <b>Ползунок вертикальный</b> <br><img src="widgets/vis-inventwo/img/Slider2.gif"></td></tr><tr><td colspan=4></td></tr><tr><td><center> <b>Ползунок горизонтальный</b><br><img src="widgets/vis-inventwo/img/Slider1.gif"></td><td><center> <b>Colorslider горизонтальный</b><br><img src="widgets/vis-inventwo/img/ColorSliderHor.png"></td><td><center> <b>Colorslider горизонтальный</b><br><img src="widgets/vis-inventwo/img/ColorSliderVert.png"></td><td><center> <b>Переключить переключатель</b><br><img src="widgets/vis-inventwo/img/Toggle.gif"></td></tr></table>

###### .. v 1.3.8
![Beispiel](http://resources.inventwo.com/github/inventwo/Set.png)

Mit Hilfe unserer Widgets lassen sich folgende Projekte verwirklichen. Zur Zeit нашел свое место в Unserem Adapter NUR die reinen Schaltflächen (siehe oben) und die Icons. Uhr und Wetter stammen aus anderen Adaptern und müssen ggf. zusätzlich installiert werden.

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview.png)

![Beispiel](http://resources.inventwo.com/github/inventwo/Preview2.png)
---

## Unterstützung
Falls Dir unsere Arbeit gefällt und Du uns unterstützen möchtest, wir freuen uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zum ioBroker)

[![Sdency] (http://resources.inventwo.com/github/inventwo/spende.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

---

## 2.9.1
- Исправлена ошибка

## 2.9.0
- Мульти-виджет-статус отображается без изменений виджет-Тип nach Datenpunkten или Views prüfen
- Optionen zum automatischen Schließen des Popups hinzugefügt
- Исправление ошибок

## 2.8.3
- Исправлена ошибка

## 2.8.2
- Problem mit Colorslider behoben: Wert wird nicht in Datenpunkt gesetzt, wenn "Wert bei Freigabe aktualisieren" aktiviert ist ",

## 2.8.1
- Fehler behoben: Color Slider RGB актуально на Dp Änderung nicht (WICHTIG: Datenpunkte müssen neu ausgewählt werden!)

## 2.8.0
- Просмотр в PopUp Option для универсального и мульти-виджета hinzugefügt
- Исправлена ошибка

## 2.7.11
- Исправлена ошибка

## 2.7.10
- Problem mit Bildern im Universal und Multi Widget behoben
- Проблема с Bildwechesl im Universal и Multi Widget behoben

## 2.7.9
- Option für die Bildgröße für das Image-Widget hinzugefügt
- Fehler von vorheriger Version behoben

## 2.7.8
- Проблема с Textausrichtung behoben
- Problem mit Bildgröße im Image-Widget behoben

## 2.7.7
- Problem mit der Bildgröße behoben
- Problem mit dem Farbregler behoben, dass der Wert beim loslassen nicht gespeichert wurde

## 2.7.6
- Проблема с Symbolfarbe für Navi-Widget behoben
- Problem mit Hervorhebung auf Touch-Geräten behoben
- Проблема с Radiobutton-Widget и Datentyp Zahlen behobenn

## 2.7.5
- JSON Tabelle farbliche Schwellenwerte für Zahlen
- Fehler beim Slider behoben wenn ungültiger Wert im Datenpunkt steht
- Fehler behoben: Signalbilder wurden mit eingefärbt
- Вариант um Bildfarbe zu Invertieren eingefügt, um Farbfilter zu umgehen
- Цветной слайдер kann nun zwischen HEX, RGB und CIE unterscheiden

## 2.7.4
- Fehlende Übersetzung für Hover-Farben hinzugefügt

## 2.7.3
- Fehler beim Multi-State und mehreren Zuständen behoben
- Schatten und Rand Hover für Buttons hinzugefügt

## 2.7.2
- Фелер в Radiobutton mit Bildfarbe behoben
- Fehler behoben: Doppeltes klicken bei State mit Verweildauer
- Hovereffekt für Buttons eingefügt
- Problem mit anzeigen des Sliderwertss behoben
- Слайдер текста anhängen möglich

## 2.7.1
- Исправлена ошибка

## 2.7.0
- Новый виджет: Farbslider
- JSON Tabelle Spaltenformat boolean und number
- JSON Tabelle Kopfzeile kann fixiert werden
- JSON Tabelle Fehler beim sortieren behoben
- JSON Tabelle konfigurierbare Dummyzeile wenn JSON leer ist
- Фелер Бехобен

## 2.6.0
- Универсальный и мульти-виджет Vergleichsoperatoren gleich, größer, kleiner und nicht hinzugefügt
- Ползунок Min / Max инвертированный
- Слайдер Wert erst beim loslassen setzen
- Виджет um Wert zu erhöhen oder zu senken
- JSON Tabelle Fehler mit Datum behoben

. JSON Tabelle anzeige von Millisekunden möglich

- JSON Tabelle Platzhalter wenn Eintrag leer ist
- JSON Tabelle Spalten können per Klick sortiert werden

## 2.5.11
- Исправлена ошибка

## 2.5.10
- Исправлена ошибка

## 2.5.9
- Der Prozess der Bildfarbfilterung wurde geändert
- Die Bildfarbe kann jetzt ein Datenpunkt sein

## 2.5.8
- Исправлена ошибка

## 2.5.7
- Исправлена ошибка

## 2.5.6
- Исправлена ошибка

## 2.5.5
- Исправлена ошибка

## 2.5.4
- Исправление (состояние: doppeltes senden dese Wertes bei touch)

## 2.5.3
- Grauer Kippschalter hinzugefügt

## 2.5.2
- Исправлена ошибка

## 2.5.1
- Исправлена ошибка

## 2.5.0
- Kippschalter hinzugefügt
- Исправлена ошибка

## 2.4.3
- Исправлена ошибка

## 2.4.2
- Исправлена ошибка

## 2.4.1
- Исправлена ошибка

## 2.4.0
- Randstil zur JSON-Tabelle hinzugefügt
- Farbauswahö für Icons zu allen Widgets hinzugefügt
- Fehlerbehebung

## 2.3.2
- Fehler bei der Navigation mit dem Widget 'View in Widget' behoben

## 2.3.1
- Фелер в JSON Tabelle behoben

## 2.3.0
- Problem behoben, bei dem Schaltflächen zweimal Werte senden
- Datum / Uhrzeit und Bildformat für Tabellenzellen hinzugefügt
- Универсальный и мульти-виджет-атрибут, указанный в клике, на актуальном виджете

## 2.2.3
- Фелер в JSON Tabelle behoben

## 2.2.2
- Fehler im Multi Widget behoben: Bilder und Text wechseln nicht bei Typ Navigation

## 2.2.1
- Фелер в JSON Tabelle behoben, wenn kein gültiges JSON-Objekt vorhanden ist
- Fehler в Value-List behoben: Wert wird nicht aktualisiert

## 2.2.0
- Datenpunktwerte werden jetzt bei allen Widgets im Editor angezeigt
- Новый виджет: Marquee (Laufschrift)
- Универсальный и многосторонний Verweildauer hinzugefügt
- Виджет списка Abstand zwischen den Einträgen kann eingestell werden

## 2.1.0
- Datenpunktwerte werden im VIS Editor angezeigt!

## 2.0.1
- Übersetzungsfehler behoben
- Граница Farbe behoben
- Виджет-Untertitel behoben

## 2.0.0
- Переключатель, кнопка, навигация и фоновый виджет (sowie die kleinen Ausführungen) zu einem einzigen Widget zussammengeführt -> dem Universal Widget
- Multi Widget -> wie das Universal, nur dass hier auf mehrere Datenpunkte und Werte geprüft werden kann (Ähnlich der Signalbild Funktion)
- Виджет изображения kann nun auf Datenpunkt prüfen
- Радиокнопки hinzugefügt
- Werteliste hinzugefügt (Kann Liste aus einem Datenpunkt oder manuell eingetragenem Text erstellen)

## 1.3.8
- Шаг ползунка изменен на десятичный
- Исправлена проблема с числовыми значениями

### 1.3.7
- Исправлена проблема с навигацией по тачскринам.

### 1.3.6
- Добавлена опция установки состояния для навигации.
- Исправлена проблема с точками данных без конфигурации.

### 1.3.5
- Добавлена частота обновления таблицы

### 1.3.4
- Убраны значки и фоны, изменен конфиг, Исправлена навигация.

### 1.3.3
- Исправлена опция значения фонового виджета

### 1.3.2
- Исправлена ошибка

### 1.3.1
- Изменено поведение цвета кнопки навигации.
- Добавлены новые иконки

### 1.3.0
- Добавлена таблица JSON
- Добавлена задержка для навигации
- Текст в кнопках теперь может быть HTML
- Добавлены новые иконки

### 1.2.3
- Добавлен активный цвет навигации.
- Исправлен цвет состояния для переключателя значений

## 1.2.2
- Исправление ошибки: значение ползунка, конфигурация

## 1.2.1
- Исправлен виджет слайдера: разделен на два виджета (горизонтальный и вертикальный)

### 1.2.0
- Добавлен виджет изображений
- Добавлен ползунок для изменения радиуса границы для всех 4 углов (если эта версия является обновлением для вас, вам нужно нажимать каждую кнопку в редакторе vis, чтобы вернуть углы по умолчанию)
- Добавлены новые иконки

### 1.1.1
- Исправлена ошибка

### 1.1.0
- Добавлен виджет слайдера
- Добавлена возможность зеркального отображения
- Добавлены новые иконки
- Изменены виджеты кнопок для использования шрифта и текста по умолчанию.

### 1.0.0
- Фон виджета и непрозрачность содержимого, переключатель можно изменить с логического на значение, значки изменены с белого на черный, добавлены бесшовные фоны

### 0.1.2
- Исправление ошибок

...

### 0.1.1
- Исправление ошибок

...

### 0.1.0 (Erstveröffentlichung)
- Дизайн-виджеты inventorywo

...

### 0.0.1
- Die Idee ist geboren

---

## Changelog

## License

Urheberrechte (c) 2020 [jkvarel](https://github.com/jkvarel) und [skvarel](https://github.com/skvarel) von [inventwo](https://github.com/inventwo)


MIT License (nur in englisch / englisch only)

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

---

Icons from Icons8 https://icons8.com/