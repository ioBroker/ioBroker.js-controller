
## Description

Adapter** History** is used for archiving the values in the JSON format as text files. The data writing happens in two stages: first, the information is accumulated in the RAM, later it is written to file (when the maximum amount of savings is reached. It can be configured.)

##   **Information**


## Setting up

Setup is carried out through the folder **Adapter **on the administration page<span style="text-decoration: underline;">.</span> In a **Storage **group we find the line called **History** andpress the plus button in this line to the right. The driver installation window will appear on the screen. At the end of installation it will be closed automatically. If we succeed, in the tab **Instances we can find **the line **history.o**with installed adapter instance. To start the instance just press the start(play) button. If a adapter is started, after the system reboot it starts automatically. [![](img/History-setting1.jpg)](img/History-setting1.jpg)

##   Settings

![History adapter settings](http://www.iobroker.net/wp-content/uploads//History-adapter-settings.png) **File path.** If we leave an empty field, driver will be saving data in the directory /iobroker-data/history in the program directory(in Linux by default /opt/iobroker). We can write our value, then the path will be absolute, for example. We can write our values, so the path will be absolute, for example /mnt/history(Linux) or D:/History(Windows). When a number of events in (RAM) exceeds the limit(look at settings below), then in catalogue adapter will create a folder with a current date in a format  **YYYYMMDD** (if it doesn't exist). In this folder for every archived value the file named _history_ is created.[variable name].json. Settings **Save the event confirmation** and **Save the source of the events** adds to object JSON data "ack":_true/false & "from": "variable name". _This information can be used while working with historic driver data from other adapters or scripts. Setting up a **number of events in RAM,** as it had been mentioned above, allows to use the buffer in RAM. If the system of keeping data on flash-memory(for example the system is installed on Raspberry Pi) or Cubiboard, where OS & other data is kept on Memory card MicroSD), it can increase the card duration. Also, we should not forget in case of restoration of OS data, the buffer data will be lost forever. **Minimal Interval** (in ms )- minimal interval of saving data. **The Time of keeping in the database-**time of keeping data in files JSON, old data are erased. In order to check if new data is added in a file JSON, we can set up archiving of varibales. For example, let us consider the  work values of host ioBroker(CPU load, memory etc.) To do this in the tab **Objects** in the left top corner we press the button **Toggle expert mode, **in the table we look for a group **system.host.host_name,** ![Adapter History (en) system host](http://www.iobroker.net/wp-content/uploads//Adapter-History-en-system-host-1024x281.png) open the list and configure history savings for the chosen elements(the right button in the line):

*   tick **active** in a group **Settings for history.o**
*   other settings can be left as default
*   Press the button **Save**

  ![Adapter History (en) history load](http://www.iobroker.net/wp-content/uploads//Adapter-History-en-history-load-1024x249.png) ![Adapter History (en) states settings](http://www.iobroker.net/wp-content/uploads//Adapter-History-en-states-settings-1.png) Some time later one can open the same setting of a variable(for example **system.host.vm32test.load**) and go to tab **Table-**there you can see the archieved values of files JSON. Apparently, one has to wait a bit longer, so the information into file is written from the buffer into RAM during filling in (as it is shown above) ![Adapter History (en) states table](http://www.iobroker.net/wp-content/uploads//Adapter-History-en-states-table-1.png) One can enter the directory of saved files in driver History and look through the content of files JSON. [![](http://www.iobroker.net/wp-content/uploads//History-use4.jpg)](http://www.iobroker.net/wp-content/uploads//History-use4.jpg) [![](img/History-use5.jpg)](img/History-use5.jpg)

##  Usage

### <span id="i-6"> User queries</span>

Saved values can be accessed from Javascript driver or a script. For example, the following code, using which we can request the list of events during an hour: `// show the variable value  "system.adapter.admin.0.memRss" for the last hour` `var end = new Date().getTime();` `sendTo('history.0', 'getHistory', {` `  id: 'system.adapter.admin.0.memRss',` `  options: {` `    start: end - 3600000,` `    end: end,` `    aggregate: 'onchange'` `  }` `}, function (result) {` `  for (var i = 0; i < result.result.length; i++) {` `    console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());` `  }` `});` Or the latest 50 events: `// Give 50 latest values of variables` `sendTo('history.0', 'getHistory', {` `  id: '*',` `  options: {` `    end: new Date().getTime(),` `    count: 50,` `    aggregate: 'onchange'` `  }` `}, function (result) {` `  for (var i = 0; i < result.result.length; i++) {` `    console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());` `  }` `});` In request we can use the following options:

*   **start** - (optional) time in ms - `new Date().getTime()`
*   **end** - (optional)  time in ms - `new Date().getTime()`, as default (now + 5000 seconds)
*   **step** - (optional) is used for combining (m4, max, min, average, total) data from intervals
*   **count** - number of values,  if used as unifying data "through changing"  or a number of intervals, if there is another way of combinging
*   **from** - if the field _from_ must be included into an answer
*   **ack** - if a field _ack_ must be included into an answer
*   **q** - if the field _q_ must be included into an answer
*   **addId** - if the field _id_ must be included into answer
*   **limit** -  doesn't return savings more than a set up limit
*   **ignoreNull** - if zero values must include (false), change into last, not a zero value (true) or change into (0)
*   **aggregate** - method of joining:
    *   _minmax_- Use of the following algorithm. Joining of the entire range of values into short intervals by the time and for each interval minimal, maximum, beginning or end values are found
    *   _max_ - Joining the entire range of meanings into short intervals by time and for each interval a maximum value is used (null is ignored)
    *   _min_ - Similar method as max, for each interval the minimal values are found ,
    *   _average_ - The same method as max, for each interval the average values are found,
    *   _total_ - The same method as max, only for each interval the common values are found,
    *   _count_ - The same methos  max, only for each interval the number if values is found(nulls take part in calculations)

### <span id="i-7"> Graphic presentation of history data</span>

In the OS there are drivers, which can show charts of changing the values from time on the screen, considering the values in Database. For example, driver [Flot](http://www.iobroker.net/?page_id=4034&lang=ru)- allows a flexible tuning and showing of graphic information, draw some temporary shows on one page and <span style="text-decoration: underline;">insert</span> the graphics in iframe driver of VIS visualisation. ![Flot Edit](http://www.iobroker.net/wp-content/uploads//Flot-Edit-1024x500.png) [![](img/History-use6.jpg)](img/History-use6.jpg)