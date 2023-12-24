const jwt = require('jsonwebtoken');
const User = require("../app/modulers/user");


const authenticateUser = (requiredRole) => {
  return async(req, res, next) => {
    let uid = req.cookies.uid;
    console.log(uid)
    if (!uid) {
        res.status(401).json({error: "Không được phép truy cập"});
        return;
    }
    try {
        const user = await User.findOne({ _id: uid })
        if (!user) {
            throw new Error()
        }
        req.user = user
        if (user.role !== requiredRole) {
            res.redirect("/");
            return;
        }
        next();
        console.log("Pass author")
    } catch (error) {
        res.status(401).json({error: "Vui long dang nhap de xem du lieu"});
        return;
    }
}
};


module.exports = {
  authenticateUser,
};
