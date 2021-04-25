---
title: Markdown
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
# Markdown: syntax
?> To make ioBroker's documentation quick and easy to read, Markdown was chosen as the simplified markup language. The following guide will help you learn the syntax and capabilities of Markdown and translate them into great documents.

Technically, the documentation system only supports the following features:

- headers
- tables
- Inline HTML
- Lists
- Left
- Images
- Bold text
- Italic text

## Overview
### Philosophy
Markdown was designed with the basic idea of being as easy to read and write as possible.

Readability is the top priority here. A Markdown-formatted document should be able to be published in its basic form without appearing to be tagged or formatted (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters carefully chosen to match their meaning. For example, asterisks around a word actually look like an \ *accent \* Lists in Markdown look like lists. Even quotation blocks look like quoted text passages, as you know them from emails.

### Inline HTML
Markdown's syntax has one purpose: to be used to *write* for the web.

Markdown is not a substitute for HTML, even remotely. The scope of the syntax is very small and corresponds to only a small part of all HTML tags. Markdown does not intend to make HTML tagging easier. HTML is simple enough as it is. The idea behind Markdown is to make text as easy to read, write, and edit as possible. HTML is a *publication format* Markdown is a *writing format* Therefore, its syntax only takes into account content that can be conveyed using pure text.

Any formatting that is not feasible with Markdown can simply be used HTML. There is no need to mark HTML to separate it from the rest.
It is simply written in the text.

The only restriction are block elements such as `<div>`, `<table>`, `<pre>`, `<p>` and so on. They must be separated from the surrounding content by blank lines, and the start and end tags should not be indented with spaces or tabs. Markdown is intelligent enough not to set any additional (unwanted) `<p>` tags around HTML blocks.

For example, to include an HTML table in a Markdown article:

    This is a normal paragraph.

<table><tr><td>Foo</td></tr></table>

    This is still a normal paragraph.

It should be noted that Markdown's syntax is not interpreted within HTML blocks. For example, *emphasis* cannot be used within HTML blocks.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can be used anywhere in a markdown paragraph, list item or header.
HTML tags can even be used in place of the appropriate Markdown formatting. It is no problem to simply use `<a>` or `<img>` instead of Markdow's syntax for links or graphics.

In contrast to block tags, the Markdown syntax is interpreted within inline tags.

### Automatic masking of special characters
There are two characters in HTML that require special treatment: `<` and `&`.
The left angle bracket is used to open HTML tags, the ampersand is used to describe named characters (entities). If these characters are to be used as "themselves" in HTML documents, they must be masked as entities, i.e. as `&lt;` and `&amp;`.

The ampersand is particularly impractical for web developers. If you want to write about "AT&T" you have to write "`AT&amp;T`". The ampersand even has to be masked in URLs. In a link to the page

`http://images.google.com/images?num=30&q=larry+bird`

the URL must be encoded as follows:

`http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget and is probably the most popular mistake when validating otherwise well-formed HTML documents.

Markdown allows these characters to be used normally. It regulates the coding itself. If an ampersand is used in an entity, it is not coded, otherwise it is converted to `&amp;`.

So if you want to enter a copyright symbol, for example, you can simply

`&copy;`

write, and Markdown won't modify this. But off

`AT&T`

becomes markdown

`AT&amp;T`

do. Since Markdown supports inline HTML, angle brackets are treated as HTML in the appropriate case. Just for things like

`4 < 5`

becomes markdown

`4 &lt; 5`

do. However, angle brackets and the ampersand are *always* coded in code or span blocks. This simplifies writing over HTML in Markdown (as opposed to raw HTML, where it is mostly a nightmare to encode every `<` and `&`).

## Block elements
### Paragraphs and line breaks
A paragraph is simply one or more lines of text separated by one or more blank lines. (A blank line is any line that *looks* like a blank line - a line that contains nothing but spaces and tabs is treated as blank.) Normal paragraphs should not be indented with spaces or tabs.

The "one or more line" rule implies one thing: Markdown supports "hard break" paragraphs. This is very different from most other text-to-HTML formatters (including Movable Type's "Convert Line Breaks" option), which format every line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as a break, you can simply end the line with two or more spaces.

This is a little extra work to generate a `<br />`, but a simple "every line break is a `<br />`" rule would not work in Markdown.

Markdown's email-like, multi-paragraph [Quotations] (#quotes) and [list entries](#listen) work best - and look better - when formatted with line breaks.

[bq]: #blockquote

[l]:  #list

### Headers
Markdown here only supports one type of header formatting: atx.
Atx-like headers use 1-6 hash signs at the beginning of the line, corresponding to levels 1-6. For example:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

### Quotes
Markdown uses - like e-mails - the character `>` for quote blocks. If you have experience with quotes in email, you will also know how to create quotes in Markdown. It looks best if you wrap the text per line and put a `>` in front of each line:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

Markdown also allows you to be lazy and only use the `>` on the first line of a hard-broken paragraph:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

Quotations can be nested (i.e. quotation in a quotation) by using more `>`:

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

Quotes can contain other Markdown elements, including headers, lists, and blocks of code:

> ## This is a heading.
>> 1. This is the first item in the list.
> 2. This is the second item in the list.
>> Here is some sample code:>> return shell_exec ("echo $ input | $ Markdown_script");

Any reasonable text editor should make e-mail-style quoting easy. In BBEdit, for example, you can make a selection and choose `Increase Quote Level` from the menu `Text`.

### Lists
Markdown supports sorted (numbered) and unsorted lists (bulleted lists).

Unsorted lists use asterisks, pluses and hyphens - interchangeably - as list markers:

    * Red
    * Green
    * Blue

is equal to:

+ Red + green + blue

And:

    - red
    - green
    - blue

Sorted lists use numbers followed by a period:

    1st dog
    2nd cat
    3. Mouse

It is important to understand that the numbers themselves have no effect on the output of Markdown. Markdown creates the following HTML from the last list:

<ol><li>dog</li><li> cat</li><li> mouse</li></ol>

If you instead write the list like this:

    1st dog
    1st cat
    1. Mouse

Or even:

    3rd dog
    1st cat
    8. Mouse

still the same list comes out every time. If desired, you can number your lists correctly by hand. But if you want to be lazy, you can always use the same number.

However, you should start the list with number 1 even then. In the future, Markdown may want to set a starting number for the first entry in the list.

List entries usually start at the left edge of the document, but they can be indented up to three spaces to the right.
List markers must be separated from the following text with one or more spaces or a tab.

In order to format lists nicely, the individual entries can be indented, like here:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

        Suspendisse id sem consectetuer libero luctus adipiscing.

The following example generates the same code, but is less tidy:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    Suspendisse id sem consectetuer libero luctus adipiscing.

If list entries are separated by blank lines, Markdown will wrap the list entries with `<p>` and `</p>`.

For example this will be:

    * Warsteiner
    * King

to

<ul><li>Warsteiner</li><li> king</li></ul>

But this:

    * Warsteiner

    * King

becomes

<ul><li><p>Warsteiner</p></li><li><p> king</p></li></ul>

List items can consist of several paragraphs. Each following paragraph in a list item must be indented with at least 4 spaces or a tab:

    1. This is a bullet point with two paragraphs. Lorem ipsum dolor

sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    2. Suspendisse id sem consectetuer libero luctus adipiscing.

It looks fine with every line of the following paragraph indented, but again, Markdown allows the lazy to indent only the first line:

    * This is a list item with two paragraphs

This is the second paragraph in this list item. Only the first line needs to be indented. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

    * Another item on the same list.

To use a quote in a list item, the quote must be indented:

    * A list item with a quote:

> This is a quote> In a list.

To use a code block in a list item, it must be indented *twice* - 8 spaces or two tabs:

    * A list item with a code example:

            <insert code here>

It is possible to accidentally create lists by e.g.
the following writes:

    1986. What a wonderful year.

In other words: The sequence *number-period-space* at the beginning of a line. To avoid this problem, the point can be masked with a backslash:

    1986 \. What a wonderful year.

<h3 id="precode">Blocks of code</h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines in a code block are interpreted as found. Markdown includes blocks of code with the tags `<pre>` and `<code>`.

To create a block of code in Markdown, simply indent each line of the block with at least 4 spaces or a tab. From the following input ...

    This is a normal paragraph.

        This is a block of code.

... Markdown does the following:

<p>This is a normal paragraph.</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

One level of indentation - 4 spaces or 1 tab - is removed from each line of indentation. For example ...

    An example in AppleScript:

tell application "Foo" beep end tell

...becomes

<p>An example in AppleScript:</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

A block of code ends on the first line that is not indented (or at the end of the document).

In a code block, the ampersand (`&`) and angle brackets (`<` and `>`) are automatically converted into HTML entities. This makes the integration of HTML pieces a lot easier - just copy the HTML into the document, indent it and Markdown does the coding of the ampersand and angle brackets. For example:

<div class="footer">© 2004 Foo Corporation</div>

becomes:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Normal Markdown syntax is not processed in code blocks. I.e.
Asterisks are just asterisks in a block of code and are not a signal to highlight the text. The consequence is that it's easy to talk *about* Markdown in Markdown.

<a id="hr"></a>

### Horizontal Lines The day for horizontal lines (`<hr />`) can be generated by writing 3 or more hyphens or asterisks alone on one line. Spaces between characters are also allowed. All of the following examples would generate a horizontal line:
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span elements
<a id="link"></a>

### Left
Markdown supports two types of links: *inline* and *references*

In both styles, the link text is marked with [square brackets].

To create an inline link, you write normal brackets directly after the closing square bracket. The URL to be linked to is written in these brackets together with an *optional* title for the link in quotation marks. Examples:

This is [an example](http://example.com/ "Der Linktitel") for an inline link.

    [This link](http://example.net/) has no title attribute.

This becomes:

<p>This is <a href="http://example.com/" title="title">an example</a> of an inline link.</p>

<p><a href="http://example.net/">This link</a> has no title attribute.</p>

If you want to refer to content on the same server, you can use relative paths:

    On the page [About me](/about/) there is more information.

Reference links use a second set of square brackets in which any identifier for the link is written:

    This is [an example] [id] for a reference link.

If desired, a space can also be inserted between the brackets:

    This is [an example] [id] for a reference link.

Then, somewhere in the document, the link is defined on its own line as follows:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

So:

* Square brackets containing the link identifier (optionally with

    indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the title attribute of the link,

    wrapped in brackets, single or double quotes.

The following three definitions are identical:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

** Note: ** There is a known bug in Markdown 1.0.1 that hinders the function of single quotation marks as separators for link titles.

The link URL can optionally be packed in angle brackets:

[id]: <http://example.com/>  "Optionaler Titel hier"

The title attribute can also be placed on the next line and indented with more spaces or tabs. This looks better with long urls:

[id]: http://example.com/langer/pfad/zu/seite

        "Optional title here"

Link definitions are only used to create links while Markdown is processing the document and are removed from the document before the HTML is output.

The identifier for link definitions may consist of letters, numbers, spaces and punctuation marks. They are *independent* of upper and lower case:

[Link-Text] [a] [Link-Text] [A]

The two link definitions are equivalent.

The *implied link identifier* allows the link identifier to be omitted. In this case the link text is used as an identifier. An empty set of square brackets is simply appended to the link text:

[Google] []

Then the link is defined:

[Google]: http://google.com/

Since link identifiers can contain spaces, this abbreviation even works for several words in the link text:

Visit [Daring Fireball] [] for more information.

Then the link is defined:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be made anywhere in the Markdown document. In general, it is a good idea to do them after the paragraph in which they are used. However, like footnotes, they can all be listed together at the end of the document.

A small example:

I get ten times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

With the abbreviation above the implied link identifier you can also write the following:

I get ten times more traffic from [Google] [] than from [Yahoo] [] or [MSN] [].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Both examples would result in the following HTML code:

<p>I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a> .</p>

For comparison, the same paragraph follows using Markdown's inline links:

I get ten times more traffic from [Google](http://google.com/ "Google") than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or [MSN](http://search.msn.com/ "MSN Search").

The idea behind reference links is not that they are easier to write. The idea is that they make documents far more readable. The example paragraph is only 80 characters long with reference links, and 181 characters long with reference links; 239 characters as HTML, more markup than content.

With Markdown's reference links, the source document looks more like the final output format as shown in the browser. With the ability to extract metadata for markup from the paragraph, links can be integrated into the text without slowing down the flow of the text.

<a id="em"></a>

### Emphasis Markdown treats asterisks (`*`) and underscores (`_`) as indicators of emphasis. Text packed into individual `*` or `_` is enclosed with the HTML tag `<em>`, double `*` or `_` are marked with the tag `<strong>` . The following text, for example:
    *Single asterisk*

    _Single underscores_

  **Double asterisks**

    __ double underscores__

Will output the following:

<em>Single asterisks</em>

<em>Single underscores</em>

<strong>Double asterisks</strong>

<strong>Double underscores</strong>

The style can be chosen arbitrarily. The only limitation is that the same symbol must be used to open and close a stress area.

Stress can be used in the middle of a word:

  Lord *god* sacrament

But if a `*` or `_` is surrounded by spaces, it is treated like a simple asterisk or underscore.

To write an asterisk or an underscore in a place where it would be understood as an emphasis, it can be masked with a backslash:

  \ *This text is surrounded by asterisks. \*

<a id="code"></a>

### Code To mark a code area, it is enclosed with backtick characters (`` ` ` ''). In contrast to a code block, a code area formats code within a normal paragraph:
    Use the function `printf()` to output text.

Becomes:

<p>Use the function <code>printf()</code> to output text.</p>

If a backtick is to be displayed in the code area, several backticks can be used before and after the code area:

    `` `Irgendwo hier (`) a backtick is hidden. ''

This becomes:

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

The backtick separators around a code area can contain spaces - one after the opening backtick, one before the closing backtick. This enables backticks to be used within the code area, even at the beginning or end:

A single backtick in a code area: `` ` ` ''

A backtick-enclosed string in a code area: `` `foo` ``

becomes:

<p>A single backtick in a code area: <code>`</code></p>

<p>A backtick-enclosed string in a code area: <code>`foo`</code></p>

In code areas, the ampersand and angle brackets are encoded as an HTML entity.

    Nobody uses `<blink>` tags.

This becomes:

<p>Nobody uses <code>&lt;blink&gt;</code> tags.</p>

The following also works:

    `&#8212;` is the decimally coded equivalent of `&mdash;`.

This is going to

<p><code>&amp;#8212;</code> is the decimally encoded equivalent of <code>&amp;mdash;</code> .</p>

<a id="img"></a>

### Graphics Admittedly, it is quite difficult to find a "natural" syntax for including graphics in text.
Markdown uses a syntax that is designed to be similar to the style of links. This allows two types: inline and reference.

The inline syntax looks like this:

    ![Alternative text](../../de/community/pfad/zum/bild.jpg)

    ![Alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation mark: `!`;
* followed by a set of square brackets denoting the value of the

    Contain `alt` attributes for the graphic;

* followed by round brackets indicating the URL or the path to the graphic

as well as the value of an optional `title` attribute, wrapped in quotation marks.

Reference-style image references look like this:

    ! [Alternative text] [id]

"id" is the name of a defined picture reference. Image references are defined with the same syntax as link references:

[id]: url/zur/grafik  "Optionales title-Attribut"

Currently, Markdown has no syntax for specifying the size of a graphic. If this is necessary, the normal HTML tag `<img>` can be used.

* * *

<div id="misc"></div>

## Various
<a id="backslash"></a>

### Backslash masking
Markdown allows backslash masking to be used to write characters that otherwise have a specific meaning in Markdown's syntax.
For example, if you want to surround a word with asterisks (instead of the HTML tag `<em>`), you can put backslashes in front of the asterisks:

  \ *Surrounded by asterisks \*

Markdown offers this possibility for the following characters:

\ Backslash `Backtick

    * Asterisk

_ Underscore {} curly brackets [] square brackets () round brackets

# Hash + plus sign
    - minus sign (hyphen)

. Point ! Exclamation mark

* * *

<a id="lizenz"></a>

### License
This work is licensed under a [Creative Commons Attribution - Share Alike (BY-SA) 4.0 International License] [by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?> This is a translation of the [original syntax documentation] [osd] by [John Grubers] [jg] [Markdown] [md]. This translation refers to the status of December 15, 2013 (Markdown Version 1.0.1). No guarantee is given for the correctness of the translation. If there are errors in the translation, please send a short message to <lasar@liepins.net>.
Any other kind of feedback is also welcome. *

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax