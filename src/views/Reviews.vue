<template>
    <div id="reviews">
        <b-nav tabs >
            <b-nav-item active><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item> <router-link to="/score">Score</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
        </b-nav>

        
        <b-card v-for="(review,index) in reviews" :key="getReviewId(review)"
        class="m-5"
        :header="review.name"
        header-tag="header" 
        footer-tag="footer"
        >   
            <p>{{review.owner}}</p>
            <p>{{review.description}}</p>
            <p>{{review.result_collection}}</p>


            <b-button @click="search(review)">Search and select publications</b-button>
            <b-button @click="score(review)">Score selected publications</b-button>
            
            <template v-slot:footer>
                <b-form-input type="text"></b-form-input>
                <b-button @click="addUserToReview(review)" variant="primary">Add user</b-button>
                <b-button @click="deleteReview(review,index)" variant="primary">Delete review</b-button>
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
            reviews: [  /*{"name": "New Review 1", // static for development
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Add review test 1",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0a"},
                        "_cls": "functions.db.models.Review"
                        },
                        {"name": "New Review 2",
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Add review test 2",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0b"},
                        "_cls": "functions.db.models.Review"
                        },
                        {"name": "New Review 3",
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Add review test 3",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0c"},
                        "_cls": "functions.db.models.Review"
                        }*/
            ]
        }
    },

    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            console.log("review to login")
            this.$router.push("/login")
        }
        else{
            this.getReviews();                              //AUTO GET REVIEWS REQUESTS INACTIVE FOR DEVELOPEMENT
            console.log("load reviews")           
        }
    },

    methods: {
        getReviews(){
            this.$http.get(`/users/${SessionStore.data.username}/reviews`)
            .then(data => {console.log("get reviews");
                            console.log(data.data.reviews);
                            this.reviews = data.data.reviews[0];//reviews sind in ansonsten lehrer liste irgendwie
                            })
            .catch(error => {console.log(error);}); 
        },

        getReviewId(reviewToIdentify){
            return reviewToIdentify["_id"]["$oid"]
        },

        search(reviewToSearchIn){
            SessionStore.data.reviewId = this.getReviewId(reviewToSearchIn)
            console.log(`search in review ${SessionStore.data.reviewId}`)
            this.$router.push("/search") // später reviews/reviewname/search waere cool
        },

        score(reviewToScoreIn){
            SessionStore.data.reviewId = this.getReviewId(reviewToScoreIn)
            console.log(`score in review ${SessionStore.data.reviewId}`)
            this.$router.push("/score") // später reviews/reviewname/score waere cool
        },

        createReview() {
            this.$http.post("/review",{"owner_name":SessionStore.data.username,"name": this.newReviewName, "description": this.newReviewDescription})
            .then(data => {console.log("add review");
                            console.log(data.data);
                            this.reviews.push(data.data)
                            })
            .catch(error => {console.log(error);});
        },

        deleteReview(reviewToDelete,index) {
            console.log(reviewToDelete)
            console.log(`delete review ${index} id ${this.getReviewId(reviewToDelete)}`);
            this.reviews.splice(index,1)
            this.$http.delete(`/review/${this.getReviewId(reviewToDelete)}`)
            .then(data => console.log(data))
            .catch(error => {console.log(error);});
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