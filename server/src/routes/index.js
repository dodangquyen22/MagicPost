const homepage = require('./homepage')
const manager = require("./manager")


function route(app) {
  app.use("/", homepage)
  app.use("/manager",manager)
}

module.exports = route