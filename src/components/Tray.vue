<template>
  <div class="big-card">
      <div class="main-area" >
        <img id="icon1" class="icon draggable" draggable="true" src="@/assets/icons/jpg.png" alt="jpg" @dragstart="onDragStart"> 
        <img id="icon2" class="icon draggable" src="@/assets/icons/xml.png" alt="jpg" @dragstart="onDragStart">
        <img id="icon3" class="icon draggable" src="@/assets/icons/pdf.svg" alt="jpg" @dragstart="onDragStart">
      </div>
      <div class="drop-area" id="drop-area" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
        <div id="drop-text" v-if="isDropAreaVisible">
          <h4> Новый договор</h4>
          <p>Перенесите документы или черновик в данную область, чтобы создать договор </p>
        </div>
        <div v-if="!isDropAreaVisible">
          <img src="@/assets/icons/new.svg" alt="new" @dragstart="onDragStart">
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isDropAreaVisible: true,
    };
  },
  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
    },
    onDragOver(e) {
      e.preventDefault();
      let dropArea = document.getElementById("drop-area");
      this.isDropAreaVisible = false;
    },
     onDragLeave(e) {
      e.preventDefault();
      this.isDropAreaVisible = true;
    },
    onDrop(e) {
      e.preventDefault();
      const draggedElementId = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(draggedElementId);

      if (e.target.id === 'drop-area') {
        draggedElement.style.display = 'none'; // иконка исчезает
      }
    }
  },
};
</script>

<style scoped>
.icon {
  cursor: grab;
  width: 48px;
}

.big-card {
  display: flex;
  color: white;
  cursor: pointer;
  background: white;
  border-radius: 16px;
  grid-column: span 3;
  padding: 24px;
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
  display: flex;
  background: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  color: white;
  overflow: hidden;
}

.main-area {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  padding: 20px;
  width: 100%;
}

.drop-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 240px;
  margin: 0;
  padding: 10px;
  background: #F3FAF7;
  border: 1px dashed #31C48D;
  border-radius: 12px;
}

.drop-area h4 {
  font-size: 18px;
  color: #31C48D;
}

.drop-area p {
  font-size: 14px;
  color: #718096;
}

.drop-area:hover {
  background: #DEF7EC;
  border: 1px solid #31C48D;
}

</style>