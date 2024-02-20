const errorLog = require('../Modules/errorlog.js');
const os = require('node:os')

module.exports = {
    execute (error) {
        errorLog(error)
    }
}