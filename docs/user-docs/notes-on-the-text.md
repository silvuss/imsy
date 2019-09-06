## Notes on the text

### Markdown

There is currently detected a set of Markdown rules that is a subset of [GitHub Flavored Markdown](https://GitHub.GitHub.com/gfm/). This implies that there are also detected these Markdown implementations, for which this set is a superset. Any Markdown implementations not being a subset of this set are not detected.

**Tip:** Markdown rules should not be confused with rules that are defined directly by the application (= the application's rules). The application's rules are described on different documentation page.

The set of detected Markdown rules consists of:

- **strong emphasis** – that is, text is placed between `**` and `**` (two asterisks) or `__` and `__` (two underscores);
- **emphasis** – that is, text is placed between "`*`" and "`*`" (one asterisk) or "`_`" and "`_`" (one underscore);
- **strikethrough** – that is, text is placed between "`~~`" and "`~~`" (two tildes);
- **a heading** – that is, text is placed after "`#`", "`##`", "`###`", "`####`", "`#####`" or "`######`" (from one to six hashtags).

For details on these Markdown rules, see the [GitHub Flavored Markdown specification](https://GitHub.GitHub.com/gfm/).

### Letter case

Currently, lowercase and uppercase letters are not detected in any way except where expressed explicitly in the rules.

### Newlines

If the text contains sentences with a line feed character (`\n`; usually ASCII 10 in linux; also called "newlines"), sentences should be detected correctly.