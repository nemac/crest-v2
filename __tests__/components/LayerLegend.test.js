import React from 'react';
import { render } from '../setup/testUtils';
import LayerLegend from '../../src/components/MapLayerList/LayerLegend';
import { screen, cleanup } from '@testing-library/react';
import { mapConfig } from '../../src/configuration/config';


const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;
const testLayer = testLayerList[0];
const colorKeys = Object.keys(testLayer.chartCSSColor)

describe('LayerLegend', () => {
    beforeEach(() => {
        render(<LayerLegend layer={testLayer}/>);
    });
    afterEach(() => {
        cleanup();
    });
    it('renders', () => {
        expect(screen.getByText('Low')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        colorKeys.map(index => expect(screen.getByText(index)).toBeInTheDocument());
    });
})

