---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: ioBroker sayit адаптер
hash: YGa+7pXYvlsP3g77L7+oVvhRap1ISB9PKQfchOw2rQw=
---
![логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](http://iobroker.live/badges/sayit-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)
![NPM](https://nodei.co/npm/iobroker.sayit.png?downloads=true)

# IoBroker sayit адаптер
SayIt Adapter может конвертировать текст в речь и воспроизводить его на каком-либо устройстве.

## Конфигурация
Фактические следующие выходы поддерживаются:

- *Браузер* - текст будет воспроизводиться браузером с открытой страницей iobroker.vis. Он поддерживается практически каждым настольным браузером и несколькими мобильными браузерами.

- *[Home24- MediaPlayer] (http://www.home-24.net/index.php?app=media)* - текст будет отправлен и воспроизведен на устройстве Android с Home24 - MediaPlayer установлен. Для этого будет использоваться встроенный в Android текстовый речевой движок. Порт не может быть изменен и установлен на 50000.

- *Home24 - MediaPlayer и [FTP-сервер] (https://play.google.com/store/apps/details?id=lutey.FTPServer)* - текст будет отправляться и воспроизводиться на устройстве Android с Home24 - MediaPlayer установлены. Для этого будет использоваться Google text to voice engine. Созданный mp3-файл будет скопирован через FTP на устройство Android и воспроизведен с помощью Home24 - MediaPlayer.

    Оба приложения должны иметь одинаковые домашние каталоги. (Например, корневой каталог \ "SD Card \").

- *Система* - текст будет воспроизводиться ОС, в которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, Linux, Mac OSx.

- *движок Windows* - текст будет воспроизводиться окнами, в которых работает адаптер sayIt. Для этого будет использоваться Windows Text to Voice Engine, который должен быть предварительно настроен пользователем. Вы можете проверить [здесь] (http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7), как его настроить.

- *Sonos* - воспроизводить текст на устройстве Sonos. Убедитесь, что веб-адаптер включен. Необходимо включить SONOS для чтения сгенерированных mp3-файлов.

- *Chromecast* - воспроизводить текст на устройстве Chromecast.

- *MPD* - воспроизводить текст на Music Player Daemon. Используйте только **http** для веб-адаптера, не используйте https.

Чтобы включить преобразование текста в речь в системе RaspberryPI или linux, один раз выполните следующую команду ```sudo apt-get -y install mpg321```, чтобы установить mpg321.

Файлы mp3 / wav могут быть воспроизведены путем записи его имени в объект. (например, "/vis.0/main/img/door-bell.mp3")

Файл должен быть сначала загружен.

### TTS двигатели
онлайн:

- Google: английский, немецкий, русский, итальянский, испанский, французский
- Яндекс: русский

Для использования голосов Яндекса вы должны запросить ключ API здесь: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Эта служба будет отключена 1 января 2019 года и заменена на Яндекс.cloud.] Чтобы использовать Яндекс.cloud, вам необходимо зарегистрироваться здесь: [https://cloud.yandex.ru/], установить SpeechKIT API в облаке и получить токен авторизации. и идентификатор папки, как описано в инструкциях API.

- Ивона: английский, немецкий, русский, итальянский, испанский, французский, данский, валлийский, исландский, голландский, польский, португальский, румынский, шведский, турецкий

        Чтобы использовать голоса Amazon (Ivona), вам необходимо получить ключ доступа и секретный ключ [Вот](http://www.ivona.com/us/for-business/speech-cloud/).

- Облако:

        Для использования облачных голосов необходим настроенный облачный адаптер. (Это может быть отключено, но должно быть настроено). Этот сервис использует AWS Polly и может использоваться напрямую.

- Amazon Web Services Polly:

        Для использования голосов AWS Polly необходимо создать ключ доступа и секретный ключ [здесь] (https://console.aws.amazon.com/iam/home). Документацию по Amazon можно найти здесь](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).

не в сети:

- PicoTTS (только linux): английский, немецкий, итальянский, испанский, французский

Для PicoTTS необходимо установить следующие пакеты: libttspico-utils и lame.
Команда установки: «sudo apt-get install libttspico-utils lame»

### Облачные сервисы и веб-сервисы Amazon Polly
Вы можете отформатировать текст с помощью [Язык разметки для синтеза речи](http://docs.aws.amazon.com/polly/latest/dg/ssml.html).

Самые полезные функции:

- `` `<break time =" 3s "/>` `` - сделать паузу на х секунд (максимум 10 секунд).
- `` `<emphasis> big </ emphasis>` `` - сделать акцент на каком-то слове.
- `` `<prosody volume =" + 6dB "rate =" 90% "> Я говорю об этом </ prosody>` `` - управление параметрами скорости и громкости.
- `` `<say-as interpret-as =" digits "> 12345 </ say-as>` `` - произносить каждую цифру отдельно.

Больше [Информация](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Системная команда
Если у вас есть какая-либо программа, которая может воспроизводить аудиофайлы локально или где-то еще, вы можете написать эту команду здесь. Например.

```myCustomPlayer --option```

Если выбран выход **System** адаптер sayit выполнит следующую команду в локальной системе:

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

Если имя файла должно находиться где-то посередине, вы можете использовать *%s* чтобы указать, где имя файла должно быть размещено:

```myCustomPlayer --option "%s" > /dev/null```

скажем, он сделает из него ```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null```.

## Использование
Адаптер SayIt нельзя использовать один. Он должен управляться из адаптера javascript или из "vis" с определенным виджетом.
После создания экземпляра адаптера можно будет найти следующие объекты:

- sayit.N.tts.text: Фраза, которую нужно произнести.
- sayit.N.tts.volume: объем, который будет использоваться при воспроизведении фразы.
- sayit.N.tts.playing: true, если текст воспроизводится, и false, если нет. Поддерживается только для режима воспроизведения «windows» и «system».
- sayit.N.tts.cachetext: фраза для кэширования, а затем она может использоваться без интернета.

   Например. Вы можете ввести здесь вручную «Нет интернета», и если ping на google.com отрицательный, напишите «Нет интернета» на «tts.text», и он будет произносится Конечно, кеш должен быть включен.

State **tts.text** поддерживает расширенный синтаксис, поэтому язык / движок и объем могут быть определены вместе с текстом. Он используется для включения многоязычных движков text2speech.
Например. если у адаптера есть движок "Google-english", можно с помощью фразы ```de:Sag es``` заставить использовать речевой движок Google-Deustch.

С ```ru;75;Погода хорошая``` мы можем заставить использовать русский язык и громкость 75%.

Вы можете указать объем объявления в процентах от текущего или заданного объема (не от максимального). Например. если команда ```de;75;Gutes Wetter```и «громкость объявления» равна 50%, объявление будет воспроизводиться с громкостью 38% из возможных 100%.

Системная команда для воспроизведения mp3 файла также может быть указана. Если вы оставите это поле пустым, будут использованы настройки по умолчанию: windows - cmdmp3.exe, OSX - / usr / bin / afplay, linux - mpg321 или omxplayer (рекомендуется).

Для установки omxplayer напишите ```sudo apt-get install omxplayer``` или напишите ```sudo apt-get install mpg321``` для установки mpg321.

** Примечание: ** Выбор объявления по умолчанию будет возможен только после запуска экземпляра.

### Приоритеты
Чтобы сразу произнести текст, несмотря на поставленные в очередь тексты, у вас есть 2 возможности:

- место "!" как первый символ в тексте, поэтому этот текст будет произноситься сразу после текущего.
- напишите true в состояние "tts.clearQueue", и очередь будет очищена. После этого вы можете написать новый текст в «tts.text», но все тексты в очереди выбрасываются.

### Двигатели
Возможны следующие значения для двигателей:

#### Google
- **en** - английский
- **de** - Deutsch
- **пл** - Польски
- **ru** - Русский
- **ук** - український
- **это** - итальянский
- **эс** - Эспаниол
- **fr** - французский

#### Яндекс
- **ru_YA: Яндекс** - English
- **ru_YA_CLOUD: Облако Яндекса** - Русский [API Яндекс.Клауд генерирует файлы в формате OGG. Для воспроизведения файлов ogg на linux должен быть установлен mplayer и выбран как системный проигрыватель]

#### Amazon Polly через облако
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - Дойч - Марлен
- **de-DE_CLOUD_Male** - Deutsch - Hans
- **en-US_CLOUD_Female** - en-US - Женский - Салли
- **en-US_CLOUD_Male** - en-US - мужчина - Джои
- **da-DK_CLOUD_Female** - da-DK - Женский - Наджа
- **da-DK_CLOUD_Male** - da-DK - Мужской - Мадс
- **en-AU_CLOUD_Female** - en-AU - Женский - Николь
- **en-AU_CLOUD_Male** - en-AU - Мужской - Рассел
- **en-GB_CLOUD_Female_Amy** - en-GB - Женский - Эми
- **en-GB_CLOUD_Male** - en-GB - мужчина - Брайан
- **en-GB_CLOUD_Female_Emma** - en-GB - Женский - Эмма
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - женщина - Гвинет
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - мужчина - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - женщина - Гвинет
- **cy-GB_CLOUD_Male** - cy-GB - Мужской - Geraint
- **en-IN_CLOUD_Female** - en-IN - Женский - Raveena
- **en-US_CLOUD_Male_Chipmunk** - en-US - мужчина - бурундук
- **en-US_CLOUD_Male_Eric** - en-US - мужчина - Эрик
- **en-US_CLOUD_Female_Ivy** - en-US - Женский - Плющ
- **en-US_CLOUD_Female_Jennifer** - en-US - женщина - Дженнифер
- **en-US_CLOUD_Male_Justin** - en-US - мужчина - Джастин
- **en-US_CLOUD_Female_Kendra** - en-US - Женский - Kendra
- **en-US_CLOUD_Female_Kimberly** - en-US - женщина - Kimberly
- **es-ES_CLOUD_Female** - es-ES - Женский - Кончита
- **es-ES_CLOUD_Male** - es-ES - мужчина - Энрике
- **es-US_CLOUD_Female** - es-US - Женский - Пенелопа
- **es-US_CLOUD_Male** - es-US - мужчина - Мигель
- **fr-CA_CLOUD_Female** - fr-CA - Женский - Шанталь
- **fr-FR_CLOUD_Female** - fr-FR - Женщина - Селин
- **fr-FR_CLOUD_Male** - fr-FR - мужской - Матье
- **is-IS_CLOUD_Female** - is-IS - Женщина - Дора
- **is-IS_CLOUD_Male** - is-IS - мужчина - Карл
- **it-IT_CLOUD_Female** - it-IT - Женский - Carla
- **it-IT_CLOUD_Male** - it-IT - мужской - Джорджио
- **nb-NO_CLOUD_Female** - nb-NO - Женский - Лив
- **nl-NL_CLOUD_Female** - nl-NL - женщина - Лотте
- **nl-NL_CLOUD_Male** - nl-NL - мужчина - Рубен
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - женский - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - мужской - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - женский - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - мужской - январь
- **pl-PL_CLOUD_Female** - pl-PL - женский - Maja
- **pt-BR_CLOUD_Female** - pt-BR - женщина - Витория
- **pt-BR_CLOUD_Male** - pt-BR - мужской - Рикардо
- **pt-PT_CLOUD_Male** - pt-PT - мужской - Криштиану
- **pt-PT_CLOUD_Female** - pt-PT - женский - Инес
- **ro-RO_CLOUD_Female** - ro-RO - Женский - Кармен
- **sv-SE_CLOUD_Female** - sv-SE - Женский - Астрид
- **tr-TR_CLOUD_Female** - tr-TR - Женский - Филиз

#### Пико ТТС
- **en-US** - Английский США
- **en-GB** - Английский ГБ
- **de-DE** - Deutsch
- **IT-IT** - итальянский
- **эс-эс** - эспаниол
- **FR-FR** - французский

#### Amazon Polly Direct
- **(ru-RU_AP_Female)** - Русский - Татьяна
- **(ru-RU_AP_Male)** - Русский - Максим
- **(de-DE_AP_Female)** - Дойч - Марлен
- **(de-DE_AP_Female_Vicki)** - Дойч - Вики
- **(de-DE_AP_Male)** - Deutsch - Hans
- **(en-US_AP_Female)** - en-US - Женский - Салли
- **(en-US_AP_Male)** - en-US - мужчина - Джои
- **(da-DK_AP_Female)** - da-DK - Женский - Наджа
- **(da-DK_AP_Male)** - da-DK - мужчина - Мадс
- **(en-AU_AP_Female)** - en-AU - Женский - Николь
- **(en-AU_AP_Male)** - en-AU - мужчина - Рассел
- **(en-GB_AP_Female_Amy)** - en-GB - Женский - Эми
- **(en-GB_AP_Male)** - en-GB - мужчина - Брайан
- **(en-GB_AP_Female_Emma)** - en-GB - Женский - Эмма
- **(en-GB-WLS_AP_Female)** - en-GB-WLS - женский - Гвинет
- **(en-GB-WLS_AP_Male)** - en-GB-WLS - Мужской - Geraint
- **(cy-GB_AP_Female)** - cy-GB - женщина - Гвинет
- **(cy-GB_AP_Male)** - cy-GB - мужчина - Geraint
- **(en-IN_AP_Female)** - en-IN - Женский - Raveena
- **(en-US_AP_Male_Chipmunk)** - en-US - Мужской - Бурундук
- **(en-US_AP_Male_Eric)** - en-US - мужчина - Эрик
- **(en-US_AP_Female_Ivy)** - en-US - Женский - Плющ
- **(en-US_AP_Female_Jennifer)** - en-US - Женский - Дженнифер
- **(en-US_AP_Male_Justin)** - en-US - мужчина - Джастин
- **(en-US_AP_Female_Kendra)** - en-US - Женский - Кендра
- **(en-US_AP_Female_Kimberly)** - en-US - Женский - Kimberly
- **(es-ES_AP_Female)** - es-ES - Женский - Кончита
- **(es-ES_AP_Male)** - es-ES - мужчина - Энрике
- **(es-US_AP_Female)** - es-US - Женский - Пенелопа
- **(es-US_AP_Male)** - es-US - мужчина - Мигель
- **(fr-CA_AP_Female)** - fr-CA - Женский - Шанталь
- **(fr-FR_AP_Female)** - fr-FR - Женский - Селин
- **(fr-FR_AP_Male)** - fr-FR - мужской - Матье
- **(is-IS_AP_Female)** - is-IS - Женский - Дора
- **(is-IS_AP_Male)** - is-IS - мужчина - Карл
- **(it-IT_AP_Female)** - it-IT - женщина - Карла
- **(it-IT_AP_Male)** - it-IT - мужской - Джорджио
- **(nb-NO_AP_Female)** - nb-NO - Женский - Лив
- **(nl-NL_AP_Female)** - nl-NL - женщина - Лотте
- **(nl-NL_AP_Male)** - nl-NL - мужчина - Рубен
- **(pl-PL_AP_Female_Agnieszka)** - pl-PL - женский - Агнешка
- **(pl-PL_AP_Male_Jacek)** - pl-PL - мужской - Jacek
- **(pl-PL_AP_Female_Ewa)** - pl-PL - женский - Ewa
- **(pl-PL_AP_Male_Jan)** - pl-PL - мужской - январь
- **(pl-PL_AP_Female)** - pl-PL - женский - Maja
- **(pt-BR_AP_Female)** - pt-BR - женщина - Витория
- **(pt-BR_AP_Male)** - pt-BR - мужской - Рикардо
- **(pt-PT_AP_Male)** - pt-PT - мужчина - Криштиану
- **(pt-PT_AP_Female)** - pt-PT - женщина - Инес
- **(ro-RO_AP_Female)** - ro-RO - женщина - Кармен
- **(sv-SE_AP_Female)** - sv-SE - женщина - Астрид
- **(tr-TR_AP_Female)** - tr-TR - женский - Филиз

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