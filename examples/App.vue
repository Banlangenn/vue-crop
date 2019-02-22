<template>
  <div id="app">
     <p><button @click="percent+=20"> +++加</button>
     {{percent}}
         <button @click="percent-=20"> 减-----</button></p>
    <progresschart  
      style="width:100%;height:300px; display: inline-block;"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      percent: 100,
      data:[
        {value:10, name:'旅游客运', color:'#3aa1ff'},
        {value:20, name:'班线客运', color:'#36cbcb'},
        {value:4, name:'普货', color:'#6dd48c'},
        {value:3, name:'危险品', color:'#fbd437'}
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
