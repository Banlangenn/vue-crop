<template>
  <div id="app">
   <!-- <span  style="color:#4ec973">（顶部小提示：UI只是掩饰功能）</span>
      <p class="watermark">
          <span>输入水印文字：</span>
          <input type="text" placeholder="可以输入水印" v-model="textWatermark"  :style="{color}">
      </p>
    <p class="watermark">
        <span>输入水印颜色：</span>
        <input type="text" placeholder="可以输入水印" :style="{color}" v-model="color" >      
    </p>
    <p class="range">
        <span>水印X方位：{{option[0]}}%</span>
        <range
          v-model="option[0]"
          :min="0"
          :max="100"
          :step="1"
          :bar-height="2">
        </range>
    </p>
    <p class="range">
     <span>水印Y方位：{{option[1]}}%</span>
      <range
        v-model="option[1]"
        :min="0"
        :max="100"
        :step="1"
        :bar-height="2">
      </range>
    </p>
       <p class="range">
     <span>水印大小：{{option[2]}}</span>
      <range
        v-model="option[2]"
        :min="0"
        :max="100"
        :step="1"
        :bar-height="2">
      </range>
    </p>
     <p class="range">
     <span>水印角度：{{option[3]}}°</span>
      <range
        v-model="option[3]"
        :min="0"
        :max="360"
        :step="1"
        :bar-height="2">
      </range>
    </p>
    <p class="range">
      <span>图片角度：{{rotation}}°</span>
      <range
        v-model="rotation"
        :min="0"
        :max="360"
        :step="1"
        :bar-height="2">
      </range>
    </p>
    <p class="operation">
      <button @click="shape='imgage'" :class="{blue: shape == 'imgage'}" >整图片裁剪</button>
      <button @click="shape='rect'" :class="{blue: shape == 'rect'}" >矩形裁剪框</button>
      <button @click="shape='arc'"  :class="{blue: shape == 'arc'}">圆形裁剪框</button>
      <br/>
      <button class="blue" @click="crop.changeImage()">点我换图</button>
      <button class="blue operationButton"  @click="getImageData" >生成图片</button>
    </p> -->

    <crop
      style="width:100%;height:100%;background-color: #f1f3f5;"
      v-model="crop"
      :position="option"
      :textWatermark = "textWatermark"
      :angle="15"
      :imageWatermark="imgWatermark"
      :color=color
      :shape=shape
      @imgLoaded="imgLoaded"
      :revokeBtn="true"
      :penBtn="true"
      :rotation="rotation"
    >
      <!-- defaultImgUrl = "http:\/\/img.zcool.cn/community/01bc0f59c9a9b0a8012053f85f066c.jpg" -->
    <!-- :imageWatermark = "require('./assets/logo.png')" -->
      <template slot="placeholder">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1057851374,249752393&fm=26&gp=0.jpg" style="width:20%" />
      </template>

      <template slot="defaultImgUrl"> 
        <img  src="./assets/timg.jpg" />
      </template>

     </crop>
    <!-- <div style="text-align:center" v-if="cropAction">
          <p>长按保存图片</p>
          <img v-if="cropAction" :src="imageData" alt="" style="width:70%">
    </div> -->

      <v-dialog  :visible.sync= "cropAction">
            <img :src="imageData" alt="小程序码">
            <p slot="desc">
                <span>长按保存分享图片哦~</span>
            </p>
        </v-dialog>
  </div>
</template>

<script>
// import range from './Range'
import dialog from './signDialog'
export default {
  name: 'app',
  data() {
    return {
        option: [50, 50, 20, 0],
        color:'#f14864',
        imgWatermark: '', // require('./assets/logo.png')
        textWatermark: '板蓝根出品，必属精品',
        crop:{},
        cropAction: false,
        imageData: null,
        shape: 'rect',
        rangeValue: 50,
        rotation: 0
    }
  },
  components: {
      // range,
      'v-dialog': dialog
  },
  created(){
      if(!this.isMobile()){
        console.log('手机上才能图片缩放，保存')
      }
  },
  methods: {
    imgLoaded(){
       // eslint-disable-next-line
        console.log('图片加载完成~')
        
    },
    uploadImg(e) {
        this.imgWatermark = e.target.files[0]
    },
    isMobile() {
        return (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
    },
    getImageData() {
       this.crop.getImage('Base64', 'image/jpg', 2).then(imageData => {
         if (Object.prototype.toString.call(imageData) === '[object Blob]') {
              imageData =  window.URL.createObjectURL(imageData)
          }
          this.imageData = imageData
          this.cropAction = true
       }) 
    }
  }
}
</script>

<style>
  body,html {
    /* width: 100%; */
    height: 100vh;
  
  }
  * {
    padding: 0;
    margin: 0;
  }
  #app {
    height: 100vh;
    font-size: 10px;
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
  .operation {
    padding: 5px 0;
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
    height: 27px;
    padding: 0 10px;
    font-size: 12px;
    color: rgba(0,0,0,0.65);
    background-color: #fff;
    border-color: #1890ff;
    border-style: dashed;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    line-height: 1.499;
    margin: 5px;
  }
  .range {
    display: flex;
    padding: 7px 0;
    border-bottom: 1px solid #eee;
    margin: 0 5%;

  }
  .watermark {
    display: flex;
    margin: 0 5%;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  /* .watermark input {
     flex: 1.2;
    
  } */
  .range > span,.watermark > span{
    flex: 1
  }
  .range > div {
    flex: 2.5
  }
  .watermark input {
    
    /* -webkit-appearance: none; */
    /* width：180px; */
    flex: 2.5;
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
    height: 25px;
    line-height: 30px;
    outline: none;
    padding: 0 12px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    /* margin-bottom: 10px; */
  }
</style>
