const { Bot } = require("grammy");
const { Keypair } = require("@solana/web3.js");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
const FEE_WALLET = process.env.FEE_WALLET || "YOUR_FEE_WALLET_HERE";

console.log("🚀 Solana Trading Agent Bot (fixed Jupiter API) started");

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
    await ctx.reply(`🔍 Received token: ${tokenCA.slice(0, 20)}...\n\nGetting best quote from Jupiter...`);

    try {
      const quoteRes = await axios.get("https://api.jup.ag/swap/v1/quote", {
        params: {
          inputMint: "So11111111111111111111111111111111111111112", // SOL
          outputMint: tokenCA,
          amount: 500000000,        // 0.5 SOL
          slippageBps: 100,         // 1%
        }
      });

      const quote = quoteRes.data;
      const estimatedOut = (Number(quote.outAmount) / 1_000_000_000).toFixed(6);

      await ctx.reply(
        `✅ Quote received!\n\n` +
        `You will receive ≈ **${estimatedOut}** tokens\n\n` +
        `Real swap (with Jito + 1% fee) coming in the next update.`
      );

    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Unknown error";
      console.error("Jupiter error:", msg);
      await ctx.reply("❌ Jupiter quote failed: " + msg + "\n\nTry a more established token or try again later.");
    }
    return;
  }

  await ctx.reply("Paste a Solana token CA to buy/snipe or type /start");
});

bot.start();

console.log("✅ Bot is running with updated Jupiter v1 API");
