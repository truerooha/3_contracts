import { createStore } from 'vuex'
export const store = createStore({
    state: {
        currentFilterId: null,
        filters: [
        { label: 'Номер' },
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
        },
        clearFilter(state) {
            state.currentFilterId = null 
        }
    },
    getters: {
        getFilters: state => {
            return state.filters;
        },
        getCurrentFilterText: state => {
            if (state.currentFilterId !== null) {
              return state.filters[state.currentFilterId].label;
            } else {
              return null;
            }
        }    
    }
})