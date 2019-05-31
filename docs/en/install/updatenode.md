---
title: Update NodeJS
lastChanged: 30.05.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/updatenode.md
hash: lkNH9PFYmWYnJeXGn0uvhkDDfDRHF3lxZdmNpctIxSg=
---
# Update NodeJS for ioBroker
Every year a new Node.js version is released which is marked as LTS (Long Term Support) with a straight version number and will be maintained for several years.
At the same time, an earlier Node.js LTS version reaches its end of life (`End of Life`).
In 2019, NodeJS version 12 will be declared LTS in October, and version 6 was released end-of-life in April.

Even though the js-controller up to version 1.5.11 still supports Node.js as of version 4, new adapters come more and more often with e.g. Node.js 8 as a basic requirement, because every new Node.js version brings new features.

All Node.js versions with odd version numbers are development versions and are not officially supported and should not be used!

But even the latest version does not make sense, because here are often not quite compatible libraries.
At the moment Node.js 10 would be the recommended version.

Every few years, the update of the Node.js is up for an ioBroker installation and this article should summarize how we do it best.

First of all, ioBroker should be stopped so that updates can not cause any side effects or crashes.
Please also check whether all processes that started with `io.` have been terminated.

Furthermore, of course, a backup should necessarily be created.
You can use the BackItUp adapter or the command line command

```iobroker backup```

The next step is to update Node.js on the system to the desired new version.
Under Linux, it is sufficient to simply execute the Nodesource installation commands as listed under [https://github.com/nodesource/distributions#debinstall](https://github.com/nodesource/distributions#debinstall).
For macOS there is an installer on [https://nodejs.org/en/download/](https://nodejs.org/en/download/) which you simply reinstall.
If the ioBroker installer was used under Windows then please do NOT update the Nodejs / npm version on your own, but follow the instructions of the installer.

Unfortunately, this is only half of the work, as there are many modules used modules that will be installed during installation for the then current Node.js.
When updating the Node.js, these modules must all be updated, otherwise there will be errors during execution.

There are several ways to update this:

1. **npm rebuild**

The first attempt should always be made with the command `npm rebuild` in the ioBroker directory, because this works the cleanest and is executed directly by the package management. Ideally, it will take a few minutes and some warnings might be listed.
But if there are mistakes, then you have to check and solve them exactly ... that's the tricky part here.
In the next post we try to collect all the known of these cases with your solution approaches.
If that works, this is the fastest and cleanest way.

2. **reinstall script**

If this does not do, the js controller includes a reinstall script (reinstall.sh or js-controller 1.5 reinstall.js).
This script will detect any installed ioBroker adapters, then delete them from the node_modules directory and reinstall them.
This approach is a bit more expensive than npm rebuild, but it serves the same purpose. This generally works well, but you should not break the process. If it does happen or there are problems starting after this procedure, then best choose the path in the next point.
The reinstall.sh-script which was included in the js-controller 1.4 has a formatting problem and has to be used for Linux with the command

... ??? be corrected so it does.

3. **node-modules reset**

Another variant, which takes a bit longer, is the approach to simply delete all ode-JS modules, manually install the js-controller and then start ioBroker and have the missing adapters installed automatically.
To do this, delete the entire node_modules directory in the ioBroker directory. Then you install the controller in the relevant version (here eg 1.5.11 which is currently in stable):

```npm install iobroker.js-controller@1.5.11 --production```

Then you start ioBroker. It is important that the iobroker-data directory is not changed.
Then ioBroker starts and will find out in turn that the adapters it wants to start are not installed and install them. Depending on the system, this can take time - sometimes up to a few hours (or all night on slow SD cards).
But then everything should be updated.

4. **Reinstallation with Restore**

A small modification of the last variant is a reinstallation. This secures the `iobroker-data` directory (or uses the backup from above). Then delete the whole ioBroker directory and use the installer.
Immediately afterwards ioBroker stops again (which is started automatically after installation) and copies the iobroker-data directory or uses `iobroker restore`. Then you start ioBroker again.
The remainder then runs as in option 3 and takes its time.

Please give feedback on what works for you, what you use and what the problems and your solutions are.