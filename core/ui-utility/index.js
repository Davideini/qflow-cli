const {
  logger: { log, dash, newLine },
  clear
} = require('../log-utility');

const messagesFrame = messages => {
  clear();

  newLine();

  log('>', dash);

  messages.forEach(msg => log(msg));

  log('>', dash);
};

const messagesContainer = messages => {
  const msgs = messages
    .filter(msg => !!msg)
    .map(msg => ({
      ...msg,
      show: msg.show || msg.show === undefined
    }))
    .filter(msg => msg.show);

  messagesFrame(msgs);
};

module.exports = {
  messagesFrame,
  messagesContainer
};
