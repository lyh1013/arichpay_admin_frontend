import axios from 'axios'

axios.defaults.baseURL = cfg.API_URL()
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
