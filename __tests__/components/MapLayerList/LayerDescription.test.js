import React from 'react';
import { render } from '../../setup/testUtils';
import LayerDescription from '../../../src/components/MapLayerList/LayerDescription';
import { screen, cleanup, fireEvent } from '@testing-library/react';


describe('LayerDescription:', () => {

    beforeEach(() => {
        render(<LayerDescription layerName='test' layerDescription='this is a test'/>);
    });
    afterEach(() => {
        cleanup();
    });

    describe('Renders as expected:', () => {
        it('Renders', () => {
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('Displays the right title on mouseover', async () => {
            fireEvent.mouseEnter(screen.getByRole('button'));
            expect(await screen.findByText('test')).toBeInTheDocument();
        });

        it('Displays the right description on mouseover', async () => {
            fireEvent.mouseEnter(screen.getByRole('button'));
            expect(await screen.findByText('this is a test')).toBeInTheDocument();
        });
    })
})

