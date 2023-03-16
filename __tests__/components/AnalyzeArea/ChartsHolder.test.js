import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import ChartsHolder from '../../../src/components/AnalyzeArea/ChartsHolder';

//Done
describe('ChartsHolder', () => {
  beforeEach(() => {
    render(<ChartsHolder />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
        expect(ChartsHolder.analyzeAreaState).not.toBe(null);
    })

    test('Functions as expected: ', () => {
      expect(ChartsHolder.analyzeAreaState).not.toBe(null);
      expect(ChartsHolder.handleGraphOrTableClick).not.toBe(null);
      expect(ChartsHolder.handleSortClick).not.toBe(null);
      expect(ChartsHolder.HandleRemoveAllClick).not.toBe(null);
      expect(ChartsHolder.handleGenericClick).not.toBe(null);
    })
  })

})