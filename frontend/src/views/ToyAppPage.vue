<template>
    <section v-if="currUser" class="toy-app toy-wrapper">
        <!-- <h1>Toy App</h1> -->
        <h1 v-if="isToyLoading">Loading...</h1>
        <span>User: {{currUser.nickname}}</span>
        <button v-on:click="logout">Logout</button>
        <toy-filter class="toy-app-filter"></toy-filter>
        <toy-list v-bind:toys="toyItems" v-on:delete="deleteToy" v-on:edit="editToy"></toy-list>
        <button v-if="currUser.isAdmin" v-on:click="addToy">Add Toy</button>
        <user-msg></user-msg>
    </section>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import ToyList from '../components/ToyList.vue';
import ToyFilter from '../components/ToyFilter.vue';
import UserMsg from '../components/UserMsg.vue';
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js';

export default {
    name: 'ToyApp',
    data() {
        return {};
    },
    created() {
        var currUser = this.$store.getters.currUser;
        if (currUser) {
            var filterBy = this.$store.getters.filterBy;
            var sortBy = this.$store.getters.sortBy;
            var filterQuery = `name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}&sortBy=${sortBy}`;
            this.$store
                .dispatch({ type: 'loadToyItems', filterQuery: filterQuery })
                .catch(err => {
                    // EventBusService.$emit(SHOW_MSG, { txt: 'Cannot Load toy, try refreshing', type: 'danger' });
                    console.log(err);
                });
        } else {
            this.$router.push('/login');
        }
    },
    computed: {
        toyItems() {
            return this.$store.getters.toyItems;
        },
        isToyLoading() {
            return this.$store.getters.isToyLoading;
        },
        currUser() {
            return this.$store.getters.currUser;
        }
    },
    methods: {
        deleteToy(itemId) {
            console.log('deleteToy');
            // this.$store.commit('removeItem', itemId);
            this.$store.dispatch({ type: 'removeItem', itemId: itemId })
                .then(() => {
                    EventBusService.$emit(SHOW_MSG, { txt: 'Toy Deleted!', type: 'success' });
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push('/toy');
                });
        },
        editToy(itemId) {
            console.log('editToy');
            this.$router.push('/toy/edit/' + itemId);
        },
        addToy() {
            console.log('addToy');
            this.$router.push('/toy/edit');
        },
        logout() {
            console.log('logout');
            this.$store.dispatch({ type: 'logout', user: this.currUser })
                .then(() => {
                    this.$router.push('/login');
                });
        }
    },
    components: {
        ToyList,
        UserMsg,
        ToyFilter
    }
};
</script>

<style>
.toy-wrapper {
    /* max-width: 100%; */
    /* padding: 0 0px; */
    /* margin: 0 auto; */
    max-width: 1000px;
    padding: 0 20px;
    margin: 0 auto;
}

.flex {
    display: flex;
}
</style>
