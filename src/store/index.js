import { createStore } from 'vuex'
import axios from '../axios';

export const store = createStore({
    state: {
        currentFilterId: null,
        contracts: [],
        filters: [
        { label: 'Номер' },
        { label: 'Дата' },
        { label: 'ИНН' },
        { label: 'Контрагент' }],
        searchString: ''
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
        },
        setContracts(state, contracts) {
            state.contracts = contracts;
        },
        setSearchString(state, searchString) {
            state.searchString = searchString;
        }
    },
    actions: {
        async fetchContracts({ commit, state }) {
            try {
                const response = await axios.get('http://localhost:3000/contracts', {
                  params: {
                    filter: state.currentFilterId,
                    search: state.searchString,
                  },
                });
                commit('setContracts', response.data);
              } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
              }
            },
        },
    getters: {
        getFilters: state => {
            return state.filters;
        },
        getContracts: state => {
            return state.contracts;
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