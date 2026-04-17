module.exports = async (req, res) => {
  console.log("Vercel API route called");
  res.status(200).send("OK - Telegram webhook received");
};