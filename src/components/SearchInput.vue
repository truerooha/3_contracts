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
      @input="handleInput"
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
      handleInput() {
      // Обработка ввода текста поиска
      // Возможно, здесь вы захотите выполнить какие-то дополнительные действия
      },
      removeFilter() {
          store.commit('clearFilter')
      },
      updatePlaceholder(newText) {
        this.placeholderText = newText;
      }
    },
    watch: {
      searchQuery(newValue) {
      console.log('Search query changed:', newValue);
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

.custom-input {
  display: flex;
  align-items: center;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #CBD5E0;
  width: 100%;
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