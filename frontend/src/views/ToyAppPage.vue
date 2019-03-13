<template>
    <section class="toy-app toy-wrapper">
        <!-- <h1>Toy App</h1> -->
        <h1 v-if="isToyLoading">Loading...</h1>
        <!-- <h1>Loading...</h1> -->
        <!-- <toy-filter class="toy-app-header-item"></toy-filter> -->
        <toy-list v-bind:toys="toyItems" v-on:delete="deleteToy" v-on:edit="editToy"></toy-list>
        <button v-on:click="addToy">Add Toy</button>
    </section>
</template>

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


<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ToyList from "@/components/ToyList.vue";
import ToyFilter from "@/components/ToyFilter.vue";

export default {
    name: "ToyApp",
    data() {
        return {};
    },
    created() {
        this.$store.dispatch({ type: "loadToyItems" }).catch(err => {
            // EventBusService.$emit(SHOW_MSG, { txt: 'Cannot Load toy, try refreshing', type: 'danger' });
            console.log(err);
        });
    },
    computed: {
        toyItems() {
            return this.$store.getters.filterToyItems;
        },
        isToyLoading() {
            return this.$store.getters.isToyLoading;
        }
    },
    methods: {
        deleteToy(itemId) {
            console.log("deleteToy");
            // this.$store.commit('removeItem', itemId);
            this.$store
                .dispatch({ type: "removeItem", itemId: itemId })
                .then(() => {
                    EventBusService.$emit(SHOW_MSG, {
                        txt: "Toy Deleted!",
                        type: "success"
                    });
                });
        },
        editToy(itemId) {
            console.log("editToy");
            this.$router.push("/toy/edit/" + itemId);
        },
        // toggleDone(item) {
        //     console.log("toggleDone");
        //     var toy = JSON.parse(JSON.stringify(item));
        //     toy.isDone = !toy.isDone;
        //     // this.$store.commit('toggleDone', item);
        //     // console.log("Saving toy..", toy);
        //     this.$store
        //         .dispatch({ type: "updateItem", item: toy })
        //         .then(res => {
        //             console.log(res);
        //             EventBusService.$emit(SHOW_MSG, {
        //                 txt: "Toy Saved!",
        //                 type: "success"
        //             });
        //             // this.$router.push('/toy');
        //         });
        // },
        addToy() {
            console.log("addToy");
            var txt = prompt("Toy:");
            var importance = +prompt("Importance:");
            var item = this.$store.getters.emptyToyItem;
            item.txt = txt;
            item.importance = importance;
            // this.$store.commit('addItem', { item });
            console.log("Saving ITEM", item);
            this.$store.dispatch({ type: "addItem", item: item }).then(res => {
                console.log(res);
                EventBusService.$emit(SHOW_MSG, {
                    txt: "Toy Added!",
                    type: "success"
                });
            });
        }
    },
    components: {
        ToyList,
        ToyFilter
    }
};
</script>
