import React from 'react';
import validateInput from '../../../server/validations/note';
import axios from "axios/index"
import PropTypes from "prop-types";
import {connect} from "react-redux";


class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            note: '',
            description: '',
            jwtToken:  localStorage.jwtToken,
            errors: {
                description: '',
                note: ''
            },
            isDisabledButtonSubmit: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getClassName = this.getClassName.bind(this);
    }

    getClassName(field) {
        return "form-control" +
            (this.state.errors[field].length > 0
                    ?
                    " is-invalid"
                    :
                    ""
            );
    }

    onSubmit(e) {
        e.preventDefault();

        const {errors, isValid} = validateInput('allForm', this.state);

        if (isValid) {

            this.setState({
                errors: {
                    description: '',
                    note: ''
                },
                isDisabledButtonSubmit: false
            });
            axios.post('/api/notes', this.state)
                .then(
                    (res) => {
                        this.props.taggle();
                        this.props.onSubmit();
                        this.context.router.history.push('/')
                    }
                )
                .catch(err => {
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
                        error ='Error with server';
                    }

                    this.setState(
                        {errors:
                                {
                                    description: '',
                                    note: error
                                }
                        }
                    )
                });

        } else
            this.setState({
                errors: errors,
                isDisabledButtonSubmit: true
            });

    }

    onChange(e) {

        let state = {};
        let isDisabledButtonSubmit = false;
        Object.assign(state, this.state);
        state[e.target.name] = e.target.value;

        const {errors, isValid} = validateInput(e.target.name, state);

        if (isValid) {
            state.errors[e.target.name] = '';
        } else {
            state.errors[e.target.name] = errors[e.target.name];
        }

        for (let key in state.errors) {
            if (state.errors[key].length > 0)
                isDisabledButtonSubmit = true;
        }

        this.setState({
            errors: state.errors,
            isDisabledButtonSubmit: isDisabledButtonSubmit,
            [e.target.name]: e.target.value
        });
    }

    render() {

        const {errors, isDisabledButtonSubmit} = this.state;

        return (
            <div>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Название</label>
                        <input
                            type="text"
                            className={this.getClassName("note")}
                            name="note"
                            placeholder="Название"
                            onChange={this.onChange}
                        />

                        <div className="invalid-feedback">
                            {errors["note"]}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Описание</label>
                        <input
                            type="text"
                            className={this.getClassName("description")}
                            name="description"
                            placeholder="Описание"
                            onChange={this.onChange}
                        />

                        <div className="invalid-feedback">
                            {errors["description"]}
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isDisabledButtonSubmit}>Добавить
                    </button>

                </form>
            </div>
        )

    }
}

NoteForm.propTypes = {
    auth: PropTypes.object.isRequired,
    taggle: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

NoteForm.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(NoteForm);

