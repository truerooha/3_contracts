<template>
  <h1 class="page-h1">Контрагенты</h1>
  <div class="page-content" id="cp-page">
    <div id="cp-table">
      Список
    </div>

    <div id="cp-details">
      Детали
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counterparties'
}
</script>

<style>
#cp-page {
  display: flex;
  height: 90%;
  border-radius: 10px;
  padding: 30px;
  justify-self: center;
  align-self: center;
}
</style>