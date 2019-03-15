<template>
    <div v-if="alive" class="alert" :class="alertClass">{{msg.txt}}</div>
</template>

<script>
import EventBusService, { SHOW_MSG } from '../services/EventBusService.js';

export default {
    created() {
        EventBusService.$on(SHOW_MSG, msg => {
            this.msg = msg;
            var delay = msg.delay || 1000;
            this.alive = true;
            setTimeout(() => {
                this.alive = false;
            }, delay);
        });
    },
    data() {
        return {
            alive: false,
            msg: null
        };
    },
    computed: {
        alertClass() {
            if (!this.msg) return;
            return `alert-${this.msg.type}`;
        }
    }
};
</script>

<style>
.alert {
    color: white;
    padding: 10px;
    font-size: 1.4em;
    position: absolute;
    top: 0;
    right: 0;
    background-color: grey;
}

.alert-success {
    background-color: rgb(15, 122, 15);
}

.alert-danger {
    background-color: rgb(122, 11, 11);
}
</style>
