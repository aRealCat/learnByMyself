
import axios from 'axios'
import { MessageBox, Loading } from 'element-ui'
import {mapState} from 'vuex'
import { getApp } from '../main';
const REDIRECT_TO_LOGIN = -1; // 未登录标识

// 请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误`
    }
  } else {
    error.message = '连接到服务器失败'
  }
  // message.error(error.message)
  return Promise.resolve({message: error.message, status: error.response.status})
})

export function redirectToLogin() {
  const { router } = getApp()
  router.push({ name: 'login'})
}

export function toUrl(url: string) {
    if (!url) {
      console.log('url未定义')
      return ''
    }
    if (!url.includes('https://')) {
    //   if (getApp()) {
    //     const {store} = getApp()
    //     const baseUrl = store.state.config.baseUrl || ''
    //     return baseUrl + url
    //   }
      return url
    }
    return url
  }
export function showWarningModal(content: string, title = '警告') {
  return new Promise((resolve) => {
    MessageBox.alert(content, title,
        {
            confirmButtonClass: 'el-button--danger',
            lockScroll: true,
            type: 'error'
        }
    ).
    then(() => {
        resolve()
    })
  })
}
/*
 * http请求
 * @param {String} url  请求地址
 * @param {Object} data 提交参数
 * @param {String} method 请求方式 默认值post
 * @param {Boolean}  noErrorDialog 接收到后台返回false是否不弹出错误提示 默认值为false
*/
export function http({url = '', data = {}, method = 'post', needLoading = true, noErrorDialog = false}) {
  let loading
  let httpParms
  console.log(url)
  return new Promise((resolve, reject) => {
    if (!url) {
      showWarningModal('您没有权进行该操作，如有疑问，请联系管理员')
      reject(new Error('no url'))
      return
    }
    if (needLoading) {
      loading = Loading.service({lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'})
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(data)
    }
    method = process.env.NODE_ENV !== 'production' ? 'get' : method
  //  if (process.env.NODE_ENV !== 'production') {
  //     method = 'post'
  //     if (url.includes('config')) {
  //       method = 'get'
  //     }
  //     if (
  //       url.includes('/site')
  //     ) {
  //       method = 'post'
  //     }
  //   }
    httpParms = { method, url }

    axios(httpParms).then((res: any) => {
      loading && loading.close()
      if (Array.isArray(res.data) || typeof res.data === 'object') {
        if (res.data.result === true || res.data[0] === true) {
          if (res.data.result === true) {
            resolve(res.data)
          } else if (res.data[0] === true) {
            resolve(res.data[1])
          }
        } else {
          // 默认弹出错误警告窗
          if (noErrorDialog === false) {
            showWarningModal(res.data.message).then(() => {
            if (res.data.errorNo === REDIRECT_TO_LOGIN) {
              // 若返回信息为 REDIRECT_TO_LOGIN 重定向至登录
              redirectToLogin()
              resolve(res.data)
            }
            })
          } else {
            if (res.data.errorNo === REDIRECT_TO_LOGIN) {
              // 若返回信息为 REDIRECT_TO_LOGIN 重定向至登录
              redirectToLogin()
              resolve(res.data)
            }
          }
          }
        } else {
            if (typeof res === 'object' && res.message) {
            showWarningModal(res.message, '警告' + res.status)
            } else {
            // console.log(url + '返回数据格式不正确,{result:true}')
            }
        }
        }, (res) => {
        loading && loading.close()
        showWarningModal('网络异常,请稍后再试!')
        reject(res)
        })
    })
    }

export default {
  http
}
