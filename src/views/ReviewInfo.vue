<template>
    <div id="info">
        <b-container id="review-info">
            <b-card
                    title="Hallo (User_Name)!"
                    tag="info"
            >
                <div>
                    <li>Aktuelles Review: _Review_Name_</li>
                    <li>Meine Rolle:_Owner/Mitglied</li>
                    <li>Rechte:Admin/ReadOnly/Read+Write</li>
                </div>

                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-5">
                            <h2>Teilnehmer dieses Reviews</h2>
                        </div>
                        <div class="col-sm-7">
                            <div>
                                <b-button href="#">Person zu diesem review hinzufügen/einladen</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <b-table
                        id="my-table"
                        :items="user_items"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                ></b-table>

                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-5">
                            <h2>Verfügbare API Keys</h2>
                        </div>
                        <div class="col-sm-7">
                            <div>
                                <b-button href="#">API Key hinzufügen</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <b-table
                        id="api_table"
                        :items="api_keys"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                ></b-table>

            </b-card>





        </b-container>
    </div>
</template>

<script>
import SessionStore from "../stores/SessionStore"
export default {
    name: "ReviewInfo",
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            // dann analog zum beispiel wie von moham. in app.vue die andere table gemacht hat. flexible anpassen an das was wir brauchen
            user_items: [
                { Name: 'Robert', Function: 'Owner', Rechte: 'Admin', Action:'' },
                { Name: 'Marc', Function: 'Member', Rechte: 'Read Only', Action:'' },
                { Name: 'Peter', Function: 'Member', Rechte: 'Read+Write', Action:'' }
            ],
            api_keys: [
                { Name: 'Springer', Key: 'aaa', Status: 'Aktiv', Action:'' },
                { Name: 'IEEE', Key: 'aaaa', Status: 'Aktiv', Action:'' },
                { Name: 'tba', Key: 'tba', Status: 'tba', Action:'' }
            ]

        }
    },
    beforeMount() {
        if(SessionStore.data.authKey==null){
            this.$router.push("/login")
        }
        //this.getPersisted()
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
}
</script>