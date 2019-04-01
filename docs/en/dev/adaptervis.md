# How to debug VIS widgets
To start with debugging of ioBroker.vis following must be done:

- disable cache in ioBroker.js-controller
  open the /opt/iobroker/iobroker-data/iobroker.json file and change attribute **noFileCache** to _true_.

```
{
  "network": {
    "IPv4": true,
    "IPv6": true,
    "bindAddress": null,
    "useSystemNpm": true
  },
  "objects": {
    "type": "file",
    "typeComment": "Possible values: 'file' - [port 9001], redis - [port 6379], couch - [port 5984].",
    "host": "127.0.0.1",
    "port": 9001,
    "user": "",
    "pass": "",
    "noFileCache": true
  },
...
```

- disable cache in ioBroker.web
  Open configuration of the adapter "web" instance and ensure that "Cache" is disabled. It is disabled by default.

- restart the ioBroker with "iobroker restart"

- replace index.html and edit.html
  replace files in _/opt/iobroker/iobroker-data/files/vis/index.html_ and _edit.html_ with files from _/opt/iobroker/node_modules/iobroker.vis/www/index.html.original_ and _edit.html.original_.
  Change the file /opt/iobroker/iobroker-data/files/vis/cache.manifest. No matter what, just one symbol to trigger the browser to load files anew. The files must be smaller than 200k. If you have got wrong files, so they are definitly largen than 400k.

- Now if you will change the files (e.g. /opt/iobroker/iobroker-data/files/vis/widgets/metro.html) you will see the changes after the reload of vis.

- Problem is, that all widgets are dynamically linked and you cannot go to the file metro.html in browser sources and make a break point.
  But there is a trick: if you make some console.log output (or [debugger;](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/debugger) ), so you can detect this output in Browser JS console and go to the place by clicking it (work in Chrome).