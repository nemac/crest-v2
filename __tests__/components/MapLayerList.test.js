import React from 'react';
import MapLayerList from '../../src/components/MapLayerList/MapLayerList'
import { render, fireEvent, screen, cleanup } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';

const regions = mapConfig.regions;
let store;
const chartInputs = regions['American Samoa'].chartInputs
const chartLabels = [];
chartInputs.forEach(chart => {
    if (chart.ChartInputLabel !== 'Summary') {
        chartLabels.push(chart.ChartInputLabel);
    } 
})

describe('Layer', () => {
    beforeEach(() => {
        store =  render(<MapLayerList />).store;
    })
    afterEach(() => {
        cleanup();
    });
    it('renders', () => {   
        expect(screen.getByText('Map Layers')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
        expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
        chartLabels.map(label => expect(screen.getByText(label)).toBeInTheDocument());
    });
    it('toggles visibility and updates store', () => {
        //TODO Still don't know how to implement visibility tests... everything seems always visible no matter what
        expect(store.getState().mapLayerList.visible).toBe(true);
        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(store.getState().mapLayerList.visible).toBe(false);
    });
});

