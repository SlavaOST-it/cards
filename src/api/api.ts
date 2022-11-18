import axios from "axios";


export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
// export const auth = {
//     getProfile() {
//         return instance.post(`/auth/me`)
//             .then(res => res.data)
//     },
//
//
//     loginez() {
//         return instance.post(`/auth/login`, {
//             email: "slavaost-it@mail.ru",
//             password: "slavkent_1990_@",
//             rememberMe: true
//         }).then(res => res.data)
//     }
// }

// export const profileAPI = {
//     changeName(newName: string) {
//         return instance.put(`/auth/me`, {name: newName})
//             .then(res => res.data)
//     },
//     updatePhoto(avatar: string) {
//         return instance.put(`/auth/me` + avatar)
//             .then(res => res.data)
//     }
// }