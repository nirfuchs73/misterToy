<template>
    <!-- <ul class="toy-list">
            <li v-for="toy in toys">
                <h3>{{toy.txt}} {{toy.importance}}</h3>
            </li>
    </ul>-->
    <section class="toy-list flex">
        <router-link
            class="toy-list-row flex"
            v-for="(currToy, idx) in toys"
            :key="currToy._id"
            :to="'/toy/' + currToy._id"
        >
            <toy-preview class="toy-list-preview" v-bind:toy="currToy"></toy-preview>
            <div class="toy-list-buttons flex">
                <button v-if="currUser.isAdmin" v-on:click.stop.prevent="deleteToy(currToy)">Delete</button>
                <button v-if="currUser.isAdmin" v-on:click.stop.prevent="editToy(currToy)">Edit</button>
            </div>
        </router-link>
    </section>
</template>

<script>
import ToyPreview from '../components/ToyPreview.vue';

export default {
    name: 'ToyList',
    props: ['toys'],
    created() { },
    data() {
        return {};
    },
    computed: {
        currUser() {
            return this.$store.getters.currUser;
        }
    },
    methods: {
        deleteToy(toy) {
            this.$emit('delete', toy._id);
        },
        editToy(toy) {
            this.$emit('edit', toy._id);
        }
    },
    components: {
        ToyPreview
    }
};
</script>

<style>
.flex {
    display: flex;
}
.toy-list {
    flex-direction: column;
}

.toy-list-row:first-child {
    border: 1px solid black;
}

.toy-list-row {
    justify-content: space-between;
    border: 1px solid black;
    border-top-style: none;
}

.toy-list-preview {
    margin: 8px;
}
</style>