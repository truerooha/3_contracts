<template>
  <div class="wrapper">
    <div class="file-list" :class="{'scroll': shouldScroll }">
        <div v-for= "fileItem in files" :key="fileItem.id" class="file-item">
            <img :src="getImageSrc(fileItem.type)" class="lil-icon" alt="">
            <span class="item-name">{{truncateName(fileItem.name) }}</span>
            <span class="item-close" @click="deleteItem">x</span>
        </div>
    </div>
    <div class="upload-area">
        <div class="upload" @click="selectFile">
            <img src="@/assets/icons/attach-outline.svg" alt="файл">
            <p>Загрузить файл</p>
            <input ref="fileInput" class="files-input" type="file" @change="handleFileUpload" />
        </div>
    </div>
  </div>
</template>

<script>
import { getImageSrc } from '@/files'
export default {
    
    props: {
        files: {
            type: Array,
            default: []
        },
    },
    computed: {
        shouldScroll() {
            return this.files.length > 2;
        }
    },
    methods: {
        getImageSrc,
        truncateName(name) {
            if (name.length <= 24) {
                return name;
            } else {
                return name.substring(0, 20) + '...';
            }
        },
        selectFile() {
            this.$refs.fileInput.click();
        },
        deleteItem() {

        },
        handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const fileData = reader.result;
                const attach = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: fileData, 
                };

                this.$emit("onFileUpload", attach);
            }
            reader.readAsArrayBuffer(file);
        }
        }
    }
}
</script>

<style scoped>
p {
    font-size: 14px;
    color: #A0AEC0;
    margin-left: 5px;
}
.wrapper {
    max-width: 300px;
    padding-top: 10px;
}
.files-input {
    display: none;
}
.file-item {
    display: flex;
    padding: 8px;
}
.item-close {
    margin-left: auto;
    cursor: pointer;
}
.item-name {
    font-size: 14px;
    margin-left: 4px;
}
.upload {
    display: flex;
}
.upload-area {
    border: 1px dashed #CBD5E0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 80px;
}
.upload-area:hover {
    opacity: 70%;
}

.scroll {
    overflow-y: scroll;
}
</style>