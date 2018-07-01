exports = module.exports = (client, website, err) => {
  console.log(err.toString());
  website.isOnline = false;
};
exports.enabled = true;