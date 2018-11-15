import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from "./TextFieldGroup";
import classnames from "classnames";
import {addUser, updateUser} from "../actions/usersAction"

class ModalForUser extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            email: "",
            position: "",
            phone: "",
            errors: {},
            isEdit: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillMount(){
        if(this.props.user){
            let state = {
                name: this.props.user.name,
                email: this.props.user.email,
                isEdit: true
            };
            if(this.props.user.position) state.position = this.props.user.position;
            if(this.props.user.phone) state.phone = this.props.user.phone;
            this.setState(state);
        }
        else {
            this.setState({
                name: "",
                email: "",
                position: "",
                phone: "",
                isEdit: false });
        }
    }


    componentWillReceiveProps(nextProp){

        if(nextProp) {

            if(nextProp.errors&&JSON.stringify(nextProp.errors)!==JSON.stringify({})) {
                this.setState({
                    errors: nextProp.errors
                })
            }
        }


    }

    onSubmit(e) {
        e.preventDefault();

        const sendData = {
            name: this.state.name,
            email: this.state.email,
            position: this.state.position,
            phone: this.state.phone
        }

        if(this.state.isEdit) {
            sendData._id = this.props.user._id;
            this.props.updateUser(sendData, this.props.showModal);
        }
        else
            this.props.addUser(sendData, this.props.showModal);
    }


    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    render (){
        const {errors, isEdit} = this.state;
        let title = "Add new user";
        if(isEdit) {
            title = "Edit user data";
        }


        return(
            <div className={classnames("modal", {"active": this.props.isOpen})} >
                <div className="modal-backdrop" onClick={this.props.showModal}></div>
                <div className="modal-inner">
                    <div className="modal-close" onClick={this.props.showModal}>
                        &times;
                    </div>

                    <div className="modal-title">
                        {title}
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="modal-form">
                            <TextFieldGroup value={this.state.name} name={"name"} onChange={this.onChange} placeholder={"Name"} error={errors.name}/>
                            <TextFieldGroup value={this.state.email} name={"email"} onChange={this.onChange} placeholder={"Email"} error={errors.email}/>
                            <TextFieldGroup value={this.state.position} name={"position"} onChange={this.onChange} placeholder={"Position"} error={errors.position}/>
                            <TextFieldGroup value={this.state.phone} name={"phone"} onChange={this.onChange} placeholder={"Phone"} error={errors.phone}/>


                            <div className="form-field">
                                <button className="button">save</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        )

    }


}


ModalForUser.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object,
    showModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, {addUser, updateUser})(ModalForUser);