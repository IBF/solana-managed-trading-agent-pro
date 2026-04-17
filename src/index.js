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

console.log("🚀 Regular Bot started");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";
  console.log("Received:", text);

  if (text === "/start") {
    await ctx.reply("✅ Welcome to Solana Trading Bot!\n\nPaste any Solana token CA to buy/snipe.");
  } else {
    await ctx.reply("Received: " + text + "\n\nThis is a test reply.");
  }
});

bot.start();

console.log("✅ Bot is listening");