<template>
    <div class="score">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item active disabled>Score</b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
            <b-button squared class="ml-auto" variant="">Log out</b-button>
    
        </b-nav>

        <b-spinner v-if="persistedLoading" class="mx-auto my-5" label="Spinning"></b-spinner>
        
        <b-table hover striped small :items="items" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">{{row.item.uri}}</b-link>
            </template>

            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>

            <template v-slot:cell(score)="row">
                <!--<b-badge v-for="score in row.item.scores" variant="ownVariant(score)"></b-badge>-->
                <b-badge variant="success">A</b-badge>
                <b-badge variant="success">B</b-badge>
                <b-badge variant="danger">C</b-badge>
                <b-badge variant="light">D</b-badge>
                <b-badge :variant="ownVariant(row.item.score)">E</b-badge>
                <b-badge variant="success">F</b-badge>
            </template>

            <template v-slot:row-details="row">
                
                <b-row>
                    <b-col cols="11">
                        <b-form-textarea
                        id="textarea"
                        v-model="row.item.comment"
                        placeholder="Comments section is shared with Co-Reviewers"
                        rows="2"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-col>
                    <b-col cols="1">
                        <b-button-group>
                        <b-button :variant="upVariant(row.item.score)" @click="upClicked(row.item)"><b-icon-hand-thumbs-up></b-icon-hand-thumbs-up></b-button>  <!-- wenn ausgewählt switch zu variant="outline-success"-->
                        <b-button :variant="downVariant(row.item.score)" @click="downClicked(row.item)"><b-icon-hand-thumbs-down></b-icon-hand-thumbs-down></b-button>  <!-- wenn ausgewählt switch zu variant="outline-danger"-->
                        </b-button-group>
                        <b-button pill>Save</b-button>
                    </b-col>
                </b-row>
                
                <!--             ABSTRACT NICHT NOETIG WEIL MAN SICH ZEIT NIMMT  --- bei nutzung v-slot:row-details="row" in template tage packen
                <b-row>
                <b-col cols="1"></b-col>
                <b-col cols="10"><p>{{row.item.abstract}}</p></b-col>
                <b-col cols="1"></b-col>
                </b-row>-->
            </template>

        </b-table>
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
        items: [/*{'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
              {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
              {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
              {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
              */],
        text: "",
        pagecount: 0,
        displayedPage: 1,
        pageLength: 100,
        scoreUp: null,
        perso: null,
        //totalNum: 0 num of persisted entries on db
        //user_id,reviewinternal_user_id,review_id
        };
    },


    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            this.$router.push("/login")
        }
        else{
            //getPersisted();
        }
    },

    methods: {
        getPersisted(){
            console.log("get persisted in score")
            this.persistedLoading = true
            this.$http.get('/results?review_id=5ecd4bc497446f15f0a85f0d')
            .then(data => {
                this.items = data.data.results
                this.persistedLoading = false
            }).catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
            //console.log(row._showDetails)
        },

        upClicked(item){
            if(item.score==true){
                item.score=null
            } else {
                item.score=true
            }

        },

        downClicked(item){
            if(item.score==false){
                item.score=null
            } else {
                item.score=false
            }

        },

        upVariant(score){
            if(score==true){
                return "outline-success"
            }
            return "light"
        },

        downVariant(score){
            if(score==false){
                return "outline-danger"
            }
            return "light"
        },

        ownVariant(score){
            if(score==true){
                return "success"
            } else if(score==false){
                return "danger"
            }
            return "light"
        }
    },
    components:{
    }
}
</script>