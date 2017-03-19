
##   Information

<table width="100%">

<tbody>

<tr>

<td style="width: 50%; height: 20px;">**  Local Version**</td>

<td style="width: 50%; height: 20px;">[![](http://img.shields.io/npm/v/iobroker.sayit.svg)](https://www.npmjs.com/package/iobroker.sayit)</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** Necessary terms**</td>

<td style="width: 50%; height: 20px;">/</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** Developer**</td>

<td style="width: 50%; height: 20px;">Bluefox</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** Key phrases**</td>

<td style="width: 50%; height: 20px;">media, text-to-speech</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** Github**</td>

<td style="width: 50%; height: 20px;">![icon_link](http://www.iobroker.net/wp-content/uploads/icon_link.png) [link](https://github.com/ioBroker/ioBroker.sayit)</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** Platform**</td>

<td style="width: 50%; height: 20px;">Javascript/Node.js</td>

</tr>

<tr>

<td style="width: 50%; height: 20px;">** License**</td>

<td style="width: 50%; height: 20px;">MIT</td>

</tr>

</tbody>

</table>

At this point the driver supports the following text-to-speech services:

*   Sound engine Google. Unofficial feature of service translator used to pronounce the translated text. This feature can be eliminated, so it's better to use services mentioned below.
*   Service Yandex  [SpeechKit Cloud](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/about-docpage/), sound synthesis. In order to use this service, you should register and receive <span style="text-decoration: underline;">free of charge API-key</span> in the developer's room.
*   Service Amazon [Speech Cloud](https://www.ivona.com/us/for-business/speech-cloud/). To use this service one should register Development Account and obtain <span style="text-decoration: underline;">free</span> Access Key.

For the normal service work the server ioBroker must have an access to the Internet, because phrase processing and reception of ready audio-file can happen on the server of appropriate company. In the driver the cash is used, i.e. for the repeated output of already requested audio files the internet is not required, all the data is taken from the cache. The driver allows to output sound using the following devices and software: WEB-browser-the text will be played back through the browser with open driver page VIS.

*   This function is supported in each browser for Desktop and a few mobile versions.
*   Home24-MediaPlayer-the text is sent on device with Android OS with installed program [Home24 - MediaPlayer](http://www.home-24.net/index.php?page=sites/home.php&app=media).In this case the audio file is created with an engine Android text to speech. The port is set by default to 50000 and can't be changed. Russian language in this regime is not supported, the same as work with cash.
*   Home24 - MediaPlayer and FTP Serve-audio files are played with  [Home24 - MediaPlayer](http://www.home-24.net/index.php?page=sites/home.php&app=media), installed on Android device. Yet, the files are generated with the service, tuned in the driver sayit and are copied into the indicated Android-device via FTP(one needs to install FTP-access to Android resources, for example <span style="text-decoration: underline;">FTPServer</span>). Exactly this folder is used in the program configuration Home24 - MediaPlayer as a source.
*   The system output-generated files of tuned text-to-speech engine are played with operation system, where ioBroker works. Supported OS Windows ([cmdmp3.exe](https://lawlessguy.wordpress.com/2015/06/27/update-to-a-command-line-mp3-player-for-windows/)) Mac OSx (/usr/bin/afplay) и Linux (mpg321).
*   Windows engine-the text is played with Windows OS. One needs to tune up text to speech engine as it is described <span style="text-decoration: underline;">here</span>
*   Sonos-audiofiles playback with a network devices  [sonos](http://www.sonos.com/en-wo). For the driver work sayit in this regime one has to make sure that in the system ** ioBroker simple web Adapter**   and **SONOS Adapter** are installed.
*   Chromecast-audio files playback with the devices [Chromecast](http://www.google.com/intl/ru_ru/chrome/devices/chromecast/). In the driver regime work one needs to make sure that **ioBroker simple web Adapter** and driver **Chromecast Adapter**. are installed.

Driver allows to install several samples of itself, in other words one can install a few samples of itself, one can differentiate the sound output in different variants. For example:

*   emergency messages output in the columns of informing driver sayit.0 Linux - system;
*   messages of system visualisation VIS-**sayit.1** the Browser configuration and output on the device, where the open page is VIS; informing on weather,currencies , news -**sayit.2** on the device **SONOS**, which is installed in the kitchen, to know in the morning with a cup of aromatic coffee, to know what happens in the world and how to dress well before going out))

##   Installation

Installation is performed on the tab Driver page of a system <span style="text-decoration: underline;">administration.</span> In the group of drivers **Media** we find the line with the name **Text to speech Adapter** and press the button plus in this line to the right. [![](http://www.iobroker.net/wp-content/uploads//sayit-install1.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-install1.jpg) On the screen we will see the popup window of driver installation, after the installation it closes automatically. [![](http://www.iobroker.net/wp-content/uploads//sayit-install2.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-install2.jpg) If there's a success, on the tab Drivers configuration we will see the line **sayit.0** with installed driver sample. [![](img/sayit-install3.jpg)](img/sayit-install3.jpg) One should consider the fact that depending on the way of sound output, we'd need to install the auditional software into a system(for example a program mpg321 for Linux) and add setup driver(for example a driver to work with the devices Sonos or Chromecast). We could read about it lower.

##   Voice Engine Configuration

###   Using the voice engine in Google

The unofficial feature of service translator is used to pronounce the translated text. This feature will be closed in the future, so it is better to use the service Yandex or Amazon. The tune-up is simple, no need to register anywhere and recieve different keys/passwords. The system speaks in a female voice, the text recognition system works (for example the phrase "now it is 08:45" will be pronounced "now it is eight hours and forty-five minutes"). Supporting langugues are Russian, English, German, Italian, Spanish, French. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-google1.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-google1.jpg)**Using the speech engine Yandex SpeechKit** To use the Yandex engine, one should recieve API-key. To do this we register in Yandex (if we are already registered,we must be authorised), go to the link in the developer's room and offer to create API-key to use the Yandex services. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex1.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex1.jpg) Press the button **Receive the Key** and you'll see the form, where you input the project name, for which will be used a key and the service. We enter the name and choose the service **SpeechKit Cloud**. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex2.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex2.jpg) Then we need to fill in the simple form with some personal data, show the prject type(commercial/personal), and, according to the wishes, leave a small description of your project. One should accept the terms of services and press the button **Send.** [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex3.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex3.jpg) In sometime, while the key is being generated,the personal room will open again and on the left below the notice Your API-keys one can see the received key. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex4.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex4.jpg) Now we open the driver setting and in the field **Language** we choose **Yandex-Russian**. Below we 'll see the additional settings, together with the field, where we should input the recieved API-key. Other settings are intuitively clear and can't cause difficulties. The sound output(different ways-look below) . [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex5.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex5.jpg) To check the work, one should open the folder **Objects** on the page of administering ioBroker, open the object tree of sample driver **sayit.0**, find the variable **sayit.0.tts.text** and to the right we click the field **Value. **The field for entry will appear and button to confirm(tick) and cancel (cross). Input the text for testing and press the button with a tick. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex6.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-yandex6.jpg) Some time later there will be a sound of signaling (file gong.mp3) and then the requested phrase. On the **Log** tab one has to make sure about the presence/absence of errors. [![](img/sayit-setting-yandex7.jpg)](img/sayit-setting-yandex7.jpg)

### Using the sound engine of Amazon Speech Cloud

To use the engine Amazon Speech Cloud one should receive Access Key and Secret Key. To do this we register on <span style="text-decoration: underline;">site project</span>- link Sign up: [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon1.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon1.jpg) Choose to create a new account, input email. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon2.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon2.jpg) Then we should enter some personal information. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon3.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon3.jpg) After a successful registration, we go to a private room through the link [Credentials](https://www.ivona.com/us/account/speechcloud/credentials) and press the button Generate new credentials. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon4.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon4.jpg) There will be a window on a screen, where we can find the keys, also there is a link to download files in *.txt format where one can find the generated key information.But there is a warning "After creation or modification of credentials, please take into account it may take up to 30 minutes for changes to go live."  Right after the key generation, we should wait about half an hour before using the service.   [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon5.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon5.jpg) Now we open driver set-up in the field **Language** we choose **Ivona-Russia - Tatiana**. Below we will have additional settings, including two fields, where one should put in the received keys. The rest of settings are intuitively simple and mustn't cause difficulties. The sound output(different ways-look below) [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon6.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon6.jpg) To check work, we open the folder **Objects** on the administration page ioBroker, open the tree of objects of a sample driver **sayit.0**, find the variable **sayit.0.tts.text** and on the right we click in the line **Meaning. **The field for entry will appear and confirm(tick) or cancel(cross). We enter the field text for texting and press the button with a tick. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon7.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon7.jpg) Some time later the speaker must produce the sound of notice(file gong.mp3) and then the requested phrase. On the Log folder we can make sure of presence/absence of mistakes. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon8.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting-amazon8.jpg) Sometime later we can see the statistics of requests in site of private room. [![](img/sayit-setting-amazon9.jpg)](img/sayit-setting-amazon9.jpg)

## Setting the way the sound outputs

Now something about other settings. Suppose, the sound engine is selected, the registration is recieved and access keys(if necessary), it is time to take care of a sound. There are various driver settings, which do not depend on text-to-speech, but in fact:

*   System call-this setting is useful, if you don't like the program, which is used in the system by default for playback: cmdmp3.exe (Windows) and mpg321 (Linux). For example, ioBroker is installed on PC with Linux OS, and system already has the media-content player, suppose it is mplayer. If in the line system call we write the command of player startup, suppose it is mplayer. If in line system call we write the command to run this player, the audiofile playback will be not with mpg321, but mplayer
*   Notice. Before saying the phrase you can play at first some sound file, short-just a few seconds long. The file itself can be chosen from the list, you can upload your own(if you don't like your options) and quickly check the sound(there is a button play). If you choose the specific file from the list or uploaded your own, so below three other tune ups  are available.

*   Timeout notice in seconds. It is a temporary interval, during which the driver will not play the sound of notice, if text phrases follow one another.That is, imagine, the driver gave a "notice sound" into speakers. "It is 23 degrees outside " and in an interval, smaller than following configuration, we should pronounce another phrase "attention! there is a movement in camera №1"- in that case there will not be a sound before a second phrase.
*   Duration of information in seconds-it is an approximate time of sounding of notice file, it is recommended to set a second more of real time of sounding, for the streams not to mix or produce a new mix, as shown here(Linux).
*   Loudness of notice in %-accordingly loudness, with which the file is played(to make quieter or louder of main loudness of driver).
*   Cashing the received audio-files-if this option is installed, the driver will keep in cash the played before audio-files, accordingly the sound engine will not be used (we can economise on amounts of inputs or explore the system without internet, once to run all the possible phrases).

[![](img/install-armbian-audio1.jpg)](img/install-armbian-audio1.jpg)

###   System Tuning the output of Windows sound

If ioBroker system is installed on Windows OS, so, to setup the sound out as System, one shouldn't make additional settings or install additional programs. In ioBroker there is a player to play *.mp3 from command line [cmdmp3.exe](https://lawlessguy.wordpress.com/2015/06/27/update-to-a-command-line-mp3-player-for-windows/) The performed file is in ioBroker folder on path ...\node_modules\iobroker.sayit\cmdmp3\cmdmp3.exe. We can check how it works or if it works at all, to do this we should tun command line(Run-cmd.exe-Enter), move to the folder of running file with a command **cd** and run it indicating the path to file *.mp3(for example gong.mp3, which is a part of a driver sayit.) [![](img/sayit-setting1.jpg)](img/sayit-setting1.jpg) If you can hear the sound from the speaker, all is fine, driver sayIt must work fine with the configuration. We can use another player to play audio-files, for example VLC, then in the field **system call** you should write the command to run a player to get the way to file *.mp3 and set to automatic end work after the play(so the driver will not create the processes in the system).

###   System Set up of sound Linux

For work of driver **sayit** Linux OS with **System** configuration we use the console player **mpg321,** so we need to set it up in the beginning: `root@bananapipro:/# apt-get update` `root@bananapipro:/# apt-get install mpg321` After the installation, its work can be checked, so it console we run the command to run the player and then we write the path to the file *.mp3 (for example gong.mp3) `root@bananapipro:/# mpg321 /opt/iobroker/iobroker-data/files/sayit.0/tts.userfiles/gong.mp3` `High Performance MPEG 1.0/2.0/2.5 Audio Player for Layer 1, 2, and 3.` `Version 0.3.2-1 (2012/03/25). Written and copyrights by Joe Drew,` `now maintained by Nanakos Chrysostomos and others.` `Uses code from various people. See 'README' for more!` `THIS SOFTWARE COMES WITH ABSOLUTELY NO WARRANTY! USE AT YOUR OWN RISK!` `Directory: /opt/iobroker/iobroker-data/files/sayit.0/tts.userfiles` `Playing MPEG stream from gong.mp3 ...` `MPEG 1.0 layer III, 128 kbit/s, 44100 Hz joint-stereo` `ALSA lib pcm.c:2239:(snd_pcm_open_noupdate) Unknown PCM cards.pcm.front` `[0:01] Decoding of gong.mp3 finished.` If the speaker sound is present, all goes fine, driver sayit will work well with this configuration. We can use another player to play audio-files, for example mplayer, so in the field **system call** we should write the command of running the player to catch the way to the file *.**mp3**(simply write **mplayer**) and set it to auto finish after the playback(so the driver sayit will not produce the processes in the system). It is possible there will be problems with player work and different samples of driver sayit or other processes, in that case, we can set up mixing, as written in <span style="text-decoration: underline;">this article.</span>

###  Set up of sound browser output

If we activate this setting, so the sound will be make in the device, where in browser(supports all the Desktop versions and several mobile) open application VIS. For example, ioBroker is installed on the board BananaPi for Armbian, and the page VIS is open on the computer with Windows OS in the browser Mozilla FireFox. If this driver sayit is to setup in the Browserm the sound will play through the PC sound card with Windows OS [![](http://www.iobroker.net/wp-content/uploads//sayit-setting2.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting2.jpg) Driver has one more setup-**ID browser**. Here we can leave the meaning by default FFFFFFFF (8 times F), in that case the sound will be played on all devices, where the VIS page is open. We can show the ID of specific browser, it can be looked in the  VIS editing. We can indicate the ID of browser, it can be looked in the editing VIS on the folder **Instruments**. If we show the specific ID, the sound will be heard on that device only, on which in the browser with the shown ID the VIS page is open. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting3.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting3.jpg) ![](img/sayit-setting4.jpg)

###  Mediaplayer Sound output Home24

If the setting of sound output is MediaPlayer24, then the text will be sent on a device with Android OS into installed program [Home24 - MediaPlayer](http://www.home-24.net/index.php?page=sites/home.php&app=media). We can download in [PlayMarket](https://play.google.com/store/apps/details?id=com.home24.mediaplayer) In this case the sound file will be created with Android version text to speech. Port to connect by default is 50000 and can't be changed. <span style="text-decoration: underline;">Russian language is not supported together with the cash work!!!</span> In driver settings show the way for the sound-MediaPlayer24 and IP-address Android device with the installed program. The language setting(together with the engine) doesn't matter. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting6.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting6.jpg) On Android device one should install the Home24-Mediaplayer and set the engine text to speech to work with a specific language(English or German).Run and in the settings(preferences) tick HTTP service on startup. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting7.png)](http://www.iobroker.net/wp-content/uploads//sayit-setting7.png) In the program below in the section Log one can control the work of an application and its driver-should be indicated the requests to play the sent text. [![](img/sayit-setting8.png)](img/sayit-setting8.png)

###  Home24 - Mediaplayer c FTP-сервером

Tuning the sound output Home24-Mediaplayer with FTP-server To make the above mentioned sound output work with russian, the configuration was make with FTP-server. Driver **sayit** with the help of chosen sound engine requests audio file, then FTP copies it to Android-device, in its turn the application **Home24 - Mediaplayer** looks at the files in the folder, configured on FTP-server, if the file appears- it plays  it- everything is simple... To begin with we advise to install on Android- FTP-server, for example [FTPServer](https://play.google.com/store/apps/details?id=lutey.FTPServer). Create the folder, for example **/sdcard/ftp**, and set FTP-server to work with her with the name of user(andrey, for example), FTP-port(20001, for example) and WiFi-network(Su17), where the incoming log ins are allowed.   [![](http://www.iobroker.net/wp-content/uploads//sayit-setting10.png)](http://www.iobroker.net/wp-content/uploads//sayit-setting10.png) Then run(if not installed, installed as shown above) **Home24 - Mediaplayer** set to work with folder FTP-server. [![](http://www.iobroker.net/wp-content/uploads//sayit-setting12.png)](http://www.iobroker.net/wp-content/uploads//sayit-setting12.png) Now we can setup the driver sayit(show the settings of sound engine, sound and FTP-server on Android-device): [![](http://www.iobroker.net/wp-content/uploads//sayit-setting9.jpg)](http://www.iobroker.net/wp-content/uploads//sayit-setting9.jpg) Now we can check it. In the program log **Home24 - Mediaplayer** there will be the statistics of play of files say.mp3 Driver sayit sends on FTP-server with the same name, that is changes the old one to a new one, **Home24 - Mediaplayer** sees the updates and plays it. [![](img/sayit-setting13.png)](img/sayit-setting13.png)

##   Work with sample driver

After the installation, driver creates several parameters: [![](img/sayit-setting5.jpg)](img/sayit-setting5.jpg)

*   cashtext-Cashing phrase can be used without internet. For example, input by hand "No internet", if the google pin on google.com is negative, write"No internet" on "tts.txt" and it will play it.Cash must be activated of course.
*   mp3-path to file, which can be played in a request from SONOS or Browser. By default:http://IP-адрес:8082/state/sayit.0.tts.mp3
*   playing - **true**, if the text is played and false, if it doesn't exist. Supported only for Windows OS and System regime.
*   text- in this variable we write the text to play.
*   volume- a relative loudness (0...100%) with which the phrases will be pronounced.

Variable **text** supports the extended syntax-language/engine and loudness can be indicated in the text. We can use for mulilanguge Text2Speech engines. For example, if driver is setup "Google-English", in the phrase the prefix **ru** is used in pronunciation; make use the russian language. Or "ru;75; the weather is good"-phrase will be pronounced with the loudness at 75%.

##  Usage

for example, we can use the script to say the time.

*   tell the time on weekdays from 7.00 till 23.00
*   on weekdays the loudness is set at 23.00 at 70%
*   at weekends from 9.30 to 23.00 and in 23.00 the loudness goes down to 70%
*   a few phrases in the morning before going to work

To brgin with, we need to install the driver [Javascript/Coffescript Script Engine](https://github.com/ioBroker/ioBroker.javascript) (if its not installed in the system), then in the page of system, administration we choose the tab **Scripts.** Choose the group common(for example, or create your own) and press the button **NewScript. Rename** it into **SayTimeNow** [![](img/sayit-use1.jpg)](img/sayit-use1.jpg) In the window of script  editing copy the following text: `schedule("*/10 7-23 * * *", function () {` `  var idSayIt = "sayit.0.tts.text";` `   var date = new Date();` `   var day = date.getDay(); // 0-Sunday. 6-Saturday.` `   var hour = date.getHours();` `   var min = (date.getMinutes()<10?'0':'') + date.getMinutes(); // if the minute less than 10, we add 0` `   var volume = 100;` `   if(hour == 23) volume = 80;` `    // say the time at weekdays at 00 minutes` `    if((day >= 1 && day <= 5) && min == "00"){` `      if(hour == 7){` `        // if 7:00, we wish a pleasant journey` `        setState (idSayIt, volume+'; good morning!');` `       } else {` `       // say each hour` `       setState (idSayIt, volume+';'+hour+':'+min);` `     }` `     log('weekdays '+day);` `     // В 7:40, say its time to go out` `  }else if ((day >= 1 && day <= 5) && (hour == 7 && min == 40)){` `     setState (idSayIt, volume+';'+hour+':'+min+' Its time to leave for work!');` `     // Say the time on Weekends from 9:30` `   }else if((day == "0" || day == 6 ) && ((hour == 9 && min == 30) || (hour >= 10 && min == "00"))){` `     setState (idSayIt, volume+';'+hour+':'+min);` `     log('the day off '+day);` `   }` `});` After the text editing for their needs(we can use as a sample or try the file), press the button to run the script. Below in the field Log you will see tha messages like this: `17:58:18.954 [info] javascript.0 Start javascript script.js.common.sayTimeNow` `17:58:18.956 [info] javascript.0 script.js.common.sayTimeNow: registered 0 subscriptions and 1 schedule` This will mean that  **javascript.0** runs the script **SayTimeNow** to perform, in this script there will be registered subscriptions-0, tasks cron-1. We are done! Now according to the script termz and driver sayit the system will tell the current time and sometimes allows itself other phrases.