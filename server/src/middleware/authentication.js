const jwt = require('jsonwebtoken');
const User = require("../app/modulers/user");

const authenticateUser = (requiredRole) => {
  return async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    //console.log(token)
    if (!token) {
      res.status(401).json({ error: "Không được phép truy cập" });
      return;
    }
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
     //console.log(decodedToken)
      const uid = decodedToken.username;
      const user = await User.findOne({ username: uid });

      if (!user) {
        throw new Error();
      }

      req.body = user;
      //console.log(req.body)

      if (user.role !== requiredRole) {
        res.redirect("/");
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ error: "Vui lòng đăng nhập để xem dữ liệu" });
      return;
    }
  };
};

module.exports = {
  authenticateUser,
};