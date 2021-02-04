# Translation of Adapters

## Introduction

ioBroker is used internationally in [many different languages](https://www.iobroker.net/#en/statistics), therefore translations are very important.

Adapters have multiple parts that need to be translated:

1. Strings in the admin user interface
1. Title and description in `io-package.json`
1. Release news in `io-package.json`

## Languages

All those short strings **must** be translated to the following languages:
- English (en)
- German (de)

They **should** also be translated to the following additional languages:
- Russion (ru)
- Portugese (pt)
- Dutch (nl)
- French (fr)
- Italian (it)
- Spanish (es)
- Polish (pl)
- Chinese (zh-cn)

## Automated translation

All adapters should use automated translation using `gulp`.

When an adapter is created with the [Adapter Creator](https://github.com/ioBroker/create-adapter), the correct gulp file is created.

Whenever you add some strings, you can simply use `gulp translateAndUpdateWordsJS` to add all missing translations.

To automate translating the release notes also the use of the [release-script from @AlCalzone](https://github.com/AlCalzone/release-script) is an easy option that automates that from an english written changelog.

## Managed translations

Automated translations are often not good enough or confusing, therefore ioBroker offers the Weblate platform for managed community translations:

https://weblate.iobroker.net/

In Weblate members of the community can easily manage translations to any number of languages for all included ioBroker adapters.

To add your adapter to Weblate, please follow [these guidlines](https://github.com/ioBrokerTranslator/doc/blob/master/README.md).

Weblate currently only manages strings in the admin user interface. It does not alter `io-package.json` or do anything to your documentation.
