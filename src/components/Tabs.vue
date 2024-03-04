<template>
  <div>
    <div class="tabs">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'active': currentTab === index + 1 }"
        @click="changeTab(index)"
        class="tab"
      >
        {{ tab }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeTab(index) {
      this.$store.commit('setCurrentTab', index+1);
    }
  },
  computed: {
    currentTab() {
      return this.$store.state.currentTab;
    },
    tabs() {
      return ['Основное', 'Пользователи', 'Уведомления']
    }
  },
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 20px;
}

.tab {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  color: #718096;
}

.tab.active {
  color: #31c48d;
  border-bottom: 2px solid #31c48d;;
}

.tab-content {
  margin-top: 10px;
}

</style>
