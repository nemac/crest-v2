// TODO: what else do we need to add to this
export default function a11yProps(index, name) {
  return {
    id: `${name}-${index}`,
    'aria-controls': `${name}-${index}`
  };
}
