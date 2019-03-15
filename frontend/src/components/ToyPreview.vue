<template>
    <div class="toy-preview flex">
        <div v-bind:class="classObject">{{toy.name}}</div>
    </div>
</template>

<script>
export default {
    name: 'ToyPreview',
    props: ['toy'],
    created() {},
    data() {
        return {};
    },
    computed: {
        classObject() {
            return {
                done: this.toy.isDone,
                'un-done': !this.toy.isDone
            };
        }
    },
    methods: {},
    components: {}
};
</script>