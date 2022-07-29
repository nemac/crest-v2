import React from 'react';
import Layer from '../../src/components/MapLayerList/Layer'
import { render, fireEvent, screen, cleanup } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';

const regions = mapConfig.regions;
const testLayer = regions['American Samoa'].layerList[0];
let store;


describe('Layer', () => {
    beforeEach(() => {
        store =  render(<Layer layerData={testLayer}/>).store
    })
    afterEach(() => {
        cleanup();
    });
    it('renders', () => {   
        const expected = testLayer.label ;
        expect(screen.getByRole('checkbox').checked).toBe(false)
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
    it('checks and unchecks', () => {
        expect(screen.getByRole('checkbox').checked).toBe(false)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('checkbox').checked).toBe(true)
        fireEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('checkbox').checked).toBe(false)
    });
    it('updates the store on click', () => {
        const expected = testLayer.id ;
        expect(store.getState().mapLayerList.activeLayerList).toMatchObject({})
        fireEvent.click(screen.getByRole('checkbox'))
        expect(store.getState().mapLayerList.activeLayerList).toHaveProperty(expected)
    });
});

