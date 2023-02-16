import React from 'react';
import Layer from '../../../src/components/MapLayerList/Layer'
import { render, fireEvent, screen, cleanup } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import { useDispatch, useSelector } from 'react-redux';

const regions = mapConfig.regions;
const testLayer = regions['American Samoa'].layerList[0];
let store;

//Done for now
describe('Layer', () => {
    beforeEach(() => {
        store =  render(<Layer layerData={testLayer}/>).store
    })
    afterEach(() => {
        cleanup();
    });

    describe('Render as expected', () => {
        test('Renders', () => {   
            //const expected =  testLayer.label;
            expect(screen.getByRole('checkbox')).toBeInTheDocument();
            expect(screen.getByText(testLayer.label)).toBeInTheDocument();
            expect(testLayer.layerListSelector).not.toBe(null);
            expect(testLayer.layerLegendSelector).not.toBe(null);
        }); 
    })

    describe('Events work as expected', () => {

        test('Checks and unchecks', () => {
            expect(screen.getByRole('checkbox').checked).toBe(false);
            fireEvent.click(screen.getByRole('checkbox'));
            expect(screen.getByRole('checkbox').checked).toBe(true);
            fireEvent.click(screen.getByRole('checkbox'));
            expect(screen.getByRole('checkbox').checked).toBe(false);
        });

        test('Updates the store on click', () => {
            const expected = testLayer.id ;
            expect(store.getState().mapLayerList.activeLayerList).toMatchObject({});
            fireEvent.click(screen.getByRole('checkbox'));
            expect(store.getState().mapLayerList.activeLayerList).toHaveProperty(expected);
        });
    })
});

