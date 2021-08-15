
const nock = require('nock')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinonChai')
const expect = chai.expect

const chalk = require('chalk')

chai.use(sinonChai)

const convertBTC = require('../src/ConvertBTC')


describe('ConvertBTC', () => {

    let consoleStub;

    const responseMock = {
        "success": true,
        "time": "2017-0702 18:51:29",
        "price": 2490.78
    }

    beforeEach(() => {
        consoleStub = sinon.stub(console, 'info')
    })

    afterEach(()=> {
        consoleStub.restore()
    })

    it('should use currency USD and 1 as adefault amount', async () => {
        //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1')

        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({ from: 'BTC', to: 'USD', amount: 1 })
            reply(200, responseMock)

        await convertBTC()
        expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`)
    })


    it('should use currency USD and 10 amount', async () => {
        //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=10')

        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({ from: 'BTC', to: 'USD', amount: 10 })
            reply(200, responseMock)

        await convertBTC('USD', 10)
        expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(2490.78)}`)
    })


    it('should use currency BRL and 1 as default amount', async () => {
        //https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=10')

        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({ from: 'BTC', to: 'BRL', amount: 1 })
            reply(200, responseMock)

        await convertBTC('BRL')
        expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(2490.78)}`)
    })


    it('should message user when api reply with error', async () => {

        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({ from: 'BTC', to: 'BRL', amount: 1 })
            replyWithError('Error')

        await convertBTC('BRL')
        expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API'))
    })

})