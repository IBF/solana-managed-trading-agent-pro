module.exports = async (req, res) => {
  console.log("=== Vercel Request Received ===");
  console.log("Method:", req.method);
  console.log("Body:", req.body ? JSON.stringify(req.body).slice(0, 500) : "No body");

  if (req.method === "POST" && req.body) {
    res.status(200).send("OK");

    try {
      const update = req.body;
      if (update.message) {
        const chatId = update.message.chat.id;
        const text = update.message.text || "no text";

        console.log("Message from chatId:", chatId, "Text:", text);

        // Simple reply using grammy if possible, but fallback
        res.status(200).send("OK");
      } else if (update.managed_bot) {
        console.log("Managed bot creation detected!");
      }
    } catch (e) {
      console.error("Error processing update:", e);
    }
  } else {
    res.status(200).send("✅ Vercel function is alive");
  }
};