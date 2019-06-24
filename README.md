
## vue-cropblg
vue 图片裁剪插件  
## [演示链接（戳我直达）](http://www.wwwwxy.top/html/blg/)

## Installation

```bash
$ npm install vue-cropblg
$ yarn add vue-cropblg
```
## Usage


```js
<template>
   <crop/>
   ...
</template>

组件内引入
import { crop } from "vue-cropblg";
 ...
components: {
  crop
},
 
全局引入
import crop from "vue-cropblg";
Vue.use(crop)
```

## API

### Attributes
| 参数   |  说明  |  类型 |   可选值 |默认值 |
|--------|:-------:|------:|------:|------:|
| v-model |  组件 | Object|-- | --|
|shape |  截图形状 |  String  |rect/arc/imgage | rect|
| position | 水印位置大小角度[x,y,size,angle]  | Array|--| ['90%', '90%',1,0]|
| textWatermark | 文字水印]  | String|--| --|
| imageWatermark | 图片水印  | File / String|--| --|
| defaultImgUrl | 默认图片  | File / String|--|--|
| angle | 按钮旋转角度  | Number|--| 0|
| color | 水印.编辑框.控制按钮颜色  | String|16进制颜色| 反差最大颜色|
| rotation | 水图片在canvas旋转角度，能动态改变，rotateBtn为false有效  | Number | -- | --|
| penBtn | 是否渲染画笔按钮  | Boolean | true / false  | true|
| revokeBtn | 是否渲染撤销按钮  | Boolean | true / false |  true|
| rotateBtn | 是否渲染旋转按钮  | Boolean | true / false |  true|



***补充说明***
 >画布中的图片是支持 单指拖动的，双指缩放的   （画笔激活状态下手势会被禁掉）
### Methods
| 方法名   |  说明  | 参数 |
|--------|:-------:|------:|
|changeImage |  改变处理图片,如果没有传imgAddress,会打开本地 | Function(imgAddress: String)|
| getImage | 获取处理后图片,返回Promise,可以选择返回 base64和bolb,quality为文件压缩比(大小) | Function(type:Base64 / Bolb, mimeType:image/jpeg  /  image/png, quality:Number)|
| imgLoaded | 图片canvas加载完成，对调用此函数 | --|

***这两个Methods 都是组件内置的：通过ref或v-model 调用***
>changeImage() 1. 直接调用，默认会打开本地文件选择  2.changeImage('url') 传入图片 网络url 会编辑该链接图片  
getImage() 1.直接调用:默认参数：getImage('Base64','image/png', 2)    
type 可选值： Base64和 Bolb, mimeType 可选值：'image/jpeg' 和  'image/png', quality: 默认最佳

### Slot
| name   |  说明  | 
|--------|:-------:|
| placeholder | 没有图片时占位图 | 
| defaultImgUrl |  默认处理图片 |





