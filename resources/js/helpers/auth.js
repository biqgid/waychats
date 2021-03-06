export function registerUser(credentials){
    return new Promise((res,rej)=>{
        axios.post('/api/auth/register', credentials)
            .then(response => {
                res(response.data);
            })
            .catch(err => {
                rej(err.response.data.errors)
            })
    })
}

export function login(credentials){
    return new Promise((res,rej)=>{
        axios.post('/api/auth/login', credentials)
            .then(response => {
                res(response.data);
            })
            .catch(err => {
                rej('Телефон или пароль введены не правельно')
            })
    })
}

export function getLoggedinUser(){
    const userStr = localStorage.getItem('user');

    if(!userStr){
        return null
    }

    return JSON.parse(userStr);
}
