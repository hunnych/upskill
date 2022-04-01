import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Products from '@/views/Products.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/about',
        name: "About",
        component: About
    },
    {
        path: '/products/:id',
        name: "Products",
        component: Products
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/register',
        name: "Register",
        component: Register
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        props: true // I added this so we can receive the param as a prop
    },
    {
        path: '*',
        redirect: { name: '404', params: { resource: 'page' } }
                                // I added this resource param here.
    }

]

// const linkActiveClass = 'my-link-active-class'

// pass custom class to Vue Material
// Vue.material.router.linkActiveClass = linkActiveClass

const router = new VueRouter({
    mode: 'history',
    routes,
    // linkActiveClass 
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Register' && localStorage.getItem('loggedInUserName') === null)
    { 
      next({ name: 'Login' });
    }
    else if(to.name === 'Login' && localStorage.getItem('loggedInUserName') !== null){
      router.back()
    }
    else { next() }
});

export default router