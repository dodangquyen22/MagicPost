const homepage = require('./homepage')
const orderRouter = require('./order')
const trackRouter = require('./track')
const packageRouter = require('./package')
const areaRouter = require('./area')


function route(app) {
  app.use("/", homepage)
  app.use("/order", orderRouter)
  app.use("/track", trackRouter)
  app.use("/package", packageRouter)
  app.use("/", areaRouter);
}

module.exports = route