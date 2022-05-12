// what else do we need to add to this
// TODO need to update othe components to include this.

export default function a11yProps(index) {
  return {
    id: `about-tab-index-${index}`,
    'aria-controls': `about-tab-index-${index}`,
  };
}
