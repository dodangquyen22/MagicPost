const packageModule = require('../modulers/package');
const order = require('../modulers/order');
const point = require('../modulers/point');
const moment = require('moment');
const { ObjectId } = require('mongodb');

class statisticController {

  getStatistic = async(req, res, next) => {
    const { pointID } = req.query;
    if (pointID) {
      this.getPointStatistic(req, res, next);
    } else {
      this.getLeaderStatistic(req, res, next);
    }
  }
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

    async getPointStatistic(req, res, next) {
        try {
          const r = {};
          const { pointID } = req.query; // Lấy thông tin idArea từ tham số
          console.log("statistic point ID", pointID);
      
          // const fiveMonthsAgo = moment().subtract(6, 'months').startOf('month');
          // console.log(fiveMonthsAgo);
          // const sumByMonth = await order.aggregate([
          //   {
          //     $match: {
          //       $or: [
          //         { send_point_id: new ObjectId(pointID) },
          //         { receive_point_id: new ObjectId(pointID) }
          //       ]
          //     }
          //   },
          //   // {
          //   //   $group: {
          //   //     _id: {
          //   //       year: { $year: '$receiveDate' },
          //   //       month: { $month: '$receiveDate' }
          //   //     },
          //   //     total: { $sum: '$cost' }
          //   //   }
          //   // },
          //   // {
          //   //   $sort: {
          //   //     '_id.year': 1,
          //   //     '_id.month': 1
          //   //   }
          //   // }
          // ]);
      
          // r.monthlyIncome = sumByMonth;
      
          r.packageStatistic = await order.aggregate([
            {
              $match: {
                $or: [{ send_point_id: new ObjectId(pointID) }, { receive_point_id: new ObjectId(pointID) }] // Thêm điều kiện idArea vào truy vấn
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