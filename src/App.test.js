import React from 'react' ;
import { shallow } from 'enzyme';
import { render } from '@testing-library/react' ;
import App from './App' ;
import { BasicSelect } from './components/Map/basicSelect';

//const regionSelector = shallow(<BasicSelect defaultValue={selectedRegion} values={regions} onChange={handleRegionSelectChange}/>)

define('Region', () => {
    it('Should render the region selector correctly', () => {
        //expect(regionSelector).toMatchSnapshot() ;
    });
});