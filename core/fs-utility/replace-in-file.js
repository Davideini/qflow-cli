const { Observable } = require('rxjs/Rx');
const { open$ } = require('./open');
const { save$ } = require('./save');

module.exports = {
  replaceInFile$: (filePath, find, replace) =>
    Observable.of(find)
      .map(find => (find instanceof Array ? find : null))
      .map(arr => arr || [{ from: find, to: replace }])
      .exhaustMap(arr =>
        open$(filePath).map(text => {
          arr.forEach(obj => (text = text.replace(obj.from, obj.to)));
          return text;
        })
      )
      .switchMap(text => save$(filePath, text))
};
