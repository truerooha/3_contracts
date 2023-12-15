<template>
  <div class="badge" :class="badgeClasses" @click="toggleActive">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
        active: false
    }
  },
  computed: {
    badgeClasses() {
      return {
        'active-badge': this.active,
      };
    },
  },
  methods: {
    toggleActive() {
        this.active = !this.active
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
