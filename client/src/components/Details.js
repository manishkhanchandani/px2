import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom'; 
//import PropTypes from 'prop-types';
import {details, cleardetails} from '../actions/SearchAction';
import StarRatingComponent from 'react-star-rating-component';

class Details extends Component {
	
	componentDidMount() {
		//console.log(this.props.match.params.id);
		//console.log(this.props);
		this.props.cleardetails();
		this.props.details(this.props.match.params.id);
	}
	render() {
		if (!this.props.searchReducer.details) {
			return (<div data-test="component-details">Loading...</div>);	
		}
		let url = this.props.searchReducer.details.url._cdata;
		let rating = parseFloat(this.props.searchReducer.details.average_rating._text);
		return (
			<div data-test="component-details">
				<Link to="/">Back to Search Results</Link>
				<hr />
				{
					this.props.searchReducer.details && 
					<div className="row">
						<div className="col-md-4">
							{
								this.props.searchReducer.details.image_url._text && 
								<div data-test="details-image"><img src={this.props.searchReducer.details.image_url._text} alt="" className="img-responsive" /></div>
							}
							<hr />
								<div className="dropdown">
									<button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Want to Read
									<span className="caret"></span></button>
								  </div>
							<hr />
							<div>
								Rate this book
							</div>
							<div>
								Preview
							</div>
						</div>
						
						<div className="col-md-8">
							{
								this.props.searchReducer.details.title._cdata && 
								<h1 data-test="details-title">{this.props.searchReducer.details.title._cdata}</h1>
							}
							{
								this.props.searchReducer.details.title._text && 
								<h1 data-test="details-title">{this.props.searchReducer.details.title._text}</h1>
							}
							<div data-test="details-author" className="book-author">by&nbsp; 
							{
								this.props.searchReducer.details.authors.author.length > 0 ?
								
									this.props.searchReducer.details.authors.author.map((auth, kauth) => {
										return <span key={kauth}>{auth.name._text}, </span>											 
									})
								:
								<span>
									{this.props.searchReducer.details.authors.author.name._text}
								</span>
							}
							</div>
							<div data-test="details-average-rating">
							{
								this.props.searchReducer.details.average_rating._text && 
									<span>
									<span style={{fontSize: 18, position: 'relative', top: '12px'}}>
										<StarRatingComponent 
										  name="rate1" 
										  starCount={5}
										  value={rating}
										  editing={false}
										/>
									</span>
									<span className="custom-spacing">{this.props.searchReducer.details.average_rating._text} </span>
									</span>
							}
							<span className="custom-spacing">
								<strong>Rating details</strong>
							</span>
							{
								this.props.searchReducer.details.ratings_count._cdata && 
								<span data-test="details-ratings-count" className="custom-spacing">{this.props.searchReducer.details.ratings_count._cdata} Ratings</span>
							}
							{
								this.props.searchReducer.details.text_reviews_count._cdata && 
								<span data-test="details-text-reviews-count" className="custom-spacing">{this.props.searchReducer.details.text_reviews_count._cdata} Reviews</span>
							}
							</div>
							{
								this.props.searchReducer.details.description._cdata && 
								<div data-test="details-description">{this.props.searchReducer.details.description._cdata}</div>
							}
							{
								url && 
								<div data-test="details-url"><a href={url} target="_blank" rel="noopener noreferrer">more</a></div>
							}
							<hr />
							<div>
								<a href={url} target="_blank" rel="noopener noreferrer">GET A COPY</a>
							</div>
						</div>
						
						
						
						
						
						
					</div>
				}
				
				{
					!this.props.searchReducer.details && 
					<div>
						Loading the book details .....
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
	return bindActionCreators({ details, cleardetails }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);