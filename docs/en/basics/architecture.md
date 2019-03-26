---
title: architecture
lastChanged: 13.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/architecture.md
hash: ulFhDXheOcx69I0tr7ze5s/3oTOcYmUEh4gKobwD7+o=
---
# System structure
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

## Architecture
ioBroker is modular, i. built from many individual components. Each module has a specific task. To keep track, ioBroker therefore has a central coordinator for all its modules. This coordinator is the background working `js-controller`. He is responsible for central data management as well as management and communication between all modules. The modules themselves are called `Adapter`. Adapters are installed by the user only when needed. The web-based administration interface `admin` is itself an adapter. The admin adapter or "admin" for short is the management interface of an ioBroker system. The admin is usually called with the address [http: // localhost: 8081](http://localhost:8081).

When a new adapter is installed with the Admin, the adapter files are first downloaded from the Internet and written to the server disk. If an adapter is to be started, a `Instanz` of the adapter is generated first. Each adapter instance can be individually configured and stopped and started independently with the admin. Therefore, each instance runs in its own process, which communicates in the background with the ioBroker js-controller.

In a `Multihost` system with multiple ioBroker servers, instances of adapters can also be distributed on different servers. As a result, the load can be distributed or additional hardware can be connected directly on site (for example, IO ports, USB).

The communication between adapters, js controllers, databases and web frontends takes place over several TCP / IP connections. The data exchange takes place depending on the selected setting either in plain text or encrypted.

ioBroker and adapters are mainly written in the programming language JavaScript. To run JavaSript you need a corresponding runtime environment. ioBroker therefore uses `Node.js`. This runtime environment is available for various software platforms such as Linux, Windows and macOS. The JavaScript package manager `npm` is used to install ioBroker and the adapters.

@@@ Pretty picture with architectural layers @@@@@@ JS controller explain and transfer to adapters & instances @@@