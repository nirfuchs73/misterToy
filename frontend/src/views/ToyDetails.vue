<template>
    <section v-if="toy">
        <h1>Toy Details</h1>
        <div>Id: {{toy._id}}</div>
        <div>Name: {{toy.name}}</div>
        <div>Price: {{toy.price}}</div>
        <div>Type: {{toy.type}}</div>
        <div>Created at: {{toy.createdAt}}</div>
        <div>InStock: {{toy.inStock}}</div>
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
    mounted() {},
    methods: {},
    computed: {
        formattedDate() {
            return moment(this.toy.createdAt).format(
                'MMMM Do YYYY, h:mm:ss a'
            );
        },
        toy() {
            return this.$store.state.currItem;
        }
    }
};
</script>