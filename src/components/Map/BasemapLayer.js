import React, {
  useEffect, useCallback, useRef
} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { vectorBasemapLayer } from 'esri-leaflet-vector';
import { mapConfig } from '../../configuration/config';

const basemaps = mapConfig.basemaps;

const baseMapSelector = (state) => state.mapProperties.basemap;

export default function BasemapLayer(props) {
  const { map } = props;
  const selectedBasemap = useSelector(baseMapSelector);
  const basemapRef = useRef(null);
  const handleBasemapChange = useCallback((basemapName) => {
    if (basemapRef.current !== null) {
      basemapRef.current.remove(map);
    }
    if (map) {
      const newBasemap = vectorBasemapLayer(basemaps[basemapName], {
        apikey: 'AAPKa0a45bdbd847441badbdcf07a97939bd0Y1Vpjt3MU7qyu7R9QThGqpucpKmbVXGEdmQo1hqhdjLDKA2zrwty2aeDjT-7-By',
        pane: 'mapPane'
      });
      newBasemap.addTo(map);
      basemapRef.current = newBasemap;
    }
  }, [map, basemapRef]);

  useEffect(() => {
    handleBasemapChange(selectedBasemap);
  }, [selectedBasemap, handleBasemapChange]);

  return (
        <div></div>
  );
}

BasemapLayer.propTypes = {
  map: PropTypes.object
};
