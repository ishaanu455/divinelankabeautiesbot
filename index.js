const { Telegraf } = require('telegraf');

// Replace 'YOUR_BOT_TOKEN' with your Telegram bot token
const bot = new Telegraf('7646684044:AAHD9Iy_N6TPQb_TEL17WN5eJYN1idWd_AQ');

// Respond to the /start command
bot.start((ctx) => ctx.reply('Hello! I am your bot.'));

// Respond to a message
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

// Start the bot
bot.launch();

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
