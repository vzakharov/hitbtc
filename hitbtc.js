const Api = require('./api')

class Hitbtc {

    constructor() {

        this.api = new Api().methods
    }
}

module.exports = Hitbtc