class orderController {
    // Tạo đơn
    createOrder(req, res, next) {
        if (true) {
            this.createOrderToTransactionSpot(req, res, next);
        } else if (false) {
            this.createOrderToWarehouse(req, res, next);
        } else {
            this.createOrderToCustomer(req, res, next);
        }
    }

    //tao don den diem tap ket
    createOrderToWarehouse(req, res,next) {

    }
    // Tạo đơn đến điểm giao dịch
    createOrderToTransactionSpot(req, res, next) {
        // Your code here
    }
    createOrderToCustomer(req, res, next) {
        
    }

    //xac nhan don hang
    confirmOrder(req, res, next) {

    }
}