module.exports = {
  hasAsyncPipe: /\|\s*async/,
  onlyNumber: /^[0-9]+$/,
  hasCamelCase: /[a-z][A-Z]/,
  cababCase: /^[a-z]+(-[a-z]+)+$/,
  dotSyntax: /^[a-zA-Z]+(\.[a-zA-Z]+)+$/,
  jsonObject: /\{[^}]*\}/,
  jsonArray: /\[[^\]]*\]/,
  mostazaSyntax: /\{\{/,
  angularFor: /let .* of/,
  booleanExpration: /===|\|\||&&|!!/,
  style: /^[a-z].*:.*;?$/,
  path: /\.\.\//,
  blank: /^_.*$/,
  noWords: /^[^a-zA-Z0-9]+$/
};
