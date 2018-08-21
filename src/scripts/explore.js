// dependencies
import proj4 from 'proj4';
import JSZip from 'jszip';
import L from 'leaflet';
import { Draw } from 'leaflet-draw';

// default map template
import exploreTemplate from '../templates/explore.html';

import { Component } from './components';
import { Store } from './store';

import { checkValidObject } from './utilitys';

// Shapefile library must be imported with require.
// import shapefile from 'shapefile' causes the library
// to be unavailable within a promise context for some reason.
var shapefile = require("shapefile");

const store = new Store({});

/**
 * explore Component
 * Explore handles drawing on map, uploading of shapefile,
 * and generally handles adding any shapes to the map.
 */
export class Explore extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, exploreTemplate);

    const { mapComponent, mapInfoComponent } = props;
    this.mapComponent = mapComponent;
    this.mapInfoComponent = mapInfoComponent;

    this.drawAreaGroup = L.featureGroup().addTo(mapComponent.map);

    // handler for when drawing is completed
    this.addDrawVertexCreatedHandler(mapComponent, mapInfoComponent);

    // handler for drawing first vertex
    Explore.addDrawVertexHandler(mapComponent);

    // handler for clicking the draw area button
    this.addDrawAreaClickHandler(mapComponent);

    // handle stop of draw with escape before finsihed
    Explore.addDrawVertexStop(mapComponent, mapInfoComponent);

    // draw the user area on the map
    this.drawUserArea();

    this.addUploadShapeHandler()
  }

  // draw the user area on the map
  drawUserArea() {
    const userarea = store.getStateItem('userarea');

    // ensure the user area object is valid (actuall has a value)
    if (checkValidObject(userarea)) {
      // convert geoJson to leaflet layer
      const layer = L.geoJson(userarea);

      // add layer to the leaflet map
      this.drawAreaGroup.addLayer(layer);
      return layer;
    }
    return null;
  }

  // handler for stopping (cancel) drawing on the map
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  // the other vertexes
  // @param { Object } mapComponent object
  // @param { Object } mapInfoComponent object
  static addDrawVertexStop(mapComponent, mapInfoComponent) {
    mapComponent.map.on('draw:deletestop', () => {
      store.removeStateItem('userarea');

      if (checkValidObject(mapInfoComponent)) {
        // re-add indentify
        mapInfoComponent.addMapClickIdentifyClickHandler();
      }
    });
  }

  // handler for drawing the first vertex (green) on the map differently then
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  // the other vertexes
  // @param { Object } mapComponent object
  static addDrawVertexHandler(mapComponent) {
    // color first vertex green
    mapComponent.map.on('draw:drawvertex', (e) => {
      const vertexElements = document.querySelectorAll('.leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-zoom-animated.leaflet-interactive');
      const fistVertexElement = vertexElements[0];
      fistVertexElement.className += ' leaflet-marker-icon-first';
    });
  }

  // handler for click the button drawing vertexes on the map
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  // @param { Object } mapComponent object
  addDrawAreaClickHandler(mapComponent) {
    // draw polygon handler
    const polygonDrawer = new L.Draw.Polygon(mapComponent.map);

    // Click handler for you button to start drawing polygons
    const drawAreaElement = document.getElementById('draw-area-btn');

    drawAreaElement.addEventListener('click', (ev) => {
      // remove existing Area
      this.drawAreaGroup.clearLayers();
      store.removeStateItem('userarea');

      // turn off other map click events expecting this
      //  to be indentify if we add other map click events
      //  we will have to add that back.  so this not ideal
      mapComponent.map.off('click');

      // enable polygon drawer for leaflet map
      polygonDrawer.enable();
    });
  }

  // handler for when drawing is complete on the map
  // adding not as hanlder callback so I can use this (class) calls
  // would be better to handle this as a traditional callback
  // @param { Object } mapComponent object
  // @param { Object } mapInfoComponent object
  addDrawVertexCreatedHandler(mapComponent, mapInfoComponent) {
    // Assumming you have a Leaflet map accessible
    mapComponent.map.on('draw:created', (e) => {
      const { layer } = e;
      this.drawAreaGroup.addLayer(layer);

      // start adding the user draw shape to the map
      layer.addTo(mapComponent.map);

      if (checkValidObject(mapInfoComponent)) {
        // re-add indentify
        mapInfoComponent.addMapClickIdentifyClickHandler();
      }

      // update store
      store.setStoreItem('lastaction', 'draw area');
      store.setStoreItem('userarea', layer.toGeoJSON());
    });
  }



  // Listens for click events on the upload shape button.
  addUploadShapeHandler() {
    const uploadFeaturesBtn = document.getElementById('upload-shape-btn');
    uploadFeaturesBtn.addEventListener('change', (e) => this.fileSelectHandler(e));
  }

  // Handler that fires when a user selects files to upload
  fileSelectHandler(event) {
    let fileList = event.target.files;
    // Move files from FileList object to an Array
    let files = []; for (let f of fileList) { files.push(f); }
    let validFiles = files.filter(this.isValidFile, this)
    if (validFiles.length) {
      this.processFiles(validFiles)
    } else {
      console.log("No valid files were selected.")
    }
  }

  isValidFile(file) {
    let validExts = [ 'zip', 'geojson', 'json', 'shp', 'dbf', 'prj' ]
    let isValid = validExts.filter(ext => ext === this.fileExt(file.name)).length
    return Boolean(isValid)
  }

  async processFiles(files) {
    let fileSets = [];
    // Treat each folder in a zip archive as its own file set.
    let zips = files.filter(file => this.fileExt(file.name) === 'zip')
    for (let zip of zips) {
      let zipFileSets = await this.readZip(zip);
      fileSets.push(...zipFileSets);
    }
    // Non-zip files are all put into one file set.
    fileSets.push(files.filter(file => this.fileExt(file.name) !== 'zip'))
    fileSets.forEach(this.processFileSet, this)
  }

  async processFileSet(files) {
    let shpfileFiles = files.filter(file => {
      return ['shp', 'dbf', 'prj'].indexOf(file.type) > -1;
    });
    let otherFiles = files.filter(file => shpfileFiles.indexOf(file) === -1);
    let shpfileBundles = this.bundleShpfileFiles(shpfileFiles);
    let convertedShpfiles = shpfileBundles.map(this.processShpfileBundle, this)
    let processed = await Promise.all(otherFiles.map(
      file => {
        return this.readFileAsync(file, 'readAsText').then(
          text => JSON.parse(text),
          error => { console.log(error); }
        )
      }
    ))
    console.log(processed);
    console.log(convertedShpfiles);
  }

  bundleShpfileFiles(shpfileFiles) {
    let shpfileFilenames = new Set(
      shpfileFiles.map(file => this.getFilenameWithoutExt(file.name))
    )
    let shpfileBundles = [];
    shpfileFilenames.forEach(filename => {
      let files = shpfileFiles.filter(
        file => this.getFilenameWithoutExt(file.name) === filename
      )
      let shp = pieces.filter(file => file.type === 'shp')[0];
      if (shp) {
        let obj = {}; obj.shp = shp;
        let dbf = pieces.filter(file => file.type === 'dbf')[0];
        let prj = pieces.filter(file => file.type === 'prj')[0];
        if (dbf) obj.dbf = dbf;
        if (prj) obj.prj = prj;
        shpfileBundles.push(obj);
      }
    })
    return shpfileBundles;
  }

  /**
   * Read a zip file and organize its contents by folder.
   *
   * Returns an Array of Arrays, where sub-arrays are lists of files
   * broken out by folder (top-level of zip is its own folder).
   * 
   * @param archive is a File object representing a zip file
   */
  async readZip(archive) {
    let jszip = new JSZip();
    let folders = await jszip.loadAsync(archive).then(
      zip => {
        let files = [];
        for (let key in zip.files) {
          let entry = zip.files[key];
          if (!entry.dir) files.push(entry);
        }
        return this.readZipFolders(files);
      },
      err => {
        console.log(
          `Error loading ${archive}.`,
          `Actual error: ${err}`
        );
      }
    )
    let fileSets = [];
    for (let dir of folders) {
      let files = await Promise.all(folders[dir]
        .filter(this.isValidFile, this)
        .map(file => {
          let filename = file.name.split('/').slice(-1).join('');
          return file.async('blob').then(
            blob => new File([blob], filename, { type: this.fileExt(filename) }),
            err => {
              console.log(`Error reading ${filename}.`, `${err}`)
            }
          )
        })
      )
      fileSets.push(files);
    }
    return fileSets;
  }

  readZipFolders(files) {
    let folders = {
      'top': []
    }
    files.forEach(f => {
      let dir = f.name.split('/').slice(0,-1).join('');
      dir = dir ? dir : 'top';
      if (!folders[dir]) folders[dir] = [];
      folders[dir].push(f);
    })
    return folders;
  }

  async processShpfileBundle(bundle) {
    let dbf = await this.readFileAsync(bundle.shp);
    let shp = await this.readFileAsync(bundle.dbf);
    let geojson = await shapefile.read(dbf, shp);
    if (bundle.prj) {
      let prj = await this.readFileAsync(bundle.prj, 'readAsText');
      geojson.features = geojson.features.map((feature => {
        return this.convertFeatureProjection(feature, prj);
      }))
    }
    console.log(geojson);
    return geojson;
  }

  convertFeatureProjection(feature, prj) {
    let coords = feature.geometry.coordinates;
    coords = coords.map((coord) => {
      return proj4(prj, 'EPSG:4326', coord);
    })
    return feature;
  }

  readFileAsync(file, readFunc='readAsArrayBuffer', resolveUndefinedFiles=true) {
    return new Promise((resolve, reject) => {
      if (file !== undefined) {
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
          resolve(event.target.result)
        }
        fileReader.onerror = (error) => {
          reject(error)
        }
        fileReader[readFunc](file)
      }
      else {
        if (resolveUndefinedFiles) {
          resolve()
        } else {
          reject("No file specified.")
        }
      }
    })
  }

  makeFilePromise(file) {
    return new Promise((resolve, reject) => {
      resolve({
        type: this.fileExt(file.name),
        file: file
      })
    })
  }

  getFilenameWithoutExt(filename) {
    return filename.split('.').slice(0, -1).join('');
  }

  replaceFilenameExtWith(ext, filename) {
    let nameform = filename.split('.').slice(0, -1).join('');
    return [nameform, ext].join('.');
  }


  fileExt(filename) {
    return filename.split('.').pop()
  }

  flatten(arr) {
    let flat = [];
    arr.forEach(d => {
      if (Array.isArray(d)) { flat.push(...d); }
      else { flat.push(d) }
    })
    return flat;
  }

}
