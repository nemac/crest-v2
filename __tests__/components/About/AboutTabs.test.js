import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import TableData from '../../../src/components/AnalyzeArea/AnalyzeProjectSitesTableData';

//Done

const chartTest = [{
  areaName: 'test',
  indexes: [{
    name: 'one',
    value: 1,
    range: '1-2'
  }]
}];
describe('TableData', () => {
  beforeEach(() => {
    render(<TableData data = {chartTest} />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(screen.getByText('test')).toBeInTheDocument();
        expect(screen.getByText('1-2')).toBeInTheDocument();
    })
  })
})