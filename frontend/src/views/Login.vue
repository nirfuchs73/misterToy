<template>
    <section class="toy-login">
        <h1>Login</h1>
        <form v-on:submit.prevent="login">
            <input
                class="toy-login-text"
                placeholder="Username"
                type="text"
                v-model="user.nickname"
            >
            <button type="submit">Login</button>
        </form>
    </section>
</template>

<script>

export default {
    name: 'Login',
    methods: {
        login() {
            console.log('login..', this.user);
            this.$store.dispatch({ type: 'login', user: this.user })
                .then(res => {
                    console.log(res);
                    // EventBusService.$emit(SHOW_MSG, { txt: 'Toy Added!', type: 'success' });
                    this.$router.push('/toy');
                })
                .catch(err => {
                    console.log(err);
                    console.log('User not exist');
                    this.$router.push('/login');
                });
        }
    },
    computed: {
        user: {
            get() {
                var currUser = this.$store.getters.currUser;
                if (currUser) return this.$store.getters.currUser;
                return { nickname: '' };
            },
            set(value) { this.$store.commit('setCurrUser', value) }
        }
    },
    components: {

    }
};
</script>
