const {describe,it,before,after} = require('mocha')

const request = require('supertest')
const assert = require('assert')
const app = require('./api')

describe('API suite test', () => {
    let app;
    before((done) => {
        app = require('./api')
        app.once('listening', done)
    })

    after(done=>app.close(done))
    
    describe('/contact', () => {
        it('should request the contact page and return HTTP Status 200', async() => {
            const response = await request(app)
            .get('/contact')
            .expect(200)

            assert.strictEqual(response.text, 'contact  us page')
        })
    })
    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200', async() => {
            const response = await request(app)
            .post('/login')
            .send({
                username: 'marcelo',
                password: '123'
            })
            .expect(200)

            
        })
        it('should not login successfully on the login route and return HTTP Status 401 when wrong credentials are given', async() => {
            const response = await request(app)
            .post('/login')
            .send({
                username: 'marcelo',
                password: '1234'
            })
            .expect(401)

            assert.strictEqual(response.text, 'Logging failed!')

        })
    })
})

