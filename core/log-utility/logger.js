const {
  yellow
} = require('chalk');

const log = console.log;

const dash =
  '-----------------------------------------------------------------';

const newLine = (show = null) => ({
  show
});
const onlyMessage = message => log(yellow('[>]:\t'), message);

const logger = (subject, message, type) => {
  if (!!subject.message) {
    message = subject.message;
    subject = subject.subject;
  }

  !subject && message && onlyMessage(message);
  subject && message && log(yellow(`[${subject}]:\t`), `${message}`);
  !message && newLine();
};

module.exports = {
  log: logger,
  dash,
  newLine,
  onlyMessage
};
