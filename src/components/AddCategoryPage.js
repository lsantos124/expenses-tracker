import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { TwitterPicker } from 'react-color';
import { startAddCategory } from '../actions/categories';

export class AddCategoryPage extends React.Component {
    constructor(props) {
		super(props);
	
		this.state = {
			title: '',
			description: '',
			color: '',
			error: ''
		};
    }
    
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    handleChangeComplete = (color, event) => {
        this.setState({ color: color.hex });
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        
		if (!this.state.title) {
			this.setState({ error: 'Please provide category title' });
		}
		else {
			let categoryExists = false;
			this.props.categories.map((category) => {
				if (category.title == this.state.title) {
					categoryExists = true;
				}
				return category;
			})

			if (categoryExists) {
				this.setState({ error: 'Category already exists!' });
			} else {
				this.props.startAddCategory({
					title: this.state.title,
					description: this.state.description,
					color: this.state.color
				});
                this.props.history.push('/customize');
			}
		}
    }
    
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Category</h1>
                    </div>
                </div>
                <div className="content-container">
                    <form className="form" onSubmit={this.onSubmit}>
                        { this.state.error && <p className="form__error">{this.state.error}</p> }
                        <input 
                            type="text"
                            className="text-input" 
                            placeholder="Category Title"
                            value={this.state.title} 
                            onChange={this.onTitleChange}
                        />
                        <input 
                            type="textarea" 
                            className="textarea"
                            placeholder="Category Description"
                            value={this.state.description} 
                            onChange={this.onDescriptionChange} 
                        />
                        <TwitterPicker 
                            color={this.state.color} 
                            onChangeComplete={this.handleChangeComplete} 
                        />
                        <button className="button">Add Category</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
	categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
    startAddCategory: (category) => dispatch(startAddCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryPage);