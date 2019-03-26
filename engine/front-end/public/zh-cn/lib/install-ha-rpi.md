---
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/lib/install-ha-rpi.md
title: passwd hacluster
hash: MjjI23qSH6M8YRKL+JWxHZIbxco0oSiyyyai+mUP1wY=
---

#
##
###来源
http://www.c是另一种浏

2018年6月27日 -  raspbian  - 拉伸 -  lite.img

### Etcher
https://etcher.io/

在分区`boot`中创建文件`ssh`。

### Putty
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html https://the.earth.li/~sgtatham/putty/latest/w64/putty-64bit-0.70-installer.msi

##连接
Call Putty用户：pi paswoort raspberry raspberrypi in putty

sudo passwd root sudo nano / etc / ssh / sshd_config搜索PermitRootLogin并将其更改为yes，删除＃您可以使用此命令以root身份再次以root身份撤消登录sudo passwd -l root su

apt update apt升级

Raspi-配置

2网络选项hostname wifi country设置为DE输入SSID输入密码

4 I1更改区域设置en_GB.UTF-8 UTF-8要选择的空格键

7高级选项A1扩展文件系统

reboot欢迎使用fdisk（util-linux 2.29.2）。
只有在您决定编写它们之前，更改才会保留在内存中。
使用write命令前要小心。

命令（m代表帮助）：磁盘/ dev / mmcblk0：14.9 GiB，15931539456字节，31116288扇区：扇区1 * 512 = 512字节扇区大小（逻辑/物理）：512字节/ 512字节I / O大小（最小/ optimal）：512字节/ 512字节Disklabel类型：dos磁盘标识符：0x8e9e2675

设备引导开始结束扇区大小ID类型/ dev / mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32（LBA）/ dev / mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

命令（m表示帮助）：分区号（1,2，默认值2）：分区2已被删除。

命令（m for help）：分区类型p primary（1主，0扩展，3 free）e扩展（逻辑分区容器）：分区号（2-4，默认2）：第一扇区（2048） -31116287，默认值2048）：加载扇区，+扇区或+大小{K，M，G，T，P}（98304-31116287，默认31116287）：创建一个类型为“Linux”且大小为14.8 GiB的新分区2 ，
分区＃2包含ext4签名。

命令（m代表帮助）：磁盘/ dev / mmcblk0：14.9 GiB，15931539456字节，31116288扇区：扇区1 * 512 = 512字节扇区大小（逻辑/物理）：512字节/ 512字节I / O大小（最小/ optimal）：512字节/ 512字节Disklabel类型：dos磁盘标识符：0x8e9e2675

设备引导开始结束扇区大小ID类型/ dev / mmcblk0p1 8192 96663 88472 43.2M c W95 FAT32（LBA）/ dev / mmcblk0p2 98304 31116287 31017984 14.8G 83 Linux

命令（m for help）：分区表已更改。
调用ioctl（）重新读取分区表。
重新读取分区表失败。：设备或资源繁忙

内核仍然使用旧表。新表将在下次重新启动时或在您运行部分排练（8）或kpartx（8）之后使用。

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
CentOS的

https://unix.stackexchange.com/questions/370318/how-to-connect-to-wifi-in-centos-7clino-gui yum install NetworkManager-tui nmtui

localectl set-locale LANG = en_US.utf8 yum update -y / usr / bin / rootfs-expand

ssh -l root iob1

timedatectl set-timezone欧洲/柏林

setenforce 0 sed -i.bak“s / SELINUX = enforcing / SELINUX = permissive / g”/ etc / selinux / config systemctl mask firewalld.service systemctl stop firewalld.service iptables --flush

#passwd hacluster
更改用户hacluster的密码。
新密码：重新输入新密码：passwd：所有身份验证令牌已成功更新。

