import Vue from 'vue'
import Vuex from 'vuex'
import ItemService from '@/services/ToyService.js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        toyItems: [],
        currItem: null,
        filterBy: {
            text: '',
            type: 'All'
        },
        isToyLoading: false,

    },
    mutations: {
        setToyItems(state, payload) {
            state.toyItems = payload.toyItems;
        },
        setToyItem(state, { toyItem }) {
            state.currItem = toyItem;
        },
        removeItem(state, { itemId }) {
            const idx = state.toyItems.findIndex(item => item.id === itemId);
            state.toyItems.splice(idx, 1);
        },
        addItem(state, { item }) {
            state.toyItems.unshift(item);
        },
        updateItem(state, { item }) {
            const idx = state.toyItems.findIndex(currItem => currItem.id === item.id);
            state.toyItems.splice(idx, 1, item);
        },
        // setfilterBy(state, filterBy) {
        //     state.filterBy = filterBy;
        // },
        setIsToyLoading(state, { isLoading }) {
            state.isToyLoading = isLoading;
        }
    },
    getters: {
        filterToyItems(state) {
            var toyList = state.toyItems.filter(item => {
                return item.name.toLowerCase().includes(state.filterBy.text.toLowerCase());
            });
            if (state.filterBy.type === 'Active') {
                toyList = toyList.filter(item => !item.isDone);
            }
            if (state.filterBy.type === 'Done') {
                toyList = toyList.filter(item => item.isDone);
            }
            return toyList;
            // return state.toyItems;
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
    },
    actions: {
        loadToyItems(context) {
            // console.log('CONTEXT', context);
            context.commit({ type: 'setIsToyLoading', isLoading: true })
            return ItemService.query()
                .then(toyItems => {
                    context.commit({ type: 'setToyItems', toyItems })
                })
                .finally(() => {
                    context.commit({ type: 'setIsToyLoading', isLoading: false })
                })
        },
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
    }
})
