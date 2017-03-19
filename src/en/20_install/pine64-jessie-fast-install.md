You will find here the installation instructions for ioBroker on Pine64 with Image Jessie If you cannot get it run, please post your Problem in [forum](http://forum.iobroker.net).

## Required Hardware

*   Pine64
*   Power supply (it is important to have a good one. You will have stability problems with weak or bad quality power supplies)
*   SD Card

## Required / important Links

*   Download Image: [http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip](http://files.pine64.org/os/debian/debian-mate-jessie-20160701-lenny.raposo-longsleep-pine64-8GB.zip) from [here](http://wiki.pine64.org/index.php/Pine_A64_Software_Release#Debian_Linux_Jessie_with_Mate_GUI_Image_.5B20160701.5D_by_lenny.raposo_with_Longsleep_kernel)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)

## Installation instructions

### Installation of Debian

1.  Download Image
2.  Write Image to he SD Card (Win32Diskimager)
3.  Start Pine64
4.  Connect to Pine64 via Putty. Login: debian, Password: debian
5.  Configure Pine64 with `resize_rootfs.sh` to extend partition

### Installation of Node.js

1.  Kernel Update: `sudo apt-get update && sudo apt-get upgrade`
2.  Install Node.js
1.  `sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get autoremove && sudo apt-get autoclean`
2.  `sudo apt-get remove libpcap0.8 -y`
3.  `sudo apt-get install -y build-essential libpcap-dev git -y`
4.  `cd /tmp`
5.  `wget https://nodejs.org/dist/v4.6.1/node-v4.6.1-linux-arm64.tar.xz`
6.  `cd /usr/local`
7.  `sudo tar --strip-components=1 -xvf /tmp/node-v4.6.1-linux-arm64.tar.xz`
8.  `sudo npm install node-gyp -g`
3.  After installation of node.js the command "`node -v`" should show the node.js version. if not, create alias to bin file: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Installation of ioBroker

1.  install ioBroker
1.  `sudo mkdir /opt/iobroker`
2.  `sudo chmod 777 /opt/iobroker`
3.  `cd /opt/iobroker`
4.  `sudo npm install iobroker --unsafe-perm`
2.  ioBroker über IP im Webbrowser aufrufen: `http://IP-Address:8081`

## Remove GUI(optional)

To free space on SD card and in RAM the GUI can be removed: `sudo apt-get remove --purge x11-common` `sudo apt-get autoremove`

## Set static IP address (optional)

`sudo nano /etc/dhcpcd.conf` Call per interface (example): _interface eth0_ _static ip_address=192.168.0.10/24_ _static routers=192.168.0.1_ _static domain_name_servers=192.168.0.1_