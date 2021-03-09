/*eslint-disable*/
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
const instance: AxiosInstance = axios.create()
instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		return config
	},
	(err: AxiosError) => {
		console.log(err)
	})

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	(err: AxiosError) => {
		console.log(err)
	}
)

export default instance
