import './config'
import axios from 'axios'

const $authHttp = axios.create()
const $http = axios.create()

$authHttp.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error) // TODO:toast error messages

    return Promise.reject(error)
  },
)

$http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error) // TODO:toast error messages

    return Promise.reject(error)
  },
)

export { axios, $authHttp }
export default $http
