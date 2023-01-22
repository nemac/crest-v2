import React from 'react';
import { render } from '../setup/testUtils';
import LayerLegend from '../../src/components/MapLayerList/LayerLegend';
import { screen, cleanup } from '@testing-library/react';
import { mapConfig } from '../../src/configuration/config';

const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;
const testLayer = testLayerList[0];

//Done
describe('LayerLegend', () => {

    beforeEach(() => {
        render(<LayerLegend layer={testLayer}/>);
    });
    afterEach(() => {
        cleanup();
    });

    describe('Colours and format as expected', () => {

        test('ColorChart not empty', () => {
            expect(testLayer.chartCSSLegends).not.toBeNull()
        })

        test('Function pickCSSBasedBgColor works', () => {
            expect(testLayer.color).not.toBeNull();
        })

        test('Screen as expected', () => {
            expect(screen.getByText('Low')).toBeInTheDocument();
            expect(screen.getByText('High')).toBeInTheDocument();
        });
    })
})
