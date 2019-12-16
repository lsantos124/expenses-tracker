import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ( {startLogout} ) => (
	<header className="header">
		<div className="content-container">
			<div className="header__content">
				<div className="header__links">
					<Link className="header__title" to="/dashboard">
						<h1>Expensify</h1>
					</Link>
					<Link className="button button--link header__link" to="/customize">Customize</Link>
					<Link className="button button--link header__link" to="/statistics">Statistics</Link>
				</div>
				<button className="button button--link" onClick={startLogout}>Logout</button>
			</div>
		</div>
	</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);