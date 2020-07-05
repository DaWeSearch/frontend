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
        :header="review.name"
        header-tag="header" 
        footer-tag="footer"
        >
            <p>{{review.description}}</p>
            <p>Teilnehmer erstellungsdatum und link zu den searches und dem scoring bereich</p>


            <b-nav-item><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item> <router-link to="/score">Score</router-link></b-nav-item>
            
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
            reviews: [  {"name": "New Review 1",
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
                        }
            ]
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
            this.$http.post("https://vqvodc972j.execute-api.eu-central-1.amazonaws.com/dev12/review",{"owner_name":SessionStore.data.username,"name": this.newReviewName, "description": this.newReviewDescription})
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