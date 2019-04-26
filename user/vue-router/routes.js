import Sign from '../src/views/sign.vue';
import Manager from '../src/views/manager.vue';

const getAppliance = () => import('../src/views/getAppliance.vue');
const addAppliance = () => import('../src/views/addAppliance.vue');
const managerUser = () => import('../src/views/manageUser.vue');
const changeMsg = () => import('../src/views/changeMsg.vue');

export default [
    {
        path: '',
        redirect: '/sign'
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/manager',
        component: Manager,
        children: [
            {
                path: '/',
                component: getAppliance
            },
            {
                path: 'getAppliance',
                component: getAppliance
            },
            {
                path: 'addAppliance',
                component: addAppliance
            },
            {
                path: 'managerUser',
                component: managerUser
            },
            {
                path: 'changeMsg',
                component: changeMsg
            },
        ]
    },
]