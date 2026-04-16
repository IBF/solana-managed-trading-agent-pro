const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("Simple test bot started");

bot.on("message", (ctx) => {
  console.log("Received message:", ctx.message.text);
  ctx.reply("Received: " + ctx.message.text);
});

bot.start();

console.log("Waiting for messages...");