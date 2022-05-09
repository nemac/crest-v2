import React from 'react' ;
import { shallow } from 'enzyme';
import { mapConfig } from './configuration/config';
import { BasicSelect } from './components/Map/basicSelect';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render } from '@testing-library/react' ;
import App from './App' ;

Enzyme.configure({ adapter: new Adapter() });

const regions = mapConfig.regions;
const regionSelector = shallow(<BasicSelect defaultValue={'Continental U.S.'} values={regions}/>)


describe('Region', () => {
    it('Should render the region selector correctly', () => {
        expect(regionSelector).toMatchSnapshot() ;
    });
});