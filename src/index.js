const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Regular Solana Trading Bot started");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";
  console.log("Received message:", text);

  if (text === "/start") {
    await ctx.reply("✅ Welcome to Solana Trading Bot!\n\n" +
      "Just paste any Solana token CA to buy/snipe (default 0.5 SOL).\n" +
      "Type /help for commands.");
  } else if (text.length > 30) {
    await ctx.reply("🔍 Received token: " + text.slice(0, 20) + "...\nProcessing buy with 0.5 SOL...");
    // Real buy logic will be added here soon
  } else {
    await ctx.reply("Bot is alive! Paste a Solana token CA to test.");
  }
});

bot.start();

console.log("✅ Bot is running and waiting for messages.");