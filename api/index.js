module.exports = async (req, res) => {
  if (req.method === "POST" && req.body && req.body.message) {
    const chatId = req.body.message.chat.id;
    const text = req.body.message.text || "no text";

    // Send reply directly
    const reply = {
      method: "sendMessage",
      chat_id: chatId,
      text: "✅ Bot received: " + text + "\n\nThe bot is working!"
    };

    res.status(200).json(reply);
    return;
  }

  res.status(200).send("OK");
};