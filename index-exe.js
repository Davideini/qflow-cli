const shell = require('shelljs');
const path = require('path');

shell.exec(path.join(__dirname, './bin/qflow-exe.exe'));
