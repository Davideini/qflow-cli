let answersMain = {};

const saveAnswers = answers => (answersMain = { ...answersMain, ...answers });
const gatAnswers = () => answersMain;

module.exports = { saveAnswers, gatAnswers };
