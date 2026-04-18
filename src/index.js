const { Bot } = require("grammy");
const { Keypair } = require("@solana/web3.js");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

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

  if (text.length > 30 && text.length < 50) {
    await ctx.reply("🔍 Received token CA: " + text.slice(0, 20) + "...\n\nProcessing buy with 0.5 SOL... (real swap coming soon)");
    return;
  }

  await ctx.reply("Send a Solana token CA to buy/snipe or type /start");
});

bot.start();

console.log("✅ Bot is running and ready.");
