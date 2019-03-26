---
title: installation
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/virtualbox.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: VtWRmeZY9+xDVaMHS6K3m18WcJwcGA1SWlbtQ6lCYKw=
---
# Setting up and installing ioBroker in VirtualBox
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

@@@ http://www.iobroker.net/docu/?page_id=5358&lang=en @@@

First, let's get a current stable version of Debian https://www.debian.org/CD/http-ftp/#stable

A little further down we click under CD on AMD64

Now we download the "debian-8.4.0-amd64-netinst.iso" If there is a newer version should use this, at the time of download was Debian 8.4.0 Aktuell.
I use the Netinst, because the file is small and the installation relieves only sundries from the net.

Then we create a new virtual machine and give it a name.
In my example ioBroker_Debian_Jessie_x64 recording87.jpg Then indicate the amount of main memory we want to allocate to the VM.
In my example 4GB RAM Aufnahme88.jpg

Click on Create Disk Recording89.jpg

Select VDI (Virtual Image Box) Recording90.jpg

With type of storage it is up to each one to decide what he chooses.
In my example, I use DYNAMICALLY ALLOCATED recording91.jpg

Now we can still change the file name of the VM (if wanted) and give the size of the providing Partiotion for our VM In my example 10GB Aufnahme92.jpg

Now the VM is ready.
If we click on CHANGE now, we can adjust some more things of the VM.

We go to the tab MASS MEMORY Click UNDER Controller: IDE

On the right side under Attributes a CD logo appears.
We click on this and choose FILE FOR VIRTUAL CD / DVD medium.
Now we navigate in Explorer to the downloaded Debian ISO file and select it.
The whole thing should look like this: Aufnahme93.jpg

Since I want to reach ioBroker on my network and not in a sub, I set under the NETWORK tab under CONNECTED, the selection on NETWORK BRIDGE recording94.jpg

Now we have set everything necessary.
The installation of Debian can start.
We click on START and land in the following picture.
We choose INSTALL recording95.jpg

Language: Select GERMAN from Record96.jpg

Location: Select GERMANY from Aufnahme97.jpg

Keyboard Layout: Select ENGLISH from Recording98.jpg

Computer name: We enter the name of the computer to be installed.
In my example ioBrokerVM (if someone wants to play back backups of his ioBroker production system, please enter here the same Nanem your RasPi / Cubie / BananaPi etc.) Aufnahme100.jpg

Domain name: The field can be left blank. Aufnahme101.jpg

Root password: your root password Aufnahme102.jpg

Repeat root password: Again your root password Aufnahme103.jpg

User Create: In my example NIPPY Recording104.jpg

Username Create: In my example NIPPY Aufnahme105.jpg

User Password: Your User Password Recording106.jpg

Repeat user password: Re-enter your user password. Recording107.jpg Timezone: We choose BERLIN

Aufnahme108.jpg

Partitioning the Hard Disk 1: We Select GUIDED - USE FULL DISK RECORD109.jpg

Partitioning hard disk 2: We select our hard disk Recording110.jpg

Disk Partitioning 3: We select ALL FILES ON A PARTITION, RECOMMENDED FOR BEGINNERS RECORDING 111.jpg

Partitioning Hard Disk 4: We select PARTITIONING EXIT AND TAKE CHANGES Recording112.jpg

Disk Partitioning 5: We select YES Recording113.jpg Package Manager Configure 1: We choose GERMANY Recording115.jpg

Package Manager Configure 2: I chose ftp.de.debian.org Recording116.jpg

Package Manager Configure 3: you can leave it blank and go to NEXT Recording118.jpg

Populary-Contest: I chose NO Recording119.jpg

Software selection: We select SSH SERVER & STANDARD SYSTEM TOOLS we select the rest (if selected) Recording120.jpg

GRUB Bootloader 1: we choose JA Aufnahme121.jpg

GRUB Bootloader 2: we choose our HDD / dev / sda (ata-vbox .........) recording122.jpg

Installation Completed: Aufnahme123.jpg

Now the system reboots and we land in the login

Login: Recording124.jpg

We log in with our root account: Login: root Password: YOUR PASSWORD RECEIVED Record125.jpg

Now we update the system: apt-get install update 1

apt-get install update apt-get install upgrade 1

apt-get install upgrade

Since SUDO is not installed, make like this: aptitude install sudo 1

aptitude install sudo

Following is the NPM installation: apt-get install npm 1

apt-get install npm

Then we install CURL: apt-get install curl 1

apt-get install curl

Preparation and installation of NodeJs curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 1

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

apt-get install nodejs 1

apt-get install nodejs

When that's done, ioBroker will install

First we create the directory iobroker: mkdir / opt / iobroker 1

mkdir / opt / iobroker

We change to the directory iobroker: cd / opt / iobroker 1

cd / opt / iobroker

Now we install iobroker: npm install --unsafe-perm iobroker 1

npm install --unsafe-perm iobroker

At the end of the installation the following should appear: Aufnahme137.jpg

—

