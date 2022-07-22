import React from 'react';
import { render,cleanup, fireEvent, screen  } from '../setup/testUtils';
import LayerDescription from '../../src/components/MapLayerList/LayerDescription';

describe('LayerDescription', () => {
    beforeEach(() => {
        render(<LayerDescription layerName='test' layerDescription='this is a test'/>);
    })
    afterEach(() => {
        cleanup();
    })
    it('renders', () => {
    })
    it('displays the right name', () => {
        fireEvent.click(screen.getByRole('button'))
        // console.log(screen.debug());
    })
    it('displays the right description', () => {

    })
})

