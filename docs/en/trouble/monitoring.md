---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/monitoring.md
title: performance monitoring
hash: f9k8uTEaRQI9WucjkJjFqbIX8d32IdLTh8VwMNiVFIk=
---
# Performance monitoring
The starting point for a performance analysis within ioBroker is the object listing in the admin.
It provides system information about the host or hosts (ioBroker is multi-host capable) and the individual adapters. This information is accessed by switching the object list to expert mode:

![Objects](../../de/trouble/media/monitoring1.png)

## Performance values of hosts
A host in ioBroker language is a machine that runs an ioBroker js controller process.
In a multi-host environment for distributing the load, this can also be several computers.
Even the respective operating system may differ.
A nice task for e.g. Raspberry Pi cluster stacks to cope with the 1GB RAM hardware limit.

![Jeff Geerling, youtube](../../de/trouble/media/monitoring2.png)

The js controller of ioBrokers coordinates the starting and stopping of the adapters and performs additional system management tasks in the background. In the Admin, performance values can be found for the respective host computer and the js controller under the ID `system.host.<Name_des_Hostrechners>`.

Here is a list of the individual key figures and their meaning:

| Key figure | Data type | Unit | Description |
|----------|----------|---------|--------------|
| **alive** | Logic | no | Indicates if the ioBroker js controller is active on the host |
| **disk free** | Number | MiB | Free space on the logical drive where ioBroker is installed *bi = binary multiple (1 MB = 1,000,000 bytes) <(1 MiB = 1,048,576 bytes = 1 × 1024 × 1024 bytes)* |
| **disk size** | Number | MiB | Total size of the logical volume where ioBroker is installed |
| **diskWarning** | Number | % | Here you can enter a percentage. A warning will be displayed in the admin if the free space on the volume falls below this value (for example 20). This is especially useful if the history adapter is active. ![Screen](../../de/trouble/media/monitoring3.png) |
| **freemem** | Number | MB | Total Host Available RAM System Memory |
| **inputCount** | Number | / 15s | Number of changes in the state values. An input event may e.g. by creating or setting a value |
| **load** | Number | % | Total system load of the CPU, averaged over one second each. Do not be surprised, under Windows this value is always 0 |
| **mem** | Number | % | Memory usage. Relationship between free memory and total system memory |
| **memHeapTotal** | Number | MB | Size of the heap memory reserved by the js controller |
| **memHeapUsed** | Number | MB | Size of the heap memory used by the js controller |
| **memRss** | Number | MB | Resident Set, total size of memory used by the js controller in RAM |
| **outputCount** | Number | / 15s | Output events include actions such as value comparison, writing a value to the states DB, events due to subscriptions, or logging an adapter at, e.g. To get statements about .connected | or .alive-states. So also the 8 events come about, which are typically at the event output value in the instance list. |
| **uptime** | Number | s | Run time of the ioBroker on this host since the last reboot |

The following diagram shows symbolically how heap, code and stack contribute to the total memory usage **memRss** of a nodejs process:

![Screen](../../de/trouble/media/monitoring4.png)

If the master js controller itself provides the object and state database for the entire system, this measure is a great way to tell the difference between 300 and 3000 ioBroker objects in memory usage. For example, on my Windows system this value is 3500 objects and 2700 states are between 75 and 128MB. Greetings in nodejs integrated garbage collection.
On the other hand, if I use Redis as the state database, the memory usage for the js controller drops back to 50MB.
(Now Redis needs 25MB extra = 75MB again;))

If the number of state changes exceeds the processing capacity of dependent event consumers (e.g., javascript with on: triggers), a queue builds up in the in-memory databases.
This can be seen by the memory consumption of the js controller. As soon as the system load drops again and sufficient time is given to event consumers to process the pending value changes, the value of memRss returns to its original value:

![Screen](../../de/trouble/media/monitoring5.png)

As so often in this environment, one can not make accurate statements about the cause of errors based on fixed values.
However, what often helps is the observation of a faultless system (= reference values) and then the comparison **of the same system** under fault conditions. In addition, it is very useful to record the one or the other data point in the histograms, e.g. To capture tendencies and outliers.

## Performance values of adapters
Each adapter has its own performance metrics.
They are stored under the ID `system.adapter.<Name_des_Adapters>.<Instanz>` and differ slightly from those of the host.

| Key figure | Data type | Unit | Description |
|----------|----------|---------|--------------|
| **alive** | Logic | no | Indicates whether the adapter is active |
| **connected** | Logic | no | Indicates if the adapter has reported within the last 30 seconds |
| **inputCount** | Number | / 15s | Number of changes in the state values. An input event may e.g. by creating or setting a value |
| **memHeapTotal** | Number | MB | Size of the heap memory reserved by the adapter |
| **memHeapUsed** | Number | MB | Size of heap memory used by adapter |
| **memRss** | Number | MB | Resident Set, total size of memory used by adapter in RAM |
| **inputCount** | Number | / 15s | Number of changes to the state values. An input event may e.g. of creating or setting a value |
| **outputCount** | Number | / 15s | Output events include actions such as value comparison, writing a value to the states DB, events due to subscriptions, or logging an adapter at, e.g. To get statements about .connected- or .alive-states. So also the 8 events come about, which are typically at the event output value in the instance list. |
| **uptime** | Number | s | Runtime of the adapter since adapter start |

