---
title: 降价促销
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/community/docmarkdown.md
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
＃Markdown：语法
？>为了便于快速创建ioBroker的文档，Markdown被选择为简化的标记语言。以下指南将帮助您学习Markdown的语法和功能，并将其转换为出色的文档。

从技术上讲，文档系统仅支持以下功能：

-标头
-桌子
-内联HTML
-清单
- 剩下
- 图片
- 粗体
-斜体文字

＃＃ 概述
＃＃＃ 哲学
Markdown在设计时就考虑了基本思想，以使其尽可能易于阅读和编写。

可读性是这里的重中之重。 Markdown格式的文档应该能够以其基本形式发布，而不会看上去像被标记或格式化（HTML就是这种情况）。

因此，Markdown的语法仅包含经过精心选择以匹配其含义的字符。例如，单词周围的星号实际上看起来像是\ *重音\ *。 Markdown中的列表看起来像列表。正如您从电子邮件中所知道的，甚至引号块也看起来像是引用的文本段落。

###内联HTML
Markdown的语法有一个目的：用于*为Web编写*。

Markdown不能替代HTML，甚至不能替代HTML。语法的范围很小，仅对应所有HTML标签的一小部分。 Markdown并不打算使HTML标记更容易。 HTML非常简单。 Markdown的思想是使文本尽可能易于阅读，编写和编辑。 HTML是*发布格式*; Markdown是一种*书写格式*。因此，其语法仅考虑可以通过纯文本传达的内容。

Markdown不可行的任何格式都可以简单地使用HTML。无需突出显示HTML即可将其与其余部分分开。
它只是简单地写在文本中。

唯一的限制是块元素，例如`<div>`，`<table>`，`<pre>`，`<p>`等。它们必须与周围的内容用空行分隔，并且开始和结束标签不应使用空格或制表符缩进。 Markdown足够聪明，不会在HTML块周围设置任何其他（不需要的）`<p>`标签。

例如，要在Markdown文章中包含HTML表：

    这是一段普通的段落。

<table><tr><td>oo</td></tr></table>

    这仍然是普通段落。

应该注意的是，Markdown的语法在HTML块中没有解释。例如，*强调*不能在HTML块内使用。

内联HTML标记（例如`<span>`，`<cite>`或`<del>`§）可以在降价段落，列表项或标题中的任何位置使用。
HTML标记甚至可以代替适当的Markdown格式使用。只需对链接或图形使用`<a>`或`<img>`而不是Markdow的语法就可以了。

与块标签相反，Markdown语法在行内标签中解释。

###自动屏蔽特殊字符
HTML中有两个需要特殊处理的字符：`<`和`&`。
左尖括号用于打开HTML标记，“＆”号用于描述命名字符（实体）。如果这些字符在HTML文档中用作“自己”，则必须将它们屏蔽为实体，即`&lt;`和`&amp;`。

对于Web开发人员，“＆”号是特别不切实际的。如果要写“ AT＆T”，则必须写“`AT&amp;T`”。甚至必须在URL中屏蔽“＆”号。在页面链接中

`http://images.google.com/images?num=30&q=larry+bird`

该网址必须按以下方式编码：

`http://images.google.com/images?num=30&amp;q=larry+bird`

这很容易忘记，并且可能是验证格式正确的HTML文档时最常见的错误。

Markdown允许正常使用这些字符。它会对代码本身进行调节，如果在实体中使用了“＆”号，则不会对其进行编码，否则它将被转换为`&amp;`。

因此，例如，如果您想输入版权符号，则只需

`&copy;`

写，而Markdown不会对此进行修改。但是关闭

`AT&T`

降价

`AT&amp;T`

做。由于Markdown支持内联HTML，因此在适当的情况下将尖括号视为HTML。只是为了像

`4 < 5`

降价

`4 &lt; 5`

做。但是，尖括号和＆符*总是*用代码或跨度块编码。这简化了在Markdown中通过HTML编写代码（与原始HTML相反，原始HTML在大多数情况下都是对每个`<`和`&`进行编码的梦night）。

