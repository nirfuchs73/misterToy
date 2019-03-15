<template>
    <section class="toy-app toy-wrapper">
        <!-- <h1>Toy App</h1> -->
        <h1 v-if="isToyLoading">Loading...</h1>
        <!-- <h1>Loading...</h1> -->
        <toy-filter class="toy-app-filter"></toy-filter>
        <toy-list v-bind:toys="toyItems" v-on:delete="deleteToy" v-on:edit="editToy"></toy-list>
        <button v-on:click="addToy">Add Toy</button>
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
        var filterBy = this.$store.getters.filterBy;
        var filterQuery = `name=${filterBy.name}&type=${
            filterBy.type
            }&inStock=${filterBy.inStock}`;
        this.$store
            .dispatch({ type: 'loadToyItems', filterQuery: filterQuery })
            .catch(err => {
                // EventBusService.$emit(SHOW_MSG, { txt: 'Cannot Load toy, try refreshing', type: 'danger' });
                console.log(err);
            });
    },
    computed: {
        toyItems() {
            return this.$store.getters.toyItems;
        },
        isToyLoading() {
            return this.$store.getters.isToyLoading;
        }
    },
    methods: {
        deleteToy(itemId) {
            console.log('deleteToy');
            // this.$store.commit('removeItem', itemId);
            this.$store
                .dispatch({ type: 'removeItem', itemId: itemId })
                .then(() => {
                    EventBusService.$emit(SHOW_MSG, {
                        txt: 'Toy Deleted!',
                        type: 'success'
                    });
                });
        },
        editToy(itemId) {
            console.log('editToy');
            this.$router.push('/toy/edit/' + itemId);
        },
        // toggleDone(item) {
        //     console.log('toggleDone');
        //     var toy = JSON.parse(JSON.stringify(item));
        //     toy.isDone = !toy.isDone;
        //     // this.$store.commit('toggleDone', item);
        //     // console.log('Saving toy..', toy);
        //     this.$store
        //         .dispatch({ type: 'updateItem', item: toy })
        //         .then(res => {
        //             console.log(res);
        //             EventBusService.$emit(SHOW_MSG, {
        //                 txt: 'Toy Saved!',
        //                 type: 'success'
        //             });
        //             // this.$router.push('/toy');
        //         });
        // },
        addToy() {
            console.log('addToy');
            var name = prompt('Name:');
            var price = +prompt('Price:');
            var type = prompt('Type:');
            var inStock = prompt('In Stock:');
            var item = this.$store.getters.emptyToyItem;
            item.name = name;
            item.price = price;
            item.type = type;
            item.inStock = inStock;
            // this.$store.commit('addItem', { item });
            console.log('Saving ITEM', item);
            this.$store.dispatch({ type: 'addItem', item: item }).then(res => {
                console.log(res);
                EventBusService.$emit(SHOW_MSG, {
                    txt: 'Toy Added!',
                    type: 'success'
                });
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
</style>
