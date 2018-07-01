exports = module.exports = (client, website) => {
  console.log("Website died");
  website.isOnline = false;
};
exports.enabled = true;