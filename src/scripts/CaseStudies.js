import { yaml} from 'js-yaml';
import { Store } from './store';

import caseStudiesTemplate from '../templates/case_studies.html';
import caseStudyConfig from 'js-yaml-loader!../config/caseStudyConfig.yml';
import {
  checkValidObject,
  googleAnalyticsEvent
} from './utilitys';

const store = new Store({});

export class CaseStudies {
  constructor(mapComponent, exlore) {
    this.mapComponent = mapComponent;
    this.drawAreaGroup = exlore.drawAreaGroup;
    this.caseStudyConfig = caseStudyConfig;
    this.caseStudies = caseStudyConfig.caseStudies;
    this.labelOptions = {
      className: 'userarealabel',
      direction: 'center',
      noHide: false,
      clickable: false,
      permanent: true
    };


  }

  initalize () {
    const zonalAreaWrapper = document.getElementById('zonal-area-wrapper');
    if (zonalAreaWrapper) {
      zonalAreaWrapper.innerHTML = caseStudiesTemplate;

      const heading = document.querySelector('.explore-row-container .sticky-top.sideheading');
      this.displayOff(heading);
    }

    this.addClearEvent();

    this.caseStudies.forEach((study) => {

      // update main study narrative
      this.updateNarrative(study.htmlid, study.narrative);
      this.updateName(study.htmlid, study.name);

      let lastactions;

      study.steps.forEach( (step) => {
        this.updateNarrative(step.htmlid, step.narrative);
        this.updateName(step.htmlid, step.name);

        if (step.nexthtmlid) {
          this.addNextEvent(step.htmlid, step.nexthtmlid, study.htmlid, step.position);
        }

        if (step.lasthtmlid) {
          const lastposition = this.getLastPosition(step.position);
          this.addLastEvent(step.htmlid, step.lasthtmlid, study.htmlid, lastposition);
        }

        if (step.actions.layerToggle) {
          this.updateLayerToggleActionEvent(step.htmlid, step.actions.layerToggle, step.nexthtmlid, lastactions);
        }

        if (step.actions.legendToggle) {
          this.updateLegendToggleActionEvent(step.htmlid, step.actions.legendToggle, step.nexthtmlid, lastactions);
        }

        // console.log(lastactions)
        // if (lastactions) {
        //   if (lastactions.legendToggle) {
        //     this.updateLegendToggleActionEvent(step.lasthtmlid, step.actions.legendToggle, step.htmlid);
        //   }
        //
        //   if (lastactions.layerToggle) {
        //     this.updateLayerToggleActionEvent(step.lasthtmlid, step.actions.layerToggle, step.htmlid);
        //   }
        // }


        if (step.actions.geojson) {
          this.updateDrawGeoJSONActionEvent(step.htmlid, step.actions.geojsonlabel, step.actions.geojson, step.nexthtmlid);
        }

        if (step.actions.viewerlink) {
          this.addViewerLinkEvent(step.htmlid, step.actions.viewerlink, step.nexthtmlid);
          if (step.actions.name) {
            this.updateActionName(step.htmlid, step.actions.name);
          }
        }

      lastactions = step.actions;
      })
    })

  }

  addClearEvent() {

    const selector = '.figure-caption.tile-caption.sticky-top';
    const elems = document.querySelectorAll(selector);
    elems.forEach( (elem) => {
      if (elem) {
        elem.addEventListener( 'click', (e) => {
          this.unCheckLayers();
          this.collapseLayerLegends();
          this.drawAreaGroup.clearLayers();
        })
      }
    })
  }

  unCheckLayers() {
    const layers = store.getStateItem('mapLayerDisplayStatus');
    Object.keys(layers).forEach((layer) => {
      if (layers[layer]) {
        this.layerToggle(layer);
      }
    })
  }

  collapseLayerLegends() {
    const layers = store.getStateItem('mapLayerDisplayStatus');
    Object.keys(layers).forEach((layer) => {
      this.legendToggleOff(layer);
    })
  }

  getLastPosition(position) {
    let lastposition = position - 2;
    if (lastposition < -1) {
      lastposition = 0;
    }
    return lastposition
  }

  clearPosition() {
    const selector = `.position`;
    const elems = document.querySelectorAll(selector);
    elems.forEach( (elem) => {
      elem.classList.remove('active');
    })
  }

  addPosition(studyhtmlid, position) {
    const selector = `#${studyhtmlid} #positions .position-${position+1}`;
    const elem = document.querySelector(selector);
    if (elem) {
      this.clearPosition();
      elem.classList.add('active');
    }
  }

