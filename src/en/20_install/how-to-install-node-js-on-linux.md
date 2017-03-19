Sometimes the node.js version does not suit to the required one or there is no any node.js at all. First of all we should find the type of processor. There possible types of CPUs:

*   armv6l
*   armv7l
*   arm64
*   ppc64
*   ppc64le
*   x64
*   x86

For all these CPU types there is a precompiled binary package. To find the type of CPU write `cat /proc/cpuinfo` You will get something like this (example for ODROID):

<pre>processor : 0
model name : **ARMv7 Processor rev 0 (v7l)**
BogoMIPS : 3394.86
Features : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls
CPU implementer : 0x41
CPU architecture: 7
CPU variant : 0x3
CPU part : 0xc09
CPU revision : 0

processor : 1
model name : **ARMv7 Processor rev 0 (v7l)**
BogoMIPS : 3394.86
Features : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls
CPU implementer : 0x41
CPU architecture: 7
CPU variant : 0x3
CPU part : 0xc09
CPU revision : 0

processor : 2
model name : **ARMv7 Processor rev 0 (v7l)**
BogoMIPS : 3394.86
Features : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls
CPU implementer : 0x41
CPU architecture: 7
CPU variant : 0x3
CPU part : 0xc09
CPU revision : 0

processor : 3
model name : **ARMv7 Processor rev 0 (v7l)**
BogoMIPS : 3394.86
Features : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls
CPU implementer : 0x41
CPU architecture: 7
CPU variant : 0x3
CPU part : 0xc09
CPU revision : 0

Hardware : ODROIDU2
Revision : 0000
Serial : 0000000000000000
</pre>

Here from "model name" we can guess, that it is **armv7l**. Now we must find the binary for that. The binary has following name: `https://nodejs.org/dist/v[VERSION]/node-v[VERSION]-linux-[CPU-TYPE].tar.xz` Actually the latest LTS(Long time support) 4 version is 4.6.0. We can check it here: https://nodejs.org/dist/ So the link, what we need is `https://nodejs.org/dist/v4.6.0/node-v4.6.0-linux-armv7l.tar.xz`. And now the installation process. Normally there is no need to uninstall old node.js package, but you can do it: `apt-get --purge remove node apt-get --purge remove nodejs apt-get autoremove reboot` And the installation is: `cd /tmp wget https://nodejs.org/dist/v4.6.0/node-v4.6.0-linux-armv7l.tar.xz -O node.tar.xz cd /usr/local sudo tar --strip-components=1 -xvf /tmp/node.tar.xz` _**Please notice to use your download link in wget command.**_ After installation of node.js the command “node -v” should show the node.js version. if not, create alias to bin file: `sudo ln -s /usr/local/bin/nodejs /usr/bin/node`