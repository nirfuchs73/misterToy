<template>
    <section v-if="toy">
        <h1>{{(toy._id)? 'Toy Edit' : 'Toy Add'}}</h1>
        <form v-on:submit.prevent="saveToy" class="toy-edit flex">
            <label>Name:</label>
            <input type="text" v-model="toy.name">
            <label>Price:</label>
            <input type="number" min="0" max="Infinity" v-model.number="toy.price">
            <label>Type:</label>
            <input type="text" v-model="toy.type">
            <label>In Stock:</label>
            <select v-model="toy.inStock">
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
            <button type="submit">Save</button>
            <!-- <user-msg></user-msg> -->
        </form>
    </section>
</template>

<script>
import UserMsg from "../components/UserMsg.vue";
import EventBusService, { SHOW_MSG } from "../services/EventBusService.js";

export default {
    name: "ToyEdit",
    data() {
        return {};
    },
    created() {
        var itemId = this.$route.params.toyId;
        // this.$store.commit('setCurrItem', toyId);
        this.$store.dispatch({ type: "loadToyItem", itemId });
        // console.log(toyId);
    },
    mounted() {},
    methods: {
        saveToy() {
            console.log("Saving toy..", this.toy);
            // this.$store.commit('updateItem', this.toy);
            // console.log('Saving ITEM', item);
            this.$store
                .dispatch({ type: "updateItem", item: this.toy })
                .then(res => {
                    console.log(res);
                    EventBusService.$emit(SHOW_MSG, {
                        txt: "Toy Saved!",
                        type: "success"
                    });
                    this.$router.push("/toy");
                });
        }
    },
    computed: {
        toy() {
            return JSON.parse(JSON.stringify(this.$store.state.currItem));
        }
    },
    components: {
        UserMsg
    }
};
</script>

<style>
.flex {
    display: flex;
}

.toy-edit {
    flex-direction: column;
    width: min-content;
}
</style>