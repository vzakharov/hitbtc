const Hitbtc = require('./hitbtc')
const _ = require('lodash')
const fs = require('fs')
const json2csv = require('json2csv')


async function main() {


    let hitbtc = new Hitbtc()

    let trades = await hitbtc.api.public.trades('EMCBTC')

    for (let trade of trades) {
        trade.time = (
            new Date(trade.timestamp) - new Date()
        ) / 60000

    }

    fs.writeFileSync('./sandbox/trades.tsv', json2csv.parse(trades, {delimiter: '\t'}))

    return trades


}

main()