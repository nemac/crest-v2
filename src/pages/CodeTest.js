// This is just for code testing snippet purposes.
// Can delete when ready for production
import React, { useState } from 'react';
// import { Marker, Popup } from 'react-leaflet';
// import LeafletMapContainer from '../components/Map/LeafletMapContainer';

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function TemperatureInput(props) {
  const { scale, temperature, setTemperature} = props;
  // const [temperature, setTemperature] = useState(0);

  return (
    <fieldset>
      <legend> Enter temperature in {scaleNames[scale]}:</legend>
      <input
        value={temperature}
      />
    </fieldset>
  );
}

export default function CodeTest() {
  const [temperature, setTemperature] = useState();
  const [scale, setScale] = useState();
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  function handleCelsiusChange(temperature) {
    setScale('c');
    setTemperature({temperature});
  }

  function handleFahrenheitChange(temperature) {
    setScale('f');
    setTemperature({temperature});
  }
  return (
   <div>
     <TemperatureInput scale="c" temperature={celsius} onChange={handleCelsiusChange}/>
     <TemperatureInput scale="f" temperature={fahrenheit} onChange={handleFahrenheitChange}/>
   </div>
  );
}
