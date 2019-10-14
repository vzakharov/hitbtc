const Hitbtc = require('./hitbtc')

const _ = require('lodash')
const {
    assign
} = _


const fs = require('fs')
const json2csv = require('json2csv')


async function main() {


    let hitbtc = new Hitbtc()

    let symbol = 'LTCUSD'
    let period = 'M1'

    let candles = await hitbtc.api.public.candles(symbol, period)
    let {length} = candles

    for (let candle of candles) {

        assign(candle, {

            time:  (
                new Date(candle.timestamp) - new Date()
            ) / 60000,

            area: candle.quantity * candle.price
        })

    }

    let addDerivative = (property, derivativeOf, order) => {

        for (let i = 0; i < length - order; i++) {

            let trade = candles[i]
            let previousTrade = candles[i + 1]
    
            trade[property] = 
                (trade[derivativeOf] - previousTrade[derivativeOf]) / 
                (trade.time - previousTrade.time)
    
        }
    
    }

    addDerivative('speed', 'price', 1)
    addDerivative('acceleration', 'speed', 2)


    fs.writeFileSync('./sandbox/trades.tsv', json2csv.parse(candles, {delimiter: '\t'}))

    return candles


}

main()