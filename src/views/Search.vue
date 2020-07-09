<template>
    <div class="search">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item active><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
    
        </b-nav>

        
        <b-form @submit="onSubmitSearch">
            <b-card 
            class="mx-auto"
            header-tag="header" 
            footer-tag="footer"
            >
                <template v-slot:header>
                    <p>Aspecs</p>
                </template>

                <b-row>
                    <b-col cols="2">
                        <b-card 
                        class="mx-auto"
                        header="Exclude category"
                        header-tag="header" 
                        footer-tag="footer"
                        >
                            <p v-for="(term,index) in exclude_terms" :key="term" class="mb-2">
                                {{term}}
                                <b-icon-dash-circle @click="removeTerm(exclude_terms,index)" variant="danger"></b-icon-dash-circle>
                            </p>

                            <template v-slot:footer>
                                <b-form-input v-model="newField" placeholder="Term to exclude from search"></b-form-input>
                                <b-button @click="addTerm(exclude_terms)">Add term</b-button>
                            </template>
                        </b-card>
                    </b-col>

                    <b-col v-for="(searchGroup,index) in search_groups" :key="searchGroup.search_terms[0]" cols="2">
                        <b-card 
                        class="mx-auto"
                        header-tag="header" 
                        footer-tag="footer"
                        >
                            <template v-slot:header>
                                Include category
                                <b-icon-dash-circle v-if="search_groups.length>1" @click="removeSearchGroup(index)" variant="danger"></b-icon-dash-circle>
                            </template>

                            <p v-for="(term,index) in searchGroup.search_terms" :key="term" class="mb-2">
                                {{term}}
                                <b-icon-dash-circle @click="removeTerm(searchGroup.search_terms,index)" variant="danger"></b-icon-dash-circle>
                            </p>

                            <template v-slot:footer>
                                <b-form-input v-model="newField" placeholder="Term to add to category"></b-form-input>
                                <b-button @click="addTerm(searchGroup.search_terms)">Add term</b-button>
                            </template>
                        </b-card>
                    </b-col>
                </b-row>

                <template v-slot:footer>
                    <b-form-input size="sm" v-model="newSearchGroup" placeholder="First element of new search category to include"></b-form-input>
                    <b-button @click="addSearchGroup">Add search category</b-button>
                </template>
            </b-card>

            <b-button type="submit" variant="primary">Submit</b-button>
            
            
        </b-form>
        
        <b-button variant="primary" @click="persist">Persist these {{ pageLength*2 }} out of {{ totalNum }} results</b-button>
        
        <b-table v-if="items.length>0" fixed hover striped small :items="items" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">
        
            <template v-slot:cell(uri)="row">
                <b-link target="_blank" rel="noopener noreferrer" :href="row.item.uri">{{row.item.uri}}</b-link>
            </template>

            <template v-slot:cell(authors)="row">
                {{ row.item.authors.join(" - ") }}
            </template>

            <template v-slot:row-details="row">
                <b-row>
                    <b-col cols="1"></b-col>
                    <b-col cols="10"><p>{{row.item.abstract ? row.item.abstract : "No abstract text provided"}}</p></b-col>
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
            newField: "",
            exclude_terms: [],
            search_groups: [{"search_terms":[],"match":"OR"}],
            fields: ['doi','publicationDate', 'title','authors','publicationName','publisher','uri'],
            items: [],
            text: "",
            pagecount: 0,
            displayedPage: 1,
            pageLength: 50,
            newSearchGroup:"",
            totalNum: 0// num of persisted entries on db
        };
    },


    beforeMount() {
        if(SessionStore.data.authenticationToken==null){
            this.$router.push("/login")
        }
    },

    methods: {
        addSearchGroup(){
            if(this.newSearchGroup!=""){
                this.search_groups.push({"search_terms":[this.newSearchGroup],"match":"OR"})
            }
            this.newSearchGroup=""
        },

        removeSearchGroup(index){
            this.search_groups.splice(index,1)
        },

        addTerm(searchTerms){
            if(this.newField!="" && !searchTerms.includes(this.newField)){
                searchTerms.push(this.newField)
            }
            this.newField=""
        },

        removeTerm(group,index){
            group.splice(index,1)
        },

        buildQuery(){
            let query = {
                "search_groups": [{"search_terms":this.exclude_terms,"match":"NOT"},
                                    ...this.search_groups
                                ].filter( searchGroup => searchGroup.search_terms.length>0),
                "match": "AND",
                "fields": ["all"/*, "abstract", "keywords", "title"*/],
            };
            
            return query
        },

        onSubmitSearch(evt){
            evt.preventDefault();
            
            this.$http.post(`/query_query?${this.displayedPage}?${this.pageLength}`,this.buildQuery())
            .then(data => {
                this.items = data.data.results
            }).catch(error => console.log(error))
            //console.log(this.buildQuery())
        },

        persist(){

        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
        },
    }
}
</script>