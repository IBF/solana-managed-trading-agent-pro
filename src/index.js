const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

console.log("Starting minimal bot...");

const token = process.env.MANAGER_BOT_TOKEN;
console.log("Token length:", token ? token.length : "MISSING");

if (!token) {
  console.error("ERROR: MANAGER_BOT_TOKEN is empty or not found!");
  process.exit(1);
}

const bot = new Bot(token);

bot.on("message", (ctx) => {
  console.log("Message received:", ctx.message.text);
  ctx.reply("✅ Bot is alive! Received: " + ctx.message.text);
});

bot.start();

console.log("✅ Minimal bot is running on Vercel");