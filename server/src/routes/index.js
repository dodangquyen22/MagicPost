const homepage = require('./homepage')
const orderRouter = require('./order')
const trackRouter = require('./track')
const packageRouter = require('./package')
const areaRouter = require('./area')
const manager = require('./manager')
const warehouseLeader = require('./warehouseLeader')
const pointLeader = require('./pointLeader')


function route(app) {
  app.use("/", homepage)
  app.use("/manager",manager)
  app.use("/warehouseLeader",warehouseLeader)
  app.use("/pointLeader", pointLeader)
  app.use("/order", orderRouter)
  app.use("/track", trackRouter)
  app.use("/package", packageRouter)
  app.use("/", areaRouter);
}

module.exports = route