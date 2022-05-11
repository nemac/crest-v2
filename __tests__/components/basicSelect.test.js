import React from 'react' ;
import { shallow } from 'enzyme';
import { mapConfig } from '../../src/configuration/config';
import { BasicSelect } from '../../src/components/Map/basicSelect';
import configureStore from 'redux-mock-store'

const initialState = {"value": 'Continental U.S.'}
const mockStore = configureStore()

let store

const regions = mapConfig.regions;
const regionSelector = shallow(<BasicSelect defaultValue={'Continental U.S.'} values={regions}/>)

describe('Region', () => {
    beforeEach(() => {
        store = mockStore(initialState)
    })
    it('Should render the region selector correctly', () => {
        expect(regionSelector).toMatchSnapshot() ;
        console.log(regionSelector.props)
    });
});