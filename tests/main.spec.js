const expect = require('chai').expect

const exec = require('child_process').exec
const btcConverter = '.\src\main.js'

describe('Main', () => {

  it('should return Hello', (done) => {
    exec(btcConverter, (err, stdout, stdeerr) => {
      if(err) throw err;
      exec(stdout.replace('\n', '')).to.be.equal('Hello World')
      done()
    })
  })
})
