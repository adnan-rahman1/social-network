module.exports = (user) => {
  const { _id, name, email, following, followers, createdAt, updatedAt, avater: userAvater } = user;
  const avater = userAvater && userAvater.toString("base64");
  const single_user = {
    _id, name, email, following, followers, createdAt, updatedAt, avater
  }

  return single_user;
}