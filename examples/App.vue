<template>
  <div id="app">
  <p class="operation"><button @click="getImageData">点我截图</button>
  <button @click="crop.changeImage()">点我换图</button></p>
  <p class="watermark">输入水印文字：
      <input type="text" placeholder="可以输入水印" v-model="textWatermark" >      
   </p>
    <p class="watermark">颜色
      <input type="text" placeholder="16进制颜色" v-model="color" >
   </p>
    <crop
      style="width:100%;height:560px;background-color: #f1f3f5;"
      v-model="crop"
      :position="['70%', '70%', .2, 12]"
      :imageWatermark = "require('./assets/logo.png')"
      :rotateAngle= 180
      :color="color"
    >
          <!-- defaultImgUrl = "http://img.zcool.cn/community/01bc0f59c9a9b0a8012053f85f066c.jpg" -->
    <!-- :imageWatermark = "require('./assets/logo.png')" -->
      <template slot="placeholder">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1057851374,249752393&fm=26&gp=0.jpg" style="width:20%" />
      </template>

      <template slot="defaultImgUrl"> 
        <img  src="./assets/u=1388650196,3398819234&fm=26&gp=0.jpg" />
      </template>

     </crop>
    <div style="text-align:center" v-if="cropAction">
          <p>长按保存图片</p>
          <img v-if="cropAction" :src="imageData" alt="" style="width:70%">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
        color:'#f60',
        imgWatermark: require('./../../fbox/ios/Magicbox/Images.xcassets/home/fjsj.imageset/fjsj.png'),
        textWatermark: '刘继伟&&宋珍',
        crop:{},
        cropAction: false,
        imageData: null
    }
  },
  methods: {
    uploadImg(e) {
      this.imgwatermark = this.imgae = e.target.files[0]
    },
    changeImg(e) {
      this.isimg = true 
      this.imgwatermark  = e.target.files[0]
    },
    async getImageData() {
         const imageData = await this.crop.getImage('Base64', 'image/png', 2)
         this.imageData = imageData
         this.cropAction = true
    }
  }
}
</script>

<style>
  body,html {
    /* width: 100%; */
    /* height: 100%; */
  
  }
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
  }
  .operation button {
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.015);
    box-shadow: 0 2px 0 rgba(0,0,0,0.015);
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
     color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    line-height: 1.499;
    margin: 20px;
  }
  .watermark input {
    /* -webkit-appearance: none; */
    /* width：180px; */
    position: relative;
    font-size: 14px;
    display: inline-block;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin-bottom: 20px;
  }
</style>
