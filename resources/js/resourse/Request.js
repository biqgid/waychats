import Vue from 'vue';
import VueResourse from 'vue-resource';
Vue.use(VueResourse);

Vue.http.options.root = 'http://application.loc/';


let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    Vue.http.headers.common['Authorization'] = `Bearer ${token.content}`;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

