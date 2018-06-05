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

    for (let trade of trades) {

        assign(trade, {

            time:  (
                new Date(trade.timestamp) - new Date()
            ) / 60000,

            area: Math.sqrt(trade.quantity)

        })

    }

    fs.writeFileSync('./sandbox/trades.tsv', json2csv.parse(trades, {delimiter: '\t'}))

    return trades


}

main()