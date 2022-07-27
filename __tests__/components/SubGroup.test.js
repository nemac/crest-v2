import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';
import SubGroup from '../../src/components/MapLayerList/SubGroup';

const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;
const testSubHeading = 'Test SubHeading'

describe('LayerGroup', () => {
  beforeEach(() => {
    render(<SubGroup subHeading={testSubHeading} subLayers={testLayerList} />).store;
  });
  afterEach(() => {
    cleanup();
  });
  it('renders', () => {
  });
  it('displays sub heading', () => {
    expect(screen.getByText(testSubHeading)).toBeInTheDocument();
  })
  it('displays layers', () => {
      expect(screen.getByText(testLayerList[0].label)).toBeInTheDocument();
  })

});
