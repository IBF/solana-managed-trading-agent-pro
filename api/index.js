module.exports = async (req, res) => {
  console.log("Webhook received");

  if (req.method === "POST" && req.body) {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || "";

      console.log("Message from", chatId, ":", text);

      // Send reply using direct Telegram method
      const reply = {
        method: "sendMessage",
        chat_id: chatId,
        text: "✅ Bot received your message: " + text + "\n\nThis is a test reply from Vercel.\n\nThe bot is working!"
      };

      res.status(200).json(reply);
      return;
    }
  }

  res.status(200).send("OK");
};