
## vue-progresschart
```
一个vue 简单图表插件
 弧形进度和线进度
``` 

## Installation

```bash
$ npm install vue-progresschart
$ yarn add vue-progresschart
```
## Usage


```js
<template>
   ...
   <progresschart/>
   ...
</template>

组件内引入
import { progresschart } from "vue-progresschart";
// ...
components: {
   progresschart
},
// ...
全局引入
import progresschart from "vue-progresschart";
// ...
Vue.use(progresschart)
// ... 
```
## API

| 参数   |  说明  |  类型 |   可选值 |默认值 |
|--------|:-------:|------:|------:|------:|
| duration |  完成动画(毫秒) | Number| --| 3000|
| type |  图表类型 | String| circle / line | circle|
| percent |目标进度 | Number| --| 100|
| fontSize |字体大小 | Number| --| 15|
| fontColor |字体颜色 | String| --| #fff|
| progressShow |是否显示字体 | Boolean| --| false|
| bottomText |环进度下部字体 | String| --| 监 控|
| lineWidth |厚度 | Number| --| 8|
| bgImg |背景渐变图片 | String| --| --|
| bgColor |进度颜色| Array|--| ['red', 'yellow']|
| rotate |开始角度 | Number|--| 130|
| arcEndeg |空缺角度 | Number|--| 80|
| timingFunction |速度曲线 | String|easeOut / easeIn / easeInOut| easeInOut|
| lineCap |结束线帽 | String| butt / round / square| round|
| defaultBg |背景颜色 | String|--| --|
