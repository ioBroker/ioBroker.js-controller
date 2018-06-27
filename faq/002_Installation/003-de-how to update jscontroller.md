## Update über CLI und vom NPM (neueste Version)
Sie können js-controller nur über die Befehlszeilenschnittstelle (CLI) aktualisieren.

Öffnen Sie die Konsole und schreiben Sie (vorausgesetzt, Ihr iobroker ist in /opt/iobroker installiert):

```
cd /opt/iobroker
iobroker stop
npm i iobroker.js-controller --production
iobroker start
```

Wenn iobroker nicht in /opt/iobroker installiert ist, suchen Sie es bitte und navigieren Sie zum richtigen Ordner.

## Update über CLI und vom NPM (spezifische Version)

```
cd /opt/iobroker
iobroker stop
npm i iobroker.js-controller@1.5.0 --production
iobroker start
```

Bitte ersetzen Sie 1.5.0 durch Ihre gewünschte Version.


## Update über CLI und vom github (dev version)

```
cd /opt/iobroker
iobroker stop
npm i https://github.com/iobroker/iobroker.js-controller/master/tarball --production
iobroker start
```
