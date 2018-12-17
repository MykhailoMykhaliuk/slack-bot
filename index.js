const SlackBot = require('slackbots');

const bot = new SlackBot({
  token: 'xoxb-505274059700-505275382948-6g43PhEITV5C5JsbD8sxaQMj',
  name: 'testbot'
});

bot.on('start', () => {
  bot.postMessageToChannel(
    'general',
    'Get Ready To Book Env With @testbot!'
  );
});

bot.on('error', console.log);

bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

function handleMessage(message) {
  if (startsWith(message, 'book')) {
    bookEnv();
  } else if (startsWith(message, 'release')) {
    releaseEnv();
  } else if (startsWith(message, 'help')) {
    runHelp();
  }
}

function bookEnv() {
  // Use Jenkins API to manage env
  Promise.resolve('Environment booked')
    .then(data => bot.postMessageToChannel('general', data));
}

function releaseEnv() {
  // Use Jenkins API to manage env
  Promise.resolve('Environment released')
    .then(data => bot.postMessageToChannel('general', data));
}

function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'general',
    `Type @testbot with either 'book' or 'release' to manage environments`,
    params
  );
}

function startsWith(string, substring) {
  const userMessage = string.split('> ')[1];
  return userMessage && userMessage.startsWith(substring);
}