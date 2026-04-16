const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const managerBot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Manager Bot started - safe version");

managerBot.on("message", async (ctx) => {
  console.log("Message received:", ctx.message.text);
  await ctx.reply("✅ Manager received: " + (ctx.message.text || "no text"));
});

managerBot.on("managed_bot", async (ctx) => {
  console.log("✅ Managed bot creation event received!");
  try {
    const token = await ctx.api.getManagedBotToken(ctx.update.managed_bot.bot.id);
    const userBot = new Bot(token);
    await userBot.sendMessage(ctx.update.managed_bot.bot.id, "✅ Your Solana Trading Agent is ready!\n\nPaste a token CA to test.");
    console.log("Welcome message sent to new bot");
  } catch (e) {
    console.error("Error handling managed_bot:", e.message);
  }
});

managerBot.start();

console.log("✅ Safe manager is running");