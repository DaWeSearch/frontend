<template>
    <div id="app">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item disabled><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item disabled> <router-link to="/score">Score</router-link></b-nav-item>
            <b-nav-item active><router-link to="/about">About</router-link></b-nav-item>
        </b-nav>

        <div class="mt-5 d-flex">
            <b-card 
            class="mx-auto"
            header="Log in"
            header-tag="header" 
            footer-tag="footer"
            >
                <b-form @submit="onSubmit">
                    <b-form-input class="mb-2" required v-model="username" placeholder="Username"></b-form-input>
                    <b-form-input class="mb-2" required v-model="password" placeholder="Password" type="password"></b-form-input>
                    <b-alert v-model="loginError" variant="danger" dismissible>Could not log in!</b-alert>
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>


                <template v-slot:footer>
                    <router-link to="/signup">Signup</router-link>
                </template>
            </b-card>
        </div>

    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: 'Login',
    data: () => {
        return {
            username: "",
            password: "",
            loginError: false
        };
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            this.$http.post('/login',{"username":this.username,"password":this.password})
            .then(data => {console.log("hier ist ein login");
                            SessionStore.data.authenticationToken=data.data;
                            //this.$http.defaults.headers.common["authorizationToken"]=SessionStore.data.authenticationToken;
                            SessionStore.data.username=this.username;
                            console.log(SessionStore.data.authenticationToken);
                            this.$router.push("/")
                            }
            )
            .catch(error => {console.log(error);
                            this.loginError=true;
                            SessionStore.data.authenticationToken=null;
                            SessionStore.data.username=null;
                            }
                    );
        }
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
