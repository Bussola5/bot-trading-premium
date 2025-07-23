require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply('Benvenuto nel bot OPVS™ PREMIUM!'));

bot.launch();
console.log('Bot avviato');
