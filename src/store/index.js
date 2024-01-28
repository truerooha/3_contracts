import { createStore } from 'vuex'
import state from './modules/state'
import mutations from './modules/mutations'
import actions from './modules/actions'
import getters from './modules/getters'

export const store = createStore({
    state,
    mutations,
    actions,
    getters
})