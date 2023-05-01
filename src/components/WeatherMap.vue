<template>
  <div id="mapContainer" class="mapContainer"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Chart from 'chart.js/auto';
import icon from "@/assets/images/marker-icon-2x.png";
import iconshadow from '@/assets/images/marker-shadow.png';
let map={};
export default {
  name: 'WeatherMap',
  props:{
    selectcity:{
      type:String,
    },
    message:{
      type:String,
      default:'hello world',
    }
  },
  data(){
    return{
    obsSite: [],
    map:{},
    }  
  },
  methods: {
    updateMarker(){
      let obsrain=[]
      let rainIcon = new L.Icon({
          iconUrl: icon,
          shadowUrl: iconshadow,
          iconSize: [20, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [15, 15]
          });
      obsrain = this.obsSite.filter((item)=>item.city===this.selectcity);
      //console.log(obsrain);
      for(let i =0; i<obsrain.length;i++)
         { L.marker([obsrain[i].lat,obsrain[i].lon],{icon:rainIcon}
         ).addTo(map).bindPopup(`<div>
          <strong class="siteName">${obsrain[i].locationName}</strong><br>
          <strong>測站屬性：${obsrain[i].attribute}<br></strong>
          <strong>緯度：${obsrain[i].lat} 經度:${obsrain[i].lon}</strong><br>
          <strong>24小時雨量內直方圖：</strong><br>
          <canvas id="rectChart-${i}" width="150" height="200""></canvas>
      </div>`
      ).on('popupopen', ()=>{
          let chartId = `rectChart-${i}`;
          let ctx = document.getElementById(chartId);
          let chart = ctx && Chart.getChart(chartId);

          if (chart) {
            chart.destroy();
          }
        let rect = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['1小時', '3小時', '6小時','12小時','24小時'],
              datasets: [{
                label: '累積雨量(毫米)',
                data: [obsrain[i].rain,obsrain[i].hour_3,obsrain[i].hour_6, obsrain[i].hour_12, obsrain[i].hour_24]
              }]
            }
          });
      })}
      console.log(obsrain[0]);
      this.penTo(obsrain[0]);
    },
    removeMarker(){
      map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    },
    updateSelect(){
      this.removeMarker();
      this.updateMarker();
    },
    penTo(obsite){
      const{lat,lon} = obsite;
      map.panTo(new L.LatLng(lat,lon));
      
    }
  },
  watch:{
    selectcity: "updateSelect"
  },
  mounted() {
    //  console.log(this.message);
    map = L.map("mapContainer", {
      center: [24.2034, 121.0105],
      zoom: 9,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
      axios.get("https://rain0528api.herokuapp.com/").then((response)=>{
      console.log(response.data.data);
      this.obsSite = response.data.data;
      //console.log(this.selectcity);
      this.updateMarker()
      }).catch((error)=>{
        console.log(error);
      })
    },
};
</script>
<style scoped>
.mapContainer{
  height:100vh;
}

.siteName{
  font-size: 60px;
  font-weight:500;
}
.chart{
  width:100%;
}
</style>