import React from 'react';
import {shallow} from 'enzyme';

import { findByTestAttr, checkProps, storeFactory } from '../../test/testUtils';
import Search from './Search';

const setup = (initialState={}) => {
	const store = storeFactory(initialState);
	const wrapper = shallow(<Search store={store} />).dive();
	return wrapper;
};

describe('test related to search', () => {
	let wrapper;
	beforeEach(() => {
		const intialState = {};
		wrapper = setup(intialState);
	});
	test('render without error', () => {
		const component = findByTestAttr(wrapper, 'component-search');
		expect(component.length).toBe(1);				  
	});									
});