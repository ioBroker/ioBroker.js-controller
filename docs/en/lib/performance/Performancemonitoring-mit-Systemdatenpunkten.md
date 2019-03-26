---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/lib/performance/Performancemonitoring-mit-Systemdatenpunkten.md
title: performance monitoring
hash: 6XZuyxG/P1K8Kb5EzN4iYtT7LNazGydyeGlH+NRvTxE=
---
# Performance monitoring
The starting point for a performance analysis within ioBroker is the object listing in the Admin. There, system information about the host or hosts (ioBroker is multi-host capable) and the individual adapters are provided. This information is accessed by switching the object list to expert mode:

[attachment = 6] 2018-07-14 19_08_43-objects - ioBroker.png [/ attachment]

[b] [u] Host Performance Values [/ u] [/ b]

A host in ioBroker language is a machine that runs an ioBroker js controller process. In a multi-host environment for distributing the load, this can also be several computers. Even the respective operating system may differ. A pretty task for e.g. Raspberry Pi cluster stacks to cope with the 1GB RAM hardware limit.

[attachment = 5] 2018-07-15 17_35_07- (2) .png [/ attachment] [color = # 808080](Jeff Geerling, youtube) [/ color]

The js controller of ioBrokers coordinates the starting and stopping of the adapters and performs additional system management tasks in the background. In the Admin you can find performance values for the respective host computer as well as for the js controller under the ID [i] 'system.host. <Name of the host computer>' [/ i].

Here is a list of the individual key figures and their meaning:

Key figure / data type / unit

[list] [*] [b] alive [/ b] / logic / none [list] Indicates if the ioBroker js controller is active on the host [/ list] [*] [b] diskFree [/ b] / Number / MiB [list] Free space on the logical drive where ioBroker is installed bi = binary multiple (1 MB = 1,000,000 bytes) <(1 MiB = 1,048,576 bytes = 1 × 1024 × 1024 bytes) [ / list] [*] [b] diskSize [/ b] / number / MiB [list] Total logical volume volume on which ioBroker is installed [/ list] [*] [b] diskWarning [/ b] / number /% [list] Here you can enter a percentage. A warning will be displayed in the admin if the free space on the volume falls below this value (for example 20). This is especially useful if the history adapter is active. [Attachment = 4] 2018-07-15 18_44_47-intro - ioBroker.png [/ attachment] [/ list] [*] [b] freemem [/ b] / Number / MB [list] Total available RAM system memory of the host [/ list] [*] [b] inputCount [/ b] / number / / 15s [list] Number of changes in the state values. An input event may e.g. of creating or setting a value [/ list] [*] [b] load [/ b] / number /% [list] Total system load of the CPU, averaged over one second each. Not surprisingly, under Windows, this value is always 0 [/ list] [*] [b] mem [/ b] / number /% [list] memory usage. Free memory to total system memory ratio [/ list] [*] [b] memHeapTotal [/ b] / number / MB [list] size of the heap memory reserved by the js controller [/ list] [*] [b] memHeapUsed [ / b] / number / MB [list] Size of the heap memory used by the js controller [/ list] [*] [b] memRss [/ b] / number / MB [list] Resident set, total size of the js -Controller in RAM memory [/ list] [*] [b] outputCount [/ b] / number / / 15s [list] Output events include actions such as value comparison, writing a value to the states DB, events due to subscriptions or the logging of an adapter to eg To get statements about .connected- or .alive-states. This is how the 8 events that are typically at the event output value in the instance list come about. [/ List] [*] [b] uptime [/ b] / number / s [list] Run time of the ioBroker on this host since the last one Reboot [/ list] [/ list]

The following diagram shows symbolically how heap, code and stack contribute to the total memory usage [b] memRss [/ b] of a nodejs process:

[Attachment = 3] Unbenannt-5.png [/ attachment]

If the master js controller itself provides the object and state database for the entire system, this measure is a great way to tell the difference between 300 and 3000 ioBroker objects in memory usage. For example, on my Windows system this value is 3500 objects and 2700 states are between 75 and 128MB. Greetings in nodejs integrated garbage collection. On the other hand, if I use Redis as the state database, the memory usage for the js controller drops back to 50MB. (Now Redis needs 25MB extra = 75MB again;))

