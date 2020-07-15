<template>
    <div class="score">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item active disabled>Score</b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
            <b-button squared class="ml-auto" variant="">Log out</b-button>
    
        </b-nav>
        
        <b-table hover striped small :items="items" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">

            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">Click</b-link>
            </template>

            <template v-slot:cell(score)="row">
                {{row.item.score}}/5
            </template>

            <template v-slot:row-details="row">
                
                <b-row>
                    <b-col cols="10">
                        <b-form-textarea
                        id="textarea"
                        v-model="row.item.comment"
                        placeholder="Comments section is shared with Co-Reviewers"
                        rows="2"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-col>
                    <b-col cols="2">
                        <b-form-rating v-model="row.item.score"></b-form-rating>
                        <b-button pill>Save</b-button>
                    </b-col>
                </b-row>
                
                <!--             ABSTRACT NICHT NOETIG WEIL MAN SICH ZEIT NIMMT  --- bei nutzung v-slot:row-details="row" in template tage packen-->
                <b-row>
                <b-col cols="1"></b-col>
                <b-col cols="10"><p>{{row.item.abstract}}</p></b-col>
                <b-col cols="1"></b-col>
                </b-row>
            </template>

        </b-table>
        
        <b-spinner v-if="persistedLoading" class="mx-auto my-5" label="Spinning"></b-spinner>

        <p v-if="!persistedLoading && items.length==0" class="mt-5 mx-auto">NO PUBLICATIONS PERSISTED YET</p>
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
        items: [],
        text: "",
        pagecount: 0,
        displayedPage: 1,
        pageLength: 100,
        scoreUp: null,
        perso: null,
        totalNum:0 //0 num of persisted entries on db
        //user_id,reviewinternal_user_id,review_id
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
                this.items = data.data.results
                this.totalNum = data.data.total_results
                this.persistedLoading = false
            }).catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
        }
    }
}
</script>