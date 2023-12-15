import { createStore } from 'vuex'
import filter from './modules/filter'

export const store = createStore({
    modules: {
        filter
    }
})