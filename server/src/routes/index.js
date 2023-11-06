const homepage = require('./homepage')


function route(app) {
  app.use("/", homepage)
}

module.exports = route