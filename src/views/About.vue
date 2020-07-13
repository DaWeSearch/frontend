<template>
  <div class="about">
    <b-nav tabs >
      <b-nav-item disabled><router-link to="/">Reviews</router-link></b-nav-item>
      <b-nav-item disabled><router-link to="/search">Search</router-link></b-nav-item>
      <b-nav-item disabled> <router-link to="/score">Score</router-link></b-nav-item>
      <b-nav-item active><router-link to="/about">About</router-link></b-nav-item>
      <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
    </b-nav>
    <b-jumbotron header="DaWeSearch" lead="A tool accelerating your structured literature review">
      <b-button variant="primary" href="/login">Get started!</b-button>
    </b-jumbotron>
    <b-embed
            type="iframe"
            aspect="16by9"
            src="https://www.youtube.com/watch?v=2NmDlsy_Igw"
            allowfullscreen
    ></b-embed>




  </div>
</template>
