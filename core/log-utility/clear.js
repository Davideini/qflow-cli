const clear = () => process.stdout.write('\033c') || console.log('\033c');
const clear = () => console.log('\033c');

module.exports = clear;
