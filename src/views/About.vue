<template>
  <div class="about">
    <b-nav tabs >
      <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
      <b-nav-item disabled><router-link to="/reviewinfo">ReviewInfo</router-link></b-nav-item>
      <b-nav-item disabled><router-link to="/search">Search</router-link></b-nav-item>
      <b-nav-item disabled> <router-link to="/score">Score</router-link></b-nav-item>
      <b-nav-item active><router-link to="/about">About</router-link></b-nav-item>
    </b-nav>
    <h1>You should 
      <b-nav-item><router-link to="/login">log in</router-link></b-nav-item></h1>

  </div>
</template>
