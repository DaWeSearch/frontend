<template>
    <div class="search">
        <b-nav tabs >
            <b-nav-item><router-link to="/">Reviews</router-link></b-nav-item>
            <b-nav-item active disabled><router-link to="/search">Search</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
            <b-button squared class="ml-auto" variant="">Log out</b-button>
        </b-nav>

        <b-container fluid>
           
            <b-row>
                <b-col class="ml-5" cols="3">
                    <b-input-group class="my-5">
                        <b-form-input v-model="newSearchGroup" @keypress.enter="addSearchGroup()" placeholder="First term of new search category to include" ></b-form-input>
                        <b-input-group-append>
                            <b-button variant="info" @click="addSearchGroup()"><b-icon-plus-circle-fill> </b-icon-plus-circle-fill></b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="2" class="ml-5 mb-3">
                    <b-card
                    header="Exclude category"
                    header-tag="header" 
                    footer-tag="footer"
                    >
                        <p v-for="(term,index) in exclude_terms" :key="term" class="mb-2">
                            {{term}}
                            <b-icon-dash-circle @click="removeTerm(exclude_terms,index)" variant="danger"></b-icon-dash-circle>
                        </p>

                        <template v-slot:footer>
                            <b-input-group>
                                <b-form-input v-model="newField" @keypress.enter="addTerm(exclude_terms)" placeholder="Term to exclude"></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="outline-danger" @click="addTerm(exclude_terms)"><b-icon-plus-circle-fill> </b-icon-plus-circle-fill></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </template>
                    </b-card>
                </b-col>

                <b-col v-for="(searchGroup,index) in search_groups" :key="searchGroup.search_terms[0]" cols="2" class="ml-5 mb-3">
                    <b-card
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
                            <b-input-group>
                                <b-form-input v-model="newField" @keypress.enter="addTerm(searchGroup.search_terms)" placeholder="Add term to category"></b-form-input>
                                <b-input-group-append>
                                    <b-button variant="info" @click="addTerm(searchGroup.search_terms)"><b-icon-plus-circle-fill> </b-icon-plus-circle-fill></b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </template>
                    </b-card>
                </b-col>
            </b-row>

            <b-row class="my-5 ml-5">
                <b-col cols="2">
                    Search in
                    <b-form-select v-model="selectedSearchFields" :options="searchFieldOptions"></b-form-select>
                </b-col>
                
                <b-col cols="1">
                    Page
                    <b-form-input v-model="displayedPage" placeholder="Page"></b-form-input>
                </b-col>

                <b-col cols="1">
                    <b-button @click="onSubmitSearch" variant="primary">Search</b-button>
                </b-col>

                <b-col cols="8"></b-col>
            </b-row>
        </b-container>
        
        <b-container fluid v-if="tableItems.length>0">
            <b-button class="my-3" variant="primary" @click="persist">Persist these {{ tableItems.length }} out of {{ totalNum }} availible Publications</b-button>

            <p v-for="wrapperResponse in wrapperResponses" :key="wrapperResponse.records[0].publisher">
                {{ wrapperResponse.records[0].publisher }}: {{wrapperResponse.result.total}}
            </p>

        </b-container>

        <b-table v-if="tableItems.length>0" fixed hover striped small :items="tableItems" :fields="fields" selectable select-mode="single" @row-clicked="onRowClicked">
        
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
            newSearchGroup:"",
            newField: "",
            exclude_terms: [],
            search_groups: [{"search_terms":[],"match":"OR"}],
            selectedSearchFields: ["all"],
            searchFieldOptions: [{ value: ["all"], text: 'all allowed fields' },  //option groups auch interessant siehe form-select docs
                                { value: ["keywords"], text: 'keywords only' },
                                { value: ["title"], text: 'title only' },
                                { value: ["abstract"], text: 'abstract only' },
                                { value: ["keywords","title"], text: 'keywords and title' },
                                { value: ["keywords","abstract"], text: 'keywords and abstract' },
                                { value: ["title","abstract"], text: 'title and abstract' },
                                { value: ["keywords","title","abstract"], text: 'keywords,title and abstract' }
                                ],
            pagecount: 0,
            displayedPage: 1,
            pageLength: 50,
            queryUsedForSearch: null,
            totalNum: 0,// num of persisted entries on db
            wrapperResponses: null,
            fields: ['doi','publicationDate', 'title','authors','publicationName','publisher','uri'],
            tableItems: []
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
                "search_groups": [{"search_terms":[...this.exclude_terms],"match":"NOT"},
                                    ...JSON.parse(JSON.stringify(this.search_groups)) // deepcopy since user can change category after submitting query
                                ].filter( searchGroup => searchGroup.search_terms.length>0),
                "match": "AND",
                "fields": [...this.selectedSearchFields],// copy since user can change selectedSearchFields after submitting query
            };
            
            return query
        },

        processWrapperResponses(){
            console.log(this.wrapperResponses)
            this.tableItems = []
            this.totalNum = 0
            this.wrapperResponses.forEach(d=>{
                this.totalNum += parseInt(d.result.total)
                console.log(`d.result.total ${d.result.total}`)
                if(d.records.length > 0){
                    this.tableItems.push(...d.records) 
                }
            })
        },

        onSubmitSearch(){
            this.queryUsedForSearch = this.buildQuery()
            this.$http.post(`/query?page=${this.displayedPage}&page_length=${this.pageLength}`,{"search":this.queryUsedForSearch})
            .then(data => {
                this.wrapperResponses = data.data
                this.processWrapperResponses()
            }).catch(error => console.log(error))
        },

        onRowClicked(row) {
            row._showDetails=!row._showDetails;
        },

        persist(){
            this.$http.post(`persist/${SessionStore.data.reviewId}/list`,{"results":this.tableItems,"search":this.queryUsedForSearch})
            .then(data => console.log(`persisted ${data}`))
            .catch(error => console.log(error))
        },
    }
}
</script>