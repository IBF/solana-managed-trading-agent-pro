module.exports = async (req, res) => {
  console.log("Webhook received from Telegram");

  if (req.method === "POST" && req.body) {
    const update = req.body;

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || "no text";

      console.log("Message from chat", chatId, ":", text);

      // Simple reply
      res.status(200).json({
        method: "sendMessage",
        chat_id: chatId,
        text: "✅ Bot received: " + text + "\n\nThis is a test reply from Vercel."
      });
      return;
    }
  }

  res.status(200).send("OK");
};