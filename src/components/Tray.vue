<template>
  <div class="big-card">
      <div class="tray-area">
        <div class="main-area" >
          <img id="icon1" class="icon draggable" draggable="true" src="@/assets/icons/jpg.png" alt="jpg" @dragstart="onDragStart"> 
          <img id="icon2" class="icon draggable" src="@/assets/icons/xml.png" alt="jpg" @dragstart="onDragStart">
          <img id="icon3" class="icon draggable" src="@/assets/icons/pdf.png" alt="jpg" @dragstart="onDragStart">
        </div>
        <div class="drop-area" id="drop-area" @dragover="onDragOver" @drop="onDrop">договоры</div>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    onDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
    },
    onDragOver(e) {
      e.preventDefault();
      let dropArea = document.getElementById("drop-area");
      dropArea.style.opacity = "70%";
    },
    onDrop(e) {
      e.preventDefault();
      const draggedElementId = e.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(draggedElementId);

      if (e.target.id === 'drop-area') {
        draggedElement.style.display = 'none'; // иконка исчезает
      }
    },
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
  flex-direction: column;
  color: white;
  cursor: pointer;
  border-radius: 16px;
  grid-column: span 3;
  background-color: #c4c2c2;
  padding: 5px;
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
  background: rgb(222, 222, 222);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  color: #fdfdfd;
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
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center;
  width: 180px;
  margin: 0;
  padding: 0;
  background:#444444;
  justify-self: end;
  writing-mode: vertical-rl; /* Это свойство устанавливает вертикальное направление текста */
  text-orientation: upright;
  letter-spacing: 18px;
  font-size: 18pt;
  text-transform: uppercase;
}

.drop-area:hover {
    opacity: 70%;
}

</style>