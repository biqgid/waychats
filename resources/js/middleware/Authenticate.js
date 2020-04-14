/*export default function auth({ next, router }) {
    if (!localStorage.getItem('user')) {
        return router.push({ name: 'login' });
    }

    return next();
}*/

/*import router from '../routes/router';

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // этот путь требует авторизации, проверяем залогинен ли
        // пользователь, и если нет, перенаправляем на страницу логина
        if (!localStorage.getItem('user')) {
            return router.push({ name: 'login' });
        } else {
            next()
        }
    } else {
        next() // всегда так или иначе нужно вызвать next()!
    }
})*/
