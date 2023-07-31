import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import { render } from '../../setup/testUtils';
import { mapConfig } from '../../../src/configuration/config';
import Upload from '../../../src/components/Map/UploadShapeFile';

describe('Upload', () => {
  beforeEach(() => {
    render(<Upload />).store;
  });
  afterEach(() => {
    cleanup();
  });

  describe('Renders as expected: ', () => {
    test('Screen as expected: ', () => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    })
  })
})