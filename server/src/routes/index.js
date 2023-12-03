const homepage = require('./homepage')
const orderRouter = require('./order')
const trackRouter = require('./track')


function route(app) {
  app.use("/", homepage)
  app.use("/order", orderRouter)
  app.use("/track", trackRouter)
}

module.exports = route