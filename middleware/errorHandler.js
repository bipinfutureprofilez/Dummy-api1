
const {customAPIError} = require('../error/customError')

const errorHandler = (err, req, res, next) => {
   let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong!'
   }
    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandler;