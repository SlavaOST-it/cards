import axios from "axios";


export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const forgotPassAPI = {
    sendEmail(email: string) {
        return axios.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`,
            {
                email: email,
                message: "`<h3>password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></h3>`"
            })
            .then(res=>res.data)
    }
}

