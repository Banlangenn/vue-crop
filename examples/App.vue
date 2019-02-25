<template>
  <div id="app">
    <progresschart
      style="width:100%;height:500px; display: inline-block;"
      :imgaeFile = imgae
      v-model="crop"
    />
    <!-- <input type="file" v-if="!imgae" @change="uploadImg"  accept="image/jpeg,image/x-icon,image/png"> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
        crop:{} 
    }
  },
  methods: {
    uploadImg(e) {
      this.imgae = e.target.files[0]
    },
    getImageData(data) {
      // 发现新大陆  高级写法
        console.log(this.crop.imgData())
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently not supported by any browser */

}
</style>
