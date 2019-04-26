import Vuex from 'vuex';

import caseState from './state/case'
import caseMutation from './mutations/case'


export default () => {
    return new Vuex.Store({
        state:caseState,
        mutations:caseMutation,
    })
};
