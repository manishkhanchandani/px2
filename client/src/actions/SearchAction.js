import axios from 'axios';
import convert from 'xml-js';
import {SEARCH_RESULT, DETAILS, KEY, SEARCH_TERM, API_URL} from '../constants/actionConstants';

export const searchBooks = (name) => (dispatch, getState) => {
	//console.log('-------------');
	//console.log('searchBooks start');
	dispatch({
		type: DETAILS,
		payload: null
	});
	dispatch({
		type: SEARCH_TERM,
		payload: name
	});
	dispatch({
		type: SEARCH_RESULT,
		payload: null,
		total: null,
		searching: true
	});
	//console.log('name is ', name);
	let searchWord = encodeURIComponent(name);
	let url = `${API_URL}search.xml?key=${KEY}&q=${searchWord}`;
	console.log('url is ', url);
	
	return axios({
		method: 'get',
		mode: 'no-cors',
		url
	  }).then(response => {
			const resp = convert.xml2json(response.data, {compact: true, spaces: 4});
			const resp2 = JSON.parse(resp);
			console.log('resp2: ', resp2);
			let results = null;
			let empty = null;
			if (resp2.GoodreadsResponse.search.results.work && !resp2.GoodreadsResponse.search.results.work.length) {
				results = [resp2.GoodreadsResponse.search.results.work];
			} else if (resp2.GoodreadsResponse.search.results.work) {
				results = resp2.GoodreadsResponse.search.results.work;	
			} else {
				empty = 'No Result Found';	
			}
			dispatch({
				type: SEARCH_RESULT,
				payload: results,
				total: resp2.GoodreadsResponse.search['total-results']._text,
				searching: false,
				message: empty
			});
		});
	
	//console.log('searchBooks end');
};



export const details = (id) => (dispatch, getState) => {
	
	//console.log('-------------');
	//console.log('details start');
	//console.log('id is ', id);
	let url = `${API_URL}book/isbn/${id}?key=${KEY}`;
	console.log('url is ', url);
	
	return axios({
		method: 'get',
		mode: 'no-cors',
		url
	  }).then(response => {
			const resp = convert.xml2json(response.data, {compact: true, spaces: 4});
			const resp2 = JSON.parse(resp);
			console.log('resp2: ', resp2.GoodreadsResponse.book);
			dispatch({
				type: DETAILS,
				payload: resp2.GoodreadsResponse.book
			});
		});
	
	//console.log('details end');
};


export const cleardetails = () => (dispatch, getState) => {
	
	dispatch({
		type: DETAILS,
		payload: null
	});
};

