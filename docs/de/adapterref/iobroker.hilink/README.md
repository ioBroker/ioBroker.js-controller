---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hilink/README.md
title: ioBroker.hilink
hash: c8Z7B22ZNqfY7z8dvtxyeVIQJn/kjjQf1lezOM3pR0Q=
---
![Logo](../../../en/adapterref/iobroker.hilink/admin/hilink.png)

# IoBroker.hilink
=================

## Beschreibung
Es ist ein Adapter für Huawei USB-Modems mit Hilink-Firmware.

[Русский](https://github.com/bondrogeen/iobroker.hilink/blob/master/docs/ru/README.md)

Getestet an Modems: E3372h-153_Update_22.323.01.00.143_M_AT_05.10 E3372s Update_22.286.53.01.161_S_ADB_TLN_03 E3272s 22.491.0.00 17.100.08.00.03-Mod1.2

Firmware und andere Informationen finden Sie hier - http://4pda.ru/forum/index.php?showtopic=582284&

Kompatibilität E3372 (МТС 827F / 829F, МегаФон M150-2, Билайн E3372 / E3370, TELE2 E3372р-153, МТС 824F, Мегафон M100-4, Билайн E3272).

- Verbindung, Trennen vom Netzwerk und Neustarten des Modems
- eingehende und ausgehende Nachrichten lesen.
- Nachrichten senden.
- Senden von ussd-Anfragen.
- Erhalten grundlegender Parameter des Modems, Informationen über den Verkehr.

```javascript

//  connection - 'connect',
//  disconnecting - 'disconnect'
//  rebooting - 'reboot'

sendTo("hilink.0",'control','reboot',function (response){
    log(JSON.stringify( response, null, 2 ));
});

sendTo("hilink.0",'control','connect');

// send messages
sendTo("hilink.0",'send',{
    phone:  '+7123456789', // phone number
    message:  'test messages' // test message
    },function (response){
    log(JSON.stringify( response, null, 2 ));
});

sendTo("hilink.0",'send',{phone:'+7123456789',message:  'test messages'});


// read messages
sendTo("hilink.0",'read','inbox',function (response){
     log(JSON.stringify( response, null, 2 ));
});

/*
'inbox' incoming,
'outbox' outgoing,
'new' new
*/


//send ussd request
sendTo("hilink.0",'ussd','*100#',function (response){
     log(JSON.stringify( response, null, 2 ));
});

// delete one messages to index '40002'
sendTo("hilink.0",'delete','40002',function (response){
     log(JSON.stringify( response, null, 2 ));
});

// clear all 'outbox' outgoing messages, 'inbox' incoming messages
sendTo("hilink.0",'clear','outbox',function (response){
     log(JSON.stringify( response, null, 2 ));
});

```

## Changelog

#### 0.2.8
* (bondrogeen) add E3272s

#### 0.2.2
* (bondrogeen) add json last sms

#### 0.0.5
* (bondrogeen) fix last sms

#### 0.0.4
* (bondrogeen) fix

#### 0.0.3
* (bondrogeen) add 3372h

#### 0.0.1
* (bondrogeen) initial release