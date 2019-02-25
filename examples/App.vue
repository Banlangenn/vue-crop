<template>
  <div id="app">
     <p><button @click="percent+=20"> +++加</button>
     {{percent}}
         <button @click="getImageData"> 减-----</button></p>
    <progresschart   
      v-if="imgae" 
      ref = "crop"
      style="width:100%;height:500px; display: inline-block;"
      :imgaeFile = imgae
      v-model="crop"
    />
    <input type="file" v-if="!imgae" @change="uploadImg"  accept="image/jpeg,image/x-icon,image/png">
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
        crop:{},
        imgae:null,
        percent: 100,
        data:[
          {value:10, name:'旅游客运', color:'#3aa1ff'},
          {value:20, name:'班线客运', color:'#36cbcb'},
          {value:4, name:'普货', color:'#6dd48c'},
          {value:3, name:'危险品', color:'#fbd437'}
        ]
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
