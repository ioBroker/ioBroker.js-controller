---
title: 降价
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: c2qfK1BCvNDEaHCS0sUD3o+3w+8yja0yz/VoJdiBng4=
---
Markdown：语法===============

？>为了使ioBroker文档易于创建和阅读，选择Markdown作为简化的标记语言。以下指南将帮助您了解Markdown的语法和可能性，并将其转换为出色的文档。

从技术上讲，文档系统支持以下功能：

|变|版本|
|------|-------|
|原始markdown.pl | -  |
|通用标志| 12:28 |
| GitHub调味降价| 0.28 |

此外，还集成了使用[Emojies](#emojies)的扩展。

内容------

* [调查](#overview)
    * [哲学](#philosophy)
    * [内联HTML](#html)
    * [自动屏蔽特殊字符](#autoescape)
* [块元素](#block)
    * [段落和换行符](#p)
    * [头](#header)
    * [行情](#blockquote)
    * [名单](#list)
    * [代码块](#precode)
    * [水平线](#hr)
* [夹紧元件](#span)
    * [左](#link)
    * [重点](#em)
    * [代码](#code)
    * [图像](#img)
* [杂项](#misc)
    * [自动链接](#autolink)
    * [反斜杠掩蔽](#backslash)
* [Emojies](#emojies)

<div id="overview"></div>

##概述
<h3 id="philosophy">哲学</h3>

Markdown的设计基本理念是尽可能易于阅读和书写。

易读性是这里的终极目标。 Markdown格式的文档应该能够以其基本形式发布，而不会出现标记或格式化（如HTML的情况）。

因此，Markdown的语法仅包含明智选择的字符，以使其外观与其含义相对应。
例如，一个单词周围的星号实际上看起来像\ *stress \* Markdown中的列表看起来像列表。甚至引用块看起来像引用的段落，因为它们是从电子邮件中获知的。

<h3 id="html">内嵌HTML </h3>

Markdown的语法有一个目的：用于*写*到网络。

Markdown不是HTML的替代品，甚至不是ansatzweise。语法的范围非常小，只是所有HTML标记的一小部分。 Markdown不打算插入HTML标签。 HTML已经足够简单了。 Markdown背后的想法是尽可能容易地阅读，编写和编辑文本。 HTML是*发布格式*; Markdown是一种*写格式*。因此，它的语法只考虑可以用纯文本传达的内容。

对于Markdown不可行的任何格式，只需使用HTML即可。没有必要标记HTML以区别于其他HTML。它只是写在文本中。

唯一的限制是块元素，例如`<div>`，`<table>`，`<pre>`，`<p>`等。必须用空行将它们与周围内容分开，并且不应使用空格或制表符缩进开始和结束标记。 Markdown非常聪明，不会在HTML块周围添加任何其他（不需要的）`<p>`标记。

例如，在Markdown文章中构建一个HTML表格：

    这是一个正常的段落。

<table><tr><td> FOO </td></tr></table>

    这仍然是一个正常的段落。

应该注意，Markdown的语法不在HTML块中解释。例如，可以使用HTML块中的* emphasis *。

内联HTML标记，例如可以在降价段落，项目符号或标题中的任何位置使用`<span>`，`<cite>`或`<del>`。甚至可以使用HTML标记代替适当的降价格式。仅使用`<a>`或`<img>`对链接或图形使用Markdows语法是没有问题的。

与块标记*，*不同，markdown语法在内联标记内解释。

<h3 id="autoescape">自动屏蔽特殊字符</h3>

在HTML中，有两个字符需要特殊处理：`<`和`&`。左尖括号用于打开HTML标签，＆符号用于描述命名字符（实体）。如果要将这些字符用作HTML文档中的“自身”，则必须将它们屏蔽为实体，即`&lt;`和`&amp;`。

商业用户对Web开发人员来说尤其不切实际。如果你想写“AT＆T”，你必须写“`AT&amp;T`”。商业甚至需要在URL中屏蔽。在页面的链接中

    http://images.google.com/images?num=30&q=larry+bird

URL必须按如下方式编码：

    http://images.google.com/images?num=30&amp;q=larry+bird

这很容易被遗忘，并且可能是验证格式良好的HTML文档时最常见的错误。

Markdown允许您正常使用这些字符。它控制编码本身。如果商家 - 并且在实体中使用，则不对其进行编码，否则转换为`&amp;`。

因此，如果您想输入版权符号，例如，您可以

    及复印件;

写，Markdown不会修改它。但是出去了

    AT＆T

Markdown

    AT＆amp; T公司

令。由于Markdown Inline支持HTML，因此在这种情况下，尖括号通常被视为HTML。只有像这样的东西

    4 <5

Markdown

    4＆lt;五

令。在代码或跨度块中，尖括号和＆符号*始终*编码。这简化了在Markdown中通过HTML进行编写（与原始HTML不同，在编写每个`<`和`&`时，通常是一个噩梦）。

* * *

<div id="block"></div>

##块元素
<h3 id="p">段落和换行符</h3>

段落只是由一个或多个空行分隔的一行或多行文本。 （空白行是任何看起来像*空白行的行 - 除了空格和制表符之外什么都不包含的行被视为空。）正常段落不应缩进空格或制表符。

“一条或多条线”规则意味着一件事：Markdown支持带有“剧烈动荡”的段落。这与大多数其他文本到HTML格式化程序（包括Movable Type Convert Line Breaks选项）非常不同，后者将段落中的每个换行符格式化为`<br />`。

如果您希望*将`<br />`作为break，则可以简单地以两个或多个空格结束该行。

虽然这是创建`<br />`的一小部分开销，但简单的“任何新行是`<br />`”规则在Markdown中不起作用。

当使用换行符格式化时，Markdown的电子邮件风格[引用] [bq]和[list-entries] [l]效果最好 - 看起来更好。

[bq]：＃blockquote [l]：＃list

<h3 id="header">头</h3>

Markdown支持两种类型的标题格式，[Setext] [1]和[atx] [2]。

类似Setext的标题下划线，带有相同的符号（对于第一级标题）和连字符（对于第二级）。例如：

这是H1 ==============

这是H2 ---------------

任何数量的`=`或`-`都有效。

类似Atx的标题在行的开头使用1-6个菱形字符，对应于1-6级。例如：

    ＃这是一个H1
    ##这是一个H2
    ######这是一个H6
如果需要，类似atx的标题也可以“关闭”。
这只是化妆品 - 如果它看起来更好，它可以使用。
关闭菱形字符的数量甚至不必与开始字符的数量匹配。

    ＃这是H1＃
    ##这是H2 ##
    ###这是一个H3 ######
<h3 id="blockquote">行情</h3>

Markdown使用 - 就像电子邮件 - 用于引用块的字符`>`。
如果您有电子邮件中的引号经验，您还知道如何在Markdown中创建引号。如果你每行包装文本并在每行前放一个`>`，它看起来最好：

>这是一个有两段的引用。 Lorem ipsum dolor坐下来，> consectetuer adipiscing elit。 Aliquam hendrerit mi posuere> lectus。 Vestibulum enim wisi，viverra nec，fringilla in，laoreet> vitae，risus。
>> Donec坐下来。 Aliquam semper ipsum坐在上面。
> Suspendisse id sem consemtetuer libero luctus adipiscing。

Markdown还允许您保持懒惰并仅在硬包装段落的第一行使用`>`：

>这是一个有两段的引用。 Lorem ipsum dolor坐在amet，consectetuer adipiscing elit。 Aliquam hendrerit mi posuere lectus。
Vestibulum enim wisi，viverra nec，fringilla in，laoreet vitae，risus。

> Donec坐下来。 Aliquam semper ipsum坐在上面。
Suspendisse id sem consemtetuer libero luctus adipiscing。

引用可以通过使用更多`>`嵌套（即在引用中引用）：

>这是第一个报价级别。
>>>这是一个嵌套的引用。
>>回到第一级。

引号可以包含其他markdown元素，包括标题，列表和代码块：

> ##这是一个标题。
>> 1.这是第一个要点。
> 2.这是第二个要点。
>>下面是一些示例代码：>> return shell_exec（“echo $ input | $ Markdown_script”）;

任何明智的文本编辑器都应该使电子邮件引用变得容易。例如，在BBEdit中，您可以进行选择并从菜单`Text`中选择项`Increase Quote Level`。

<h3 id="list">名单</h3>

Markdown支持排序（编号）和未排序列表。

未排序的列表使用星号，加号和连字符 - 可互换 - 作为列表标记：

    *红色
    *绿色
    *蓝色

是一样的：

+红色+绿色+蓝色

和：

     - 红色
     - 绿色
     - 蓝色

排序列表使用以下几点的数字：

    第一只狗
    猫
    3.鼠标

重要的是要理解数字本身对Markdown的输出没有影响。 Markdown从最后一个列表中创建以下HTML代码：

<ol><li>狗</li><li>猫</li><li>鼠标</li></ol>

如果您改为编写列表：

    第一只狗
    第一只猫
    第一只老鼠

甚至：

    第三只狗
    第一只猫
    8.鼠标

不过，每次都会出现相同的清单。如果需要，可以用手正确编号列表。但是如果你想要懒惰，你可以自信地使用相同的数字。

但是，您还应该使用数字1启动列表。将来，Markdown可能希望为第一个列表条目设置起始数字。

列表条目通常从文档的左边缘开始，但它们可以向右缩进三个空格。
列表标记必须用以下文本中的一个或多个空格或制表符分隔。

要很好地格式化列表，可以进一步缩进各个条目，如下所示：

    Lorem ipsum dolor坐在amet，consectetuer adipiscing elit。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi，viverra nec，fringilla in，laoreet vitae，risus。

    * Donec坐在那里。 Aliquam semper ipsum坐在上面。

        Suspendisse id sem consemtetuer libero luctus adipiscing。

以下示例生成相同的代码但不太整洁：

    Lorem ipsum dolor坐在amet，consectetuer adipiscing elit。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi，viverra nec，fringilla in，laoreet vitae，risus。

    * Donec坐在那里。 Aliquam semper ipsum坐在上面。

    Suspendisse id sem consemtetuer libero luctus adipiscing。

如果列表条目由空行分隔，Markdown将使用`<p>`和`</p>`包装列表条目。

例如，这将：

    * Warsteiner
    *国王

至

<ul><li> Warsteiner </li><li>王</li></ul>

但是这个：

    * Warsteiner

    *国王

也成了

<ul><li><p> Warsteiner </p></li><li><p>王</p></li></ul>

列表项可以包含多个段落。子弹中的每个后续段落必须缩进至少4个空格或制表符：

    这是一个有两段的要点。 Lorem ipsum dolor

坐下来，这是一种精英。 Aliquam hendrerit mi posuere lectus。

Vestibulum enim wisi，viverra nec，fringilla in，laoreet vitae，risus。 Donec坐在amet nisl。 Aliquam semper ipsum坐在上面。

    2. Suspendisse id sem consemtetuer libero luctus adipiscing。

如果以下段落的每一行都缩进，看起来很好，但Markdown允许懒惰的只缩进第一行：

    *这是一个有两个段落的要点

这是此列表项中的第二段。只有第一行必须缩进。 Lorem ipsum dolor坐在amet，consectetuer adipiscing elit。

    *同一列表中的另一点。

要在项目符号中使用引号，引号必须缩进：

    *带引号的子弹：

>这是一个引用>在列表中。

要在子弹中使用一段代码，必须缩进*两次*  -  8个空格或两个制表符：

    *带代码示例的列表项：

            <在此处插入代码>

可以通过例如无意创建列表。
以下内容如下：

    1986.多么美好的一年。

换句话说，行的开头的序列* number-point-space *。为避免此问题，可以用反斜杠屏蔽该点：

    1986年\。真是个美好的一年。

<h3 id="precode">代码块</h3>

预格式化的代码块用于写入程序或标记源代码。代码块中的行不是形成正常段落，而是解释为已找到。 Markdown包含带有标签`<pre>`和`<code>`的代码块。

要在Markdown中创建代码块，只需使用至少4个杠杆或制表符缩进块的每一行。从以下输入...

    这是一个正常的段落。

        这是一个代码块。

... Markdown如下：

<p>这是一个正常的段落。 </p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

从每个缩进线中移除一定级别的缩进 -  4个空格或1个制表符。以下，例如......

    AppleScript中的一个示例：

告诉应用程序“Foo”嘟嘟声告诉

......也变成了

<p> AppleScript中的一个示例： </p>

<pre><code>tell application "Foo" beep end tell </code></pre>

代码块在没有缩进（或在文档末尾）的第一行结束。

在代码块中，＆符号（`&`）和尖括号（`<`和`>`）会自动转换为HTML实体。这极大地方便了HTML片段的整合 - 简单地将HTML复制到文档中，缩进，Markdown执行＆符号和尖括号的编码。例如：

<div class="footer"> ©2004 Foo Corporation </div>

变为：

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

在代码块中不处理正常的markdown语法。那
星号只是代码块中的星号，而不是强调文本的信号。结果是在Markdown *中谈论Markdown很容易。

<h3 id="hr">水平线</h3>

可以通过在一行上写入3个或更多个连字符或星号来生成水平线标记（`<hr />`）。字符之间的空格也是允许的。以下所有示例都将生成一条水平线：

    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span元素
<h3 id="link">左</h3>

Markdown支持两种类型的链接：*内联*和*引用*。

在这两种样式中，链接文本都标有[方括号]。

要创建内联链接，请在结束方括号后面直接写正常括号。在这些括号中，URL被编写为与引号中的链接的* optional *标题链接在一起。例子：

对于内联链接，这是§§LLLL_0§§。

    [这个链接](http://example.net/)没有title属性。

它变成：

<p>这是内联链接<a href="http://example.com/" title="标题">的示例</a> 。 </p>

<p> <a href="http://example.net/">此链接</a>没有title属性。 </p>

如果要引用同一服务器上的内容，可以使用相对路径：

    更多信息可以在页面[关于我](/about/)上找到。

引用链接使用第二组方括号，其中写入链接的任意标识符：

    这是参考链接的[示例] [id]。

您也可以根据需要在括号之间插入空格：

    这是参考链接的[示例] [id]。

然后，在文档的某处，链接在单独的行上定义如下：

    [id]：http：//example.com/“在这里输入选项标题”

所以：

*方括号包含链接标识符（可选）

    最多三个空格缩进）;

*后跟冒号;
*后跟一个或多个空格（或标签）;
*后跟链接的URL;
*可选地后跟链接的title属性的文本，

    用括号括起来，用单引号或双引号括起来。

以下三个定义相同：

[foo]：http：//example.com/“可选标题”[foo]：http：//example.com/'可选标题'[foo]：http：//example.com/（可选标题）

**注意：** Markdown 1.0.1中存在一个已知的错误，它阻碍了单引号作为链接标题的分隔符的功能。

链接URL可以选择打包在尖括号中：

    [id]：<http://example.com/>“此处可选标题”

title属性也可以设置为下一行，并缩进更多空格或制表符。对于长URL，这看起来更好：

[id]：http：//example.com/langer/pfad/zu/seite“此处可选标题”

链接定义仅用于在Markdown处理文档时创建链接，并在输出HTML之前从文档中删除。

链接定义的标识符可以包含字母，数字，空格和标点符号。它们是*大写和小写的独立*：

[链接文字] [a] [链接文字] [A]

这两个链接定义是等效的。

*隐含的链接标识符*允许您省略链接标识符。在这种情况下，链接文本用作标识符。只需在链接文本中添加一组空方括号：

[谷歌] []

然后定义链接：

[Google]：http：//google.com/

由于链接标识符可能包含空格，因此该缩写甚至适用于链接文本中的多个单词：

访问[Daring Fireball] []了解更多信息。

然后定义链接：

[Daring Fireball]：http：//daringfireball.net/

可以在Markdown文档中的任何位置进行链接定义。一般来说，根据使用它们的段落制作它们是个好主意。但它们也可以在文档末尾列为脚注。

一个小例子：

我从[Google] [1]获得的流量是[Yahoo] [2]或[MSN] [3]的10倍。

[1]：http：//google.com/“Google”[2]：http：//search.yahoo.com/“Yahoo Search”[3]：http：//search.msn.com/“MSN搜索“

隐含链接标识符的缩写也可用于编写：

我从[Google] []获得的流量是[Yahoo] []或[MSN] []的10倍。

[google]：http：//google.com/“Google”[yahoo]：http：//search.yahoo.com/“Yahoo Search”[msn]：http：//search.msn.com/“MSN搜索“

这两个示例都将生成以下HTML代码：

<p>我从<a href="http://google.com/" title="谷歌">Google</a>获得的流量是<a href="http://search.yahoo.com/" title="雅虎搜索">雅虎</a>或<a href="http://search.msn.com/" title="MSN搜索">MSN</a>流量的十倍。 </p>

为了比较，使用Markdown的内联链接后面是相同的段落：

我从[谷歌](http://google.com/ "Google")获得的流量是§§LLLL_1§§或§§LLLL_2§§的10倍。

参考链接背后的想法并不是它们更容易编写。这个想法是他们使文档更具可读性。示例段落只有80个字符长的参考链接，参考链接长度为181个字符;作为HTML，它是239个字符，比内容更多的标记。

使用Markdown的引用链接，源文档更像是最终输出格式，如浏览器中所示。从段落中提取标记元数据的功能允许将链接集成到文本中，而不会减慢文本流。

<h3 id="em">重点</h3>

Markdown将星号（`*`）和下划线（`_`）视为强调的指标。单独的`*`或`_`中包含的文本附带HTML标记`<em>`，双`*`或`_`标记有标记`<strong>` ，以下文字为例：

    *单星*

    _Single underscores_

    **双星**

    __Double underscores__

将花费：

<em>单星</em>

<em>个人强调</em>

<strong>双星号</strong>

<strong>双下划线</strong>

风格可任意选择。唯一的限制是必须使用相同的字符来打开和关闭强调区域。

重点可以用在一个词中：

    *先生神*圣餐

但是当`*`或`_`被空格包围时，它被视为简单的星号或简单的下划线。

要在可以理解为重音的位置写一个星号或下划线，可以用反斜杠屏蔽它：

    \ *本文周围有星号\ *

<h3 id="code">代码</h3>

为了标记代码区域，它用反引号字符（`` ```）括起来。与代码块不同，代码区域格式化正常段落中的代码：

    使用`printf()`函数输出文本。

变为：

<p>使用<code>printf()</code>函数<code>printf()</code>文本。 </p>

如果要在代码区域中显示反引号，则可以使用代码区域之前和之后的几个反引号：

    ``Irgendwo hier (`）是隐藏```的反引号

这变为：

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

围绕一系列代码的反引号分隔符可以包括空格 - 一个在开始之后，一个在结束反引号之前。这允许在开始或结束时在代码区域内使用反引号：

代码区域中的单个反向标记：`` ```

代码区域中的反引号括起来的字符串：`` `foo` ``

变为：

<p>代码区中的单个回拨： <code>`</code> </p>

<p>代码区域中的反引号包含字符串： <code>`foo`</code> </p>

在代码区域中，商业和尖括号被编码为HTML Entitiy。

    没有人使用`<blink>`标签。

这变为：

<p>没有人使用<code>&lt;blink&gt;</code>标签。 </p>

也是这样的：

    `&#8212;`是`&mdash;`的十进制编码等价物。

这将会发生

<p> <code>&amp;#8212;</code>是<code>&amp;mdash;</code>的十进制编码等价物， </p>

<h3 id="img">图像</h3>

不可否认，很难找到在文本中嵌入图形的“自然”语法。

Markdown使用类似于链接样式的语法。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文字](../../de/community/pfad/zum/bild.jpg)

    ![替代文字](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

*感叹号：`!`;
*后跟一组方括号，显示的值

    `alt`包含图形的属性;

*后跟括号，表示图形的URL或路径

和可选的`title`属性的值，用引号括起来。

参考样式中的图像引用如下所示：

    ！[替代文字] [id]

“id”是此处定义的图像引用的名称。使用与链接引用相同的语法定义图像引用：

    [id]：url / to / image“可选标题属性”

目前，Markdown没有指定图形大小的语法。如果这是必要的，可以使用普通的HTML标记`<img>`。

* * *

<div id="misc"></div>

##杂项
<h3 id="autolink">自动链接</h3>

Markdown支持一种简单的样式，可以“自动”生成URL和电子邮件地址的链接：URL或电子邮件地址只包含在尖括号中。如果您想直接显示网址或电子邮件地址，可以这样做：

    <Http://example.com/>

Markdown会将其转换为以下HTML代码：

<a href="http://example.com/">http://example.com/</a>

电子邮件地址的自动链接的工作方式类似，只是Markdown在此处将地址随机转换为十进制和十六进制实体编码，以帮助使垃圾邮件无法访问地址。例如：

<address@example.com>

这变成如下所示：

<a href="&#x6D;&#x61;i&#x6C;&#x74;&#x6F;:&#x61;&#x64;&#x64;&#x72;&#x65; &#115;&#115;&#64;&#101;&#120;&#x61;&#109;&#x70;&#x6C;e&#x2E;&#99;&#111; &#109;">地址@ exa mple.com</a>

在浏览器中，这将显示为地址“address@example.com”的可点击链接。

（这个技巧会破坏许多（如果不是大多数）地址收集者，但它肯定不会抓住每个人，它总比没有好，但最终这样的公共地址也会收到垃圾邮件。）

<h3 id="backslash">反斜杠掩蔽</h3>

Markdown可以使用反斜杠屏蔽来编写在Markdown的语法中具有意义的字符。
例如，如果要用星号（而不是HTML标记`<em>`）包围单词，可以在星号前放置反斜杠：

    \ *被星号包围\ *

Markdown为以下字符提供此功能：

反斜杠Backtick

    *星号

_下划线{}大括号[]方括号（）圆括号

#Rombus +加号
     - 减号（连字符）

，一点！感叹号

* * *

<div id="emojies"></div>

##可用的表情符号
###人
|     |    |
|：蝴蝶结：|`:bowtie:`|
|：微笑：|`:smile:`|
|：笑：|`:laughing:`|
|：腮红：|`:blush:`|
|：笑脸：|`:smiley:`|
|：轻松：|`:relaxed:`|
|：傻笑：|`:smirk:`|
|：Heart_eyes：|`:heart_eyes:`|
|：Kissing_heart：|`:kissing_heart:`|
|：Kissing_closed_eyes：|`:kissing_closed_eyes:`|
|：脸涨得通红：|`:flushed:`|
|：松了口气：|`:relieved:`|
|：满意：|`:satisfied:`|
|：咧嘴：|`:grin:`|
|：表情：|`:wink:`|
|：Stuck_out_tongue_winking_eye：|`:stuck_out_tongue_winking_eye:`|
|：Stuck_out_tongue_closed_eyes：|`:stuck_out_tongue_closed_eyes:`|
|：笑嘻嘻：|`:grinning:`|
|：接吻：|`:kissing:`|
|：Kissing_smiling_eyes：|`:kissing_smiling_eyes:`|
|：Stuck_out_tongue：|`:stuck_out_tongue:`|
|：睡眠：|`:sleeping:`|
|：担心：|`:worried:`|
|：皱眉道：|`:frowning:`|
|：痛苦：|`:anguished:`|
|：Open_mouth：|`:open_mouth:`|
|：鬼脸：|`:grimacing:`|
|：困惑：|`:confused:`|
|：寂静：|`:hushed:`|
|：无表情：|`:expressionless:`|
|：垂头丧气：|`:unamused:`|
|：Sweat_smile：|`:sweat_smile:`|
|：汗：|`:sweat:`|
|：Disappointed_relieved：|`:disappointed_relieved:`|
|：疲倦：|`:weary:`|
|：沉思：|`:pensive:`|
|：失望：|`:disappointed:`|
|：蒙羞|`:confounded:`|
|：由于担心：|`:fearful:`|
|：Cold_sweat：|`:cold_sweat:`|
|：持之以恒：|`:persevere:`|
|：哭：|`:cry:`|
|：听到一声哭泣|`:sob:`|
|：喜：|`:joy:`|
|：惊讶：|`:astonished:`|
|：呐喊：|`:scream:`|
|：Neckbeard：|`:neckbeard:`|
|：Tired_face：|`:tired_face:`|
|：愤怒：|`:angry:`|
|：愤怒：|`:rage:`|
|：凯旋：|`:triumph:`|
|：困：|`:sleepy:`|
|：百胜：|`:yum:`|
|：面膜：|`:mask:`|
|：太阳镜：|`:sunglasses:`|
|：Dizzy_face：|`:dizzy_face:`|
|：小鬼：|`:imp:`|
|：Smiling_imp：|`:smiling_imp:`|
|：Neutral_face：|`:neutral_face:`|
|：No_mouth：|`:no_mouth:`|
|：无辜：|`:innocent:`|
|：异形：|`:alien:`|
|：Yellow_heart：|`:yellow_heart:`|
|：Blue_heart：|`:blue_heart:`|
|：Purple_heart：|`:purple_heart:`|
|：心：|`:heart:`|
|：Green_heart：|`:green_heart:`|
|：Broken_heart：|`:broken_heart:`|
|：心跳：|`:heartbeat:`|
|：心脏脉搏：|`:heartpulse:`|
|：Two_hearts：|`:two_hearts:`|
|：Revolving_hearts：|`:revolving_hearts:`|
|：丘比特：|`:cupid:`|
|：Sparkling_heart：|`:sparkling_heart:`|
|：闪闪发光：|`:sparkles:`|
|：星：|`:star:`|
|：STAR2：|`:star2:`|
|：晕：|`:dizzy:`|
|：景气：|`:boom:`|
|：碰撞：|`:collision:`|
|：愤怒：|`:anger:`|
|：感叹：|`:exclamation:`|
|：问题：|`:question:`|
|：Grey_exclamation：|`:grey_exclamation:`|
|：Grey_question：|`:grey_question:`|
|者：ZZZ：|`:zzz:`|
|：短跑：|`:dash:`|
|：Sweat_drops：|`:sweat_drops:`|
|：注：|`:notes:`|
|：Musical_note：|`:musical_note:`|
|：火：|`:fire:`|
|：汉基：|`:hankey:`|
|：船尾：|`:poop:`|
|：妈：|`:shit:`|
|：Thumbsup：|`:thumbsup:`|
|：Thumbsdown：|`:thumbsdown:`|
|：Ok_hand：|`:ok_hand:`|
|：打孔：|`:punch:`|
|：Facepunch：|`:facepunch:`|
|：拳：|`:fist:`|
| V：|`:v:`|
|：波：|`:wave:`|
|：手：|`:hand:`|
|：Raised_hand：|`:raised_hand:`|
|：Open_hands：|`:open_hands:`|
|：Point_up：|`:point_up:`|
|：Point_down：|`:point_down:`|
|：Point_left：|`:point_left:`|
|：Point_right：|`:point_right:`|
|：Raised_hands：|`:raised_hands:`|
|：祈祷：|`:pray:`|
|：Point_up_2：|`:point_up_2:`|
|：拍手：|`:clap:`|
|：肌肉：|`:muscle:`|
|：金属：|`:metal:`|
|：傅：|`:fu:`|
|：亚军：|`:runner:`|
|：运行：|`:running:`|
|：夫妇：|`:couple:`|
|：家族：|`:family:`|
|：Two_men_holding_hands：|`:two_men_holding_hands:`|
|：Two_women_holding_hands：|`:two_women_holding_hands:`|
|：舞蹈演员：|`:dancer:`|
|：舞蹈演员：|`:dancers:`|
|：Ok_woman：|`:ok_woman:`|
|：No_good：|`:no_good:`|
|：Information_desk_person：|`:information_desk_person:`|
|：Raising_hand：|`:raising_hand:`|
|：Bride_with_veil：|`:bride_with_veil:`|
|：Person_with_pouting_face：|`:person_with_pouting_face:`|
|：Person_frowning：|`:person_frowning:`|
|：弓：|`:bow:`|
|：情侣接吻：|`:couplekiss:`|
|：Couple_with_heart：|`:couple_with_heart:`|
|：按摩：|`:massage:`|
|：剪发：|`:haircut:`|
|：Nail_care：|`:nail_care:`|
|：男孩：|`:boy:`|
|：女孩：|`:girl:`|
|：女：|`:woman:`|
|：它：|`:man:`|
|：宝贝：|`:baby:`|
|：Older_woman：|`:older_woman:`|
|：Older_man：|`:older_man:`|
|：Person_with_blond_hair：|`:person_with_blond_hair:`|
|：Man_with_gua_pi_mao：|`:man_with_gua_pi_mao:`|
|：Man_with_turban：|`:man_with_turban:`|
|：Construction_worker：|`:construction_worker:`|
|：警察：|`:cop:`|
|：天使：|`:angel:`|
|：公主：|`:princess:`|
|：Smiley_cat：|`:smiley_cat:`|
|：Smile_cat：|`:smile_cat:`|
|：Heart_eyes_cat：|`:heart_eyes_cat:`|
|：Kissing_cat：|`:kissing_cat:`|
|：Smirk_cat：|`:smirk_cat:`|
|：Scream_cat：|`:scream_cat:`|
|：Crying_cat_face：|`:crying_cat_face:`|
|：Joy_cat：|`:joy_cat:`|
|：Pouting_cat：|`:pouting_cat:`|
|：Japanese_ogre：|`:japanese_ogre:`|
|：Japanese_goblin：|`:japanese_goblin:`|
|：See_no_evil：|`:see_no_evil:`|
|：Hear_no_evil：|`:hear_no_evil:`|
|：Speak_no_evil：|`:speak_no_evil:`|
|：卫兵：|`:guardsman:`|
|：头骨：|`:skull:`|
|：脚：|`:feet:`|
|：嘴唇：|`:lips:`|
|：吻：|`:kiss:`|
|：滴：|`:droplet:`|
|：耳朵：|`:ear:`|
|：眼睛：|`:eyes:`|
|：鼻子：|`:nose:`|
|：舌：|`:tongue:`|
|：Love_letter：|`:love_letter:`|
|：Bust_in_silhouette：|`:bust_in_silhouette:`|
|：Busts_in_silhouette：|`:busts_in_silhouette:`|
|：Speech_balloon：|`:speech_balloon:`|
|：Thought_balloon：|`:thought_balloon:`|
|：感觉不错：|`:feelsgood:`|
|：Finnadie：|`:finnadie:`|
|：Goberserk：|`:goberserk:`|
|：Godmode：|`:godmode:`|
|：Hurtrealbad：|`:hurtrealbad:`|
|：Rage1：|`:rage1:`|
|：Rage2：|`:rage2:`|
|：Rage3：|`:rage3:`|
|：Rage4：|`:rage4:`|
|：可疑：|`:suspect:`|
|：Trollface：|`:trollface:`|
|：Trollface：|`：trollface：`|

###自然
|     |    |
|：阳光：|`:sunny:`|
|：伞：|`:umbrella:`|
|：云：|`:cloud:`|
|：雪花：|`:snowflake:`|
|：雪人：|`:snowman:`|
|：扎普：|`:zap:`|
|：旋风：|`:cyclone:`|
|：雾：|`:foggy:`|
|：海洋：|`:ocean:`|
|：猫：|`:cat:`|
|：狗：|`:dog:`|
|：鼠标：|`:mouse:`|
|：仓鼠：|`:hamster:`|
|：兔：|`:rabbit:`|
|：狼：|`:wolf:`|
|：青蛙：|`:frog:`|
|：虎：|`:tiger:`|
|：考拉：|`:koala:`|
|：熊：|`:bear:`|
|：猪：|`:pig:`|
|：Pig_nose：|`:pig_nose:`|
|：牛：|`:cow:`|
|：野猪：|`:boar:`|
|：Monkey_face：|`:monkey_face:`|
|：猴：|`:monkey:`|
|：马：|`:horse:`|
|：赛马：|`:racehorse:`|
|：骆驼：|`:camel:`|
|：羊：|`:sheep:`|
|：大象：|`:elephant:`|
|：Panda_face：|`:panda_face:`|
|：蛇：|`:snake:`|
|：鸟：|`:bird:`|
|：Baby_chick：|`:baby_chick:`|
|：Hatched_chick：|`:hatched_chick:`|
|：Hatching_chick：|`:hatching_chick:`|
|：鸡：|`:chicken:`|
|：企鹅：|`:penguin:`|
|：乌龟：|`:turtle:`|
|：错误：|`:bug:`|
|：蜜蜂：|`:honeybee:`|
|：蚂蚁：|`:ant:`|
|：甲壳虫：|`:beetle:`|
|：蜗牛：|`:snail:`|
|：章鱼：|`:octopus:`|
|：Tropical_fish：|`:tropical_fish:`|
|：鱼：|`:fish:`|
|：鲸鱼：|`:whale:`|
|：Whale2：|`:whale2:`|
|：海豚：|`:dolphin:`|
|：Cow2：|`:cow2:`|
|：RAM：|`:ram:`|
|：建议：|`:rat:`|
|：Water_buffalo：|`:water_buffalo:`|
|：Tiger2：|`:tiger2:`|
|：Rabbit2：|`:rabbit2:`|
|：龙：|`:dragon:`|
|：山羊：|`:goat:`|
|：公鸡：|`:rooster:`|
|：DOG2：|`:dog2:`|
|：Pig2：|`:pig2:`|
|：Mouse2：|`:mouse2:`|
|：牛：|`:ox:`|
|：Dragon_face：|`:dragon_face:`|
|：河豚：|`:blowfish:`|
|：鳄鱼：|`:crocodile:`|
|：Dromedary_camel：|`:dromedary_camel:`|
|：豹：|`:leopard:`|
|：CAT2：|`:cat2:`|
|：贵宾犬：|`:poodle:`|
|：Paw_prints：|`:paw_prints:`|
|：花束：|`:bouquet:`|
|：Cherry_blossom：|`:cherry_blossom:`|
|：郁金香：|`:tulip:`|
|：Four_leaf_clover：|`:four_leaf_clover:`|
|：玫瑰：|`:rose:`|
|：向日葵：|`:sunflower:`|
|：芙蓉：|`:hibiscus:`|
|：Maple_leaf：|`:maple_leaf:`|
|：叶：|`:leaves:`|
|：Fallen_leaf：|`:fallen_leaf:`|
|：香草：|`:herb:`|
|：蘑菇：|`:mushroom:`|
|：仙人掌：|`:cactus:`|
|：Palm_tree：|`:palm_tree:`|
|：Evergreen_tree：|`:evergreen_tree:`|
|：Deciduous_tree：|`:deciduous_tree:`|
|：板栗：|`:chestnut:`|
|：苗：|`:seedling:`|
|：花：|`:blossom:`|
|：Ear_of_rice：|`:ear_of_rice:`|
|：壳牌：|`:shell:`|
|：Globe_with_meridians：|`:globe_with_meridians:`|
|：Sun_with_face：|`:sun_with_face:`|
|：Full_moon_with_face：|`:full_moon_with_face:`|
|：New_moon_with_face：|`:new_moon_with_face:`|
|：New_moon：|`:new_moon:`|
|：Waxing_crescent_moon：|`:waxing_crescent_moon:`|
|：First_quarter_moon：|`:first_quarter_moon:`|
|：Waxing_gibbous_moon：|`:waxing_gibbous_moon:`|
|：Full_Moon：|`:full_moon:`|
|：Waning_gibbous_moon：|`:waning_gibbous_moon:`|
|：Last_quarter_moon：|`:last_quarter_moon:`|
|：Waning_crescent_moon：|`:waning_crescent_moon:`|
|：Last_quarter_moon_with_face：|`:last_quarter_moon_with_face:`|
|：First_quarter_moon_with_face：|`:first_quarter_moon_with_face:`|
|：Crescent_Moon：|`:crescent_moon:`|
|：Earth_africa：|`:earth_africa:`|
|：Earth_americas：|`:earth_americas:`|
|：Earth_asia：|`:earth_asia:`|
|：火山：|`:volcano:`|
|：Milky_way：|`:milky_way:`|
|：PARTLY_SUNNY：|`:partly_sunny:`|
|：Octocat：|`:octocat:`|
|：松鼠：|`:squirrel:`|
|：松鼠：|`：松鼠：`|

###对象
|     |    |
|：竹：|`:bamboo:`|
|：Gift_heart：|`:gift_heart:`|
|：娃娃：|`:dolls:`|
|：School_satchel：|`:school_satchel:`|
|：Mortar_board：|`:mortar_board:`|
|：标志：|`:flags:`|
|：焰火：|`:fireworks:`|
|：闪烁发光：|`:sparkler:`|
|：Wind_chime：|`:wind_chime:`|
|：Rice_scene：|`:rice_scene:`|
|：Jack_o_lantern：|`:jack_o_lantern:`|
|：鬼：|`:ghost:`|
|：圣诞老人：|`:santa:`|
|：Christmas_tree：|`:christmas_tree:`|
|：礼品：|`:gift:`|
|：贝尔：|`:bell:`|
|：No_bell：|`:no_bell:`|
|：Tanabata_tree：|`:tanabata_tree:`|
|：田田：|`:tada:`|
|：Confetti_ball：|`:confetti_ball:`|
|：气球：|`:balloon:`|
|：Crystal_ball：|`:crystal_ball:`|
|：CD：|`:cd:`|
|：DVD：|`:dvd:`|
|：Floppy_disk：|`:floppy_disk:`|
|：摄像头：|`:camera:`|
|：Video_camera：|`:video_camera:`|
|：Movie_camera：|`:movie_camera:`|
|：计算机：|`:computer:`|
|：电视：|`:tv:`|
|：iPhone：|`:iphone:`|
|：电话：|`:phone:`|
|：电话：|`:telephone:`|
|：Telephone_receiver：|`:telephone_receiver:`|
|：传呼机：|`:pager:`|
|：传真：|`:fax:`|
|：迷你光碟：|`:minidisc:`|
|：VHS：|`:vhs:`|
|：声音：|`:sound:`|
|：喇叭：|`:speaker:`|
|：静音：|`:mute:`|
|：扬声器：|`:loudspeaker:`|
|：兆：|`:mega:`|
|：沙漏：|`:hourglass:`|
|：Hourglass_flowing_sand：|`:hourglass_flowing_sand:`|
|：Alarm_clock：|`:alarm_clock:`|
|：手表：|`:watch:`|
|：收音机：|`:radio:`|
|：卫星：|`:satellite:`|
|：循环：|`:loop:`|
|：爱：|`:mag:`|
|：Mag_right：|`:mag_right:`|
|：解锁：|`:unlock:`|
|：锁：|`:lock:`|
|：Lock_with_ink_pen：|`:lock_with_ink_pen:`|
|：Closed_lock_with_key：|`:closed_lock_with_key:`|
|：关键：|`:key:`|
|：灯泡：|`:bulb:`|
|：手电筒：|`:flashlight:`|
|：High_brightness：|`:high_brightness:`|
|：Low_brightness：|`:low_brightness:`|
|：Electric_plug：|`:electric_plug:`|
|：电池：|`:battery:`|
|：呼叫：|`:calling:`|
|电子邮件：|`:email:`|
|：邮箱：|`:mailbox:`|
|：邮箱：|`:postbox:`|
|：浴：|`:bath:`|
|：浴缸：|`:bathtub:`|
|：淋浴：|`:shower:`|
|：座便器：|`:toilet:`|
|：扳手：|`:wrench:`|
|：Nut_and_bolt：|`:nut_and_bolt:`|
|：锤：|`:hammer:`|
|：座椅：|`:seat:`|
|：富翁：|`:moneybag:`|
|：日元：|`:yen:`|
|：美元：|`:dollar:`|
|：英镑：|`:pound:`|
|：欧元：|`:euro:`|
|：CREDIT_CARD：|`:credit_card:`|
|：Money_with_wings：|`:money_with_wings:`|
|：Inbox_tray：|`:inbox_tray:`|
|：Outbox_tray：|`:outbox_tray:`|
|：信封：|`:envelope:`|
|：Incoming_envelope：|`:incoming_envelope:`|
|：Postal_horn：|`:postal_horn:`|
|：Mailbox_closed：|`:mailbox_closed:`|
|：Mailbox_with_mail：|`:mailbox_with_mail:`|
|：Mailbox_with_no_mail：|`:mailbox_with_no_mail:`|
|：包装：|`:package:`|
|：门：|`:door:`|
|：吸烟：|`:smoking:`|
|：炸弹：|`:bomb:`|
|：枪：|`:gun:`|
|：Hocho：|`:hocho:`|
|：丸：|`:pill:`|
|：注射器：|`:syringe:`|
|：Page_facing_up：|`:page_facing_up:`|
|：Page_with_curl：|`:page_with_curl:`|
|：Bookmark_tabs：|`:bookmark_tabs:`|
|：Bar_chart：|`:bar_chart:`|
|：Chart_with_upwards_trend：|`:chart_with_upwards_trend:`|
|：Chart_with_downwards_trend：|`:chart_with_downwards_trend:`|
|：滚动：|`:scroll:`|
|：剪贴板：|`:clipboard:`|
|：日历：|`:calendar:`|
|：日期：|`:date:`|
|：Card_index：|`:card_index:`|
|：File_folder：|`:file_folder:`|
|：Open_file_folder：|`:open_file_folder:`|
|：剪刀：|`:scissors:`|
|：图钉：|`:pushpin:`|
|：回形针：|`:paperclip:`|
|：Black_nib：|`:black_nib:`|
|：Pencil2：|`:pencil2:`|
|：Straight_ruler：|`:straight_ruler:`|
|：Triangular_ruler：|`:triangular_ruler:`|
|：Closed_book：|`:closed_book:`|
|：Green_book：|`:green_book:`|
|：Blue_book：|`:blue_book:`|
|：Orange_book：|`:orange_book:`|
|：笔记本电脑：|`:notebook:`|
|：Notebook_with_decorative_cover：|`:notebook_with_decorative_cover:`|
|：总帐：|`:ledger:`|
|：书籍：|`:books:`|
|：收藏：|`:bookmark:`|
|：Name_badge：|`:name_badge:`|
|：显微镜：|`:microscope:`|
|：望远镜：|`:telescope:`|
|：报纸：|`:newspaper:`|
|：足球：|`:football:`|
|：篮球：|`:basketball:`|
|：足球：|`:soccer:`|
|：棒球：|`:baseball:`|
|：网球：|`:tennis:`|
|：很可能很可能：|`:8ball:`|
|：Rugby_football：|`:rugby_football:`|
|：保龄球：|`:bowling:`|
|：高尔夫：|`:golf:`|
|：Mountain_bicyclist：|`:mountain_bicyclist:`|
|：自行车运动员：|`:bicyclist:`|
|：Horse_racing：|`:horse_racing:`|
|：滑雪板：|`:snowboarder:`|
|：游泳：|`:swimmer:`|
|：冲浪：|`:surfer:`|
|：滑雪：|`:ski:`|
|：黑桃：|`:spades:`|
|：心：|`:hearts:`|
|：俱乐部：|`:clubs:`|
|：钻石：|`:diamonds:`|
|：宝石：|`:gem:`|
|：振铃|`:ring:`|
|：奖杯：|`:trophy:`|
|：Musical_score：|`:musical_score:`|
|：Musical_keyboard：|`:musical_keyboard:`|
|：小提琴：|`:violin:`|
|：Space_invader：|`:space_invader:`|
|：Video_game：|`:video_game:`|
|：Black_joker：|`:black_joker:`|
|：Flower_playing_cards：|`:flower_playing_cards:`|
|：Game_die：|`:game_die:`|
|：飞镖：|`:dart:`|
|：麻将|`:mahjong:`|
|：梆子：|`:clapper:`|
|注：|`:memo:`|
|：铅笔：|`:pencil:`|
|：图书：|`:book:`|
|：艺术：|`:art:`|
|：麦克风：|`:microphone:`|
|：耳机：|`:headphones:`|
|：小号：|`:trumpet:`|
|：萨克斯：|`:saxophone:`|
|：吉他：|`:guitar:`|
|：鞋：|`:shoe:`|
|：凉鞋：|`:sandal:`|
|：High_heel：|`:high_heel:`|
|：口红：|`:lipstick:`|
|：启动：|`:boot:`|
|：衬衫：|`:shirt:`|
|：T恤：|`:tshirt:`|
|：领带：|`:necktie:`|
|：Womans_clothes：|`:womans_clothes:`|
|：连衣裙：|`:dress:`|
|：Running_shirt_with_sash：|`:running_shirt_with_sash:`|
|：牛仔裤：|`:jeans:`|
|：和服：|`:kimono:`|
|：比基尼：|`:bikini:`|
|：织带：|`:ribbon:`|
|：高顶礼帽：|`:tophat:`|
|：冠：|`:crown:`|
|：Womans_hat：|`:womans_hat:`|
|：Mans_shoe：|`:mans_shoe:`|
|：Closed_umbrella：|`:closed_umbrella:`|
|：公文包：|`:briefcase:`|
|：手袋：|`:handbag:`|
|：袋：|`:pouch:`|
|：钱包：|`:purse:`|
|：眼镜：|`:eyeglasses:`|
|：Fishing_pole_and_fish：|`:fishing_pole_and_fish:`|
|：咖啡：|`:coffee:`|
|：茶：|`:tea:`|
|：清酒：|`:sake:`|
|：Baby_bottle：|`:baby_bottle:`|
|：啤酒：|`:beer:`|
|：啤酒：|`:beers:`|
|：鸡尾酒：|`:cocktail:`|
|：Tropical_drink：|`:tropical_drink:`|
|：Wine_glass：|`:wine_glass:`|
|：Fork_and_knife：|`:fork_and_knife:`|
|：披萨：|`:pizza:`|
|：汉堡：|`:hamburger:`|
|：薯条：|`:fries:`|
|：Poultry_leg：|`:poultry_leg:`|
|：Meat_on_bone：|`:meat_on_bone:`|
|：意大利面：|`:spaghetti:`|
|：咖喱：|`:curry:`|
|：Fried_shrimp：|`:fried_shrimp:`|
|：便当：|`:bento:`|
|：寿司：|`:sushi:`|
|：Fish_cake：|`:fish_cake:`|
|：Rice_ball：|`:rice_ball:`|
|：Rice_cracker：|`:rice_cracker:`|
|：大米：|`:rice:`|
|：拉面：|`:ramen:`|
|：炖：|`:stew:`|
|：奥登：|`:oden:`|
|：男子：|`:dango:`|
|：鸡蛋：|`:egg:`|
|：面包：|`:bread:`|
|：甜甜圈：|`:doughnut:`|
|：蛋奶：|`:custard:`|
|：冰淇凌：|`:icecream:`|
|：Ice_cream：|`:ice_cream:`|
|：Shaved_ice：|`:shaved_ice:`|
|：生日：|`:birthday:`|
|：蛋糕：|`:cake:`|
|：饼干：|`:cookie:`|
|：Chocolate_bar：|`:chocolate_bar:`|
|：糖果：|`:candy:`|
|：棒棒糖：|`:lollipop:`|
|：Honey_pot：|`:honey_pot:`|
|：苹果：|`:apple:`|
|：Green_apple：|`:green_apple:`|
|：蜜桔：|`:tangerine:`|
|：柠檬：|`:lemon:`|
|：樱桃：|`:cherries:`|
|：葡萄：|`:grapes:`|
|：西瓜：|`:watermelon:`|
|：草莓：|`:strawberry:`|
|：桃：|`:peach:`|
|：冬瓜：|`:melon:`|
|：香蕉：|`:banana:`|
|：梨：|`:pear:`|
|：菠萝：|`:pineapple:`|
|：Sweet_potato：|`:sweet_potato:`|
|：茄子：|`:eggplant:`|
|：番茄：|`:tomato:`|
|：玉米：|`:corn:`|
|：玉米：|`：玉米：`|

###地方
|     |    |
|：房子：|`:house:`|
|：House_with_garden：|`:house_with_garden:`|
|：学校：|`:school:`|
|：办公室：|`:office:`|
|：Post_office：|`:post_office:`|
|：医院：|`:hospital:`|
|：银行：|`:bank:`|
|：Convenience_store：|`:convenience_store:`|
|：Love_hotel：|`:love_hotel:`|
|：酒店：|`:hotel:`|
|：婚礼：|`:wedding:`|
|：教会：|`:church:`|
|：Department_store：|`:department_store:`|
|：European_post_office：|`:european_post_office:`|
|：City_sunrise：|`:city_sunrise:`|
|：City_sunset：|`:city_sunset:`|
|：Japanese_castle：|`:japanese_castle:`|
|：European_castle：|`:european_castle:`|
|：帐篷：|`:tent:`|
|：工厂：|`:factory:`|
|：Tokyo_tower：|`:tokyo_tower:`|
|：日本：|`:japan:`|
|：Mount_fuji：|`:mount_fuji:`|
|：Sunrise_over_mountains：|`:sunrise_over_mountains:`|
|：日出：|`:sunrise:`|
|：星级：|`:stars:`|
|：Statue_of_Liberty：|`:statue_of_liberty:`|
|：Bridge_at_night：|`:bridge_at_night:`|
|：Carousel_horse：|`:carousel_horse:`|
|：彩虹：|`:rainbow:`|
|：Ferris_wheel：|`:ferris_wheel:`|
|：喷泉：|`:fountain:`|
|：Roller_coaster：|`:roller_coaster:`|
|：船舶：|`:ship:`|
|：快艇：|`:speedboat:`|
|：船：|`:boat:`|
|：帆船：|`:sailboat:`|
|：划艇：|`:rowboat:`|
|：主持人：|`:anchor:`|
|：火箭：|`:rocket:`|
|：飞机：|`:airplane:`|
|：直升机：|`:helicopter:`|
|：Steam_locomotive：|`:steam_locomotive:`|
|：电车：|`:tram:`|
|：Mountain_railway：|`:mountain_railway:`|
|：自行车：|`:bike:`|
|：Aerial_tramway：|`:aerial_tramway:`|
|：Suspension_railway：|`:suspension_railway:`|
|：Mountain_cableway：|`:mountain_cableway:`|
|：拖拉机：|`:tractor:`|
|：Blue_car：|`:blue_car:`|
|：Oncoming_automobile：|`:oncoming_automobile:`|
|：汽车：|`:car:`|
|：Red_car：|`:red_car:`|
|：出租车：|`:taxi:`|
|：Oncoming_taxi：|`:oncoming_taxi:`|
|：Articulated_lorry：|`:articulated_lorry:`|
|：公交：|`:bus:`|
|：Oncoming_bus：|`:oncoming_bus:`|
|：Rotating_light：|`:rotating_light:`|
|：Police_car：|`:police_car:`|
|：Oncoming_police_car：|`:oncoming_police_car:`|
|：Fire_engine：|`:fire_engine:`|
|：救护车：|`:ambulance:`|
|：小巴：|`:minibus:`|
|：卡车：|`:truck:`|
|：火车：|`:train:`|
|：站：|`:station:`|
|：TRAIN2：|`:train2:`|
|：Bullettrain_front：|`:bullettrain_front:`|
|：Bullettrain_side：|`:bullettrain_side:`|
|：Light_rail：|`:light_rail:`|
|：单轨：|`:monorail:`|
|：Railway_car：|`:railway_car:`|
|：无轨电车：|`:trolleybus:`|
|：门票：|`:ticket:`|
|：Fuelpump：|`:fuelpump:`|
|：Vertical_traffic_light：|`:vertical_traffic_light:`|
|：Traffic_light：|`:traffic_light:`|
|：警告：|`:warning:`|
|：建筑：|`:construction:`|
|：初级：|`:beginner:`|
|：大气压：|`:atm:`|
|：Slot_machine：|`:slot_machine:`|
|：巴士站就：|`:busstop:`|
|：巴伯：|`:barber:`|
|：温泉：|`:hotsprings:`|
|：Checkered_flag：|`:checkered_flag:`|
|：Crossed_flags：|`:crossed_flags:`|
|：Izakaya_lantern：|`:izakaya_lantern:`|
|：摩艾：|`:moyai:`|
|：Circus_tent：|`:circus_tent:`|
|：表演艺术：|`:performing_arts:`|
|：Round_pushpin：|`:round_pushpin:`|
|：Triangular_flag_on_post：|`:triangular_flag_on_post:`|
|：特：|`:jp:`|
|：KR：|`:kr:`|
| CN：|`:cn:`|
|：我们：|`:us:`|
| FR：|`:fr:`|
|：它：|`:es:`|
|：它：|`:it:`|
|：茹：|`:ru:`|
|国标：|`:gb:`|
| UK：|`:uk:`|
|：恩：|`:de:`|
|：恩：|`DE：`|

###符号
|     |    |
|：一：|`:one:`|
|：二：|`:two:`|
|：三：|`:three:`|
|：四：|`:four:`|
|：五：|`:five:`|
|：六：|`:six:`|
|：七：|`:seven:`|
|：八：|`:eight:`|
|：九：|`:nine:`|
|：Keycap_ten：|`:keycap_ten:`|
|：1234：|`:1234:`|
|：零：|`:zero:`|
|：哈希：|`:hash:`|
|：符号：|`:symbols:`|
|：Arrow_backward：|`:arrow_backward:`|
|：Arrow_down：|`:arrow_down:`|
|：Arrow_forward：|`:arrow_forward:`|
|：Arrow_left：|`:arrow_left:`|
|：Capital_abcd：|`:capital_abcd:`|
|：ABCD：|`:abcd:`|
|：农行：|`:abc:`|
|：Arrow_lower_left：|`:arrow_lower_left:`|
|：Arrow_lower_right：|`:arrow_lower_right:`|
|：ARROW_RIGHT：|`:arrow_right:`|
|：Arrow_up：|`:arrow_up:`|
|：Arrow_upper_left：|`:arrow_upper_left:`|
|：Arrow_upper_right：|`:arrow_upper_right:`|
|：Arrow_double_down：|`:arrow_double_down:`|
|：Arrow_double_up：|`:arrow_double_up:`|
|：Arrow_down_small：|`:arrow_down_small:`|
|：Arrow_heading_down：|`:arrow_heading_down:`|
|：Arrow_heading_up：|`:arrow_heading_up:`|
|：Leftwards_arrow_with_hook：|`:leftwards_arrow_with_hook:`|
|：Arrow_right_hook：|`:arrow_right_hook:`|
|：Left_right_arrow：|`:left_right_arrow:`|
|：Arrow_up_down：|`:arrow_up_down:`|
|：Arrow_up_small：|`:arrow_up_small:`|
|：Arrows_clockwise：|`:arrows_clockwise:`|
|：Arrows_counterclockwise：|`:arrows_counterclockwise:`|
|：倒带：|`:rewind:`|
|：FAST_FORWARD：|`:fast_forward:`|
|：Information_source：|`:information_source:`|
|：OK：|`:ok:`|
|：Twisted_rightwards_arrows：|`:twisted_rightwards_arrows:`|
|：重复：|`:repeat:`|
|：Repeat_one：|`:repeat_one:`|
|：新：|`:new:`|
|：上：|`:top:`|
|：最多：|`:up:`|
|：酷：|`:cool:`|
|：免费：|`:free:`|
|：NG：|`:ng:`|
|：电影院：|`:cinema:`|
|：江潮：|`:koko:`|
|：Signal_strength：|`:signal_strength:`|
|：U5272：|`:u5272:`|
|：U5408：|`:u5408:`|
|：U55b6：|`:u55b6:`|
|：U6307：|`:u6307:`|
|：U6708：|`:u6708:`|
|：U6709：|`:u6709:`|
|：U6e80：|`:u6e80:`|
|：U7121：|`:u7121:`|
|：U7533：|`:u7533:`|
|：U7a7a：|`:u7a7a:`|
|：U7981：|`:u7981:`|
|：周六：|`:sa:`|
|：厕所：|`:restroom:`|
|男装：|`:mens:`|
|：女装：|`:womens:`|
|：Baby_symbol：|`:baby_symbol:`|
|：No_smoking：|`:no_smoking:`|
|：停车场：|`:parking:`|
|：轮椅：|`:wheelchair:`|
|：地铁：|`:metro:`|
|：Baggage_claim：|`:baggage_claim:`|
|：接受：|`:accept:`|
|：WC：|`:wc:`|
|：Potable_water：|`:potable_water:`|
|：Put_litter_in_its_place：|`:put_litter_in_its_place:`|
|：揭秘：|`:secret:`|
|：祝贺：|`:congratulations:`|
|：M：|`:m:`|
|：Passport_control：|`:passport_control:`|
|：Left_luggage：|`:left_luggage:`|
|：海关：|`:customs:`|
|：Ideograph_advantage：|`:ideograph_advantage:`|
|：CL：|`:cl:`|
|：SOS：|`:sos:`|
|：ID：|`:id:`|
|：No_entry_sign：|`:no_entry_sign:`|
|：未成年人：|`:underage:`|
|：No_mobile_phones：|`:no_mobile_phones:`|
|：Do_not_litter：|`:do_not_litter:`|
|：No_bicycles：|`:no_bicycles:`|
|：No_pedestrians：|`:no_pedestrians:`|
|：Children_crossing：|`:children_crossing:`|
|：NO_ENTRY：|`:no_entry:`|
|：Eight_spoked_asterisk：|`:eight_spoked_asterisk:`|
|：旌宇：|`:sparkle:`|
|：Eight_pointed_black_star：|`:eight_pointed_black_star:`|
|：Heart_decoration：|`:heart_decoration:`|
| VS客队：：|`:vs:`|
|：Vibration_mode：|`:vibration_mode:`|
|：Mobile_phone_off：|`:mobile_phone_off:`|
|：图表：|`:chart:`|
|：Currency_exchange：|`:currency_exchange:`|
|：白羊座：|`:aries:`|
|：金牛座：|`:taurus:`|
|：双子座：|`:gemini:`|
|：巨蟹座：|`:cancer:`|
|狮子座：|`:leo:`|
|处女座：|`:virgo:`|
|天秤座：|`:libra:`|
|：天蝎座：|`:scorpius:`|
|：射手座：|`:sagittarius:`|
|摩羯座：|`:capricorn:`|
|：水瓶座：|`:aquarius:`|
|：双鱼座：|`:pisces:`|
|：蛇夫座：|`:ophiuchus:`|
|：Six_pointed_star：|`:six_pointed_star:`|
|：Negative_squared_cross_mark：|`:negative_squared_cross_mark:`|
| A：|`:a:`|
|：B：|`:b:`|
|来源：|`:ab:`|
|：O2：|`:o2:`|
|：Diamond_shape_with_a_dot_inside：|`:diamond_shape_with_a_dot_inside:`|
|：回收：|`:recycle:`|
|：结束：|`:end:`|
|：返回：|`:back:`|
|：开：|`:on:`|
|：不久：|`:soon:`|
|：时钟1：|`:clock1:`|
|：Clock130：|`:clock130:`|
|：Clock10：|`:clock10:`|
|：Clock1030：|`:clock1030:`|
|：Clock11：|`:clock11:`|
|：Clock1130：|`:clock1130:`|
|：Clock12：|`:clock12:`|
|：Clock1230：|`:clock1230:`|
|：时钟2：|`:clock2:`|
|：Clock230：|`:clock230:`|
|：Clock3：|`:clock3:`|
|：Clock330：|`:clock330:`|
|：Clock4：|`:clock4:`|
|：Clock430：|`:clock430:`|
|：Clock5：|`:clock5:`|
|：Clock530：|`:clock530:`|
|：Clock6：|`:clock6:`|
|：Clock630：|`:clock630:`|
|：Clock7：|`:clock7:`|
|：Clock730：|`:clock730:`|
|：Clock8：|`:clock8:`|
|：Clock830：|`:clock830:`|
|：Clock9：|`:clock9:`|
|：Clock930：|`:clock930:`|
|：Heavy_dollar_sign：|`:heavy_dollar_sign:`|
|：版权所有：|`:copyright:`|
|：注册：|`:registered:`|
|式：Tm：|`:tm:`|
| X：|`:x:`|
|：Heavy_exclamation_mark：|`:heavy_exclamation_mark:`|
|：棒棒：|`:bangbang:`|
|：进行插入：|`:interrobang:`|
| O：|`:o:`|
|：Heavy_multiplication_x：|`:heavy_multiplication_x:`|
|：Heavy_plus_sign：|`:heavy_plus_sign:`|
|：Heavy_minus_sign：|`:heavy_minus_sign:`|
|：Heavy_division_sign：|`:heavy_division_sign:`|
|：White_flower：|`:white_flower:`|
| 100：|`:100:`|
|：Heavy_check_mark：|`:heavy_check_mark:`|
|：Ballot_box_with_check：|`:ballot_box_with_check:`|
|：Radio_button：|`:radio_button:`|
|：链接：|`:link:`|
|：Curly_loop：|`:curly_loop:`|
|：Wavy_dash：|`:wavy_dash:`|
|：Part_alternation_mark：|`:part_alternation_mark:`|
|：三叉戟：|`:trident:`|
|：Black_small_square：|`:black_small_square:`|
|：White_small_square：|`:white_small_square:`|
|：Black_medium_small_square：|`:black_medium_small_square:`|
|：White_medium_small_square：|`:white_medium_small_square:`|
|：Black_medium_square：|`:black_medium_square:`|
|：White_medium_square：|`:white_medium_square:`|
|：Black_large_square：|`:black_large_square:`|
|：White_large_square：|`:white_large_square:`|
|：White_check_mark：|`:white_check_mark:`|
|：Black_square_button：|`:black_square_button:`|
|：White_square_button：|`:white_square_button:`|
|：Black_circle：|`:black_circle:`|
|：White_circle：|`:white_circle:`|
|：Red_circle：|`:red_circle:`|
|：Large_blue_circle：|`:large_blue_circle:`|
|：Large_blue_diamond：|`:large_blue_diamond:`|
|：Large_orange_diamond：|`:large_orange_diamond:`|
|：Small_blue_diamond：|`:small_blue_diamond:`|
|：Small_orange_diamond：|`:small_orange_diamond:`|
|：Small_red_triangle：|`:small_red_triangle:`|
|：Small_red_triangle_down：|`:small_red_triangle_down:`|
|：Shipit：|`:shipit:`|
|：Shipit：|`：shipit：`|

<h3 id="lizenz">许可证</h3>

本作品采用知识共享署名 - 相同方式（BY-SA）4.0国际许可证] [by-sa]授权。

[by-sa]：http：//creativecommons.org/licenses/by-sa/4.0/deed.de

这是[John Grubers] [jg] [Markdown] [md]的[原始语法文档] [osd]的翻译。此翻译是指15.12.2013（Markdown版本1.0.1）的状态。不保证翻译的正确性。如果翻译中有错误，请发送短信至<lasar@liepins.net>。
任何其他类型的反馈也是受欢迎的。*

[jg]：http：//daringfireball.net/ [md]：http：//daringfireball.net/projects/markdown/ [osd]：http：//daringfireball.net/projects/markdown/syntax