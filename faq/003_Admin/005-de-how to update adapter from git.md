# Wie update ich einen Adapter vom git
Ab und zu, braucht man den Adapter vom git upzudaten. 

Es gibt zwei Möglichkeiten:
- Über Admin Web Seite
- Über CLI (Command Line Interface) 

## Über Admin Web Seite

![Screenshot](img/005-de-how%20to%20update%20adapter%20from%20git-01.jpg)

![Screenshot](img/005-de-how%20to%20update%20adapter%20from%20git-02.jpg)

## Über CLI
Windows oder Linux Console aufmachen und folgendes ausführen:

```
cd /opt/iobroker
npm i https://github.com/ioBroker/ioBroker.<ADAPTER_NAME>/tarball/master --production
iobroker update <ADAPTER_NAME>
iobroker restart <ADAPTER_NAME>
```

Es kann sein, dass URL anders aussieht, so wie ```https://github.com/<USER>/ioBroker.<ADAPTER_NAME>/tarball/master```. 

In dem Fall entsprechend das Kommando anpassen.
