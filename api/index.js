const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  console.log("Webhook received");

  if (req.method === "POST" && req.body) {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || "no text";

      console.log("Message from", chatId, ":", text);

      // Direct reply to Telegram
      const reply = {
        method: "sendMessage",
        chat_id: chatId,
        text: "✅ Bot received: " + text + "\n\nThe bot is working on Vercel!"
      };

      res.status(200).json(reply);
      return;
    }
  }

  res.status(200).send("OK");
};