<template>
    <div id="app">

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
            password: ""
        };
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            console.log("hier post login")
            //this.$http.post('',this.form)
            //.then(data => {console.log("hier ist ein signupresponse")})
            //.catch(error => console.log(error))
        },
        printAuthKey(){
            console.log(SessionStore.data.authKey)
        }
    },
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
