module.exports = async (req, res) => {
  console.log("Vercel received request");

  if (req.method === "POST") {
    res.status(200).send("OK");
    // For now, we just acknowledge the request
    console.log("Telegram webhook received");
  } else {
    res.status(200).send("✅ Server is running on Vercel");
  }
};