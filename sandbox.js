const Hitbtc = require('./hitbtc')

const _ = require('lodash')
const {
    assign
} = _


const fs = require('fs')
const json2csv = require('json2csv')


async function main() {


    let hitbtc = new Hitbtc()

    let trades = await hitbtc.api.public.trades('EMCBTC', {limit: 1000})
    let {length} = trades

    for (let trade of trades) {

        assign(trade, {

            time:  (
                new Date(trade.timestamp) - new Date()
            ) / 60000,

            area: Math.sqrt(trade.quantity)
        })

    }

    let addDerivative = (property, derivativeOf, order) => {

        for (let i = 0; i < length - order; i++) {

            let trade = trades[i]
            let previousTrade = trades[i + 1]
    
            trade[property] = 
                (trade[derivativeOf] - previousTrade[derivativeOf]) / 
                (trade.time - previousTrade.time)
    
        }
    
    }

    addDerivative('speed', 'price', 1)
    addDerivative('acceleration', 'speed', 2)


    fs.writeFileSync('./sandbox/trades.tsv', json2csv.parse(trades, {delimiter: '\t'}))

    return trades


}

main()