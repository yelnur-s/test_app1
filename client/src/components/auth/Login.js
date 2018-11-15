import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from 'prop-types';
import {Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from "../../actions/authActions";

class Login extends Component {

    constructor(){
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {

            this.props.history.push("/profile");
        }
    }


    // not works on first render
    componentWillReceiveProps(nextProp){
        if(nextProp) {
            this.setState({errors: nextProp.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(user, this.props.history);


    }



    render (){

        const {errors} = this.state;

        return(
            <div className="auth">
                <div className="auth-info">
                    <img src="images/girl.png" alt=""/>
                    <h2>A beautiful life begins with beautiful mind</h2>
                </div>
                <div className="auth-content">
                    <div className="auth-content--inner">
                        <h1 className="auth-title"> Sign in </h1>
                        <p className="auth-desc">Enter to education system and improve your skills</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-field">
                                <label htmlFor="email"> E-mail address</label>
                                <input value={this.state.email} onChange={this.onChange} name="email" placeholder="Email" className={classnames("input", {"is-error": errors.email}) } type="text"/>
                                {errors.email&&(<span className="input-msg--error">{errors.email}</span>)}
                            </div>
                            <div className="form-field">
                                <label htmlFor="password"> Password </label>
                                <input value={this.state.password} onChange={this.onChange} name="password" placeholder="Password"   className={classnames("input", {"is-error": errors.password}) } type="password"/>
                                {errors.password&&(<span className="input-msg--error">{errors.password}</span>)}
                            </div>
                            <div className="form-field">
                                <button className="button">Sign in</button>

                            </div>

                            <div className="form-text"> Not a member? <Link className="form-link" to="/register"> Sign up now </Link> </div>
                        </form>
                    </div>
                </div>

            </div>
        )

    }


}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Login));