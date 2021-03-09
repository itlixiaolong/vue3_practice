import axios from './config'
export const getCloumns = (params: object = {}) => axios.get('/cloumns', { params })
export const getCloumn = (params: object = {}, id: string) => axios.get(`/cloumns/${id}`, { params })