If the number of state changes exceeds the processing capacity of dependent event consumers (e.g., javascript with on: triggers), a queue builds up in the in-memory databases. This can be seen by the memory consumption of the js controller. As soon as the system load drops again and sufficient time is given to event consumers to process the pending value changes, the value of memRss returns to its original value:

[attachment = 2] 2018-07-15 20_26_08.png [/ attachment]

As so often in this environment, one can not make accurate statements about the cause of errors based on fixed values. However, what often helps is the observation of a faultless system (= reference values) and then the comparison [b] of the same system [/ b] under fault conditions. In addition, it is very useful to record the one or the other data point in the histograms, e.g. To capture tendencies and outliers.

[b] [u] Adapters Performance Values [/ u] [/ b]

Each adapter has its own performance metrics. They are each stored under the ID [i] 'system.adapter. <Adapter_name>. <Instance>' [/ i] and are somewhat different from those of the host.

Key figure / data type / unit

[list] [*] [b] alive [/ b] / logic / none [list] Indicates if the adapter is active [/ list] [*] [b] connected [/ b] / logic / none [ list] Indicates whether the adapter has responded within the last 30 seconds [/ list] [*] [b] inputCount [/ b] / number / / 15s [list] Number of changes to the state values. An input event may e.g. of setting or setting a value [/ list] [*] [b] memHeapTotal [/ b] / number / MB [list] Size of the heap memory reserved by the adapter [/ list] [*] [b] memHeapUsed [ / b] / number / MB [list] Size of the heap memory used by the adapter [/ list] [*] [b] memRss [/ b] / number / MB [list] Resident Set, total size of the adapter in RAM use memory [/ list] [*] [b] inputCount [/ b] / number / / 15s [list] Number of changes of the state values. An input event may e.g. from creating or setting a value [/ list] [*] [b] outputCount [/ b] / number / / 15s [list] Output events include actions like value comparison, writing a value to the states DB, events due to subscriptions or the logging of an adapter to eg To get statements about .connected- or .alive-states. This is how the 8 events that are typically in the event output value in the instance list come about. [/ List] [*] [b] uptime [/ b] / number / s [list] Runtime of the adapter since adapter start [/ list] [/ list]

For example, if the Javascript adapter suddenly jumps to several thousand after a script change of 100 [b] inputCount [/ b] events, there is a strong presumption that a trigger loop, i. a ring reference built into his script.

It is also useful to consider [b] memRss [/ b], for Detecting memory leaks through scripts or in adapters. With [b] alive [/ b] and [b] connected [/ b] you can visually visualize the status of the adapter or suppress the display of incorrect data if the adapter can not provide new values.

[u] [b] Outlook and Question [/ b] [/ u]

As I just show a picture as a look into the future (and in my development environment):

[attachment = 1] 2018-07-14 19_08_43-o1.png [/ attachment]

For the adapters I am missing the display of the CPU load [b] cpu [/ b] caused by the individual adapter. After all, you want to know even without resource-hungry installation of additional monitoring adapter, who is the culprit in the system. After nodejs is single-threated, the display here refers to a CPU core. More than 100% is not here.

The use of CPUs with multiple cores does not help if an adapter shows constantly high values. Only a faster CPU (popularly higher clock), an optimization of the program code or the distribution of the load on several adapters (if possible) are expedient in this case.

The key figure [b] cputime [/ b] lets you evaluate the sum of the processor time used by the adapter since startup. It provides information about the frequency or intensity (keyword intensive), with which a program claims the processor. This sum is practically always lower than the entire runtime of the adapter [b] uptime [/ b], since the adapter sends hardly ever orders to the processor even with intensive use.

Here you can see nicely how the various key figures and how the reaction of Javascript adapter to a sudden wave of demands in Flot looks like:

[attachment = 0] 2018-07-15 21_22_11-Flot Edit.png [/ attachment]

Incidentally, the Javascript adapter was already so busy that he could no longer accept all events immediately. It formed an event queue.