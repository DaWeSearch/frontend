const SessionStore = {
  data: {
    username: null,
    authenticationToken: null,
    reviewId: null,
  },
  methods: {
    setNull(){
      SessionStore.data.username= null;
      SessionStore.data.authenticationToken= null;
      SessionStore.data.reviewId= null
    }
  }
}

export default SessionStore;