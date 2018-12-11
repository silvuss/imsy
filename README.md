# imsy – improve Markdown syntax and readability

imsy (IMprove Markdown Syntax and readabilitY) is a utility that improves the Markdown syntax and readability of a text in a given file, using a set of rules.

**Read before use:** This application **is not** intended to be used according to the purpose described above. You may use it **only** to test whether the code is written the way it is expected (i.e. it produces expected results) and **only** when you know what the code will really do. For details, see the section ["Disclaimers"](#disclaimers) of this readme.

## Table of contents

1. [Copyright note](#copyright-note)
2. [Disclaimers](#disclaimers)
3. [How does this utility work?](#how-does-this-utility-work)
4. [How to run this utility?](#how-to-run-this-utility)
5. [Input and output](#input-and-output)
6. [Process details](#process-details)
7. [Rules](#rules)
8. [Notes on input content](#notes-on-input-content)
9. [Note on performance](#note-on-performance)
10. [Tools and technologies used](#tools-and-technologies-used)
11. [Sources that I was using](#sources-that-i-was-using)
12. [Online materials](#online-materials)
13. [I have experienced a bug / a problem, or I have an idea of improvement – what can I do?](#i-have-experienced-a-bug-/-a-problem-or-i-have-an-idea-of-improvement-–-what-can-i-do)
14. [Will this project be updated?](#will-this-project-be-updated)

## copyright note

Note that this "silvuss-thoughts" project (this repository) has currently **no license**, as explained in [this GitHub guide on licensing projects](https://choosealicense.com/no-permission/).

For your convenience, I am including below a quote from that site:

> When you make a creative work (which includes code), the work is under exclusive copyright by default. Unless you include a license that specifies otherwise, nobody else can use, copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. Once the work has other contributors (each a copyright holder), “nobody” starts including you.

Also note that I can add a lincese in the future if it would be relevant to the needs of this project.

## Disclaimers

**This application is an example application that is intended to show my skills in programming in the JavaScript language and in the Node.js runtime environment.** Its purpose is only to show code that is know to work. While probably nothing dangerous would happen, you may run it only under your own responsibility.

Although I have made efforts to make it work as intended and described, it is not a "proffesional" application. Specifically, it was not tested in terms of separate unit tests or similar. It was tested to work only on one platform. Specifically, it deals with memory, and that never may be safe at all. For details on the platform, see the section ["Tools and technologies used"](#tools-and-technologies-used) of this readme.

## How does this utility work?

Firstly, this utility gets the content of the specified file. Then, it checks whether the content is consistent with a set of rule, and writes it to the output file with tips placed near each found inconsistent place.

## How to run this utility?

This utility is intended to be run in the Node.js runtime environment. One of the simplest way of running it is the following:
```
node imsy.js FILE
```

where `FILE` is a readable file containing text to improve. As a result, it produces one file in the same directory as FILE is in, containing the improved version of the text.

## Input and output

### Input

1. This utility accepts one argument: the path to a FILE. If there is no argument, it writes a message to stdout (stdout is default) and exits.

2. If FILE does not exist or the given path is incorrect, this utility writes a message to stdout (stdout is default) and exits.

3. FILE has to be readable by the user that runs node.js. If it is not, the utility writes a message to stdout (stdout is default) and exits.

4. FILE is presumed to have its content written using [UTF-8 encoding](https://en.Wikipedia.org/wiki/UTF-8). If it has content written in different encoding, **the results may be wrong or not**. It depends on the differences between the current encoding and the UTF-8 encoding.

### Output

This utility creates one file in the directory that input FILE is in. The name of the output file is chosen as follows:

1. If the name of input FILE does not contain dot directly followed by an extension, the name of the output file will consist of the name of input FILE, followed by a number. Examples:

    |input FILE's name|another files names|output file's name|
    |-|-|-|
    |`FILE`| (all files have different names)|`FILE1`|
    |`FILE1`| (all files have different names)|`FILE11`|
    |`FILE`|there exists FILE1|`FILE2`|
    |`FILE1`|there exists FILE11|`FILE12`|

2. If the name of input FILE contains dot followed by an extension, the name of the output file will consist of the part of the input FILE's name before the extension, followed by a number, followed by dot, followed by the extension. Examples:

    |input FILE's name|another files names|output file's name|
    |-|-|-|
    |`FILE.md`| (all files have different names)|`FILE1.md`|
    |`FILE1.md`| (all files have different names)|`FILE11.md`|
    |`FILE.md`|there exists `FILE1.md`|`FILE2.md`|
    |`FILE1.md`|there exists `FILE11.md`|`FILE12.md`|

The number is chosen in the way that the name will not be equal to the name of any existing file the input FILE's directory. The output file's content is written using UTF-8 encoding.

#### Warning of overwritten files

The output file name will be unique in the input FILE's directory only in the time of checking this directory. If files (or directories) in that directory were created or renamed very fast with this utility being run, the name may not be unique. And since this utility does not append, but always create a new file, **some file or directory in that directory may be overwritten**. One should always pay attention whether names of the files in the input FILE's directory do not change while this utility is running.

#### Info about dots and extensions

Currently, an extension in a file's name is detected by checking if there is dot in the name. If there is multiple dots, the last one is used. no other checks are performed. Therefore, if a file's name contains one or multiple dots, but the part after the last dot is not intended to be an extension, such a name will cause this utility to produce a file with most probably unwanted name. For details, examine the [source code of this utility](https://github.com/silvuss/silvuss-imsy).

## Process details

This utility works in the following way:

1. After it is run, it gets its argument and checks whether it is a path to a readable file.

2. If it is, it copies the content text.

3. Then, it parses this copy, checking whether its syntax and readability is consistent with a set of rules.

4. If it comes across an inconsistent place, it corrects it or puts a suggestion on how to correct it (writing the changes to the copy). See also below for what rules are currently defined. Where Javascript makes it possible, the script takes into account the host environment's current [locale](https://en.Wikipedia.org/wiki/Locale_(computer_software)) – for example, when changing uppercase letters to lowercase letters. for details, examine the [source code of this utility](https://github.com/silvuss/silvuss-imsy).

5. If there are no further inconsistent places, it writes the copy to a new file in the input FILE's directory and exits.

## Rules

There are three types of rules defined in the script:

1. The first type (the strict rule type) just replaces one defined sequence of characters with another one (without any comments).

2. The second type (the strict comment-rule type) replaces one defined sequence of characters with another one, putting a comment what it has done as an HTML-like comment (`<!-- -->`) before, inside or after the changed place.

3. The third type (the suggest-rule type) does not correct anything, but puts a proposition of change as an HTML comment after the place supposed to be changed.

A rule consists of a condition and an action that the condition determines. All the rules are listed in the following table:

|No.|Rule type|Condition|Action|
|-|-|-|-|
|1|Strict rule|There is an uppercase letter at the beginning of a sentence.|Replace this letter with a corresponding lowercase letter, according to the environment's locale.|
|2|Strict comment-rule|There are more than 2 consecutive empty lines.|Replace all of these empty lines with one line containing comment about how much empty lines was removed.|
|3|Suggest-rule|A sentence contains more than 205 characters.|Put a comment after the sentence about how many characters this sentence contains.|

## Notes on input content

### Markdown

There is currently detected a set of Markdown rules that is a subset of [GitHub Flavored Markdown](https://GitHub.GitHub.com/gfm/). This implies that there are also detected these Markdown implementations, for which this set is a superset. Any Markdown implementations not being a subset of this set are not detected.

The currently detected set of Markdown rules consist of:

- **strong emphasis** – that is, text is placed between `**` and `**` (two asterisks) or `__` and `__` (two underscores)
- **emphasis** – that is, text is placed between "`*`" and "`*`" (one asterisk) or "`_`" and "`_`" (one underscore)
- **strikethrough** – that is, text is placed between "`~~`" and "`~~`" (two tildes)
- **a heading** – that is, text is placed after "`#`", "`##`", "`###`", "`####`", "`#####`" or "`######`" (from one to six hashtags)

For details on these rules, see the aforementioned [GitHub Flavored Markdown specification](https://GitHub.GitHub.com/gfm/).

### Letter case

Currently, lowercase and uppercase letters are not detected in any way except where expressed explicitly in the rules.

### Newlines

Currently, if the text contains sentences with a line feed character (`\n`; usually ASCII 10 in linux; also called "newlines"), sentences should be detected correctly.

## Note on performance

Currently, this utility reads the input file's content for each rule from the start (that is, independently). This means that it will process the whole content of input file as many times as the number of rules that are defined. Since that, the whole processing may be (very) slow for large files.

## Tools and technologies used

1. This utility is written 100% in JavaScript.
2. To check regular expression correctness, I have used the [regex101](https://regex101.com/) online tool.

## Sources that I was using

The following sources was useful for me when writing this readme. maybe they could be useful for someone else:
- https://stackoverflow.com/a/20320820/4752834
- https://stackoverflow.com/a/53017753/4752834
- https://help.GitHub.com/articles/basic-writing-and-formatting-syntax/
- https://nodejs.org/docs/latest-v9.x/api/

## Online materials

One may see the following online materials for any further details, or in case of any doubts:
- the [GitHub Flavored Markdown specification](https://GitHub.GitHub.com/gfm/) (at the time of writing this README, the version is 0.28-gfm (2017-08-01))
- [Wikipedia's article on ASCII encoding standard](https://en.Wikipedia.org/wiki/ASCII)
- the [ECMAScript standard, 9th edition (june 2018)](https://www.ecma-international.org/ecma-262/)
- the [node.js v9.11.2 runtime environment documentation](https://nodejs.org/docs/latest-v9.x/api/)

## I have experienced a bug / a problem, or I have an idea of improvement – what can I do?

In case you have experienced any bug, any problem or just have an idea how to improve this utility, you may report it within this project using GitHub Issues.

## Will this project be updated?

If you find any bug or have an idea, it may be incorporated to let the project live. But, generally, this project is going to show what I have learned in Java by the time that it was publishe – so, it is not supposed to be updated greatly.