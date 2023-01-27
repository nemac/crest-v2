import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import DriverGroup from '../../../src/components/MapLayerList/DriverGroup';

const regions = mapConfig.regions;
const testInputLabel = 'Test Group';
const testLayerList = regions['American Samoa'].layerList;

let store;

describe('DriverGroup', () => {
  beforeEach(() => {
    store = render(<DriverGroup chartInputLabel={testInputLabel} chartLayerList={testLayerList} />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected:', () => {
    test('Screen as expected:', () => {
      expect(screen.getByText(testInputLabel)).toBeInTheDocument();
      expect(testInputLabel.expandedCharts).not.toBeNull();
    });
  });

  describe('Screen functions as expected:', () => {
    test('Updates the store on click', () => {
      expect(store.getState().mapLayerList.expandedCharts).toHaveLength(0);
      fireEvent.click(screen.getByText(testInputLabel));
      expect(store.getState().mapLayerList.expandedCharts).toContain(testInputLabel);
    });

    test('Collapses as expected', () => {
      /* TODO 
      The Driver Group is built as an accordion, and the layers show up as in the document and visible, 
      so I'm honestly not sure how to test for this one, will come back to it.
      */

      //expect(testLayerList.isExpanded).toBe(false);
      expect(store.getState().DriverGroup.chartLayerList.visible).toBe(false);
      fireEvent.click(screen.getByText(testInputLabel));
      expect(store.getState().DriverGroup.chartLayerList.visible).toBe(true);
      //expect(testLayerList.isExpanded).toBe(true);
    });
  });
});
