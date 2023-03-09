import React, {
  useEffect, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { AttributionControl } from 'react-leaflet';
import { mapConfig } from '../../configuration/config';

const basemaps = mapConfig.basemaps;

const baseMapSelector = (state) => state.mapProperties.basemap;
const attributionsSelector = (state) => state.mapProperties.attributions;

export default function BasemapLayer(props) {
  const { map } = props;
  const selectedBasemap = useSelector(baseMapSelector);
  const selectedAttributions = useSelector(attributionsSelector);
  const attributionString = useRef('');
  const basemapRef = useRef(null);
  const handleAttributionsChange = useCallback((newAttributions) => {
    // console.log('attributions change detected in basemap layer');
    // console.log('selected attributions: ' + selectedAttributions);

    // console.log('attributionString was ' + attributionString.current);
    // console.log('size : ', selectedAttributions.length);
    // if (map !== null) {
    //   console.log(map);
    //   map.attributionControl.addAttribution('sup');
    // }
    attributionString.current = selectedAttributions.length > 0 ? Array.from(selectedAttributions).join(', ') : '';
    // console.log('setting attributionString to ' + attributionString.current);
    // if (basemapRef.current !== null) {
    // basemapRef.current.options.attribution = attributionString.current;
    // console.log('before: ', basemapRef.current.options);
    // basemapRef.current.attribution = attributionString.current;
    // basemapRef.current._setupAttribution();
    // handleBasemapChange(basemapRef.current);
    // console.log(basemapRef.current);
    // map.attributionControl.addAttribution(basemapRef.current.attribution);
    // }
    // console.log(basemapRef.current);
    // basemapRef.current.attribution = attributionString.current;
  }, [selectedAttributions]);

  const handleBasemapChange = useCallback((basemapName) => {
    if (basemapRef.current !== null) {
      basemapRef.current.remove(map);
    }
    if (map) {
      const newBasemap = vectorBasemapLayer(basemaps[basemapName], {
        apikey: 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By',
        pane: 'mapPane',
        attribution: attributionString.current // SHOULD PASS IN OUR SET FROM ACTIVE TILE LAYERS
      });
      newBasemap.addTo(map);
      basemapRef.current = newBasemap;
    }
  }, [map, basemapRef, attributionString]);

  useEffect(() => {
    handleAttributionsChange(selectedAttributions);
  }, [handleAttributionsChange, selectedAttributions]);

  useEffect(() => {
    handleBasemapChange(selectedBasemap);
  }, [selectedBasemap, handleBasemapChange]);

  return (
    <AttributionControl />
  );
}

BasemapLayer.propTypes = {
  map: PropTypes.object
};
