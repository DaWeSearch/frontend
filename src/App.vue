<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Reviews</router-link> |
      <router-link to="/reviewinfo">ReviewInfo</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/score">Score</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/about">About</router-link> 
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #17a2b8/*2c3e50*/;
}

router-link {
  color: red;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
