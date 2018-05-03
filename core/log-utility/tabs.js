const tabs = strings => {
  let maxLength = 0;

  strings.forEach(str => (maxLength = Math.max(maxLength, str.length)));

  return Math.floor(maxLength / 8);
};

const tabsText = (maxNum, str) => {
  const num = maxNum - Math.floor(str.length / 8);

  let tabsText = '';

  for (let i = 0; i < num; i++) {
    tabsText += '\t';
  }

  return tabsText;
};

module.exports = { tabs, tabsText };
