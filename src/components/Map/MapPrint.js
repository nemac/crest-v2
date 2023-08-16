import L from 'leaflet';
import 'leaflet-easyprint';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

function MapPrint(props) {
  const { printRef } = props;
  const map = useMap();
  useEffect(() => {
    const control = L.easyPrint({
      ...props
    });
    printRef.current = control;
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map, printRef, props]);

  return null;
}

export default MapPrint;

MapPrint.propTypes = {
  map: PropTypes.object,
  printRef: PropTypes.useRef
};
