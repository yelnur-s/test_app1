import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import {connect} from "react-redux";

import axios from "axios";

class Navbar extends Component {

	constructor(){
		super();

		this.state ={

		}

        this.logout = this.logout.bind(this);
	}

    logout(e) {
		this.props.logoutUser(this.props.history);
	}




	render (){
        const { user } = this.props.auth;



		return(
			<header className="header">
				
					<div className="header-content">
						<div className="header-logo">
                            <img src="images/logo.svg" alt=""/>
						</div>
						<div className="header-search">
                            <input value={this.props.search} onChange={this.props.searchOnChange} name="search" type="text" placeholder="Search"/>
                            <img src="images/search.svg" alt=""/>
						</div>


                        <div className="header-logout" onClick={this.logout}>
                            <img src="images/logout.svg" alt=""/>
						</div>



					</div>
				
			</header>
		)

	}


}




Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	search: PropTypes.string.isRequired,
	searchOnChange: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));