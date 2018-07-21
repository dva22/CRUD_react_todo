import React, { Component } from 'react'
import axios from "axios/index"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import moment from 'moment';
require('moment/locale/ru');

class UsersNotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            error: '',
            isLoading: true
        };
    }
    componentDidMount(prevProps) {


        if (!this.props.auth.user.userId)
            this.setState({error: 'Необходимо авторизоваться'});
        else
            axios.get('/api/users/'+this.props.auth.user.userId+'/notes', {})
                .then(
                    res => {
                        console.log(res.data)
                        this.setState(
                            {
                                notes: res.data.notes,
                                isLoading: false
                            })
                    })
                .catch(err => {
                    let error = '';
                    if (err.response) {
                        error = err.response.request.responseURL +
                            ' ' +
                            err.response.status +
                            ' ' +
                            err.response.statusText
                    } else {
                       error ='Error with server';
                    }

                    this.setState({error: error})
                });
        }




    render() {
        let {error, isLoading} = this.state;
        if (!this.props.auth.user.userId && error.length === 0)
            error =  'Необходимо авторизоваться';

        const data = this.state.notes;
        const TABLE_COLUMNS = [
            {   name: 'dateCreate',
                label: 'Дата создания',
                formatValue: (a)=>moment(a).format('DD.MM.YYYY HH:mm')
            },
            {   name: 'dateCreate',
                label: 'Прошло',
                formatValue: (a)=>moment.duration(moment().diff(moment(a))).humanize()
            },
            {   name: 'note',
                label: 'Название'
            },
            {   name: 'description',
                label: 'Описание'
            }
        ];


        const MakeCell = (cell) => {
            if (typeof cell.formatValue === 'function')
                return cell.formatValue(cell.value);

            return cell.value;
        };

        function makeColumns(row) {
            return TABLE_COLUMNS.map((element, index) =>
                <th key={index}>
                    <MakeCell
                        formatValue = {element.formatValue}
                        value = {row[element.name]}/>
                </th>
            )

        }

        const TableHeader = () => {
            return(
                <thead>
                <tr>
                    {TABLE_COLUMNS.map((element, index) =>
                        <th key={index}>{element.label}</th>
                    )}
                </tr>
                </thead>
            )
        };


        const TableBody = () => {
            return(
                <tbody>
                {data.map((element, index) =>
                    <tr key={index}>
                        {makeColumns(element)}
                    </tr>
                )}
                </tbody>
            )
        };

        const TableBodyWithError = (err) => {
            return(
                <div className="alert alert-danger">
                    {err.err}
                </div>
            )
        };

        const TableBodyLoading = () => {
            return(
                <div>
                    <h1> Loading .... </h1>
                </div>
            )
        };


        if (error.length > 0) {

            return <TableBodyWithError err={error}/>

        } else if(isLoading) {

            return <TableBodyLoading/>

        } else {

            return (
                <table className="table">
                    <TableHeader/>
                    <TableBody/>
                </table>
            )

        }
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