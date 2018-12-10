import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom'; 
//import PropTypes from 'prop-types';
import {searchBooks} from '../actions/SearchAction';

class Search extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			bookName: ''	
		};
	}

	searchBook(e) {
		e.preventDefault();
		console.log('state 2 are ', this.state);
		this.props.searchBooks(this.state.bookName);
	}
	render() {
		return (
			<div data-test="component-search">
				<form onSubmit={this.searchBook.bind(this)} className="frm-search" data-test="form-search">
					<div className=" search-items">
						<label htmlFor="bookName" className="item-label">Book Name</label>
						<input type="text" className=" item-input" id="bookName" value={this.state.bookName} onChange={(e) => {this.setState({bookName: e.target.value});}} required />
						<button type="submit" className="btn btn-primary item-btn">Submit</button>
					</div>
				</form>
				{
					this.props.searchReducer.searching && 
					<div data-test="searching">
						<h3>Searching books for {this.props.searchReducer.search_term}....</h3>
					</div>
				}
				{
					this.props.searchReducer.search_result && 
					<div data-test="search-result">
						<h3 data-test="search-result-total-books">Total Books Found: {this.props.searchReducer.search_total_result}</h3>
						<hr />
						<div className="row">
							{
								this.props.searchReducer.search_result.map((value, key) => {
									let url = `/details/${value.best_book.id._text}`;
									return <div className="col-md-3 item-result" key={key} data-test="search-result-items">
											<strong>{value.best_book.title._text}</strong>
											<div>
												<Link to={url}><img src={value.best_book.image_url._text} className="img-responsive" alt="" /></Link>
											</div>
											<div>
											ID: # <Link to={url}>{value.best_book.id._text}</Link>
											</div>
											<div>
											By: <strong>{value.best_book.author.name._text}</strong>
											</div>
										</div>												
								})
							}
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		searchReducer: state.searchReducer
	}	
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ searchBooks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);