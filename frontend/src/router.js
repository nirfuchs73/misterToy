import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import ToyAppPage from './views/ToyAppPage.vue';
import ToyDetails from './views/ToyDetails.vue';
import ToyEdit from './views/ToyEdit.vue';

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/toy', component: ToyAppPage },
    { path: '/toy/edit/:toyId', component: ToyEdit },
    { path: '/toy/:toyId', component: ToyDetails }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
