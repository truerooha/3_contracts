import axios from '@/axios';

export default {
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
  async loadPermissions({ commit, state }) {

      try {
        const response = await axios.get('http://localhost:3000/permissions');
        commit('setPermissions', response.data);
        } catch (error) {
          console.error('Ошибка при загрузке данных:', error);
        }
  }
}