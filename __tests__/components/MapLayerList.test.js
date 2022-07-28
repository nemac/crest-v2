import React from 'react';
import MapLayerList from '../../src/components/MapLayerList/MapLayerList'
import { render, fireEvent, screen, cleanup } from '../setup/testUtils';

let store;

describe('Layer', () => {
    beforeEach(() => {
        store =  render(<MapLayerList />).store;
    })
    afterEach(() => {
        cleanup();
    });
    it('renders', () => {   
        console.log(screen.getByText('Map Layers'));
        console.log(screen.getAllByRole('button')[0]);
    });
    it('toggles visibility and updates store', () => {
        //TODO Still don't know how to implement visibility tests... everything seems always visible no matter what
        expect(store.getState().mapLayerList.visible).toBe(true);
        fireEvent.click(screen.getAllByRole('button')[0]);
        expect(store.getState().mapLayerList.visible).toBe(false);
    });
});

