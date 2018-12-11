const fs = require("fs");
const path = require("path");

/* input file processing */

if (process.argv.length === 2) {
    console.log("No argument provided");
    return;
} else if (process.argv.length < 2) {
    console.log("Other error occurred");
    return;
} else if (process.argv.length > 3) {
    console.log("Too many arguments provided");
    return;
}

/* it is index number 2 because argv[0]
holds the process.execPath and argv[1]
holds the path to this script. */
/* path need not be absolute. */
const inputPath = process.argv[2];

try {
    fs.accessSync(inputPath, fs.constants.F_OK);
} catch (error) {
    console.log(`File does not exists:  ${inputPath}`);
    return;
}

try {
    fs.accessSync(inputPath, fs.constants.R_OK);
} catch (error) {
    console.log(`File is not readable: ${inputPath}`);
    return;
}

let content = fs.readFileSync(inputPath, "utf8");

/* syntax processing */

// const basicSentence = /(?:^|\n| )(?:[^.!?]|[.!?][^ *_~\n])+[.!?]((?=$|\s)|[*_~]{1,2})/g; // old version of regex
const sentence = /(?:[^.?!]|[.?!][^.?!])+?[.?!](?:[*_]{1,2}|~~|)?(?:\s+|$)/g;

/* rule */
content = content.replace(
    sentence,
    match => {
        let innerMatches = match.match(/^((?:[*_]{1,2}|~~|#{1,6} )*)([A-Z])((?:.|\n)+)/);
        if (innerMatches != null && innerMatches.length >= 2) {
            const uppercaseFirstLetter = innerMatches[2];
            innerMatches[2] = uppercaseFirstLetter.toLocaleLowerCase();
            return innerMatches.slice(1).join("");
        }
        return match;
    }
);

/* rule */
const multipleConsecutiveNewlines = /\n{3,}/mg;
let j = 1;
content = content.replace(
    multipleConsecutiveNewlines,
    match => `\n<!-- ${++j} empty lines trimmed to 1 -->\n`
);

/* rule */
const maxReliableSentLengthInChars = 20;
/* the below regex works because comments cannot contain
newlines (it stops on newline). once they contain, this
regex is wrong. */
const comment = /<!--.*?-->/g;
content = content.replace(
    sentence,
    (match) => {
        const matchWithoutCommentsAndMarkdown = match
            .replace(/([*_]{1,2}|~~)((.|\n)*?)\1/g, "$2")
            .replace(comment, "");
        let result = "";
        if (matchWithoutCommentsAndMarkdown.length > maxReliableSentLengthInChars) {
            result = `${match}<!-- ${matchWithoutCommentsAndMarkdown.length} -->`;
        } else {
            result = `${match}`;
        }
        return result;
    }
);

/* output file processing */

let i = 1;
let err = undefined;
const inputDirname = path.dirname(inputPath);
const inputFilenameExtension = path.extname(inputPath);
const inputFilenameWithoutExtension = path.basename(inputPath, inputFilenameExtension);

/* check whether the output file already exists */
let outputPath = "";
do {
    try {
        ++i;
        outputPath = inputDirname + path.sep + inputFilenameWithoutExtension + i + inputFilenameExtension;
        fs.accessSync(
            outputPath,
            fs.constants.F_OK
        );
    } catch (error) {
        err = error;
    }
} while (err === undefined);

fs.writeFileSync(outputPath, content, "utf8");

console.log(`Created new file: ${outputPath}`);
console.log("Done");