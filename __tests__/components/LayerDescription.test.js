import React from 'react';
import { render } from '../setup/testUtils';
import LayerDescription from '../../src/components/MapLayerList/LayerDescription';
import { screen, cleanup, fireEvent } from '@testing-library/react';

describe('LayerDescription', () => {
    beforeEach(() => {
        render(<LayerDescription layerName='test' layerDescription='this is a test'/>);
    });
    afterEach(() => {
        cleanup();
    });
    it('renders', () => {
    });
    it('displays the right title', async () => {
        fireEvent.mouseEnter(screen.getByRole('button'));
        expect(await screen.findByText('test')).toBeInTheDocument();
    });
    it('displays the right description', async () => {
        fireEvent.mouseEnter(screen.getByRole('button'));
        expect(await screen.findByText('this is a test')).toBeInTheDocument();
    });
})

