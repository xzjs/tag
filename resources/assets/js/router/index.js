/**
 * Created by xzjs on 2017/4/17.
 */

import App from '../App.vue';

const Login = resolve=>require(['../components/Login'], resolve);
const Main = resolve=>require(['../components/Main'], resolve);

export default [{
    path: '/',
    component: App,
    children: [
        {
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component:Main
        }
    ]
}]