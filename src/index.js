
const http = require('http')
const get  = require('./methods/get')
// const post = require('./methods/post')
// const put  = require('./methods/put')
// const del  = require('./methods/delete')

function nexpress() {

  const server = http.createServer((req, res) => {

    //扩展添加路由接口
    // server.post = post
    // server.delete = del
    // server.put = put

    let method = req.method.toLowerCase()

    switch (method) {
      case 'get': get.dispatchHandle(req, res)
                  break  
      case 'post': break
      case 'delete': break
      case 'put': break  
    }
  })
  server.get = get.addHandle
  return server
}



module.exports.default = module.exports = nexpress