# js-controller升级说明

由于ioBroker运行的硬件和平台不同，因此必须手动更新js-controller。可以在适当的部分找到更多详细信息。

## 所有平台的一般信息

**有关从js-controller 1.x到2.x的更新，请始终阅读https://forum.iobroker.net/topic/25692/js-controller-2-0-ab-sofort-im上的信息-最新回购阅读和注意！**

否则，请先更新主从系统，然后再更新主服务器，以更新从服务器！

## Linux/macOS（新安装程序）
这是推荐的选择！

请在SSH Shell（控制台）中执行以下命令：
* `iobroker stop`
* `iobroker update`
* `iobroker upgrade self`
* `iobroker start`或重新启动服务器，然后ioBroker应该重新启动，并且您可以确保所有旧进程都已完成。

如果升级命令显示访问权限错误，则请使用安装修复程序（`curl -sL https://iobroker.net/fix.sh | bash-`）来修复这些问题并升级命令再次运行。

## Linux/macOS（手动安装）

手动安装通常以root用户身份在root用户下进行，因此在命令之前必须有一个“ sudo”。

请在SSH Shell（控制台）中执行以下命令：
* `cd /opt/iobroker`
* `sudo iobroker stop`
* `sudo iobroker update`
* `sudo iobroker upgrade self`
* `sudo iobroker start`或服务器重新启动，然后ioBroker应该重新启动，并且您可以确保所有旧进程都已完成。

如果升级命令显示权限/权限错误，请修复它们。有时，“ sudo”还不够，您必须以真实的根用户身份运行安装程序（以前只是`sudo su -`）。

## Windows

要在Windows上更新ioBroker，请从下载页面https://www.iobroker.net/#zh-cn/download下载具有所需js-controller版本的适当安装程序，然后进行更新。 使用Windows Installer，可以将以前手动安装的服务器或来自其他操作系统的安装迁移到Windows并进行更新。

## Windows（手动安装）

手动安装已获得管理员权限。 请以管理员身份启动cmd.exe命令行窗口（右键单击cmd.exe并以管理员身份执行）并执行以下命令：

* `cd C:\iobroker`（或ioBroker的安装位置）
* `iobroker stop`停止ioBroker服务
* `iobroker status`以检查ioBroker是否已完成
* `iobroker update`
* `iobroker upgrade self`
* 启动ioBroker服务或重新启动计算机，然后ioBroker应该重新启动，并且您可以确保所有旧进程均已完成。

## 紧急Linux / macOS / Windows（手动重新安装，如果更新后不起作用）
在Windows上，请首先在ioBroker实例下的命令行中的“ ioBroker”下调用开始菜单。 然后将自动设置正确的目录。 在Linux或macOS上，请转到ioBroker目录。

在此处运行`npm install iobroker.js-controller`。 可以使用npm install`iobroker.js-controller@x.y.z`安装特定版本（将x.y.z替换为所需版本）。

如果在Linux上运行时访问权限存在问题，则必须对命令进行一些更改：

*对于使用新的Linux安装程序创建的系统：`sudo -u iobroker -H npm install iobroker.js-controller`
*对于在Linux下手动安装的系统，请添加前缀`sudo`或以root身份运行。

仅在极少数情况下才需要这种方式，请事先咨询论坛！
