# imsy – improve markdown syntax and readability

imsy is a utility that improves the markdown syntax and readability of a text in a given file, using a set of rules.

## copyright note

note that this "imsy" (this project) has **currently no license**, as explained here: https://choosealicense.com/no-permission/.

for your convenience i am including below a quote from that site:
> When you make a creative work (which includes code), the work is under exclusive copyright by default. Unless you include a license that specifies otherwise, nobody else can use, copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. Once the work has other contributors (each a copyright holder), “nobody” starts including you.

also note that i can **add a lincese** in the near future if it would be relevant to the needs of this project.

## how to run this utility?

this utility is intended to be run in node.js. the only correct way of running it is the following:
```
node imsy.js FILE
```
`FILE` is a readable file containing text to improve. as a result, it produces one file in the same directory as FILE is in, containing the improved version of the text.

## syntax details

### input

1. this utility accepts one argument: the path to a FILE. if there is no argument, it writes a message to stdout (stdout is default) and exits.

2. if FILE does not exist or the given path is incorrect, this utility writes a message to stdout (stdout is default) and exits.

3. FILE has to be readable by the user that runs node.js. if it is not, the utility writes a message to stdout (stdout is default) and exits.

4. FILE is presumed to have its content written using [UTF-8 encoding](https://en.wikipedia.org/wiki/UTF-8). if it has content written in different encoding, **the results may be wrong or not**. it depends on the differences between the current encoding and the UTF-8 encoding.

### output

this utility creates one file in the directory that input FILE is in. the name of the output file is chosen as follows:

1. if the name of input FILE does not contain dot directly followed by an extension, the name of the output file will consist of the name of input FILE, followed by a number. examples:

    |input FILE's name|another files names|output file's name|
    |-|-|-|
    |`FILE`| (all files have different names)|`FILE1`|
    |`FILE1`| (all files have different names)|`FILE11`|
    |`FILE`|there exists FILE1|`FILE2`|
    |`FILE1`|there exists FILE11|`FILE12`|

2. if the name of input FILE contains dot followed by an extension, the name of the output file will consist of the part of the input FILE's name before the extension, followed by a number, followed by dot, followed by the extension. examples:

    |input FILE's name|another files names|output file's name|
    |-|-|-|
    |`FILE.md`| (all files have different names)|`FILE1.md`|
    |`FILE1.md`| (all files have different names)|`FILE11.md`|
    |`FILE.md`|there exists `FILE1.md`|`FILE2.md`|
    |`FILE1.md`|there exists `FILE11.md`|`FILE12.md`|

the number is chosen in the way that the name will not be equal to the name of any existing file the input FILE's directory. the output file's content is written using UTF-8 encoding.

#### warning of overwritten files

the output file name will be unique in the input FILE's directory only in the time of checking this directory. if files (or directories) in that directory were created or renamed very fast with this utility being run, the name may not be unique. and since this utility does not append, but always create a new file, **some file or directory in that directory may be overwritten**. one should always pay attention whether names of the files in the input FILE's directory do not change while this utility is running.

#### info about dots and extensions

currently, an extension in a file's name is detected by checking if there is dot in the name. if there is multiple dots, the last one is used. no other checks are performed. therefore, if a file's name contains one or multiple dots, but the part after the last dot is not intended to be an extension, such a name will cause this utility to produce a file with most probably unwanted name. for details, examine the [source code of this utility](TODO).

## process details

1. this utility works in the following way: after it is run, it gets its argument and checks whether it is a path to a readable file.

2. if it is, it copies the content text.

3. then, it parses this copy, checking whether its syntax and readability is consistent with a set of rules.

4. if it comes across an inconsistent place, it corrects it or puts a suggestion on how to correct it (writing the changes to the copy). see also below for what rules are currently defined.

    where javascript makes it possible, the script takes into account the host environment's current [locale](https://en.wikipedia.org/wiki/Locale_(computer_software)) – for example, when changing uppercase letters to lowercase letters. for details, examine the [source code of this utility](TODO).

5. if there are no further inconsistent places, it writes the copy to a new file in the input FILE's directory and exits.

## rules

there are three types of rules defined in the script:

1. the first type (the strict rule type) just replaces one defined sequence of characters with another one (without any comments).

2. the second type (the strict comment-rule type) replaces one defined sequence of characters with another one, putting a comment what it has done as an HTML-like comment (`<!-- -->`) before, inside or after the changed place.

3. the third type (the suggest-rule type) does not correct anything, but puts a proposition of change as an HTML comment after the place supposed to be changed.

a rule consists of a condition and an action that the condition determines. below is the list of all the rules:

|no.|rule type|condition|action|
|-|-|-|-|
|1|strict rule|there is an uppercase letter at the beginning of a sentence.|replace this letter with a corresponding lowercase letter, according to the environment's locale.|
|2|strict comment-rule|there are more than 2 consecutive empty lines.|replace all of these empty lines with one line containing comment about how much empty lines was removed.|
|3|suggest-rule|a sentence contains more than 205 characters.|put a comment after the sentence about how many characters this sentence contains.|

## notes about text

### markdown

there is currently detected a set of markdown rules that is a subset of [github flavored markdown](https://github.github.com/gfm/). this implies that there are also detected these markdown implementations, for which this set is a superset. any markdown implementations not being a subset of this set are not detected.

the currently detected set of markdown rules consist of:

- **strong emphasis** – that is, text is placed between `**` and `**` (two asterisks) or `__` and `__` (two underscores)
- **emphasis** – that is, text is placed between "`*`" and "`*`" (one asterisk) or "`_`" and "`_`" (one underscore)
- **strikethrough** – that is, text is placed between "`~~`" and "`~~`" (two tildes)
- **a heading** – that is, text is placed after "`#`", "`##`", "`###`", "`####`", "`#####`" or "`######`" (from one to six hashtags)

for details on these rules, see the aforementioned [github flavored markdown specification](https://github.github.com/gfm/).

### letter case

currently, lowercase and uppercase letters are not detected in any way except where expressed explicitly in the rules.

### newlines

currently, if the text contains sentences with a line feed character (`\n`; usually ASCII 10 in linux; also called "newlines"), sentences should be detected correctly.

## note on performance

currently, this utility reads the input file's content for each rule from the start (that is, independently). this means that it will process the whole content of input file as many times as the number of rules that are defined. since that, the whole processing may be (very) slow for large files.

## tools and technologies used

1. currently, this utility is written 100% in javascript.
2. to check regular expression correctness, i have used the [regex101](https://regex101.com/) online tool.

## sources that i was using

the following sources was useful for me when writing this article. maybe they could be useful for someone else:
- https://stackoverflow.com/a/20320820/4752834
- https://stackoverflow.com/a/53017753/4752834
- https://help.github.com/articles/basic-writing-and-formatting-syntax/
- https://nodejs.org/docs/latest-v9.x/api/

## online materials

one may see the following online materials for any further details, or in case of any doubts:
- the [github flavored markdown specification](https://github.github.com/gfm/) (at the time of writing this README, the version is 0.28-gfm (2017-08-01))
- [wikipedia's article on ASCII encoding standard](https://en.wikipedia.org/wiki/ASCII)
- the [ecmascript standard, 9th edition (june 2018)](https://www.ecma-international.org/ecma-262/)
- the [node.js v9.11.2 runtime environment documentation](https://nodejs.org/docs/latest-v9.x/api/)
