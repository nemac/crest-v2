//import dependencies
import Navigo from 'navigo';

//import custom classess
import { Store } from './store';

//import extended components
import { Map } from './map';
import { MapLayersList } from './maplayers_list';
import { nav_bar } from './nav_bar';

//import html templates
import AboutPage from '../templates/about.html';
import DownloadDataPage from '../templates/downloaddata.html';
import NotFoundPage from '../templates/notfound.html';
var count = 0;


      //initialize navbar
      var navbarComponent = new nav_bar('nav-holder',{activeNav: 'index'});

      var mapComponent = new Map('map-holder');
      mapComponent.renderCount =+ 1;
      // Initialize Layer Toggle Panel
      var maplayersComponent = new MapLayersList('maplayers_list-holder',{
        events: { layerToggle:
          // Toggle layer in map controller on "layerToggle" event
           event => { mapComponent.toggleLayer(event.detail) }
        }
      })

      const titleElem = document.getElementById("title");
       titleElem.addEventListener('click', (e) => {
         mapComponent.toggleMap()
       })
// history.pushState({id: 'map'}, '', './map');
// let state = new Store({});
// var count = 0;
// console.log(count)
//
// let componentElem = null;
//
// switch (location.pathname.toUpperCase()) {
//     case '/':
//       count += 1;
//        componentElem = document.getElementById("app");
//        componentElem.innerHTML = AboutPage;
//
//        const titleElem = document.getElementById("title");
//         titleElem.addEventListener('click', (e) => {
//           console.log('title click');
//           count += 1;
//           console.log(count)
//         });
//
//        break;
//     case '/ABOUT':
//
//        componentElem = document.getElementById("app");
//        componentElem.innerHTML = AboutPage;
//
//        break;
//     default:
//        componentElem = document.getElementById("app");
//        componentElem.innerHTML = NotFoundPage;
//        break;
//   }
//
// console.log(count)
//console.log(location.pathname, location.search)

//
// window.onpopstate = function (event) {
//     counsole.log('test')
//     if (history.state && history.state.id === 'about') {
//         componentElem = document.getElementById("about");
//         this.componentElem.innerHTML = AboutPage;
//     }
// };








//
// //initialize classes
// const router = new Navigo('http://localhost:8080', true, "!#");
// // let state = new Store({});
//
// const titleElem = document.getElementById("title");
// titleElem.addEventListener('load', (e) => {console.log('title click')})
//
// //let count = 0;
// // console.log(count)
// // window.store = {count}
//
// console.log(window.localStorage)
// class ViewController {
//
//
//     constructor () {
//       this.count = 0;
//
//       //setup navigo router.
//       router.on({
//         //default route also map
//         '/': (params, query)=>{
//           if(window.localStorage.getItem("map")){
//             const mapComponent = window.localStorage.getItem("map")
//
//             const elem = window.localStorage.getItem("map")
//             // console.log('redo',elem)
//             this.componentElem = document.getElementById("map-holder");
//             this.componentElem.innerHTML = elem;
//
//           } else {
//             //initialize navbar
//             this.initializeNavbar('index');
//
//             //initialize map
//             this.initializeMap();
//
//           }
//
//         },
//         //go to map page
//         '/map': (params, query)=>{
//
//           if(window.localStorage.getItem("map")){
//             const mapComponent = window.localStorage.getItem("map")
//
//             const elem = window.localStorage.getItem("map")
//
//             this.componentElem = document.getElementById("map-holder");
//             this.componentElem.innerHTML = elem;
//           } else {
//             //initialize navbar
//             this.initializeNavbar('index');
//
//             //initialize map
//             this.initializeMap();
//
//           }
//         },
//         //go to about page
//         '/about': (params, query)=>{
//
//           //initialize navbar
//           this.initializeNavbar('about');
//
//           //initialize about
//           this.componentElem = document.getElementById("app");
//           this.componentElem.innerHTML = AboutPage;
//
//         },
//         //go to download data page
//         '/downloaddata': (params, query)=>{
//
//           //initialize navbar
//           this.initializeNavbar('download');
//
//           //initialize download
//           this.componentElem = document.getElementById("app");
//           this.componentElem.innerHTML = DownloadDataPage;
//
//         },
//       })
//
//
//
//       router.notFound(function (query) {
//         //initialize 404
//         this.componentElem = document.getElementById("app");
//         this.componentElem.innerHTML = NotFoundPage;
//       });
//
//       //resolve
//       router.resolve();
//
//     }
//
//
//
//     initializeNavbar (page){
//       this.navComponent = new nav_bar('nav-holder',{activeNav: page});
//     }
//
//     initializeMap(){
//
//       // this.mapComponent = new Map('map-holder',{state:state});
//       this.mapComponent = new Map('map-holder');
//       this.mapComponent.renderCount =+ 1;
//       // Initialize Layer Toggle Panel
//       this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
//         events: { layerToggle:
//           // Toggle layer in map controller on "layerToggle" event
//            event => { this.mapComponent.toggleLayer(event.detail) }
//         }
//       })
//   //     console.log('test',JSON.stringify(this.mapComponent.map))
//   // //  console.log(JSON.stringify(this.mapComponent))
//   //    window.localStorage.setItem("map", this.mapComponent.componentElem.innerHTML);
//   //    window.localStorage.setItem("L",JSON.stringify(this.mapComponent.map));
//      // window.localStorage.setItem("maplist", this.mapComponent);
//
//     }
//
//
// }
//
// new ViewController();
