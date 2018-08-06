### Install NodeJS & NPM on PogoPlug/Dockstar (Debian Wheezy/Jessie)

<div class="post-header">If you have to install debian first, you can find the instructions [here](http://midnight-coder.blogspot.de/2013/12/pogoplug-e032-install-debian.html).</div>

<div id="post-body-8426526808532697629" class="post-body entry-content">Prerequisites: My Pogoplug is running Debian Wheezy with a custom 3.14 Kernel (see other posts in this blog for install instructions).

### Installing NodeJS

NodeJS is now part of the wheezy-backports repository, so this installation is pretty straightforward. 1\. edit _/etc/apt/sources.list_, add the following line: _deb http://http.debian.net/debian wheezy-backports main contrib non-free_ 2\. Install the package `apt-get install nodejs` 3\. check version: `nodejs -v` **NOTE**: the debian binary is called "nodejs" and not "node" because of a naming conflict with an existing package called "node" (HAM radio related). This can lead to issues down the road (e.g with the npm install) One work-around is to create a symbolic link: as root: `ln -s /usr/bin/nodejs /usr/local/bin/node` as non-root : `ln -s /usr/bin/nodejs ~/bin/node `

### Installing NPM

Unfortunately, npm is not backported to wheezy, so we build from scratch. Some more info: [Install Node.js & NPM on Debian Wheezy](http://antler.co.za/2014/04/install-node-js-npm-on-debian-stable-wheezy-7/) 1\. make sure SSL certificates are installed `apt-get install ca-certificates` 2\. get the npm install shell script `cd /tmp` `wget https://www.npmjs.org/install.sh --no-check-certificates` (**NOTE**: I had to add the --no-check-certificates option even though I had the latest ca-certificates installed) 3\. edit the install.sh script (if necessary) I had to add the -k parameter to all the instances where "curl" was called to bypass the certificate checking. 4\. run the NPM install script `sh install.sh` You should get a message like "It worked". 5. replace npm with npm 2 `npm i npm@latest-2 -g`</div>

<div class="post-body entry-content">(This instruction was copied from [here](http://midnight-coder.blogspot.de/2014/08/install-nodejs-npm-on-seagate-dockstar.html))</div>