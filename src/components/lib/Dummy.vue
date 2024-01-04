<template>
  <div class="dummy-container">
    <img v-if="imageUrl" :src="imageUrl" alt="Dummy Image" class="dummy-image" />
    <h2 v-if="title" class="dummy-title">{{ title }}</h2>
    <p v-if="description" class="dummy-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.dummy-container {
  text-align: center;
  margin: 20px;
  width: 90%;
  height: 100%;
}

.dummy-image {
  max-width: 200px;
  height: auto;
}

.dummy-title {
  font-size: 1.5em;
  margin-top: 10px;
}

.dummy-description {
  margin-top: 10px;
}

.dummy-placeholder {
  font-style: italic;
  color: #999;
}
</style>