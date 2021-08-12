import { store } from '../store'
export default (to, from, next) => {

    if (store.getters.user) {

        if (to.path == '/login') {
            next(false);
            return;
        }
        if (to.matched.some(record => record.meta.is_admin)) {
            let user = store.getters.userDetail
            if (user.data[0].Users.role == "1") {
                next()
            } else {
                next({
                    name: 'Home'
                })
            }
        } else {
            next()
        }
    } else {
        if (to.path != '/login') {

            next('/login')
        } else {
            next();
        }
    }
}