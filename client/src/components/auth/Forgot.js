import React, { Component } from 'react'
import classnames from "classnames";
import PropTypes from 'prop-types';
import {Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from "../../actions/authActions";

class Forgot extends Component {

    constructor(){
        super();

        this.state = {
            email: "",
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
            email: this.state.email
        }

        this.props.forgotUser(user, this.props.history);


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
                        <h1 className="auth-title">Forgot password</h1>
                        <p className="auth-desc">Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                        </p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-field">
                                <label htmlFor="email"> E-mail address</label>
                                <input value={this.state.email} onChange={this.onChange} name="email" placeholder="Email" className={classnames("input", {"is-error": errors.email}) } type="text"/>
                                {errors.email&&(<span className="input-msg--error">{errors.email}</span>)}
                            </div>

                            <div className="form-field">
                                <button className="button">Send</button>

                            </div>
                            <div className="form-text"><Link className="form-link" to="/"> Sign in </Link> </div>
                            <div className="form-text"> Not a member? <Link  className="form-link" to="/register"> Sign up now </Link> </div>
                        </form>
                    </div>
                </div>

            </div>
        )

    }


}

Forgot.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(Forgot));