import axios from "axios"
import qs from "qs"
// import { Toast } from 'vant';
// import 'vant/es/toast/style';
import router from "../router/index.js"
import { VueCookieNext } from 'vue-cookie-next'

const service = axios.create({
	baseURL: import.meta.env.VITE_NAME,
	timeout: 5000, // 请求超时时间
	transformRequest: [function (data) {
		if (Object.prototype.toString.call(data) === "[object FormData]") {
			return data
		}
		if (Object.prototype.toString.call(data) === "[object String]") {
			return data
		}
		data = qs.stringify(data)
		return data
	}]
})

// request拦截器
service.interceptors.request.use(
	config => {
		let token = VueCookieNext.getCookie('token')
		if(token){
			config.headers["Authorization"] =`Bearer ${token}`
		}
		if(config.Accept === "json"){
			config.headers["Content-Type"] = "application/json"
		}else{
			config.headers["Content-Type"] = "application/x-www-form-urlencoded"
		}
		// 请求开始的时间
		config.metadata = { startTime: new Date()}

		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// let toastFail, errorFail;
// respone拦截器
service.interceptors.response.use(
	response => {
		// console.log(response);
		const res = response.data;

		// 请求结束的时间
		response.config.metadata.endTime = new Date()
		// 响应的时间
		response.duration = response.config.metadata.endTime - response.config.metadata.startTime

		if(response.duration >= 4000) {
			Snackbar.loading('加载中...')
		}
        if(res.code == 10011 ) {
			Snackbar({
			  type: 'warning',
			  content: res.msg,
			  duration: 800
			})
		}
		// if(res.code == 10030 || res.code == 401 ) {
		//     router.push('/login')
		// }
        // Toast.clear()
		return response.data
	},
	error => {
		let message = error.message
		if (message == "Network Error") {
			message = "后端网络故障"
		} else if (message.includes("timeout")) {
			message = "接口请求超时"
		} else if (message.includes("Request failed with status code")) {
			message = "接口" + message.substr(message.length - 3) + "异常"
		}
		// Toast.fail( message)
		return Promise.reject(error)
	}
)

export default service
