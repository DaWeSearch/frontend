<template>
    <div class="score">
    <!--<b-row>                                                                                           
            <b-col ></b-col>
            <b-col ><b-button variant="primary" @click="persist">Persist these {{ pageLength*2 }} out of {{ totalNum }} results</b-button></b-col>
            <b-col ><b-button variant="primary" @click="getPersisted">Retrieve persisted Results</b-button></b-col>
            <b-col ></b-col>
        </b-row>-->
        
        <b-table hover striped small :items="items" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">{{row.item.uri}}</b-link>
            </template>

            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>

            <template v-slot:cell(score)="">
                <!--<b-badge v-for="score in row.item.scores" variant="ownVariant(score)"></b-badge>-->
                <b-badge variant="success">A</b-badge>
                <b-badge variant="success">B</b-badge>
                <b-badge variant="danger">C</b-badge>
                <b-badge variant="light">D</b-badge>
                <b-badge :variant="ownVariant()">E</b-badge>
                <b-badge variant="success">F</b-badge>
            </template>

            <template v-slot:row-details="">
                
                <b-row>
                    <b-col cols="11">
                        <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Comments section is shared with Co-Reviewers"
                        rows="2"
                        max-rows="6"
                        ></b-form-textarea>
                    </b-col>
                    <b-col cols="1">
                        <b-button-group>
                        <b-button :variant="upVariant()" @click="upClicked"><b-icon-hand-thumbs-up></b-icon-hand-thumbs-up></b-button>  <!-- wenn ausgewählt switch zu variant="outline-success"-->
                        <b-button :variant="downVariant()" @click="downClicked"><b-icon-hand-thumbs-down></b-icon-hand-thumbs-down></b-button>  <!-- wenn ausgewählt switch zu variant="outline-danger"-->
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
        fields: ['doi','publicationDate', 'title','authors','publicationName','publisher','uri','score'],
        items: [],
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
        if(SessionStore.data.authKey==null){
            this.$router.push("/login")
        }
        //this.getPersisted()
    },

    methods: {
        getPersisted(){
            this.$http.get('https://pavdg6jfrj.execute-api.eu-central-1.amazonaws.com/dev4/results?review_id=5ecd4bc497446f15f0a85f0d')
            //.then(response => { return console.log(response),response.json(); })
            .then(data => {
                //console.log(data)
                this.perso = data
                this.items = data.data.results
            }).catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
            //console.log(row._showDetails)
        },

        upClicked(){
            if(this.scoreUp==true){
                this.scoreUp=null
            } else {
                this.scoreUp=true
            }

        },

        downClicked(){
            if(this.scoreUp==false){
                this.scoreUp=null
            } else {
                this.scoreUp=false
            }

        },

        upVariant(){
            if(this.scoreUp==true){
                return "outline-success"
            }
            return "light"
        },

        downVariant(){
            if(this.scoreUp==false){
                return "outline-danger"
            }
            return "light"
        },

        ownVariant(){
            if(this.scoreUp==true){
                return "success"
            } else if(this.scoreUp==false){
                return "danger"
            }
            return "light"
        }
    },
    components:{
    }
}
</script>