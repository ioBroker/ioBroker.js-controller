# IoT Cloud

Ursprung: https://forum.iobroker.net/topic/17834/ank%C3%BCndigung-weihnachtsaktion-assistenten-service-iobroker-iot-reloaded-alexa-und-services

Um aktuell seine Geräte über Alexa steuern zu können, gibt es den Cloud-Adapter,
der mit der Free- bzw. Pro-Cloud verbunden ist, und den dazu passenden Alexa-Skill.
Es zeigt sich aktuell, das die Struktur mit dedizierten (teuren!) Cloud-Servern nicht wirklich mit der Anzahl der
Nutzer mitwächst und vor allem die Free-Cloud-Nutzer leiden aktuell bereits darunter,
dass man Sprachbefehle wiederholen muss. Wir wissen aber auch wie wichtig die Assistenten wie Alexa inzwischen sind,
dass sie oft im täglichen Leben nicht mehr wegzudenken sind und niemand den Komfort missen möchte.

Daher wurde mit viel Aufwand einen skalierbaren und zukunftssicheren Weg ausgedacht, und das ist der IoT-Service.

Dem IoT-Service gehört daher die Zukunft und die
Assistenten-Funktionen (Alexa, Google-Home und so) werden voraussichtlich ca. Ende 2019 nur noch über den IoT-Service nutzbar sein.

Um sicherzustellen, dass das Setup der IoT-Instanz und die Verbindung dahin funktioniert,
ist das neue Assistenten-Lizenzpaket erst dann kaufbar, wenn eine Verbindung erfolgreich erstellt wurde,
die Verknüpfung erfolgreich ist und auch die Steuerung mindestens eines Gerätes funktioniert hat.
Also nicht wundern, dass im Pro-Cloud-Account nichts verfügbar ist.

Daher die aktualisierte Anleitung bitte zuerst befolgen:

1. Falls noch kein Pro-Account existiert, erst unter https://iobroker.pro/intro einen Account registrieren.
Sonst den existierenden Pro-Account einfach nutzen.

Neu angelegte Accounts haben eine 7 Tage "Trial Version" der Assistenten-Lizenz mit einem Limit von 20.000 Anfragen pro Monat.
Eine gekaufte Assistenten-Lizenz startet aber sofort, es werden also keine Rest-Tage berücksichtigt!
Nach Ablauf der 7 Tage ohne Kauf einer Assistenten-Lizenz werden bis zu 20 Anfragen pro Tag kostenfrei übertragen.
Dann ist es für den Tag gesperrt.

Bereits existierende Pro-Accounts ohne Lizenz können mit Start der Aktion ebenso das Assistenten-Paket für 7 Tage testen - diese 7 Tage starten ab Anlegen des IoT-Service Users über Eintragen der Login-Daten im IoT-Adapter.

Pro-Accounts mit existierender Assistenten- oder Fernzugriffs-Lizenz haben ebenso 20.000 Anfragen pro Monat.

2. Danach den ioBroker.IoT-Adapter (Cloud-IoT Verbindung) aus dem normalen Repository installieren - einfach nach "IoT" filtern.
In der Konfiguration des Adapters bitte die Login-Daten von https://iobroker.pro eintragen (E-Mail kleingeschrieben und Passwort!! keinen App-Key oder so!)
Der "Erhalten Sie neue Verbindungszertifikate" Button wird nur in Fehlerfällen benötigt.

Falls der IoT-Adapter schon installiert ist bitte prüfen ob Updates vorhanden sind und auf die 0.2.2 aktualisieren.

![Configuration](media/iot_settings.png)

Weiterhin hier alle nötigen Einstellungen vornehmen und Smart-Geräte prüfen.
Im Normalfall sollten im IoT-Adapter die gleichen Geräte gelistet sein, wie im bisherigen Cloud-Adapter.
Falls dies nicht so ist, dann habt Ihr die Geräte ggf. mit der Option "Eigene Einstellungen (nur pro)" nur für die frühere cloud-Adapter-Instanz definiert.
Dann müssen die Geräte in IoT neu hinterlegt werden!
Ebenso ist es empfohlen Gruppen lieber im ioBroker IoT-Adapter anzulegen als bei Amazon, da Gruppen bei Amazon unnötigen Traffic verursachen weil Amazon für jedes Gerät einen eigenen Steuerbefehl sendet!

3. Der Adapter sollte sich nun mit dem IoT-Service verbinden und grün werden.
Falls das nicht klappt und der Adapter z.B. gelb ist, dann bitte das Logfile prüfen und unten in der FAQ schauen.
Auch ein Restart der Instanz kann helfen. Meistens sind es einfache Dinge wie falsche Login-Daten (Achtung: Auch Groß- und Kleinschreibung beachten!)!
Die Fehlermeldungen im Log wurden verbessert und sollten nun besser aussagen was das Problem ist.

Wenn bisher der Cloud-Adapter genutzt wurde und nur die Alexa-Steuerung nötig ist, dann den Cloud-Adapter am besten deaktivieren, da er jetzt dann nicht mehr benötigt wird!