##块元素
###段落和换行符
一段只是一个或多个文本行，由一个或多个空白行分隔。 （空行是*看起来像空行的任何行-除空格和制表符外，什么都不包含的行被视为空白。）普通段落不应以空格或制表符缩进。

“一行或多行”规则意味着一件事：Markdown支持“硬中断”段落。这与大多数其他文本到HTML格式器（包括Movable Type的“转换换行符”选项）非常不同，后者将段落中的每个换行符格式化为`<br />`。

如果您*希望*以`<br />`作为中断，则可以简单地以两个或多个空格结束该行。

生成`<br />`这是一项额外的工作，但是简单的“每个换行符都是`<br />`”规则在Markdown中不起作用。

当使用换行符进行格式化时，Markdown的类似电子邮件的多段[引号]（＃引号）和[列表条目](#listen)效果最好，并且外观更好。

[bq]: #blockquote

[l]:  #list

###标头
Markdown在这里仅支持一种标题格式：atx。
类似于Atx的标头在行的开头使用1-6哈希符号，对应于1-6级。例如：

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

＃＃＃ 引号
Markdown像电子邮件一样，将字符`>`用作报价块。如果您有使用电子邮件中的报价的经验，您还将知道如何在Markdown中创建报价。如果您将每行文字换行并在每行前面放置`>`，则看起来最好：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,``> consectetuer adipiscing elit. Aliquam hendrerit mi posuere``> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet``> vitae, risus.``>``> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.``> Suspendisse id sem consectetuer libero luctus adipiscing.`

Markdown还可以让您变得懒惰，并且只在硬断段落的第一行使用`>`：

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,``consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.``Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,``risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.``Suspendisse id sem consectetuer libero luctus adipiscing.`

可以使用更多的`>`嵌套报价（即报价中的报价）：

`    > Dies ist die erste Zitat-Ebene.``    >``    > > Dies ist ein verschachteltes Zitat.``    >``    > Zurück auf der ersten Ebene.`

引号可以包含其他Markdown元素，包括标题，列表和代码块：

> ##这是一个标题。
>> 1.这是列表中的第一项。
> 2.这是列表中的第二项。
>>这里是一些示例代码：>> return shell_exec（“ echo $ input | $ Markdown_script”）；

任何合理的文本编辑器都应使电子邮件风格的引用变得容易。例如，在BBEdit中，您可以进行选择，然后从菜单`Text`中选择`Increase Quote Level`。

###列表
Markdown支持排序（编号）列表和未排序列表（项目列表）。

未排序的列表使用星号，加号和连字符（可互换使用）作为列表标记：

    * 红色的
    * 绿色的
    * 蓝色的

等于：

+红色+绿色+蓝色

和：

    - 红色的
    - 绿色
    - 蓝色的

排序的列表使用数字后跟一个句点：

    第一只狗
    第二只猫
    3.鼠标

重要的是要理解数字本身对Markdown的输出没有影响。 Markdown从最后一个列表创建以下HTML：

<ol><li>狗</li><li>猫</li><li>鼠</li></ol>

如果您改为这样写列表：

    第一只狗
    第一只猫
    1.鼠标

甚至：

    第三只狗
    第一只猫
    8.鼠标

每次都会出现相同的列表。如果需要，您可以手动为列表正确编号。但是，如果您想变得懒惰，可以始终使用相同的数字。

但是，即使这样，您也应该从数字1开始。将来，Markdown可能希望为列表中的第一个条目设置一个起始编号。

列表条目通常从文档的左边缘开始，但是可以在右边向右缩进三个空格。
列表标记必须与以下文本分开，并带有一个或多个空格或一个制表符。

为了更好地格式化列表，可以缩进各个条目，例如：

    * Lorem ipsum dolor坐着，安全管教精英。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi，新维拉维拉，贝加莱，旧生活，日升。

    * Donec坐在amet nisl。 Aliquam semper ipsum坐着velit。

        暂缓录取书记自由放学。

以下示例生成相同的代码，但不太简洁：

    * Lorem ipsum dolor坐着，安全管教精英。

Aliquam hendrerit mi posuere lectus。 Vestibulum enim wisi，新维拉维拉，贝加莱，旧生活，日升。

    * Donec坐在amet nisl。 Aliquam semper ipsum坐着velit。

    暂缓录取书记自由放学。

如果列表条目用空行分隔，Markdown将用`<p>`和`</p>`包裹列表条目。

例如，这将是：

    * Warsteiner
    * 国王

至

<ul><li>沃斯坦纳</li><li>国王</li></ul>

但是这个：

    * Warsteiner

    * 国王

变成

<ul><li><p>沃斯坦纳</p></li><li><p>国王</p></li></ul>

列表项可以包含几个段落。列表项中的以下每个段落都必须缩进至少4个空格或一个制表符：

    1.这是一个有两段的要点。 Lorem ipsum dolor

坐着，有礼貌地教书生。 Aliquam hendrerit mi posuere lectus。

Vestibulum enim wisi，新维拉维拉，贝加莱，旧生活，日升。 Donec坐在amet nisl上。 Aliquam semper ipsum坐着velit。

    2. Suspenddisse sem consectetuer libero luctus adipiscing。

缩进下一段的每一行看起来都不错，但是Markdown再次允许懒惰的人只缩进第一行：

    *这是一个带有两个段落的列表项

这是此列表项中的第二段。仅第一行需要缩进。 Lorem ipsum dolor坐下来，管教精通精英。

    *同一列表中的另一个项目。

要在列表项中使用引号，必须将引号缩进：

    *带引号的清单项目：

>这是一个报价>在列表中。

要在列表项中使用代码块，必须将代码缩进*两次*-8个空格或两个制表符：

    *带有代码示例的清单项目：

            <在此处插入代码>

例如，可能会意外创建列表。
以下内容写道：

    1986年。真是美好的一年。

换句话说：在行的开头的序列* number-period-space *。为避免此问题，可以使用反斜杠将点屏蔽：

    1986年。多么美好的一年。

<h3 id="precode">代码块</h3>

预格式化的代码块用于覆盖程序或标记源代码。代替形成普通的段落，将代码块中的行解释为找到的行。 Markdown包含带有标记`<pre>`和`<code>`§的代码块。

要在Markdown中创建代码块，只需在代码块的每一行缩进至少4个空格或一个制表符。从以下输入...

    这是一段普通的段落。

        这是一段代码。

Markdown执行以下操作：

<p>这是一段普通的段落。</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

从每行缩进中删除一个缩进级别（4个空格或1个制表符）。例如 ...

    AppleScript中的一个示例：

告诉应用程序“ Foo”提示音结束

...成为

<p>AppleScript中的一个示例：</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

代码块在未缩进的第一行（或文档的末尾）结束。

在代码块中，“＆”号（`&`）和尖括号（`<`和`>`）被自动转换为HTML实体。这使HTML片段的集成变得更加容易-只需将HTML复制到文档中，进行缩进，然后Markdown即可对与号和尖括号进行编码。例如：

<div class="footer">©2004 Foo Corporation</div>

变成：

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

普通Markdown语法未在代码块中处理。 IE。
星号只是代码块中的星号，而不是突出显示文本的信号。结果是很容易在Markdown中谈论* Markdown。

<a id="hr"></a>

###水平线可以通过在一行上单独写3个或更多连字符或星号来生成水平线（`<hr />`）的日期。字符之间也可以有空格。以下所有示例将生成一条水平线：
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

##跨度元素
<a id="link"></a>

＃＃＃ 剩下
Markdown支持两种类型的链接：*内联*和*引用*。

在两种样式中，链接文本均用[方括号]标记。

要创建内联链接，请在右方括号后紧接写上普通括号。要链接到的URL与这些括号一起写在引号中，并带有*可选*标题。例子：

这是内联链接的[一个例子](http://example.com/ "Der Linktitel")。

    [这个连结](http://example.net/)没有标题属性。

变成：

<p>这是一个内联链接<a href="http://example.com/" title="标题">的示例。</a></p>

<p><a href="http://example.net/">该链接</a>没有标题属性。</p>

如果要引用同一服务器上的内容，则可以使用相对路径：

    在[关于我](/about/)页面上，有更多信息。

参考链接使用第二组方括号，其中包含该链接的任何标识符：

    这是参考链接的[示例] [id]。

如果愿意，还可以在方括号之间插入一个空格：

    这是参考链接的[示例] [id]。

然后，在文档中的某处，按以下方式在自己的行上定义链接：

[id]: http://example.com/  "Optionalen Titel hier eintragen"

所以：

*包含链接标识符的方括号（可选带

    缩进最多三个空格）；

*后跟冒号；
*后接一个或多个空格（或制表符）；
*，然后是链接的网址；
*（可选）后跟链接标题属性的文本，

    用括号括起来，用单引号或双引号引起来。

以下三个定义是相同的：

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**注意：** Markdown 1.0.1中存在一个已知的错误，该错误会阻止单引号用作链接标题的分隔符。

链接URL可以选择用尖括号括起来：

[id]: <http://example.com/>  "Optionaler Titel hier"

title属性也可以放在下一行，并缩进更多的空格或制表符。长网址看起来更好：

[id]: http://example.com/langer/pfad/zu/seite

        “此处为可选标题”

链接定义仅在Markdown处理文档时用于创建链接，并且在呈现HTML之前将其从文档中删除。

链接定义的标识符可以由字母，数字，空格和标点符号组成。它们是*独立的*，不区分大小写：

[链接文本] [a] [链接文本] [A]

这两个链接定义是等效的。

*隐含的链接标识符*允许省略链接标识符。在这种情况下，链接文本用作标识符。将一组空的方括号简单地附加到链接文本：

[谷歌] []

然后定义链接：

[Google]: http://google.com/

由于链接标识符可以包含空格，因此该缩写甚至可以用于链接文本中的多个单词：

请访问[Daring Fireball] []，以获取更多信息。

然后定义链接：

[Daring Fireball]: http://daringfireball.net/

链接定义可以在Markdown文档中的任何位置进行。通常，在使用它们的段落之后执行它们是一个好主意。但是，就像脚注一样，它们都可以在文档末尾列出。

一个小例子：

我从[Google] [1]获得的流量是[Yahoo] [2]或[MSN] [3]的十倍。

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

使用隐含链接标识符上方的缩写，您还可以编写以下内容：

我从[Google] []获得的流量是[Yahoo] []或[MSN] []的十倍。

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

这两个示例都将导致以下HTML代码：

<p><a href="http://google.com/" title="谷歌">我从Google</a>获得的访问量是<a href="http://search.yahoo.com/" title="雅虎搜索">Yahoo</a>或<a href="http://search.msn.com/" title="MSN搜索">MSN的</a>十倍。</p>

为了进行比较，下面使用Markdown的内联链接介绍了同一段：

我从[谷歌](http://google.com/ "Google")获得的流量是从[雅虎](http://search.yahoo.com/ "Yahoo Search")或[MSN](http://search.msn.com/ "MSN Search")获得的流量的十倍。

参考链接背后的想法并不是说它们更容易编写。想法是，它们使文档更具可读性。示例段落的参考链接只有80个字符，参考链接只有181个字符。 HTML 239个字符，比内容更多的标记。

使用Markdown的参考链接，源文档看起来更像最终输出格式，如浏览器中所示。具有从段落中提取标记的元数据的功能，可以将链接集成到文本中，而不会减慢文本的流动。

<a id="em"></a>

###重点Markdown将星号（`*`）和下划线（`_`）视为强调指标。文字装入个人`*`或`_`内附HTML标签`<em>`，双`*`或`_`都标有标签`<strong>`。以以下文本为例：
    *单星号*

    _单下划线_

    **双星号**

    __双下划线__

将输出以下内容：

<em>单星号</em>

<em>单下划线</em>

<strong>双星号</strong>

<strong>双下划线</strong>

样式可以任意选择。唯一的限制是必须使用相同的符号来打开和关闭重点区域。

可以在单词的中间使用重音：

    主*神*圣礼

但是，如果`*`或`_`被空格包围，则将其视为简单的星号或下划线。

在可能被理解为重点的地方写一个星号或下划线，可以用反斜杠将其遮盖：

    \ *此文本周围带有星号。

<a id="code"></a>

###代码要标记代码区域，请使用反引号将其括起来（``` `''）。与代码块相反，代码区在普通段落中格式化代码：
    使用功能`printf()`输出文本。

成为：

<p>使用函数<code>printf()</code>输出文本。</p>

如果要在代码区域中显示反引号，则可以在代码区域的前后使用多个反引号：

    ```Irgendwo hier (`）反引号被隐藏了。''

变成：

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

代码区域周围的反引号分隔符可以包含空格-一个在开始反引号之后，一个在结束反引号之前。这样就可以在代码区域内使用反引号，即使在开头或结尾也可以使用反引号：

代码区域中的单个反引号：``` `''

在代码区域中用反引号引起来的字符串：`` `foo` ``

变成：

<p>单个反引号在代码区： <code>`</code></p>

<p><code>`foo`</code>反引号引起来的字符串：§§SSSSS_0§§</p>

在代码区域中，“＆”号和尖括号被编码为HTML实体。

    没有人使用`<blink>`标签。

变成：

<p>没有人使用<code>&lt;blink&gt;</code>标签。</p>

以下内容也适用：

    `&#8212;`是`&mdash;`的十进制编码等效项。

这将

<p><code>&amp;#8212;</code> <code>&amp;mdash;</code>的十进制编码等效项。 。</p>

<a id="img"></a>

###图形诚然，要找到在文本中包含图形的“自然”语法是相当困难的。
Markdown使用一种语法来做到这一点，该语法应该类似于链接的样式。这允许两种类型：内联和引用。

内联语法如下所示：

    ![替代文字](../../de/community/pfad/zum/bild.jpg)

    ![替代文字](../../de/community/pfad/zum/bild.jpg "可选标题")

所以：

*感叹号：`！`;
*后跟一组方括号，表示方括号的值

    包含图形的`alt`属性；

*后接圆括号，指示图形的URL或路径

以及包含在引号中的可选`title`属性的值。

引用样式的图像引用如下所示：

    ！[替代文字] [id]

“ id”是已定义图片参考的名称。图像引用的定义与链接引用的语法相同：

[id]: url/zur/grafik  "Optionales title-Attribut"

目前，Markdown没有用于指定图形尺寸的语法。如果有必要，您可以简单地使用普通的HTML标记`<img>`。

* * *

<div id="misc"></div>

＃＃ 各种各样的
<a id="backslash"></a>

###反斜杠屏蔽
Markdown允许使用反斜杠屏蔽来写入字符，否则这些字符在Markdown的语法中具有特定的含义。
例如，如果要在单词周围加上星号（而不是HTML标记`<em>`），则可以在星号前面加上反斜杠：

    \ *包围星号\ *

Markdown为以下字符提供了这种可能性：

\反斜杠`反引号

    *星号

_下划线{}大括号[]方括号（）圆括号

＃哈希+加号
    -减号（连字符）

。观点 ！感叹号

* * *

<a id="lizenz"></a>

＃＃＃ 执照
这项工作是根据[知识共享署名-相同方式共享（BY-SA）4.0国际许可] [by-sa]许可的。

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

？>这是[John Grubers] [jg] [Markdown] [md]对[原始语法文档] [osd]的翻译。此翻译指的是2013年12月15日（Markdown版本1.0.1）的状态。不保证翻译的正确性。如果翻译中有错误，请发送短消息至<lasar@liepins.net>。
也欢迎任何其他反馈。

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax