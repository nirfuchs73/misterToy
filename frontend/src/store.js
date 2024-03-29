import Vue from 'vue'
import Vuex from 'vuex'
import ItemService from '@/services/ToyService.js';
import UserService from '@/services/UserService.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toyItems: [],
        currItem: null,
        filterBy: {
            name: '',
            type: 'All',
            inStock: false
        },
        sortBy: 'sortBy',
        isToyLoading: false,
        currUser: {
            nickname: 'admin'
        },
        currReview: {
            userId: '',
            toyId: '',
            content: ''
        }
    },
    mutations: {
        setToyItems(state, payload) {
            state.toyItems = payload.toyItems;
        },
        setToyItem(state, { toyItem }) {
            state.currItem = toyItem;
        },
        removeItem(state, { itemId }) {
            const idx = state.toyItems.findIndex(item => item._id === itemId);
            state.toyItems.splice(idx, 1);
        },
        addItem(state, { item }) {
            state.toyItems.push(item);
        },
        updateItem(state, { item }) {
            const idx = state.toyItems.findIndex(currItem => currItem._id === item._id);
            state.toyItems.splice(idx, 1, item);
        },
        setfilterBy(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setsortBy(state, { sortBy }) {
            state.sortBy = sortBy;
        },
        setIsToyLoading(state, { isLoading }) {
            state.isToyLoading = isLoading;
        },
        setCurrUser(state, { currUser }) {
            state.currUser = currUser;
        },
        setCurrReview(state, { review }) {
            state.currReview = review;
        }
    },
    getters: {
        // filterToyItems(state) {
        //     var toyList = state.toyItems.filter(item => {
        //         return item.name.toLowerCase().includes(state.filterBy.text.toLowerCase());
        //     });
        //     if (state.filterBy.type === 'Active') {
        //         toyList = toyList.filter(item => !item.isDone);
        //     }
        //     if (state.filterBy.type === 'Done') {
        //         toyList = toyList.filter(item => item.isDone);
        //     }
        //     return toyList;
        //     // return state.toyItems;
        // },
        currItem(state) {
            return state.currItem;
        },
        filterBy(state) {
            return state.filterBy;
        },
        sortBy(state) {
            return state.sortBy;
        },
        toyItems(state) {
            return state.toyItems;
        },
        doneToysPercent(state) {
            var doneToys = state.toyItems.filter(item => item.isDone);
            return Math.floor((doneToys.length / state.toyItems.length) * 100);
        },
        emptyToyItem(state) {
            return ItemService.getEmpty();
        },
        isToyLoading(state) {
            return state.isToyLoading;
        },
        currUser(state) {
            return state.currUser;
        },
        currReview(state) {
            return state.currReview;
        }
    },
    actions: {
        loadToyItems(context, { filterQuery }) {
            // console.log('CONTEXT', context);
            console.log(filterQuery);
            context.commit({ type: 'setIsToyLoading', isLoading: true })
            return ItemService.query(filterQuery)
                .then(toyItems => {
                    context.commit({ type: 'setToyItems', toyItems })
                })
                .finally(() => {
                    context.commit({ type: 'setIsToyLoading', isLoading: false })
                })
        },
        // filterToyItems(context, { filterBy }) {
        //     console.log(filterBy);
        //     return ItemService.filterBy(filterBy)
        //         .then(toyItems => {
        //             context.commit({ type: 'setToyItems', toyItems })
        //         })
        // },
        loadToyItem(context, { itemId }) {
            // console.log('CONTEXT', context);
            ItemService.getItemById(itemId)
                .then(toyItem => {
                    context.commit({ type: 'setToyItem', toyItem })
                })
        },
        removeItem(context, { itemId }) {
            // console.log('CONTEXT', context);
            return ItemService.removeItem(itemId)
                .then(() => {
                    context.commit({ type: 'removeItem', itemId })
                })
        },
        addItem(context, { item }) {
            // console.log(item);
            return ItemService.addItem(item)
                .then((savedItem) => {
                    context.commit({ type: 'addItem', item: savedItem });
                })
        },
        updateItem(context, { item }) {
            // console.log(item);
            return ItemService.updateItem(item)
                .then((savedItem) => {
                    context.commit({ type: 'updateItem', item: savedItem });
                })
        },
        login(context, { user }) {
            console.log('user', user);
            return UserService.login(user)
                .then((user) => {
                    context.commit({ type: 'setCurrUser', currUser: user });
                })
        },
        logout(context, { user }) {
            return UserService.logOut()
                .then(res => {
                    context.commit({ type: 'setCurrUser', currUser: null });
                });
        }
    }
})
