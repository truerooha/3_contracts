<template>
  <div class="big-card">
      <div class="main-area" >
        <div class="add-el">
            <svg class="add" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
             <p> Создать </p>
        </div>
        <TrayElement
          v-for="(file, index) in files"
          :key="index"
          :imageSrc="getImageSrc(file.fileType)"
          :altText="file.fileDescrip"
        />
      </div>
      <div class="drop-area" id="drop-area" @dragover="onDragOver" @dragleave="onDragLeave" @drop="onDrop">
        <div id="drop-text" v-if="isDropAreaVisible">
          <h4> Новый договор</h4>
          <p>Перенесите документы или черновик в данную область, чтобы создать договор </p>
        </div>
        <div v-if="!isDropAreaVisible">
          <img class="add" src="@/assets/icons/new.svg" alt="new" @dragstart="onDragStart">
        </div>
      </div>
    </div>
</template>

<script>
import TrayElement from './TrayElement.vue';
export default {
  components: { TrayElement },
  data() {
    return {
      isDropAreaVisible: true,
      files: [
        { fileType: 'pdf', fileDescrip: 'Документ в формате PDF' },
        { fileType: 'jpg', fileDescrip: 'Изображение в формате JPG' },
        { fileType: 'xls', fileDescrip: 'Изображение в формате' },
      ]
    };
  },
  methods: {
    getImageSrc(fileType) {
      switch (fileType) {
      case 'pdf':
        return require('@/assets/icons/pdf.svg');
      case 'jpg':
        return require('@/assets/icons/jpg.svg');
      case 'xls':
        return require('@/assets/icons/xls.svg');
      default:
        return require('@/assets/icons/default.svg');
      }
    },
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
        draggedElement.style.display = 'none';
      }
    }
  },
};
</script>

<style scoped>
p {
    color: #4A5568;
    font-size: 13px;
}

.add{
  width: 48px;
  color: #CBD5E0
}
.add-el {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
  border: 1px dashed #CBD5E0;
  border-radius: 12px;
  cursor: pointer;
}

.add-el:hover {
  opacity: 60%;
  cursor: pointer;
}

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
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
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