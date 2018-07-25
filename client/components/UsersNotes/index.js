import React, { Component } from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import 'moment/locale/ru';
import loadNotesUsers from '../../utils/loadNotesUsers';
import Table from '../Table/index';
import ModalWindow from '../ModalWindow';
import Note from "../AddNote/index";

class UsersNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            error: '',
            isLoading: true
        };
        this.loadNotesUsers = this.loadNotesUsers.bind(this);
    }
    componentDidMount(prevProps) {
        this.loadNotesUsers();
    }


    loadNotesUsers () {
        if (!this.props.auth.user.userId) {
            this.setState({error: 'Необходимо авторизоваться'});

        } else {
            loadNotesUsers('/api/users/' + this.props.auth.user.userId + '/notes')
                .then(
                    res => {
                        this.setState(
                            {
                                notes: res.data.notes,
                                isLoading: false
                            })
                    })
                .catch(err => {
                    console.log(err);
                    let error = '';
                    if (err.response) {
                        if (err.response.data.error)
                            error += ' ' + err.response.data.error;
                        error += ' ' + err.response.request.responseURL +
                            ' ' +
                            err.response.status +
                            ' ' +
                            err.response.statusText
                    } else {
                        error = 'Error with server';
                    }

                    this.setState({error: error})
                });
        }
    }


    render() {
        let {error, isLoading} = this.state;
        if (!this.props.auth.user.userId && error.length === 0)
            error =  'Необходимо авторизоваться';

        return (
            <div>
                <ModalWindow
                    value = 'Новая заметка'
                    component = {Note}
                    onSubmit = {this.loadNotesUsers}
                />
                <Table
                    notes = {this.state.notes}
                    error = {error}
                    isLoading = {isLoading}
                />
            </div>

        )

    }
}

UsersNotes.propTypes = {
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

UsersNotes.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(UsersNotes);