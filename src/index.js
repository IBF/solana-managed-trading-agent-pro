const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const managerBot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Manager Bot started - troubleshooting mode");

managerBot.on("managed_bot", async (ctx) => {
  console.log("✅ Managed bot creation event received!");
  const token = await ctx.api.getManagedBotToken(ctx.update.managed_bot.bot.id);
  const userBot = new Bot(token);
  await userBot.sendMessage(ctx.update.managed_bot.bot.id, "✅ Test: Managed bot creation detected! The system is working.");
});

managerBot.on("message", async (ctx) => {
  console.log("📩 Message received from managed bot:", ctx.message.text);
  await ctx.reply("✅ Manager received your message: " + ctx.message.text + "\n\nThe connection is working.");
});

managerBot.start();

console.log("✅ Listening for updates from managed bots...");