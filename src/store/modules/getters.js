export default {
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