4. Nach der ersten Verbindung wird eine E-Mail an die beim Pro-Cloud-Account hinterlegte E-Mail versendet.
Bitte prüft Euer E-Mail-Postfach.
In dieser E-Mail ist ein initiales Passwort für die Anmeldung beim IoT-Service mit dem Amazon-Skill enthalten.

Sollte die E-Mail nicht kommen, schaut mal in Eurem Spam-Ordner nach.
Oder ihr habt ggf. schon einmal mit dem IoT-Adapter gespielt und seid schon registriert?
Wenn das alles nicht zutrifft, bitte ein entsprechendes Posting im Thread "IoT Adapter erfolgreich Verbunden, Steuerung per Alexa klappt nicht" (siehe auch oben) machen. Wir kümmern uns dann drum.

5. Am besten alten Skill ("ioBroker SmartHome" bzw. "ioBroker.pro") in der Alexa App zusammen mit allen Geräten löschen. Ggf. werden die Geräte nicht automatisch gelöscht, dann muss das manuell erfolgen!

6. Dann den neuen "ioBroker.iot" [Skill](https://www.amazon.de/ioBroker-ioBroker-iot/dp/B07L66BFF9) installieren und auf "Aktivieren" klicken. Dann sollte die Login-Maske des IoT-Service erscheinen.
Hier die E-Mail-Adresse des Pro-Cloud-Accounts und das initiale Passwort verwenden.
Ihr werdet dann aufgefordert das Passwort zu ändern. Ab dann gilt das Initiale PW nicht mehr, sondern nur das Neue. Eine Empfehlung ist das gleiche Passwort wie bei Pro zu verwenden, da ggf später der Login in die Pro-Cloud auf dieses Passwort umgestellt wird (keine Angst, wir informieren rechtzeitig vorher wenn das geplant ist!)

Wer bereits die IoT-Services nutzt (früher oder mit dem Custom-Skill) loggt sich einfach direkt mit seinen IoT-Zugangsdaten bei der Skill-Aktivierung ein.

![Login](media/iot_login.png)

Nach einem erfolgreichen Login kommt eine Erfolgsmeldung und der Skill ist aktiviert.
Falls nicht bitte Zugangsdaten prüfen (vor allem Initialpasswort vs. geändertes Passwort und so) und nochmals versuchen.

7. Jetzt sollte Euch Amazon die Gerätesuche anbieten.
Nachdem diese gelaufen ist sollten alle im IoT-Adapter hinterlegten Geräte auch in Amazon zu finden sein.

8. Bitte jetzt prüfen ob Eure Geräte per Sprache oder Alexa-App schaltbar sind.
Dieser Schritt ist wichtig und es muss mindestens eine Schaltaktion erfolgreich gewesen sein bevor Ihr mit dem nächsten Schritt weitermachen könnt!

9. Jetzt am besten zu Amazon gehen und dem Skill (weil ja alles funktioniert hat) gleich schon mal 5 Sterne geben :)
Gute Bewertungen (echte natürlich, dies ist kein Aufruf um Bewertungen zu faken!) und damit die Skill-Platzierung haben auch einen gewissen Einfluss auf die Kosten der Amazon-Dienste die vom IoT-Service genutzt werden!

10. Wenn Ihr also den IoT-Adapter erfolgreich verbunden, den Skill aktiviert habt und Eure Geräte erfolgreich steuern könnt, müsst Ihr jetzt die Entscheidung treffen ob Ihr das Assistenten-Paket im Rahmen der Weihnachtsaktion kaufen wollt oder ob euch die 20 Anfragen pro Tag vielleicht sogar ausreichen.
Wenn Ihr das Paket kaufen wollt geht bitte im Browser auf die https://iobroker.pro, loggt Euch dort mit Euren Pro-Cloud-Zugangsdaten ein.
Falls Ihr kein Menü seht klickt oben rechts auf das Avatar-Icon und wählt nun im Menü den Punkt "Remote Access".

Fernzugriff (Remote) auf Admin und die Editoren funktioniert mit dieser Lizenz nicht!

Es ist auch nicht möglich später ein Update auf Remote zu machen. Das wäre dann ein Neukauf der Remote-Lizenz.

Falls man den vollständigen Fernzugriff (inklusive Editoren) auf ioBroker braucht, kann man auch die Remote-Lizenz kaufen (zum Preis von 4.95€/Monat oder z.B. 39.95€/Jahr (=3.33€/Monat)), dort ist der Smart-Assistenten Support (Alexa, Google Home) automatisch enthalten.

Eine Übersicht der Lizenzen und Funktionen findet Ihr im folgenden Bild:

![Login](media/iot_compare.png)

Die Smart-Assistenten Lizenz kostet 13,80€ für 6 Monate (2,30€ im Monat) und 21€ (1,75€ im Monat) für ein Jahr.

Es kann sein, dass die Preise noch geändert werden (in beide Richtungen), je nachdem wie sich die genaueren Betriebskosten für die nötige Infrastruktur entwickeln!

So jetzt, viel Spaß beim ausprobieren des IoT-Service und natürlich auch beim Nutzen mit Alexa.