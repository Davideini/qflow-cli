const tryRequire = require('try-require');
const glob = require('glob');
const path = require('path');
const { Observable } = require('rxjs/Rx');

const { findInFile$, createCsv$, csvToJson$ } = require('./core/fs-utility');
const { mkdir } = require('./core/shell-utility');
const {
  combine,
  inHtml: { betweenTags, insideQuotes },
  analize$,
  matchesToMatrix
} = require('./core/regex-utility');

const _ = require('lodash');
const { exclude } = tryRequire(path.join(process.cwd(), 'resource.json'));

const resourcesPath = path.join(process.cwd(), './resources');

mkdir(resourcesPath);

glob(path.join(process.cwd(), './src/**/*.html'), (err, files) => {
  Observable.concat(
    ...files
      .filter(file => exclude.files.indexOf(file) < 0)
      .map(file => findInFile$(file, combine(betweenTags, insideQuotes)))
  )
    .toArray()
    .map(results => results.reduce((a, b) => [...a, ...b]))
    .map(results =>
      _(results)
        .groupBy('match')
        .values()
        .map(resultValues => ({
          match: resultValues[0].match,
          filePaths: _.uniq(resultValues.map(result => result.filePath))
        }))
        .value()
    )
    .switchMap(results => analize$(results))
    .map(results =>
      results.filter(result => exclude.words.indexOf(result.match) < 0)
    )
    .do(results => results.forEach(result => console.log(result.filePaths)))
    .map(matchesToMatrix)
    .switchMap(matrix =>
      createCsv$(
        path.join(resourcesPath, `test-${Math.floor(Date.now() / 1000)}.csv`),
        matrix
      )
    )
    .switchMap(() =>
      csvToJson$(
        path.join(resourcesPath, `test-${Math.floor(Date.now() / 1000)}.csv`)
      )
    )
    .subscribe();
});
