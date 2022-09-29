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
        apikey: 'AAPK19aa44a23e4c4a7788b37541444c07denQmRCIZSmoomcyzoK3i3ko37EDOjKQcz9ui0gt3KdWAk6c2N4fPW9jEBF0__3R7o',
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
        <div>BasemapLayer</div>
  );
}

BasemapLayer.propTypes = {
  map: PropTypes.object
};
