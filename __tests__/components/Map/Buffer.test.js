import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import Buffer from '../../../src/components/Map/Buffer';

//Done
describe('Buffer', () => {
  beforeEach(() => {
    render(<Buffer />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    })
  })
})