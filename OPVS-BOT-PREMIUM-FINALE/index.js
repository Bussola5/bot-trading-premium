// 📁 index.js
require('dotenv').config();
const { Telegraf } = require('telegraf');
const Stripe = require('stripe');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Variabili da database o config
const premiumUsers = new Set(); // Da sostituire con DB in produzione

// 📌 Filtro affidabilità
function isSignalValid(signal) {
  return signal.confidence >= 80;
}

// 📤 Invio segnale
function sendSignalToPremium(signal) {
  if (!isSignalValid(signal)) return;

  const message = `
📈 *Segnale di Trading Premium*

🕒 Orario: ${signal.time}
📊 Strumento: ${signal.instrument}
📌 Operazione: *${signal.type.toUpperCase()}*
🎯 Entry: ${signal.entry}
⛔ Stop Loss: ${signal.sl}
✅ Take Profit: ${signal.tp}

📚 Descrizione: ${signal.description}
📶 Affidabilità: *${signal.confidence}%*
  `;

  premiumUsers.forEach((userId) => {
    bot.telegram.sendMessage(userId, message, { parse_mode: 'Markdown' });
  });
}

// 🔘 Comandi base
bot.start((ctx) => ctx.reply('Benvenuto nel bot di Trading Premium. Usa /setup per abbonarti.'));

bot.command('setup', async (ctx) => {
  // Qui puoi integrare Stripe checkout
  ctx.reply('Per abbonarti clicca qui: https://your-stripe-checkout-link.com');
});

bot.command('stop', (ctx) => {
  premiumUsers.delete(ctx.from.id);
  ctx.reply('Notifiche trading *disattivate*.', { parse_mode: 'Markdown' });
});

bot.command('resume', (ctx) => {
  premiumUsers.add(ctx.from.id);
  ctx.reply('Notifiche trading *attivate*.', { parse_mode: 'Markdown' });
});

bot.launch();

console.log('🤖 Bot avviato.');

// 🌐 Keep alive per Railway (solo se serve)
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot attivo'));
app.listen(process.env.PORT || 3000);

// 📩 Esempio ricezione segnale esterno
// sendSignalToPremium({
//   time: '15:30',
//   instrument: 'EUR/USD',
//   type: 'long',
//   entry: '1.0850',
//   sl: '1.0830',
//   tp: '1.0890',
//   description: 'Breakout su resistenza chiave',
//   confidence: 83
// });
