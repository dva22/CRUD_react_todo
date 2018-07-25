import React, { Component } from 'react'
import PropTypes from "prop-types";
import moment from 'moment';
require('moment/locale/ru');


class Table extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let {error, isLoading} = this.props;

        const data = this.props.notes;

        const TABLE_COLUMNS = [
            {   name: 'dateCreate',
                label: 'Дата создания',
                formatValue: (a) => moment(a).format('DD.MM.YYYY HH:mm')
            },
            {   name: 'dateCreate',
                label: 'Прошло',
                formatValue: (a) => moment.duration(moment().diff(moment(a))).humanize()
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

Table.propTypes = {
    notes: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export default Table;