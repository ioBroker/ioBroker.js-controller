You will find here the installation instructions for ioBroker on Raspberry PI with Image Jessie If you cannot get it run, please post your Problem in [forum](http://forum.iobroker.net).

## Required Hardware

*   Raspberry PI
*   Power supply (it is important to have a good one. You will have stability problems with weak or bad quality power supplies)
*   SD Card

## Required / important Links

*   Download Image: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
*   Win32DiskImager:[ https://sourceforge.net/projects/win32diskimager/](https://sourceforge.net/projects/win32diskimager/)
*   Putty: [http://www.putty.org/](http://www.putty.org/)
*   Basic configuration of Raspberry PI: [http://raspberrypihq.com/booting-the-raspberry-pi-for-the-first-time/](http://raspberrypihq.com/booting-the-raspberry-pi-for-the-first-time/)

## Installation instructions

### Installation of Raspbian

1.  Download Image (RASPBIAN JESSIE or RASPBIAN JESSIE LITE)
2.  Write Image to he SD Card (Win32Diskimager)
3.  Start RaspberryPi
4.  Connect to Raspberry via Putty. Login: pi, Password: raspberry
5.  Configure RaspberryPi with `sudo raspi-config`
6.  Enable Root Access
1.  `sudo nano /etc/ssh/sshd_config`
2.  Edit file: Change `PermitRootLogin without-password` in `PermitRootLogin yes` and save
3.  Start SSH anew: `sudo /etc/init.d/ssh restart`
4.  `sudo su` (now is Root Mode active)
5.  Change default password with `passwd`
7.  Logout and login as root via Putty

### Installation of Node.js

1.  Kernel Update: `sudo apt-get update && sudo apt-get upgrade`
2.  Deinstall old node.je Version (not required by Jessie Light)
1.  `apt-get --purge remove node`
2.  `apt-get --purge remove nodejs`
3.  `apt-get autoremove`
4.  `reboot`
3.  login as root via Putty
4.  Install Node.js anew for Raspbery 2/3
1.  `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`
2.  `sudo apt-get install -y build-essential python-rpi.gpio python nodejs`
3.  `reboot`
5.  Install Node.js anew for Raspbery 1
1.  `wget [http://node-arm.herokuapp.com/node_archive_armhf.deb](http://node-arm.herokuapp.com/node_archive_armhf.deb)`
2.  `sudo dpkg -i node_archive_armhf.deb`
3.  `sudo apt-get install build-essential python python-rpi.gpio`
4.  `reboot`
6.  login as root via Putty
7.  After installation of node.js the command "`node -v`" should show the node.js version. if not, create alias to bin file:: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`

### Installation of ioBroker

1.  install ioBroker
1.  `sudo mkdir /opt/iobroker`
2.  `sudo chmod 777 /opt/iobroker`
3.  `cd /opt/iobroker`
4.  `sudo npm install iobroker --unsafe-perm`
2.  ioBroker über IP im Webbrowser aufrufen: `http://IP-Adresse:8081`

## Set static IP address (optional)

`sudo nano /etc/dhcpcd.conf` Call per interface (example): _interface eth0_ _static ip_address=192.168.0.10/24_ _static routers=192.168.0.1_ _static domain_name_servers=192.168.0.1_