const expect = require('chai').expect

const exec = require('child_process').exec
const btcConverter = '.\src\main.js'
const pkg = require('../package.json')

describe('Main', () => {

  it('should return Version of btcConverter', (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if(err) throw err;
      exec(stdout.replace('\n', '')).to.be.equal(pkg.version)
      done()
    })
  })

  it('should return description of btcConverter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      exec(stdout.includes('Convert Bitcoin to any currenty defined')).to.be.true
      done()
    })
  })

  it('should return currency option when btc converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      exec(stdout.includes('--currency')).to.be.true
      done()
    })
  })

  it('should return amount option when btc converter --help', (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      exec(stdout.includes('--amount')).to.be.true
      done()
    })
  })
})
