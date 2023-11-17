const User = require('../modulers/user')
const bcrypt = require("bcrypt")

class userController{
    async register(req, res, next) {
        try{
            const { username, password, email, phone, address, role } = req.body;
            console.log(username)
            console.log(password)
            console.log(req.body)
            const salt = await bcrypt.genSalt(10);
            console.log(salt)
            const hashedPassword = await bcrypt.hash(password, salt);
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ error: 'Người dùng đã tồn tại' });
              }
          
            const user = new User({ username, password: hashedPassword, email, phone, address, role });
            await user.save();
        }
       catch(error) {
            next(error)
       }   
    }
    
}
module.exports = new userController()