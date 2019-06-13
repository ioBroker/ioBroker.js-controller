---
title: 降价
lastChanged: 14.09.2018
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: nHQJvm435hzSoVxk8r0edx7VWed2QP55UFCl+8JsTW4=
---
#Markdown：语法
？>为了使ioBroker文档易于创建和阅读，选择Markdown作为简化的标记语言。以下指南将帮助您了解Markdown的语法和可能性，并将其转换为出色的文档。

从技术上讲，文档系统仅支持以下功能：

 - 标题
 - 表格
 - 内联HTML
 - 名单
 - 链接
 - 图像
 - 大胆的文字
 - 斜体文字

<div id="overview"></div>

##概述
<div id="philosophy"></div>

###哲学
Markdown的设计基本理念是尽可能易于阅读和书写。

易读性是这里的终极目标。 Markdown格式的文档应该能够以其基本形式发布，而不会出现标记或格式化（如HTML的情况）。

因此，Markdown的语法仅包含明智选择的字符，以使其外观与其含义相对应。
例如，一个单词周围的星号实际上看起来像\ *stress \* Markdown中的列表看起来像列表。甚至引用块看起来像引用的段落，因为它们是从电子邮件中获知的。

<div id="html"></div>

###内联HTML
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

<a id="autoescape"></a>

###自动屏蔽特殊字符
在HTML中，有两个字符需要特殊处理：`<`和`&`。左尖括号用于打开HTML标签，＆符号用于描述命名字符（实体）。如果要将这些字符用作HTML文档中的“自身”，则必须将它们屏蔽为实体，即`&lt;`和`&amp;`。

商业用户对Web开发人员来说尤其不切实际。如果你想写“AT＆T”，你必须写“`AT&amp;T`”。商业甚至需要在URL中屏蔽。在页面的链接中

    `http://images.google.com/images?num=30&q=larry+bird`

URL必须按如下方式编码：

    `http://images.google.com/images?num=30&amp;q=larry+bird`

这很容易被遗忘，并且可能是验证格式良好的HTML文档时最常见的错误。

Markdown允许您正常使用这些字符。它控制编码本身。如果商家 - 并且在实体中使用，则不对其进行编码，否则转换为`&amp;`。

因此，如果您想输入版权符号，您可以轻松地进行

    及复印件;

写，Markdown不会修改它。但是出去了

    AT＆T

Markdown

    AT＆amp; T公司

令。由于Markdown Inline支持HTML，因此在相应的情况下，尖括号通常被视为HTML。只有像这样的东西

    4 <5

Markdown

    4＆lt;五

令。在代码或跨度块中，尖括号和＆符号*始终*编码。这简化了在Markdown中通过HTML进行编写（与原始HTML不同，在编写每个`<`和`&`时，通常是一个噩梦）。

* * *

<div id="block"></div>

##块元素
<a id="p"></a>

###段落和换行符段落只是由一个或多个空行分隔的一行或多行文本。 （空白行是任何看起来像*空白行的行 - 除了空格和制表符之外什么都不包含的行被视为空。）正常段落不应缩进空格或制表符。
“一条或多条线”规则意味着一件事：Markdown支持带有“剧烈动荡”的段落。这与大多数其他文本到HTML格式化程序（包括Movable Type Convert Line Breaks选项）非常不同，后者将段落中的每个换行符格式化为`<br />`。

如果您希望*将`<br />`作为break，则可以简单地以两个或多个空格结束该行。

虽然这是创建`<br />`的一小部分开销，但简单的“任何新行是`<br />`”规则在Markdown中不起作用。

当使用换行符格式化时，Markdown的电子邮件风格[引用] [bq]和[list-entries] [l]效果最好 - 看起来更好。

[bq]: #blockquote

[l]:  #list

<a id="header"></a>

### Headers Markdown这里只支持一种标题格式：atx。
类似Atx的标题在行的开头使用1-6个菱形字符，对应于1-6级。例如：

    ＃这是一个H1
    ##这是一个H2
    ######这是一个H6
<a id="blockquote"></a>

###引用
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

<a id="list"></a>

###列表
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

不过，每次都会出现相同的清单。如果需要，可以用手正确编号。但是如果你想要懒惰，你可以自信地使用相同的数字。

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

    这是一个有两个段落的要点。 Lorem ipsum dolor

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

<a id="hr"></a>

###水平线水平线的标记（`<hr />`）可以通过仅在一行上写三个或更多个连字符或星号来生成。字符之间的空格也是允许的。以下所有示例都将生成一条水平线：
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span元素
<a id="link"></a>

###链接
Markdown支持两种类型的链接：*内联*和*引用*。

在这两种样式中，链接文本都标有[方括号]。

要创建内联链接，请在结束方括号后面写下正常括号。在这些括号中，URL被编写为与引号中的链接的* optional *标题链接在一起。例子：

