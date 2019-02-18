<template>
  <div id="app">
     <p><button @click="percent+=20"> +++加</button>
     {{percent}}
         <button @click="percent-=20"> 减-----</button></p>
    <progresschart  
      style="width:100%;height:250px; display: inline-block;"
      :lineWidth=15
      progressShow
      :percent=percent
      :fontSize=28
      :arcEndeg=80
      defaultBg="#ccc"
      :bg-img="require('./assets/logo.png')"
      html='<p style="pading:0;margin:0;color:#000;font-size:35px">霸霸</p>'
      :position= "['50%', '90%']"
    />
        <!-- :bg-img="require('./img/colors.png')" -->
    <!-- <progresschart  style="width:100%;height:150px; display: inline-block;" 
      :fontSize=12 :lineWidth=8 type="line"  progressShow 
      :percent=percent
      defaultBg="#ccc"
      :duration=3000
      :data=data
    /> -->
    <progresschart  style="width:100%;height:280px; display: inline-block;" 
      :fontSize=12 :lineWidth=3000 type="pie"
      :percent=percent
      :duration=2000
      :data=data
    />
    <progresschart  style="width:100%;height:300px; display: inline-block;" 
      :fontSize=12 :lineWidth=50 type="pie"  
      :percent=percent
      :duration=2000
      :data=data
      html='<p style="pading:0;margin:0;color:#000;font-size:30px">主机</p><p style="pading:0;margin:0;color:#8c8c8c;font-size:20px">200 <span style="pading:0;margin:0;color:red">台</span></p>'
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
