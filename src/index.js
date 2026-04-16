console.log("Vercel function started");

module.exports = async (req, res) => {
  console.log("Request received:", req.method, req.url);
  res.status(200).send("✅ Bot is alive on Vercel! Send hello to @Solagm_bot");
};