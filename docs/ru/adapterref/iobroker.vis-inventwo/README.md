---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-inventwo/README.md
title: ioBroker.vis-inventorywo
hash: FX5sU81e4rfOhyxZWUYuGGm/GfoXT7pYQyzoRIvQAtQ=
---
![Логотип](../../../en/adapterref/iobroker.vis-inventwo/admin/inventwo.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-inventwo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-inventwo.svg)
![Количество установок (последнее)](http://iobroker.live/badges/vis-inventwo-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/vis-inventwo-stable.svg)
![Статус зависимости](https://img.shields.io/david/inventwo/iobroker.vis-inventwo.svg)
![Известные уязвимости](https://snyk.io/test/github/inventwo/iobroker.vis-inventwo/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-inventwo.png?downloads=true)

# IoBroker.vis-inventorywo
## Schalter Widgets для адаптера ioBroker.vis
ab v 2.0.0

![Beispiel](../../../en/adapterref/iobroker.vis-inventwo/admin/Set_new.png)

Версия 1.3.8

![Beispiel](../../../en/adapterref/iobroker.vis-inventwo/admin/Set.png)

Mit Hilfe unserer Widgets lassen sich folgende Projekte verwirklichen. Zur Zeit нашел свое место в Unserem Adapter NUR die reinen Schaltflächen (siehe oben) und die Icons. Uhr und Wetter stammen aus anderen Adaptern und müssen ggf. zusätzlich installiert werden.

![Beispiel](../../../en/adapterref/iobroker.vis-inventwo/admin/Preview.png)

![Beispiel](../../../en/adapterref/iobroker.vis-inventwo/admin/Preview2.png)
---

## Unterstützung
Falls Dir unsere Arbeit gefällt und Du uns unterstützen möchtest, wir freuen uns über jede Spende.

(Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zum ioBroker)

[![Подписка] (admin / spende.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GQPD3G25CKTEJ&source=url)

---

## 2.1.0
- Datenpunktwerte werden im VIS Editor angezeigt!

## 2.0.1
- Übersetzungsfehler behoben
- Граница Farbe behoben
- Виджет-Untertitel behoben

## 2.0.0
- Switch, Button, Nav and Background Widget (sowie die kleinen Ausführungen) zu einem einzigen Widget zussammengeführt -> dem Universal Widget
- Multi Widget -> wie das Universal, nur dass hier auf mehrere Datenpunkte und Werte geprüft werden kann (Ähnlich der Signalbild Funktion)
- Виджет изображения kann nun auf Datenpunkt prüfen
- Радиокнопки hinzugefügt
- Werteliste hinzugefügt (Kann Liste aus einem Datenpunkt oder manuell eingetragenem Text erstellen)

## 1.3.8
- Шаг ползунка изменен на десятичный
- Исправлена проблема с числовыми значениями

### 1.3.7
- Исправлена проблема с навигацией по тачскринам

### 1.3.6
- Добавлена опция установки состояния для навигации
- Исправлена проблема с точками данных без конфигурации.

### 1.3.5
- Добавлена частота обновления таблицы

### 1.3.4
- Удалены значки и фоны, изменен конфиг, Исправлена навигация.

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
- Добавлен ползунок для изменения радиуса границы для всех 4 углов (если эта версия является обновлением для вас, вам нужно щелкнуть каждую кнопку в редакторе vis, чтобы вернуть углы по умолчанию)
- Добавлены новые иконки

### 1.1.1
- Исправлена ошибка

### 1.1.0
- Добавлен виджет слайдера
- Добавлена возможность зеркального отображения
- Добавлены новые иконки
- Изменены виджеты кнопок для использования шрифта и текста по умолчанию.

### 1.0.0
- Фон виджета и прозрачность контента, переключатель можно изменить с логического на значение, значки изменены с белого на черный, добавлены бесшовные фоны

### 0.1.2
- Исправление ошибок

...

### 0.1.1
- Исправление ошибок

...

### 0.1.0 (Erstveröffentlichung)
- Виджеты дизайна inventorywo

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