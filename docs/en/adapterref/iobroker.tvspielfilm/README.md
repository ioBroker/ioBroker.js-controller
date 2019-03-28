---
BADGE-Number of Installations: http://iobroker.live/badges/tvspielfilm-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tvspielfilm.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tvspielfilm.svg
BADGE-Open Issues: http://githubbadges.herokuapp.com/Pix---/ioBroker.tvspielfilm/issues.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tvspielfilm.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.tvspielfilm/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tvspielfilm?branch=master&svg=true
---
![Logo](../../admin/tvspielfilm.png)
# ioBroker.tvspielfim

[![NPM version](http://img.shields.io/npm/v/iobroker.tvspielfilm.svg)](https://www.npmjs.com/package/iobroker.tvspielfilm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tvspielfilm.svg)](https://www.npmjs.com/package/iobroker.tvspielfilm)
[![Open Issues](http://githubbadges.herokuapp.com/Pix---/ioBroker.tankerkoenig/issues.svg)](http://github.com/Pix---/ioBroker.tankerkoenig/issues)

[![NPM](https://nodei.co/npm/iobroker.tvspielfilm.png?downloads=true)](https://nodei.co/npm/iobroker.tvspielfilm/)

**Tests:** Linux/Mac: [![Travis-CI](http://img.shields.io/travis/Pix---/ioBroker.tvspielfilm/master.svg)](https://travis-ci.org/Pix---/ioBroker.tvspielfilm)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.tvspielfilm?branch=master&svg=true)](https://ci.appveyor.com/project/Pix---/ioBroker-tvspielfilm/)


## Description
This adapter delivers a german tv program guide. The content ist captured from two rss feeds from supplier [tvspielfilm.de](http://www.tvspielfilm.de/services/widgets/rss-feeds/rss-feeds-im-ueberblick,3538128,ApplicationArticle.html) stored in JSON objects ready to use in [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis)

## Configuration
### Whitelist
To display only a specific list of stations add the stations names to the whitelist. The blacklist will be skipped if the whitelist is not empty.
Wildcards "\*" (star) can shorten the whitelist: *\*RTL*, *RTL\** returns "*SuperRTL*" und "*RTL II*"

### Blacklist
TV channels that are not provided by your supplier or simply are not considered to be listed will be skipped. Therefore you can add them to the blacklist. The blacklist function is supported only when the whitelist is empty.

![alt text](img/tvspielfilmSettingScreenshot.jpg "Screenshot Settings")

## Schedule
The adapter starts every 5min to read the rss feeds "suggestions", "movie highlights", "today at 0815pm", "today at 10pm" and "now".

##  Datapoints

tvspielfilm.0.json.__filme__  (*JSON* Table for VIS Widget *json,table*)

tvspielfilm.0.json.__heute2015__  (*JSON* Table for VIS Widget *json,table*)

tvspielfilm.0.json.__heute2200__  (*JSON* Table for VIS Widget *json,table*)

tvspielfilm.0.json.__jetzt__  (*JSON* Table for VIS Widget *json,table*)

tvspielfilm.0.json.__tipps__  (*JSON* Table for VIS Widget *json,table*)


Example:
```
[{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107065571499_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/terra-x,107092073961.html\" target=\"_blank\">12:20 | ZDFneo | Terra X</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Andreas Kieling reist mit einem Expeditionsschiff 5000 Kilometer von Patagonien vorbei am imposanten Kap Hoorn zu den Falklandinseln, nach Südgeorgien bis ins Endlos-Weiß der Antarktis. Eindrucksvolle Tieraufnahmen der Polarwelt werden mit...</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107065571499_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107093989648_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/jadefieber-auf-der-jagd-nach-dem-gruenen-gold,107092362909.html\" target=\"_blank\">12:20 | ProSieben MAXX | Jadefieber - Auf der Jagd nach dem grünen Gold</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\"></td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107093989648_149.jpg\" />"},{"image":"","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/lemawork-ketema-keep-on-running,107092300316.html\" target=\"_blank\">12:15 | ServusTV Deutschland | Lemawork Ketema: Keep on Running</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Die bewegende Geschichte von Lemawork Ketema: Einst machte sich der Äthiopier auf, um sich seinen großen Traum von Freiheit zu erfüllen und professioneller Läufer zu werden. Der Film zeigt seine unglaubliche Reise, beginnend in seiner...</td></tr></table>","_Bild":"no image"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107026395465_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/das-survival-duo-zwei-maenner-ein-ziel,107092398076.html\" target=\"_blank\">12:15 | DMAX | Das Survival-Duo: Zwei Männer, ein Ziel</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">In den Everglades</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107026395465_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107006003923_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/auf-streife,107092345938.html\" target=\"_blank\">12:10 | SAT.1 | Auf Streife</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\"></td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107006003923_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092411755_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/der-hundeprofi,107092411752.html\" target=\"_blank\">12:10 | VOX | Der Hundeprofi</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Fall \"Henry\" und Fall \"Joel\"</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092411755_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107000234576_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/parker-lewis-der-coole-von-der-schule,107092411310.html\" target=\"_blank\">12:10 | RTL NITRO | Parker Lewis - Der Coole von der Schule</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Die Direktorin Grace Musso ist stolz darauf, dass es ihr gelungen ist, Brad Penny davon zu überzeugen, seinen Job als Maurer aufzugeben und wieder die Schulbank zu drücken. Als Parker dies erfährt, ist er alles andere als begeistert und...</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107000234576_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107027852048_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/presseclub,107092073732.html\" target=\"_blank\">12:03 | Das Erste | Presseclub</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\"></td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107027852048_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107017339715_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/dauerwerbesendung,107092440421.html\" target=\"_blank\">12:02 | TELE 5 | Dauerwerbesendung</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\"></td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107017339715_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107083991230_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/der-hundefluesterer,107092394564.html\" target=\"_blank\">12:00 | sixx | Der Hundeflüsterer</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Cesar hilft!</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107083991230_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092783545_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/kommissar-rex,107092269839.html\" target=\"_blank\">12:00 | SAT.1 Gold | Kommissar Rex</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\"></td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092783545_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/1000973730_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/die-kinder-meiner-braut,107092439012.html\" target=\"_blank\">12:00 | WDR | Die Kinder meiner Braut</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">TV-Schnulze um drei Waisen aus dem Sorgenland</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/1000973730_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107015317234_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/abgedreht,107093083776.html\" target=\"_blank\">11:55 | ARTE | Abgedreht!</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Tanzen!; Story: Ginger und Fred; Garderobe: Die Ballerina; Clip ab!: \"Chandelier\" - Sia; Star-System: Tanzend zum Erfolg; Ikone: \"West Side Story\"; Skandal!: Rudolf Nurejew flieht nach Westen</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107015317234_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092513712_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/zdf-fernsehgarten,107092086658.html\" target=\"_blank\">11:50 | ZDF | ZDF-Fernsehgarten</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Saisonstart und Jubiläum! Die Show feiert 30-jähriges Bestehen und startet regelmäßig 50 Minuten später.</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092513712_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107090540004_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/mein-lokal-dein-lokal-wo-schmeckts-am-besten,107092279744.html\" target=\"_blank\">11:50 | kabel eins | Mein Lokal, Dein Lokal - Wo schmeckt's am besten?</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">\"Salsarico\", Stralsund</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107090540004_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092283859_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/jonas-kaufmann-berlin-1930-das-konzert,107092234340.html\" target=\"_blank\">11:45 | 3sat | Jonas Kaufmann: Berlin 1930 - Das Konzert</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">'Dein ist mein ganzes Herz', 'Ein Lied geht um die Welt', 'Freunde, das Leben ist lebenswert' - Berlin war um 1930 Weltmetropole der Operette und des Tonfilms.\r\n \r\n Jonas Kaufmann gibt im legendären Funkhaus Berlin Nalepastraße ein Konzert mit den...</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092283859_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092419918_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/die-schnaeppchenhaeuser-jeder-cent-zaehlt,107092400167.html\" target=\"_blank\">11:40 | RTL II | Die Schnäppchenhäuser - Jeder Cent zählt</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Da das alte Zuhause zu teuer geworden ist, muss Mike (38) mit seiner Frau Monika (39) und den fünf Kindern umziehen. Die Großfamilie besitzt zudem auch noch 19 Tiere, sodass sie ein größeres Anwesen als neues Heim benötigen. Deshalb hat Mike...</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092419918_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/1018960513_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/stormbreaker,107093173752.html\" target=\"_blank\">10:50 | ProSieben | Stormbreaker</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">Teenie-Agentenaction.Teenager soll \"James Bond\" spielen.</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/1018960513_149.jpg\" />"},{"image":"<img width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092396992_149.jpg\" />","text":"<table class=\"tv_jetzt\"><tr><td class=\"tv_jetzt_text\" style=\"text-align: left; padding-left: 5px; font-weight: bold\"><a href=\"http://www.tvspielfilm.de/tv-programm/sendung/der-blaulicht-report,107092396989.html\" target=\"_blank\">07:25 | RTL | Der Blaulicht Report</a></td></tr><tr><td style=\"text-align: left; padding-left: 5px\">- Die Wiederholungen von Montag bis Freitag -</td></tr></table>","_Bild":"<img class=\"tv_jetzt_bild\" width=\"100%\" src=\"http://a2.tvspielfilm.de/itv/2016-05-08/107092396992_149.jpg\" />"}]
```


## CSS settings
For a nicer look the following CSS is suggested to be used to the VIS editor.

```
.tclass-th { /* Headerzeilen */
    background-color: darkgrey;
    background-color: rgba(100,100,100,0.8);
    color: white;
    font-weight: bold;
    font-family: Arial;
}

.tclass-th1 { /* linker Header */ 
    width: 20px;
    text-align: center;
    color: transparent; /* Text ausblenden */
    /* display: none; */ /* ganze Spalte ausblenden */
}

.tclass-th .tclass-th1 {
    display: none; /* Spaltenüberschrift überm Bild ausblenden*/
}

.tclass-tr {
    color: red;
}


.tclass-tr:nth-child(odd) {
    background-color: darkgreen;
    background-color: rgba(50,120,80,0.6);
}

.tclass-tr:nth-child(even) {
    color: yellow;
    background-color: darkred;
    background-color: rgba(150,150,150,0.2);
}

.tv_tipps, 
.tv_jetzt,
.tv_filme,
.tv_heute2015,
.tv_heute2200 {
    font-family: Arial;
    font-size: 75%;
}

.tv_tipps tr, 
.tv_jetzt tr,
.tv_filme tr,
.tv_heute2015 tr,
.tv_heute2200 tr {
    background-color: transparent;
    color: white;
}

.tv_tipps tr td a, 
.tv_jetzt tr td a,
.tv_filme tr td a,
.tv_heute2015 tr td a,
.tv_heute2200 tr td a {
    background-color: transparent;
    color: white;
    text-decoration: none;
}
/* JETZT ENHANCED */
.tv_jetzt tr td a {
    font-size: 130%;
}
```

![alt text](img/tvspielfilmVISScreenshot.jpg "Screenshot VIS widgets")

## VIS Widget
```
[{"tpl":"tplTableBody","data":{"visibility-cond":"==","visibility-val":1,"static_value":"","table_oid":"tvspielfilm.0.json.tipps","colCount":"2","colName1":"Vorschau","colWidth1":"30px","colName2":"Tagestipps","colAttr1":"","colWidth2":"60px","hide_header":false,"show_scroll":false,"new_on_top":true,"name":"JSON Tabelle TV Programm TIPPS","gestures-offsetX":0,"gestures-offsetY":0},"style":{"left":"44px","top":"30px","width":"357px","height":"auto","z-index":"25","color":"rgba(250,250,250,1)","text-align":"","font-family":"","background-color":"","border-style":""},"widgetSet":"basic"}]
```

## Roadmap
* Hide shows in the past
* Movie-Alarm: if show title is in alist, start alarm
* Wildcards for blacklist

## Changelog
### 1.0.4 (2017-10-17)
* (apollon77) Fehlerkorrekturen io-package.json

### 1.0.3 (2017-10-15)
* (pix) New documentation structure

### 1.0.2 (2017-10-12)
* (pix) No more support for Nodejs 0.12

### 1.0.1 (2017-05-08)
* (pix) Whitelist accepts wildcards

### 1.0.0 (2017-01-05)
* (pix) Travis CI and Appveyor implemented

### 0.2.2 (2016-05-12)
* (bluefox) save settings issue fixed
* (pix) blacklist & whitelist sort in alphabetical order

### 0.2.1 (2016-05-10)
* (pix) Log levels fixed

### 0.2.0 (2016-05-09)
* (pix) Whitelist

### 0.1.1 (2016-05-08)
* (pix) Channel renamed to 'json'

### 0.1.0 (2016-05-08)
* (pix) Blacklist function fixed
 
### 0.0.1 (2016-05-07)
* (pix) Adapter created

## License

The MIT License (MIT)

Copyright (c) 2016-2019 pix

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
*Logo is partly crafted by CHALLENGER* :+1: