module.exports = (message, res, errorCode = 200) => {
  if (200 <= errorCode && errorCode <= 299) {
    console.log(errorCode, message);
    return res.status(errorCode).render("Error", { result: message });
  }
  res.status(errorCode).render("Error", { result: message });
};
