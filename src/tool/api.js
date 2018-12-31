let root = '/api/v1'
let request = require('superagent')
function dataType(data) { // 获取数据类型
  return ({}).toString.call(data).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
function filterNull(o) { // 过滤值为null的请求参数数据
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (dataType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (key === 'asset_id') {
        o[key] = +o[key]
      }
      if (o[key].length === 0) {
        delete o[key]
      }
    } else if (dataType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (dataType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
function ajaxAgent(method, url, params, success, failure) { // 发送请求并得到响应
  if (!navigator.onLine) {
    return
  }
  let r = request(method, url).type('application/json').withCredentials()
  if (params) {
    params = filterNull(params)
    if (method === 'POST' || method === 'PUT') {
      if (dataType(params) === 'object') {
        params = JSON.stringify(params)
      }
      r = r.send(params)
    } else if (method === 'GET' || method === 'DELETE') {
      r = r.query(params)
    }
  }
  r.end(function (err, response) {
    if (err) {
      if (failure) {
        failure({ data: err.name + ': ' + err.message, http_status: response.status }, response, 'HTTP_ERROR') // err, res, esta
      } else {
        console.log('网络连接出错，请稍后重试')
      }
    } else {
      // 这里的判断条件，需要和后端进行确认，这里使用的是 cnodejs.org 的规则
      if (response.body.success === true) {
        if (success) {
          success(response.body, response) // rdata, res
        }
      } else {
        if (failure) {
          failure(response.body, response, 'STATUS_ERROR') // err:, res, esta
        } else {
          console.log(response.body.return_msg)
        }
      }
    }
  })
}
function testRequestParams(method, url, params, success, failure) { // 验证请求时，传递的参数
  if (Object.prototype.toString.call(success) !== '[object Function]') {
    try {
      throw new Error('成功的回调函数位置接受的是一个Function,但是却得到一个' + dataType(success))
    } catch (e) {
      console.error(e)
      return
    }
  }
  if (failure) {
    if (Object.prototype.toString.call(failure) !== '[object Function]') {
      try {
        throw new Error('失败的回调函数位置接受的是一个Function,但是却得到一个' + dataType(failure))
      } catch (e) {
        console.error(e)
        return
      }
    }
  }
  if (Object.prototype.toString.call(params) === '[object Object]' || params === null) {
    return ajaxAgent(method, url, params, success, failure)
  } else {
    try {
      throw new Error('接受的是一个对象或者为空(即null),但是却得到一个' + dataType(params))
    } catch (e) {
      console.error(e)
    }
  }
}
export default {
  get: function (url, params, success, failure) {
    testRequestParams('GET', root + '/' + url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    testRequestParams('POST', root + '/' + url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    testRequestParams('PUT', root + '/' + url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    testRequestParams('DELETE', root + '/' + url, params, success, failure)
  },
  root() {
    return root
  },
  filterNull
}