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
}

.tab {
  padding: 10px 10px;
  cursor: pointer;
}

.tab.active {
  border-bottom: 2px solid #31C48D;
}

.tab-content {
  margin-top: 10px;
}

</style>
