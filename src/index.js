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
  const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Solana Trading Bot started (stable version)");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";

  if (text === "/start" || text === "/help") {
    await ctx.reply("✅ Welcome to Solana Trading Bot!\n\n" +
      "Just paste any Solana token CA to buy/snipe (default 0.5 SOL).\n" +
      "Type /portfolio to see holdings (demo).\n\n" +
      "Note: This is a demo version. Real trading coming soon.");
    return;
  }

  if (text === "/portfolio") {
    await ctx.reply("💰 Portfolio (demo):\n" +
      "SOL: 2.45 SOL\n" +
      "No tokens yet.\n\n" +
      "Fund your wallet to start trading.");
    return;
  }

  // Simple CA detection
  if (text.length > 30 && text.length < 50) {
    await ctx.reply("🔍 Received token CA:\n" + text + "\n\nBuying 0.5 SOL...\n(This is a demo - real swap coming soon)");
    return;
  }

  await ctx.reply("Send a Solana token CA to buy/snipe or type /help.");
});

bot.start();

console.log("✅ Bot is ready and listening for messages.");