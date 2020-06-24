<template>
    <div id="app">

        <div class="mt-5 d-flex">
            <b-card 
            class="mx-auto"
            header="Sign up"
            header-tag="header"
            footer-tag="footer"
            >
                <b-form @submit="onSubmit">
                    <b-form-input class="mb-2" required v-model="form.username" placeholder="Username"></b-form-input>
                    <b-form-input class="mb-2" required v-model="form.email" type="email" placeholder="Email"></b-form-input>
                    <b-form-input class="mb-2" required v-model="passwordConfirm" type="password" placeholder="Password" ></b-form-input>
                    <b-form-input class="mb-2" required v-model="form.password" type="password" placeholder="Repeat password" :state="passwordsEqual()"></b-form-input>

                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>

                <template v-slot:footer>
                    <router-link to="/login">Login</router-link>
                </template>
            </b-card>
        </div>

    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: 'Register',
    data: () => {
        return {
            form: {
                username: "",
                email: "",
                password: ""
            },
            passwordConfirm: ""
        };
    },

    methods: {
        onSubmit(evt){
            
            evt.preventDefault()
            console.log(this.passwordsEqual())
            //this.$http.post('',this.form)
            //.then(data => {console.log("hier ist ein signupresponse")})
            //.catch(error => console.log(error))
        },
        passwordsEqual(){
            return this.form.password.length!=0 ? this.form.password==this.passwordConfirm : null
        },
        printAuthKey(){
            console.log(SessionStore.data.authKey)
        }
        
    },

    computed: {
    },

    components: {
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
