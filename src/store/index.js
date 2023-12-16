import { createStore } from 'vuex'
export const store = createStore({
    state: {
        currentFilter: null,
        filters: [
        { label: 'Номер договора' },
        { label: 'ИНН' },
        { label: 'Контрагент' },
        { label: 'Дата' }]
    },
    mutations: {
        haveFun(state, filterText) {
            console.log(filterText)
        }
    },
    getters: {
        getFilters: state => {
            return state.filters;
          },    
    }
})