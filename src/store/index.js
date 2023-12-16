import { createStore } from 'vuex'
export const store = createStore({
    state: {
        currentFilterId: null,
        filters: [
        { label: 'Номер договора' },
        { label: 'ИНН' },
        { label: 'Контрагент' },
        { label: 'Дата' }]
    },
    mutations: {
        setFilter(state, filterIndex) {
            if (filterIndex >= 0 && filterIndex < state.filters.length) {
                state.currentFilterId = filterIndex;
            } else {
                console.error('Invalid filter index:', filterIndex);
            }
        }
    },
    getters: {
        getFilters: state => {
            return state.filters;
          },    
    }
})