module.exports = {
  match: (regex, text) => {
    let matches;
    const results = [];
    while ((matches = regex.exec(text)) !== null) {
      if (matches.index === regex.lastIndex) regex.lastIndex++;

      const res = matches.filter(match => !!match).map(match => match.trim());

      if (!res.length) continue;

      results[results.length++] = res[res.length - 1];
    }

    return results
      .filter(match => !!match)
      .map(match => ({ text: match, tag: null }));
  }
};