[root @ iob1~] #pcs cluster auth iob1 iob2用户名：hacluster密码：iob2：授权iob1：授权[root @ iob1~] #pcs cluster setup -name iobrokerc iob1 iob2在节点上销毁集群：iob1，iob2 ......
iob2：停止集群（起搏器）......
iob1：停止集群（起搏器）......
iob2：成功销毁集群iob1：成功销毁集群

将'pacemaker_remote authkey'发送到'iob1'，'iob2'iob1：成功分发文件'pacemaker_remote authkey'iob2：成功分发文件'pacemaker_remote authkey'将群集配置文件发送到节点...
iob1：成功iob2：成功

在节点iob1，iob2上同步pcsd证书...
iob2：成功iob1：成功在节点上恢复pcsd以重新加载证书...
iob2：成功iob1：成功

[root @ iob1~] #pcs cluster start --all iob1：启动集群...
iob2：启动集群......

[root @ iob1~] #corosync-cfgtool -s打印环状态。
本地节点ID 1 RING ID 0 id = 192.168.179.54 status = ring 0激活且无故障[root @ iob1~]＃corosync-cmapctl | grep成员runtime.totem.pg.mrp.srp.members.1.config_version（u64）= 0 runtime.totem.pg.mrp.srp.members.1.ip（str）= r（0）ip（192.168.179.54 ）runtime.totem.pg.mrp.srp.members.1.join_count（u32）= 1 runtime.totem.pg.mrp.srp.members.1.status（str）= joined runtime.totem.pg.mrp.srp .members.2.config_version（u64）= 0 runtime.totem.pg.mrp.srp.members.2.ip（str）= r（0）ip（192.168.179.63）runtime.totem.pg.mrp.srp。 members.2.join_count（u32）= 1 runtime.totem.pg.mrp.srp.members.2.status（str）= join [root @ iob1~] #pcs status corosync

会员信息---------------------- Nodeid投票名称1 1 iob1（本地）2 1 iob2

[root @ iob1~] #pcs status群集名称：iobrokerc警告：没有stonith设备和stonith-enabled不是false Stack：corosync当前DC：iob2（版本1.1.18-11.el7_5.3-2b07d5c5a9） - 具有仲裁的分区最后更新时间：8月24日星期五12:18:14 2018最后修改：8月24日星期五12:15:30 2018 by hacluster via crmd on iob2

2个节点配置了0个资源配置

在线：[iob1 iob2]

没有资源

守护程序状态：corosync：活动/禁用起搏器：活动/禁用pcsd：活动/启用

[root @ iob1~] #crm_verify -L -V error：unpack_resources：资源启动被禁用，因为没有定义STONITH资源错误：unpack_resources：使用stonith-enabled选项错误配置一些或禁用STONITH：unpack_resources：注意：具有共享数据的群集需要STONITH以确保数据完整性在检查期间发现错误：config无效

[root @ iob1~] #pcs property set stonith-enabled = false

[root @ iob1~] #crm_verify -L -V

yum安装哪个

[root @ iob1~] #pcs resource create ClusterIP ocf：heartbeat：IPaddr2 \> ip = 192.168.179.160 cidr_netmask = 32 op monitor interval = 30s

[root @ iob1~] #pcs status群集名称：iobrokerc堆栈：corosync当前DC：iob2（版本1.1.18-11.el7_5.3-2b07d5c5a9） - 具有法定人数的分区上次更新时间：2008年8月24日星期五12:26:57最后更改：8月24日星期五12:23:51 2018 by root via cibadmin on iob1

2个节点配置1个资源配置

在线：[iob1 iob2]

完整资源清单：

 ClusterIP（ocf :: heartbeat：IPaddr2）：已停止

失败的行动：

* iob2上的ClusterIP_monitor_0'未安装'（5）：call = 5，status = complete，exitreason ='设置问题：找不到命令：ip'，

    last-rc-change =''星期五8月24日12:23:52 2018'，排队= 0ms，exec = 192ms

* iob1上的ClusterIP_monitor_0'未安装'（5）：call = 5，status = complete，exitreason ='安装问题：找不到命令：ip'，

    last-rc-change =''星期五8月24日12:23:52 2018'，排队= 0ms，exec = 194ms