Who wants to can still htop install I use it in the terminal me the memory load / CPU load etc. to look at.

This is installed with: apt-get install htop 1

apt-get install htop

it is executed with: htop 1

htop

And looks like this: Aufnahme139.jpg

I hope some newcomers have made it easier to set up a VM including ioBroker.

For me, the installation of ioBroker in a VM has often failed, on the BananaPi she went through without problems.

This installation routine has fonktioniert wonderful with me on the VM anyway.

1 Supplement: 1.1 Automatically start VirtualBOX VM (Ubuntu 16.10): 1.2 Adapt the 3 variables! (if necessary comment out the third variable or add more, depending on the VM instances)

Addition: Start VirtualBOX VM automatically (Ubuntu 16.10):

https://www.freesoftwareservers.com/ind ... nd-vbox-5 /

Create file:

sudo nano /etc/init.d/StartVM &amp; sudo chmod + x /etc/init.d/StartVM &amp; sudo update-rc.d StartVM defaults 99 01 1

sudo nano /etc/init.d/StartVM &amp; sudo chmod + x /etc/init.d/StartVM &amp; sudo update-rc.d StartVM defaults 99 01

File contents:

~~~ bash

#! / Bin / sh
# Start VirtualBox @boot
# /etc/init.d/StartVM
#
#Edit these variables!
VMUSER = user VMNAME = VM1 VMNAME2 = test

case "$ 1" in start) echo "Starting VirtualBox VM ..." sudo -u $ VMUSER VBoxHeadless --startvm $ VMNAME &amp; sudo -u $ VMUSER VBoxHeadless --startvm $ VMNAME2 &amp; ;; stop) echo "Saving state of Virtualbox VM ..." sudo -u $ VMUSER VBoxManage controlvm $ VMNAME savestate sudo -u $ VMUSER VBoxManage controlvm $ VMNAME2 savestate ;; *) echo "Usage: /etc/init.d/StartVM {start | stop}" exit 1 ;; esac

exit 0 ~~~

Adjust the 3 variables! (if necessary comment out the third variable or add more, depending on the VM instances)

In the BIOS (if it is running on a computer) set that in case of power failure, the old ON / OFF status should be restored. In the event of a power failure, it then restarts and the VM then also starts.

Create backups with VirtualBOX and Back in Time

In VirtualBOX you can easily create backup points manually. It only takes a few seconds and 1 click. Always before an iobroker update or make script changes! Screenshot of 2016-04-26 22-48-04.png

With one click you can restore the previous version.

Memory usage: a dynamic 10GB VM and Ubuntu 16.10 Full + iobroker occupies approximately 1.7GB of storage space. My 11 snapshots occupy 8.6 GB.

My whole personal area incl. The VirtualBOX VM directory I copy every night with the program "Back in Time" automatically on a second hard drive. There several versions are held and automatically deleted after certain times.
Screenshot of 2016-04-26 22-55-23.png This is VirtualBox.

~~~ bash sudo apt-get install virtualbox virtualbox-qt virtualbox-dkms ~~~

You can also install an extension pack, it supports, for example, the connection of USB 2.0 or 3.0 devices from the host on the client, webcam transmission from the host to client and AES encryption. You can download it here [URL: https: //www.virtualbox.org/wiki/Downloads] here - the 2nd point (Extension Pack) [/ url] Download this file and open it either as admin or open and installs it via VirtualBOX / Global Settings / Additional Packages (but start VirtualBOX as Admin).

The minimum hardware requirements are very low. You have to figure out for yourself how it fits. Theoretically enough 512 RAM and an old Intel processor. For example, it should run smoothly on all Intel NUC generations.
For continuous operation, it is of course important to have a low-power host. You can easily build powerful sub-10-watt computers today. There are various 10-watt PC instructions on the Internet. It is important that one does without a (own) graphics card and has an efficient power supply in the low load range, and does not use a high-end motherboard, because the more functions it has, the more chips are sucking on the stream.
I can really recommend the Intel NUC series for Windows or Ubuntu. Let me quote my signature: iobroker in an Ubuntu VM with VirtualBOX on an Intel NUC Nuc6i3SYH (i3 Skylake), M.2 SSD, 8 GB RAM, Ubuntu 16.10. 6-8 W idling.

In Virtualbox, I have the network card of Vm set to "Bridged", so that the VM hangs on the LAN router, so to speak, as a separate computer.

And the fixed IP is set as normal within the VM via the installed operating system.
This can work like this with Debian:

Terminal:

~~~ bash sudo nano / etc / network / interfaces ~~~

There could be something like this: ~~~ auto eth0 allow-hotplug eth0 iface eth0 inet dhcp ~~~

You change that to (Attention, adjust the numbers to your own environment)

~~~ auto eth0 iface eth0 inet static address 192.168.1.7 netmask 255.255.255.0 gateway 192.168.1.1 ~~~

Where eth0 is the name of your own LAN device, it's likely to be different in a VM, so when you make the change, you'll have to replace the two eth0 words with the right names.