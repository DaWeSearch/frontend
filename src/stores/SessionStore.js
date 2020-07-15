const SessionStore = {
  data: {
    username: "",
    authenticationToken: null,
    review: {
      reviewId: null,

    }

  },
  methods: {
    setAuth(token){
      SessionStore.authenticationToken = token
    }
  }
}

export default SessionStore;