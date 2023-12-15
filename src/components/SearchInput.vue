<template>
  <div class="custom-input">
    <div class="search-icon">
      <img src="@/assets/icons/search.svg" class="lil-icon" alt="Поиск">
    </div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Поиск"
      @input="handleInput"
    />
    <div class="filter-tags">
      <!-- Отображение фильтров -->
      <div v-for="(filter, index) in filters" :key="index" class="filter-tag">
        {{ filter }}
        <!-- Кнопка удаления фильтра -->
        <span @click="removeFilter(index)" class="remove-filter-icon">×</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
        searchQuery: '',
        filters: [],
    };
    },
    methods: {
        handleInput() {
        // Обработка ввода текста поиска
        // Возможно, здесь вы захотите выполнить какие-то дополнительные действия
        },
        removeFilter(index) {
        // Удаление фильтра по индексу
            this.filters.splice(index, 1);
        },
    },
    watch: {
        searchQuery(newValue) {
        // Здесь вы можете выполнить дополнительные действия при изменении текста поиска
        console.log('Search query changed:', newValue);
    },
    },
    mounted() {
        this.filters.push('Контрагенты');    
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
  margin: 8px 16px;
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