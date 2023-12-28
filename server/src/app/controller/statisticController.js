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
}

module.exports = new statisticController()