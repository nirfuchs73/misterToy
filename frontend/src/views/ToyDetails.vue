<template>
    <section v-if="toy">
        <h1>Toy Details</h1>
        <div>Id: {{toy._id}}</div>
        <div>Name: {{toy.name}}</div>
        <div>Price: {{toy.price}}</div>
        <div>Type: {{toy.type}}</div>
        <div>Created at: {{toy.createdAt}}</div>
        <div>InStock: {{toy.inStock}}</div>
        <form v-on:submit.prevent="saveReview">
            <h3>Add review:</h3>
            <textarea v-model="currReview.content" cols="30" rows="10"></textarea>
            <div>
                <button type="submit">Save Review</button>
            </div>
        </form>
    </section>
</template>

<script>
export default {
    name: 'ToyDetails',

    data() {
        return {};
    },
    created() {
        var itemId = this.$route.params.toyId;
        // this.$store.commit('setCurrItem', toyId);
        this.$store.dispatch({ type: 'loadToyItem', itemId });
        // console.log(toyId);
    },
    mounted() { },
    methods: {
        saveReview() {
            console.log('saveReview');
            console.log(this.currUser._id);
            console.log(this.toy._id);
        }
    },
    computed: {
        formattedDate() {
            return moment(this.toy.createdAt).format('MMMM Do YYYY, h:mm:ss a');
        },
        toy() {
            return this.$store.getters.currItem;
        },
        currUser() {
            return this.$store.getters.currUser;
        },
        currReview: {
            // return JSON.parse(JSON.stringify(this.$store.state.currItem));
            get() { return this.$store.getters.currReview },
            set(review) { this.$store.commit('setCurrReview', { review }) }
        }
    }
};
</script>