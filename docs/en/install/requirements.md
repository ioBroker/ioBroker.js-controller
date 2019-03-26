---
title: installation
lastChanged: 13.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/requirements.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: jYPUXpm8ET8LTKs1J7hz/lj9aT42Qcc64vVktdd9Ees=
---
# System requirements
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

@@@ table with RAM, cpu, OS, Node.js, npm, build tools, network, disk space, sd card size @@@

### Reinstallation
| | Variants | Version |
|---|:---------:|:-------:|

** Runtime Environment ** | | Node.js | 32- / 64-bit <br> ppc641e <br> arm v61, armv71, arm64 <br> aix-ppc64, s390x | 8.12.0 ** Package Manager ** | | Node Packet Manager npm | | 6.4.1

ioBroker can be installed on all systems where Node.js is available.

### Existing installations
| | Variants | Version |
|---|:---------:|:-------:|

** Runtime Environment ** | | Node.js | 32- / 64-bit <br> ppc641e <br> arm v61, armv71, arm64 <br> aix-ppc64, s390x | 6.0.0 - 10.10.0 <sup>* 1</sup> ** Package Manager ** | | Node Packet Manager npm | | 3.0.0 - 4.6.1 5.7.1 - 6.4.1

<sup>* 1</sup> The following adapters still have problems with Node.js versions&gt; = 10.0:

- maxcul (because of serialport dependency)
- noolite (because of serialport dependency)
- wetty (because of pty.js dependency)

### Supported Operating Systems
| | Variants |
|---|:---------:|

* Windows * | Windows 7 | 32- / 64-bit Windows Server 2008 R2 | 64-bit / IA64-edition Windows 8 | 32- / 64-bit Windows Server 2012 | 64-bit Windows 8.1 | 32- / 64-bit Windows Server 2012 R2 | 64-bit Windows 10 | 32- / 64-bit Windows Server 2016 | 64-bit * Linux distributions * | Arch and Derivatives | Debian and Derivatives | eg Ubuntu, Bananian, <br> Cubian, Raspbian, Knoppix Gentoo and derivatives | Red Hat and Derivatives | eg Fedora, Pidora, <br> CentOS, Mandriva Slackware and Derivatives | eg openSUSE * Other * | macos | 64-bit Linux From Scratch |