import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import AboutCards from '../../../src/components/About/AboutCards';
import AboutCommunityExposure from '../../../src/components/About/AboutCommunityExposure';

//

describe('TableData', () => {
  beforeEach(() => {
    render(<AboutCommunityExposure />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
        expect(screen.getByText('About')).toBeInTheDocument();
    })
  })
})