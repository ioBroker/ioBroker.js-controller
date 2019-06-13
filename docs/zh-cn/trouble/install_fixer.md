---
title: ioBroker安装修复程序
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/trouble/install_fixer.md
hash: tHDEojwxIw6xJmU1S4wqOljPM1nQ4+ZV1CNRLe9Mxqc=
---
＃修复ioBroker安装用户权限的问题
安装修复程序解决了ioBroker安装的用户权限问题。
在2018年底，特别是2019年1月，@ AlCalzone彻底改造了ioBroker安装程序，这意味着在2019年2月的当前版本中，所有权利问题都已成为过去。 ioBroker不再以“root”身份运行，而是以其自己的用户身份运行，他们可以为当前的ioBroker适配器做任何他需要的事情。
所有新装置都可以。

但是，如果有人早些时候安装了ioBroker怎么办？他仍然以root身份运行？或者在新安装例程的最初几天？ **再次，我们有一个解决方案，感谢@AlCalzone：安装修复程序**

通过命令，/ opt / iobroker中的现有安装将升级到与当前新安装相同的级别。该脚本可以在将来反复使用，以便在这方面更新安装。
重要说明：此脚本不更新nodejs，npm，也不更新js-controller或任何适配器。只有系统权利u.a.正在编辑。
尝试并在[话题](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)中提供反馈

！> [请注意]：Docker下的应用程序不应该是必需的，因为无论如何一切都以root身份运行，我们目前建议不要使用应用程序缺乏明确的经验和反馈。如果有人想尝试并提供反馈：申请完全由您自己承担风险。一定要备份并知道你在做什么！

请注意此主题中的FAQ帖子！

要执行的脚本由GitHub加载，与安装程序一样，因此它始终是最新的。命令是：

```
curl -sL https://iobroker.net/fix.sh | bash -
```

##常见问题
**我是否必须使用修复程序？**我们建议更新安装，以便使用修复程序。所以你有一个我们也可以支持的安装，如果有问题。使用npm 5及更高版本时，使用root或sudo以及新安装程序时遇到的问题越来越多，基于Linux的系统的修复程序也考虑到了这一点，并试图阻止这些问题。安全方面不可忽视。

**我在哪里可以看到修复程序的作用？**我们尝试使安装程序和修复程序保持最新状态。
两者都有更改日志。
[安装程序](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md)[定影液](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md)否则，如果您对shell编程有所了解，请直接查看脚本:-)

**哪个用户最好执行修复程序？**实际上并不重要。最好以普通用户的身份进行，然后您可以使用它。

**哪个目录的修复程序执行得最好？**没关系。当前的修复程序（2019-02-21）需要在/ opt / iobroker中安装

**修复程序适用于哪些操作系统？**适用于所有基于Linux的系统。 Windows不在此处。

**修复程序究竟做了什么？**修复程序创建了一个ioBroker用户，为该用户正确设置了文件和目录权限，以及一些sudo权限以及无需root用ioBroker和npm工作所需的一切。

**当有更新时，修复程序可以多次执行吗？**是的，这显然是为了与安装程序的进一步开发保持同步。

**是否存在应另外执行修复程序的特殊情况？**修复程序在使用redis和backitup时也会处理特殊权限。如果已在应用程序中安装Redis，则会自动正确设置所有内容。如果稍后安装Redis，Fixer也会正确安装。

**安装修理程序是否也可以在Docker下使用？**仍然缺乏经验，结果非常复杂。因此，我们目前建议不要使用，也因为容器中的所有内容通常以root身份运行，因此无论如何都不相关。如果您仍然喜欢并希望提供反馈：在Docker中使用需要您自担风险，并且无需备份和了解您的工作！

**如果我不确定什么是错的，我该怎么办？**您可以事先复制ioBroker目录，除了权限之外什么也没有。