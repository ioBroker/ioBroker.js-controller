---
title: Markdown
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: nHQJvm435hzSoVxk8r0edx7VWed2QP55UFCl+8JsTW4=
---
# Markdown: Syntax
?> To make ioBroker documentation easy to create and read, Markdown was chosen as a simplified markup language. The following guide will help you understand the syntax and possibilities of Markdown and translate it into great documents.

Technically, the documentation system supports only the following features:

- Headers
- Tables
- Inline HTML
- Lists
- Left
- Images
- Bold text
- Italic text

<div id="overview"></div>

## Overview
<div id="philosophy"></div>

### Philosophy
Markdown was designed with the basic idea of being as easy to read and write as possible.

Legibility is the ultimate goal here. A Markdown-formatted document should be able to be published in its basic form without appearing to be tagged or formatted (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been chosen wisely so that their appearance corresponds to their meaning.
For example, asterisks around a word actually look like an \ *stress \* Lists in Markdown look like lists. Even quotation blocks look like quoted passages, as they are known from emails.

<div id="html"></div>

### Inline HTML
Markdown's syntax has one purpose: being used to *write* to the web.

Markdown is not a substitute for HTML, not even ansatzweise. The scope of the syntax is very small and only a small part of all HTML tags. It is not Markdown's intention to facilitate the insertion of HTML tags. HTML is already easy enough. The idea behind Markdown is to read, write, and edit text as easily as possible. HTML is a *publication format* Markdown is a *write format* Therefore, its syntax only takes into account content that can be conveyed with plain text.

For any formatting that is not feasible with Markdown, simply HTML can be used. It is not necessary to mark HTML to distinguish it from the rest. It is simply written in the text.

The only restriction is block elements such as e.g. `<div>`, `<table>`, `<pre>`, `<p>` and so on. They must be separated from the surrounding content by empty lines, and the start and end tags should not be indented with spaces or tabs. Markdown is smart enough not to place any additional (unwanted) `<p>` tags around HTML blocks.

For example, build an HTML table into a Markdown article:

    This is a normal paragraph.

<table><tr><td> foo </td></tr></table>

    This is still a normal paragraph.

It should be noted that Markdown's syntax is not interpreted within HTML blocks. For example, no *emphasis* within HTML blocks can be used.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can be used anywhere in a markdown paragraph, bullet or header. HTML tags can even be used instead of the appropriate markdown formatting. It is no problem to use instead of Markdows syntax for links or graphics just `<a>` or `<img>`.

Unlike block tags ** the markdown syntax is interpreted within inline tags.

<a id="autoescape"></a>

### Automatic masking of special characters
In HTML, there are two characters that require special treatment: `<` and `&`. The left angle bracket is used to open HTML tags, the ampersand and is used to describe named characters (entities). If these characters are to be used in HTML documents as "themselves", they must be masked as entities, that is, as `&lt;` and `&amp;`.

The mercantile and is especially impractical for web developers. If you want to write about "AT & T", you have to write "`AT&amp;T`". The mercantile and even needs to be masked in URLs. In a link to the page

    `http://images.google.com/images?num=30&q=larry+bird`

the URL must be encoded as follows:

    `http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget, and probably the most popular mistake in validating otherwise well-formed HTML documents.

Markdown allows you to use these characters as normal. It controls the coding itself. If a merchant-and is used in an entity, it is not coded, otherwise converted to `&amp;`.

So if you want to enter a copyright symbol, for example, you can easily

    & Copy;

write, and Markdown will not modify that. But out

    AT & T

will Markdown

    AT &amp; T

do. Because Markdown Inline supports HTML, angle brackets are normally treated as HTML in the corresponding case. Only from things like

    4 <5

will Markdown

    4 &lt; 5

do. In code or span blocks, angle brackets and ampersand are *always* coded. This simplifies writing via HTML in Markdown (unlike raw HTML, where it is usually a nightmare to encode each `<` and `&`).

* * *

<div id="block"></div>

## Block elements
<a id="p"></a>

### Paragraphs and Line Breaks A paragraph is simply one or more lines of text separated by one or more blank lines. (A blank line is any line that looks *like* a blank line - a line that contains nothing but spaces and tabs are treated as empty.) Normal paragraphs should not be indented with spaces or tabs.
The "one or more lines" rule implies one thing: Markdown supports paragraphs with "hard upheavals". This is very different from most other text-to-HTML formatters (including the Movable Type Convert Line Breaks option), which format each line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as break, you can simply end the line with two or more spaces.

Although this is a small overhead to create a `<br />`, a simple "any newline is a `<br />`" rule would not work in Markdown.

Markdown's email-style [quotes] [bq] and [list-entries] [l] works best - and looks better - when formatted with newlines.

[bq]: #blockquote

[l]:  #list

<a id="header"></a>

### Headers Markdown here only supports one kind of header formatting: atx.
Atx-like headers use 1-6 diamond characters at the beginning of the line, corresponding to levels 1-6. For example:

    # This is a H1
    ## This is an H2
    ###### This is an H6
<a id="blockquote"></a>

### Quotes
Markdown uses - like emails - the character `>` for quote blocks.
If you have experience with quotes in emails, you also know how to create quotes in Markdown. It looks best if you wrap the text per line and put a `>` in front of each line:

> This is a quote with two paragraphs. Lorem ipsum dolor sit amet,> consectetuer adipiscing elit. Aliquam hendrerit mi posuere> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet> vitae, risus.
>> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
> Suspendisse id sem consectetuer libero luctus adipiscing.

Markdown also allows you to be lazy and to use `>` only on the first line of a hard-wrapped paragraph:

> This is a quote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.

Quotes can be nested (ie quote in a quote) by using more `>`:

> This is the first quote level.
>>> This is a nested quote.
>> Back to the first level.

Quotes can include other markdown elements, including headers, lists, and code blocks:

> ## This is a headline.
>> 1. This is the first bullet point.
> 2. This is the second bullet point.
>> Here is some example code:>> return shell_exec ("echo $ input | $ Markdown_script");

Any sensible text editor should make e-mail citation easy. In BBEdit, for example, you can make a selection and select the item `Increase Quote Level` from the menu `Text`.

<a id="list"></a>

### Lists
Markdown supports sorted (numbered) and unsorted lists.

Unsorted lists use asterisks, plus and hyphens - interchangeable - as list markers:

    * Red
    * Green
    * Blue

is equal to:

+ Red + green + blue

And:

    - red
    - Green
    - Blue

Sorted lists use numbers with the following point:

    1st dog
    2. Cat
    3. Mouse

It is important to understand that the numbers themselves have no effect on the output of Markdown. Markdown creates the following HTML code from the last list:

<ol><li> dog </li><li> cat </li><li> mouse </li></ol>

If you write the list instead:

    1st dog
    1st cat
    1st mouse

Or even:

    3rd dog
    1st cat
    8. Mouse

Still, the same list comes out every time. If desired, one can number his lists by hand correctly. But if you want to be lazy, you can confidently use the same number.

However, you should also start the list with the number 1. In the future, Markdown may want to set a starting digit for the first list entry.

List entries usually begin at the left edge of the document, but they can be indented up to three spaces to the right.
List markers must be separated by one or more spaces or a tab from the following text.

To format lists nicely, the individual entries can be further indented, as here:

    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

        Suspendisse id sem consectetuer libero luctus adipiscing.

The following example generates the same code but is less tidy:

    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    Suspendisse id sem consectetuer libero luctus adipiscing.

If list entries are separated by blank lines, Markdown will wrap the list entries with `<p>` and `</p>`.

For example, this will:

    * Warsteiner
    * King

to

<ul><li> Warsteiner </li><li> king </li></ul>

But this:

    * Warsteiner

    * King

becomes

<ul><li><p> Warsteiner </p></li><li><p> king </p></li></ul>

List items can consist of multiple paragraphs. Each following paragraph in a bullet must be indented with at least 4 spaces or a tab:

    1. This is a bullet point with two paragraphs. Lorem ipsum dolor

sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    2. Suspendisse id sem consectetuer libero luctus adipiscing.

It looks good if each line of the following paragraph is indented, but again Markdown allows the lazy one to indent only the first line:

    * This is a bullet point with two paragraphs

This is the second paragraph in this list item. Only the first line must be indented. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

    * Another point in the same list.

To use a quote in a bullet, the quote must be indented:

    * A bullet with a quote:

> This is a quote> In a list.

To use a block of code in a bullet it must be indented *twice* - 8 spaces or two tabs:

    * A list item with code example:

            <insert code here>

It is possible to unintentionally create lists by e.g.
the following writes:

    1986. What a wonderful year.

In other words, the sequence *number-point-space* at the beginning of a line. To avoid this problem, the point can be masked by backslash:

    1986 \. What a wonderful year.

<h3 id="precode"> Code blocks </h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines in a code block are interpreted as found. Markdown includes code blocks with the tags `<pre>` and `<code>`.

To create a code block in Markdown, simply indent each line of the block with at least 4 leverage or a tab. From the following input ...

    This is a normal paragraph.

        This is a code block.

... does Markdown the following:

<p> This is a normal paragraph. </p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

A level of indentation - 4 spaces or 1 tab - are removed from each indent line. The following, for example ...

    An example in AppleScript:

tell application "Foo" beep end tell

...becomes

<p> An example in AppleScript: </p>

<pre><code>tell application "Foo" beep end tell </code></pre>

A code block ends at the first line that is not indented (or at the end of the document).

In a code block, the ampersand (`&`) and angle brackets (`<` and `>`) are automatically converted into HTML entities. This greatly facilitates the incorporation of HTML pieces - simply copy HTML into the document, indent, and Markdown does the coding of the ampersand and angle brackets. For example:

<div class="footer"> © 2004 Foo Corporation </div>

becomes:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Normal markdown syntax is not processed in code blocks. That
Asterisks are just asterisks in a block of code, not the signal to emphasize the text. The consequence is that it's easy to talk about Markdown in Markdown *.

<a id="hr"></a>

### Horizontal lines The tag for horizontal lines (`<hr />`) can be generated by writing 3 or more hyphens or asterisks on one line only. Spaces between the characters are also allowed. All the following examples would generate a horizontal line:
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
Markdown supports two types of links: *Inline* and *References*

In both styles, the link text is marked with [square brackets].

To create an inline link write normal parentheses just behind the closing square bracket. In these brackets, the URL is written to be linked together with an *optional* title for the link in quotation marks. Examples:

This is [an example](http://example.com/ "Der Linktitel") for an inline link.

    [This link](http://example.net/) has no title attribute.

It becomes:

<p> This is <a href="http://example.com/" title="title">an example</a> of an inline link. </p>

<p> <a href="http://example.net/">This link</a> has no title attribute. </p>

If you want to refer to content on the same server, you can use relative paths:

    Further information can be found on the page [About me](/about/).

Reference links use a second set of square brackets in which an arbitrary identifier for the link is written:

    This is [an example] [id] for a reference link.

You can also insert a space between the parentheses as you wish:

    This is [an example] [id] for a reference link.

Then, somewhere in the document, the link is defined on a separate line as follows:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

So:

* Square brackets containing the link identifier (optionally with

    indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the title attribute of the link,

    wrapped in parentheses, single or double quotes.

The following three definitions are identical:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

** Note: ** There is a known bug in Markdown 1.0.1 that hinders the function of single quotes as a separator for link titles.

The link URL can optionally be packed in angle brackets:

[id]: <http://example.com/>  "Optionaler Titel hier"

The title attribute can also be set to the next line and indented with more spaces or tabs. This looks better with long URLs:

[id]: http://example.com/langer/pfad/zu/seite

        "Optional title here"

Link definitions are only used to create links while Markdown processes the document and are removed from the document before the HTML is output.

The identifiers for link definitions may consist of letters, numbers, spaces, and punctuation marks. They are *independent* of uppercase and lowercase:

[Link text] [a] [link text] [A]

The two link definitions are equivalent.

The *implied link identifier* allows you to omit the link identifier. In this case, the link text is used as the identifier. An empty set of square brackets is simply added to the link text:

[Google] []

Then the link is defined:

[Google]: http://google.com/

Since link identifiers may contain spaces, this abbreviation even works for multiple words in the link text:

Visit [Daring Fireball] [] for more information.

Then the link is defined:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be made anywhere in the Markdown document. In general, it is a good idea to make them according to the paragraph in which they are used. But they can also be listed as footnotes together at the end of the document.

A small example:

I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

The abbreviation of the implied link identifier can also be used to write:

I get 10 times more traffic from [Google] [] than from [Yahoo] [] or [MSN] [].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Both examples would produce the following HTML code:

<p> I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a> . </p>

For comparison, the same paragraph follows using Markdown's inline links:

I get 10 times more traffic from [Google](http://google.com/ "Google") than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or [MSN](http://search.msn.com/ "MSN Search").

The idea behind reference links is not that they are easier to write. The idea is that they make documents much more readable. The example paragraph is only 80 characters long with reference links, with reference links it is a full 181 characters long; as HTML, it is 239 characters, more markup than content.

With Markdown's reference links, the source document is more like the final output format, as shown in the browser. The ability to extract metadata for markup from the paragraph allows links to be integrated into the text without slowing down the flow of text.

<a id="em"></a>

### Emphasis Markdown treats asterisks (`*`) and underscores (`_`) as indicators for emphasis. Text packed in individual `*` or `_` is enclosed with the HTML tag `<em>`, duplicate `*` or `_` are marked with the tag `<strong>` , Following text for example:
    *Single stars*

    _Single underscores_

    ** double stars **

    __Double underscores__

Will spend:

<em>Single stars</em>

<em>Individual underscores</em>

<strong>Double asterisks</strong>

<strong>Double underscores</strong>

The style can be chosen arbitrarily. The only limitation is that the same character must be used to open and close an emphasis area.

Emphasis can be used in the midst of a word:

  Mr. *god* sacrament

But when a `*` or `_` is surrounded by spaces, it is treated like a simple asterisk or a simple underscore.

To write an asterisk or underscore at a point where it would be understood as an accent, it can be masked with a backslash:

  \ *This text is surrounded by asterisks \*

<a id="code"></a>

### Code To mark a code area, it is enclosed with backtick characters (`` `` `). Unlike a code block, a code area formats code within a normal paragraph:
    Use the `printf()` function to output text.

