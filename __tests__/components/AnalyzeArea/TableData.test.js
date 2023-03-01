import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import TableData from '../../../src/components/AnalyzeArea/TableData';

describe('TableData', () => {
  beforeEach(() => {
    render(<TableData />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    /*test('Screen as expected: ', () => {
        //expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    })

    test('Funtions as expected: ', () => {
      //expect(TableData.data.length).toBeGreaterThan(0);
    })*/

  })
}) 