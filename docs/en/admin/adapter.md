---
title: adapter
lastChanged: 25.03.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/adapter.md
hash: jYXlXAtkeU4tYUVMbZYj8yRP3jLgoEsdRbdkmoL5ewY=
---
# The tab adapter
Here the available and installed adapters are displayed and managed.

## The title bar
The title bar contains icons for the most important processes. There is a context help for each icon. Just keep the mouse on the icon for a while.

![The tab Admin](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### The icons in detail:
** 1.) Switch view **

With this button you can switch between the tile view and the table view (toggle function)

** 2.) Update ad **

Each time you restart, it automatically checks for updates. With this button you can trigger the search manually or trigger a refresh of the page.

** 3rd ) show only installed adapters ** If this icon is selected, only adapters with already installed instances are displayed (toggle function)

** 4.) Show adapters with updates **

If this icon is selected, only adapters will be displayed for which there is an update (toggle function). The tiles of the updatable adapters have a green header. If there is no update to an adapter, a message appears.

In addition, another icon appears in the title bar:

![The tab Admin](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

Clicking on this icon (8) updates all available adapters.

** 5.) Install adapter from own URL **

Using the Octocat icon, adapters can be installed from their own paths (URL or file paths) or pre-release versions of GitHub.

After clicking this icon, a corresponding selection window opens:

![Install GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

Under the tab ***VON GITHUB*** the desired adapter is simply selected in the pulldown menu and the latest pre-release version is installed.

When the tab ***ANY*** is selected, any file path or URL (e.g., a URL to an external adapter developer) can be entered in the field and the appropriate adapter installed.

** Use of this option involves some risks and is at your own risk. **

** 6.) Turn on expert mode **

The expert mode also allows you to install older versions of an adapter. If this button (9) is selected, an additional icon appears in the tile over which previous versions can be installed.

![Install other versions](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

** 7.) Filter **

Here you can search for specific adapters via a filter concept.