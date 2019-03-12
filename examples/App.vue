<template>
  <div id="app">
  <p class="watermark">输入水印文字：
      <input type="text" placeholder="可以输入水印" v-model="textWatermark" >      
   </p>
    <p class="watermark">输入水印颜色：
      <input type="text" placeholder="可以输入水印" v-model="color" >      
   </p>
       <p class="range">
     <span>水印X方位：{{option[0]}}%</span>
      <range
        v-model="option[0]"
        :min="0"
        :max="100"
        :step="1"
        :bar-height="5">
      </range>
    </p>
    <p class="range">
     <span>水印Y方位：{{option[1]}}%</span>
      <range
        v-model="option[1]"
        :min="0"
        :max="100"
        :step="1"
        :bar-height="5">
      </range>
    </p>
       <p class="range">
     <span>水印大小：{{option[2]}}</span>
      <range
        v-model="option[2]"
        :min="0"
        :max="100"
        :step="1"
        :bar-height="5">
      </range>
    </p>
     <p class="range">
     <span>水印旋转角度：{{option[3]}}°</span>
      <range
        v-model="option[3]"
        :min="0"
        :max="360"
        :step="1"
        :bar-height="5">
      </range>
    </p>
    <p class="operation">
      <button @click="shape='rect'" :class="{blue: shape == 'rect'}" >矩形截图</button>
      <button @click="shape='arc'"  :class="{blue: shape == 'arc'}">圆形截图</button>
      <button class="blue" @click="crop.changeImage()">点我换图</button>
      <button class="blue operationButton" @click="getImageData" >点我截图</button>
    </p>

    <crop
      style="width:100%;height:560px;background-color: #f1f3f5;"
      v-model="crop"
      :position="option"
      :textWatermark = "textWatermark"
      :angle=15
      :imageWatermark="imgWatermark"
      :color=color
      :shape=shape
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
    <!-- <div style="text-align:center" v-if="cropAction">
          <p>长按保存图片</p>
          <img v-if="cropAction" :src="imageData" alt="" style="width:70%">
    </div> -->
  </div>
</template>

<script>
import range from './Range'
export default {
  name: 'app',
  data() {
    return {
        option: [50, 50, 2, 0],
        color:'',
        imgWatermark: '', // require('./assets/logo.png')
        textWatermark: '板蓝根出品，必属精品',
        crop:{},
        cropAction: false,
        imageData: null,
        shape: 'arc',
        rangeValue: 50
    }
  },
  components: {
      range
  },
  created(){
    if(!this.isMobile()){
      alert('暂不支持pc')
    }
  },
  methods: {
    uploadImg(e) {
      this.imgWatermark = e.target.files[0]
    },
    isMobile() {
        return (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
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
  .operation .blue {
    border-radius: 4px;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    border-style: solid;
    
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
    color: rgba(0,0,0,0.65);
    background-color: #fff;
    border-color: #1890ff;
    border-style: dashed;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    line-height: 1.499;
    margin: 20px;
  }
  .operation .operationButton {
    height: 40px;
    padding: 0 25px;
    font-size: 20px;
    /* line-height: 42px; */
  }
  .range {
    display: flex;
    padding: 10px 10%

  }
  .range> span {
    flex: 1
  }
  .range > div {
    flex: 2.5
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
