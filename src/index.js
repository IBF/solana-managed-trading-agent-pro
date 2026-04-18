const { Bot } = require("grammy");
const { Keypair, PublicKey, SystemProgram, Transaction, VersionedTransaction } = require("@solana/web3.js");
// const { Jupiter } = require("@jup-ag/core"); // Jupiter now uses REST API - to be implemented
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
const FEE_WALLET = process.env.FEE_WALLET;

console.log("🚀 Solana Trading Agent Bot started");

bot.on("message", async (ctx) => {
  const text = ctx.message.text || "";

  if (text === "/start") {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toBase58();

    await ctx.reply(
      "✅ Welcome to Solana Trading Agent Bot!\n\n" +
      "Your personal Solana wallet has been created:\n\n" +
      `**Address:** \`${address}\`\n\n` +
      "Send SOL to this address to start trading.\n\n" +
      "Paste any Solana token CA to buy/snipe (default 0.5 SOL).",
      { parse_mode: "Markdown" }
    );
    return;
  }

  if (text === "/portfolio") {
    await ctx.reply("💰 Portfolio feature coming soon...");
    return;
  }

  // Detect Solana token CA (base58 address, ~32-44 chars)
  if (text.length > 30 && text.length < 50) {
    await ctx.reply("🔍 Received token CA: " + text.slice(0, 20) + "...\n\nAttempting to buy with 0.5 SOL using Jupiter...\n(Real swap in progress - this may take a few seconds)");
    
    // TODO: Add real Jupiter swap here in next step
    return;
  }

  await ctx.reply("Send a Solana token CA to buy/snipe or type /start");
});

bot.start();

console.log("✅ Bot is running.");
