<template>
  <h1 class="page-h1">Помощь</h1>
  <br>
  <div class="wrapper" name="header-input">
    <label for="header-input">Тема обращения:</label>
    <SearchInput/>
  </div>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 60%;
}
</style>