import React from 'react';
import Layer from '../../src/components/MapLayerList/Layer'
import { render, fireEvent, screen } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';

const regions = mapConfig.regions;

describe('Layer', () => {
    it('renders', () => {
        render(<Layer layerData={regions['American Samoa'].layerList[0]}/>)
    })
    it('clicks on and off', () => {
        render(<Layer layerData={regions['American Samoa'].layerList[0]}/>)
        expect(screen.getByRole('checkbox').checked).toBe(false)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('checkbox').checked).toBe(true)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('checkbox').checked).toBe(false)
    })
    it('updates the store', () => {
        const expected = regions['American Samoa'].layerList[0].id ;
        const { store } = render(<Layer layerData={regions['American Samoa'].layerList[0]}/>)
        expect(store.getState().mapLayerList.activeLayerList).toMatchObject({})
        fireEvent.click(screen.getByRole('checkbox'))
        expect(store.getState().mapLayerList.activeLayerList).toHaveProperty(expected)
        
    })
})

