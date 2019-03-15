<template>
    <section class="email-filter">
        <input
            type="text"
            placeholder="Search"
            v-on:keyup.enter="setFilter"
            v-model="filterBy.name"
        >
        <select v-model="filterBy.type" v-on:change="setFilter">
            <option value="All" selected>All</option>
            <option value="Adult">Adult</option>
            <option value="Educational">Educational</option>
            <option value="Funny">Funny</option>
        </select>
        <select v-model="filterBy.inStock" v-on:change="setFilter">
            <option value="All" selected>All</option>
            <option value="InStock">In stock</option>
        </select>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        filterBy() {
            // return { ...this.$store.getters.filterBy };
            return JSON.parse(JSON.stringify(this.$store.getters.filterBy));
        }
    },
    methods: {
        setFilter() {
            this.$store.commit('setfilterBy', this.filterBy);
            var filterQuery = `name=${this.filterBy.name}&type=${
                this.filterBy.type
            }&inStock=${this.filterBy.inStock}`;
            this.$store
                .dispatch({
                    type: 'loadToyItems',
                    filterQuery: filterQuery
                })
                .catch(err => {
                    // EventBusService.$emit(SHOW_MSG, { txt: 'Cannot Load toy, try refreshing', type: 'danger' });
                    console.log(err);
                });
            // this.$store.dispatch()
        }
    }
};
</script>

