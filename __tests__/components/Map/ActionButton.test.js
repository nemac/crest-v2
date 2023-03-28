import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import ActionButton from '../../../src/components/Map/ActionButton';

//Done
const testName = 'test';
describe('ActionButton', () => {
  beforeEach(() => {
    render(<ActionButton buttonName = {testName}/>).store;
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