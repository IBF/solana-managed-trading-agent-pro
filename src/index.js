const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const managerBot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Manager Bot started on Vercel");

managerBot.on("message", async (ctx) => {
  console.log("Received message:", ctx.message.text);
  await ctx.reply("✅ Bot is alive! Received: " + ctx.message.text);
});

managerBot.on("managed_bot", async (ctx) => {
  console.log("✅ Managed bot creation detected");
  const token = await ctx.api.getManagedBotToken(ctx.update.managed_bot.bot.id);
  const userBot = new Bot(token);
  await userBot.sendMessage(ctx.update.managed_bot.bot.id, "✅ Your trading agent is ready!\n\nPaste a Solana token CA to test.");
});

managerBot.start();

console.log("✅ Waiting for updates...");