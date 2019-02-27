<template>
  <div id="app">
  <p><button @click="getImageData">点我截图</button>
  <button @click="crop.changeImage()">点我换图</button></p>
    <crop
      style="width:100%;height:500px;"
      v-model="crop"
      :position="['90%', '90%', 0.4]"
    >
      <template slot="placeholder">
        <img src="http://img.zcool.cn/community/01bc0f59c9a9b0a8012053f85f066c.jpg" />
      </template>
      <!-- <template #initial> 
        <img  src="http://img.zcool.cn/community/01bc0f59c9a9b0a8012053f85f066c.jpg" />
      </template> -->
      <!-- watermark  暂不可自定义-->
       <template slot="watermark">
        <!-- 共产主义接班人 -->
        <img src="./assets/logo.png" />

      </template>
     </crop>
     <img v-if="cropAction" :src="imageData" alt="">
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
        crop:{},
        cropAction: false,
        imageData: null
    }
  },
  methods: {
    uploadImg(e) {
      this.imgae = e.target.files[0]
    },
    async getImageData() {
         const imageData = await this.crop.getImage('Base64', 'image/png', 0.4)
         this.imageData = imageData
         this.cropAction = true
    }
  }
}
</script>

<style>
body,html, #app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
width: 100%;
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently not supported by any browser */

}
</style>
