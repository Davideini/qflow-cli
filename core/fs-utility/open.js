const { readFile } = require('fs');
const { Observable } = require('rxjs/Rx');

module.exports = {
  open$: filePath =>
    Observable.create(observer => {
      readFile(filePath, 'utf8', (err, data) => {
        err && observer.error(err);
        observer.next(data);
        observer.complete();
      });
    })
};
