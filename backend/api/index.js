const app = require("../index") // Import Express app
const serverless = require("serverless-http")

module.exports = serverless(app)