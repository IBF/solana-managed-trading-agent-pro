const { Bot } = require("grammy");
const { PrismaClient } = require("@prisma/client");
const { Keypair } = require("@solana/web3.js");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();

const prisma = new PrismaClient();
const bot = new Bot(process.env.BOT_TOKEN_NEW);

console.log("🚀 Solana Trading Bot is starting...");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";
  console.log("Received message:", text);

  if (text === "/start") {
    await ctx.reply(
      "✅ Welcome to Solana Trading Bot!\n\n" +
      "Just paste any Solana token CA to buy/snipe (default 0.5 SOL).\n" +
      "Type /help for commands."
    );
    return;
  }

  if (text === "/help") {
    await ctx.reply(
      "📖 Available commands:\n\n" +
      "/start - Welcome message\n" +
      "/help - Show this help\n\n" +
      "Paste a Solana token contract address (CA) to trade it."
    );
    return;
  }

  await ctx.reply("Received: " + text + "\n\nThis is a test reply.");
});

async function main() {
  const me = await bot.api.getMe();
  console.log(`🤖 Bot identity: @${me.username} (ID: ${me.id})`);
  await bot.api.deleteWebhook({ drop_pending_updates: true });
  console.log("✅ Webhook cleared, starting long polling...");
  await bot.start();
}

main().catch((err) => {
  console.error("❌ Bot failed to start:", err);
  process.exit(1);
});

console.log("✅ Bot is listening for messages");
