const { Bot } = require("grammy");
const { PrismaClient } = require("@prisma/client");
const { Keypair } = require("@solana/web3.js");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const prisma = new PrismaClient();
const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Solana Trading Bot is running on Vercel");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";

  if (text === "/start") {
    await ctx.reply("✅ Welcome to Solana Trading Bot!\n\n" +
      "Just paste any Solana token CA to buy/snipe (default 0.5 SOL).\n" +
      "Type /help for commands.");
    return;
  }

  if (text === "/help") {
    await ctx.reply("/start - Welcome message\n" +
      "Paste a token CA - Buy with 0.5 SOL\n" +
      "/portfolio - View your holdings (coming soon)");
    return;
  }

  // Simple token CA detection (Solana addresses are 32-44 chars base58)
  if (text.length > 30 && text.length < 50) {
    await ctx.reply("🔍 Received token CA: " + text.slice(0, 20) + "...\n\nProcessing buy with 0.5 SOL...\n\n(This is a demo - real swap coming soon)");
    return;
  }

  await ctx.reply("Send a Solana token CA to buy/snipe.");
});

bot.start();

console.log("✅ Bot is ready and listening");