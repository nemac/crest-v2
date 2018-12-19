import { yaml} from 'js-yaml';

import caseStudiesTemplate from '../templates/case_studies.html';
import caseStudyConfig from 'js-yaml-loader!../config/caseStudyConfig.yml';

export class CaseStudies {
  constructor(mapComponent) {
    this.mapComponent = mapComponent;
    this.drawAreaGroup = mapComponent.drawAreaGroup;
    this.addUserAreaLabel = mapComponent.addUserAreaLabel;
    this.caseStudyConfig = caseStudyConfig;
    this.caseStudies = caseStudyConfig.caseStudies
  }

  initalize () {
    const zonalAreaWrapper = document.getElementById('zonal-area-wrapper');
    if (zonalAreaWrapper) {
      zonalAreaWrapper.innerHTML = caseStudiesTemplate;
    }

    this.caseStudies.forEach((study) => {

      // update main study narrative
      this.updateNarrative(study.htmlid, study.narrative);
      this.updateName(study.htmlid, study.name);

      study.steps.forEach( (step) => {
        console.log(step.name, step.narrative, step.actions)
        this.updateNarrative(step.htmlid, step.narrative);
        this.updateName(step.htmlid, step.name);

        if (step.actions.name) {
          this.updateActionName(step.htmlid, step.actions.name);
        }

        if (step.actions.layerToggle) {
          this.updateLayerToggleActionEvent(step.htmlid, step.actions.layerToggle);
        }

        if (step.actions.legendToggle) {
          this.updateLegendToggleActionEvent(step.htmlid, step.actions.layerToggle);
        }
      })
    })

  }

  displayActionButton(elem) {
    if (elem) {
      elem.classList.remove('d-none');
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

  updateLayerToggleActionEvent(htmlid, layer) {
    const selector = `#${htmlid} #action`;
    const elem = document.querySelector(selector);
    if (elem) {
      elem.addEventListener( 'click', (e) => {
        this.layerToggle(layer);
      })
      this.displayActionButton(elem);
    }
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

  // used by search by location
  drawCaseStudyArea(GeoJSON, Label) {
    if (checkValidObject(GeoJSON)) {

      const checklayer = this.drawAreaGroup.getLayers();
      if (checklayer.length > 0) {
        this.drawAreaGroup.clearLayers();
      } else {
        // convert geoJson to leaflet layer
        const layer = L.geoJson(GeoJSON);

        layer.id = Label;

        // add layer to the leaflet map
        this.drawAreaGroup.addLayer(layer);
        this.addUserAreaLabel(layer, Label);
      }
    }
  }
}

// export const SandyAreaGeoJson = ;
//
// function triggerEvent (element, eventName) {
//   var event = new Event(eventName);
//   element.dispatchEvent(event);
// }
//
// export function ToggleCritInfra(element, mapComponent) {
//
//   const detail = 'CriticalInfrastructureTMS';
//   mapComponent.toggleLayer(detail);
//
//   const toggle = document.getElementById(`${detail}-layerToggle`);
//   const toggleBox = document.querySelector(`input#${detail}-toggle`);
//
//   toggleBox.checked = !toggleBox.checked;
//
//   triggerEvent(toggleBox,'change')
//
//   toggle.classList.toggle('closed');
//   toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');
//
// }
//
// export function ToggleStormSurge(element, mapComponent) {
//
//   const detail = 'StormSurgeTMS';
//   mapComponent.toggleLayer(detail);
//
//   const toggle = document.getElementById(`${detail}-layerToggle`);
//   const toggleBox = document.querySelector(`input#${detail}-toggle`);
//
//   toggleBox.checked = !toggleBox.checked;
//
//   triggerEvent(toggleBox,'change')
//
//   toggle.classList.toggle('closed');
//   toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');
//
// }
//
// export function ToggleExposed(element, mapComponent) {
//
//   const detail = 'ExposureTMS';
//   mapComponent.toggleLayer(detail);
//
//   const toggle = document.getElementById(`${detail}-layerToggle`);
//   const toggleBox = document.querySelector(`input#${detail}-toggle`);
//
//   toggleBox.checked = !toggleBox.checked;
//
//   triggerEvent(toggleBox,'change')
//
//   toggle.classList.toggle('closed');
//   toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');
//
// }
