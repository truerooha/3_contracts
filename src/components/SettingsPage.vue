<template>
  <h1 class="page-h1">Настройки системы</h1>
  <div class="page-content">
    <Tabs/>
    <div v-if="currentTab === 1"></div>
    <Users v-if="currentTab === 2"/>
    <div v-if="currentTab === 3"></div>
  </div>
</template>

<script>
import Tabs from './Tabs.vue'
import Users from './Users.vue'

export default {
  computed: {
    currentTab() {
      return this.$store.state.currentTab;
    }
  },
  components: {Tabs, Users},
}

</script>