---
title:       "Installation"
lastChanged: "13.09.2018"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/install/requirements.md"
---

# Systemanforderungen

?> ***Dies ist ein Platzhalter***.
   <br><br>
   Hilf mit bei ioBroker und erweitere diesen Artikel.  
   Bitte beachte den [ioBroker Style Guide](community/styleguidedoc), 
   damit die Änderungen einfacher übernommen werden können.

@@@ Tabelle mit RAM, CPU, OS, Node.js, npm, build-tools, Netzwerk,
Plattenplatz, SD-Kartengröße @@@


### Neuinstallation

|   | Varianten | Version |
|---|:---------:|:-------:|
**Laufzeitumgebung** | | 
&emsp;Node.js | 32-/64-bit<br>ppc641e<br>arm v61, armv71, arm64<br>aix-ppc64, s390x | 8.12.0
**Paket Manager** | |
&emsp;Node Packet Manager npm  |                 | 6.4.1

ioBroker kann auf alle Systeme installiert werden, auf denen Node.js zur
Verfügung steht.


### Bestehende Installationen

|   | Varianten | Version |
|---|:---------:|:-------:|
**Laufzeitumgebung** | | 
&emsp;Node.js | 32-/64-bit<br>ppc641e<br>arm v61, armv71, arm64<br>aix-ppc64, s390x | 6.0.0 - 10.10.0<sup>*1</sup>
**Paket Manager** | |
&emsp;Node Packet Manager npm  |                 | 3.0.0 - 4.6.1  5.7.1 - 6.4.1

<sup>*1</sup>Die folgenden Adapter haben noch Probleme mit Node.js-Versionen >= 10.0:
- maxcul (wegen serialport-Abhängigkeit)
- noolite (wegen serialport-Abhängigkeit)
- wetty (wegen pty.js-Abhängigkeit)


### Unterstützte Betriebssysteme
|   | Varianten | 
|---|:---------:|
&emsp;*Windows* |
&emsp;&emsp;Windows 7 | 32-/64-bit
&emsp;&emsp;Windows Server 2008 R2 | 64-bit/IA64-edition
&emsp;&emsp;Windows 8 | 32-/64-bit
&emsp;&emsp;Windows Server 2012 |  64-bit
&emsp;&emsp;Windows 8.1 | 32-/64-bit
&emsp;&emsp;Windows Server 2012 R2 | 64-bit
&emsp;&emsp;Windows 10 | 32-/64-bit
&emsp;&emsp;Windows Server 2016 | 64-bit
*&emsp;Linux-Distributionen* |
&emsp;&emsp;Arch und Derivate |
&emsp;&emsp;Debian und Derivate | z.B. Ubuntu, Bananian, <br>Cubian, Raspbian, Knoppix
&emsp;&emsp;Gentoo und Derivate |
&emsp;&emsp;Red-Hat und Derivate | z.B. Fedora, Pidora, <br>CentOS, Mandriva
&emsp;&emsp;Slackware und Derivate | z.B. openSUSE
&emsp;*Andere* |
&emsp;&emsp;macOS | 64-bit
&emsp;&emsp;Linux From Scratch |
