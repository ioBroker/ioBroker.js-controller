## Update from CLI and from NPM (latest version)
You can update js-controlle only from command line interface.

So open the console and write (assume your iobroker is installed in /opt/iobroker):
```
cd /opt/iobroker
iobroker stop
npm i iobroker.js-controller --production
iobroker start
```

If iobroker is not installed in /opt/iobroker please locate it and navigate to the right folder.

## Update from CLI and from NPM (specific version)

```
cd /opt/iobroker
iobroker stop
npm i iobroker.js-controller@1.5.0 --production
iobroker start
```

Please replace 1.5.0 with your desired version.


## Update from CLI and from github (dev version)

```
cd /opt/iobroker
iobroker stop
npm i https://github.com/iobroker/iobroker.js-controller/master/tarball --production
iobroker start
```
