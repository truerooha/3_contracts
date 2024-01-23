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
        searchString: '',
        currentUserId: null,
        profileData: {
            firstName: '',
            secondName: '',
            avaPath: '',
          }
    },
    mutations: {
        setUserId(state, userId) {
            state.currentUserId = userId;
        },
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
        },
        setUserProfile(state, profileData) {
            state.profileData = profileData;
        }
    },
    actions: {
        async fetchUserProfile({ commit, state }) {
            const url = `http://localhost:3000/profile`;
            axios.get(url)
              .then(response => {
                const profileData = response.data;
                commit('setUserProfile', profileData);
              })
              .catch(error => {
                console.error('Ошибка при получении профиля:', error);
              });
        },
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
        getProfileData: state => {
            return state.profileData;
        },
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