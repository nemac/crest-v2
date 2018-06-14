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

//initialize navbar
var navbarComponent = new nav_bar('nav-holder');
var mapComponent;
var maplayersComponent;



const router = new Navigo('http://localhost:8080', true);

router.on({
   '/': (params, query)=>{

     //deal with nav bars so back button is not broken
     navbarComponent.resetTabContent();
     navbarComponent.toggleTabContent('main-nav-map');
     navbarComponent.tabUpdate('main-nav-map');

     mapComponent = new Map('map-holder');

     // examples of coded map interactions
     // let maintitleElement = document.getElementById('maintitle');
     // maintitleElement.addEventListener('click', (e) => {
     //   // mapComponent.setLayerStatus('SA_ThreatIndex');
     //   // mapComponent.setMapClick({lat: 32.76966654128219, lng: -79.93103027343751});
     //   // mapComponent.setMapZoom(5);
     //   // mapComponent.setMapCenter({lat: 32.76966654128219, lng: -79.93103027343751});
     //
     // })


      maplayersComponent = new MapLayersList('maplayers_list-holder',{
       events: { layerToggle:
         // Toggle layer in map controller on "layerToggle" event
          event => { mapComponent.toggleLayer(event.detail) }
       }
     })

     mapComponent.renderCount += 1;
     console.log(mapComponent.renderCount);
     // Initialize Layer Toggle Panel


   },
   '/Home': (params, query)=>{

     console.log(mapComponent)
     if(mapComponent === undefined){
        console.log(mapComponent)
         mapComponent = new Map('map-holder');

          maplayersComponent = new MapLayersList('maplayers_list-holder',{
           events: { layerToggle:
             // Toggle layer in map controller on "layerToggle" event
              event => { mapComponent.toggleLayer(event.detail) }
           }
         })
     }

     //deal with nav bars so back button is not broken
     navbarComponent.resetTabContent();
     navbarComponent.toggleTabContent('main-nav-map');
     navbarComponent.tabUpdate('main-nav-map');

     mapComponent.renderCount += 1;
     console.log(mapComponent.renderCount);
   },
   '/About': (params, query)=>{

     //deal with nav bars so back button is not broken
     navbarComponent.resetTabContent();
     navbarComponent.toggleTabContent('main-nav-about');
     navbarComponent.tabUpdate('main-nav-about');

     var componentElem = document.getElementById("about-holder");
     componentElem.innerHTML = AboutPage;
  },
  '/Download': (params, query)=>{

    //deal with nav bars so back button is not broken
    navbarComponent.resetTabContent();
    navbarComponent.toggleTabContent('main-nav-download');
    navbarComponent.tabUpdate('main-nav-download');

    var componentElem = document.getElementById("download-holder");
    componentElem.innerHTML = DownloadDataPage;
 }
})

  // router.notFound(function (query) {
  //   //initialize 404
  //   this.componentElem = document.getElementById("notfound-holder");
  //   this.componentElem.innerHTML = NotFoundPage;
  //
  //   navbarComponent.resetTabContent()
  //   navbarComponent.toggleTabContent('main-nav-notfound')
  //
  //
  // });

  router.resolve();
