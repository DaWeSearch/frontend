const SessionStore = {
  data: {
    username: null,
    authenticationToken: null,
    reviewId: null
  },
  methods: {
    setAuth(token){
      SessionStore.authenticationToken = token
    }
  }
}

export default SessionStore;