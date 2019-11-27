---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/cloud/iot.md
title: IoT cloud
hash: 7oIS30K9l3VuqOD9kcT2rKYg1IMmonhFGLe6P/Lb+Os=
---
# IoT cloud
Origin: https://forum.iobroker.net/topic/17834/ank%C3%Bndigung-christmasaktion-assistenten-service-iobroker-iot-reloaded-alexa-und-services

To be able to control his devices via Alexa, there is the cloud adapter, which is connected to the Free- or Pro-Cloud, and the matching Alexa-Skill.
It is currently shown that the structure with dedicated (expensive!) Cloud servers does not really grow with the number of users and especially the free-cloud users are already suffering from having to repeat voice commands. But we also know how important the assistants like Alexa meanwhile are, that they are often indispensable in everyday life and nobody wants to miss the comfort.

That's why a lot of effort has gone into creating a scalable and future-proof way, and that's the IoT service.

Therefore, the future belongs to the IoT service and the assistant functions (Alexa, Google-Home and so) are expected to be available only by the end of 2019 via the IoT service.

To make sure that IoT Instance setup and connection work, the new wizard license pack can not be purchased until a connection is successfully created, the join succeeds, and the control of one or more devices has worked.
So do not be surprised that nothing is available in the Pro Cloud account.

Therefore, please follow the updated instructions first:

1. If there is no pro-account yet, first register an account at https://iobroker.pro/intro.

Otherwise simply use the existing pro account.

Newly created accounts have a 7-day trial version of the wizard license with a limit of 20,000 requests per month.
A purchased assistant license starts immediately, so no remaining days are considered! After 7 days without the purchase of a wizard license, up to 20 requests per day will be transferred free of charge.
Then it is locked for the day.

Existing Pro-Accounts without license can also test the wizard package for 7 days with the start of the action - these 7 days start from the creation of the IoT service user by entering the login data in the IoT adapter.

Pro accounts with existing wizard or remote access license also have 20,000 requests per month.

2. Then install the ioBroker.IoT adapter (Cloud-IoT connection) from the normal repository - just filter for "IoT".

Please enter the login details of https://iobroker.pro in the configuration of the adapter (e-mail in lowercase and password !! no app key or anything!) The "get new connection certificates" button is only needed in case of errors.

If the IoT adapter is already installed please check if there are updates and update to 0.2.2.

![Configuration](../../de/cloud/media/iot_settings.png)

Continue to make all the necessary settings here and check smart devices.
Normally, the same devices should be listed in the IoT adapter as in the previous cloud adapter.
If this is not the case, then you have possibly defined the devices with the option "Own settings (only pro)" only for the former cloud adapter instance.
Then the devices in IoT must be deposited again! It is also recommended to create groups in the ioBroker IoT adapter rather than Amazon, because groups cause unnecessary traffic on Amazon because Amazon sends a separate control command for each device!

3. The adapter should now connect to the IoT service and turn green.

If that does not work and the adapter e.g. is yellow, then please check the logfile and look below in the FAQ.
Also a restart of the instance can help. Mostly it's simple things like wrong login-data (Attention: also case-sensitive!)! The error messages in the log have been improved and should now better state what the problem is.

If until now the cloud adapter was used and only the Alexa control is necessary, then deactivate the cloud adapter best, since it is now no longer needed!

4. After the first connection, an e-mail will be sent to the e-mail deposited with the Pro-Cloud account.

Please check your e-mail inbox.
This email includes an initial password for signing in to the IoT service with the Amazon skill.

If the e-mail does not come, check your spam folder.
Or you have possibly already played with the IoT adapter and have already registered? If all this is not correct, please make a corresponding posting in the thread "IoT adapter successfully connected, control by Alexa does not work" (see above). We'll take care of it.

5. Delete the best old skill ("ioBroker SmartHome" or "ioBroker.pro") in the Alexa app along with all devices. Possibly. if the devices are not deleted automatically, then this must be done manually!

6. Then install the new "ioBroker.iot" [Skill] (https://www.amazon.de/ioBroker-ioBroker-iot/dp/B07L66BFF9) and click on "Activate". Then the login mask of the IoT service should appear.

Use the e-mail address of the Pro-Cloud account and the initial password here.
You will then be prompted to change the password. From then on, the initial PW no longer applies, but only the new. A recommendation is to use the same password as with Pro, because if necessary later the login into the Pro-Cloud on this password is converted (do not worry, we inform in good time if that is planned!)

Anyone who already uses the IoT services (earlier or with the custom skill) simply logs in directly with their IoT credentials when activating the skill.

![Login](../../de/cloud/media/iot_login.png)

After a successful login, there is a success message and the skill is activated.
If not please check access data (especially initial password vs. changed password and so on) and try again.

7. Now Amazon should offer you the device search.

After this has run, all devices stored in the IoT adapter should also be found in Amazon.

8. Please check now if your devices are switchable via language or Alexa app.

This step is important and at least one switching action must have been successful before you can move on to the next step!

9. Now go to Amazon best and the skill (because everything has worked) equal to 5 stars :)

Good ratings (real, of course, this is not a call to fake reviews!) And so the skill placement also has some impact on the cost of the Amazon services used by the IoT service!

10. So, if you have successfully connected the IoT adapter, activated the skill, and are able to successfully control your devices, you now have to decide whether to buy the wizard package as part of the Christmas promotion, or perhaps the 20 requests per day even enough.

If you want to buy the package, please go to https://iobroker.pro in the browser, log in there with your pro-cloud credentials.
If you do not see a menu, click on the avatar icon in the upper right corner and select the item "Remote Access" in the menu.

Remote access (remote) to Admin and editors does not work with this license!

It is also not possible to update to remote later. That would be a new purchase of the remote license.

If you need the full remote access (including editors) on ioBroker, you can also buy the remote license (for the price of 4.95 € / month or eg 39.95 € / year (= 3.33 € / month)), there is the Smart Wizard Support (Alexa, Google Home) included automatically.

An overview of the licenses and functions can be found in the following picture:

![Login](../../de/cloud/media/iot_compare.png)

The Smart Assistant license costs 13.80 € for 6 months (2.30 € per month) and 21 € (1.75 € per month) for one year.

It may be that the prices are still changing (in both directions), depending on how the more accurate operating costs for the necessary infrastructure develop!

So now, have fun trying out the IoT service and of course using it with Alexa.