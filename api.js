const Axios = require('axios')
const axios = Axios.create({
    baseURL: 'https://api.hitbtc.com/api/2'
})

const _ = require('lodash')

const api = {

    public: {
    
        trades: (symbol, {sort, by, from, till, limit, offset}) => ({get: [symbol, arguments[1]]})

    }

}

fillMethods(api)

function fillMethods (api, path = '') {

    for (let branch in api) {

        let leaf = api[branch]

        if (typeof leaf == 'function') {

            api[branch] = async function () {
                let schema = leaf(... arguments)
                for (let verb in schema) {
                    let axiosArgs = schema[verb]
                    axiosArgs[0] = `${path}/${branch}/${axiosArgs[0]}`
                    try {
                        let {data} = await axios[verb](... axiosArgs)
                        return data
                    } catch(error) {
                        throw(error)
                    }
                }    
            }

        } else {

            fillMethods(leaf, `${path}/${branch}`)

        }

    }

}

module.exports = api