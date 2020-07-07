const SessionStore = {
  data: {
    username: "testu",
    authenticationToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3R1IiwiZXhwIjoxNTk0MDkyMDgyfQ.DIhEzSXzqEfbJ-EKDrysuCRh_XMRIFuvTZ12zbOcx1g",
    reviewId: null
  },
  methods: {
    setAuth(token){
      SessionStore.authenticationToken = token
    }
  }
}

export default SessionStore;