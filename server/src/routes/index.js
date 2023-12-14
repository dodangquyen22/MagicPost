const homepage = require('./homepage')
const manager = require("./manager")
const warehouseLeader = require("./warehouseLeader")
const pointLeader = require("./pointLeader")


function route(app) {
  app.use("/", homepage)
  app.use("/manager",manager)
  app.use("/warehouseLeader",warehouseLeader)
  app.use("/pointLeader", pointLeader)
}

module.exports = route