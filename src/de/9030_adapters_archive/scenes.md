# ioBroker scenes adapter

Der _scenes Adapter_ kann Szenen erstellen und diese im ioBroker Umfeld ausführen.

Mit dem Adapter kann man zwei Arten von Szenen erstellen:

*   **Szenen**
*   **Gruppen**

## [](https://github.com/ioBroker/ioBroker.scenes/blob/master/README.md#scenes)Szenen

**Szenen** werden erstellt, wenn die Option "_set on false_" nicht gewählt ist. Jede Szene kann für sich konfiguriert werden, dadurch können **Szenen** und **Gruppen** in einer gemeinsamen Instanz des Adapters existieren. Eine **Szene** ist eigentlich nur eine Liste von Zustands-IDs und Werten, die diese Zuständet beim Start der Szene annehmen sollen. D.h. wenn eine Szene "_scene.allLightInBath_" erstellt wurde:

scene.allLightInBath
|- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
+- hm-rpc.0.TOP_LIGHT.STATE     - true

Um dioese Szene zu aktivieren muss _scene.allLightInBath_ auf true (z.B. mittels script oder vis) gesetzt werden. Dann werden beide Zustände auf die gewünschten Werte gesetzt - auf **true**. Der Wert von _scene.allLightInBath_ wird ebenfalls auf **true** gesetzt. Wenn der Schalter des Deckenlichts manuell ausgeschaltet wird, wird der Wert von _scene.allLightInBath_  auf **false** gesetzt. Und wieder auf **true** Wenn das Licht wieder manuell angeschaltet wird.

Jetzt wird noch ein Lüfter zu der **Szene** hinzugefügt:

scene.allLightInBath
|- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
|- hm-rpc.0.TOP_LIGHT.STATE     - true
|- hm-rpc.0.FAN.STATE          - true
|- hm-rpc.0.FAN.STATE          - false (delay 60000ms)

In diesem Beispiel wird der Lüfter bei der Aktivierung der  **Szene** angeschaltet und eine Minute später wieder ausgeschaltet. Nach dem Abschalten des Lüfters wird _scene.allLightInBath_ auf **false** gesetzt, weil nicht mehr alles Zustände den initialen Bedingungen entsprechen. Zustände mit Verzögerung sind nicht Teil einer Berechnung.

You can test the scene with a "play" button. Additionally you can link this **scene** direct with other scene ID. E.g if you have a sensor on the door you can select it as a trigger:

trigger
id:        hm-rpc.0.DOOR_SENSOR.STATE
condition: ==
value:     true

And every time you will open the door in the bath all lights with fan will be switched on.

## [](https://github.com/ioBroker/ioBroker.scenes/blob/master/README.md#groups)Groups

**Groups** are like virtual channels. You can create with the help of **groups** virtual device from several actuators and control them together, like one device. Let's modify our sample with bath's lights.

scene.allLightInBath             "set on true"    "set on false"
|- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
+- hm-rpc.0.TOP_LIGHT.STATE     - true             false

If you will link this **group** with the door sensor like:

trigger on true
id:        hm-rpc.0.DOOR_SENSOR.STATE
condition: ==
value:     true

trigger on false
id:        hm-rpc.0.DOOR_SENSOR.STATE
condition: ==
value:     false

Every time you will open the door all lights in a bath will be switched on. The value of the _scene.allLightInBath_ will go to**true**. If you will close the door the lights will be switched off. And the value of _scene.allLightInBath_ will go to **false**.

It is useless, but it is good as an example.

If you will manually switch on one light, the value of the _scene.allLightInBath_ will go to **uncertain**.

Delays can be used in the **group** too, but the states with delay are not participate in calculations of the current value of**group**.