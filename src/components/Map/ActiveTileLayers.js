import React from 'react'
import { useSelector } from 'react-redux'
import { TileLayer } from 'react-leaflet'

export default function ActiveTileLayers() {
    
    const activeTileURLS = useSelector((state) => state.mapLayerList.activeLayerList)

  return (
      activeTileURLS.map(layer => <TileLayer key={layer.label} url={layer.url}/>)
  )
}
