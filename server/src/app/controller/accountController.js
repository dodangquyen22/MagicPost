class accoutController {
    // Tạo tài khoản
    createAccount(req, res, next) {
        
    }
    //Xóa tài khoản
    deleteAccount(req, res, next) {
        // Add your code here to delete the account
    }
    //Lấy danh sách tài khoản
    getAccounts(req, res, next) {
        // Add your code here to get the account list
        if (true) {
            return this.leaderGetAccounts(req, res, next);
        } else {
            return this.pointLeaderGetAccounts(req, res, next);
        }
    }
    // Lấy danh sách tài khoản cho lãnh đạo
    leaderGetAccounts(req, res, next) {
        
    }
    // Lấy danh sách tài khoản cho trưởng điểm
    pointLeaderGetAccounts(req, res, next) {
        
    }
}

module.export = new accoutController();