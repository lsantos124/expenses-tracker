import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveCategory } from '../actions/categories';

export const CustomizePage = ({ categories, startRemoveCategory }) => {
	return (
		<div>
			<div className="page-header">
				<div className="content-container">
					<h1 className="page-header__title">Customize Settings</h1>
				</div>
			</div>
			<div className="content-container">
				<div className="list-header">
					<div>Categories</div>
				</div>
				<div className="list-body">
				{
					categories.map((category, index) => {
						return (
							<div className="list-item" key={index}>
								<div className="list-item__color">
									<div className="box-color" style={{backgroundColor: category.color}}></div>
									<div>
										<h3 className="list-item__title">{category.title}</h3>
										<span className="list-item__subtitle">{category.description}</span>
									</div>
								</div>
								<button 
									className="button button--secondary"
									onClick={() => startRemoveCategory({ id: category.id })}
									>
										Delete
									</button>
							</div>
						);
					})
				}
				</div>
				<div className="list-buttons">
					<Link 
						to='/addCategory'
						className="button"
					>
						Add Category
					</Link>
				</div>
				
			</div>
		</div>
	)
};

const mapStateToProps = (state) => ({
	categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
	startRemoveCategory: ({id}) => dispatch(startRemoveCategory({id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizePage);