---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/lib/install-ha-rpi.md
title: passwd hacluster
hash: MjjI23qSH6M8YRKL+JWxHZIbxco0oSiyyyai+mUP1wY=
---
#
##
### Source
https://www.raspberrypi.org/downloads/raspbian/ https://downloads.raspberrypi.org/raspbian_lite_latest Raspbian Stretch Lite Minimal image based on Debian Stretch Version: June 2018 Release date: 2018-06-27 Kernel version: 4.14

2018-06-27-raspbian-stretch-lite.img

### Etcher
https://etcher.io/

Create file `ssh` in on the partition `boot`.

### Putty
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

## Connect
Call Putty User: pi paswoort raspberry raspberrypi in putty

sudo passwd root sudo nano / etc / ssh / sshd_config Search for PermitRootLogin and change it to yes, remove # You can undo logging in as root again using this command sudo passwd -l root su

apt update apt upgrade

Raspi-config

2 Network options hostname wifi country set to DE Enter SSID Enter password

4 I1 Change locale en_GB.UTF-8 UTF-8 Space key to select

7 Advanced options A1 Expand file system

reboot Welcome to fdisk (util-linux 2.29.2).
Changes will remain in memory only until you decide to write them.
Be careful before using the write command.

Command (m for help): Disk / dev / mmcblk0: 14.9 GiB, 15931539456 bytes, 31116288 sectors: sectors of 1 * 512 = 512 bytes Sector size (logical / physical): 512 bytes / 512 bytes I / O size (minimum / optimal): 512 bytes / 512 bytes Disklabel type: dos Disk identifier: 0x8e9e2675

Device Boot Start End Sectors Size Id Type / dev / mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) / dev / mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

Command (m for help): Partition number (1,2, default 2): Partition 2 has been deleted.

Command (m for help): Partition type p primary (1 primary, 0 extended, 3 free) e extended (container for logical partitions): Partition number (2-4, default 2): First sector (2048 -31116287, default 2048): Load sector, + sectors or + size {K, M, G, T, P} (98304-31116287, default 31116287): Created a new partition 2 of type 'Linux' and of size 14.8 GiB ,
Partition # 2 contains a ext4 signature.

Command (m for help): Disk / dev / mmcblk0: 14.9 GiB, 15931539456 bytes, 31116288 sectors: sectors of 1 * 512 = 512 bytes Sector size (logical / physical): 512 bytes / 512 bytes I / O size (minimum / optimal): 512 bytes / 512 bytes Disklabel type: dos Disk identifier: 0x8e9e2675

Device Boot Start End Sectors Size Id Type / dev / mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32 (LBA) / dev / mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

Command (m for help): The partition table has been changed.
Calling ioctl () to re-read partition table.
Re-reading the partition table failed .: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot or after you run part rehearsal (8) or kpartx (8).

fdisk -l / dev / mmcblk0

nano /etc/dhcpcd.conf

interface eth0 static ip_address = 10.10.1.1 / 24

interface wlan0 static ip_address = 192.168.179.161 / 24 static routers = 192.168.179.1 static domain_name_servers = 192.168.179.10

interface eth0 static ip_address = 10.10.1.2 / 24

interface wlan0 static ip_address = 192.168.179.162 / 24 static routers = 192.168.179.1 static domain_name_servers = 192.168.179.10

nano / etc / hosts 192.168.179.161 iob1 192.168.179.162 iob2 10.10.1.1 iob1p 10.10.1.2 iob2p

apt install policycoreutils-python-utils psmisc libssl-dev

https://www.server-world.info/en/note?os=Debian_9&p=ssh&f=4

https://www.debian.org/devel/passwordlessssh

#######################################
centos

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum install NetworkManager-tui nmtui

localectl set-locale LANG = en_US.utf8 yum update -y / usr / bin / rootfs-expand

ssh -l root iob1

timedatectl set-timezone Europe / Berlin

setenforce 0 sed -i.bak "s / SELINUX = enforcing / SELINUX = permissive / g" / etc / selinux / config systemctl mask firewalld.service systemctl stop firewalld.service iptables --flush

# Passwd hacluster
Changing password for user hacluster.
New password: Retype new password: passwd: all authentication tokens updated successfully.

[root @ iob1 ~] # pcs cluster auth iob1 iob2 Username: hacluster Password: iob2: Authorized iob1: Authorized [root @ iob1 ~] # pcs cluster setup -name iobrokerc iob1 iob2 Destroying cluster on nodes: iob1, iob2 ...
iob2: Stopping Cluster (pacemaker) ...
iob1: Stopping Cluster (pacemaker) ...
iob2: Successfully destroyed cluster iob1: Successfully destroyed cluster

Sending 'pacemaker_remote authkey' to 'iob1', 'iob2' iob1: successful distribution of the file 'pacemaker_remote authkey' iob2: successful distribution of the file 'pacemaker_remote authkey' Sending cluster config files to the nodes ...
iob1: Succeeded iob2: Succeeded

Synchronizing pcsd certificates on nodes iob1, iob2 ...
iob2: Success iob1: Success Restoring pcsd on the nodes in order to reload the certificates ...
iob2: Success iob1: Success

[root @ iob1 ~] # pcs cluster start --all iob1: Starting Cluster ...
iob2: Starting Cluster ...

[root @ iob1 ~] # corosync-cfgtool -s Printing ring status.
Local node ID 1 RING ID 0 id = 192.168.179.54 status = ring 0 active with no faults [root @ iob1 ~] # corosync-cmapctl | grep members runtime.totem.pg.mrp.srp.members.1.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.1.ip (str) = r (0) ip (192.168.179.54 ) runtime.totem.pg.mrp.srp.members.1.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.1.status (str) = joined runtime.totem.pg.mrp.srp .members.2.config_version (u64) = 0 runtime.totem.pg.mrp.srp.members.2.ip (str) = r (0) ip (192.168.179.63) runtime.totem.pg.mrp.srp. members.2.join_count (u32) = 1 runtime.totem.pg.mrp.srp.members.2.status (str) = joined [root @ iob1 ~] # pcs status corosync

Membership information ---------------------- Nodeid Votes Name 1 1 iob1 (local) 2 1 iob2

[root @ iob1 ~] # pcs status Cluster name: iobrokerc WARNING: no stonith devices and stonith-enabled is not false Stack: corosync Current DC: iob2 (version 1.1.18-11.el7_5.3-2b07d5c5a9) - partition with quorum Last updated: Fri Aug 24 12:18:14 2018 Last change: Fri Aug 24 12:15:30 2018 by hacluster via crmd on iob2

2 nodes configured 0 resources configured

Online: [iob1 iob2]

No resources

Daemon Status: corosync: active / disabled pacemaker: active / disabled pcsd: active / enabled

[root @ iob1 ~] # crm_verify -L -V error: unpack_resources: Resource start-up disabled since no STONITH resources have been defined error: unpack_resources: Either configure some or disable STONITH with the stonith-enabled option error: unpack_resources: NOTE: Clusters with shared data need STONITH to ensure data integrity Errors found during check: config not valid

[root @ iob1 ~] # pcs property set stonith-enabled = false

[root @ iob1 ~] # crm_verify -L -V

yum install which

[root @ iob1 ~] # pcs resource create ClusterIP ocf: heartbeat: IPaddr2 \> ip = 192.168.179.160 cidr_netmask = 32 op monitor interval = 30s

[root @ iob1 ~] # pcs status Cluster name: iobrokerc Stack: corosync Current DC: iob2 (version 1.1.18-11.el7_5.3-2b07d5c5a9) - partition with quorum Last updated: Fri Aug 24 12:26:57 2018 Last change: Fri Aug 24 12:23:51 2018 by root via cibadmin on iob1

2 nodes configured 1 resource configured

Online: [iob1 iob2]

Full list of resources:

 ClusterIP (ocf :: heartbeat: IPaddr2): Stopped

Failed Actions:

* ClusterIP_monitor_0 on iob2 'not installed' (5): call = 5, status = complete, exitreason = 'Setup problem: could not find command: ip',

    last-rc-change = 'Fri Aug 24 12:23:52 2018', queued = 0ms, exec = 192ms

* ClusterIP_monitor_0 on iob1 'not installed' (5): call = 5, status = complete, exitreason = 'Setup problem: could not find command: ip',

    last-rc-change = 'Fri Aug 24 12:23:52 2018', queued = 0ms, exec = 194ms

Daemon Status: corosync: active / disabled pacemaker: active / disabled pcsd: active / enabled

[root @ iob1 ~] # pcs resource defaults resource-stickiness = 100 Warning: Defaults do not apply to resources which override them with their own defined values [root @ iob1 ~] # pcs resource defaults resource-stickiness: 100

yum install git python gcc-c ++ make

https://stackoverflow.com/questions/48320850/installing-epel-repository-on-centos-7-breaks-yum-functionality cat> /etc/yum.repos.d/epel.repo << EOF [epel] name = Epel rebuild for armhfp baseurl = https: //armv7.dev.centos.org/repodir/epel-pass-1/ enabled = 1 gpgcheck = 0

EOF

[root @ iob1 7] # yum install nodejs npm npm install -g npm @ 4

[root @ iob1 npm] # node -v v6.14.3 [root @ iob1 npm] # npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root @ iob1 dev] # yum install parted Plugins Loaded: fastestmirror Loading mirror speeds from cached hostfile package parted-3.1-29.el7.armv7hl is already installed in the latest version.
Nothing to do [root @ iob1 dev] # parted -l | grep Error [root @ iob1 dev] # parted / dev / sda mclabel gpt Warning: The existing partition table and all data on / dev / sda will be deleted. Would you like to continue? Yes / Yes / No / No? Yes Information: You may need to adjust / etc / fstab.

[root @ iob1 dev] # parted -a opt / dev / sda mkpart primary ext4 0% 100% Information: You may need to customize / etc / fstab.

[root @ iob1 dev] # lsblk NAME MAY: MIN RM SIZE RO TYPE MOUNTPOINT sda 8: 0 1 1,9G 0 disk └─sda1 8: 1 1 1,9G 0 part mmcblk0 179: 0 0 14,8G 0 disk ├ ─mmcblk0p2 179: 2 0 488M 0 part [SWAP] ├─mmcblk0p3 179: 3 0 13,7G 0 part / └─mmcblk0p1 179: 1 0 668M 0 part / boot [root @ iob1 dev] # mkfs.ext4 -L iob1d / dev / sda1 mke2fs 1.42.9 (28-Dec-2013) File System Label = iob1d OS Type: Linux Block Size = 4096 (log = 2) Fragment Size = 4096 (log = 2) Stride = 0 blocks, stripe width = 0 blocks 122400 inodes, 488704 blocks 24435 blocks (5.00%) reserved for the superuser First data block = 0 Maximum file system blocks = 501219328 15 block groups 32768 blocks per group, 32768 fragments per group 8160 inodes per group Superblock backups stored in blocks: 32768, 98304, 163840, 229376, 294912

Space for group tables is requested: done inode tables are written: done create journal (8192 blocks): done write super blocks and file system accounting information: done

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p / root / rpmbuild / {BUILD, BUILDROOT, RPMS, SOURCES, SPECS, SRPMS}

yum install -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar. gz

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1 make km-rpm

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

cd drbd-9.0.15-1

cd / root / rpmbuild / RPMS / armv7h1

rpm -Uvh drbd-xen * drbd-udev * drbd-pacemaker * drbd-bash-completion * drbd-utils - *. rpm drbd-km - *. rpm drbd-8 *