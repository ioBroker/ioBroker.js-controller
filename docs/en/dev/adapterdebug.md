---
title: debugging
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdebug.md
hash: BOKT0EbFe/3HwmnwWGpZ+5EgAHDyRw7VtK6+4awC7D0=
---
# Debugging adapters
## Adapters debug with Chrome
Node.JS supports debugging with Chrome.

If you stop an adapter in the ioBroker and then start it from the console:

```
cd /opt/iobroker
iobroker stop sayit
node --inspect node_modules/iobroker.sayit/main.js --force --logs
```

Important is `–inspect`

Then something like this is output:

```
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/9415dda6-0825-40ed-855c-83c6142e56e9
2016-12-27 15:23:02.637  - error: sayit.0 adapter disabled
starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
2016-12-27 15:23:02.647  - info: sayit.0 starting. Version 1.3.1 in /opt/iobroker/node_modules/iobroker.sayit, node: v6.9.2
Debugger attached.
```

After that, Chrome can debug by typing link in Chrome:

! (Chrome) [media / adapterdebug1.png]

*Tested: Windows, Chrome 55, node.js 6.9.2*

### Remote debugging with Chrome
If iobroker is not running on the same machine as chrome, then the command is based on the example above:

```
node --inspect-brk=<ip-adresse iobroker>:9229 node_modules/iobroker.sayit/main.js --force --logs
```

the parameter `--inspect-brk` provides in comparison to the above,

that a breakpoint is set right at the start of the debugger on the first line of your adapter.

If you do not always want to copy the link to the start of the debug, you can also call up the following page in chrome:

```
chrome://inspect
```

then once via configure the ip and port of your remotrechners just like the inspect command enter.

There the debug session will be displayed after starting the command and can be started with a click.

The chrome debug options are fantastic.
You have all the possibilities that you also know from **web-debugging** (breakpoints, also with conditions, watch, callstack, scope inspection, console issue, etc).

Pictures and English description are [here](https://software.intel.com/en-us/xdk/articles/using-chrome-devtools-to-debug-your-remote-iot-nodejs-application)

If not already installed, the iobroker computer still requires the node-inspector:

```
npm install -g node-inspector
```

## Debugging with WebStorm
## Debugging with Visual Sturio Code