<template>
  <div class="custom-input">
    <div class="search-icon">
      <img src="@/assets/icons/search.svg" class="lil-icon" alt="Поиск">
    </div>
    <input
      type="text"
      v-model="searchQuery"
      :placeholder="placeholderText"
      @focus="updatePlaceholder('')"
      @blur="updatePlaceholder('Поиск')"
    />
    <div class="filter-tags">
      <div v-if="currentFilterText" class="filter-tag">
        {{ currentFilterText }}
        <span @click="removeFilter()" class="remove-filter-icon">×</span>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store';
export default {
    data() {
      return {
        searchQuery: '',
        placeholderText: "Поиск"
      };
    },
    computed: {
    currentFilterText() {
      return this.$store.getters.getCurrentFilterText;
    }
    },
    methods: {
      removeFilter() {
          store.commit('clearFilter')
      },
      updatePlaceholder(newText) {
        this.placeholderText = newText;
      }
    },
    watch: {
      searchQuery(newValue) {
        this.$store.commit('setSearchString', newValue);
        this.$store.dispatch('fetchContracts');
      },
    }
};
</script>

<style scoped>
input {
  border: none;
  outline: none;
  margin: 0;
}

.search-icon {
  margin: 10px 0px 8px 16px;
}

.filter-tags {
  display: flex;
  flex-wrap: nowrap;
}

.filter-tag {
  margin-right: 8px;
  background-color: #EDF2F7;
  color: #718096;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

.remove-filter-icon {
  cursor: pointer;
  margin-left: 4px;
  font-weight: bold;
}
</style>