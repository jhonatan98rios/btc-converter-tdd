#!/user/bin/env node

const program = require('commander')
const pkg = require('../package.json')
const convertBTC = require('./ConvertBTC')

program
    .version(pkg.version)
    .description('Convert Bitcoin to any currenty defined')
    .option(`-C, --currency <currency>`, `Currency to be converted, (Default: USD)`)
    .option(`-A, --amount <amount>`, `Amount in Bitcoin, (Default: 1)`)
    .parse(process.args)

convertBTC(program.currency, program.amount)

console.log(convertBTC(program.currency, program.amount))