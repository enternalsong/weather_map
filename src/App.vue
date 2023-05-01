<template>
  <div class="box">
    <main>
      <div class="container">
        <InfoBox @all-print="SelectAll" @emit-selectcity="EmitSelectCity" @emit-selectobs="EmitSelectObs" :obsSite="obsSite"></InfoBox>
        <WeatherMap :allEvent="allEvent" :selectcity="selectcity" :obsSite="obsSite" :selectobs="selectobs"></WeatherMap>
      </div>
    </main>
  </div>
</template>
<script>

import WeatherMap from './components/WeatherMap.vue';
import InfoBox from './components/InfoBox.vue';
import axios from 'axios';
export default{
  components:{
    InfoBox,
    WeatherMap
  },
  data(){
    return{
      selectcity:'臺中市',
      selectobs:'',
      obsSite:[],
      allEvent:false,
    }
  },
  methods:{
    EmitSelectCity(city){
      this.selectcity= city;
      //console.log(this.selectcity);
    },
    EmitSelectObs(obs){
      this.selectobs=obs;
      //console.log(this.selectobs);
    },
    SelectAll(event){
      this.allEvent= event;
      //console.log(this.allEvent);
    },
  },
  mounted(){
      axios.get("https://rain0528api.herokuapp.com/").then((response)=>{
      console.log(response.data.data);
      this.obsSite = response.data.data;
      //console.log(this.selectcity);
      // this.updateMarker()
      }).catch((error)=>{
        console.log(error);
      })
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
  padding-right:20px;
  margin-top:20px;
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
