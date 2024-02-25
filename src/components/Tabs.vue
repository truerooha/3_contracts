<template>
  <div class="tabs">
    <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="currentTab = tab">
      {{ tab }}
    </div>
    <div class="tab-content">
      <div v-if="currentTab === 'Основное'">
      </div>

      <Users v-if="currentTab === 'Пользователи'"/>

      <div v-if="currentTab === 'Уведомления'">
      </div>
    </div>
  </div>
</template>

<script>
import Users from './Users.vue'
export default {
    components: {Users},
    data() {
        return {
            tabs: ['Основное', 'Пользователи', 'Уведомления'],
            currentTab: 'Основное'
        };
    }
};
</script>

<style>
.tabs {
  display: flex;
  flex-direction: row;
}

.tab {
  padding: 10px;
  cursor: pointer;
}

.tab-content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
</style>