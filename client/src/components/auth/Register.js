import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {

    constructor(){
        super();

        this.state = {
            email: "",
            name: "",
            password: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated) {

            this.props.history.push("/profile");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        }

        this.props.registerUser(newUser, this.props.history);

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
                        <h1 className="auth-title"> Sign up </h1>
                        <p className="auth-desc">Start using this app and improve your skills</p>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup value={this.state.email} placeholder={"Email"} onChange={this.onChange} error={errors.email} name={"email"}/>
                            <TextFieldGroup value={this.state.name} placeholder={"Name"} onChange={this.onChange} error={errors.name} name={"name"}/>
                            <TextFieldGroup value={this.state.password} type={"password"} placeholder={"Password"} onChange={this.onChange} error={errors.password} name={"password"}/>
                            <div className="form-field">
                                <button className="button" type="submit">Sign up</button>
                            </div>
                            <div className="form-text"> Already a member? <Link className="form-link" to="/"> Sign in </Link> </div>
                        </form>
                    </div>
                </div>
            </div>
        )

    }


}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {registerUser})(withRouter(Register));