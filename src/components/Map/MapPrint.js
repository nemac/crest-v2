import L from 'leaflet';
import 'leaflet-easyprint';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

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
  }, [map]);

  return null;
}

export default MapPrint;
