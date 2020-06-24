const SessionStore = {
    data: {
        userId: null,
        authKey: null,
    },
    methods: {
        checkUserId(){
            return SessionStore.data.userId == null
        }
    }
}

export default sessionStore;