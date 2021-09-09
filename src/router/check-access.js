import { store } from '../store'
export default (to, from, next) => {
    //if the user login
    if (store.getters.user) {
        if (to.path == '/login') {
            next(false);
            return;
        }
    } else {
        if (to.path != '/login') {
            next({ name: 'Login' })
        } else {
            next();
        }
    }
}