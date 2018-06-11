// import MapController from './mapController';

import { Map } from './map';
import { MapLayersList } from './maplayers_list';

import { nav_bar } from './nav_bar';
import { Store } from './store';

import Navigo from 'navigo';
//
import AboutPage from '../templates/about.html'
import DownloadDataPage from '../templates/downloaddata.html'
// import AboutPage from '../templates/first.html'
// import Navigo from 'navigo';
// // const router = new Navigo(location.protocol + "//" + location.host,false,'#!')
const router = new Navigo('http://localhost:8080', true, "#")
//


let state = new Store({test:"test"})

class ViewController {

    constructor () {
      router.on({
        '/map': ()=>{
            console.log('map')
            console.log('state',state)
             this.initializeNavbar('index');
             this.initializeMap();

             },  // start with slash
         '/about': ()=>{
              // router.navigate('/admin');
              console.log('about');
              this.initializeNavbar('about');

              this.componentElem = document.getElementById("app")
              this.componentElem.innerHTML = AboutPage

          },  // start with slash
          '/downloaddata': ()=>{
              console.log('downloaddata');
              this.initializeNavbar('download');

              this.componentElem = document.getElementById("app")
              this.componentElem.innerHTML = DownloadDataPage

                   },  // start with slash
          '/test': ()=>{
               // router.navigate('/admin');
               console.log('test')

               },  // start with slash
           '/': ()=>{

                console.log(state,'map')

                this.initializeNavbar('index');
                this.initializeMap();

                },  // start with slash

      }).resolve();
    }

    initializeNavbar (page){
      this.navComponent = new nav_bar('nav-holder',{activeNav: page});
      console.log(this.navComponent.activeNav)
    }

    initializeMap(){

      // this.mapComponent = new Map('map-holder',{state:state});
        console.log('initializeMap',state)
      this.mapComponent = new Map('map-holder');
      console.log(this.mapComponent.map)
      // Initialize Layer Toggle Panel
      this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
        events: { layerToggle:
          // Toggle layer in map controller on "layerToggle" event
           event => { this.mapComponent.toggleLayer(event.detail) }
        }
      })
    }
}

window.ctrl = new ViewController()



    // router.on({
    //   '/map': ()=>{
    //        // router.navigate('/admin');
    //        console.log('map')
    //
    //        // window.ctrl = new mapController()
    //        // console.log(mapComponent)
    //
    //        },  // start with slash
    //    '/about': ()=>{
    //         // router.navigate('/admin');
    //         console.log('about');
    //
    //
    //         // class ViewController {
    //         //
    //         //   /** Initialize Application */
    //         //   constructor () {
    //         //     this.initializeComponents()
    //         //   }
    //         //
    //         //   initializeComponents () {
    //         //     // Initialize Nav Var
    //         //     this.navComponent = new nav_bar('nav-holder',{activeNav: 'about'});
    //         //     console.log(this.navComponent.activeNav)
    //         //
    //         //     this.componentElem = document.getElementById("app")
    //         //     this.componentElem.innerHTML = AboutPage
    //         //   }
    //         // }
    //
    //
    //         window.ctrl = new ViewController()
    //
    //         },  // start with slash
    //         '/downloaddata': ()=>{
    //              // router.navigate('/admin');
    //              console.log('about');
    //
    //
    //              // class ViewController {
    //              //
    //              //   /** Initialize Application */
    //              //   constructor () {
    //              //     this.initializeComponents()
    //              //   }
    //              //
    //              //   initializeComponents () {
    //              //     // Initialize Nav Var
    //              //     this.navComponent = new nav_bar('nav-holder',{activeNav: 'download'});
    //              //     console.log(this.navComponent.activeNav)
    //              //
    //              //     this.componentElem = document.getElementById("app")
    //              //     this.componentElem.innerHTML = DownloadDataPage
    //              //   }
    //              // }
    //              //
    //              //
    //              // window.ctrl = new ViewController()
    //
    //              },  // start with slash
    //     '/test': ()=>{
    //          // router.navigate('/admin');
    //          console.log('test')
    //
    //          },  // start with slash
    //      '/': ()=>{
    //           // router.navigate('/admin');
    //           console.log('map')
    //
    //           // mapController
    //
    //           },  // start with slash
    //
    // }).resolve();

// }
// function mapDefault() {
//
// }
// router
//   .notFound( (q)=>{console.log(q,'not found')})
//   .on(
//     '/', (q)=>{console.log(q,'home')},
//     '/about', (q)=>{console.log(q,'about')},
//   )
//   .resolve();

// router.resolve();
//
// console.log()
// router
//     .on('/', HomePage)
//     .on('/about', AboutPage)
//     .resolve()



// $(window).on('load', () => {
//     $(document).on('click', '[data-path]', (e) => {
//         // e.preventDefault()
//         // router.navigate($(e.target).attr('href'))
//         console.log($(e.target).attr('href'))
//     })
// })
// // set the 404 route
// router.notFound((query) => { $id('view').innerHTML = '<h3>Couldn\'t find the page you\'re looking for...</h3>'; });
//
// router.resolve();

// //
// // console.log(paths)
// class ViewController {
//
//   //view should instiate
//   // state = new Store({test:"test"})
//
//   /** Initialize Application */
//   constructor () {
//     this.initializeComponents()
//     // this.;
//     // console.log('1',state.getName())
//
//
//
//   }
//
//   initializeComponents () {
//
//
//     // state.setName({test2:"test2"});
//     // console.log('2', state.getName())
//     // state.setName({test2:"test3"});
//     // console.log('8', state.getName())
//
//     // Initialize Map
//     // this.mapComponent = new Map('map-holder',{state:state});
//     this.mapComponent = new Map('map-holder');
//     // console.log(this.mapComponent.renderCount);
//     // console.log(this.mapComponent.overlayMaps)
//     // Initialize Nav Var
//     this.navComponent = new nav_bar('nav-holder',{activeNav: 'index'});
//
//     // Initialize Layer Toggle Panel
//     this.maplayersComponent = new MapLayersList('maplayers_list-holder',{
//       events: { layerToggle:
//         // Toggle layer in map controller on "layerToggle" event
//          event => { this.mapComponent.toggleLayer(event.detail) }
//       }
//     })
//   }
// }
//
//
// window.ctrl = new ViewController()
