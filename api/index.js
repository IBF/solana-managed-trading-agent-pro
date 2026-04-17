const { Bot } = require("grammy");
const dotenv = require("dotenv");

dotenv.config();

const bot = new Bot(process.env.MANAGER_BOT_TOKEN);

console.log("🚀 Bot handler loaded");

module.exports = async (req, res) => {
  if (req.method === "POST" && req.body) {
    console.log("Received update from Telegram");

    try {
      await bot.handleUpdate(req.body);
      res.status(200).send("OK");
    } catch (error) {
      console.error("Error handling update:", error);
      res.status(200).send("OK");
    }
  } else {
    res.status(200).send("✅ Server is running");
  }
};