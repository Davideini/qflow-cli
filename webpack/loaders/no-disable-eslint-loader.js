const path = require("path");
const extract = require("extract-comments");
const chalk = require("chalk");

module.exports = function l(source) {
  const comments = extract(source);
  const eslintCommentRegex = /eslint-disable.*/;
  const eslintValidCommentRegex = /eslint-disable.*(REASON|TODO)\s\[[A-Z]{2}\]: [\w\d\-_$]+/;

  for (const comment of comments || []) {
    if (
      eslintCommentRegex.test(comment.value) &&
      !eslintValidCommentRegex.test(comment.value)
    ) {
      const filename = chalk.red(
        path.resolve(process.cwd(), this.resourcePath)
      );
      const linenumber = chalk.red.dim(
        `${comment.loc.start.line}:${comment.loc.start.column} error`
      );
      const message = chalk.reset("eslint disabled without justification");
      const error = `${filename}\r\n ${linenumber} ${message}\r\n`;

      this.emitError(new Error(error));
    }
  }

  return source;
};
