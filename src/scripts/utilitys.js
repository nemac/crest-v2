/**
 * update the display of element
 *  @param { Object } element - Element object from click event, used to toggle
 *                   display state
 */
export function toggleElementDisplay(thisEle, elements) {
  elements.forEach((ele) => {
    const name = ele.replace('main_nav_', '');
    const tabEle = document.querySelector(`[ref="tab-${name}"]`);
    const mapClass = tabEle.className;
    const newMapClass = mapClass + (mapClass.indexOf(' d-none') > 0) ? ' ' : 'd-none';

    tabEle.className = newMapClass;
  });
}

// ensure the object or variable is valid...
// TODO: This should probably be looking for positives rather than checking it
// isn't one of a few negatives. For example this will let booleans, malformed
// lat/long objects, arrays and floats through when it probably shouldn't. The
// code doesn't really say what a valid object is other than not undefined,
// null, empty arrays, empty objects and empty strings.
//
// @param obj - typeless
export function checkValidObject(obj) {
  if (obj === undefined || obj === null) { return false; }
  if (typeof obj === 'object' && Object.keys(obj).length === 0) { return false; }
  if (typeof obj === 'string' && obj.length === 0) { return false; }

  return true;
}
