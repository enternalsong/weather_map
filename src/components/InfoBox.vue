<template>
    <div class="InfoBox">
    <form>
        <label for="county-select">選擇縣市</label>
        <select id="county-select" v-model="selectcity" @change="EmitSelectCity">
            <option value="">-- Select One --</option>
            <option v-for="(county,index) in counties" :value="county.CityName" :key="index">{{county.CityName}}</option>
        </select>
            <p>你選擇的縣市是：{{ selectcity }}</p>
    </form>
    </div>
</template>

<script>
import  counties from '../assets/cityName.json';

export default {
  name:"InfoBox",
  data(){
    return {
      data: [],
      counties,
      selectcity:"臺中市"}
  },
  methods:{
    EmitSelectCity(){
        this.$emit('emit-selectcity',this.selectcity)
    }
  }
}
</script>
