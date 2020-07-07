<template>
    <div id="app">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item disabled><router-link to="/reviewinfo">ReviewInfo</router-link></b-nav-item>
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
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>

                <template v-slot:footer>
                    <router-link to="/signup">Signup</router-link>
                </template>
            </b-card>
        </div>
        <!-- erstes beispiel-->
        <div>
            <cloud :data="words"
                   :fontSizeMapper="fontSizeMapper"
                    />
        </div>
        <!-- zweites bsp -->
        <wordcloud
                :data="defaultWords"
                nameKey="name"
                valueKey="value"
                :color="myColors"
                :showTooltip="true"
                :wordClick="wordClickHandler">
        </wordcloud>
        <b-card
        class="mx-auto">
        <MapChart
                :countryData="{'US': 4, 'CA': 7, 'GB': 8, 'IE': 14, 'ES': 21, 'DE':90 }"
                highColor="#ff0000"
                lowColor="#aaaaaa"
                countryStrokeColor="#909090"
                defaultCountryFillColor="#dadada"
        ></MapChart>
        </b-card>


    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"
//import * as d3 from "d3";
// https://www.npmjs.com/package/vue-d3-cloud
// https://github.com/d3/d3/wiki
import Cloud from 'vue-d3-cloud'
import wordcloud from 'vue-wordcloud'
import MapChart from 'vue-map-chart'
export default {
    name: 'Login',
    data: () => {
        return {
            username: "",
            password: "",
            myColors: ['#000000', '#0000000', '#0000000', '#0000000'],
            defaultWords: [
                {"name": "Bitcoin","value": 12},
                {"name": "Ethereum","value": 14},
                {"name": "Blockchain","value": 15},
                {"name": "Dawesys","value": 17},
                {"name": "ProgPra","value": 21},
                {"name": "serverless","value": 13},
                {"name": "aws","value": 12},
                {"name": "cookies","value": 12},
                {"name": "mathe","value": 11},
                {"name": "bib","value": 7},
                {"name": "mensa","value": 8},
                {"name": "TU ","value": 4},
                {"name": "HU","value": 3},
            ],
            words: [
                { text: 'Bitcoin', value: 1000 },
                { text: 'Ethereum', value: 200 },
                { text: 'blockchain', value: 800 },
                { text: 'very cool', value: 1000000 },
                { text: 'dawesys', value: 463 },
                { text: 'corona', value: 234 },
                { text: 'gruppenarbeit', value: 142 },
                { text: 'kekse', value: 100 },
            ],

            //größe der wörter beispiel 1
            fontSizeMapper: word => Math.log2(word.value) * 5,
        }
    },
    methods: {
        onSubmit(evt){
            evt.preventDefault()
            this.$http.post('https://vocxdyh56a.execute-api.eu-central-1.amazonaws.com/dev/login',{"username":this.username,"password":this.password})
            .then(data => {console.log("hier ist ein signupresponse");SessionStore.data.authKey=data})
            .catch(error => console.log(error));
        },
        wordClickHandler(name, value, vm) {
            console.log('wordClickHandler', name, value, vm);
        },
        printAuthKey(){
            console.log(SessionStore.data.authKey)
        }
    },
    components: {
        Cloud,
        wordcloud,
        MapChart,
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
