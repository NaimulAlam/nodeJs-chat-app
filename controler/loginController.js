function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat App",
  });
}

module.exports = {
  getLogin,
};
