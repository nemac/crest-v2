import React from 'react';
import MapLayerList from '../../../src/components/MapLayerList/MapLayerList'
import { render, fireEvent, screen, cleanup } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';

//Done
const regions = mapConfig.regions;
let store;
const chartInputs = regions['American Samoa'].chartInputs
const chartLabels = [];

chartInputs.forEach(chart => {
    if (chart.ChartInputLabel !== 'Summary') {
        chartLabels.push(chart.ChartInputLabel);
    } 
})

describe('MapLayerList', () => {
    beforeEach(() => {
        store =  render(<MapLayerList />).store;
    })
    afterEach(() => {
        cleanup();
    });

    describe('Renders as expected:', () =>{

        test('Screen as expected:', () => {
            const CBs = screen.getAllByText('Change Basemap');
            const CRs = screen.getAllByText('Change Region');
            expect(screen.getByText('Map Layers')).toBeInTheDocument();
            expect(CBs.length).toBeGreaterThan(1);
            expect(CRs.length).toBeGreaterThan(1);
            expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
            expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
            chartLabels.map(label => expect(screen.getByText(label)).toBeInTheDocument());
        });

        test('Methods as expected', () => {
            expect(chartInputs.regionSelector).not.toBeNull();
        });
 
    });

    describe('Screen functions as expected:', () => {
        test('toggles visibility and updates store', () => {
            //TODO Still don't know how to implement visibility tests... everything seems always visible no matter what
            expect(store.getState().mapLayerList.visible).toBe(true);
            fireEvent.click(screen.getAllByRole('button')[0]);
            expect(store.getState().mapLayerList.visible).toBe(false);
        });
    });
});

