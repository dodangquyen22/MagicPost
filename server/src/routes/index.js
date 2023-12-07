const homepage = require('./homepage')
const orderRouter = require('./order')
const trackRouter = require('./track')
const packageRouter = require('./package')


function route(app) {
  app.use("/", homepage)
  app.use("/order", orderRouter)
  app.use("/track", trackRouter)
  app.use("/package", packageRouter)
}

module.exports = route