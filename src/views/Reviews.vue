<template>
    <div id="app">
        <b-container>

                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-5">
                            <h2>Verfügbare <b>Reviews</b></h2>
                        </div>
                        <div class="col-sm-7">
                            <div>
                                <b-button href="#">Person zu review hinzufügen/einladen</b-button>
                                <b-button href="#">Neue Review erstellen</b-button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- https://bootstrap-vue.org/docs/components/table -->
                <b-table
                        id="my-table"
                        :items="items"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                ></b-table>
                <!-- aktuelle seite anzeigen --->
                <p class="mt-3">Aktuelle Seite: {{ currentPage }}</p>

                <!-- https://bootstrap-vue.org/docs/components/pagination -->
                <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
                ></b-pagination>

        </b-container>
    </div>
</template>


<script>
import SessionStore from "../stores/SessionStore"

export default {
    name: "Reviews",
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            // dann analog zum beispiel wie von moham. in app.vue die andere table gemacht hat. flexible anpassen an das was wir brauchen
            items: [
                { id: 1, Titel: 'Bitcoin', Status: 'Abgeschlossen', icon:'' },
                { id: 2, Titel: 'Ethereum', Status: 'In Arbeit', icon:'' },
                { id: 3, Titel: 'Iota', Status: 'Abgeschlossen', icon:'' },
                { id: 4, Titel: 'Xrp', Status: 'Abgeschlossen', icon:'' },
                { id: 5, Titel: 'Xlm', Status: 'Abgeschlossen', icon:'' },
                { id: 6, Titel: 'Crypto', Status: 'Abgeschlossen', icon:'' },
                { id: 7, Titel: 'SmartContracts', Status: 'Abgeschlossen', icon:'' },
                { id: 8, Titel: 'Mining', Status: 'Abgeschlossen', icon:'' },
                { id: 9, Titel: 'TBD', Status: 'In Arbeit', icon:'' }
            ]
        }
    },

    beforeMount() {
        if(SessionStore.data.authKey==null){
            this.$router.push("/login")
        }
    },

    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>
<!--- TODO: tabellen layout noch etwas anpassen, je nach seite verschiebt es sich etwas -->
<style scoped>

    .table-header {
        background: #fff;
        padding: 20px 25px;
        margin: 30px 0;
        border-radius: 3px;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
    }
    .table-title {

        background: #96CDCD;
        color: white;
        padding: 16px 30px;
        padding-bottom: 20px;
        margin: -20px -20px 10px;
        border-radius: 5px 5px 1 1;
    }
    .table-title h2 {
        font-size: 24px;
        margin: 7px 0 0;
    }
    .table-title .btn {
        background: white;
        color: black;
        float: right;
        font-size: 13px;
        min-width: 50px;
        border-radius: 2px;
        margin-left: 10px;
        border: none;
    }
    .table-title .btn:hover, .table-title .btn:focus {
        color: deepskyblue;
        background: white;
    }
    .table-title .btn i {
        float: left;
        font-size: 21px;
        margin-right: 5px;
    }
    .table-title .btn span {
        float: left;
        margin-top: 3px;
    }


    table.table tr th:first-child {
        width: 60px;
    }
    table.table tr th:last-child {
        width: 100px;
    }

    table.table td a:hover {
        color: #96CDCD;
    }
    table.table td a.add {
        color: green;
    }
    table.table td a.delete {
        color: red;
    }


    /*
    pagination noch anpassen
     */

    .pagination li a {
        border: none;
        font-size: 13px;
        min-width: 30px;
        min-height: 30px;
        color: grey;
        margin: 0 2px;
        line-height: 30px;
        border-radius: 2px !important;
        text-align: center;
        padding: 0 6px;
    }
    .pagination li a:hover {
        color: #666;
    }
    .pagination li.active a, .pagination li.active a.page-link {
        background: #96CDCD;
    }
    .pagination li.active a:hover {
        background: #96CDCD;
    }

    .pagination li i {
        font-size: 16px;
        padding-top: 6px
    }

</style>