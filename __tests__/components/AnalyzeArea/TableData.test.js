import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import TableData from '../../../src/components/AnalyzeArea/TableData';

//Still finishing this one

const chartTest = new Array(1);

chartTest[0] = ["test", "test", 101, "test"];

describe('TableData', () => {
  beforeEach(() => {
    render(<TableData data = {chartTest} />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(screen.getAllByRole('button')).toBeInTheDocument();
    })
  })
})