import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { render } from '../setup/testUtils';
import { mapConfig } from '../../src/configuration/config';
import DriverGroup from '../../src/components/MapLayerList/DriverGroup';

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
  it('renders', () => {
  });
  it('displays correct group title', () => {
    expect(screen.getByText(testInputLabel)).toBeInTheDocument();
  })
  it('updates the store on click', () => {
    expect(store.getState().mapLayerList.expandedCharts).toHaveLength(0);
    fireEvent.click(screen.getByText(testInputLabel));
    expect(store.getState().mapLayerList.expandedCharts).toContain(testInputLabel);
  })
  it('collapses as expected', () => {
    /* TODO 
    The Driver Group is built as an accordion, and the layers show up as in the document and visible, 
    so I'm honestly not sure how to test for this one, will come back to it.
    */
  })
});
