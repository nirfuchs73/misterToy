<template>
    <section class="toy-filter">
        <input
            type="text"
            placeholder="Search"
            v-on:keyup.enter="setFilter"
            v-model="filterBy.name"
        >
        <label>Category:</label>
        <select v-model="filterBy.type" v-on:change="setFilter">
            <option value="All" selected>All</option>
            <option value="Adult">Adult</option>
            <option value="Educational">Educational</option>
            <option value="Funny">Funny</option>
        </select>
        <input type="checkbox" v-model="filterBy.inStock" v-on:change="setFilter">In stock
        <!-- <select v-model="filterBy.inStock" v-on:change="setFilter">
            <option value="All" selected>All</option>
            <option value="InStock">In stock</option>
        </select>-->
        <!-- <label>Sort By:</label> -->
        <select v-model="sortBy" v-on:change="setFilter">
            <option value="sortBy" selected>Sort By</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        filterBy: {
            // return JSON.parse(JSON.stringify(this.$store.getters.filterBy));
            get() { return this.$store.getters.filterBy },
            set(value) { this.$store.commit('setfilterBy', { filterBy: value }) }
        },
        sortBy: {
            get() { return this.$store.getters.sortBy },
            set(value) { this.$store.commit('setsortBy', { sortBy: value }) }
        }
    },
    methods: {
        setFilter() {
            // this.$store.commit('setfilterBy', this.filterBy);

            var filterQuery =
                `name=${this.filterBy.name}&type=${this.filterBy.type}&inStock=${this.filterBy.inStock}&sortBy=${this.sortBy}`;

            this.$store.dispatch({ type: 'loadToyItems', filterQuery: filterQuery })
                .catch(err => {
                    // EventBusService.$emit(SHOW_MSG, { txt: 'Cannot Load toy, try refreshing', type: 'danger' });
                    console.log(err);
                });
        }
    }
};
</script>

