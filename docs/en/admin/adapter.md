---
title: adapter
lastChanged: 25.02.2020
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/adapter.md
hash: qvQSbRQZm8KXIQYiTdmaA6YOIfFf6rsf6Qxl3hZaZ1s=
---
# The Adapter tab
The available and installed adapters are displayed and managed here.

## The title line
in the title line there are icons for the most important processes. There is context help for each icon. To do this, simply hold the mouse on the icon for a while.

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### The icons in detail:
** 1.) Switch view **

This button can be used to switch between the tile view and the table view (toggle function)

** 2.) Update display **

Updates are automatically checked for each restart. This button can be used to initiate the search manually or to refresh the page.

** 3. ) only show installed adapters ** If you select this icon, only adapters with already installed instances are shown (toggle function)

** 4.) Show adapter with updates **

When you select this icon, only adapters for which an update is available are displayed (toggle function). The tiles of the adapters that can be updated have a green header. If there is no update for an adapter, a corresponding message appears.

Another icon also appears in the title bar:

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

Clicking this icon (8) updates all available adapters.

** 5.) Install adapter from own URL **

** ATTENTION: **** Using this option can lead to problems with your ioBroker installation.** Adapters from GitHub may not work properly (as they are still under development). It is recommended to wait for a stable version instead of using this option. If you install an adapter using this icon, you will download a development version of an adapter which should not be used in a productive system.

Using the Octocat icon, adapters can be installed from their own paths (URL or file paths) or pre-release versions from GitHub.

After clicking this icon, a corresponding selection window opens:

![Install GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

Under the ***FROM GITHUB*** tab, simply select the required adapter in the pull-down menu and the latest preliminary version will be installed.

When selecting the ***ANY*** tab, any file path or URL (e.g. a URL to an external adapter developer) can be entered in the field and the corresponding adapter installed.

** 6.) Switch on expert mode **

The expert mode also enables older versions of an adapter to be installed. If this button (9) is selected, an additional icon appears in the tile via which earlier versions can be installed.

![Install other versions](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

** 7.) Filter **

Here you can search for specific adapters using a filter term.