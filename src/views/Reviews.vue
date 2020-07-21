<template>
    <div id="reviews">
        <b-nav id="nav">
            <b-nav-item active disabled>Reviews</b-nav-item>
            <b-nav-item class="ml-auto"><b-link to="/about">About</b-link></b-nav-item>
            <b-button squared  variant="">Log out</b-button>
        </b-nav>

        <b-container>
            <b-card class="mt-3 mb-5"
            header="Create review">
                <b-row>
                    <b-col>
                        <b-form-input type="text" v-model="newReviewName" placeholder="Name of new Review"></b-form-input>
                    </b-col>
                    <b-col>
                        <b-button variant="info" @click="createReview()">Create</b-button>
                    </b-col>
                </b-row>
                <b-form-textarea class="my-3" type="text" v-model="newReviewDescription" placeholder="Description of new Review"></b-form-textarea>
            </b-card>

            <b-spinner v-if="reviewsLoading" class="mx-auto my-5" label="Spinning"></b-spinner>

            <b-row>
                <b-col class="mb-3" v-for="(review,index) in reviews" :key="getReviewId(review)" cols="6">
                    <b-card 
                    :title="review.name"
                    footer-tag="footer"
                    >   
                        <p>Created by {{review.owner}}</p>
                        <p>{{review.description}}</p>
                        <!--<p>{{review.result_collection}}</p>-->

                        
                        <template v-slot:footer>
                            <b-row>
                                <b-col>
                                    <b-input-group block class="m-1">
                                        <b-form-input v-model="review.newUser" placeholder="Username to add"></b-form-input>
                                        <b-input-group-append>
                                            <b-button @click="addUserToReview(review)"><b-icon-plus-circle-fill> </b-icon-plus-circle-fill></b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b-button block class="m-1" @click="deleteReview(review,index)" >Delete review</b-button>
                                </b-col>
                                <b-col>
                                    <b-button block class="m-1" variant="info" @click="search(review)">Search for publications</b-button>
                                    <b-button block class="m-1" variant="info" @click="score(review)">Score selected publications</b-button>
                                </b-col>
                            </b-row>
                        </template>
                    </b-card>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>


<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: "Reviews",
    data: () => {
        return {
            reviewsLoading: true,
            newReviewName: "",
            newReviewDescription: "",
            reviews: [  /*{"name": "New Review 1", // static for development     REVIEWS KÖNNTE MAN AUCH IM SESSION STORE SPEICHERN DAMIT NICHT JEDES MAL GEPULLT WERDEN MUSS
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
            this.reviews = []
            this.reviewsLoading = true

            this.$http.get(`/users/${SessionStore.data.username}/reviews`)
            .then(data => {console.log("get reviews");
                            this.reviews = data.data.reviews[0];//reviews sind in ansonsten lehrer liste irgendwie
                            this.reviewsLoading = false
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
            if(this.newReviewName.length > 0){
                this.$http.post("/review",{"owner_name":SessionStore.data.username,"name": this.newReviewName, "description": this.newReviewDescription})
                .then(data => {console.log("add review");
                                this.reviews.push(data.data)
                                })
                .catch(error => {console.log(error);});
            }
            else{
                console.log("cant create review without reviewname")
            }
        },

        deleteReview(reviewToDelete,index) {
            console.log(`delete review ${index} id ${this.getReviewId(reviewToDelete)}`);
            this.reviews.splice(index,1)
            this.$http.delete(`/review/${this.getReviewId(reviewToDelete)}`)
            .then(console.log("deleted"))
            .catch(error => {console.log(error);});
        },

        addUserToReview(reviewToAddUsernameTo) {
            if(reviewToAddUsernameTo.newUser.length > 0){
                console.log(`add user ${null} to review id ${this.getReviewId(reviewToAddUsernameTo)}`);
                this.$http.post(`review/${this.getReviewId(reviewToAddUsernameTo)}/collaborator?username=${reviewToAddUsernameTo.newUser}`)
                .then(console.log("added user"))
                .catch(error => {console.log(error)});
            }
            else{
                console.log("cant add user without username")
            }
        },
    }
}
</script>


<style >

</style>