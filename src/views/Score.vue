<template>
    <div class="score">
        <b-nav id="nav">
            <b-nav-item><b-link to="/">Reviews</b-link></b-nav-item>
            <b-nav-item>></b-nav-item>
            <b-nav-item active disabled>Score</b-nav-item>
            <b-nav-item class="ml-auto"><b-link to="/about">About</b-link></b-nav-item>
            <b-button squared @click="logout()">Log out</b-button>
        </b-nav>
        
        <b-table hover striped small :items="tableItems" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">

            <template v-slot:cell(doi)="row">
                {{ row.item["_id"] }}
            </template>
        
            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">Click</b-link>
            </template>

            <template v-slot:cell(score)="row">
                {{row.item.averageScore}}/5 by {{row.item.numberOfScores}}
            </template>

            <template v-slot:row-details="row">
                <b-container>
                    <b-row>
                        <b-col cols="10">
                            <b-form-textarea
                            id="textarea"
                            v-model="row.item.ownComment"
                            placeholder="Write your comment here"
                            rows="1"
                            max-rows="6"
                            ></b-form-textarea>
                        </b-col>
                        <b-col cols="2">
                            <b-form-rating v-model="row.item.ownScore"></b-form-rating>
                            <b-button pill @click="updateScore(row.item)">Save</b-button>
                        </b-col>
                    </b-row>

                    <b-row class="my-3">
                        <b-col cols="1"></b-col>
                        <b-col cols="10"><p>{{row.item.abstract}}</p></b-col>
                        <b-col cols="1"></b-col>
                    </b-row>

                    <b-row class="my-3" v-for="score in row.item.scores" :key="score.user">
                        <b-col cols="2">
                            {{score.user}}
                            <b-form-rating v-model="score.score" readonly></b-form-rating>
                        </b-col>
                        <b-col cols="10">
                            <b-form-textarea
                            plaintext :value="score.comment"
                            rows="1"
                            max-rows="6"
                            ></b-form-textarea>
                        </b-col>
                    </b-row>

                </b-container>
            </template>

        </b-table>
        
        <b-spinner v-if="persistedLoading" class="mx-auto my-5" label="Spinning"></b-spinner>

        <p v-if="!persistedLoading && tableItems.length==0" class="mt-5 mx-auto">NO PUBLICATIONS PERSISTED YET</p>
    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: 'Score',
    data: () => {
        return {
            persistedLoading: true,
            fields: ['doi','publicationDate', 'title','authors','publicationName','publisher','uri','score'],
            tableItems: [],
            pagecount: 0,
            displayedPage: 1,
            pageLength: 300,
        };
    },


    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            console.log("need to log in before scoring")
            this.$router.push("/login")
        }
        else if(SessionStore.data.reviewId==null){
            console.log("need to select rewview before scoring")
            this.$router.push("/")
        }
        else{
            this.getPersisted();
        }
    },

    methods: {
        getPersisted(){
            this.persistedLoading = true
            console.log("get persisted in score")
            this.$http.get(`/results/${SessionStore.data.reviewId}?page=1&page_length=50`)
            .then(data => {
                console.log(data)

                this.totalNum = data.data.total_results

                let rawItems = data.data.results
                rawItems.forEach(publication => {
                    let oldScoreFound = false
                    publication.averageScore = 0 
                    publication.numberOfScores = 0 

                    if(publication.scores != undefined){
                        publication.numberOfScores = publication.scores.length
                        let sumOfScores = 0

                        let ownIndex = -1
                        for(let i=0; i<publication.scores.length; i++){
                            sumOfScores += publication.scores[i].score
                            if(publication.scores[i].user==SessionStore.data.username){
                                ownIndex = i
                                oldScoreFound = true
                            }
                        }

                        if(ownIndex!=-1){
                            publication.ownScore = publication.scores[ownIndex].score
                            publication.ownComment = publication.scores[ownIndex].comment
                            publication.scores.splice(ownIndex,1)
                        }


                        publication.averageScore = sumOfScores / publication.numberOfScores
                    }

                    else{
                        publication.scores = []
                    }
                    
                    if(!oldScoreFound){
                        publication.ownScore = 0
                        publication.ownComment = ""
                    }
                });

                this.tableItems = rawItems
                this.persistedLoading = false
            }).catch(error => console.log(error))
        },

        updateScore(publication){
            this.$http.post(`/score/${SessionStore.data.reviewId}?doi=${publication["_id"]}`,{"username":SessionStore.data.username,"score":publication.ownScore,"comment":publication.ownComment})
            .then(() => {console.log(`Set in doi ${publication["_id"]} score for ${SessionStore.data.username} to ${publication.ownScore} and comment to ${publication.ownComment}`);
                    publication.numberOfScores = publication.scores.length + 1
                    let sumOfScores = publication.ownScore
                    publication.scores.forEach(element => {
                        sumOfScores +=element.score                      
                    });
                    publication.averageScore = sumOfScores/publication.numberOfScores
                })
            .catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
        },

        logout(){
            console.log("logout at score page")
            SessionStore.methods.setNull()
            this.$router.push("/login")
        }
    }
}
</script>