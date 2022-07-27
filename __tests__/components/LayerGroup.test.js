import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';
import LayerGroup from '../../src/components/MapLayerList/LayerGroup';

const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;

describe('LayerGroup', () => {
  beforeEach(() => {
    render(<LayerGroup chartLayerList={testLayerList} />).store;
  });
  afterEach(() => {
    cleanup();
  });
  it('renders', () => {
  });
  it('displays layers', () => {
      // This checks that both the subheading and Layer exist for 'Resilience Hubs'
      expect(screen.getAllByText(testLayerList[0].label)).toHaveLength(2);
  })

});
