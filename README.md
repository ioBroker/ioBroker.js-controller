![Logo](media/ioBroker_logo_s.png)

# ioBroker.docs - ioBroker new website project & documentation

See live documentation at [https://www.iobroker.net/#de/documentation](https://www.iobroker.net/#de/documentation) in different languages.

Project content:

| Folder | Description |
|---|---|
|**admin**|information that directly affects the admin adapter|
|**archive**|archived informations from older documentions|
|**blog**|source for blog messages|
|**docs**|official iobroker documentation source files|
|**engine**|dynamic webpage generation engine|
|**info**|Pop-up texts and documentation list for the Info Adapter|
|**media**|official files and logos|

## How to build
- Go to engine directory and write `npm i`.
- Then write `gulp`. 
- Go to engine/front-end directory and write `npm i`
- Then write `npm run build`.
- Go to engine directory and write `npm run start`
- Open in the browser `http://localhost:5000`

## TODO
- Download
- sitemap
- About
- FAQ
- Translator

## How to create the documentation
See [how to participate](http://www.iobroker.net/react/)

## Changelog
Read the change log [here](CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2014-2020 bluefox <dogafox@gmail.com>  
Copyright (c) 2014      hobbyquaker
