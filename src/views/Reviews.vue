<template>
    <div id="reviews">
        <b-nav tabs >
            <b-nav-item active><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item> <router-link to="/score">Score</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
        </b-nav>

        
        <b-card v-for="review in reviews" :key="review.reviewId"
        class="m-5"
        header="Review title"
        header-tag="header" 
        footer-tag="footer"
        >
            Teilnehmer erstellungsdatum und link zu den searches und dem scoring bereich
            <template v-slot:footer="review">
                <b-form-input type="text"></b-form-input>
                <b-button @click="addUser(review)" variant="primary">Add user</b-button>
                <b-button @click="deleteReview(review)" variant="primary">Delete review</b-button>
            </template>
        </b-card>

        
        <b-form-input type="text" v-model="newReviewName"></b-form-input>
        <b-form-input type="text" v-model="newReviewDescription"></b-form-input>
        <b-button type="button" variant="primary" @click="createReview()">Create review</b-button>
    </div>
</template>


<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: "Reviews",
    data: () => {
        return {
            newReviewName: "",
            newReviewDescription: "",
            reviews: [{reviewId:1},{reviewId:2}]
        }
    },

    beforeMount() {
        if(SessionStore.data.authKey==null){
            this.$router.push("/login")
        }
        else{
            //this.$http.get(`https://vqvodc972j.execute-api.eu-central-1.amazonaws.com/dev12/users/${SessionStore.data.username}/reviews`)
            //.then(data => {console.log("get reviews");
            //                console.log(data.data.reviews);
            //                this.reviews = data.data.reviews;
            //                })
            //.catch(error => {console.log(error);}); 
            console.log("else")           
        }
    },

    methods: {
        createReview() {
            this.$http.post("https://rct0t0kff3.execute-api.eu-central-1.amazonaws.com/dev/review",{"name": this.newReviewName, "description": this.newReviewDescription})
            .then(data => {console.log("add review");
                            console.log(data.data);
                            })
            .catch(error => {console.log(error);});  
        },

        deleteReview(review) {
            console.log(review)
        },

        addUserToReview(review) {
            console.log(review)
        },
    },

    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>


<style >

</style>