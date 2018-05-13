// const clear = () => process.stdout.write('\033c') || console.log('\033c');
const clear = () => process.stdout.write('\x1B[2J\x1B[0f');

module.exports = clear;
