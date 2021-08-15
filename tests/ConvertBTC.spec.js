
const nock = require('nock')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinonChai')
const expect = chai.expect

chai.use(sinonChai)

const convertBTC = require('../src/ConvertBTC')

describe('ConvertBTC', () => {
    it('should return USD as currency default', () => {
        expect(convertBTC()).to.be.equal('1 BTC to USD = 2000')
    })

    it('should return BRL as currency and 10 as amount when defined', () => {
        expect(convertBTC('BRL', 10)).to.be.equal('10 BTC to BRL = 10000')
    })
})