---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.echarts/README.md
title: ioBroker.echarts
hash: lgjbpu0vQLXd/XJmpkuioaqrA5OhyhBzRTn4gYi13o0=
---
![Logo](../../../en/adapterref/iobroker.echarts/admin/echarts.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.echarts.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.echarts.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ioBroker/iobroker.echarts.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/ioBroker/ioBroker.echarts/badge.svg)
![NPM](https://nodei.co/npm/iobroker.echarts.png?downloads=true)

# IoBroker.echarts
## Echarts Adapter für ioBroker
Erstellen Sie nützliche Diagramme in ioBroker:

![Bildschirmfoto](../../../en/adapterref/iobroker.echarts/img/screenshot1.png)

## Verwendung
Fügen Sie nach dem Neustart die Registerkarte im Admin hinzu: ![Administrator](../../../en/adapterref/iobroker.echarts/img/admin.png)

### Tooltip
Kleinbuchstaben `i` zeigen an, dass der Wert aus den 2 Nachbarwerten interpoliert wurde und zu diesem Zeitpunkt nicht vorhanden ist.

![Tooltipt](../../../en/adapterref/iobroker.echarts/img/tooltip.png)

### Serverseitiges Rendern
Sie können die Voreinstellungen auf dem Server rendern und als base64-URL abrufen oder in ioBroker DB auf der Festplatte speichern:

```
sendTo('echarts.0', {
    preset:   'echarts.0.myPreset', // the only mandatory attribute

    renderer: 'svg',                // svg | png | jpg | pdf, default: svg

    width: 1024,                    // default 1024
    height: 300,                    // default 300
    background: '#000000',          // Background color
    theme: 'light',                 // Theme type: 'light', 'dark'

    title: 'ioBroker Chart',        // Title of PDF document
    quality: 0.8,                   // quality of JPG
    compressionLevel: 3,            // Compression level of PNG
    filters: 8,                     // Filters of PNG (Bit combination https://github.com/Automattic/node-canvas/blob/master/types/index.d.ts#L10)

    fileOnDisk: '',                 // Path on disk to save the file.
    fileName: '',                   // Path in ioBroker DB to save the files on 'echarts.0'. E.g. if your set "chart.svg", so you can access your picture via http(s)://ip:8082/echarts.0/chart.png
}, result => {
    if (result.error) {
        console.error(result.error);
    } else {
        console.log(result.data);
    }
});
```

## Entwicklerhandbuch
Sie können Ansichtsdiagramme lokal debuggen mit:

- cd iobroker.echarts / src-chart
- npm run start
- Browser: http:// localhost: 8081 / adapter / echarts / tab.html? Dev = true

## Machen
- Widget für vis (Schaltfläche)
- Widget für Material
- Aufzählungssymbole in Ordnern oder in deren Nähe anzeigen
- Ziehen und Ablegen von Voreinstellungen zur Neuordnung

<! - Platzhalter für die nächste Version (am Zeilenanfang):

### __WORK IN PROGRESS__ ->

## Changelog
### 0.3.7 (2020-11-17)
* (bluefox) Hide nulls in hover details

### 0.3.6 (2020-11-13)
* (bluefox) The copy of charts is implemented

### 0.3.5 (2020-11-10)
* (bluefox) Corrected SENTRY errors

### 0.3.4 (2020-11-08)
* (bluefox) Corrected server-side rendering of PNG 

### 0.3.1 (2020-10-31)
* (bluefox) Added the color of export button 
* (bluefox) The interpolated values are shown now
* (bluefox) Server-side rendering is implemented

### 0.2.1 (2020-10-25)
* (bluefox) GUI fixes

### 0.2.0 (2020-10-22)
* (bluefox) Implemented the grouping by category.

### 0.1.2 (2020-10-21)
* (bluefox) Added support of multiple charts

### 0.1.1 (2020-10-21)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2020 bluefox <dogafox@gmail.com>

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