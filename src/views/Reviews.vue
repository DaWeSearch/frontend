<template>
    <div id="reviews">
        <b-nav tabs >
            <b-nav-item active><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item> <router-link to="/score">Score</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
        </b-nav>

        <!-- img-src="https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_1280.jpg" -->
        <b-card v-for="review in reviews" :key="getReviewId(review)"
                overlay
                img-src="https://upload.wikimedia.org/wikipedia/commons/3/3e/UB_TU_Berlin_Innenhof.JPG"
                img-alt="Card Image"
                text-variant="white"
                :title= review.owner
                :sub-title=review.description
        class="m-5"
        :header="review.name"
        header-tag="header"
        footer-tag="footer"
        >
            <p>{{review.result_collection}}</p>
            <p>Teilnehmer erstellungsdatum und link zu den searches und dem scoring bereich</p>


            <b-button @click="search(review)">Search and select publications</b-button>
            <b-button @click="score(review)">Score selected publications</b-button>
            
            <template v-slot:footer="review">
                <b-form-input type="text"></b-form-input>
                <b-button @click="addUserToReview(review)" variant="primary">Add user</b-button>
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
            reviews: [  {"name": "New Review 1", // static for development
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Description 1",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0a"},
                        "_cls": "functions.db.models.Review"
                        },
                        {"name": "New Review 2",
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Description 2",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0b"},
                        "_cls": "functions.db.models.Review"
                        },
                        {"name": "New Review 3",
                        "owner": "testu",
                        "result_collection": "results-None",
                        "description": "Description 3",
                        "_id": {"$oid": "5f01fde055e9c2fbc462ad0c"},
                        "_cls": "functions.db.models.Review"
                        }
            ]
        }
        },

    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            console.log("review to login")
            this.$router.push("/login")
        }
        else{
            //this.getReviews();                              //AUTO GET REVIEWS REQUESTS INACTIVE FOR DEVELOPEMENT
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

        getReviewId(review){
            return review["_id"]["$oid"]
        },

        search(review){
            SessionStore.data.reviewId = this.getReviewId(review)
            this.$router.push("/search") // später reviews/reviewname/search waere cool
        },

        score(review){
            SessionStore.data.reviewId = this.getReviewId(review)
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

        deleteReview(review) {
            this.$http.delete(`review/${SessionStore.data.reviewId}`)
                .then(data => {console.log("add review");
                    console.log(data.data);
                    this.reviews.push(data.data)
                })
            console.log(review)
        },

        addUserToReview(review) {
            this.$http.post(`/review/${SessionStore.data.reviewId}/collaborator`, {"username": SessionStore.data.username})
                .then(data => {console.log("add review");
                    console.log(data.data);
                    this.reviews.push(data.data)
                })
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