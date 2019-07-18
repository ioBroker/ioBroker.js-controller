---
title: Documentation Style Guide
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocstyleguide.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: 9fphyXjO/yH0dG/Ma8oZBZnkqb1NyirltzzlX8lQqmA=
---
# Style Guide for creating an adapter documentation
?> ***This is a wildcard*** . <br><br> Help with ioBroker and extend this article. Please note the [ioBroker style guide](community/styleguidedoc), so that the changes can be adopted more easily.

* The documentation is created using the "Markdown" language.
* The file storage for the adapter documentation is regulated as follows:
  * There is a folder in each adapter project

    `/doc`.

  * If the documentation is in German, it will be in the subfolder

`de` saved. Currently supported languages and thus folder names are: `en, de, ru, pt, nl, fr, it, es, pl`.

  * The actual adapter documentation is in the file `README.md`,

    which is located directly in the respective language folder.

  * Media are stored in the subfolder `media`, which is also in the

    Language folder is located.

  * Except for README.md, file and folder names are written in lowercase letters.

Allowed are the characters `a-z`, `0-9`, the underscore `_` and the decimal point `.`

* Documents should have a line break at 80 characters.
* Preferably the text formatting is done as in the file `.editorconfig`

  described.

  * A [Plugin] [] to automatically apply these rules is for

    various editors available.

* For German texts, compliance with the new German spelling

  prefers.

* In reference documentation, the use of personal pronouns (e.g.

  "I", "you", "we") to avoid.

  * Use gender-neutral pronouns and multiple-key nouns.
    * Okay: "she (several)", "her (possession)", "persons",

      "People", "Developer"

    * Not OK: "his", "her", "he", "she (woman)", "boys", "girls"
* Use bracket elements (all bracket shapes and

  Quotation marks), punctuation marks are set as follows:

  * Inside the bracket when the bracket element is a complete

    Contains sentence (subject, predicate, object).

  * Outside the bracket, if the bracket element is only a subset

    contains.

* Documents always start with a H1 level heading.
* Links are not placed inline (for example, with `[a link] (http://example.com)`),

but with the help of inline `[a link][]` and `[a link]: https://a.link/to/know` placed at the end of the document.

* If dashes are used, use the short notation

  with the minus sign and not "-" or `Option+Shift+"-"` in OSX.

* Additional content:
  * Documents such as binaries, pictures, video or audio recordings will be

    stored in the folder `media`.

  * The inclusion of the media in the text is for general files

by means of `§§LLLLL_0§§` and for pictures by `![media concept](../../de/dev/media/{dateiname})`.

  * Images are preferably stored in SVG format. If SVG

is not possible, then as a PNG file. Please keep an eye on the file size.

  * Short videos can be embedded as a GIF file.
  * Below each image is a italic description of the content in italics

    specify.

* For source code sections, the following applies:
  * Depending on the source code language, an appropriate markup must be selected. To the

    Example `\` \ `\`` for JavaScript.

  * A source code may or may not be complete. blocks of code

Examples are for clarification of jeweis just described point of view. So no completely executable programs must be delivered. If, nevertheless, a completely executable program is to be provided, this is done as a media file in the folder `media/{code_beispieldatei}` with a corresponding link in the documentation.

* If using underscores, single quotes, asterisks or backslashes

the appropriate escape characters are to be set: `\_`, `\*`, `\\` and ``\`` ` anstelle von ``, ` * §§ SSSSS_6§§ \ ` und `§SSSSSSS_8§§ ``.

* To emphasize a note, the following guidelines are

  to note:

  * The "hint:" identifier must be set in italic, ie as `* hint *:`.
  * After the "Note:" identifier, continue with a capital letter.
  * The note should be placed at the beginning of a new paragraph, so that he

    is more visible.

* There is a [template] [] for the adapter documentation. The relevant

  Template sections are to be used in the stored sequence and form.

[Plugin]: http://editorconfig.org/#download

[Vorlage]: dev/adaptertemplate