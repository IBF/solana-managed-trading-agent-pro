const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Minimal bot started on Vercel");

bot.on("message", (ctx) => {
  console.log("Message received:", ctx.message.text);
  ctx.reply("✅ Bot is alive! Received: " + ctx.message.text);
});

bot.start();

console.log("✅ Bot is listening...");