---
title: Markdown
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: c2qfK1BCvNDEaHCS0sUD3o+3w+8yja0yz/VoJdiBng4=
---
Markdown: Syntax ===============

?> To make ioBroker documentation easy to create and read, Markdown was chosen as a simplified markup language. The following guide will help you understand the syntax and possibilities of Markdown and translate it into great documents.

Technically, the documentation system supports the following features:

| Variant | Version |
|------|-------|
| Original markdown.pl | - |
| Common Mark | 12:28 |
| GitHub Flavored Markdown | 0.28 |

In addition, an extension for the use of [Emojies](#emojies) is integrated.

Content ------

* [Overview](#overview)
    * [philosophy](#philosophy)
    * [Inline HTML](#html)
    * [Automatic masking of special characters](#autoescape)
* [Block elements](#block)
    * [Paragraphs and newlines](#p)
    * [headers](#header)
    * [Quotes](#blockquote)
    * [lists](#list)
    * [Code blocks](#precode)
    * [Horizontal lines](#hr)
* [Clamping elements](#span)
    * [Left](#link)
    * [Emphasis](#em)
    * [code](#code)
    * [graphics](#img)
* [various](#misc)
    * [Automatic links](#autolink)
    * [Backslash masking](#backslash)
* [Emojies](#emojies)

<div id="overview"></div>

## Overview
<h3 id="philosophy"> philosophy </h3>

Markdown was designed with the basic idea of being as easy to read and write as possible.

Legibility is the ultimate goal here. A Markdown-formatted document should be able to be published in its basic form without appearing to be tagged or formatted (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been chosen wisely so that their appearance corresponds to their meaning.
For example, asterisks around a word actually look like an \ *stress \* Lists in Markdown look like lists. Even quotation blocks look like quoted passages, as they are known from emails.

<h3 id="html"> Inline HTML </h3>

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

<h3 id="autoescape"> Automatic masking of special characters </h3>

In HTML, there are two characters that require special treatment: `<` and `&`. The left angle bracket is used to open HTML tags, the ampersand and is used to describe named characters (entities). If these characters are to be used in HTML documents as "themselves", they must be masked as entities, that is, as `&lt;` and `&amp;`.

The mercantile and is especially impractical for web developers. If you want to write about "AT & T", you have to write "`AT&amp;T`". The mercantile and even needs to be masked in URLs. In a link to the page

    http://images.google.com/images?num=30&q=larry+bird

the URL must be encoded as follows:

    http://images.google.com/images?num=30&amp;q=larry+bird

This is easy to forget, and probably the most popular mistake in validating otherwise well-formed HTML documents.

Markdown allows you to use these characters as normal. It controls the coding itself. If a merchant-and is used in an entity, it is not coded, otherwise converted to `&amp;`.

So if you want to enter a copyright symbol, for example, you can just

    & Copy;

write, and Markdown will not modify that. But out

    AT & T

will Markdown

    AT &amp; T

do. Because Markdown Inline supports HTML, angle brackets are normally treated as HTML in that case. Only from things like

    4 <5

will Markdown

    4 & lt; 5

do. In code or span blocks, angle brackets and ampersand are *always* encoded. This simplifies writing via HTML in Markdown (unlike raw HTML, where it is usually a nightmare to encode each `<` and `&`).

* * *

<div id="block"></div>

## Block elements
<h3 id="p"> Paragraphs and newlines </h3>

A paragraph is simply one or more lines of text separated by one or more blank lines. (A blank line is any line that looks *like* a blank line - a line that contains nothing but spaces and tabs are treated as empty.) Normal paragraphs should not be indented with spaces or tabs.

The "one or more lines" rule implies one thing: Markdown supports paragraphs with "hard upheavals". This is very different from most other text-to-HTML formatters (including the Movable Type Convert Line Breaks option), which format each line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as break, you can simply end the line with two or more spaces.

Although this is a small overhead to create a `<br />`, a simple "any newline is a `<br />`" rule would not work in Markdown.

Markdown's email-style [quotes] [bq] and [list-entries] [l] works best - and looks better - when formatted with newlines.

[bq]: #blockquote [l]: #list

<h3 id="header"> headers </h3>

Markdown supports two types of header formatting, [Setext] [1] and [atx] [2].

Setext-like headers are underlined with equal signs (for first level headings) and hyphens (for second level). For example:

This is a H1 ==============

This is an H2 ---------------

Any number of `=` or `-` works.

Atx-like headers use 1-6 diamond characters at the beginning of the line, corresponding to levels 1-6. For example:

    # This is a H1
    ## This is an H2
    ###### This is an H6
If desired, atx-like headers may also be "closed".
This is just cosmetic - it can be used if it looks better.
The number of closing diamond characters does not even have to match the number of opening characters.

    # This is a H1 #
    ## This is an H2 ##
    ### This is a H3 ######
<h3 id="blockquote"> Quotes </h3>

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

<h3 id="list"> lists </h3>

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

<h3 id="hr"> Horizontal lines </h3>

The horizontal line tag (`<hr />`) can be generated by writing 3 or more hyphens or asterisks on a single line. Spaces between the characters are also allowed. All the following examples would generate a horizontal line:

    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span elements
<h3 id="link"> Left </h3>

Markdown supports two types of links: *Inline* and *References*

In both styles, the link text is marked with [square brackets].

To create an inline link write normal brackets directly behind the closing square bracket. In these brackets, the URL is written to be linked together with an *optional* title for the link in quotation marks. Examples:

This is §§LLLL_0§§ for an inline link.

    [This link](http://example.net/) has no title attribute.

It becomes:

<p> This is <a href="http://example.com/" title="title">an example</a> of an inline link. </p>

<p> <a href="http://example.net/">This link</a> has no title attribute. </p>

If you want to refer to content on the same server, you can use relative paths:

    Further information can be found on the page [About me](/about/).

Reference links use a second set of square brackets in which an arbitrary identifier for the link is written:

    This is [an example] [id] for a reference link.

You can also insert a space between the parentheses as you like:

    This is [an example] [id] for a reference link.

Then, somewhere in the document, the link is defined on a separate line as follows:

    [id]: http://example.com/ "Enter optional title here"

So:

* Square brackets containing the link identifier (optionally with

    indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the title attribute of the link,

    wrapped in parentheses, single or double quotes.

The following three definitions are identical:

[foo]: http://example.com/ "Optional Title" [foo]: http://example.com/ 'Optional Title' [foo]: http://example.com/ (Optional Title)

** Note: ** There is a known bug in Markdown 1.0.1 that hinders the function of single quotes as a separator for link titles.

The link URL can optionally be packed in angle brackets:

    [id]: <http://example.com/> "Optional title here"

The title attribute can also be set to the next line and indented with more spaces or tabs. This looks better with long URLs:

[id]: http://example.com/langer/pfad/zu/seite "Optional title here"

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

[1]: http://google.com/ "Google" [2]: http://search.yahoo.com/ "Yahoo Search" [3]: http://search.msn.com/ "MSN Search "

The abbreviation of the implied link identifier can also be used to write:

I get 10 times more traffic from [Google] [] than from [Yahoo] [] or [MSN] [].

[google]: http://google.com/ "Google" [yahoo]: http://search.yahoo.com/ "Yahoo Search" [msn]: http://search.msn.com/ "MSN Search "

Both examples would produce the following HTML code:

<p> I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a> . </p>

For comparison, the same paragraph follows using Markdown's inline links:

I get 10 times more traffic from [Google](http://google.com/ "Google") than from §§LLLL_1§§ or §§LLLL_2§§.

The idea behind reference links is not that they are easier to write. The idea is that they make documents much more readable. The example paragraph is only 80 characters long with reference links, with reference links it is a full 181 characters long; as HTML, it is 239 characters, more markup than content.

With Markdown's reference links, the source document is more like the final output format, as shown in the browser. The ability to extract metadata for markup from the paragraph allows links to be integrated into the text without slowing down the flow of text.

<h3 id="em"> Emphasis </h3>

Markdown treats asterisks (`*`) and underscores (`_`) as indicators for emphasis. Text packed in individual `*` or `_` is enclosed with the HTML tag `<em>`, double `*` or `_` are marked with the tag `<strong>` , Following text for example:

    * Single stars *

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

<h3 id="code"> code </h3>

To mark a code area, it is enclosed with backtick characters (`` `` `). Unlike a code block, a code area formats code within a normal paragraph:

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

<h3 id="img"> graphics </h3>

Admittedly, it is quite difficult to find a "natural" syntax for embedding graphics in text.

Markdown uses a syntax that is similar to the style of links. This allows two types: inline and reference.

The inline syntax looks like this:

    ![Alternative text](../../de/community/pfad/zum/bild.jpg)

    ![Alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation mark: `!`;
* followed by a set of square brackets showing the value of the

    `alt` Attributes for the graphic included;

* followed by parentheses indicating the URL or path to the graphic

and the value of an optional `title` attribute, packed in quotes.

Image references in reference style look like this:

    ! [Alternative text] [id]

"id" is the name of a defined image reference here. Image references are defined with the same syntax as link references:

    [id]: url / to / image "optional title attribute"

Currently, Markdown does not have syntax for specifying the size of a graphic. Should this be necessary, the normal HTML tag `<img>` can be used.

* * *

<div id="misc"></div>

## Various
<h3 id="autolink"> Automatic links </h3>

Markdown supports a simple style to "automatically" generate links for URLs and email addresses: the URL or email address is simply enclosed in angle brackets. If you want to show a URL or email address directly, you can do it this way:

    <Http://example.com/>

Markdown will translate this into the following HTML code:

<a href="http://example.com/">http://example.com/</a>

Automatic links for e-mail addresses work similarly, except that Markdown here randomly converts the address into decimal and hexadecimal entity encoding to help make the address inaccessible to spambots. For example:

<address@example.com>

This becomes something like the following:

<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65; &#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111; &#109;">address @ exa mple.com</a>

In the browser, this will appear as a clickable link to the address "address@example.com".

(This trick will shatter many, if not most, of the address collectors, but it will definitely not catch everyone, it's better than nothing, but eventually such a public address will also receive spam.)

<h3 id="backslash"> Backslash masking </h3>

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

<div id="emojies"></div>

## Usable emojis
### People
|     |    |
|: Bowtie: | `:bowtie:` |
|: Smile: | `:smile:` |
|: Laughing: | `:laughing:` |
|: Blush: | `:blush:` |
|: Smiley: | `:smiley:` |
|: Relaxed: | `:relaxed:` |
|: Smirk: | `:smirk:` |
|: Heart_eyes: | `:heart_eyes:` |
|: Kissing_heart: | `:kissing_heart:` |
|: Kissing_closed_eyes: | `:kissing_closed_eyes:` |
|: Flushed: | `:flushed:` |
|: Relieved: | `:relieved:` |
|: Satisfied: | `:satisfied:` |
|: Grin: | `:grin:` |
|: Wink: | `:wink:` |
|: Stuck_out_tongue_winking_eye: | `:stuck_out_tongue_winking_eye:` |
|: Stuck_out_tongue_closed_eyes: | `:stuck_out_tongue_closed_eyes:` |
|: Grinning: | `:grinning:` |
|: Kissing: | `:kissing:` |
|: Kissing_smiling_eyes: | `:kissing_smiling_eyes:` |
|: Stuck_out_tongue: | `:stuck_out_tongue:` |
|: Sleeping: | `:sleeping:` |
|: Worried: | `:worried:` |
|: Frowning: | `:frowning:` |
|: Anguished: | `:anguished:` |
|: Open_mouth: | `:open_mouth:` |
|: Grimacing: | `:grimacing:` |
|: Confused: | `:confused:` |
|: Hushed: | `:hushed:` |
|: Expressionless: | `:expressionless:` |
|: Unamused: | `:unamused:` |
|: Sweat_smile: | `:sweat_smile:` |
|: Sweat: | `:sweat:` |
|: Disappointed_relieved: | `:disappointed_relieved:` |
|: Weary: | `:weary:` |
|: Pensive: | `:pensive:` |
|: Disappointed: | `:disappointed:` |
|: Confounded: | `:confounded:` |
|: Fearful: | `:fearful:` |
|: Cold_sweat: | `:cold_sweat:` |
|: Persevere: | `:persevere:` |
|: Cry: | `:cry:` |
|: Sob: | `:sob:` |
|: Joy: | `:joy:` |
|: Astonished: | `:astonished:` |
|: Scream: | `:scream:` |
|: Neckbeard: | `:neckbeard:` |
|: Tired_face: | `:tired_face:` |
|: Angry: | `:angry:` |
|: Rage: | `:rage:` |
|: Triumph: | `:triumph:` |
|: Sleepy: | `:sleepy:` |
|: Yum: | `:yum:` |
|: Mask: | `:mask:` |
|: Sunglasses: | `:sunglasses:` |
|: Dizzy_face: | `:dizzy_face:` |
|: Imp: | `:imp:` |
|: Smiling_imp: | `:smiling_imp:` |
|: Neutral_face: | `:neutral_face:` |
|: No_mouth: | `:no_mouth:` |
|: Innocent: | `:innocent:` |
|: Alien: | `:alien:` |
|: Yellow_heart: | `:yellow_heart:` |
|: Blue_heart: | `:blue_heart:` |
|: Purple_heart: | `:purple_heart:` |
|: Heart: | `:heart:` |
|: Green_heart: | `:green_heart:` |
|: Broken_heart: | `:broken_heart:` |
|: Heartbeat: | `:heartbeat:` |
|: Heart pulse: | `:heartpulse:` |
|: Two_hearts: | `:two_hearts:` |
|: Revolving_hearts: | `:revolving_hearts:` |
|: Cupid: | `:cupid:` |
|: Sparkling_heart: | `:sparkling_heart:` |
|: Sparkles: | `:sparkles:` |
|: Star: | `:star:` |
|: Star2: | `:star2:` |
|: Dizzy: | `:dizzy:` |
|: Boom: | `:boom:` |
|: Collision: | `:collision:` |
|: Anger: | `:anger:` |
|: Exclamation: | `:exclamation:` |
|: Question: | `:question:` |
|: Grey_exclamation: | `:grey_exclamation:` |
|: Grey_question: | `:grey_question:` |
|: Zzz: | `:zzz:` |
|: Dash: | `:dash:` |
|: Sweat_drops: | `:sweat_drops:` |
|: Notes: | `:notes:` |
|: Musical_note: | `:musical_note:` |
|: Fire: | `:fire:` |
|: Hankey: | `:hankey:` |
|: Poop: | `:poop:` |
|: Shit: | `:shit:` |
|: Thumbsup: | `:thumbsup:` |
|: Thumbsdown: | `:thumbsdown:` |
|: Ok_hand: | `:ok_hand:` |
|: Punch: | `:punch:` |
|: Facepunch: | `:facepunch:` |
|: Fist: | `:fist:` |
| V: | `:v:` |
|: Wave: | `:wave:` |
|: Hand: | `:hand:` |
|: Raised_hand: | `:raised_hand:` |
|: Open_hands: | `:open_hands:` |
|: Point_up: | `:point_up:` |
|: Point_down: | `:point_down:` |
|: Point_left: | `:point_left:` |
|: Point_right: | `:point_right:` |
|: Raised_hands: | `:raised_hands:` |
|: Pray: | `:pray:` |
|: Point_up_2: | `:point_up_2:` |
|: Clap: | `:clap:` |
|: Muscle: | `:muscle:` |
|: Metal: | `:metal:` |
|: Fu: | `:fu:` |
|: Runner: | `:runner:` |
|: Running: | `:running:` |
|: Couple: | `:couple:` |
|: Family: | `:family:` |
|: Two_men_holding_hands: | `:two_men_holding_hands:` |
|: Two_women_holding_hands: | `:two_women_holding_hands:` |
|: Dancer: | `:dancer:` |
|: Dancers: | `:dancers:` |
|: Ok_woman: | `:ok_woman:` |
|: No_good: | `:no_good:` |
|: Information_desk_person: | `:information_desk_person:` |
|: Raising_hand: | `:raising_hand:` |
|: Bride_with_veil: | `:bride_with_veil:` |
|: Person_with_pouting_face: | `:person_with_pouting_face:` |
|: Person_frowning: | `:person_frowning:` |
|: Bow: | `:bow:` |
|: Couple kiss: | `:couplekiss:` |
|: Couple_with_heart: | `:couple_with_heart:` |
|: Massage: | `:massage:` |
|: Haircut: | `:haircut:` |
|: Nail_care: | `:nail_care:` |
|: Boy: | `:boy:` |
|: Girl: | `:girl:` |
|: Woman: | `:woman:` |
|: It: | `:man:` |
|: Baby: | `:baby:` |
|: Older_woman: | `:older_woman:` |
|: Older_man: | `:older_man:` |
|: Person_with_blond_hair: | `:person_with_blond_hair:` |
|: Man_with_gua_pi_mao: | `:man_with_gua_pi_mao:` |
|: Man_with_turban: | `:man_with_turban:` |
|: Construction_worker: | `:construction_worker:` |
|: Cop: | `:cop:` |
|: Angel: | `:angel:` |
|: Princess: | `:princess:` |
|: Smiley_cat: | `:smiley_cat:` |
|: Smile_cat: | `:smile_cat:` |
|: Heart_eyes_cat: | `:heart_eyes_cat:` |
|: Kissing_cat: | `:kissing_cat:` |
|: Smirk_cat: | `:smirk_cat:` |
|: Scream_cat: | `:scream_cat:` |
|: Crying_cat_face: | `:crying_cat_face:` |
|: Joy_cat: | `:joy_cat:` |
|: Pouting_cat: | `:pouting_cat:` |
|: Japanese_ogre: | `:japanese_ogre:` |
|: Japanese_goblin: | `:japanese_goblin:` |
|: See_no_evil: | `:see_no_evil:` |
|: Hear_no_evil: | `:hear_no_evil:` |
|: Speak_no_evil: | `:speak_no_evil:` |
|: Guardsman: | `:guardsman:` |
|: Skull: | `:skull:` |
|: Feet: | `:feet:` |
|: Lips: | `:lips:` |
|: Kiss: | `:kiss:` |
|: Droplet: | `:droplet:` |
|: Ear: | `:ear:` |
|: Eyes: | `:eyes:` |
|: Nose: | `:nose:` |
|: Tongue: | `:tongue:` |
|: Love_letter: | `:love_letter:` |
|: Bust_in_silhouette: | `:bust_in_silhouette:` |
|: Busts_in_silhouette: | `:busts_in_silhouette:` |
|: Speech_balloon: | `:speech_balloon:` |
|: Thought_balloon: | `:thought_balloon:` |
|: Feel good: | `:feelsgood:` |
|: Finnadie: | `:finnadie:` |
|: Goberserk: | `:goberserk:` |
|: Godmode: | `:godmode:` |
|: Hurtrealbad: | `:hurtrealbad:` |
|: Rage1: | `:rage1:` |
|: Rage2: | `:rage2:` |
|: Rage3: | `:rage3:` |
|: Rage4: | `:rage4:` |
|: Suspect: | `:suspect:` |
|: Trollface: | `:trollface:` |
|: Trollface: | `: trollface:` |

### Nature
|     |    |
|: Sunny: | `:sunny:` |
|: Umbrella: | `:umbrella:` |
|: Cloud: | `:cloud:` |
|: Snowflake: | `:snowflake:` |
|: Snowman: | `:snowman:` |
|: Zap: | `:zap:` |
|: Cyclone: | `:cyclone:` |
|: Foggy: | `:foggy:` |
|: Ocean: | `:ocean:` |
|: Cat: | `:cat:` |
|: Dog: | `:dog:` |
|: Mouse: | `:mouse:` |
|: Hamster: | `:hamster:` |
|: Rabbit: | `:rabbit:` |
|: Wolf: | `:wolf:` |
|: Frog: | `:frog:` |
|: Tiger: | `:tiger:` |
|: Koala: | `:koala:` |
|: Bear: | `:bear:` |
|: Pig: | `:pig:` |
|: Pig_nose: | `:pig_nose:` |
|: Cow: | `:cow:` |
|: Boar: | `:boar:` |
|: Monkey_face: | `:monkey_face:` |
|: Monkey: | `:monkey:` |
|: Horse: | `:horse:` |
|: Racehorse: | `:racehorse:` |
|: Camel: | `:camel:` |
|: Sheep: | `:sheep:` |
|: Elephant: | `:elephant:` |
|: Panda_face: | `:panda_face:` |
|: Snake: | `:snake:` |
|: Bird: | `:bird:` |
|: Baby_chick: | `:baby_chick:` |
|: Hatched_chick: | `:hatched_chick:` |
|: Hatching_chick: | `:hatching_chick:` |
|: Chicken: | `:chicken:` |
|: Penguin: | `:penguin:` |
|: Turtle: | `:turtle:` |
|: Bug: | `:bug:` |
|: Honeybee: | `:honeybee:` |
|: Ant: | `:ant:` |
|: Beetle: | `:beetle:` |
|: Snail: | `:snail:` |
|: Octopus: | `:octopus:` |
|: Tropical_fish: | `:tropical_fish:` |
|: Fish: | `:fish:` |
|: Whale: | `:whale:` |
|: Whale2: | `:whale2:` |
|: Dolphin: | `:dolphin:` |
|: Cow2: | `:cow2:` |
|: Ram: | `:ram:` |
|: Advice: | `:rat:` |
|: Water_buffalo: | `:water_buffalo:` |
|: Tiger2: | `:tiger2:` |
|: Rabbit2: | `:rabbit2:` |
|: Dragon: | `:dragon:` |
|: Goat: | `:goat:` |
|: Rooster: | `:rooster:` |
|: Dog2: | `:dog2:` |
|: Pig2: | `:pig2:` |
|: Mouse2: | `:mouse2:` |
|: Ox: | `:ox:` |
|: Dragon_face: | `:dragon_face:` |
|: Blowfish: | `:blowfish:` |
|: Crocodile: | `:crocodile:` |
|: Dromedary_camel: | `:dromedary_camel:` |
|: Leopard: | `:leopard:` |
|: Cat2: | `:cat2:` |
|: Poodle: | `:poodle:` |
|: Paw_prints: | `:paw_prints:` |
|: Bouquet: | `:bouquet:` |
|: Cherry_blossom: | `:cherry_blossom:` |
|: Tulip: | `:tulip:` |
|: Four_leaf_clover: | `:four_leaf_clover:` |
|: Rose: | `:rose:` |
|: Sunflower: | `:sunflower:` |
|: Hibiscus: | `:hibiscus:` |
|: Maple_leaf: | `:maple_leaf:` |
|: Leaves: | `:leaves:` |
|: Fallen_leaf: | `:fallen_leaf:` |
|: Herb: | `:herb:` |
|: Mushroom: | `:mushroom:` |
|: Cactus: | `:cactus:` |
|: Palm_tree: | `:palm_tree:` |
|: Evergreen_tree: | `:evergreen_tree:` |
|: Deciduous_tree: | `:deciduous_tree:` |
|: Chestnut: | `:chestnut:` |
|: Seedling: | `:seedling:` |
|: Blossom: | `:blossom:` |
|: Ear_of_rice: | `:ear_of_rice:` |
|: Shell: | `:shell:` |
|: Globe_with_meridians: | `:globe_with_meridians:` |
|: Sun_with_face: | `:sun_with_face:` |
|: Full_moon_with_face: | `:full_moon_with_face:` |
|: New_moon_with_face: | `:new_moon_with_face:` |
|: New_moon: | `:new_moon:` |
|: Waxing_crescent_moon: | `:waxing_crescent_moon:` |
|: First_quarter_moon: | `:first_quarter_moon:` |
|: Waxing_gibbous_moon: | `:waxing_gibbous_moon:` |
|: Full_Moon: | `:full_moon:` |
|: Waning_gibbous_moon: | `:waning_gibbous_moon:` |
|: Last_quarter_moon: | `:last_quarter_moon:` |
|: Waning_crescent_moon: | `:waning_crescent_moon:` |
|: Last_quarter_moon_with_face: | `:last_quarter_moon_with_face:` |
|: First_quarter_moon_with_face: | `:first_quarter_moon_with_face:` |
|: Crescent_Moon: | `:crescent_moon:` |
|: Earth_africa: | `:earth_africa:` |
|: Earth_americas: | `:earth_americas:` |
|: Earth_asia: | `:earth_asia:` |
|: Volcano: | `:volcano:` |
|: Milky_way: | `:milky_way:` |
|: PARTLY_SUNNY: | `:partly_sunny:` |
|: Octocat: | `:octocat:` |
|: Squirrel: | `:squirrel:` |
|: Squirrel: | `: squirrel:` |

### Objects
|     |    |
|: Bamboo: | `:bamboo:` |
|: Gift_heart: | `:gift_heart:` |
|: Dolls: | `:dolls:` |
|: School_satchel: | `:school_satchel:` |
|: Mortar_board: | `:mortar_board:` |
|: Flags: | `:flags:` |
|: Fireworks: | `:fireworks:` |
|: Sparkler: | `:sparkler:` |
|: Wind_chime: | `:wind_chime:` |
|: Rice_scene: | `:rice_scene:` |
|: Jack_o_lantern: | `:jack_o_lantern:` |
|: Ghost: | `:ghost:` |
|: Santa: | `:santa:` |
|: Christmas_tree: | `:christmas_tree:` |
|: Gift: | `:gift:` |
|: Bell: | `:bell:` |
|: No_bell: | `:no_bell:` |
|: Tanabata_tree: | `:tanabata_tree:` |
|: Tada: | `:tada:` |
|: Confetti_ball: | `:confetti_ball:` |
|: Balloon: | `:balloon:` |
|: Crystal_ball: | `:crystal_ball:` |
|: Cd: | `:cd:` |
|: Dvd: | `:dvd:` |
|: Floppy_disk: | `:floppy_disk:` |
|: Camera: | `:camera:` |
|: Video_camera: | `:video_camera:` |
|: Movie_camera: | `:movie_camera:` |
|: Computer: | `:computer:` |
|: Tv: | `:tv:` |
|: Iphone: | `:iphone:` |
|: Phone: | `:phone:` |
|: Phone: | `:telephone:` |
|: Telephone_receiver: | `:telephone_receiver:` |
|: Pager: | `:pager:` |
|: Fax: | `:fax:` |
|: Minidisc: | `:minidisc:` |
|: VHS: | `:vhs:` |
|: Sound: | `:sound:` |
|: Speaker: | `:speaker:` |
|: Mute: | `:mute:` |
|: Loudspeaker: | `:loudspeaker:` |
|: Mega: | `:mega:` |
|: Hourglass: | `:hourglass:` |
|: Hourglass_flowing_sand: | `:hourglass_flowing_sand:` |
|: Alarm_clock: | `:alarm_clock:` |
|: Watch: | `:watch:` |
|: Radio: | `:radio:` |
|: Satellite: | `:satellite:` |
|: Loop: | `:loop:` |
|: Like: | `:mag:` |
|: Mag_right: | `:mag_right:` |
|: Unlock: | `:unlock:` |
|: Lock: | `:lock:` |
|: Lock_with_ink_pen: | `:lock_with_ink_pen:` |
|: Closed_lock_with_key: | `:closed_lock_with_key:` |
|: Key: | `:key:` |
|: Bulb: | `:bulb:` |
|: Flashlight: | `:flashlight:` |
|: High_brightness: | `:high_brightness:` |
|: Low_brightness: | `:low_brightness:` |
|: Electric_plug: | `:electric_plug:` |
|: Battery: | `:battery:` |
|: Calling: | `:calling:` |
| Email: | `:email:` |
|: Mailbox: | `:mailbox:` |
|: Postbox: | `:postbox:` |
|: Bath: | `:bath:` |
|: Bathtub: | `:bathtub:` |
|: Shower: | `:shower:` |
|: Toilet: | `:toilet:` |
|: Wrench: | `:wrench:` |
|: Nut_and_bolt: | `:nut_and_bolt:` |
|: Hammer: | `:hammer:` |
|: Seat: | `:seat:` |
|: Moneybag: | `:moneybag:` |
|: Yen: | `:yen:` |
|: Dollar: | `:dollar:` |
|: Pound: | `:pound:` |
|: Euro: | `:euro:` |
|: Credit_card: | `:credit_card:` |
|: Money_with_wings: | `:money_with_wings:` |
|: Inbox_tray: | `:inbox_tray:` |
|: Outbox_tray: | `:outbox_tray:` |
|: Envelope: | `:envelope:` |
|: Incoming_envelope: | `:incoming_envelope:` |
|: Postal_horn: | `:postal_horn:` |
|: Mailbox_closed: | `:mailbox_closed:` |
|: Mailbox_with_mail: | `:mailbox_with_mail:` |
|: Mailbox_with_no_mail: | `:mailbox_with_no_mail:` |
|: Package: | `:package:` |
|: Door: | `:door:` |
|: Smoking: | `:smoking:` |
|: Bomb: | `:bomb:` |
|: Gun: | `:gun:` |
|: Hocho: | `:hocho:` |
|: Pill: | `:pill:` |
|: Syringe: | `:syringe:` |
|: Page_facing_up: | `:page_facing_up:` |
|: Page_with_curl: | `:page_with_curl:` |
|: Bookmark_tabs: | `:bookmark_tabs:` |
|: Bar_chart: | `:bar_chart:` |
|: Chart_with_upwards_trend: | `:chart_with_upwards_trend:` |
|: Chart_with_downwards_trend: | `:chart_with_downwards_trend:` |
|: Scroll: | `:scroll:` |
|: Clipboard: | `:clipboard:` |
|: Calendar: | `:calendar:` |
|: Date: | `:date:` |
|: Card_index: | `:card_index:` |
|: File_folder: | `:file_folder:` |
|: Open_file_folder: | `:open_file_folder:` |
|: Scissors: | `:scissors:` |
|: Pushpin: | `:pushpin:` |
|: Paperclip: | `:paperclip:` |
|: Black_nib: | `:black_nib:` |
|: Pencil2: | `:pencil2:` |
|: Straight_ruler: | `:straight_ruler:` |
|: Triangular_ruler: | `:triangular_ruler:` |
|: Closed_book: | `:closed_book:` |
|: Green_book: | `:green_book:` |
|: Blue_book: | `:blue_book:` |
|: Orange_book: | `:orange_book:` |
|: Notebook: | `:notebook:` |
|: Notebook_with_decorative_cover: | `:notebook_with_decorative_cover:` |
|: Ledger: | `:ledger:` |
|: Books: | `:books:` |
|: Bookmark: | `:bookmark:` |
|: Name_badge: | `:name_badge:` |
|: Microscope: | `:microscope:` |
|: Telescope: | `:telescope:` |
|: Newspaper: | `:newspaper:` |
|: Football: | `:football:` |
|: Basketball: | `:basketball:` |
|: Soccer: | `:soccer:` |
|: Baseball: | `:baseball:` |
|: Tennis: | `:tennis:` |
|: 8ball: | `:8ball:` |
|: Rugby_football: | `:rugby_football:` |
|: Bowling: | `:bowling:` |
|: Golf: | `:golf:` |
|: Mountain_bicyclist: | `:mountain_bicyclist:` |
|: Bicyclist: | `:bicyclist:` |
|: Horse_racing: | `:horse_racing:` |
|: Snowboarder: | `:snowboarder:` |
|: Swimmer: | `:swimmer:` |
|: Surfer: | `:surfer:` |
|: Ski: | `:ski:` |
|: Spades: | `:spades:` |
|: Hearts: | `:hearts:` |
|: Clubs: | `:clubs:` |
|: Diamonds: | `:diamonds:` |
|: Gem: | `:gem:` |
|: Ring: | `:ring:` |
|: Trophy: | `:trophy:` |
|: Musical_score: | `:musical_score:` |
|: Musical_keyboard: | `:musical_keyboard:` |
|: Violin: | `:violin:` |
|: Space_invader: | `:space_invader:` |
|: Video_game: | `:video_game:` |
|: Black_joker: | `:black_joker:` |
|: Flower_playing_cards: | `:flower_playing_cards:` |
|: Game_die: | `:game_die:` |
|: Dart: | `:dart:` |
|: Mahjong: | `:mahjong:` |
|: Clapper: | `:clapper:` |
| Memo: | `:memo:` |
|: Pencil: | `:pencil:` |
|: Book: | `:book:` |
|: Art: | `:art:` |
|: Microphone: | `:microphone:` |
|: Headphones: | `:headphones:` |
|: Trumpet: | `:trumpet:` |
|: Saxophone: | `:saxophone:` |
|: Guitar: | `:guitar:` |
|: Shoe: | `:shoe:` |
|: Sandal: | `:sandal:` |
|: High_heel: | `:high_heel:` |
|: Lipstick: | `:lipstick:` |
|: Boot: | `:boot:` |
|: Shirt: | `:shirt:` |
|: Tshirt: | `:tshirt:` |
|: Necktie: | `:necktie:` |
|: Womans_clothes: | `:womans_clothes:` |
|: Dress: | `:dress:` |
|: Running_shirt_with_sash: | `:running_shirt_with_sash:` |
|: Jeans: | `:jeans:` |
|: Kimono: | `:kimono:` |
|: Bikini: | `:bikini:` |
|: Ribbon: | `:ribbon:` |
|: Tophat: | `:tophat:` |
|: Crown: | `:crown:` |
|: Womans_hat: | `:womans_hat:` |
|: Mans_shoe: | `:mans_shoe:` |
|: Closed_umbrella: | `:closed_umbrella:` |
|: Briefcase: | `:briefcase:` |
|: Handbag: | `:handbag:` |
|: Pouch: | `:pouch:` |
|: Purse: | `:purse:` |
|: Eyeglasses: | `:eyeglasses:` |
|: Fishing_pole_and_fish: | `:fishing_pole_and_fish:` |
|: Coffee: | `:coffee:` |
|: Tea: | `:tea:` |
|: Sake: | `:sake:` |
|: Baby_bottle: | `:baby_bottle:` |
|: Beer: | `:beer:` |
|: Beers: | `:beers:` |
|: Cocktail: | `:cocktail:` |
|: Tropical_drink: | `:tropical_drink:` |
|: Wine_glass: | `:wine_glass:` |
|: Fork_and_knife: | `:fork_and_knife:` |
|: Pizza: | `:pizza:` |
|: Hamburger: | `:hamburger:` |
|: Fries: | `:fries:` |
|: Poultry_leg: | `:poultry_leg:` |
|: Meat_on_bone: | `:meat_on_bone:` |
|: Spaghetti: | `:spaghetti:` |
|: Curry: | `:curry:` |
|: Fried_shrimp: | `:fried_shrimp:` |
|: Bento: | `:bento:` |
|: Sushi: | `:sushi:` |
|: Fish_cake: | `:fish_cake:` |
|: Rice_ball: | `:rice_ball:` |
|: Rice_cracker: | `:rice_cracker:` |
|: Rice: | `:rice:` |
|: Ramen: | `:ramen:` |
|: Stew: | `:stew:` |
|: Oden: | `:oden:` |
|: Dango: | `:dango:` |
|: Egg: | `:egg:` |
|: Bread: | `:bread:` |
|: Donut: | `:doughnut:` |
|: Custard: | `:custard:` |
|: Icecream: | `:icecream:` |
|: Ice_cream: | `:ice_cream:` |
|: Shaved_ice: | `:shaved_ice:` |
|: Birthday: | `:birthday:` |
|: Cake: | `:cake:` |
|: Cookie: | `:cookie:` |
|: Chocolate_bar: | `:chocolate_bar:` |
|: Candy: | `:candy:` |
|: Lollipop: | `:lollipop:` |
|: Honey_pot: | `:honey_pot:` |
|: Apple: | `:apple:` |
|: Green_apple: | `:green_apple:` |
|: Tangerine: | `:tangerine:` |
|: Lemon: | `:lemon:` |
|: Cherries: | `:cherries:` |
|: Grapes: | `:grapes:` |
|: Watermelon: | `:watermelon:` |
|: Strawberry: | `:strawberry:` |
|: Peach: | `:peach:` |
|: Melon: | `:melon:` |
|: Banana: | `:banana:` |
|: Pear: | `:pear:` |
|: Pineapple: | `:pineapple:` |
|: Sweet_potato: | `:sweet_potato:` |
|: Eggplant: | `:eggplant:` |
|: Tomato: | `:tomato:` |
|: Corn: | `:corn:` |
|: Corn: | `: corn:` |

### Places
|     |    |
|: House: | `:house:` |
|: House_with_garden: | `:house_with_garden:` |
|: School: | `:school:` |
|: Office: | `:office:` |
|: Post_office: | `:post_office:` |
|: Hospital: | `:hospital:` |
|: Bank: | `:bank:` |
|: Convenience_store: | `:convenience_store:` |
|: Love_hotel: | `:love_hotel:` |
|: Hotel: | `:hotel:` |
|: Wedding: | `:wedding:` |
|: Church: | `:church:` |
|: Department_store: | `:department_store:` |
|: European_post_office: | `:european_post_office:` |
|: City_sunrise: | `:city_sunrise:` |
|: City_sunset: | `:city_sunset:` |
|: Japanese_castle: | `:japanese_castle:` |
|: European_castle: | `:european_castle:` |
|: Tent: | `:tent:` |
|: Factory: | `:factory:` |
|: Tokyo_tower: | `:tokyo_tower:` |
|: Japan: | `:japan:` |
|: Mount_fuji: | `:mount_fuji:` |
|: Sunrise_over_mountains: | `:sunrise_over_mountains:` |
|: Sunrise: | `:sunrise:` |
|: Stars: | `:stars:` |
|: Statue_of_Liberty: | `:statue_of_liberty:` |
|: Bridge_at_night: | `:bridge_at_night:` |
|: Carousel_horse: | `:carousel_horse:` |
|: Rainbow: | `:rainbow:` |
|: Ferris_wheel: | `:ferris_wheel:` |
|: Fountain: | `:fountain:` |
|: Roller_coaster: | `:roller_coaster:` |
|: Ship: | `:ship:` |
|: Speedboat: | `:speedboat:` |
|: Boat: | `:boat:` |
|: Sailboat: | `:sailboat:` |
|: Rowboat: | `:rowboat:` |
|: Anchor: | `:anchor:` |
|: Rocket: | `:rocket:` |
|: Airplane: | `:airplane:` |
|: Helicopter: | `:helicopter:` |
|: Steam_locomotive: | `:steam_locomotive:` |
|: Tram: | `:tram:` |
|: Mountain_railway: | `:mountain_railway:` |
|: Bike: | `:bike:` |
|: Aerial_tramway: | `:aerial_tramway:` |
|: Suspension_railway: | `:suspension_railway:` |
|: Mountain_cableway: | `:mountain_cableway:` |
|: Tractor: | `:tractor:` |
|: Blue_car: | `:blue_car:` |
|: Oncoming_automobile: | `:oncoming_automobile:` |
|: Car: | `:car:` |
|: Red_car: | `:red_car:` |
|: Taxi: | `:taxi:` |
|: Oncoming_taxi: | `:oncoming_taxi:` |
|: Articulated_lorry: | `:articulated_lorry:` |
|: Bus: | `:bus:` |
|: Oncoming_bus: | `:oncoming_bus:` |
|: Rotating_light: | `:rotating_light:` |
|: Police_car: | `:police_car:` |
|: Oncoming_police_car: | `:oncoming_police_car:` |
|: Fire_engine: | `:fire_engine:` |
|: Ambulance: | `:ambulance:` |
|: Minibus: | `:minibus:` |
|: Truck: | `:truck:` |
|: Train: | `:train:` |
|: Station: | `:station:` |
|: Train2: | `:train2:` |
|: Bullettrain_front: | `:bullettrain_front:` |
|: Bullettrain_side: | `:bullettrain_side:` |
|: Light_rail: | `:light_rail:` |
|: Monorail: | `:monorail:` |
|: Railway_car: | `:railway_car:` |
|: Trolleybus: | `:trolleybus:` |
|: Ticket: | `:ticket:` |
|: Fuelpump: | `:fuelpump:` |
|: Vertical_traffic_light: | `:vertical_traffic_light:` |
|: Traffic_light: | `:traffic_light:` |
|: Warning: | `:warning:` |
|: Construction: | `:construction:` |
|: Beginner: | `:beginner:` |
|: Atm: | `:atm:` |
|: Slot_machine: | `:slot_machine:` |
|: Busstop: | `:busstop:` |
|: Barber: | `:barber:` |
|: Hotsprings: | `:hotsprings:` |
|: Checkered_flag: | `:checkered_flag:` |
|: Crossed_flags: | `:crossed_flags:` |
|: Izakaya_lantern: | `:izakaya_lantern:` |
|: Moyai: | `:moyai:` |
|: Circus_tent: | `:circus_tent:` |
|: Performing_arts: | `:performing_arts:` |
|: Round_pushpin: | `:round_pushpin:` |
|: Triangular_flag_on_post: | `:triangular_flag_on_post:` |
|: Jp: | `:jp:` |
|: Kr: | `:kr:` |
|: Cn: | `:cn:` |
|: Us: | `:us:` |
|: Fr: | `:fr:` |
|: It: | `:es:` |
|: It: | `:it:` |
|: Ru: | `:ru:` |
| Gb: | `:gb:` |
|: Uk: | `:uk:` |
|: En: | `:de:` |
|: En: | `: de:` |

### Symbols
|     |    |
|: One: | `:one:` |
|: Two: | `:two:` |
|: Three: | `:three:` |
|: Four: | `:four:` |
|: Five: | `:five:` |
|: Six: | `:six:` |
|: Seven: | `:seven:` |
|: Eight: | `:eight:` |
|: Nine: | `:nine:` |
|: Keycap_ten: | `:keycap_ten:` |
|: 1234: | `:1234:` |
|: Zero: | `:zero:` |
|: Hash: | `:hash:` |
|: Symbols: | `:symbols:` |
|: Arrow_backward: | `:arrow_backward:` |
|: Arrow_down: | `:arrow_down:` |
|: Arrow_forward: | `:arrow_forward:` |
|: Arrow_left: | `:arrow_left:` |
|: Capital_abcd: | `:capital_abcd:` |
|: Abcd: | `:abcd:` |
|: Abc: | `:abc:` |
|: Arrow_lower_left: | `:arrow_lower_left:` |
|: Arrow_lower_right: | `:arrow_lower_right:` |
|: Arrow_right: | `:arrow_right:` |
|: Arrow_up: | `:arrow_up:` |
|: Arrow_upper_left: | `:arrow_upper_left:` |
|: Arrow_upper_right: | `:arrow_upper_right:` |
|: Arrow_double_down: | `:arrow_double_down:` |
|: Arrow_double_up: | `:arrow_double_up:` |
|: Arrow_down_small: | `:arrow_down_small:` |
|: Arrow_heading_down: | `:arrow_heading_down:` |
|: Arrow_heading_up: | `:arrow_heading_up:` |
|: Leftwards_arrow_with_hook: | `:leftwards_arrow_with_hook:` |
|: Arrow_right_hook: | `:arrow_right_hook:` |
|: Left_right_arrow: | `:left_right_arrow:` |
|: Arrow_up_down: | `:arrow_up_down:` |
|: Arrow_up_small: | `:arrow_up_small:` |
|: Arrows_clockwise: | `:arrows_clockwise:` |
|: Arrows_counterclockwise: | `:arrows_counterclockwise:` |
|: Rewind: | `:rewind:` |
|: FAST_FORWARD: | `:fast_forward:` |
|: Information_source: | `:information_source:` |
|: Ok: | `:ok:` |
|: Twisted_rightwards_arrows: | `:twisted_rightwards_arrows:` |
|: Repeat: | `:repeat:` |
|: Repeat_one: | `:repeat_one:` |
|: New: | `:new:` |
|: Top: | `:top:` |
|: Up: | `:up:` |
|: Cool: | `:cool:` |
|: Free: | `:free:` |
|: Ng: | `:ng:` |
|: Cinema: | `:cinema:` |
|: Koko: | `:koko:` |
|: Signal_strength: | `:signal_strength:` |
|: U5272: | `:u5272:` |
|: U5408: | `:u5408:` |
|: U55b6: | `:u55b6:` |
|: U6307: | `:u6307:` |
|: U6708: | `:u6708:` |
|: U6709: | `:u6709:` |
|: U6e80: | `:u6e80:` |
|: U7121: | `:u7121:` |
|: U7533: | `:u7533:` |
|: U7a7a: | `:u7a7a:` |
|: U7981: | `:u7981:` |
|: Sat: | `:sa:` |
|: Restroom: | `:restroom:` |
| Mens: | `:mens:` |
|: Womens: | `:womens:` |
|: Baby_symbol: | `:baby_symbol:` |
|: No_smoking: | `:no_smoking:` |
|: Parking: | `:parking:` |
|: Wheelchair: | `:wheelchair:` |
|: Metro: | `:metro:` |
|: Baggage_claim: | `:baggage_claim:` |
|: Accept: | `:accept:` |
|: Wc: | `:wc:` |
|: Potable_water: | `:potable_water:` |
|: Put_litter_in_its_place: | `:put_litter_in_its_place:` |
|: Secret: | `:secret:` |
|: Congratulations: | `:congratulations:` |
|: M: | `:m:` |
|: Passport_control: | `:passport_control:` |
|: Left_luggage: | `:left_luggage:` |
|: Customs: | `:customs:` |
|: Ideograph_advantage: | `:ideograph_advantage:` |
|: Cl: | `:cl:` |
|: Sos: | `:sos:` |
|: Id: | `:id:` |
|: No_entry_sign: | `:no_entry_sign:` |
|: Underage: | `:underage:` |
|: No_mobile_phones: | `:no_mobile_phones:` |
|: Do_not_litter: | `:do_not_litter:` |
|: No_bicycles: | `:no_bicycles:` |
|: No_pedestrians: | `:no_pedestrians:` |
|: Children_crossing: | `:children_crossing:` |
|: No_entry: | `:no_entry:` |
|: Eight_spoked_asterisk: | `:eight_spoked_asterisk:` |
|: Sparkle: | `:sparkle:` |
|: Eight_pointed_black_star: | `:eight_pointed_black_star:` |
|: Heart_decoration: | `:heart_decoration:` |
|: Vs: | `:vs:` |
|: Vibration_mode: | `:vibration_mode:` |
|: Mobile_phone_off: | `:mobile_phone_off:` |
|: Chart: | `:chart:` |
|: Currency_exchange: | `:currency_exchange:` |
|: Aries: | `:aries:` |
|: Taurus: | `:taurus:` |
|: Gemini: | `:gemini:` |
|: Cancer: | `:cancer:` |
| Leo: | `:leo:` |
| Virgo: | `:virgo:` |
| Libra: | `:libra:` |
|: Scorpius: | `:scorpius:` |
|: Sagittarius: | `:sagittarius:` |
| Capricorn: | `:capricorn:` |
|: Aquarius: | `:aquarius:` |
|: Pisces: | `:pisces:` |
|: Ophiuchus: | `:ophiuchus:` |
|: Six_pointed_star: | `:six_pointed_star:` |
|: Negative_squared_cross_mark: | `:negative_squared_cross_mark:` |
| A: | `:a:` |
|: B: | `:b:` |
| From: | `:ab:` |
|: O2: | `:o2:` |
|: Diamond_shape_with_a_dot_inside: | `:diamond_shape_with_a_dot_inside:` |
|: Recycle: | `:recycle:` |
|: End: | `:end:` |
|: Back: | `:back:` |
|: On: | `:on:` |
|: Soon: | `:soon:` |
|: Clock1: | `:clock1:` |
|: Clock130: | `:clock130:` |
|: Clock10: | `:clock10:` |
|: Clock1030: | `:clock1030:` |
|: Clock11: | `:clock11:` |
|: Clock1130: | `:clock1130:` |
|: Clock12: | `:clock12:` |
|: Clock1230: | `:clock1230:` |
|: Clock2: | `:clock2:` |
|: Clock230: | `:clock230:` |
|: Clock3: | `:clock3:` |
|: Clock330: | `:clock330:` |
|: Clock4: | `:clock4:` |
|: Clock430: | `:clock430:` |
|: Clock5: | `:clock5:` |
|: Clock530: | `:clock530:` |
|: Clock6: | `:clock6:` |
|: Clock630: | `:clock630:` |
|: Clock7: | `:clock7:` |
|: Clock730: | `:clock730:` |
|: Clock8: | `:clock8:` |
|: Clock830: | `:clock830:` |
|: Clock9: | `:clock9:` |
|: Clock930: | `:clock930:` |
|: Heavy_dollar_sign: | `:heavy_dollar_sign:` |
|: Copyright: | `:copyright:` |
|: Registered: | `:registered:` |
|: Tm: | `:tm:` |
| X: | `:x:` |
|: Heavy_exclamation_mark: | `:heavy_exclamation_mark:` |
|: Bang bang: | `:bangbang:` |
|: Interrobang: | `:interrobang:` |
| O: | `:o:` |
|: Heavy_multiplication_x: | `:heavy_multiplication_x:` |
|: Heavy_plus_sign: | `:heavy_plus_sign:` |
|: Heavy_minus_sign: | `:heavy_minus_sign:` |
|: Heavy_division_sign: | `:heavy_division_sign:` |
|: White_flower: | `:white_flower:` |
| 100: | `:100:` |
|: Heavy_check_mark: | `:heavy_check_mark:` |
|: Ballot_box_with_check: | `:ballot_box_with_check:` |
|: Radio_button: | `:radio_button:` |
|: Link: | `:link:` |
|: Curly_loop: | `:curly_loop:` |
|: Wavy_dash: | `:wavy_dash:` |
|: Part_alternation_mark: | `:part_alternation_mark:` |
|: Trident: | `:trident:` |
|: Black_small_square: | `:black_small_square:` |
|: White_small_square: | `:white_small_square:` |
|: Black_medium_small_square: | `:black_medium_small_square:` |
|: White_medium_small_square: | `:white_medium_small_square:` |
|: Black_medium_square: | `:black_medium_square:` |
|: White_medium_square: | `:white_medium_square:` |
|: Black_large_square: | `:black_large_square:` |
|: White_large_square: | `:white_large_square:` |
|: White_check_mark: | `:white_check_mark:` |
|: Black_square_button: | `:black_square_button:` |
|: White_square_button: | `:white_square_button:` |
|: Black_circle: | `:black_circle:` |
|: White_circle: | `:white_circle:` |
|: Red_circle: | `:red_circle:` |
|: Large_blue_circle: | `:large_blue_circle:` |
|: Large_blue_diamond: | `:large_blue_diamond:` |
|: Large_orange_diamond: | `:large_orange_diamond:` |
|: Small_blue_diamond: | `:small_blue_diamond:` |
|: Small_orange_diamond: | `:small_orange_diamond:` |
|: Small_red_triangle: | `:small_red_triangle:` |
|: Small_red_triangle_down: | `:small_red_triangle_down:` |
|: Shipit: | `:shipit:` |
|: Shipit: | `: shipit:` |

<h3 id="lizenz"> license </h3>

This work is licensed under a Creative Commons Attribution-ShareAlike (BY-SA) 4.0 International License] [by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?> This is a translation of [original syntax documentation] [osd] by [John Grubers] [jg] [Markdown] [md]. This translation refers to the status of 15.12.2013 (Markdown Version 1.0.1). No guarantee is given for the correctness of the translation. If there are errors in the translation, please send a short message to <lasar@liepins.net>.
Any other kind of feedback is welcome too. *

[jg]: http://daringfireball.net/ [md]: http://daringfireball.net/projects/markdown/ [osd]: http://daringfireball.net/projects/markdown/syntax