Becomes:

<p> Use the <code>printf()</code> function to <code>printf()</code> text. </p>

If a backtick is to be displayed in the code area, then several backticks before and after the code area can be used:

    ``Irgendwo hier (`) is a backtick hidden```

This becomes:

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

The backtick delimiters around a range of code may include spaces - one after the opening one, one before the closing backtick. This allows the use of backticks within the code area also at the beginning or end:

A single back tick in a code area: `` `` `

A backtick enclosed string in a code area: `` `foo` ``

becomes:

<p> A single back tick in a code area: <code>`</code> </p>

<p> A backtick enclosed string in a code area: <code>`foo`</code> </p>

In code areas, the commercial and angle brackets are coded as HTML Entitiy.

    Nobody uses `<blink>` tags.

This becomes:

<p> Nobody uses <code>&lt;blink&gt;</code> tags. </p>

Also works like this:

    `&#8212;` is the decimal coded equivalent of `&mdash;`.

This is going to happen

<p> <code>&amp;#8212;</code> is the decimal coded equivalent of <code>&amp;mdash;</code> , </p>

<a id="img"></a>

Admittedly, it is quite difficult to find a "natural" syntax for embedding graphics in text.
Markdown uses a syntax similar to the style of links. This allows two types: inline and reference.

The inline syntax looks like this:

    ![Alternative text](../../de/community/pfad/zum/bild.jpg)

    ![Alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation point: `!`;
* followed by a set of square brackets showing the value of the

    `alt` Attributes for the graphic included;

* followed by parentheses indicating the URL or path to the graphic

and the value of an optional `title` attribute, packed in quotes.

Image references in reference style look like this:

    ! [Alternative text] [id]

"id" is the name of a defined image reference here. Image references are defined with the same syntax as link references:

[id]: url/zur/grafik  "Optionales title-Attribut"

Currently, Markdown does not have syntax for specifying the size of a graphic. Should this be necessary, the normal HTML tag `<img>` can be used.

* * *

<div id="misc"></div>

## Various
<a id="backslash"></a>

### Backslash masking
Markdown makes it possible to use backslash masking to write characters that otherwise have a meaning in Markdown's syntax.
For example, if you want to surround a word with asterisks (instead of the HTML tag `<em>`), you can put backslashes in front of the asterisks:

  \ *Surrounded by asterisks \*

Markdown provides this facility for the following characters:

Backslash Backtick

    * Asterisk

_ Underline {} Curly braces [] Square brackets () Round brackets

# Rhombus + plus sign
    - minus sign (hyphen)

, Point ! exclamation mark

* * *

<a id="lizenz"></a>

### License
This work is licensed under a Creative Commons Attribution-ShareAlike (BY-SA) 4.0 International License] [by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?> This is a translation of [original syntax documentation] [osd] by [John Grubers] [jg] [Markdown] [md]. This translation refers to the status of 15.12.2013 (Markdown Version 1.0.1). No guarantee is given for the correctness of the translation. If there are errors in the translation, please send a short message to <lasar@liepins.net>.
Any other kind of feedback is welcome too. *

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax