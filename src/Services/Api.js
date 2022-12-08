import axios from 'axios'
import { StaticVar } from '../Config'
// import {
//     getAuth,
//     updateCurrentUser,
//     signOut,
//     getIdTokenResult,
//     onAuthStateChanged
// } from "firebase/auth"

// ===> api create
const api = axios.create({
  baseURL: StaticVar.URL_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // json: true
})

api.interceptors.request.use(
  async (config) => {
    if (!config.headers) {
      config.headers = {}
    }

    config.headers.authtoken = await localStorage?.authtoken
    // const auth = getAuth();
    // const authtoken = await auth?.currentUser?.getIdTokenResult()
    // if(authtoken?.token){
    //   localStorage.setItem("authtoken",authtoken.token)
    //   config.headers.authtoken = await authtoken?.token
    // }
    // else{
    //   config.headers.authtoken = await localStorage?.authtoken
    // }
    // updateToken({authtoken}).then(()=>{
    //   localStorage.setItem("authtoken",authtoken);
    // })

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

console.log('getIdTokenResult')

api.interceptors.response.use(undefined, (err) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  const status = err.response?.status || 500
  // we can handle global errors here
  switch (status) {
    // authentication (token related issues)
    case 401: {
      break
    }

    // forbidden (permission related issues)
    case 403: {
      break
    }

    // bad request
    case 400: {
      break
    }

    // not found
    case 404: {
      break
    }

    // conflict
    case 409: {
      break
    }

    // unprocessable
    case 422: {
      break
    }

    case 502: {
      break
    }

    default: {
      break
    }
  }

  return Promise.reject(err)
})

// ===> api list function request

// auth
const getCheckup = (data) => api.get('/medical/checkup', data)
const getScheduleTrainDriver = (data) => {
  return api.get('/operational/scheduletraindriver', data)
}
const getTrainDriver = (data) => api.get('/users/traindriver', data)
const getAbsenceSummary = (data) => api.get('/users/absence/summary', data)
const getHistoryCheckup = (data) => api.get('/medical/checkup', data)
const getCountCheckup = (data) => api.get('/medical/checkup/count', data)
const postSignIn = (data) => api.post(`/auth/request/login`, data)
const getAssessment = (data) => api.get('/asessment/assessment', data)
const getQueryAssessmentTotal = (data) =>
  api.get('/asessment/assessment/query/achievement', data)
const updateToken = (data) => api.post(`/auth/request/updatetoken`, data)
const getUsers = (data) => api.get(`/users/traindriver`, data)

const getPocketBook = (data) => api.get('/operational/pocketbook', data)
const postPocketBook = (data) =>
  api.post('/operational/pocketbook/register', data)
const updatePocketBook = (id, data) =>
  api.put('/operational/pocketbook/' + id, data)
const deletePocketBook = (id) => api.delete('/operational/pocketbook/' + id)
const getInformationUpload = (data) =>
  api.get('/operational/informationupload', data)
const postInformationUpload = (data) =>
  api.post('/operational/informationupload/register', data)
const putInformationUpload = (id, data) =>
  api.put('/operational/informationupload/' + id, data)

const getAbsence = (data) => api.get("/users/absence", data)

export const apis = {
  getCheckup,
  getTrainDriver,
  getCountCheckup,
  getAbsenceSummary,
  getScheduleTrainDriver,
  getQueryAssessmentTotal,
  getHistoryCheckup,
  postSignIn,
  getAssessment,
  getUsers,
  updateToken,
  getPocketBook,
  postPocketBook,
  updatePocketBook,
  deletePocketBook,
  getInformationUpload,
  postInformationUpload,
  putInformationUpload,
  getAbsence
}

export default apis
