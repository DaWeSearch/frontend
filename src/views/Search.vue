<template>
    <div class="search">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item active><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item> <router-link to="/score">Score</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
    
        </b-nav>
        <b-row>                                                                                           
            <b-col ></b-col>
            <b-col ><b-button variant="primary" @click="persist">Persist these {{ pageLength*2 }} out of {{ totalNum }} results</b-button></b-col>
            <b-col ><b-button variant="primary" @click="getPersisted">Retrieve persisted Results</b-button></b-col>
            <b-col ></b-col>
        </b-row>

        <div class="mt-5">
            <b-form @submit="onSubmit">


            <b-card 
            class="mx-auto"
            header-tag="header" 
            footer-tag="footer"
            >
                <template v-slot:header>
                    <p>Aspects</p>
                </template>

                    <b-row>
                    <!--                                                              EXCLUDE

                    <b-col>
                        <b-card 
                        class="mx-auto"
                        header="exclude"
                        header-tag="header" 
                        footer-tag="footer"
                        >

                            
                                <p v-for="synonym in aspect.search_terms" :key="synonym" class="mb-2">{{synonym}}</p>

                            <template v-slot:footer>
                                <b-form-input v-model="newField" placeholder="First element of new group"></b-form-input> <b-button>Add search group</b-button>
                            </template>
                        </b-card>
                    </b-col>-->

                    <b-col v-for="aspect in searchObject.aspects.search_groups" :key="aspect.search_terms" cols="6">
                    <b-card 
                    class="mx-auto"
                    header-tag="header" 
                    footer-tag="footer"
                    >
                        <template v-slot:header>
                            <b-button-group>
                                <b-button :variant="upVariant(searchObject.aspects.match)" @click="upClicked(searchObject.aspects)">AND</b-button>  <!-- wenn ausgewählt switch zu variant="outline-success"-->
                                <b-button :variant="downVariant(searchObject.aspects.match)" @click="downClicked(searchObject.aspects)">OR</b-button>  <!-- wenn ausgewählt switch zu variant="outline-danger"-->
                            </b-button-group>
                        </template>

                        
                            <p v-for="synonym in aspect.search_terms" :key="synonym" class="mb-2">{{synonym}}</p>

                        <template v-slot:footer>
                            <b-form-input v-model="newField" placeholder="First element of new group"></b-form-input> <b-button>Add search group</b-button>
                        </template>
                    </b-card>
                    </b-col>

                    </b-row>

                <template v-slot:footer>
                    <b-form-input v-model="newField" placeholder="First element of new group"></b-form-input> <b-button>Add search group</b-button>
                </template>
            </b-card>
            
            <b-button type="submit" variant="primary">Submit</b-button>
            
            
            </b-form>
        </div>











        
        
        <b-table fixed hover striped small :items="items" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">{{row.item.uri}}</b-link>
            </template>

            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>

            <template v-slot:row-details="row">
                <b-row>
                    <b-col cols="1"></b-col>
                    <b-col cols="10"><p>{{row.item.abstract}}</p></b-col>
                    <b-col cols="1"></b-col>
                </b-row>
            </template>

        </b-table>
    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: 'Search',
    data: () => {
        return {
            field:"",
            newField: "",
            searchObject: {
                "aspects": {
                    "search_groups": [
                        {
                            "search_terms": ["blockchain", "distributed ledger"],
                            "match": "OR"
                        },
                        {
                            "search_terms": ["energy", "infrastructure", "smart meter"],
                            "match": "OR"
                        }
                    ],
                    "match": "AND"
                },
                "page": 1,
                "page_length": 100
            },
            fields: ['doi','publicationDate', 'title','authors','publicationName','publisher','uri'],
            items: [{'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
                {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
                {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."},
                {'publicationDate':"demodummydata", 'title':"demodummydata",'authors':["demodummydata","demodummydata"],'publisher':"demodummydata",'uri':"demodummydata",'contentType':"demodummydata", 'genre':"demodummydata",'score':null,"comment":"dummycomment","abstract":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}],
            text: "",
            pagecount: 0,
            displayedPage: 1,
            pageLength: 100,
            scoreUp: null,
            perso: null,
            totalNum: 0// num of persisted entries on db
            //user_id,reviewinternal_user_id,review_id
        };
    },


    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            this.$router.push("/login")
        }
    },

    methods: {
        onSubmit(evt){
            evt.preventDefault()
        },

        persist(){

        },

        getPersisted(){
            this.$http.get('/results?review_id=5ecd4bc497446f15f0a85f0d')
            .then(data => {
                this.perso = data
                this.items = data.data.results
            }).catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
        },

        upClicked(item){
            if(item.match==true){
                item.match=null
            } else {
                item.match=true
            }

        },

        downClicked(item){
            if(item.match==false){
                item.match=null
            } else {
                item.match=false
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
    }
}
</script>