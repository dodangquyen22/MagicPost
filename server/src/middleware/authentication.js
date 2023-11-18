const jwt = require('jsonwebtoken');
const User = require("../app/modulers/user");


const authenticateUser = async(req, res, next) => {
  let uid = req.cookies.uid;
  console.log(uid)
  if (!uid) {
      res.redirect("/");
      return;
  }
  try {
      const user = await User.findOne({ _id: uid }).lean()
      if (!user) {
          throw new Error()
      }
      req.user = user
      console.log("pass auth")
      next()
  } catch (error) {
      res.redirect("/");
      return;
  }
};


module.exports = {
  authenticateUser,
};
