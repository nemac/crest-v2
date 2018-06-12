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

// history.pushState({id: 'map'}, '', './map');

let count = 0;
console.log(count)

let componentElem = null;

switch (location.pathname.toUpperCase()) {
    case '/':
       componentElem = document.getElementById("app");
       componentElem.innerHTML = AboutPage;
       count = +1;
       break;
    case '/ABOUT':
       componentElem = document.getElementById("app");
       componentElem.innerHTML = AboutPage;
       break;
    default:
       componentElem = document.getElementById("app");
       componentElem.innerHTML = NotFoundPage;
       break;
  }

console.log(count)
//console.log(location.pathname, location.search)


window.onpopstate = function (event) {
    counsole.log('test')
    if (history.state && history.state.id === 'about') {
        componentElem = document.getElementById("about");
        this.componentElem.innerHTML = AboutPage;
    }
};

//
// //initialize classes
// const router = new Navigo('http://localhost:8080', true, "!#");
// let state = new Store({});
//
// const titleElem = document.getElementById("title");
// titleElem.addEventListener('load', (e) => {console.log('title click')})
//
// let count = 0;
// console.log(count)
// class ViewController {
//
//
//     constructor () {
//       this.count = count
//       //setup navigo router.
//       router.on({
//         //default route also map
//         '/': (params, query)=>{
//
//
//           //initialize navbar
//           this.initializeNavbar('index');
//
//           //initialize map
//           this.initializeMap();
//
//         },
//         //go to map page
//         '/map': (params, query)=>{
//
//           //initialize navbar
//           this.initializeNavbar('index');
//           count =+ 1;
//           //initialize map
//           this.initializeMap();
//
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
//
//       })
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
//
//       // Initialize Layer Toggle Panel
//       this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
//         events: { layerToggle:
//           // Toggle layer in map controller on "layerToggle" event
//            event => { this.mapComponent.toggleLayer(event.detail) }
//         }
//       })
//     }
// }
//
// new ViewController();
