import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalForUser from "../../common/ModalForUser";
import Navbar from "../layout/Navbar";
import classnames from "classnames";
import {getUsers, deleteUser, searchUsers} from "../../actions/usersAction";

class Profile extends Component {

    constructor(){
        super();
        this.state = {
            user: {},
            modalIsOpen: false,
            editUser: null,
            search: ""
        }

        this.showModal = this.showModal.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
        this.searchOnChange = this.searchOnChange.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillReceiveProps(prop){
        this.setState({});

    }

    componentWillMount(){
        this.handleSearchDebounced = this.debounce( this.getData, 300);
    }

    // works one time in one lifesircle
    componentDidMount(){
        if(this.props.auth.isAuthenticated) {
            this.props.getUsers();
            this.setState({user: this.props.auth.user});
        } else {
            this.props.history.push("/");
        }
    }

    goToPage(i){
        if(this.state.search&&this.state.search!=="") {
            this.props.searchUsers(this.state.search, i);
        } else {
            this.props.getUsers(i);
        }
    }

    searchOnChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        })
        this.handleSearchDebounced();

    }

    getData(){
        if(this.state.search&&this.state.search!=="") {
            this.props.searchUsers(this.state.search, 0);
        } else {
            this.props.getUsers(0);
        }
    }
    debounce(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }



    nextPage(){

        if(this.props.users.page*1!==this.props.users.pages - 1) {
            if(this.state.search&&this.state.search!=="") {
                this.props.searchUsers(this.state.search, this.props.users.page*1 + 1);
            } else {
                this.props.getUsers(this.props.users.page*1 + 1);
            }

        }
    }

    prevPage(){
        if(this.props.users.page*1!==0) {
            if(this.state.search&&this.state.search!=="") {
                this.props.searchUsers(this.state.search, this.props.users.page*1 - 1);
            } else {
                this.props.getUsers(this.props.users.page*1 - 1);
            }

        }
    }

    deleteUser(data) {
        this.props.deleteUser(data);

    }

    openEditUser(data){
        this.setState({editUser: data, modalIsOpen: true});
    }



    showModal(){
        if(this.state.modalIsOpen) {
            this.setState({
                modalIsOpen: !this.state.modalIsOpen,
                editUser: null
            })
        }
        else
            this.setState({
                modalIsOpen: !this.state.modalIsOpen
            })

    }



    render (){
        const {user} = this.state;
        const userList = this.props.users.users.map((data, index)=>(
            <div className="list-item" key={index}>
                <span>{data.name}</span>
                <span>{data.email}</span>
                <span>{data.phone}</span>
                <span>{data.position}</span>
                <span>{user.isAdmin&&(<button className="button button-small button-primary" onClick={this.openEditUser.bind(this, data)}><img
                    src="images/edit.svg" alt=""/></button>)}{user.isAdmin&&(<button className="button button-small button-danger" onClick={this.deleteUser.bind(this, data)}><img
                    src="images/garbage.svg" alt=""/></button>)}</span>
            </div>
        ))


        let pages = [];
        for(let i = 0; i < this.props.users.pages; i++){
            pages.push(i);
        }
        const pagesHtml =pages.map((data, i)=>(
            <span  key={i} className={classnames("pagination__page", {"pagination__page--active": this.props.users.page==i}) }   onClick={this.goToPage.bind(this, i)}  >{i+1}</span>
        ))


        return(
            <div className="profile">
                <Navbar searchOnChange={this.searchOnChange} search={this.state.search}/>
                <div className="profile-users">
                    <div className="profile-header">
                        Users
                        {user.isAdmin&&(<button className="button righted" onClick={this.showModal}>
                            Add user
                        </button>)}
                    </div>
                    <div className="list">
                        <div className="list-item list-item--title">
                            <span>Name</span>
                            <span>Email</span>
                            <span>Phone</span>
                            <span>Position</span>
                            <span>Choose action</span>
                        </div>
                        {userList}
                    </div>
                    <div className="pagination">
                        <span className="pagination__arrow" onClick={this.prevPage} >&#10094;</span>

                        {pagesHtml}

                        <span className="pagination__arrow" onClick={this.nextPage} >&#10095;</span>
                    </div>
                </div>

                {this.state.modalIsOpen&&(<ModalForUser isOpen={this.state.modalIsOpen} showModal={this.showModal} user={this.state.editUser}/>)}
            </div>
        )

    }


}


Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser:PropTypes.func
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
})



export default connect(mapStateToProps, {getUsers, deleteUser, searchUsers})(withRouter(Profile));