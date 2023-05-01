
<template>
  <div class="box">
    <main>
      <h1 class="box-title">台灣每小時雨量測站圖</h1>
      <div class="container">
        <InfoBox @emit-selectcity="EmitSelectCity"></InfoBox>
        <WeatherMap :selectcity="selectcity"></WeatherMap>
      </div>
    </main>
  </div>
</template>
<script>
import WeatherMap from './components/WeatherMap.vue'
import InfoBox from './components/InfoBox.vue'

export default{
  components:{
    InfoBox,
    WeatherMap
  },
  data(){
    return{
      selectcity:'臺中市'
    }
  },
  methods:{
    EmitSelectCity(city){
      this.selectcity= city;
      //console.log(this.selectcity);
    }
  }
}
</script>
<style scoped>
.box-title{
  padding-left:20px;
}
.container{
  width:100%;
  display:flex;
}

.InfoBox{
  padding-left:20px;
}
.container .InfoBox{
  width:30%;
}
.container .mapContainer{
  width: 70%;
}


header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>
