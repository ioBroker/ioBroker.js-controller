---
title: Resolve adapters errors
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/adapter.md
---
# Resolve adapters errors
To see more errors by the adapter you can start it in the console:
```
cd /opt/iobroker
iobroker stop ADAPTERNAME
node node_modules/iobroker.ADAPTERNAME/main.js --debug
```

If you see the error message `Cannot find module 'C:\pWork\node_modules\ioBroker.ADAPTERNAME\main.js`, try to execute: 
```
node node_modules/iobroker.ADAPTERNAME/ADAPTERNAME.js --debug
```

Of course the `ADAPTERNAME` must be replaced with the adapter name which you want to debug.

E.g.: 
```
cd /opt/iobroker
iobroker stop s7
node node_modules/iobroker.s7/main.js --debug
```

Sometimes the rebuild of adapter is required, if the node was updated. To do that, call:
```
cd /opt/iobroker
iobroker stop ADAPTERNAME
npm rebuild iobroker.ADAPTERNAME
```


