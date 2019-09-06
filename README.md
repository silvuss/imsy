# imsy – improve Markdown syntax and readability

**imsy** (pronounce like "imsee"; IMprove Markdown Syntax and readabilitY) is a utility that improves the [Markdown](https://en.wikipedia.org/wiki/Markdown) syntax and readability of a text in a given file, using a set of rules.

**Read before use:** This application **is not** intended to be used according to the purpose described above. You may use it **only** to test whether the code is written the way it is expected (i.e. it produces expected results) and **only** when you know what the code will really do. For details, see the section ["Disclaimers"](#disclaimers) below.

## Table of contents

1. [Copyright note](#copyright-note)
2. [Disclaimers](#disclaimers)
3. [How does this application work?](#how-does-this-application-work)
4. [Building](#building)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Notes](#notes)
8. [Environments, tools and technologies used](#environments-tools-and-technologies-used)
9. [Sources](#sources)
10. [Details](#details)

## Copyright note

Note that this project "imsy" (this repository) has currently **no license**, as explained in [this GitHub guide on licensing projects](https://choosealicense.com/no-permission/).

For your convenience, I am including below a quote from that site:

> When you make a creative work (which includes code), the work is under exclusive copyright by default. Unless you include a license that specifies otherwise, nobody else can use, copy, distribute, or modify your work without being at risk of take-downs, shake-downs, or litigation. Once the work has other contributors (each a copyright holder), “nobody” starts including you.

Also note that I can add a license in the future if it would be relevant to the needs of this project.

## Disclaimers

**The application that this project contains is an example application that is not intended to be run.** Its purpose is only to show code that is known to work. While probably nothing dangerous would happen, you may run it only under your own responsibility.

Although I have made efforts to make it work as intended and described, it is not a "professional" application. Specifically, it was not tested in terms of separate unit tests or similar. It was tested to work only on one platform. For details on the platform, see the section ["Environment, tools and technologies used"](#environment-tools-and-technologies-used) below.

## How does this application work?

Firstly, this application gets the content of the file specified on the input. Then, it checks whether the content is consistent with a set of rules. Then, it writes the content to the output file; if any piece of the content is not consistent with a rule, a tip for this rule is placed near this piece.

For the details of the process that this application performs, see the documentation page for the details of the process (inside the directory `/docs` of this project).

For details on the detected rules, see the documentation page for rules (inside the directory `/docs` of this project).

For additional notes on the text, see the documentation page for notes on the text (inside the directory `/docs` of this project).

## Building

This application neither can be build (compiled, etc.), nor require it.

## Installation

This application neither can be installed (onto any platform), nor require it. However, to run, it requires the following software to be installed:
- [Node.js runtime environment](https://en.wikipedia.org/wiki/Node.js)

## Usage

**_Note:_** _To run, this application requires specific software to be installed. For details, see the section "[Installation](#installation)" above._

The only interface to use this application is a CLI provided within this project.

This application is intended to be run using the Node.js runtime environment. One can run it by executing the following command from within its main directory:

```
node imsy.js FILE
```

where `FILE` is the path to a file containing the text to improve.

### Input

The input data of the application has to meet the following requirements (in this order):
1. it has to be the path to a file (i.e. it may not be empty); this file is assumed to contain the text to improve;
2. the file has to be readable by the user that runs the Node.js runtime environment;
3. the file has to be printable;
4. the file's content has to be encoded using the [UTF-8 encoding](https://en.Wikipedia.org/wiki/UTF-8).

If any of the first three requirements are not met, the application writes a message to stdout and exits. If only the 4. requirement is not met, the application will not exit, but **the results may be wrong or not**. It depends on the differences between the current encoding and the UTF-8 encoding.

### Output

As its output, this application creates one file in the same directory that file given on the input is in. This file will contain the improved version of the text.

The name of the output file is chosen as follows:

1. If the name of the file given on the input does not contain a dot directly followed by an extension, the name of the output file will consist of the name of the file given on the input, followed by a number. Examples:

    |The name of the file given on the input|Are there another files with the same name in this directory?|The name of the output file|
    |-|-|-|
    |`FILE`| (All files have different names.)|`FILE1`|
    |`FILE1`| (All files have different names.)|`FILE11`|
    |`FILE`|There exists `FILE1`|`FILE2`|
    |`FILE1`|There exists `FILE11`|`FILE12`|

2. If the name of the file given on the input contains a dot, and this dot is followed by an extension, the name of the output file will consist of the part of the name of the file given on the input before the extension, followed by a number, followed by a dot, followed by the extension. The extension is detected by checking if there is a dot in the name of the file. If there are multiple dots, the last one is used. No other checks are performed. Examples:

    |The name of the file given on the input|Are there another files with the same name in this directory?|The name of the output file|
    |-|-|-|
    |`FILE.md`| (All files have different names.)|`FILE1.md`|
    |`FILE1.md`| (All files have different names.)|`FILE11.md`|
    |`FILE.md`|There exists `FILE1.md`|`FILE2.md`|
    |`FILE1.md`|There exists `FILE11.md`|`FILE12.md`|

The number is chosen in the way that the name will not be equal to the name of any existing file in the directory of the file given on the input. The content of the output file is encoded using the UTF-8 encoding.

**Warning: possibility of overwriting files.** The file will be created only in case, in the directory with the input file, there is no file with the name determined according to the above rules, but only in the time of checking this directory. This means that it may happen that there exists already a file with the same name as the determined name. In such a case, **this file will be overwritten.** This is because the application does not append, but always creates a new file. That may be the case, for example, if files (or directories) in that directory were created/renamed very fast in the time that this application was running. One should always make sure that names of the files in the directory that the input file is in are unique, and are not being changed while this application is running.

**Note: dots and extensions.** If the part after the last dot of the name of the file given on the input is not intended to be the extension of this file, such a name will cause this application to produce a file with most probably unwanted name.

**Tip:** If any errors occur during running, it probably means that the platform that this application is running on does not support some functions of this application, or some functions are supported in a way that this application cannot handle. For details on which platform this application was tested (i.e. builds and/or runs successfully), see the section "[Environment, tools and technologies used](#environment-tools-and-technologies-used)" below.

## Notes

### Performance

Currently, this application reads the content of the input file for each rule from the start (that is, independently for each rule). This means that it will process the whole content of input file as many times as the number of rules that are defined. Since, the whole processing may be (very) slow for large files.

## Environments, tools and technologies used

### Environments and tools

- This application has been tested to work in the following environment:
    - **Processor's architecture:** `x86-64`
    - **Operating system:** Linux; distribution: Fedora Workstation 29; kernel's version: `4.19.6-300.fc29.x86_64`

### Technologies and tools

- Programming languages:
    - [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- Other tools:
    - To check the correctness of regular expressions, I have used the [regex101](https://regex101.com/) online tool.

## Sources

### Most helpful sources

Given in no particular order.

- **The website of Stack Overflow:**
    - https://stackoverflow.com/questions/20320719/constructing-regex-pattern-to-match-sentence/
    - https://stackoverflow.com/questions/53017709/how-to-detect-sentences-without-comments-and-markdown-using-javascript-regex

- **GitHub's documentation:**
    - https://help.GitHub.com/articles/basic-writing-and-formatting-syntax/

- **Node.js's documentation:**
    - https://nodejs.org/docs/latest-v9.x/api/

### Other useful sources

Given in no particular order.

- The [GitHub Flavored Markdown specification](https://GitHub.GitHub.com/gfm/) (at the time of writing this README, the version is 0.28-gfm (2017-08-01))
- [Wikipedia's article on ASCII encoding standard](https://en.Wikipedia.org/wiki/ASCII)
- The [ECMAScript standard, 9th edition (june 2018)](https://www.ecma-international.org/ecma-262/)
- The [node.js v9.11.2 runtime environment documentation](https://nodejs.org/docs/latest-v9.x/api/)

## Details

For other information about this website, see the documentation in the directory `/docs` of this project.