守护程序状态：corosync：活动/禁用起搏器：活动/禁用pcsd：活动/启用

[root @ iob1~] #pcs resource defaults resource-stickiness = 100警告：默认值不适用于使用自己定义的值覆盖它们的资源[root @ iob1~] #pcs resource defaults resource-stickiness：100

yum install git python gcc-c ++ make

https://stackoverflow.com/questions/48320850/installing-epel-repository-on-centos-7-breaks-yum-functionality cat> /etc/yum.repos.d/epel.repo << EOF [epel] name = Epel重建为armhfp baseurl = https：//armv7.dev.centos.org/repodir/epel-pass-1/ enabled = 1 gpgcheck = 0

EOF

[root @ iob1 7] #yum install nodejs npm npm install -g npm @ 4

[root @ iob1 npm] #node -v v6.14.3 [root @ iob1 npm] #npm -v 3.10.10

https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux [root @ iob1 dev] #yum install parted插件已加载：fastermirror从缓存加载镜像速度hostfile包parted-3.1-29.el7.armv7hl已安装在最新版本中。
无事可做[root @ iob1 dev] #parted -l | grep错误[root @ iob1 dev] #parted / dev / sda mclabel gpt警告：将删除现有分区表和/ dev / sda上的所有数据。你想继续吗？是/是/否/否？是信息：您可能需要调整/ etc / fstab。

[root @ iob1 dev] #parted -a opt / dev / sda mkpart primary ext4 0％100％信息：您可能需要自定义/ etc / fstab。

[root @ iob1 dev] #lsblk NAME MAY：MIN RM SIZE RO TYPE MOUNTPOINT sda 8：0 1 1,9G 0disk└─sda18：1 1 1,9G 0 part mmcblk0 179：0 0 14,8G 0disk├ ─mmcblk0p2179：2 0 488M 0 part [SWAP]├─mmcblk0p3179：3 0 13,7G 0 part /└─mmcblk0p1179：1 0 668M 0 part / boot [root @ iob1 dev] #mkfs.ext4 -L iob1d / dev / sda1 mke2fs 1.42.9（28-Dec-2013）文件系统标签= iob1d操作系统类型：Linux块大小= 4096（log = 2）片段大小= 4096（log = 2）Stride = 0块，条带宽度= 0块122400 inode，488704块24435块（5.00％）为超级用户保留第一个数据块= 0最大文件系统块= 501219328 15个块组每组32768个块，每组32768个片段每组8160个inode超级块备份存储在块中：32768， 98304,163840,229376,294912

请求组表的空间：写入完成的inode表：完成创建日志（8192块）：完成写入超级块和文件系统记帐信息：完成

https://www.howtoforge.com/tutorial/how-to-install-and-setup-drbd-on-centos-6/ yum -y install gcc make automake autoconf libxslt libxslt-devel flex rpm-build kernel-devel

mkdir -p / root / rpmbuild / {BUILD，BUILDROOT，RPMS，SOURCES，SPECS，SRPMS}

yum install -y wget

wget http://oss.linbit.com/drbd/utils/drbd-utils-9.5.0.tar.gz http://oss.linbit.com/drbd/9.0/drbd-9.0.15-1.tar。 GZ

wget http://www.linbit.com/downloads/drbd/8.4/drbd-8.4.11-1.tar.gz tar -zxvf drbd-8.4.11-1.tar.gz cd drbd-8.4.11-1使km-rpm

tar -zxvf drbd-9.0.15-1.tar.gz tar -zxvf drbd-utils-9.5.0.tar.gz

cd drbd-9.0.15-1

cd / root / rpmbuild / RPMS / armv7h1

rpm -Uvh drbd-xen * drbd-udev * drbd-pacemaker * drbd-bash-completion * drbd-utils  -  * .rpm drbd-km  -  * .rpm drbd-8 *