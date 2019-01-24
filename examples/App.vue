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
    <progresschart  style="width:150px;height:50px; display: inline-block;" 
    :fontSize=12 :lineWidth=2 type="line"  progressShow 
    :percent=percent
    defaultBg="#ccc" />
   <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data() {
    return {
      percent: 99
    }
  },
  components: {
    HelloWorld
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
