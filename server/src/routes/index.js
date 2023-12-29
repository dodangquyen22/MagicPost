const homepage = require('./homepage')
const orderRouter = require('./order')
const trackRouter = require('./track')
const packageRouter = require('./package')
const manager = require('./manager')
const warehouseLeader = require('./warehouseLeader')
const transactionLeader = require('./transactionLeader')
const warehouseStaff = require('./warehouseStaff')
const pointStaff = require('./transactionPointStaff')


function route(app) {
  app.use("/", homepage)
  app.use("/manager",manager)
  app.use("/warehouseLeader",warehouseLeader)
  app.use("/transactionLeader", transactionLeader)
  app.use("/package", packageRouter)
  app.use("/order", orderRouter)
  app.use("/warehouse", warehouseStaff)
  app.use("/transactionPoint", pointStaff)
  app.use("/track", trackRouter)
}

module.exports = route