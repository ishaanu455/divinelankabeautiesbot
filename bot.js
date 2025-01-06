const { Telegraf } = require('telegraf');
const schedule = require('node-schedule');

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from BotFather
const bot = new Telegraf('7831597594:AAEQOWalXa_yZSoSK6p6i2DA63bqYNC6TKk');

// Welcome message with 3 buttons (YouTube, Channel, Group) and a picture
bot.start((ctx) => {
  return ctx.replyWithPhoto(
    { url: 'https://i.postimg.cc/7P58xNfh/bot-pic.png' }, // Use the URL directly for hosted images
    {
      caption: '🎉 Welcome to Divine Lankan Beauties Bot! Here are some useful links:',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📺 Open YouTube Channel',
              web_app: {
                url: 'https://romantichub.github.io/DivineLankaBeautiesBot/' // Replace with your hosted HTML page link
              }
            }
          ],
          [
            {
              text: '📢 Visit My Channel',
              url: 'https://t.me/DivineLankan_Beauties' // Telegram channel link
            },
            {
              text: '💬 Join My Group',
              url: 'https://t.me/DivineLankan_BeautiesChat' // Telegram group link
            }
          ]
        ]
      }
    }
  );
});

// Function to send scheduled messages with retry mechanism
async function sendScheduledMessage(chatId) {
  try {
    await bot.telegram.sendPhoto(
      chatId,
      { url: 'https://i.postimg.cc/7P58xNfh/bot-pic.png' },
      {
        caption: '⏰ It\'s time for a reminder! Check out our latest updates!',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Visit Our Channel',
                url: 'https://t.me/DivineLankan_Beauties' // Telegram channel link
              }
            ]
          ]
        }
      }
    );
    console.log('Message sent successfully!');
  } catch (err) {
    if (err.code === 'ECONNRESET') {
      console.error('Connection reset. Retrying in 5 seconds...');
      setTimeout(() => sendScheduledMessage(chatId), 5000); // Retry after 5 seconds
    } else {
      console.error('Error sending scheduled message:', err);
    }
  }
}

// Schedule an automatic message to be sent every 2 seconds
schedule.scheduleJob('*/5 * * * * *', () => {
  const chatId = '@test000075'; // Replace with the actual chat ID
  sendScheduledMessage(chatId);
});

// Launch the bot
bot.launch();

// Graceful shutdown on termination signals
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
