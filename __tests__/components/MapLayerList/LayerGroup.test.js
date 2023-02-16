import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import LayerGroup from '../../../src/components/MapLayerList/LayerGroup';

const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;
const testLayer = testLayerList[0];

describe('LayerGroup', () => {
  beforeEach(() => {
    render(<LayerGroup chartLayerList={testLayerList} />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected:', () => {
    test('Screen as expected:', () => {
        expect(screen.getAllByText(testLayer.label)).toHaveLength(2);
    });
  });
});
