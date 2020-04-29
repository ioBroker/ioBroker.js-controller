# How to add messages

## Required infos
- **title** - *required* Object in different languages (can be automatically translated from English with Gulp)
- **content** - *required* Object in different languages (can be automatically translated from English with Gulp)
- **id** - *required* If there are two identical IDs, ONLY the first message is displayed where the conditions apply.
- **created** - *required* Creation date in the format 2019-01-01T00:00:00.000Z

## Display options
- **class** - (default: info) Value can be info (blue), success (green), warning (yellow) and danger (red)
- **fa-icon** - (default: exclamation-triangle) Icon to be displayed on the left side [icons list](https://fontawesome.com/v4.7.0/icons/)

## Conditions
- **date-start** - When should the message be displayed (in format 2019-01-01T00:00:00.000Z)
- **date-end** - When should the message no longer be displayed (in format 2019-01-01T00:00:00.000Z)
- **node-version** - Can be used with bigger(x.x.x), smaller(x.x.x), equals(x.x.x) or between(x.x.x,y.y.y) to check the installed node version (since Info 1.5.1, Admin 3.6.7)
- **npm-version** - Can be used with bigger(x.x.x), smaller(x.x.x), equals(x.x.x) or between(x.x.x,y.y.y) to check the installed npm version (since Info 1.5.5, Admin 3.6.12)
- **os** - Can be 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', 'win32' and 'android' (since Info 1.5.5, Admin 3.6.10)
- **repo** - Can be 'latest' or 'default' (since Info 1.5.6, Admin 3.6.12)
- **conditions** - Object in format ("adapter" : "condition") -> All conditions are linked with "and"
  - **installed** - Adapter is installed (example: "iot": "installed")
  - **!installed** - Adapter is not installed  (example: "cloud": "!installed")
  - **active** - Instance of adapter is active (sinse Info 1.7.1, Admin x.x.x)
  . **!active** - Adapter is installed, but there is no active instance of it (sinse Info 1.7.1, Admin x.x.x)
  - **bigger(x.x.x)** - Adapter version is bigger than (example: "admin": "bigger(2.2.2)")
  - **smaller(x.x.x)** - Adapter version is smaller than (example: "fronius": "smaller(1.2.2)")
  - **equals(x.x.x)** - Adapter has exactly the same version (example: "cloud": "equals(0.2.2)")
  - **between(x.x.x,y.y.y)** - The version of the adapter is between x and y or equal to x or y (example: "tankerkoenig": "between(1.0.5,2.0.4)")
