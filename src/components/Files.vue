<template>
  <div class="wrapper">
    <div class="file-list">
        <div v-for= "fileItem in files" :key="fileItem.id" class="file-item">
            <img :src="getImageSrc(fileItem.type)" class="lil-icon" alt="">
            <span class="item-name" @click="clickItem(fileItem)" >{{truncateName(fileItem.name) }}</span>
            <span class="item-close" @click="deleteItem(fileItem)">x</span>
        </div>
    </div>
    <div class="upload-area">
        <div class="upload" @click="selectFile">
            <img src="@/assets/icons/attach-outline.svg" alt="файл">
            <p>Загрузить файл</p>
            <input ref="fileInput" class="files-input" type="file" accept="text/*,image/*,application/pdf" @change="handleFileUpload" />
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
        deleteItem(fileItem) {
            this.$emit('deleteFile', fileItem);
        },
        clickItem(fileItem) {
            this.$emit('clickFile', fileItem);
        },
        handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const fileData = reader.result;
                const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
                const attach = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    ext: fileExtension,
                    data: fileData,
                    fileObj: file
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
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.files-input {
    display: none;
}

.file-list {
    width: 100%;
}

.file-item {
    display: flex;
    padding: 8px;
    width: 100%;
    cursor: pointer;
}
.item-close {
    margin-left: auto;
    margin-right: 16px;
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
    height: 40px;
    padding: 10px;
    width: 85%;
}
.upload-area:hover {
    opacity: 70%;
}
</style>