const api = require('./api')
main()

async function main() {
    let trades = await api.public.trades('BTCUSD', {limit: 100})

    return trades
}