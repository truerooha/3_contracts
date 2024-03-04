import { createStore } from 'vuex'
import actions from './modules/actions'
import getters from './modules/getters'

const getDefaultState = () => {
    return {
        loadedPermissions: false,
        permissions: [],
        currentFilterId: null,
        contracts: [],
        filters: [
            { label: 'Номер' },
            { label: 'Дата' },
            { label: 'ИНН' },
            { label: 'Контрагент' }
            ],
        searchString: '',
        currentUserId: null,
        profileData: {
            firstName: '',
            secondName: '',
            avaPath: '',
            }
    }
  }
const state = getDefaultState()

const mutations = {
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
    },
    setPermissions(state, permissions) {
        state.permissions = permissions;
        state.loadedPermissions = true;
    },
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
  }

export const store = createStore({
    state,
    mutations,
    actions,
    getters
})