export const SandyAreaGeoJson = {
	"type": "FeatureCollection",
	"features": [{
		"type": "Feature",
		"properties": {
			"mean": {
				"exposure": 8.095615479621243,
				"asset": 2.0521819678880195,
				"threat": 7.358480856319473,
				"aquatic": 5,
				"terrestrial": 2,
				"hubs": 6.156908665105386,
				"crit_infra": 0.2006998764923837,
				"crit_facilities": 0,
				"pop_density": 0.5652531906134212,
				"social_vuln": 0.2862289007822149,
				"drainage": 3.3779333058871965,
				"erosion": 0.540654590366406,
				"floodprone_areas": 1.915500205846027,
				"geostress": 0,
				"sea_level_rise": 3.8905928365582545,
				"slope": 3.3070193495265543,
				"storm_surge": 3.163030053519967
			}
		},
		"geometry": {
			"type": "Polygon",
			"coordinates": [
				[
					[-74.47557058418107, 39.41830265237318],
					[-74.47700058418107, 39.39903754258014],
					[-74.47724908482222, 39.39776684356539],
					[-74.47779644509973, 39.39655329621017],
					[-74.47862390521031, 39.395438496721845],
					[-74.47970310542537, 39.39446065846312],
					[-74.48099705807047, 39.3936533014976],
					[-74.48246141521226, 39.39304410288033],
					[-74.48404598860533, 39.39265394721612],
					[-74.48569646980535, 39.39249621014238],
					[-74.49601446980535, 39.39225418607139],
					[-74.49777776059312, 39.39234725278965],
					[-74.49948334562039, 39.392705323138024],
					[-74.50106520350077, 39.39331453267124],
					[-74.50246210219443, 39.394151293345914],
					[-74.50361996923539, 39.39518320753751],
					[-74.50449398481923, 39.39637032326916],
					[-74.50505031673028, 39.397666681886854],
					[-74.50526742995064, 39.399022098091955],
					[-74.50587542995063, 39.41809714483567],
					[-74.50574994452012, 39.41943627406887],
					[-74.50529300956359, 39.420731649089255],
					[-74.50452172861841, 39.42193478644227],
					[-74.50346497151017, 39.423000657347465],
					[-74.50216229372585, 39.42388937230102],
					[-74.50066245581196, 39.42456767312385],
					[-74.499021598218, 39.42501017676316],
					[-74.49730113990267, 39.42520032445151],
					[-74.4849451399027, 39.42563228148638],
					[-74.48327926530045, 39.425570809131806],
					[-74.48165681132639, 39.42527252423086],
					[-74.48013370084328, 39.424747705148846],
					[-74.47876243253518, 39.42401443653142],
					[-74.47759027137886, 39.423097986625656],
					[-74.47665761951119, 39.42202993716735],
					[-74.47599662364529, 39.42084709571155],
					[-74.47563006703518, 39.41959022777433],
					[-74.47557058418107, 39.41830265237318]
				]
			]
		}
	}]
};

function triggerEvent (element, eventName) {
  var event = new Event(eventName);
  element.dispatchEvent(event);
}

export function ToggleCritInfra(element, mapComponent) {

  const detail = 'CriticalInfrastructureTMS';
  mapComponent.toggleLayer(detail);

  const toggle = document.getElementById(`${detail}-layerToggle`);
  const toggleBox = document.querySelector(`input#${detail}-toggle`);

  toggleBox.checked = !toggleBox.checked;

  triggerEvent(toggleBox,'change')

  toggle.classList.toggle('closed');
  toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');

}

export function ToggleStormSurge(element, mapComponent) {

  const detail = 'StormSurgeTMS';
  mapComponent.toggleLayer(detail);

  const toggle = document.getElementById(`${detail}-layerToggle`);
  const toggleBox = document.querySelector(`input#${detail}-toggle`);

  toggleBox.checked = !toggleBox.checked;

  triggerEvent(toggleBox,'change')

  toggle.classList.toggle('closed');
  toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');

}

export function ToggleExposed(element, mapComponent) {

  const detail = 'ExposureTMS';
  mapComponent.toggleLayer(detail);

  const toggle = document.getElementById(`${detail}-layerToggle`);
  const toggleBox = document.querySelector(`input#${detail}-toggle`);

  toggleBox.checked = !toggleBox.checked;

  triggerEvent(toggleBox,'change')

  toggle.classList.toggle('closed');
  toggle.querySelector('.layer-legend-wrapper').classList.toggle('closed');

}
