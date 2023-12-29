const packageModule = require('../modulers/package');
const order = require('../modulers/order');
const point = require('../modulers/point');
const moment = require('moment');

class statisticController {
    async getLeaderStatistic(req, res, next) {
        const r = {};
        const packs = await packageModule.find({}, { _id: 1 }).exec();
        r.totalTransactions = packs.length;
        r.totalCenters = await point.countDocuments({ type: "transaction" });
        r.totalDeliveryPoints = await point.countDocuments({ type: "warehouse" });
        const fiveMonthsAgo = moment().subtract(6, 'months').startOf('month');
        console.log(fiveMonthsAgo);
        const sumByMonth = await packageModule.aggregate([
            {
                $match: {
                    receiveDate: { $gte: fiveMonthsAgo.toDate() }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$receiveDate' },
                        month: { $month: '$receiveDate' }
                    },
                    total: { $sum: '$cost' }
                }
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1
                }
            }
        ]);

        r.monthlyIncome = sumByMonth;

        r.packageStatistic = await packageModule.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    '_id': 1
                }
            }
        ])

        res.json(r);
    }

    async getLeaderWarehouseStatistic(req, res, next) {
        try {
            const r = {};
            const { idArea } = req.params; // Lấy thông tin idArea từ tham số
        
            const warehousePoints = await point.countDocuments({ type: "warehouse", idArea }); // Thêm điều kiện idArea vào truy vấn
        
            r.totalDeliveryPoints = warehousePoints;
            const fiveMonthsAgo = moment().subtract(6, 'months').startOf('month');
            console.log(fiveMonthsAgo);
            const sumByMonth = await packageModule.aggregate([
              {
                $match: {
                  receiveDate: { $gte: fiveMonthsAgo.toDate() },
                  idArea // Thêm điều kiện idArea vào truy vấn
                }
              },
              {
                $group: {
                  _id: {
                    year: { $year: '$receiveDate' },
                    month: { $month: '$receiveDate' }
                  },
                  total: { $sum: '$cost' }
                }
              },
              {
                $sort: {
                  '_id.year': 1,
                  '_id.month': 1
                }
              }
            ]);
        
            r.monthlyIncome = sumByMonth;
        
            r.packageStatistic = await packageModule.aggregate([
              {
                $match: {
                  idArea // Thêm điều kiện idArea vào truy vấn
                }
              },
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 }
                }
              },
              {
                $sort: {
                  '_id': 1
                }
              }
            ]);
        
            res.json(r);
          } catch (error) {
            next(error);
          }
        }
        async getLeaderTransactionStatistic(req, res, next) {
            try {
              const r = {};
              const { idArea } = req.params; // Lấy thông tin idArea từ tham số
              console.log(idArea);
          
              const transactionPoints = await point.countDocuments({ type: "transaction", idArea }); // Thêm điều kiện idArea vào truy vấn
          
              r.totalTransactionPoints = transactionPoints;
              const fiveMonthsAgo = moment().subtract(6, 'months').startOf('month');
              console.log(fiveMonthsAgo);
              const sumByMonth = await packageModule.aggregate([
                {
                  $match: {
                    receiveDate: { $gte: fiveMonthsAgo.toDate() },
                    idArea // Thêm điều kiện idArea vào truy vấn
                  }
                },
                {
                  $group: {
                    _id: {
                      year: { $year: '$receiveDate' },
                      month: { $month: '$receiveDate' }
                    },
                    total: { $sum: '$cost' }
                  }
                },
                {
                  $sort: {
                    '_id.year': 1,
                    '_id.month': 1
                  }
                }
              ]);
          
              r.monthlyIncome = sumByMonth;
          
              r.packageStatistic = await packageModule.aggregate([
                {
                  $match: {
                    idArea // Thêm điều kiện idArea vào truy vấn
                  }
                },
                {
                  $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                  }
                },
                {
                  $sort: {
                    '_id': 1
                  }
                }
              ]);
          
              res.json(r);
            } catch (error) {
              next(error);
            }
          }
}

module.exports = new statisticController()