<template>
  <div class="big-card">
      <div class="tray-area">
        <span>Трей</span>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.big-card {
  display: flex;
  flex-direction: column;
  color: white;
  cursor: pointer;
  border-radius: 16px;
  grid-column: span 3;
  background-color: #a0a0a0;
  padding: 8px;
  text-align: center;
  margin-top: 10px;
}

.big-card:hover {
  opacity: 90%;
}

.big-card h4 {
  justify-self: start;
  align-self: start;
}

.tray-area {
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  color: #000;
  text-align: left;
}

.tray-area span {
  padding: 10px;
}

</style>