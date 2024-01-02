const http = require('http');
const DEFAULT_USER={
    username: 'marcelo',
    password: '123'
}
const {once} = require('events')
const routes ={
    '/contact:get': (req, res) => {
        res.write('contact  us page')
        return res.end()
    },
    //curl -X POST --data '{"username":"marcelo","password":"123"}' localhost:3000/login
    '/login:post': async (req, res) => {
        const data=JSON.parse(await once(req, 'data'))
        console.log('data', data)
        const toLowerCase = (value) => value.toLowerCase()
        if(toLowerCase(data.username) !== toLowerCase(DEFAULT_USER.username) || data.password !== DEFAULT_USER.password){
            res.writeHead(401)
            res.write('Logging failed!')
            return
        }
        res.writeHead(200)
        res.write('Logging has succeeded!')
        return res.end()
    },
    default: (req, res) => {
        res.writeHead(404)
        return res.end('not found')
    }
}

const handler = (req, res) => {
  const { url, method } = req;
  const routeKey = `${url.toLowerCase()}:${method.toLowerCase()}`;
  console.log('routeKey', routeKey);
  const chosen = routes[routeKey] || routes.default;
  return chosen(req, res);
}

const app= http.createServer(handler)
.listen(3000, () => console.log('Server running on port 3000'));

module.exports = app;