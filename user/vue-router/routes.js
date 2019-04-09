import sign from '../src/views/sign.vue'
import user from '../src/views/user.vue'

import appliance from '../src/components/appliance.vue'
import applianceDetail from '../src/components/applianceDetail.vue'
import changeMessage from '../src/components/changeMessage.vue'
import managerUser from '../src/components/managerUser.vue'

export default [
    {
        path: '',
        redirect: '/sign'
    },
    {
        path: '/sign',
        component: sign
    },
    {
        path: '/user',
        component: user,
        children: [
            {
                path: '/',
                component: appliance
            },
            {
                path: 'appliance',
                component: appliance
            },
            {
                path: 'changeMessage',
                component: changeMessage
            },
            {
                path: 'managerUser',
                component: managerUser
            }
        ]
    },
]

