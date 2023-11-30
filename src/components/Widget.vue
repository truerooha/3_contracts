<template>
  <div :class="['card', cardClass]" @click="handleClick">

      <div class="card-header">
        <div class="card-icon">
          <img src="@/assets/icons/cont.svg" alt="">
        </div>
        <h2>{{ title }}</h2>     
      </div>

    <div class="attributes">
      <div class="attr attr1">
        <h1>{{ attr1Value }}</h1>
        <h4>{{ attr1Label }}</h4>
      </div>

      <div class="attr attr2">
        <h1>{{ attr2Value }}</h1>
        <h4>{{ attr2Label }}</h4>
      </div>
    </div>
      
    </div>
</template>

<script>
export default {
   props: {
    cardClass: String,
    iconSrc: String,
    title: String,
    attr1Value: String,
    attr1Label: String,
    attr2Value: String,
    attr2Label: String
    },
    methods: {
        handleClick() {
        this.$emit('click');
        }
    },
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  align-items: left;
  gap: 5px;
  padding: 20px;
  box-shadow: 0px 10px 16px -4px #71809614;
}

.green {
  background-color: #31C48D;
  background: url('@/assets/bg.svg') center/cover; 
  color: white
}

.white {
  background-color: white;
  color: #A0AEC0
}

.gray {
  background-color: #E2E8F0;
  color: #171923
}

.card-header h2 {
  font-size: 18px;
  margin-left: 20px;
}

.card:hover {
  opacity: 70%;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: auto;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  background: white;
  border-radius: 12px;
}

.card-icon img{
  width: 24px;
}

.attributes {
  display: flex;
  margin-top: auto;
  justify-content: left;
}

.attributes h1 {
  margin: 15px 10px 5px 0px;
}

.attributes h4 {
  margin: 0px 10px 10px 0px;
}

.attr1 {
  text-align: left;
}

.attr2 {
  align-self: center;
  width: 200px;
}
</style>