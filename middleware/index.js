const {notFound, errorHandler} = require("./error.middleware.js")
const {protectRoute, isAPItokenAuthorised} = require("./auth.middleware.js")

module.exports = {
    notFound,
    errorHandler, 
    protectRoute,
    isAPItokenAuthorised
}