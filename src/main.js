import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from "leaflet";
const app = createApp(App)
app.component('l-map', LMap)
app.component('l-tile-layer', LTileLayer)
app.component('l-marker', LMarker)
app.mount('#app')