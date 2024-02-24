export default {
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
    }
}