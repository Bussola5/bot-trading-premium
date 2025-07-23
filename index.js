// index.js
require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.start((ctx) => ctx.reply('Benvenuto nel bot OPVS™!'));
bot.help((ctx) => ctx.reply('Scrivi /pagamenti per accedere ai piani premium.'));

bot.command('pagamenti', (ctx) => {
  ctx.reply('Per abbonarti clicca su questo link: https://tuo-sito.com/pagamento');
});

bot.command('stop', (ctx) => {
  ctx.reply('✅ Hai messo in pausa le notifiche.');
  // Logica per disattivare notifiche
});

bot.command('resume', (ctx) => {
  ctx.reply('🔔 Notifiche riattivate.');
  // Logica per riattivarle
});

bot.launch();
console.log('🤖 Bot Telegram avviato.');
