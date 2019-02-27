
## vue-cropblg
```
vue 图片裁剪插件
``` 

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
| position | 水印位置大小[x,y,size]  | Array|--| ['90%', '90%',1]|

### Methods
| 方法名   |  说明  | 参数 |
|--------|:-------:|------:|
|changeImage |  改变处理图片,如果没有传imgAddress,会打开本地 | Function(imgAddress: String)|
| getImage | 获取处理后图片,返回Promise，可以选择返回 base64和bolb,quality为文件压缩比 | Function(type:Base64 - Bolb, mimeType:image/jpeg - image/png, quality:Number)|


### Slot
| name   |  说明  | 
|--------|:-------:|
| placeholder | 没有图片时占位图 | 
| initial |  默认处理图片 | 
| watermark | 水印（图片或者文字）|


