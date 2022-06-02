import React from 'react' ;
import { shallow, mount } from 'enzyme';
import { Layer } from '../../src/components/MapLayerList/Layer';
// import { changeRegionValue } from '../../src/reducers/regionSelectSlice';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const initialState = {"layerLabel": 'testLayerLabel'}
const mockStore = configureStore(middlewares)

let store


const event = {
    target: { value: 'the-value' }
  };

const layer = shallow(<Layer layerLabel={'testLayerLabel'}/>)

describe('Layer', () => {
    beforeEach(() => {
        store = mockStore(initialState)
    })
    it('Should render the label correctly', () => {
        expect(layer).toMatchSnapshot() ;
    });
});
