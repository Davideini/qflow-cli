const { writeFile } = require('fs');
const { Observable } = require('rxjs/Rx');

module.exports = {
  save$: (filePath, text) =>
    Observable.create(observer => {
      writeFile(filePath, text, 'utf8', err => {
        err && observer.error(err);
        observer.next(filePath);
        observer.complete();
      });
    })
};
