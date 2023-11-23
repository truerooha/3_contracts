<template>
<div class="tray-el">
     <div class="content-wrapper">
        <img :src="imageSrc" :alt="altText" class="draggable">
        <p>{{ altText }}</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'TrayElement',
    props: {
        imageSrc: {
            type: String,
            default: '@/assets/icons/pdf.svg',
        },
        altText: {
            type: String,
            default: 'pdf',
        },
    },
}
</script>

<style scoped>
.tray-el {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
  border: 1px #CBD5E0;
  border-radius: 12px;
}

.content-wrapper {
    margin-top: 15px;
    text-align: center;
}

div p {
    color: #4A5568;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
}

img {
    width: 48px;
}
</style>