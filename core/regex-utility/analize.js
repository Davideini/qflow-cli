const textTypes = require('./text-types');
const { Observable } = require('rxjs/Rx');

module.exports = {
  analize$: matches => {
    return Observable.of(
      matches
        .map(match => {
          if (textTypes.hasAsyncPipe.test(match.match)) return null; //console.log(match.match);
          if (textTypes.onlyNumber.test(match.match)) return null; //console.log(match.match);
          if (textTypes.hasCamelCase.test(match.match)) return null; // console.log(match.match);
          if (textTypes.mostazaSyntax.test(match.match)) return null; // console.log(match.match);
          if (textTypes.jsonObject.test(match.match)) return null; // console.log(match.match);
          if (textTypes.jsonArray.test(match.match)) return null; // console.log(match.match);
          if (textTypes.booleanExpration.test(match.match)) return null; //console.log(match.match);
          if (textTypes.angularFor.test(match.match)) return null; //console.log(match.match);
          if (textTypes.cababCase.test(match.match)) return null; //console.log(match.match);
          if (textTypes.dotSyntax.test(match.match)) return null; //console.log(match.match);
          if (textTypes.style.test(match.match)) return null; //console.log(match.match);
          if (textTypes.path.test(match.match)) return null; //console.log(match.match);
          if (textTypes.blank.test(match.match)) return null; //console.log(match.match);
          if (textTypes.noWords.test(match.match)) return null; //console.log(match.match);

          return match;
        })
        .filter(val => !!val)
    );
  }
};
