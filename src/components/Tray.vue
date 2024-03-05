<template>
  <div class="big-card">
      <div class="main-area" @drop.prevent="dropHandler" @dragover.prevent="dragOverHandler" @dragleave="dragLeaveHandler">
        <div @click="toggleDropdown" class="add-el">
            <svg class="add" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
             <p> Добавить </p>
             <div v-show="isDropdownVisible" id="myDropdown" class="dropdown-content">
              <a href="" @click.prevent="addFiles">
                <img class = "lil-icon" src="@/assets/icons/download.svg" alt="загрузить">
                загрузить
              </a>
              <a href="">
                <img class="lil-icon" src='@/assets/icons/scanner.svg' alt="сканер">
                со сканера
              </a>
            </div>
        </div>
        <input type="file" @change="fileSelected" id="fileInput" style="display: none;" multiple>
        <TrayElement
          v-for="(file, index) in files"
          :key="index"
          :imageSrc="getImageSrc(file.fileType)"
          :altText="file.fileDescrip"
        />
      </div>
    </div>
</template>

<script>
import TrayElement from './TrayElement.vue';
import { getImageSrc } from '@/files'

export default {
  components: { TrayElement },
  data() {
    return {
      isDropAreaVisible: true,
      isDropdownVisible: false,
      files: [
        { fileType: 'group', fileDescrip: 'Пачка файлов' },
        { fileType: 'draft', fileDescrip: 'Черновик документа' },
      ]
    };
  },
  methods: {
    getImageSrc,
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible 
    },
    addFiles() {
      const fileInput = document.getElementById('fileInput')
      fileInput.click()
    },
    dragOverHandler(event) {
      if (!event.target.classList.contains('main-area')) {
        return
      }
      event.target.style.border = '2px dashed #31C48D';
    },
    dragLeaveHandler(event) {
      event.target.style.border = 'none';
    },
    dropHandler(event) {
      if (!event.target.classList.contains('main-area')) {
        return
      }

      if (event.dataTransfer.files[0] === undefined)
        return
      ;
      var file = event.dataTransfer.files[0];

      const fileName = file.name;
      const fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
      this.files.push({ fileType: fileExtension, fileDescrip: fileName})
      event.target.style.border = 'none';

    },
    fileSelected() {
      const selectedFiles = fileInput.files

      if (selectedFiles.length === 0) {
        return;
      }

      for (let i = 0; i < selectedFiles.length; i++) {
        const fileName = selectedFiles[i].name;
        const fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        this.files.push({ fileType: fileExtension, fileDescrip: fileName})
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
  position: relative;
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
  box-shadow: 0px 10px 16px -4px #71809614;
  
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
  grid-template-rows: repeat(auto-fill, minmax(128px, 1fr)); 
  padding: 20px;
  width: 100%;
  border-radius: 12px;

}

.dropdown-content {
  position: absolute;
  background-color: #FFFFFF;
  border-radius: 16px;
  min-width: 140px;
  padding: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  top: 60px;
  left: 40px;
}

.dropdown-content a {
  color: black;
  padding: 4px 8px;
  text-decoration: none;
  border-radius: 5px;
  display: flex;
  text-align: left;
  align-items: center;
}

.dropdown-content a img {
    margin-right: 8px;
  }

.dropdown-content a:hover {background-color: #ddd}

.show {display:block;}

</style>