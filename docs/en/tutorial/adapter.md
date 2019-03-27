---
title: Manage adapters
lastChanged: 27.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/adapter.md
hash: Htjtid2RO2WZS7rCBBwUlzON58VeeVaje9/ceh+glQY=
---
# Basics of using adapters
The installation of adapters and instances at ioBroker is multi-level.

These terms are repeatedly confused. This page is intended to shed some light on how the most important administrative tasks at ioBroker are to be performed and what is behind them.

## Administrative tasks
### Installing a new adapter
The actual installation loads the data needed for adapter usage from the server to the local host. These data will remain "up to date" at the time of the install until they are updated.

** About the admin **

This function is not available via the admin, it is automatically prefixed when creating an instance (instantiation).

** via the console **

``iobroker install AdapterName``

### Creation of an instance of an adapter
To use an adapter in ioBroker you need one (or more) instances of this adapter. These instances are configured in the Admin via the Instances tab.

** About the admin **

If you want to create an instance of an adapter, you can do this by clicking on the (+) button on the left in the Admin tab in the tile of the corresponding adapter.

![Create instance](../../de/tutorial/media/Instance_new.gif)

** via the console **

``iobroker add AdapterName``

If the necessary files for the adapter are not yet on the host, an iobroker install AdapterName is automatically executed first. Only then is the instance created.

*** Via the console via npm (only for experts!) ***

``cd /opt/iobroker``

``npm install iobroker.AdapterName``

** This version should only be used if all other methods do not work for whatever reason. **

<span style="color:red">Attention! On newer installations, the direct use of npm install causes rights problems after installation or fails. It is recommended to use the iobroker commands. !!</span>

### Upgrade an adapter
If a new version of an adapter is available, it can be updated. It also happens that adapters require a specific version of another adapter. Therefore, it makes sense to always keep all adapters up to date

** About the admin **

If an adapter is upgraded, the title bar of the corresponding tile changes to green. The new version number will appear in green on the tile under "available version" and the upgrade icon to the left of it. If you want to upgrade this adapter now, click on this icon.

There are two processes running in the background, the actual upgrade of the adapter files and then the upload of the files to the instances.

![adapter update](../../de/tutorial/media/Adapter_upgrade.gif)

** via the console **

``iobroker upgrade AdapterName``

### Upload adapter files
This function is only needed in special cases. If the above procedure is used, this feature is not necessary.

only when experienced users who know what they are doing are modifying files themselves, or when a beta version of Github is loaded is this feature necessary

About the Admin In the tab Admin the expert mode has to be activated. Thereafter, additional icons appear in the tile. The upward arrow (3rd icon from the right) executes this upload.

![adapter update](../../de/tutorial/media/Adapter_upload.gif)

** via the console **

``iobroker upload AdapterName``

### Downgrade an adapter
Should there be problems with a new version you can downgrade an adapter again.

** About the admin **

To downgrade, you first have to switch to expert mode and then call up the list of available versions:

![adapter update](../../de/tutorial/media/Adapter_downgrade.gif)

This list displays all versions approved by the developer for this feature.

There please click on the desired version.

** via the console **

``iobroker install AdapterName@ver.si.on``

Where ***AdapterName*** is the name of the desired adapter as listed in iobroker update, and ***ver.si.on*** is the appropriately formatted version number.

*** Via the console via npm (only for experts!) ***

``cd /opt/iobroker``

``npm install iobroker.AdapterName@ver.si.on``

** This version should only be used if all other methods do not work for whatever reason. **

<span style="color:red">Attention! On newer installations, the direct use of npm install causes rights problems after installation or fails. It is recommended to use the iobroker commands. !!</span>

## Additional important information
### The adapter list in the admin
In fact, here is just a list of existing adapters in the selected repository (main settings). What is displayed here is not yet on the host.

This list is updated daily at 02:00 on the server and updated online when the admin is called up. If there is no connection to the server, for whatever reason, this list contains only the already installed adapters or can not be loaded at all.

### The different installation sources
Again and again the question arises, why one of a certain version is spoken, but this is not offered for update. Therefore, here's the background to be explained:

** There are three stages of publishing adapters **

* Repository stable, everything stable and tested
* Repository latest, not yet fully tested
* Github, developer, partially <span style="color:red">beta version or even unfinished</span>

Versions </ span>

These levels can all have the same version if not much is changed, but there can also be larger jumps in the various repositories or githubs.

** The repository ** from which you want to get its adapter versions offered is defined in the system settings in the subsection [main settings](../admin/settings.md#Haupteinstellungen).

The available repositories are listed in the subsection [The repositories](../admin/settings.md#Verwahrungsorte).

** The developer or beta versions ** of Github are installed via [Octocat symbol](../admin/adapter.md#die-icons-im-einzelnen) # 5.

Either simply in the pulldown menu ***Github*** , or by entering the address of the Github repository under the tab ***any*** This happens especially with "external" adapter developers.

<span style="color:red">** An installation of GitHub should only be done after consulting the developer. **</span>

### The installation of Github ( <span style="color:red">only for experts!</span> )
The installation of Github should only be done by experts. Here are just beta versions, or worse, unfinished versions. <span style="color:red">Their installation can destroy the entire ioBroker installation!</span>

If an update via GitHub (Octocat-Icon) is still performed (or recommended for troubleshooting via the forum), the new files will only be saved locally, but not sent to the instances. Therefore, with versions of the js-controller under 1.5 then an upload must be carried out manually.

For this the expert mode has to be activated in the tab Admin. Thereafter, additional icons appear in the tile. The upward arrow (3rd icon from the right) executes this upload.