对于内联链接，这是[一个例子](http://example.com/ "Der Linktitel")。

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

[id]: http://example.com/  "Optionalen Titel hier eintragen"

所以：

*方括号包含链接标识符（可选）

    最多三个空格缩进）;

*后跟冒号;
*后跟一个或多个空格（或标签）;
*后跟链接的URL;
*可选地后跟链接的title属性的文本，

    用括号括起来，用单引号或双引号括起来。

以下三个定义相同：

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**注意：** Markdown 1.0.1中存在一个已知的错误，它阻碍了单引号作为链接标题的分隔符的功能。

链接URL可以选择打包在尖括号中：

[id]: <http://example.com/>  "Optionaler Titel hier"

title属性也可以设置为下一行，并缩进更多空格或制表符。对于长URL，这看起来更好：

[id]: http://example.com/langer/pfad/zu/seite

        “这里的可选标题”

链接定义仅用于在Markdown处理文档时创建链接，并在输出HTML之前从文档中删除。

链接定义的标识符可以包含字母，数字，空格和标点符号。它们是*大写和小写的独立*：

[链接文字] [a] [链接文字] [A]

这两个链接定义是等效的。

*隐含的链接标识符*允许您省略链接标识符。在这种情况下，链接文本用作标识符。只需在链接文本中添加一组空方括号：

[谷歌] []

然后定义链接：

[Google]: http://google.com/

由于链接标识符可能包含空格，因此该缩写甚至适用于链接文本中的多个单词：

访问[Daring Fireball] []了解更多信息。

然后定义链接：

[Daring Fireball]: http://daringfireball.net/

可以在Markdown文档中的任何位置进行链接定义。一般来说，根据使用它们的段落制作它们是个好主意。但它们也可以在文档末尾列为脚注。

一个小例子：

我从[Google] [1]获得的流量是[Yahoo] [2]或[MSN] [3]的10倍。

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

隐含链接标识符的缩写也可用于编写：

我从[Google] []获得的流量是[Yahoo] []或[MSN] []的10倍。

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

这两个示例都将生成以下HTML代码：

<p>我从<a href="http://google.com/" title="谷歌">Google</a>获得的流量是<a href="http://search.yahoo.com/" title="雅虎搜索">雅虎</a>或<a href="http://search.msn.com/" title="MSN搜索">MSN</a>流量的十倍。 </p>

为了比较，使用Markdown的内联链接后面是相同的段落：

我从[谷歌](http://google.com/ "Google")获得的流量是[雅虎](http://search.yahoo.com/ "Yahoo Search")或[MSN](http://search.msn.com/ "MSN Search")的10倍。

参考链接背后的想法并不是它们更容易编写。这个想法是他们使文档更具可读性。示例段落只有80个字符长的参考链接，参考链接长度为181个字符;作为HTML，它是239个字符，比内容更多的标记。

使用Markdown的引用链接，源文档更像是最终输出格式，如浏览器中所示。从段落中提取标记元数据的功能允许将链接集成到文本中，而不会减慢文本流。

<a id="em"></a>

###强调Markdown将星号（`*`）和下划线（`_`）视为强调的指标。个别`*`或`_`中包含的文本附带HTML标记`<em>`，重复`*`或`_`标记有标记`<strong>` ，以下文字为例：
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

<a id="code"></a>

###代码为了标记代码区域，它用反引号字符（`` ```）括起来。与代码块不同，代码区域格式化正常段落中的代码：
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

<a id="img"></a>

不可否认，很难找到在文本中嵌入图形的“自然”语法。
Markdown使用类似于链接样式的语法。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文字](../../de/community/pfad/zum/bild.jpg)

    ![替代文字](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

*感叹号：`！`;
*后跟一组方括号，显示的值

    `alt`包含图形的属性;

*后跟括号，表示图形的URL或路径

和可选的`title`属性的值，用引号括起来。

参考样式中的图像引用如下所示：

    ！[替代文字] [id]

“id”是此处定义的图像引用的名称。使用与链接引用相同的语法定义图像引用：

[id]: url/zur/grafik  "Optionales title-Attribut"

目前，Markdown没有指定图形大小的语法。如果这是必要的，可以使用普通的HTML标记`<img>`。

* * *

<div id="misc"></div>

##杂项
<a id="backslash"></a>

###反斜杠屏蔽
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

<a id="lizenz"></a>

###许可证
本作品采用知识共享署名 - 相同方式（BY-SA）4.0国际许可证] [by-sa]授权。

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

这是[John Grubers] [jg] [Markdown] [md]的[原始语法文档] [osd]的翻译。此翻译是指15.12.2013（Markdown版本1.0.1）的状态。不保证翻译的正确性。如果翻译中有错误，请发送短信至<lasar@liepins.net>。
任何其他类型的反馈也是受欢迎的。*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax