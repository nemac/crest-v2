import React from 'react'
import { useSelector } from 'react-redux'
import { TileLayer } from 'react-leaflet'

export default function ActiveTileLayers() {

    const activeTileURLS = useSelector((state) => state.mapLayerList.activeLayerTiles)
  return (
      activeTileURLS.map(url => <TileLayer url={url}/>)
  )
}
