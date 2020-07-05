const SessionStore = {
    data: {
        username: null,
        authKey: null,
        reviewId: null
    },
    methods: {
        setAuth(token){
            SessionStore.authKey = token
        }

/*
        myLoginRoutine = user => new Promise ((resolve, reject) => {
            axios({url: 'auth', data: user, method: 'POST' })
              .then(resp => {
                const token = resp.data.token
                localStorage.setItem('user-token', token) // store the token in localstorage
                resolve(resp)
              })
            .catch(err => {
              localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
              reject(err)
            })
        })*/
    }
}

export default SessionStore;