---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sayit/README.md
title: ioBroker sayit adapter
hash: YGa+7pXYvlsP3g77L7+oVvhRap1ISB9PKQfchOw2rQw=
---
![Logo](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Anzahl der Installationen](http://iobroker.live/badges/sayit-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)
![NPM](https://nodei.co/npm/iobroker.sayit.png?downloads=true)

# IoBroker sayit adapter
SayIt Adapter kann Text in Sprache konvertieren und auf einem Gerät abspielen.

## Aufbau
Folgende Ausgaben werden unterstützt:

- *Browser* - Der Text wird vom Browser mit geöffneter iobroker.vis-Seite abgespielt. Es wird fast von jedem Desktop-Browser und von wenigen mobily Browsern unterstützt.

- *[Home24- MediaPlayer] (http://www.home-24.net/index.php?app=media)* - Der Text wird gesendet und auf dem Android-Gerät abgespielt, wenn der Home24-MediaPlayer installiert ist. Dafür wird in Android eine Text-to-Speech-Engine eingebaut. Der Port kann nicht geändert und auf 50000 eingestellt werden.

- *Home24 - MediaPlayer und [FTP-Server] (https://play.google.com/store/apps/details?id=lutey.FTPServer)* - Der Text wird auf dem Android-Gerät mit Home24 - MediaPlayer gesendet und wiedergegeben Eingerichtet. Dafür wird die Google Text to Speech Engine verwendet. Die erzeugte MP3-Datei wird über FTP auf ein Android-Gerät kopiert und mit dem Home24 - MediaPlayer abgespielt.

    Beide Apps müssen dieselben Basisverzeichnisse haben. (Z. B. Stammverzeichnis der "SD-Karte").

- *System* - Der Text wird vom Betriebssystem abgespielt, auf dem der ioBroker-Adapter ausgeführt wird. Folgende Betriebssysteme werden unterstützt: Windows, Linux, Mac OSx.

- *Windows-Engine* - Der Text wird von Fenstern abgespielt, auf denen der sayIt-Adapter ausgeführt wird. Hierfür wird Windows Text to Speech Engine verwendet, die vom Benutzer vorkonfiguriert werden sollte. Sie können [hier] (http://windows.microsoft.com/de-de/windows/setting-speech-options#1TC=windows-7) nachlesen, wie Sie es einrichten.

- *Sonos* - Text auf dem Sonosgerät abspielen. Stellen Sie sicher, dass der Web Adapter aktiviert ist. Es ist erforderlich, damit SONOS die erzeugten MP3-Dateien lesen kann.

- *Chromecast* - Wiedergabe von Text auf einem Chromecast-Gerät.

- *MPD* - Text auf dem Music Player Daemon abspielen. Verwenden Sie nur **http** für den Webadapter, verwenden Sie kein https.

Um den Text auf RaspberryPI oder einem Linux-System zu sprechen, rufen Sie einmal den Befehl ```sudo apt-get -y install mpg321``` auf, um mpg321 zu installieren.

Die mp3 / wav-Dateien können abgespielt werden, indem der Name in das Objekt geschrieben wird. (z. B. "/vis.0/main/img/door-bell.mp3")

Die Datei muss zuerst geladen werden.

### TTS-Motoren
online:

- Google: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch
- Yandex: Russisch

Um Yandex-Stimmen verwenden zu können, müssen Sie den API-Schlüssel hier anfordern: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Dieser Dienst wird am 1. Januar 2019 deaktiviert und durch Yandex.cloud ersetzt.] Um Yandex.cloud zu verwenden, sollten Sie sich hier registrieren: [https://cloud.yandex.ru/], SpeechKIT-API in der Cloud installieren und Auth-Token anfordern und Ordner-ID wie in den API-Anweisungen beschrieben.

- Ivona: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch, Dansk, Walisisch, Isländisch, Niederländisch, Polnisch, Portugiesisch, Rumänisch, Schwedisch, Türkisch

        Um Amazon (Ivona) -Stimmen verwenden zu können, benötigen Sie einen Zugangsschlüssel und einen geheimen Schlüssel (§§LLLLL0).

- Wolke:

        Um Cloud-Voices verwenden zu können, benötigen Sie einen konfigurierten Cloud-Adapter. (Kann deaktiviert werden, muss aber konfiguriert sein). Dieser Dienst verwendet AWS Polly und kann direkt verwendet werden.

- Amazon Web Services Polly:

        Um AWS Polly-Stimmen verwenden zu können, müssen Sie einen Zugriffsschlüssel und einen geheimen Schlüssel erstellen ([hier] (https://console.aws.amazon.com/iam/home). Die Amazon-Dokumentation finden Sie [hier](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)).

offline:

- PicoTTS (nur Linux): Englisch, Deutsch, Italienisch, Spanisch, Französisch

Für PicoTTS müssen die folgenden Pakete installiert werden: libttspico-utils und lame.
Installationsbefehl: 'sudo apt-get install libttspico-utils lame'

### Cloud- und Amazon Web Services-Textformatierung
Sie können Ihren Text mit [Sprachsynthese-Auszeichnungssprache](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) formatieren.

Nützliche Funktionen:

- `` `<break time =" 3s "/>` `- Machen Sie eine Pause für x Sekunden (max. 10 Sekunden).
- `` <Hervorhebungen> groß </ emphasis> `` `- Betonen Sie ein Wort.
- `` `<prosody volume =" + 6dB "rate =" 90% "> Ich spreche hier </ prosody>` `` - Parameter für Geschwindigkeit und Lautstärke.
- `` `<say-as interpret-as =" digits "> 12345 </ say-as>` `` - Sagen Sie jede Ziffer einzeln.

Mehr [Info](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Systembefehl
Wenn Sie ein Programm haben, das Audiodateien lokal oder anderswo abspielen kann, können Sie diesen Befehl hier schreiben. Z.B.

```myCustomPlayer --option```

Wenn die Ausgabe von **System** ausgewählt ist, führt der sayit-Adapter den folgenden Befehl auf dem lokalen System aus:

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

Wenn der Dateiname irgendwo in der Mitte bleiben muss, können Sie mit *%s* angeben, wo der Dateiname platziert werden muss:

```myCustomPlayer --option "%s" > /dev/null```

sayIt wird daraus ```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null``` machen.

## Verwendungszweck
Der SayIt-Adapter kann nicht alleine verwendet werden. Es muss vom Javascript-Adapter oder von "vis" mit einem bestimmten Widget gesteuert werden.
Nach der Erstellung der Adapterinstanz kann folgende Objekte gefunden werden:

- sayit.N.tts.text: Phrase, die gesprochen werden soll.
- sayit.N.tts.volume: Volume, das beim Abspielen der Phrase verwendet wird.
- sayit.N.tts.playing: true, wenn der Text gerade abgespielt wird, und false, wenn nicht. Wird nur für den Wiedergabemodus "Windows" und "System" unterstützt.
- sayit.N.tts.cachetext: Die Phrase muss zwischengespeichert werden und kann dann ohne Internet verwendet werden.

   Z.B. Sie können hier manuell "Kein Internet" eingeben. Wenn Ping an google.com negativ ist, schreiben Sie "Kein Internet" in "Tts.text" und es wird ausgesprochen. Natürlich muss der Cache aktiviert sein.

Der Status **tts.text** unterstützt eine erweiterte Syntax, sodass Sprache / Engine und Volume zusammen mit Text definiert werden können. Es wird verwendet, um mehrsprachige text2speech-Engines zu aktivieren.
Z.B. Wenn der Adapter über die Engine "Google-english" verfügt, ist es mit dem Satz ```de:Sag es``` möglich, die Google-Deustch-Sprach-Engine zu verwenden.

Mit ```ru;75;Погода хорошая``` können wir zwingen, russische Sprache und Volumen zu 75% zu verwenden.

Sie können die Lautstärke der Ansage in Prozent von der aktuellen oder angegebenen Lautstärke (nicht von maximal) angeben. Z.B. Wenn der Befehl ```de;75;Gutes Wetter``` ist und "Ansage volume" 50% ist, wird die Ansage mit einer Lautstärke von 38% von 100% möglich gespielt.

Der Systembefehl zum Abspielen der MP3-Datei kann ebenfalls angegeben werden. Wenn Sie das Feld leer lassen, werden die Standardeinstellungen verwendet: Windows - cmdmp3.exe, OSX - / usr / bin / afplay, Linux - mpg321 oder omxplayer (empfohlen).

Um omxplayer zu installieren, schreiben Sie ```sudo apt-get install omxplayer``` oder schreiben Sie ```sudo apt-get install mpg321```, um mpg321 zu installieren.

** Hinweis: ** Die Standardauswahl für Ankündigungen ist erst nach dem Start der Instanz möglich.

### Prioritäten
Um den Text trotz der eingereihten Texte sofort auszusprechen, haben Sie zwei Möglichkeiten:

- Platz "!" als erstes Zeichen im Text, so wird dieser Text sofort nach dem aktuellen ausgesprochen.
- Schreiben Sie true in den Status "tts.clearQueue", und die Warteschlange wird gelöscht. Danach können Sie einen neuen Text in "tts.text" schreiben, aber alle in der Warteschlange befindlichen Texte werden verworfen.

### Motoren
Folgende Werte für Motoren sind möglich:

#### Google
- **de** - Englisch
- **de** - Deutsch
- **pl** - Polski
- **ru** - Русский
- **uk** - український
- **it** - Italiano
- **es** - Espaniol
- **fr** - Français

#### Yandex
- **ru_YA: Yandex** - Русский
- **ru_YA_CLOUD: Yandex Cloud** - Русский [Die Yandex.Cloud-API generiert Dateien im OGG-Format. Um ogg-Dateien auf Linux abzuspielen, muss mplayer als System-Player installiert und ausgewählt sein.]

#### Amazon polly via Cloud
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - English - Marlene
- **de-DE_CLOUD_Male** - Deutsch - Hans
- **de-US_CLOUD_Female** - de-US - Weiblich - Salli
- **de-US_CLOUD_Male** - de-US - Männlich - Joey
- **da-DK_CLOUD_Female** - da-DK - Weiblich - Naja
- **da-DK_CLOUD_Male** - da-DK - männlich - Mads
- **en-AU_CLOUD_Female** - de-AU - weiblich - Nicole
- **de-AU_CLOUD_Male** - de-AU - Männlich - Russell
- **de-GB_CLOUD_Female_Amy** - de-DE - Weiblich - Amy
- **de-GB_CLOUD_Male** - de-DE - Männlich - Brian
- **de-GB_CLOUD_Female_Emma** - de-DE - Weiblich - Emma
- **en-GB-WLS_CLOUD_Female** - de-GB-WLS - Weiblich - Gwyneth
- **de-DE-WLS_CLOUD_Male** - de-DE-WLS - Männlich - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB_CLOUD_Male** - cy-GB - Männlich - Geraint
- **de-IN_CLOUD_Female** - de-IN - Weiblich - Raveena
- **de-US_CLOUD_Male_Chipmunk** - de-DE - Männlich - Chipmunk
- **de-US_CLOUD_Male_Eric** - de-US - Männlich - Eric
- **de-US_CLOUD_Female_Ivy** - de-US - Weiblich - Efeu
- **de-US_CLOUD_Female_Jennifer** - de-US - Weiblich - Jennifer
- **de-US_CLOUD_Male_Justin** - de-US - Männlich - Justin
- **de-US_CLOUD_Female_Kendra** - de-US - Weiblich - Kendra
- **de-US_CLOUD_Female_Kimberly** - de-US - Weiblich - Kimberly
- **es-ES_CLOUD_Female** - es-ES - Weiblich - Conchita
- **es-ES_CLOUD_Male** - es-ES - Männlich - Enrique
- **es-US_CLOUD_Female** - es-US - weiblich - Penelope
- **es-US_CLOUD_Male** - es-US - Männlich - Miguel
- **fr-CA_CLOUD_Female** - fr-CA - weiblich - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - Weiblich - Celine
- **fr-FR_CLOUD_Male** - fr-FR - Männlich - Mathieu
- **is-IS_CLOUD_Female** - is-IS - weiblich - Dora
- **is-IS_CLOUD_Male** - is-IS - männlich - Karl
- **it-IT_CLOUD_Female** - it-IT - weiblich - Carla
- **it-IT_CLOUD_Male** - it-IT - männlich - Giorgio
- **nb-NO_CLOUD_Female** - nb-NO - weiblich - Liv
- **nl-NL_CLOUD_Female** - nl-NL - weiblich - Lotte
- **nl-NL_CLOUD_Male** - nl-NL - Männlich - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - Weiblich - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - Männlich - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - Weiblich - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - Männlich - Jan
- **pl-PL_CLOUD_Female** - pl-PL - Weiblich - Maja
- **pt-BR_CLOUD_Female** - pt-BR - Weiblich - Vitoria
- **pt-BR_CLOUD_Male** - pt-BR - Männlich - Ricardo
- **pt-PT_CLOUD_Male** - pt-PT - Männlich - Cristiano
- **pt-PT_CLOUD_Female** - pt-PT - weiblich - Ines
- **ro-RO_CLOUD_Female** - ro-RO - weiblich - Carmen
- **sv-SE_CLOUD_Female** - sv-SE - weiblich - Astrid
- **tr-TR_CLOUD_Female** - tr-TR - weiblich - Filiz

#### Pico TTS
- **en-US** - Englisch US
- **en-GB** - Englisch GB
- **de-DE** - Deutsch
- **it-IT** - Italiano
- **es-ES** - Espaniol
- **fr-FR** - Français

#### Amazon polly direkt
- **(ru-RU_AP_Female)** - Русский - Татьяна
- **(ru-RU_AP_Male)** - Русский - Максим
- **(de-DE_AP_Female)** - Deutsch - Marlene
- **(de-DE_AP_Female_Vicki)** - Deutsch - Vicki
- **(de-DE_AP_Male)** - Deutsch - Hans
- **(de-US_AP_Female)** - de-US - Weiblich - Salli
- **(de-US_AP_Male)** - en-US - Männlich - Joey
- **(da-DK_AP_Female)** - da-DK - weiblich - Naja
- **(da-DK_AP_Male)** - da-DK - männlich - Mads
- **(de-AU_AP_Female)** - de-AU - weiblich - Nicole
- **(de-AU_AP_Male)** - de-AU - männlich - Russell
- **(de-GB_AP_Female_Amy)** - de-DE - Weiblich - Amy
- **(de-GB_AP_Male)** - de-DE - Männlich - Brian
- **(de-GB_AP_Female_Emma)** - de-DE - Weiblich - Emma
- **(de-GB-WLS_AP_Female)** - de-GB-WLS - Weiblich - Gwyneth
- **(de-GB-WLS_AP_Male)** - de-GB-WLS - Männlich - Geraint
- **(cy-GB_AP_Female)** - cy-GB - weiblich - Gwyneth
- **(cy-GB_AP_Male)** - cy-GB - männlich - Geraint
- **(de-IN_AP_Female)** - de-IN - Weiblich - Raveena
- **(de-US_AP_Male_Chipmunk)** - en-US - Männlich - Chipmunk
- **(de-US_AP_Male_Eric)** - en-US - Männlich - Eric
- **(de-US_AP_Female_Ivy)** - de-US - Weiblich - Ivy
- **(de-US_AP_Female_Jennifer)** - en-US - Weiblich - Jennifer
- **(de-US_AP_Male_Justin)** - en-US - Männlich - Justin
- **(de-US_AP_Female_Kendra)** - en-US - Weiblich - Kendra
- **(de-US_AP_Female_Kimberly)** - en-US - Weiblich - Kimberly
- **(es-ES_AP_Female)** - es-ES - Weiblich - Conchita
- **(es-ES_AP_Male)** - es-ES - Männlich - Enrique
- **(es-US_AP_Female)** - es-US - weiblich - Penelope
- **(es-US_AP_Male)** - es-US - Männlich - Miguel
- **(fr-CA_AP_Female)** - fr-CA - weiblich - Chantal
- **(fr-FR_AP_Female)** - fr-FR - weiblich - Celine
- **(fr-FR_AP_Male)** - fr-FR - männlich - Mathieu
- **(is-IS_AP_Female)** - is-IS - weiblich - Dora
- **(is-IS_AP_Male)** - is-IS - männlich - Karl
- **(it-IT_AP_Female)** - it-IT - weiblich - Carla
- **(it-IT_AP_Male)** - it-IT - männlich - Giorgio
- **(nb-NO_AP_Female)** - nb-NO - weiblich - Liv
- **(nl-NL_AP_Female)** - nl-NL - weiblich - Lotte
- **(nl-NL_AP_Male)** - nl-NL - männlich - Ruben
- **(pl-PL_AP_Female_Agnieszka)** - pl-PL - Weiblich - Agnieszka
- **(pl-PL_AP_Male_Jacek)** - pl-PL - Männlich - Jacek
- **(pl-PL_AP_Female_Ewa)** - pl-PL - Weiblich - Ewa
- **(pl-PL_AP_Male_Jan)** - pl-PL - männlich - Jan
- **(pl-PL_AP_Female)** - pl-PL - Weiblich - Maja
- **(pt-BR_AP_Female)** - pt-BR - weiblich - Vitoria
- **(pt-BR_AP_Male)** - pt-BR - männlich - Ricardo
- **(pt-PT_AP_Male)** - pt-PT - männlich - Cristiano
- **(pt-PT_AP_Female)** - pt-PT - weiblich - Ines
- **(ro-RO_AP_Female)** - ro-RO - weiblich - Carmen
- **(sv-SE_AP_Female)** - sv-SE - weiblich - Astrid
- **(tr-TR_AP_Female)** - tr-TR - weiblich - Filiz

## Changelog
### 1.8.0 (2018-12-04)
* (bluefox) Priority for the text was added

### 1.7.1 (2018-09-19)
* (BuZZy1337) fixed error in Blockly-Block

### 1.7.0 (2018-06-08)
* (bluefox) Ivona removed
* (bluefox) Error was fixed by upload of file to FTP
* (bluefox) admin3

### 1.6.8 (2018-04-11)
* (BuZZy1337) Generate separate mp3 files for each instance.
* Fixes [Issue#34](https://github.com/ioBroker/ioBroker.sayit/issues/34)
* (BuZZy1337) Always upload mp3 files to the state sayit.X.tts.mp3

### 1.6.7 (2018-02-05)
* (Apollon77) Remove unneeded logging
* (bondrogeen) Admin3 Fixes

### 1.6.6 (2017-11-27)
* (angelnu) Wait for Google Home announcement to complete

### 1.6.5 (2017-11-04)
* (bluefox) Fix cloud .pro

### 1.6.4 (2017-10-18)
* (bluefox) Fix system commands

### 1.6.3 (2017-10-04)
* (bluefox) Code refactoring
* (bluefox) Add google home as output
* (bluefox) Remove ivona because not more supported

### 1.5.2 (2017-03-09)
* (bluefox) Catch error if some directory in mp3 folder

### 1.5.1 (2017-02-15)
* (bluefox) Fix blockly language

### 1.5.0 (2017-01-27)
* (DarkChaos) Add AWS Polly as source
* (bluefox) Add cloud as source

### 1.4.0 (2017-01-16)
* (bluefox) fix install problem
* (bluefox) add PicoTTS as source

### 1.3.3 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.3.2 (2017-01-10)
* (angelnu) changes for new chromecast tts

### 1.3.1 (2016-12-27)
* (bluefox) small fix of config dialog
* (AirKing555) Fix Volume change

### 1.3.0 (2016-12-20)
* (instalator) add mpd

### 1.2.1 (2016-10-31)
* (bluefox) Fix cache

### 1.2.0 (2016-10-28)
* (bluefox) Finish sayit

### 1.1.3 (2016-10-24)
* (bluefox) Fix changing of engine

### 1.1.2 (2016-10-20)
* (bluefox) Add omxplayer option

### 1.0.1 (2016-10-12)
* (bluefox) support of blockly

### 1.0.0 (2016-05-14)
* (bluefox) Make the type of mp3 as file

### 0.3.16 (2015-12-26)
* (Vegetto) Support for Chromecast devices

### 0.3.16 (2015-12-26)
* (bluefox) enable play of mp3 files from disk

### 0.3.15 (2015-11-10)
* (bluefox) fill default settings by first start

### 0.3.14 (2015-11-01)
* (bluefox) fix error with sayItWindows

### 0.3.13 (2015-10-27)
* (bluefox) fix error with sayItSystem

### 0.3.12 (2015-10-06)
* (bluefox) fix error if received mp3 file is too short
* (bluefox) try to implement cache datapoint (you can use sayit.0.tts.cachetext to create cache for phrases and use sayit without internet)

### 0.3.11 (2015-08-03)
* (bluefox) change google requests from http to https

### 0.3.10 (2015-07-26)
* (bluefox) add new voice Russian-Maxim
* (bluefox) fix error with mp24ftp

### 0.3.9 (2015-07-09)
* (bluefox) fix error by mediaplayer24

### 0.3.8 (2015-06-09)
* (bluefox) make the volume for announce configurable
* (bluefox) make the command for "system" configurable

### 0.3.7 (2015-05-28)
* (bluefox) fix volume for announce
* (bluefox) support of play files from internal filesystem, like "/sayit.0/tts.userfiles/myGong.mp3"

### 0.3.6 (2015-03-24)
* (bluefox) fix error with volume by sonos

### 0.3.5 (2015-03-22)
* (bluefox) fix error in announcement

### 0.3.4 (2015-03-20)
* (bluefox) fix error in announcement

### 0.3.3 (2015-03-20)
* (bluefox) enable announcement

### 0.3.2 (2015-03-16)
* (bluefox) clear cache if engine changed

### 0.3.1 (2015-03-15)
* (bluefox) fix small error with log

### 0.3.0 (2015-03-08)
* (bluefox) add ivona/Amazon voices

### 0.2.2 (2015-03-08)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.1 (2015-03-07)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.0 (2015-03-02)
* (bluefox) add yandex-russian support

### 0.1.0 (2015-03-02)
* (bluefox) queue texts

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2019, bluefox <dogafox@gmail.com>

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