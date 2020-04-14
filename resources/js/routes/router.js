import Vue from 'vue';
import Router from 'vue-router';

/***
 * Pages
 */
import Home from '../pages/Home/Home';


const TodoList = resolve => {
    require.ensure(['../components/Todo/TodoRest'], () => {
        resolve(
            require('../components/Todo/TodoRest')
        )
    })
};

const Overview = resolve => {
    require.ensure(['../pages/Overview/Overview'], () => {
        resolve(
            require('../pages/Overview/Overview')
        )
    })
};

const Dealings = resolve => {
    require.ensure(['../pages/Dealings/Dealings'], () => {
        resolve(
            require('../pages/Dealings/Dealings')
        )
    })
};

const Register = resolve => {
    require.ensure(['../pages/Auth/Register'], () => {
        resolve(
            require('../pages/Auth/Register')
        )
    })
};
const Login = resolve => {
    require.ensure(['../pages/Auth/Login'], () => {
        resolve(
            require('../pages/Auth/Login')
        )
    })
};
const User = resolve => {
    require.ensure(['../pages/Users/User'], () => {
        resolve(
            require('../pages/Users/User')
        )
    })
};


import UserProfile from '../pages/Users/V1/UserProfile';



Vue.use(Router);

export default new Router({
    routes: [

        /**
         * login and register pages
         */
        {
            path: '/',
            name: 'home',
            component: Home
        },

        {
            path: '/overview',
            component: Overview,
        },

        {
            path: '/Dealings',
            component: Dealings,
        },

        {
            path: '/register',
            name: 'register',
            component: Register
        },


        /**
         * Users
         */
        {
            path: '/my-profile',
            component: UserProfile
        },




        {
            path: '/login',
            name: 'login',
            component: Login
        },

        {
            path: '/todo',
            name: 'todo',
            component: TodoList
        },


        /*{ path: '*', component: NotFoundComponent }*/

    ],
    mode: 'history',
});


