import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import ChartSummary from '../../../src/components/AnalyzeArea/ChartSummary';

//Done
const testArea = "Alaska";

describe('ChartSummary', () => {
  beforeEach(() => {
    render(<ChartSummary areaName={testArea}/>).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(testArea).toBeInTheDocument;
    })
  })
})