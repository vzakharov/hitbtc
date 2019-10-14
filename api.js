const api2js = require('api2js')

const _ = require('lodash')

function Api() {

    this.defaults = {
        baseURL: 'https://api.hitbtc.com/api/2'
    }

    this.methods = {

        public: {
    
                candles: (symbol, period, params) => ({
                    url: symbol,
                    method: 'get',
                    params: _.assign(params, {period})
                }),

                trades: (symbol, params) => ({
                    url: symbol,
                    method: 'get',
                    params
                })
    
        }

    }

    api2js.prepare(this)

}


module.exports = Api