const { constants } = require("../constants/constant")
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    try {
        switch (statusCode) {
            case constants.VALIDATION_ERROR:
                res.json({ tittle: "Validation failed", message: err.message, stakTrace: err.stack })
                break;
            case constants.UNAUTHORIZED:
                res.json({ tittle: "Unathorized", message: err.message, stakTrace: err.stack })
                break
            case constants.NOT_FOUND:
                res.json({ tittle: "Not Found", message: err.message, stakTrace: err.stack })
                break
            case constants.FORBIDDEN:
                res.json({ tittle: "Forbidden", message: err.message, stakTrace: err.stack })
                break
            case constants.SERVER_ERROR:
                res.json({ tittle: "Server Error", message: err.message, stakTrace: err.stack })
                break
            default:
                console.log("No Error, All good !")
                break;
        }
    } catch (error) {
        console.log(error)
    }
    next()

}

module.exports = errorHandler