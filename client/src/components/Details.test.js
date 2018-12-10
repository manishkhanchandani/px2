import React from 'react';
import {shallow} from 'enzyme';

import { findByTestAttr, checkProps, storeFactory } from '../../test/testUtils';
import Details from './Details';

const defaultProps = {
	match: {
		params: {
			id: 1234	
		}
	}
};

const setup = (props={}, initialState={}) => {
	const setupProps = {...defaultProps, ...props};
	const store = storeFactory(initialState);
	const wrapper = shallow(<Details store={store} {...setupProps} />).dive();
	return wrapper;
};

describe('test related to details', () => {
	let wrapper;
	beforeEach(() => {
		const intialState = {};
		const intialProps = {};
		wrapper = setup(intialProps, intialState);
	});
	test('render without error', () => {
		const component = findByTestAttr(wrapper, 'component-details');
		expect(component.length).toBe(1);				  
	});									
});