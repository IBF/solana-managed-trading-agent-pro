module.exports = (req, res) => {
  console.log("Minimal function called");
  res.status(200).send("OK");
};