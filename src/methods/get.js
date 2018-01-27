
const handles = []


const get = {
  addHandle(url, foo) {
    let urlArr = url.split('/').slice(1),
        handle = {
          url,
          params: [],
          foo
        },
        reto = []
    let count = 0
    urlArr.forEach((item, index) => {
      if (item[0] === ':') {
        handle.params.push({index, key: item.substr(1)})
        reto.push('(.+?)')
      } else {
        reto.push(item)
      }
    });
    let r = '^\\/' + reto.join('\\/');
    handle.reg = new RegExp(r, 'gi')
    handles.push(handle)
  },
  dispatchHandle(req, res) {
    let url = req.url,
      queryIndex = url.indexOf('?')

    //解析url获取需要的数据
    if (queryIndex === -1) {
      req.path = url
    }
    else{
      let queryArr = url.substring(queryIndex + 1).split('&')
      req.path = url.slice(0, queryIndex)
      req.query = {}
      queryArr.forEach(item => {
        let a = item.split('=')
        req.query[a[0]] = a[1]
      })
    }
   
    let handle = handles.find(item => {
      return item.url === req.path
    })
  
    if (handle) {
      handle.foo(req, res)
      return
    }
  
    handle = handles.find(item => {
      return item.reg.test(req.path)
    })
  
    if (handle) {
      let values = req.path.split('/').slice(1)
      req.params = {}
      handle.params.forEach(item => {
        req.params[item.key] = values[item.index]
      })
      handle.foo(req, res)
      return
    }
  
    res.writeHead(404)
    res.end()
  
  }

  
}
module.exports = exports = get