## Rules

A rule consists of a condition and an action that the condition determines. All the rules are listed in the following table:

|No.|Rule type|Condition|Action|
|-|-|-|-|
|1|Strict rule|There is an uppercase letter at the beginning of a sentence.|Replace this letter with a corresponding lowercase letter, according to the environment's locale.|
|2|Strict comment-rule|There are more than 2 consecutive empty lines.|Replace all of these empty lines with one line containing comment about how much empty lines was removed.|
|3|Suggest-rule|A sentence contains more than 205 characters.|Put a comment after the sentence about how many characters this sentence contains.|

### Types of rules

There are three types of rules defined in the script:
1. The first type (the strict rule type) just replaces one defined sequence of characters with another one (without any comments).
2. The second type (the strict comment-rule type) replaces one defined sequence of characters with another one, putting a comment what it has done as an HTML-like comment (`<!-- -->`) before, inside or after the changed place.
3. The third type (the suggest-rule type) does not correct anything, but puts a proposition of change as an HTML comment after the place supposed to be changed.