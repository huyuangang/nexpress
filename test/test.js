
const nexpress = require('../src/index')

const server = nexpress()

server.get('/user/hello', (req, res) => {
  console.log(req.path, req.query)
  res.end()
})

server.get('/admin/:id', (req, res) => {
  console.log(req.path, req.query, req.params)
  res.end()
})


server.listen(8080, () => {
  console.log('server start at port:', server.address().port)
})