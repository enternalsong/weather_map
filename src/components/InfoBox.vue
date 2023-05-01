<template>
    <div class="InfoBox">
    <h1>臺灣即時雨量資訊網站</h1>
    <input type="checkbox" v-model="allEvent" @change="SelectAll" :value="allEvent"><label>顯示所有觀測站({{obsSite.length}}個)</label>
    <form>
        <label for="county-select">選擇縣市:</label>
        <select id="county-select" v-model="selectcity" @change="EmitSelectCity" class="selectup">
            <option >-- Select One --</option>
            <option v-for="(county,index) in counties" :value="county.CityName" :key="index">{{county.CityName}}</option>
        </select>
        <label for="site-slect">選擇測站</label>
        <select id="site-select" v-model="selectobs" @change="EmitSelectObs">
            <option >-- Select One --</option>
            <option  v-for="(obs,index) in selectlist" :value="obs.locationName" :key="index">{{obs.locationName}}</option>
        </select>
    </form>
    </div>
</template>

<script>
import  counties from '../assets/cityName.json';
export default {
  name:"InfoBox",
  props:{
    obsSite:{
      type:Array,
      default:()=>[],
    },
  },
  data(){
    return {
      data: [],
      counties,
      selectcity:"臺中市",
      selectobs:"",
      selectlist: [],
      allEvent:false,
  }},
  methods:{
    EmitSelectCity(){
        if(this.selectcity){
            this.$emit('emit-selectcity',this.selectcity);
        }
    },
    EmitSelectObs(){
        if(this.selectobs){
            this.$emit('emit-selectobs',this.selectobs);
        }
    },
    SelectAll(){
        // if(this.allEvent===false){this.allEvent=true;}
        // else this.allEvent=false;
        this.$emit('all-print',this.allEvent);
    },
    SelectCityObs(city){
        this.selectlist = this.obsSite.filter((item)=>item.city===city);
    }
  },
  watch:{
    selectcity: "SelectCityObs",
  }
}
</script>
<style scoped>
    .county-select{
        margin-right:10px;
    }
    .selectup{
        margin-right:10px;
    }
</style>
