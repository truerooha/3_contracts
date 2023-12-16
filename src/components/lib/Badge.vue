<template>
  <div class="badge" :class="badgeClasses" @click="toggleActive">
    {{ text }}
  </div>
</template>

<script>
import { store } from '@/store';

export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    filterId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    badgeClasses() {
      return {
        'active-badge': this.isActive,
      };
    },
    isActive() {
      return this.filterId === store.state.currentFilterId;
    },
  },
  methods: {
    toggleActive() {
        store.commit('setFilter', this.filterId)
        this.filterId === store.state.currentFilterIndex;
    }
  },
};
</script>

<style scoped>
.badge{
  margin-right: 8px;
  background-color: #EDF2F7;
  color: #718096;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.active-badge {
  background-color: #DEF7EC;
  color: #31C48D;
  border: 1px solid #31C48D;
}
</style>
