import React from 'react' ;
import { shallow, mount } from 'enzyme';
import { mapConfig } from '../../src/configuration/config';
import { BasicSelect } from '../../src/components/Map/basicSelect';
import { changeRegionValue } from '../../src/reducers/regionSelectSlice';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const initialState = {"value": 'Continental U.S.'}
const mockStore = configureStore(middlewares)

let store

const regions = mapConfig.regions;
const mockChangeRegion = jest.fn()

const event = {
    target: { value: 'the-value' }
  };

const regionSelector = shallow(<BasicSelect defaultValue={'Continental U.S.'} onChange={mockChangeRegion} values={regions} />)
{/* <BasicSelect defaultValue={selectedRegion} values={regions} onChange={handleRegionSelectChange}/> */}

describe('Region', () => {
    beforeEach(() => {
        store = mockStore(initialState)
    })
    it('Should render the region selector correctly', () => {
        expect(regionSelector).toMatchSnapshot() ;
    });
    it('Should have the correct initial state', () => {
        // console.log(regionSelector.find('select').prop())
        expect(regionSelector.find('select').prop('defaultValue')).toBe('Continental U.S.') ;
    })
    it('Calls the onChange handler', () => {
        // const component = regionSelector.dive()
        regionSelector.find('select').simulate('change', event);
        expect(mockChangeRegion).toBeCalledWith(event);

    })
});