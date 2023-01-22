import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';
import SubGroup from '../../src/components/MapLayerList/SubGroup';

const regions = mapConfig.regions;
const testLayerList = regions['American Samoa'].layerList;
const testSubHeading = 'Test SubHeading';
const testLayer = testLayerList[0];

//Done
describe('LayerGroup', () => {
  beforeEach(() => {
    render(<SubGroup subHeading={testSubHeading} subLayers={testLayerList}/>);
  });
  afterEach(() => {
    cleanup();
  });

  describe("Renders as expected", () => {

    test("Screen as expected:", () => {
      expect(screen.getByText(testSubHeading)).toBeInTheDocument();
      expect(screen.getByText(testLayer.label)).toBeInTheDocument();
    });

    test("Methods as expected", () => {
      expect(testLayerList.map).not.toBeNull();
      expect(testLayerList.map.layerName).toEqual(testLayer.layerName);
    })
  });
});
