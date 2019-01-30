<template>
  <div id="app">
     <p><button @click="percent+=20"> +++加</button>
     {{percent}}
         <button @click="percent-=20"> 减-----</button></p>
    <progresschart  
            style="width:150px;height:150px; display: inline-block;"
            :lineWidth=15
            progressShow
            :percent=percent
            :fontSize=28
            bShow
            defaultBg="#ccc"
            />
        <!-- :bg-img="require('./img/colors.png')" -->
    <progresschart  style="width:150px;height:150px; display: inline-block;" 
    :fontSize=12 :lineWidth=20 type="line"  progressShow 
    :percent=percent
    defaultBg="#ccc"
    :duration=3000
    :arcEndeg=0
    :data=data />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      percent: 100,
      data:[
        {value:1, name:'旅游客运', color:'#f60'},
        {value:2, name:'班线客运', color:'pink'},
        {value:3, name:'普货', color:'blue'},
        {value:4, name:'危险品', color:'green'}
    ]
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
}
</style>
