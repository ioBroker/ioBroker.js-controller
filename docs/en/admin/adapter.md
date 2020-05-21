---
title: adapter
lastChanged: 25.02.2020
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/admin/adapter.md
hash: qvQSbRQZm8KXIQYiTdmaA6YOIfFf6rsf6Qxl3hZaZ1s=
---
# The adapter tab
The available and installed adapters are displayed and managed here.

## The title line
in the title bar there are icons for the most important processes. There is context help for each icon. Simply stay on the icon with the mouse for a while.

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_numbers.png)

### The icons in detail:
** 1.) Switch view **

This button can be used to switch between the tile view and the table view (toggle function)

** 2.) Refresh ad **

Every time you restart, updates are automatically searched for. With this button you can start the search manually or trigger a refresh of the page.

** 3. ) Show only installed adapters ** If you select this icon, only adapters with instances already installed are displayed (toggle function)

** 4.) Show adapter with updates **

When this icon is selected, only adapters for which there is an update are displayed (toggle function). The tiles of the updatable adapters have a green header. If there is no update for an adapter, a corresponding message appears.

Another icon also appears in the title bar:

![The Admin tab](../../de/admin/media/ADMIN_Adapter_Kachel_upgradeable.png)

Clicking this icon (8) updates all available adapters.

** 5.) Install adapter from your own URL **

** ATTENTION: **** Using this option can lead to problems with your ioBroker installation.** GitHub adapters may not work properly (as they are still under development). It is recommended to wait for a stable version instead of using this option. If you use this icon to install an adapter, you download a development status of an adapter that should not be used in a production system.

The Octocat icon can be used to install adapters from your own paths (URL or file paths) or pre-versions of GitHub.

After clicking this icon, a corresponding selection window opens:

![Install GitHub](../../de/admin/media/ADMIN_Adapter_GitHub.png)

Under the ***FROM GITHUB*** tab, simply select the desired adapter in the pull-down menu and the latest preliminary version will be installed.

If you select the ***ANY*** tab, any file path or URL (e.g. a URL to an external adapter developer) can be entered in the field and the corresponding adapter installed.

** 6.) Switch on expert mode **

Expert mode also allows older versions of an adapter to be installed. If this button (9) is selected, an additional icon appears in the tile which can be used to install earlier versions.

![Install other versions](../../de/admin/media/ADMIN_Adapter_Kachel_versions.png)

** 7.) Filter **

Here you can search for specific adapters using a filter term.