For example, if the Javascript adapter suddenly jumps to several thousand after a script change of 100 **inputCount** events, there is a strong presumption that a trigger loop, i. a ring reference built into his script.

It is also useful to consider **memRss** to Detecting memory leaks through scripts or in adapters. With **alive** and **connected** you can visually visualize the status of the adapter or suppress the display of incorrect data if the adapter can not provide new values.

## Outlook and question
As I just show a picture as a look into the future (and in my development environment):

![Screen](../../de/trouble/media/monitoring6.png)

The adapters I miss the display of the individual adapter cause CPU load **cpu** After all, you want to know even without resource-hungry installation of additional monitoring adapter, who is the culprit in the system. After nodejs is single-threated, the display here refers to a CPU core. More than 100% is not here.

The use of CPUs with multiple cores does not help if an adapter shows constantly high values.
Only a faster CPU (popularly higher clock), an optimization of the program code or the distribution of the load on several adapters (if possible) are expedient in this case.

The code **cputime** lets you evaluate the total amount of processor time used by the adapter since startup.
It provides information about the frequency or intensity (keyword intensive), with which a program claims the processor.
This sum is practically always lower than the entire runtime of the adapter **uptime** since the adapter sends hardly ever orders to the processor even with intensive use.

Here you can see nicely how the various key figures and how the reaction of Javascript adapter to a sudden wave of demands in Flot looks like:

![Screen](../../de/trouble/media/monitoring7.png)

Incidentally, the Javascript adapter was already so busy that he could no longer accept all events immediately.
It formed an event queue.

In order for us to learn a bit more about the load of the <u>host</u> and especially about the master of all adapters, the js-controller, I have also provided some performance counters for this. The following statement shows a possible future look of the host performance counter.

As stated, this is subject to the examination by Bluefox and at the earliest only from js controller 1.5.x:

![Screen](../../de/trouble/media/monitoring8.png)

To summarize the meaning of the data points:

| Key figure | Data type | Unit | Data source | Description |
|----------|----------|---------|-------------|--------------|
| **alive** | Logic | no | js-controller | Indicates if the ioBroker js controller is active on the host. Automatically changes to false | 25 seconds after death  |
| **cpu** | Number | % Utilization of a core | js-controller | Specifies the utilization of the core on which the js controller is running. Much more than 100% does not work here, because nodejs is single-threaded |
| **cputime** | Number | s | js-controller | The processor time (English CPU time) denotes the measured time in seconds, in which the js controller has actually sent commands to the processor since the last program start. This amount is practically always lower than the total runtime (uptime) of the program, since it sends hardly ever orders to the processor even with intensive use. |
| **disk free** | Number | MiB | | Free space on the logical drive where ioBroker is installed *bi = binary multiple (1 MB = 1,000,000 bytes) <(1 MiB = 1,048,576 bytes = 1 × 1024 × 1024 bytes)* |
| **disk size** | Number | MiB | | Total size of the logical volume where ioBroker is installed |
| **diskWarning** | Number | % | | Here you can enter a percentage. A warning will be displayed in the admin if the free space on the volume falls below this value (for example 20). This is especially useful if the history adapter is active. ![Screen](../../de/trouble/media|monitoring9.png) |
| **freemem** | Number | MB | | Total Host Available RAM System Memory |
| **inputCount** | Number | / 15s | js-controller | Number of changes in the state values. An input event may e.g. by creating or setting a value |
| **load** | Number | | | Total system load across all CPU cores, averaged over one second each. For example, Calculator with 8 CPU cores -> value 7.9 = system almost overloaded, 0.1 = nothing going on; 4 cores -> value 3.9 = overload - if permanent, 0.1 = nothing going on |
| **mem** | Number | % | | Memory usage. Relationship between free memory and total system memory |
| **memHeapTotal** | Number | MB | js-controller | Size of the heap memory reserved by the js-controller |
| **memHeapUsed** | Number | MB | js-controller | Size of the heap memory used by the js-controller |
| **memRss** | Number | MB | js-controller | Resident Set, total size of the memory used by the js controller in RAM |
| **outputCount** | Number | / 15s | js-controller | Output events include actions such as value comparison, writing a value to the states DB, events due to subscriptions, or logging. So here too the 10+ events come about |
| **memAvailable** | Number | MB | js-controller | (On * nix systems only) Available free space for new storage requirements without the system having to begin offloading used storage. Calculated from MemFree, Active (file), Inactive (file), SReclaimable and the lower thresholds from `/proc/zoneinfo`. <br> See [https://git.kernel.org](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773) |
| **memAvailable** | Number | MB | js-controller | (On * nix systems only) Available free space for new storage requirements without the system having to begin offloading used storage. Calculated from MemFree, Active (file), Inactive (file), SReclaimable and the lower thresholds from `/ proc / zoneinfo`. <br> See [https://git.kernel.org] (https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=34e431b0ae398fc54ea69ff85ec700722c9da773) |