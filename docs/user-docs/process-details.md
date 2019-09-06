## Process details

This application works in the following way:

1. After it is run, it gets its argument and checks whether it is a path to a readable file.

2. If it is, it copies the content text.

3. Then, it parses this copy, checking whether its syntax and readability is consistent with a set of rules.

4. If it comes across an inconsistent place, it corrects it or puts a suggestion on how to correct it (writing the changes to the copy). See also below for what rules are currently defined. Where JavaScript makes it possible, the script takes into account the host environment's current [locale](https://en.Wikipedia.org/wiki/Locale_(computer_software)) – for example, when changing uppercase letters to lowercase letters. for details, examine the [source code of this application](https://github.com/silvuss/silvuss-imsy).

5. If there are no further inconsistent places, it writes the copy to a new file in the input FILE's directory and exits.