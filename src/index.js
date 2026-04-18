const { Bot } = require("grammy");
const { Keypair, PublicKey } = require("@solana/web3.js");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
const FEE_WALLET = process.env.FEE_WALLET;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

console.log("🚀 Solana Trading Agent Bot (Jupiter V6) started");

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

  // Detect Solana token CA
  if (text.length > 30 && text.length < 50) {
    const tokenCA = text.trim();
    await ctx.reply(`🔍 Received token CA: ${tokenCA.slice(0, 20)}...\n\nGetting quote from Jupiter...`);

    try {
      const quoteRes = await axios.get("https://quote-api.jup.ag/v6/quote", {
        params: {
          inputMint: "So11111111111111111111111111111111111111112", // SOL
          outputMint: tokenCA,
          amount: 500000000, // 0.5 SOL in lamports
          slippageBps: 100,
        },
      });

      const quote = quoteRes.data;
      const estimatedOut = (quote.outAmount / 1_000_000_000).toFixed(4);

      await ctx.reply(
        `✅ Quote received!\n` +
        `You will receive ≈ ${estimatedOut} tokens\n\n` +
        `Real swap execution coming in the next update (Jito + 1% fee).`
      );

    } catch (err) {
      const errorMsg = err.response ? JSON.stringify(err.response.data) : err.message;
      console.error("Jupiter error:", errorMsg);
      await ctx.reply("❌ Jupiter error: " + (err.response?.data?.error || err.message || "Unknown"));
    }
    return;
  }

  await ctx.reply("Send a Solana token CA to buy/snipe or type /start");
});

bot.start();

console.log("✅ Bot running with Jupiter V6 support");
