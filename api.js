const api2js = require('api2js')

const _ = require('lodash')

function Api() {

    this.defaults = {
        baseURL: 'https://api.hitbtc.com/api/2'
    }

    this.methods = {

        public: {
    
            trades: function (symbol, {sort, by, from, till, limit, offset} = {}) {return {get: [symbol, arguments[1]]}}
    
        }

    }

    api2js.prepare(this)

}


module.exports = Api