  addNextEvent(htmlid, nexthtmlid, studyhtmlid, position) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.addPosition(studyhtmlid, position)
        this.displayOffStep(htmlid);
        this.displayOnStep(nexthtmlid);
      })
    }
  }

  addLastEvent(htmlid, lasthtmlid, studyhtmlid, position) {
    const selector = `#${htmlid} #action-last`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.addPosition(studyhtmlid, position)
        this.displayOffStep(htmlid);
        this.displayOnStep(lasthtmlid);
      })
    }
  }

  displayOnStep(htmlid){
    const selector = `#${htmlid}`;
    const elem = document.querySelector(selector);
    this.displayActionButton(elem);
  }

  displayOffStep(htmlid){
    const selector = `#${htmlid}`;
    const elem = document.querySelector(selector);
    this.displayOff(elem);
  }

  zoomToGeoJson(zoomlayer) {
    const zoomBounds = zoomlayer.getBounds();
    this.mapComponent.map.flyToBounds(zoomBounds.pad(0.2));
  }


  displayActionButton(elem) {
    if (elem) {
      elem.classList.remove('d-none');
    }
  }

  displayOff(elem) {
    if (elem) {
      elem.classList.add('d-none');
    }
  }

  // add label to layer.
  // label option defined in Explore class
  addUserAreaLabel(layer, name) {
    // if name not passed create the default area name
    // this happens when the user is drawing a new area
    let newname = name;
    if (!checkValidObject(name)) {
      newname = `${this.defaultAreaName}${shapecount}`;
    }
    // labels needs a sec so it's placed on the correct location
    setTimeout(() => { layer.bindTooltip(newname, this.labelOptions); }, 50);
  }

  addViewerLinkEvent(htmlid, href) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.href=href;
      elem.addEventListener( 'click', (e) => {
      })
    }
    this.displayActionButton(elem);
  }

  updateDrawGeoJSONActionEvent(htmlid, label, geojson) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.drawCaseStudyArea(JSON.parse(geojson), label);
      })
      this.displayActionButton(elem);
    }
  }

  updateLegendToggleActionEvent(htmlid, layer) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.legendToggle(layer);
      })
      this.displayActionButton(elem);
    }
  }

  updateLayerToggleActionEvent(htmlid, layer, lasthtmlid, lastactions) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.layerToggle(layer);
      })
      this.displayActionButton(elem);
    }

    const selectorLast= `#${htmlid} #action-last`;
    const elemLast = document.querySelector(selectorLast);
    if (elemLast) {
      elemLast.addEventListener( 'click', (e) => {
        if (lastactions.layerToggle) {
          this.layerToggle(lastactions.layerToggle);
        }        
      })
    }
    // const selectornext = `#${htmlid} #action-next`;
    // const elemnext = document.querySelector(selectornext)
    // if (elemnext) {
    //   elemnext.addEventListener( 'click', (e) => {
    //     this.layerToggle(layer);
    //     this.displayNextStep(nexthtmlid);
    //   })
    //   this.displayActionButton(elemnext);
    // }
  }

  updateActionName(htmlid, narrative) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  updateNarrative(htmlid, narrative) {
    const selector = `#${htmlid} #narrative`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  updateName(htmlid, narrative) {
    const selector = `#${htmlid} #name`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.innerHTML = narrative;
    }
  }

  triggerEvent (element, eventName) {
    var event = new Event(eventName);
    element.dispatchEvent(event);
  }

  layerToggle(layer) {
    const toggleBox = document.querySelector(`input#${layer}-toggle`);
    this.triggerEvent(toggleBox,'change')
    toggleBox.checked = !toggleBox.checked;
    this.mapComponent.toggleLayer(layer);
  }


  legendToggle(layer) {
    const toggle = document.getElementById(`${layer}-layerToggle`);
    toggle.classList.toggle('closed');
    toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');
  }

  legendToggleOff(layer) {
    const toggle = document.getElementById(`${layer}-layerToggle`);
    toggle.classList.add('closed');
    toggle.querySelector('.layer-legend-wrapper').classList.add('closed');
  }

  // used by search by location
  drawCaseStudyArea(GeoJSON, Label) {
    if (checkValidObject(GeoJSON)) {

      const checklayer = this.drawAreaGroup.getLayers();
      if (checklayer.length > 0) {
        this.drawAreaGroup.clearLayers();
      } else {
        // convert geoJson to leaflet layer
        const layer = L.geoJson(GeoJSON);

        // add layer to the leaflet map
        this.drawAreaGroup.addLayer(layer);
        this.addUserAreaLabel(layer, Label);
        this.zoomToGeoJson(layer);
      }
    }
  }
}
